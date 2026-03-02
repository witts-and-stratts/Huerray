'use client';

import React, {
  Activity,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from 'react';
import { motion } from 'motion/react';

// ---------------------------------------------------------------------------
// Context – exposes the current activity phase to descendants
// ---------------------------------------------------------------------------

type ActivityPhase = 'visible' | 'exiting' | 'hidden' | 'entering';

interface AnimateActivityContextValue {
  /** Current lifecycle phase of the activity wrapper. */
  phase: ActivityPhase;
}

const AnimateActivityContext = createContext<AnimateActivityContextValue>( {
  phase: 'visible',
} );

/**
 * Hook for child components to access the current activity phase.
 *
 * @example
 * ```tsx
 * const { phase } = useAnimateActivity();
 * // phase is 'visible' | 'entering' | 'exiting' | 'hidden'
 * ```
 */
export function useAnimateActivity() {
  return useContext( AnimateActivityContext );
}

// ---------------------------------------------------------------------------
// AnimateActivity component
// ---------------------------------------------------------------------------

export interface AnimateActivityProps {
  /**
   * Controls visibility of children.
   * - `"visible"` – children are shown, enter animation plays.
   * - `"hidden"` – exit animation plays, then React's `<Activity>` hides
   *   the subtree via `display: none` (preserving DOM & component state).
   */
  mode: 'visible' | 'hidden';

  /**
   * How the element behaves in layout during exit.
   * - `"normal"` (default) – the element keeps its space in layout until the
   *   exit animation finishes.
   * - `"pop"` – the element is immediately taken out of flow
   *   (`position: absolute`) so surrounding elements can reflow right away.
   */
  layoutMode?: 'normal' | 'pop';

  /** Callback fired after exit animations have finished and the subtree is hidden. */
  onExitComplete?: () => void;

  children: ReactNode;

  /**
   * A name for this Activity boundary for React DevTools instrumentation.
   * Forwarded to the underlying `<Activity>` component.
   */
  name?: string;

  /** Optional className applied to the animation wrapper `<div>`. */
  className?: string;

  /** Optional inline styles applied to the animation wrapper `<div>`. */
  style?: React.CSSProperties;
}

/**
 * `AnimateActivity` – animated visibility wrapper built on React 19's `<Activity>`.
 *
 * Children are **never unmounted**. `<Activity>` hides them with `display: none`
 * *after* the exit animation, so all DOM state (scroll, loaded images, component
 * state) is preserved across tab switches.
 *
 * ### Quick start
 *
 * ```tsx
 * <AnimateActivity mode={isOpen ? 'visible' : 'hidden'}>
 *   <MyContent />  {/* state is preserved when hidden! *\/}
 * </AnimateActivity>
 * ```
 */
export function AnimateActivity( {
  mode,
  layoutMode = 'normal',
  onExitComplete,
  children,
  name,
  className,
  style,
}: AnimateActivityProps ) {
  // -----------------------------------------------------------------------
  // Phase state machine:
  //   visible  ──(mode→hidden)──▸  exiting  ──(animation done)──▸  hidden
  //   hidden   ──(mode→visible)──▸ entering ──(rAF)──▸              visible
  // -----------------------------------------------------------------------
  const [ phase, setPhase ] = useState<ActivityPhase>(
    mode === 'visible' ? 'visible' : 'hidden'
  );

  // Delay switching <Activity> to "hidden" until after the exit animation.
  const [ activityMode, setActivityMode ] = useState<'visible' | 'hidden'>( mode );

  // Drives the motion.div animate target: true → height:auto, false → height:0
  const [ animateVisible, setAnimateVisible ] = useState( mode === 'visible' );

  const onExitCompleteRef = useRef( onExitComplete );
  onExitCompleteRef.current = onExitComplete;

  // Kept in sync on every render so callbacks always see the latest mode
  // without needing it in their dependency arrays.
  const modeRef = useRef( mode );
  modeRef.current = mode;

  // -----------------------------------------------------------------------
  // React to `mode` prop changes
  // -----------------------------------------------------------------------
  useEffect( () => {
    if ( mode === 'hidden' && ( phase === 'visible' || phase === 'entering' ) ) {
      setPhase( 'exiting' );
      setAnimateVisible( false );
    }

    if ( mode === 'visible' && ( phase === 'hidden' || phase === 'exiting' ) ) {
      // Reveal the subtree first so the browser can measure it, then animate.
      setActivityMode( 'visible' );
      setPhase( 'entering' );
      const id = requestAnimationFrame( () => {
        setAnimateVisible( true );
        setPhase( 'visible' );
      } );
      // If mode changes again before the frame fires, cancel it so the stale
      // rAF doesn't overwrite the new phase/visibility state.
      return () => cancelAnimationFrame( id );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ mode ] );

  // -----------------------------------------------------------------------
  // Called when the height animation finishes
  // -----------------------------------------------------------------------
  const handleAnimationComplete = useCallback( () => {
    // Only act on the EXIT animation (height → 0), and only if mode hasn't
    // already flipped back to 'visible' (guards against the race where the
    // exit animation finishes in the same frame the enter rAF fires).
    if ( !animateVisible && modeRef.current === 'hidden' ) {
      setPhase( 'hidden' );
      setActivityMode( 'hidden' );
      onExitCompleteRef.current?.();
    }
  }, [ animateVisible ] );

  // -----------------------------------------------------------------------
  // Compute wrapper styles (for layoutMode="pop")
  // -----------------------------------------------------------------------
  const wrapperStyle: React.CSSProperties = { ...style };
  if ( phase === 'exiting' && layoutMode === 'pop' ) {
    wrapperStyle.position = 'absolute';
    wrapperStyle.pointerEvents = 'none';
  }

  // -----------------------------------------------------------------------
  // Context value
  // -----------------------------------------------------------------------
  const contextValue = useMemo<AnimateActivityContextValue>(
    () => ( { phase } ),
    [ phase ]
  );

  return (
    <Activity mode={ activityMode } name={ name }>
      <AnimateActivityContext.Provider value={ contextValue }>
        <div
          className={ className }
          style={ wrapperStyle }
          data-activity-phase={ phase }
        >
          {/*
           * Children always live here — Activity owns display:none so they are
           * never unmounted and their state (images, scroll, etc.) is preserved.
           * The motion.div only controls the visible height clipping.
           */}
          <motion.div
            animate={ animateVisible ? { height: 'auto' } : { height: 0 } }
            initial={ false }
            transition={ { duration: 0.6, ease: 'easeInOut' } }
            style={ { overflow: 'hidden' } }
            onAnimationComplete={ handleAnimationComplete }
          >
            { children }
          </motion.div>
        </div>
      </AnimateActivityContext.Provider>
    </Activity>
  );
}

// Re‑export for convenience
export { AnimateActivityContext };
export type { ActivityPhase, AnimateActivityContextValue };
