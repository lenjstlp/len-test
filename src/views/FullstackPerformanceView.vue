<template>
  <section class="performance-guide-page">
    <div class="performance-guide-page__shell">
      <div class="performance-guide-page__top">
        <RouterLink
          to="/fullstack-guide"
          class="performance-guide-page__back"
          aria-label="返回全栈能力菜单"
          title="返回全栈能力菜单"
        >
          <el-icon :size="18"><ArrowLeft /></el-icon>
        </RouterLink>
      </div>

      <div class="performance-guide-page__content">
        <header class="performance-guide-hero">
          <div>
            <p class="performance-guide-hero__eyebrow">Frontend Performance</p>
            <h1 class="performance-guide-hero__title">前端性能能力</h1>
            <p class="performance-guide-hero__summary">
              这一页按渡一教育公开内容里讲性能优化的思路来组织：先区分加载性能、渲染性能和长期监控，再落到首屏指标、资源拆分、阻塞消除、运行时优化和监控闭环。重点不是背几个优化名词，而是先定位瓶颈，再选对手段。
            </p>
          </div>

          <div class="performance-guide-hero__panel">
            <p class="performance-guide-hero__label">学完结果</p>
            <ul class="performance-guide-list">
              <li>能分清首屏加载慢、渲染卡顿和长任务阻塞是三类不同问题。</li>
              <li>能按资源体积、关键路径、渲染频率和监控指标拆解优化方案。</li>
              <li>能把性能优化从“偶发调参”变成“可验证、可持续”的工程动作。</li>
            </ul>
          </div>
        </header>

        <section class="performance-guide-grid">
          <article
            v-for="item in quickStages"
            :key="item.order"
            class="performance-guide-card"
          >
            <p class="performance-guide-card__eyebrow">
              Stage {{ item.order }}
            </p>
            <h2 class="performance-guide-card__title">{{ item.title }}</h2>
            <p class="performance-guide-card__text">{{ item.summary }}</p>
          </article>
        </section>

        <section class="performance-guide-section">
          <div class="performance-guide-section__head">
            <div>
              <p class="performance-guide-section__eyebrow">Decision Order</p>
              <h2 class="performance-guide-section__title">
                性能优化先分层，再谈具体技巧
              </h2>
            </div>
          </div>

          <div class="performance-guide-stack">
            <article
              v-for="stage in guideStages"
              :key="stage.order"
              class="performance-guide-panel is-wide"
            >
              <div class="performance-guide-method__head">
                <div>
                  <p class="performance-guide-panel__eyebrow">
                    Stage {{ stage.order }}
                  </p>
                  <h3 class="performance-guide-panel__title">
                    {{ stage.title }}
                  </h3>
                </div>
                <span class="performance-guide-method__tag">
                  {{ stage.tag }}
                </span>
              </div>

              <p class="performance-guide-panel__text">
                {{ stage.description }}
              </p>

              <div class="performance-guide-method__grid">
                <section class="performance-guide-mini-panel">
                  <p class="performance-guide-mini-panel__title">适用场景</p>
                  <ul class="performance-guide-list">
                    <li v-for="item in stage.bestFor" :key="item">
                      {{ item }}
                    </li>
                  </ul>
                </section>

                <section class="performance-guide-mini-panel">
                  <p class="performance-guide-mini-panel__title">实现重点</p>
                  <ul class="performance-guide-list">
                    <li v-for="item in stage.focus" :key="item">
                      {{ item }}
                    </li>
                  </ul>
                </section>

                <section class="performance-guide-mini-panel">
                  <p class="performance-guide-mini-panel__title">常见误区</p>
                  <ul class="performance-guide-list">
                    <li v-for="item in stage.risks" :key="item">
                      {{ item }}
                    </li>
                  </ul>
                </section>
              </div>

              <AppCodeBlock
                class="performance-guide-code-block"
                :code="stage.code"
                :lang="stage.language"
              />
            </article>
          </div>
        </section>

        <section class="performance-guide-section">
          <div class="performance-guide-section__head">
            <div>
              <p class="performance-guide-section__eyebrow">Comparison</p>
              <h2 class="performance-guide-section__title">
                什么时候该减资源体积，什么时候该治运行时卡顿
              </h2>
            </div>
          </div>

          <div class="performance-guide-columns">
            <article
              v-for="item in comparisonCards"
              :key="item.title"
              class="performance-guide-panel"
            >
              <h3 class="performance-guide-panel__title">{{ item.title }}</h3>
              <p class="performance-guide-panel__text">{{ item.summary }}</p>
            </article>
          </div>
        </section>

        <section class="performance-guide-section">
          <div class="performance-guide-section__head">
            <div>
              <p class="performance-guide-section__eyebrow">Checklist</p>
              <h2 class="performance-guide-section__title">
                一套够用的性能优化落地清单
              </h2>
            </div>
          </div>

          <article class="performance-guide-panel is-wide">
            <ul class="performance-guide-list">
              <li>
                先看指标再动手，至少区分首屏慢、接口慢、渲染慢、长任务卡顿。
              </li>
              <li>
                首屏加载优先处理 HTML 体积、关键资源、代码拆分和请求并行度。
              </li>
              <li>
                运行时卡顿优先排查大列表、频繁重渲染、重计算和主线程长任务。
              </li>
              <li>优化之后必须有对照指标，不要只靠主观“感觉快了”。</li>
              <li>
                长期项目一定要补监控，不然性能优化永远停留在出问题后救火。
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
    title: '先分性能问题类型',
    summary: '首屏慢、接口慢、渲染卡顿、动画掉帧和长任务阻塞不是同一个问题。',
  },
  {
    order: '02',
    title: '首屏先看关键路径',
    summary: 'HTML、CSS、首包 JS 和首屏数据，是最先要看的四类资源。',
  },
  {
    order: '03',
    title: '运行时先看主线程',
    summary: '卡顿大多和长任务、频繁渲染、重排重绘以及无效计算有关。',
  },
  {
    order: '04',
    title: '优化一定要配指标',
    summary: '没有 FCP、LCP、长任务等指标，优化很容易变成拍脑袋。',
  },
  {
    order: '05',
    title: '最终要走向持续监控',
    summary:
      '真正成熟的项目，不是偶尔做优化，而是持续发现、持续回归、持续修复。',
  },
];

const guideStages = [
  {
    order: '01',
    title: '先把性能问题分类：加载性能、渲染性能、交互性能',
    tag: '基础认知',
    description:
      '渡一教育讲性能优化时，一般不会一上来就堆方案，而是先讲“性能到底慢在哪”。首屏白屏更像加载性能问题；滚动卡顿、输入延迟更像渲染和交互性能问题；请求慢则可能是网络与后端链路问题。先分型，后面才能避免把所有性能问题都拿同一套手段去治。',
    bestFor: ['性能优化入门', '排查页面慢', '建立性能分析框架'],
    focus: [
      '先看加载、渲染、交互哪个环节慢',
      '再配合 Performance 面板和 Web Vitals 指标定位',
      '避免把所有问题都归咎于“包太大”',
    ],
    risks: [
      '首屏慢却只去做列表虚拟化',
      '动画卡顿却只盯着缓存头',
      '没有指标，纯靠主观感受判断瓶颈',
    ],
    language: 'text',
    code: `Performance Problem Types\n- Loading: 首屏资源下载、解析、执行太慢\n- Rendering: 布局、绘制、重排重绘太频繁\n- Interaction: 输入、点击、滚动响应不及时\n- Network/Backend: 接口慢、链路慢、服务端返回慢`,
  },
  {
    order: '02',
    title: '首屏加载优化先盯关键路径：HTML、CSS、首包 JS、首屏数据',
    tag: '加载性能',
    description:
      '首屏优化的核心不是把所有资源都变小，而是让用户尽早看到第一屏内容。所以真正该盯的是关键路径上的资源：入口 HTML、关键 CSS、首屏需要执行的 JS，以及首屏依赖的数据请求。只要这些链路里有一段阻塞，首屏就会明显变慢。',
    bestFor: ['门户首页', '后台首页', '营销页面', 'SSR/CSR 首屏优化'],
    focus: [
      '压缩首包并减少首屏非必要依赖',
      '延迟非关键组件和非首屏逻辑',
      '把关键数据请求前置并并行化',
    ],
    risks: [
      '首页什么都想首屏加载',
      '把图表、编辑器、地图都打进首包',
      '首屏接口串行请求导致等待链过长',
    ],
    language: 'typescript',
    code: `const ReportsPanel = defineAsyncComponent(() =>\n  import('./ReportsPanel.vue'),\n)\n\nconst openDashboard = async () => {\n  const [summary, profile] = await Promise.all([\n    request('/api/dashboard/summary'),\n    request('/api/user/profile'),\n  ])\n\n  return { summary, profile }\n}`,
  },
  {
    order: '03',
    title: '资源优化不是玄学：代码拆分、按需加载、图片和字体策略',
    tag: '资源层',
    description:
      '只要项目稍大，性能问题通常绕不开资源体积。更成熟的做法不是一味压缩，而是拆分：把首屏不需要的模块延后，把图片按尺寸和格式处理，把字体和第三方库的加载时机管起来。真正的优化思路是让不同资源在正确时间出现。',
    bestFor: ['大前端应用', '图表后台', '组件库项目', '多页面应用'],
    focus: [
      '路由级和组件级代码拆分',
      '图片用合适尺寸和现代格式',
      '谨慎引入大体积第三方库',
    ],
    risks: [
      '为了拆分而拆分，结果产生大量小 chunk',
      '图片原图直接上生产',
      '编辑器、图表、地图等重模块提前注入',
    ],
    language: 'typescript',
    code: `const routes = [\n  {\n    path: '/reports',\n    component: () => import('@/views/ReportsView.vue'),\n  },\n  {\n    path: '/editor',\n    component: () => import('@/views/EditorView.vue'),\n  },\n]`,
  },
  {
    order: '04',
    title: '运行时优化先找长任务：别让主线程一直忙',
    tag: '运行时',
    description:
      '很多项目首屏已经不算慢，但一操作就卡。这类问题更常见的根源是主线程长任务、频繁重渲染、大列表直接硬渲、滚动和输入回调里做了重计算。这个阶段的重点不是继续抠请求数，而是让浏览器主线程有空响应用户。',
    bestFor: ['数据大屏', '复杂表单', '长列表页面', '滚动交互页面'],
    focus: [
      '虚拟列表减少真实 DOM 数量',
      '拆分重计算和长同步任务',
      '减少高频事件里的同步工作量',
    ],
    risks: [
      'scroll 事件里直接做重逻辑',
      '一次性渲染几千行列表',
      '把复杂计算放在渲染路径里反复执行',
    ],
    language: 'typescript',
    code: `const handleScroll = () => {\n  requestAnimationFrame(() => {\n    updateVisibleRange()\n  })\n}\n\nwindow.addEventListener('scroll', handleScroll, { passive: true })`,
  },
  {
    order: '05',
    title: '最后要走到监控：把性能优化变成可持续工程能力',
    tag: '监控闭环',
    description:
      '成熟项目不会只在抱怨“页面卡”时临时排查。更稳的做法是建立一套持续监控：采集 FCP、LCP、CLS、长任务、接口耗时和错误率，按页面、版本和用户环境分层看数据。这样性能优化才能真正闭环，而不是一次性的手工治理。',
    bestFor: ['长期运营项目', '中后台系统', '多版本持续迭代产品'],
    focus: [
      '采集核心 Web Vitals 指标',
      '关联版本号、路由和用户环境',
      '优化后做指标对照和回归验证',
    ],
    risks: [
      '只做本地压测，不看真实用户数据',
      '监控采了很多日志但没有分析维度',
      '优化上线后没有回看是否真的变好',
    ],
    language: 'typescript',
    code: `import { onLCP, onCLS, onINP } from 'web-vitals'\n\nfunction reportMetric(name: string, value: number) {\n  navigator.sendBeacon(\n    '/api/performance/report',\n    JSON.stringify({ name, value, route: location.pathname }),\n  )\n}\n\nonLCP((metric) => reportMetric('LCP', metric.value))\nonCLS((metric) => reportMetric('CLS', metric.value))\nonINP((metric) => reportMetric('INP', metric.value))`,
  },
];

const comparisonCards = [
  {
    title: '首屏优化 vs 运行时优化',
    summary:
      '首屏优化解决的是“用户什么时候第一次看到内容”，运行时优化解决的是“内容出来后操作是否顺畅”。这两类问题经常同时存在，但优化手段并不一样。',
  },
  {
    title: '资源压缩 vs 代码拆分',
    summary:
      '资源压缩是在减小单个文件体积，代码拆分是在控制文件出现时机。大型应用里，后者往往比单纯压缩更有决定性。',
  },
  {
    title: '临时调优 vs 持续监控',
    summary:
      '临时调优只能解决眼前问题，持续监控才能让团队知道哪个版本变慢了、哪个页面退化了，以及优化到底有没有真实收益。',
  },
];
</script>

<style scoped>
.performance-guide-page {
  min-height: calc(100vh - 40px);
  padding: 24px;
  border: 1px solid rgba(19, 27, 34, 0.08);
  border-radius: 7px;
  background:
    radial-gradient(
      circle at top left,
      rgba(223, 231, 236, 0.5),
      transparent 28%
    ),
    linear-gradient(180deg, #fcfdfe 0%, #f4f7f9 100%);
  box-shadow: 0 30px 80px rgba(18, 26, 34, 0.08);
}

.performance-guide-page__shell {
  min-height: calc(100vh - 90px);
  border: 1px solid rgba(19, 27, 34, 0.06);
  border-radius: 7px;
  background: rgba(255, 255, 255, 0.82);
}

.performance-guide-page__top {
  display: flex;
  justify-content: flex-start;
  padding: 18px 18px 0;
}

.performance-guide-page__back {
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

.performance-guide-page__back:hover {
  transform: translateY(-1px);
  border-color: rgba(46, 70, 91, 0.18);
  box-shadow: 0 18px 34px rgba(19, 27, 34, 0.08);
}

.performance-guide-page__content {
  padding: 18px 24px 24px;
}

.performance-guide-hero {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 320px;
  gap: 20px;
  padding-bottom: 26px;
  border-bottom: 1px solid rgba(19, 27, 34, 0.08);
}

.performance-guide-hero__eyebrow,
.performance-guide-section__eyebrow,
.performance-guide-card__eyebrow,
.performance-guide-hero__label {
  font-size: 11px;
  line-height: 1.4;
  letter-spacing: 0.24em;
  text-transform: uppercase;
  color: #7b8793;
}

.performance-guide-hero__title {
  margin-top: 10px;
  font-size: 46px;
  line-height: 1.06;
  font-weight: 600;
  letter-spacing: -0.05em;
  color: #17202a;
}

.performance-guide-hero__summary {
  max-width: 860px;
  margin-top: 16px;
  font-size: 15px;
  line-height: 1.9;
  color: #58636f;
}

.performance-guide-hero__panel,
.performance-guide-card,
.performance-guide-panel {
  border: 1px solid rgba(19, 27, 34, 0.08);
  border-radius: 7px;
  background: rgba(255, 255, 255, 0.84);
}

.performance-guide-hero__panel {
  padding: 18px;
}

.performance-guide-list {
  display: grid;
  gap: 8px;
  margin: 12px 0 0;
  padding-left: 18px;
  font-size: 14px;
  line-height: 1.8;
  color: #56616d;
}

.performance-guide-grid,
.performance-guide-columns,
.performance-guide-stack {
  display: grid;
  gap: 16px;
}

.performance-guide-grid {
  margin-top: 28px;
  grid-template-columns: repeat(3, minmax(0, 1fr));
}

.performance-guide-card {
  padding: 18px;
}

.performance-guide-card__title,
.performance-guide-panel__title,
.performance-guide-section__title {
  color: #17202a;
}

.performance-guide-card__title {
  margin-top: 10px;
  font-size: 22px;
  line-height: 1.25;
  font-weight: 600;
}

.performance-guide-card__text,
.performance-guide-panel__text {
  margin-top: 12px;
  font-size: 14px;
  line-height: 1.9;
  color: #596571;
}

.performance-guide-section {
  margin-top: 28px;
}

.performance-guide-section__head {
  margin-bottom: 14px;
}

.performance-guide-section__title {
  margin-top: 8px;
  font-size: 30px;
  line-height: 1.18;
  font-weight: 600;
  letter-spacing: -0.03em;
}

.performance-guide-columns {
  grid-template-columns: repeat(3, minmax(0, 1fr));
}

.performance-guide-stack {
  grid-template-columns: repeat(2, minmax(0, 1fr));
}

.performance-guide-panel {
  padding: 18px;
}

.performance-guide-panel.is-wide {
  grid-column: 1 / -1;
}

.performance-guide-panel__eyebrow {
  font-size: 11px;
  line-height: 1.4;
  letter-spacing: 0.24em;
  text-transform: uppercase;
  color: #80909d;
}

.performance-guide-panel__title {
  font-size: 20px;
  line-height: 1.3;
  font-weight: 600;
}

.performance-guide-method__head {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 16px;
}

.performance-guide-method__tag {
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

.performance-guide-method__grid {
  display: grid;
  gap: 14px;
  margin-top: 16px;
  grid-template-columns: repeat(3, minmax(0, 1fr));
}

.performance-guide-mini-panel {
  padding: 14px;
  border: 1px solid rgba(19, 27, 34, 0.08);
  border-radius: 7px;
  background: rgba(245, 248, 250, 0.9);
}

.performance-guide-mini-panel__title {
  font-size: 14px;
  font-weight: 600;
  color: #17202a;
}

.performance-guide-code-block {
  margin-top: 14px;
}

@media (max-width: 1080px) {
  .performance-guide-hero,
  .performance-guide-grid,
  .performance-guide-columns,
  .performance-guide-stack,
  .performance-guide-method__grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 900px) {
  .performance-guide-page {
    min-height: auto;
    padding: 18px;
  }

  .performance-guide-page__shell {
    min-height: auto;
  }

  .performance-guide-page__content {
    padding: 18px;
  }

  .performance-guide-hero__title {
    font-size: 36px;
  }

  .performance-guide-section__title {
    font-size: 26px;
  }
}
</style>
