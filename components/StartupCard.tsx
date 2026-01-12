import { Eye } from 'lucide-react';
import { formatDate } from '../lib/utils';
import Link from 'next/link';
import { Button } from './button';
import { Author,Startup } from '@/sanity.types';

export type StartupTypeCard = Omit<Startup, "author"> & {author?:Author};

const StartupCard = ({ post }: { post: any }) => { // eslint-disable-line @typescript-eslint/no-explicit-any
  const { _id, _createdAt, views, author, title, description, image, category } = post;

  return (
    <li className="startup-card group">
      <div className="flex-between">
        <p className="startup-card_date">{formatDate(_createdAt)}</p>

        <div className="flex gap-1.5 items-center">
          <Eye size={16} className="text-primary" />
          <span className="text-16-medium">{views}</span>
        </div>
      </div>

      <div className="mt-5 flex-between gap-5">
        <div className="flex-1">
          <Link href={`/user/${author?._id}`}>
            <p className="text-16-medium line-clamp-1">{author?.name}</p>
          </Link>
                 <h3 className="text-26-semibold">
          <Link href={`/startup/${_id}`}>{title}</Link>
        </h3>
        </div>
        <Link href={`/startup/${_id}`}>
          <img src="https://i.pinimg.com/originals/82/47/0b/82470b4ed44c3edacfcd4201e2297050.jpg" alt="profile" width={48} height={48} className="rounded-full" />
        </Link>
      </div>

      <div className="mt-4">
        <p className="startup-card_desc">{description}</p>
      </div>


      {image && (
        <div className="mt-4">
          <Link href={`/startup/${_id}`}>
            <img src={image} alt={title} className="startup-card_img" />
          </Link>
        </div>
      )}

<div className="flex-between gap-3 mt-5">
        <Link href={`/?query=${category?.toLowerCase()}`}>
          <p className="text-16-medium">{category}</p>
        </Link>
        <Button className="startup-card_btn" asChild>
          <Link href={`/startup/${_id}`}>Details</Link>
        </Button>
      </div>
    </li>
  );
};

export default StartupCard;
