import { useEffect, useRef, useState } from "react";

// Hook for intersection observer: returns ref, inView boolean
export function useInViewSection(options = {}) {
  const ref = useRef();
  const [inView, setInView] = useState(false);

  useEffect(() => {
    if (!ref.current) return;
    const obs = new window.IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setInView(true);
      },
      { threshold: 0.2, ...options }
    );
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, [options]);

  return [ref, inView];
}
