import type { NextPage } from "next";
import { useEffect, useState } from "react";

import DOMPurify from "dompurify";
import axios from "axios";

import { HeadingH4, HeadingH5 } from "@/components/typography";

import Link from "next/link";

const PatreonPost: NextPage = (props: any) => {
  const {
    title,
    content,
    url,
    published_at,
    is_public,
    is_paid,
    embed_data,
    embed_url,
  } = props;
  const sanitizedHTML = DOMPurify.sanitize(content);
  const date = new Date(published_at);
  const readableDate = `${date.toLocaleDateString()} at ${date.toLocaleTimeString()}`;
  // const patreonHandle = "unelectableairwaves";
  const patreonHandle = "chase_saddy";

  return (
    <div className="max-w-4xl mx-auto p-1 pb-5 rounded-lg shadow-md">
      <HeadingH4 className="text-2xl font-bold text-gray-500 mb-3">
        {title}
      </HeadingH4>
      <p className="text-sm text-gray-600">{readableDate}</p>
      <div
        className="prose max-w-none mt-1"
        dangerouslySetInnerHTML={{ __html: sanitizedHTML }}
      ></div>
      <p className="mt-1 italic text-sm">
        <a
          href={`https://patreon.com/${patreonHandle}${url}`}
          target="_blank"
          className="text-md text-blue-500 hover:text-blue-600 font-medium"
        >
          Post Link
        </a>
      </p>
      {embed_url && (
        <div className="patreon-embedding p-4 mt-1 rounded-lg">
          {embed_data.html && (
            <>
              <HeadingH5 className="text-lg font-semibold text-orange-600 mb-2">
                <i className="fas fa-external-link-alt mr-2 text-pink-500"></i>
                <span className="italic">Embedded Content</span>
              </HeadingH5>
              <a
                href={embed_url}
                target="_blank"
                className="text-sm text-pink-600 hover:text-pink-700 font-medium"
              >
                {embed_data.subject}
              </a>
            </>
          )}
        </div>
      )}
      {is_paid && (
        <button className="mt-5 bg-pink-500 text-white font-bold py-2 px-4 rounded hover:bg-pink-600">
          Subscribe to get full access to this and other content
        </button>
      )}
      <div className="border-b border-dashed border-gray-400 mt-3"></div>
    </div>
  );
};

export default PatreonPost;

// interface RedditResponse {
//   kind: string;
//   data: {
//     after: string | null;
//     dist: number;
//     modhash: string;
//     geo_filter: null | string;
//     children: Array<{
//       kind: string;
//       data: object;
//     }>;
//   };
// }
