import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Container({ className, ...props }: ComponentProps<"div">) {
  return (
    <div className={cn("mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8", className)} {...props} />
  );
}

export function Eyebrow({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <p className={cn("text-primary text-sm font-semibold tracking-wide uppercase", className)}>
      {children}
    </p>
  );
}

type SectionProps = {
  eyebrow?: string;
  title?: string;
  description?: string;
  align?: "left" | "center";
  tone?: "default" | "muted";
  id?: string;
  className?: string;
  children?: ReactNode;
};

/** Standard page section: optional eyebrow/title/description header, then free-form content. */
export function Section({
  eyebrow,
  title,
  description,
  align = "left",
  tone = "default",
  id,
  className,
  children,
}: SectionProps) {
  return (
    <section
      id={id}
      className={cn(
        "py-16 sm:py-20",
        tone === "muted" && "bg-muted/50 border-border border-y",
        className,
      )}
    >
      <Container>
        {(eyebrow || title || description) && (
          <div className={cn("mb-10 max-w-2xl", align === "center" && "mx-auto text-center")}>
            {eyebrow ? <Eyebrow>{eyebrow}</Eyebrow> : null}
            {title ? (
              <h2 className="mt-2 text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
                {title}
              </h2>
            ) : null}
            {description ? (
              <p className="text-muted-foreground mt-4 text-lg text-pretty">{description}</p>
            ) : null}
          </div>
        )}
        {children}
      </Container>
    </section>
  );
}

/** Top-of-page hero used by every inner page. */
export function PageHero({
  eyebrow,
  title,
  description,
  actions,
}: {
  eyebrow?: string;
  title: string;
  description: string;
  actions?: ReactNode;
}) {
  return (
    <div className="border-border relative overflow-hidden border-b">
      <div className="bg-hero absolute inset-0 -z-10" aria-hidden />
      <Container className="py-16 sm:py-24">
        <div className="max-w-3xl">
          {eyebrow ? <Eyebrow>{eyebrow}</Eyebrow> : null}
          <h1 className="mt-3 text-4xl font-semibold tracking-tight text-balance sm:text-5xl">
            {title}
          </h1>
          <p className="text-muted-foreground mt-5 text-lg text-pretty sm:text-xl">{description}</p>
          {actions ? <div className="mt-8 flex flex-wrap gap-3">{actions}</div> : null}
        </div>
      </Container>
    </div>
  );
}
