import Image from "next/image";

interface ProductImageUploadFieldProps {
  inputKey: number;
  previewUrl: string;
  error?: string;
  brandName: string;
  industry: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onBrandNameChange: (value: string) => void;
  onIndustryChange: (value: string) => void;
}

export function ProductImageUploadField({
  inputKey,
  previewUrl,
  error,
  brandName,
  industry,
  onChange,
  onBrandNameChange,
  onIndustryChange,
}: ProductImageUploadFieldProps) {
  return (
    <div className="grid gap-6 md:grid-cols-[minmax(0,1fr)_18rem]">
      <div className="space-y-4">
        <div className="space-y-2">
          <label htmlFor="productImage" className="text-sm font-medium">
            Product Image Upload
          </label>
          <input
            key={inputKey}
            id="productImage"
            type="file"
            accept="image/*"
            onChange={onChange}
            className="w-full cursor-pointer rounded-xl border border-zinc-300 px-3 py-2 text-sm file:mr-3 file:cursor-pointer file:rounded-md file:border-0 file:bg-zinc-900 file:px-3 file:py-1.5 file:text-white hover:file:bg-zinc-700 dark:border-zinc-700 dark:file:bg-zinc-100 dark:file:text-zinc-900"
          />
          {error ? <p className="text-sm text-red-600">{error}</p> : null}
        </div>

        <div className="space-y-2">
          <label htmlFor="brandName" className="text-sm font-medium">
            Brand Name
          </label>
          <input
            id="brandName"
            type="text"
            value={brandName}
            onChange={(event) => onBrandNameChange(event.target.value)}
            placeholder="Example: Nova Labs"
            className="w-full rounded-xl border border-zinc-300 bg-transparent px-3 py-2 text-sm outline-none focus:border-zinc-500 dark:border-zinc-700"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="industry" className="text-sm font-medium">
            Industry
          </label>
          <input
            id="industry"
            type="text"
            value={industry}
            onChange={(event) => onIndustryChange(event.target.value)}
            placeholder="Fashion, SaaS, Healthcare..."
            className="w-full rounded-xl border border-zinc-300 bg-transparent px-3 py-2 text-sm outline-none focus:border-zinc-500 dark:border-zinc-700"
          />
        </div>
      </div>

      <aside className="rounded-2xl border border-dashed border-zinc-300 bg-zinc-50 p-4 dark:border-zinc-700 dark:bg-zinc-900">
        <p className="mb-3 text-xs font-medium uppercase tracking-wide text-zinc-500">
          Product Image Preview
        </p>
        {previewUrl ? (
          <Image
            src={previewUrl}
            alt="Uploaded product image preview"
            width={320}
            height={192}
            className="h-48 w-full rounded-xl object-contain"
            unoptimized
          />
        ) : (
          <div className="flex h-48 items-center justify-center rounded-xl border border-zinc-200 bg-white text-sm text-zinc-500 dark:border-zinc-800 dark:bg-zinc-950">
            Upload a product image to preview
          </div>
        )}
      </aside>
    </div>
  );
}
