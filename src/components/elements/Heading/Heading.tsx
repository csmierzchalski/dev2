import type { ReactNode } from "react";
import clsx from "clsx";

type HeadingVariant = "h1" | "h2" | "h3" | "h4";

interface HeadingProps {
  variant?: HeadingVariant;
  children: ReactNode;
  className?: string;
}

export function Heading({ variant = "h2", children, className }: HeadingProps) {
  const Tag = variant;

  return (
    <Tag
      className={clsx(
        "font-bold text-foreground",
        className,
      )}
    >
      {children}
    </Tag>
  );
}

