<template>
  <section class="monorepo-guide-page">
    <div class="monorepo-guide-page__shell">
      <div class="monorepo-guide-page__top">
        <RouterLink
          to="/fullstack-guide"
          class="monorepo-guide-page__back"
          aria-label="返回全栈能力菜单"
          title="返回全栈能力菜单"
        >
          <el-icon :size="18"><ArrowLeft /></el-icon>
        </RouterLink>
      </div>

      <div class="monorepo-guide-page__content">
        <header class="monorepo-guide-hero">
          <div>
            <p class="monorepo-guide-hero__eyebrow">Monorepo Mastery</p>
            <h1 class="monorepo-guide-hero__title">Monorepo 掌握</h1>
            <p class="monorepo-guide-hero__summary">
              这一页按渡一前端常见的工程化讲法来组织：先明确 Monorepo
              不是“把项目都丢进一个仓库”，而是先规划
              workspace、依赖边界和任务编排，再去讲共享组件库、缓存加速、版本发布和
              CI 闭环。重点不是只会装 Turborepo 或
              pnpm，而是知道仓库为什么会失控、怎样把它管住。
            </p>
          </div>

          <div class="monorepo-guide-hero__panel">
            <p class="monorepo-guide-hero__label">学完结果</p>
            <ul class="monorepo-guide-list">
              <li>能把应用、组件库、工具包和配置包合理拆进同一个仓库。</li>
              <li>能设计依赖边界、任务编排和缓存策略，避免仓库越做越乱。</li>
              <li>能搭出 Monorepo 的开发、构建、测试、发布一体化流程。</li>
            </ul>
          </div>
        </header>

        <section class="monorepo-guide-grid">
          <article
            v-for="item in quickStages"
            :key="item.order"
            class="monorepo-guide-card"
          >
            <p class="monorepo-guide-card__eyebrow">Stage {{ item.order }}</p>
            <h2 class="monorepo-guide-card__title">{{ item.title }}</h2>
            <p class="monorepo-guide-card__text">{{ item.summary }}</p>
          </article>
        </section>

        <section class="monorepo-guide-section">
          <div class="monorepo-guide-section__head">
            <div>
              <p class="monorepo-guide-section__eyebrow">Decision Order</p>
              <h2 class="monorepo-guide-section__title">
                Monorepo 先分层，再谈工具和加速
              </h2>
            </div>
          </div>

          <div class="monorepo-guide-stack">
            <article
              v-for="stage in guideStages"
              :key="stage.order"
              class="monorepo-guide-panel is-wide"
            >
              <div class="monorepo-guide-method__head">
                <div>
                  <p class="monorepo-guide-panel__eyebrow">
                    Stage {{ stage.order }}
                  </p>
                  <h3 class="monorepo-guide-panel__title">{{ stage.title }}</h3>
                </div>
                <span class="monorepo-guide-method__tag">{{ stage.tag }}</span>
              </div>

              <p class="monorepo-guide-panel__text">{{ stage.description }}</p>

              <div class="monorepo-guide-method__grid">
                <section class="monorepo-guide-mini-panel">
                  <p class="monorepo-guide-mini-panel__title">适用场景</p>
                  <ul class="monorepo-guide-list">
                    <li v-for="item in stage.bestFor" :key="item">
                      {{ item }}
                    </li>
                  </ul>
                </section>

                <section class="monorepo-guide-mini-panel">
                  <p class="monorepo-guide-mini-panel__title">实现重点</p>
                  <ul class="monorepo-guide-list">
                    <li v-for="item in stage.focus" :key="item">
                      {{ item }}
                    </li>
                  </ul>
                </section>

                <section class="monorepo-guide-mini-panel">
                  <p class="monorepo-guide-mini-panel__title">常见误区</p>
                  <ul class="monorepo-guide-list">
                    <li v-for="item in stage.risks" :key="item">
                      {{ item }}
                    </li>
                  </ul>
                </section>
              </div>

              <AppCodeBlock
                class="monorepo-guide-code-block"
                :code="stage.code"
                :lang="stage.language"
              />
            </article>
          </div>
        </section>

        <section class="monorepo-guide-section">
          <div class="monorepo-guide-section__head">
            <div>
              <p class="monorepo-guide-section__eyebrow">Comparison</p>
              <h2 class="monorepo-guide-section__title">
                什么时候适合 Monorepo，什么时候会被它反噬
              </h2>
            </div>
          </div>

          <div class="monorepo-guide-columns">
            <article
              v-for="item in comparisonCards"
              :key="item.title"
              class="monorepo-guide-panel"
            >
              <h3 class="monorepo-guide-panel__title">{{ item.title }}</h3>
              <p class="monorepo-guide-panel__text">{{ item.summary }}</p>
            </article>
          </div>
        </section>

        <section class="monorepo-guide-section">
          <div class="monorepo-guide-section__head">
            <div>
              <p class="monorepo-guide-section__eyebrow">Checklist</p>
              <h2 class="monorepo-guide-section__title">
                一套能真正落地的 Monorepo 建设清单
              </h2>
            </div>
          </div>

          <article class="monorepo-guide-panel is-wide">
            <ul class="monorepo-guide-list">
              <li>
                先决定仓库里有哪些包，再决定工具，别反过来先装工具再找场景。
              </li>
              <li>
                共享代码必须有边界和命名规则，不要把所有公共代码扔进一个 utils
                包。
              </li>
              <li>任务编排要分清 build、lint、test、type-check 的依赖关系。</li>
              <li>
                缓存加速建立在正确依赖图之上，依赖图错了，缓存只会放大问题。
              </li>
              <li>
                发布和版本策略必须提前定好，不然包一多就会陷入人工维护灾难。
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
    title: '先分清仓库里有什么',
    summary: '应用、组件库、工具包、配置包是 Monorepo 最常见的四类角色。',
  },
  {
    order: '02',
    title: '共享不等于乱共享',
    summary: '真正关键的是依赖边界和包职责，而不是把代码集中到一起。',
  },
  {
    order: '03',
    title: '任务编排才是效率来源',
    summary: 'Monorepo 的提效核心不只是联动开发，还有任务依赖和缓存复用。',
  },
  {
    order: '04',
    title: '发布策略要提前设计',
    summary: '独立版本、统一版本、变更集，都决定后续维护成本。',
  },
  {
    order: '05',
    title: 'CI 才能放大 Monorepo 价值',
    summary: '没有增量构建、缓存和选择性执行，仓库一大反而会更慢。',
  },
];

const guideStages = [
  {
    order: '01',
    title: '先建模：Monorepo 解决的是多包协同，不是目录收纳问题',
    tag: '基础认知',
    description:
      '渡一前端讲工程化时，通常会先强调 Monorepo 的本质不是“把多个项目放在一个仓库”，而是让多个应用和多个包在同一套依赖、脚本和发布体系里协同工作。真正的价值在于共享基础设施、统一约束、减少重复维护，而不是单纯少切几个 Git 仓库。',
    bestFor: [
      '多应用项目',
      '组件库和业务项目并存',
      '前端基础设施建设',
      '中大型团队',
    ],
    focus: [
      '先确认仓库里有哪些类型的包',
      '明确每类包的职责和边界',
      '让共享代码服务于协同，而不是制造耦合',
    ],
    risks: [
      '只是把多个仓库硬搬进一个目录',
      '没有边界设计，导致所有包互相依赖',
      '仓库越大越乱，最后谁都不敢改公共包',
    ],
    language: 'text',
    code: `Monorepo Package Roles
- apps: 业务应用、后台、官网、小程序
- packages: 组件库、hooks、utils、sdk
- tooling: eslint、tsconfig、vite、build scripts
- infra: CI 配置、changeset、release scripts`,
  },
  {
    order: '02',
    title: 'Workspace 只是起点：真正重要的是依赖边界和包职责',
    tag: '仓库结构',
    description:
      '很多人学 Monorepo 容易停在 workspace 配置上，但真正决定仓库能不能长期维护的，是每个包的定位是否清晰。比如 ui 包只负责组件，config 包只负责配置，utils 包不要无限膨胀成公共垃圾桶。边界清晰，后面构建、测试和发布才会稳定。',
    bestFor: ['pnpm workspace', '共享组件库', '配置复用', '多包管理'],
    focus: [
      '按领域或职责拆包，而不是按心情拆包',
      '公共包尽量只向下提供能力，不反向依赖业务应用',
      '给包建立统一命名和目录规则',
    ],
    risks: [
      '一个 utils 包什么都装',
      '业务包直接互相引用源码',
      '目录结构没有规范，新人上手成本很高',
    ],
    language: 'yaml',
    code: `packages:
  - apps/*
  - packages/*
  - tooling/*
`,
  },
  {
    order: '03',
    title: '任务编排和缓存才是提效核心：增量执行、依赖图、远程缓存',
    tag: '构建提效',
    description:
      'Monorepo 真正把效率拉开的地方，不是 workspace 本身，而是任务编排。哪些包改了，哪些任务需要重跑，哪些可以复用缓存，这些才决定仓库大了之后还能不能跑得动。Turborepo、Nx 这些工具本质上都在做任务依赖和缓存复用。',
    bestFor: ['增量构建', '多人协作', 'CI 加速', '大型组件库仓库'],
    focus: [
      '建立 lint、test、build 的任务依赖关系',
      '只对受影响的包执行任务',
      '本地缓存和远程缓存配合使用',
    ],
    risks: [
      '所有命令都全量跑，仓库一大就卡死',
      '依赖图错误，导致缓存命中不可信',
      '只看缓存命中率，不校验构建结果正确性',
    ],
    language: 'json',
    code: `{
  "tasks": {
    "build": {
      "dependsOn": ["^build"],
      "outputs": ["dist/**"]
    },
    "lint": {},
    "test": {
      "dependsOn": ["^build"]
    }
  }
}`,
  },
  {
    order: '04',
    title: '共享组件库和工具包要能独立演进：版本、变更、消费链路要清晰',
    tag: '共享包治理',
    description:
      'Monorepo 里最容易失控的就是公共包。因为一旦多个应用都依赖它，任何改动都会产生联动影响。所以真正成熟的做法，是让共享包的版本策略、变更记录、消费方式都清晰起来。该内部直连就内部直连，该发包就发包，关键是不能靠口头约定维护。',
    bestFor: ['组件库', '前端 SDK', '设计系统', '跨项目复用包'],
    focus: [
      '明确哪些包只内部使用，哪些包需要发布',
      '为共享包建立变更说明和升级路径',
      '消费者升级时能看到影响范围',
    ],
    risks: [
      '公共包改动没有变更记录',
      '内部包和对外包策略混在一起',
      '升级公共包后业务应用大面积回归',
    ],
    language: 'json',
    code: `{
  "name": "@len/ui",
  "version": "1.4.0",
  "main": "dist/index.js",
  "types": "dist/index.d.ts",
  "exports": {
    ".": "./dist/index.js"
  }
}`,
  },
  {
    order: '05',
    title: '发布和 CI 要一体化：受影响包检测、测试、变更集、自动发布',
    tag: '发布闭环',
    description:
      'Monorepo 一旦进入多人协作阶段，发布流程如果还靠手工记录，很快就会崩。更稳的方案是把受影响包检测、增量测试、变更集记录和自动发布串起来。这样每次改动都会明确影响哪些包、要不要发版本、发哪个版本，而不是上线前临时猜。',
    bestFor: ['组件库发布', '多应用 CI', '持续交付', '多人维护仓库'],
    focus: [
      '提交时识别受影响包',
      '结合 changeset 或类似工具记录变更',
      '在 CI 里串联构建、测试和发布流程',
    ],
    risks: [
      '所有包一律一起发版',
      '版本号靠人工维护，极易出错',
      'CI 不区分受影响范围，浪费大量时间',
    ],
    language: 'yaml',
    code: `name: monorepo-ci

on:
  pull_request:
  push:
    branches: [master]

jobs:
  verify:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: pnpm
      - run: pnpm install --frozen-lockfile
      - run: pnpm turbo run lint test build
      - run: pnpm changeset status`,
  },
];

const comparisonCards = [
  {
    title: 'Monorepo vs 多仓库',
    summary:
      'Monorepo 适合多包强协同、共享基础设施多、版本联动频繁的场景；多仓库更适合边界天然清晰、团队独立性很强的系统。',
  },
  {
    title: 'Workspace 管理 vs 任务编排工具',
    summary:
      'Workspace 解决的是依赖安装和本地联动，任务编排工具解决的是增量执行、缓存和 CI 提效。两者不是同一个层面。',
  },
  {
    title: '统一版本 vs 独立版本',
    summary:
      '统一版本简单粗暴，适合强绑定产品；独立版本更灵活，适合组件库和工具包演进，但治理复杂度会更高。',
  },
];
</script>

<style scoped>
.monorepo-guide-page {
  min-height: calc(100vh - 40px);
  padding: 24px;
  border: 1px solid rgba(19, 27, 34, 0.08);
  border-radius: 7px;
  background:
    radial-gradient(
      circle at top left,
      rgba(224, 231, 236, 0.48),
      transparent 28%
    ),
    linear-gradient(180deg, #fcfdfe 0%, #f3f6f8 100%);
  box-shadow: 0 30px 80px rgba(18, 26, 34, 0.08);
}

.monorepo-guide-page__shell {
  min-height: calc(100vh - 90px);
  border: 1px solid rgba(19, 27, 34, 0.06);
  border-radius: 7px;
  background: rgba(255, 255, 255, 0.82);
}

.monorepo-guide-page__top {
  display: flex;
  justify-content: flex-start;
  padding: 18px 18px 0;
}

.monorepo-guide-page__back {
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

.monorepo-guide-page__back:hover {
  transform: translateY(-1px);
  border-color: rgba(46, 70, 91, 0.18);
  box-shadow: 0 18px 34px rgba(19, 27, 34, 0.08);
}

.monorepo-guide-page__content {
  padding: 18px 24px 24px;
}

.monorepo-guide-hero {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 320px;
  gap: 20px;
  padding-bottom: 26px;
  border-bottom: 1px solid rgba(19, 27, 34, 0.08);
}

.monorepo-guide-hero__eyebrow,
.monorepo-guide-section__eyebrow,
.monorepo-guide-card__eyebrow,
.monorepo-guide-hero__label {
  font-size: 11px;
  line-height: 1.4;
  letter-spacing: 0.24em;
  text-transform: uppercase;
  color: #7b8793;
}

.monorepo-guide-hero__title {
  margin-top: 10px;
  font-size: 46px;
  line-height: 1.06;
  font-weight: 600;
  letter-spacing: -0.05em;
  color: #17202a;
}

.monorepo-guide-hero__summary {
  max-width: 860px;
  margin-top: 16px;
  font-size: 15px;
  line-height: 1.9;
  color: #58636f;
}

.monorepo-guide-hero__panel,
.monorepo-guide-card,
.monorepo-guide-panel {
  border: 1px solid rgba(19, 27, 34, 0.08);
  border-radius: 7px;
  background: rgba(255, 255, 255, 0.84);
}

.monorepo-guide-hero__panel {
  padding: 18px;
}

.monorepo-guide-list {
  display: grid;
  gap: 8px;
  margin: 12px 0 0;
  padding-left: 18px;
  font-size: 14px;
  line-height: 1.8;
  color: #56616d;
}

.monorepo-guide-grid,
.monorepo-guide-columns,
.monorepo-guide-stack {
  display: grid;
  gap: 16px;
}

.monorepo-guide-grid {
  margin-top: 28px;
  grid-template-columns: repeat(3, minmax(0, 1fr));
}

.monorepo-guide-card {
  padding: 18px;
}

.monorepo-guide-card__title,
.monorepo-guide-panel__title,
.monorepo-guide-section__title {
  color: #17202a;
}

.monorepo-guide-card__title {
  margin-top: 10px;
  font-size: 22px;
  line-height: 1.25;
  font-weight: 600;
}

.monorepo-guide-card__text,
.monorepo-guide-panel__text {
  margin-top: 12px;
  font-size: 14px;
  line-height: 1.9;
  color: #596571;
}

.monorepo-guide-section {
  margin-top: 28px;
}

.monorepo-guide-section__head {
  margin-bottom: 14px;
}

.monorepo-guide-section__title {
  margin-top: 8px;
  font-size: 30px;
  line-height: 1.18;
  font-weight: 600;
  letter-spacing: -0.03em;
}

.monorepo-guide-columns {
  grid-template-columns: repeat(3, minmax(0, 1fr));
}

.monorepo-guide-stack {
  grid-template-columns: repeat(2, minmax(0, 1fr));
}

.monorepo-guide-panel {
  padding: 18px;
}

.monorepo-guide-panel.is-wide {
  grid-column: 1 / -1;
}

.monorepo-guide-panel__eyebrow {
  font-size: 11px;
  line-height: 1.4;
  letter-spacing: 0.24em;
  text-transform: uppercase;
  color: #80909d;
}

.monorepo-guide-panel__title {
  font-size: 20px;
  line-height: 1.3;
  font-weight: 600;
}

.monorepo-guide-method__head {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 16px;
}

.monorepo-guide-method__tag {
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

.monorepo-guide-method__grid {
  display: grid;
  gap: 14px;
  margin-top: 16px;
  grid-template-columns: repeat(3, minmax(0, 1fr));
}

.monorepo-guide-mini-panel {
  padding: 14px;
  border: 1px solid rgba(19, 27, 34, 0.08);
  border-radius: 7px;
  background: rgba(245, 248, 250, 0.9);
}

.monorepo-guide-mini-panel__title {
  font-size: 14px;
  font-weight: 600;
  color: #17202a;
}

.monorepo-guide-code-block {
  margin-top: 14px;
}

@media (max-width: 1080px) {
  .monorepo-guide-hero,
  .monorepo-guide-grid,
  .monorepo-guide-columns,
  .monorepo-guide-stack,
  .monorepo-guide-method__grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 900px) {
  .monorepo-guide-page {
    min-height: auto;
    padding: 18px;
  }

  .monorepo-guide-page__shell {
    min-height: auto;
  }

  .monorepo-guide-page__content {
    padding: 18px;
  }

  .monorepo-guide-hero__title {
    font-size: 36px;
  }

  .monorepo-guide-section__title {
    font-size: 26px;
  }
}
</style>
