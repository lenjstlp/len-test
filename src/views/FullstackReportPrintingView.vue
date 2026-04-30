<template>
  <section class="report-print-guide-page">
    <div class="report-print-guide-page__shell">
      <div class="report-print-guide-page__top">
        <RouterLink
          to="/fullstack-guide"
          class="report-print-guide-page__back"
          aria-label="返回全栈能力菜单"
          title="返回全栈能力菜单"
        >
          <el-icon :size="18"><ArrowLeft /></el-icon>
        </RouterLink>
      </div>

      <div class="report-print-guide-page__content">
        <header class="report-print-guide-hero">
          <div>
            <p class="report-print-guide-hero__eyebrow">
              Frontend Report Printing Engineering
            </p>
            <h1 class="report-print-guide-hero__title">前端报表打印工程能力</h1>
            <p class="report-print-guide-hero__summary">
              报表打印不是“调用一下浏览器打印”这么简单，而是要把纸张尺寸、分页规则、表格断行、打印样式、导出链路和浏览器差异全部收进工程体系。真正的难点在于：你要确保业务文档在不同数据量、不同设备、不同浏览器下，都能稳定输出并保持版式一致。
            </p>
          </div>

          <div class="report-print-guide-hero__panel">
            <p class="report-print-guide-hero__label">学完结果</p>
            <ul class="report-print-guide-list">
              <li>
                能分清浏览器打印、前端生成 PDF、后端排版导出各自的适用边界。
              </li>
              <li>能设计一套打印模板、分页控制、数据填充和导出兜底方案。</li>
              <li>
                能处理 A4
                纸张、长表格、页眉页脚和多页文档在真实业务中的输出稳定性。
              </li>
            </ul>
          </div>
        </header>

        <section class="report-print-guide-grid">
          <article
            v-for="item in quickStages"
            :key="item.order"
            class="report-print-guide-card"
          >
            <p class="report-print-guide-card__eyebrow">
              Stage {{ item.order }}
            </p>
            <h2 class="report-print-guide-card__title">{{ item.title }}</h2>
            <p class="report-print-guide-card__text">{{ item.summary }}</p>
          </article>
        </section>

        <section class="report-print-guide-section">
          <div class="report-print-guide-section__head">
            <div>
              <p class="report-print-guide-section__eyebrow">Build Order</p>
              <h2 class="report-print-guide-section__title">
                打印工程先定输出介质和模板协议，再处理分页、导出和兼容性
              </h2>
            </div>
          </div>

          <div class="report-print-guide-stack">
            <article
              v-for="stage in guideStages"
              :key="stage.order"
              class="report-print-guide-panel is-wide"
            >
              <div class="report-print-guide-method__head">
                <div>
                  <p class="report-print-guide-panel__eyebrow">
                    Stage {{ stage.order }}
                  </p>
                  <h3 class="report-print-guide-panel__title">
                    {{ stage.title }}
                  </h3>
                </div>
                <span class="report-print-guide-method__tag">{{
                  stage.tag
                }}</span>
              </div>

              <p class="report-print-guide-panel__text">
                {{ stage.description }}
              </p>

              <div class="report-print-guide-method__grid">
                <section class="report-print-guide-mini-panel">
                  <p class="report-print-guide-mini-panel__title">适用场景</p>
                  <ul class="report-print-guide-list">
                    <li v-for="item in stage.bestFor" :key="item">
                      {{ item }}
                    </li>
                  </ul>
                </section>

                <section class="report-print-guide-mini-panel">
                  <p class="report-print-guide-mini-panel__title">实现重点</p>
                  <ul class="report-print-guide-list">
                    <li v-for="item in stage.focus" :key="item">
                      {{ item }}
                    </li>
                  </ul>
                </section>

                <section class="report-print-guide-mini-panel">
                  <p class="report-print-guide-mini-panel__title">常见误区</p>
                  <ul class="report-print-guide-list">
                    <li v-for="item in stage.risks" :key="item">
                      {{ item }}
                    </li>
                  </ul>
                </section>
              </div>

              <AppCodeBlock
                class="report-print-guide-code-block"
                :code="stage.code"
                :lang="stage.language"
              />
            </article>
          </div>
        </section>

        <section class="report-print-guide-section">
          <div class="report-print-guide-section__head">
            <div>
              <p class="report-print-guide-section__eyebrow">Comparison</p>
              <h2 class="report-print-guide-section__title">
                做报表打印系统时最值得提前想清楚的取舍
              </h2>
            </div>
          </div>

          <div class="report-print-guide-columns">
            <article
              v-for="item in comparisonCards"
              :key="item.title"
              class="report-print-guide-panel"
            >
              <h3 class="report-print-guide-panel__title">{{ item.title }}</h3>
              <p class="report-print-guide-panel__text">{{ item.summary }}</p>
            </article>
          </div>
        </section>

        <section class="report-print-guide-section">
          <div class="report-print-guide-section__head">
            <div>
              <p class="report-print-guide-section__eyebrow">Checklist</p>
              <h2 class="report-print-guide-section__title">
                一套能落地的前端报表打印工程建设清单
              </h2>
            </div>
          </div>

          <article class="report-print-guide-panel is-wide">
            <ul class="report-print-guide-list">
              <li>
                先明确是走浏览器打印、前端导出 PDF
                还是后端排版，不同方案的稳定性和成本完全不同。
              </li>
              <li>打印页面要有独立模板层，不要直接拿业务页面样式去打印。</li>
              <li>
                长表格、页眉页脚、签名区和多页内容必须提前设计分页规则，不能等数据一长再补救。
              </li>
              <li>
                打印样式需要独立的 `@media print`
                和页面尺寸控制，避免屏幕样式污染纸张输出。
              </li>
              <li>
                对 Chrome、Edge
                以及无头导出链路要分别验证，不能只看开发机本地预览效果。
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
    title: '先定输出方式',
    summary:
      '浏览器打印、前端 PDF、后端排版三种路线的稳定性和控制力不同，必须一开始就选清楚。',
  },
  {
    order: '02',
    title: '模板层要独立',
    summary:
      '打印模板应独立于普通页面布局，避免响应式样式、滚动容器和交互组件影响纸张输出。',
  },
  {
    order: '03',
    title: '分页规则是核心',
    summary:
      '打印系统最大的难点往往不是样式，而是表格、段落、签名区和图表跨页时如何稳定断页。',
  },
  {
    order: '04',
    title: '数据填充要可预测',
    summary:
      '模板变量、空值处理、动态表格和条件区块都必须规范化，否则最终版式很容易跑掉。',
  },
  {
    order: '05',
    title: '兼容与导出要兜底',
    summary:
      '真实业务里必须考虑不同浏览器、无头导出和打印机差异，不能只依赖本地预览。',
  },
];

const guideStages = [
  {
    order: '01',
    title: '先判断文档最终怎么输出，路线不同，工程结构就完全不同',
    tag: 'Output Strategy',
    description:
      '做报表打印时，首先不是写 CSS，而是确定最终交付方式。如果是用户本地点击浏览器打印，重点是 `@media print`、分页和浏览器兼容；如果是前端直接导出 PDF，重点是截图质量、字体嵌入和分页切片；如果是服务端模板排版，重点又变成 HTML 模板协议、渲染服务和异步导出。这个决策不先做，后面会反复返工。',
    bestFor: ['业务报表打印', '住院单据', '审批表单', '可归档 PDF 文档'],
    focus: [
      '按业务稳定性要求选浏览器打印、前端 PDF 或服务端排版',
      '考虑是否需要用户可见预览、批量导出和归档能力',
      '一开始就评估字体、页码、盖章和电子签名等约束',
    ],
    risks: [
      '先用浏览器打印凑合，后面又要求可归档 PDF',
      '没考虑无头导出环境的字体和样式差异',
      '业务要批量生成文档时才发现前端方案不合适',
    ],
    language: 'text',
    code: `输出方式判断
- 用户本地直接打印：实现快，但受浏览器和设备差异影响更大
- 前端导出 PDF：交互友好，但分页和字体控制成本较高
- 后端模板排版：稳定性更强，但系统复杂度和维护成本更高`,
  },
  {
    order: '02',
    title: '打印模板必须独立建模，别把业务页面硬改成打印页',
    tag: 'Template Layer',
    description:
      '很多团队喜欢直接在业务详情页上加一个“打印”按钮，然后试图靠隐藏按钮和边框来完成打印。这样做很快会失控，因为业务页面为屏幕交互设计，打印页面为纸张输出设计，它们的布局原则根本不同。更稳的做法是单独维护打印模板协议，只让数据层复用，布局层完全独立。',
    bestFor: ['A4 单据', '医疗报告', '合同模板', '票据回执'],
    focus: [
      '将屏幕展示层和纸张输出层分离',
      '模板只接收结构化数据，不直接依赖业务页面状态',
      '为页眉、页脚、签章区、附注区预留固定模板位',
    ],
    risks: [
      '业务页面和打印页面共用复杂组件树',
      '打印模板直接依赖响应式布局和滚动容器',
      '每个文档单独写一套结构，没有统一模板协议',
    ],
    language: 'ts',
    code: `type PrintTemplateSection = {
  id: string
  kind: 'header' | 'table' | 'text' | 'signature' | 'footer'
  breakInside?: 'auto' | 'avoid'
  dataKey?: string
}`,
  },
  {
    order: '03',
    title: '分页规则比样式更重要，尤其是长表格、多页文档和签名区',
    tag: 'Pagination',
    description:
      '报表打印最容易翻车的地方是分页。比如表头要不要重复、某个签名区是否必须留在同一页、图表能不能被拆开、长表格最后一行被截断怎么办，这些都不是简单加一句 `page-break` 就能解决的。工程上要明确哪些内容可拆、哪些内容不可拆、哪些区块要预留最小空间，然后设计分页策略。',
    bestFor: ['多页报表', '住院清单', '结算单据', '带签名确认的表单'],
    focus: [
      '为表格、区块和签名区定义是否允许跨页',
      '长表格需要控制表头重复和尾部保留空间',
      '必要时在渲染前做分页预估，而不是完全依赖浏览器',
    ],
    risks: [
      '所有内容都交给浏览器自动断页',
      '表头、表尾、签名区跨页后无法阅读',
      '数据量变化一大，版式就彻底错乱',
    ],
    language: 'css',
    code: `@media print {
  .page {
    size: A4 portrait;
    margin: 12mm 10mm;
  }

  .print-block {
    break-inside: avoid;
  }

  thead {
    display: table-header-group;
  }
}`,
  },
  {
    order: '04',
    title: '动态数据填充要控制边界，不能让模板随着数据长度任意膨胀',
    tag: 'Data Binding',
    description:
      '打印文档不是普通页面，数据一旦填进去，版式必须可预测。姓名过长怎么办，备注多行怎么办，空值显示横线还是留白，表格最多显示多少条、超出后是否续页，这些都要提前定规则。特别是做医疗、财务和审批类文档时，数据规范和模板规范必须一起设计，否则页面稍一换数据就跑版。',
    bestFor: ['结构化单据', '明细报表', '档案文书', '病历摘要'],
    focus: [
      '模板变量、空值、超长文本和表格明细要统一规则',
      '对动态区块做最大高度和续页策略设计',
      '让模板系统知道哪些字段可裁剪，哪些必须完整保留',
    ],
    risks: [
      '把所有数据直接插进模板，不做长度约束',
      '空值和异常值没有统一占位规则',
      '图表、图片和备注区无限扩张，打乱整页结构',
    ],
    language: 'ts',
    code: `function formatPrintValue(value: unknown, fallback = '—') {
  if (value === null || value === undefined || value === '') {
    return fallback
  }

  return String(value)
}`,
  },
  {
    order: '05',
    title: '真正上线时，决定成败的是浏览器差异、字体环境和无头导出一致性',
    tag: 'Compatibility',
    description:
      '很多打印方案在开发机上看起来没问题，一到用户机器或服务器导出就出问题。根因通常是浏览器版本差异、系统字体缺失、缩放比例异常、无头环境不支持某些样式，或者 PDF 渲染器与浏览器引擎不同。打印工程必须把预览、真实打印和批量导出当作三类不同环境分别验证。',
    bestFor: ['跨浏览器打印', '批量 PDF 归档', '企业内网单据系统'],
    focus: [
      '分别验证 Chrome、Edge、本地打印和无头导出结果',
      '对字体、页边距、缩放比例和图片资源做环境治理',
      '准备导出失败、加载超时和样式降级兜底方案',
    ],
    risks: [
      '只在本机浏览器预览一次就上线',
      '生产环境缺字库，导致版式全乱',
      '无头导出与用户本地打印完全不是一个效果',
    ],
    language: 'text',
    code: `打印环境验收清单
- 本地浏览器预览是否与真实纸张输出一致
- 无头 PDF 导出是否可复现相同分页
- 字体、图片、签章资源是否在生产环境可用
- 长表格、多页、空值和极端数据是否全部验收`,
  },
];

const comparisonCards = [
  {
    title: '浏览器打印 vs 前端导出 PDF vs 后端排版',
    summary:
      '浏览器打印实现最快，前端导出 PDF 交互更完整，后端排版最稳但最重。要按归档要求、批量需求和版式稳定性来选。',
  },
  {
    title: '业务页面复用打印 vs 独立打印模板',
    summary:
      '复用业务页面前期省事，但后面很难控制；独立模板多一层维护成本，却能显著提高打印稳定性和可扩展性。',
  },
  {
    title: '完全依赖浏览器分页 vs 显式分页策略',
    summary:
      '小文档可以依赖浏览器自动分页；一旦出现长表格、签名区和多页文书，就必须引入显式分页规则和版式控制。',
  },
];
</script>

<style scoped>
.report-print-guide-page {
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

.report-print-guide-page__shell {
  min-height: calc(100vh - 90px);
  border: 1px solid rgba(19, 27, 34, 0.06);
  border-radius: 7px;
  background: rgba(255, 255, 255, 0.82);
}

.report-print-guide-page__top {
  display: flex;
  justify-content: flex-start;
  padding: 18px 18px 0;
}

.report-print-guide-page__back {
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

.report-print-guide-page__back:hover {
  transform: translateY(-1px);
  border-color: rgba(46, 70, 91, 0.18);
  box-shadow: 0 18px 34px rgba(19, 27, 34, 0.08);
}

.report-print-guide-page__content {
  padding: 18px 24px 24px;
}

.report-print-guide-hero {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 320px;
  gap: 20px;
  padding-bottom: 26px;
  border-bottom: 1px solid rgba(19, 27, 34, 0.08);
}

.report-print-guide-hero__eyebrow,
.report-print-guide-section__eyebrow,
.report-print-guide-card__eyebrow,
.report-print-guide-hero__label {
  font-size: 11px;
  line-height: 1.4;
  letter-spacing: 0.24em;
  text-transform: uppercase;
  color: #7b8793;
}

.report-print-guide-hero__title {
  margin-top: 10px;
  font-size: 46px;
  line-height: 1.06;
  font-weight: 600;
  letter-spacing: -0.05em;
  color: #17202a;
}

.report-print-guide-hero__summary {
  max-width: 860px;
  margin-top: 16px;
  font-size: 15px;
  line-height: 1.9;
  color: #58636f;
}

.report-print-guide-hero__panel,
.report-print-guide-card,
.report-print-guide-panel {
  border: 1px solid rgba(19, 27, 34, 0.08);
  border-radius: 7px;
  background: rgba(255, 255, 255, 0.84);
}

.report-print-guide-hero__panel {
  padding: 18px;
}

.report-print-guide-list {
  display: grid;
  gap: 8px;
  margin: 12px 0 0;
  padding-left: 18px;
  font-size: 14px;
  line-height: 1.8;
  color: #56616d;
}

.report-print-guide-grid,
.report-print-guide-columns,
.report-print-guide-stack {
  display: grid;
  gap: 16px;
}

.report-print-guide-grid {
  margin-top: 28px;
  grid-template-columns: repeat(3, minmax(0, 1fr));
}

.report-print-guide-card {
  padding: 18px;
}

.report-print-guide-card__title,
.report-print-guide-panel__title,
.report-print-guide-section__title {
  color: #17202a;
}

.report-print-guide-card__title {
  margin-top: 10px;
  font-size: 22px;
  line-height: 1.25;
  font-weight: 600;
}

.report-print-guide-card__text,
.report-print-guide-panel__text {
  margin-top: 12px;
  font-size: 14px;
  line-height: 1.9;
  color: #596571;
}

.report-print-guide-section {
  margin-top: 28px;
}

.report-print-guide-section__head {
  margin-bottom: 14px;
}

.report-print-guide-section__title {
  margin-top: 8px;
  font-size: 30px;
  line-height: 1.18;
  font-weight: 600;
  letter-spacing: -0.03em;
}

.report-print-guide-columns {
  grid-template-columns: repeat(3, minmax(0, 1fr));
}

.report-print-guide-stack {
  grid-template-columns: repeat(2, minmax(0, 1fr));
}

.report-print-guide-panel {
  padding: 18px;
}

.report-print-guide-panel.is-wide {
  grid-column: 1 / -1;
}

.report-print-guide-panel__eyebrow {
  font-size: 11px;
  line-height: 1.4;
  letter-spacing: 0.24em;
  text-transform: uppercase;
  color: #80909d;
}

.report-print-guide-panel__title {
  font-size: 20px;
  line-height: 1.3;
  font-weight: 600;
}

.report-print-guide-method__head {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 16px;
}

.report-print-guide-method__tag {
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

.report-print-guide-method__grid {
  display: grid;
  gap: 14px;
  margin-top: 16px;
  grid-template-columns: repeat(3, minmax(0, 1fr));
}

.report-print-guide-mini-panel {
  padding: 14px;
  border: 1px solid rgba(19, 27, 34, 0.08);
  border-radius: 7px;
  background: rgba(245, 248, 250, 0.9);
}

.report-print-guide-mini-panel__title {
  font-size: 14px;
  font-weight: 600;
  color: #17202a;
}

.report-print-guide-code-block {
  margin-top: 14px;
}

@media (max-width: 1080px) {
  .report-print-guide-hero,
  .report-print-guide-grid,
  .report-print-guide-columns,
  .report-print-guide-stack,
  .report-print-guide-method__grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 900px) {
  .report-print-guide-page {
    min-height: auto;
    padding: 18px;
  }

  .report-print-guide-page__shell {
    min-height: auto;
  }

  .report-print-guide-page__content {
    padding: 18px;
  }

  .report-print-guide-hero__title {
    font-size: 36px;
  }

  .report-print-guide-section__title {
    font-size: 26px;
  }
}
</style>
