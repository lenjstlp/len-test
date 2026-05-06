<template>
  <section class="clipboard-guide-page">
    <div class="clipboard-guide-page__shell">
      <div class="clipboard-guide-page__top">
        <RouterLink
          to="/fullstack-guide"
          class="clipboard-guide-page__back"
          aria-label="返回全栈能力菜单"
          title="返回全栈能力菜单"
        >
          <el-icon :size="18"><ArrowLeft /></el-icon>
        </RouterLink>
      </div>

      <div class="clipboard-guide-page__content">
        <header class="clipboard-guide-hero">
          <div>
            <p class="clipboard-guide-hero__eyebrow">
              Frontend Clipboard Engineering
            </p>
            <h1 class="clipboard-guide-hero__title">前端剪贴板工程</h1>
            <p class="clipboard-guide-hero__summary">
              剪贴板不是只会
              `navigator.clipboard.writeText`。真正的工程问题是：浏览器权限与用户手势限制怎样处理、富文本和表格复制如何保留结构、图片与多
              MIME
              数据怎样写入、跨浏览器降级怎么做，以及复制粘贴链路如何兼顾体验、安全和可观测性。
            </p>
          </div>

          <div class="clipboard-guide-hero__panel">
            <p class="clipboard-guide-hero__label">学完结果</p>
            <ul class="clipboard-guide-list">
              <li>
                能区分文本复制、富文本复制、图片复制与自定义 MIME
                复制的能力边界。
              </li>
              <li>
                能设计复制成功反馈、权限降级、粘贴解析和异常兜底的统一链路。
              </li>
              <li>
                能在表格、编辑器、低代码和工作台系统里做可靠的剪贴板工程方案。
              </li>
            </ul>
          </div>
        </header>

        <section class="clipboard-guide-grid">
          <article
            v-for="item in quickStages"
            :key="item.order"
            class="clipboard-guide-card"
          >
            <p class="clipboard-guide-card__eyebrow">Stage {{ item.order }}</p>
            <h2 class="clipboard-guide-card__title">{{ item.title }}</h2>
            <p class="clipboard-guide-card__text">{{ item.summary }}</p>
          </article>
        </section>

        <section class="clipboard-guide-section">
          <div class="clipboard-guide-section__head">
            <div>
              <p class="clipboard-guide-section__eyebrow">Engineering Order</p>
              <h2 class="clipboard-guide-section__title">
                先分清剪贴板能力层级，再治理权限、格式、降级和粘贴解析
              </h2>
            </div>
          </div>

          <div class="clipboard-guide-stack">
            <article
              v-for="stage in guideStages"
              :key="stage.order"
              class="clipboard-guide-panel is-wide"
            >
              <div class="clipboard-guide-method__head">
                <div>
                  <p class="clipboard-guide-panel__eyebrow">
                    Stage {{ stage.order }}
                  </p>
                  <h3 class="clipboard-guide-panel__title">
                    {{ stage.title }}
                  </h3>
                </div>
                <span class="clipboard-guide-method__tag">{{ stage.tag }}</span>
              </div>

              <p class="clipboard-guide-panel__text">{{ stage.description }}</p>

              <div class="clipboard-guide-method__grid">
                <section class="clipboard-guide-mini-panel">
                  <p class="clipboard-guide-mini-panel__title">适用场景</p>
                  <ul class="clipboard-guide-list">
                    <li v-for="item in stage.bestFor" :key="item">
                      {{ item }}
                    </li>
                  </ul>
                </section>

                <section class="clipboard-guide-mini-panel">
                  <p class="clipboard-guide-mini-panel__title">实现重点</p>
                  <ul class="clipboard-guide-list">
                    <li v-for="item in stage.focus" :key="item">{{ item }}</li>
                  </ul>
                </section>

                <section class="clipboard-guide-mini-panel">
                  <p class="clipboard-guide-mini-panel__title">常见误区</p>
                  <ul class="clipboard-guide-list">
                    <li v-for="item in stage.risks" :key="item">{{ item }}</li>
                  </ul>
                </section>
              </div>

              <AppCodeBlock
                class="clipboard-guide-code-block"
                :code="stage.code"
                :lang="stage.language"
              />
            </article>
          </div>
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
    title: '先分能力层级',
    summary:
      '纯文本、HTML、图片、表格、多 MIME 数据不是一回事，先分能力再设计接口。',
  },
  {
    order: '02',
    title: '权限与手势优先',
    summary: '浏览器通常要求用户手势触发，权限失败是常态，不是异常边角。',
  },
  {
    order: '03',
    title: '复制格式要明确',
    summary: '给 Excel、富文本编辑器和普通输入框复制时，格式策略通常完全不同。',
  },
  {
    order: '04',
    title: '粘贴解析要可控',
    summary: '粘贴并不是“读出来就完了”，还要做 sanitize、结构转换和安全校验。',
  },
  {
    order: '05',
    title: '降级链路不能缺',
    summary:
      'Clipboard API 失败时要有 execCommand、隐藏 textarea 或人工指引兜底。',
  },
];

const guideStages = [
  {
    order: '01',
    title: '先分清文本复制、富文本复制、图片复制和自定义数据复制的边界',
    tag: 'Capability',
    description:
      '很多剪贴板需求看上去都叫“复制”，但能力完全不同。复制纯文本只需要稳定写字符串；复制富文本要保留 HTML 结构；复制图片要写 Blob；复制表格和低代码节点时，甚至会同时写入 text/plain、text/html 和自定义 MIME。能力边界不清楚，后面 API 设计一定混乱。',
    bestFor: [
      '表格系统',
      '富文本编辑器',
      '设计器和低代码平台',
      '内部工作台工具',
    ],
    focus: [
      '按 MIME 能力拆分复制接口',
      '为不同目标应用定义不同输出格式',
      '复制侧和粘贴侧共用统一数据协议',
    ],
    risks: [
      '所有复制都只输出纯文本，结果体验大幅退化',
      '编辑器和表格各自定义一套复制协议',
      '只测当前浏览器，跨应用粘贴时完全走样',
    ],
    language: 'text',
    code: `Clipboard Output Types
- text/plain
- text/html
- image/png
- application/x-app-node
- application/x-app-table`,
  },
  {
    order: '02',
    title: '浏览器权限和用户手势限制必须前置处理',
    tag: 'Permission',
    description:
      'Clipboard API 很依赖安全上下文和用户手势。按钮点击触发的复制通常没问题，但自动复制、页面初始化复制、后台任务复制几乎都会被拦。工程上不能假设权限一定存在，而是应该把权限探测、失败提示和重试入口做成标准能力。',
    bestFor: [
      '需要一键复制的后台系统',
      '复制邀请码/命令行/配置片段的页面',
      '客服和运维工具',
    ],
    focus: [
      '统一检测 navigator.clipboard 可用性',
      '在用户点击场景中触发复制',
      '失败时给出明确反馈和降级方案',
    ],
    risks: [
      '在非用户手势里直接调用 writeText，线上必然失败',
      '权限失败后只打印控制台，没有用户反馈',
      '把 HTTPS 和浏览器兼容性问题忽略掉',
    ],
    language: 'ts',
    code: `const copyText = async (text: string) => {
  if (!navigator.clipboard?.writeText) {
    throw new Error('Clipboard API unavailable')
  }

  await navigator.clipboard.writeText(text)
}`,
  },
  {
    order: '03',
    title: '复杂复制要一次写入多个 MIME，别只关心当前系统里的粘贴',
    tag: 'Format',
    description:
      '成熟的复制体验通常会一次性写入多个格式。比如复制表格时，同时写入纯文本和 HTML，用户粘到记事本时还能看到 TSV，粘到 Excel 和富文本里则保留结构。这种多格式写入能显著提升跨应用兼容性，也避免一个复制动作在不同落点表现完全不同。',
    bestFor: ['表格产品', '报表系统', '富文本编辑器', '数据运营后台'],
    focus: [
      '为同一份内容准备 text/plain 与 text/html 双格式',
      '对结构化对象定义自定义 MIME',
      '跨应用粘贴时优先选择对方能消费的最优格式',
    ],
    risks: [
      '只写 HTML，结果粘到纯文本环境全是标签',
      '只写文本，表格结构和样式全丢',
      '自定义 MIME 无兜底，离开本系统就不可用',
    ],
    language: 'ts',
    code: `const writeTableToClipboard = async (plain: string, html: string) => {
  const item = new ClipboardItem({
    'text/plain': new Blob([plain], { type: 'text/plain' }),
    'text/html': new Blob([html], { type: 'text/html' }),
  })

  await navigator.clipboard.write([item])
}`,
  },
  {
    order: '04',
    title: '粘贴侧要做 sanitize、识别和格式降级，而不是盲接外部内容',
    tag: 'Paste Parse',
    description:
      '复制做好只是半场，粘贴才是另半场。来自系统外部的内容可能带脚本、脏样式、不可控换行甚至图片 blob。真正的工程方案需要先识别 MIME，再决定是当纯文本、富文本、表格还是文件处理，并在富文本场景里做 sanitize，避免把不可信内容直接注入页面。',
    bestFor: ['富文本编辑器', '评论系统', '低代码设计器', '表格粘贴导入'],
    focus: [
      '先按 MIME 分流粘贴解析逻辑',
      '富文本输入统一走 sanitize',
      '对表格和图片粘贴做专门处理',
    ],
    risks: [
      '直接 innerHTML 注入剪贴板内容，存在安全风险',
      '所有内容一律按纯文本，用户体验过差',
      '外部表格粘贴格式不兼容且无错误提示',
    ],
    language: 'ts',
    code: `const readPasteData = (event: ClipboardEvent) => {
  const clipboardData = event.clipboardData
  const html = clipboardData?.getData('text/html') || ''
  const plain = clipboardData?.getData('text/plain') || ''

  return {
    html: sanitizeHtml(html),
    plain,
  }
}`,
  },
  {
    order: '05',
    title: '复制失败要有完整降级链路和埋点反馈',
    tag: 'Fallback',
    description:
      '前端剪贴板工程真正要落地，不能只在 happy path 上可用。遇到老浏览器、浏览器策略限制、iframe 权限问题时，要有降级方案，比如隐藏 textarea + 选中 + execCommand，再不行就给用户明确手动复制指引。同时要记录失败原因，长期看哪些环境最容易失败。',
    bestFor: ['兼容性要求较高的后台系统', '嵌入式页面', '跨浏览器企业环境'],
    focus: [
      '准备 Clipboard API、execCommand、手动指引三级降级',
      '复制成功和失败都做埋点',
      '对高频失败环境做专项兼容治理',
    ],
    risks: [
      'API 一失败就沉默，用户不知道复制结果',
      '完全依赖已废弃能力，没有现代 API 分支',
      '失败日志不记录，长期不知道哪些场景一直复制失败',
    ],
    language: 'ts',
    code: `const fallbackCopy = (text: string) => {
  const textarea = document.createElement('textarea')
  textarea.value = text
  textarea.style.position = 'fixed'
  textarea.style.opacity = '0'
  document.body.appendChild(textarea)
  textarea.select()
  document.execCommand('copy')
  document.body.removeChild(textarea)
}`,
  },
];
</script>

<style scoped>
.clipboard-guide-page {
  min-height: calc(100vh - 40px);
  padding: 24px;
  border: 1px solid rgba(19, 27, 34, 0.08);
  border-radius: 7px;
  background:
    radial-gradient(
      circle at top right,
      rgba(226, 233, 239, 0.42),
      transparent 28%
    ),
    linear-gradient(180deg, #fcfdfe 0%, #f3f6f8 100%);
  box-shadow: 0 30px 80px rgba(18, 26, 34, 0.08);
}

.clipboard-guide-page__shell {
  min-height: calc(100vh - 90px);
  border: 1px solid rgba(19, 27, 34, 0.06);
  border-radius: 7px;
  background: rgba(255, 255, 255, 0.84);
}

.clipboard-guide-page__top {
  display: flex;
  justify-content: flex-start;
  padding: 18px 18px 0;
}

.clipboard-guide-page__back {
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

.clipboard-guide-page__back:hover {
  transform: translateY(-1px);
  border-color: rgba(46, 70, 91, 0.18);
  box-shadow: 0 18px 34px rgba(19, 27, 34, 0.08);
}

.clipboard-guide-page__content {
  padding: 18px 24px 24px;
}

.clipboard-guide-hero,
.clipboard-guide-panel,
.clipboard-guide-card {
  border: 1px solid rgba(19, 27, 34, 0.08);
  border-radius: 7px;
  background: rgba(255, 255, 255, 0.86);
}

.clipboard-guide-hero {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 320px;
  gap: 20px;
  padding: 28px;
}

.clipboard-guide-hero__eyebrow,
.clipboard-guide-section__eyebrow,
.clipboard-guide-card__eyebrow,
.clipboard-guide-hero__label {
  font-size: 11px;
  line-height: 1.4;
  letter-spacing: 0.24em;
  text-transform: uppercase;
  color: #7b8793;
}

.clipboard-guide-hero__title {
  margin-top: 10px;
  font-size: 46px;
  line-height: 1.06;
  font-weight: 600;
  letter-spacing: -0.05em;
  color: #17202a;
}

.clipboard-guide-hero__summary {
  max-width: 860px;
  margin-top: 16px;
  font-size: 15px;
  line-height: 1.9;
  color: #58636f;
}

.clipboard-guide-hero__panel {
  align-self: stretch;
  padding: 18px;
  border: 1px solid rgba(19, 27, 34, 0.08);
  border-radius: 7px;
  background: linear-gradient(180deg, #fbfcfd 0%, #f4f7fa 100%);
}

.clipboard-guide-list {
  display: grid;
  gap: 8px;
  margin: 12px 0 0;
  padding-left: 18px;
  font-size: 14px;
  line-height: 1.8;
  color: #56616d;
}

.clipboard-guide-grid,
.clipboard-guide-stack {
  display: grid;
  gap: 16px;
}

.clipboard-guide-grid {
  margin-top: 28px;
  grid-template-columns: repeat(5, minmax(0, 1fr));
}

.clipboard-guide-card {
  padding: 18px;
}

.clipboard-guide-card__title,
.clipboard-guide-panel__title,
.clipboard-guide-section__title {
  color: #17202a;
}

.clipboard-guide-card__title {
  margin-top: 10px;
  font-size: 22px;
  line-height: 1.25;
  font-weight: 600;
}

.clipboard-guide-card__text,
.clipboard-guide-panel__text {
  margin-top: 12px;
  font-size: 14px;
  line-height: 1.9;
  color: #596571;
}

.clipboard-guide-section {
  margin-top: 28px;
}

.clipboard-guide-section__head {
  margin-bottom: 14px;
}

.clipboard-guide-section__title {
  margin-top: 8px;
  font-size: 30px;
  line-height: 1.18;
  font-weight: 600;
  letter-spacing: -0.03em;
}

.clipboard-guide-stack {
  grid-template-columns: repeat(2, minmax(0, 1fr));
}

.clipboard-guide-panel {
  padding: 18px;
}

.clipboard-guide-panel.is-wide {
  grid-column: 1 / -1;
}

.clipboard-guide-panel__eyebrow {
  font-size: 11px;
  line-height: 1.4;
  letter-spacing: 0.24em;
  text-transform: uppercase;
  color: #80909d;
}

.clipboard-guide-panel__title {
  font-size: 20px;
  line-height: 1.3;
  font-weight: 600;
}

.clipboard-guide-method__head {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 16px;
}

.clipboard-guide-method__tag {
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

.clipboard-guide-method__grid {
  display: grid;
  gap: 14px;
  margin-top: 16px;
  grid-template-columns: repeat(3, minmax(0, 1fr));
}

.clipboard-guide-mini-panel {
  padding: 14px;
  border: 1px solid rgba(19, 27, 34, 0.08);
  border-radius: 7px;
  background: rgba(245, 248, 250, 0.9);
}

.clipboard-guide-mini-panel__title {
  font-size: 14px;
  font-weight: 600;
  color: #17202a;
}

.clipboard-guide-code-block {
  margin-top: 14px;
}

@media (max-width: 1080px) {
  .clipboard-guide-hero,
  .clipboard-guide-grid,
  .clipboard-guide-stack,
  .clipboard-guide-method__grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 900px) {
  .clipboard-guide-page {
    min-height: auto;
    padding: 18px;
  }

  .clipboard-guide-page__shell {
    min-height: auto;
  }

  .clipboard-guide-page__content {
    padding: 18px;
  }

  .clipboard-guide-hero__title {
    font-size: 36px;
  }

  .clipboard-guide-section__title {
    font-size: 26px;
  }
}
</style>
