import { Role } from '@prisma/client'
import NextAuth, { DefaultSession } from 'next-auth'

declare module 'next-auth' {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
      id?: string
      role?: Role
      displayName?: string
    } & DefaultSession['user']
  }
}

export type User = {
  id?: string
  role?: Role
  displayName?: string
} & {
  name?: string
  email?: string
  image?: string
}
