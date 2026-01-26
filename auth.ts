import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { AUTHOR_BY_GOOGLE_ID_QUERY } from "@/sanity/lib/queries";
import { client } from "@/sanity/lib/client";
import { writeClient } from "@/sanity/lib/write-client";

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID!,
      clientSecret: process.env.AUTH_GOOGLE_SECRET!,
    })
  ],
  callbacks: {
    async signIn({
      user: { name, email, image },
      profile,
    }) {
      const existingUser = await client
        .withConfig({ useCdn: false })
        .fetch(AUTHOR_BY_GOOGLE_ID_QUERY, {
          id: profile?.sub,
        });

      if (!existingUser) {
        await writeClient.create({
          _type: "author",
          id: profile?.sub,
          name,
          username: profile?.email?.split("@")[0],
          email,
          image,
          bio: "",
        });
      }

      return true;
    },
    async jwt({ token, account, profile }) {
      if (account && profile) {
        const user = await client
          .withConfig({ useCdn: false })
          .fetch(AUTHOR_BY_GOOGLE_ID_QUERY, {
            id: profile?.sub,
          });

        token.id = user?._id;
      }

      return token;
    },
    async session({ session, token }) {
      Object.assign(session, { id: token.id });
      return session;
    },
  },
  pages: {
    signIn: '/auth/signin',
    error: '/auth/error',
  }
})

