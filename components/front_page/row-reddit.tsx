import type { NextPage } from "next";

import Reddit from "@/components/front_page/reddit";

import { HeadingH3, Paragraph } from "@/components/typography";

const PatreonRow: NextPage = () => {
  return (
    <div className="grid grid-cols-1 border-t bg-primary border-stone-400 dark:border-stone-600">
      <div className="px-2 py-6 border-b group md:p-8 lg:p-12 border-stone-400 dark:border-stone-600 md:border-b-0 md:border-r hover:bg-scanlines">
        <HeadingH3 className="text-base group-hover:font-bold">
          Recent Subreddit Posts
        </HeadingH3>
        <div className="grid grid-cols-1 border-t bg-primary border-stone-400 dark:border-stone-600">
          <Reddit />
        </div>
      </div>
    </div>
  );
};

export default PatreonRow;
