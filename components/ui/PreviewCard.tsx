import Image from "next/image";
import type { AspectRatio } from "@/components/form/types";

interface PreviewCardProps {
  title: string;
  subtitle?: string;
  imageUrl: string | null;
  aspectRatio: AspectRatio;
  isLoading?: boolean;
  downloadFileName?: string;
}

export function PreviewCard({
  title,
  subtitle,
  imageUrl,
  aspectRatio,
  isLoading = false,
  downloadFileName = "generated-mockup.png",
}: PreviewCardProps) {
  const aspectClass = aspectRatio === "9:16" ? "aspect-[9/16]" : "aspect-video";

  return (
    <article className="space-y-4 rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
            {title}
          </h3>
          {subtitle ? (
            <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">
              {subtitle}
            </p>
          ) : null}
        </div>
        {imageUrl ? (
          <a
            href={imageUrl}
            download={downloadFileName}
            className="inline-flex h-9 items-center justify-center rounded-lg border border-zinc-300 px-3 text-xs font-medium text-zinc-700 transition hover:bg-zinc-100 dark:border-zinc-700 dark:text-zinc-200 dark:hover:bg-zinc-900"
          >
            Download
          </a>
        ) : null}
      </div>

      <div
        className={`relative overflow-hidden rounded-xl border border-zinc-200 ${aspectClass} dark:border-zinc-800`}
      >
        {isLoading ? (
          <div className="h-full w-full animate-pulse bg-zinc-200 dark:bg-zinc-800" />
        ) : imageUrl ? (
          <Image
            src={imageUrl}
            alt={title}
            fill
            className="object-contain"
            unoptimized
          />
        ) : (
          <div className="flex h-full items-center justify-center bg-zinc-50 text-sm text-zinc-500 dark:bg-zinc-900 dark:text-zinc-400">
            No generated image available.
          </div>
        )}
      </div>
    </article>
  );
}
