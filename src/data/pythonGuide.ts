export type PythonGuideSection = {
  id: string;
  title: string;
  summary: string;
  bullets?: string[];
  code?: string;
  callout?: string;
};

export type PythonGuideChapter = {
  id: string;
  label: string;
  description: string;
  outcome: string;
  sections: PythonGuideSection[];
};

export const pythonGuideChapters: PythonGuideChapter[] = [
  {
    id: 'python-foundation',
    label: '1. Python 基础与运行方式',
    description:
      '先建立 Python 的语言感觉、执行模型和基础语法，保证后面写 agent 时不会在最基本的表达能力上卡住。',
    outcome:
      '能独立编写脚本、函数、模块，并理解 Python 程序是如何被解释执行的。',
    sections: [
      {
        id: 'python-runtime',
        title: 'Python 在 agent 开发里的角色',
        summary:
          'Python 是当前 agent 生态里最常见的主语言之一，因为它在脚本、网络请求、LLM SDK、自动化和数据处理上都很成熟。',
        bullets: [
          '写 agent 的核心不是“会 print”，而是会把输入、状态、工具调用和输出拼成稳定流程。',
          'Python 很适合快速搭原型，也适合长期维护服务端工具链。',
          '大多数 agent 项目最终都离不开：异步 IO、类型标注、配置管理、日志和测试。',
        ],
      },
      {
        id: 'python-basic-syntax',
        title: '基本语法与数据类型',
        summary:
          'Python 语法的门槛不高，但要真正写稳定代码，必须把列表、字典、函数和错误处理用顺手。',
        bullets: [
          '常见内建类型：str、int、float、bool、list、dict、tuple、set。',
          'agent 项目里最常用的结构往往是“字典 + 列表 + dataclass / model”。',
          '不要把所有东西都塞进 dict，状态结构越复杂，越需要显式类型。',
        ],
        code: `task = {\n    "id": "task-001",\n    "title": "summarize logs",\n    "retry": 2,\n    "enabled": True,\n}\n\nmessages = [\n    {"role": "system", "content": "You are a helpful agent."},\n    {"role": "user", "content": "Summarize this file."},\n]\n\nif task["enabled"]:\n    print(task["title"])`,
      },
      {
        id: 'python-functions',
        title: '函数、模块与入口',
        summary:
          '不要把所有逻辑堆在一个文件里。agent 一开始就应该拆入口、工具层、业务层。',
        bullets: [
          '函数负责最小可复用行为。',
          '模块负责按职责组织代码。',
          '`if __name__ == "__main__"` 适合本地调试入口，服务端项目则通常用框架启动。',
        ],
        code: `def summarize(text: str) -> str:\n    return text[:120]\n\n\ndef main() -> None:\n    result = summarize("hello python agent world")\n    print(result)\n\n\nif __name__ == "__main__":\n    main()`,
      },
      {
        id: 'python-errors',
        title: '异常处理',
        summary:
          'agent 面对外部系统时，失败是常态。你必须显式处理异常、重试和降级。',
        bullets: [
          '只捕获你能处理的异常，别上来就 `except Exception` 然后什么都不做。',
          '错误信息要带上下文，例如任务 id、输入文件、模型名。',
          '对外部 API、文件系统、网络请求都要有失败路径。',
        ],
      },
    ],
  },
  {
    id: 'typing-and-modeling',
    label: '2. 类型系统与数据建模',
    description:
      'agent 的复杂度很容易失控，Python 类型和数据模型是控制复杂度的第一道防线。',
    outcome: '能使用类型标注、dataclass 和结构化对象去管理 agent 状态。',
    sections: [
      {
        id: 'type-hints',
        title: '类型标注',
        summary:
          '类型标注不是为了“好看”，而是为了让大型 agent 流程在重构时更安全、更可读。',
        bullets: [
          '常用类型：list[str]、dict[str, Any]、Literal、TypedDict、Protocol。',
          '边界层可以更宽松，核心业务层建议更严格。',
          '对于工具输入输出，类型定义越清晰，排错越快。',
        ],
        code: `from typing import TypedDict\n\n\nclass ToolInput(TypedDict):\n    query: str\n    max_results: int\n\n\ndef run_search(payload: ToolInput) -> list[str]:\n    return [payload["query"]] * payload["max_results"]`,
      },
      {
        id: 'dataclass-model',
        title: 'dataclass 做状态对象',
        summary:
          '比起到处传 dict，`dataclass` 更适合 agent 的状态、任务、工具结果对象。',
        bullets: [
          '字段清晰、支持默认值、适合业务对象。',
          '如果要做校验和序列化，再进一步用 Pydantic 一类模型库。',
          '消息记录、任务状态、执行结果都适合对象化。',
        ],
        code: `from dataclasses import dataclass, field\n\n\n@dataclass\nclass AgentState:\n    task_id: str\n    user_goal: str\n    steps: list[str] = field(default_factory=list)\n    finished: bool = False`,
      },
      {
        id: 'state-shape',
        title: 'agent 状态如何设计',
        summary:
          '写 agent 时，状态最少要能表达：目标、当前上下文、已经执行的步骤、工具结果和最终输出。',
        bullets: [
          '不要把瞬时 UI 状态、日志文本、业务状态混在一个巨大字典里。',
          '建议拆成：任务状态、运行时状态、展示状态。',
          '每次工具调用前后都要明确状态变化，而不是隐藏在函数内部。',
        ],
      },
      {
        id: 'serialization',
        title: '序列化与持久化',
        summary:
          '只要 agent 需要恢复执行、断点续跑或审计，你就必须能把状态保存出来。',
        bullets: [
          'JSON 适合简单结构；更复杂时可以引入 SQLite、Redis 或对象存储。',
          '保存时尽量保持结构稳定，避免“今天一个字段名，明天另一个字段名”。',
          '调试阶段就应该开始保留中间状态快照。',
        ],
      },
    ],
  },
  {
    id: 'files-env-and-packaging',
    label: '3. 文件、环境与工程组织',
    description:
      'agent 绝大多数都要读写文件、加载配置、接环境变量。工程组织方式直接决定后续能不能维护。',
    outcome: '掌握虚拟环境、依赖管理、配置加载和项目目录设计。',
    sections: [
      {
        id: 'venv-deps',
        title: '虚拟环境与依赖',
        summary: '每个 agent 项目都应该有独立环境，避免系统解释器被依赖污染。',
        bullets: [
          '常见方式：`python -m venv`、`uv`、`poetry`。',
          '依赖要锁版本，尤其是 SDK、HTTP 库和数据模型库。',
          '团队协作时最好固定 Python 主版本，例如 3.11 或 3.12。',
        ],
        code: `python -m venv .venv\n.venv\\Scripts\\activate\npip install -U pip\npip install openai httpx pydantic pytest`,
      },
      {
        id: 'project-layout',
        title: '项目目录建议',
        summary: '目录结构越早清楚，后面越不容易演变成“大泥球”。',
        code: `agent_project/\n  app/\n    __init__.py\n    main.py\n    config.py\n    models.py\n    tools/\n    services/\n    workflows/\n  tests/\n  scripts/\n  pyproject.toml`,
        bullets: [
          '`tools/` 放外部能力封装，比如搜索、文件读写、数据库。',
          '`workflows/` 放任务流、状态机和策略。',
          '`services/` 放与模型、存储、鉴权等系统耦合的服务层。',
        ],
      },
      {
        id: 'env-config',
        title: '环境变量与配置管理',
        summary: 'API Key、数据库地址、模型名、超时配置都不应该写死在代码里。',
        bullets: [
          '本地开发用 `.env`，生产环境用部署平台注入。',
          '配置读取集中在一个模块里，不要在各个文件里散着读环境变量。',
          '读取后尽快做校验，避免运行到一半才发现配置缺失。',
        ],
        code: `import os\n\n\nclass Settings:\n    model = os.getenv("OPENAI_MODEL", "gpt-5.2")\n    api_key = os.environ["OPENAI_API_KEY"]\n    timeout = float(os.getenv("REQUEST_TIMEOUT", "30"))`,
      },
      {
        id: 'path-and-files',
        title: '路径、文件与编码',
        summary:
          'agent 常常会读日志、写报告、存缓存。路径处理要从一开始就写稳。',
        bullets: [
          '优先用 `pathlib.Path`，不要大量手拼字符串路径。',
          '默认显式指定编码为 `utf-8`。',
          '写文件要考虑覆盖策略、原子写入和失败回滚。',
        ],
      },
    ],
  },
  {
    id: 'async-network-and-apis',
    label: '4. 异步、网络与 API 调用',
    description:
      'agent 一旦开始调模型、调搜索、调数据库，异步和网络 IO 就变成主线能力。',
    outcome: '能编写稳定的 API 调用层、异步任务和带重试的外部请求。',
    sections: [
      {
        id: 'http-clients',
        title: 'HTTP 请求基础',
        summary:
          '几乎所有 agent 都会和 HTTP API 打交道，所以你至少要熟练掌握一个客户端库。',
        bullets: [
          '同步常见库：`requests`。',
          '异步常见库：`httpx`、`aiohttp`。',
          '无论同步还是异步，都要统一处理超时、重试、状态码和日志。',
        ],
        code: `import httpx\n\n\nasync def fetch_json(url: str) -> dict:\n    async with httpx.AsyncClient(timeout=20) as client:\n        response = await client.get(url)\n        response.raise_for_status()\n        return response.json()`,
      },
      {
        id: 'asyncio-core',
        title: 'asyncio 核心认知',
        summary:
          'agent 常见瓶颈是等待外部系统响应，所以异步能直接提升吞吐和并发效率。',
        bullets: [
          '`async def` 定义协程，`await` 等待异步结果。',
          '适合网络请求、磁盘 IO、数据库查询，不适合 CPU 密集运算。',
          '要避免在 async 代码里夹杂大量阻塞调用。',
        ],
      },
      {
        id: 'retry-timeout',
        title: '重试、超时和熔断思维',
        summary: 'agent 的外部依赖太多，没有超时和重试几乎必炸。',
        bullets: [
          '请求必须带 timeout。',
          '重试只适合幂等操作，并且要有最大次数和退避策略。',
          '对高成本模型调用，要区分“可重试错误”和“直接失败错误”。',
        ],
      },
      {
        id: 'api-wrapper',
        title: 'SDK 封装层',
        summary:
          '不要把模型请求直接散落在业务流程里，应该封装出统一的 provider 层。',
        code: `class ModelClient:\n    def __init__(self, model: str) -> None:\n        self.model = model\n\n    async def chat(self, messages: list[dict[str, str]]) -> str:\n        # 这里统一封装模型请求\n        ...`,
      },
    ],
  },
  {
    id: 'testing-debugging-and-quality',
    label: '5. 测试、调试与质量控制',
    description:
      'agent 项目最怕“偶尔能跑通”。没有测试和日志，规模一大几乎无法维护。',
    outcome: '能为核心工具、工作流和模型封装建立最基本的质量基线。',
    sections: [
      {
        id: 'pytest-baseline',
        title: 'pytest 作为默认测试框架',
        summary:
          'Python 项目没有理由不配测试。至少对纯逻辑、数据转换和工具封装做单测。',
        bullets: [
          '先测纯函数，再测服务封装，再测完整工作流。',
          '不要把所有测试都写成慢速集成测试。',
          'LLM 响应最好通过 mock 或录制结果稳定测试。',
        ],
        code: `def normalize_task_name(name: str) -> str:\n    return name.strip().lower().replace(' ', '-')\n\n\ndef test_normalize_task_name() -> None:\n    assert normalize_task_name('  Build Report  ') == 'build-report'`,
      },
      {
        id: 'logging',
        title: '日志设计',
        summary: 'agent 需要的不只是“报错日志”，而是完整执行轨迹。',
        bullets: [
          '至少记录：任务 id、步骤名、工具名、耗时、结果摘要。',
          '日志结构化后，后续接检索或可视化会轻松很多。',
          '不要把敏感信息、密钥和完整用户私密数据直接打进日志。',
        ],
      },
      {
        id: 'debug-strategy',
        title: '调试策略',
        summary:
          'agent 不稳定时，不要盲猜。优先看输入、状态变化、工具结果和模型输出。',
        bullets: [
          '先缩小到最小复现流程。',
          '把中间状态持久化，必要时做 step replay。',
          '对模型输出做结构化解析时，一定保留原始响应用于排查。',
        ],
      },
      {
        id: 'guardrails',
        title: '安全边界与防呆',
        summary: '一旦 agent 具有工具执行能力，边界设计就必须提前做。',
        bullets: [
          '限制可执行命令、可访问目录、可写范围。',
          '高风险动作必须二次确认或加白名单。',
          '对外部工具调用结果要做格式校验，不信任下游系统。',
        ],
      },
    ],
  },
  {
    id: 'agent-development-patterns',
    label: '6. 面向 Agent 的 Python 开发模式',
    description:
      '把 Python 基础能力和 agent 设计模式接起来，形成可实战的工程思维。',
    outcome: '能开始实现工具调用型、工作流型和多步骤推理型 agent。',
    sections: [
      {
        id: 'agent-loop',
        title: '最小 agent 循环',
        summary:
          '一个最基础的 agent 至少要有：接收目标、决定动作、调用工具、回写状态、产出结果。',
        code: `while not state.finished:\n    decision = planner.plan(state)\n    result = await tool_executor.run(decision)\n    state = reducer(state, decision, result)\n\nreturn state.final_output`,
        bullets: [
          'planner 负责“下一步做什么”。',
          'tool executor 负责“怎么调用外部能力”。',
          'reducer 负责“状态怎么更新”。',
        ],
      },
      {
        id: 'tool-design',
        title: '工具设计原则',
        summary: '工具层是 agent 的手脚。工具越干净，agent 越稳定。',
        bullets: [
          '单个工具职责要单一，输入输出要结构化。',
          '不要让工具顺手修改全局状态。',
          '工具失败时返回可判定的错误，不要只抛一段模糊字符串。',
        ],
      },
      {
        id: 'workflow-vs-agent',
        title: '工作流和自主 agent 的边界',
        summary: '不是所有事情都要做成“自由决策 agent”。很多场景工作流更稳。',
        bullets: [
          '固定步骤、强规则流程适合 workflow。',
          '需要探索、选择工具、分支判断的任务更适合 agent。',
          '一个成熟系统通常是 workflow 外壳 + agent 局部决策。',
        ],
      },
      {
        id: 'production-readiness',
        title: '可生产化的最低要求',
        summary:
          '如果你想让 agent 真正上线，至少要同时满足可观测、可回放、可限制、可恢复四件事。',
        bullets: [
          '可观测：日志、指标、执行耗时。',
          '可回放：任务输入、关键状态、工具结果留存。',
          '可限制：权限边界、资源上限、人工确认。',
          '可恢复：失败重试、断点续跑、异常兜底。',
        ],
        callout:
          '会写 Python 只是起点。对 agent 开发来说，真正稀缺的是“能把不稳定流程做稳定”的工程能力。',
      },
    ],
  },
];
