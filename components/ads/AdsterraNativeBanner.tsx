"use client";

import { useEffect, useRef, useState } from "react";

type AdsterraNativeBannerProps = {
  scriptSrc: string;
  containerId: string;
  className?: string;
  innerClassName?: string;
  minHeightClassName?: string;
  label?: string;
  desktopOnly?: boolean;
};

const combineClassNames = (
  ...classes: Array<string | false | null | undefined>
): string =>
  classes
    .filter((className): className is string => Boolean(className))
    .join(" ");

export function AdsterraNativeBanner({
  scriptSrc,
  containerId,
  className,
  innerClassName,
  minHeightClassName = "min-h-[150px]",
  label = "Advertisement",
  desktopOnly = false,
}: AdsterraNativeBannerProps) {
  const wrapperRef = useRef<HTMLElement | null>(null);
  const [canLoad, setCanLoad] = useState(false);

  useEffect(() => {
    const wrapper = wrapperRef.current;

    if (!wrapper) {
      return;
    }

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
        rootMargin: "350px 0px",
      },
    );

    observer.observe(wrapper);

    return () => {
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    const hasInvalidConfig =
      !scriptSrc.trim() ||
      !containerId.trim() ||
      scriptSrc.includes("PASTE_") ||
      containerId.includes("PASTE_");

    if (!canLoad || hasInvalidConfig) {
      return;
    }

    const scriptId = `adsterra-native-${containerId}`;
    const oldScript = document.getElementById(scriptId);

    oldScript?.remove();

    const script = document.createElement("script");
    script.id = scriptId;
    script.async = true;
    script.src = scriptSrc;
    script.setAttribute("data-cfasync", "false");

    document.body.appendChild(script);

    return () => {
      const currentScript = document.getElementById(scriptId);
      currentScript?.remove();
    };
  }, [canLoad, containerId, scriptSrc]);

  return (
    <section
      ref={wrapperRef}
      aria-label={label}
      className={combineClassNames(
        desktopOnly && "hidden lg:block",
        "w-full overflow-hidden rounded-2xl border border-white/5 bg-[#10231D]/80 p-3",
        minHeightClassName,
        className,
      )}
    >
      <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-white/35">
        {label}
      </p>

      <div
        id={containerId}
        className={combineClassNames("w-full overflow-hidden", innerClassName)}
      />
    </section>
  );
}
