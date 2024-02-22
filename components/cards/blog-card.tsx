/* eslint-disable @next/next/no-img-element */
import { useRouter } from 'next/router';
import { CircleIcon } from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

interface BlogCardProps {
  id?: string;
  title: string;
  img?: any;
  slug?: string;
  description: string;
  tags?: string;
  date: string;
}

export function BlogCard(props: BlogCardProps) {
  const { id, img, title, slug, description, tags, date } = props;
  const router = useRouter();
  return (
    <Card {...props}>
      {/* {img ? <img src={img} alt="" /> : null} */}
      <CardHeader className="grid grid-cols-1 items-start gap-4 space-y-0">
        <div className="space-y-1">
          <CardTitle
            onClick={() => router.push(`/blog/${id}`)}
            className="mb-3"
          >
            {title}
          </CardTitle>
          <CardDescription>{description}</CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex space-x-2 md:space-x-4 text-sm text-muted-foreground">
          <div className="flex items-center">
            <CircleIcon className="mr-1 h-3 w-3 fill-sky-400 text-sky-400" />
            {tags}
          </div>
          <div>{date}</div>
        </div>
      </CardContent>
    </Card>
  );
}
