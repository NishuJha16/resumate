import { useLayoutEffect, useRef, useState, useCallback } from "react";

export function useScaleToFit() {
  const outerRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState<number>(600);

  const calculateWidth = useCallback(() => {
    const outer = outerRef.current;
    const canvas = innerRef.current?.querySelector("canvas");

    if (outer && canvas) {
      const outerWidth = outer.offsetWidth;
      const canvasWidth = canvas.offsetWidth || 600;

      const scale = outerWidth / canvasWidth;
      const newWidth = canvasWidth * (scale < 1 ? scale : 1);

      setWidth(Math.floor(newWidth));
    }
  }, []);

  useLayoutEffect(() => {
    const resizeObserver = new ResizeObserver(() => {
      requestAnimationFrame(() => calculateWidth());
    });

    if (outerRef.current) resizeObserver.observe(outerRef.current);

    window.addEventListener("resize", calculateWidth);
    requestAnimationFrame(() => calculateWidth());

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("resize", calculateWidth);
    };
  }, [calculateWidth]);

  return { outerRef, innerRef, width, calculateWidth };
}
