<template>
  <section class="import-guide-page">
    <div class="import-guide-page__shell">
      <div class="import-guide-page__top">
        <RouterLink
          to="/fullstack-guide"
          class="import-guide-page__back"
          aria-label="返回全栈能力菜单"
          title="返回全栈能力菜单"
        >
          <el-icon :size="18"><ArrowLeft /></el-icon>
        </RouterLink>
      </div>

      <div class="import-guide-page__content">
        <header class="import-guide-hero">
          <div>
            <p class="import-guide-hero__eyebrow">
              Frontend Import Engineering
            </p>
            <h1 class="import-guide-hero__title">前端导入工程</h1>
            <p class="import-guide-hero__summary">
              导入功能不是“上传一个 Excel
              然后调接口”这么简单。真正的导入工程，要解决模板设计、字段映射、前置校验、局部错误回显、批量提交、异步导入、结果回执和幂等控制。做不好，用户会觉得系统很蠢；做对了，导入会成为企业系统的高频生产力入口。
            </p>
          </div>

          <div class="import-guide-hero__panel">
            <p class="import-guide-hero__label">学完结果</p>
            <ul class="import-guide-list">
              <li>
                能区分文件上传和业务导入，知道导入真正难点在数据而不是文件本身。
              </li>
              <li>
                能设计模板下载、前置校验、错误标注、批量提交与结果回执的完整链路。
              </li>
              <li>
                能判断何时前端解析，何时后端异步导入，避免把大文件导入做崩。
              </li>
            </ul>
          </div>
        </header>

        <section class="import-guide-grid">
          <article
            v-for="item in quickStages"
            :key="item.order"
            class="import-guide-card"
          >
            <p class="import-guide-card__eyebrow">Stage {{ item.order }}</p>
            <h2 class="import-guide-card__title">{{ item.title }}</h2>
            <p class="import-guide-card__text">{{ item.summary }}</p>
          </article>
        </section>

        <section class="import-guide-section">
          <div class="import-guide-section__head">
            <div>
              <p class="import-guide-section__eyebrow">Decision Order</p>
              <h2 class="import-guide-section__title">
                导入工程的顺序应该是：先约束模板，再处理数据流
              </h2>
            </div>
          </div>

          <div class="import-guide-stack">
            <article
              v-for="stage in importStages"
              :key="stage.order"
              class="import-guide-panel is-wide"
            >
              <div class="import-guide-method__head">
                <div>
                  <p class="import-guide-panel__eyebrow">
                    Stage {{ stage.order }}
                  </p>
                  <h3 class="import-guide-panel__title">{{ stage.title }}</h3>
                </div>
                <span class="import-guide-method__tag">{{ stage.tag }}</span>
              </div>

              <p class="import-guide-panel__text">{{ stage.description }}</p>

              <div class="import-guide-method__grid">
                <section class="import-guide-mini-panel">
                  <p class="import-guide-mini-panel__title">适用场景</p>
                  <ul class="import-guide-list">
                    <li v-for="item in stage.bestFor" :key="item">
                      {{ item }}
                    </li>
                  </ul>
                </section>

                <section class="import-guide-mini-panel">
                  <p class="import-guide-mini-panel__title">实现重点</p>
                  <ul class="import-guide-list">
                    <li v-for="item in stage.focus" :key="item">
                      {{ item }}
                    </li>
                  </ul>
                </section>

                <section class="import-guide-mini-panel">
                  <p class="import-guide-mini-panel__title">常见误区</p>
                  <ul class="import-guide-list">
                    <li v-for="item in stage.risks" :key="item">
                      {{ item }}
                    </li>
                  </ul>
                </section>
              </div>

              <AppCodeBlock
                class="import-guide-code-block"
                :code="stage.code"
                :lang="stage.language"
              />
            </article>
          </div>
        </section>

        <section class="import-guide-section">
          <div class="import-guide-section__head">
            <div>
              <p class="import-guide-section__eyebrow">Comparison</p>
              <h2 class="import-guide-section__title">
                三种导入实现路径的差异
              </h2>
            </div>
          </div>

          <div class="import-guide-columns">
            <article
              v-for="item in comparisonCards"
              :key="item.title"
              class="import-guide-panel"
            >
              <h3 class="import-guide-panel__title">{{ item.title }}</h3>
              <p class="import-guide-panel__text">{{ item.summary }}</p>
            </article>
          </div>
        </section>

        <section class="import-guide-section">
          <div class="import-guide-section__head">
            <div>
              <p class="import-guide-section__eyebrow">Best Practice</p>
              <h2 class="import-guide-section__title">
                一套可落地的导入页面状态流
              </h2>
            </div>
          </div>

          <article class="import-guide-panel is-wide">
            <p class="import-guide-panel__text">
              一个成熟导入页，至少要把“选文件、解析、校验、预览、提交、回执”拆成独立状态。这样你才能做断点重试、错误下载、二次确认和局部修复。
            </p>

            <AppCodeBlock
              class="import-guide-code-block"
              :code="flowExample"
              lang="typescript"
            />
          </article>
        </section>

        <section class="import-guide-section">
          <div class="import-guide-section__head">
            <div>
              <p class="import-guide-section__eyebrow">Checklist</p>
              <h2 class="import-guide-section__title">
                做企业级导入时别漏掉这些点
              </h2>
            </div>
          </div>

          <article class="import-guide-panel is-wide">
            <ul class="import-guide-list">
              <li>
                模板文件要稳定版本化，字段说明、示例值、枚举约束尽量写清楚。
              </li>
              <li>
                前端至少要做列头校验、必填校验、基础格式校验，减少无效请求。
              </li>
              <li>
                大批量数据不要一条条实时提交，优先批量提交或后端异步任务导入。
              </li>
              <li>错误信息必须可定位到行、列、字段，不要只返回“导入失败”。</li>
              <li>
                成功和失败结果都应该支持下载回执，方便业务人员复盘和二次修正。
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
    title: '先设计模板',
    summary: '导入质量的大头不在解析库，而在模板是否足够清晰、稳定、可约束。',
  },
  {
    order: '02',
    title: '前端先拦第一层错误',
    summary: '列头不对、必填缺失、格式明显错误，应该尽量在前端拦住。',
  },
  {
    order: '03',
    title: '预览不只是展示',
    summary: '预览阶段要让用户确认映射关系、脏数据、去重结果和风险提示。',
  },
  {
    order: '04',
    title: '提交要有批次感',
    summary: '导入本质是批量变更，必须有批次号、状态和回执，而不是一锤子买卖。',
  },
  {
    order: '05',
    title: '错误要能修正再导入',
    summary: '导入不是一次成败，而是“发现问题后快速修正再提交”的闭环。',
  },
];

const importStages = [
  {
    order: '01',
    title: '先把模板设计成产品，而不是随手导出一张表',
    tag: '模板治理',
    description:
      '导入的第一步不是选库，而是模板设计。模板里哪些列必须有、哪些列允许为空、日期写法是什么、枚举值是中文还是编码、是否允许多 sheet，这些都要先定下来。模板如果模糊，后面的校验和错误提示都会变得混乱。',
    bestFor: ['主数据导入', '人员导入', '订单导入', '医疗表单批量录入'],
    focus: [
      '列头名称、顺序和必填规则固定化',
      '示例值和字段说明一起下发',
      '模板版本要可追踪，避免新旧模板混用',
    ],
    risks: [
      '不同页面共用一份含糊模板',
      '模板字段解释只写在口头说明里',
      '上线后改模板但不做版本兼容',
    ],
    language: 'text',
    code: `Template Contract
- 字段名：住院号 / 科室 / 开立日期
- 数据类型：字符串 / 枚举 / 日期
- 约束：必填 / 唯一 / 长度 / 正则
- 示例：CARD-001 / 心内科 / 2026-05-02`,
  },
  {
    order: '02',
    title: '前端解析的目标不是“把 Excel 读出来”，而是生成业务可校验结构',
    tag: '解析归一',
    description:
      '很多人把导入写成“拿到二维数组然后直接调接口”。这会导致页面无法做真正的结构化校验。更好的方式是先把原始单元格转换成统一记录结构，再标注行号、原值、标准值和错误信息。这样预览、定位和回执都能复用同一份数据模型。',
    bestFor: [
      '需要前置预览的导入页',
      '表格型业务系统',
      '需要错误逐行定位的场景',
    ],
    focus: [
      '保留原始行号与列头映射',
      '把原始值与标准化值分开存',
      '解析层只做结构归一，不做复杂业务提交',
    ],
    risks: [
      '解析完成后只剩一堆匿名数组',
      '行号丢失导致错误无法回显',
      '前端和后端对字段转换规则不一致',
    ],
    language: 'typescript',
    code: `type ImportRow = {
  rowNo: number;
  raw: Record<string, string>;
  normalized: {
    patientNo?: string;
    departmentCode?: string;
    orderDate?: string;
  };
  errors: string[];
};`,
  },
  {
    order: '03',
    title: '把校验拆成三层：格式校验、字典校验、业务校验',
    tag: '校验分层',
    description:
      '导入最怕的是所有错误都扔给后端兜底。前端应该先做基础格式校验，比如必填、长度、日期格式；后端再做字典校验和业务校验，比如科室是否存在、住院号是否已出院、同一批次是否重复。这样前端和后端各司其职，体验和正确性都更稳。',
    bestFor: [
      '对数据质量要求高的系统',
      '字典项较多的系统',
      '需要高频导入的业务团队',
    ],
    focus: [
      '前端拦基础错误，后端拦业务错误',
      '错误信息回到行列级别，而不是全局 toast',
      '校验结果支持二次修正后继续导入',
    ],
    risks: [
      '所有错误都靠后端一次性报',
      '错误描述不带行号列号',
      '改一处错误必须整表重新上传',
    ],
    language: 'json',
    code: `{
  "rowNo": 12,
  "field": "departmentCode",
  "message": "科室编码不存在",
  "rawValue": "CARD-X",
  "suggestion": "请使用字典内有效科室编码"
}`,
  },
  {
    order: '04',
    title: '大数据量导入别走同步提交，要引入批次和异步任务',
    tag: '批次提交',
    description:
      '少量导入可以同步提交，但一旦数据量变大，或者后端还要做复杂校验、去重、事务落库，就应该用异步导入任务。前端只负责上传文件或标准化数据，后端生成批次任务，前端轮询或订阅任务状态，最后提供成功失败回执下载。',
    bestFor: ['千行以上导入', '复杂事务写入', '需要审计留痕的系统'],
    focus: [
      '建立 importId 或 batchId',
      '导入进度、成功数、失败数可观察',
      '支持导入历史和回执下载',
    ],
    risks: [
      '大文件同步提交导致页面超时',
      '用户刷新页面后导入状态丢失',
      '没有批次号，无法追踪这次导入做了什么',
    ],
    language: 'typescript',
    code: `type ImportTaskStatus =
  | 'idle'
  | 'uploaded'
  | 'validating'
  | 'importing'
  | 'partial-success'
  | 'success'
  | 'failed';`,
  },
  {
    order: '05',
    title: '导入回执和错误导出是体验关键，不是可选项',
    tag: '结果闭环',
    description:
      '用户最关心的不是系统内部跑了哪些逻辑，而是“哪几条成功了、哪几条失败了、我接下来怎么改”。因此导入结果必须结构化返回，最好支持失败数据导出、错误原因说明、建议修正方式和再次导入入口。没有这层闭环，导入体验会非常差。',
    bestFor: ['运营后台', '医疗 HIS / EMR', '财务与供应链系统'],
    focus: [
      '结果页展示成功、失败、警告数量',
      '失败项支持导出原表附加错误列',
      '支持只重试失败数据而不是全量重来',
    ],
    risks: [
      '只告诉用户“成功 80 条，失败 20 条”',
      '失败数据不能下载修正',
      '用户每次都要从头准备新文件',
    ],
    language: 'text',
    code: `Import Receipt
- batchId: IMP-20260502-001
- total: 512
- success: 486
- failed: 26
- receiptUrl: /api/imports/IMP-20260502-001/receipt.xlsx`,
  },
];

const comparisonCards = [
  {
    title: '前端解析后提交标准化 JSON',
    summary:
      '适合中小数据量、需要预览和即时纠错的场景。优点是交互友好，缺点是浏览器性能和解析一致性要自己兜住。',
  },
  {
    title: '只上传文件，由后端异步解析',
    summary:
      '适合大文件和复杂业务校验。优点是稳定、可审计，缺点是前端即时反馈较弱，需要单独设计任务状态与回执体验。',
  },
  {
    title: '前端预校验 + 后端异步最终导入',
    summary:
      '这是大多数企业系统最稳的方案。前端先挡掉明显错误，后端再做最终校验和落库，兼顾体验与可靠性。',
  },
];

const flowExample = `type ImportStep =
  | 'select-file'
  | 'parse-file'
  | 'validate-data'
  | 'preview-data'
  | 'submit-task'
  | 'poll-result'
  | 'download-receipt';

const stepOrder: ImportStep[] = [
  'select-file',
  'parse-file',
  'validate-data',
  'preview-data',
  'submit-task',
  'poll-result',
  'download-receipt',
];`;
</script>

<style scoped>
.import-guide-page {
  min-height: 100vh;
  padding: 32px;
  background:
    radial-gradient(
      circle at top left,
      rgba(214, 221, 229, 0.34),
      transparent 26%
    ),
    linear-gradient(180deg, #fbfcfd 0%, #eef2f6 100%);
}

.import-guide-page__shell {
  max-width: 1240px;
  margin: 0 auto;
}

.import-guide-page__top {
  display: flex;
  justify-content: flex-start;
  margin-bottom: 18px;
}

.import-guide-page__back {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 42px;
  height: 42px;
  border: 1px solid rgba(19, 27, 34, 0.08);
  border-radius: 999px;
  color: #17202a;
  background: rgba(255, 255, 255, 0.92);
  text-decoration: none;
  box-shadow: 0 16px 36px rgba(19, 27, 34, 0.08);
  transition:
    transform 160ms ease,
    border-color 160ms ease,
    box-shadow 160ms ease;
}

.import-guide-page__back:hover {
  transform: translateY(-1px);
  border-color: rgba(67, 94, 118, 0.18);
  box-shadow: 0 18px 42px rgba(19, 27, 34, 0.1);
}

.import-guide-page__content {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.import-guide-hero,
.import-guide-panel,
.import-guide-card {
  border: 1px solid rgba(19, 27, 34, 0.08);
  border-radius: 7px;
  background: rgba(255, 255, 255, 0.96);
  box-shadow: 0 24px 54px rgba(19, 27, 34, 0.06);
}

.import-guide-hero {
  display: grid;
  grid-template-columns: minmax(0, 1.4fr) minmax(320px, 0.8fr);
  gap: 18px;
  padding: 28px;
}

.import-guide-hero__eyebrow,
.import-guide-section__eyebrow,
.import-guide-card__eyebrow,
.import-guide-panel__eyebrow {
  font-size: 11px;
  line-height: 1.4;
  letter-spacing: 0.24em;
  text-transform: uppercase;
  color: #7e8894;
}

.import-guide-hero__title {
  margin-top: 10px;
  font-size: 42px;
  line-height: 1.06;
  font-weight: 600;
  letter-spacing: -0.04em;
  color: #17202a;
}

.import-guide-hero__summary,
.import-guide-panel__text,
.import-guide-card__text {
  font-size: 15px;
  line-height: 1.9;
  color: #55606c;
}

.import-guide-hero__summary {
  margin-top: 16px;
  max-width: 760px;
}

.import-guide-hero__panel,
.import-guide-mini-panel {
  padding: 20px;
  border: 1px solid rgba(19, 27, 34, 0.08);
  border-radius: 7px;
  background: linear-gradient(180deg, #ffffff 0%, #f5f8fb 100%);
}

.import-guide-hero__label,
.import-guide-mini-panel__title {
  font-size: 13px;
  line-height: 1.5;
  font-weight: 600;
  color: #17202a;
}

.import-guide-list {
  margin: 12px 0 0;
  padding-left: 18px;
  display: grid;
  gap: 8px;
  color: #55606c;
  font-size: 14px;
  line-height: 1.75;
}

.import-guide-grid,
.import-guide-columns {
  display: grid;
  gap: 16px;
}

.import-guide-grid {
  grid-template-columns: repeat(5, minmax(0, 1fr));
}

.import-guide-card {
  padding: 20px;
}

.import-guide-card__title,
.import-guide-panel__title,
.import-guide-section__title {
  color: #17202a;
}

.import-guide-card__title {
  margin-top: 8px;
  font-size: 19px;
  line-height: 1.35;
  font-weight: 600;
}

.import-guide-card__text {
  margin-top: 10px;
}

.import-guide-section {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.import-guide-section__head {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
}

.import-guide-section__title {
  margin-top: 8px;
  font-size: 28px;
  line-height: 1.2;
  font-weight: 600;
  letter-spacing: -0.03em;
}

.import-guide-stack {
  display: grid;
  gap: 16px;
}

.import-guide-panel {
  padding: 24px;
}

.import-guide-panel.is-wide {
  padding: 26px;
}

.import-guide-method__head {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 12px;
}

.import-guide-method__tag {
  display: inline-flex;
  align-items: center;
  min-height: 30px;
  padding: 0 12px;
  border-radius: 999px;
  background: rgba(90, 106, 121, 0.1);
  color: #465261;
  font-size: 12px;
  line-height: 1;
}

.import-guide-panel__title {
  margin-top: 8px;
  font-size: 24px;
  line-height: 1.28;
  font-weight: 600;
}

.import-guide-panel__text {
  margin-top: 14px;
}

.import-guide-method__grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 14px;
  margin-top: 18px;
}

.import-guide-code-block {
  margin-top: 18px;
}

.import-guide-columns {
  grid-template-columns: repeat(3, minmax(0, 1fr));
}

@media (max-width: 1100px) {
  .import-guide-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .import-guide-columns,
  .import-guide-method__grid,
  .import-guide-hero {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 720px) {
  .import-guide-page {
    padding: 18px;
  }

  .import-guide-grid {
    grid-template-columns: 1fr;
  }

  .import-guide-hero,
  .import-guide-card,
  .import-guide-panel {
    padding: 18px;
  }

  .import-guide-hero__title {
    font-size: 32px;
  }

  .import-guide-section__title {
    font-size: 22px;
  }
}
</style>
