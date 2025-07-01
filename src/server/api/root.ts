import { createTRPCRouter } from '@/server/api/trpc'
import { profileRouter } from '@/server/api/routers/profile'
import { postsRouter } from '@/server/api/routers/posts'

export const appRouter = createTRPCRouter({
  profile: profileRouter,
  posts: postsRouter,
})

export type AppRouter = typeof appRouter