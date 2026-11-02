"use client";

import { ChevronDown, Menu, X, type LucideIcon } from "lucide-react";
import type { Route } from "next";
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
import { COMPANY_NAV, PLATFORM_NAV, POC_NAV, type NavLink } from "@/content/site";
import { SOLUTIONS, solutionHref } from "@/content/solutions";
import { cn } from "@/lib/utils";
import { Logo } from "./logo";
import { Container } from "./primitives";

const linkClass = (active: boolean) =>
  cn(
    "rounded-md px-3 py-2 text-sm font-medium transition-colors focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none",
    active ? "text-foreground" : "text-muted-foreground hover:text-foreground",
  );

type MenuItem = { label: string; href: Route; description?: string; icon?: LucideIcon };

const SOLUTION_ITEMS: MenuItem[] = SOLUTIONS.map(({ slug, name, tagline, icon }) => ({
  label: name,
  href: solutionHref(slug),
  description: tagline,
  icon,
}));

const toItems = (links: NavLink[]): MenuItem[] => links;

const MENUS: { label: string; items: MenuItem[]; prefixes: string[] }[] = [
  { label: "Solutions", items: SOLUTION_ITEMS, prefixes: ["/solutions"] },
  {
    label: "Platform",
    items: toItems(PLATFORM_NAV),
    prefixes: PLATFORM_NAV.map((link) => link.href),
  },
];

const COMPANY_MENU = {
  label: "Company",
  items: toItems(COMPANY_NAV),
  prefixes: COMPANY_NAV.map((link) => link.href),
};

const inSection = (pathname: string, prefixes: string[]) =>
  prefixes.some((prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`));

function NavDropdown({
  label,
  items,
  active,
}: {
  label: string;
  items: MenuItem[];
  active: boolean;
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className={cn(linkClass(active), "inline-flex items-center gap-1")}
        aria-current={active ? "true" : undefined}
      >
        {label} <ChevronDown className="size-3.5" aria-hidden />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-72 p-2">
        {items.map(({ label: itemLabel, href, description, icon: Icon }) => (
          <DropdownMenuItem key={href} asChild className="items-start gap-3 p-2">
            <Link href={href}>
              {Icon ? <Icon className="text-primary mt-0.5 size-5 shrink-0" aria-hidden /> : null}
              <span>
                <span className="block font-medium">{itemLabel}</span>
                {description ? (
                  <span className="text-muted-foreground block text-xs">{description}</span>
                ) : null}
              </span>
            </Link>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export function SiteHeader() {
  const pathname = usePathname();
  // The menu is "open" only for the path it was opened on, so navigating closes it for free.
  const [openOnPath, setOpenOnPath] = useState<string | null>(null);
  const open = openOnPath === pathname;

  return (
    <header className="border-border bg-background/85 sticky top-0 z-40 border-b backdrop-blur">
      <Container className="flex h-16 items-center justify-between">
        <Link
          href="/"
          aria-label="Home"
          className="focus-visible:ring-ring rounded-md focus-visible:ring-2 focus-visible:outline-none"
        >
          <Logo />
        </Link>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Main">
          {MENUS.map(({ label, items, prefixes }) => (
            <NavDropdown
              key={label}
              label={label}
              items={items}
              active={inSection(pathname, prefixes)}
            />
          ))}
          <Link
            href={POC_NAV.href}
            className={linkClass(pathname === POC_NAV.href)}
            aria-current={pathname === POC_NAV.href ? "page" : undefined}
          >
            {POC_NAV.label}
          </Link>
          <NavDropdown
            label={COMPANY_MENU.label}
            items={COMPANY_MENU.items}
            active={inSection(pathname, COMPANY_MENU.prefixes)}
          />
        </nav>

        <div className="flex items-center gap-2">
          <Button asChild className="hidden sm:inline-flex">
            <Link href="/contact" data-cta="header">
              Book a demo
            </Link>
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
          className="border-border bg-background max-h-[calc(100dvh-4rem)] overflow-y-auto border-t lg:hidden"
        >
          <Container className="flex flex-col gap-1 py-4">
            {MENUS.map(({ label, items }) => (
              <div key={label} className="flex flex-col gap-1">
                <p className="text-muted-foreground mt-2 px-3 text-xs font-semibold uppercase first:mt-0">
                  {label}
                </p>
                {items.map(({ label: itemLabel, href }) => (
                  <Link key={href} href={href} className={linkClass(pathname === href)}>
                    {itemLabel}
                  </Link>
                ))}
              </div>
            ))}
            <Link href={POC_NAV.href} className={cn(linkClass(pathname === POC_NAV.href), "mt-2")}>
              {POC_NAV.label}
            </Link>
            <p className="text-muted-foreground mt-2 px-3 text-xs font-semibold uppercase">
              {COMPANY_MENU.label}
            </p>
            {COMPANY_MENU.items.map(({ label, href }) => (
              <Link key={href} href={href} className={linkClass(pathname === href)}>
                {label}
              </Link>
            ))}
            <Button asChild className="mt-4">
              <Link href="/contact" data-cta="mobile-menu">
                Book a demo
              </Link>
            </Button>
          </Container>
        </nav>
      )}
    </header>
  );
}
