# 배포 가이드

이 문서는 풀스택 보일러플레이트를 프로덕션 환경에 배포하는 방법을 설명합니다.

## Vercel 배포

### 1. Vercel 계정 설정

1. [Vercel 웹사이트](https://vercel.com)에서 계정 생성
2. GitHub 계정과 연결
3. 프로젝트 저장소를 Vercel에 Import

### 2. 환경 변수 설정

Vercel 대시보드에서 다음 환경 변수를 설정:

```env
# Supabase 설정
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# 앱 설정
NEXT_PUBLIC_APP_URL=https://your-domain.vercel.app
```

### 3. Build 설정

Vercel은 `vercel.json` 파일을 자동으로 인식하여 다음과 같이 설정됩니다:

- **Framework**: Next.js
- **Build Command**: `npm run build`
- **Output Directory**: `.next`
- **Install Command**: `npm ci`

### 4. 도메인 설정

1. Vercel 대시보드에서 프로젝트 선택
2. Settings > Domains 탭으로 이동
3. 커스텀 도메인 추가 (선택사항)

## GitHub Actions CI/CD

### 1. GitHub Secrets 설정

GitHub 저장소의 Settings > Secrets and variables > Actions에서 다음 시크릿을 추가:

#### Vercel 관련
```
VERCEL_TOKEN=your-vercel-token
VERCEL_ORG_ID=your-org-id
VERCEL_PROJECT_ID=your-project-id
VERCEL_DOMAIN=your-domain.vercel.app
```

#### Supabase 관련
```
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
NEXT_PUBLIC_APP_URL=https://your-domain.vercel.app
```

### 2. Vercel 토큰 생성

1. [Vercel 대시보드](https://vercel.com/account/tokens)에서 새 토큰 생성
2. 토큰을 `VERCEL_TOKEN` 시크릿으로 저장

### 3. 프로젝트 ID 확인

```bash
# Vercel CLI 설치
npm i -g vercel

# 프로젝트에 연결
vercel link

# 프로젝트 정보 확인
vercel env ls
```

## CI/CD 파이프라인 구조

### Pull Request 워크플로우

1. **코드 품질 검사**
   - ESLint 실행
   - TypeScript 타입 체크
   - 빌드 테스트

2. **보안 스캔**
   - npm audit 실행
   - CodeQL 정적 분석

3. **프리뷰 배포**
   - Vercel 프리뷰 환경에 배포
   - PR에 배포 URL 코멘트 추가

### Main 브랜치 워크플로우

1. **품질 검사** (PR과 동일)
2. **보안 스캔** (PR과 동일)
3. **프로덕션 배포**
   - Vercel 프로덕션 환경에 배포
   - 배포 성공 알림

## 모니터링 및 로깅

### Vercel Analytics

1. Vercel 대시보드에서 Analytics 탭 확인
2. 성능 메트릭 및 사용자 분석 데이터 모니터링

### Error Tracking

프로덕션 환경에서 오류 추적을 위해 다음 서비스 고려:

- **Sentry**: 실시간 오류 모니터링
- **LogRocket**: 사용자 세션 재생
- **Vercel 내장 로깅**: 함수 로그 확인

## 성능 최적화

### 1. 이미지 최적화

```jsx
import Image from 'next/image'

// Next.js Image 컴포넌트 사용
<Image
  src="/profile.jpg"
  alt="Profile"
  width={500}
  height={300}
  priority // LCP 개선을 위해 중요한 이미지에 사용
/>
```

### 2. 코드 분할

```jsx
import dynamic from 'next/dynamic'

// 동적 imports로 번들 크기 최적화
const DynamicComponent = dynamic(() => import('./HeavyComponent'), {
  loading: () => <p>Loading...</p>,
})
```

### 3. 캐싱 전략

```javascript
// API 응답 캐싱
export async function GET() {
  return new Response(JSON.stringify(data), {
    headers: {
      'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=300'
    }
  })
}
```

## 보안 고려사항

### 1. 환경 변수 보안

- 민감한 정보는 절대 클라이언트 사이드에 노출하지 않기
- `NEXT_PUBLIC_` 접두사가 없는 변수만 서버에서 접근 가능

### 2. API 보안

- tRPC 미들웨어를 통한 인증 검증
- Rate limiting 구현 (필요시)
- CORS 설정 확인

### 3. 데이터베이스 보안

- Supabase RLS (Row Level Security) 정책 적용
- API 키 정기적 로테이션

## 트러블슈팅

### 일반적인 문제들

1. **빌드 실패**
   - TypeScript 오류 확인
   - 환경 변수 설정 확인
   - 의존성 충돌 해결

2. **배포 실패**
   - Vercel 로그 확인
   - 환경 변수 값 검증
   - API 엔드포인트 응답 확인

3. **성능 문제**
   - Vercel Analytics 데이터 분석
   - Bundle analyzer 사용
   - 이미지 최적화 적용

### 로그 확인 방법

```bash
# Vercel 함수 로그 확인
vercel logs

# 특정 배포의 로그 확인
vercel logs --follow
```