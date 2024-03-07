import type { NextPage } from "next";
import { useEffect, useState } from "react";

import DOMPurify from "dompurify";
import axios from "axios";
// import { promises as fs } from "fs";

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
  const readableDate = `${date.toLocaleDateString()}, ${date.toLocaleTimeString()}`;
  // const patreonHandle = "unelectableairwaves";
  const patreonHandle = "chase_saddy";

  return (
    <div>
      <h2>{title}</h2>
      <p dangerouslySetInnerHTML={{ __html: sanitizedHTML }}></p>
      <p>Author: djtomhanks/daddytankee</p>
      <p>Created: {readableDate}</p>
      <p>
        <Link
          href={`https://patreon.com/${patreonHandle}${url}`}
          target="_blank"
        >
          Post Link
        </Link>
      </p>
      <br />
      {embed_url && (
        <div className="patreon-embedding">
          {embed_data.html && (
            <>
              <h4>
                <i>Embedded Content</i>
              </h4>
              <Link href={embed_url} target="_blank">
                {embed_data.subject}
              </Link>
            </>
          )}
        </div>
      )}
      {is_paid && <button>Click here to sub and see the full content</button>}
      <hr />
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
