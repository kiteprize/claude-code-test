import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'

interface UserPreferences {
  language: 'ko' | 'en'
  timezone: string
  notifications: {
    email: boolean
    push: boolean
    marketing: boolean
  }
  privacy: {
    profileVisibility: 'public' | 'private' | 'friends'
    showEmail: boolean
    showOnlineStatus: boolean
  }
  display: {
    postsPerPage: number
    showAvatars: boolean
    compactMode: boolean
  }
}

interface SettingsState extends UserPreferences {
  // Actions
  setLanguage: (language: 'ko' | 'en') => void
  setTimezone: (timezone: string) => void
  updateNotifications: (notifications: Partial<UserPreferences['notifications']>) => void
  updatePrivacy: (privacy: Partial<UserPreferences['privacy']>) => void
  updateDisplay: (display: Partial<UserPreferences['display']>) => void
  reset: () => void
  
  // Bulk updates
  updatePreferences: (preferences: Partial<UserPreferences>) => void
}

const defaultPreferences: UserPreferences = {
  language: 'ko',
  timezone: 'Asia/Seoul',
  notifications: {
    email: true,
    push: true,
    marketing: false,
  },
  privacy: {
    profileVisibility: 'public',
    showEmail: false,
    showOnlineStatus: true,
  },
  display: {
    postsPerPage: 10,
    showAvatars: true,
    compactMode: false,
  },
}

export const useSettingsStore = create<SettingsState>()(
  devtools(
    persist(
      (set, get) => ({
        ...defaultPreferences,
        
        setLanguage: (language) => {
          set({ language }, false, 'setLanguage')
          
          // Apply language change to document
          if (typeof window !== 'undefined') {
            document.documentElement.lang = language
          }
        },
        
        setTimezone: (timezone) => set({ timezone }, false, 'setTimezone'),
        
        updateNotifications: (notifications) => set((state) => ({
          notifications: { ...state.notifications, ...notifications }
        }), false, 'updateNotifications'),
        
        updatePrivacy: (privacy) => set((state) => ({
          privacy: { ...state.privacy, ...privacy }
        }), false, 'updatePrivacy'),
        
        updateDisplay: (display) => set((state) => ({
          display: { ...state.display, ...display }
        }), false, 'updateDisplay'),
        
        updatePreferences: (preferences) => set((state) => ({
          ...state,
          ...preferences,
          notifications: preferences.notifications 
            ? { ...state.notifications, ...preferences.notifications }
            : state.notifications,
          privacy: preferences.privacy 
            ? { ...state.privacy, ...preferences.privacy }
            : state.privacy,
          display: preferences.display 
            ? { ...state.display, ...preferences.display }
            : state.display,
        }), false, 'updatePreferences'),
        
        reset: () => set(defaultPreferences, false, 'reset'),
      }),
      {
        name: 'settings-store',
        version: 1,
      }
    ),
    {
      name: 'settings-store',
    }
  )
)

// Initialize language on load
if (typeof window !== 'undefined') {
  const currentLanguage = useSettingsStore.getState().language
  document.documentElement.lang = currentLanguage
}