import type { NextPage } from "next";

import InstagramPosts from "@/components/components/instagram/instagram";

import { HeadingH3, Paragraph } from "@/components/typography";

interface InstagramRowProps {
  data?: any;
  buttons?: any;
}

const InstagramRow: NextPage<InstagramRowProps> = ({
  data = null,
  buttons,
}) => {
  return (
    <div className="grid grid-cols-1 border-t bg-primary border-stone-400 dark:border-stone-600">
      <div className="px-2 py-6 border-b group md:p-8 lg:p-12 border-stone-400 dark:border-stone-600 md:border-b-0 md:border-r hover:bg-scanlines">
        <HeadingH3 className="group-hover:font-bold">
          Recent Instagram Posts
        </HeadingH3>
        <div className="grid grid-cols-1 bg-primary border-stone-400 dark:border-stone-600">
          <InstagramPosts data={data} buttons={buttons} />
        </div>
      </div>
    </div>
  );
};

export default InstagramRow;
