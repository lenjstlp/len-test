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
    id: 'nextjs-overview',
    label: '1. Next.js 到底解决什么问题',
    description:
      '先搞清楚 Next.js 和普通 React 工程的边界。它不是一个组件库，而是一套同时覆盖路由、渲染、数据获取和部署体验的 React 应用框架。',
    outcome:
      '能说清楚 Next.js 的定位、适用场景，以及它为什么在内容站、电商、后台门户和 AI 应用前台里都很常见。',
    sections: [
      {
        id: 'nextjs-positioning',
        title: 'Next.js 的定位',
        summary:
          'Next.js 的核心价值是把前端路由、服务端渲染、静态生成、数据获取和工程约定收敛到一套框架里，减少你自行拼接脚手架的成本。',
        bullets: [
          '它基于 React，但比纯 React 工程多了一整套应用级能力。',
          '适合需要 SEO、首屏性能、内容页面、后台门户和全栈前端协作的项目。',
          '现在的重点能力是 App Router、Server Components、Server Actions 和流式渲染。',
        ],
      },
      {
        id: 'nextjs-when-to-use',
        title: '什么时候选 Next.js',
        summary:
          '当你的项目不仅仅是一个浏览器里的单页应用，而是需要页面入口、服务端能力和更稳的渲染策略时，Next.js 的价值就会体现出来。',
        bullets: [
          '需要 SEO 或首屏可见内容。',
          '需要按页面、模块和布局做清晰入口组织。',
          '希望前端团队承担一部分 BFF 或服务端拼装职责。',
          '希望把 React 工程、部署、路由和数据层约定统一起来。',
        ],
      },
      {
        id: 'nextjs-app-types',
        title: '典型使用场景',
        summary:
          'Next.js 的应用面非常广，但最适合它的通常是内容型、门户型、协作型和智能交互型产品。',
        bullets: [
          '营销官网、博客、文档站、产品展示页。',
          '中后台门户、管理台、工作台和内部平台入口。',
          '带搜索、详情、用户中心和多布局的业务系统。',
          '流式对话、AI agent 前台、人机协作面板一类产品。',
        ],
      },
    ],
  },
  {
    id: 'app-router-core',
    label: '2. App Router 核心结构',
    description:
      'Next.js 新一代能力几乎都围绕 App Router 展开。先把目录结构、layout、page、template、loading、error 的职责理解透，后面才不会乱。',
    outcome: '能独立建立 App Router 项目骨架，并理解每一层目录和文件的职责。',
    sections: [
      {
        id: 'app-router-files',
        title: '文件系统路由约定',
        summary:
          'App Router 用目录和特殊文件名描述应用结构，这套约定是 Next.js 学习的第一道门。',
        code: `app/\n  layout.tsx\n  page.tsx\n  dashboard/\n    layout.tsx\n    page.tsx\n    loading.tsx\n    error.tsx\n  blog/\n    [slug]/\n      page.tsx`,
        bullets: [
          '`page.tsx` 定义页面入口。',
          '`layout.tsx` 定义共享布局。',
          '`loading.tsx` 负责加载态。',
          '`error.tsx` 负责错误边界。',
        ],
      },
      {
        id: 'nested-layout',
        title: '嵌套布局',
        summary:
          'Next.js 的布局系统很适合门户、工作台和多区域页面。你可以按产品结构拆主布局、模块布局和子页面布局。',
        bullets: [
          '根布局负责全局框架，例如主题、字体、导航容器。',
          '模块布局负责具体区域，例如工作台、设置中心、文档区。',
          '嵌套布局可以减少页面重复代码，并让路由结构更像系统结构。',
        ],
      },
      {
        id: 'route-groups',
        title: '路由分组与组织',
        summary:
          '当目录既想表达代码分组，又不想反映到 URL 上时，可以用 route groups 把工程结构和真实路径解耦。',
        bullets: [
          '适合分离 marketing、app、auth 等不同产品区域。',
          '对大型项目很有价值，可以让代码更贴近团队职责划分。',
          '工程结构清晰后，页面增长时不容易失控。',
        ],
      },
    ],
  },
  {
    id: 'rendering-and-data',
    label: '3. 渲染模式与数据获取',
    description:
      'Next.js 真正难的不是会写页面，而是知道什么时候静态、什么时候动态、什么时候流式、什么时候缓存。这个部分决定了性能和复杂度。',
    outcome:
      '能根据页面性质选择合适的渲染和缓存策略，而不是盲目全动态或全静态。',
    sections: [
      {
        id: 'rendering-modes',
        title: '常见渲染模式',
        summary:
          'Next.js 提供了静态生成、动态渲染、增量更新和流式输出等模式，关键是按页面价值和数据变化频率来选。',
        bullets: [
          '静态页面适合文档、官网、营销页。',
          '动态渲染适合用户态、权限态、实时性强的页面。',
          'ISR 适合内容更新不是实时但又需要刷新页面的场景。',
          '流式输出适合大页面拆分和 AI 场景中的渐进展示。',
        ],
      },
      {
        id: 'fetch-cache',
        title: 'fetch、缓存与 revalidate',
        summary:
          'Next.js 对 fetch 做了框架级增强，所以数据获取不仅仅是“调个接口”，还直接关系到缓存和页面更新策略。',
        bullets: [
          '同一个 fetch 是否缓存，会影响页面静态还是动态。',
          '`revalidate` 控制缓存多久失效。',
          '标签化缓存和按路径刷新对 CMS、电商和后台列表很重要。',
        ],
        code: `const res = await fetch('https://api.example.com/posts', {\n  next: { revalidate: 300, tags: ['posts'] },\n})\n\nconst posts = await res.json()`,
      },
      {
        id: 'data-boundary',
        title: '服务端数据边界',
        summary:
          'Next.js 的服务端数据能力让很多原本写在前端请求层里的逻辑可以往服务端收，但也更需要明确边界。',
        bullets: [
          '不要把所有东西都写成客户端请求。',
          '用户敏感逻辑、鉴权拼装、BFF 适配更适合靠近服务端。',
          '页面只消费需要展示的数据，不直接暴露后端杂乱结构。',
        ],
      },
    ],
  },
  {
    id: 'server-components',
    label: '4. Server Components 与 Server Actions',
    description:
      '这是 Next.js 和传统 React SPA 拉开差距的地方。你需要知道哪些组件该留在服务端，哪些交互必须下放到客户端。',
    outcome:
      '能区分 Server Component 和 Client Component 的职责，并能把表单提交和写操作做成 Server Actions。',
    sections: [
      {
        id: 'server-vs-client',
        title: 'Server Component 和 Client Component 的区别',
        summary:
          'Server Component 更适合取数、拼装、权限判断和静态内容；Client Component 更适合交互、状态和浏览器事件。',
        bullets: [
          '默认组件是 Server Component。',
          '只有需要事件、状态、effect 时才加 `use client`。',
          '把能留在服务端的内容留在服务端，可以减少前端 bundle。',
        ],
      },
      {
        id: 'use-client-boundary',
        title: '`use client` 的真正成本',
        summary:
          '很多人一上来给整个页面都加 `use client`，这会让 Next.js 的架构优势大幅缩水。',
        bullets: [
          '一旦组件变成客户端组件，它下面的很多依赖也会进前端包。',
          '过度客户端化会让数据、权限和页面渲染重新回到传统 SPA 问题。',
          '正确做法是把交互岛屿切出来，而不是整页下沉。',
        ],
      },
      {
        id: 'server-actions',
        title: 'Server Actions',
        summary:
          'Server Actions 让很多表单提交和写操作可以直接回到服务端函数，不再必须自己再包一层 API Route。',
        bullets: [
          '适合表单提交、写入数据库、更新状态和触发服务端逻辑。',
          '对内部工具、后台系统和 AI 表单流很方便。',
          '仍然要注意校验、权限和错误处理，不能因为方便就省掉边界。',
        ],
      },
    ],
  },
  {
    id: 'fullstack-patterns',
    label: '5. Next.js 的全栈开发方式',
    description:
      '很多团队学 Next.js 的真正目的是把前端工程推进到更完整的产品交付能力，而不是只会写界面。',
    outcome:
      '理解 Next.js 如何承接 BFF、鉴权、表单、文件上传和 AI 产品前台这类全栈场景。',
    sections: [
      {
        id: 'auth-patterns',
        title: '鉴权与会话',
        summary:
          'Next.js 很常用在有登录、权限、组织和租户的产品里，所以鉴权模式一定要掌握。',
        bullets: [
          '要理解 session、token、middleware、server-side guard 的配合。',
          '登录态判断应尽量在服务端入口收口，而不是散在客户端组件里。',
          '用户信息最好统一通过服务端层做拼装。',
        ],
      },
      {
        id: 'bff-role',
        title: 'BFF 与接口拼装层',
        summary:
          'Next.js 很适合承担前端 BFF 角色，把后端多个接口拼成真正适合页面消费的结构。',
        bullets: [
          '减少前端组件直接面对多个服务接口的复杂度。',
          '可以更安全地处理密钥、鉴权和请求整合。',
          '对 AI 应用来说，也很适合承接模型调用前后的上下文整理。',
        ],
      },
      {
        id: 'ai-frontend',
        title: '为什么 AI 产品前台经常选 Next.js',
        summary:
          'AI 产品前台很适合 Next.js，因为它天然支持流式输出、服务端拼装、路由入口和更灵活的人机交互布局。',
        bullets: [
          '流式消息和渐进渲染更自然。',
          '服务端能处理模型调用、工具结果整理和鉴权。',
          '前端能更专注在聊天、任务流、结果卡片和接管交互。',
        ],
      },
    ],
  },
  {
    id: 'deploy-and-production',
    label: '6. 部署、性能与生产化',
    description:
      '最后要把 Next.js 从本地开发推进到真实上线。这个阶段关注的不只是页面能跑，而是构建、性能、日志和部署约束。',
    outcome:
      '能把 Next.js 项目推到生产环境，并对性能、监控和部署边界有基本判断。',
    sections: [
      {
        id: 'deployment-options',
        title: '部署选择',
        summary:
          'Next.js 既可以部署在 Vercel，也可以自托管。选择哪种方式，取决于团队对成本、可控性和平台能力的要求。',
        bullets: [
          'Vercel 适合快速上线和体验完整能力。',
          '自托管更适合企业内网或有自定义基础设施要求的团队。',
          '部署前要先搞清楚哪些功能依赖 Node runtime，哪些可以 edge。',
        ],
      },
      {
        id: 'performance-checklist',
        title: '性能检查清单',
        summary:
          'Next.js 能帮你做很多优化，但它不是自动魔法。页面还是需要靠你做正确拆分和合理边界。',
        bullets: [
          '控制客户端组件范围。',
          '避免大而重的前端 bundle。',
          '注意图片、字体、第三方脚本和缓存策略。',
          '对流式页面要看真实用户体验，而不是只看本地开发感受。',
        ],
      },
      {
        id: 'production-thinking',
        title: '真正该学会的生产化思维',
        summary:
          '学 Next.js 最终不是为了背 API，而是为了掌握“前端应用如何更像一个完整系统”这件事。',
        bullets: [
          '把页面、服务端、数据获取、缓存和部署看成一体。',
          '让前端团队能承担更多产品交付边界。',
          '在 AI 时代，Next.js 很适合作为新一代智能产品前台框架。',
        ],
        callout:
          '如果你未来想做的不只是一个浏览器页面，而是一整套真正上线的 Web 产品，Next.js 值得认真学。',
      },
    ],
  },
];
