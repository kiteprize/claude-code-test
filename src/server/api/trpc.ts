import { initTRPC, TRPCError } from '@trpc/server'
import { type NextRequest } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import type { Database } from '@/lib/supabase'

interface CreateContextOptions {
  req: NextRequest
}

const createInnerTRPCContext = (opts: CreateContextOptions) => {
  return {
    req: opts.req,
  }
}

export const createTRPCContext = (opts: CreateContextOptions) => {
  return createInnerTRPCContext(opts)
}

const t = initTRPC.context<typeof createTRPCContext>().create({
  transformer: undefined,
  errorFormatter({ shape }) {
    return shape
  },
})

export const createTRPCRouter = t.router
export const publicProcedure = t.procedure

export const protectedProcedure = t.procedure.use(
  t.middleware(async ({ ctx, next }) => {
    const authHeader = ctx.req.headers.get('authorization')
    
    if (!authHeader?.startsWith('Bearer ')) {
      throw new TRPCError({
        code: 'UNAUTHORIZED',
        message: 'No authorization header',
      })
    }

    const token = authHeader.substring(7)
    
    // Create a Supabase client with the user's session token
    const supabaseClient = createClient<Database>(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        global: {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      }
    )

    const { data: { user }, error } = await supabaseClient.auth.getUser()

    if (error || !user) {
      throw new TRPCError({
        code: 'UNAUTHORIZED',
        message: 'Invalid session',
      })
    }

    return next({
      ctx: {
        ...ctx,
        user,
        supabase: supabaseClient,
      },
    })
  })
)