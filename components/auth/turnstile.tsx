"use client";

import { useEffect, useRef, useState, forwardRef, useImperativeHandle } from "react";
import Script from "next/script";
import { useLocale } from "next-intl";

interface TurnstileProps {
  onSuccess: (token: string) => void;
  onExpire?: () => void;
  onError?: () => void;
}

export interface TurnstileRef {
  reset: () => void;
}

// Replaces Scandinavian/Cyrillic homoglyphs with standard ASCII characters
function sanitizeKey(key: string | null | undefined): string {
  if (!key) return "";
  let clean = key.trim();
  
  // Strip any wrapping single or double quotes
  if (clean.startsWith('"') && clean.endsWith('"')) {
    clean = clean.slice(1, -1);
  }
  if (clean.startsWith("'") && clean.endsWith("'")) {
    clean = clean.slice(1, -1);
  }
  
  // Replace Scandinavian slash O with standard zero
  if (clean.startsWith("Øx")) {
    clean = "0x" + clean.slice(2);
  }
  
  // Replace Cyrillic homoglyphs that look identical to ASCII characters (common copy-paste issue)
  const homoglyphs: Record<string, string> = {
    'А': 'A', // Cyrillic capital A
    'а': 'a', // Cyrillic small a
    'В': 'B', // Cyrillic capital Ve
    'Е': 'E', // Cyrillic capital E
    'е': 'e', // Cyrillic small e
    'К': 'K', // Cyrillic capital Ka
    'к': 'k', // Cyrillic small ka
    'М': 'M', // Cyrillic capital Em
    'Н': 'H', // Cyrillic capital En
    'О': 'O', // Cyrillic capital O
    'о': 'o', // Cyrillic small o
    'Р': 'P', // Cyrillic capital Er
    'р': 'p', // Cyrillic small er
    'С': 'C', // Cyrillic capital Es
    'с': 'c', // Cyrillic small es
    'Т': 'T', // Cyrillic capital Te
    'Х': 'X', // Cyrillic capital Kha
    'х': 'x', // Cyrillic small kha
  };
  
  return clean.split('').map(char => homoglyphs[char] || char).join('');
}

export const Turnstile = forwardRef<TurnstileRef, TurnstileProps>(
  ({ onSuccess, onExpire, onError }, ref) => {
    const locale = useLocale();
    const containerRef = useRef<HTMLDivElement>(null);
    const widgetIdRef = useRef<string | null>(null);
    const [scriptLoaded, setScriptLoaded] = useState(false);

    // Keep callbacks in refs to avoid re-triggering the useEffect hook when parent component rerenders
    const onSuccessRef = useRef(onSuccess);
    const onExpireRef = useRef(onExpire);
    const onErrorRef = useRef(onError);

    useEffect(() => {
      onSuccessRef.current = onSuccess;
      onExpireRef.current = onExpire;
      onErrorRef.current = onError;
    }, [onSuccess, onExpire, onError]);

    // Expose a programmatic reset method so parent forms can clear Turnstile on submit error or expiration
    useImperativeHandle(ref, () => ({
      reset: () => {
        if (widgetIdRef.current && (window as any).turnstile) {
          try {
            (window as any).turnstile.reset(widgetIdRef.current);
          } catch (err) {
            console.error("Failed to reset Turnstile widget:", err);
          }
        }
      },
    }));

    useEffect(() => {
      // Check if the script is already loaded globally on subsequent mounts
      if (typeof window !== "undefined" && (window as any).turnstile) {
        setScriptLoaded(true);
      }
    }, []);

    useEffect(() => {
      if (!scriptLoaded || !containerRef.current) return;

      const turnstile = (window as any).turnstile;
      if (!turnstile) return;

      const rawSiteKey = process.env.NEXT_PUBLIC_CLOUDFLARE_SITE_KEY;
      const siteKey = sanitizeKey(rawSiteKey);

      if (!siteKey) {
        console.warn("Turnstile: site key is missing (NEXT_PUBLIC_CLOUDFLARE_SITE_KEY)");
        return;
      }

      try {
        // Clean up any existing widget reference to prevent duplicates during Hot Module Replacement
        if (widgetIdRef.current) {
          turnstile.remove(widgetIdRef.current);
          widgetIdRef.current = null;
        }

        widgetIdRef.current = turnstile.render(containerRef.current, {
          sitekey: siteKey,
          language: locale,
          callback: (token: string) => {
            onSuccessRef.current(token);
          },
          "expired-callback": () => {
            if (onExpireRef.current) onExpireRef.current();
          },
          "error-callback": () => {
            if (onErrorRef.current) onErrorRef.current();
          },
          theme: "light",
        });
      } catch (err) {
        console.error("Failed to render Turnstile widget:", err);
      }

      return () => {
        if (widgetIdRef.current && (window as any).turnstile) {
          try {
            (window as any).turnstile.remove(widgetIdRef.current);
          } catch (e) {
            // ignore
          }
        }
      };
    }, [scriptLoaded]);

    return (
      <div className="flex justify-center my-4 w-full min-h-[65px]">
        <Script
          src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit"
          onLoad={() => setScriptLoaded(true)}
          async
          defer
        />
        <div ref={containerRef} />
      </div>
    );
  }
);

Turnstile.displayName = "Turnstile";

