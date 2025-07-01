import { z } from 'zod'
import { createTRPCRouter, protectedProcedure } from '@/server/api/trpc'

export const profileRouter = createTRPCRouter({
  get: protectedProcedure.query(async ({ ctx }) => {
    const { data, error } = await ctx.supabase
      .from('profiles')
      .select('*')
      .eq('id', ctx.user.id)
      .single()

    if (error) {
      throw new Error(error.message)
    }

    return data
  }),

  update: protectedProcedure
    .input(
      z.object({
        full_name: z.string().optional(),
        avatar_url: z.string().url().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { data, error } = await ctx.supabase
        .from('profiles')
        .update({
          ...input,
          updated_at: new Date().toISOString(),
        })
        .eq('id', ctx.user.id)
        .select()
        .single()

      if (error) {
        throw new Error(error.message)
      }

      return data
    }),
})