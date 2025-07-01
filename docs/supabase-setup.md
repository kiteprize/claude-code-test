# Supabase 설정 가이드

이 가이드는 Supabase 프로젝트를 설정하고 데이터베이스를 초기화하는 방법을 설명합니다.

## 1. Supabase 프로젝트 생성

1. [Supabase 대시보드](https://supabase.com/dashboard)에 접속
2. "New project" 버튼 클릭
3. 프로젝트 이름, 데이터베이스 비밀번호 설정
4. 지역 선택 (가까운 지역 권장)
5. 프로젝트 생성 완료 대기

## 2. 환경 변수 설정

프로젝트 설정 페이지에서 다음 정보를 복사하여 `.env.local` 파일에 추가:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

## 3. 데이터베이스 스키마 적용

1. Supabase 대시보드에서 "SQL Editor" 탭으로 이동
2. `database/schema.sql` 파일의 내용을 복사하여 붙여넣기
3. "Run" 버튼을 클릭하여 스키마 적용

## 4. 인증 설정

### 4.1 이메일 인증 설정
1. Authentication > Settings 탭으로 이동
2. "Enable email confirmations" 활성화
3. 이메일 템플릿 커스터마이징 (선택사항)

### 4.2 소셜 로그인 설정 (선택사항)

#### Google 로그인
1. [Google Cloud Console](https://console.cloud.google.com/)에서 OAuth 2.0 클라이언트 생성
2. Supabase Authentication > Providers에서 Google 활성화
3. Client ID, Client Secret 입력
4. Authorized redirect URI 추가: `https://your-project-id.supabase.co/auth/v1/callback`

#### GitHub 로그인
1. GitHub > Settings > Developer settings > OAuth Apps에서 새 앱 생성
2. Supabase Authentication > Providers에서 GitHub 활성화
3. Client ID, Client Secret 입력
4. Authorization callback URL: `https://your-project-id.supabase.co/auth/v1/callback`

## 5. Row Level Security (RLS) 확인

데이터베이스 테이블에 다음 정책이 적용되었는지 확인:

- **profiles 테이블**: 사용자가 자신의 프로필만 조회/수정 가능
- **posts 테이블**: 모든 사용자가 게시물 조회 가능, 작성자만 수정/삭제 가능

## 6. 실시간 기능 활성화 (선택사항)

1. Database > Replication 탭으로 이동
2. 실시간 업데이트를 원하는 테이블 선택
3. "Enable" 버튼 클릭

## 7. 타입 자동 생성 (선택사항)

Supabase CLI를 사용하여 TypeScript 타입을 자동 생성할 수 있습니다:

```bash
# Supabase CLI 설치
npm install -g supabase

# 로그인
supabase login

# 타입 생성
supabase gen types typescript --project-id your-project-id > src/types/database.types.ts
```

## 트러블슈팅

### 연결 오류
- 환경 변수가 올바르게 설정되었는지 확인
- Supabase 프로젝트가 활성 상태인지 확인

### 인증 오류
- RLS 정책이 올바르게 설정되었는지 확인
- 사용자가 올바른 권한을 가지고 있는지 확인

### 실시간 기능 작동 안 함
- Replication 설정이 활성화되었는지 확인
- 네트워크 방화벽 설정 확인