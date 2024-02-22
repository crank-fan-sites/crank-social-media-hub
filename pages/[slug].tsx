/* eslint-disable @next/next/no-img-element */
import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import axios from 'axios';
import { fetchPageBySlug } from '@/lib/api';

interface SectionProps {
  __component: string;
  title: string;
  subtitle?: string;
  content?: string;
  seo: {
    metaTitle: string;
    metaDescription: string;
  };
  structuredData?: {
    '@context': string;
    '@type': string;
    name: string;
    url: string;
    image: string;
    description: string;
  };
  metaImage?: {
    url: string;
    alternativeText: string;
  };
  blocks?: {
    __component: string;
    title: string;
    description: string;
    image?: {
      url: string;
      alternativeText: string;
    };
    metaImage?: {
      url: string;
      alternativeText: string;
    };
    link?: string;
    content?: string;
    button?: {
      label: string;
      link: string;
    };
    list?: {
      title: string;
      description: string;
    }[];
  }[];
  image?: {
    url: string;
    alternativeText: string;
  };
}

interface PageProps {
  page: {
    title: string;
    sections: SectionProps[];
  };
}

const Page: NextPage<PageProps> = ({ page }) => {
  return (
    <div>
      <h1>{page.title}</h1>
      {page.sections.map((section) => (
        <RenderSection key={section.__component} {...section} />
      ))}
    </div>
  );
};

const RenderSection: React.FC<SectionProps> = (props) => {
  switch (props.__component) {
    case 'sections.hero':
      return <Hero {...props} />;
    case 'sections.content':
      return <Content {...props} />;
    default:
      return null;
  }
};

const Hero: React.FC<SectionProps> = (props) => {
  return (
    <div>
      <h1>{props.title}</h1>
      <p>{props.subtitle}</p>
      <img src={props.image?.url} alt={props.image?.alternativeText} />
    </div>
  );
};
const Content: React.FC<SectionProps> = (props) => {
  return (
    <div>
      <h1>{props.title}</h1>
      <p>{props.content}</p>
    </div>
  );
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const page = await fetchPageBySlug(params?.slug as string);

  return {
    props: {
      page,
    },
    revalidate: 60,
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const { data } = await axios.get(
    process.env.NEXT_PUBLIC_STRAPI_API_URL + '/pages'
  );

  const paths = data.map((page: { slug: string }) => ({
    params: { slug: page.slug },
  }));

  return {
    paths,
    fallback: false,
  };
};

export default Page;
