export type NextjsGuideSection = {
  id: string;
  title: string;
  summary: string;
  bullets?: string[];
  code?: string;
  callout?: string;
};

export type NextjsGuideChapter = {
  id: string;
  label: string;
  description: string;
  outcome: string;
  sections: NextjsGuideSection[];
};

export const nextjsGuideChapters: NextjsGuideChapter[] = [
  {
    id: 'nextjs-setup',
    label: '1. 从零创建一个能跑的 Next.js 项目',
    description:
      '先把项目真正创建起来，再谈 App Router 和服务端能力。这里不讲空话，只讲第一次开项目时你应该怎么做、每个选项代表什么，以及最小可运行骨架长什么样。',
    outcome:
      '你能独立创建一个 Next.js 项目，知道常见目录的职责，并能把开发、构建、预览这条链路完整跑通。',
    sections: [
      {
        id: 'nextjs-create-project',
        title: '初始化命令和推荐选项',
        summary:
          '第一次学习 Next.js，最稳的方式就是直接使用官方脚手架，启用 TypeScript、ESLint、App Router 和 src 目录。',
        bullets: [
          '优先使用 `create-next-app`，不要自己手搓 Vite 再一点点补功能。',
          '建议开启 TypeScript，避免后面服务端和客户端边界混乱。',
          '建议开启 App Router，这是当前主线能力，不必再从旧版 Pages Router 起步。',
          '如果团队会写别名，建议保留 `@/*`，组件和服务层引用会更清晰。',
        ],
        code: `npx create-next-app@latest next-starter\n\n# 建议选项\n# TypeScript: Yes\n# ESLint: Yes\n# Tailwind CSS: 视项目而定\n# src/ directory: Yes\n# App Router: Yes\n# import alias: @/*`,
      },
      {
        id: 'nextjs-project-structure',
        title: '最小目录骨架应该怎么看',
        summary:
          'Next.js 工程结构不是随便摆文件。你得先知道 app、components、lib、actions、services 这些目录分别放什么，后面项目才不会一团乱。',
        bullets: [
          '`app` 放路由入口、布局和页面。',
          '`components` 放可复用 UI，不要把所有东西都扔到页面文件里。',
          '`lib` 放通用函数，例如时间处理、请求封装、工具方法。',
          '`services` 或 `server` 放服务端取数和 BFF 拼装逻辑。',
          '`actions` 放 Server Actions，专门处理表单提交和写操作。',
        ],
        code: `src/\n  app/\n    layout.tsx\n    page.tsx\n    dashboard/\n      page.tsx\n  components/\n    site-header.tsx\n  lib/\n    utils.ts\n  services/\n    post-service.ts\n  actions/\n    post-actions.ts`,
      },
      {
        id: 'nextjs-dev-lifecycle',
        title: '开发、构建、预览三条命令',
        summary:
          '很多初学者只会 `npm run dev`，但真正上线前你必须知道本地开发和生产构建是两套环境。',
        bullets: [
          '`npm run dev` 用于本地开发，支持热更新。',
          '`npm run build` 会执行真正的生产构建，很多错误只会在这里暴露。',
          '`npm run start` 是启动生产产物，不等于本地开发模式。',
          '如果构建不过，就说明项目还不能上线，别只盯着浏览器里“看起来能跑”。',
        ],
        code: `npm run dev\nnpm run build\nnpm run start`,
        callout:
          '学习 Next.js 时，任何一章改完都最好顺手跑一次 build。很多客户端/服务端边界错误，在 dev 阶段不会第一时间暴露。',
      },
    ],
  },
  {
    id: 'nextjs-routing',
    label: '2. 真正学会 App Router，而不是只会建 page.tsx',
    description:
      'App Router 是 Next.js 最核心的骨架。你不需要死背所有特殊文件名，但必须理解：页面入口、共享布局、加载态、错误边界、动态路由、路由分组分别解决什么问题。',
    outcome:
      '你能自己搭出一个多页面应用，知道什么时候拆 layout，什么时候加 loading，什么时候用动态路由和 route group。',
    sections: [
      {
        id: 'nextjs-router-files',
        title: '六个最常用文件：page、layout、loading、error、not-found、route',
        summary:
          '如果只学一个文件，那只是在用 Next.js 画页面；真正开始做应用，至少要把这六类入口的职责分清楚。',
        bullets: [
          '`page.tsx` 是页面内容入口。',
          '`layout.tsx` 放共享框架，例如顶部导航、侧栏、主题容器。',
          '`loading.tsx` 在数据等待时显示占位内容。',
          '`error.tsx` 接住该路由段的异常，避免整个页面白屏。',
          '`not-found.tsx` 处理资源不存在时的页面反馈。',
          '`route.ts` 可在该路由段下定义 HTTP 接口。',
        ],
        code: `app/\n  layout.tsx\n  page.tsx\n  posts/\n    page.tsx\n    loading.tsx\n    [slug]/\n      page.tsx\n      not-found.tsx\n  api/\n    posts/\n      route.ts`,
      },
      {
        id: 'nextjs-nested-layout',
        title: '嵌套布局怎么拆才合理',
        summary:
          '不要把所有页面都塞进一个根布局。更好的方式是按产品区域拆布局，例如官网、后台、账号中心各有自己的壳层。',
        bullets: [
          '根布局只做全局配置，例如字体、主题、全局 Provider。',
          '业务布局做区域级结构，例如工作台左侧导航、设置页二级导航。',
          '页面文件只负责具体内容，不要又写导航又写大布局又写取数。',
        ],
        code: `app/\n  layout.tsx\n  (marketing)/\n    layout.tsx\n    page.tsx\n  (dashboard)/\n    layout.tsx\n    dashboard/\n      page.tsx\n    settings/\n      page.tsx`,
      },
      {
        id: 'nextjs-dynamic-routes',
        title: '动态路由、搜索参数和跳转',
        summary:
          '做博客、详情页、搜索页时，你一定会用到动态段和查询参数。这里是第一次真正感受到“文件系统路由有多省事”的地方。',
        bullets: [
          '`[slug]` 适合详情页、用户页、分类页。',
          '`searchParams` 适合搜索、筛选、分页。',
          '跳转优先用 `Link`，不要一开始就写按钮加 `router.push`。',
        ],
        code: `export default async function PostDetail({\n  params,\n  searchParams,\n}: {\n  params: Promise<{ slug: string }>\n  searchParams: Promise<{ preview?: string }>\n}) {\n  const { slug } = await params\n  const { preview } = await searchParams\n\n  return <div>{slug} / {preview}</div>\n}`,
      },
    ],
  },
  {
    id: 'nextjs-data-fetching',
    label: '3. 用对取数和缓存，页面才不会又慢又乱',
    description:
      'Next.js 最大的价值之一，就是把取数放回更合适的位置。但如果你不理解服务端取数、缓存、静态生成和动态渲染，最后只会把所有页面都做成低配 SPA。',
    outcome:
      '你能判断页面应该静态还是动态，知道在服务端如何取数、如何做缓存、什么时候需要强制动态。',
    sections: [
      {
        id: 'nextjs-server-fetch',
        title: '默认先在服务端取数',
        summary:
          'App Router 下，页面和服务端组件本来就运行在服务端。只要不是浏览器交互数据，优先直接在服务端获取。',
        bullets: [
          '文章列表、商品详情、用户主页这类首屏内容，优先在服务端取数。',
          '服务端取数能减少前端首屏等待和重复 loading。',
          '把页面真正需要的数据在服务端就整理好，不要把后端原始结构直接扔给前端。',
        ],
        code: `import { getPostList } from '@/services/post-service'\n\nexport default async function PostPage() {\n  const posts = await getPostList()\n\n  return (\n    <ul>\n      {posts.map((post) => (\n        <li key={post.id}>{post.title}</li>\n      ))}\n    </ul>\n  )\n}`,
      },
      {
        id: 'nextjs-cache-strategy',
        title: '三种常见策略：静态、定时更新、强制动态',
        summary:
          '学 Next.js 不能只会 fetch，你还得知道页面更新频率。不同页面对应不同缓存策略，别一刀切。',
        bullets: [
          '文档、官网、博客这种更新不频繁的页面，可以静态或设置 `revalidate`。',
          '带登录态、权限态、实时性强的页面，用 `cache: "no-store"` 或动态渲染。',
          '数据更新后若需要精准刷新，可配合 `revalidateTag` 或 `revalidatePath`。',
        ],
        code: `const res = await fetch('https://api.example.com/posts', {\n  next: { revalidate: 600, tags: ['posts'] },\n})\n\nconst dashboardRes = await fetch('https://api.example.com/me', {\n  cache: 'no-store',\n})`,
      },
      {
        id: 'nextjs-static-params',
        title: '静态详情页如何预渲染',
        summary:
          '博客、文档、商品详情页常常需要 SEO 和静态化，这时候 `generateStaticParams` 是最直接的做法。',
        bullets: [
          '先生成常见路径，再在页面里按 `params` 取详情。',
          '适合 slug 数量可控、内容页稳定的场景。',
          '如果详情页数量巨大，再结合 ISR 或按需重建。',
        ],
        code: `export async function generateStaticParams() {\n  const posts = await getPostList()\n\n  return posts.map((post) => ({\n    slug: post.slug,\n  }))\n}\n\nexport default async function PostDetail({\n  params,\n}: {\n  params: Promise<{ slug: string }>\n}) {\n  const { slug } = await params\n  const post = await getPostBySlug(slug)\n\n  return <article>{post.title}</article>\n}`,
      },
    ],
  },
  {
    id: 'nextjs-interaction',
    label: '4. 把交互留给客户端，把写操作收回服务端',
    description:
      '这部分才是很多人真正不会用 Next.js 的地方。不是所有组件都该 `use client`，也不是所有提交都该自己再造一套接口。你需要学会划分边界。',
    outcome:
      '你能区分 Server Component 和 Client Component 的职责，并用 Server Actions 做出可提交、可校验、可刷新的表单。',
    sections: [
      {
        id: 'nextjs-client-boundary',
        title: '什么时候才需要 use client',
        summary:
          '只要涉及浏览器事件、局部状态、effect、动画或第三方浏览器组件，再使用客户端组件。其它内容尽量留在服务端。',
        bullets: [
          '按钮点击、受控表单、弹窗状态、拖拽、图表这类适合客户端组件。',
          '纯展示列表、详情、布局壳层、服务端取数组件不要无脑加 `use client`。',
          '客户端组件越大，打到浏览器里的 JS 越多，首屏和交互成本都会变高。',
        ],
        code: `'use client'\n\nimport { useState } from 'react'\n\nexport function Counter() {\n  const [count, setCount] = useState(0)\n\n  return <button onClick={() => setCount(count + 1)}>{count}</button>\n}`,
      },
      {
        id: 'nextjs-server-actions-form',
        title: '用 Server Actions 直接处理表单提交',
        summary:
          '很多后台表单、设置项、评论提交，都可以直接通过 Server Action 完成。这样页面、写操作和缓存刷新会更靠近，结构也更干净。',
        bullets: [
          'Server Action 本质上是运行在服务端的函数，适合新增、修改、删除等写操作。',
          '提交成功后可以直接 `revalidatePath` 刷新当前页面的数据。',
          '仍然要做参数校验和权限判断，不要因为写起来方便就忽略安全边界。',
        ],
        code: `// actions/post-actions.ts\n'use server'\n\nimport { revalidatePath } from 'next/cache'\n\nexport async function createPost(formData: FormData) {\n  const title = String(formData.get('title') ?? '').trim()\n\n  if (!title) {\n    throw new Error('标题不能为空')\n  }\n\n  await db.post.create({ data: { title } })\n  revalidatePath('/posts')\n}\n\n// app/posts/page.tsx\nimport { createPost } from '@/actions/post-actions'\n\nexport default function PostPage() {\n  return (\n    <form action={createPost}>\n      <input name="title" />\n      <button type="submit">提交</button>\n    </form>\n  )\n}`,
      },
      {
        id: 'nextjs-search-params',
        title: '列表页筛选和分页怎么做',
        summary:
          '列表页最适合用 URL 承载筛选条件。这样刷新不会丢状态，分享链接也自然成立，而且服务端和客户端都容易接入。',
        bullets: [
          '关键词、分类、排序、分页都可以挂到 `searchParams`。',
          '服务端页面根据 `searchParams` 取数，客户端筛选组件只负责更新 URL。',
          '这比把所有筛选状态都塞进本地 state 更稳，也更符合 Web 应用习惯。',
        ],
        code: `import Link from 'next/link'\n\nexport default async function PostList({\n  searchParams,\n}: {\n  searchParams: Promise<{ keyword?: string; page?: string }>\n}) {\n  const { keyword = '', page = '1' } = await searchParams\n  const data = await getPosts({ keyword, page: Number(page) })\n\n  return (\n    <div>\n      <Link href="/posts?keyword=react&page=1">React</Link>\n      <div>{data.total} 条结果</div>\n    </div>\n  )\n}`,
      },
    ],
  },
  {
    id: 'nextjs-fullstack',
    label: '5. 用 Next.js 做真正的全栈页面',
    description:
      '如果你只把 Next.js 当成“会 SSR 的 React”，那就太浅了。它真正有价值的地方，是前端团队终于能更自然地承担 BFF、接口聚合、鉴权判断和服务端页面拼装。',
    outcome:
      '你知道如何在 Next.js 里组织 API Route、Middleware、鉴权守卫和 BFF 层，让页面不再直接面对杂乱后端。',
    sections: [
      {
        id: 'nextjs-route-handler',
        title: 'Route Handler 适合干什么',
        summary:
          '不是所有接口都要丢给后端服务单独实现。对前端站点密切相关的接口，例如上传签名、搜索转发、模型流式代理，就很适合放在 `route.ts`。',
        bullets: [
          '对浏览器隐藏敏感密钥。',
          '把多个后端接口拼成更适合前端消费的结构。',
          '承接表单上传、Webhook、中转流式响应等前台相关逻辑。',
        ],
        code: `// app/api/search/route.ts\nimport { NextRequest, NextResponse } from 'next/server'\n\nexport async function GET(request: NextRequest) {\n  const keyword = request.nextUrl.searchParams.get('keyword') ?? ''\n  const res = await fetch(\`https://api.example.com/search?keyword=\${keyword}\`)\n  const data = await res.json()\n\n  return NextResponse.json({\n    list: data.items,\n    total: data.total,\n  })\n}`,
      },
      {
        id: 'nextjs-auth-guard',
        title: '页面鉴权别散落在每个组件里',
        summary:
          'Next.js 里处理登录态，重点不是“有没有 token”，而是在哪一层统一拦截。入口收口得越早，页面就越干净。',
        bullets: [
          'Middleware 适合做未登录拦截和路径级保护。',
          '服务端页面适合读取 cookie/session 后决定是否渲染。',
          '客户端组件不要到处自己请求“我是谁”，那会制造一堆重复请求和 loading。',
        ],
        code: `// middleware.ts\nimport { NextResponse } from 'next/server'\nimport type { NextRequest } from 'next/server'\n\nexport function middleware(request: NextRequest) {\n  const token = request.cookies.get('token')?.value\n\n  if (!token && request.nextUrl.pathname.startsWith('/dashboard')) {\n    return NextResponse.redirect(new URL('/login', request.url))\n  }\n\n  return NextResponse.next()\n}\n\nexport const config = {\n  matcher: ['/dashboard/:path*'],\n}`,
      },
      {
        id: 'nextjs-ai-pattern',
        title: '为什么 AI 前台很适合 Next.js',
        summary:
          '聊天、流式输出、任务执行面板、Agent 工作台这类 AI 产品，很适合 Next.js 承接，因为它天然支持服务端拼装和渐进渲染。',
        bullets: [
          '服务端可以安全调用模型、工具链和私有 API。',
          '前台页面负责消息流、任务状态、结构化结果卡片。',
          '流式响应能自然接入聊天或生成式场景，不必把所有逻辑压回浏览器。',
        ],
        callout:
          '如果你未来要做 AI 产品，Next.js 最值得学的不是某个 API，而是“如何让页面、服务端和模型调用组成一个完整前台系统”。',
      },
    ],
  },
  {
    id: 'nextjs-production',
    label: '6. 上线前你必须做的生产化检查',
    description:
      '会跑 demo 不算会用 Next.js。真正上线时，你要关心环境变量、元信息、图片、构建体积、错误追踪和部署方式。这一章是把“能写”推进到“能交付”。',
    outcome:
      '你能把 Next.js 项目从本地开发推进到可上线状态，并知道最少该检查哪些生产问题。',
    sections: [
      {
        id: 'nextjs-env-metadata',
        title: '环境变量和 SEO 元信息',
        summary:
          '内容站、博客、官网和产品页都离不开 metadata；而服务端调用接口、数据库、第三方服务又离不开环境变量。这两类配置是上线前的基础。',
        bullets: [
          '`NEXT_PUBLIC_` 前缀变量会暴露给浏览器，敏感值不要乱加。',
          '服务端私密变量只在 Node 侧使用。',
          '页面级 `metadata` 至少应配置 title、description，必要时再补 Open Graph。',
        ],
        code: `// app/layout.tsx\nimport type { Metadata } from 'next'\n\nexport const metadata: Metadata = {\n  title: 'Len Blog',\n  description: 'A systems-minded frontend blog',\n}\n\n// 使用环境变量\nconst apiBase = process.env.API_BASE_URL`,
      },
      {
        id: 'nextjs-image-font-script',
        title: '三类最容易拖慢页面的资源',
        summary:
          '上线后最容易出问题的不是 React 本身，而是图片、字体和第三方脚本。尤其是内容站和营销页，一不留神就把性能拖垮。',
        bullets: [
          '图片优先使用 `next/image`，控制尺寸和懒加载。',
          '字体优先用 `next/font`，减少 FOUT 和额外请求。',
          '第三方埋点、客服、图表脚本要克制接入，能延迟就延迟。',
          '不要为了一个局部交互把整页都变成客户端组件。',
        ],
      },
      {
        id: 'nextjs-deploy-checklist',
        title: '上线检查清单',
        summary:
          '如果你准备把项目推到 Vercel 或自托管环境，至少要把下面这些问题一项项过掉。这样项目才算真正能交付。',
        bullets: [
          '确认 `npm run build` 可以稳定通过。',
          '确认登录态、受保护路由和错误页在生产模式可用。',
          '确认关键页面的 metadata、favicon、站点名称都已配置。',
          '确认图片域名、接口域名、环境变量在生产环境齐全。',
          '确认大列表页、详情页和表单页在弱网下也能正常工作。',
        ],
        callout:
          '你真正要学会的不是“Next.js 有哪些能力”，而是“我如何用这些能力搭出一个真实可上线的 Web 产品”。如果按这六章走完，你已经不是只会看概念了，而是能开始动手做项目了。',
      },
    ],
  },
];
