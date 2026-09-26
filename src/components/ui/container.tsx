import * as React from "react";
import { cn } from "@/lib/utils";

/** Page-width wrapper. Every top-level page section nests its content in one of these. */
function Container({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("mx-auto w-full max-w-[1312px] px-6 md:px-16", className)}
      {...props}
    />
  );
}

export { Container };
