<template>
  <section class="recycle-guide-page">
    <div class="recycle-guide-page__shell">
      <div class="recycle-guide-page__top">
        <RouterLink
          to="/fullstack-guide"
          class="recycle-guide-page__back"
          aria-label="返回全栈能力菜单"
          title="返回全栈能力菜单"
        >
          <el-icon :size="18"><ArrowLeft /></el-icon>
        </RouterLink>
      </div>

      <div class="recycle-guide-page__content">
        <header class="recycle-guide-hero">
          <div>
            <p class="recycle-guide-hero__eyebrow">
              Frontend Recycle Bin Engineering
            </p>
            <h1 class="recycle-guide-hero__title">前端回收站工程</h1>
            <p class="recycle-guide-hero__summary">
              回收站不是“删掉的数据放另一个列表里”这么简单。真正的回收站工程，要处理软删除与硬删除边界、恢复权限、保留时长、批量清理、关联资源连带删除、审计日志和误删兜底。做得差，用户会以为删了还能恢复结果彻底丢失；做得稳，系统里的删除动作才是真正可控的。
            </p>
          </div>

          <div class="recycle-guide-hero__panel">
            <p class="recycle-guide-hero__label">学完结果</p>
            <ul class="recycle-guide-list">
              <li>能分清软删除、逻辑归档、硬删除和延迟清理的不同职责。</li>
              <li>
                能设计删除确认、回收站恢复、批量清空、过期销毁和审计留痕的完整链路。
              </li>
              <li>
                能和后端约定删除状态机、恢复条件、保留周期和关联资源约束。
              </li>
            </ul>
          </div>
        </header>

        <section class="recycle-guide-grid">
          <article
            v-for="item in quickStages"
            :key="item.order"
            class="recycle-guide-card"
          >
            <p class="recycle-guide-card__eyebrow">Stage {{ item.order }}</p>
            <h2 class="recycle-guide-card__title">{{ item.title }}</h2>
            <p class="recycle-guide-card__text">{{ item.summary }}</p>
          </article>
        </section>

        <section class="recycle-guide-section">
          <div class="recycle-guide-section__head">
            <div>
              <p class="recycle-guide-section__eyebrow">Decision Order</p>
              <h2 class="recycle-guide-section__title">
                回收站工程先定删除语义，再做恢复与销毁流程
              </h2>
            </div>
          </div>

          <div class="recycle-guide-stack">
            <article
              v-for="stage in recycleStages"
              :key="stage.order"
              class="recycle-guide-panel is-wide"
            >
              <div class="recycle-guide-method__head">
                <div>
                  <p class="recycle-guide-panel__eyebrow">
                    Stage {{ stage.order }}
                  </p>
                  <h3 class="recycle-guide-panel__title">{{ stage.title }}</h3>
                </div>
                <span class="recycle-guide-method__tag">{{ stage.tag }}</span>
              </div>

              <p class="recycle-guide-panel__text">{{ stage.description }}</p>

              <div class="recycle-guide-method__grid">
                <section class="recycle-guide-mini-panel">
                  <p class="recycle-guide-mini-panel__title">适用场景</p>
                  <ul class="recycle-guide-list">
                    <li v-for="item in stage.bestFor" :key="item">
                      {{ item }}
                    </li>
                  </ul>
                </section>

                <section class="recycle-guide-mini-panel">
                  <p class="recycle-guide-mini-panel__title">实现重点</p>
                  <ul class="recycle-guide-list">
                    <li v-for="item in stage.focus" :key="item">
                      {{ item }}
                    </li>
                  </ul>
                </section>

                <section class="recycle-guide-mini-panel">
                  <p class="recycle-guide-mini-panel__title">常见误区</p>
                  <ul class="recycle-guide-list">
                    <li v-for="item in stage.risks" :key="item">
                      {{ item }}
                    </li>
                  </ul>
                </section>
              </div>

              <AppCodeBlock
                class="recycle-guide-code-block"
                :code="stage.code"
                :lang="stage.language"
              />
            </article>
          </div>
        </section>

        <section class="recycle-guide-section">
          <div class="recycle-guide-section__head">
            <div>
              <p class="recycle-guide-section__eyebrow">Comparison</p>
              <h2 class="recycle-guide-section__title">
                软删除、归档、硬删除不要混成一个概念
              </h2>
            </div>
          </div>

          <div class="recycle-guide-columns">
            <article
              v-for="item in comparisonCards"
              :key="item.title"
              class="recycle-guide-panel"
            >
              <h3 class="recycle-guide-panel__title">{{ item.title }}</h3>
              <p class="recycle-guide-panel__text">{{ item.summary }}</p>
            </article>
          </div>
        </section>

        <section class="recycle-guide-section">
          <div class="recycle-guide-section__head">
            <div>
              <p class="recycle-guide-section__eyebrow">Best Practice</p>
              <h2 class="recycle-guide-section__title">
                一条可恢复删除记录的最小结构
              </h2>
            </div>
          </div>

          <article class="recycle-guide-panel is-wide">
            <p class="recycle-guide-panel__text">
              回收站里的对象不该只剩一个标题和删除时间。你至少要知道它是谁删的、何时过期、是否可恢复、是否有关联资源、恢复后会回到哪里。前端展示层需要基于这些字段做真正的恢复判断。
            </p>

            <AppCodeBlock
              class="recycle-guide-code-block"
              :code="recordExample"
              lang="json"
            />
          </article>
        </section>

        <section class="recycle-guide-section">
          <div class="recycle-guide-section__head">
            <div>
              <p class="recycle-guide-section__eyebrow">Checklist</p>
              <h2 class="recycle-guide-section__title">
                回收站上线前必须补齐的 5 个点
              </h2>
            </div>
          </div>

          <article class="recycle-guide-panel is-wide">
            <ul class="recycle-guide-list">
              <li>删除前要明确这是软删除还是永久删除，文案不能误导用户。</li>
              <li>恢复按钮不能盲开，必须校验资源是否仍满足恢复条件。</li>
              <li>批量清空和批量恢复都要有二次确认与权限校验。</li>
              <li>保留期到期后的自动销毁要有清晰提示和审计记录。</li>
              <li>
                关联资源删除与恢复规则必须可预期，不能恢复主对象却丢附件。
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
    title: '先定删除语义',
    summary: '用户点删除时，到底是软删除、归档还是永久删除，必须一开始就分清。',
  },
  {
    order: '02',
    title: '恢复条件要明确',
    summary: '不是所有被删资源都一定能恢复，恢复前要校验权限、状态和关联关系。',
  },
  {
    order: '03',
    title: '保留期要产品化',
    summary: '回收站不是永久垃圾堆，必须有保留时长、过期提醒和自动清理策略。',
  },
  {
    order: '04',
    title: '批量动作最危险',
    summary: '批量恢复和批量清空最容易造成大范围误操作，前端交互要格外克制。',
  },
  {
    order: '05',
    title: '删除链路要留痕',
    summary: '谁删的、为什么删、何时恢复或清空，这些都应该可追踪。',
  },
];

const recycleStages = [
  {
    order: '01',
    title: '先区分软删除、归档和永久删除',
    tag: '删除语义',
    description:
      '回收站工程的第一步，是定义删除语义。软删除通常意味着资源暂时对业务不可见，但仍可恢复；归档更偏业务状态迁移，不一定进入回收站；永久删除则是最终销毁。三者混在一起，前端文案、按钮行为和恢复逻辑都会混乱。',
    bestFor: ['中后台列表系统', '医疗文书系统', '知识库与 CMS', '文件类平台'],
    focus: [
      '给每类删除动作单独命名和文案',
      '前端按钮和后端接口语义保持一致',
      '回收站只接收真正可恢复的资源',
    ],
    risks: [
      '所有删除动作都只叫“删除”',
      '归档数据也硬塞进回收站',
      '用户以为能恢复，实际上已经永久销毁',
    ],
    language: 'text',
    code: `Delete Modes
- soft-delete: 进入回收站，可恢复
- archive: 进入历史区，不在主流程展示
- hard-delete: 永久删除，不可恢复`,
  },
  {
    order: '02',
    title: '恢复逻辑不是反向改状态，而是一次完整校验',
    tag: '恢复校验',
    description:
      '很多系统把恢复写成“deleted = false”就结束，但真正的恢复要检查很多条件：父级目录是否还存在、所属租户是否有效、当前用户是否有恢复权限、关联资源是否仍完整。否则用户点了恢复，要么恢复失败，要么恢复出一个半残缺对象。',
    bestFor: ['层级目录系统', '多租户系统', '带附件或关联对象的业务'],
    focus: [
      '恢复前校验父级位置和关联资源',
      '恢复失败原因给出明确文案',
      '支持“恢复到原位置”或“恢复到默认位置”',
    ],
    risks: [
      '恢复失败只提示系统异常',
      '原位置失效后无兜底恢复策略',
      '恢复成功但关联附件未跟随恢复',
    ],
    language: 'typescript',
    code: `type RestoreCheckResult = {
  canRestore: boolean;
  reason?: string;
  targetLocation?: string;
};`,
  },
  {
    order: '03',
    title: '回收站要有保留期、过期提醒和自动销毁策略',
    tag: '生命周期',
    description:
      '回收站不是无限仓库。保留 7 天、30 天还是 180 天，要取决于业务风险和合规要求。前端要把剩余保留时间、即将销毁提醒、已过期不可恢复状态表达清楚，否则用户会误判数据是否还在安全范围内。',
    bestFor: ['带合规要求的系统', '高价值业务数据', '经常误删的后台系统'],
    focus: [
      '展示剩余保留时长和销毁时间点',
      '过期前支持批量恢复或延长保留策略',
      '过期后按钮状态和文案明确变化',
    ],
    risks: [
      '用户不知道何时会自动销毁',
      '过期后仍显示可恢复按钮',
      '保留期策略全靠口头约定',
    ],
    language: 'json',
    code: `{
  "deletedAt": "2026-05-02T14:10:00+08:00",
  "expireAt": "2026-06-01T23:59:59+08:00",
  "retentionDays": 30,
  "status": "recoverable"
}`,
  },
  {
    order: '04',
    title: '批量恢复与批量清空必须把风险前置给用户',
    tag: '批量风险',
    description:
      '单个恢复还好，批量恢复和清空是事故高发区。前端需要把选中了多少条、哪些不可恢复、哪些会覆盖现有资源、哪些操作不可撤销全部提示清楚。必要时还要二次输入确认词，而不是只弹一个普通确认框。',
    bestFor: ['海量文件系统', '运营后台', '批量录入与批量删改场景'],
    focus: [
      '批量操作前先做预检统计',
      '高风险清空动作支持强确认',
      '部分成功、部分失败时给结构化回执',
    ],
    risks: [
      '批量清空和普通删除交互一样轻',
      '不可恢复对象混在列表里一起操作',
      '批量结果无明细，用户不知道哪条失败',
    ],
    language: 'text',
    code: `Bulk Restore Summary
- totalSelected: 120
- restorable: 112
- conflicted: 6
- expired: 2`,
  },
  {
    order: '05',
    title: '删除、恢复、清空都要进入审计链路',
    tag: '审计联动',
    description:
      '回收站是高风险能力，尤其在医疗、财务、文档平台里，删除和恢复都应该可追踪。前端至少要把操作者、资源类型、资源 ID、来源页面、批量数量这些信息带上，和后端审计日志一起形成证据链。否则用户问“这条是谁删的”，你只能靠猜。',
    bestFor: ['高价值业务平台', '权限敏感系统', '合规审计场景'],
    focus: [
      '删除、恢复、清空动作统一埋点和审计字段',
      '批量操作记录资源集合或批次号',
      '前端展示层可跳到关联审计详情',
    ],
    risks: [
      '只记录删除，不记录恢复与清空',
      '批量删除没有批次标识',
      '回收站与审计系统彼此孤立',
    ],
    language: 'json',
    code: `{
  "event": "recycle_restore_batch",
  "resourceType": "medical-record",
  "batchId": "RB-20260502-001",
  "count": 32,
  "operatorId": "U10086"
}`,
  },
];

const comparisonCards = [
  {
    title: '软删除',
    summary:
      '适合需要误删恢复的场景。资源不再出现在主列表，但仍保留恢复机会，是回收站的核心基础。',
  },
  {
    title: '归档',
    summary:
      '更偏业务状态迁移，不一定意味着“删掉”。适合已完成、已过期但仍需长期留存的内容。',
  },
  {
    title: '永久删除',
    summary:
      '适合明确不可恢复、合规要求必须销毁的资源。前端交互和权限控制都应该最谨慎。',
  },
];

const recordExample = `{
  "recycleId": "RC-20260502-001",
  "resourceType": "article",
  "resourceId": "AR-8891",
  "title": "门诊病历模板",
  "deletedBy": "张三",
  "deletedAt": "2026-05-02T14:10:00+08:00",
  "expireAt": "2026-06-01T23:59:59+08:00",
  "canRestore": true,
  "originPath": "/templates/outpatient"
}`;
</script>

<style scoped>
.recycle-guide-page {
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

.recycle-guide-page__shell {
  max-width: 1240px;
  margin: 0 auto;
}

.recycle-guide-page__top {
  display: flex;
  justify-content: flex-start;
  margin-bottom: 18px;
}

.recycle-guide-page__back {
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

.recycle-guide-page__back:hover {
  transform: translateY(-1px);
  border-color: rgba(67, 94, 118, 0.18);
  box-shadow: 0 18px 42px rgba(19, 27, 34, 0.1);
}

.recycle-guide-page__content {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.recycle-guide-hero,
.recycle-guide-panel,
.recycle-guide-card {
  border: 1px solid rgba(19, 27, 34, 0.08);
  border-radius: 7px;
  background: rgba(255, 255, 255, 0.96);
  box-shadow: 0 24px 54px rgba(19, 27, 34, 0.06);
}

.recycle-guide-hero {
  display: grid;
  grid-template-columns: minmax(0, 1.4fr) minmax(320px, 0.8fr);
  gap: 18px;
  padding: 28px;
}

.recycle-guide-hero__eyebrow,
.recycle-guide-section__eyebrow,
.recycle-guide-card__eyebrow,
.recycle-guide-panel__eyebrow {
  font-size: 11px;
  line-height: 1.4;
  letter-spacing: 0.24em;
  text-transform: uppercase;
  color: #7e8894;
}

.recycle-guide-hero__title {
  margin-top: 10px;
  font-size: 42px;
  line-height: 1.06;
  font-weight: 600;
  letter-spacing: -0.04em;
  color: #17202a;
}

.recycle-guide-hero__summary,
.recycle-guide-panel__text,
.recycle-guide-card__text {
  font-size: 15px;
  line-height: 1.9;
  color: #55606c;
}

.recycle-guide-hero__summary {
  margin-top: 16px;
  max-width: 760px;
}

.recycle-guide-hero__panel,
.recycle-guide-mini-panel {
  padding: 20px;
  border: 1px solid rgba(19, 27, 34, 0.08);
  border-radius: 7px;
  background: linear-gradient(180deg, #ffffff 0%, #f5f8fb 100%);
}

.recycle-guide-hero__label,
.recycle-guide-mini-panel__title {
  font-size: 13px;
  line-height: 1.5;
  font-weight: 600;
  color: #17202a;
}

.recycle-guide-list {
  margin: 12px 0 0;
  padding-left: 18px;
  display: grid;
  gap: 8px;
  color: #55606c;
  font-size: 14px;
  line-height: 1.75;
}

.recycle-guide-grid,
.recycle-guide-columns {
  display: grid;
  gap: 16px;
}

.recycle-guide-grid {
  grid-template-columns: repeat(5, minmax(0, 1fr));
}

.recycle-guide-card {
  padding: 20px;
}

.recycle-guide-card__title,
.recycle-guide-panel__title,
.recycle-guide-section__title {
  color: #17202a;
}

.recycle-guide-card__title {
  margin-top: 8px;
  font-size: 19px;
  line-height: 1.35;
  font-weight: 600;
}

.recycle-guide-card__text {
  margin-top: 10px;
}

.recycle-guide-section {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.recycle-guide-section__head {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
}

.recycle-guide-section__title {
  margin-top: 8px;
  font-size: 28px;
  line-height: 1.2;
  font-weight: 600;
  letter-spacing: -0.03em;
}

.recycle-guide-stack {
  display: grid;
  gap: 16px;
}

.recycle-guide-panel {
  padding: 24px;
}

.recycle-guide-panel.is-wide {
  padding: 26px;
}

.recycle-guide-method__head {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 12px;
}

.recycle-guide-method__tag {
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

.recycle-guide-panel__title {
  margin-top: 8px;
  font-size: 24px;
  line-height: 1.28;
  font-weight: 600;
}

.recycle-guide-panel__text {
  margin-top: 14px;
}

.recycle-guide-method__grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 14px;
  margin-top: 18px;
}

.recycle-guide-code-block {
  margin-top: 18px;
}

.recycle-guide-columns {
  grid-template-columns: repeat(3, minmax(0, 1fr));
}

@media (max-width: 1100px) {
  .recycle-guide-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .recycle-guide-columns,
  .recycle-guide-method__grid,
  .recycle-guide-hero {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 720px) {
  .recycle-guide-page {
    padding: 18px;
  }

  .recycle-guide-grid {
    grid-template-columns: 1fr;
  }

  .recycle-guide-hero,
  .recycle-guide-card,
  .recycle-guide-panel {
    padding: 18px;
  }

  .recycle-guide-hero__title {
    font-size: 32px;
  }

  .recycle-guide-section__title {
    font-size: 22px;
  }
}
</style>
