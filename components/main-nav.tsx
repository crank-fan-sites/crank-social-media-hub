import * as React from "react";
import { useEffect, useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Icons } from "./icons";

import { useRouter } from "next/router";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function MainNav({ links }: { links: any[] }) {
  const router = useRouter();

  return (
    <>
      <div className="hidden md:flex md:pl-4 gap-6 md:gap-10">
        {links?.length ? (
          <nav className="flex gap-6">
            {links?.map(
              (item, index) =>
                item.url && (
                  <Link
                    key={index}
                    href={item.url}
                    target={item.target || undefined}
                    className={cn(
                      "flex items-center text-sm font-light uppercase underline-offset-4 hover:underline"
                    )}
                  >
                    {item.title}
                    {item.external && (
                      <Icons.arrowUpRight
                        strokeWidth="1.5"
                        className="h-4 w-4"
                      />
                    )}
                  </Link>
                )
            )}
          </nav>
        ) : null}
      </div>

      <span className="flex md:hidden">
        <DropdownMenu>
          <DropdownMenuTrigger>
            <span className="uppercase text-sm flex flex-row">
              Menu
              <Icons.menu className="h-5 w-5 ml-1" strokeWidth="1.5" />
            </span>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="bg-stone-50 dark:bg-stone-900 rounded-none border border-stone-400 dark:border-stone-600">
            {links?.length
              ? links?.map((item, index) =>
                  !item.external ? (
                    <DropdownMenuItem
                      key={index}
                      onClick={() => router.push(item.url)}
                    >
                      {item.title}
                    </DropdownMenuItem>
                  ) : (
                    <DropdownMenuItem key={index}>
                      <Link
                        href={item.url}
                        target={item.target || undefined}
                        className="flex flex-row align-middle"
                      >
                        {item.title}{" "}
                        <Icons.arrowUpRight
                          strokeWidth="1.5"
                          className="h-4 w-4"
                        />
                      </Link>
                    </DropdownMenuItem>
                  )
                )
              : null}
          </DropdownMenuContent>
        </DropdownMenu>
      </span>
    </>
  );
}
