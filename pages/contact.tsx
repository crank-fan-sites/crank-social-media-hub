import { NextPage } from 'next';
import { MainLayout } from '@/layouts/layout';
import { HeadingH1, HeadingH6 } from '@/components/typography';
import { Icons } from '@/components/icons';
import { siteConfig } from '@/config/site';
import { buttonVariants } from '@/components/ui/button';

import Link from 'next/link';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import axios from 'axios';

const profileFormSchema = z.object({
  title: z
    .string()
    .min(2, {
      message: 'Title must be at least 2 characters.',
    })
    .max(30, {
      message: 'Title must not be longer than 30 characters.',
    }),
  email: z
    .string({
      required_error: 'Please select an email to display.',
    })
    .email(),
  message: z.string().max(1024).min(10),
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;

const Contact: NextPage = () => {
  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    mode: 'onChange',
  });

  const onSubmit = async (data: ProfileFormValues) => {
    try {
      console.log('data', data);
      // const response = await axios.post(url, data)
      // console.log('response', response)
      // return response
    } catch (error) {
      console.log('error in onSubmit', error);
    }
  };
  return (
    <MainLayout>
      {/* TODO: add head */}
      <div className="container px-4">
        <HeadingH1 className="my-8">Contact</HeadingH1>
        <div className="border border-stone-400 dark:border-stone-600 mb-12 grid md:grid-cols-2">
          <div>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8 p-6 py-10 lg:p-12 md:border-r border-stone-400 dark:border-stone-600"
              >
                <span className="text-sm lowercase">Send us a message</span>
                <FormItem>
                  <FormLabel className="lowercase">Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Where can we reach you?"
                      className="placeholder:uppercase"
                      {...form.register('email')}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
                <FormItem>
                  <FormLabel className="lowercase">Subject</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Contribute, join the Discord, dealer's choice, etc."
                      className="placeholder:uppercase"
                      {...form.register('title')}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="lowercase">Message</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="What's on your mind? We're here for you."
                          className="resize-none placeholder:uppercase"
                          {...form.register('message')}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" disabled>
                  Send Message
                </Button>
              </form>
            </Form>
          </div>
          <div>
            <div className="bg-accent bg-scanlines text-center p-6 grid grid-flow-col gap-2 place-items-center">
              <Icons.skull
                className="h-6 w-6 text-background"
                strokeWidth="1.5"
              />
              <p className="mb-0 font-semibold text-background">
                We are currently accepting applications for designers, writers
                and content creators who share this vision and would like to
                contribute to this project.
              </p>
              <Icons.skull
                className="h-6 w-6 text-background"
                strokeWidth="1.5"
              />
            </div>
            <div className="p-6 py-10 lg:p-12 border-b border-stone-400 dark:border-stone-600">
              <span className="block mb-4 text-sm lowercase">Snail Mail</span>
              <address className="not-italic text-lg leading-8">
                Buddyhead
                <br />
                106 1/2 Judge John Also St. &#35;413
                <br />
                Los Angeles, Ca 90012
              </address>
            </div>
            <div className="p-6 py-10 lg:p-12">
              <span className="block mb-4 text-sm lowercase">Socials</span>
              <div className="flex space-x-1">
                <Link
                  href={siteConfig.links.facebook}
                  target="_blank"
                  rel="noreferrer"
                >
                  <div
                    className={buttonVariants({
                      size: 'icon',
                      variant: 'ghost',
                    })}
                  >
                    <Icons.facebook
                      className="h-5 w-5 fill-current"
                      strokeWidth="1.5"
                    />
                    <span className="sr-only">Facebook</span>
                  </div>
                </Link>

                <Link
                  href={siteConfig.links.instagram}
                  target="_blank"
                  rel="noreferrer"
                >
                  <div
                    className={buttonVariants({
                      size: 'icon',
                      variant: 'ghost',
                    })}
                  >
                    <Icons.instagram className="h-5 w-5" strokeWidth="1.5" />
                    <span className="sr-only">Instagram</span>
                  </div>
                </Link>

                <Link
                  href={siteConfig.links.twitch}
                  target="_blank"
                  rel="noreferrer"
                >
                  <div
                    className={buttonVariants({
                      size: 'icon',
                      variant: 'ghost',
                    })}
                  >
                    <Icons.twitch className="h-5 w-5" strokeWidth="1.5" />
                    <span className="sr-only">Twitch</span>
                  </div>
                </Link>

                <Link
                  href={siteConfig.links.twitter}
                  target="_blank"
                  rel="noreferrer"
                >
                  <div
                    className={buttonVariants({
                      size: 'icon',
                      variant: 'ghost',
                    })}
                  >
                    <Icons.twitter
                      className="h-5 w-5 fill-current"
                      strokeWidth="1.5"
                    />
                    <span className="sr-only">Twitter</span>
                  </div>
                </Link>

                <Link
                  href={siteConfig.links.youtube}
                  target="_blank"
                  rel="noreferrer"
                >
                  <div
                    className={buttonVariants({
                      size: 'icon',
                      variant: 'ghost',
                    })}
                  >
                    <Icons.youtube className="h-5 w-5" strokeWidth="1.5" />
                    <span className="sr-only">YouTube</span>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Contact;
