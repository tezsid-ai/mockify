import { AspectRatioSelector } from "@/components/form/AspectRatioSelector";
import type { AspectRatio } from "@/components/form/types";

interface MockupDetailsFieldsProps {
  productInfo: string;
  aspectRatio: AspectRatio;
  customPrompt: string;
  isEditPromptOpen: boolean;
  isSubmitting: boolean;
  isFormValid: boolean;
  submitError: string;
  onProductInfoChange: (value: string) => void;
  onAspectRatioChange: (value: AspectRatio) => void;
  onCustomPromptChange: (value: string) => void;
}

export function MockupDetailsFields({
  productInfo,
  aspectRatio,
  customPrompt,
  isEditPromptOpen,
  isSubmitting,
  isFormValid,
  submitError,
  onProductInfoChange,
  onAspectRatioChange,
  onCustomPromptChange,
}: MockupDetailsFieldsProps) {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <label htmlFor="productInfo" className="text-sm font-medium">
          Product Info
        </label>
        <textarea
          id="productInfo"
          rows={4}
          value={productInfo}
          onChange={(event) => onProductInfoChange(event.target.value)}
          placeholder="Describe your product and what should appear in the mockup."
          className="w-full rounded-xl border border-zinc-300 bg-transparent px-3 py-2 text-sm outline-none focus:border-zinc-500 dark:border-zinc-700"
        />
      </div>

      <AspectRatioSelector value={aspectRatio} onChange={onAspectRatioChange} />

        {isEditPromptOpen ? (
        <div className="space-y-2 w-full">
          <label htmlFor="customPrompt" className="text-sm font-medium">
            Custom Prompt
          </label>
          <textarea
            id="customPrompt"
            rows={4}
            value={customPrompt}
            onChange={(event) => onCustomPromptChange(event.target.value)}
            placeholder="Add your preferred styling or custom instructions..."
            className="w-full rounded-xl border border-zinc-300 bg-transparent px-3 py-2 text-sm outline-none focus:border-zinc-500 dark:border-zinc-700"
          />
        </div>
      ) : null}
      <div className="flex">
        <button
          type="submit"
          disabled={!isFormValid || isSubmitting}
          className="inline-flex h-11 items-center justify-center rounded-xl bg-zinc-900 px-4 text-sm font-medium text-white transition hover:bg-zinc-700 disabled:cursor-not-allowed disabled:opacity-60 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-300 sm:w-auto"
        >
          {isSubmitting ? "Generating..." : "Generate"}
        </button>
      </div>

      {/* {isEditPromptOpen ? (
        <div className="space-y-2">
          <label htmlFor="customPrompt" className="text-sm font-medium">
            Custom Prompt
          </label>
          <textarea
            id="customPrompt"
            rows={4}
            value={customPrompt}
            onChange={(event) => onCustomPromptChange(event.target.value)}
            placeholder="Add your preferred styling or custom instructions..."
            className="w-full rounded-xl border border-zinc-300 bg-transparent px-3 py-2 text-sm outline-none focus:border-zinc-500 dark:border-zinc-700"
          />
        </div>
      ) : null} */}

      {submitError ? (
        <p className="text-sm text-red-600">{submitError}</p>
      ) : null}
    </div>
  );
}
