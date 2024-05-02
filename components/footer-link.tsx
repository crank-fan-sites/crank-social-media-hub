import { NextPage } from "next";

const Link: NextPage = ({ title, url }) => {
  return (
    <div className="mt-4">
      <div>
        <a href={url} target="_blank" className="hover:underline hover:italic">
          {title}
        </a>
      </div>
    </div>
  );
};

export default Link;
