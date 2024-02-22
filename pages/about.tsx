/* eslint-disable @next/next/no-img-element */
import { NextPage } from 'next';
import { MainLayout } from '@/layouts/layout';
import { HeadingH1 } from '@/components/typography';
import Markdown from 'react-markdown';
import { useEffect } from 'react';
import axios from 'axios';
import useAxios from '@/axios';

const URL = process.env.NEXT_PUBLIC_STRAPI_API_URL;
const skull = `https://buddyheadstore.myshopify.com/cdn/shop/files/skull2.png?v=1675024101&width=1070`;
const About: NextPage = () => {
  const api = useAxios();
  useEffect(() => {
    const renderAbout = async () => {
      try {
        const response = await api.get(`/pages?slug=about`);
        console.log('response', response);
        return response;
      } catch (error) {
        console.log('error', error);
      }
    };
    renderAbout();
  }, []);
  return (
    <MainLayout>
      {/* TODO: add head */}
      {/* TODO: refactor About into Dynamic Zones */}
      <div className="container px-4">
        <HeadingH1 className="my-8">About</HeadingH1>
        {/* <Markdown></Markdown> */}
        <p>
          {`Yep, Buddyhead is back. This webzine was established in 1998 so 
          it's kind of poetic for it to reappear on its 25th anniversary. 
          The focus of the site is and has also been to shed light on things that normally wouldn't get the attention they deserve. That includes music, politics, films, art or whatever else that excites us. We are currently accepting applications for designers, writers and content creators who share this vision and would like to contribute to this project.`}
        </p>
        <p>
          If you think you got what it takes and are into not getting paid then
          shoot Travis an email at tmk@buddyhead.com with some examples of your
          work.
        </p>
        <p>
          And yes Buddyhead is still releasing records, new vinyl from The
          Cauterizers and Rathbone coming soon. Please sign up for the email
          list, follow on all socials and email or DM for the invite link to the
          Buddyhead Discord server.
        </p>
        <div className="flex justify-center mt-16">
          <img src={skull} width={150} alt="skull logo" />
        </div>
      </div>
    </MainLayout>
  );
};

export default About;
