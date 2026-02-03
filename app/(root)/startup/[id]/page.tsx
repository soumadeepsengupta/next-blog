import { client } from "@/sanity/lib/client";
import {
  PLAYLIST_BY_SLUG_QUERY,
  STARTUP_BY_ID_QUERY,
} from "@/sanity/lib/queries";
import { notFound } from "next/navigation";
import { formatDate } from "@/lib/utils";
import Link from "next/link";
import Image from "next/image";
import markdownit from "markdown-it";
import { Suspense } from "react";
import View from "@/components/View";
import { Skeleton } from "@/components/ui/skeleton";
import StartupCard from "@/components/StartupCard";
import { auth } from "@/auth";

export const experimental_ppr = true;

const md = new markdownit();

const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const id = (await params).id;

  const [post, playlist] = await Promise.all([
    client.fetch(STARTUP_BY_ID_QUERY, { id }),
    client.fetch(PLAYLIST_BY_SLUG_QUERY, {
      slug: "editor-picks-new",
    }),
  ]);

  if (!post) return notFound();

  const editorPosts = playlist?.select ?? [];

  const session = await auth(); // optional, safe to keep

  const parsedContent = md.render(post.pitch || "");

  return (
    <>
      {/* HERO */}
      <section className="red-container !min-h-[230px]">
        <p className="tag">{formatDate(post._createdAt)}</p>
        <h1 className="heading">{post.title}</h1>
        <p className="sub-heading !max-w-5xl">{post.description}</p>
      </section>

      {/* CONTENT */}
      <section className="section_container">
        <Image
          src={post.image}
          alt="thumbnail"
          width={1200}
          height={630}
          priority
          className="w-full max-w-lg h-auto rounded-xl mx-auto"
        />

        <div className="space-y-5 mt-10 max-w-4xl mx-auto">
          <div className="flex-between gap-5">
            <Link
              href={`/user/${post.author?._id}`}
              className="flex gap-2 items-center mb-3"
            >
              <Image
                src={post.author.image}
                alt="avatar"
                width={64}
                height={64}
                className="rounded-full drop-shadow-lg w-16 h-16 object-cover"
              />

              <div>
                <p className="text-24-bold">{post.author.name}</p>
                <p className="text-16-medium !text-black-300">
                  @{post.author.username}
                </p>
              </div>
            </Link>

            <p className="category-tag">{post.category}</p>
          </div>

          <h3 className="text-30-bold">Pitch Details</h3>

          {parsedContent ? (
            <article
              className="prose max-w-5xl font-work-sans break-all"
              dangerouslySetInnerHTML={{ __html: parsedContent }}
            />
          ) : (
            <p className="no-result">No details provided</p>
          )}
        </div>

        <hr className="divider" />

        {/* EDITOR PICKS */}
        {editorPosts.length > 0 && (
          <div className="max-w-4xl mx-auto">
            <p className="text-30-semibold">Editor Picks</p>

            <ul className="mt-7 card_grid-sm">
              {editorPosts.map((post, index) => (
                <StartupCard key={`${post._id}-${index}`} post={post} />
              ))}
            </ul>
          </div>
        )}
      </section>

      {/* VIEWS */}
      <Suspense fallback={<Skeleton className="view_skeleton" />}>
        <View id={id} />
      </Suspense>
    </>
  );
};

export default Page;
