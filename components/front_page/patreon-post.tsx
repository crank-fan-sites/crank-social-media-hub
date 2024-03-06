import React, { useEffect, useState } from "react";

import DOMPurify from "dompurify";
import axios from "axios";
// import { promises as fs } from "fs";

const PatreonPost = (props: any) => {
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

  return (
    <div>
      <h2>{title}</h2>
      <p dangerouslySetInnerHTML={{ __html: sanitizedHTML }}></p>
      <p>Author: djtomhanks/daddytankee</p>
      <p>
        Created timestamp: {published_at} (will turn into a user friendly
        DateTime)
      </p>
      <p>Likes: API doesn't show this but we could scrape it</p>
      <p>Post link: {url}</p>
      {embed_url && (
        <div className="patreon-embedding">
          {embed_data.html ? (
            <div className="patreon-container">
              <iframe src={embed_url} className="patreon-embed"></iframe>
            </div>
          ) : (
            <a href={embed_url}>{embed_data.subject}</a>
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
