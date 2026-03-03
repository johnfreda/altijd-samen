import type { NextAuthOptions } from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import EmailProvider from 'next-auth/providers/email'

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
    }),
    EmailProvider({
      server: process.env.EMAIL_SERVER || '',
      from: process.env.EMAIL_FROM || 'noreply@altijdsamen.nl',
    }),
  ],
  pages: {
    signIn: '/login',
    newUser: '/dashboard',
  },
  callbacks: {
    async session({ session, token }) {
      if (session.user && token.sub) {
        (session.user as { id?: string }).id = token.sub
      }
      return session
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
}
