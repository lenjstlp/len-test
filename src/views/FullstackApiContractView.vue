<template>
  <section class="api-contract-guide-page">
    <div class="api-contract-guide-page__shell">
      <div class="api-contract-guide-page__top">
        <RouterLink
          to="/fullstack-guide"
          class="api-contract-guide-page__back"
          aria-label="返回全栈能力菜单"
          title="返回全栈能力菜单"
        >
          <el-icon :size="18"><ArrowLeft /></el-icon>
        </RouterLink>
      </div>

      <div class="api-contract-guide-page__content">
        <header class="api-contract-guide-hero">
          <div>
            <p class="api-contract-guide-hero__eyebrow">
              Frontend API Contract
            </p>
            <h1 class="api-contract-guide-hero__title">前端接口契约能力</h1>
            <p class="api-contract-guide-hero__summary">
              这一页按真实项目建设接口契约的顺序来讲：先界定接口契约是什么，再处理
              schema 约束、类型生成、Mock
              联调、版本兼容和运行时校验。重点不是只让 TypeScript
              不报错，而是让前后端协作、回归验证、灰度上线和问题定位都基于同一份协议。
            </p>
          </div>

          <div class="api-contract-guide-hero__panel">
            <p class="api-contract-guide-hero__label">学完结果</p>
            <ul class="api-contract-guide-list">
              <li>能分清接口文档、代码类型和真实契约之间的边界。</li>
              <li>能设计 schema、代码生成、Mock、联调和回归的整套流程。</li>
              <li>能把版本兼容、运行时校验和监控纳入接口治理体系。</li>
            </ul>
          </div>
        </header>

        <section class="api-contract-guide-grid">
          <article
            v-for="item in quickStages"
            :key="item.order"
            class="api-contract-guide-card"
          >
            <p class="api-contract-guide-card__eyebrow">
              Stage {{ item.order }}
            </p>
            <h2 class="api-contract-guide-card__title">{{ item.title }}</h2>
            <p class="api-contract-guide-card__text">{{ item.summary }}</p>
          </article>
        </section>

        <section class="api-contract-guide-section">
          <div class="api-contract-guide-section__head">
            <div>
              <p class="api-contract-guide-section__eyebrow">Decision Order</p>
              <h2 class="api-contract-guide-section__title">
                接口契约先统一协议，再打通生成、校验与回滚闭环
              </h2>
            </div>
          </div>

          <div class="api-contract-guide-stack">
            <article
              v-for="stage in guideStages"
              :key="stage.order"
              class="api-contract-guide-panel is-wide"
            >
              <div class="api-contract-guide-method__head">
                <div>
                  <p class="api-contract-guide-panel__eyebrow">
                    Stage {{ stage.order }}
                  </p>
                  <h3 class="api-contract-guide-panel__title">
                    {{ stage.title }}
                  </h3>
                </div>
                <span class="api-contract-guide-method__tag">
                  {{ stage.tag }}
                </span>
              </div>

              <p class="api-contract-guide-panel__text">
                {{ stage.description }}
              </p>

              <div class="api-contract-guide-method__grid">
                <section class="api-contract-guide-mini-panel">
                  <p class="api-contract-guide-mini-panel__title">适用场景</p>
                  <ul class="api-contract-guide-list">
                    <li v-for="item in stage.bestFor" :key="item">
                      {{ item }}
                    </li>
                  </ul>
                </section>

                <section class="api-contract-guide-mini-panel">
                  <p class="api-contract-guide-mini-panel__title">实现重点</p>
                  <ul class="api-contract-guide-list">
                    <li v-for="item in stage.focus" :key="item">
                      {{ item }}
                    </li>
                  </ul>
                </section>

                <section class="api-contract-guide-mini-panel">
                  <p class="api-contract-guide-mini-panel__title">常见误区</p>
                  <ul class="api-contract-guide-list">
                    <li v-for="item in stage.risks" :key="item">
                      {{ item }}
                    </li>
                  </ul>
                </section>
              </div>

              <AppCodeBlock
                class="api-contract-guide-code-block"
                :code="stage.code"
                :lang="stage.language"
              />
            </article>
          </div>
        </section>

        <section class="api-contract-guide-section">
          <div class="api-contract-guide-section__head">
            <div>
              <p class="api-contract-guide-section__eyebrow">Comparison</p>
              <h2 class="api-contract-guide-section__title">
                接口契约最关键的几组取舍
              </h2>
            </div>
          </div>

          <div class="api-contract-guide-columns">
            <article
              v-for="item in comparisonCards"
              :key="item.title"
              class="api-contract-guide-panel"
            >
              <h3 class="api-contract-guide-panel__title">{{ item.title }}</h3>
              <p class="api-contract-guide-panel__text">{{ item.summary }}</p>
            </article>
          </div>
        </section>

        <section class="api-contract-guide-section">
          <div class="api-contract-guide-section__head">
            <div>
              <p class="api-contract-guide-section__eyebrow">Checklist</p>
              <h2 class="api-contract-guide-section__title">
                一套能落地的前端接口契约清单
              </h2>
            </div>
          </div>

          <article class="api-contract-guide-panel is-wide">
            <ul class="api-contract-guide-list">
              <li>
                先确认接口契约的单一来源，是 OpenAPI、GraphQL schema
                还是自定义协议文件。
              </li>
              <li>
                类型、请求 SDK、Mock
                数据和文档要从同一份契约生成，避免多份事实来源。
              </li>
              <li>前端消费关键接口时要做运行时校验，不能只信编译期类型。</li>
              <li>
                接口变更要区分兼容升级和破坏性升级，并给出灰度与回滚策略。
              </li>
              <li>
                联调、回归和线上告警都应围绕契约版本组织，而不是临时口头同步。
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
    title: '先统一契约源',
    summary: '没有单一契约源，类型、文档、Mock 和联调很快就会各说各话。',
  },
  {
    order: '02',
    title: '生成链路自动化',
    summary: '接口类型和请求层不应该手写维护，应该由契约自动生成。',
  },
  {
    order: '03',
    title: '运行时仍要校验',
    summary: 'TypeScript 只能校验编译期，线上返回脏数据时还需要运行时防御。',
  },
  {
    order: '04',
    title: '版本兼容要设计',
    summary: '字段新增、重命名、废弃都要有兼容窗口，不能直接硬切。',
  },
  {
    order: '05',
    title: '联调与监控闭环',
    summary: 'Mock、联调、灰度和错误监控必须围绕契约版本统一起来。',
  },
];

const guideStages = [
  {
    order: '01',
    title: '先定义什么叫接口契约，别把接口文档和真实契约混为一谈',
    tag: '问题建模',
    description:
      '很多团队说自己有接口规范，实际只是有一份静态文档。真正的接口契约是前后端共同遵守、可被工具消费、可被代码生成和可被校验的一套协议描述。它不仅包含 URL 和字段，还要包含字段类型、必填规则、错误码、分页结构、鉴权要求和版本边界。否则文档只是参考，不是协议。',
    bestFor: ['多人协作团队', '中大型前端项目', '跨端共享接口', '长期维护平台'],
    focus: [
      '明确单一契约源',
      '把字段、错误码和鉴权都纳入协议范围',
      '让契约可以被生成工具和测试工具消费',
    ],
    risks: [
      '只有在线文档，没有可执行契约',
      '前端类型和后端实现各写一套',
      '错误码和异常结构没有被纳入协议',
    ],
    language: 'yaml',
    code: `openapi: 3.1.0
paths:
  /users/{id}:
    get:
      responses:
        '200':
          description: ok
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/UserDetail'`,
  },
  {
    order: '02',
    title: '类型、请求 SDK 和 Mock 要从同一份契约生成，不能手写分叉',
    tag: '生成链路',
    description:
      '接口契约真正能提高效率的地方，在于它可以成为生成源。前端的 TypeScript 类型、请求 SDK、Mock 数据模板、测试桩甚至文档都应该尽量从同一份契约推导出来。这样新增字段、删字段、改错误码时，只要更新契约并重新生成，协作成本就会大幅下降。手写类型短期快，长期必然漂移。',
    bestFor: ['接口数量多的后台', '跨团队协作', '频繁演进的业务系统'],
    focus: [
      '把生成过程纳入脚本或 CI',
      '让请求层和类型层共享同一来源',
      'Mock 和文档也尽量围绕契约生成',
    ],
    risks: [
      '手写类型与后端字段逐渐偏离',
      '请求 SDK 和文档来自不同来源',
      '改接口后没有触发生成流程',
    ],
    language: 'ts',
    code: `export interface UserDetail {
  id: string
  name: string
  avatar?: string
}

export const getUserDetail = (id: string) =>
  request.get<UserDetail>(\`/users/\${id}\`)`,
  },
  {
    order: '03',
    title: '前端消费接口时要做运行时校验，线上数据永远可能脏',
    tag: '运行时防御',
    description:
      '即使契约和类型都正确，线上也仍然可能出现脏数据，例如旧服务实例未升级、灰度节点返回旧字段、网关包装结构异常，或者后端热修时漏掉字段。前端如果只依赖 TypeScript，到了运行时就毫无防线。关键接口应该在请求层或 BFF 层做 schema 校验，并为缺失字段准备默认值或降级 UI。',
    bestFor: [
      '核心业务页面',
      '高价值交易流程',
      '不稳定接口依赖',
      '灰度发布场景',
    ],
    focus: [
      '关键接口响应做 schema 校验',
      '对缺失字段提供降级逻辑',
      '异常结构打到监控并带上契约版本',
    ],
    risks: [
      '把 TS 类型误当成运行时保障',
      '后端字段异常直接把页面打崩',
      '线上报错无法定位到具体接口版本',
    ],
    language: 'ts',
    code: `const result = userDetailSchema.safeParse(response.data)

if (!result.success) {
  reportContractError(result.error)
  return fallbackUserDetail
}

return result.data`,
  },
  {
    order: '04',
    title: '接口变更要区分兼容升级和破坏性升级，给前端足够迁移窗口',
    tag: '版本治理',
    description:
      '接口治理最容易出事故的地方是字段硬切。新增字段通常是兼容升级，但删除字段、修改类型、改变枚举值、重构错误结构都属于破坏性升级。成熟团队会给这类变更设置版本号、兼容窗口、双写期或双读期，并要求前后端在灰度阶段共同验证。否则你今天改一个字段名，线上几个页面可能瞬间全挂。',
    bestFor: ['高频迭代系统', '多端共享接口', '需要平滑升级的项目'],
    focus: [
      '明确兼容升级与破坏性升级标准',
      '为破坏性升级提供双版本过渡期',
      '在 CI 或联调环境提前发现不兼容变更',
    ],
    risks: [
      '直接删除旧字段不留过渡',
      '前后端对版本号和兼容窗口理解不一致',
      '灰度阶段没有验证旧客户端表现',
    ],
    language: 'yaml',
    code: `contractVersion: 2026-04-26
compatibility:
  deprecatedFields:
    - userName
  sunsetAt: 2026-05-31
  fallbackVersion: 2026-03-18`,
  },
  {
    order: '05',
    title: '联调、回归和线上告警都应该围绕契约版本组织',
    tag: '工程闭环',
    description:
      '接口契约不是写完就结束。它应该贯穿开发、联调、测试和线上观测。比如联调环境根据契约自动生成 Mock，E2E 用契约快照做回归，线上请求异常带上契约版本和接口名。这样字段错误、错误码变更、分页结构异常都能快速关联到某次契约改动，而不是靠人肉回忆谁改过接口。',
    bestFor: [
      '有 CI/CD 的团队',
      '需要自动化回归的项目',
      '问题定位成本高的系统',
    ],
    focus: [
      'Mock、自动化测试和线上监控统一引用契约版本',
      '重要接口做契约快照比对',
      '变更记录与发布记录可追踪',
    ],
    risks: [
      '联调时临时改字段没有留下痕迹',
      '线上告警只有报错没有上下文版本',
      '自动化测试与真实接口契约脱节',
    ],
    language: 'json',
    code: `{
  "api": "GET /users/{id}",
  "contractVersion": "2026-04-26",
  "mockSource": "openapi",
  "assertions": ["required:name", "enum:status"]
}`,
  },
];

const comparisonCards = [
  {
    title: '接口文档 vs 可执行契约',
    summary:
      '接口文档只能给人看，可执行契约还能生成类型、Mock、SDK 和校验逻辑。真正能减少协作摩擦的是后者。',
  },
  {
    title: '编译期类型 vs 运行时校验',
    summary:
      '编译期类型解决开发体验，运行时校验解决线上脏数据。缺任何一个，接口治理都不完整。',
  },
  {
    title: '一次性联调 vs 持续契约治理',
    summary:
      '接口契约的价值不在首次联调，而在持续演进时仍能控制兼容、回归和回滚成本。',
  },
];
</script>

<style scoped>
.api-contract-guide-page {
  min-height: calc(100vh - 40px);
  padding: 32px;
  background:
    radial-gradient(
      circle at top right,
      rgba(218, 225, 232, 0.45),
      transparent 28%
    ),
    linear-gradient(180deg, #fbfcfd 0%, #f2f5f8 100%);
  box-shadow: 0 30px 80px rgba(18, 26, 34, 0.08);
}

.api-contract-guide-page__shell {
  min-height: calc(100vh - 90px);
  border: 1px solid rgba(19, 27, 34, 0.06);
  border-radius: 7px;
  background: rgba(255, 255, 255, 0.82);
}

.api-contract-guide-page__top {
  display: flex;
  justify-content: flex-start;
  padding: 18px 18px 0;
}

.api-contract-guide-page__back {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 42px;
  height: 42px;
  border: 1px solid rgba(19, 27, 34, 0.08);
  border-radius: 999px;
  background: #ffffff;
  color: #22303c;
  text-decoration: none;
  transition:
    transform 160ms ease,
    border-color 160ms ease,
    box-shadow 160ms ease;
}

.api-contract-guide-page__back:hover {
  transform: translateY(-1px);
  border-color: rgba(46, 70, 91, 0.18);
  box-shadow: 0 18px 34px rgba(19, 27, 34, 0.08);
}

.api-contract-guide-page__content {
  padding: 18px 24px 24px;
}

.api-contract-guide-hero {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 320px;
  gap: 20px;
  padding-bottom: 26px;
  border-bottom: 1px solid rgba(19, 27, 34, 0.08);
}

.api-contract-guide-hero__eyebrow,
.api-contract-guide-section__eyebrow,
.api-contract-guide-card__eyebrow,
.api-contract-guide-hero__label {
  font-size: 11px;
  line-height: 1.4;
  letter-spacing: 0.24em;
  text-transform: uppercase;
  color: #7b8793;
}

.api-contract-guide-hero__title {
  margin-top: 10px;
  font-size: 46px;
  line-height: 1.06;
  font-weight: 600;
  letter-spacing: -0.05em;
  color: #17202a;
}

.api-contract-guide-hero__summary {
  max-width: 860px;
  margin-top: 16px;
  font-size: 15px;
  line-height: 1.9;
  color: #58636f;
}

.api-contract-guide-hero__panel,
.api-contract-guide-card,
.api-contract-guide-panel {
  border: 1px solid rgba(19, 27, 34, 0.08);
  border-radius: 7px;
  background: rgba(255, 255, 255, 0.84);
}

.api-contract-guide-hero__panel {
  padding: 18px;
}

.api-contract-guide-list {
  display: grid;
  gap: 8px;
  margin: 12px 0 0;
  padding-left: 18px;
  font-size: 14px;
  line-height: 1.8;
  color: #56616d;
}

.api-contract-guide-grid,
.api-contract-guide-columns,
.api-contract-guide-stack {
  display: grid;
  gap: 16px;
}

.api-contract-guide-grid {
  margin-top: 28px;
  grid-template-columns: repeat(3, minmax(0, 1fr));
}

.api-contract-guide-card {
  padding: 18px;
}

.api-contract-guide-card__title,
.api-contract-guide-panel__title,
.api-contract-guide-section__title {
  color: #17202a;
}

.api-contract-guide-card__title {
  margin-top: 10px;
  font-size: 22px;
  line-height: 1.25;
  font-weight: 600;
}

.api-contract-guide-card__text,
.api-contract-guide-panel__text {
  margin-top: 12px;
  font-size: 14px;
  line-height: 1.9;
  color: #596571;
}

.api-contract-guide-section {
  margin-top: 28px;
}

.api-contract-guide-section__head {
  margin-bottom: 14px;
}

.api-contract-guide-section__title {
  margin-top: 8px;
  font-size: 30px;
  line-height: 1.18;
  font-weight: 600;
  letter-spacing: -0.03em;
}

.api-contract-guide-columns {
  grid-template-columns: repeat(3, minmax(0, 1fr));
}

.api-contract-guide-stack {
  grid-template-columns: repeat(2, minmax(0, 1fr));
}

.api-contract-guide-panel {
  padding: 18px;
}

.api-contract-guide-panel.is-wide {
  grid-column: 1 / -1;
}

.api-contract-guide-panel__eyebrow {
  font-size: 11px;
  line-height: 1.4;
  letter-spacing: 0.24em;
  text-transform: uppercase;
  color: #80909d;
}

.api-contract-guide-panel__title {
  font-size: 20px;
  line-height: 1.3;
  font-weight: 600;
}

.api-contract-guide-method__head {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 16px;
}

.api-contract-guide-method__tag {
  display: inline-flex;
  align-items: center;
  min-height: 28px;
  padding: 0 12px;
  border-radius: 999px;
  background: rgba(115, 145, 167, 0.1);
  color: #587289;
  font-size: 12px;
  white-space: nowrap;
}

.api-contract-guide-method__grid {
  display: grid;
  gap: 14px;
  margin-top: 16px;
  grid-template-columns: repeat(3, minmax(0, 1fr));
}

.api-contract-guide-mini-panel {
  padding: 14px;
  border: 1px solid rgba(19, 27, 34, 0.08);
  border-radius: 7px;
  background: rgba(245, 248, 250, 0.9);
}

.api-contract-guide-mini-panel__title {
  font-size: 14px;
  font-weight: 600;
  color: #17202a;
}

.api-contract-guide-code-block {
  margin-top: 14px;
}

@media (max-width: 1080px) {
  .api-contract-guide-hero,
  .api-contract-guide-grid,
  .api-contract-guide-columns,
  .api-contract-guide-stack,
  .api-contract-guide-method__grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 900px) {
  .api-contract-guide-page {
    min-height: auto;
    padding: 18px;
  }

  .api-contract-guide-page__shell {
    min-height: auto;
  }

  .api-contract-guide-page__content {
    padding: 18px;
  }

  .api-contract-guide-hero__title {
    font-size: 36px;
  }

  .api-contract-guide-section__title {
    font-size: 26px;
  }
}
</style>
