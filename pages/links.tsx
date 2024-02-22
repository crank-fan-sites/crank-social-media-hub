import { NextPage } from "next";
import { MainLayout } from "@/layouts/layout";
import { HeadingH1 } from "@/components/typography";
import { links } from "@/lib/links";
import { Button } from "@/components/ui/button";

const Links: NextPage = () => {
  return (
    <MainLayout>
      {/* TODO: add head */}
      {/* TODO: refactor Links into Dynamic Zones */}
      <div className="container px-4">
        <HeadingH1 className="my-8">Links</HeadingH1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-1">
          {links.map((link) => {
            return (
              <div className="mt-4" key={link.id}>
                <div>
                  <Button className="w-80">
                    <a href={link.url} target="_blank">
                      {link.title}
                    </a>
                  </Button>
                </div>
                {/* <br /> */}
              </div>
            );
          })}
        </div>
      </div>
    </MainLayout>
  );
};

export default Links;
