<template>
  <section class="accessibility-guide-page">
    <div class="accessibility-guide-page__shell">
      <div class="accessibility-guide-page__top">
        <RouterLink
          to="/fullstack-guide"
          class="accessibility-guide-page__back"
          aria-label="返回全栈能力菜单"
          title="返回全栈能力菜单"
        >
          <el-icon :size="18"><ArrowLeft /></el-icon>
        </RouterLink>
      </div>

      <div class="accessibility-guide-page__content">
        <header class="accessibility-guide-hero">
          <div>
            <p class="accessibility-guide-hero__eyebrow">
              Frontend Accessibility
            </p>
            <h1 class="accessibility-guide-hero__title">前端无障碍能力</h1>
            <p class="accessibility-guide-hero__summary">
              这一页按真实项目建设无障碍能力的顺序来讲：先建立语义结构和键盘可达，再处理读屏文本、表单错误提示、焦点管理、颜色对比度和自动化检测。重点不是补几个
              `aria-*` 属性，而是让页面从结构到交互都能被更多用户稳定使用。
            </p>
          </div>

          <div class="accessibility-guide-hero__panel">
            <p class="accessibility-guide-hero__label">学完结果</p>
            <ul class="accessibility-guide-list">
              <li>能分清语义结构、视觉样式、读屏文本和键盘交互各自的职责。</li>
              <li>
                能在表单、弹窗、导航、数据表格里做出可读、可聚焦、可操作的交互。
              </li>
              <li>
                能把无障碍检查接入设计系统、测试流程和工程规范，而不是上线前临时补丁。
              </li>
            </ul>
          </div>
        </header>

        <section class="accessibility-guide-grid">
          <article
            v-for="item in quickStages"
            :key="item.order"
            class="accessibility-guide-card"
          >
            <p class="accessibility-guide-card__eyebrow">
              Stage {{ item.order }}
            </p>
            <h2 class="accessibility-guide-card__title">{{ item.title }}</h2>
            <p class="accessibility-guide-card__text">{{ item.summary }}</p>
          </article>
        </section>

        <section class="accessibility-guide-section">
          <div class="accessibility-guide-section__head">
            <div>
              <p class="accessibility-guide-section__eyebrow">Decision Order</p>
              <h2 class="accessibility-guide-section__title">
                无障碍先修结构与交互，再做属性补充和检测治理
              </h2>
            </div>
          </div>

          <div class="accessibility-guide-stack">
            <article
              v-for="stage in guideStages"
              :key="stage.order"
              class="accessibility-guide-panel is-wide"
            >
              <div class="accessibility-guide-method__head">
                <div>
                  <p class="accessibility-guide-panel__eyebrow">
                    Stage {{ stage.order }}
                  </p>
                  <h3 class="accessibility-guide-panel__title">
                    {{ stage.title }}
                  </h3>
                </div>
                <span class="accessibility-guide-method__tag">
                  {{ stage.tag }}
                </span>
              </div>

              <p class="accessibility-guide-panel__text">
                {{ stage.description }}
              </p>

              <div class="accessibility-guide-method__grid">
                <section class="accessibility-guide-mini-panel">
                  <p class="accessibility-guide-mini-panel__title">适用场景</p>
                  <ul class="accessibility-guide-list">
                    <li v-for="item in stage.bestFor" :key="item">
                      {{ item }}
                    </li>
                  </ul>
                </section>

                <section class="accessibility-guide-mini-panel">
                  <p class="accessibility-guide-mini-panel__title">实现重点</p>
                  <ul class="accessibility-guide-list">
                    <li v-for="item in stage.focus" :key="item">
                      {{ item }}
                    </li>
                  </ul>
                </section>

                <section class="accessibility-guide-mini-panel">
                  <p class="accessibility-guide-mini-panel__title">常见误区</p>
                  <ul class="accessibility-guide-list">
                    <li v-for="item in stage.risks" :key="item">
                      {{ item }}
                    </li>
                  </ul>
                </section>
              </div>

              <AppCodeBlock
                class="accessibility-guide-code-block"
                :code="stage.code"
                :lang="stage.language"
              />
            </article>
          </div>
        </section>

        <section class="accessibility-guide-section">
          <div class="accessibility-guide-section__head">
            <div>
              <p class="accessibility-guide-section__eyebrow">Comparison</p>
              <h2 class="accessibility-guide-section__title">
                无障碍最关键的几组取舍
              </h2>
            </div>
          </div>

          <div class="accessibility-guide-columns">
            <article
              v-for="item in comparisonCards"
              :key="item.title"
              class="accessibility-guide-panel"
            >
              <h3 class="accessibility-guide-panel__title">{{ item.title }}</h3>
              <p class="accessibility-guide-panel__text">{{ item.summary }}</p>
            </article>
          </div>
        </section>

        <section class="accessibility-guide-section">
          <div class="accessibility-guide-section__head">
            <div>
              <p class="accessibility-guide-section__eyebrow">Checklist</p>
              <h2 class="accessibility-guide-section__title">
                一套能落地的前端无障碍清单
              </h2>
            </div>
          </div>

          <article class="accessibility-guide-panel is-wide">
            <ul class="accessibility-guide-list">
              <li>优先用正确的语义标签搭结构，不要先写 `div` 再补 role。</li>
              <li>
                所有核心流程都要能纯键盘完成，包括导航、表单、弹窗和提交。
              </li>
              <li>错误提示、成功提示、异步状态变化要让读屏用户可感知。</li>
              <li>颜色对比度、焦点可见性、点击热区尺寸都要进入设计规范。</li>
              <li>自动化检测和人工走查要一起存在，不能只靠某一种工具。</li>
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
    title: '先修语义结构',
    summary: '标题、导航、主区域、按钮、表单控件先用对，再谈辅助属性。',
  },
  {
    order: '02',
    title: '键盘路径要打通',
    summary: '只靠鼠标能用不算完成，核心流程必须支持纯键盘操作。',
  },
  {
    order: '03',
    title: '读屏信息要完整',
    summary: '状态变化、错误提示、控件名称都要能被朗读器准确感知。',
  },
  {
    order: '04',
    title: '视觉规则要纳入规范',
    summary: '焦点可见、对比度、字号层级都属于无障碍，不只是样式美观。',
  },
  {
    order: '05',
    title: '检测要进入工程',
    summary:
      '无障碍能力要接进设计系统、测试和发布流程，而不是上线前临时扫一遍。',
  },
];

const guideStages = [
  {
    order: '01',
    title: '先用语义结构搭页面，不要靠 aria 去补救错误 HTML',
    tag: '结构层',
    description:
      '无障碍的第一步不是记属性，而是把页面结构写对。标题层级、导航区域、主内容区、表单标签、按钮和链接都应该用原生语义元素表达。很多团队的问题是所有内容先写成一层 `div`，后面再靠 role 和 aria 去补。那样维护成本高，也更容易出现读屏和焦点异常。',
    bestFor: ['内容站点', '中后台系统', '表单流程', '文档平台'],
    focus: [
      '优先使用原生语义元素',
      '让标题层级与文档结构一致',
      '链接、按钮、输入控件按真实语义落位',
    ],
    risks: [
      '全页面都是 div 和 span',
      '视觉样式正确但结构语义错误',
      '按钮和链接角色混用',
    ],
    language: 'html',
    code: `<main>
  <h1>患者录入</h1>
  <form>
    <label for="patient-name">姓名</label>
    <input id="patient-name" name="patientName" />
    <button type="submit">提交</button>
  </form>
</main>`,
  },
  {
    order: '02',
    title: '键盘可达是基础线，所有核心交互都要能被聚焦和操作',
    tag: '交互层',
    description:
      '真正的可用性不只是能被看见，还要能被操作。菜单、弹窗、抽屉、下拉框、分页、表格操作栏这些组件，都必须支持键盘聚焦、方向键移动、回车触发和 Esc 退出。否则就算结构语义正确，仍然有大批用户无法完成任务。',
    bestFor: ['后台系统', '弹窗交互', '键盘高频操作场景', '组件库'],
    focus: [
      '保证所有交互节点都可聚焦',
      '设计清晰的键盘导航路径',
      '处理弹窗、抽屉等浮层的焦点约束和返回',
    ],
    risks: [
      '只绑定 click 没有键盘操作',
      '弹窗打开后焦点丢失',
      '关闭浮层后焦点回不到触发点',
    ],
    language: 'ts',
    code: `function trapFocus(container: HTMLElement) {
  const focusables = container.querySelectorAll<HTMLElement>(
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
  )

  focusables[0]?.focus()
}`,
  },
  {
    order: '03',
    title: '读屏支持不是多写几个 aria，而是让状态变化被正确表达',
    tag: '读屏层',
    description:
      '屏幕阅读器最怕的信息缺失，尤其是异步状态和表单错误。比如提交失败、校验通过、加载完成、排序变化、选中变化，这些在视觉上可能一闪而过，但读屏用户如果没有明确提示，就等于什么都没发生。无障碍的关键不是属性数量，而是状态表达是否完整。',
    bestFor: ['表单系统', '数据表格', '异步交互页面', '实时反馈场景'],
    focus: [
      '表单控件具备明确名称与描述',
      '错误信息通过可感知区域播报',
      '异步状态变化用 live region 或明确文案表达',
    ],
    risks: [
      '错误提示只用红字不提供读屏文案',
      '图标按钮没有可读名称',
      '异步加载和成功提示无法被播报',
    ],
    language: 'html',
    code: `<div aria-live="polite" class="sr-only">
  表单已保存草稿
</div>

<button aria-label="删除当前留言">
  <TrashIcon />
</button>`,
  },
  {
    order: '04',
    title: '颜色对比度和焦点样式要进入设计系统，而不是页面临时修',
    tag: '视觉层',
    description:
      '无障碍并不只属于前端实现，它会直接影响设计规范。如果文本对比度不足、焦点态不可见、点击区域太小，用户即使看到了结构也很难使用。所以颜色、字号、间距、焦点边框和热区尺寸，都应该被纳入设计系统和组件库，而不是每个页面自己修一遍。',
    bestFor: ['设计系统', '组件库', '品牌统一项目', '多端产品'],
    focus: [
      '对比度、字号、焦点样式纳入 token 体系',
      '组件默认具备清晰 focus-visible 表现',
      '点击热区和可读性规则统一化',
    ],
    risks: [
      '浅色文字堆在浅色背景上',
      'focus 样式被 reset 全部去掉',
      '图标交互区太小，移动端难点中',
    ],
    language: 'css',
    code: `:focus-visible {
  outline: 2px solid var(--color-brand-primary);
  outline-offset: 2px;
}

.text-secondary {
  color: #5c6670;
}`,
  },
  {
    order: '05',
    title: '无障碍要进工程流程：组件约束、自动扫描、人工走查一起上',
    tag: '工程治理',
    description:
      '无障碍真正落地后，不能只靠某一个前端同学记得去做。更成熟的做法是：设计系统默认带语义和焦点能力；lint 和自动化测试对基础问题做扫描；关键页面上线前做人工键盘走查和读屏验证。自动化能挡住低级错误，但交互体验仍然需要人工判断。',
    bestFor: ['多人团队', '长期维护平台', '合规要求较高项目', '组件库工程'],
    focus: [
      '在组件层内建无障碍能力',
      '把 axe / lint / e2e 接进 CI',
      '关键流程保留人工读屏与键盘检查',
    ],
    risks: [
      '只做一次性整改没有后续约束',
      '完全依赖工具分数不看真实体验',
      '新组件上线后持续退化无人发现',
    ],
    language: 'yaml',
    code: `name: accessibility-check

on:
  pull_request:

jobs:
  audit:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: pnpm install --frozen-lockfile
      - run: pnpm lint
      - run: pnpm test:e2e-accessibility`,
  },
];

const comparisonCards = [
  {
    title: '原生语义 vs aria 补丁',
    summary:
      '原生语义通常更稳定、可维护性更高；aria 更适合补充复杂交互信息，不适合替代错误的基础结构。',
  },
  {
    title: '自动化扫描 vs 人工走查',
    summary:
      '自动化适合挡住结构和属性类问题；人工走查更适合发现键盘路径、焦点体验和读屏上下文问题，两者不能互相替代。',
  },
  {
    title: '页面修补 vs 组件层治理',
    summary:
      '页面修补见效快但难持续；把无障碍能力沉入设计系统和组件库，长期收益更高，也更能防止反复退化。',
  },
];
</script>

<style scoped>
.accessibility-guide-page {
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

.accessibility-guide-page__shell {
  min-height: calc(100vh - 90px);
  border: 1px solid rgba(19, 27, 34, 0.06);
  border-radius: 7px;
  background: rgba(255, 255, 255, 0.82);
}

.accessibility-guide-page__top {
  display: flex;
  justify-content: flex-start;
  padding: 18px 18px 0;
}

.accessibility-guide-page__back {
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

.accessibility-guide-page__back:hover {
  transform: translateY(-1px);
  border-color: rgba(46, 70, 91, 0.18);
  box-shadow: 0 18px 34px rgba(19, 27, 34, 0.08);
}

.accessibility-guide-page__content {
  padding: 18px 24px 24px;
}

.accessibility-guide-hero {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 320px;
  gap: 20px;
  padding-bottom: 26px;
  border-bottom: 1px solid rgba(19, 27, 34, 0.08);
}

.accessibility-guide-hero__eyebrow,
.accessibility-guide-section__eyebrow,
.accessibility-guide-card__eyebrow,
.accessibility-guide-hero__label {
  font-size: 11px;
  line-height: 1.4;
  letter-spacing: 0.24em;
  text-transform: uppercase;
  color: #7b8793;
}

.accessibility-guide-hero__title {
  margin-top: 10px;
  font-size: 46px;
  line-height: 1.06;
  font-weight: 600;
  letter-spacing: -0.05em;
  color: #17202a;
}

.accessibility-guide-hero__summary {
  max-width: 860px;
  margin-top: 16px;
  font-size: 15px;
  line-height: 1.9;
  color: #58636f;
}

.accessibility-guide-hero__panel,
.accessibility-guide-card,
.accessibility-guide-panel {
  border: 1px solid rgba(19, 27, 34, 0.08);
  border-radius: 7px;
  background: rgba(255, 255, 255, 0.84);
}

.accessibility-guide-hero__panel {
  padding: 18px;
}

.accessibility-guide-list {
  display: grid;
  gap: 8px;
  margin: 12px 0 0;
  padding-left: 18px;
  font-size: 14px;
  line-height: 1.8;
  color: #56616d;
}

.accessibility-guide-grid,
.accessibility-guide-columns,
.accessibility-guide-stack {
  display: grid;
  gap: 16px;
}

.accessibility-guide-grid {
  margin-top: 28px;
  grid-template-columns: repeat(3, minmax(0, 1fr));
}

.accessibility-guide-card {
  padding: 18px;
}

.accessibility-guide-card__title,
.accessibility-guide-panel__title,
.accessibility-guide-section__title {
  color: #17202a;
}

.accessibility-guide-card__title {
  margin-top: 10px;
  font-size: 22px;
  line-height: 1.25;
  font-weight: 600;
}

.accessibility-guide-card__text,
.accessibility-guide-panel__text {
  margin-top: 12px;
  font-size: 14px;
  line-height: 1.9;
  color: #596571;
}

.accessibility-guide-section {
  margin-top: 28px;
}

.accessibility-guide-section__head {
  margin-bottom: 14px;
}

.accessibility-guide-section__title {
  margin-top: 8px;
  font-size: 30px;
  line-height: 1.18;
  font-weight: 600;
  letter-spacing: -0.03em;
}

.accessibility-guide-columns {
  grid-template-columns: repeat(3, minmax(0, 1fr));
}

.accessibility-guide-stack {
  grid-template-columns: repeat(2, minmax(0, 1fr));
}

.accessibility-guide-panel {
  padding: 18px;
}

.accessibility-guide-panel.is-wide {
  grid-column: 1 / -1;
}

.accessibility-guide-panel__eyebrow {
  font-size: 11px;
  line-height: 1.4;
  letter-spacing: 0.24em;
  text-transform: uppercase;
  color: #80909d;
}

.accessibility-guide-panel__title {
  font-size: 20px;
  line-height: 1.3;
  font-weight: 600;
}

.accessibility-guide-method__head {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 16px;
}

.accessibility-guide-method__tag {
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

.accessibility-guide-method__grid {
  display: grid;
  gap: 14px;
  margin-top: 16px;
  grid-template-columns: repeat(3, minmax(0, 1fr));
}

.accessibility-guide-mini-panel {
  padding: 14px;
  border: 1px solid rgba(19, 27, 34, 0.08);
  border-radius: 7px;
  background: rgba(245, 248, 250, 0.9);
}

.accessibility-guide-mini-panel__title {
  font-size: 14px;
  font-weight: 600;
  color: #17202a;
}

.accessibility-guide-code-block {
  margin-top: 14px;
}

@media (max-width: 1080px) {
  .accessibility-guide-hero,
  .accessibility-guide-grid,
  .accessibility-guide-columns,
  .accessibility-guide-stack,
  .accessibility-guide-method__grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 900px) {
  .accessibility-guide-page {
    min-height: auto;
    padding: 18px;
  }

  .accessibility-guide-page__shell {
    min-height: auto;
  }

  .accessibility-guide-page__content {
    padding: 18px;
  }

  .accessibility-guide-hero__title {
    font-size: 36px;
  }

  .accessibility-guide-section__title {
    font-size: 26px;
  }
}
</style>
