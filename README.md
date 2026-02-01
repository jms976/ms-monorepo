# JUI Frontend Monorepo

pnpm + Turborepo 기반의 모노레포 프로젝트입니다. shadcn/ui 컴포넌트와 공통 패키지를 공유합니다.

## 기술 스택

- **패키지 매니저**: pnpm 10.4.1
- **빌드 도구**: Turborepo
- **프레임워크**: Next.js 15, Vite, React 19
- **UI**: shadcn/ui, Tailwind CSS, Lucide Icons
- **린트/포맷**: ESLint, Prettier
- **Git Hooks**: Husky, lint-staged

## 요구 사항

- Node.js >= 20 (`.nvmrc` 기준: v20.12.0)
- pnpm 10.4.1

## 설치

```bash
# pnpm 설치 (없는 경우)
npm install -g pnpm@10.4.1

# 의존성 설치
pnpm install
```

## 프로젝트 구조

```
ms-monorepo/
├── apps/
│   ├── new-jmachine/    # JMachine 메인 애플리케이션 (Next.js + NextAuth)
│   ├── next-app/        # Next.js 컴포넌트/페이지 샘플 앱
│   └── react-app/       # Vite + React 앱
├── packages/
│   ├── ui/              # @common/ui - shadcn/ui 공통 컴포넌트
│   ├── tokens/          # @common/tokens - 디자인 토큰 (색상, 폰트 등)
│   ├── utils/           # @common/utils - 유틸리티 함수
│   ├── types/           # @common/types - TypeScript 타입 정의
│   ├── eslint-config/   # 공통 ESLint 설정
│   ├── typescript-config/ # 공통 TypeScript 설정
│   └── jest-config/     # 공통 Jest 설정
└── storybook/           # 컴포넌트 문서화
```

## 주요 스크립트

| 명령어 | 설명 |
|--------|------|
| `pnpm dev` | 모든 앱 개발 서버 실행 |
| `pnpm build` | 전체 빌드 |
| `pnpm lint` | 변경된 패키지 린트 실행 |
| `pnpm format` | Prettier 포맷팅 |
| `pnpm test` | 테스트 실행 |
| `pnpm test:type` | 타입 체크 |
| `pnpm generate:palette` | CSS 팔레트 생성 |
| `pnpm generate:icon` | 아이콘 어노테이션 생성 |

## 앱별 실행

```bash
# new-jmachine (JMachine 메인 앱)
pnpm new-jmachine dev

# next-app
pnpm next-app dev

# react-app (Vite)
pnpm react-app dev

# Storybook
pnpm storybook:dev
```


## 패키지 사용

앱에서 공통 패키지 import 예시:

```tsx
import { Button } from "@common/ui";
import { tokens } from "@common/tokens";
import { useDebounce } from "@common/utils";
```

## 앱 설명

### new-jmachine

- Next.js 15 + App Router
- NextAuth 인증
- TanStack Query (React Query)
- 주요 기능: 에셋 관리, 시나리오, 통계, 타겟 선택 등

### next-app

- Next.js 15 샘플/데모 앱
- UI 컴포넌트 예제 (box, tabs, osy 등)

### react-app

- Vite + React 19
- 경량 개발 환경
