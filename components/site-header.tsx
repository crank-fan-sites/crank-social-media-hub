import { useTheme } from "next-themes";
import { useRouter } from "next/router";
import { MainNav } from "./main-nav";

export function SiteHeader() {
  const { theme } = useTheme();
  const router = useRouter();
  return (
    <header className="bg-stone-50/80 dark:bg-stone-900/80 backdrop-blur-md sticky top-0 z-40 w-full border-t border-b border-stone-400 dark:border-stone-600">
      <div className="flex p-4 md:px-6 items-center space-x-0 justify-between">
        <span
          className="text-sm uppercase cursor-pointer"
          onClick={() => router.push("/")}
        >
          Crank Communism <span className="text-lg">☭</span>
        </span>
        <MainNav />
      </div>
    </header>
  );
}
