export type FullstackLevel = {
  id: string;
  title: string;
  role: string;
  summary: string;
  outcomes: string[];
};

export type FullstackDomain = {
  id: string;
  title: string;
  accent: string;
  summary: string;
  ownership: string[];
  keySkills: string[];
  commonStacks: string[];
};

export type FullstackTrack = {
  id: string;
  title: string;
  positioning: string;
  summary: string;
  frameworks: string[];
  bestFor: string[];
};

export type FullstackRoadmapStep = {
  id: string;
  title: string;
  summary: string;
  outcome: string;
};

export const fullstackLevels: FullstackLevel[] = [
  {
    id: 'page-builder',
    title: '页面交付者',
    role: '能把前端页面和接口接稳',
    summary:
      '这是全栈的起点阶段。你对浏览器侧足够熟，能独立交付页面、表单、列表和基础数据流，但服务端仍然主要依赖别人提供。',
    outcomes: [
      '能独立完成一个业务页面到接口联调的闭环。',
      '能处理基础权限态、加载态、异常态和表单校验。',
      '开始理解“前端不是孤立页面，而是系统的一部分”。',
    ],
  },
  {
    id: 'module-shipper',
    title: '模块交付者',
    role: '能负责一整块业务模块',
    summary:
      '这个阶段开始具备真正的全栈意识，不只是做页面，还能设计接口、补一层 BFF、接数据库和处理服务端流程。',
    outcomes: [
      '能独立负责一个完整模块的前端、接口层和基础存储结构。',
      '能把页面、状态、服务端逻辑和权限收敛成一个完整系统。',
      '能开始回答“这个功能为什么要放前端、BFF 或后端服务”。',
    ],
  },
  {
    id: 'product-system-owner',
    title: '产品系统负责人',
    role: '能把产品做成可上线的系统',
    summary:
      '这一层开始从单功能开发者转为产品系统设计者，关注性能、部署、监控、成本、团队协作和技术选型。',
    outcomes: [
      '能搭建一套能上线、能回滚、能观测、能扩展的产品骨架。',
      '能带队做技术选型，而不是只执行某一层实现。',
      '能用业务目标反推技术架构，而不是单纯堆技术栈。',
    ],
  },
];

export const fullstackDomains: FullstackDomain[] = [
  {
    id: 'frontend-system',
    title: '前端系统层',
    accent: 'from-[#4f6b7a] to-[#91a5b2]',
    summary:
      '全栈不是“前端会一点后端”，前提仍然是前端系统能力过关。你必须能建立页面层、状态层、组件体系和权限路由模型。',
    ownership: [
      '负责页面结构、交互体验、状态管理和前端架构。',
      '设计路由、权限、布局和组件边界。',
      '把前台体验做成稳定、可演进的产品界面。',
    ],
    keySkills: [
      'React / Vue / TypeScript',
      '路由与权限',
      '状态管理与数据层',
      '组件体系与设计系统',
      '性能与可观测',
    ],
    commonStacks: [
      'React + Next.js',
      'Vue + Vite',
      'Tailwind CSS',
      'TanStack Query / Pinia',
    ],
  },
  {
    id: 'bff-and-api',
    title: '接口层与 BFF',
    accent: 'from-[#665d74] to-[#9b92aa]',
    summary:
      '很多所谓全栈能力，真正起作用的是中间这一层。它负责把页面真正需要的数据组织出来，而不是让前端直接硬吃后端接口。',
    ownership: [
      '设计页面友好的接口结构，而不是只透传后端原始字段。',
      '拼装多个服务接口，统一权限和错误处理。',
      '承担 Web 产品里的 BFF、代理层和轻服务端逻辑。',
    ],
    keySkills: [
      'REST / RPC / GraphQL 思维',
      '鉴权、Session、Token',
      '接口聚合与数据适配',
      '文件上传、表单提交、服务端校验',
    ],
    commonStacks: [
      'Next.js Route Handlers',
      'Node.js + Express / NestJS',
      'Python + FastAPI',
      'tRPC / GraphQL',
    ],
  },
  {
    id: 'backend-domain',
    title: '后端业务层',
    accent: 'from-[#5e7a6d] to-[#8ea697]',
    summary:
      '走向全栈后，不能永远停在“写一点接口”。你最终要能承担业务逻辑、服务边界和数据一致性问题。',
    ownership: [
      '设计业务服务、领域逻辑和服务边界。',
      '处理事务、异步任务、权限校验和幂等。',
      '把简单功能升级成能长期演进的服务模块。',
    ],
    keySkills: [
      '服务拆分与领域建模',
      '事务、重试、队列、异步任务',
      '错误处理、日志、审计',
      '接口版本与兼容策略',
    ],
    commonStacks: ['NestJS', 'FastAPI', 'Spring Boot', 'Go Fiber / Gin'],
  },
  {
    id: 'database-storage',
    title: '数据库与存储层',
    accent: 'from-[#8a755f] to-[#b5a18b]',
    summary:
      '没有数据库能力的“全栈”通常只能算前端扩展。真正的全栈必须理解数据建模、查询效率和存储边界。',
    ownership: [
      '设计表结构、索引和基础数据关系。',
      '理解缓存、对象存储和搜索系统的角色分工。',
      '为查询性能、数据一致性和可维护性负责。',
    ],
    keySkills: [
      'SQL 与数据建模',
      '索引与查询优化',
      'Redis / Cache 思维',
      '对象存储与文件管理',
      '搜索与分析型存储',
    ],
    commonStacks: [
      'PostgreSQL',
      'MySQL',
      'Redis',
      'Prisma / Drizzle / TypeORM',
    ],
  },
  {
    id: 'infra-delivery',
    title: '部署与基础设施',
    accent: 'from-[#55636f] to-[#8696a1]',
    summary:
      '全栈能力的分水岭，在于你能不能把东西稳定地跑在真实环境里，而不是只在本地“看起来能用”。',
    ownership: [
      '负责环境变量、部署、日志、监控和回滚路径。',
      '理解服务如何上线、怎么扩容、哪里会崩。',
      '让开发交付变成重复可执行的流程，而不是手工操作。',
    ],
    keySkills: [
      'Docker 与容器化',
      'CI/CD',
      '环境隔离与配置管理',
      '监控、日志与告警',
      '安全与权限最小化',
    ],
    commonStacks: [
      'Docker',
      'GitHub Actions',
      'Vercel / Railway / Render',
      'Nginx',
      'Sentry / Grafana',
    ],
  },
  {
    id: 'ai-product-stack',
    title: 'AI 应用全栈层',
    accent: 'from-[#706575] to-[#9c90a0]',
    summary:
      '未来很多全栈产品不只是传统表单系统，还会接入模型、工作流和智能体。这个层面要求你同时理解前台交互、服务端工具链和模型调用边界。',
    ownership: [
      '负责 AI 产品前台、任务流和结果展示。',
      '负责模型调用入口、上下文拼装和工具执行接口。',
      '把 AI 产品做成可解释、可接管、可观测的系统。',
    ],
    keySkills: [
      '流式交互与聊天 UI',
      '模型网关与工具调用',
      'Prompt / State / Trace 思维',
      '成本控制与权限边界',
    ],
    commonStacks: [
      'Next.js + Python',
      'OpenAI / Anthropic SDK',
      'Queue + Worker',
      'Trace / Eval 平台',
    ],
  },
];

export const fullstackTracks: FullstackTrack[] = [
  {
    id: 'typescript-track',
    title: 'TypeScript / Node 路线',
    positioning: '最适合前端出身向全栈延展',
    summary:
      '如果你已经是前端工程师，这条路线的学习曲线最平滑。语言一致能降低切换成本，适合 Web 产品、BFF、后台系统和前后端一体化团队。',
    frameworks: ['Next.js', 'NestJS', 'Express', 'tRPC', 'Prisma'],
    bestFor: [
      '中后台系统',
      'BFF 和门户产品',
      '前后端一体化团队',
      'AI Web 产品前台',
    ],
  },
  {
    id: 'python-track',
    title: 'Python 路线',
    positioning: '最适合数据、自动化和 AI 产品',
    summary:
      'Python 在 AI、数据处理、自动化和服务端原型能力上很强。如果你的全栈方向偏智能体、分析平台、自动化系统，这条路线很值得补。',
    frameworks: ['FastAPI', 'Django', 'SQLAlchemy', 'Celery', 'Pydantic'],
    bestFor: ['AI 应用与 Agent', '数据后台', '自动化平台', '内部效率工具'],
  },
  {
    id: 'java-track',
    title: 'Java / Spring 路线',
    positioning: '最适合企业级业务系统',
    summary:
      '这条路线更偏稳定、规范和大型业务系统。学习成本更高，但在企业系统、交易链路和复杂权限场景里很有生命力。',
    frameworks: ['Spring Boot', 'Spring Cloud', 'MyBatis', 'JPA'],
    bestFor: ['企业后台', '复杂权限系统', '大规模业务平台', '长期稳定团队'],
  },
  {
    id: 'go-track',
    title: 'Go 路线',
    positioning: '最适合高并发、轻服务和基础设施',
    summary:
      'Go 的优势在于性能、部署简单和工程落地效率。适合做网关、轻服务、任务服务和需要更强吞吐的系统。',
    frameworks: ['Gin', 'Fiber', 'GORM', 'gRPC'],
    bestFor: ['网关服务', '高并发接口', '平台工具', '轻量后端服务'],
  },
];

export const fullstackRoadmap: FullstackRoadmapStep[] = [
  {
    id: 'roadmap-1',
    title: '先把前端系统做稳',
    summary:
      '别一上来就学数据库和 Docker，先确保你真的理解页面、状态、接口和模块边界。',
    outcome: '你能稳定交付一个像样的 Web 前台，而不是只有零散页面。',
  },
  {
    id: 'roadmap-2',
    title: '再补服务端入口层',
    summary:
      '先从 BFF、表单提交、鉴权、接口聚合做起，而不是一开始就啃复杂分布式。',
    outcome: '你能开始承担一个业务模块的前后端闭环。',
  },
  {
    id: 'roadmap-3',
    title: '然后补数据库与部署',
    summary: '只有把数据建模、缓存和上线流程补齐，才算真正跨过“假全栈”的门槛。',
    outcome: '你能把功能推到真实环境，而不是只停留在本地演示。',
  },
  {
    id: 'roadmap-4',
    title: '最后建立产品系统视角',
    summary:
      '开始关注成本、性能、监控、团队协作和技术选型，真正从写功能的人升级成设计系统的人。',
    outcome: '你具备承担完整产品技术方案的能力。',
  },
];
