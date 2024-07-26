import type { NextPage } from "next";

const YoutubePost: NextPage = (props) => {
  const { publishedAt, title, thumbnail, description } = props;
  const hasText = title && title.trim().length > 0;
  return (
    <div className="relative h-auto">
      <div className="relative h-[200px] overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={thumbnail}
          alt="Youtube Post"
          className="object-cover w-full h-full"
        />
      </div>
      {/* Only render this div if there is text */}
      {hasText && (
        <div className="block overflow-y-auto h-[100px] mb-2">{title}</div>
      )}
      <div className="block overflow-y-auto h-[100px] mb-2">{publishedAt}</div>
    </div>
  );
};

export default YoutubePost;
