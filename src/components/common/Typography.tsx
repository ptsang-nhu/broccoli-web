import { twMerge } from "tailwind-merge";

import { ComponentPropsWithoutRef } from "react";

export const H1 = ({ className, ...props }: ComponentPropsWithoutRef<"h1">) => (
  <h1
    className={twMerge(
      "text-4xl tracking-tighter text-balance max-lg:font-medium sm:text-5xl lg:text-6xl xl:text-8xl",
      className,
    )}
    {...props}
  />
);

export const Text = ({
  className,
  ...props
}: ComponentPropsWithoutRef<"p">) => (
  <p
    className={twMerge(
      "text-lg/7 font-medium text-gray-600 dark:text-gray-300",
      className,
    )}
    {...props}
  />
);

export const FooterText = ({
  className,
  ...props
}: ComponentPropsWithoutRef<"p">) => (
  <p
    className={twMerge(
      "text-sm text-gray-600 md:text-base dark:text-gray-400",
      className,
    )}
    {...props}
  />
);
