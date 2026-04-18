export type FrontendArchitectureBand = {
  id: string;
  title: string;
  role: string;
  summary: string;
  deliverables: string[];
};

export type FrontendArchitectureModule = {
  id: string;
  title: string;
  accent: string;
  summary: string;
  canOwn: string[];
  coreSkills: string[];
  supportLibraries: string[];
  growthSignals: string[];
};

export type FrontendArchitectureLibraryCluster = {
  id: string;
  title: string;
  purpose: string;
  libraries: string[];
};

export type FrontendArchitectureRoadmapStep = {
  id: string;
  title: string;
  summary: string;
  outcome: string;
};

export type FrontendArchitectureFutureShift = {
  id: string;
  title: string;
  summary: string;
  impacts: string[];
  response: string;
};

export type FrontendArchitectureCareerPath = {
  id: string;
  title: string;
  positioning: string;
  summary: string;
  nextSkills: string[];
};

export const frontendArchitectureBands: FrontendArchitectureBand[] = [
  {
    id: 'component-engineer',
    title: '组件工程师',
    role: '能把页面做出来',
    summary:
      '这个阶段的重点是把单页功能和基础交互写稳，建立对组件、接口和页面状态的基本掌控力。',
    deliverables: [
      '独立完成中后台页面、表单、列表和详情页。',
      '能接入接口、处理加载态、空态和异常态。',
      '能在现有组件体系下扩展业务模块，而不是只会复制页面。',
    ],
  },
  {
    id: 'module-owner',
    title: '模块负责人',
    role: '能把模块做稳',
    summary:
      '这个阶段开始真正进入架构层，重点是边界、分层、状态、权限、测试和多人协作能力。',
    deliverables: [
      '能负责一个业务模块的目录结构、状态管理和接口治理。',
      '能设计可维护的数据流，而不是把逻辑塞进页面组件。',
      '能推动规范、抽公共能力，并让团队成员按统一方式协作。',
    ],
  },
  {
    id: 'system-architect',
    title: '系统架构者',
    role: '能把系统做长期',
    summary:
      '这个阶段要站在系统视角看问题，关注性能、交付链路、治理、监控和演进策略，而不只是一两个页面。',
    deliverables: [
      '能搭建多模块项目骨架，并规划依赖边界和权限体系。',
      '能推动设计系统、质量体系、CI/CD 和监控闭环落地。',
      '能判断该引什么库、该拆什么层、该为未来预留什么空间。',
    ],
  },
];

export const frontendArchitectureModules: FrontendArchitectureModule[] = [
  {
    id: 'runtime-browser',
    title: '浏览器与运行时',
    accent: 'from-[#9f8a6a] to-[#c0ad91]',
    summary:
      '这是前端架构的底层地基。你不理解浏览器如何解析、渲染、调度任务和发起网络请求，就很难真正解决性能和稳定性问题。',
    canOwn: [
      '定位页面卡顿、白屏、长任务和重绘抖动问题。',
      '解释为什么同样的代码会在不同渲染阶段表现不同。',
      '为动画、流式渲染、缓存和离线能力做正确技术判断。',
    ],
    coreSkills: [
      'HTML 解析、CSSOM、Layout、Paint、Composite。',
      'Event Loop、微任务/宏任务、RAF、Idle Callback。',
      'Cache、Storage、Cookie、Service Worker、CORS。',
      'Performance 面板、Memory 面板、网络 waterfall 分析。',
    ],
    supportLibraries: [
      'web-vitals',
      'workbox',
      'performance API',
      'Lighthouse',
    ],
    growthSignals: [
      '你能从“感觉页面卡”定位到具体的线程和渲染阶段。',
      '你能解释 SSR、水合、懒加载为什么会影响首屏和交互。',
    ],
  },
  {
    id: 'app-skeleton',
    title: '工程骨架与模块边界',
    accent: 'from-[#7d6a73] to-[#ad959e]',
    summary:
      '这一层决定项目会不会失控。目录结构、依赖方向、共享层抽象和模块职责，是系统能否长期维护的关键。',
    canOwn: [
      '设计中大型前端项目的目录结构和模块分层。',
      '控制业务模块之间的依赖方向，避免项目演化成大泥球。',
      '为多人协作建立统一的代码归属和复用边界。',
    ],
    coreSkills: [
      '页面层、模块层、共享层、基础设施层的拆分方式。',
      '路径别名、模块封装、依赖倒置和复用边界约束。',
      'Monorepo / Package 拆分与跨包依赖规则。',
      '单一数据源、配置同源、能力抽象与演进策略。',
    ],
    supportLibraries: [
      'pnpm workspace',
      'Turborepo',
      'Nx',
      'ESLint import rules',
    ],
    growthSignals: [
      '你能说清楚一段代码应该放在哪一层，而不是只会找个地方先塞进去。',
      '你能在业务扩张时提前做分层，而不是等项目混乱后再被动重构。',
    ],
  },
  {
    id: 'routing-and-permission',
    title: '路由、权限与应用编排',
    accent: 'from-[#617b8c] to-[#8fa5b2]',
    summary:
      '一旦项目有菜单、角色、租户和二级模块，路由就不只是页面跳转，而是应用编排和权限投影层。',
    canOwn: [
      '设计动态路由、菜单、面包屑和权限节点的同源结构。',
      '支持多角色菜单、功能开关和按权限加载页面能力。',
      '为后台系统、门户系统或多应用入口设计统一导航模型。',
    ],
    coreSkills: [
      '路由树设计、懒加载、守卫、重定向、兜底路由。',
      '权限菜单、功能权限、页面权限、按钮权限之间的关系。',
      '路由元信息驱动菜单、标题、面包屑和默认首页。',
      '应用启动时的初始化顺序：配置、权限、路由注册、页面挂载。',
    ],
    supportLibraries: [
      'Vue Router',
      'React Router',
      'CASL',
      'RBAC policy layer',
    ],
    growthSignals: [
      '你能做到菜单、权限、路由只维护一份源数据。',
      '你能让复杂后台系统在角色切换和权限收敛下仍然稳定可维护。',
    ],
  },
  {
    id: 'data-and-state',
    title: '数据层与状态管理',
    accent: 'from-[#5e776f] to-[#88a097]',
    summary:
      '前端复杂度的大头通常不是 UI，而是数据流。能不能区分本地状态、会话状态和服务端状态，决定了项目是否会越来越乱。',
    canOwn: [
      '为复杂业务页面设计稳定的数据流和状态模型。',
      '把接口请求从组件里剥离出来，形成统一的数据层。',
      '控制缓存、重试、分页、筛选、并发取消和错误恢复策略。',
    ],
    coreSkills: [
      'UI 状态、会话状态、业务状态、服务端状态分类。',
      'Store 模型、Query 模型、表单状态和衍生状态的边界。',
      '请求客户端、错误处理、adapter、cache key、mutation 策略。',
      '乐观更新、失效策略、请求去重和数据一致性。',
    ],
    supportLibraries: [
      'Pinia',
      'Redux Toolkit',
      'Zustand',
      'TanStack Query',
      'SWR',
      'Axios',
    ],
    growthSignals: [
      '你能让页面逻辑从“组件里一团 if”变成可解释的数据流。',
      '你能清楚回答每一类状态为什么放这里，而不是放那里。',
    ],
  },
  {
    id: 'design-system',
    title: '组件体系与设计系统',
    accent: 'from-[#6f6984] to-[#9992af]',
    summary:
      '真正成熟的前端系统，组件不是零散堆积，而是有设计令牌、交互规范、可访问性和复用边界的一整套系统。',
    canOwn: [
      '搭建基础组件层、业务组件层和页面装配层。',
      '统一颜色、字体、间距、动效和主题系统。',
      '让不同业务线在视觉和交互上保持一致，同时保留扩展能力。',
    ],
    coreSkills: [
      'Design Token、主题系统、组件 API 设计。',
      '基础组件、业务组件、页面组件的层级划分。',
      '可访问性、键盘交互、空态/异常态/加载态规范。',
      '文档沉淀、组件示例、回归验证和设计协作方式。',
    ],
    supportLibraries: [
      'Element Plus',
      'Ant Design',
      'Radix UI',
      'Headless UI',
      'Tailwind CSS',
      'Storybook',
    ],
    growthSignals: [
      '你开始关心“组件边界和 API 是否稳定”，而不只是页面能不能显示。',
      '你能推动团队共用一套视觉和交互语言，而不是每页都重新发明样式。',
    ],
  },
  {
    id: 'delivery-and-quality',
    title: '质量体系与交付治理',
    accent: 'from-[#5f7a69] to-[#8ca596]',
    summary:
      '前端架构最终要落到交付。测试、规范、构建、CI/CD、灰度和回滚策略，决定了系统是不是能放心上线。',
    canOwn: [
      '建立项目的 lint、type-check、test、build 基线。',
      '设计稳定的发布流水线和环境隔离策略。',
      '把质量从“靠经验”变成“靠机制”。',
    ],
    coreSkills: [
      'ESLint、Prettier、TypeScript 作为基础护栏。',
      '单元测试、集成测试、E2E 测试和测试金字塔。',
      '构建拆分、环境变量、CI 任务编排、灰度与回滚。',
      '代码评审规则、变更风险控制和发布前检查。',
    ],
    supportLibraries: [
      'Vitest',
      'Jest',
      'Playwright',
      'Cypress',
      'GitHub Actions',
      'Vite',
    ],
    growthSignals: [
      '你能让团队在频繁迭代下仍然保持基本稳定性。',
      '你能回答一次发布失败后，系统如何快速定位并安全回滚。',
    ],
  },
  {
    id: 'observability-performance',
    title: '性能、监控与稳定性',
    accent: 'from-[#5f7482] to-[#8ca0ae]',
    summary:
      '架构不是交付完就结束。真正成熟的系统必须能在线上被看见、被衡量、被追踪，才能持续演进。',
    canOwn: [
      '建立错误监控、性能监控和埋点分析体系。',
      '根据线上数据做性能治理，而不是只在本地凭感觉优化。',
      '让前端问题具备可发现、可定位、可追溯的闭环。',
    ],
    coreSkills: [
      '错误采集、Source Map、告警分级、日志关联。',
      '首屏、LCP、INP、CLS、长任务、资源加载指标。',
      '用户行为埋点、漏斗、路径分析和问题归因。',
      '性能预算、容量意识和回归监测。',
    ],
    supportLibraries: [
      'Sentry',
      'Bugsnag',
      'PostHog',
      'Google Analytics',
      'Lighthouse CI',
    ],
    growthSignals: [
      '你开始用线上数据做决策，而不是只盯本地 DevTools。',
      '你能建立“发现问题 -> 定位问题 -> 验证修复”的完整闭环。',
    ],
  },
];

export const frontendArchitectureLibraryClusters: FrontendArchitectureLibraryCluster[] =
  [
    {
      id: 'routing',
      title: '导航与编排',
      purpose: '负责页面入口、守卫、权限投影和应用组织。',
      libraries: ['Vue Router', 'React Router', 'TanStack Router', 'CASL'],
    },
    {
      id: 'state',
      title: '状态与数据',
      purpose: '负责共享状态、服务端缓存、请求生命周期与数据一致性。',
      libraries: ['Pinia', 'Redux Toolkit', 'Zustand', 'TanStack Query', 'SWR'],
    },
    {
      id: 'ui',
      title: '组件与样式',
      purpose: '负责基础组件、设计系统、主题和交互体验。',
      libraries: [
        'Element Plus',
        'Ant Design',
        'Radix UI',
        'Tailwind CSS',
        'UnoCSS',
        'Storybook',
      ],
    },
    {
      id: 'engineering',
      title: '工程与质量',
      purpose: '负责代码规范、测试、构建、持续集成和发布治理。',
      libraries: [
        'ESLint',
        'Prettier',
        'Vitest',
        'Playwright',
        'Vite',
        'GitHub Actions',
      ],
    },
    {
      id: 'monitoring',
      title: '监控与分析',
      purpose: '负责错误追踪、性能观测、埋点和线上反馈闭环。',
      libraries: ['Sentry', 'Bugsnag', 'PostHog', 'GA', 'Lighthouse CI'],
    },
  ];

export const frontendArchitectureRoadmap: FrontendArchitectureRoadmapStep[] = [
  {
    id: 'step-1',
    title: '先把页面做稳',
    summary: '先掌握组件、接口、表单、列表、状态切换和异常处理。',
    outcome: '你能稳定交付单页功能，并理解基础页面的数据流。',
  },
  {
    id: 'step-2',
    title: '再把模块做清楚',
    summary: '开始关注模块边界、目录结构、权限、路由和请求层抽象。',
    outcome: '你能独立负责一个业务模块，而不是只负责一个页面。',
  },
  {
    id: 'step-3',
    title: '然后把系统做长期',
    summary: '建立组件体系、测试基线、工程规范、发布链路和监控闭环。',
    outcome: '你能推动团队形成统一的开发和交付方式。',
  },
  {
    id: 'step-4',
    title: '最后再谈平台化',
    summary: '当多个项目共享基础设施时，再推进 Monorepo、设计系统和平台能力。',
    outcome: '你能从单项目负责人升级为多项目系统设计者。',
  },
];

export const frontendArchitectureFutureShifts: FrontendArchitectureFutureShift[] =
  [
    {
      id: 'ai-coding',
      title: 'AI 会吞掉重复实现，但放大系统设计价值',
      summary:
        '组件搭建、页面拼装、基础 CRUD 和样板代码生成会越来越多地交给 AI，但系统边界、复杂交互、数据流和长期治理不会自动消失。',
      impacts: [
        '低门槛页面开发会更快，纯搬砖型前端岗位会被压缩。',
        '需求理解、架构拆分、问题定位和复杂联调会变得更值钱。',
        '前端工程师会更像“系统导演”，而不是“纯手写页面的人”。',
      ],
      response:
        '别把自己定位成只会写页面的人，要尽快升级到能设计模块边界、抽象状态和驾驭 AI 协作开发的人。',
    },
    {
      id: 'ai-interface',
      title: '前端将从“做界面”转向“做智能交互容器”',
      summary:
        '未来很多产品不再只是表单和列表，而会变成人机协作界面。前端需要承载流式输出、智能体任务态、可解释反馈和多模态交互。',
      impacts: [
        '聊天式交互、任务流 UI、流式渲染和异步协作面板会越来越常见。',
        '前端需要处理模型输出的不确定性，而不是只渲染固定 JSON。',
        '产品交互会从“点击按钮”变成“发出目标、观察执行、接管关键步骤”。',
      ],
      response:
        '前端工程师要补 AI 产品交互、流式数据处理、任务编排可视化和人机接管设计能力。',
    },
    {
      id: 'ai-ops',
      title: '前端会更接近平台和工程治理',
      summary:
        'AI 让写代码更快，但也会让代码量暴涨、质量波动更大。于是架构、规范、评测、监控和交付治理的重要性会进一步上升。',
      impacts: [
        '团队会更依赖 lint、测试、design system、CI 和监控去约束 AI 产出的代码。',
        '前端负责人将更多承担规则制定、平台搭建和质量守门职责。',
        '工程治理能力会从“加分项”变成“保命项”。',
      ],
      response:
        '如果你能把 AI 生成能力接进规范、测试、监控和发布流程里，你的价值会明显高于只会使用生成工具的人。',
    },
  ];

export const frontendArchitectureCareerPaths: FrontendArchitectureCareerPath[] =
  [
    {
      id: 'fullstack',
      title: '走向全栈 / BFF / 平台接口层',
      positioning: '适合想扩大交付边界的人',
      summary:
        '当前端开始理解接口设计、鉴权、缓存、任务编排和服务部署后，最自然的延展方向就是全栈或 BFF。',
      nextSkills: [
        'Node.js / Python 服务开发',
        '数据库与缓存',
        '接口设计、鉴权与部署',
        '任务队列与异步处理',
      ],
    },
    {
      id: 'ai-product-engineer',
      title: '走向 AI 产品工程 / 智能体前台',
      positioning: '适合对未来交互形态敏感的人',
      summary:
        '如果你擅长交互设计和前端工程，未来可以转向 AI 产品工程，负责智能应用的人机协作界面、任务可视化和模型反馈体验。',
      nextSkills: [
        '流式交互与多模态前端',
        'Prompt / Tool 调用理解',
        'Agent 工作流与可解释 UI',
        'AI 产品体验设计',
      ],
    },
    {
      id: 'frontend-architect',
      title: '走向前端架构 / 工程平台 / 设计系统',
      positioning: '适合喜欢做长期系统的人',
      summary:
        '如果你更喜欢控制复杂度、搭骨架和制定规则，可以继续往架构、工程平台和设计系统方向深入。',
      nextSkills: [
        'Monorepo 与包治理',
        '构建系统与 CI/CD',
        'Design System',
        '质量度量与工程规范',
      ],
    },
    {
      id: 'product-tech-lead',
      title: '走向产品技术负责人',
      positioning: '适合同时懂业务和系统的人',
      summary:
        '前端出身的人天然离用户界面近，如果再补业务抽象和协作能力，很适合向产品技术负责人演进。',
      nextSkills: [
        '业务建模与需求拆解',
        '跨端协作与项目推进',
        '数据分析与增长思维',
        '技术决策与团队协同',
      ],
    },
  ];
