import { NextPage } from 'next';
import { MainLayout } from '@/layouts/layout';
import { HeadingH1 } from '@/components/typography';
import { links } from '@/lib/links';
import { Button } from '@/components/ui/button';

const Label: NextPage = () => {
  return (
    <MainLayout>
      {/* TODO: add head */}
      {/* TODO: refactor Links into Dynamic Zones */}
      <div className="container px-4">
        <HeadingH1 className="my-8">Label</HeadingH1>
      </div>
    </MainLayout>
  );
};

export default Label;
