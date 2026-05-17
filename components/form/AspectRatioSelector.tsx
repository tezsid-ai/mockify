import type { AspectRatio } from "@/components/form/types";

interface AspectRatioSelectorProps {
  value: AspectRatio | "";
  onChange: (value: AspectRatio) => void;
}

export function AspectRatioSelector({
  value,
  onChange,
}: AspectRatioSelectorProps) {
  return (
    <div className="space-y-2">
      <p className="text-sm font-medium">Aspect Ratio</p>
      <div className="grid grid-cols-2 gap-2">
        <button
          type="button"
          onClick={() => onChange("16:9")}
          className={`rounded-xl border px-3 py-2 text-sm transition ${
            value === "16:9"
              ? "border-zinc-900 bg-zinc-900 text-white dark:border-zinc-100 dark:bg-zinc-100 dark:text-zinc-900"
              : "border-zinc-300 hover:border-zinc-500 dark:border-zinc-700"
          }`}
        >
          Landscape (16:9)
        </button>
        <button
          type="button"
          onClick={() => onChange("9:16")}
          className={`rounded-xl border px-3 py-2 text-sm transition ${
            value === "9:16"
              ? "border-zinc-900 bg-zinc-900 text-white dark:border-zinc-100 dark:bg-zinc-100 dark:text-zinc-900"
              : "border-zinc-300 hover:border-zinc-500 dark:border-zinc-700"
          }`}
        >
          Portrait (9:16)
        </button>
      </div>
    </div>
  );
}
