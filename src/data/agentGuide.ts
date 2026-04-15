export type AgentGuideSection = {
  id: string;
  title: string;
  summary: string;
  bullets?: string[];
  code?: string;
  callout?: string;
};

export type AgentGuideChapter = {
  id: string;
  label: string;
  description: string;
  outcome: string;
  sections: AgentGuideSection[];
};

export const agentGuideChapters: AgentGuideChapter[] = [
  {
    id: 'agent-basics',
    label: '1. 什么是 Agent',
    description:
      '先把概念讲清楚。agent 不是单次问答，而是能围绕目标持续规划、调用工具、更新状态并交付结果的系统。',
    outcome:
      '能区分聊天机器人、自动化脚本、工作流系统与真正的 agent，并理解 agent 的基本运行闭环。',
    sections: [
      {
        id: 'agent-definition',
        title: 'Agent 的最小定义',
        summary:
          '一个最小可用 agent，至少要有目标、推理、动作、状态和结果五个部分。它不是只回答问题，而是要代表用户持续做事。',
        bullets: [
          '目标：用户希望系统完成什么，例如“整理竞品并写一份报告”。',
          '推理：模型判断下一步该做什么，而不是只生成一段文本。',
          '动作：调用搜索、文件系统、浏览器、数据库、代码执行等工具。',
          '状态：保留当前上下文、已做步骤、工具结果和中间结论。',
          '结果：最终交付可消费产物，如摘要、PR、表格、邮件或结构化数据。',
        ],
      },
      {
        id: 'agent-vs-chatbot',
        title: 'Agent 和普通聊天机器人的区别',
        summary:
          '聊天机器人主要负责回答，agent 负责完成任务。两者底层都可能用 LLM，但系统设计目标完全不同。',
        bullets: [
          '聊天机器人偏“问一句答一句”，agent 偏“围绕目标持续执行”。',
          '聊天机器人多数不主动用工具，agent 必须明确拥有工具和状态。',
          '聊天机器人出错通常只是答偏，agent 出错可能影响文件、系统或业务流程，所以要更强的约束和审计。',
        ],
      },
      {
        id: 'agent-loop',
        title: 'Agent 的典型闭环',
        summary:
          '绝大多数 agent 都能抽象成一个循环：理解目标、计划动作、执行工具、观察结果、更新状态，直到结束。',
        code: `while not state.finished:\n    plan = planner.decide(state)\n    observation = await executor.run(plan)\n    state = reducer.update(state, plan, observation)\n\nreturn state.output`,
        callout:
          '真正难的不是“让模型会思考”，而是把这个循环做得稳定、可控、可回放。',
      },
    ],
  },
  {
    id: 'agent-capabilities',
    label: '2. Agent 能用来干嘛',
    description:
      '只有明确 agent 擅长什么、不擅长什么，才能选对场景。很多失败项目不是模型太弱，而是场景选错。',
    outcome:
      '能识别适合 agent 的高价值任务，并知道哪些任务更应该用固定工作流或传统软件解决。',
    sections: [
      {
        id: 'good-use-cases',
        title: '适合 Agent 的任务特征',
        summary: 'agent 适合多步骤、信息分散、需要在不确定中做局部决策的任务。',
        bullets: [
          '需要跨多个系统取数，例如网页、文档库、CRM、工单系统。',
          '步骤不是完全固定，会因上下文不同而变化。',
          '中间需要判断“接下来做什么”，而不是一条脚本从头跑到尾。',
          '最终产物需要一定推理，例如方案比较、代码修改、工单归因、调研结论。',
        ],
      },
      {
        id: 'agent-scenarios',
        title: '典型场景',
        summary:
          '目前最成熟的 agent 场景，普遍集中在知识处理、软件开发、运营自动化和流程助手。',
        bullets: [
          '研发：读代码仓库、修 bug、补测试、生成 PR、做代码迁移。',
          '办公：搜集资料、整理会议纪要、写周报、做表格、跟进行程。',
          '客服与运营：分类工单、检索知识库、草拟回复、触发业务系统。',
          '数据与分析：汇总日志、做异常排查、生成日报、解释指标波动。',
        ],
      },
      {
        id: 'bad-use-cases',
        title: '不适合 Agent 的情况',
        summary:
          '凡是规则极稳定、错误成本极高、且不需要模型决策的场景，通常不该优先做 agent。',
        bullets: [
          '固定表单搬运、字段映射、批量转换这类纯规则任务，更适合传统自动化。',
          '对实时性要求极高的交互，如毫秒级风控、硬实时控制，不应依赖 agent 闭环。',
          '高风险动作如果没有审批链、权限边界和回滚机制，就不该直接交给 agent。',
        ],
      },
    ],
  },
  {
    id: 'agent-building-blocks',
    label: '3. Agent 由什么组成',
    description:
      '要把 agent 做出来，核心不是“接一个模型”这么简单，而是要搭出可运行、可观测、可约束的系统骨架。',
    outcome:
      '理解模型、工具、记忆、工作流、评测与安全边界这些基础部件是如何协同工作的。',
    sections: [
      {
        id: 'model-and-policy',
        title: '模型层与策略层',
        summary: '模型负责理解、推理和生成；策略层负责定义它在什么规则下行动。',
        bullets: [
          '系统提示词决定角色、目标、边界和输出格式。',
          '模型不等于 agent，真正的 agent 还需要外部状态和执行环境。',
          '复杂系统通常要区分规划模型、执行模型和校验模型。',
        ],
      },
      {
        id: 'tools-memory',
        title: '工具、记忆与状态',
        summary: '工具让 agent 有手脚，记忆和状态让 agent 不会每一步都失忆。',
        bullets: [
          '工具可以是函数调用、HTTP API、浏览器控制、终端命令、数据库查询。',
          '短期状态记录当前任务上下文，长期记忆记录用户偏好或历史知识。',
          '不要把所有历史都塞进提示词，结构化状态通常比纯文本堆叠更稳。',
        ],
      },
      {
        id: 'workflow-observability',
        title: '工作流、观测与评测',
        summary:
          '能跑起来不代表能上线。没有 trace、日志和评测，agent 很难在真实业务中持续迭代。',
        bullets: [
          '工作流负责把步骤串起来，定义什么时候重试、什么时候人工接管。',
          '观测要覆盖输入、工具调用、耗时、失败原因和最终结果。',
          '评测至少要检查任务完成率、错误率、成本和延迟。',
        ],
      },
    ],
  },
  {
    id: 'agent-development-stack',
    label: '4. 拿什么开发 Agent',
    description:
      '技术选型不该追新词，而要看场景、团队能力和运维成本。先搭稳定主干，再考虑更复杂的编排框架。',
    outcome:
      '能为自己的第一个 agent 项目选定合适的语言、框架、模型接口和基础设施。',
    sections: [
      {
        id: 'languages',
        title: '常见开发语言',
        summary:
          'Python 和 TypeScript 目前是 agent 开发的两条主线，各自适合不同团队背景。',
        bullets: [
          'Python：生态最成熟，适合模型接入、数据处理、自动化和研究型原型。',
          'TypeScript：前后端一体化更顺，适合 Web 产品嵌入和工程协作。',
          '如果团队以服务端工程为主，也会用 Go、Java 或 Rust 搭外围系统，但 agent 核心层仍常见 Python/TS。',
        ],
      },
      {
        id: 'sdk-frameworks',
        title: '常见 SDK 与框架方向',
        summary: '第一版 agent 不必上重框架，但要知道市面上常见的实现路径。',
        bullets: [
          '模型厂商原生 SDK：例如 OpenAI Agents SDK、Anthropic API 工具调用能力。',
          '工作流编排：LangGraph、AutoGen、Mastra、自研状态机。',
          '浏览器与桌面自动化：Playwright、Browser Use、计算机使用工具、RPA 方案。',
          '观测与评测：trace 平台、日志系统、Evals、离线数据集与回放机制。',
        ],
      },
      {
        id: 'infra',
        title: '基础设施清单',
        summary:
          '一个可上线的 agent，通常至少要配齐模型接口、状态存储、任务队列、日志和权限控制。',
        bullets: [
          '模型与工具网关：统一接模型、搜索、数据库、文件系统。',
          '状态存储：Redis、PostgreSQL、对象存储、向量库按需组合。',
          '任务执行：异步 worker、队列系统、调度器、重试机制。',
          '安全控制：权限白名单、人工确认、审计日志、敏感信息脱敏。',
        ],
      },
      {
        id: 'starter-architecture',
        title: '推荐的新手落地架构',
        summary:
          '如果你刚入门，不要先做多智能体平台。先做单 agent + 少量工具 + 明确状态机。',
        code: `frontend -> api service -> planner\n                     -> tool layer\n                     -> state store\n                     -> trace / logs\n\nsingle task\nsingle owner\nsingle rollback path`,
        callout: '先把一个场景做稳，比上来做“万能 agent 平台”更现实。',
      },
    ],
  },
  {
    id: 'agent-market',
    label: '5. 市场上的 Agent 产品',
    description:
      '理解市场格局的目的不是追热点，而是看不同产品分别解决了什么问题、面向什么用户、采用什么交互方式。',
    outcome:
      '能从产品视角看懂当前 agent 市场，大致区分通用助手、开发代理和构建平台三类方向。',
    sections: [
      {
        id: 'market-view',
        title: '市场划分方式',
        summary:
          '截至 2026 年 4 月，主流 agent 产品大致可以按“面向谁”和“在哪个环境执行”来理解。',
        bullets: [
          '通用任务代理：直接帮用户上网、查资料、操作应用、处理文件。',
          '开发代理：围绕代码仓库、Issue、PR、测试和 CI 执行开发任务。',
          '构建平台：给企业或开发者提供搭建、部署、观测 agent 的底层能力。',
        ],
      },
      {
        id: 'representative-products',
        title: '代表性产品',
        summary:
          '当前市面上比较有代表性的 agent 产品，已经从“聊天框答题”走向“在真实环境里执行任务”。',
        bullets: [
          'OpenAI ChatGPT agent：面向终端用户的通用任务代理，可浏览网页、使用应用、处理文件和执行多步骤任务。',
          'GitHub Copilot cloud agent：面向软件开发，能围绕仓库、Issue 和 PR 在后台完成编码任务并提交结果。',
          'Cursor Background Agents：面向 IDE 与代码库协作，支持异步远程执行、安装依赖和在隔离环境里改代码。',
          'Anthropic Claude 的 computer use 能力：更偏能力层和开发接口，适合开发者自行构建桌面操作型 agent。',
          'Cognition Devin：以“AI software engineer”为核心定位，强调端到端的软件开发代理体验。',
          '大量垂直 agent 正在围绕客服、销售、招聘、财务和内部知识助手展开，但成熟度差异很大。',
        ],
      },
      {
        id: 'product-trends',
        title: '当前产品趋势',
        summary:
          '市场正在从单轮对话产品，转向可观测、可协作、可接管、可审计的任务系统。',
        bullets: [
          '越来越多产品支持后台异步执行，而不是要求用户一直盯着聊天窗口。',
          '接管机制越来越重要，涉及登录、支付、审批时都会要求用户确认。',
          '开发类产品明显重视 branch、PR、sandbox、trace 和 policy，而不是只展示最终答案。',
          '企业端越来越看重连接器、权限控制、评测与治理，而不是模型本身的单点能力。',
        ],
      },
      {
        id: 'market-judgement',
        title: '怎么判断一个 Agent 产品靠不靠谱',
        summary:
          '判断标准不要只看 demo 演示，而要看执行边界、失败恢复和工程细节。',
        bullets: [
          '是否能看清它做了哪些步骤，而不是黑箱输出。',
          '是否支持权限控制、人工确认、日志和审计。',
          '是否能在失败后恢复，而不是从头再来。',
          '是否明确说明适用场景、成本、限制和数据处理方式。',
        ],
      },
    ],
  },
  {
    id: 'agent-learning-path',
    label: '6. 新手怎么学 Agent',
    description:
      '最后把概念和工具落到可执行路线。目标不是一周内造平台，而是用最短路径做出第一个靠谱的 agent。',
    outcome: '能按阶段学习 agent，并规划从 demo 到可上线原型的成长路径。',
    sections: [
      {
        id: 'phase-1',
        title: '第一阶段：先做单工具任务',
        summary:
          '先做最简单的任务闭环，例如“读取文件并总结”“搜索网页并输出结构化结果”。',
        bullets: [
          '目标必须清晰，工具数量先控制在 1 到 3 个。',
          '先把输入、输出、失败处理和日志打通。',
          '别急着做长链路自治，先确认一个任务闭环可复现。',
        ],
      },
      {
        id: 'phase-2',
        title: '第二阶段：引入状态与多步骤',
        summary:
          '当单步稳定后，再扩展到带状态的多步骤任务，例如调研、整理、生成、复核。',
        bullets: [
          '开始记录阶段性结论和工具调用结果。',
          '为关键步骤加入校验器或人工 review 点。',
          '让 agent 学会“下一步做什么”，而不只是“调用某个固定函数”。',
        ],
      },
      {
        id: 'phase-3',
        title: '第三阶段：补上工程化能力',
        summary: '真正能上线的 agent，必须把观测、安全、评测和回放补齐。',
        bullets: [
          '补 trace、指标、日志、prompt/version 管理。',
          '建立离线测试集和回归评测，避免每次改动都凭感觉上线。',
          '把高风险操作加确认，把成本高的步骤加预算控制。',
        ],
      },
      {
        id: 'learning-advice',
        title: '给初学者的直白建议',
        summary:
          '学习 agent 的正确顺序，不是“先选最火框架”，而是“先把系统边界想清楚”。',
        bullets: [
          '先理解任务，再设计状态，再接模型和工具。',
          '先写单 agent，再考虑多 agent；多 agent 不是默认更高级，只是更复杂。',
          '先做稳定场景，再做开放任务；先做可控内网，再做开放互联网。',
          '先接受 agent 会失败，再设计它如何优雅失败。',
        ],
        callout:
          '如果你未来要开发自己的 agent，最关键的不是背概念，而是持续练习把“不确定任务”变成“可执行系统”。',
      },
    ],
  },
];
