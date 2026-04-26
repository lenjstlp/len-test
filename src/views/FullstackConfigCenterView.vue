<template>
  <section class="config-center-guide-page">
    <div class="config-center-guide-page__shell">
      <div class="config-center-guide-page__top">
        <RouterLink
          to="/fullstack-guide"
          class="config-center-guide-page__back"
          aria-label="返回全栈能力菜单"
          title="返回全栈能力菜单"
        >
          <el-icon :size="18"><ArrowLeft /></el-icon>
        </RouterLink>
      </div>

      <div class="config-center-guide-page__content">
        <header class="config-center-guide-hero">
          <div>
            <p class="config-center-guide-hero__eyebrow">
              Frontend Config Center
            </p>
            <h1 class="config-center-guide-hero__title">前端配置中心能力</h1>
            <p class="config-center-guide-hero__summary">
              这一页按真实项目建设前端配置中心的顺序来讲：先区分配置中心、环境变量和特性开关，再处理配置模型、拉取时机、缓存回退、变更发布和权限治理。重点不是把
              JSON
              托管到远端，而是让菜单、文案、接口域名、租户差异和运行策略都能被稳定管理。
            </p>
          </div>

          <div class="config-center-guide-hero__panel">
            <p class="config-center-guide-hero__label">学完结果</p>
            <ul class="config-center-guide-list">
              <li>能分清配置中心、环境变量、特性开关和普通常量的边界。</li>
              <li>能设计前端配置拉取、缓存、兜底和版本回滚链路。</li>
              <li>能把配置发布、审计、权限和多环境治理纳入统一流程。</li>
            </ul>
          </div>
        </header>

        <section class="config-center-guide-grid">
          <article
            v-for="item in quickStages"
            :key="item.order"
            class="config-center-guide-card"
          >
            <p class="config-center-guide-card__eyebrow">
              Stage {{ item.order }}
            </p>
            <h2 class="config-center-guide-card__title">{{ item.title }}</h2>
            <p class="config-center-guide-card__text">{{ item.summary }}</p>
          </article>
        </section>

        <section class="config-center-guide-section">
          <div class="config-center-guide-section__head">
            <div>
              <p class="config-center-guide-section__eyebrow">Decision Order</p>
              <h2 class="config-center-guide-section__title">
                配置中心先定义配置边界，再建设拉取、发布与回滚治理
              </h2>
            </div>
          </div>

          <div class="config-center-guide-stack">
            <article
              v-for="stage in guideStages"
              :key="stage.order"
              class="config-center-guide-panel is-wide"
            >
              <div class="config-center-guide-method__head">
                <div>
                  <p class="config-center-guide-panel__eyebrow">
                    Stage {{ stage.order }}
                  </p>
                  <h3 class="config-center-guide-panel__title">
                    {{ stage.title }}
                  </h3>
                </div>
                <span class="config-center-guide-method__tag">
                  {{ stage.tag }}
                </span>
              </div>

              <p class="config-center-guide-panel__text">
                {{ stage.description }}
              </p>

              <div class="config-center-guide-method__grid">
                <section class="config-center-guide-mini-panel">
                  <p class="config-center-guide-mini-panel__title">适用场景</p>
                  <ul class="config-center-guide-list">
                    <li v-for="item in stage.bestFor" :key="item">
                      {{ item }}
                    </li>
                  </ul>
                </section>

                <section class="config-center-guide-mini-panel">
                  <p class="config-center-guide-mini-panel__title">实现重点</p>
                  <ul class="config-center-guide-list">
                    <li v-for="item in stage.focus" :key="item">
                      {{ item }}
                    </li>
                  </ul>
                </section>

                <section class="config-center-guide-mini-panel">
                  <p class="config-center-guide-mini-panel__title">常见误区</p>
                  <ul class="config-center-guide-list">
                    <li v-for="item in stage.risks" :key="item">
                      {{ item }}
                    </li>
                  </ul>
                </section>
              </div>

              <AppCodeBlock
                class="config-center-guide-code-block"
                :code="stage.code"
                :lang="stage.language"
              />
            </article>
          </div>
        </section>

        <section class="config-center-guide-section">
          <div class="config-center-guide-section__head">
            <div>
              <p class="config-center-guide-section__eyebrow">Comparison</p>
              <h2 class="config-center-guide-section__title">
                配置中心最关键的几组取舍
              </h2>
            </div>
          </div>

          <div class="config-center-guide-columns">
            <article
              v-for="item in comparisonCards"
              :key="item.title"
              class="config-center-guide-panel"
            >
              <h3 class="config-center-guide-panel__title">{{ item.title }}</h3>
              <p class="config-center-guide-panel__text">{{ item.summary }}</p>
            </article>
          </div>
        </section>

        <section class="config-center-guide-section">
          <div class="config-center-guide-section__head">
            <div>
              <p class="config-center-guide-section__eyebrow">Checklist</p>
              <h2 class="config-center-guide-section__title">
                一套能落地的前端配置中心清单
              </h2>
            </div>
          </div>

          <article class="config-center-guide-panel is-wide">
            <ul class="config-center-guide-list">
              <li>先区分哪些值适合放配置中心，哪些仍应留在构建期环境变量。</li>
              <li>
                配置必须带版本、来源、负责人和回滚链路，不能只发一份 JSON。
              </li>
              <li>
                首屏拉取、缓存策略、过期策略和本地兜底要一起设计，避免页面抖动。
              </li>
              <li>配置变更应支持环境隔离、灰度发布、审计记录和权限控制。</li>
              <li>
                页面消费配置时要有 schema 校验，避免错误配置直接击穿前端运行时。
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
    title: '先划清边界',
    summary: '配置中心不是特性开关替身，更不是把所有常量都搬到服务端。',
  },
  {
    order: '02',
    title: '配置模型要标准化',
    summary: '键名、版本、环境、schema 和负责人必须结构化，后续才能治理。',
  },
  {
    order: '03',
    title: '拉取策略决定体验',
    summary: '首屏什么时候拿配置，失败时怎么兜底，直接影响稳定性。',
  },
  {
    order: '04',
    title: '发布回滚要可控',
    summary: '配置变更不应比代码发布更随意，必须有灰度、回滚和审计。',
  },
  {
    order: '05',
    title: '消费侧必须防御',
    summary: '前端不能盲信远端配置，schema 校验和默认值是最后一道保险。',
  },
];

const guideStages = [
  {
    order: '01',
    title: '先分清什么适合进配置中心，什么不该进',
    tag: '问题建模',
    description:
      '前端配置中心最容易犯的错，是把一切动态值都托管出去。真正适合配置中心的，通常是运行期会变化、但又不属于实验灰度的业务参数，例如菜单文案、首页模块排序、运营位、接口域名映射、租户品牌配置、上传限制等。如果是构建期环境差异，更适合环境变量；如果需要按用户分桶做灰度，更适合特性开关。边界不清，配置中心最终会变成难以治理的杂物柜。',
    bestFor: ['运营配置', '品牌定制', '多环境参数', '运行期策略调整'],
    focus: [
      '区分配置中心、环境变量和特性开关',
      '明确配置面对的是运行期参数，而不是实验逻辑',
      '避免把纯静态常量和敏感密钥托管进去',
    ],
    risks: [
      '把所有变量都塞进配置中心',
      '把用户级灰度误做成普通配置',
      '把不该暴露到客户端的敏感值下发到前端',
    ],
    language: 'text',
    code: `Config Decision
- 构建期差异：环境变量
- 运行期通用参数：配置中心
- 按用户灰度/实验：特性开关
- 永不变化的常量：代码内常量`,
  },
  {
    order: '02',
    title: '配置项必须有 schema、版本和元数据，不能只是一份自由 JSON',
    tag: '模型设计',
    description:
      '如果配置结构不受约束，时间一长就会变成谁都能随便加字段的黑盒。一个能用的配置中心，至少要定义配置 key、schema、默认值、生效环境、版本号、负责人和更新时间。这样才能做校验、回滚、审计和兼容升级。否则配置一旦字段拼错、类型错配，前端运行时就会直接炸掉。',
    bestFor: ['多人团队', '长期维护项目', '高频配置变更系统'],
    focus: [
      '配置项带 schema 与默认值',
      '每次发布都有版本号和变更说明',
      '消费端基于类型和结构做兜底校验',
    ],
    risks: [
      '字段随意追加，没有版本概念',
      '配置后台与前端约定松散',
      '错误配置上线后没有快速识别机制',
    ],
    language: 'ts',
    code: `type RuntimeConfig = {
  version: string
  env: 'dev' | 'test' | 'prod'
  homepageLayout: 'insight' | 'feed' | 'workspace'
  uploadLimitMb: number
  supportContact: string
}`,
  },
  {
    order: '03',
    title: '客户端拉取策略要按重要程度分层，首屏配置和延迟配置不能混用',
    tag: '加载策略',
    description:
      '不是所有配置都应该阻塞应用启动。真正影响首页结构、接口地址、权限入口的关键配置，应该在应用初始化阶段优先拿到；而活动位、帮助文档、推荐模块等次级配置，可以异步拉取。与此同时，还要定义本地缓存 TTL、离线 fallback 和远端失败时的默认值。否则前端会出现先渲染一版、再被配置改写一版的闪烁体验。',
    bestFor: ['单页应用', '门户首页', '后台工作台', '需要运行期编排的系统'],
    focus: [
      '区分启动期关键配置和懒加载配置',
      '建立本地缓存与过期策略',
      '远程失败时回退到默认配置或最近成功版本',
    ],
    risks: [
      '所有配置都阻塞首屏导致初始化过慢',
      '首屏先渲染再被配置改写造成抖动',
      '无缓存、无回退，配置接口一挂全站异常',
    ],
    language: 'ts',
    code: `const runtimeConfig = await loadRuntimeConfig().catch(() => {
  return loadCachedConfig() ?? defaultRuntimeConfig
})

app.provide('runtimeConfig', runtimeConfig)`,
  },
  {
    order: '04',
    title: '配置变更必须走发布、灰度、审计和回滚链路，不能后台一点立即生效',
    tag: '发布治理',
    description:
      '很多团队把配置中心当成“免发版改线上”的快捷键，这非常危险。真正成熟的配置治理应该支持环境隔离、审批流程、灰度范围、发布时间、回滚版本和操作审计。对于关键配置，还应该做到先预发验证、再灰度租户或灰度区域、最后全量生效。配置发布如果没有纪律，事故概率不会低于代码发布。',
    bestFor: ['金融后台', '医疗系统', '多租户平台', '高风险业务配置'],
    focus: [
      '配置发布也要有审批和审计',
      '支持按环境、租户、区域灰度生效',
      '保留历史版本并支持一键回滚',
    ],
    risks: [
      '任何人都能直接改线上配置',
      '配置改动没有审批记录',
      '出问题后不知道回滚到哪个版本',
    ],
    language: 'yaml',
    code: `release:
  env: prod
  strategy: gray
  scope:
    tenants:
      - hospital-a
      - hospital-b
  rollbackVersion: "2026.04.26-3"`,
  },
  {
    order: '05',
    title: '消费配置的页面与组件必须做 schema 校验和降级渲染',
    tag: '消费治理',
    description:
      '配置中心真正的最后一道防线在消费端。即使发布链路再严格，也不能假设配置永远正确。组件在读取配置时，至少应该做字段存在性、类型和范围校验；关键模块还应提供降级 UI 和默认配置。比如首页模块列表字段缺失时回退到默认布局，上传限制缺失时回退到安全值，而不是直接让页面空白或按钮失效。',
    bestFor: ['组件库消费', '复杂首页编排', '动态表单', '白标项目'],
    focus: [
      '消费端做 schema 和范围校验',
      '关键配置缺失时有降级渲染方案',
      '把异常配置打到监控，便于追踪源头',
    ],
    risks: [
      '前端直接信任远端结构',
      '配置异常导致整页崩溃',
      '线上报错后无法关联到具体配置版本',
    ],
    language: 'ts',
    code: `const config = configSchema.safeParse(runtimeConfig)

if (!config.success) {
  reportConfigError(config.error)
  return defaultRuntimeConfig
}

return config.data`,
  },
];

const comparisonCards = [
  {
    title: '环境变量 vs 配置中心',
    summary:
      '环境变量适合构建期和环境级差异；配置中心适合运行期通用参数调整。两者都做成一类，会让构建边界和运行边界混乱。',
  },
  {
    title: '直接改线上 vs 发布链路治理',
    summary:
      '配置中心的价值不是让任何人能即时改线上，而是在不重新发版的前提下，依然保留审批、灰度、回滚和审计能力。',
  },
  {
    title: '信任远端数据 vs 消费端防御',
    summary:
      '远端配置出错并不罕见。成熟前端必须把 schema 校验、默认值和降级 UI 放到消费端，而不是把风险完全交给后台。',
  },
];
</script>

<style scoped>
.config-center-guide-page {
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

.config-center-guide-page__shell {
  min-height: calc(100vh - 90px);
  border: 1px solid rgba(19, 27, 34, 0.06);
  border-radius: 7px;
  background: rgba(255, 255, 255, 0.82);
}

.config-center-guide-page__top {
  display: flex;
  justify-content: flex-start;
  padding: 18px 18px 0;
}

.config-center-guide-page__back {
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

.config-center-guide-page__back:hover {
  transform: translateY(-1px);
  border-color: rgba(46, 70, 91, 0.18);
  box-shadow: 0 18px 34px rgba(19, 27, 34, 0.08);
}

.config-center-guide-page__content {
  padding: 18px 24px 24px;
}

.config-center-guide-hero {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 320px;
  gap: 20px;
  padding-bottom: 26px;
  border-bottom: 1px solid rgba(19, 27, 34, 0.08);
}

.config-center-guide-hero__eyebrow,
.config-center-guide-section__eyebrow,
.config-center-guide-card__eyebrow,
.config-center-guide-hero__label {
  font-size: 11px;
  line-height: 1.4;
  letter-spacing: 0.24em;
  text-transform: uppercase;
  color: #7b8793;
}

.config-center-guide-hero__title {
  margin-top: 10px;
  font-size: 46px;
  line-height: 1.06;
  font-weight: 600;
  letter-spacing: -0.05em;
  color: #17202a;
}

.config-center-guide-hero__summary {
  max-width: 860px;
  margin-top: 16px;
  font-size: 15px;
  line-height: 1.9;
  color: #58636f;
}

.config-center-guide-hero__panel,
.config-center-guide-card,
.config-center-guide-panel {
  border: 1px solid rgba(19, 27, 34, 0.08);
  border-radius: 7px;
  background: rgba(255, 255, 255, 0.84);
}

.config-center-guide-hero__panel {
  padding: 18px;
}

.config-center-guide-list {
  display: grid;
  gap: 8px;
  margin: 12px 0 0;
  padding-left: 18px;
  font-size: 14px;
  line-height: 1.8;
  color: #56616d;
}

.config-center-guide-grid,
.config-center-guide-columns,
.config-center-guide-stack {
  display: grid;
  gap: 16px;
}

.config-center-guide-grid {
  margin-top: 28px;
  grid-template-columns: repeat(3, minmax(0, 1fr));
}

.config-center-guide-card {
  padding: 18px;
}

.config-center-guide-card__title,
.config-center-guide-panel__title,
.config-center-guide-section__title {
  color: #17202a;
}

.config-center-guide-card__title {
  margin-top: 10px;
  font-size: 22px;
  line-height: 1.25;
  font-weight: 600;
}

.config-center-guide-card__text,
.config-center-guide-panel__text {
  margin-top: 12px;
  font-size: 14px;
  line-height: 1.9;
  color: #596571;
}

.config-center-guide-section {
  margin-top: 28px;
}

.config-center-guide-section__head {
  margin-bottom: 14px;
}

.config-center-guide-section__title {
  margin-top: 8px;
  font-size: 30px;
  line-height: 1.18;
  font-weight: 600;
  letter-spacing: -0.03em;
}

.config-center-guide-columns {
  grid-template-columns: repeat(3, minmax(0, 1fr));
}

.config-center-guide-stack {
  grid-template-columns: repeat(2, minmax(0, 1fr));
}

.config-center-guide-panel {
  padding: 18px;
}

.config-center-guide-panel.is-wide {
  grid-column: 1 / -1;
}

.config-center-guide-panel__eyebrow {
  font-size: 11px;
  line-height: 1.4;
  letter-spacing: 0.24em;
  text-transform: uppercase;
  color: #80909d;
}

.config-center-guide-panel__title {
  font-size: 20px;
  line-height: 1.3;
  font-weight: 600;
}

.config-center-guide-method__head {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 16px;
}

.config-center-guide-method__tag {
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

.config-center-guide-method__grid {
  display: grid;
  gap: 14px;
  margin-top: 16px;
  grid-template-columns: repeat(3, minmax(0, 1fr));
}

.config-center-guide-mini-panel {
  padding: 14px;
  border: 1px solid rgba(19, 27, 34, 0.08);
  border-radius: 7px;
  background: rgba(245, 248, 250, 0.9);
}

.config-center-guide-mini-panel__title {
  font-size: 14px;
  font-weight: 600;
  color: #17202a;
}

.config-center-guide-code-block {
  margin-top: 14px;
}

@media (max-width: 1080px) {
  .config-center-guide-hero,
  .config-center-guide-grid,
  .config-center-guide-columns,
  .config-center-guide-stack,
  .config-center-guide-method__grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 900px) {
  .config-center-guide-page {
    min-height: auto;
    padding: 18px;
  }

  .config-center-guide-page__shell {
    min-height: auto;
  }

  .config-center-guide-page__content {
    padding: 18px;
  }

  .config-center-guide-hero__title {
    font-size: 36px;
  }

  .config-center-guide-section__title {
    font-size: 26px;
  }
}
</style>
