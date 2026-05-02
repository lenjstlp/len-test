<template>
  <section class="audit-guide-page">
    <div class="audit-guide-page__shell">
      <div class="audit-guide-page__top">
        <RouterLink
          to="/fullstack-guide"
          class="audit-guide-page__back"
          aria-label="返回全栈能力菜单"
          title="返回全栈能力菜单"
        >
          <el-icon :size="18"><ArrowLeft /></el-icon>
        </RouterLink>
      </div>

      <div class="audit-guide-page__content">
        <header class="audit-guide-hero">
          <div>
            <p class="audit-guide-hero__eyebrow">
              Frontend Audit Log Engineering
            </p>
            <h1 class="audit-guide-hero__title">前端审计日志工程</h1>
            <p class="audit-guide-hero__summary">
              审计日志不是“列表页展示一堆操作记录”而已。真正的审计工程要解决记录什么、记录到什么粒度、如何展示变更前后、怎样支持追责与回放、如何避免敏感信息泄露。对医疗、支付、权限、流程系统来说，审计日志不是装饰功能，而是系统可信度的一部分。
            </p>
          </div>

          <div class="audit-guide-hero__panel">
            <p class="audit-guide-hero__label">学完结果</p>
            <ul class="audit-guide-list">
              <li>
                能分清业务日志、埋点日志、错误日志与审计日志之间的职责边界。
              </li>
              <li>
                能设计一套包含操作者、对象、动作、前后值、来源和风险等级的审计模型。
              </li>
              <li>能做好变更对比、回放查看、敏感字段脱敏和高风险操作追踪。</li>
            </ul>
          </div>
        </header>

        <section class="audit-guide-grid">
          <article
            v-for="item in quickStages"
            :key="item.order"
            class="audit-guide-card"
          >
            <p class="audit-guide-card__eyebrow">Stage {{ item.order }}</p>
            <h2 class="audit-guide-card__title">{{ item.title }}</h2>
            <p class="audit-guide-card__text">{{ item.summary }}</p>
          </article>
        </section>

        <section class="audit-guide-section">
          <div class="audit-guide-section__head">
            <div>
              <p class="audit-guide-section__eyebrow">Decision Order</p>
              <h2 class="audit-guide-section__title">
                审计日志先定义证据模型，再设计展示方式
              </h2>
            </div>
          </div>

          <div class="audit-guide-stack">
            <article
              v-for="stage in auditStages"
              :key="stage.order"
              class="audit-guide-panel is-wide"
            >
              <div class="audit-guide-method__head">
                <div>
                  <p class="audit-guide-panel__eyebrow">
                    Stage {{ stage.order }}
                  </p>
                  <h3 class="audit-guide-panel__title">{{ stage.title }}</h3>
                </div>
                <span class="audit-guide-method__tag">{{ stage.tag }}</span>
              </div>

              <p class="audit-guide-panel__text">{{ stage.description }}</p>

              <div class="audit-guide-method__grid">
                <section class="audit-guide-mini-panel">
                  <p class="audit-guide-mini-panel__title">适用场景</p>
                  <ul class="audit-guide-list">
                    <li v-for="item in stage.bestFor" :key="item">
                      {{ item }}
                    </li>
                  </ul>
                </section>

                <section class="audit-guide-mini-panel">
                  <p class="audit-guide-mini-panel__title">实现重点</p>
                  <ul class="audit-guide-list">
                    <li v-for="item in stage.focus" :key="item">
                      {{ item }}
                    </li>
                  </ul>
                </section>

                <section class="audit-guide-mini-panel">
                  <p class="audit-guide-mini-panel__title">常见误区</p>
                  <ul class="audit-guide-list">
                    <li v-for="item in stage.risks" :key="item">
                      {{ item }}
                    </li>
                  </ul>
                </section>
              </div>

              <AppCodeBlock
                class="audit-guide-code-block"
                :code="stage.code"
                :lang="stage.language"
              />
            </article>
          </div>
        </section>

        <section class="audit-guide-section">
          <div class="audit-guide-section__head">
            <div>
              <p class="audit-guide-section__eyebrow">Comparison</p>
              <h2 class="audit-guide-section__title">几类常见日志别混着做</h2>
            </div>
          </div>

          <div class="audit-guide-columns">
            <article
              v-for="item in comparisonCards"
              :key="item.title"
              class="audit-guide-panel"
            >
              <h3 class="audit-guide-panel__title">{{ item.title }}</h3>
              <p class="audit-guide-panel__text">{{ item.summary }}</p>
            </article>
          </div>
        </section>

        <section class="audit-guide-section">
          <div class="audit-guide-section__head">
            <div>
              <p class="audit-guide-section__eyebrow">Best Practice</p>
              <h2 class="audit-guide-section__title">
                一条可用于回放与追责的审计日志最小结构
              </h2>
            </div>
          </div>

          <article class="audit-guide-panel is-wide">
            <p class="audit-guide-panel__text">
              真正有用的审计日志，不该只剩一句“张三修改了数据”。至少要能回答：改了谁、改了什么、从什么改成什么、从哪里发起、为什么允许改、现在如何追溯。
            </p>

            <AppCodeBlock
              class="audit-guide-code-block"
              :code="auditModelExample"
              lang="json"
            />
          </article>
        </section>

        <section class="audit-guide-section">
          <div class="audit-guide-section__head">
            <div>
              <p class="audit-guide-section__eyebrow">Checklist</p>
              <h2 class="audit-guide-section__title">
                做审计日志时最容易漏掉的 5 个点
              </h2>
            </div>
          </div>

          <article class="audit-guide-panel is-wide">
            <ul class="audit-guide-list">
              <li>
                不要只记“谁点了按钮”，要记“对哪个资源做了什么动作，前后值如何变化”。
              </li>
              <li>敏感字段必须脱敏或摘要化，避免审计系统本身变成泄露源。</li>
              <li>高风险操作最好关联审批单号、IP、设备信息和权限快照。</li>
              <li>日志详情页要支持字段级 diff，而不是整段 JSON 生硬展开。</li>
              <li>
                前端展示层要支持过滤、回放定位、导出回执，方便排障和追责。
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
    title: '先定记录模型',
    summary: '没有统一模型，日志列表再花哨也很难真正用于排障、合规和追责。',
  },
  {
    order: '02',
    title: '前后值必须可比',
    summary:
      '如果看不到变更前后差异，日志就只是一句空泛描述，无法支持审计判断。',
  },
  {
    order: '03',
    title: '敏感信息先脱敏',
    summary: '审计日志常常比业务数据更集中，越是关键系统越要先考虑安全边界。',
  },
  {
    order: '04',
    title: '高风险操作要可回放',
    summary:
      '不是所有操作都要录屏，但关键链路至少要能基于证据字段还原发生了什么。',
  },
  {
    order: '05',
    title: '展示层要支持筛查',
    summary: '真正用审计的人不是来浏览流水账，而是带着问题来定位责任和过程。',
  },
];

const auditStages = [
  {
    order: '01',
    title: '先区分审计日志和普通业务日志，别一锅炖',
    tag: '职责划分',
    description:
      '很多系统把操作日志、埋点日志、错误日志、审计日志混在一起，最后谁都不好用。审计日志的核心是证据链，它服务的是追责、合规、复盘和高风险行为回溯。它关注的是“谁，在什么上下文，对什么对象，做了什么改变”，而不是纯粹的页面行为统计。',
    bestFor: ['医疗系统', '财务系统', '权限系统', '审批流程系统'],
    focus: [
      '为审计单独定义字段模型和存储边界',
      '区分页面埋点与资源变更日志',
      '高风险资源优先纳入审计范围',
    ],
    risks: [
      '把所有日志都丢到同一张表',
      '用埋点事件替代审计证据',
      '只记录页面操作，不记录资源变化',
    ],
    language: 'text',
    code: `Log Taxonomy
- 埋点日志：用户点击、曝光、转化
- 错误日志：异常堆栈、接口失败
- 业务日志：流程状态、任务执行
- 审计日志：资源变更、操作者、证据链`,
  },
  {
    order: '02',
    title: '审计日志至少要有操作者、对象、动作、前后值和来源',
    tag: '证据模型',
    description:
      '一条真正有价值的审计日志，不能只有“张三修改了患者信息”。你至少需要知道操作者是谁、操作对象是什么、动作类型是什么、改动前后差异如何、从哪个终端或页面发起、是否经过审批、是否命中过高风险资源。字段不够，后续任何追查都会卡住。',
    bestFor: ['需要差异回放的系统', '资源变更多的后台', '高权限操作密集的产品'],
    focus: [
      '资源 ID、资源类型和业务主键要齐全',
      '前值、后值建议按字段粒度存差异',
      '来源信息包含页面、IP、设备、入口链路',
    ],
    risks: [
      '只存一段描述性文本',
      '前值后值只留整段原始 JSON，不做结构化',
      '不同资源的日志字段不统一',
    ],
    language: 'typescript',
    code: `type AuditLogRecord = {
  operatorId: string;
  operatorName: string;
  action: 'create' | 'update' | 'delete' | 'approve' | 'export';
  resourceType: string;
  resourceId: string;
  before?: Record<string, unknown>;
  after?: Record<string, unknown>;
  source: {
    page: string;
    ip?: string;
    device?: string;
  };
};`,
  },
  {
    order: '03',
    title: '详情页展示的重点不是原始 JSON，而是字段级 diff 和上下文线索',
    tag: '展示设计',
    description:
      '审计日志列表页通常只是入口，真正决定可用性的，是详情页能不能快速看懂差异。最好的体验是：先看到动作摘要，再看字段级变更，再看关联上下文，比如审批单、会话信息、关联资源链接。这样用户能在几秒内判断“这次改动到底异常不异常”。',
    bestFor: ['复杂表单系统', '多字段主数据维护', '审批/配置类系统'],
    focus: [
      '列表页突出时间、操作者、动作、对象和风险等级',
      '详情页优先展示字段差异和关键上下文',
      '支持跳转到原资源详情或关联审批单',
    ],
    risks: [
      '详情页只放一个 JSON viewer',
      '找不到这次操作影响了哪些字段',
      '日志和业务资源之间没有关联入口',
    ],
    language: 'json',
    code: `{
  "fieldDiffs": [
    {
      "field": "departmentName",
      "before": "急诊科",
      "after": "重症医学科"
    }
  ],
  "riskLevel": "high",
  "approvalNo": "WF-20260502-001"
}`,
  },
  {
    order: '04',
    title: '敏感字段必须脱敏，审计能力不能反过来制造新的安全问题',
    tag: '安全边界',
    description:
      '审计日志里常常会涉及身份证号、手机号、地址、病历号、金额、诊断信息等敏感数据。如果不做脱敏或摘要化，审计系统本身就成了风险源。更稳的做法是前端展示时做二次遮罩，后端存储时做策略化脱敏，并且把日志查看权限做分级。',
    bestFor: ['医疗、金融、政务系统', '带 PII 的平台', '内部高权限系统'],
    focus: [
      '前端展示层按权限控制是否可见原值',
      '高敏字段只展示局部摘要或 hash',
      '日志详情访问也走权限与审批控制',
    ],
    risks: [
      '审计详情对所有管理员全量开放',
      '把完整敏感信息直接写入变更前后值',
      '脱敏规则前后端不一致',
    ],
    language: 'text',
    code: `Masking Rule
- 手机号：138****5521
- 身份证：3201**********2031
- 病历号：仅展示后 4 位
- 金额：按角色决定是否可见完整值`,
  },
  {
    order: '05',
    title: '高风险链路要支持回放和关联查询，而不只是“看一条记录”',
    tag: '回放追踪',
    description:
      '当出现误删、越权导出、权限变更、支付状态修改等问题时，单条日志通常不够。前端需要支持基于资源 ID、操作者、审批单号、会话 ID 聚合查看一段链路，必要时还原操作顺序。这才是真正有用的“可追踪”，而不是孤立的一行行文本。',
    bestFor: ['流程审批系统', '支付与权限系统', '故障复盘场景'],
    focus: [
      '支持按资源、会话、审批单聚合日志链路',
      '高风险动作标红并可一键筛选',
      '为客服、运营、审计人员设计不同视角',
    ],
    risks: [
      '日志只能按时间倒序翻页',
      '同一事件上下文分散在多处无法串联',
      '没有导出回执或取证快照能力',
    ],
    language: 'text',
    code: `Trace Query
- by resourceId
- by operatorId
- by approvalNo
- by sessionId
- by riskLevel = high`,
  },
];

const comparisonCards = [
  {
    title: '埋点日志',
    summary:
      '偏产品分析，回答的是“用户做了什么行为”。适合增长和体验分析，不适合直接承担审计与追责。',
  },
  {
    title: '错误日志',
    summary:
      '偏技术排障，回答的是“哪里报错了”。适合查异常，但不一定能说明是谁改了资源、为何改成这样。',
  },
  {
    title: '审计日志',
    summary:
      '偏证据和责任链，回答的是“谁在什么上下文下，对哪个资源做了什么改变”。这是合规和高风险系统必须单独建设的能力。',
  },
];

const auditModelExample = `{
  "auditId": "AUD-20260502-001",
  "operator": {
    "id": "U10086",
    "name": "张三",
    "role": "门诊管理员"
  },
  "resource": {
    "type": "patient-record",
    "id": "MR-20260502-8891"
  },
  "action": "update",
  "before": {
    "phone": "138****5521",
    "departmentName": "急诊科"
  },
  "after": {
    "phone": "138****9981",
    "departmentName": "重症医学科"
  },
  "source": {
    "page": "/patients/detail",
    "ip": "10.20.30.40",
    "device": "Chrome 136 / Windows"
  }
}`;
</script>

<style scoped>
.audit-guide-page {
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

.audit-guide-page__shell {
  max-width: 1240px;
  margin: 0 auto;
}

.audit-guide-page__top {
  display: flex;
  justify-content: flex-start;
  margin-bottom: 18px;
}

.audit-guide-page__back {
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

.audit-guide-page__back:hover {
  transform: translateY(-1px);
  border-color: rgba(67, 94, 118, 0.18);
  box-shadow: 0 18px 42px rgba(19, 27, 34, 0.1);
}

.audit-guide-page__content {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.audit-guide-hero,
.audit-guide-panel,
.audit-guide-card {
  border: 1px solid rgba(19, 27, 34, 0.08);
  border-radius: 7px;
  background: rgba(255, 255, 255, 0.96);
  box-shadow: 0 24px 54px rgba(19, 27, 34, 0.06);
}

.audit-guide-hero {
  display: grid;
  grid-template-columns: minmax(0, 1.4fr) minmax(320px, 0.8fr);
  gap: 18px;
  padding: 28px;
}

.audit-guide-hero__eyebrow,
.audit-guide-section__eyebrow,
.audit-guide-card__eyebrow,
.audit-guide-panel__eyebrow {
  font-size: 11px;
  line-height: 1.4;
  letter-spacing: 0.24em;
  text-transform: uppercase;
  color: #7e8894;
}

.audit-guide-hero__title {
  margin-top: 10px;
  font-size: 42px;
  line-height: 1.06;
  font-weight: 600;
  letter-spacing: -0.04em;
  color: #17202a;
}

.audit-guide-hero__summary,
.audit-guide-panel__text,
.audit-guide-card__text {
  font-size: 15px;
  line-height: 1.9;
  color: #55606c;
}

.audit-guide-hero__summary {
  margin-top: 16px;
  max-width: 760px;
}

.audit-guide-hero__panel,
.audit-guide-mini-panel {
  padding: 20px;
  border: 1px solid rgba(19, 27, 34, 0.08);
  border-radius: 7px;
  background: linear-gradient(180deg, #ffffff 0%, #f5f8fb 100%);
}

.audit-guide-hero__label,
.audit-guide-mini-panel__title {
  font-size: 13px;
  line-height: 1.5;
  font-weight: 600;
  color: #17202a;
}

.audit-guide-list {
  margin: 12px 0 0;
  padding-left: 18px;
  display: grid;
  gap: 8px;
  color: #55606c;
  font-size: 14px;
  line-height: 1.75;
}

.audit-guide-grid,
.audit-guide-columns {
  display: grid;
  gap: 16px;
}

.audit-guide-grid {
  grid-template-columns: repeat(5, minmax(0, 1fr));
}

.audit-guide-card {
  padding: 20px;
}

.audit-guide-card__title,
.audit-guide-panel__title,
.audit-guide-section__title {
  color: #17202a;
}

.audit-guide-card__title {
  margin-top: 8px;
  font-size: 19px;
  line-height: 1.35;
  font-weight: 600;
}

.audit-guide-card__text {
  margin-top: 10px;
}

.audit-guide-section {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.audit-guide-section__head {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
}

.audit-guide-section__title {
  margin-top: 8px;
  font-size: 28px;
  line-height: 1.2;
  font-weight: 600;
  letter-spacing: -0.03em;
}

.audit-guide-stack {
  display: grid;
  gap: 16px;
}

.audit-guide-panel {
  padding: 24px;
}

.audit-guide-panel.is-wide {
  padding: 26px;
}

.audit-guide-method__head {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 12px;
}

.audit-guide-method__tag {
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

.audit-guide-panel__title {
  margin-top: 8px;
  font-size: 24px;
  line-height: 1.28;
  font-weight: 600;
}

.audit-guide-panel__text {
  margin-top: 14px;
}

.audit-guide-method__grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 14px;
  margin-top: 18px;
}

.audit-guide-code-block {
  margin-top: 18px;
}

.audit-guide-columns {
  grid-template-columns: repeat(3, minmax(0, 1fr));
}

@media (max-width: 1100px) {
  .audit-guide-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .audit-guide-columns,
  .audit-guide-method__grid,
  .audit-guide-hero {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 720px) {
  .audit-guide-page {
    padding: 18px;
  }

  .audit-guide-grid {
    grid-template-columns: 1fr;
  }

  .audit-guide-hero,
  .audit-guide-card,
  .audit-guide-panel {
    padding: 18px;
  }

  .audit-guide-hero__title {
    font-size: 32px;
  }

  .audit-guide-section__title {
    font-size: 22px;
  }
}
</style>
