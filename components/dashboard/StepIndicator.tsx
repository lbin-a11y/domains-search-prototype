import type { CheckoutStep } from '@/lib/types';

interface Props {
  steps: CheckoutStep[];
  currentStep: string;
}

export function StepIndicator({ steps, currentStep }: Props) {
  return (
    <div className="flex items-center gap-0 mb-8">
      {steps.map((step, i) => {
        const isCurrent = step.id === currentStep;
        const isDone = step.isComplete;

        return (
          <div key={step.id} className="flex items-center">
            <div className="flex items-center gap-2">
              <div
                className={`w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-medium transition-colors ${
                  isDone
                    ? 'bg-[var(--sq-green-fg)] text-white'
                    : isCurrent
                    ? 'bg-black text-white'
                    : 'bg-[var(--sq-gray-01)] text-[var(--sq-gray-02)]'
                }`}
              >
                {isDone ? '✓' : i + 1}
              </div>
              <span
                className={`text-[12px] uppercase tracking-[0.04em] font-medium ${
                  isCurrent ? 'text-black' : 'text-[var(--sq-gray-02)]'
                }`}
              >
                {step.label}
              </span>
            </div>
            {i < steps.length - 1 && (
              <div className="w-8 h-px bg-[var(--sq-gray-01)] mx-3" />
            )}
          </div>
        );
      })}
    </div>
  );
}
