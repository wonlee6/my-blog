---
title: '사이드 프로젝트 마이그레이션'
createdAt: '2025-01-02'
tags: ['Nextjs', 'Turbo', 'Contentlayer', 'Etc']
description: '이전 버전의 기술 스택들을 최신 버전으로 마이그레이션 및 turbo, contentlayer 추가하여 적용시켜보기'
---

Blog 및 Chart, Web-build 관련 사이드 프로젝트를 구현했는데, 최근 monorepo를 이용한 프로젝트를 다루어보고 싶어 다시 만들기로 결정

이유

1. 캐싱을 통한 속도 향상
2. 병렬 작업 처리
3. 스케일링과 유지보수 용이성
4. Vercel 플랫폼 간의 지원
5. 공통 모듈 관리
   등등 여러 이점들이 있는 것으로 판단되었고, `pnpm`을 사용해보기로 함!

## Turborepo 시작하기

먼저 새로운 Turborepo 프로젝트를 시작하려면:

```bash
pnpm dlx create-turbo@latest
```

이 명령어를 실행하면 기본적인 monorepo 구조가 생성됩니다.

## 기술 스택

- Next.js, Typescript, zustand
- Tailwindcss, shadcn ui
- Zod, bcrypt, jose
- Supabase, Turbo
- contentlayer

> shadcn ui 최신 버전은 cli 통해 모노레포 지원 시작

## 설치

### Install

```bash
pnpm dlx shadcn@canary init
```

### shadcn component install

```bash
cd apps/web
npx shadcn@canary add button
```

### File Structure

```
apps
└── web         # Your app goes here.
    ├── app
    │   └── page.tsx
    ├── components
    │   └── login-form.tsx
    ├── components.json
    └── package.json
packages
└── ui          # Your components and dependencies are installed here.
    ├── src
    │   ├── components
    │   │   └── button.tsx
    │   ├── hooks
    │   ├── lib
    │   │   └── utils.ts
    │   └── styles
    │       └── globals.css
    ├── components.json
    └── package.json
package.json
turbo.json
```

## Turbo 설정

### turbo.json 설정 예시

```json
{
  "$schema": "https://turbo.build/schema.json",
  "globalDependencies": ["**/.env.*local"],
  "pipeline": {
    "build": {
      "dependsOn": ["^build"],
      "outputs": [".next/**", "!.next/cache/**"]
    },
    "lint": {},
    "dev": {
      "cache": false,
      "persistent": true
    }
  }
}
```

## 공통 모듈 관리 예제

### Prettier

> packages > prettier-config > prettier.config.js

```js
export default {
  tabWidth: 2,
  bracketSpacing: true,
  singleQuote: true,
  bracketSameLine: true,
  trailingComma: 'none',
  printWidth: 100,
  semi: false,
  jsxSingleQuote: true
}
```

### 동일 경로 package.json

```json
{
  "name": "@workspace/prettier-config",
  "version": "0.0.0",
  "type": "module",
  "private": true,
  "exports": {
    "./prettier": "./prettier.js"
  }
}
```

### Root에서 pnpm install 이후 `apps/web` 이동 후 `prettier.config.js`

```js
import prettierConfig from '@workspace/prettier-config/prettier'

export default {
  ...prettierConfig
}
```

### contentlayer

md, mdx 확장자 파일 관리를 위한 라이브러리 설치

> 우선 md 파일을 위한 설정만 적용

```bash
pnpm install contentlayer2 next-contentlayer2 remarkGfm rehypePrettyCode highlight
```

```js
// next.config.mjs
import { withContentlayer } from 'next-contentlayer2'

/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['@workspace/ui'],
  reactStrictMode: true
}

export default withContentlayer(nextConfig)
```

```ts
// apps/web/contentlayer.config.ts
import { defineDocumentType, makeSource } from 'contentlayer2/source-files'
import highlight from 'rehype-highlight'
import { rehypePrettyCode } from 'rehype-pretty-code'
import remarkGfm from 'remark-gfm'

export const Post = defineDocumentType(() => ({
  name: 'Post',
  contentType: 'markdown',
  filePathPattern: `**/*.md`,
  fields: {
    title: {
      type: 'string',
      required: true
    },
    description: {
      type: 'string',
      required: true
    },
    tags: {
      type: 'list', // string[]
      of: { type: 'string' },
      required: true
    },
    createdAt: {
      type: 'date',
      required: true
    }
  },
  computedFields: {
    url: {
      type: 'string',
      resolve: (post) => `/posts/${post._raw.flattenedPath}`
    }
  }
}))

export default makeSource({
  // 마크다운 파일이 저장되어 있는 루트 폴더
  contentDirPath: 'posts',
  documentTypes: [Post],
  markdown: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [
      [
        rehypePrettyCode,
        {
          theme: 'github-dark', // 코드작성시 적용할 테마
          onVisitLine(node) {
            // 줄 번호 추가
            if (node.children.length === 0) {
              node.children = [{ type: 'text', value: ' ' }]
            }
          },
          onVisitHighlightedLine(node) {
            // 하이라이트된 줄 스타일링
            node.properties.className.push('highlighted')
          }
        }
      ],
      highlight
    ]
  }
})
```

md 파일 안에는 정의해둔 fields 값들을 넣는다.

```md
---
title: 'IndexedDB 사용해보기'
createdAt: '2024-07-08'
tags: ['Web Storage', 'Crypto-js', 'Etc']
description: 'IndexedDB 활용 방법, crypto-js 사용하여 데이터 암호화하기'
---
```

만약 `required`: `true` 일 때, 해당 필드 값이 없을 경우 build 시 경고문이 나오게 됨.

이렇게 설정 후 build 시 루트에 `.contentlayer` 폴더가 생성된다. 해당 폴더안에는 정의해둔 Post 폴더 관련 타입 및 데이터들이 들어있다.

### 포스트 데이터 사용하기

```ts
// .contentlayer
export type Post = {
  /** File path relative to `contentDirPath` */
  _id: string
  _raw: Local.RawDocumentData
  type: 'Post'
  title: string
  description: string
  tags: string[]
  createdAt: IsoDateTimeString
  url: string // computedFields에서 추가한 필드
  /** Markdown file body */
  body: Markdown
}

// app/page.tsx
import { allPosts } from '@/.contentlayer/generated'

// 날짜순으로 정렬하여 포스트 가져오기
const posts = allPosts.sort((a, b) => {
  return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
})
```

> 참고로 gitignore 에 `.contentlayer` 추가했음
