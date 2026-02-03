import { auth } from "@/auth";
import { client } from "@/sanity/lib/client";
import { AUTHOR_BY_ID_QUERY } from "@/sanity/lib/queries";
import { notFound } from "next/navigation";
import UserStartups from "@/components/UserStartups";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

export const experimental_ppr = true;

const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const id = (await params).id;
  const session = await auth();

  const user = await client.fetch(AUTHOR_BY_ID_QUERY, { id });
  if (!user) return notFound();

  return (
    <>
      <section className="profile_container">
        <div className="profile_card">
          <div className="profile_title">
            <h3 className="font-bold uppercase text-center line-clamp-1">
              {user.name}
            </h3>
          </div>

          <Avatar className="object-cover w-48 h-48 rounded-full mx-auto mt-5">
            <AvatarImage src={user.image} alt={user.name} />
            <AvatarFallback className="text-6xl">{user.name?.charAt(0)}</AvatarFallback>
          </Avatar>

          <p className="font-semibold text-white mt-7 text-center line-clamp-1 px-4">
            @{user?.username}
          </p>
          <p className="mt-1 text-center text-14-normal">{user?.bio}</p>
        </div>

        <div className="flex-1 flex flex-col gap-5 lg:-mt-5">
          <p className="text-30-bold">
            {session?.id === id ? "Your" : "All"} Startups
          </p>
          <ul className="card_grid-sm">
            <Suspense fallback={<Skeleton className="startup-card_skeleton" />}>
              <UserStartups id={id} />
            </Suspense>
          </ul>
        </div>
      </section>
    </>
  );
};

export default Page;