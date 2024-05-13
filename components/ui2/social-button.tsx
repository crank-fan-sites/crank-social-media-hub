import React from "react";
import { twMerge } from "tailwind-merge";
import Image from "next/image";

const SocialButton = ({
  link,
  text,
  iconSrc,
  iconAlt,
  className,
  target,
  external,
}) => {
  const mergedClassNames = twMerge(
    "inline-flex items-center px-3 py-2 text-sm font-medium leading-4 text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 text-white my-3 mx-auto",
    className
  );
  if (target != "_blank") {
    target = "_self";
  }

  return (
    // <div className="flex flex-col items-center">
    <div className="flex justify-center">
      <a className={mergedClassNames} href={link} target={target}>
        <Image
          className="pt-0 pl-0 pr-2"
          aria-hidden="true"
          src={`/img/${iconSrc}`}
          alt={`/img/${iconAlt} Logo`}
          width={24}
          height={24}
        />
        {text}
      </a>
    </div>
  );
};

interface ButtonProps {
  url: string;
  title?: string;
  target?: string;
  external?: boolean;
}

export default SocialButton;
export type { ButtonProps };
