'use client'

import { useAuth } from '@/contexts/AuthContext'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useUIStore } from '@/store'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { 
  ChartBarIcon, 
  EyeIcon, 
  HeartIcon, 
  DocumentTextIcon,
  SunIcon,
  MoonIcon,
  ArrowRightOnRectangleIcon,
  UserCircleIcon,
  EnvelopeIcon,
  CalendarIcon,
  ClockIcon
} from '@heroicons/react/24/outline'

export default function DashboardPage() {
  const { user, loading, signOut } = useAuth()
  const { addToast, darkMode, toggleDarkMode } = useUIStore()
  const router = useRouter()
  const [stats, setStats] = useState({
    posts: 0,
    views: 0,
    likes: 0,
  })

  useEffect(() => {
    if (!loading && !user) {
      router.push('/auth/login')
    } else if (user) {
      // Simulate fetching stats
      setStats({
        posts: Math.floor(Math.random() * 50),
        views: Math.floor(Math.random() * 1000),
        likes: Math.floor(Math.random() * 200),
      })
    }
  }, [user, loading, router])

  const handleSignOut = async () => {
    await signOut()
    addToast({
      type: 'success',
      title: '로그아웃 완료',
      message: '성공적으로 로그아웃되었습니다.',
    })
    router.push('/')
  }

  const handleTestToast = (type: 'success' | 'error' | 'warning' | 'info') => {
    const messages = {
      success: { title: '성공!', message: '작업이 성공적으로 완료되었습니다.' },
      error: { title: '오류!', message: '작업 중 오류가 발생했습니다.' },
      warning: { title: '경고!', message: '주의가 필요한 상황입니다.' },
      info: { title: '정보', message: '새로운 정보가 있습니다.' },
    }
    
    addToast({
      type,
      title: messages[type].title,
      message: messages[type].message,
    })
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-indigo-600"></div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  return (
    <div className={`min-h-screen ${darkMode ? 'dark' : ''}`}>
      {/* Navigation */}
      <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-semibold text-foreground">
                대시보드
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleDarkMode}
              >
                {darkMode ? <SunIcon className="h-5 w-5" /> : <MoonIcon className="h-5 w-5" />}
              </Button>
              <span className="text-sm text-muted-foreground">
                안녕하세요, {user.email}님!
              </span>
              <Button variant="destructive" onClick={handleSignOut} className="flex items-center gap-2">
                <ArrowRightOnRectangleIcon className="h-4 w-4" />
                로그아웃
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0 space-y-6">
          {/* Welcome Section */}
          <div>
            <h2 className="text-3xl font-bold text-foreground">
              환영합니다, {user.user_metadata?.full_name || user.email?.split('@')[0]}님!
            </h2>
            <p className="mt-2 text-muted-foreground">
              여기서 계정 정보와 활동 통계를 확인할 수 있습니다.
            </p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">게시물</CardTitle>
                <DocumentTextIcon className="h-4 w-4 text-blue-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.posts}</div>
                <p className="text-xs text-muted-foreground">
                  +12% from last month
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">조회수</CardTitle>
                <EyeIcon className="h-4 w-4 text-green-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.views.toLocaleString()}</div>
                <p className="text-xs text-muted-foreground">
                  +5% from last month
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">좋아요</CardTitle>
                <HeartIcon className="h-4 w-4 text-red-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.likes}</div>
                <p className="text-xs text-muted-foreground">
                  +8% from last month
                </p>
              </CardContent>
            </Card>
          </div>

          {/* User Info Card */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <UserCircleIcon className="h-5 w-5" />
                사용자 정보
              </CardTitle>
              <CardDescription>
                계정 정보와 프로필 설정을 확인하세요.
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-6 md:grid-cols-2">
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <UserCircleIcon className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">이름</p>
                    <p className="text-sm text-muted-foreground">
                      {user.user_metadata?.full_name || '이름 없음'}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <EnvelopeIcon className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">이메일</p>
                    <p className="text-sm text-muted-foreground">{user.email}</p>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <CalendarIcon className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">가입일</p>
                    <p className="text-sm text-muted-foreground">
                      {new Date(user.created_at).toLocaleDateString('ko-KR')}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <ClockIcon className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">마지막 로그인</p>
                    <p className="text-sm text-muted-foreground">
                      {user.last_sign_in_at 
                        ? new Date(user.last_sign_in_at).toLocaleString('ko-KR') 
                        : '정보 없음'}
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Toast Test Card */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ChartBarIcon className="h-5 w-5" />
                토스트 알림 테스트
              </CardTitle>
              <CardDescription>
                다양한 타입의 알림을 테스트해보세요.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                <Button
                  onClick={() => handleTestToast('success')}
                  className="bg-green-600 hover:bg-green-700"
                >
                  성공
                </Button>
                <Button
                  onClick={() => handleTestToast('error')}
                  variant="destructive"
                >
                  오류
                </Button>
                <Button
                  onClick={() => handleTestToast('warning')}
                  className="bg-yellow-600 hover:bg-yellow-700"
                >
                  경고
                </Button>
                <Button
                  onClick={() => handleTestToast('info')}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  정보
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}