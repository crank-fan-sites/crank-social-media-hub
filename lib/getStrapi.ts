import strapiAxios from "@/lib/strapiAxios";

async function getStrapi(path) {
  try {
    const result = await strapiAxios().get(path);
    return result.data.data.attributes;
  } catch (error) {
    throw Error;
  }
}

async function getStrapiMultiple(path) {
  try {
    const result = await strapiAxios().get(path);
    return result.data.data;
  } catch (error) {
    return { status: false };
  }
}

export { getStrapi, getStrapiMultiple };
