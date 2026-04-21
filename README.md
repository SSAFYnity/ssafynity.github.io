# SSAFYnity Renewal

GitHub Pages 안에서 `#` 없는 정적 경로를 유지하기 위한 공식 홈페이지 마이그레이션 준비 프로젝트입니다.

## 목표

- 기존 `ssafynity.github.io`의 경로 구조를 그대로 유지합니다.
- 기존 콘텐츠, 데이터, 스타일, 인터랙션 코드를 그대로 재사용합니다.
- Astro 정적 출력으로 각 경로마다 실제 HTML 파일을 생성합니다.
- GitHub Pages 배포 구조 안에서 직접 접속 가능한 URL을 보장합니다.

## 현재 구조

- `src/site`
  기존 `ssafynity.github.io/src`에서 React 라우팅 레이어를 걷어내고, Astro에서 재사용하는 데이터·유틸리티·스타일 소스입니다.
- `src/pages`
  실제 Astro 파일 라우팅 엔트리입니다.
- `src/components`
  Astro 페이지가 공통으로 사용하는 프레젠테이션 컴포넌트입니다.
- `../.migration-snapshot/ssafynity-renewal/src`
  원본 React 구현을 비교 검증용으로 보관한 외부 스냅샷입니다. 리뉴얼 프로젝트의 라이브 빌드와 타입체크에는 포함되지 않습니다.
- `public`
  기존 `ssafynity.github.io/public` 전체를 그대로 복사한 정적 자산입니다.
- `scripts/generate-astro-pages.mjs`
  경로 누락이 생기지 않도록 Astro 페이지 파일을 보조 생성하는 스크립트입니다.
- `scripts/verify-migration.mjs`
  원본과 리뉴얼의 데이터/정적 자산 동일성, 정적 라우트 생성 여부, 대표 페이지 출력 결과를 검증하는 스크립트입니다.

## 확인된 내용

- `/events/archive/2025-night-of-ssafynity` 같은 상세 경로가 실제 정적 파일로 생성됩니다.
- `/community`는 `/community/sns`로 정적 리다이렉트됩니다.
- 원본 `data`와 `public`은 현재 리뉴얼 복사본과 동일합니다.
- 라우팅은 더 이상 React Router 중심이 아니라 Astro 파일 라우팅 기준입니다.
- 라이브 페이지 출력에는 React island와 React Router 호환 런타임이 남아 있지 않습니다.

## 실행 명령

기본 터미널 Node가 낮을 수 있으므로, 로컬에서는 아래처럼 Node 20 이상으로 실행하는 것을 권장합니다.

```bash
PATH="/opt/homebrew/opt/node@20/bin:$PATH" npm install
PATH="/opt/homebrew/opt/node@20/bin:$PATH" npm run generate:pages
PATH="/opt/homebrew/opt/node@20/bin:$PATH" npm run build
PATH="/opt/homebrew/opt/node@20/bin:$PATH" npm run verify:migration
```
