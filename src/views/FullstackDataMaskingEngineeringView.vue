<template>
  <section class="masking-guide-page">
    <div class="masking-guide-page__shell">
      <div class="masking-guide-page__top">
        <RouterLink
          to="/fullstack-guide"
          class="masking-guide-page__back"
          aria-label="返回全栈能力菜单"
          title="返回全栈能力菜单"
        >
          <el-icon :size="18"><ArrowLeft /></el-icon>
        </RouterLink>
      </div>

      <div class="masking-guide-page__content">
        <header class="masking-guide-hero">
          <div>
            <p class="masking-guide-hero__eyebrow">
              Frontend Data Masking Engineering
            </p>
            <h1 class="masking-guide-hero__title">前端数据脱敏工程</h1>
            <p class="masking-guide-hero__summary">
              真正的数据脱敏工程，核心不是把手机号中间四位换成星号，而是围绕“谁可以看什么、在哪看、导出时怎么处理、截图和日志怎么兜底”建立一整套展示规则。系统里只要有手机号、身份证、病历号、银行卡、住址、邮箱，就会有脱敏需求。做得粗糙，业务一上线就会出现越权可见、导出泄漏、日志留明文等问题。
            </p>
          </div>

          <div class="masking-guide-hero__panel">
            <p class="masking-guide-hero__label">学完结果</p>
            <ul class="masking-guide-list">
              <li>
                能区分接口脱敏、前端显示脱敏、导出脱敏和审计留痕的职责边界。
              </li>
              <li>能给不同角色设计明文、半脱敏、全脱敏三种展示层级。</li>
              <li>
                能把列表、详情、搜索、高亮、复制、导出、截图风险统一纳入方案。
              </li>
            </ul>
          </div>
        </header>

        <section class="masking-guide-grid">
          <article
            v-for="item in quickStages"
            :key="item.order"
            class="masking-guide-card"
          >
            <p class="masking-guide-card__eyebrow">Stage {{ item.order }}</p>
            <h2 class="masking-guide-card__title">{{ item.title }}</h2>
            <p class="masking-guide-card__text">{{ item.summary }}</p>
          </article>
        </section>

        <section class="masking-guide-section">
          <div class="masking-guide-section__head">
            <div>
              <p class="masking-guide-section__eyebrow">Decision Order</p>
              <h2 class="masking-guide-section__title">
                数据脱敏工程要先定暴露边界，再落到页面交互
              </h2>
            </div>
          </div>

          <div class="masking-guide-stack">
            <article
              v-for="stage in maskingStages"
              :key="stage.order"
              class="masking-guide-panel is-wide"
            >
              <div class="masking-guide-method__head">
                <div>
                  <p class="masking-guide-panel__eyebrow">
                    Stage {{ stage.order }}
                  </p>
                  <h3 class="masking-guide-panel__title">{{ stage.title }}</h3>
                </div>
                <span class="masking-guide-method__tag">{{ stage.tag }}</span>
              </div>

              <p class="masking-guide-panel__text">{{ stage.description }}</p>

              <div class="masking-guide-method__grid">
                <section class="masking-guide-mini-panel">
                  <p class="masking-guide-mini-panel__title">适用场景</p>
                  <ul class="masking-guide-list">
                    <li v-for="item in stage.bestFor" :key="item">
                      {{ item }}
                    </li>
                  </ul>
                </section>

                <section class="masking-guide-mini-panel">
                  <p class="masking-guide-mini-panel__title">实现重点</p>
                  <ul class="masking-guide-list">
                    <li v-for="item in stage.focus" :key="item">
                      {{ item }}
                    </li>
                  </ul>
                </section>

                <section class="masking-guide-mini-panel">
                  <p class="masking-guide-mini-panel__title">常见误区</p>
                  <ul class="masking-guide-list">
                    <li v-for="item in stage.risks" :key="item">
                      {{ item }}
                    </li>
                  </ul>
                </section>
              </div>

              <AppCodeBlock
                class="masking-guide-code-block"
                :code="stage.code"
                :lang="stage.language"
              />
            </article>
          </div>
        </section>

        <section class="masking-guide-section">
          <div class="masking-guide-section__head">
            <div>
              <p class="masking-guide-section__eyebrow">Comparison</p>
              <h2 class="masking-guide-section__title">
                不同敏感字段，脱敏策略不能一把梭
              </h2>
            </div>
          </div>

          <div class="masking-guide-columns">
            <article
              v-for="item in comparisonCards"
              :key="item.title"
              class="masking-guide-panel"
            >
              <h3 class="masking-guide-panel__title">{{ item.title }}</h3>
              <p class="masking-guide-panel__text">{{ item.summary }}</p>
            </article>
          </div>
        </section>

        <section class="masking-guide-section">
          <div class="masking-guide-section__head">
            <div>
              <p class="masking-guide-section__eyebrow">Best Practice</p>
              <h2 class="masking-guide-section__title">
                一个可落地的字段脱敏配置结构
              </h2>
            </div>
          </div>

          <article class="masking-guide-panel is-wide">
            <p class="masking-guide-panel__text">
              真正可维护的脱敏能力，不能把规则写死在十几个页面组件里。更稳妥的做法是把字段、角色、视图场景、复制权限、导出策略统一收敛成配置或能力层，页面只消费结果。
            </p>

            <AppCodeBlock
              class="masking-guide-code-block"
              :code="recordExample"
              lang="json"
            />
          </article>
        </section>

        <section class="masking-guide-section">
          <div class="masking-guide-section__head">
            <div>
              <p class="masking-guide-section__eyebrow">Checklist</p>
              <h2 class="masking-guide-section__title">
                数据脱敏上线前必须补齐的 5 个点
              </h2>
            </div>
          </div>

          <article class="masking-guide-panel is-wide">
            <ul class="masking-guide-list">
              <li>
                同一字段在列表、详情、搜索候选、导出里是否遵守统一的脱敏规则。
              </li>
              <li>
                具备查看明文权限的用户是否有单独审计记录，而不是静默放行。
              </li>
              <li>复制、批量导出、打印和日志上报是否仍可能暴露明文。</li>
              <li>脱敏是否影响搜索命中、高亮渲染和字段比对逻辑。</li>
              <li>接口已经脱敏的字段，前端是否避免二次错误加工导致假数据。</li>
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
    title: '先定哪些字段敏感',
    summary:
      '手机号、身份证、住址、邮箱、病历号、银行卡，不同字段的风险等级不同。',
  },
  {
    order: '02',
    title: '再定谁能看明文',
    summary: '不是所有登录用户都该看明文，必须区分角色、岗位和业务上下文。',
  },
  {
    order: '03',
    title: '统一页面展示策略',
    summary: '列表、详情、搜索联想、弹窗、导出都要遵守同一套脱敏规则。',
  },
  {
    order: '04',
    title: '高风险动作要留痕',
    summary: '看明文、复制明文、导出明文都应该有单独审计记录。',
  },
  {
    order: '05',
    title: '不要让规则写散',
    summary: '脱敏能力应该配置化，不能在几十个组件里各写一套 replace。',
  },
];

const maskingStages = [
  {
    order: '01',
    title: '先定义敏感字段等级和暴露边界',
    tag: '字段分级',
    description:
      '数据脱敏不是“有敏感字段就打星号”，而是先把字段分级。比如手机号和邮箱是中等敏感，身份证和银行卡是高敏感，病历号和住址要结合行业场景判断。分级之后，才能明确哪些字段永远不展示明文，哪些字段只给特定角色展示局部明文。',
    bestFor: ['医疗系统', '电商会员系统', '企业通讯录', 'CRM 与客服平台'],
    focus: [
      '先建立敏感字段清单和风险等级',
      '明确定义明文、半脱敏、全脱敏三档展示',
      '按场景拆分查看、复制、导出、打印权限',
    ],
    risks: [
      '所有字段共用一个脱敏函数',
      '只考虑页面显示，不考虑导出与日志',
      '角色权限有了，但字段可见级别没定义',
    ],
    language: 'text',
    code: `Visibility Levels
- plain: 展示完整明文
- partial: 展示局部信息，保留识别能力
- masked: 全脱敏，仅保留极少上下文`,
  },
  {
    order: '02',
    title: '接口脱敏和前端脱敏要分清职责',
    tag: '职责边界',
    description:
      '真正稳的方案通常是接口先按权限返回可见级别，前端再负责最终渲染。后端控制“能不能拿到”，前端控制“怎么展示”。如果把所有脱敏都放前端，只要接口给了明文，就已经存在泄漏面；如果全靠后端，前端又无法根据场景灵活显示不同形式。',
    bestFor: [
      '权限复杂的中后台',
      '多端共用接口的系统',
      '有导出与打印流程的业务',
    ],
    focus: [
      '后端返回字段权限或脱敏级别',
      '前端只做场景化展示，不擅自反推明文',
      '接口文档要约定每个字段的可见策略',
    ],
    risks: [
      '接口直接给全量明文，前端再遮一下',
      '前后端都做一遍脱敏，结果格式冲突',
      '测试环境默认明文，生产忘记切换策略',
    ],
    language: 'ts',
    code: `type Visibility = 'plain' | 'partial' | 'masked';

interface SensitiveFieldValue {
  raw?: string;
  masked: string;
  visibility: Visibility;
}

interface PatientRecord {
  phone: SensitiveFieldValue;
  idCard: SensitiveFieldValue;
  address: SensitiveFieldValue;
}`,
  },
  {
    order: '03',
    title: '列表、详情、搜索、高亮必须统一行为',
    tag: '交互一致性',
    description:
      '很多项目只改了表格列，结果详情弹窗、搜索建议、日志抽屉还是明文。脱敏工程的关键是把所有入口找全：主列表、详情页、快捷搜索、气泡卡片、复制按钮、打印预览、导出弹窗。只漏掉一个入口，整个方案就不完整。',
    bestFor: ['数据密集型后台', '客服系统', '病例检索系统'],
    focus: [
      '统一封装字段展示组件或格式化函数',
      '搜索联想默认走脱敏值，必要时单独申请明文能力',
      '高亮逻辑基于脱敏后内容重新计算',
    ],
    risks: [
      '表格脱敏了，详情仍显示明文',
      '搜索建议把完整手机号全露出来',
      '复制按钮复制了隐藏节点里的明文',
    ],
    language: 'ts',
    code: `const renderSensitiveText = (
  value: string,
  visibility: 'plain' | 'partial' | 'masked',
  type: 'phone' | 'id-card' | 'email',
) => {
  if (visibility === 'plain') return value;

  if (type === 'phone') return value.replace(/(\\d{3})\\d{4}(\\d{4})/, '$1****$2');
  if (type === 'email') return value.replace(/(^.).*(@.*$)/, '$1***$2');
  return value.replace(/(.{2}).+(.{2})/, '$1********$2');
};`,
  },
  {
    order: '04',
    title: '查看明文、复制明文、导出明文都要审计',
    tag: '审计联动',
    description:
      '真正敏感的不是“页面上看到了一部分信息”，而是用户主动申请看明文、复制走、导出走。前端需要把这些高风险动作显式化，并把动作来源、操作者、时间、对象、原因传给审计链路，否则事后很难追责。',
    bestFor: ['合规要求高的行业', '医疗、金融、政务系统', '大型企业内部平台'],
    focus: [
      '明文查看动作必须有显式触发',
      '复制与导出要二次确认并记录原因',
      '日志上报不要把明文本身再打进去',
    ],
    risks: [
      '页面脱敏了，但复制按钮复制原值',
      '导出权限与页面权限没有拆分',
      '审计事件只记操作成功，不记查看对象',
    ],
    language: 'json',
    code: `{
  "event": "sensitive-field-reveal",
  "field": "patientPhone",
  "recordId": "mr-20260502-0019",
  "operatorId": "doctor-17",
  "reason": "门诊回访",
  "occurredAt": "2026-05-02T12:20:00+08:00"
}`,
  },
  {
    order: '05',
    title: '把脱敏做成配置能力，不要散落在页面里',
    tag: '配置化',
    description:
      '项目越大，字段越多，最怕每个页面都手写一套正则替换。最佳实践是沉淀成字段规则中心，页面只声明“我是哪个字段、当前角色是什么、当前视图场景是什么”，最后统一得到展示值、复制能力和导出策略。',
    bestFor: ['多模块中后台', '长期维护项目', '多个前端团队协作的系统'],
    focus: [
      '把字段规则和角色权限做成配置',
      '页面层只拿结果，不重复写脱敏逻辑',
      '配合测试用例覆盖关键字段与角色组合',
    ],
    risks: [
      '每个页面自己写 replace',
      '新增字段后没人知道该怎么脱敏',
      '换角色体系时，几十处组件一起改',
    ],
    language: 'ts',
    code: `const maskingRules = {
  patientPhone: {
    type: 'phone',
    defaultVisibility: 'partial',
    roles: {
      admin: 'plain',
      doctor: 'partial',
      visitor: 'masked',
    },
    allowCopyRoles: ['admin'],
    allowExportRoles: ['admin', 'auditor'],
  },
};`,
  },
];

const comparisonCards = [
  {
    title: '手机号 / 邮箱',
    summary:
      '目标通常是让人能辨认对象但不能直接拿去联系，所以保留前后几位最常见。适合列表、搜索联想、轻量详情。',
  },
  {
    title: '身份证 / 银行卡',
    summary:
      '风险更高，一般默认全脱敏或只保留极少尾号。很多场景下不应该在前端明文展示，而应通过受控查看动作短暂展示。',
  },
  {
    title: '住址 / 病历内容',
    summary:
      '这类字段不适合简单星号替换，需要按业务目标截断、摘要化或角色化呈现，否则既泄漏信息，又丢失业务可读性。',
  },
];

const recordExample = `{
  "field": "patientPhone",
  "type": "phone",
  "defaultVisibility": "partial",
  "scenes": {
    "table": "partial",
    "detail": "partial",
    "searchSuggestion": "masked",
    "export": "plain"
  },
  "roles": {
    "admin": {
      "visibility": "plain",
      "canCopy": true,
      "canExport": true
    },
    "doctor": {
      "visibility": "partial",
      "canCopy": false,
      "canExport": false
    },
    "visitor": {
      "visibility": "masked",
      "canCopy": false,
      "canExport": false
    }
  }
}`;
</script>

<style scoped>
.masking-guide-page {
  min-height: 100%;
  padding: 32px;
}

.masking-guide-page__shell {
  max-width: 1240px;
  margin: 0 auto;
}

.masking-guide-page__top {
  display: flex;
  justify-content: flex-start;
  margin-bottom: 18px;
}

.masking-guide-page__back {
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

.masking-guide-page__back:hover {
  transform: translateY(-1px);
  border-color: rgba(67, 94, 118, 0.18);
  box-shadow: 0 18px 42px rgba(19, 27, 34, 0.1);
}

.masking-guide-page__content {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.masking-guide-hero,
.masking-guide-panel,
.masking-guide-card {
  border: 1px solid rgba(19, 27, 34, 0.08);
  border-radius: 7px;
  background: rgba(255, 255, 255, 0.96);
  box-shadow: 0 24px 54px rgba(19, 27, 34, 0.06);
}

.masking-guide-hero {
  display: grid;
  grid-template-columns: minmax(0, 1.4fr) minmax(320px, 0.8fr);
  gap: 18px;
  padding: 28px;
}

.masking-guide-hero__eyebrow,
.masking-guide-section__eyebrow,
.masking-guide-card__eyebrow,
.masking-guide-panel__eyebrow {
  font-size: 11px;
  line-height: 1.4;
  letter-spacing: 0.24em;
  text-transform: uppercase;
  color: #7e8894;
}

.masking-guide-hero__title {
  margin-top: 10px;
  font-size: 42px;
  line-height: 1.06;
  font-weight: 600;
  letter-spacing: -0.04em;
  color: #17202a;
}

.masking-guide-hero__summary,
.masking-guide-panel__text,
.masking-guide-card__text {
  font-size: 15px;
  line-height: 1.9;
  color: #55606c;
}

.masking-guide-hero__summary {
  margin-top: 16px;
  max-width: 760px;
}

.masking-guide-hero__panel,
.masking-guide-mini-panel {
  padding: 20px;
  border: 1px solid rgba(19, 27, 34, 0.08);
  border-radius: 7px;
  background: linear-gradient(180deg, #ffffff 0%, #f5f8fb 100%);
}

.masking-guide-hero__label,
.masking-guide-mini-panel__title {
  font-size: 13px;
  line-height: 1.5;
  font-weight: 600;
  color: #17202a;
}

.masking-guide-list {
  margin: 12px 0 0;
  padding-left: 18px;
  display: grid;
  gap: 8px;
  color: #55606c;
  font-size: 14px;
  line-height: 1.75;
}

.masking-guide-grid,
.masking-guide-columns {
  display: grid;
  gap: 16px;
}

.masking-guide-grid {
  grid-template-columns: repeat(5, minmax(0, 1fr));
}

.masking-guide-card {
  padding: 20px;
}

.masking-guide-card__title,
.masking-guide-panel__title,
.masking-guide-section__title {
  color: #17202a;
}

.masking-guide-card__title {
  margin-top: 8px;
  font-size: 19px;
  line-height: 1.35;
  font-weight: 600;
}

.masking-guide-card__text {
  margin-top: 10px;
}

.masking-guide-section {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.masking-guide-section__head {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
}

.masking-guide-section__title {
  margin-top: 8px;
  font-size: 28px;
  line-height: 1.2;
  font-weight: 600;
  letter-spacing: -0.03em;
}

.masking-guide-stack {
  display: grid;
  gap: 16px;
}

.masking-guide-panel {
  padding: 24px;
}

.masking-guide-panel.is-wide {
  padding: 26px;
}

.masking-guide-method__head {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 12px;
}

.masking-guide-method__tag {
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

.masking-guide-panel__title {
  margin-top: 8px;
  font-size: 24px;
  line-height: 1.28;
  font-weight: 600;
}

.masking-guide-panel__text {
  margin-top: 14px;
}

.masking-guide-method__grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 14px;
  margin-top: 18px;
}

.masking-guide-code-block {
  margin-top: 18px;
}

.masking-guide-columns {
  grid-template-columns: repeat(3, minmax(0, 1fr));
}

@media (max-width: 1100px) {
  .masking-guide-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .masking-guide-columns,
  .masking-guide-method__grid,
  .masking-guide-hero {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 720px) {
  .masking-guide-page {
    padding: 18px;
  }

  .masking-guide-grid {
    grid-template-columns: 1fr;
  }

  .masking-guide-hero,
  .masking-guide-card,
  .masking-guide-panel {
    padding: 18px;
  }

  .masking-guide-hero__title {
    font-size: 32px;
  }

  .masking-guide-section__title {
    font-size: 22px;
  }
}
</style>
