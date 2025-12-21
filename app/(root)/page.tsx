import SearchForm from "@/components/SearchForm";
import StartupCard from '@/components/StartupCard';

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ query?: string }>;
}) {
  const query = (await searchParams).query;
  const params = { search: query || null };
  // sample in-memory data (matches example structure)
  const posts = [
    {
      _createdAt: new Date(),
      views: 69,
      author: { _id: 1, name: 'Deep' },
      _id: 1,
      description: 'This is a description.',
      image:
        'https://i.pinimg.com/736x/1c/5b/37/1c5b370c529babdec98105ee98ece4ea.jpg',
      category: 'Baddies',
      title: 'Baddie Dilao Yojana',
    }
  ];

  // // simple filter query - case-insensitive includes on title, description, category, author name
  // const filtered = typeof query === 'string' && query.trim()
  //   ? posts.filter((p) => {
  //       const q = query.toLowerCase();
  //       return (
  //         p.title.toLowerCase().includes(q) ||
  //         p.description.toLowerCase().includes(q) ||
  //         p.category.toLowerCase().includes(q) ||
  //         p.author.name.toLowerCase().includes(q)
  //       );
  //     })
  //   : posts;

  return (
    <>
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

      <section className="section_container">
        <p className="text-30-semibold">
          {query ? `Search results for "${query}"` : "All Startups"}
        </p>

        <ul className="mt-7 card_grid">
          {posts.length > 0 ? (
            posts.map((post) => (
              <StartupCard key={post._id} post={post} />
            ))
          ) : (
            <p className="no-result">No startups found</p>
          )}
        </ul>
      </section>

    </>
  );
}