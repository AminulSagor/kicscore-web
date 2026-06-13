"use client";

import { useEffect, useRef, useState } from "react";

type AdsterraBannerAdProps = {
  adKey: string;
  width: number;
  height: number;
  className?: string;
};

type AdsterraOptions = {
  key: string;
  format: "iframe";
  height: number;
  width: number;
  params: Record<string, never>;
};

declare global {
  interface Window {
    atOptions?: AdsterraOptions;
  }
}

let bannerLoadQueue: Promise<void> = Promise.resolve();

const combineClassNames = (
  ...classes: Array<string | false | null | undefined>
): string =>
  classes
    .filter((className): className is string => Boolean(className))
    .join(" ");

const enqueueBannerLoad = (task: () => Promise<void>) => {
  bannerLoadQueue = bannerLoadQueue.then(task).catch(() => undefined);
  return bannerLoadQueue;
};

export function AdsterraBannerAd({
  adKey,
  width,
  height,
  className,
}: AdsterraBannerAdProps) {
  const wrapperRef = useRef<HTMLElement | null>(null);
  const slotRef = useRef<HTMLDivElement | null>(null);
  const [canLoad, setCanLoad] = useState(false);

  useEffect(() => {
    const wrapper = wrapperRef.current;

    if (!wrapper) return;

    if (!("IntersectionObserver" in window)) {
      setCanLoad(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setCanLoad(true);
          observer.disconnect();
        }
      },
      {
        rootMargin: "300px 0px",
      },
    );

    observer.observe(wrapper);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!canLoad || !adKey.trim()) return;

    let isCancelled = false;

    enqueueBannerLoad(
      () =>
        new Promise<void>((resolve) => {
          const slot = slotRef.current;

          if (!slot || isCancelled) {
            resolve();
            return;
          }

          slot.innerHTML = "";

          window.atOptions = {
            key: adKey,
            format: "iframe",
            height,
            width,
            params: {},
          };

          const script = document.createElement("script");
          script.src = `https://www.highperformanceformat.com/${adKey}/invoke.js`;
          script.async = false;

          const timeout = window.setTimeout(() => {
            resolve();
          }, 3500);

          script.onload = () => {
            window.clearTimeout(timeout);
            window.setTimeout(resolve, 300);
          };

          script.onerror = () => {
            window.clearTimeout(timeout);
            resolve();
          };

          slot.appendChild(script);
        }),
    );

    return () => {
      isCancelled = true;
      slotRef.current?.replaceChildren();
    };
  }, [adKey, canLoad, height, width]);

  return (
    <section
      ref={wrapperRef}
      aria-label="Advertisement"
      className={combineClassNames(
        "flex w-full justify-center overflow-hidden rounded-2xl border border-white/5 bg-[#10231D]/80 px-0 py-3",
        className,
      )}
      style={{
        minHeight: height + 34,
      }}
    >
      <div className="max-w-full overflow-hidden">
        <p className="mb-2 text-center text-[10px] font-semibold uppercase tracking-[0.2em] text-white/35">
          Advertisement
        </p>

        <div
          ref={slotRef}
          style={{
            width,
            height,
            maxWidth: "100%",
          }}
        />
      </div>
    </section>
  );
}
