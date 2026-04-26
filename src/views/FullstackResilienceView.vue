<template>
  <section class="resilience-guide-page">
    <div class="resilience-guide-page__shell">
      <div class="resilience-guide-page__top">
        <RouterLink
          to="/fullstack-guide"
          class="resilience-guide-page__back"
          aria-label="返回全栈能力菜单"
          title="返回全栈能力菜单"
        >
          <el-icon :size="18"><ArrowLeft /></el-icon>
        </RouterLink>
      </div>

      <div class="resilience-guide-page__content">
        <header class="resilience-guide-hero">
          <div>
            <p class="resilience-guide-hero__eyebrow">Frontend Resilience</p>
            <h1 class="resilience-guide-hero__title">前端容灾降级能力</h1>
            <p class="resilience-guide-hero__summary">
              这一页按真实项目建设前端容灾降级的顺序来讲：先识别哪些链路会把页面拖死，再处理超时隔离、兜底缓存、功能降级、错误边界、恢复策略和观测闭环。重点不是报错后弹一句“请稍后重试”，而是让前端在接口抖动、依赖雪崩、脚本异常和资源加载失败时仍然有可控行为。
            </p>
          </div>

          <div class="resilience-guide-hero__panel">
            <p class="resilience-guide-hero__label">学完结果</p>
            <ul class="resilience-guide-list">
              <li>能识别核心链路、次级链路和可直接熔断的非核心依赖。</li>
              <li>能设计超时、回退、缓存兜底、功能降级和错误恢复策略。</li>
              <li>能把监控、开关、回滚和恢复演练纳入同一套稳定性治理流程。</li>
            </ul>
          </div>
        </header>

        <section class="resilience-guide-grid">
          <article
            v-for="item in quickStages"
            :key="item.order"
            class="resilience-guide-card"
          >
            <p class="resilience-guide-card__eyebrow">Stage {{ item.order }}</p>
            <h2 class="resilience-guide-card__title">{{ item.title }}</h2>
            <p class="resilience-guide-card__text">{{ item.summary }}</p>
          </article>
        </section>

        <section class="resilience-guide-section">
          <div class="resilience-guide-section__head">
            <div>
              <p class="resilience-guide-section__eyebrow">Decision Order</p>
              <h2 class="resilience-guide-section__title">
                容灾降级先划分链路等级，再建设隔离、回退与恢复闭环
              </h2>
            </div>
          </div>

          <div class="resilience-guide-stack">
            <article
              v-for="stage in guideStages"
              :key="stage.order"
              class="resilience-guide-panel is-wide"
            >
              <div class="resilience-guide-method__head">
                <div>
                  <p class="resilience-guide-panel__eyebrow">
                    Stage {{ stage.order }}
                  </p>
                  <h3 class="resilience-guide-panel__title">
                    {{ stage.title }}
                  </h3>
                </div>
                <span class="resilience-guide-method__tag">
                  {{ stage.tag }}
                </span>
              </div>

              <p class="resilience-guide-panel__text">
                {{ stage.description }}
              </p>

              <div class="resilience-guide-method__grid">
                <section class="resilience-guide-mini-panel">
                  <p class="resilience-guide-mini-panel__title">适用场景</p>
                  <ul class="resilience-guide-list">
                    <li v-for="item in stage.bestFor" :key="item">
                      {{ item }}
                    </li>
                  </ul>
                </section>

                <section class="resilience-guide-mini-panel">
                  <p class="resilience-guide-mini-panel__title">实现重点</p>
                  <ul class="resilience-guide-list">
                    <li v-for="item in stage.focus" :key="item">
                      {{ item }}
                    </li>
                  </ul>
                </section>

                <section class="resilience-guide-mini-panel">
                  <p class="resilience-guide-mini-panel__title">常见误区</p>
                  <ul class="resilience-guide-list">
                    <li v-for="item in stage.risks" :key="item">
                      {{ item }}
                    </li>
                  </ul>
                </section>
              </div>

              <AppCodeBlock
                class="resilience-guide-code-block"
                :code="stage.code"
                :lang="stage.language"
              />
            </article>
          </div>
        </section>

        <section class="resilience-guide-section">
          <div class="resilience-guide-section__head">
            <div>
              <p class="resilience-guide-section__eyebrow">Comparison</p>
              <h2 class="resilience-guide-section__title">
                容灾降级最关键的几组取舍
              </h2>
            </div>
          </div>

          <div class="resilience-guide-columns">
            <article
              v-for="item in comparisonCards"
              :key="item.title"
              class="resilience-guide-panel"
            >
              <h3 class="resilience-guide-panel__title">{{ item.title }}</h3>
              <p class="resilience-guide-panel__text">{{ item.summary }}</p>
            </article>
          </div>
        </section>

        <section class="resilience-guide-section">
          <div class="resilience-guide-section__head">
            <div>
              <p class="resilience-guide-section__eyebrow">Checklist</p>
              <h2 class="resilience-guide-section__title">
                一套能落地的前端容灾降级清单
              </h2>
            </div>
          </div>

          <article class="resilience-guide-panel is-wide">
            <ul class="resilience-guide-list">
              <li>
                先给页面依赖分级，核心链路和装饰性链路不能用同一套失败策略。
              </li>
              <li>
                所有关键请求都要定义超时、重试、回退和缓存兜底，而不是无限等待。
              </li>
              <li>
                页面、模块和组件都应有错误边界与降级视图，避免一个异常拖死整页。
              </li>
              <li>
                降级必须和开关、灰度、监控、日志和回滚结合，不能只做静态兜底页。
              </li>
              <li>
                稳定性方案需要演练，真正出故障前就要验证接口异常和资源失效的处理路径。
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
    title: '先划分依赖等级',
    summary: '先知道哪些依赖挂了会拖死核心业务，哪些只影响体验增强。',
  },
  {
    order: '02',
    title: '失败策略要前置',
    summary: '超时、重试、熔断、回退和缓存兜底要在开发时就设计进去。',
  },
  {
    order: '03',
    title: '错误要局部隔离',
    summary: '页面异常不能放大成全站白屏，错误边界要把问题限制在局部。',
  },
  {
    order: '04',
    title: '降级不等于不可用',
    summary: '降级后的页面仍应保留核心能力，而不是只剩一个报错提示。',
  },
  {
    order: '05',
    title: '恢复路径要可观测',
    summary: '什么时候降级、什么时候恢复、影响了谁，都应该能被追踪。',
  },
];

const guideStages = [
  {
    order: '01',
    title: '先定义核心链路和次级链路，别让所有依赖拥有同样优先级',
    tag: '问题建模',
    description:
      '前端容灾的第一步不是写重试逻辑，而是给依赖分级。比如登录、订单提交、患者病历保存属于核心链路；推荐位、活动卡片、埋点面板、客服插件通常属于次级链路。只有先定义哪些功能必须活着、哪些可以临时关闭，后面才能决定是否超时熔断、是否展示缓存、是否直接隐藏模块。没有分级，最后的结果往往是所有依赖都相互绑死。',
    bestFor: [
      '复杂后台首页',
      '多模块工作台',
      '交易与表单系统',
      '高可用业务前端',
    ],
    focus: [
      '明确核心链路、次级链路和可舍弃链路',
      '为每条链路定义失败后允许的最小能力集',
      '把依赖等级记录到方案和代码注释中',
    ],
    risks: [
      '所有模块都被当成核心链路处理',
      '页面初始化过度串行化',
      '装饰性依赖失败导致主流程不可用',
    ],
    language: 'text',
    code: `Dependency Tiers
- Tier 1: 登录、保存、支付、关键详情
- Tier 2: 推荐、统计、附加模块
- Tier 3: 运营位、帮助入口、实验组件`,
  },
  {
    order: '02',
    title: '请求层要有超时、重试、熔断和回退，不能无限等接口给结果',
    tag: '失败策略',
    description:
      '很多前端稳定性问题并不是接口真正报错，而是长时间 pending，最终把整个页面拖死。请求层应该对关键接口设置超时，对幂等读取接口设置有限重试，对连续失败的依赖做熔断，并在熔断后回退到缓存或降级数据。这样前端能更快结束不确定状态，把控制权拿回到自己手里。',
    bestFor: ['接口波动明显的系统', '弱网络场景', '跨域依赖较多的项目'],
    focus: [
      '超时上限按接口类型分别定义',
      '重试只用于幂等读取，避免写操作重复提交',
      '连续失败后快速回退到缓存或降级态',
    ],
    risks: [
      '请求默认永不超时',
      '对写接口无脑重试造成重复提交',
      '接口失败后只会一直转圈',
    ],
    language: 'ts',
    code: `const withTimeout = <T>(promise: Promise<T>, ms: number) =>
  Promise.race([
    promise,
    new Promise<T>((_, reject) =>
      setTimeout(() => reject(new Error('timeout')), ms),
    ),
  ])`,
  },
  {
    order: '03',
    title: '页面和模块都要有错误边界，避免脚本异常把整页一起带走',
    tag: '隔离治理',
    description:
      '接口异常是一类问题，运行时脚本异常是另一类问题。一个复杂页面通常会挂很多动态组件、图表和富交互区块，如果没有错误边界，一个组件报错就可能导致整页白屏。更稳的做法是把高风险模块包进错误边界，出错后局部降级为占位态、静态态或重试入口，而不是让整个页面失去响应。',
    bestFor: ['复杂图表页', '低代码页面', '插件化前端', '富交互场景'],
    focus: [
      '为高风险组件建立局部错误边界',
      '错误边界提供静态占位、重试和上报能力',
      '边界位置按业务模块划分，不要只在根节点包一层',
    ],
    risks: [
      '只在应用根节点做一次全局捕获',
      '模块报错直接让整个页面空白',
      '降级组件没有任何恢复入口',
    ],
    language: 'vue',
    code: `<ErrorBoundary fallback="图表暂不可用，请稍后重试">
  <InsightChart />
</ErrorBoundary>`,
  },
  {
    order: '04',
    title: '降级方案必须保留核心业务，不要把故障处理做成一刀切不可用',
    tag: '用户体验',
    description:
      '真正有效的降级，不是把页面整个替换成“系统繁忙”，而是尽量保住主能力。比如推荐流挂了就回退到固定内容，富文本编辑器挂了就回退到纯文本模式，图表失败就展示关键数字摘要，上传预览失败就保留基础上传流程。这样用户仍能完成核心任务，系统也不会因为非核心能力失效而整体瘫痪。',
    bestFor: ['内容平台', '编辑器产品', '数据大屏', '表单与上传流程'],
    focus: [
      '每个模块定义最小可用形态',
      '降级视图优先保任务完成能力',
      '把复杂交互回退到更基础但稳定的形态',
    ],
    risks: [
      '故障时全页面直接封死',
      '降级后用户不知道还能做什么',
      '把所有复杂能力绑成不可拆分的一块',
    ],
    language: 'ts',
    code: `const renderDashboard = (state: DashboardState) => {
  if (state.analyticsFailed) {
    return renderSummaryCards()
  }

  return renderFullDashboard()
}`,
  },
  {
    order: '05',
    title: '容灾降级必须接入监控、开关和恢复演练，才能真正成为工程体系',
    tag: '工程闭环',
    description:
      '如果降级逻辑只存在于代码里，却没有监控、开关和演练，它在真正事故发生时大概率是不可信的。成熟团队会给降级路径接入日志和埋点，记录触发原因、影响范围、恢复时间，并通过特性开关或配置中心快速关停故障模块。同时还会定期做故障演练，例如模拟接口超时、CDN 资源丢失、脚本初始化异常，验证容灾链路是否真的生效。',
    bestFor: ['高频发版团队', '多环境系统', '线上风险较高的业务'],
    focus: [
      '降级触发与恢复事件都进入监控',
      '开关和配置中心支持快速关闭高风险模块',
      '定期演练超时、异常和资源不可达场景',
    ],
    risks: [
      '代码有降级分支但从未演练',
      '故障发生后无法快速全局关闭模块',
      '监控里只看到报错，看不到降级与恢复状态',
    ],
    language: 'yaml',
    code: `resilience:
  degradeSwitch: dashboard_insight_disable
  monitorTags:
    - module
    - reason
    - fallbackMode
  drill:
    frequency: monthly`,
  },
];

const comparisonCards = [
  {
    title: '重试等待 vs 快速回退',
    summary:
      '并不是所有失败都值得一直等。对非核心依赖，快速回退到缓存或降级态，通常比长时间转圈更稳也更符合用户预期。',
  },
  {
    title: '全局报错页 vs 局部错误边界',
    summary:
      '全局报错页只能兜底最坏情况，真正提升稳定性的关键在于把异常限制在局部模块，不让一个图表拖死整页。',
  },
  {
    title: '写了降级逻辑 vs 建立恢复体系',
    summary:
      '降级只是开始，是否能观测、开关、回滚和演练，决定了这套方案在线上是否真的可靠。',
  },
];
</script>

<style scoped>
.resilience-guide-page {
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

.resilience-guide-page__shell {
  min-height: calc(100vh - 90px);
  border: 1px solid rgba(19, 27, 34, 0.06);
  border-radius: 7px;
  background: rgba(255, 255, 255, 0.82);
}

.resilience-guide-page__top {
  display: flex;
  justify-content: flex-start;
  padding: 18px 18px 0;
}

.resilience-guide-page__back {
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

.resilience-guide-page__back:hover {
  transform: translateY(-1px);
  border-color: rgba(46, 70, 91, 0.18);
  box-shadow: 0 18px 34px rgba(19, 27, 34, 0.08);
}

.resilience-guide-page__content {
  padding: 18px 24px 24px;
}

.resilience-guide-hero {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 320px;
  gap: 20px;
  padding-bottom: 26px;
  border-bottom: 1px solid rgba(19, 27, 34, 0.08);
}

.resilience-guide-hero__eyebrow,
.resilience-guide-section__eyebrow,
.resilience-guide-card__eyebrow,
.resilience-guide-hero__label {
  font-size: 11px;
  line-height: 1.4;
  letter-spacing: 0.24em;
  text-transform: uppercase;
  color: #7b8793;
}

.resilience-guide-hero__title {
  margin-top: 10px;
  font-size: 46px;
  line-height: 1.06;
  font-weight: 600;
  letter-spacing: -0.05em;
  color: #17202a;
}

.resilience-guide-hero__summary {
  max-width: 860px;
  margin-top: 16px;
  font-size: 15px;
  line-height: 1.9;
  color: #58636f;
}

.resilience-guide-hero__panel,
.resilience-guide-card,
.resilience-guide-panel {
  border: 1px solid rgba(19, 27, 34, 0.08);
  border-radius: 7px;
  background: rgba(255, 255, 255, 0.84);
}

.resilience-guide-hero__panel {
  padding: 18px;
}

.resilience-guide-list {
  display: grid;
  gap: 8px;
  margin: 12px 0 0;
  padding-left: 18px;
  font-size: 14px;
  line-height: 1.8;
  color: #56616d;
}

.resilience-guide-grid,
.resilience-guide-columns,
.resilience-guide-stack {
  display: grid;
  gap: 16px;
}

.resilience-guide-grid {
  margin-top: 28px;
  grid-template-columns: repeat(3, minmax(0, 1fr));
}

.resilience-guide-card {
  padding: 18px;
}

.resilience-guide-card__title,
.resilience-guide-panel__title,
.resilience-guide-section__title {
  color: #17202a;
}

.resilience-guide-card__title {
  margin-top: 10px;
  font-size: 22px;
  line-height: 1.25;
  font-weight: 600;
}

.resilience-guide-card__text,
.resilience-guide-panel__text {
  margin-top: 12px;
  font-size: 14px;
  line-height: 1.9;
  color: #596571;
}

.resilience-guide-section {
  margin-top: 28px;
}

.resilience-guide-section__head {
  margin-bottom: 14px;
}

.resilience-guide-section__title {
  margin-top: 8px;
  font-size: 30px;
  line-height: 1.18;
  font-weight: 600;
  letter-spacing: -0.03em;
}

.resilience-guide-columns {
  grid-template-columns: repeat(3, minmax(0, 1fr));
}

.resilience-guide-stack {
  grid-template-columns: repeat(2, minmax(0, 1fr));
}

.resilience-guide-panel {
  padding: 18px;
}

.resilience-guide-panel.is-wide {
  grid-column: 1 / -1;
}

.resilience-guide-panel__eyebrow {
  font-size: 11px;
  line-height: 1.4;
  letter-spacing: 0.24em;
  text-transform: uppercase;
  color: #80909d;
}

.resilience-guide-panel__title {
  font-size: 20px;
  line-height: 1.3;
  font-weight: 600;
}

.resilience-guide-method__head {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 16px;
}

.resilience-guide-method__tag {
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

.resilience-guide-method__grid {
  display: grid;
  gap: 14px;
  margin-top: 16px;
  grid-template-columns: repeat(3, minmax(0, 1fr));
}

.resilience-guide-mini-panel {
  padding: 14px;
  border: 1px solid rgba(19, 27, 34, 0.08);
  border-radius: 7px;
  background: rgba(245, 248, 250, 0.9);
}

.resilience-guide-mini-panel__title {
  font-size: 14px;
  font-weight: 600;
  color: #17202a;
}

.resilience-guide-code-block {
  margin-top: 14px;
}

@media (max-width: 1080px) {
  .resilience-guide-hero,
  .resilience-guide-grid,
  .resilience-guide-columns,
  .resilience-guide-stack,
  .resilience-guide-method__grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 900px) {
  .resilience-guide-page {
    min-height: auto;
    padding: 18px;
  }

  .resilience-guide-page__shell {
    min-height: auto;
  }

  .resilience-guide-page__content {
    padding: 18px;
  }

  .resilience-guide-hero__title {
    font-size: 36px;
  }

  .resilience-guide-section__title {
    font-size: 26px;
  }
}
</style>
