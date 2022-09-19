import { useEffect, useRef } from "react";

export function useDetectClickOutside(callback, initial = null) {
  const elementRef = useRef(initial);
  useEffect(() => {
    function handler(event) {
      if (!elementRef.current?.contains(event.target)) {
        callback();
      }
    }
    window.addEventListener("click", handler);
    return () => window.removeEventListener("click", handler);
  }, [callback]);
  return elementRef;
}
