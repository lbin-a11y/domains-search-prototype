import { useEffect, useRef, useState } from 'react';

type Props = {
  threshold?: number;
  triggerOnce?: boolean;
  skip?: boolean;
};

const useIntersectionObserver = ({
  threshold = 0.1,
  triggerOnce = false,
  skip = false,
}: Props) => {
  const ref = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);

  const observerRef = useRef<IntersectionObserver | undefined>((() => {
    if ('IntersectionObserver' in window) {
      return new window.IntersectionObserver(([entry]) => {
        if (entry) {
          const isInView = entry.isIntersecting && entry.intersectionRatio > threshold;
          setInView(isInView);
          if (isInView && triggerOnce) {
            observerRef.current?.disconnect();
          }
        }
      }, { threshold });
    }
  })());

  useEffect(() => {
    const observer = observerRef.current;
    if (ref.current && !skip) {
      observer?.observe(ref.current);
      return () => observer?.disconnect();
    }
  }, [skip, ref]);

  return { inView, ref };
};

export default useIntersectionObserver;
