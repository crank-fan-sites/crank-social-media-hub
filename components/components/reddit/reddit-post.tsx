import type { NextPage } from "next";

import axios from "axios";

const RedditPost: NextPage = (props: any) => {
  const {
    title,
    selftext,
    author,
    crosspost,
    ups,
    created,
    permalink,
    url,
    link_flair_type,
  } = props;
  const date = new Date(created * 1000);
  const readableDate = `${date.toLocaleDateString()} at ${date.toLocaleTimeString()}`;

  return (
    <div className="p-3 my-3">
      <h2 className="text-lg font-bold text-white">{title}</h2>
      <p className="text-sm mt-2 text-gray-300 italic">{selftext}</p>
      <div className="mt-4">
        <p className="text-gray-400">
          Author: <span className="text-gray-200">{author}</span>
        </p>
        <p className="text-gray-400">
          Created: <span className="text-gray-200">{readableDate}</span>
        </p>
        <p className="text-gray-400">
          Upvotes: <span className="text-gray-200">{ups}</span>
        </p>
        <p className="text-gray-400 italic">
          <a
            href={`https://reddit.com/r${permalink}`}
            className="text-blue-400 hover:text-blue-300"
          >
            Go to reddit post
          </a>
        </p>
        <p className="text-gray-400">
          Link:{" "}
          <a
            href={url}
            className="break-words text-blue-400 hover:text-blue-300"
          >
            {url}
          </a>
        </p>
        <p className="text-gray-400">
          <span className="text-gray-200">{link_flair_type}</span>
        </p>
      </div>
      {crosspost &&
        crosspost.map((cross, crossIndex) => (
          <div key={crossIndex} className="mt-4 p-4 bg-gray-700 rounded-lg">
            <h3 className="text-lg font-semibold text-white">
              Crosspost: {cross.title}
            </h3>
            <p className="text-gray-400">
              Author: <span className="text-gray-200">{cross.author}</span>
            </p>
          </div>
        ))}
      <div className="border-b border-dashed border-gray-400 mt-4"></div>
    </div>
  );
};

export default RedditPost;
