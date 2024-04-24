import type { NextPage } from "next";

import TwitterProfile from "@/components/front_page/twitter-profile";
import Soundcloud from "@/components/front_page/soundcloud";

const RowTwitterSoundcloud: NextPage = () => {
  return (
    <div className="grid grid-cols-1 border-t bg-primary lg:grid-cols-2 border-stone-400 dark:border-stone-600">
      <div className="px-2 py-6 border-b group md:p-8 lg:p-12 border-stone-400 dark:border-stone-600 md:border-b-0 hover:bg-scanlines">
        <TwitterProfile />
      </div>

      <Soundcloud />
    </div>
  );
};

export default RowTwitterSoundcloud;
