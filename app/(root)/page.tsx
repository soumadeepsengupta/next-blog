// import React from 'react'
// import SearchForm from '@/components/SearchForm';
// import Link from 'next/link'
// import Image from 'next/image'

// export default async function Home({
//   searchParams,
// }: {
//   searchParams: Promise<{ query?: string }>;
// }) {
//   const query = (await searchParams).query;

//       <section className="red-container _pattern">
//         <span className="tag">
//           Pitch, Vote, and Grow
//         </span>
//         <h1 className="heading">
//           Pitch Your Startup, <br />
//           Connect With Entrepreneurs
//         </h1>

//         <p className="sub-heading !max-w-3xl">
//           Submit Ideas, Vote on Pitches, and Get Noticed in Virtual
//           Competitions.
//         </p>
        
//         <SearchForm query={query} />
//       </section>
// }



import SearchForm from "@/components/SearchForm";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ query?: string }>;
}) {
  const query = (await searchParams).query;
  const params = { search: query || null };

  return (
      <section className="red-container _pattern">
        <span className="tag tag-tri">
          Pitch, Vote, and Grow
        </span>
        <h1 className="heading">
          Pitch Your Startup, <br />
          Connect With Entrepreneurs
        </h1>

        <p className="sub-heading !max-w-3xl">
          Submit Ideas, Vote on Pitches, and Get Noticed in Virtual
          Competitions.
        </p>
        
        <SearchForm query={query} />
      </section>
  );
}