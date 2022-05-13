import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import prisma from '../../../lib/prisma'

// TODO: add github provider
// TODO: add credentials provider

export default NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
  ],
  callbacks: {
    async jwt({ token, user, account, profile, isNewUser }) {
      user && (token.user = user)
      return token
    },
    async session({ session, token, user }) {
      session.user.id = user.id
      return session
    },
  },
})
