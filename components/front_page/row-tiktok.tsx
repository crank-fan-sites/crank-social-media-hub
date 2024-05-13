import type { NextPage } from "next";

import { HeadingH1, HeadingH2 } from "@/components/typography";

import TiktokVideo from "@/components/components/tiktok/tiktok-video";
import TiktokProfile from "@/components/components/tiktok/tiktok-profile";

const RowTiktok: NextPage = ({ profile, videoCreator, videoId }) => {
  if (!profile || !videoCreator || !videoId) {
    return null;
  }
  return (
    <>
      <div className="grid grid-cols-1 border-t bg-primary lg:grid-cols-2 border-stone-400 dark:border-stone-600">
        <div className="px-2 py-6 border-b group md:p-8 lg:p-12 border-stone-400 dark:border-stone-600 md:border-b-0 hover:bg-scanlines">
          <HeadingH1 className="text-base group-hover:font-bold">
            Tiktok Profile
          </HeadingH1>
          <TiktokProfile profile={profile} />
        </div>

        <div className="px-2 py-6 border-b group md:p-8 lg:p-1 border-stone-400 dark:border-stone-600 md:border-b-0 md:border-r hover:bg-scanlines">
          <HeadingH2 className="text-base group-hover:font-bold">
            Featured Tiktok Video
          </HeadingH2>
          <TiktokVideo videoCreator={videoCreator} videoId={videoId} />
        </div>
      </div>
    </>
  );
};

export default RowTiktok;
