import type { NextPage } from "next";

const InstagramPost: NextPage = (props) => {
  const { url, picture, text } = props;
  const hasText = text && text.trim().length > 0;
  return (
    <div className="relative h-auto">
      <div className="relative h-[200px] overflow-hidden">
        <a href={url} className="block w-full h-full" target="_blank">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={picture}
            alt="Instagram Post"
            className="object-cover w-full h-full"
          />
        </a>
      </div>
      {/* Only render this div if there is text */}
      {hasText && (
        <div className="block overflow-y-auto h-[100px] mb-2">{text}</div>
      )}
    </div>
  );
};

export default InstagramPost;
