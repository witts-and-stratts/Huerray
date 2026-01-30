/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
declare module '@splidejs/react-splide' {
  import { ReactNode } from 'react';
  import { Options } from '@splidejs/splide';

  export interface SplideProps {
    options?: Options;
    hasTrack?: boolean;
    tag?: string;
    id?: string;
    className?: string;
    style?: React.CSSProperties;
    aria?: string;
    children?: ReactNode;
    onMove?: (splide: any, newIndex: number, prevIndex: number, destIndex: number) => void;
    onMoved?: (splide: any, newIndex: number, prevIndex: number, destIndex: number) => void;
    onActive?: (splide: any, slide: any) => void;
    onInactive?: (splide: any, slide: any) => void;
    onVisible?: (splide: any, slide: any) => void;
    onHidden?: (splide: any, slide: any) => void;
    onRefresh?: (splide: any) => void;
    onUpdated?: (splide: any, options: Options) => void;
    onResize?: (splide: any) => void;
    onResized?: (splide: any) => void;
    onDrag?: (splide: any) => void;
    onDragging?: (splide: any) => void;
    onDragged?: (splide: any) => void;
    onScroll?: (splide: any) => void;
    onScrolled?: (splide: any) => void;
    onDestroy?: (splide: any) => void;
    onArrowsMounted?: (splide: any, prev: any, next: any) => void;
    onArrowsUpdated?: (splide: any, prev: any, next: any) => void;
    onPaginationMounted?: (splide: any, data: any, item: any) => void;
    onPaginationUpdated?: (splide: any, data: any, item: any) => void;
    onNavigationMounted?: (splide: any, splides: any[]) => void;
    onAutoplayPlaying?: (splide: any, rate: number) => void;
    onAutoplayPause?: (splide: any) => void;
    onAutoplayPlay?: (splide: any) => void;
    onLazyLoad?: (splide: any, img: any) => void;
    onLazyLoadLoaded?: (splide: any, img: any) => void;
    onLazyLoadError?: (splide: any, img: any) => void;
    [key: string]: any;
  }

  export interface SplideSlideProps {
    children?: ReactNode;
    className?: string;
    style?: React.CSSProperties;
    [key: string]: any;
  }

  export class Splide extends React.Component<SplideProps> {}
  export class SplideSlide extends React.Component<SplideSlideProps> {}
}

declare module '@splidejs/splide-extension-auto-scroll' {
  export const AutoScroll: any;
}
