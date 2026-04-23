<template>
  <section class="monitoring-guide-page">
    <div class="monitoring-guide-page__shell">
      <div class="monitoring-guide-page__top">
        <RouterLink
          to="/fullstack-guide"
          class="monitoring-guide-page__back"
          aria-label="返回全栈能力菜单"
          title="返回全栈能力菜单"
        >
          <el-icon :size="18"><ArrowLeft /></el-icon>
        </RouterLink>
      </div>

      <div class="monitoring-guide-page__content">
        <header class="monitoring-guide-hero">
          <div>
            <p class="monitoring-guide-hero__eyebrow">Frontend Monitoring</p>
            <h1 class="monitoring-guide-hero__title">前端监控能力</h1>
            <p class="monitoring-guide-hero__summary">
              这一页按渡一前端常见的工程化讲法来组织：先明确监控不是“多打日志”，而是先定义异常、性能和行为三类数据，再去讲错误捕获、性能指标、Source
              Map 还原、埋点上报和告警降噪。重点不是 SDK
              API，而是监控闭环能否真正帮团队定位问题。
            </p>
          </div>

          <div class="monitoring-guide-hero__panel">
            <p class="monitoring-guide-hero__label">学完结果</p>
            <ul class="monitoring-guide-list">
              <li>能把错误监控、性能监控和业务埋点拆成三条不同的数据链路。</li>
              <li>能搭出前端监控最小闭环：采集、上报、还原、聚合、告警。</li>
              <li>
                能避免把监控系统做成“日志垃圾桶”，而是真正服务排障和优化。
              </li>
            </ul>
          </div>
        </header>

        <section class="monitoring-guide-grid">
          <article
            v-for="item in quickStages"
            :key="item.order"
            class="monitoring-guide-card"
          >
            <p class="monitoring-guide-card__eyebrow">Stage {{ item.order }}</p>
            <h2 class="monitoring-guide-card__title">{{ item.title }}</h2>
            <p class="monitoring-guide-card__text">{{ item.summary }}</p>
          </article>
        </section>

        <section class="monitoring-guide-section">
          <div class="monitoring-guide-section__head">
            <div>
              <p class="monitoring-guide-section__eyebrow">Decision Order</p>
              <h2 class="monitoring-guide-section__title">
                前端监控先分数据类型，再设计采集与告警
              </h2>
            </div>
          </div>

          <div class="monitoring-guide-stack">
            <article
              v-for="stage in guideStages"
              :key="stage.order"
              class="monitoring-guide-panel is-wide"
            >
              <div class="monitoring-guide-method__head">
                <div>
                  <p class="monitoring-guide-panel__eyebrow">
                    Stage {{ stage.order }}
                  </p>
                  <h3 class="monitoring-guide-panel__title">
                    {{ stage.title }}
                  </h3>
                </div>
                <span class="monitoring-guide-method__tag">
                  {{ stage.tag }}
                </span>
              </div>

              <p class="monitoring-guide-panel__text">
                {{ stage.description }}
              </p>

              <div class="monitoring-guide-method__grid">
                <section class="monitoring-guide-mini-panel">
                  <p class="monitoring-guide-mini-panel__title">适用场景</p>
                  <ul class="monitoring-guide-list">
                    <li v-for="item in stage.bestFor" :key="item">
                      {{ item }}
                    </li>
                  </ul>
                </section>

                <section class="monitoring-guide-mini-panel">
                  <p class="monitoring-guide-mini-panel__title">实现重点</p>
                  <ul class="monitoring-guide-list">
                    <li v-for="item in stage.focus" :key="item">
                      {{ item }}
                    </li>
                  </ul>
                </section>

                <section class="monitoring-guide-mini-panel">
                  <p class="monitoring-guide-mini-panel__title">常见误区</p>
                  <ul class="monitoring-guide-list">
                    <li v-for="item in stage.risks" :key="item">
                      {{ item }}
                    </li>
                  </ul>
                </section>
              </div>

              <AppCodeBlock
                class="monitoring-guide-code-block"
                :code="stage.code"
                :lang="stage.language"
              />
            </article>
          </div>
        </section>

        <section class="monitoring-guide-section">
          <div class="monitoring-guide-section__head">
            <div>
              <p class="monitoring-guide-section__eyebrow">Comparison</p>
              <h2 class="monitoring-guide-section__title">
                什么时候采集错误，什么时候采集行为，什么时候必须做聚合
              </h2>
            </div>
          </div>

          <div class="monitoring-guide-columns">
            <article
              v-for="item in comparisonCards"
              :key="item.title"
              class="monitoring-guide-panel"
            >
              <h3 class="monitoring-guide-panel__title">{{ item.title }}</h3>
              <p class="monitoring-guide-panel__text">{{ item.summary }}</p>
            </article>
          </div>
        </section>

        <section class="monitoring-guide-section">
          <div class="monitoring-guide-section__head">
            <div>
              <p class="monitoring-guide-section__eyebrow">Checklist</p>
              <h2 class="monitoring-guide-section__title">
                一套能上线的前端监控落地清单
              </h2>
            </div>
          </div>

          <article class="monitoring-guide-panel is-wide">
            <ul class="monitoring-guide-list">
              <li>
                先定义采集目标，不要把所有点击、所有请求、所有异常都一股脑上传。
              </li>
              <li>错误监控至少要带版本号、路由、设备、用户标识和时间戳。</li>
              <li>
                性能监控要区分 Web Vitals、接口耗时和资源加载耗时，别混成一类。
              </li>
              <li>
                生产环境错误栈如果不做 Source Map 还原，排障效率会非常差。
              </li>
              <li>告警必须有限流、聚合和去重，不然团队会被噪音拖垮。</li>
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
    title: '先分清监控的数据类型',
    summary: '错误、性能、行为是三种完全不同的数据，不该放在同一桶里处理。',
  },
  {
    order: '02',
    title: '错误采集只是入口',
    summary: '真正有价值的是错误聚合、版本定位和 Source Map 还原。',
  },
  {
    order: '03',
    title: '性能要看真实用户',
    summary: '只看本地 Performance 面板不够，线上真实设备数据更关键。',
  },
  {
    order: '04',
    title: '埋点不是越多越好',
    summary: '没有事件模型和业务目标，埋点只会制造噪音和成本。',
  },
  {
    order: '05',
    title: '告警要能降噪',
    summary: '监控系统真正的难点不是采到，而是如何避免告警把人淹没。',
  },
];

const guideStages = [
  {
    order: '01',
    title: '先建模：错误监控、性能监控、业务埋点必须分开设计',
    tag: '基础认知',
    description:
      '渡一前端讲工程化能力时，通常都会强调一件事：不要把监控理解成“多发几个请求”。错误监控关注的是页面异常和 JS 崩溃；性能监控关注的是页面速度和交互卡顿；业务埋点关注的是用户在业务流程里的动作。三类数据的采集频率、字段结构、分析目标都不同，如果混在一起，后续查询和告警都会失真。',
    bestFor: ['中后台系统', '运营平台', '持续迭代产品', '前端基础设施建设'],
    focus: [
      '错误、性能、行为事件使用不同事件模型',
      '为每类数据定义最小必要字段',
      '监控目标先于 SDK 实现',
    ],
    risks: [
      '所有日志走同一个 eventName',
      '字段结构混乱，后续无法聚合分析',
      '把行为埋点误当成错误监控来做告警',
    ],
    language: 'typescript',
    code: `type MonitorEvent =
  | { type: 'error'; message: string; stack?: string }
  | { type: 'performance'; metric: 'LCP' | 'INP' | 'CLS'; value: number }
  | { type: 'track'; event: string; payload?: Record<string, unknown> }

function report(event: MonitorEvent) {
  navigator.sendBeacon('/api/monitor/report', JSON.stringify(event))
}`,
  },
  {
    order: '02',
    title: '错误监控真正有价值的是还原能力：版本号、路由、Source Map',
    tag: '错误监控',
    description:
      '前端错误采集并不难，难的是采回来之后能不能定位。生产环境大多经过压缩和混淆，如果只拿到一条 minified stack，排查价值非常有限。所以真正成熟的错误监控，除了 message 和 stack，还要带版本号、构建号、路由、浏览器环境，并且配套 Source Map 还原链路。',
    bestFor: ['生产环境排障', '灰度发布', '多人协作项目', '持续交付项目'],
    focus: [
      '采集未捕获异常、Promise 拒绝和资源加载错误',
      '上报版本、页面路径和用户环境',
      '发布时同步上传 Source Map 到监控服务',
    ],
    risks: [
      '只采 message，不采 stack 和 release',
      'Source Map 直接公开暴露在生产静态目录',
      '错误过多却没有聚合规则，排查效率很低',
    ],
    language: 'typescript',
    code: `window.addEventListener('error', (event) => {
  report({
    type: 'error',
    message: event.message,
    stack: event.error?.stack,
    filename: event.filename,
    lineno: event.lineno,
    colno: event.colno,
    release: __APP_VERSION__,
    route: location.pathname,
  })
})

window.addEventListener('unhandledrejection', (event) => {
  report({
    type: 'error',
    message: 'unhandledrejection',
    stack: String(event.reason),
    release: __APP_VERSION__,
    route: location.pathname,
  })
})`,
  },
  {
    order: '03',
    title: '性能监控先看真实用户指标：Web Vitals、接口耗时、资源耗时',
    tag: '性能监控',
    description:
      '本地调试只能看到开发机上的表现，真正决定产品体验的是线上真实用户。前端性能监控的核心，不只是 FCP、LCP、CLS 这些 Web Vitals，还包括接口耗时、静态资源加载时长、长任务数量等信息。这样你才能区分“慢在页面渲染”还是“慢在接口链路”。',
    bestFor: ['首屏优化', '复杂后台', '多地域用户产品', '性能回归跟踪'],
    focus: [
      '采集 Web Vitals 指标',
      '补充接口耗时和资源加载耗时',
      '按页面、版本、地区和设备做分层分析',
    ],
    risks: [
      '只看平均值，不看 P75/P95',
      '性能指标没带页面上下文，无法定位问题页面',
      '只做开发环境性能分析，不看生产环境真实数据',
    ],
    language: 'typescript',
    code: `import { onCLS, onINP, onLCP } from 'web-vitals'

function reportMetric(metric: string, value: number) {
  report({
    type: 'performance',
    metric,
    value,
    route: location.pathname,
    release: __APP_VERSION__,
  })
}

onLCP((entry) => reportMetric('LCP', entry.value))
onCLS((entry) => reportMetric('CLS', entry.value))
onINP((entry) => reportMetric('INP', entry.value))`,
  },
  {
    order: '04',
    title: '业务埋点不要乱打：先有事件模型，再谈按钮点击',
    tag: '行为埋点',
    description:
      '很多团队一说埋点，就从按钮点击开始，但这样通常很快失控。更稳的做法是先定义事件模型：页面曝光、关键按钮点击、流程完成、流程失败、转化中断分别是什么事件，各自带哪些字段。埋点的目标是回答业务问题，而不是把所有行为全量记下来。',
    bestFor: ['漏斗分析', '增长实验', '运营页面', '产品行为分析'],
    focus: [
      '先定义事件字典和字段规范',
      '埋点字段要能反映业务上下文',
      '采集关键路径，不做无意义高频点击上传',
    ],
    risks: [
      '没有事件命名规范，后期全靠猜',
      '每个页面自己随手打点，字段不统一',
      '高频事件过度上传，造成成本和噪音',
    ],
    language: 'typescript',
    code: `const trackingMap = {
  page_view: ['page', 'from'],
  submit_order: ['skuId', 'amount', 'channel'],
  submit_order_failed: ['skuId', 'reason'],
} as const

function track(event: keyof typeof trackingMap, payload: Record<string, unknown>) {
  report({
    type: 'track',
    event,
    payload,
    route: location.pathname,
  })
}`,
  },
  {
    order: '05',
    title: '最后是监控闭环：聚合、阈值、告警、降噪、回归验证',
    tag: '运维闭环',
    description:
      '真正成熟的前端监控系统，不会停留在“采集成功”。更重要的是如何聚合同类问题、设置合理阈值、把同一版本同一路由的异常合并，并在修复后验证是否真的下降。没有降噪和回归验证，监控平台很快就会变成没人信的噪音系统。',
    bestFor: ['监控平台建设', '长期维护项目', '多人值班团队', '线上稳定性治理'],
    focus: [
      '相同错误按 release、route、message 聚合',
      '告警加限流和静默窗口',
      '修复后回看异常量和指标趋势',
    ],
    risks: [
      '每条错误都直接告警',
      '没有分级策略，普通异常和核心故障同级处理',
      '修复后不回看数据，无法确认收益',
    ],
    language: 'typescript',
    code: `function shouldAlert(errorCount: number, level: 'info' | 'warn' | 'fatal') {
  if (level === 'fatal') {
    return errorCount >= 1
  }

  if (level === 'warn') {
    return errorCount >= 20
  }

  return errorCount >= 100
}`,
  },
];

const comparisonCards = [
  {
    title: '错误监控 vs 行为埋点',
    summary:
      '错误监控回答“哪里坏了、谁受影响”，行为埋点回答“用户做了什么、流程卡在哪”。两者都重要，但字段结构和分析目标完全不同。',
  },
  {
    title: '本地调试 vs 真实用户监控',
    summary:
      '本地调试适合复现和优化细节，真实用户监控适合发现线上退化和边缘设备问题。稳定团队一定要同时拥有两者，而不是只做其中一边。',
  },
  {
    title: '原始日志 vs 聚合告警',
    summary:
      '原始日志是排查素材，聚合告警是值班入口。没有聚合的监控系统很快会把团队淹没，最后谁也不看。',
  },
];
</script>

<style scoped>
.monitoring-guide-page {
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

.monitoring-guide-page__shell {
  min-height: calc(100vh - 90px);
  border: 1px solid rgba(19, 27, 34, 0.06);
  border-radius: 7px;
  background: rgba(255, 255, 255, 0.82);
}

.monitoring-guide-page__top {
  display: flex;
  justify-content: flex-start;
  padding: 18px 18px 0;
}

.monitoring-guide-page__back {
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

.monitoring-guide-page__back:hover {
  transform: translateY(-1px);
  border-color: rgba(46, 70, 91, 0.18);
  box-shadow: 0 18px 34px rgba(19, 27, 34, 0.08);
}

.monitoring-guide-page__content {
  padding: 18px 24px 24px;
}

.monitoring-guide-hero {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 320px;
  gap: 20px;
  padding-bottom: 26px;
  border-bottom: 1px solid rgba(19, 27, 34, 0.08);
}

.monitoring-guide-hero__eyebrow,
.monitoring-guide-section__eyebrow,
.monitoring-guide-card__eyebrow,
.monitoring-guide-hero__label {
  font-size: 11px;
  line-height: 1.4;
  letter-spacing: 0.24em;
  text-transform: uppercase;
  color: #7b8793;
}

.monitoring-guide-hero__title {
  margin-top: 10px;
  font-size: 46px;
  line-height: 1.06;
  font-weight: 600;
  letter-spacing: -0.05em;
  color: #17202a;
}

.monitoring-guide-hero__summary {
  max-width: 860px;
  margin-top: 16px;
  font-size: 15px;
  line-height: 1.9;
  color: #58636f;
}

.monitoring-guide-hero__panel,
.monitoring-guide-card,
.monitoring-guide-panel {
  border: 1px solid rgba(19, 27, 34, 0.08);
  border-radius: 7px;
  background: rgba(255, 255, 255, 0.84);
}

.monitoring-guide-hero__panel {
  padding: 18px;
}

.monitoring-guide-list {
  display: grid;
  gap: 8px;
  margin: 12px 0 0;
  padding-left: 18px;
  font-size: 14px;
  line-height: 1.8;
  color: #56616d;
}

.monitoring-guide-grid,
.monitoring-guide-columns,
.monitoring-guide-stack {
  display: grid;
  gap: 16px;
}

.monitoring-guide-grid {
  margin-top: 28px;
  grid-template-columns: repeat(3, minmax(0, 1fr));
}

.monitoring-guide-card {
  padding: 18px;
}

.monitoring-guide-card__title,
.monitoring-guide-panel__title,
.monitoring-guide-section__title {
  color: #17202a;
}

.monitoring-guide-card__title {
  margin-top: 10px;
  font-size: 22px;
  line-height: 1.25;
  font-weight: 600;
}

.monitoring-guide-card__text,
.monitoring-guide-panel__text {
  margin-top: 12px;
  font-size: 14px;
  line-height: 1.9;
  color: #596571;
}

.monitoring-guide-section {
  margin-top: 28px;
}

.monitoring-guide-section__head {
  margin-bottom: 14px;
}

.monitoring-guide-section__title {
  margin-top: 8px;
  font-size: 30px;
  line-height: 1.18;
  font-weight: 600;
  letter-spacing: -0.03em;
}

.monitoring-guide-columns {
  grid-template-columns: repeat(3, minmax(0, 1fr));
}

.monitoring-guide-stack {
  grid-template-columns: repeat(2, minmax(0, 1fr));
}

.monitoring-guide-panel {
  padding: 18px;
}

.monitoring-guide-panel.is-wide {
  grid-column: 1 / -1;
}

.monitoring-guide-panel__eyebrow {
  font-size: 11px;
  line-height: 1.4;
  letter-spacing: 0.24em;
  text-transform: uppercase;
  color: #80909d;
}

.monitoring-guide-panel__title {
  font-size: 20px;
  line-height: 1.3;
  font-weight: 600;
}

.monitoring-guide-method__head {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 16px;
}

.monitoring-guide-method__tag {
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

.monitoring-guide-method__grid {
  display: grid;
  gap: 14px;
  margin-top: 16px;
  grid-template-columns: repeat(3, minmax(0, 1fr));
}

.monitoring-guide-mini-panel {
  padding: 14px;
  border: 1px solid rgba(19, 27, 34, 0.08);
  border-radius: 7px;
  background: rgba(245, 248, 250, 0.9);
}

.monitoring-guide-mini-panel__title {
  font-size: 14px;
  font-weight: 600;
  color: #17202a;
}

.monitoring-guide-code-block {
  margin-top: 14px;
}

@media (max-width: 1080px) {
  .monitoring-guide-hero,
  .monitoring-guide-grid,
  .monitoring-guide-columns,
  .monitoring-guide-stack,
  .monitoring-guide-method__grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 900px) {
  .monitoring-guide-page {
    min-height: auto;
    padding: 18px;
  }

  .monitoring-guide-page__shell {
    min-height: auto;
  }

  .monitoring-guide-page__content {
    padding: 18px;
  }

  .monitoring-guide-hero__title {
    font-size: 36px;
  }

  .monitoring-guide-section__title {
    font-size: 26px;
  }
}
</style>
