import type { NextPage } from "next";

import Patreon from "@/components/front_page/patreon";

import SocialButton from "@/components/ui2/social-button";
import { HeadingH3, Paragraph } from "@/components/typography";
import Image from "next/image";

import styles from "./button.module.css";

const PatreonRow: NextPage = () => {
  return (
    <div className="grid grid-cols-1 border-t xl:grid-cols-5 bg-primary border-stone-400 dark:border-stone-600">
      <div className="items-center justify-center hidden col-span-1 p-0 border-b xl:flex xl:col-span-2 group lg:p-8 lg:p-12 border-stone-400 dark:border-stone-600 md:border-b-0 hover:bg-scanlines">
        <Image
          src="/screenshots-vertical/Unelectable-unele-smoke-normans-vertical-365x720.png"
          width={365}
          height={720}
          alt="UnelectableAirwaves Alien"
          className="items-center justify-center w-full"
        />
      </div>
      <div className="col-span-1 px-2 py-6 border-b md:border-r xl:col-span-3 group md:p-8 lg:p-12 border-stone-400 dark:border-stone-600 md:border-b-0 hover:bg-scanlines">
        <HeadingH3 className="p-0 m-0 text-base group-hover:text-background group-hover:font-bold">
          Latest Patreon Posts
        </HeadingH3>
        <div className="grid grid-cols-1 border-t bg-primary border-stone-400 dark:border-stone-600">
          <Patreon />
        </div>
      </div>
    </div>
  );
};

export default PatreonRow;
