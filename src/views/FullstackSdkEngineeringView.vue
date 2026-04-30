<template>
  <section class="sdk-guide-page">
    <div class="sdk-guide-page__shell">
      <div class="sdk-guide-page__top">
        <RouterLink
          to="/fullstack-guide"
          class="sdk-guide-page__back"
          aria-label="返回全栈能力菜单"
          title="返回全栈能力菜单"
        >
          <el-icon :size="18"><ArrowLeft /></el-icon>
        </RouterLink>
      </div>

      <div class="sdk-guide-page__content">
        <header class="sdk-guide-hero">
          <div>
            <p class="sdk-guide-hero__eyebrow">Frontend SDK Engineering</p>
            <h1 class="sdk-guide-hero__title">前端 SDK 工程</h1>
            <p class="sdk-guide-hero__summary">
              这块能力不是“会发个 npm
              包”就算会，而是要能把登录、埋点、地图、播放器、编辑器、支付、OpenAPI
              客户端这些能力沉淀成稳定的前端
              SDK。真正的难点不在于导出几个函数，而在于边界设计、版本兼容、错误模型、文档示例、灰度发布和宿主集成成本。
            </p>
          </div>

          <div class="sdk-guide-hero__panel">
            <p class="sdk-guide-hero__label">学完结果</p>
            <ul class="sdk-guide-list">
              <li>能分清“业务代码”和“可复用 SDK”在职责上的根本区别。</li>
              <li>
                能独立设计一个对外可发布的浏览器端 SDK 接口、类型和错误模型。
              </li>
              <li>能建立发布、兼容、监控和接入文档的完整工程闭环。</li>
            </ul>
          </div>
        </header>

        <section class="sdk-guide-grid">
          <article
            v-for="item in quickStages"
            :key="item.order"
            class="sdk-guide-card"
          >
            <p class="sdk-guide-card__eyebrow">Stage {{ item.order }}</p>
            <h2 class="sdk-guide-card__title">{{ item.title }}</h2>
            <p class="sdk-guide-card__text">{{ item.summary }}</p>
          </article>
        </section>

        <section class="sdk-guide-section">
          <div class="sdk-guide-section__head">
            <div>
              <p class="sdk-guide-section__eyebrow">Decision Order</p>
              <h2 class="sdk-guide-section__title">
                做 SDK 的顺序应该是：先定边界，再定接口，再做发布与兼容
              </h2>
            </div>
          </div>

          <div class="sdk-guide-stack">
            <article
              v-for="stage in guideStages"
              :key="stage.order"
              class="sdk-guide-panel is-wide"
            >
              <div class="sdk-guide-method__head">
                <div>
                  <p class="sdk-guide-panel__eyebrow">
                    Stage {{ stage.order }}
                  </p>
                  <h3 class="sdk-guide-panel__title">{{ stage.title }}</h3>
                </div>
                <span class="sdk-guide-method__tag">{{ stage.tag }}</span>
              </div>

              <p class="sdk-guide-panel__text">
                {{ stage.description }}
              </p>

              <div class="sdk-guide-method__grid">
                <section class="sdk-guide-mini-panel">
                  <p class="sdk-guide-mini-panel__title">适用场景</p>
                  <ul class="sdk-guide-list">
                    <li v-for="item in stage.bestFor" :key="item">
                      {{ item }}
                    </li>
                  </ul>
                </section>

                <section class="sdk-guide-mini-panel">
                  <p class="sdk-guide-mini-panel__title">实现重点</p>
                  <ul class="sdk-guide-list">
                    <li v-for="item in stage.focus" :key="item">
                      {{ item }}
                    </li>
                  </ul>
                </section>

                <section class="sdk-guide-mini-panel">
                  <p class="sdk-guide-mini-panel__title">常见误区</p>
                  <ul class="sdk-guide-list">
                    <li v-for="item in stage.risks" :key="item">
                      {{ item }}
                    </li>
                  </ul>
                </section>
              </div>

              <AppCodeBlock
                class="sdk-guide-code-block"
                :code="stage.code"
                :lang="stage.language"
              />
            </article>
          </div>
        </section>

        <section class="sdk-guide-section">
          <div class="sdk-guide-section__head">
            <div>
              <p class="sdk-guide-section__eyebrow">Design Checklist</p>
              <h2 class="sdk-guide-section__title">
                一个前端 SDK，至少要把这几层设计清楚
              </h2>
            </div>
          </div>

          <div class="sdk-guide-columns">
            <article
              v-for="item in designCards"
              :key="item.title"
              class="sdk-guide-panel"
            >
              <h3 class="sdk-guide-panel__title">{{ item.title }}</h3>
              <p class="sdk-guide-panel__text">{{ item.summary }}</p>
            </article>
          </div>
        </section>

        <section class="sdk-guide-section">
          <div class="sdk-guide-section__head">
            <div>
              <p class="sdk-guide-section__eyebrow">Best Practice</p>
              <h2 class="sdk-guide-section__title">
                一个能发布到 npm 的浏览器 SDK 最小骨架
              </h2>
            </div>
          </div>

          <article class="sdk-guide-panel is-wide">
            <p class="sdk-guide-panel__text">
              下面这个例子展示的是一个比较稳的浏览器端 SDK
              组织方式：入口只暴露稳定
              API，内部把配置、请求器、错误对象和插件能力拆开。这样做的目的不是“显得高级”，而是为了让后续版本升级时不把外部接入方一起拖垮。
            </p>

            <AppCodeBlock
              class="sdk-guide-code-block"
              :code="sdkExample"
              lang="typescript"
            />
          </article>
        </section>

        <section class="sdk-guide-section">
          <div class="sdk-guide-section__head">
            <div>
              <p class="sdk-guide-section__eyebrow">Comparison</p>
              <h2 class="sdk-guide-section__title">
                业务封装、内部组件库、对外 SDK 三者不要混着做
              </h2>
            </div>
          </div>

          <div class="sdk-guide-columns">
            <article
              v-for="item in comparisonCards"
              :key="item.title"
              class="sdk-guide-panel"
            >
              <h3 class="sdk-guide-panel__title">{{ item.title }}</h3>
              <p class="sdk-guide-panel__text">{{ item.summary }}</p>
            </article>
          </div>
        </section>

        <section class="sdk-guide-section">
          <div class="sdk-guide-section__head">
            <div>
              <p class="sdk-guide-section__eyebrow">Release Discipline</p>
              <h2 class="sdk-guide-section__title">
                真正拉开水平差距的，是发布纪律和兼容意识
              </h2>
            </div>
          </div>

          <article class="sdk-guide-panel is-wide">
            <ul class="sdk-guide-list">
              <li>
                每次发版前先确认 API 变更是否破坏语义版本约定，不能把 breaking
                change 混进小版本。
              </li>
              <li>
                README、类型定义、示例代码、变更日志要一起更新，不能只发包不讲接入方式。
              </li>
              <li>
                SDK 内部异常要统一成自己的错误模型，避免把底层 fetch 或 axios
                错误原样抛给接入方。
              </li>
              <li>
                浏览器能力差异、SSR 环境、跨域、超时和重试都要明确说明支持边界。
              </li>
              <li>
                只要 SDK
                对外开放，就要把“别人如何升级你”当成主问题，而不是只关心自己如何开发它。
              </li>
            </ul>
          </article>
        </section>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ArrowLeft } from '@element-plus/icons-vue';
import { RouterLink } from 'vue-router';
import AppCodeBlock from '@/components/AppCodeBlock.vue';

const quickStages = [
  {
    order: '01',
    title: '先想清楚为什么要抽 SDK',
    summary:
      '不是有重复代码就该抽，只有存在跨项目复用、稳定能力边界和长期维护价值时才值得做。',
  },
  {
    order: '02',
    title: '先定 API，再写实现',
    summary:
      '外部调用方式、配置入口、返回值、错误对象比内部实现细节更先决定 SDK 成败。',
  },
  {
    order: '03',
    title: '把宿主差异隔离掉',
    summary:
      '浏览器、SSR、iframe、微前端、不同打包器环境要尽量通过适配层消化，而不是泄漏给使用方。',
  },
  {
    order: '04',
    title: '发布要像产品迭代',
    summary:
      '版本、文档、示例、变更日志和兼容策略是一体的，不是 npm publish 一下就结束。',
  },
  {
    order: '05',
    title: '可观测性不能后补',
    summary:
      '日志钩子、调试模式、错误码和埋点接口最好从第一版就留好，不然后期很难补救。',
  },
];

const guideStages = [
  {
    order: '01',
    title: '先确认抽象边界：到底是在做业务工具，还是在做可发布 SDK',
    tag: '边界建模',
    description:
      '很多团队把几段工具函数拼起来就叫 SDK，结果最后既不稳定，也不容易接入。真正的 SDK 需要对外暴露清晰能力边界，明确它服务的对象是谁、解决哪一层问题、依赖哪些宿主能力，以及哪些事情故意不做。边界不清，后面所有 API 设计都会被业务临时需求带偏。',
    bestFor: [
      '地图能力封装',
      '支付与登录集成',
      '埋点与监控客户端',
      'OpenAPI 客户端',
    ],
    focus: [
      '先定义 SDK 的责任边界和非职责边界',
      '确认目标接入方是业务页面、第三方团队还是外部开发者',
      '明确运行环境：浏览器、SSR、WebView、iframe、微前端',
    ],
    risks: [
      '把业务流程硬编码进 SDK，导致无法复用',
      '能力边界不停扩张，最后变成难维护的大杂烩',
      '默认依赖宿主全局对象，却没有文档说明',
    ],
    language: 'text',
    code: `SDK Boundary Checklist
- 服务谁：内部业务团队 / 第三方接入方 / 外部开发者
- 解决什么：请求封装 / 登录鉴权 / 地图渲染 / 埋点采集
- 依赖什么：fetch、localStorage、window、iframe bridge
- 不做什么：页面流程编排、业务文案、宿主路由跳转`,
  },
  {
    order: '02',
    title: '把对外 API 设计成长期稳定接口，而不是把内部实现直接暴露出去',
    tag: '接口设计',
    description:
      '渡一式的工程思路里，一个模块好不好，先看调用者爽不爽。SDK 更是如此。初始化方式、实例模型、插件机制、错误对象、回调与 Promise 的取舍、类型定义是否完备，决定了接入成本和未来升级成本。对外 API 一旦发布，就要按产品契约对待。',
    bestFor: ['TypeScript 项目', '多人协作组件层', '对外开放平台'],
    focus: [
      '优先设计 createClient / init 这类稳定入口',
      '返回值和错误对象都要有明确类型',
      '给扩展能力预留 hooks、plugins 或 adapters',
    ],
    risks: [
      '直接导出大量底层函数，导致接入方式碎片化',
      '错误模型不统一，调用方只能到处写 if/else',
      '配置项任意增长，没有默认值和校验机制',
    ],
    language: 'typescript',
    code: `export type SdkOptions = {
  baseURL: string
  timeout?: number
  tokenProvider?: () => string | Promise<string>
}

export type SdkError = {
  code: string
  message: string
  requestId?: string
}

export interface OrderSdk {
  getOrderDetail(orderId: string): Promise<OrderDetail>
  cancelOrder(orderId: string): Promise<void>
}

export function createOrderSdk(options: SdkOptions): OrderSdk {
  // 内部实现隐藏，对外只暴露稳定能力
  return { getOrderDetail, cancelOrder }
}`,
  },
  {
    order: '03',
    title: '实现层要模块化，别把请求、鉴权、缓存、重试全写进一个文件',
    tag: '内部架构',
    description:
      'SDK 内部虽然对外隐藏，但并不意味着可以随便写。成熟的 SDK 通常会把 transport、auth、serializer、cache、logger、plugin hooks 分层拆开。这样未来替换底层请求器、支持新平台、扩展调试模式时，才不会动一次全盘崩一次。',
    bestFor: ['中长期维护的 SDK', '需要插件扩展的能力包', '多平台接入项目'],
    focus: [
      '把请求器、鉴权器、错误转换器和日志器拆分',
      '为浏览器和 SSR 留出适配层',
      '通过中间件或 hooks 管理横切逻辑',
    ],
    risks: [
      '所有逻辑堆在一个 entry 文件里',
      'SDK 代码和示例代码耦合在一起',
      '底层实现无法替换，导致后续迁移困难',
    ],
    language: 'text',
    code: `src/
  core/
    client.ts
    transport.ts
    errors.ts
  auth/
    token-provider.ts
  plugins/
    retry.ts
    logger.ts
  adapters/
    browser.ts
    ssr.ts
  index.ts`,
  },
  {
    order: '04',
    title: '发布体系必须完整：构建产物、类型、文档、示例、语义版本缺一不可',
    tag: '发布工程',
    description:
      '会写 SDK 和会发布 SDK 是两回事。前端 SDK 一旦发布到 npm，就进入“别人依赖你”的状态。此时 package exports、ESM/CJS 兼容、d.ts、tree-shaking、changelog、示例仓库、版本策略都会直接影响接入体验。很多包死掉，不是能力不行，而是发布工程做得太粗。',
    bestFor: ['npm 私有包', '企业内部公共库', '对外开放 JS SDK'],
    focus: [
      '确保导出格式和类型产物完整',
      '维护 changelog、migration guide 和最小示例',
      '严格遵守 semver，破坏性变更必须大版本',
    ],
    risks: [
      '只发构建产物，不发类型和文档',
      '同一版本偷偷改行为，破坏使用方锁版本预期',
      '没有示例工程，接入方只能猜测使用方式',
    ],
    language: 'json',
    code: `{
  "name": "@team/telemetry-sdk",
  "version": "1.4.0",
  "type": "module",
  "main": "./dist/index.cjs",
  "module": "./dist/index.js",
  "types": "./dist/index.d.ts",
  "exports": {
    ".": {
      "types": "./dist/index.d.ts",
      "import": "./dist/index.js",
      "require": "./dist/index.cjs"
    }
  }
}`,
  },
  {
    order: '05',
    title: '最后补齐运行时可观测性和接入调试能力',
    tag: '可运维性',
    description:
      '真正成熟的 SDK，不是“接入后能跑”就结束，而是出问题时要能查。你最好从一开始就设计错误码、debug 开关、生命周期 hook、日志上报接口和 requestId 透传。否则一旦到了第三方环境、客户环境或复杂 WebView 里，排障会极其痛苦。',
    bestFor: ['第三方接入 SDK', '复杂终端环境', '需要远程排障的系统'],
    focus: [
      '定义统一错误码和上下文信息',
      '支持 debug 模式与可注入 logger',
      '关键请求链路保留 requestId 和 hooks',
    ],
    risks: [
      '线上问题只能让用户截图控制台',
      '没有错误码，所有异常都是 message 字符串',
      '调试能力依赖开发者自己改源码打日志',
    ],
    language: 'typescript',
    code: `sdk.on('request', (payload) => {
  logger?.info('sdk request', payload)
})

sdk.on('error', (error) => {
  reporter?.capture({
    code: error.code,
    message: error.message,
    requestId: error.requestId,
  })
})`,
  },
];

const designCards = [
  {
    title: '初始化模型',
    summary:
      '是全局单例、工厂创建实例，还是多租户多实例模式，决定了 SDK 能否安全地服务不同业务上下文。',
  },
  {
    title: '配置与默认值',
    summary:
      'baseURL、timeout、region、tokenProvider、debug 等配置要有默认策略和校验，不能完全放任调用方随意传。',
  },
  {
    title: '错误与返回值',
    summary:
      '对外返回统一数据结构和错误对象，让接入方能基于 code、requestId、status 做稳定处理，而不是只看 message。',
  },
  {
    title: '扩展机制',
    summary:
      '中间件、插件、hook、adapter 决定 SDK 是否能在不破坏主干的前提下扩展能力，比如重试、缓存、签名和日志。',
  },
  {
    title: '环境兼容',
    summary:
      '浏览器、SSR、Node、WebView、微前端容器之间差异很大，必须清楚哪些环境支持、哪些只部分支持。',
  },
  {
    title: '文档与示例',
    summary:
      '如果接入文档、错误码说明、最小 demo 不完整，SDK 再强也只会把接入成本转嫁给别人。',
  },
];

const sdkExample = `export type ClientOptions = {
  baseURL: string
  timeout?: number
  tokenProvider?: () => string | Promise<string>
  logger?: {
    info?: (message: string, payload?: unknown) => void
    error?: (message: string, payload?: unknown) => void
  }
}

export class ClientError extends Error {
  code: string
  requestId?: string

  constructor(code: string, message: string, requestId?: string) {
    super(message)
    this.name = 'ClientError'
    this.code = code
    this.requestId = requestId
  }
}

export function createClient(options: ClientOptions) {
  const request = async <T>(
    path: string,
    init: RequestInit = {},
  ): Promise<T> => {
    const token = await options.tokenProvider?.()
    const response = await fetch(\`\${options.baseURL}\${path}\`, {
      ...init,
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: \`Bearer \${token}\` } : {}),
        ...init.headers,
      },
    })

    const requestId = response.headers.get('x-request-id') ?? undefined

    if (!response.ok) {
      throw new ClientError(
        'REQUEST_FAILED',
        \`request failed with status \${response.status}\`,
        requestId,
      )
    }

    return (await response.json()) as T
  }

  return {
    getProfile() {
      return request<{ id: string; name: string }>('/profile')
    },
    updateProfile(payload: { name: string }) {
      return request('/profile', {
        method: 'PATCH',
        body: JSON.stringify(payload),
      })
    },
  }
}`;

const comparisonCards = [
  {
    title: '业务工具函数',
    summary:
      '它只服务当前项目，优先解决交付速度，不追求公开接口稳定性。适合放业务仓库内部，不适合直接当 SDK 发布。',
  },
  {
    title: '内部公共组件/能力包',
    summary:
      '它服务的是公司内多个项目，强调团队共识、接入效率和升级可控。通常需要文档、示例、版本规范，但兼容要求还低于对外 SDK。',
  },
  {
    title: '对外 SDK',
    summary:
      '它面对的是不可控接入方，必须把文档、错误码、语义版本、兼容边界和调试能力做到位，否则维护成本会指数级上升。',
  },
];
</script>

<style scoped>
.sdk-guide-page {
  min-height: calc(100vh - 40px);
  padding: 32px;
  border: 1px solid rgba(19, 27, 34, 0.08);
  border-radius: 7px;
  background:
    radial-gradient(
      circle at top right,
      rgba(216, 225, 232, 0.44),
      transparent 28%
    ),
    linear-gradient(180deg, #fbfcfd 0%, #f3f6f8 100%);
  box-shadow: 0 30px 80px rgba(18, 26, 34, 0.08);
}

.sdk-guide-page__shell {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.sdk-guide-page__top {
  display: flex;
  justify-content: flex-start;
}

.sdk-guide-page__back {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 38px;
  height: 38px;
  border: 1px solid rgba(19, 27, 34, 0.08);
  border-radius: 999px;
  color: #17202a;
  background: rgba(255, 255, 255, 0.9);
  text-decoration: none;
  transition:
    transform 160ms ease,
    border-color 160ms ease,
    box-shadow 160ms ease;
}

.sdk-guide-page__back:hover {
  transform: translateY(-1px);
  border-color: rgba(71, 90, 108, 0.18);
  box-shadow: 0 16px 30px rgba(18, 26, 34, 0.08);
}

.sdk-guide-page__content {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.sdk-guide-hero {
  display: grid;
  grid-template-columns: minmax(0, 1.4fr) minmax(280px, 0.8fr);
  gap: 18px;
}

.sdk-guide-hero__eyebrow,
.sdk-guide-section__eyebrow,
.sdk-guide-card__eyebrow,
.sdk-guide-panel__eyebrow {
  font-size: 11px;
  line-height: 1.4;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: #7a8591;
}

.sdk-guide-hero__title {
  margin-top: 10px;
  font-size: 42px;
  line-height: 1.08;
  font-weight: 600;
  letter-spacing: -0.04em;
  color: #17202a;
}

.sdk-guide-hero__summary,
.sdk-guide-panel__text,
.sdk-guide-card__text,
.sdk-guide-list,
.sdk-guide-hero__label,
.sdk-guide-mini-panel__title {
  color: #59636e;
}

.sdk-guide-hero__summary {
  margin-top: 16px;
  font-size: 15px;
  line-height: 1.9;
}

.sdk-guide-hero__panel,
.sdk-guide-card,
.sdk-guide-panel,
.sdk-guide-mini-panel {
  border: 1px solid rgba(19, 27, 34, 0.08);
  border-radius: 7px;
  background: rgba(255, 255, 255, 0.92);
}

.sdk-guide-hero__panel {
  padding: 22px;
}

.sdk-guide-hero__label {
  font-size: 13px;
  line-height: 1.5;
  font-weight: 600;
}

.sdk-guide-list {
  margin: 14px 0 0;
  padding-left: 18px;
  font-size: 14px;
  line-height: 1.85;
}

.sdk-guide-grid,
.sdk-guide-columns {
  display: grid;
  gap: 16px;
}

.sdk-guide-grid {
  grid-template-columns: repeat(5, minmax(0, 1fr));
}

.sdk-guide-columns {
  grid-template-columns: repeat(3, minmax(0, 1fr));
}

.sdk-guide-card,
.sdk-guide-panel {
  padding: 20px;
}

.sdk-guide-card__title,
.sdk-guide-panel__title,
.sdk-guide-section__title {
  color: #17202a;
}

.sdk-guide-card__title {
  margin-top: 10px;
  font-size: 18px;
  line-height: 1.4;
  font-weight: 600;
}

.sdk-guide-card__text,
.sdk-guide-panel__text {
  margin-top: 10px;
  font-size: 14px;
  line-height: 1.85;
}

.sdk-guide-section {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.sdk-guide-section__head {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  gap: 16px;
}

.sdk-guide-section__title {
  margin-top: 8px;
  font-size: 30px;
  line-height: 1.2;
  font-weight: 600;
  letter-spacing: -0.03em;
}

.sdk-guide-stack,
.sdk-guide-method__grid {
  display: grid;
  gap: 16px;
}

.sdk-guide-method__head,
.sdk-guide-detail__head {
  display: flex;
  justify-content: space-between;
  gap: 12px;
  align-items: flex-start;
}

.sdk-guide-method__tag {
  display: inline-flex;
  align-items: center;
  min-height: 28px;
  padding: 0 10px;
  border-radius: 999px;
  background: rgba(85, 104, 122, 0.08);
  color: #45515c;
  font-size: 12px;
  line-height: 1;
}

.sdk-guide-method__grid {
  grid-template-columns: repeat(3, minmax(0, 1fr));
  margin-top: 16px;
}

.sdk-guide-mini-panel {
  padding: 16px;
}

.sdk-guide-mini-panel__title {
  font-size: 13px;
  line-height: 1.4;
  font-weight: 600;
}

.sdk-guide-code-block {
  margin-top: 16px;
}

.sdk-guide-panel.is-wide {
  padding: 24px;
}

@media (max-width: 1200px) {
  .sdk-guide-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .sdk-guide-columns,
  .sdk-guide-method__grid,
  .sdk-guide-hero {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 900px) {
  .sdk-guide-page {
    min-height: auto;
    padding: 22px;
  }

  .sdk-guide-grid {
    grid-template-columns: 1fr;
  }

  .sdk-guide-hero__title {
    font-size: 34px;
  }

  .sdk-guide-section__title {
    font-size: 26px;
  }
}
</style>
