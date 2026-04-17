export function TerminalHero() {
  return (
    <section className="mx-auto max-w-3xl animate-fade-in px-6 py-12 md:py-20">
      <div className="flex flex-col gap-4">
        <h1 className="display-type text-3xl tracking-tight text-foreground md:text-4xl">
          rzyux
        </h1>
        <p className="text-sm font-mono tracking-wide text-muted-foreground">
          security notes, writeups, and research
        </p>
        <p className="mt-4 max-w-prose leading-relaxed text-foreground">
          Welcome to my blog. I write about security research, CTF challenges, and
          occasional deep dives into software vulnerability structures. Check below
          to see my socials!
        </p>
      </div>
    </section>
  );
}
