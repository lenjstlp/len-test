<template>
  <section class="feature-flags-guide-page">
    <div class="feature-flags-guide-page__shell">
      <div class="feature-flags-guide-page__top">
        <RouterLink
          to="/fullstack-guide"
          class="feature-flags-guide-page__back"
          aria-label="返回全栈能力菜单"
          title="返回全栈能力菜单"
        >
          <el-icon :size="18"><ArrowLeft /></el-icon>
        </RouterLink>
      </div>

      <div class="feature-flags-guide-page__content">
        <header class="feature-flags-guide-hero">
          <div>
            <p class="feature-flags-guide-hero__eyebrow">
              Frontend Feature Flags
            </p>
            <h1 class="feature-flags-guide-hero__title">前端特性开关能力</h1>
            <p class="feature-flags-guide-hero__summary">
              这一页按真实项目建设特性开关的顺序来讲：先判断哪些能力需要开关，再处理开关模型、客户端拉取策略、灰度范围、回滚链路、埋点观测和生命周期治理。重点不是写几个
              `if`，而是让发布、实验、租户差异和风险控制真正可操作。
            </p>
          </div>

          <div class="feature-flags-guide-hero__panel">
            <p class="feature-flags-guide-hero__label">学完结果</p>
            <ul class="feature-flags-guide-list">
              <li>能分清环境变量、配置项和特性开关各自适用的边界。</li>
              <li>能设计按用户、租户、区域和版本控制的灰度开关策略。</li>
              <li>能把回滚、埋点、实验分析和开关清理纳入同一套治理流程。</li>
            </ul>
          </div>
        </header>

        <section class="feature-flags-guide-grid">
          <article
            v-for="item in quickStages"
            :key="item.order"
            class="feature-flags-guide-card"
          >
            <p class="feature-flags-guide-card__eyebrow">
              Stage {{ item.order }}
            </p>
            <h2 class="feature-flags-guide-card__title">{{ item.title }}</h2>
            <p class="feature-flags-guide-card__text">{{ item.summary }}</p>
          </article>
        </section>

        <section class="feature-flags-guide-section">
          <div class="feature-flags-guide-section__head">
            <div>
              <p class="feature-flags-guide-section__eyebrow">Decision Order</p>
              <h2 class="feature-flags-guide-section__title">
                特性开关先定义风险场景，再建设灰度与治理闭环
              </h2>
            </div>
          </div>

          <div class="feature-flags-guide-stack">
            <article
              v-for="stage in guideStages"
              :key="stage.order"
              class="feature-flags-guide-panel is-wide"
            >
              <div class="feature-flags-guide-method__head">
                <div>
                  <p class="feature-flags-guide-panel__eyebrow">
                    Stage {{ stage.order }}
                  </p>
                  <h3 class="feature-flags-guide-panel__title">
                    {{ stage.title }}
                  </h3>
                </div>
                <span class="feature-flags-guide-method__tag">
                  {{ stage.tag }}
                </span>
              </div>

              <p class="feature-flags-guide-panel__text">
                {{ stage.description }}
              </p>

              <div class="feature-flags-guide-method__grid">
                <section class="feature-flags-guide-mini-panel">
                  <p class="feature-flags-guide-mini-panel__title">适用场景</p>
                  <ul class="feature-flags-guide-list">
                    <li v-for="item in stage.bestFor" :key="item">
                      {{ item }}
                    </li>
                  </ul>
                </section>

                <section class="feature-flags-guide-mini-panel">
                  <p class="feature-flags-guide-mini-panel__title">实现重点</p>
                  <ul class="feature-flags-guide-list">
                    <li v-for="item in stage.focus" :key="item">
                      {{ item }}
                    </li>
                  </ul>
                </section>

                <section class="feature-flags-guide-mini-panel">
                  <p class="feature-flags-guide-mini-panel__title">常见误区</p>
                  <ul class="feature-flags-guide-list">
                    <li v-for="item in stage.risks" :key="item">
                      {{ item }}
                    </li>
                  </ul>
                </section>
              </div>

              <AppCodeBlock
                class="feature-flags-guide-code-block"
                :code="stage.code"
                :lang="stage.language"
              />
            </article>
          </div>
        </section>

        <section class="feature-flags-guide-section">
          <div class="feature-flags-guide-section__head">
            <div>
              <p class="feature-flags-guide-section__eyebrow">Comparison</p>
              <h2 class="feature-flags-guide-section__title">
                特性开关最关键的几组取舍
              </h2>
            </div>
          </div>

          <div class="feature-flags-guide-columns">
            <article
              v-for="item in comparisonCards"
              :key="item.title"
              class="feature-flags-guide-panel"
            >
              <h3 class="feature-flags-guide-panel__title">{{ item.title }}</h3>
              <p class="feature-flags-guide-panel__text">{{ item.summary }}</p>
            </article>
          </div>
        </section>

        <section class="feature-flags-guide-section">
          <div class="feature-flags-guide-section__head">
            <div>
              <p class="feature-flags-guide-section__eyebrow">Checklist</p>
              <h2 class="feature-flags-guide-section__title">
                一套能落地的前端特性开关清单
              </h2>
            </div>
          </div>

          <article class="feature-flags-guide-panel is-wide">
            <ul class="feature-flags-guide-list">
              <li>先识别哪些能力真的需要灰度、实验或紧急回滚，再引入开关。</li>
              <li>开关命名、默认值、作用范围和过期时间都要结构化管理。</li>
              <li>
                客户端拉取、缓存、兜底和首屏默认态必须提前设计，避免闪烁和误判。
              </li>
              <li>
                实验开关必须和埋点、用户分桶、结果分析一起存在，不能只开不看。
              </li>
              <li>
                每个开关都要有清理计划，长期不下线的开关会把代码拖成分叉森林。
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
    title: '先界定开关用途',
    summary:
      '特性开关不是任何配置都能装，先区分灰度、实验、应急回滚和租户差异。',
  },
  {
    order: '02',
    title: '作用范围要明确',
    summary: '同一个开关到底按用户、租户、地区还是版本生效，必须先定义清楚。',
  },
  {
    order: '03',
    title: '首屏策略要稳定',
    summary: '客户端什么时候拿到开关、没拿到时显示什么，直接决定体验是否闪烁。',
  },
  {
    order: '04',
    title: '实验与回滚要闭环',
    summary: '有开关还不够，还要有埋点分析和一键关停能力。',
  },
  {
    order: '05',
    title: '开关需要生命周期',
    summary: '长期不清理的开关会让代码分支失控，治理成本会越来越高。',
  },
];

const guideStages = [
  {
    order: '01',
    title: '先判断这是不是特性开关问题，而不是环境变量或普通配置问题',
    tag: '问题建模',
    description:
      '很多团队会把所有动态配置都叫特性开关，结果系统边界越来越乱。真正适合用特性开关的，一般是需要灰度发布、用户分桶、A/B 实验、租户差异开关或紧急回滚的能力。如果只是固定环境差异，更适合环境变量；如果是常驻业务配置，更适合配置中心。特性开关应该服务“可控变化”，而不是变成杂物柜。',
    bestFor: ['灰度发布', 'A/B 实验', '紧急回滚', '租户功能差异'],
    focus: [
      '区分特性开关、环境变量和普通配置',
      '明确开关要解决的是风险控制还是常驻差异',
      '避免把所有动态值都塞进开关系统',
    ],
    risks: [
      '环境变量和特性开关混用',
      '把静态配置也做成远程开关',
      '开关系统沦为杂项配置仓库',
    ],
    language: 'text',
    code: `Flag Decision
- 需要灰度发布吗？
- 需要按用户/租户/地区做差异吗？
- 需要紧急一键回滚吗？
- 如果不是，优先考虑环境变量或普通配置`,
  },
  {
    order: '02',
    title: '每个开关都要定义范围、默认值和过期时间，不能只起个名字就上线',
    tag: '模型设计',
    description:
      '一个能用的开关，不只是 `featureX = true/false`。至少要定义开关键名、默认值、作用对象、依赖环境、负责人、预期下线时间和失败兜底策略。没有这些元数据，开关数量一多，团队很快就没人知道它是干什么的、还能不能删、误关会影响谁。',
    bestFor: ['多人团队', '长期维护系统', '需要频繁试验的产品'],
    focus: [
      '开关模型包含元数据和默认策略',
      '作用范围支持用户、租户、区域、版本等维度',
      '所有开关都有过期与下线责任人',
    ],
    risks: [
      '开关只有名字没有说明',
      '没有默认值和兜底逻辑',
      '历史开关越积越多没人敢删',
    ],
    language: 'ts',
    code: `type FeatureFlag = {
  key: string
  defaultValue: boolean
  scope: 'global' | 'tenant' | 'user' | 'region'
  owner: string
  expiresAt: string
}`,
  },
  {
    order: '03',
    title: '客户端拉取策略和首屏兜底要先设计，不然页面会闪和误判',
    tag: '加载策略',
    description:
      '前端特性开关最大的体验风险，是首屏还没拿到开关就先渲染了错误内容，随后又被远程值打回来。更稳的做法是按能力重要性区分：关键能力可在应用启动期拉取并阻塞最小初始化；次要能力可以懒拉取；任何远程失败都要回退到明确默认值。否则用户看到的就是闪烁、重排和行为不一致。',
    bestFor: ['单页应用', '高频访问后台', '需要动态灰度的前端项目'],
    focus: [
      '区分启动期拉取和懒加载拉取',
      '定义远程失败时的默认值与缓存策略',
      '避免首屏渲染和开关回写之间的闪烁',
    ],
    risks: [
      '页面先渲染后反复切换状态',
      '网络失败时没有默认值',
      '所有开关都阻塞启动导致首屏过慢',
    ],
    language: 'ts',
    code: `const flagState = await fetchFeatureFlags().catch(() => ({
  enableAiDraft: false,
  enableNewDashboard: false,
}))

app.provide('featureFlags', flagState)`,
  },
  {
    order: '04',
    title: '实验开关必须和分桶、埋点、分析一起存在，不能只开不验',
    tag: '实验治理',
    description:
      '很多团队做了开关，却没有做实验闭环，结果只是把风险控制住了，却没有拿到任何决策数据。真正有用的实验开关，需要稳定分桶、用户一致性、曝光埋点、行为转化指标和结果归因。否则 A/B 实验只是 UI 随机变化，而不是可分析的产品实验。',
    bestFor: ['产品试验', '转化优化', '推荐与导购场景', '功能灰度验证'],
    focus: [
      '同一用户始终命中同一桶',
      '开关曝光和行为事件要成对埋点',
      '结果分析要能回溯到开关版本与人群',
    ],
    risks: [
      '刷新一次就换桶',
      '只做功能差异不做曝光埋点',
      '实验结束后没有结论沉淀',
    ],
    language: 'ts',
    code: `const bucket = hashUser(userId) % 100
const enableNewFlow = bucket < 10

track('flag_exposure', {
  key: 'new_checkout_flow',
  enabled: enableNewFlow,
  bucket,
})`,
  },
  {
    order: '05',
    title: '开关的终点一定是删除，不是永久留在代码里',
    tag: '工程治理',
    description:
      '特性开关最容易被忽视的一点，是它们应该有生命周期。上线后验证通过的开关要尽快固化为常规逻辑并删掉分支；失效的试验要回收；长期保留的租户差异要升级为正式配置能力。否则代码里会堆满 if/else、双份组件和不再有人理解的历史分叉。',
    bestFor: ['长期演进项目', '多人协作仓库', '高频发版团队'],
    focus: [
      '建立开关审计与定期清理机制',
      '让过期开关进入告警或报表',
      '成功开关尽快收口为稳定逻辑',
    ],
    risks: [
      '历史开关常年挂在代码里',
      '没人知道哪些开关还在生效',
      '分支逻辑越来越多导致维护失控',
    ],
    language: 'yaml',
    code: `feature-flag-audit:
  frequency: weekly
  checks:
    - expired flags
    - flags without owner
    - flags enabled for 100% users`,
  },
];

const comparisonCards = [
  {
    title: '环境变量 vs 特性开关',
    summary:
      '环境变量更适合构建期或环境级差异；特性开关更适合运行期灰度、实验和紧急回滚。两者混用会让边界失控。',
  },
  {
    title: '简单布尔值 vs 完整开关模型',
    summary:
      '只存 true/false 很快不够用。真正可治理的开关必须有范围、默认值、负责人、失效时间和兜底策略。',
  },
  {
    title: '快速上线 vs 生命周期治理',
    summary:
      '开关最初会提升交付灵活性，但如果没有清理机制，后续会把代码拖进长期分叉和认知债务。',
  },
];
</script>

<style scoped>
.feature-flags-guide-page {
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

.feature-flags-guide-page__shell {
  min-height: calc(100vh - 90px);
  border: 1px solid rgba(19, 27, 34, 0.06);
  border-radius: 7px;
  background: rgba(255, 255, 255, 0.82);
}

.feature-flags-guide-page__top {
  display: flex;
  justify-content: flex-start;
  padding: 18px 18px 0;
}

.feature-flags-guide-page__back {
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

.feature-flags-guide-page__back:hover {
  transform: translateY(-1px);
  border-color: rgba(46, 70, 91, 0.18);
  box-shadow: 0 18px 34px rgba(19, 27, 34, 0.08);
}

.feature-flags-guide-page__content {
  padding: 18px 24px 24px;
}

.feature-flags-guide-hero {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 320px;
  gap: 20px;
  padding-bottom: 26px;
  border-bottom: 1px solid rgba(19, 27, 34, 0.08);
}

.feature-flags-guide-hero__eyebrow,
.feature-flags-guide-section__eyebrow,
.feature-flags-guide-card__eyebrow,
.feature-flags-guide-hero__label {
  font-size: 11px;
  line-height: 1.4;
  letter-spacing: 0.24em;
  text-transform: uppercase;
  color: #7b8793;
}

.feature-flags-guide-hero__title {
  margin-top: 10px;
  font-size: 46px;
  line-height: 1.06;
  font-weight: 600;
  letter-spacing: -0.05em;
  color: #17202a;
}

.feature-flags-guide-hero__summary {
  max-width: 860px;
  margin-top: 16px;
  font-size: 15px;
  line-height: 1.9;
  color: #58636f;
}

.feature-flags-guide-hero__panel,
.feature-flags-guide-card,
.feature-flags-guide-panel {
  border: 1px solid rgba(19, 27, 34, 0.08);
  border-radius: 7px;
  background: rgba(255, 255, 255, 0.84);
}

.feature-flags-guide-hero__panel {
  padding: 18px;
}

.feature-flags-guide-list {
  display: grid;
  gap: 8px;
  margin: 12px 0 0;
  padding-left: 18px;
  font-size: 14px;
  line-height: 1.8;
  color: #56616d;
}

.feature-flags-guide-grid,
.feature-flags-guide-columns,
.feature-flags-guide-stack {
  display: grid;
  gap: 16px;
}

.feature-flags-guide-grid {
  margin-top: 28px;
  grid-template-columns: repeat(3, minmax(0, 1fr));
}

.feature-flags-guide-card {
  padding: 18px;
}

.feature-flags-guide-card__title,
.feature-flags-guide-panel__title,
.feature-flags-guide-section__title {
  color: #17202a;
}

.feature-flags-guide-card__title {
  margin-top: 10px;
  font-size: 22px;
  line-height: 1.25;
  font-weight: 600;
}

.feature-flags-guide-card__text,
.feature-flags-guide-panel__text {
  margin-top: 12px;
  font-size: 14px;
  line-height: 1.9;
  color: #596571;
}

.feature-flags-guide-section {
  margin-top: 28px;
}

.feature-flags-guide-section__head {
  margin-bottom: 14px;
}

.feature-flags-guide-section__title {
  margin-top: 8px;
  font-size: 30px;
  line-height: 1.18;
  font-weight: 600;
  letter-spacing: -0.03em;
}

.feature-flags-guide-columns {
  grid-template-columns: repeat(3, minmax(0, 1fr));
}

.feature-flags-guide-stack {
  grid-template-columns: repeat(2, minmax(0, 1fr));
}

.feature-flags-guide-panel {
  padding: 18px;
}

.feature-flags-guide-panel.is-wide {
  grid-column: 1 / -1;
}

.feature-flags-guide-panel__eyebrow {
  font-size: 11px;
  line-height: 1.4;
  letter-spacing: 0.24em;
  text-transform: uppercase;
  color: #80909d;
}

.feature-flags-guide-panel__title {
  font-size: 20px;
  line-height: 1.3;
  font-weight: 600;
}

.feature-flags-guide-method__head {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 16px;
}

.feature-flags-guide-method__tag {
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

.feature-flags-guide-method__grid {
  display: grid;
  gap: 14px;
  margin-top: 16px;
  grid-template-columns: repeat(3, minmax(0, 1fr));
}

.feature-flags-guide-mini-panel {
  padding: 14px;
  border: 1px solid rgba(19, 27, 34, 0.08);
  border-radius: 7px;
  background: rgba(245, 248, 250, 0.9);
}

.feature-flags-guide-mini-panel__title {
  font-size: 14px;
  font-weight: 600;
  color: #17202a;
}

.feature-flags-guide-code-block {
  margin-top: 14px;
}

@media (max-width: 1080px) {
  .feature-flags-guide-hero,
  .feature-flags-guide-grid,
  .feature-flags-guide-columns,
  .feature-flags-guide-stack,
  .feature-flags-guide-method__grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 900px) {
  .feature-flags-guide-page {
    min-height: auto;
    padding: 18px;
  }

  .feature-flags-guide-page__shell {
    min-height: auto;
  }

  .feature-flags-guide-page__content {
    padding: 18px;
  }

  .feature-flags-guide-hero__title {
    font-size: 36px;
  }

  .feature-flags-guide-section__title {
    font-size: 26px;
  }
}
</style>
