import type { NextPage } from "next";

import InstagramPosts from "@/components/components/instagram/instagram";

import SocialButton from "@/components/ui2/social-button";
import { HeadingH3, Paragraph } from "@/components/typography";

import styles from "./button.module.css";

const InstagramRow: NextPage = ({ data = null }) => {
  return (
    <div className="grid grid-cols-1 border-t bg-primary border-stone-400 dark:border-stone-600">
      <div className="px-2 py-6 border-b group md:p-8 lg:p-12 border-stone-400 dark:border-stone-600 md:border-b-0 md:border-r hover:bg-scanlines">
        <HeadingH3 className="text-base group-hover:font-bold">
          Recent Instagram Posts
        </HeadingH3>
        <div className="grid grid-cols-1 border-t bg-primary border-stone-400 dark:border-stone-600">
          <InstagramPosts data={data} />
        </div>
      </div>
    </div>
  );
};

export default InstagramRow;
