import type { NextPage } from "next";

import { useEffect, useRef } from "react";
import { useRouter } from "next/router";

import { Button } from "@/components/ui/button";
import {
  HeadingH1,
  HeadingH2,
  HeadingH3,
  Paragraph,
} from "@/components/typography";

const Row1: NextPage = () => {
  const router = useRouter();
  const yt = useRef(null); // Initialize the ref

  return <div></div>;
};

export default Row1;
