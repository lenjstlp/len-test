<template>
  <section class="undo-redo-guide-page">
    <div class="undo-redo-guide-page__shell">
      <div class="undo-redo-guide-page__top">
        <RouterLink
          to="/fullstack-guide"
          class="undo-redo-guide-page__back"
          aria-label="返回全栈能力菜单"
          title="返回全栈能力菜单"
        >
          <el-icon :size="18"><ArrowLeft /></el-icon>
        </RouterLink>
      </div>

      <div class="undo-redo-guide-page__content">
        <header class="undo-redo-guide-hero">
          <div>
            <p class="undo-redo-guide-hero__eyebrow">
              Frontend Undo Redo Engineering
            </p>
            <h1 class="undo-redo-guide-hero__title">前端撤销重做工程</h1>
            <p class="undo-redo-guide-hero__summary">
              撤销重做不是只给状态数组塞两个栈。真正的工程问题是：粒度如何定义、连续输入怎样合并成一个动作、异步副作用怎么回滚、协同场景下本地历史是否还能成立，以及历史记录怎样控制内存和序列化成本。
            </p>
          </div>

          <div class="undo-redo-guide-hero__panel">
            <p class="undo-redo-guide-hero__label">学完结果</p>
            <ul class="undo-redo-guide-list">
              <li>
                能设计命令式、快照式、patch 式三类撤销重做模型的适用边界。
              </li>
              <li>
                能处理输入合并、历史截断、异步操作与多模块联动下的回滚策略。
              </li>
              <li>
                能在编辑器、表单设计器、低代码与表格系统里落地可用的历史机制。
              </li>
            </ul>
          </div>
        </header>

        <section class="undo-redo-guide-grid">
          <article
            v-for="item in quickStages"
            :key="item.order"
            class="undo-redo-guide-card"
          >
            <p class="undo-redo-guide-card__eyebrow">Stage {{ item.order }}</p>
            <h2 class="undo-redo-guide-card__title">{{ item.title }}</h2>
            <p class="undo-redo-guide-card__text">{{ item.summary }}</p>
          </article>
        </section>

        <section class="undo-redo-guide-section">
          <div class="undo-redo-guide-section__head">
            <div>
              <p class="undo-redo-guide-section__eyebrow">Engineering Order</p>
              <h2 class="undo-redo-guide-section__title">
                先定义动作粒度，再处理历史模型、合并、回滚与内存控制
              </h2>
            </div>
          </div>

          <div class="undo-redo-guide-stack">
            <article
              v-for="stage in guideStages"
              :key="stage.order"
              class="undo-redo-guide-panel is-wide"
            >
              <div class="undo-redo-guide-method__head">
                <div>
                  <p class="undo-redo-guide-panel__eyebrow">
                    Stage {{ stage.order }}
                  </p>
                  <h3 class="undo-redo-guide-panel__title">
                    {{ stage.title }}
                  </h3>
                </div>
                <span class="undo-redo-guide-method__tag">{{ stage.tag }}</span>
              </div>

              <p class="undo-redo-guide-panel__text">{{ stage.description }}</p>

              <div class="undo-redo-guide-method__grid">
                <section class="undo-redo-guide-mini-panel">
                  <p class="undo-redo-guide-mini-panel__title">适用场景</p>
                  <ul class="undo-redo-guide-list">
                    <li v-for="item in stage.bestFor" :key="item">
                      {{ item }}
                    </li>
                  </ul>
                </section>

                <section class="undo-redo-guide-mini-panel">
                  <p class="undo-redo-guide-mini-panel__title">实现重点</p>
                  <ul class="undo-redo-guide-list">
                    <li v-for="item in stage.focus" :key="item">{{ item }}</li>
                  </ul>
                </section>

                <section class="undo-redo-guide-mini-panel">
                  <p class="undo-redo-guide-mini-panel__title">常见误区</p>
                  <ul class="undo-redo-guide-list">
                    <li v-for="item in stage.risks" :key="item">{{ item }}</li>
                  </ul>
                </section>
              </div>

              <AppCodeBlock
                class="undo-redo-guide-code-block"
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
    title: '先定义动作粒度',
    summary:
      '一次输入算一个动作，还是一段连续输入合并为一个动作，决定了历史是否好用。',
  },
  {
    order: '02',
    title: '模型选择要现实',
    summary: '快照、patch、命令模式各有成本，不存在一套模型通吃所有页面。',
  },
  {
    order: '03',
    title: '异步副作用要隔离',
    summary: '撤销 UI 变更不等于撤销接口写入，副作用链路要单独治理。',
  },
  {
    order: '04',
    title: '分支历史要可控',
    summary: '撤销后再做新操作，redo 栈是否清空、能否分支，都必须有明确规则。',
  },
  {
    order: '05',
    title: '内存要有上限',
    summary: '长编辑链路下历史无限增长，会迅速拖垮内存和序列化成本。',
  },
];

const guideStages = [
  {
    order: '01',
    title: '先定义“什么算一次动作”，否则撤销体验一定别扭',
    tag: 'Granularity',
    description:
      '撤销重做最容易失败的地方，不是栈结构，而是动作粒度。用户连续输入 10 个字符，通常希望一次撤销回退整段输入，而不是按字符回退 10 次；拖拽一批节点也应视为一个动作。粒度定义不符合心智，再正确的算法也会让用户觉得不好用。',
    bestFor: ['富文本编辑器', '低代码设计器', '表格批量编辑', '表单构建器'],
    focus: [
      '定义按键输入、拖拽、批量操作等动作合并规则',
      '为连续动作设置时间窗口或显式 commit 点',
      '让撤销单位符合用户真实心智',
    ],
    risks: [
      '所有微操作都单独入栈，撤销体验碎裂',
      '批量操作拆成多条历史，回退非常痛苦',
      '动作粒度没有统一规范，不同模块体验割裂',
    ],
    language: 'text',
    code: `Undo Action Examples
- typing burst => one action
- drag 20 nodes => one action
- bulk fill cells => one action
- toggle panel => usually no history`,
  },
  {
    order: '02',
    title: '快照、patch、命令模式要按场景选，不要盲目统一',
    tag: 'History Model',
    description:
      '快照式实现简单但占内存；patch 式节省空间但需要稳定 diff；命令模式最适合结构化动作和副作用明确的场景。真正的工程方案通常不是只选一个，而是按模块特征组合使用。比如编辑器文档用 patch，画布节点操作用命令，对体量小的配置页直接用快照。',
    bestFor: ['编辑器', '画布系统', '低代码平台', '配置型工作台'],
    focus: [
      '根据数据体积和动作类型选历史模型',
      '为每类动作定义 redo 所需的最小信息',
      '必要时按模块混用多种历史模型',
    ],
    risks: [
      '全站一刀切快照，内存和性能迅速恶化',
      'patch 设计不稳定，回放后状态不一致',
      '命令模式只记录执行，不记录反操作数据',
    ],
    language: 'ts',
    code: `type HistoryEntry =
  | { type: 'snapshot'; state: unknown }
  | { type: 'patch'; patches: unknown[]; inversePatches: unknown[] }
  | { type: 'command'; do: () => void; undo: () => void }`,
  },
  {
    order: '03',
    title: '撤销重做要把本地状态和异步副作用分开治理',
    tag: 'Side Effects',
    description:
      '很多人以为撤销了页面状态，就等于系统真的回滚了。其实如果某次操作已经发出接口、落了数据库、触发了消息或审计链路，UI 撤销只是本地回退，不代表副作用也自动撤销。工程上必须明确哪些动作只做本地历史，哪些动作需要额外发补偿请求，哪些动作根本不允许撤销。',
    bestFor: [
      '有保存动作的表单系统',
      '可持久化编辑器',
      '多人协作产品',
      '带审批流的业务系统',
    ],
    focus: [
      '区分可本地撤销与需服务端补偿的动作',
      '为持久化动作定义 rollback API 或禁止撤销策略',
      '把副作用状态显式暴露给历史系统',
    ],
    risks: [
      'UI 回退了，但服务端数据没回退，造成假一致',
      '所有动作一视同仁可撤销，碰到已提交数据直接穿帮',
      '副作用失败时历史栈状态和真实业务状态错位',
    ],
    language: 'ts',
    code: `type UndoPolicy = 'local-only' | 'needs-compensation' | 'non-undoable'

type ActionDescriptor = {
  id: string
  undoPolicy: UndoPolicy
  run: () => Promise<void> | void
  rollback?: () => Promise<void> | void
}`,
  },
  {
    order: '04',
    title: '撤销后再产生新动作，必须明确 redo 栈和分支历史规则',
    tag: 'Branching',
    description:
      '用户撤销几步后再做新操作，历史其实已经分叉。最常见的策略是清空 redo 栈，因为旧未来已不再成立；更高级的编辑器可能会保留分支，但代价更高。关键不是哪种更高级，而是规则必须稳定且对用户可预期。',
    bestFor: ['长链路编辑器', '画布工具', '配置工作台'],
    focus: [
      '默认新动作出现时清空 redo 栈',
      '如需分支历史，必须给出可视化与选择机制',
      'history 指针与当前状态要严格对应',
    ],
    risks: [
      '撤销后继续操作但 redo 还保留，造成未来状态污染',
      '历史指针和真实状态不同步，越回退越乱',
      '为了高级而强做分支历史，最后复杂度压垮维护',
    ],
    language: 'ts',
    code: `const pushHistory = (entry: HistoryEntry) => {
  history.redoStack = []
  history.undoStack.push(entry)
}`,
  },
  {
    order: '05',
    title: '历史记录要做容量控制、合并压缩和快照落点设计',
    tag: 'Memory',
    description:
      '只要页面允许长时间编辑，撤销栈就会无限增长。工程上至少要限制最大历史条数，对高频输入做合并，对超大对象快照做裁剪或稀疏快照。否则看似“功能完整”，实际运行一段时间后内存和序列化成本都会失控。',
    bestFor: [
      '长时间在线编辑系统',
      '大文档编辑器',
      '可视化画布',
      '高频录入工作台',
    ],
    focus: [
      '限制最大 undo/redo 深度',
      '对高频连续动作做合并',
      '必要时混用全量快照与增量 patch 以平衡恢复成本',
    ],
    risks: [
      '历史无限增长，长会话必然卡顿',
      '所有动作都记录完整快照，内存浪费严重',
      '只做条数限制，不做输入合并，体验仍然很差',
    ],
    language: 'ts',
    code: `const trimHistory = (max = 100) => {
  if (history.undoStack.length > max) {
    history.undoStack.splice(0, history.undoStack.length - max)
  }
}`,
  },
];
</script>

<style scoped>
.undo-redo-guide-page {
  min-height: calc(100vh - 40px);
  padding: 24px;
  border: 1px solid rgba(19, 27, 34, 0.08);
  border-radius: 7px;
  background:
    radial-gradient(
      circle at top left,
      rgba(223, 232, 239, 0.44),
      transparent 28%
    ),
    linear-gradient(180deg, #fcfdfe 0%, #f3f6f8 100%);
  box-shadow: 0 30px 80px rgba(18, 26, 34, 0.08);
}

.undo-redo-guide-page__shell {
  min-height: calc(100vh - 90px);
  border: 1px solid rgba(19, 27, 34, 0.06);
  border-radius: 7px;
  background: rgba(255, 255, 255, 0.84);
}

.undo-redo-guide-page__top {
  display: flex;
  justify-content: flex-start;
  padding: 18px 18px 0;
}

.undo-redo-guide-page__back {
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

.undo-redo-guide-page__back:hover {
  transform: translateY(-1px);
  border-color: rgba(46, 70, 91, 0.18);
  box-shadow: 0 18px 34px rgba(19, 27, 34, 0.08);
}

.undo-redo-guide-page__content {
  padding: 18px 24px 24px;
}

.undo-redo-guide-hero,
.undo-redo-guide-panel,
.undo-redo-guide-card {
  border: 1px solid rgba(19, 27, 34, 0.08);
  border-radius: 7px;
  background: rgba(255, 255, 255, 0.86);
}

.undo-redo-guide-hero {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 320px;
  gap: 20px;
  padding: 28px;
}

.undo-redo-guide-hero__eyebrow,
.undo-redo-guide-section__eyebrow,
.undo-redo-guide-card__eyebrow,
.undo-redo-guide-hero__label {
  font-size: 11px;
  line-height: 1.4;
  letter-spacing: 0.24em;
  text-transform: uppercase;
  color: #7b8793;
}

.undo-redo-guide-hero__title {
  margin-top: 10px;
  font-size: 46px;
  line-height: 1.06;
  font-weight: 600;
  letter-spacing: -0.05em;
  color: #17202a;
}

.undo-redo-guide-hero__summary {
  max-width: 860px;
  margin-top: 16px;
  font-size: 15px;
  line-height: 1.9;
  color: #58636f;
}

.undo-redo-guide-hero__panel {
  align-self: stretch;
  padding: 18px;
  border: 1px solid rgba(19, 27, 34, 0.08);
  border-radius: 7px;
  background: linear-gradient(180deg, #fbfcfd 0%, #f4f7fa 100%);
}

.undo-redo-guide-list {
  display: grid;
  gap: 8px;
  margin: 12px 0 0;
  padding-left: 18px;
  font-size: 14px;
  line-height: 1.8;
  color: #56616d;
}

.undo-redo-guide-grid,
.undo-redo-guide-stack {
  display: grid;
  gap: 16px;
}

.undo-redo-guide-grid {
  margin-top: 28px;
  grid-template-columns: repeat(5, minmax(0, 1fr));
}

.undo-redo-guide-card {
  padding: 18px;
}

.undo-redo-guide-card__title,
.undo-redo-guide-panel__title,
.undo-redo-guide-section__title {
  color: #17202a;
}

.undo-redo-guide-card__title {
  margin-top: 10px;
  font-size: 22px;
  line-height: 1.25;
  font-weight: 600;
}

.undo-redo-guide-card__text,
.undo-redo-guide-panel__text {
  margin-top: 12px;
  font-size: 14px;
  line-height: 1.9;
  color: #596571;
}

.undo-redo-guide-section {
  margin-top: 28px;
}

.undo-redo-guide-section__head {
  margin-bottom: 14px;
}

.undo-redo-guide-section__title {
  margin-top: 8px;
  font-size: 30px;
  line-height: 1.18;
  font-weight: 600;
  letter-spacing: -0.03em;
}

.undo-redo-guide-stack {
  grid-template-columns: repeat(2, minmax(0, 1fr));
}

.undo-redo-guide-panel {
  padding: 18px;
}

.undo-redo-guide-panel.is-wide {
  grid-column: 1 / -1;
}

.undo-redo-guide-panel__eyebrow {
  font-size: 11px;
  line-height: 1.4;
  letter-spacing: 0.24em;
  text-transform: uppercase;
  color: #80909d;
}

.undo-redo-guide-panel__title {
  font-size: 20px;
  line-height: 1.3;
  font-weight: 600;
}

.undo-redo-guide-method__head {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 16px;
}

.undo-redo-guide-method__tag {
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

.undo-redo-guide-method__grid {
  display: grid;
  gap: 14px;
  margin-top: 16px;
  grid-template-columns: repeat(3, minmax(0, 1fr));
}

.undo-redo-guide-mini-panel {
  padding: 14px;
  border: 1px solid rgba(19, 27, 34, 0.08);
  border-radius: 7px;
  background: rgba(245, 248, 250, 0.9);
}

.undo-redo-guide-mini-panel__title {
  font-size: 14px;
  font-weight: 600;
  color: #17202a;
}

.undo-redo-guide-code-block {
  margin-top: 14px;
}

@media (max-width: 1080px) {
  .undo-redo-guide-hero,
  .undo-redo-guide-grid,
  .undo-redo-guide-stack,
  .undo-redo-guide-method__grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 900px) {
  .undo-redo-guide-page {
    min-height: auto;
    padding: 18px;
  }

  .undo-redo-guide-page__shell {
    min-height: auto;
  }

  .undo-redo-guide-page__content {
    padding: 18px;
  }

  .undo-redo-guide-hero__title {
    font-size: 36px;
  }

  .undo-redo-guide-section__title {
    font-size: 26px;
  }
}
</style>
