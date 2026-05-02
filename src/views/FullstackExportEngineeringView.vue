<template>
  <section class="export-guide-page">
    <div class="export-guide-page__shell">
      <div class="export-guide-page__top">
        <RouterLink
          to="/fullstack-guide"
          class="export-guide-page__back"
          aria-label="返回全栈能力菜单"
          title="返回全栈能力菜单"
        >
          <el-icon :size="18"><ArrowLeft /></el-icon>
        </RouterLink>
      </div>

      <div class="export-guide-page__content">
        <header class="export-guide-hero">
          <div>
            <p class="export-guide-hero__eyebrow">
              Frontend Export Engineering
            </p>
            <h1 class="export-guide-hero__title">前端导出工程</h1>
            <p class="export-guide-hero__summary">
              导出不是“点按钮下载一个
              Excel”就完了。真正的导出工程要处理字段权限、导出范围、异步任务、导出中心、失败回执、文件有效期和大数据量的性能边界。做得粗糙，用户会卡死浏览器、拿到错数据、甚至把敏感字段一并导出去；做得成熟，导出会成为后台系统最稳定的生产力能力之一。
            </p>
          </div>

          <div class="export-guide-hero__panel">
            <p class="export-guide-hero__label">学完结果</p>
            <ul class="export-guide-list">
              <li>
                能区分小数据即时导出和大数据异步导出的边界，不再一把梭前端生成文件。
              </li>
              <li>
                能设计导出条件冻结、任务中心、回执下载和权限校验的一整套链路。
              </li>
              <li>
                能和后端约定导出字段、文件格式、任务状态与有效期，避免导出链路失控。
              </li>
            </ul>
          </div>
        </header>

        <section class="export-guide-grid">
          <article
            v-for="item in quickStages"
            :key="item.order"
            class="export-guide-card"
          >
            <p class="export-guide-card__eyebrow">Stage {{ item.order }}</p>
            <h2 class="export-guide-card__title">{{ item.title }}</h2>
            <p class="export-guide-card__text">{{ item.summary }}</p>
          </article>
        </section>

        <section class="export-guide-section">
          <div class="export-guide-section__head">
            <div>
              <p class="export-guide-section__eyebrow">Decision Order</p>
              <h2 class="export-guide-section__title">
                导出工程先定数据边界，再选同步还是异步
              </h2>
            </div>
          </div>

          <div class="export-guide-stack">
            <article
              v-for="stage in exportStages"
              :key="stage.order"
              class="export-guide-panel is-wide"
            >
              <div class="export-guide-method__head">
                <div>
                  <p class="export-guide-panel__eyebrow">
                    Stage {{ stage.order }}
                  </p>
                  <h3 class="export-guide-panel__title">{{ stage.title }}</h3>
                </div>
                <span class="export-guide-method__tag">{{ stage.tag }}</span>
              </div>

              <p class="export-guide-panel__text">{{ stage.description }}</p>

              <div class="export-guide-method__grid">
                <section class="export-guide-mini-panel">
                  <p class="export-guide-mini-panel__title">适用场景</p>
                  <ul class="export-guide-list">
                    <li v-for="item in stage.bestFor" :key="item">
                      {{ item }}
                    </li>
                  </ul>
                </section>

                <section class="export-guide-mini-panel">
                  <p class="export-guide-mini-panel__title">实现重点</p>
                  <ul class="export-guide-list">
                    <li v-for="item in stage.focus" :key="item">
                      {{ item }}
                    </li>
                  </ul>
                </section>

                <section class="export-guide-mini-panel">
                  <p class="export-guide-mini-panel__title">常见误区</p>
                  <ul class="export-guide-list">
                    <li v-for="item in stage.risks" :key="item">
                      {{ item }}
                    </li>
                  </ul>
                </section>
              </div>

              <AppCodeBlock
                class="export-guide-code-block"
                :code="stage.code"
                :lang="stage.language"
              />
            </article>
          </div>
        </section>

        <section class="export-guide-section">
          <div class="export-guide-section__head">
            <div>
              <p class="export-guide-section__eyebrow">Comparison</p>
              <h2 class="export-guide-section__title">
                三种常见导出方式的取舍
              </h2>
            </div>
          </div>

          <div class="export-guide-columns">
            <article
              v-for="item in comparisonCards"
              :key="item.title"
              class="export-guide-panel"
            >
              <h3 class="export-guide-panel__title">{{ item.title }}</h3>
              <p class="export-guide-panel__text">{{ item.summary }}</p>
            </article>
          </div>
        </section>

        <section class="export-guide-section">
          <div class="export-guide-section__head">
            <div>
              <p class="export-guide-section__eyebrow">Best Practice</p>
              <h2 class="export-guide-section__title">
                导出任务中心应该有哪些状态
              </h2>
            </div>
          </div>

          <article class="export-guide-panel is-wide">
            <p class="export-guide-panel__text">
              一旦走异步导出，前端就不能只给一个“正在导出”的
              loading。你需要可追踪状态、失败原因、下载入口和文件过期提示，这才叫导出中心，而不是一个临时弹窗。
            </p>

            <AppCodeBlock
              class="export-guide-code-block"
              :code="taskModelExample"
              lang="typescript"
            />
          </article>
        </section>

        <section class="export-guide-section">
          <div class="export-guide-section__head">
            <div>
              <p class="export-guide-section__eyebrow">Checklist</p>
              <h2 class="export-guide-section__title">
                导出能力上线前必须自查的 5 件事
              </h2>
            </div>
          </div>

          <article class="export-guide-panel is-wide">
            <ul class="export-guide-list">
              <li>
                导出时要冻结筛选条件和字段配置，避免用户改完筛选却导出旧结果。
              </li>
              <li>大数据量必须走异步任务，别让浏览器直接扛百万行导出。</li>
              <li>
                导出字段要再做一次权限校验，不能默认页面能看就一定能导出。
              </li>
              <li>导出失败要返回可理解原因，必要时给错误回执或拆批建议。</li>
              <li>
                导出文件必须有有效期、下载审计和来源标记，避免文件长期裸奔。
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
    title: '先冻结导出条件',
    summary:
      '导出的不是当前屏幕长什么样，而是某一刻某一组明确条件下的数据快照。',
  },
  {
    order: '02',
    title: '按数据量选方案',
    summary: '几十行和几十万行的导出，根本不是同一套工程方案。',
  },
  {
    order: '03',
    title: '导出字段再鉴权',
    summary: '页面能看不代表全部能导，敏感字段和批量导出需要更严格控制。',
  },
  {
    order: '04',
    title: '异步导出要有任务中心',
    summary: '任务状态、下载入口、失败原因和有效期提示，缺一项用户体验都会崩。',
  },
  {
    order: '05',
    title: '文件要可追踪',
    summary:
      '导出文件需要下载审计、来源标记和过期策略，不能只生成一个临时链接。',
  },
];

const exportStages = [
  {
    order: '01',
    title: '先定义导出的数据边界和权限边界',
    tag: '数据收口',
    description:
      '导出最容易出问题的，不是技术实现，而是边界失控。当前筛选条件是什么、导出哪些字段、是否包含隐藏列、是否允许导出全部结果、是否带敏感字段，这些都要先定义清楚。否则技术做得再快，也会把错误数据稳定导出去。',
    bestFor: ['后台列表导出', '医疗记录导出', '财务报表导出', '运营数据导出'],
    focus: [
      '冻结筛选条件、排序和字段配置',
      '导出字段走独立权限校验',
      '导出请求里明确资源范围与来源页面',
    ],
    risks: [
      '页面临时状态变化导致导出条件不一致',
      '默认导出全部字段和全部数据',
      '只校验按钮权限，不校验字段权限',
    ],
    language: 'json',
    code: `{
  "module": "patient-list",
  "filters": {
    "department": "cardiology",
    "dateFrom": "2026-05-01",
    "dateTo": "2026-05-31"
  },
  "fields": ["patientNo", "name", "doctor", "visitDate"]
}`,
  },
  {
    order: '02',
    title: '小数据同步导出，大数据必须异步任务化',
    tag: '方案选择',
    description:
      '导出 100 行和导出 100 万行不是一个问题。同步导出适合小数据、低频场景，直接拿结果文件即可；一旦数据量大、需要复杂查询或生成 Excel/PDF，就应该走异步任务，让后端慢慢算，前端只负责提交任务和接收回执。',
    bestFor: ['管理后台', '导出峰值高的系统', '复杂筛选结果导出'],
    focus: [
      '按数据量和生成成本划分同步/异步阈值',
      '异步导出返回 taskId 而不是长连接卡死',
      '支持轮询或消息通知任务状态',
    ],
    risks: [
      '所有导出都走同步接口',
      '前端尝试自己生成超大 Excel',
      '任务失败后用户无从得知原因',
    ],
    language: 'typescript',
    code: `const shouldUseAsyncExport = (
  totalCount: number,
  format: 'xlsx' | 'csv' | 'pdf',
) => totalCount > 5000 || format === 'pdf';`,
  },
  {
    order: '03',
    title: '异步导出一定要有导出中心，而不是只弹一个“稍后下载”',
    tag: '任务中心',
    description:
      '一旦走异步任务，用户就需要一个稳定查看入口。导出中心至少要能看到任务名称、提交时间、状态、失败原因、下载次数和过期时间。这样用户不用守在当前页等结果，也不会在多个页面里迷失下载入口。',
    bestFor: ['企业后台', '导出需求高频的系统', '多人协作运营平台'],
    focus: [
      '任务中心支持筛选、重试、重新下载',
      '文件过期前有明确提示',
      '失败任务展示结构化原因而不是泛化错误',
    ],
    risks: [
      '导出完成后只给一次性 toast',
      '关闭页面后彻底找不到导出文件',
      '所有导出任务挤在一个无搜索的列表里',
    ],
    language: 'text',
    code: `Export Center
- pending
- processing
- success
- failed
- expired
- revoked`,
  },
  {
    order: '04',
    title: '导出文件不是裸链接，必须带有效期、审计和来源标记',
    tag: '安全追踪',
    description:
      '很多团队把导出当成“生成一个文件地址”就结束了，但导出的常常是最敏感的数据集合。更稳的做法是：文件设置有效期，下载动作记审计，文件名带业务来源，必要时限制下载次数或要求再次鉴权。这样出了问题你至少能知道谁导的、何时下的、文件什么时候过期。',
    bestFor: ['敏感数据平台', '医疗/金融/人事系统', '导出权限分级场景'],
    focus: [
      '导出文件链接设置过期时间',
      '下载动作单独记审计日志',
      '高敏导出支持二次确认或验证码',
    ],
    risks: [
      '生成一个永久有效的公网下载链接',
      '下载动作不留审计记录',
      '导出文件命名含混，无法识别来源',
    ],
    language: 'text',
    code: `File Policy
- expireAt: 2026-05-02T20:00:00+08:00
- downloadAudit: enabled
- fileName: patient-list-cardiology-20260502.xlsx
- accessScope: creator-only`,
  },
  {
    order: '05',
    title: '失败回执和拆批建议比一句“导出失败”更重要',
    tag: '失败恢复',
    description:
      '导出失败时，用户最需要知道的是为什么失败、该怎么继续。是数据量过大、权限不足、筛选条件异常、模板损坏，还是后端任务超时？成熟系统会给结构化失败原因，并在必要时提示拆批导出、缩小范围或切换格式，而不是只告诉用户稍后重试。',
    bestFor: ['大数据导出', '复杂筛选报表', '跨部门运营系统'],
    focus: [
      '失败原因可分类，不做一刀切错误文案',
      '支持复制任务号和查看技术支持信息',
      '给出可执行的恢复建议，比如分批导出',
    ],
    risks: [
      '所有失败都只提示“请稍后再试”',
      '用户不知道该缩范围还是重试',
      '客服无法根据任务号排障',
    ],
    language: 'json',
    code: `{
  "taskId": "EXP-20260502-001",
  "status": "failed",
  "reasonCode": "TOO_LARGE_RANGE",
  "message": "导出范围过大，请按科室或日期拆批导出"
}`,
  },
];

const comparisonCards = [
  {
    title: '前端直接生成文件',
    summary:
      '适合少量数据和轻量导出，优点是快，缺点是浏览器内存和格式控制能力有限，不适合复杂或超大导出。',
  },
  {
    title: '后端同步生成导出',
    summary:
      '适合中等数据量、格式较固定的导出。实现简单，但请求时间过长时用户体验会迅速恶化。',
  },
  {
    title: '后端异步任务导出',
    summary:
      '这是大多数企业系统最稳的方案。成本是多一套任务中心，但收益是稳定、可追踪、可审计、可扩展。',
  },
];

const taskModelExample = `type ExportTaskStatus =
  | 'pending'
  | 'processing'
  | 'success'
  | 'failed'
  | 'expired';

type ExportTask = {
  taskId: string;
  taskName: string;
  status: ExportTaskStatus;
  createdAt: string;
  expireAt?: string;
  downloadUrl?: string;
  failReason?: string;
};`;
</script>

<style scoped>
.export-guide-page {
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

.export-guide-page__shell {
  max-width: 1240px;
  margin: 0 auto;
}

.export-guide-page__top {
  display: flex;
  justify-content: flex-start;
  margin-bottom: 18px;
}

.export-guide-page__back {
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

.export-guide-page__back:hover {
  transform: translateY(-1px);
  border-color: rgba(67, 94, 118, 0.18);
  box-shadow: 0 18px 42px rgba(19, 27, 34, 0.1);
}

.export-guide-page__content {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.export-guide-hero,
.export-guide-panel,
.export-guide-card {
  border: 1px solid rgba(19, 27, 34, 0.08);
  border-radius: 7px;
  background: rgba(255, 255, 255, 0.96);
  box-shadow: 0 24px 54px rgba(19, 27, 34, 0.06);
}

.export-guide-hero {
  display: grid;
  grid-template-columns: minmax(0, 1.4fr) minmax(320px, 0.8fr);
  gap: 18px;
  padding: 28px;
}

.export-guide-hero__eyebrow,
.export-guide-section__eyebrow,
.export-guide-card__eyebrow,
.export-guide-panel__eyebrow {
  font-size: 11px;
  line-height: 1.4;
  letter-spacing: 0.24em;
  text-transform: uppercase;
  color: #7e8894;
}

.export-guide-hero__title {
  margin-top: 10px;
  font-size: 42px;
  line-height: 1.06;
  font-weight: 600;
  letter-spacing: -0.04em;
  color: #17202a;
}

.export-guide-hero__summary,
.export-guide-panel__text,
.export-guide-card__text {
  font-size: 15px;
  line-height: 1.9;
  color: #55606c;
}

.export-guide-hero__summary {
  margin-top: 16px;
  max-width: 760px;
}

.export-guide-hero__panel,
.export-guide-mini-panel {
  padding: 20px;
  border: 1px solid rgba(19, 27, 34, 0.08);
  border-radius: 7px;
  background: linear-gradient(180deg, #ffffff 0%, #f5f8fb 100%);
}

.export-guide-hero__label,
.export-guide-mini-panel__title {
  font-size: 13px;
  line-height: 1.5;
  font-weight: 600;
  color: #17202a;
}

.export-guide-list {
  margin: 12px 0 0;
  padding-left: 18px;
  display: grid;
  gap: 8px;
  color: #55606c;
  font-size: 14px;
  line-height: 1.75;
}

.export-guide-grid,
.export-guide-columns {
  display: grid;
  gap: 16px;
}

.export-guide-grid {
  grid-template-columns: repeat(5, minmax(0, 1fr));
}

.export-guide-card {
  padding: 20px;
}

.export-guide-card__title,
.export-guide-panel__title,
.export-guide-section__title {
  color: #17202a;
}

.export-guide-card__title {
  margin-top: 8px;
  font-size: 19px;
  line-height: 1.35;
  font-weight: 600;
}

.export-guide-card__text {
  margin-top: 10px;
}

.export-guide-section {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.export-guide-section__head {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
}

.export-guide-section__title {
  margin-top: 8px;
  font-size: 28px;
  line-height: 1.2;
  font-weight: 600;
  letter-spacing: -0.03em;
}

.export-guide-stack {
  display: grid;
  gap: 16px;
}

.export-guide-panel {
  padding: 24px;
}

.export-guide-panel.is-wide {
  padding: 26px;
}

.export-guide-method__head {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 12px;
}

.export-guide-method__tag {
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

.export-guide-panel__title {
  margin-top: 8px;
  font-size: 24px;
  line-height: 1.28;
  font-weight: 600;
}

.export-guide-panel__text {
  margin-top: 14px;
}

.export-guide-method__grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 14px;
  margin-top: 18px;
}

.export-guide-code-block {
  margin-top: 18px;
}

.export-guide-columns {
  grid-template-columns: repeat(3, minmax(0, 1fr));
}

@media (max-width: 1100px) {
  .export-guide-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .export-guide-columns,
  .export-guide-method__grid,
  .export-guide-hero {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 720px) {
  .export-guide-page {
    padding: 18px;
  }

  .export-guide-grid {
    grid-template-columns: 1fr;
  }

  .export-guide-hero,
  .export-guide-card,
  .export-guide-panel {
    padding: 18px;
  }

  .export-guide-hero__title {
    font-size: 32px;
  }

  .export-guide-section__title {
    font-size: 22px;
  }
}
</style>
