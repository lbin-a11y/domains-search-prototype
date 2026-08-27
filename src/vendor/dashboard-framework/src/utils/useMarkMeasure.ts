import { useRef, useEffect } from 'react';
import { getMarkMeasure, Keys, MarkMeasure } from './getMarkMeasure';

/**
 * Hook for managing lifecycle of a MarkMeasure object, ensuring it gets cleaned up upon component unmount
 */
export default function useMarkMeasure(spanName: string, keys: Keys, parentSpanName?: string) {
  const markAndMeasure = useRef<MarkMeasure>(getMarkMeasure(spanName, keys, parentSpanName ));

  useEffect(() => {
    const currentMark = markAndMeasure.current;
    return () => {
      currentMark?.discard();
    };
  }, []);
  return markAndMeasure.current;
}
