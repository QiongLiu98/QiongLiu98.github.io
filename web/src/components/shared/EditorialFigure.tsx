import Image from "next/image";

export function EditorialFigure({
  src,
  alt,
  caption,
  source,
  fit = "contain",
  aspect = "video",
}: {
  src: string;
  alt: string;
  caption?: string;
  source?: string;
  fit?: "cover" | "contain";
  aspect?: "video" | "square" | "portrait" | "auto";
}) {
  const aspectClass = {
    video: "aspect-video",
    square: "aspect-square",
    portrait: "aspect-[3/4]",
    auto: "aspect-[4/3]",
  }[aspect];

  return (
    <figure>
      <div
        className={`relative w-full overflow-hidden rounded-sm border border-[var(--color-rule)] ${aspectClass} ${
          fit === "contain" ? "bg-[var(--color-ink)]" : "bg-[var(--color-paper-warm)]"
        }`}
      >
        <Image
          src={src}
          alt={alt}
          fill
          className={`${fit === "contain" ? "object-contain p-3" : "object-cover"} object-center`}
          sizes="(max-width: 768px) 100vw, 800px"
        />
      </div>
      {(caption || source) && (
        <figcaption className="mt-3 space-y-1">
          {caption && (
            <p className="font-serif text-sm italic leading-relaxed text-[var(--color-muted)]">
              {caption}
            </p>
          )}
          {source && (
            <p className="text-xs text-[var(--color-muted-soft)]">{source}</p>
          )}
        </figcaption>
      )}
    </figure>
  );
}
