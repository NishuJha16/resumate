import { useLayoutEffect, useRef, useState, useCallback } from "react";

export function useScaleToFit() {
  const outerRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState<number>(600);

  const calculateWidth = useCallback(() => {
    const outer = outerRef.current;
    const inner = innerRef.current;

    if (outer && inner) {
      const outerWidth = outer.offsetWidth;
      const innerWidth = inner.scrollWidth || 600;
      const scale = outerWidth / innerWidth;
      const newWidth = innerWidth * (scale < 1 ? scale : 1);
      setWidth(Math.floor(newWidth));
    }
  }, []);

  useLayoutEffect(() => {
    const resizeObserver = new ResizeObserver(calculateWidth);
    const mutationObserver = new MutationObserver(calculateWidth);

    if (outerRef.current) resizeObserver.observe(outerRef.current);
    if (innerRef.current) {
      resizeObserver.observe(innerRef.current);
      mutationObserver.observe(innerRef.current, {
        childList: true,
        subtree: true,
      });
    }

    window.addEventListener("resize", calculateWidth);
    requestAnimationFrame(() => requestAnimationFrame(calculateWidth));

    return () => {
      resizeObserver.disconnect();
      mutationObserver.disconnect();
      window.removeEventListener("resize", calculateWidth);
    };
  }, [calculateWidth]);

  return { outerRef, innerRef, width, calculateWidth };
}
