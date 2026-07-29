import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { query, queryOne } from "@/lib/db";

declare module "next-auth" {
  interface Session {
    runner_id: string;
  }
}

declare module "@auth/core/jwt" {
  interface JWT {
    runner_id: string;
  }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [Google],
  callbacks: {
    async signIn({ user }) {
      if (!user.email) return false;

      const existing = await queryOne<{ id: string }>(
        "SELECT id FROM runners WHERE email = $1",
        [user.email]
      );

      if (existing) {
        if (user.image) {
          await query("UPDATE runners SET avatar_url = $1 WHERE email = $2", [
            user.image,
            user.email,
          ]);
        }
      } else {
        await query(
          "INSERT INTO runners (name, email, country, avatar_url) VALUES ($1, $2, $3, $4)",
          [user.name, user.email, "Kenya", user.image]
        );
      }

      return true;
    },
    async jwt({ token, user }) {
      if (user?.email) {
        const runner = await queryOne<{ id: string }>(
          "SELECT id FROM runners WHERE email = $1",
          [user.email]
        );
        if (runner) {
          token.runner_id = runner.id;
        }
      }
      return token;
    },
    async session({ session, token }) {
      if (token.runner_id) {
        session.runner_id = token.runner_id;
        session.user.id = token.runner_id;
      }
      return session;
    },
  },
  pages: {
    signIn: "/run",
  },
});
