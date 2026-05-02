<template>
  <section class="draft-guide-page">
    <div class="draft-guide-page__shell">
      <div class="draft-guide-page__top">
        <RouterLink
          to="/fullstack-guide"
          class="draft-guide-page__back"
          aria-label="返回全栈能力菜单"
          title="返回全栈能力菜单"
        >
          <el-icon :size="18"><ArrowLeft /></el-icon>
        </RouterLink>
      </div>

      <div class="draft-guide-page__content">
        <header class="draft-guide-hero">
          <div>
            <p class="draft-guide-hero__eyebrow">
              Frontend Draft Box Engineering
            </p>
            <h1 class="draft-guide-hero__title">前端草稿箱工程</h1>
            <p class="draft-guide-hero__summary">
              草稿箱不是“离开页面前往 localStorage 里塞一份
              JSON”。真正的草稿工程，要解决自动保存节奏、脏数据判断、版本快照、跨设备恢复、服务端草稿同步、冲突合并和草稿中心管理。做得粗糙，用户会以为保存了其实没保存；做得成熟，长表单、复杂编辑和离线场景的体验会直接提升一个层级。
            </p>
          </div>

          <div class="draft-guide-hero__panel">
            <p class="draft-guide-hero__label">学完结果</p>
            <ul class="draft-guide-list">
              <li>
                能分清本地临时缓存、正式草稿、版本快照和已提交数据的职责边界。
              </li>
              <li>
                能设计自动保存、草稿恢复、冲突提示、草稿中心与清理策略的完整链路。
              </li>
              <li>能判断什么时候只存本地，什么时候必须走服务端草稿同步。</li>
            </ul>
          </div>
        </header>

        <section class="draft-guide-grid">
          <article
            v-for="item in quickStages"
            :key="item.order"
            class="draft-guide-card"
          >
            <p class="draft-guide-card__eyebrow">Stage {{ item.order }}</p>
            <h2 class="draft-guide-card__title">{{ item.title }}</h2>
            <p class="draft-guide-card__text">{{ item.summary }}</p>
          </article>
        </section>

        <section class="draft-guide-section">
          <div class="draft-guide-section__head">
            <div>
              <p class="draft-guide-section__eyebrow">Decision Order</p>
              <h2 class="draft-guide-section__title">
                草稿工程先定义数据状态，再谈自动保存
              </h2>
            </div>
          </div>

          <div class="draft-guide-stack">
            <article
              v-for="stage in draftStages"
              :key="stage.order"
              class="draft-guide-panel is-wide"
            >
              <div class="draft-guide-method__head">
                <div>
                  <p class="draft-guide-panel__eyebrow">
                    Stage {{ stage.order }}
                  </p>
                  <h3 class="draft-guide-panel__title">{{ stage.title }}</h3>
                </div>
                <span class="draft-guide-method__tag">{{ stage.tag }}</span>
              </div>

              <p class="draft-guide-panel__text">{{ stage.description }}</p>

              <div class="draft-guide-method__grid">
                <section class="draft-guide-mini-panel">
                  <p class="draft-guide-mini-panel__title">适用场景</p>
                  <ul class="draft-guide-list">
                    <li v-for="item in stage.bestFor" :key="item">
                      {{ item }}
                    </li>
                  </ul>
                </section>

                <section class="draft-guide-mini-panel">
                  <p class="draft-guide-mini-panel__title">实现重点</p>
                  <ul class="draft-guide-list">
                    <li v-for="item in stage.focus" :key="item">
                      {{ item }}
                    </li>
                  </ul>
                </section>

                <section class="draft-guide-mini-panel">
                  <p class="draft-guide-mini-panel__title">常见误区</p>
                  <ul class="draft-guide-list">
                    <li v-for="item in stage.risks" :key="item">
                      {{ item }}
                    </li>
                  </ul>
                </section>
              </div>

              <AppCodeBlock
                class="draft-guide-code-block"
                :code="stage.code"
                :lang="stage.language"
              />
            </article>
          </div>
        </section>

        <section class="draft-guide-section">
          <div class="draft-guide-section__head">
            <div>
              <p class="draft-guide-section__eyebrow">Comparison</p>
              <h2 class="draft-guide-section__title">
                本地缓存、正式草稿、版本快照的区别
              </h2>
            </div>
          </div>

          <div class="draft-guide-columns">
            <article
              v-for="item in comparisonCards"
              :key="item.title"
              class="draft-guide-panel"
            >
              <h3 class="draft-guide-panel__title">{{ item.title }}</h3>
              <p class="draft-guide-panel__text">{{ item.summary }}</p>
            </article>
          </div>
        </section>

        <section class="draft-guide-section">
          <div class="draft-guide-section__head">
            <div>
              <p class="draft-guide-section__eyebrow">Best Practice</p>
              <h2 class="draft-guide-section__title">
                一个可落地的草稿状态模型
              </h2>
            </div>
          </div>

          <article class="draft-guide-panel is-wide">
            <p class="draft-guide-panel__text">
              草稿能力最怕状态混乱。你至少要分清：页面当前值、最后一次成功保存的草稿、服务端正式稿、用户已提交成品。这四者混在一起，恢复和冲突逻辑一定会炸。
            </p>

            <AppCodeBlock
              class="draft-guide-code-block"
              :code="draftStateExample"
              lang="typescript"
            />
          </article>
        </section>

        <section class="draft-guide-section">
          <div class="draft-guide-section__head">
            <div>
              <p class="draft-guide-section__eyebrow">Checklist</p>
              <h2 class="draft-guide-section__title">
                草稿箱上线前一定要补齐的 5 件事
              </h2>
            </div>
          </div>

          <article class="draft-guide-panel is-wide">
            <ul class="draft-guide-list">
              <li>
                自动保存必须有节流和失败提示，不能让用户误以为“已经保存”。
              </li>
              <li>
                恢复草稿前要告诉用户来源、时间和差异，避免静默覆盖当前输入。
              </li>
              <li>复杂业务尽量保留多个版本快照，而不是只留最后一份草稿。</li>
              <li>跨设备编辑场景要考虑服务端草稿同步和冲突合并提示。</li>
              <li>
                草稿中心要支持搜索、删除、恢复和过期清理，不能只靠页面弹窗。
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
    title: '先区分几种稿',
    summary: '本地缓存、服务端草稿、版本快照、正式提交稿，不是同一个概念。',
  },
  {
    order: '02',
    title: '自动保存要节流',
    summary: '每敲一个字就写库只会制造性能和冲突问题，自动保存要有节奏。',
  },
  {
    order: '03',
    title: '恢复前先提示差异',
    summary: '草稿恢复不是粗暴覆盖，而是让用户明确知道将恢复什么内容。',
  },
  {
    order: '04',
    title: '多设备要防冲突',
    summary: '用户换电脑、换标签页、换终端编辑时，冲突和覆盖是高频问题。',
  },
  {
    order: '05',
    title: '草稿要可管理',
    summary: '有草稿中心、时间线和清理规则，草稿能力才算是一个完整系统。',
  },
];

const draftStages = [
  {
    order: '01',
    title: '先定义草稿边界：什么能保存，什么只是临时输入',
    tag: '边界划分',
    description:
      '不是所有页面都值得做正式草稿。你要先判断这个业务是不是长编辑链路、是否存在中断风险、是否需要多人/跨设备继续编辑。很多系统把任何输入都当草稿保存，结果草稿中心堆满无意义垃圾。成熟做法是先定义哪些页面支持正式草稿，哪些只做本地临时缓存。',
    bestFor: ['长表单录入', '文章编辑', '病历书写', '复杂审批单据'],
    focus: [
      '区分临时输入、本地缓存、正式草稿',
      '仅对高价值编辑链路提供草稿中心',
      '明确草稿创建、更新、过期和提交后的归档规则',
    ],
    risks: [
      '所有输入页都默认创建草稿',
      '草稿创建条件不清导致数据泛滥',
      '提交成功后草稿仍长期残留',
    ],
    language: 'text',
    code: `Draft Boundary
- 临时输入：只保留当前会话
- 本地缓存：防刷新/断网丢失
- 正式草稿：可恢复、可跨设备、可进入草稿箱
- 已提交稿：正式业务记录`,
  },
  {
    order: '02',
    title: '自动保存要围绕“脏数据检测 + 节流 + 成功回执”展开',
    tag: '自动保存',
    description:
      '自动保存不是单纯 setInterval 调接口。真正稳的方案是：先判断是否有脏数据，再做节流或 debounce，保存成功后更新草稿版本号和时间戳，失败时给清晰提示。否则用户会陷入“我以为系统已经自动保存了”的假象。',
    bestFor: [
      '持续输入型页面',
      '不能轻易丢失内容的业务',
      '离线后可能恢复的表单',
    ],
    focus: [
      '保存前做 dirty-check，减少无效写入',
      '记录 lastSavedAt 和 version',
      '失败状态要清晰反馈且支持重试',
    ],
    risks: [
      '每次输入都立即写接口',
      '自动保存成功与否用户完全无感知',
      '接口失败后页面继续显示“已保存”',
    ],
    language: 'typescript',
    code: `watch(
  () => formModel.value,
  debounce(async (nextValue) => {
    if (!isDirty(nextValue, lastSavedSnapshot.value)) {
      return;
    }

    const result = await saveDraft(nextValue);
    lastSavedSnapshot.value = structuredClone(nextValue);
    lastSavedAt.value = result.savedAt;
  }, 1500),
  { deep: true },
);`,
  },
  {
    order: '03',
    title: '草稿恢复不能静默覆盖，必须先告诉用户恢复来源和差异',
    tag: '恢复体验',
    description:
      '用户重新进入页面时，如果系统发现草稿，不能直接偷偷覆盖当前初始化数据。更稳的做法是弹出恢复提示，告诉用户这份草稿来自哪里、保存于何时、与当前内容差异大不大，必要时支持“只恢复部分字段”。这会大幅减少误覆盖和投诉。',
    bestFor: [
      '编辑页初始化复杂的系统',
      '多人协作表单',
      '有服务端默认值回填的页面',
    ],
    focus: [
      '进入页面时先比较初始化值与草稿版本',
      '恢复弹窗展示来源时间和字段差异',
      '支持放弃、全量恢复、局部恢复三种操作',
    ],
    risks: [
      '页面一打开就直接覆盖当前值',
      '用户不知道恢复了哪份草稿',
      '只能二选一，不能部分恢复',
    ],
    language: 'json',
    code: `{
  "draftId": "DR-20260502-001",
  "savedAt": "2026-05-02T14:23:10+08:00",
  "source": "auto-save",
  "diffFields": ["chiefComplaint", "diagnosis", "medicationPlan"]
}`,
  },
  {
    order: '04',
    title: '跨设备与多标签页编辑要处理版本冲突，而不是最后写入覆盖一切',
    tag: '冲突处理',
    description:
      '草稿工程一旦进入服务端同步，就会碰到多设备冲突问题。最常见的是用户在 A 电脑和 B 电脑都开着页面，或者医生工作站和家用电脑同时编辑。此时如果只按“最后提交覆盖”，高价值数据很容易被静默吞掉。更成熟的方式是版本号检测 + 冲突提示 + 用户选择保留哪一份。',
    bestFor: ['跨终端业务', '多人可能接力编辑的单据', '高价值记录编辑场景'],
    focus: [
      '草稿保存接口返回 version 或 etag',
      '保存前比对客户端版本与服务端版本',
      '冲突时给出 diff 和合并选择',
    ],
    risks: [
      '无版本号，最后一次保存直接覆盖',
      '多标签页编辑互相踩内容',
      '用户冲突后只能刷新重来',
    ],
    language: 'text',
    code: `Conflict Strategy
- clientVersion === serverVersion: 正常保存
- clientVersion < serverVersion: 触发冲突提示
- 冲突处理：保留本地 / 保留远端 / 合并字段后再保存`,
  },
  {
    order: '05',
    title: '草稿中心是正式产品能力，不是顺手堆一个列表页',
    tag: '草稿中心',
    description:
      '当系统里存在多个可恢复草稿时，草稿中心就不该只是一个“标题 + 时间”的简单列表。它至少要支持搜索、状态筛选、最近编辑时间、来源页面、恢复入口、删除与清理规则。草稿多了以后，没有草稿中心用户根本不知道哪些内容还没处理完。',
    bestFor: ['多模块编辑平台', '长期业务录入系统', '知识库 / EMR / CMS 场景'],
    focus: [
      '草稿中心支持模块分类与搜索',
      '展示最后保存时间、来源、状态和是否冲突',
      '支持过期清理、手动删除和恢复继续编辑',
    ],
    risks: [
      '草稿越来越多但无法管理',
      '删除草稿不做确认或不可撤销提醒',
      '没有过期策略导致历史垃圾堆积',
    ],
    language: 'text',
    code: `Draft Center Fields
- title
- module
- lastSavedAt
- sourcePage
- status(draft/conflict/expired)
- recoverAction`,
  },
];

const comparisonCards = [
  {
    title: '本地缓存',
    summary:
      '解决的是刷新或临时断网丢失问题，优点是快，缺点是跨设备不可恢复、易受浏览器清理影响。',
  },
  {
    title: '服务端正式草稿',
    summary:
      '适合高价值内容编辑，支持跨设备恢复和草稿箱管理，但要面对版本控制、权限和存储成本。',
  },
  {
    title: '版本快照',
    summary:
      '适合长链路编辑和高风险修改，能回看历史节点，但不应该替代当前草稿状态本身。',
  },
];

const draftStateExample = `type DraftState = {
  localBuffer: Record<string, unknown>;
  lastSavedDraft?: {
    draftId: string;
    version: number;
    savedAt: string;
    snapshot: Record<string, unknown>;
  };
  serverDraft?: {
    draftId: string;
    version: number;
    snapshot: Record<string, unknown>;
  };
  submittedRecordId?: string;
};`;
</script>

<style scoped>
.draft-guide-page {
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

.draft-guide-page__shell {
  max-width: 1240px;
  margin: 0 auto;
}

.draft-guide-page__top {
  display: flex;
  justify-content: flex-start;
  margin-bottom: 18px;
}

.draft-guide-page__back {
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

.draft-guide-page__back:hover {
  transform: translateY(-1px);
  border-color: rgba(67, 94, 118, 0.18);
  box-shadow: 0 18px 42px rgba(19, 27, 34, 0.1);
}

.draft-guide-page__content {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.draft-guide-hero,
.draft-guide-panel,
.draft-guide-card {
  border: 1px solid rgba(19, 27, 34, 0.08);
  border-radius: 7px;
  background: rgba(255, 255, 255, 0.96);
  box-shadow: 0 24px 54px rgba(19, 27, 34, 0.06);
}

.draft-guide-hero {
  display: grid;
  grid-template-columns: minmax(0, 1.4fr) minmax(320px, 0.8fr);
  gap: 18px;
  padding: 28px;
}

.draft-guide-hero__eyebrow,
.draft-guide-section__eyebrow,
.draft-guide-card__eyebrow,
.draft-guide-panel__eyebrow {
  font-size: 11px;
  line-height: 1.4;
  letter-spacing: 0.24em;
  text-transform: uppercase;
  color: #7e8894;
}

.draft-guide-hero__title {
  margin-top: 10px;
  font-size: 42px;
  line-height: 1.06;
  font-weight: 600;
  letter-spacing: -0.04em;
  color: #17202a;
}

.draft-guide-hero__summary,
.draft-guide-panel__text,
.draft-guide-card__text {
  font-size: 15px;
  line-height: 1.9;
  color: #55606c;
}

.draft-guide-hero__summary {
  margin-top: 16px;
  max-width: 760px;
}

.draft-guide-hero__panel,
.draft-guide-mini-panel {
  padding: 20px;
  border: 1px solid rgba(19, 27, 34, 0.08);
  border-radius: 7px;
  background: linear-gradient(180deg, #ffffff 0%, #f5f8fb 100%);
}

.draft-guide-hero__label,
.draft-guide-mini-panel__title {
  font-size: 13px;
  line-height: 1.5;
  font-weight: 600;
  color: #17202a;
}

.draft-guide-list {
  margin: 12px 0 0;
  padding-left: 18px;
  display: grid;
  gap: 8px;
  color: #55606c;
  font-size: 14px;
  line-height: 1.75;
}

.draft-guide-grid,
.draft-guide-columns {
  display: grid;
  gap: 16px;
}

.draft-guide-grid {
  grid-template-columns: repeat(5, minmax(0, 1fr));
}

.draft-guide-card {
  padding: 20px;
}

.draft-guide-card__title,
.draft-guide-panel__title,
.draft-guide-section__title {
  color: #17202a;
}

.draft-guide-card__title {
  margin-top: 8px;
  font-size: 19px;
  line-height: 1.35;
  font-weight: 600;
}

.draft-guide-card__text {
  margin-top: 10px;
}

.draft-guide-section {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.draft-guide-section__head {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
}

.draft-guide-section__title {
  margin-top: 8px;
  font-size: 28px;
  line-height: 1.2;
  font-weight: 600;
  letter-spacing: -0.03em;
}

.draft-guide-stack {
  display: grid;
  gap: 16px;
}

.draft-guide-panel {
  padding: 24px;
}

.draft-guide-panel.is-wide {
  padding: 26px;
}

.draft-guide-method__head {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 12px;
}

.draft-guide-method__tag {
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

.draft-guide-panel__title {
  margin-top: 8px;
  font-size: 24px;
  line-height: 1.28;
  font-weight: 600;
}

.draft-guide-panel__text {
  margin-top: 14px;
}

.draft-guide-method__grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 14px;
  margin-top: 18px;
}

.draft-guide-code-block {
  margin-top: 18px;
}

.draft-guide-columns {
  grid-template-columns: repeat(3, minmax(0, 1fr));
}

@media (max-width: 1100px) {
  .draft-guide-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .draft-guide-columns,
  .draft-guide-method__grid,
  .draft-guide-hero {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 720px) {
  .draft-guide-page {
    padding: 18px;
  }

  .draft-guide-grid {
    grid-template-columns: 1fr;
  }

  .draft-guide-hero,
  .draft-guide-card,
  .draft-guide-panel {
    padding: 18px;
  }

  .draft-guide-hero__title {
    font-size: 32px;
  }

  .draft-guide-section__title {
    font-size: 22px;
  }
}
</style>
