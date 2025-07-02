'use client'

import Link from 'next/link'
import { useAuth } from '@/contexts/AuthContext'
import { Button } from '@/components/ui/Button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card'

export default function Home() {
  const { user, loading } = useAuth()

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-background to-purple-50">
      {/* Navigation */}
      <nav className="bg-background/80 backdrop-blur-md border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-bold text-foreground">
                Full-Stack Boilerplate
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              {loading ? (
                <div className="animate-pulse text-sm text-muted-foreground">로딩 중...</div>
              ) : user ? (
                <Link href="/dashboard">
                  <Button>대시보드</Button>
                </Link>
              ) : (
                <div className="flex gap-3">
                  <Link href="/auth/login">
                    <Button variant="outline">로그인</Button>
                  </Link>
                  <Link href="/auth/signup">
                    <Button>회원가입</Button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center space-y-8">
          <div className="space-y-4">
            <h1 className="text-4xl sm:text-6xl font-bold text-foreground">
              Modern
              <span className="bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent"> Full-Stack </span>
              Boilerplate
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Next.js, tRPC, Supabase Auth, Zustand를 사용한 현대적인 풀스택 애플리케이션 템플릿입니다.
              빠르게 프로젝트를 시작하고 확장 가능한 애플리케이션을 구축하세요.
            </p>
          </div>

          {!user && (
            <div className="flex justify-center gap-4">
              <Link href="/auth/signup">
                <Button size="lg">시작하기</Button>
              </Link>
              <Link href="/auth/login">
                <Button variant="outline" size="lg">로그인</Button>
              </Link>
            </div>
          )}
        </div>

        {/* Features Grid */}
        <div className="mt-20 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <span className="text-2xl">⚡</span>
                Next.js 15
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                App Router, TypeScript, Tailwind CSS가 포함된 최신 React 프레임워크
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <span className="text-2xl">🔐</span>
                Supabase Auth
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                이메일/패스워드 및 소셜 로그인을 지원하는 완전한 인증 시스템
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <span className="text-2xl">🛡️</span>
                tRPC
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                End-to-end 타입 안전성을 보장하는 API 레이어
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <span className="text-2xl">💾</span>
                Supabase
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                PostgreSQL 데이터베이스와 실시간 기능을 제공하는 백엔드 서비스
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <span className="text-2xl">🐻</span>
                Zustand
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                가볍고 직관적인 상태 관리 라이브러리
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <span className="text-2xl">🚀</span>
                CI/CD
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                GitHub Actions과 Vercel을 통한 자동 배포 파이프라인
              </CardDescription>
            </CardContent>
          </Card>
        </div>

        {/* Footer */}
        <footer className="mt-24 border-t pt-12 pb-8">
          <div className="text-center text-muted-foreground">
            <p className="text-sm">
              Built with ❤️ using modern web technologies.
            </p>
            <p className="text-xs mt-2">
              Next.js • tRPC • Supabase • Zustand • Tailwind CSS
            </p>
          </div>
        </footer>
      </main>
    </div>
  )
}