interface BrandMarkProps {
  compact?: boolean;
}

export function BrandMark({ compact = false }: BrandMarkProps) {
  const size = compact ? "h-8 w-8" : "h-10 w-10";

  return (
    <div
      className={`relative ${size} overflow-hidden rounded-lg border border-primary/40 bg-gradient-to-br from-primary/20 via-primary/10 to-transparent`}
      aria-hidden="true"
    >
      <span className="absolute inset-[6px] rounded-md border border-primary/35" />
      <span className="absolute left-[9px] top-1/2 h-px w-3 -translate-y-1/2 bg-primary/80" />
      <span className="absolute right-[8px] top-[10px] h-1.5 w-1.5 rounded-full bg-primary" />
      <span className="absolute bottom-[8px] right-[8px] h-1.5 w-1.5 rounded-full bg-primary/60" />
    </div>
  );
}
