import { NextPage } from "next";

import { Button } from "@/components/ui/button";

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
