import type { MDXComponents } from "mdx/types";
import type { ComponentPropsWithoutRef } from "react";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    pre: (props: ComponentPropsWithoutRef<"pre">) => (
      <pre {...props} suppressHydrationWarning />
    ),
    ...components,
  };
}
