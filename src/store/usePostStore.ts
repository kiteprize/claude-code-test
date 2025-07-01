import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'

interface Post {
  id: string
  title: string
  content: string | null
  author_id: string
  created_at: string
  updated_at: string
  profiles?: {
    id: string
    full_name: string | null
    avatar_url: string | null
  }
}

interface PostState {
  // Posts data
  posts: Post[]
  selectedPost: Post | null
  
  // Pagination
  currentPage: number
  totalPages: number
  hasNextPage: boolean
  hasPreviousPage: boolean
  
  // Filters and search
  searchQuery: string
  sortBy: 'created_at' | 'updated_at' | 'title'
  sortOrder: 'asc' | 'desc'
  
  // Actions
  setPosts: (posts: Post[]) => void
  addPost: (post: Post) => void
  updatePost: (id: string, updates: Partial<Post>) => void
  removePost: (id: string) => void
  setSelectedPost: (post: Post | null) => void
  
  // Pagination actions
  setCurrentPage: (page: number) => void
  setTotalPages: (total: number) => void
  setHasNextPage: (hasNext: boolean) => void
  setHasPreviousPage: (hasPrev: boolean) => void
  
  // Filter actions
  setSearchQuery: (query: string) => void
  setSortBy: (sortBy: 'created_at' | 'updated_at' | 'title') => void
  setSortOrder: (order: 'asc' | 'desc') => void
  
  // Utility actions
  clearPosts: () => void
  reset: () => void
}

const initialState = {
  posts: [],
  selectedPost: null,
  currentPage: 1,
  totalPages: 1,
  hasNextPage: false,
  hasPreviousPage: false,
  searchQuery: '',
  sortBy: 'created_at' as const,
  sortOrder: 'desc' as const,
}

export const usePostStore = create<PostState>()(
  devtools(
    persist(
      (set, get) => ({
        ...initialState,
        
        // Posts actions
        setPosts: (posts) => set({ posts }, false, 'setPosts'),
        addPost: (post) => set((state) => ({ 
          posts: [post, ...state.posts] 
        }), false, 'addPost'),
        updatePost: (id, updates) => set((state) => ({
          posts: state.posts.map(post => 
            post.id === id ? { ...post, ...updates } : post
          ),
          selectedPost: state.selectedPost?.id === id 
            ? { ...state.selectedPost, ...updates } 
            : state.selectedPost
        }), false, 'updatePost'),
        removePost: (id) => set((state) => ({
          posts: state.posts.filter(post => post.id !== id),
          selectedPost: state.selectedPost?.id === id ? null : state.selectedPost
        }), false, 'removePost'),
        setSelectedPost: (post) => set({ selectedPost: post }, false, 'setSelectedPost'),
        
        // Pagination actions
        setCurrentPage: (page) => set({ currentPage: page }, false, 'setCurrentPage'),
        setTotalPages: (total) => set({ totalPages: total }, false, 'setTotalPages'),
        setHasNextPage: (hasNext) => set({ hasNextPage }, false, 'setHasNextPage'),
        setHasPreviousPage: (hasPrev) => set({ hasPreviousPage: hasPrev }, false, 'setHasPreviousPage'),
        
        // Filter actions
        setSearchQuery: (query) => set({ searchQuery: query, currentPage: 1 }, false, 'setSearchQuery'),
        setSortBy: (sortBy) => set({ sortBy, currentPage: 1 }, false, 'setSortBy'),
        setSortOrder: (order) => set({ sortOrder: order, currentPage: 1 }, false, 'setSortOrder'),
        
        // Utility actions
        clearPosts: () => set({ posts: [], selectedPost: null }, false, 'clearPosts'),
        reset: () => set(initialState, false, 'reset'),
      }),
      {
        name: 'post-store',
        partialize: (state) => ({
          searchQuery: state.searchQuery,
          sortBy: state.sortBy,
          sortOrder: state.sortOrder,
        }),
      }
    ),
    {
      name: 'post-store',
    }
  )
)