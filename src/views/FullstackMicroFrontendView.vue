<template>
  <section class="micro-guide-page">
    <div class="micro-guide-page__shell">
      <div class="micro-guide-page__top">
        <RouterLink
          to="/fullstack-guide"
          class="micro-guide-page__back"
          aria-label="返回全栈能力菜单"
          title="返回全栈能力菜单"
        >
          <el-icon :size="18"><ArrowLeft /></el-icon>
        </RouterLink>
      </div>

      <div class="micro-guide-page__content">
        <header class="micro-guide-hero">
          <div>
            <p class="micro-guide-hero__eyebrow">Frontend Micro Frontend</p>
            <h1 class="micro-guide-hero__title">前端微前端能力</h1>
            <p class="micro-guide-hero__summary">
              这一页按真实项目落地微前端时最容易踩坑的顺序来讲：先判断到底需不需要拆成微前端，再看路由接管、子应用通信、样式隔离、依赖共享、发布链路和治理边界。重点不是会不会接
              qiankun，而是知道什么场景适合拆、拆完如何不把系统做成多仓库灾难。
            </p>
          </div>

          <div class="micro-guide-hero__panel">
            <p class="micro-guide-hero__label">学完结果</p>
            <ul class="micro-guide-list">
              <li>
                能判断微前端到底是在解决团队协作问题，还是在制造额外复杂度。
              </li>
              <li>能拆清主应用、子应用、共享依赖和发布链路的边界。</li>
              <li>能理解路由接管、通信、样式隔离和灰度发布的落地重点。</li>
            </ul>
          </div>
        </header>

        <section class="micro-guide-grid">
          <article
            v-for="item in quickStages"
            :key="item.order"
            class="micro-guide-card"
          >
            <p class="micro-guide-card__eyebrow">Stage {{ item.order }}</p>
            <h2 class="micro-guide-card__title">{{ item.title }}</h2>
            <p class="micro-guide-card__text">{{ item.summary }}</p>
          </article>
        </section>

        <section class="micro-guide-section">
          <div class="micro-guide-section__head">
            <div>
              <p class="micro-guide-section__eyebrow">Decision Order</p>
              <h2 class="micro-guide-section__title">
                微前端先判断组织问题，再设计技术边界
              </h2>
            </div>
          </div>

          <div class="micro-guide-stack">
            <article
              v-for="stage in guideStages"
              :key="stage.order"
              class="micro-guide-panel is-wide"
            >
              <div class="micro-guide-method__head">
                <div>
                  <p class="micro-guide-panel__eyebrow">
                    Stage {{ stage.order }}
                  </p>
                  <h3 class="micro-guide-panel__title">
                    {{ stage.title }}
                  </h3>
                </div>
                <span class="micro-guide-method__tag">{{ stage.tag }}</span>
              </div>

              <p class="micro-guide-panel__text">{{ stage.description }}</p>

              <div class="micro-guide-method__grid">
                <section class="micro-guide-mini-panel">
                  <p class="micro-guide-mini-panel__title">适用场景</p>
                  <ul class="micro-guide-list">
                    <li v-for="item in stage.bestFor" :key="item">
                      {{ item }}
                    </li>
                  </ul>
                </section>

                <section class="micro-guide-mini-panel">
                  <p class="micro-guide-mini-panel__title">实现重点</p>
                  <ul class="micro-guide-list">
                    <li v-for="item in stage.focus" :key="item">
                      {{ item }}
                    </li>
                  </ul>
                </section>

                <section class="micro-guide-mini-panel">
                  <p class="micro-guide-mini-panel__title">常见误区</p>
                  <ul class="micro-guide-list">
                    <li v-for="item in stage.risks" :key="item">
                      {{ item }}
                    </li>
                  </ul>
                </section>
              </div>

              <AppCodeBlock
                class="micro-guide-code-block"
                :code="stage.code"
                :lang="stage.language"
              />
            </article>
          </div>
        </section>

        <section class="micro-guide-section">
          <div class="micro-guide-section__head">
            <div>
              <p class="micro-guide-section__eyebrow">Comparison</p>
              <h2 class="micro-guide-section__title">
                微前端里最关键的几组取舍
              </h2>
            </div>
          </div>

          <div class="micro-guide-columns">
            <article
              v-for="item in comparisonCards"
              :key="item.title"
              class="micro-guide-panel"
            >
              <h3 class="micro-guide-panel__title">{{ item.title }}</h3>
              <p class="micro-guide-panel__text">{{ item.summary }}</p>
            </article>
          </div>
        </section>

        <section class="micro-guide-section">
          <div class="micro-guide-section__head">
            <div>
              <p class="micro-guide-section__eyebrow">Checklist</p>
              <h2 class="micro-guide-section__title">
                一套能落地的微前端判断清单
              </h2>
            </div>
          </div>

          <article class="micro-guide-panel is-wide">
            <ul class="micro-guide-list">
              <li>
                先确认拆分目标是团队自治、技术栈兼容还是发布解耦，不要为了“高级”而拆。
              </li>
              <li>
                主应用只负责编排、鉴权壳层和公共设施，不要再把业务塞回壳里。
              </li>
              <li>
                子应用必须有明确生命周期、挂载点、依赖边界和退出清理逻辑。
              </li>
              <li>共享能力优先沉成 npm 包或基础设施，不要靠全局变量硬传。</li>
              <li>
                发布链路、灰度、监控和回滚要在主应用与子应用两个层面都可追踪。
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
    title: '先判断值不值得拆',
    summary: '微前端解决的是组织与发布问题，不是通用架构银弹。',
  },
  {
    order: '02',
    title: '壳层边界先定清楚',
    summary: '主应用负责什么、子应用负责什么，必须先写明白。',
  },
  {
    order: '03',
    title: '隔离与通信一起设计',
    summary: '样式、路由、事件和依赖共享不能各写各的。',
  },
  {
    order: '04',
    title: '发布链路要可控',
    summary: '拆完之后真正难的是多应用联合发布、灰度和回滚。',
  },
  {
    order: '05',
    title: '治理比接入更重要',
    summary: '没有约束的微前端，最后通常只会变成分裂的多项目集合。',
  },
];

const guideStages = [
  {
    order: '01',
    title: '先判断是否真的需要微前端，不要把组织问题都扔给架构',
    tag: '问题建模',
    description:
      '微前端最容易被滥用。很多团队一看到项目大、页面多，就想用微前端拆。但如果你的问题本质上只是模块边界差、代码复用差、发布流程乱，那么先用 Monorepo、领域拆分和发布治理就可能够了。微前端更适合多个团队长期并行、技术栈历史包袱重、业务域边界清晰的场景。',
    bestFor: [
      '大型中后台',
      '多团队并行研发',
      '多技术栈共存项目',
      '独立发布需求强的系统',
    ],
    focus: [
      '先判断组织和发布痛点是否真实存在',
      '拆分目标写清楚：自治、兼容还是解耦',
      '优先评估更轻量的替代方案',
    ],
    risks: [
      '只是因为项目大就直接上微前端',
      '拿架构方案掩盖团队协作问题',
      '拆完后复杂度上涨但收益不明确',
    ],
    language: 'text',
    code: `Micro Frontend Decision
- 目标是团队自治还是技术解耦？
- 是否存在多个业务域长期独立发布？
- 是否确实存在多技术栈共存压力？
- 如果只是仓库大、打包慢、依赖乱，先考虑 Monorepo 和工程治理`,
  },
  {
    order: '02',
    title: '主应用和子应用的职责必须拆清楚',
    tag: '边界设计',
    description:
      '真正稳定的微前端体系里，主应用不是“大而全的壳工程”，它应该只负责入口编排、路由壳层、公共鉴权、菜单壳、监控和公共依赖装配。业务能力尽量放在子应用内部。否则你会发现拆了半天，主应用依然是新的超级工程。',
    bestFor: ['壳应用体系', '多业务域后台', '需要统一登录和导航的系统'],
    focus: [
      '主应用只保留公共壳层职责',
      '子应用对业务域结果负责',
      '把公共设施沉成稳定接口',
    ],
    risks: [
      '主应用继续承载大量业务代码',
      '边界模糊，主子应用互相调用内部实现',
      '公共能力没有契约，靠约定传递',
    ],
    language: 'ts',
    code: `type HostResponsibilities =
  | 'routing-shell'
  | 'auth-shell'
  | 'menu-layout'
  | 'monitoring'
  | 'shared-runtime'

type SubAppResponsibilities =
  | 'domain-pages'
  | 'domain-store'
  | 'domain-api'
  | 'domain-release'`,
  },
  {
    order: '03',
    title: '路由、通信、样式隔离要一起治理，不要分散补洞',
    tag: '运行时治理',
    description:
      '微前端接入阶段最容易只关注“能否挂上去”，但真正的问题通常出在运行时。子应用是否能感知基座路由？样式是否污染外部页面？公共事件怎么传？数据是靠 props、事件总线还是共享存储？这些都需要统一治理，否则后期排障成本会非常高。',
    bestFor: ['多子应用同时挂载', '复杂导航系统', '跨应用协同场景'],
    focus: [
      '统一路由基线和挂载规则',
      '明确通信机制和数据流向',
      '处理样式隔离、沙箱和全局副作用',
    ],
    risks: [
      '通信方式多套并存，最终失控',
      '子应用退出后副作用没有清理',
      '样式或全局变量相互污染',
    ],
    language: 'ts',
    code: `registerMicroApps([
  {
    name: 'orders-app',
    entry: '//localhost:7101',
    container: '#subapp-root',
    activeRule: '/orders',
    props: {
      getToken: () => localStorage.getItem('token'),
      onNavigate: (path: string) => router.push(path),
    },
  },
])`,
  },
  {
    order: '04',
    title: '共享依赖和基础设施要有策略，不然包体和版本会爆炸',
    tag: '依赖治理',
    description:
      '微前端不是每个子应用都带一套完整运行时。像 Vue、React、组件库、埋点 SDK、鉴权工具这些依赖，必须先决定是主应用提供、CDN 共享，还是子应用各自打包。不同策略的代价完全不同，尤其对首屏体积和升级风险影响很大。',
    bestFor: ['多应用同框系统', '公共依赖多的后台', '长期维护平台'],
    focus: [
      '区分必须共享和允许独立的依赖',
      '控制公共运行时版本策略',
      '让共享能力可升级、可回滚',
    ],
    risks: [
      '所有依赖都共享，升级一次全站联动',
      '所有依赖都独立打包，体积与重复运行时激增',
      '共享库没有版本约束，线上兼容性混乱',
    ],
    language: 'json',
    code: `{
  "sharedDependencies": {
    "vue": "^3.5.0",
    "vue-router": "^4.4.0",
    "element-plus": "^2.8.0",
    "@company/telemetry": "^1.6.0"
  }
}`,
  },
  {
    order: '05',
    title: '微前端最终比的是治理能力：发布、监控、回滚和团队约束',
    tag: '工程落地',
    description:
      '微前端真正难的阶段不是接入，而是长期维护。某个子应用升级后是否影响主应用？主应用切了公共 SDK 会不会把旧子应用打挂？线上错误能否追到具体子应用版本？这些都要求你在发布链路、监控埋点、错误边界和回滚策略上有完整方案。',
    bestFor: ['生产环境多应用体系', '高频发版团队', '平台化架构项目'],
    focus: [
      '建立主应用和子应用双层版本追踪',
      '让错误监控能定位到具体子应用版本',
      '支持单子应用灰度与快速回滚',
    ],
    risks: [
      '子应用上线影响主应用却无可追踪链路',
      '错误日志只看到壳层，看不到具体子应用',
      '发布依赖人工协调，最终又回到低效模式',
    ],
    language: 'yaml',
    code: `name: micro-frontend-release

on:
  push:
    branches: [master]

jobs:
  publish-subapp:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: pnpm install --frozen-lockfile
      - run: pnpm lint
      - run: pnpm type-check
      - run: pnpm build
      - run: ./scripts/publish-subapp.sh orders-app`,
  },
];

const comparisonCards = [
  {
    title: 'Monorepo vs 微前端',
    summary:
      'Monorepo 解决的是代码组织、依赖复用和统一工程治理；微前端更偏向运行时隔离和独立发布。很多项目先用 Monorepo 就够了，不需要直接上微前端。',
  },
  {
    title: 'iframe vs 运行时微前端',
    summary:
      'iframe 隔离最强，但通信、样式融合和体验一致性较差；运行时微前端集成感更好，但治理成本也更高。',
  },
  {
    title: '共享依赖 vs 独立打包',
    summary:
      '共享依赖能减少重复包体，但版本治理更难；独立打包自治性更强，但体积和重复运行时成本会明显上升。',
  },
];
</script>

<style scoped>
.micro-guide-page {
  min-height: calc(100vh - 40px);
  padding: 24px;
  border: 1px solid rgba(19, 27, 34, 0.08);
  border-radius: 7px;
  background:
    radial-gradient(
      circle at top left,
      rgba(221, 228, 233, 0.48),
      transparent 28%
    ),
    linear-gradient(180deg, #fcfdfe 0%, #f3f6f8 100%);
  box-shadow: 0 30px 80px rgba(18, 26, 34, 0.08);
}

.micro-guide-page__shell {
  min-height: calc(100vh - 90px);
  border: 1px solid rgba(19, 27, 34, 0.06);
  border-radius: 7px;
  background: rgba(255, 255, 255, 0.82);
}

.micro-guide-page__top {
  display: flex;
  justify-content: flex-start;
  padding: 18px 18px 0;
}

.micro-guide-page__back {
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

.micro-guide-page__back:hover {
  transform: translateY(-1px);
  border-color: rgba(46, 70, 91, 0.18);
  box-shadow: 0 18px 34px rgba(19, 27, 34, 0.08);
}

.micro-guide-page__content {
  padding: 18px 24px 24px;
}

.micro-guide-hero {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 320px;
  gap: 20px;
  padding-bottom: 26px;
  border-bottom: 1px solid rgba(19, 27, 34, 0.08);
}

.micro-guide-hero__eyebrow,
.micro-guide-section__eyebrow,
.micro-guide-card__eyebrow,
.micro-guide-hero__label {
  font-size: 11px;
  line-height: 1.4;
  letter-spacing: 0.24em;
  text-transform: uppercase;
  color: #7b8793;
}

.micro-guide-hero__title {
  margin-top: 10px;
  font-size: 46px;
  line-height: 1.06;
  font-weight: 600;
  letter-spacing: -0.05em;
  color: #17202a;
}

.micro-guide-hero__summary {
  max-width: 860px;
  margin-top: 16px;
  font-size: 15px;
  line-height: 1.9;
  color: #58636f;
}

.micro-guide-hero__panel,
.micro-guide-card,
.micro-guide-panel {
  border: 1px solid rgba(19, 27, 34, 0.08);
  border-radius: 7px;
  background: rgba(255, 255, 255, 0.84);
}

.micro-guide-hero__panel {
  padding: 18px;
}

.micro-guide-list {
  display: grid;
  gap: 8px;
  margin: 12px 0 0;
  padding-left: 18px;
  font-size: 14px;
  line-height: 1.8;
  color: #56616d;
}

.micro-guide-grid,
.micro-guide-columns,
.micro-guide-stack {
  display: grid;
  gap: 16px;
}

.micro-guide-grid {
  margin-top: 28px;
  grid-template-columns: repeat(3, minmax(0, 1fr));
}

.micro-guide-card {
  padding: 18px;
}

.micro-guide-card__title,
.micro-guide-panel__title,
.micro-guide-section__title {
  color: #17202a;
}

.micro-guide-card__title {
  margin-top: 10px;
  font-size: 22px;
  line-height: 1.25;
  font-weight: 600;
}

.micro-guide-card__text,
.micro-guide-panel__text {
  margin-top: 12px;
  font-size: 14px;
  line-height: 1.9;
  color: #596571;
}

.micro-guide-section {
  margin-top: 28px;
}

.micro-guide-section__head {
  margin-bottom: 14px;
}

.micro-guide-section__title {
  margin-top: 8px;
  font-size: 30px;
  line-height: 1.18;
  font-weight: 600;
  letter-spacing: -0.03em;
}

.micro-guide-columns {
  grid-template-columns: repeat(3, minmax(0, 1fr));
}

.micro-guide-stack {
  grid-template-columns: repeat(2, minmax(0, 1fr));
}

.micro-guide-panel {
  padding: 18px;
}

.micro-guide-panel.is-wide {
  grid-column: 1 / -1;
}

.micro-guide-panel__eyebrow {
  font-size: 11px;
  line-height: 1.4;
  letter-spacing: 0.24em;
  text-transform: uppercase;
  color: #80909d;
}

.micro-guide-panel__title {
  font-size: 20px;
  line-height: 1.3;
  font-weight: 600;
}

.micro-guide-method__head {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 16px;
}

.micro-guide-method__tag {
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

.micro-guide-method__grid {
  display: grid;
  gap: 14px;
  margin-top: 16px;
  grid-template-columns: repeat(3, minmax(0, 1fr));
}

.micro-guide-mini-panel {
  padding: 14px;
  border: 1px solid rgba(19, 27, 34, 0.08);
  border-radius: 7px;
  background: rgba(245, 248, 250, 0.9);
}

.micro-guide-mini-panel__title {
  font-size: 14px;
  font-weight: 600;
  color: #17202a;
}

.micro-guide-code-block {
  margin-top: 14px;
}

@media (max-width: 1080px) {
  .micro-guide-hero,
  .micro-guide-grid,
  .micro-guide-columns,
  .micro-guide-stack,
  .micro-guide-method__grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 900px) {
  .micro-guide-page {
    min-height: auto;
    padding: 18px;
  }

  .micro-guide-page__shell {
    min-height: auto;
  }

  .micro-guide-page__content {
    padding: 18px;
  }

  .micro-guide-hero__title {
    font-size: 36px;
  }

  .micro-guide-section__title {
    font-size: 26px;
  }
}
</style>
