/* eslint-disable @next/next/no-img-element */
import { NextPage } from 'next';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import { MainLayout } from '@/layouts/layout';
import { HeadingH2 } from '@/components/typography';
import ReactMarkdown from 'react-markdown';

const URL = process.env.NEXT_PUBLIC_STRAPI_API_URL;
const STRAPI_URL = process.env.NEXT_PUBLIC_API_URL;

interface BlogDetails {
  name: string;
  slug?: string;
  createdAt?: string;
  publishedAt?: string;
  updatedAt?: string;
}

interface BlogPostDetails {
  id: number;
  attributes: {
    display_image: any;
    categories: {
      data: BlogDetails[];
    };
    title: string;
    description: string;
    content: string;
  };
}

const BlogDetail: NextPage = () => {
  const router = useRouter();
  // @ts-ignore
  const [blogDetail, setBlogDetail] = useState<BlogPostDetails>([]);
  useEffect(() => {
    const renderBlogs = async () => {
      try {
        const response = await axios.get(
          `${URL}/blogs/${router.query.id}?populate=*`
        );
        console.log('response.data', response.data);
        setBlogDetail(response.data.data);
        console.log('response.data.data', response.data.data);
        return response;
      } catch (error) {
        console.error('error', error);
      } finally {
        console.log(
          '`${URL}${blogDetail.attributes?.display_image?.data?.attributes?.formats?.medium?.url}`',
          `${URL}${blogDetail.attributes?.display_image?.data?.attributes?.formats?.medium?.url}`
        );
      }
    };
    renderBlogs();
  }, [router.query.id]);

  const imgUrl =
    blogDetail.attributes?.display_image?.data?.attributes?.formats?.small?.url;
  const fullImgUrl = `${STRAPI_URL}${imgUrl}`;

  return (
    <MainLayout>
      {/* TODO: add head */}
      <div className="container-fluid mt-8">
        {blogDetail ? (
          <div className="container">
            {imgUrl !== undefined ? (
              <img src={fullImgUrl} alt="blog display image" />
            ) : null}
            <HeadingH2 className="mt-4">
              {blogDetail.attributes?.title}
            </HeadingH2>
            <p>
              Tags:{' '}
              {blogDetail.attributes?.categories.data.map(
                (cat: any) => cat.attributes.name
              )}
            </p>
            <p>Description: {blogDetail.attributes?.description}</p>
            <ReactMarkdown>{blogDetail.attributes?.content}</ReactMarkdown>
          </div>
        ) : (
          'Loading...'
        )}
      </div>
    </MainLayout>
  );
};

export default BlogDetail;
