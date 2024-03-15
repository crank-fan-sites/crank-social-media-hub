import type { NextPage } from "next";

import Reddit from "@/components/front_page/reddit";

import SocialButton from "@/components/ui2/social-button";
import { HeadingH3, Paragraph } from "@/components/typography";

import styles from "./button.module.css";

const PatreonRow: NextPage = () => {
  return (
    <div className="grid grid-cols-1 border-t bg-primary border-stone-400 dark:border-stone-600">
      <div className="px-2 py-6 border-b group md:p-8 lg:p-12 border-stone-400 dark:border-stone-600 md:border-b-0 md:border-r hover:bg-scanlines">
        <HeadingH3 className="text-base group-hover:text-background group-hover:font-bold">
          Recent Reddit Posts
        </HeadingH3>
        <div className="grid grid-cols-1 border-t bg-primary border-stone-400 dark:border-stone-600">
          <Reddit />
        </div>
      </div>
    </div>
  );
};

export default PatreonRow;
