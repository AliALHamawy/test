import Link from "next/link";

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <Link href="/" className="text-lg font-semibold tracking-tight">
          iPhone Duo
        </Link>
        <nav className="hidden gap-8 text-sm md:flex">
          <Link href="#features" className="text-muted-foreground hover:text-foreground">
            Features
          </Link>
          <Link href="#specs" className="text-muted-foreground hover:text-foreground">
            Specs
          </Link>
          <Link href="#gallery" className="text-muted-foreground hover:text-foreground">
            Gallery
          </Link>
        </nav>
        <Link
          href="#cta"
          className="rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground"
        >
          Buy
        </Link>
      </div>
    </header>
  );
}
