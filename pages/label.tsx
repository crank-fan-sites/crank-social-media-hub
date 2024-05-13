import { NextPage } from "next";
import { MainLayout } from "@/layouts/layout";
import { HeadingH1 } from "@/components/typography";
import { links } from "@/lib/links";
import { Button } from "@/components/ui/button";

import { getStrapi } from "@/lib/getStrapi";
import siteLinks from "@/lib/siteLinks";

const Label: NextPage = (props) => {
  return (
    <MainLayout
      headerLinks={props.headerLinks}
      footerLinks={props.footerLinks}
      title={props.siteConfig.title}
    >
      {/* TODO: add head */}
      {/* TODO: refactor Links into Dynamic Zones */}
      <div className="container px-4">
        <HeadingH1 className="my-8">Label</HeadingH1>
      </div>
    </MainLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  // CONFIG
  let siteConfig = null;
  try {
    const url = "/site-config";
    siteConfig = await getStrapi(url);
  } catch (error) {
    console.log("siteConfig grab error", error);
    return false;
  }
  const { siteTitle } = siteConfig;
  const SiteConfigObj = { title: siteTitle };

  // LINKS -- Header and footer links
  const { headerLinks, footerLinks } = await siteLinks();

  // Props
  return {
    props: {
      siteConfig: { ...SiteConfigObj },
      headerLinks,
      footerLinks,
    },
  };
};

export default Label;
