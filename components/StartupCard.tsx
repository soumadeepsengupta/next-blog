import { Eye } from 'lucide-react';
import { formatDate } from '../lib/utils';
import Link from 'next/link';

/* ✅ FIX: inline type so StartupTypeCard actually exists */
type StartupTypeCard = {
  _id: number | string;
  _createdAt: Date;
  views: number;
  title: string;
  description: string;
  image?: string;
  category: string;
  author?: {
    _id: number | string;
    name: string;
  };
};

const StartupCard = ({ post }: { post: StartupTypeCard }) => {
  const { _id, _createdAt, views, author, title, description, image, category } = post;

  return (
    <li className="startup-card group">
      <div className="flex-between">
        <p className="startup-card_date">{formatDate(String(_createdAt))}</p>

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

      <div className="mt-4">
        <Link href={`/search?category=${encodeURIComponent(category)}`}>
          <span className="category-tag">{category}</span>
        </Link>
      </div>
    </li>
  );
};

export default StartupCard;
