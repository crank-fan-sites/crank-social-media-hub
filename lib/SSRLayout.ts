import { getStrapi } from "@/lib/getStrapi";

const siteLinks = async () => {
  let links = null;
  try {
    const url = "/main-link?populate=*";
    links = await getStrapi(url);
    const { top_links: headerLinks, bottom_links: footerLinks } = links;
    return { headerLinks, footerLinks };
  } catch (error) {
    console.log("grab error", error);
    return { headerLinks: [], footerLinks: [] };
  }
};

const siteConfig = async () => {
  try {
    const url = "/site-config";
    const siteConfig = await getStrapi(url);
    const { siteTitle } = siteConfig;
    return { title: siteTitle };
  } catch (error) {
    console.log("siteConfig grab error", error);
    return { title: "The Site" };
  }
};

export { siteConfig, siteLinks };
