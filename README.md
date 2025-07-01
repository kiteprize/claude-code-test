# Full-Stack Boilerplate

Next.js + tRPC + Supabase Auth + Zustand를 사용한 현대적인 풀스택 보일러플레이트입니다.

## 🛠️ 기술 스택

- **Frontend**: Next.js 15, React 19, TypeScript
- **Styling**: Tailwind CSS
- **API**: tRPC (End-to-end typesafe APIs)
- **Authentication**: Supabase Auth
- **Database**: Supabase PostgreSQL
- **State Management**: Zustand
- **Deployment**: Vercel
- **CI/CD**: GitHub Actions

## 🚀 시작하기

### 1. 의존성 설치

```bash
npm install
```

### 2. 환경 변수 설정

`.env.local` 파일을 생성하고 다음 변수들을 설정하세요:

```env
# Database (Supabase)
DATABASE_URL="postgresql://username:password@db.supabase.co:5432/postgres"
DIRECT_URL="postgresql://username:password@db.supabase.co:5432/postgres"

# NextAuth
NEXTAUTH_SECRET="your-secret-key"
NEXTAUTH_URL="http://localhost:3000"

# OAuth Providers (선택사항)
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"
GITHUB_ID="your-github-client-id"
GITHUB_SECRET="your-github-client-secret"
```

### 3. 데이터베이스 설정

```bash
# Prisma 마이그레이션 실행
npx prisma migrate dev

# Prisma 클라이언트 생성
npx prisma generate
```

### 4. 개발 서버 실행

```bash
npm run dev
```

http://localhost:3000에서 애플리케이션을 확인할 수 있습니다.

## 📁 프로젝트 구조

```
src/
├── app/                 # Next.js App Router
│   ├── api/            # API 라우트
│   ├── auth/           # 인증 관련 페이지
│   ├── dashboard/      # 대시보드 페이지
│   ├── globals.css     # 글로벌 스타일
│   ├── layout.tsx      # 루트 레이아웃
│   └── page.tsx        # 홈 페이지
├── components/         # 재사용 가능한 컴포넌트
├── hooks/             # 커스텀 React 훅
├── lib/               # 유틸리티 함수 및 설정
├── server/            # tRPC 서버 관련 코드
├── store/             # Zustand 스토어
└── types/             # TypeScript 타입 정의
```

## 🔧 주요 명령어

```bash
# 개발 서버 실행
npm run dev

# 프로덕션 빌드
npm run build

# 프로덕션 서버 실행
npm start

# 린트 검사
npm run lint

# 타입 검사
npm run type-check

# 데이터베이스 마이그레이션
npx prisma migrate dev

# Prisma Studio 실행
npx prisma studio
```

## 🎯 주요 기능

- ✅ Next.js 15 with App Router
- ✅ TypeScript 지원
- ✅ Tailwind CSS 스타일링
- ✅ tRPC를 통한 타입 안전한 API
- ✅ Supabase Auth 인증 시스템
- ✅ Supabase PostgreSQL 데이터베이스
- ✅ Zustand 상태 관리
- ✅ 다크 모드 지원
- ✅ Toast 알림 시스템
- ✅ ESLint + TypeScript 린팅
- ✅ GitHub Actions CI/CD
- ✅ Vercel 배포 설정

## 🚀 배포하기

### GitHub Actions CI/CD

프로젝트는 GitHub Actions를 통한 자동 CI/CD 파이프라인을 포함합니다:

- **린트 및 테스트**: ESLint, TypeScript 타입 체크, 빌드 테스트
- **보안 스캔**: npm audit, CodeQL 분석
- **프리뷰 배포**: Pull Request 시 Vercel 프리뷰 배포
- **프로덕션 배포**: main 브랜치 푸시 시 자동 배포

### Vercel 배포 설정

1. [Vercel](https://vercel.com)에 GitHub 저장소 연결
2. 환경 변수 설정:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`
   - `NEXT_PUBLIC_APP_URL`

3. GitHub Secrets 설정 (GitHub Actions용):
   - `VERCEL_TOKEN`: Vercel 토큰
   - `VERCEL_ORG_ID`: Vercel 조직 ID
   - `VERCEL_PROJECT_ID`: Vercel 프로젝트 ID
   - `VERCEL_DOMAIN`: 배포 도메인

## 📚 문서

- [Next.js Documentation](https://nextjs.org/docs)
- [tRPC Documentation](https://trpc.io/docs)
- [NextAuth.js Documentation](https://next-auth.js.org/)
- [Prisma Documentation](https://www.prisma.io/docs)
- [Supabase Documentation](https://supabase.com/docs)
- [Zustand Documentation](https://zustand-demo.pmnd.rs/)

## 🤝 기여하기

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 라이선스

이 프로젝트는 MIT 라이선스 하에 배포됩니다. 자세한 내용은 `LICENSE` 파일을 참조하세요.