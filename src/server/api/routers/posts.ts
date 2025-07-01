import { z } from 'zod'
import { createTRPCRouter, protectedProcedure, publicProcedure } from '@/server/api/trpc'
import { supabase } from '@/lib/supabase'

export const postsRouter = createTRPCRouter({
  getAll: publicProcedure
    .input(
      z.object({
        limit: z.number().min(1).max(100).default(10),
        offset: z.number().min(0).default(0),
      })
    )
    .query(async ({ input }) => {
      const { data, error } = await supabase
        .from('posts')
        .select(`
          *,
          profiles:author_id (
            id,
            full_name,
            avatar_url
          )
        `)
        .order('created_at', { ascending: false })
        .range(input.offset, input.offset + input.limit - 1)

      if (error) {
        throw new Error(error.message)
      }

      return data
    }),

  getById: publicProcedure
    .input(z.object({ id: z.string().uuid() }))
    .query(async ({ input }) => {
      const { data, error } = await supabase
        .from('posts')
        .select(`
          *,
          profiles:author_id (
            id,
            full_name,
            avatar_url
          )
        `)
        .eq('id', input.id)
        .single()

      if (error) {
        throw new Error(error.message)
      }

      return data
    }),

  create: protectedProcedure
    .input(
      z.object({
        title: z.string().min(1).max(255),
        content: z.string().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { data, error } = await ctx.supabase
        .from('posts')
        .insert({
          title: input.title,
          content: input.content,
          author_id: ctx.user.id,
        })
        .select(`
          *,
          profiles:author_id (
            id,
            full_name,
            avatar_url
          )
        `)
        .single()

      if (error) {
        throw new Error(error.message)
      }

      return data
    }),

  update: protectedProcedure
    .input(
      z.object({
        id: z.string().uuid(),
        title: z.string().min(1).max(255).optional(),
        content: z.string().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { data, error } = await ctx.supabase
        .from('posts')
        .update({
          title: input.title,
          content: input.content,
          updated_at: new Date().toISOString(),
        })
        .eq('id', input.id)
        .eq('author_id', ctx.user.id) // Only allow updating own posts
        .select(`
          *,
          profiles:author_id (
            id,
            full_name,
            avatar_url
          )
        `)
        .single()

      if (error) {
        throw new Error(error.message)
      }

      return data
    }),

  delete: protectedProcedure
    .input(z.object({ id: z.string().uuid() }))
    .mutation(async ({ ctx, input }) => {
      const { error } = await ctx.supabase
        .from('posts')
        .delete()
        .eq('id', input.id)
        .eq('author_id', ctx.user.id) // Only allow deleting own posts

      if (error) {
        throw new Error(error.message)
      }

      return { success: true }
    }),

  getMyPosts: protectedProcedure
    .input(
      z.object({
        limit: z.number().min(1).max(100).default(10),
        offset: z.number().min(0).default(0),
      })
    )
    .query(async ({ ctx, input }) => {
      const { data, error } = await ctx.supabase
        .from('posts')
        .select(`
          *,
          profiles:author_id (
            id,
            full_name,
            avatar_url
          )
        `)
        .eq('author_id', ctx.user.id)
        .order('created_at', { ascending: false })
        .range(input.offset, input.offset + input.limit - 1)

      if (error) {
        throw new Error(error.message)
      }

      return data
    }),
})