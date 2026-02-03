"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Terminal, Menu, X } from "lucide-react";
import { useState, useEffect } from "react";

const navLinks = [
  { href: "/", label: "~/home" },
  { href: "/writeups", label: "~/writeups" },
  { href: "/research", label: "~/research" },
  { href: "/about", label: "~/about" },
];

export function Header() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 border-b transition-all duration-300 ${scrolled
          ? "border-border bg-background/95 backdrop-blur-lg shadow-lg shadow-black/5"
          : "border-transparent bg-transparent"
        }`}
    >
      <div className="mx-auto max-w-5xl px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="group flex items-center gap-3">
            <div className="relative flex h-10 w-10 items-center justify-center rounded-lg border border-primary/50 bg-primary/10 transition-all duration-300 group-hover:border-primary group-hover:bg-primary/20 group-hover:scale-110">
              <Terminal className="h-5 w-5 text-primary transition-transform duration-300 group-hover:rotate-12" />
              {/* Corner accents */}
              <div className="absolute -left-0.5 -top-0.5 h-2 w-2 border-l border-t border-primary/50 transition-all duration-300 group-hover:border-primary" />
              <div className="absolute -bottom-0.5 -right-0.5 h-2 w-2 border-b border-r border-primary/50 transition-all duration-300 group-hover:border-primary" />
            </div>
            <span className="text-lg font-semibold tracking-tight">
              <span className="text-primary transition-all duration-300 group-hover:text-shadow-glow">B</span>
              <span className="transition-colors duration-300 group-hover:text-primary">log</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:block">
            <ul className="flex items-center gap-1">
              {navLinks.map((link) => {
                const isActive =
                  pathname === link.href ||
                  (link.href !== "/" && pathname.startsWith(link.href));
                return (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className={`relative rounded-lg px-4 py-2 text-sm transition-all duration-300 ${isActive
                          ? "text-primary"
                          : "text-muted-foreground hover:text-foreground"
                        }`}
                    >
                      {/* Active indicator */}
                      {isActive && (
                        <span className="absolute inset-0 rounded-lg bg-primary/10 animate-fade-scale-in" />
                      )}
                      {/* Hover effect */}
                      <span className="absolute inset-0 rounded-lg bg-secondary opacity-0 transition-opacity hover:opacity-100" />
                      <span className="relative">{link.label}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Mobile Menu Button */}
          <button
            type="button"
            className="relative rounded-lg p-2 text-muted-foreground transition-all duration-300 hover:bg-secondary hover:text-foreground md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          >
            <span
              className={`block transition-all duration-300 ${mobileMenuOpen ? "rotate-180 scale-0 opacity-0" : "rotate-0 scale-100 opacity-100"
                }`}
            >
              <Menu className="h-5 w-5" />
            </span>
            <span
              className={`absolute inset-0 flex items-center justify-center transition-all duration-300 ${mobileMenuOpen ? "rotate-0 scale-100 opacity-100" : "-rotate-180 scale-0 opacity-0"
                }`}
            >
              <X className="h-5 w-5" />
            </span>
          </button>
        </div>

        {/* Mobile Navigation */}
        <div
          className={`grid transition-all duration-300 md:hidden ${mobileMenuOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
            }`}
        >
          <div className="overflow-hidden">
            <nav className="mt-4 border-t border-border pt-4">
              <ul className="flex flex-col gap-1">
                {navLinks.map((link, index) => {
                  const isActive =
                    pathname === link.href ||
                    (link.href !== "/" && pathname.startsWith(link.href));
                  return (
                    <li
                      key={link.href}
                      className="animate-type-in"
                      style={{ animationDelay: `${index * 50}ms` }}
                    >
                      <Link
                        href={link.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className={`flex items-center gap-3 rounded-lg px-4 py-3 text-sm transition-all duration-300 ${isActive
                            ? "bg-primary/10 text-primary"
                            : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                          }`}
                      >
                        <span className="text-primary">{">"}</span>
                        {link.label}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
}
