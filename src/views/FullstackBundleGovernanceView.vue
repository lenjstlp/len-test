<template>
  <section class="bundle-governance-guide-page">
    <div class="bundle-governance-guide-page__shell">
      <div class="bundle-governance-guide-page__top">
        <RouterLink
          to="/fullstack-guide"
          class="bundle-governance-guide-page__back"
          aria-label="返回全栈能力菜单"
          title="返回全栈能力菜单"
        >
          <el-icon :size="18"><ArrowLeft /></el-icon>
        </RouterLink>
      </div>

      <div class="bundle-governance-guide-page__content">
        <header class="bundle-governance-guide-hero">
          <div>
            <p class="bundle-governance-guide-hero__eyebrow">
              Frontend Bundle Governance Engineering
            </p>
            <h1 class="bundle-governance-guide-hero__title">
              前端包体积治理工程
            </h1>
            <p class="bundle-governance-guide-hero__summary">
              包体积治理不是单纯“压缩一下代码”，而是围绕首屏加载、路由拆分、依赖选择、公共资源复用和缓存策略建立一整套工程闭环。真正有价值的目标是：让用户更快看到内容，让新增功能不再无节制地抬高所有人的加载成本。
            </p>
          </div>

          <div class="bundle-governance-guide-hero__panel">
            <p class="bundle-governance-guide-hero__label">学完结果</p>
            <ul class="bundle-governance-guide-list">
              <li>能判断包体积膨胀的来源是业务代码、依赖还是资源策略。</li>
              <li>能设计拆包、预加载、按需引入和缓存复用方案。</li>
              <li>能把 bundle 体积治理做成可持续的发布和回归指标。</li>
            </ul>
          </div>
        </header>

        <section class="bundle-governance-guide-grid">
          <article
            v-for="item in quickStages"
            :key="item.order"
            class="bundle-governance-guide-card"
          >
            <p class="bundle-governance-guide-card__eyebrow">
              Stage {{ item.order }}
            </p>
            <h2 class="bundle-governance-guide-card__title">
              {{ item.title }}
            </h2>
            <p class="bundle-governance-guide-card__text">
              {{ item.summary }}
            </p>
          </article>
        </section>

        <section class="bundle-governance-guide-section">
          <div class="bundle-governance-guide-section__head">
            <div>
              <p class="bundle-governance-guide-section__eyebrow">
                Decision Order
              </p>
              <h2 class="bundle-governance-guide-section__title">
                包体积治理先看来源，再决定拆分、替换还是延迟加载
              </h2>
            </div>
          </div>

          <div class="bundle-governance-guide-stack">
            <article
              v-for="stage in guideStages"
              :key="stage.order"
              class="bundle-governance-guide-panel is-wide"
            >
              <div class="bundle-governance-guide-method__head">
                <div>
                  <p class="bundle-governance-guide-panel__eyebrow">
                    Stage {{ stage.order }}
                  </p>
                  <h3 class="bundle-governance-guide-panel__title">
                    {{ stage.title }}
                  </h3>
                </div>
                <span class="bundle-governance-guide-method__tag">
                  {{ stage.tag }}
                </span>
              </div>

              <p class="bundle-governance-guide-panel__text">
                {{ stage.description }}
              </p>

              <div class="bundle-governance-guide-method__grid">
                <section class="bundle-governance-guide-mini-panel">
                  <p class="bundle-governance-guide-mini-panel__title">
                    适用场景
                  </p>
                  <ul class="bundle-governance-guide-list">
                    <li v-for="item in stage.bestFor" :key="item">
                      {{ item }}
                    </li>
                  </ul>
                </section>

                <section class="bundle-governance-guide-mini-panel">
                  <p class="bundle-governance-guide-mini-panel__title">
                    实现重点
                  </p>
                  <ul class="bundle-governance-guide-list">
                    <li v-for="item in stage.focus" :key="item">
                      {{ item }}
                    </li>
                  </ul>
                </section>

                <section class="bundle-governance-guide-mini-panel">
                  <p class="bundle-governance-guide-mini-panel__title">
                    常见误区
                  </p>
                  <ul class="bundle-governance-guide-list">
                    <li v-for="item in stage.risks" :key="item">
                      {{ item }}
                    </li>
                  </ul>
                </section>
              </div>

              <AppCodeBlock
                class="bundle-governance-guide-code-block"
                :code="stage.code"
                :lang="stage.language"
              />
            </article>
          </div>
        </section>

        <section class="bundle-governance-guide-section">
          <div class="bundle-governance-guide-section__head">
            <div>
              <p class="bundle-governance-guide-section__eyebrow">Comparison</p>
              <h2 class="bundle-governance-guide-section__title">
                什么时候该拆包，什么时候该换依赖，什么时候该删功能
              </h2>
            </div>
          </div>

          <div class="bundle-governance-guide-columns">
            <article
              v-for="item in comparisonCards"
              :key="item.title"
              class="bundle-governance-guide-panel"
            >
              <h3 class="bundle-governance-guide-panel__title">
                {{ item.title }}
              </h3>
              <p class="bundle-governance-guide-panel__text">
                {{ item.summary }}
              </p>
            </article>
          </div>
        </section>

        <section class="bundle-governance-guide-section">
          <div class="bundle-governance-guide-section__head">
            <div>
              <p class="bundle-governance-guide-section__eyebrow">Checklist</p>
              <h2 class="bundle-governance-guide-section__title">
                一套能持续生效的包体积治理清单
              </h2>
            </div>
          </div>

          <article class="bundle-governance-guide-panel is-wide">
            <ul class="bundle-governance-guide-list">
              <li>
                先建立基线：首屏 chunk、路由 chunk、公共 chunk
                和第三方依赖分别统计。
              </li>
              <li>对大依赖做替换评估，不要默认“已有依赖就是最优选择”。</li>
              <li>
                关键路由优先拆分，低频功能延后加载，避免所有用户为少数功能买单。
              </li>
              <li>发布后要看体积趋势图，而不是只看一次构建结果。</li>
              <li>把 bundle 体积当成持续指标，而不是偶发优化任务。</li>
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
    title: '先找体积来源',
    summary: '业务代码、第三方依赖、重复打包和静态资源是最常见的四类来源。',
  },
  {
    order: '02',
    title: '拆包要服务访问路径',
    summary: '拆分不是越碎越好，应该围绕首屏和高频路径组织。',
  },
  {
    order: '03',
    title: '依赖选择很关键',
    summary: '很多体积问题不是代码写法，而是选了过重的库。',
  },
  {
    order: '04',
    title: '缓存和预加载要配合',
    summary: '拆出去的包如果不会被复用，治理效果会打折。',
  },
  {
    order: '05',
    title: '体积要持续监控',
    summary: '一次性优化没意义，长期回归才是治理核心。',
  },
];

const guideStages = [
  {
    order: '01',
    title: '先建立体积基线：把问题拆到 chunk 和依赖层',
    tag: 'Baseline',
    description:
      '包体积治理最怕凭感觉。先把 bundle 拆到入口 chunk、路由 chunk、公共 chunk、第三方依赖和静态资源五层，才能知道膨胀到底来自业务代码、UI 库、工具库还是图片字体。没有基线，就没有优化方向。',
    bestFor: ['SPA 首屏优化', '大型后台系统', '多页面共享代码项目'],
    focus: [
      '输出构建产物分析报告',
      '统计每个 chunk 的占比和增长趋势',
      '区分首屏必须加载和可延迟加载的内容',
    ],
    risks: [
      '只看总包大小，不看入口和路由分布',
      '不知道是业务代码还是第三方依赖在膨胀',
      '没有版本对比，优化效果无法复盘',
    ],
    language: 'typescript',
    code: `const analyzeBundle = (stats: Array<{ name: string; size: number }>) => {
  return stats
    .map((item) => ({ ...item, kb: (item.size / 1024).toFixed(1) }))
    .sort((a, b) => b.size - a.size);
};`,
  },
  {
    order: '02',
    title: '按访问路径拆包，不要按“功能幻想”拆包',
    tag: 'Split by Route',
    description:
      '拆包的目标是减少首屏阻塞，而不是让目录看起来更整齐。真正有效的拆包方式，是围绕路由、入口场景和用户访问频率来组织代码。高频路径尽量轻，低频能力按需加载。这样才能把“用户马上要用的东西”先送到浏览器。',
    bestFor: ['路由型应用', '工作台产品', '存在明显低频功能的大型平台'],
    focus: [
      '首屏与低频功能分离',
      '高频页面使用稳定的公共 chunk',
      '低频页面用动态 import 延迟加载',
    ],
    risks: [
      '把功能域拆得很碎但首屏仍然很大',
      '过度拆包导致请求数暴涨',
      '拆包后没有预加载策略，切页体验反而变差',
    ],
    language: 'ts',
    code: `const EditorPage = () => import('@/pages/editor/EditorPage.vue')
const SettingsPage = () => import('@/pages/settings/SettingsPage.vue')`,
  },
  {
    order: '03',
    title: '大依赖先做替换评估，再谈优化技巧',
    tag: 'Dependency Choice',
    description:
      '很多包体积问题并不是“写法不够好”，而是依赖选得太重。比如一个只需要日期计算的场景，没必要引入整套时间库；只需要几个工具函数，也没必要把整库塞进来。优先做替换评估，往往比后期压缩更有效。',
    bestFor: ['工具型项目', '组件库项目', '对首屏成本敏感的业务'],
    focus: [
      '评估依赖是否有更轻的替代方案',
      '按能力引入而不是整库引入',
      '避免把通用库当万能胶水',
    ],
    risks: [
      '为了方便直接引入整包',
      '重复引入多个功能重叠的库',
      '把压缩当成替代依赖治理的手段',
    ],
    language: 'ts',
    code: `import { format } from 'date-fns/format'
import { parseISO } from 'date-fns/parseISO'`,
  },
  {
    order: '04',
    title: '缓存复用和预加载要一起做',
    tag: 'Reuse Strategy',
    description:
      '拆出去的包如果不能被复用，体积治理就只是“把问题挪地方”。合理的做法是让稳定依赖进入公共 chunk，让高概率访问的资源提前预加载，把真正低频的能力放到用户需要时再下载。这样既控制首屏，也控制重复加载。',
    bestFor: [
      '多页面跳转频繁的系统',
      '组件复用率高的产品',
      '存在明显用户路径的应用',
    ],
    focus: [
      '公共依赖单独缓存',
      '高概率跳转路由做预加载',
      '避免每个页面重新引入同一份大依赖',
    ],
    risks: [
      '拆包后每次跳转都重新下载',
      '缓存策略和构建策略互相冲突',
      '预加载过多，把省下来的成本又吃回去',
    ],
    language: 'ts',
    code: `const preloadRoute = (loader: () => Promise<unknown>) => {
  requestIdleCallback(() => {
    void loader();
  });
};`,
  },
  {
    order: '05',
    title: '把包体积纳入发布指标，而不是一次性优化任务',
    tag: 'Continuous Control',
    description:
      '治理能否长期有效，取决于有没有回归机制。每次发布都应该比对体积变化，超过阈值就回滚或阻断发布。只有把包体积当成持续指标，团队才不会在一个月后把优化成果全部加回去。',
    bestFor: ['持续交付团队', '大型迭代项目', '多人协作仓库'],
    focus: ['构建产物做版本对比', '设置体积告警阈值', '把增长原因写进发布说明'],
    risks: [
      '优化完没人跟踪回归',
      '新功能上线没人评估体积影响',
      '没有阈值，体积越长越大无人感知',
    ],
    language: 'ts',
    code: `const shouldBlockRelease = (sizeDeltaKb: number) => sizeDeltaKb > 200;`,
  },
];

const comparisonCards = [
  {
    title: '拆包 vs 压缩',
    summary:
      '拆包是在减少首屏和按需成本，压缩只是缩小同一份代码。前者解决结构问题，后者只能解决表面尺寸问题。',
  },
  {
    title: '替换依赖 vs 优化写法',
    summary:
      '有些体积问题是依赖选型导致的，改写法意义有限。先判断是“库太重”还是“写得太散”，方向不能搞反。',
  },
  {
    title: '预加载 vs 全量预取',
    summary:
      '预加载是把高概率资源提前送到浏览器，全量预取则可能白白浪费带宽。前者要围绕路径，后者通常是粗暴优化。',
  },
];
</script>

<style scoped>
.bundle-governance-guide-page {
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

.bundle-governance-guide-page__shell {
  min-height: calc(100vh - 90px);
  border: 1px solid rgba(19, 27, 34, 0.06);
  border-radius: 7px;
  background: rgba(255, 255, 255, 0.82);
}

.bundle-governance-guide-page__top {
  display: flex;
  justify-content: flex-start;
  padding: 18px 18px 0;
}

.bundle-governance-guide-page__back {
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

.bundle-governance-guide-page__back:hover {
  transform: translateY(-1px);
  border-color: rgba(46, 70, 91, 0.18);
  box-shadow: 0 18px 36px rgba(19, 27, 34, 0.08);
}

.bundle-governance-guide-page__content {
  padding: 18px 24px 24px;
}

.bundle-governance-guide-hero,
.bundle-governance-guide-panel,
.bundle-governance-guide-card {
  border: 1px solid rgba(19, 27, 34, 0.08);
  border-radius: 7px;
  background: #fff;
  box-shadow: 0 24px 60px rgba(15, 23, 42, 0.05);
}

.bundle-governance-guide-hero {
  display: grid;
  grid-template-columns: minmax(0, 1.6fr) minmax(260px, 0.8fr);
  gap: 20px;
  padding: 28px;
}

.bundle-governance-guide-hero__eyebrow,
.bundle-governance-guide-section__eyebrow,
.bundle-governance-guide-card__eyebrow,
.bundle-governance-guide-panel__eyebrow,
.bundle-governance-guide-hero__label,
.bundle-governance-guide-method__tag,
.bundle-governance-guide-mini-panel__title {
  font-size: 11px;
  line-height: 1.4;
  letter-spacing: 0.24em;
  text-transform: uppercase;
  color: #7b8794;
}

.bundle-governance-guide-hero__title {
  margin-top: 10px;
  font-size: 42px;
  line-height: 1.08;
  font-weight: 600;
  letter-spacing: -0.04em;
  color: #16202a;
}

.bundle-governance-guide-hero__summary {
  margin-top: 16px;
  max-width: 820px;
  font-size: 15px;
  line-height: 1.9;
  color: #52606d;
}

.bundle-governance-guide-hero__panel {
  align-self: stretch;
  padding: 22px;
  border: 1px solid rgba(19, 27, 34, 0.08);
  border-radius: 7px;
  background: linear-gradient(180deg, #fbfcfd 0%, #f4f7fa 100%);
}

.bundle-governance-guide-grid {
  display: grid;
  grid-template-columns: repeat(5, minmax(0, 1fr));
  gap: 16px;
}

.bundle-governance-guide-card {
  padding: 20px;
}

.bundle-governance-guide-card__title,
.bundle-governance-guide-panel__title,
.bundle-governance-guide-section__title {
  color: #16202a;
}

.bundle-governance-guide-card__title {
  margin-top: 10px;
  font-size: 20px;
  line-height: 1.35;
  font-weight: 600;
}

.bundle-governance-guide-card__text,
.bundle-governance-guide-panel__text,
.bundle-governance-guide-list {
  font-size: 14px;
  line-height: 1.9;
  color: #52606d;
}

.bundle-governance-guide-section {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.bundle-governance-guide-section__title {
  margin-top: 8px;
  font-size: 28px;
  line-height: 1.25;
  font-weight: 600;
  letter-spacing: -0.03em;
}

.bundle-governance-guide-stack,
.bundle-governance-guide-columns {
  display: grid;
  gap: 16px;
}

.bundle-governance-guide-columns {
  grid-template-columns: repeat(3, minmax(0, 1fr));
}

.bundle-governance-guide-panel {
  padding: 24px;
}

.bundle-governance-guide-panel.is-wide {
  padding: 26px;
}

.bundle-governance-guide-method__head {
  display: flex;
  align-items: start;
  justify-content: space-between;
  gap: 16px;
}

.bundle-governance-guide-method__tag {
  display: inline-flex;
  align-items: center;
  min-height: 32px;
  padding: 0 12px;
  border: 1px solid rgba(19, 27, 34, 0.08);
  border-radius: 999px;
  background: #f5f8fa;
}

.bundle-governance-guide-panel__text {
  margin-top: 14px;
}

.bundle-governance-guide-method__grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 14px;
  margin-top: 18px;
}

.bundle-governance-guide-mini-panel {
  padding: 18px;
  border: 1px solid rgba(19, 27, 34, 0.08);
  border-radius: 7px;
  background: linear-gradient(180deg, #fdfefe 0%, #f7fafc 100%);
}

.bundle-governance-guide-list {
  margin: 12px 0 0;
  padding-left: 18px;
}

.bundle-governance-guide-code-block {
  margin-top: 18px;
}

@media (max-width: 1180px) {
  .bundle-governance-guide-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .bundle-governance-guide-columns,
  .bundle-governance-guide-method__grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 900px) {
  .bundle-governance-guide-hero {
    grid-template-columns: 1fr;
    padding: 22px;
  }

  .bundle-governance-guide-hero__title {
    font-size: 34px;
  }

  .bundle-governance-guide-grid {
    grid-template-columns: 1fr;
  }

  .bundle-governance-guide-panel,
  .bundle-governance-guide-panel.is-wide,
  .bundle-governance-guide-card {
    padding: 20px;
  }
}
</style>
