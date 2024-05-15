import { getStrapi } from "@/lib/getStrapi";

const siteLinks = async () => {
  try {
    const url = "/main-link?populate=*";
    const links = await getStrapi(url);
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
    const { siteTitle, description } = siteConfig;
    return { title: siteTitle, description };
  } catch (error) {
    console.log("siteConfig grab error", error);
    return { title: "The Site", description: "" };
  }
};

function getBaseUrl(req: {
  headers: { [key: string]: string | undefined };
}): string {
  const protocol = req.headers["x-forwarded-proto"] || "http";
  const host = req.headers.host;
  return `${protocol}://${host}`;
}

export { siteConfig, siteLinks, getBaseUrl };
