import type { NextPage } from "next";

const InstagramPost: NextPage = (props) => {
  const { date, url, picture, text } = props;
  return (
    <div>
      <div className="relative w-[300px] h-[200px]">
        <a href={url}>
          <img
            src={picture}
            alt="Instagram Post"
            layout="fill"
            objectFit="cover"
            className=""
          />
        </a>
      </div>
      <span>{date}</span>
      <span>{text}</span>
    </div>
  );
};

export default InstagramPost;
