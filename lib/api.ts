import axios, { AxiosResponse } from 'axios';

const API_URL = process.env.NEXT_PUBLIC_STRAPI_API_URL;

interface Page {
  title: string;
  sections: Array<Record<string, unknown>>;
}

export const fetchPageBySlug = async (slug: string): Promise<Page | null> => {
  try {
    const response: AxiosResponse<Page[]> = await axios.get(
      `${API_URL}/pages?slug=${slug}`
    );
    return response.data[0];
  } catch (error) {
    console.error('Error fetching page:', error);
    return null;
  }
};
