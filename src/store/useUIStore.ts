import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

interface UIState {
  // Sidebar state
  sidebarOpen: boolean
  setSidebarOpen: (open: boolean) => void
  toggleSidebar: () => void

  // Modal state
  modalOpen: boolean
  modalType: string | null
  modalData: any
  openModal: (type: string, data?: any) => void
  closeModal: () => void

  // Loading states
  isLoading: boolean
  setLoading: (loading: boolean) => void

  // Toast notifications
  toasts: Toast[]
  addToast: (toast: Omit<Toast, 'id'>) => void
  removeToast: (id: string) => void

  // Dark mode
  darkMode: boolean
  toggleDarkMode: () => void
  setDarkMode: (dark: boolean) => void
}

interface Toast {
  id: string
  type: 'success' | 'error' | 'warning' | 'info'
  title: string
  message?: string
  duration?: number
}

export const useUIStore = create<UIState>()(
  devtools(
    (set, get) => ({
      // Sidebar
      sidebarOpen: false,
      setSidebarOpen: (open) => set({ sidebarOpen: open }, false, 'setSidebarOpen'),
      toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen }), false, 'toggleSidebar'),

      // Modal
      modalOpen: false,
      modalType: null,
      modalData: null,
      openModal: (type, data) => set({ modalOpen: true, modalType: type, modalData: data }, false, 'openModal'),
      closeModal: () => set({ modalOpen: false, modalType: null, modalData: null }, false, 'closeModal'),

      // Loading
      isLoading: false,
      setLoading: (loading) => set({ isLoading: loading }, false, 'setLoading'),

      // Toasts
      toasts: [],
      addToast: (toast) => {
        const id = Math.random().toString(36).substr(2, 9)
        const newToast = { ...toast, id }
        set((state) => ({ toasts: [...state.toasts, newToast] }), false, 'addToast')
        
        // Auto remove toast after duration
        const duration = toast.duration || 5000
        setTimeout(() => {
          get().removeToast(id)
        }, duration)
      },
      removeToast: (id) => set((state) => ({ 
        toasts: state.toasts.filter(toast => toast.id !== id) 
      }), false, 'removeToast'),

      // Dark mode
      darkMode: false,
      toggleDarkMode: () => {
        const newDarkMode = !get().darkMode
        set({ darkMode: newDarkMode }, false, 'toggleDarkMode')
        
        // Save to localStorage
        if (typeof window !== 'undefined') {
          localStorage.setItem('darkMode', newDarkMode.toString())
          document.documentElement.classList.toggle('dark', newDarkMode)
        }
      },
      setDarkMode: (dark) => {
        set({ darkMode: dark }, false, 'setDarkMode')
        
        // Save to localStorage
        if (typeof window !== 'undefined') {
          localStorage.setItem('darkMode', dark.toString())
          document.documentElement.classList.toggle('dark', dark)
        }
      },
    }),
    {
      name: 'ui-store',
    }
  )
)

// Initialize dark mode from localStorage
if (typeof window !== 'undefined') {
  const savedDarkMode = localStorage.getItem('darkMode')
  if (savedDarkMode !== null) {
    const isDark = savedDarkMode === 'true'
    useUIStore.getState().setDarkMode(isDark)
  } else {
    // Default to system preference
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    useUIStore.getState().setDarkMode(prefersDark)
  }
}