import Link from "next/link";
import { ThemeToggle } from "@/components/theme-toggle";

function HeaderTopRowContent() {
  const navItems = [
    { href: "/", label: "Home" },
    { href: "/writeups", label: "Blog" },
    { href: "/research", label: "Work" },
    { href: "/about", label: "About" },
  ];

  return (
    <div className="flex flex-col gap-6 border-b border-border/70 pb-6 md:flex-row md:items-end md:justify-between">
      <div className="space-y-2">
        <p className="eyebrow">Security notes and writeups</p>
        <h1 className="display-type text-[2rem] leading-none tracking-[-0.04em] text-foreground sm:text-[2.4rem]">
          <Link href="/" className="hover:text-primary">
            rzyux
          </Link>
        </h1>
      </div>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between md:justify-end">
        <nav className="flex flex-wrap gap-2 text-base text-muted-foreground">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className="glass-button">
              {item.label}
            </Link>
          ))}
        </nav>
        <ThemeToggle />
      </div>
    </div>
  );
}

export function HeaderTopRow({ sticky = false }: { sticky?: boolean }) {
  const content = <HeaderTopRowContent />;

  if (sticky) {
    return <div className="sticky top-0 z-40 bg-transparent backdrop-blur-md">{content}</div>;
  }

  return content;
}

export function HeaderIntro() {
  return (
    <p className="mt-4 max-w-2xl text-sm leading-7 text-muted-foreground">
      A quieter, editorial home for CTF writeups, research notes, and the occasional deep dive into how things break.
    </p>
  );
}

export function Header() {
  return (
    <header className="mb-12">
      <HeaderTopRow />
      <HeaderIntro />
    </header>
  );
}
