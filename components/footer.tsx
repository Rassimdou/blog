import Link from "next/link";

export function Footer() {
  return (
    <footer className="mt-14 border-t border-border/80 pt-6">
      <div className="flex flex-col gap-3 text-sm text-muted-foreground md:flex-row md:items-center md:justify-between">
        <p>Built for readable notes, clean archives, and slower browsing.</p>
        <p className="text-base text-muted-foreground">
          Inspired by{" "}
          <Link
            href="https://enscribe.dev/"
            className="hover:text-foreground"
            target="_blank"
            rel="noreferrer"
          >
            enscribe.dev
          </Link>
        </p>
      </div>
    </footer>
  );
}
