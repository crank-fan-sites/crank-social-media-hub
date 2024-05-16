import { getStrapi } from "@/lib/getStrapi";

const siteLinks = async () => {
  try {
    const urlPath = "/main-link?populate=*";
    const links = await getStrapi(urlPath);
    const { top_links: headerLinks, bottom_links: footerLinks } = links;
    return { headerLinks, footerLinks };
  } catch (error) {
    console.log("grab error", error);
    return { headerLinks: [], footerLinks: [] };
  }
};

const siteConfig = async () => {
  try {
    const urlPath = "/site-config?populate=*";
    const siteConfig = await getStrapi(urlPath);
    if (!siteConfig || typeof siteConfig !== "object") {
      console.error("Invalid response from getStrapi", { siteConfig });
      throw new Error("Invalid response from getStrapi");
    }
    const { siteTitle, description, banner } = siteConfig;
    return {
      title: siteTitle,
      description,
      bannerImage: banner.data.attributes,
    };
    const bannerImage = { alternativeText, caption, url, width, height };
    return { title: siteTitle, description, bannerImage };
  } catch (error) {
    console.error("siteConfig grab error", {
      message: error.message,
      stack: error.stack,
    });
    return {
      title: "The Site",
      description: "",
      bannerImage: {
        url: "",
        alternativeText: "",
        caption: "",
        width: 0,
        height: 0,
      },
    };
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
