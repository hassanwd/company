"use client";

import { ChevronDown, Menu, Sparkles, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MAIN_NAV, SITE } from "@/content/site";
import { SOLUTIONS, solutionHref } from "@/content/solutions";
import { cn } from "@/lib/utils";
import { Container } from "./primitives";

export function Logo({ className }: { className?: string }) {
  return (
    <span className={cn("flex items-center gap-2 font-semibold tracking-tight", className)}>
      <span className="bg-primary text-primary-foreground flex size-8 items-center justify-center rounded-lg">
        <Sparkles className="size-4" aria-hidden />
      </span>
      {SITE.name}
    </span>
  );
}

const linkClass = (active: boolean) =>
  cn(
    "rounded-md px-3 py-2 text-sm font-medium transition-colors",
    active ? "text-foreground" : "text-muted-foreground hover:text-foreground",
  );

export function SiteHeader() {
  const pathname = usePathname();
  // The menu is "open" only for the path it was opened on, so navigating closes it for free.
  const [openOnPath, setOpenOnPath] = useState<string | null>(null);
  const open = openOnPath === pathname;

  const inSolutions = pathname.startsWith("/solutions");

  return (
    <header className="border-border bg-background/85 sticky top-0 z-40 border-b backdrop-blur">
      <Container className="flex h-16 items-center justify-between">
        <Link href="/" aria-label={`${SITE.name} home`}>
          <Logo />
        </Link>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Main">
          <DropdownMenu>
            <DropdownMenuTrigger
              className={cn(linkClass(inSolutions), "inline-flex items-center gap-1 outline-none")}
            >
              Solutions <ChevronDown className="size-3.5" aria-hidden />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-72 p-2">
              {SOLUTIONS.map(({ slug, name, tagline, icon: Icon }) => (
                <DropdownMenuItem key={slug} asChild className="items-start gap-3 p-2">
                  <Link href={solutionHref(slug)}>
                    <Icon className="text-primary mt-0.5 size-5 shrink-0" aria-hidden />
                    <span>
                      <span className="block font-medium">{name}</span>
                      <span className="text-muted-foreground block text-xs">{tagline}</span>
                    </span>
                  </Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          {MAIN_NAV.map(({ label, href }) => (
            <Link
              key={href}
              href={href}
              className={linkClass(pathname === href)}
              aria-current={pathname === href ? "page" : undefined}
            >
              {label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Button asChild className="hidden sm:inline-flex">
            <Link href="/contact">Book a demo</Link>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpenOnPath(open ? null : pathname)}
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </Button>
        </div>
      </Container>

      {open && (
        <nav
          id="mobile-nav"
          aria-label="Mobile"
          className="border-border bg-background border-t lg:hidden"
        >
          <Container className="flex flex-col gap-1 py-4">
            <p className="text-muted-foreground px-3 text-xs font-semibold uppercase">Solutions</p>
            {SOLUTIONS.map(({ slug, name }) => (
              <Link
                key={slug}
                href={solutionHref(slug)}
                className={linkClass(pathname === solutionHref(slug))}
              >
                {name}
              </Link>
            ))}
            <p className="text-muted-foreground mt-3 px-3 text-xs font-semibold uppercase">
              Company
            </p>
            {MAIN_NAV.map(({ label, href }) => (
              <Link key={href} href={href} className={linkClass(pathname === href)}>
                {label}
              </Link>
            ))}
            <Button asChild className="mt-4">
              <Link href="/contact">Book a demo</Link>
            </Button>
          </Container>
        </nav>
      )}
    </header>
  );
}
