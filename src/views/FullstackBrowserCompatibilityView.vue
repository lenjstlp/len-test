<template>
  <section class="browser-compatibility-guide-page">
    <div class="browser-compatibility-guide-page__shell">
      <div class="browser-compatibility-guide-page__top">
        <RouterLink
          to="/fullstack-guide"
          class="browser-compatibility-guide-page__back"
          aria-label="返回全栈能力菜单"
          title="返回全栈能力菜单"
        >
          <el-icon :size="18"><ArrowLeft /></el-icon>
        </RouterLink>
      </div>

      <div class="browser-compatibility-guide-page__content">
        <header class="browser-compatibility-guide-hero">
          <div>
            <p class="browser-compatibility-guide-hero__eyebrow">
              Frontend Browser Compatibility Engineering
            </p>
            <h1 class="browser-compatibility-guide-hero__title">
              前端浏览器兼容工程
            </h1>
            <p class="browser-compatibility-guide-hero__summary">
              浏览器兼容不是“某个样式在 IE
              里对不对”的老话题，而是现代前端依然持续存在的工程问题：不同浏览器对新
              API、CSS 特性、媒体能力、输入事件、权限弹窗和 WebView
              行为的支持差异，会直接影响功能可用性。真正成熟的兼容工程，要把能力检测、降级策略、polyfill、打包目标和回归测试做成闭环。
            </p>
          </div>

          <div class="browser-compatibility-guide-hero__panel">
            <p class="browser-compatibility-guide-hero__label">学完结果</p>
            <ul class="browser-compatibility-guide-list">
              <li>能区分语法兼容、API 兼容、样式兼容和运行环境兼容。</li>
              <li>能设计浏览器能力检测、polyfill 和降级方案。</li>
              <li>能把兼容问题纳入构建目标、测试流程和线上排查链路。</li>
            </ul>
          </div>
        </header>

        <section class="browser-compatibility-guide-grid">
          <article
            v-for="item in quickStages"
            :key="item.order"
            class="browser-compatibility-guide-card"
          >
            <p class="browser-compatibility-guide-card__eyebrow">
              Stage {{ item.order }}
            </p>
            <h2 class="browser-compatibility-guide-card__title">
              {{ item.title }}
            </h2>
            <p class="browser-compatibility-guide-card__text">
              {{ item.summary }}
            </p>
          </article>
        </section>

        <section class="browser-compatibility-guide-section">
          <div class="browser-compatibility-guide-section__head">
            <div>
              <p class="browser-compatibility-guide-section__eyebrow">
                Decision Order
              </p>
              <h2 class="browser-compatibility-guide-section__title">
                兼容问题先分层，再决定是转译、降级还是放弃支持
              </h2>
            </div>
          </div>

          <div class="browser-compatibility-guide-stack">
            <article
              v-for="stage in guideStages"
              :key="stage.order"
              class="browser-compatibility-guide-panel is-wide"
            >
              <div class="browser-compatibility-guide-method__head">
                <div>
                  <p class="browser-compatibility-guide-panel__eyebrow">
                    Stage {{ stage.order }}
                  </p>
                  <h3 class="browser-compatibility-guide-panel__title">
                    {{ stage.title }}
                  </h3>
                </div>
                <span class="browser-compatibility-guide-method__tag">
                  {{ stage.tag }}
                </span>
              </div>

              <p class="browser-compatibility-guide-panel__text">
                {{ stage.description }}
              </p>

              <div class="browser-compatibility-guide-method__grid">
                <section class="browser-compatibility-guide-mini-panel">
                  <p class="browser-compatibility-guide-mini-panel__title">
                    适用场景
                  </p>
                  <ul class="browser-compatibility-guide-list">
                    <li v-for="item in stage.bestFor" :key="item">
                      {{ item }}
                    </li>
                  </ul>
                </section>

                <section class="browser-compatibility-guide-mini-panel">
                  <p class="browser-compatibility-guide-mini-panel__title">
                    实现重点
                  </p>
                  <ul class="browser-compatibility-guide-list">
                    <li v-for="item in stage.focus" :key="item">
                      {{ item }}
                    </li>
                  </ul>
                </section>

                <section class="browser-compatibility-guide-mini-panel">
                  <p class="browser-compatibility-guide-mini-panel__title">
                    常见误区
                  </p>
                  <ul class="browser-compatibility-guide-list">
                    <li v-for="item in stage.risks" :key="item">
                      {{ item }}
                    </li>
                  </ul>
                </section>
              </div>

              <AppCodeBlock
                class="browser-compatibility-guide-code-block"
                :code="stage.code"
                :lang="stage.language"
              />
            </article>
          </div>
        </section>

        <section class="browser-compatibility-guide-section">
          <div class="browser-compatibility-guide-section__head">
            <div>
              <p class="browser-compatibility-guide-section__eyebrow">
                Comparison
              </p>
              <h2 class="browser-compatibility-guide-section__title">
                转译、polyfill、降级和放弃支持的边界
              </h2>
            </div>
          </div>

          <div class="browser-compatibility-guide-columns">
            <article
              v-for="item in comparisonCards"
              :key="item.title"
              class="browser-compatibility-guide-panel"
            >
              <h3 class="browser-compatibility-guide-panel__title">
                {{ item.title }}
              </h3>
              <p class="browser-compatibility-guide-panel__text">
                {{ item.summary }}
              </p>
            </article>
          </div>
        </section>

        <section class="browser-compatibility-guide-section">
          <div class="browser-compatibility-guide-section__head">
            <div>
              <p class="browser-compatibility-guide-section__eyebrow">
                Best Practice
              </p>
              <h2 class="browser-compatibility-guide-section__title">
                一套可落地的兼容工程骨架
              </h2>
            </div>
          </div>

          <article class="browser-compatibility-guide-panel is-wide">
            <p class="browser-compatibility-guide-panel__text">
              兼容工程的关键不是“多写几个 if”，而是把能力检测、polyfill
              加载、回退 UI
              和测试目标统一起来。下面这个骨架展示了如何根据能力决定是否启用高级功能，并在不支持时给出可接受的替代体验。
            </p>

            <AppCodeBlock
              class="browser-compatibility-guide-code-block"
              :code="compatibilityCode"
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
    title: '先分兼容层级',
    summary: '语法、API、CSS、设备容器是四种不同兼容问题。',
  },
  {
    order: '02',
    title: '能力检测优先',
    summary: '别只靠 UA 猜测，先看浏览器有没有这项能力。',
  },
  {
    order: '03',
    title: 'polyfill 要克制',
    summary: '不是所有缺失能力都值得补，成本和收益要一起算。',
  },
  {
    order: '04',
    title: '降级比硬撑更专业',
    summary: '当功能不可用时，给出受控替代方案比强行渲染更稳。',
  },
  {
    order: '05',
    title: '测试必须覆盖环境',
    summary: '兼容问题往往只在特定浏览器、WebView 或老设备里复现。',
  },
];

const guideStages = [
  {
    order: '01',
    title: '先把兼容问题分层：语法、API、样式、运行环境',
    tag: '问题建模',
    description:
      '前端兼容问题最怕一锅端。现代项目里，最常见的几类差异分别是：语法转译问题，例如某些浏览器不支持新语法；API 兼容问题，例如 `IntersectionObserver`、`ResizeObserver`、`Web Share API`；样式兼容问题，例如 `position: sticky`、视口单位和输入框行为；运行环境问题，例如 Android WebView、iOS Safari、企业内嵌浏览器。只有先分层，后面才知道该交给编译工具、polyfill、CSS 回退还是产品降级。',
    bestFor: ['中后台系统', 'H5 页面', '企业 WebView', '跨平台门户'],
    focus: [
      '先确认问题属于哪一层',
      '不同层使用不同解法',
      '兼容策略要和目标浏览器清单绑定',
    ],
    risks: [
      '看到不兼容就盲目加 polyfill',
      '把语法问题和 API 问题混在一起排查',
      '没有浏览器支持基线，团队各写各的',
    ],
    language: 'text',
    code: `Compatibility Layers
- Syntax: ES 新语法是否需要转译
- API: 浏览器能力是否存在
- CSS: 样式表现是否一致
- Runtime: WebView、Safari、企业容器差异`,
  },
  {
    order: '02',
    title: '能力检测优于 UA 判断',
    tag: '检测策略',
    description:
      '很多兼容问题不是“某个浏览器永远不支持”，而是某个版本、某个容器、某个权限状态不支持。所以更成熟的做法，是先做 feature detection，而不是写一堆 User-Agent 判断。只有在确实需要识别特定容器缺陷时，才补少量 UA 分支。把能力检测做成通用工具后，后续维护成本会低很多。',
    bestFor: ['浏览器差异检测', '高级 API 开关', 'H5 容器适配'],
    focus: [
      '先检测能力，再决定是否启用功能',
      '将兼容判断封装成工具函数',
      '只在必要时使用 UA 兜底',
    ],
    risks: [
      '一上来就依赖 UA 字符串',
      '同一个能力判断散落到多个组件里',
      '能力缺失后没有明确降级方案',
    ],
    language: 'ts',
    code: `const canUseShare = () =>
  typeof navigator !== 'undefined' && typeof navigator.share === 'function';

const canUseObserver = () =>
  typeof window !== 'undefined' && 'IntersectionObserver' in window;`,
  },
  {
    order: '03',
    title: 'polyfill 只补关键能力，别把历史包袱全背进来',
    tag: '补丁策略',
    description:
      'polyfill 能解决一部分 API 缺失问题，但它不是越多越好。每增加一个补丁，都会增加包体积、初始化成本和潜在副作用。所以更合理的做法，是只为关键路径补关键能力，对非关键高级特性直接降级关闭。这样才能兼顾兼容和性能，而不是为了少数环境让所有用户一起背成本。',
    bestFor: ['需要兼顾旧环境的 SPA', '企业内嵌浏览器', '核心功能补齐'],
    focus: [
      '只为关键功能加载 polyfill',
      '按需或动态加载兼容补丁',
      '补丁前先评估用户占比和收益',
    ],
    risks: [
      '全量引入大量 polyfill',
      '为了边缘场景拖慢全部用户',
      '补丁和业务代码交织在一起难以维护',
    ],
    language: 'ts',
    code: `const ensureObserver = async () => {
  if (!('IntersectionObserver' in window)) {
    await import('intersection-observer');
  }
};`,
  },
  {
    order: '04',
    title: '不支持时要有受控降级，而不是假装没事发生',
    tag: '降级体验',
    description:
      '真正的兼容工程，不是强迫所有浏览器都得到一样的体验，而是在能力缺失时仍然给用户一个可理解、可继续使用的替代方案。比如图表改静态图、拖拽改按钮操作、分享改复制链接、流媒体功能给出提示。兼容的目标是“业务可完成”，不是“效果完全一致”。',
    bestFor: ['图表、地图、拖拽、分享、媒体等高级交互'],
    focus: [
      '缺失能力时给出替代交互',
      '降级方案不要阻断核心业务',
      '在 UI 上明确说明当前受限能力',
    ],
    risks: [
      '不支持时直接报错',
      '高级功能缺失导致整页白屏',
      '降级态没有文案和指引',
    ],
    language: 'ts',
    code: `if (!canUseShare()) {
  openCopyLinkDialog();
} else {
  await navigator.share({ title, url });
}`,
  },
];

const comparisonCards = [
  {
    title: '转译',
    summary:
      '解决语法层兼容，让旧浏览器也能理解现代代码，但不负责补运行时 API。',
  },
  {
    title: 'polyfill',
    summary: '解决运行时能力缺失，但会带来包体积和执行成本，不该滥用。',
  },
  {
    title: '降级',
    summary: '当补齐成本过高时，用替代体验保证业务可完成，比强行兼容更实际。',
  },
];

const compatibilityCode = `const initShareFeature = async () => {
  const canShare = typeof navigator !== 'undefined' && 'share' in navigator;

  if (!canShare) {
    return {
      mode: 'fallback',
      run: () => openCopyLinkDialog(),
    };
  }

  return {
    mode: 'native',
    run: () => navigator.share({ title: document.title, url: location.href }),
  };
};`;
</script>

<style scoped>
.browser-compatibility-guide-page {
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

.browser-compatibility-guide-page__shell {
  min-height: calc(100vh - 88px);
  display: flex;
  flex-direction: column;
}

.browser-compatibility-guide-page__top {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 22px;
}

.browser-compatibility-guide-page__back {
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

.browser-compatibility-guide-page__back:hover {
  transform: translateY(-1px);
  border-color: rgba(43, 72, 101, 0.2);
  box-shadow: 0 18px 36px rgba(17, 24, 39, 0.08);
}

.browser-compatibility-guide-page__content {
  display: flex;
  flex-direction: column;
  gap: 22px;
}

.browser-compatibility-guide-hero,
.browser-compatibility-guide-panel,
.browser-compatibility-guide-card {
  border: 1px solid rgba(19, 27, 34, 0.08);
  border-radius: 7px;
  background: #fff;
  box-shadow: 0 24px 60px rgba(15, 23, 42, 0.05);
}

.browser-compatibility-guide-hero {
  display: grid;
  grid-template-columns: minmax(0, 1.6fr) minmax(260px, 0.8fr);
  gap: 20px;
  padding: 28px;
}

.browser-compatibility-guide-hero__eyebrow,
.browser-compatibility-guide-section__eyebrow,
.browser-compatibility-guide-card__eyebrow,
.browser-compatibility-guide-panel__eyebrow,
.browser-compatibility-guide-hero__label,
.browser-compatibility-guide-method__tag,
.browser-compatibility-guide-mini-panel__title {
  font-size: 11px;
  line-height: 1.4;
  letter-spacing: 0.24em;
  text-transform: uppercase;
  color: #7b8794;
}

.browser-compatibility-guide-hero__title {
  margin-top: 10px;
  font-size: 42px;
  line-height: 1.08;
  font-weight: 600;
  letter-spacing: -0.04em;
  color: #16202a;
}

.browser-compatibility-guide-hero__summary {
  margin-top: 16px;
  max-width: 820px;
  font-size: 15px;
  line-height: 1.9;
  color: #52606d;
}

.browser-compatibility-guide-hero__panel {
  align-self: stretch;
  padding: 22px;
  border: 1px solid rgba(19, 27, 34, 0.08);
  border-radius: 7px;
  background: linear-gradient(180deg, #fbfcfd 0%, #f4f7fa 100%);
}

.browser-compatibility-guide-grid {
  display: grid;
  grid-template-columns: repeat(5, minmax(0, 1fr));
  gap: 16px;
}

.browser-compatibility-guide-card {
  padding: 20px;
}

.browser-compatibility-guide-card__title,
.browser-compatibility-guide-panel__title,
.browser-compatibility-guide-section__title {
  color: #16202a;
}

.browser-compatibility-guide-card__title {
  margin-top: 10px;
  font-size: 20px;
  line-height: 1.35;
  font-weight: 600;
}

.browser-compatibility-guide-card__text,
.browser-compatibility-guide-panel__text,
.browser-compatibility-guide-list {
  font-size: 14px;
  line-height: 1.9;
  color: #52606d;
}

.browser-compatibility-guide-section {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.browser-compatibility-guide-section__title {
  margin-top: 8px;
  font-size: 28px;
  line-height: 1.25;
  font-weight: 600;
  letter-spacing: -0.03em;
}

.browser-compatibility-guide-stack,
.browser-compatibility-guide-columns {
  display: grid;
  gap: 16px;
}

.browser-compatibility-guide-columns {
  grid-template-columns: repeat(3, minmax(0, 1fr));
}

.browser-compatibility-guide-panel {
  padding: 24px;
}

.browser-compatibility-guide-panel.is-wide {
  padding: 26px;
}

.browser-compatibility-guide-method__head {
  display: flex;
  align-items: start;
  justify-content: space-between;
  gap: 16px;
}

.browser-compatibility-guide-method__tag {
  display: inline-flex;
  align-items: center;
  min-height: 32px;
  padding: 0 12px;
  border: 1px solid rgba(19, 27, 34, 0.08);
  border-radius: 999px;
  background: #f5f8fa;
}

.browser-compatibility-guide-panel__text {
  margin-top: 14px;
}

.browser-compatibility-guide-method__grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 14px;
  margin-top: 18px;
}

.browser-compatibility-guide-mini-panel {
  padding: 18px;
  border: 1px solid rgba(19, 27, 34, 0.08);
  border-radius: 7px;
  background: linear-gradient(180deg, #fdfefe 0%, #f7fafc 100%);
}

.browser-compatibility-guide-list {
  margin: 12px 0 0;
  padding-left: 18px;
}

.browser-compatibility-guide-code-block {
  margin-top: 18px;
}

@media (max-width: 1180px) {
  .browser-compatibility-guide-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .browser-compatibility-guide-columns,
  .browser-compatibility-guide-method__grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 900px) {
  .browser-compatibility-guide-hero {
    grid-template-columns: 1fr;
    padding: 22px;
  }

  .browser-compatibility-guide-hero__title {
    font-size: 34px;
  }

  .browser-compatibility-guide-grid {
    grid-template-columns: 1fr;
  }

  .browser-compatibility-guide-panel,
  .browser-compatibility-guide-panel.is-wide,
  .browser-compatibility-guide-card {
    padding: 20px;
  }
}
</style>
