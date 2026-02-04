import { client } from "@/sanity/lib/client";

// Simple sanityFetch without live preview to avoid build issues
export async function sanityFetch<T = any>({ 
  query, 
  params = {} 
}: { 
  query: string; 
  params?: Record<string, any>;
}): Promise<{ data: T }> {
  const data = await client.fetch<T>(query, params);
  return { data };
}

// Placeholder SanityLive component
export function SanityLive() {
  return null;
}