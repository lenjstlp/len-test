<template>
  <section class="design-guide-page">
    <div class="design-guide-page__shell">
      <div class="design-guide-page__top">
        <RouterLink
          to="/fullstack-guide"
          class="design-guide-page__back"
          aria-label="返回全栈能力菜单"
          title="返回全栈能力菜单"
        >
          <el-icon :size="18"><ArrowLeft /></el-icon>
        </RouterLink>
      </div>

      <div class="design-guide-page__content">
        <header class="design-guide-hero">
          <div>
            <p class="design-guide-hero__eyebrow">Frontend Design System</p>
            <h1 class="design-guide-hero__title">前端设计系统能力</h1>
            <p class="design-guide-hero__summary">
              这一页按设计系统在真实团队里落地的顺序来讲：先区分设计规范、组件库、业务组件和页面模版，再去处理
              token、主题、组件协议、文档站、发布链路和升级治理。重点不是做一套好看的按钮，而是让视觉规则、组件实现和业务研发真正跑在同一套约束上。
            </p>
          </div>

          <div class="design-guide-hero__panel">
            <p class="design-guide-hero__label">学完结果</p>
            <ul class="design-guide-list">
              <li>能分清设计规范、基础组件、业务组件和页面模版的职责边界。</li>
              <li>
                能把 token、主题、组件 API 和文档站组织成一套可发布的体系。
              </li>
              <li>
                能理解设计系统真正解决的是一致性、复用和协作效率，不只是视觉统一。
              </li>
            </ul>
          </div>
        </header>

        <section class="design-guide-grid">
          <article
            v-for="item in quickStages"
            :key="item.order"
            class="design-guide-card"
          >
            <p class="design-guide-card__eyebrow">Stage {{ item.order }}</p>
            <h2 class="design-guide-card__title">{{ item.title }}</h2>
            <p class="design-guide-card__text">{{ item.summary }}</p>
          </article>
        </section>

        <section class="design-guide-section">
          <div class="design-guide-section__head">
            <div>
              <p class="design-guide-section__eyebrow">Decision Order</p>
              <h2 class="design-guide-section__title">
                设计系统先定义规则层，再建设组件层和治理层
              </h2>
            </div>
          </div>

          <div class="design-guide-stack">
            <article
              v-for="stage in guideStages"
              :key="stage.order"
              class="design-guide-panel is-wide"
            >
              <div class="design-guide-method__head">
                <div>
                  <p class="design-guide-panel__eyebrow">
                    Stage {{ stage.order }}
                  </p>
                  <h3 class="design-guide-panel__title">
                    {{ stage.title }}
                  </h3>
                </div>
                <span class="design-guide-method__tag">{{ stage.tag }}</span>
              </div>

              <p class="design-guide-panel__text">{{ stage.description }}</p>

              <div class="design-guide-method__grid">
                <section class="design-guide-mini-panel">
                  <p class="design-guide-mini-panel__title">适用场景</p>
                  <ul class="design-guide-list">
                    <li v-for="item in stage.bestFor" :key="item">
                      {{ item }}
                    </li>
                  </ul>
                </section>

                <section class="design-guide-mini-panel">
                  <p class="design-guide-mini-panel__title">实现重点</p>
                  <ul class="design-guide-list">
                    <li v-for="item in stage.focus" :key="item">
                      {{ item }}
                    </li>
                  </ul>
                </section>

                <section class="design-guide-mini-panel">
                  <p class="design-guide-mini-panel__title">常见误区</p>
                  <ul class="design-guide-list">
                    <li v-for="item in stage.risks" :key="item">
                      {{ item }}
                    </li>
                  </ul>
                </section>
              </div>

              <AppCodeBlock
                class="design-guide-code-block"
                :code="stage.code"
                :lang="stage.language"
              />
            </article>
          </div>
        </section>

        <section class="design-guide-section">
          <div class="design-guide-section__head">
            <div>
              <p class="design-guide-section__eyebrow">Comparison</p>
              <h2 class="design-guide-section__title">
                设计系统最关键的几组取舍
              </h2>
            </div>
          </div>

          <div class="design-guide-columns">
            <article
              v-for="item in comparisonCards"
              :key="item.title"
              class="design-guide-panel"
            >
              <h3 class="design-guide-panel__title">{{ item.title }}</h3>
              <p class="design-guide-panel__text">{{ item.summary }}</p>
            </article>
          </div>
        </section>

        <section class="design-guide-section">
          <div class="design-guide-section__head">
            <div>
              <p class="design-guide-section__eyebrow">Checklist</p>
              <h2 class="design-guide-section__title">
                一套能落地的设计系统清单
              </h2>
            </div>
          </div>

          <article class="design-guide-panel is-wide">
            <ul class="design-guide-list">
              <li>
                先定义 token、栅格、间距、字号、颜色和状态语义，再去写组件。
              </li>
              <li>
                基础组件库与业务组件库要分层，别把业务特例直接塞进基础层。
              </li>
              <li>所有组件必须有稳定 API、状态说明、可访问性和禁用边界。</li>
              <li>文档站、示例、变更记录和版本发布要和组件代码一起演进。</li>
              <li>
                设计系统上线后要有升级策略、废弃策略和自动化校验，不然很快失控。
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
    title: '先定义规则层',
    summary: '先有 token 和规范，再有组件，不要反过来堆按钮。',
  },
  {
    order: '02',
    title: '组件层要分层',
    summary: '基础组件、业务组件、页面模版必须拆开，不然复用会失真。',
  },
  {
    order: '03',
    title: '文档是产品',
    summary: '没有文档站和示例，组件库基本等于内部私货。',
  },
  {
    order: '04',
    title: '发布要可追踪',
    summary: '设计系统一旦服务多个项目，版本治理就是核心能力。',
  },
  {
    order: '05',
    title: '治理比绘制重要',
    summary: '真正难的是一致性约束和升级策略，不是多写几个组件。',
  },
];

const guideStages = [
  {
    order: '01',
    title: '先区分设计规范、组件库和业务模版，不要把所有东西都叫设计系统',
    tag: '问题建模',
    description:
      '很多团队说在做设计系统，实际上只是做了一套组件库。真正的设计系统至少包含三层：规则层，负责颜色、字体、间距、状态语义这些 token；组件层，负责按钮、输入框、弹窗等基础构件；业务层，负责表格筛选条、表单片段、业务卡片等领域组件。再往上还有页面模版和使用规范。边界不清，系统一定越做越散。',
    bestFor: ['中后台平台', '多产品线团队', '统一品牌体系', '长期演进项目'],
    focus: [
      '区分规则层、基础组件层和业务组件层',
      '明确设计系统服务谁、输出什么',
      '让设计稿、组件实现和研发消费对应同一套概念',
    ],
    risks: [
      '组件库和业务组件混在一起',
      '只有视觉稿没有工程约束',
      '大家都说复用，实际每个项目都在二次包装',
    ],
    language: 'text',
    code: `Design System Layers
- tokens: 颜色、字号、间距、圆角、阴影、层级
- primitives: Button / Input / Dialog / Tabs
- business components: SearchBar / FilterPanel / MetricCard
- templates: ListPage / DetailPage / DashboardLayout`,
  },
  {
    order: '02',
    title: 'token 是设计系统真正的地基，先把语义变量做对',
    tag: '规则层',
    description:
      '设计系统最容易做错的地方，是直接把十几个颜色值和尺寸写死在组件里。更稳的方式是先做 token 层，让颜色、字号、间距、圆角都用语义变量表达，比如 `color-brand-primary`、`space-md`、`radius-sm`。这样换主题、换品牌、做暗色或高对比模式时，成本才可控。',
    bestFor: ['品牌统一平台', '多主题产品', '跨端设计系统'],
    focus: [
      '先做语义 token 而不是硬编码值',
      '支持主题切换与品牌皮肤',
      '设计工具和代码变量对齐',
    ],
    risks: [
      '直接在组件里写死具体值',
      'token 命名只描述颜色，不描述语义',
      '设计稿和代码变量映射关系不明确',
    ],
    language: 'css',
    code: `:root {
  --color-text-primary: #17202a;
  --color-surface-default: #ffffff;
  --color-brand-primary: #315f8c;
  --space-sm: 8px;
  --space-md: 12px;
  --radius-sm: 7px;
}`,
  },
  {
    order: '03',
    title: '组件 API 要稳定，不要把样式参数和业务参数混成一团',
    tag: '组件层',
    description:
      '设计系统不是“把页面里现成代码抽出来”。基础组件需要稳定 API、清晰状态和一致交互。比如 Button 到底暴露 `variant`、`size`、`loading`、`disabled` 这些能力，还是把每个业务场景都写成一个新属性？这类边界如果不收紧，组件会很快变成参数怪兽。',
    bestFor: ['组件库建设', '多项目复用', '中后台统一组件'],
    focus: [
      'API 语义稳定，状态边界明确',
      '视觉变体通过 token 和 variant 控制',
      '组件不承载具体业务语义',
    ],
    risks: [
      '一个组件为十几个页面特例不断加 props',
      '状态组合没有约束，视觉行为不可预测',
      '基础组件直接耦合业务术语',
    ],
    language: 'ts',
    code: `type ButtonProps = {
  variant?: 'primary' | 'secondary' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  loading?: boolean
  disabled?: boolean
  block?: boolean
}`,
  },
  {
    order: '04',
    title: '文档站和示例必须作为系统本体来建设',
    tag: '消费层',
    description:
      '设计系统一旦没有文档站，研发团队就只能去源码和旧页面里猜用法，复用效率会迅速下降。成熟的设计系统必须把示例、属性表、状态说明、设计约束、禁用边界、可访问性说明都放进文档站里，而且文档要跟随版本一起发布。',
    bestFor: ['多人协作团队', '组件库开源/内部共享', '平台化项目'],
    focus: [
      '文档站和代码同步演进',
      '每个组件都要有可执行示例',
      '明确禁用场景、边界和可访问性要求',
    ],
    risks: ['文档落后于代码版本', '只有截图没有交互示例', '组件行为靠口口相传'],
    language: 'md',
    code: `# Button

- variants: primary / secondary / ghost
- states: default / hover / focus / loading / disabled
- accessibility: support keyboard focus and aria-busy
- do not: use Button as navigation link`,
  },
  {
    order: '05',
    title: '设计系统最终拼的是治理能力：发布、废弃、升级和自动校验',
    tag: '工程落地',
    description:
      '设计系统服务多个项目后，真正的难点不在写组件，而在治理。某个组件的 breaking change 怎么通知？旧 variant 怎么废弃？新 token 怎样批量升级？视觉规范怎么防止被业务代码绕开？这些都需要版本策略、变更日志、lint 规则和迁移工具支持。',
    bestFor: ['平台型团队', '多仓库消费组件库', '长期维护项目'],
    focus: [
      '建立版本策略和 breaking change 机制',
      '提供 lint / codemod / changelog 支持升级',
      '用自动化校验约束不合规使用方式',
    ],
    risks: [
      '组件库升级完全靠手工通知',
      '废弃能力没有迁移路径',
      '业务项目随意覆写设计系统样式',
    ],
    language: 'yaml',
    code: `name: design-system-release

on:
  push:
    branches: [master]

jobs:
  publish:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: pnpm install --frozen-lockfile
      - run: pnpm lint
      - run: pnpm type-check
      - run: pnpm build
      - run: pnpm changeset version
      - run: pnpm changeset publish`,
  },
];

const comparisonCards = [
  {
    title: '组件库 vs 设计系统',
    summary:
      '组件库只是实现层，解决的是代码复用；设计系统还要覆盖规则、文档、主题、协作和治理，解决的是一致性与效率问题。',
  },
  {
    title: '硬编码样式 vs token 驱动',
    summary:
      '硬编码开发快，但一旦要换主题、品牌或无障碍模式，成本会迅速放大；token 驱动前期抽象更多，但后续演进明显更稳。',
  },
  {
    title: '基础组件库 vs 业务组件库',
    summary:
      '基础组件追求通用和稳定，业务组件追求领域效率，两者混在一起通常会同时失去复用性和可维护性。',
  },
];
</script>

<style scoped>
.design-guide-page {
  min-height: calc(100vh - 40px);
  padding: 24px;
  border: 1px solid rgba(19, 27, 34, 0.08);
  border-radius: 7px;
  background:
    radial-gradient(
      circle at top left,
      rgba(220, 227, 233, 0.48),
      transparent 28%
    ),
    linear-gradient(180deg, #fcfdfe 0%, #f3f6f8 100%);
  box-shadow: 0 30px 80px rgba(18, 26, 34, 0.08);
}

.design-guide-page__shell {
  min-height: calc(100vh - 90px);
  border: 1px solid rgba(19, 27, 34, 0.06);
  border-radius: 7px;
  background: rgba(255, 255, 255, 0.82);
}

.design-guide-page__top {
  display: flex;
  justify-content: flex-start;
  padding: 18px 18px 0;
}

.design-guide-page__back {
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

.design-guide-page__back:hover {
  transform: translateY(-1px);
  border-color: rgba(46, 70, 91, 0.18);
  box-shadow: 0 18px 34px rgba(19, 27, 34, 0.08);
}

.design-guide-page__content {
  padding: 18px 24px 24px;
}

.design-guide-hero {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 320px;
  gap: 20px;
  padding-bottom: 26px;
  border-bottom: 1px solid rgba(19, 27, 34, 0.08);
}

.design-guide-hero__eyebrow,
.design-guide-section__eyebrow,
.design-guide-card__eyebrow,
.design-guide-hero__label {
  font-size: 11px;
  line-height: 1.4;
  letter-spacing: 0.24em;
  text-transform: uppercase;
  color: #7b8793;
}

.design-guide-hero__title {
  margin-top: 10px;
  font-size: 46px;
  line-height: 1.06;
  font-weight: 600;
  letter-spacing: -0.05em;
  color: #17202a;
}

.design-guide-hero__summary {
  max-width: 860px;
  margin-top: 16px;
  font-size: 15px;
  line-height: 1.9;
  color: #58636f;
}

.design-guide-hero__panel,
.design-guide-card,
.design-guide-panel {
  border: 1px solid rgba(19, 27, 34, 0.08);
  border-radius: 7px;
  background: rgba(255, 255, 255, 0.84);
}

.design-guide-hero__panel {
  padding: 18px;
}

.design-guide-list {
  display: grid;
  gap: 8px;
  margin: 12px 0 0;
  padding-left: 18px;
  font-size: 14px;
  line-height: 1.8;
  color: #56616d;
}

.design-guide-grid,
.design-guide-columns,
.design-guide-stack {
  display: grid;
  gap: 16px;
}

.design-guide-grid {
  margin-top: 28px;
  grid-template-columns: repeat(3, minmax(0, 1fr));
}

.design-guide-card {
  padding: 18px;
}

.design-guide-card__title,
.design-guide-panel__title,
.design-guide-section__title {
  color: #17202a;
}

.design-guide-card__title {
  margin-top: 10px;
  font-size: 22px;
  line-height: 1.25;
  font-weight: 600;
}

.design-guide-card__text,
.design-guide-panel__text {
  margin-top: 12px;
  font-size: 14px;
  line-height: 1.9;
  color: #596571;
}

.design-guide-section {
  margin-top: 28px;
}

.design-guide-section__head {
  margin-bottom: 14px;
}

.design-guide-section__title {
  margin-top: 8px;
  font-size: 30px;
  line-height: 1.18;
  font-weight: 600;
  letter-spacing: -0.03em;
}

.design-guide-columns {
  grid-template-columns: repeat(3, minmax(0, 1fr));
}

.design-guide-stack {
  grid-template-columns: repeat(2, minmax(0, 1fr));
}

.design-guide-panel {
  padding: 18px;
}

.design-guide-panel.is-wide {
  grid-column: 1 / -1;
}

.design-guide-panel__eyebrow {
  font-size: 11px;
  line-height: 1.4;
  letter-spacing: 0.24em;
  text-transform: uppercase;
  color: #80909d;
}

.design-guide-panel__title {
  font-size: 20px;
  line-height: 1.3;
  font-weight: 600;
}

.design-guide-method__head {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 16px;
}

.design-guide-method__tag {
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

.design-guide-method__grid {
  display: grid;
  gap: 14px;
  margin-top: 16px;
  grid-template-columns: repeat(3, minmax(0, 1fr));
}

.design-guide-mini-panel {
  padding: 14px;
  border: 1px solid rgba(19, 27, 34, 0.08);
  border-radius: 7px;
  background: rgba(245, 248, 250, 0.9);
}

.design-guide-mini-panel__title {
  font-size: 14px;
  font-weight: 600;
  color: #17202a;
}

.design-guide-code-block {
  margin-top: 14px;
}

@media (max-width: 1080px) {
  .design-guide-hero,
  .design-guide-grid,
  .design-guide-columns,
  .design-guide-stack,
  .design-guide-method__grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 900px) {
  .design-guide-page {
    min-height: auto;
    padding: 18px;
  }

  .design-guide-page__shell {
    min-height: auto;
  }

  .design-guide-page__content {
    padding: 18px;
  }

  .design-guide-hero__title {
    font-size: 36px;
  }

  .design-guide-section__title {
    font-size: 26px;
  }
}
</style>
