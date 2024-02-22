import { BlogCard } from "@/components/cards/blog-card";
import { HeadingH1 } from "@/components/typography";
import { formattedDate, formattedTime } from "@/lib/utils";
import axios from "axios";
import { NextPage } from "next";
import { useState, useEffect } from "react";
import { MainLayout } from "@/layouts/layout";

const URL = process.env.NEXT_PUBLIC_STRAPI_API_URL;
const STRAPI_URL = process.env.NEXT_PUBLIC_API_URL;

const ReviewsAll: NextPage = () => {
  const [blogs, setBlogs] = useState([]);
  useEffect(() => {
    const renderBlogs = async () => {
      try {
        const response = await axios.get(
          `${URL}/blogs?populate=*&filters[categories][slug][$eq]=reviews`
        );
        console.log("response", response);
        if (response.status === 200) {
          setBlogs(response.data.data);
        }
        return response;
      } catch (error) {
        console.error("error", error);
      }
    };
    renderBlogs();
  }, []);

  return (
    <MainLayout>
      {/* TODO: add head */}
      <div className="container px-4">
        <HeadingH1 className="my-8">Record Reviews</HeadingH1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
          {blogs
            ? blogs.map((blog: any) => {
                const categories = blog.attributes.categories.data.map(
                  (category: any) => category.attributes.name
                );
                return (
                  <BlogCard
                    key={blog.id}
                    id={blog.id}
                    img={`${STRAPI_URL}${blog.attributes.display_image?.data?.attributes?.formats?.medium.url}`}
                    title={blog.attributes.title}
                    slug={blog.attributes.slug}
                    description={blog.attributes.description}
                    tags={categories}
                    date={`${formattedDate(
                      blog.attributes.date
                    )} - ${formattedTime(blog.attributes.date)}`}
                    {...blog}
                  />
                );
              })
            : null}
        </div>
      </div>
    </MainLayout>
  );
};

export default ReviewsAll;
