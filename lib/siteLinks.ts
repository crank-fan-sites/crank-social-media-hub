import { getStrapi } from "@/lib/getStrapi";

const siteLinks = async () => {
  let links = null;
  try {
    const url = "/main-link?populate=*";
    links = await getStrapi(url);
  } catch (error) {
    console.log("grab error", error);
    return false;
  }
  const { top_links: headerLinks, bottom_links: footerLinks } = links;
  return { headerLinks, footerLinks };
};

export default siteLinks;
