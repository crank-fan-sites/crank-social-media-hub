import * as React from "react";
import { useEffect, useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Icons } from "./icons";

export function MainNav() {
  const [links, setLinks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/header-links");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const thedata = await response.json();
        setLinks(thedata);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  return (
    <div className="hidden md:flex md:pl-4 gap-6 md:gap-10">
      {links?.length ? (
        <nav className="flex gap-6">
          {links?.map(
            (item, index) =>
              item.url && (
                <Link
                  key={index}
                  href={item.url}
                  target="_blank"
                  className={cn(
                    "flex items-center text-sm font-light uppercase underline-offset-4 hover:underline"
                  )}
                >
                  {item.title}
                  {item.external && (
                    <Icons.arrowUpRight strokeWidth="1.5" className="h-4 w-4" />
                  )}
                </Link>
              )
          )}
        </nav>
      ) : null}
    </div>
  );
}
