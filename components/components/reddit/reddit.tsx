import type { NextPage } from "next";
import { useEffect, useState } from "react";

import axios from "axios";

import RedditPost from "@/components/components/reddit/reddit-post";

import CTAButton from "@/components/ui2/variants/reddit";

interface RedditProps {
  data: any[];
  buttons: { id: string; link: any }[];
}

const Reddit: NextPage<RedditProps> = ({ data, buttons }) => {
  return (
    <>
      {buttons &&
        buttons.length > 0 &&
        buttons.map((button: any) => (
          <CTAButton key={button.id} {...button.link} />
        ))}
      <div className="px-2 py-0 border-b group md:p-8 lg:p-2 border-stone-400 dark:border-stone-600 md:border-b-0 md:border-r hover:bg-scanlines">
        {data.length > 0 &&
          data.map((post, index) => (
            <RedditPost
              key={index}
              title={post.title}
              selftext={post.selftext}
              author={post.author}
              crosspost={post.crosspost}
              ups={post.ups}
              created={post.created}
              permalink={post.permalink}
              url={post.url}
              link_flair_type={post.link_flair_path}
            />
          ))}
      </div>
    </>
  );
};

export default Reddit;
