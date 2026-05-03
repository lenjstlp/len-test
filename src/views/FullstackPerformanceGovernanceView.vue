<template>
  <section class="performance-governance-guide-page">
    <div class="performance-governance-guide-page__shell">
      <div class="performance-governance-guide-page__top">
        <RouterLink
          to="/fullstack-guide"
          class="performance-governance-guide-page__back"
          aria-label="返回全栈能力菜单"
          title="返回全栈能力菜单"
        >
          <el-icon :size="18"><ArrowLeft /></el-icon>
        </RouterLink>
      </div>

      <div class="performance-governance-guide-page__content">
        <header class="performance-governance-guide-hero">
          <div>
            <p class="performance-governance-guide-hero__eyebrow">
              Frontend Performance Governance
            </p>
            <h1 class="performance-governance-guide-hero__title">
              前端性能治理工程
            </h1>
            <p class="performance-governance-guide-hero__summary">
              这一页讲的不是零散优化技巧，而是怎样把性能变成一套能持续运转的工程体系：先定义指标，再拆问题类型，接着建立优化责任、性能预算、回归检测和监控闭环。真正成熟的团队，不是某次把页面优化快了，而是每次迭代都知道自己有没有把性能变差。
            </p>
          </div>

          <div class="performance-governance-guide-hero__panel">
            <p class="performance-governance-guide-hero__label">学完结果</p>
            <ul class="performance-governance-guide-list">
              <li>能区分加载性能、渲染性能、交互性能和长期治理。</li>
              <li>能建立性能预算、回归检查和线上监控的闭环。</li>
              <li>能让性能优化从“救火”变成“制度化约束”。</li>
            </ul>
          </div>
        </header>

        <section class="performance-governance-guide-grid">
          <article
            v-for="item in quickStages"
            :key="item.order"
            class="performance-governance-guide-card"
          >
            <p class="performance-governance-guide-card__eyebrow">
              Stage {{ item.order }}
            </p>
            <h2 class="performance-governance-guide-card__title">
              {{ item.title }}
            </h2>
            <p class="performance-governance-guide-card__text">
              {{ item.summary }}
            </p>
          </article>
        </section>

        <section class="performance-governance-guide-section">
          <div class="performance-governance-guide-section__head">
            <div>
              <p class="performance-governance-guide-section__eyebrow">
                Decision Order
              </p>
              <h2 class="performance-governance-guide-section__title">
                性能治理先定指标，再定责任，再定手段
              </h2>
            </div>
          </div>

          <div class="performance-governance-guide-stack">
            <article
              v-for="stage in guideStages"
              :key="stage.order"
              class="performance-governance-guide-panel is-wide"
            >
              <div class="performance-governance-guide-method__head">
                <div>
                  <p class="performance-governance-guide-panel__eyebrow">
                    Stage {{ stage.order }}
                  </p>
                  <h3 class="performance-governance-guide-panel__title">
                    {{ stage.title }}
                  </h3>
                </div>
                <span class="performance-governance-guide-method__tag">
                  {{ stage.tag }}
                </span>
              </div>

              <p class="performance-governance-guide-panel__text">
                {{ stage.description }}
              </p>

              <div class="performance-governance-guide-method__grid">
                <section class="performance-governance-guide-mini-panel">
                  <p class="performance-governance-guide-mini-panel__title">
                    适用场景
                  </p>
                  <ul class="performance-governance-guide-list">
                    <li v-for="item in stage.bestFor" :key="item">
                      {{ item }}
                    </li>
                  </ul>
                </section>

                <section class="performance-governance-guide-mini-panel">
                  <p class="performance-governance-guide-mini-panel__title">
                    实现重点
                  </p>
                  <ul class="performance-governance-guide-list">
                    <li v-for="item in stage.focus" :key="item">
                      {{ item }}
                    </li>
                  </ul>
                </section>

                <section class="performance-governance-guide-mini-panel">
                  <p class="performance-governance-guide-mini-panel__title">
                    常见误区
                  </p>
                  <ul class="performance-governance-guide-list">
                    <li v-for="item in stage.risks" :key="item">
                      {{ item }}
                    </li>
                  </ul>
                </section>
              </div>

              <AppCodeBlock
                class="performance-governance-guide-code-block"
                :code="stage.code"
                :lang="stage.language"
              />
            </article>
          </div>
        </section>

        <section class="performance-governance-guide-section">
          <div class="performance-governance-guide-section__head">
            <div>
              <p class="performance-governance-guide-section__eyebrow">
                Comparison
              </p>
              <h2 class="performance-governance-guide-section__title">
                优化、预算、监控和回归检查各自管什么
              </h2>
            </div>
          </div>

          <div class="performance-governance-guide-columns">
            <article
              v-for="item in comparisonCards"
              :key="item.title"
              class="performance-governance-guide-panel"
            >
              <h3 class="performance-governance-guide-panel__title">
                {{ item.title }}
              </h3>
              <p class="performance-governance-guide-panel__text">
                {{ item.summary }}
              </p>
            </article>
          </div>
        </section>

        <section class="performance-governance-guide-section">
          <div class="performance-governance-guide-section__head">
            <div>
              <p class="performance-governance-guide-section__eyebrow">
                Best Practice
              </p>
              <h2 class="performance-governance-guide-section__title">
                一套能持续运转的性能治理骨架
              </h2>
            </div>
          </div>

          <article class="performance-governance-guide-panel is-wide">
            <p class="performance-governance-guide-panel__text">
              真正能长期维护的性能工程，必须把“谁来负责”“什么时候报警”“超标后怎么追责”也一起设计进去。下面这套骨架把路由级指标、预算检查和持续监控统一到一个最小闭环里。
            </p>

            <AppCodeBlock
              class="performance-governance-guide-code-block"
              :code="performanceBudgetCode"
              lang="typescript"
            />
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
    title: '先定义指标',
    summary: '没有指标就没有治理，性能优化会退化成主观感觉。',
  },
  {
    order: '02',
    title: '再划分责任',
    summary: '性能问题要落到页面、接口、组件和基础设施的责任边界里。',
  },
  {
    order: '03',
    title: '建立预算',
    summary: '首包大小、渲染耗时和长任务阈值都应该可度量、可约束。',
  },
  {
    order: '04',
    title: '做回归检查',
    summary: '每次发版都要知道性能有没有被退化。',
  },
  {
    order: '05',
    title: '持续监控',
    summary: '线上真实用户数据才是治理是否有效的最终证明。',
  },
];

const guideStages = [
  {
    order: '01',
    title: '先把“性能治理”从“性能优化”里分出来',
    tag: '治理思维',
    description:
      '性能优化通常是一次性的手术，性能治理则是长期制度。优化更多解决“这次为什么慢”，治理解决的是“以后怎么不再慢”。如果没有预算、检查和监控，性能优化很快就会在下一轮迭代里被抵消。成熟团队真正要建设的是一个持续工作的约束系统，而不是某个临时优化技巧。',
    bestFor: ['中大型前端项目', '持续迭代产品', '多人协作团队'],
    focus: [
      '把性能从技巧上升为制度',
      '优化动作对应可量化指标',
      '让治理覆盖设计、开发、发布、监控全链路',
    ],
    risks: [
      '只在出问题后救火',
      '优化没有前后对照数据',
      '团队里没人对性能结果负责',
    ],
    language: 'text',
    code: `Performance Governance = Measure + Budget + Guard + Observe`,
  },
  {
    order: '02',
    title: '建立性能预算：让性能变成可约束的工程指标',
    tag: '预算管理',
    description:
      '性能预算的作用，是在问题进入线上之前就把边界卡住。比如首包 JS 上限、LCP 目标、长任务阈值、图片总量、首页请求数等。这些不是“希望尽量做到”的建议，而是构建、评审和发版时都应该被检查的约束。没有预算，就没有回归判断标准。',
    bestFor: ['首页治理', '大屏后台', '营销页', '持续交付项目'],
    focus: [
      '给首包、资源数、加载时长设上限',
      '把预算写进 CI 或发布检查',
      '不同页面类型使用不同预算标准',
    ],
    risks: [
      '预算只写文档，不进流程',
      '所有页面用同一个性能阈值',
      '预算超标了也没人拦截',
    ],
    language: 'ts',
    code: `type PerformanceBudget = {
  lcpMs: number;
  jsBundleKb: number;
  longTaskMs: number;
};

const dashboardBudget: PerformanceBudget = {
  lcpMs: 2500,
  jsBundleKb: 300,
  longTaskMs: 50,
};`,
  },
  {
    order: '03',
    title: '回归检测要自动化，不要靠人工肉眼对比',
    tag: '回归检查',
    description:
      '性能是否退化，最怕靠感觉。更稳妥的办法，是在 CI 或预发阶段做自动化检测，把关键页面的指标和预算做比较。只要指标超标，就拦截发版或标记风险。这样性能问题不会等到用户投诉才被发现，也不会因为“看起来差不多”而被带过去。',
    bestFor: ['CI/CD', '预发环境', '迭代频繁的产品'],
    focus: [
      '把关键页面加入自动化性能检测',
      '发版前对比指标变化',
      '只对显著退化触发阻断或告警',
    ],
    risks: [
      '只做一次手工测速',
      '测完不存档，没法回看趋势',
      '超标后没有明确处理流程',
    ],
    language: 'typescript',
    code: `const compareBudget = (current: PerformanceBudget, baseline: PerformanceBudget) => {
  return {
    lcpRegression: current.lcpMs - baseline.lcpMs,
    bundleRegression: current.jsBundleKb - baseline.jsBundleKb,
    longTaskRegression: current.longTaskMs - baseline.longTaskMs,
  };
};`,
  },
  {
    order: '04',
    title: '线上监控要能发现真实用户的退化趋势',
    tag: '持续观察',
    description:
      '本地调优只能说明你在自己的机器上快了，真正决定治理效果的，是线上真实用户数据是否改善。需要持续收集不同设备、不同网络、不同页面的性能分布，结合版本和路由看趋势。只有这样，优化才不会停留在“这次做完了”，而是能看到长期收益。',
    bestFor: ['真实用户监控', '多设备兼容', '版本趋势分析'],
    focus: [
      '采集真实用户的核心性能指标',
      '按路由、版本、设备维度聚合',
      '建立趋势面板和退化告警',
    ],
    risks: [
      '只看本地浏览器跑分',
      '没有分版本和路由的聚合视角',
      '上线后没有持续观察窗口',
    ],
    language: 'ts',
    code: `window.addEventListener('load', () => {
  const metrics = performance.getEntriesByType('navigation')[0];
  navigator.sendBeacon('/api/perf', JSON.stringify({
    route: location.pathname,
    dcl: metrics.domContentLoadedEventEnd - metrics.startTime,
  }));
});`,
  },
];

const comparisonCards = [
  {
    title: '优化',
    summary: '解决单次问题，通常围绕某个页面、某个资源或某个交互点展开。',
  },
  {
    title: '预算',
    summary: '定义允许的性能边界，把性能从“建议”变成“可约束指标”。',
  },
  {
    title: '监控',
    summary: '持续采集真实用户数据，确认优化有没有被后续迭代抵消。',
  },
];

const performanceBudgetCode = `const shouldBlockRelease = (current: PerformanceBudget, budget: PerformanceBudget) => {
  return (
    current.lcpMs > budget.lcpMs ||
    current.jsBundleKb > budget.jsBundleKb ||
    current.longTaskMs > budget.longTaskMs
  );
};

if (shouldBlockRelease(currentMetrics, dashboardBudget)) {
  throw new Error('Performance budget exceeded');
}`;
</script>

<style scoped>
.performance-governance-guide-page {
  min-height: calc(100vh - 40px);
  padding: 24px;
  border: 1px solid rgba(19, 27, 34, 0.08);
  border-radius: 7px;
  background:
    radial-gradient(
      circle at top right,
      rgba(223, 229, 236, 0.5),
      transparent 30%
    ),
    linear-gradient(180deg, #fbfcfd 0%, #f3f6f8 100%);
  box-shadow: 0 30px 80px rgba(18, 26, 34, 0.08);
}

.performance-governance-guide-page__shell {
  min-height: calc(100vh - 88px);
  display: flex;
  flex-direction: column;
}

.performance-governance-guide-page__top {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 22px;
}

.performance-governance-guide-page__back {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 38px;
  height: 38px;
  border: 1px solid rgba(19, 27, 34, 0.08);
  border-radius: 50%;
  color: #18212a;
  background: rgba(255, 255, 255, 0.88);
  text-decoration: none;
  transition:
    transform 160ms ease,
    border-color 160ms ease,
    box-shadow 160ms ease;
}

.performance-governance-guide-page__back:hover {
  transform: translateY(-1px);
  border-color: rgba(43, 72, 101, 0.2);
  box-shadow: 0 18px 36px rgba(17, 24, 39, 0.08);
}

.performance-governance-guide-page__content {
  display: flex;
  flex-direction: column;
  gap: 22px;
}

.performance-governance-guide-hero,
.performance-governance-guide-panel,
.performance-governance-guide-card {
  border: 1px solid rgba(19, 27, 34, 0.08);
  border-radius: 7px;
  background: #fff;
  box-shadow: 0 24px 60px rgba(15, 23, 42, 0.05);
}

.performance-governance-guide-hero {
  display: grid;
  grid-template-columns: minmax(0, 1.6fr) minmax(260px, 0.8fr);
  gap: 20px;
  padding: 28px;
}

.performance-governance-guide-hero__eyebrow,
.performance-governance-guide-section__eyebrow,
.performance-governance-guide-card__eyebrow,
.performance-governance-guide-panel__eyebrow,
.performance-governance-guide-hero__label,
.performance-governance-guide-method__tag,
.performance-governance-guide-mini-panel__title {
  font-size: 11px;
  line-height: 1.4;
  letter-spacing: 0.24em;
  text-transform: uppercase;
  color: #7b8794;
}

.performance-governance-guide-hero__title {
  margin-top: 10px;
  font-size: 42px;
  line-height: 1.08;
  font-weight: 600;
  letter-spacing: -0.04em;
  color: #16202a;
}

.performance-governance-guide-hero__summary {
  margin-top: 16px;
  max-width: 820px;
  font-size: 15px;
  line-height: 1.9;
  color: #52606d;
}

.performance-governance-guide-hero__panel {
  align-self: stretch;
  padding: 22px;
  border: 1px solid rgba(19, 27, 34, 0.08);
  border-radius: 7px;
  background: linear-gradient(180deg, #fbfcfd 0%, #f4f7fa 100%);
}

.performance-governance-guide-grid {
  display: grid;
  grid-template-columns: repeat(5, minmax(0, 1fr));
  gap: 16px;
}

.performance-governance-guide-card {
  padding: 20px;
}

.performance-governance-guide-card__title,
.performance-governance-guide-panel__title,
.performance-governance-guide-section__title {
  color: #16202a;
}

.performance-governance-guide-card__title {
  margin-top: 10px;
  font-size: 20px;
  line-height: 1.35;
  font-weight: 600;
}

.performance-governance-guide-card__text,
.performance-governance-guide-panel__text,
.performance-governance-guide-list {
  font-size: 14px;
  line-height: 1.9;
  color: #52606d;
}

.performance-governance-guide-section {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.performance-governance-guide-section__title {
  margin-top: 8px;
  font-size: 28px;
  line-height: 1.25;
  font-weight: 600;
  letter-spacing: -0.03em;
}

.performance-governance-guide-stack,
.performance-governance-guide-columns {
  display: grid;
  gap: 16px;
}

.performance-governance-guide-columns {
  grid-template-columns: repeat(3, minmax(0, 1fr));
}

.performance-governance-guide-panel {
  padding: 24px;
}

.performance-governance-guide-panel.is-wide {
  padding: 26px;
}

.performance-governance-guide-method__head {
  display: flex;
  align-items: start;
  justify-content: space-between;
  gap: 16px;
}

.performance-governance-guide-method__tag {
  display: inline-flex;
  align-items: center;
  min-height: 32px;
  padding: 0 12px;
  border: 1px solid rgba(19, 27, 34, 0.08);
  border-radius: 999px;
  background: #f5f8fa;
}

.performance-governance-guide-panel__text {
  margin-top: 14px;
}

.performance-governance-guide-method__grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 14px;
  margin-top: 18px;
}

.performance-governance-guide-mini-panel {
  padding: 18px;
  border: 1px solid rgba(19, 27, 34, 0.08);
  border-radius: 7px;
  background: linear-gradient(180deg, #fdfefe 0%, #f7fafc 100%);
}

.performance-governance-guide-list {
  margin: 12px 0 0;
  padding-left: 18px;
}

.performance-governance-guide-code-block {
  margin-top: 18px;
}

@media (max-width: 1180px) {
  .performance-governance-guide-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .performance-governance-guide-columns,
  .performance-governance-guide-method__grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 900px) {
  .performance-governance-guide-hero {
    grid-template-columns: 1fr;
    padding: 22px;
  }

  .performance-governance-guide-hero__title {
    font-size: 34px;
  }

  .performance-governance-guide-grid {
    grid-template-columns: 1fr;
  }

  .performance-governance-guide-panel,
  .performance-governance-guide-panel.is-wide,
  .performance-governance-guide-card {
    padding: 20px;
  }
}
</style>
