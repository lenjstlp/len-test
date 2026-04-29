<template>
  <section class="visual-guide-page">
    <div class="visual-guide-page__shell">
      <div class="visual-guide-page__top">
        <RouterLink
          to="/fullstack-guide"
          class="visual-guide-page__back"
          aria-label="返回全栈能力菜单"
          title="返回全栈能力菜单"
        >
          <el-icon :size="18"><ArrowLeft /></el-icon>
        </RouterLink>
      </div>

      <div class="visual-guide-page__content">
        <header class="visual-guide-hero">
          <div>
            <p class="visual-guide-hero__eyebrow">
              Frontend Visualization Engineering
            </p>
            <h1 class="visual-guide-hero__title">前端可视化工程能力</h1>
            <p class="visual-guide-hero__summary">
              真正的可视化工程，不是把 ECharts
              配一下就结束，而是要把数据口径、图表选型、渲染性能、交互联动、导出截图和大屏发布都做成一套稳定体系。你需要掌握的不是某个
              API，而是如何让“数据进入页面后可信、可看、可互动、可维护”。
            </p>
          </div>

          <div class="visual-guide-hero__panel">
            <p class="visual-guide-hero__label">学完结果</p>
            <ul class="visual-guide-list">
              <li>
                能分清业务报表、分析看板、监控大屏和地图场景各自的技术重点。
              </li>
              <li>
                能搭建一套数据转换、图表封装、联动交互和渲染性能治理方案。
              </li>
              <li>
                能判断什么时候用现成图表库，什么时候要进入 Canvas、WebGL
                或地图引擎。
              </li>
            </ul>
          </div>
        </header>

        <section class="visual-guide-grid">
          <article
            v-for="item in quickStages"
            :key="item.order"
            class="visual-guide-card"
          >
            <p class="visual-guide-card__eyebrow">Stage {{ item.order }}</p>
            <h2 class="visual-guide-card__title">{{ item.title }}</h2>
            <p class="visual-guide-card__text">{{ item.summary }}</p>
          </article>
        </section>

        <section class="visual-guide-section">
          <div class="visual-guide-section__head">
            <div>
              <p class="visual-guide-section__eyebrow">Build Order</p>
              <h2 class="visual-guide-section__title">
                可视化工程先统一数据和图表协议，再处理联动、性能和发布
              </h2>
            </div>
          </div>

          <div class="visual-guide-stack">
            <article
              v-for="stage in guideStages"
              :key="stage.order"
              class="visual-guide-panel is-wide"
            >
              <div class="visual-guide-method__head">
                <div>
                  <p class="visual-guide-panel__eyebrow">
                    Stage {{ stage.order }}
                  </p>
                  <h3 class="visual-guide-panel__title">{{ stage.title }}</h3>
                </div>
                <span class="visual-guide-method__tag">{{ stage.tag }}</span>
              </div>

              <p class="visual-guide-panel__text">{{ stage.description }}</p>

              <div class="visual-guide-method__grid">
                <section class="visual-guide-mini-panel">
                  <p class="visual-guide-mini-panel__title">适用场景</p>
                  <ul class="visual-guide-list">
                    <li v-for="item in stage.bestFor" :key="item">
                      {{ item }}
                    </li>
                  </ul>
                </section>

                <section class="visual-guide-mini-panel">
                  <p class="visual-guide-mini-panel__title">实现重点</p>
                  <ul class="visual-guide-list">
                    <li v-for="item in stage.focus" :key="item">
                      {{ item }}
                    </li>
                  </ul>
                </section>

                <section class="visual-guide-mini-panel">
                  <p class="visual-guide-mini-panel__title">常见误区</p>
                  <ul class="visual-guide-list">
                    <li v-for="item in stage.risks" :key="item">
                      {{ item }}
                    </li>
                  </ul>
                </section>
              </div>

              <AppCodeBlock
                class="visual-guide-code-block"
                :code="stage.code"
                :lang="stage.language"
              />
            </article>
          </div>
        </section>

        <section class="visual-guide-section">
          <div class="visual-guide-section__head">
            <div>
              <p class="visual-guide-section__eyebrow">Comparison</p>
              <h2 class="visual-guide-section__title">
                做可视化系统时最容易踩坑的几组选择
              </h2>
            </div>
          </div>

          <div class="visual-guide-columns">
            <article
              v-for="item in comparisonCards"
              :key="item.title"
              class="visual-guide-panel"
            >
              <h3 class="visual-guide-panel__title">{{ item.title }}</h3>
              <p class="visual-guide-panel__text">{{ item.summary }}</p>
            </article>
          </div>
        </section>

        <section class="visual-guide-section">
          <div class="visual-guide-section__head">
            <div>
              <p class="visual-guide-section__eyebrow">Checklist</p>
              <h2 class="visual-guide-section__title">
                一套能落地的前端可视化工程建设清单
              </h2>
            </div>
          </div>

          <article class="visual-guide-panel is-wide">
            <ul class="visual-guide-list">
              <li>
                先统一指标口径和数据结构，再写图表，不然同一指标会在不同卡片里出现不同结果。
              </li>
              <li>
                图表组件不要直接吞后端原始数据，应该先经过数据适配层和格式化层。
              </li>
              <li>
                图例联动、筛选条件、时间轴、地图钻取这些交互，必须走统一状态流，不要各图表各玩各的。
              </li>
              <li>
                大数据量场景要尽早评估
                Canvas、WebGL、虚拟滚动和采样策略，别等卡了再救火。
              </li>
              <li>
                如果页面要上电视墙、驾驶舱或打印导出，就要提前把分辨率、缩放、截图和自动刷新链路考虑进去。
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
    title: '先统一指标口径',
    summary:
      '可视化工程的第一步不是选库，而是先把业务指标、维度和时间范围说清楚，避免图表互相打架。',
  },
  {
    order: '02',
    title: '图表层要协议化',
    summary:
      '柱状图、折线图、漏斗图、地图图层都应该有统一输入格式，而不是每个页面各写一套 option。',
  },
  {
    order: '03',
    title: '联动交互要有总线',
    summary:
      '筛选、悬停、点击钻取和区域切换都需要统一状态和事件流，不然复杂看板很快失控。',
  },
  {
    order: '04',
    title: '性能治理要前置',
    summary:
      '数据量一大、刷新频率一高，就会暴露 SVG、Canvas、动画、定时器和内存管理问题。',
  },
  {
    order: '05',
    title: '发布场景决定实现上限',
    summary:
      '普通报表、运营大屏、实时监控、地图系统和导出场景，对工程结构和选型要求完全不同。',
  },
];

const guideStages = [
  {
    order: '01',
    title: '先把数据口径、维度和适配层打平，图表只是最终消费端',
    tag: 'Data Contract',
    description:
      '很多团队做可视化时一上来就写图表配置，最后发现真正混乱的是数据。同比、环比、累计、去重人数、自然日和业务日口径如果没统一，同一块大屏会越做越乱。更稳的做法是先建立指标定义和数据适配层，把后端返回的数据转成前端统一协议，再让图表去消费。这样换库、换布局、做导出都更轻松。',
    bestFor: ['经营分析报表', '监控看板', '数据大屏', '地图分析系统'],
    focus: [
      '先定义指标名称、单位、时间维度和空值策略',
      '对接口返回值做统一 normalize，别让图表直接碰原始数据',
      '前端格式化和后端统计职责要划清',
    ],
    risks: [
      '每个图表自己处理原始数据',
      '同名指标在不同卡片计算方式不一致',
      '时间范围、单位和精度没有统一规范',
    ],
    language: 'ts',
    code: `type MetricPoint = {
  label: string
  value: number
  unit?: string
  trend?: 'up' | 'down' | 'flat'
}

type ChartDataset = {
  dimension: string[]
  metrics: MetricPoint[]
}`,
  },
  {
    order: '02',
    title: '图表封装不是偷懒，而是为了一致性、可替换性和低维护成本',
    tag: 'Chart Layer',
    description:
      '如果页面里到处都是几十行 option 配置，说明你的图表层还没建立起来。更好的工程方式是，把折线图、柱状图、饼图、表格卡片和地图图层做成统一封装，输入参数尽量语义化，比如 title、dataset、colorTokens、interactions。这样后面换主题、换动画、换库、加埋点时，不会每个页面都返工。',
    bestFor: ['中后台报表', '复用型看板', '多业务线统一设计体系'],
    focus: [
      '图表组件只接统一数据协议和必要展示配置',
      '样式 token、颜色体系、空态和加载态要一并收口',
      '给图表封装交互事件，别把底层实例暴露得到处都是',
    ],
    risks: [
      '为了快直接复制 option 代码',
      '封装时把所有底层能力都原样透传，导致表面封装实际失效',
      '样式和数据逻辑耦合太深，换主题要全量返工',
    ],
    language: 'ts',
    code: `type LineChartProps = {
  title: string
  dataset: ChartDataset
  smooth?: boolean
  height?: number
  onPointClick?: (index: number) => void
}`,
  },
  {
    order: '03',
    title: '复杂看板的关键是联动状态，而不是单个图表画得多炫',
    tag: 'Interaction',
    description:
      '真实项目里的可视化页面，难点往往不在单个图表，而在多个图表之间如何同步。时间筛选、区域切换、图例选择、地图钻取、轮播聚焦、弹层详情，这些都需要统一状态流。你可以用 Pinia、事件总线或专门的 dashboard store，但一定要有中枢。否则页面图一多，交互和副作用就会缠在一起。',
    bestFor: ['驾驶舱大屏', '指标分析系统', '地图联动页面'],
    focus: [
      '筛选条件、全局时间轴和区域上下文集中管理',
      '点击、悬停、轮播和自动刷新需要统一调度',
      '图表间通信尽量通过 store，不直接互调实例',
    ],
    risks: [
      '图表 A 直接改图表 B 的实例状态',
      '自动刷新与用户手动筛选互相覆盖',
      '联动条件散落在组件内部，难以排查',
    ],
    language: 'ts',
    code: `const useDashboardStore = defineStore('dashboard', {
  state: () => ({
    activeRegion: 'china',
    timeRange: '7d',
    focusMetric: 'orderAmount',
  }),
})`,
  },
  {
    order: '04',
    title: '数据量、刷新频率和地图图层一上来，性能就会成为主战场',
    tag: 'Performance',
    description:
      '可视化工程越往后做，越会发现性能是硬门槛。比如 1 秒一刷的监控曲线、成百上千个点位、地图飞线和热力层、大量 tooltip 和动画，都可能把页面拖死。这个阶段要明确什么时候用 SVG，什么时候切 Canvas，什么时候上 WebGL，什么时候做采样、分帧更新、离屏渲染和定时器治理。',
    bestFor: ['实时监控', '地图点位系统', '高频刷新大屏'],
    focus: [
      '按数据量和刷新频率决定渲染技术路线',
      '控制 tooltip、动画和 watcher 数量，避免无意义重绘',
      '对地图和大列表结合场景做分层渲染和惰性更新',
    ],
    risks: [
      '小数据量方案硬扛到大数据场景',
      '每个组件自己 setInterval，页面时序越来越乱',
      '只盯首屏渲染，不看长期驻场内存泄漏',
    ],
    language: 'ts',
    code: `function sampleSeries(values: number[], maxPoints: number) {
  if (values.length <= maxPoints) return values

  const step = Math.ceil(values.length / maxPoints)
  return values.filter((_, index) => index % step === 0)
}`,
  },
  {
    order: '05',
    title: '发布、截图、导出和设备适配，决定可视化系统能不能真正上线长期跑',
    tag: 'Delivery',
    description:
      '做报表只在浏览器里看是一回事，真正上生产往往还要考虑电视墙分辨率、自适应缩放、轮播播放、截图导出、定时刷新、异常兜底和无人值守。尤其是大屏和地图项目，最终不是“能打开”，而是“能稳定挂着跑”。这时候发布链路、配置中心、告警和兜底页都要纳入系统设计。',
    bestFor: ['电视墙大屏', '会议驾驶舱', '运营播报页', '无人值守监控页'],
    focus: [
      '分辨率基准、缩放策略和安全边距要统一',
      '导出图片、PDF 或分享快照要评估稳定性和清晰度',
      '自动刷新、掉线重连、空态兜底都要有完整策略',
    ],
    risks: [
      '只在开发机分辨率上调试',
      '上线后发现轮播与自动刷新冲突',
      '没有异常页和兜底文案，出问题直接黑屏',
    ],
    language: 'text',
    code: `可视化发布治理清单
- 统一 1920 x 1080 / 4K 基准尺寸
- 配置刷新频率、数据超时和重试策略
- 预置截图导出、分享口令和轮播配置
- 为断网、空数据、接口异常准备兜底页`,
  },
];

const comparisonCards = [
  {
    title: '直接写图表配置 vs 建立图表封装层',
    summary:
      '直接写配置上手快，但维护成本会爆炸；建立封装层前期重一点，却能统一样式、交互和指标协议。',
  },
  {
    title: 'SVG / Canvas / WebGL',
    summary:
      'SVG 适合中小规模和细粒度 DOM 交互，Canvas 适合大批量 2D 绘制，WebGL 更适合海量点位、复杂地图和高性能动画场景。',
  },
  {
    title: '普通报表页 vs 驾驶舱大屏',
    summary:
      '报表页更看重筛选、表格和分析链路；大屏更看重自动刷新、视觉节奏、稳定驻场和跨分辨率适配，两者不要用同一思路硬套。',
  },
];
</script>

<style scoped>
.visual-guide-page {
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

.visual-guide-page__shell {
  min-height: calc(100vh - 90px);
  border: 1px solid rgba(19, 27, 34, 0.06);
  border-radius: 7px;
  background: rgba(255, 255, 255, 0.82);
}

.visual-guide-page__top {
  display: flex;
  justify-content: flex-start;
  padding: 18px 18px 0;
}

.visual-guide-page__back {
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

.visual-guide-page__back:hover {
  transform: translateY(-1px);
  border-color: rgba(46, 70, 91, 0.18);
  box-shadow: 0 18px 34px rgba(19, 27, 34, 0.08);
}

.visual-guide-page__content {
  padding: 18px 24px 24px;
}

.visual-guide-hero {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 320px;
  gap: 20px;
  padding-bottom: 26px;
  border-bottom: 1px solid rgba(19, 27, 34, 0.08);
}

.visual-guide-hero__eyebrow,
.visual-guide-section__eyebrow,
.visual-guide-card__eyebrow,
.visual-guide-hero__label {
  font-size: 11px;
  line-height: 1.4;
  letter-spacing: 0.24em;
  text-transform: uppercase;
  color: #7b8793;
}

.visual-guide-hero__title {
  margin-top: 10px;
  font-size: 46px;
  line-height: 1.06;
  font-weight: 600;
  letter-spacing: -0.05em;
  color: #17202a;
}

.visual-guide-hero__summary {
  max-width: 860px;
  margin-top: 16px;
  font-size: 15px;
  line-height: 1.9;
  color: #58636f;
}

.visual-guide-hero__panel,
.visual-guide-card,
.visual-guide-panel {
  border: 1px solid rgba(19, 27, 34, 0.08);
  border-radius: 7px;
  background: rgba(255, 255, 255, 0.84);
}

.visual-guide-hero__panel {
  padding: 18px;
}

.visual-guide-list {
  display: grid;
  gap: 8px;
  margin: 12px 0 0;
  padding-left: 18px;
  font-size: 14px;
  line-height: 1.8;
  color: #56616d;
}

.visual-guide-grid,
.visual-guide-columns,
.visual-guide-stack {
  display: grid;
  gap: 16px;
}

.visual-guide-grid {
  margin-top: 28px;
  grid-template-columns: repeat(3, minmax(0, 1fr));
}

.visual-guide-card {
  padding: 18px;
}

.visual-guide-card__title,
.visual-guide-panel__title,
.visual-guide-section__title {
  color: #17202a;
}

.visual-guide-card__title {
  margin-top: 10px;
  font-size: 22px;
  line-height: 1.25;
  font-weight: 600;
}

.visual-guide-card__text,
.visual-guide-panel__text {
  margin-top: 12px;
  font-size: 14px;
  line-height: 1.9;
  color: #596571;
}

.visual-guide-section {
  margin-top: 28px;
}

.visual-guide-section__head {
  margin-bottom: 14px;
}

.visual-guide-section__title {
  margin-top: 8px;
  font-size: 30px;
  line-height: 1.18;
  font-weight: 600;
  letter-spacing: -0.03em;
}

.visual-guide-columns {
  grid-template-columns: repeat(3, minmax(0, 1fr));
}

.visual-guide-stack {
  grid-template-columns: repeat(2, minmax(0, 1fr));
}

.visual-guide-panel {
  padding: 18px;
}

.visual-guide-panel.is-wide {
  grid-column: 1 / -1;
}

.visual-guide-panel__eyebrow {
  font-size: 11px;
  line-height: 1.4;
  letter-spacing: 0.24em;
  text-transform: uppercase;
  color: #80909d;
}

.visual-guide-panel__title {
  font-size: 20px;
  line-height: 1.3;
  font-weight: 600;
}

.visual-guide-method__head {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 16px;
}

.visual-guide-method__tag {
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

.visual-guide-method__grid {
  display: grid;
  gap: 14px;
  margin-top: 16px;
  grid-template-columns: repeat(3, minmax(0, 1fr));
}

.visual-guide-mini-panel {
  padding: 14px;
  border: 1px solid rgba(19, 27, 34, 0.08);
  border-radius: 7px;
  background: rgba(245, 248, 250, 0.9);
}

.visual-guide-mini-panel__title {
  font-size: 14px;
  font-weight: 600;
  color: #17202a;
}

.visual-guide-code-block {
  margin-top: 14px;
}

@media (max-width: 1080px) {
  .visual-guide-hero,
  .visual-guide-grid,
  .visual-guide-columns,
  .visual-guide-stack,
  .visual-guide-method__grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 900px) {
  .visual-guide-page {
    min-height: auto;
    padding: 18px;
  }

  .visual-guide-page__shell {
    min-height: auto;
  }

  .visual-guide-page__content {
    padding: 18px;
  }

  .visual-guide-hero__title {
    font-size: 36px;
  }

  .visual-guide-section__title {
    font-size: 26px;
  }
}
</style>
