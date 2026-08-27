import { context, trace } from '@opentelemetry/api';
import type { Span } from '@opentelemetry/api';
// import sentry from './globalSentry';
import { WIDGET_SCOPE_SPANS } from '../components/tracingConstants';

export type MarkMeasure = {
  mark: () => void;
  measure: () => void;
  discard: () => void;
};

const getNow = () => performance.timeOrigin + performance.now();

const currentSpans: Record<string, Span> = {};
const getSpanKey = (name: string, attributes: Record<string, string>) => {
  return `${name}-${JSON.stringify(attributes)}`;
};
// Exported for testing - It's possible we'll need generic mark/measure functionality in the dashboard
// And it felt valuable to separate the concerns from the more dashboard-opinionated getMarkMeasure function below
// But, we should probably not be using this directly in the dashboard code.
export function getGenericMarkMeasure(name: string, attributes: Record<string, string>, parent?: {
  name: string,
  attributes: Record<string, string>,
}): MarkMeasure {
  const getSpan = () => {
    return currentSpans[getSpanKey(name, attributes)];
  };
  let isMarked = false,
    isMeasured = false;
  return {
    mark: () => {
      const existingSpan = getSpan();
      if (existingSpan === undefined && !isMarked) {
        const tracer = trace.getTracer('default');
        const parentSpan = parent && currentSpans[getSpanKey(parent.name, parent.attributes)];
        const parentContext = parentSpan && trace.setSpan(context.active(), parentSpan);
        isMarked = true;
        currentSpans[getSpanKey(name, attributes)] = tracer.startSpan(name, {
          startTime: getNow(),
        }, parentContext);
      }
    },
    measure: () => {
      const existingSpan = getSpan();
      if (isMeasured) {
        return;
      }
      if (!existingSpan) {
        // [inc-20260708-coe-5728] Temporarily disabled
        // sentry.withSquarespaceScope(() => {
        //   sentry.captureException(
        //     new Error(`No mark() called before measure() for ${name}`)
        //   );
        // });
        return;
      }
      const endMark = getNow();
      existingSpan.setAttributes(attributes);
      isMeasured = true;
      delete currentSpans[getSpanKey(name, attributes)];
      existingSpan.end(endMark);
    },
    discard: () => {
      const existingSpan = getSpan();
      if (existingSpan) {
        delete currentSpans[getSpanKey(name, attributes)];
      }
    }
  };
}
// exported for testing
export function getAttributesForSpan(name: string, dashboardKey: string, widgetKey?: string): Record<string, string> {
  return WIDGET_SCOPE_SPANS.includes(name) ? {
    'dashboard.key': dashboardKey,
    'widget.key': widgetKey!,
  } : {
    'dashboard.key': dashboardKey,
  };
}

// Define a tuple type for the keys parameter
export type Keys = [dashboardKey: string, widgetKey?: string];

export function getMarkMeasure(name: string, keys: Keys, parentName?: string): MarkMeasure {
  const [dashboardKey, widgetKey] = keys;
  const attributes = getAttributesForSpan(name, dashboardKey, widgetKey);
  const parentAttributes = parentName ? getAttributesForSpan(parentName, dashboardKey, widgetKey) : {};
  return parentName ?
    getGenericMarkMeasure(name, attributes, {
      name: parentName,
      attributes: parentAttributes
    }) :
    getGenericMarkMeasure(name, attributes);
}
