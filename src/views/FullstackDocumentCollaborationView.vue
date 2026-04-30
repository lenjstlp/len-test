<template>
  <section class="doc-collab-guide-page">
    <div class="doc-collab-guide-page__shell">
      <div class="doc-collab-guide-page__top">
        <RouterLink
          to="/fullstack-guide"
          class="doc-collab-guide-page__back"
          aria-label="返回全栈能力菜单"
          title="返回全栈能力菜单"
        >
          <el-icon :size="18"><ArrowLeft /></el-icon>
        </RouterLink>
      </div>

      <div class="doc-collab-guide-page__content">
        <header class="doc-collab-guide-hero">
          <div>
            <p class="doc-collab-guide-hero__eyebrow">
              Frontend Document Collaboration Engineering
            </p>
            <h1 class="doc-collab-guide-hero__title">前端文档协同工程能力</h1>
            <p class="doc-collab-guide-hero__summary">
              文档协同不是把多人同时打开页面就算完成，而是要解决实时同步、冲突合并、游标感知、评论审阅、版本回放和权限隔离这些工程问题。真正困难的地方在于：你要让多人在同一份内容上协作时，既能实时看到彼此变化，又不会把数据一致性和编辑体验一起搞崩。
            </p>
          </div>

          <div class="doc-collab-guide-hero__panel">
            <p class="doc-collab-guide-hero__label">学完结果</p>
            <ul class="doc-collab-guide-list">
              <li>
                能分清单人编辑器、多人协同编辑器和专业文档协同平台之间的能力边界。
              </li>
              <li>能设计一套实时同步、版本控制、权限审阅和断线恢复方案。</li>
              <li>能判断什么时候接现成协同服务，什么时候值得自建协同链路。</li>
            </ul>
          </div>
        </header>

        <section class="doc-collab-guide-grid">
          <article
            v-for="item in quickStages"
            :key="item.order"
            class="doc-collab-guide-card"
          >
            <p class="doc-collab-guide-card__eyebrow">Stage {{ item.order }}</p>
            <h2 class="doc-collab-guide-card__title">{{ item.title }}</h2>
            <p class="doc-collab-guide-card__text">{{ item.summary }}</p>
          </article>
        </section>

        <section class="doc-collab-guide-section">
          <div class="doc-collab-guide-section__head">
            <div>
              <p class="doc-collab-guide-section__eyebrow">Build Order</p>
              <h2 class="doc-collab-guide-section__title">
                文档协同先定模型和同步协议，再处理冲突、权限、审阅和版本
              </h2>
            </div>
          </div>

          <div class="doc-collab-guide-stack">
            <article
              v-for="stage in guideStages"
              :key="stage.order"
              class="doc-collab-guide-panel is-wide"
            >
              <div class="doc-collab-guide-method__head">
                <div>
                  <p class="doc-collab-guide-panel__eyebrow">
                    Stage {{ stage.order }}
                  </p>
                  <h3 class="doc-collab-guide-panel__title">
                    {{ stage.title }}
                  </h3>
                </div>
                <span class="doc-collab-guide-method__tag">{{
                  stage.tag
                }}</span>
              </div>

              <p class="doc-collab-guide-panel__text">
                {{ stage.description }}
              </p>

              <div class="doc-collab-guide-method__grid">
                <section class="doc-collab-guide-mini-panel">
                  <p class="doc-collab-guide-mini-panel__title">适用场景</p>
                  <ul class="doc-collab-guide-list">
                    <li v-for="item in stage.bestFor" :key="item">
                      {{ item }}
                    </li>
                  </ul>
                </section>

                <section class="doc-collab-guide-mini-panel">
                  <p class="doc-collab-guide-mini-panel__title">实现重点</p>
                  <ul class="doc-collab-guide-list">
                    <li v-for="item in stage.focus" :key="item">
                      {{ item }}
                    </li>
                  </ul>
                </section>

                <section class="doc-collab-guide-mini-panel">
                  <p class="doc-collab-guide-mini-panel__title">常见误区</p>
                  <ul class="doc-collab-guide-list">
                    <li v-for="item in stage.risks" :key="item">
                      {{ item }}
                    </li>
                  </ul>
                </section>
              </div>

              <AppCodeBlock
                class="doc-collab-guide-code-block"
                :code="stage.code"
                :lang="stage.language"
              />
            </article>
          </div>
        </section>

        <section class="doc-collab-guide-section">
          <div class="doc-collab-guide-section__head">
            <div>
              <p class="doc-collab-guide-section__eyebrow">Comparison</p>
              <h2 class="doc-collab-guide-section__title">
                做文档协同系统时最关键的几组判断
              </h2>
            </div>
          </div>

          <div class="doc-collab-guide-columns">
            <article
              v-for="item in comparisonCards"
              :key="item.title"
              class="doc-collab-guide-panel"
            >
              <h3 class="doc-collab-guide-panel__title">{{ item.title }}</h3>
              <p class="doc-collab-guide-panel__text">{{ item.summary }}</p>
            </article>
          </div>
        </section>

        <section class="doc-collab-guide-section">
          <div class="doc-collab-guide-section__head">
            <div>
              <p class="doc-collab-guide-section__eyebrow">Checklist</p>
              <h2 class="doc-collab-guide-section__title">
                一套能落地的前端文档协同工程建设清单
              </h2>
            </div>
          </div>

          <article class="doc-collab-guide-panel is-wide">
            <ul class="doc-collab-guide-list">
              <li>
                先明确文档模型和操作协议，别一开始就把协同等同于“WebSocket
                推内容”。
              </li>
              <li>
                同步层要支持断线重连、增量补发和服务端确认，不然多人编辑迟早出现数据错位。
              </li>
              <li>
                评论、批注、只读审阅、修订模式和权限编辑要分清，不要混在一个状态里。
              </li>
              <li>
                版本历史必须支持回放、比对和回滚，否则协同出错后很难定位和修复。
              </li>
              <li>
                如果业务进入复杂分页、Office
                兼容和正式文档修订，要尽早评估专业协同方案而不是硬堆前端逻辑。
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
    title: '先定文档模型',
    summary:
      '协同能力建立在稳定文档模型之上，模型不清晰，后面的操作同步和冲突处理都会失控。',
  },
  {
    order: '02',
    title: '同步协议要独立',
    summary:
      '多人编辑不是简单把全文广播给所有人，而是要同步操作、版本号、确认状态和补偿逻辑。',
  },
  {
    order: '03',
    title: '冲突处理是主战场',
    summary:
      '协同系统最难的不是通信，而是同一区域被多人同时编辑时怎么保证最终一致性和体验可接受。',
  },
  {
    order: '04',
    title: '协作体验要可感知',
    summary:
      '用户不仅要看到内容变化，还要看到谁在编辑、谁在评论、谁在选中什么区域。',
  },
  {
    order: '05',
    title: '权限与版本必须并行设计',
    summary: '没有权限隔离和版本回滚，协同系统一旦出错，恢复成本会极高。',
  },
];

const guideStages = [
  {
    order: '01',
    title: '协同编辑先解决“操作是什么”，再考虑这些操作怎么同步',
    tag: 'Document Model',
    description:
      '做文档协同时，第一件事不是上 WebSocket，而是定义文档模型和操作模型。你到底同步的是全文、差异片段、结构化节点树，还是一组操作命令？这会直接决定后续冲突合并和版本重放的难度。成熟方案通常不会同步整篇字符串，而是同步带语义的操作或 CRDT/OT 变更。',
    bestFor: ['多人知识库', '协同病历', '合同审阅', '在线富文本系统'],
    focus: [
      '文档模型与操作模型要一起设计',
      '操作要能重放、撤销、合并和记录来源',
      '前端和服务端要对版本语义达成一致',
    ],
    risks: [
      '直接同步整篇 HTML 或字符串',
      '只管展示结果，不记录操作上下文',
      '前端与服务端对版本含义理解不一致',
    ],
    language: 'ts',
    code: `type CollaborationOperation = {
  id: string
  type: 'insert' | 'delete' | 'format' | 'comment'
  position: number
  payload: Record<string, unknown>
  baseVersion: number
  actorId: string
}`,
  },
  {
    order: '02',
    title: '实时同步层要能处理确认、补发和断线恢复，而不只是“消息到了就改”',
    tag: 'Sync Protocol',
    description:
      '协同编辑真正复杂的地方，在于网络不稳定、客户端切后台、消息乱序和多端同时在线。同步层要明确哪些操作已被服务端确认，哪些仍在本地乐观应用，断线回来后需要补哪些增量。否则用户看到的内容可能短时间正确，但几分钟后版本就彻底分叉。',
    bestFor: ['长时间在线编辑', '多端同时操作', '弱网协同场景'],
    focus: [
      '本地待确认队列、服务端确认版本和重连补偿策略要完整',
      '处理消息乱序、重复提交和回放幂等',
      'UI 层要能区分已提交和待同步状态',
    ],
    risks: [
      '消息到达就直接认为已成功提交',
      '断线重连后只拉全文，不补操作链路',
      '本地乐观更新与服务端真实状态脱节',
    ],
    language: 'ts',
    code: `type SyncEnvelope = {
  documentId: string
  version: number
  operations: CollaborationOperation[]
  ackOperationIds: string[]
}`,
  },
  {
    order: '03',
    title: '冲突处理决定系统上限，不能等业务上线后再补',
    tag: 'Conflict Resolution',
    description:
      '两个人同时在同一段落输入、一个人删段落另一个人加批注、一个人改标题另一个人做格式调整，这些冲突在协同里非常常见。工程上需要一开始就明确你的冲突解决策略，是用 OT、CRDT，还是更受限的锁区块模式。这里没有银弹，但绝对不能没有策略。',
    bestFor: ['多人同时编辑', '高频评论修订', '复杂文档操作'],
    focus: [
      '按业务复杂度选择 OT、CRDT 或受限协同策略',
      '冲突解决要兼顾一致性和用户可理解性',
      '对不可自动合并的冲突提供提示和人工介入机制',
    ],
    risks: [
      '默认假设多人不会同时编辑同一块内容',
      '冲突后静默覆盖，用户无感知',
      '只在客户端本地处理冲突，服务端没有统一裁决',
    ],
    language: 'text',
    code: `冲突处理路线
- 简单协同：段落锁 / 区块锁
- 中等复杂度：操作转换（OT）
- 高自由度结构化协同：CRDT
- 无法自动合并：提示冲突并交给用户确认`,
  },
  {
    order: '04',
    title: '协作体验不止内容同步，还包括游标、评论、审阅和身份感知',
    tag: 'Collaboration UX',
    description:
      '从用户视角看，协同系统最直观的价值不是底层算法，而是“我能不能知道谁正在改哪里”。因此除了内容同步，你还要做远端光标、在线成员、评论线程、批注锚点、修订记录、高亮选区和权限提示。这些都是让协同可感知、可理解、可回溯的关键体验层。',
    bestFor: ['团队协作文档', '在线审阅', '审批修订系统'],
    focus: [
      '远端游标、选区、头像和在线状态要轻量同步',
      '评论和批注要挂靠到稳定锚点而不是裸位置',
      '编辑态、审阅态和只读态要有清晰模式切换',
    ],
    risks: [
      '只同步文本，不同步任何协作上下文',
      '评论锚点随文本变动后失效',
      '远端状态过多导致页面噪音和性能问题',
    ],
    language: 'json',
    code: `{
  "presence": {
    "userId": "u_1024",
    "name": "Dr. Lin",
    "cursor": { "anchor": 120, "focus": 124 },
    "mode": "review"
  }
}`,
  },
  {
    order: '05',
    title: '权限、版本历史和回滚链路，决定协同系统是不是业务级产品',
    tag: 'Governance',
    description:
      '真正用于业务的协同系统，必须能回答这些问题：谁改了哪一段，什么时候改的，能不能回退，评论是否归档，某些人是否只能评论不能编辑。这就要求你把权限、版本快照、审计日志和回滚能力一起纳入设计。否则系统一旦出现误操作或争议，前端没有任何手段恢复现场。',
    bestFor: ['医疗文书', '合规审计文档', '企业知识库', '多人审批系统'],
    focus: [
      '区分编辑、评论、审阅、导出和管理等不同权限',
      '版本快照、操作日志和审计记录要可追溯',
      '支持按版本比对、回放和局部恢复',
    ],
    risks: [
      '所有协作者拥有同一套完全权限',
      '只有最终文档，没有中间版本历史',
      '回滚只能整篇覆盖，无法定位局部问题',
    ],
    language: 'ts',
    code: `type DocumentRevision = {
  revisionId: string
  version: number
  createdAt: string
  authorId: string
  summary: string
}`,
  },
];

const comparisonCards = [
  {
    title: '整篇内容同步 vs 操作级同步',
    summary:
      '整篇同步实现快但扩展性差；操作级同步前期重一些，却更适合冲突处理、版本回放和多人实时协作。',
  },
  {
    title: '自建协同链路 vs 接专业协同平台',
    summary:
      '自建更灵活，但同步、冲突和版本治理成本很高；专业协同平台接入更快，但会受限于产品能力和部署方式。',
  },
  {
    title: '轻量评论协作 vs 正式文档修订系统',
    summary:
      '轻量评论足够支撑普通知识库；如果业务进入正式修订、审签、Office 兼容和合规追溯，就要尽早上更重的方案。',
  },
];
</script>

<style scoped>
.doc-collab-guide-page {
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

.doc-collab-guide-page__shell {
  min-height: calc(100vh - 90px);
  border: 1px solid rgba(19, 27, 34, 0.06);
  border-radius: 7px;
  background: rgba(255, 255, 255, 0.82);
}

.doc-collab-guide-page__top {
  display: flex;
  justify-content: flex-start;
  padding: 18px 18px 0;
}

.doc-collab-guide-page__back {
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

.doc-collab-guide-page__back:hover {
  transform: translateY(-1px);
  border-color: rgba(46, 70, 91, 0.18);
  box-shadow: 0 18px 34px rgba(19, 27, 34, 0.08);
}

.doc-collab-guide-page__content {
  padding: 18px 24px 24px;
}

.doc-collab-guide-hero {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 320px;
  gap: 20px;
  padding-bottom: 26px;
  border-bottom: 1px solid rgba(19, 27, 34, 0.08);
}

.doc-collab-guide-hero__eyebrow,
.doc-collab-guide-section__eyebrow,
.doc-collab-guide-card__eyebrow,
.doc-collab-guide-hero__label {
  font-size: 11px;
  line-height: 1.4;
  letter-spacing: 0.24em;
  text-transform: uppercase;
  color: #7b8793;
}

.doc-collab-guide-hero__title {
  margin-top: 10px;
  font-size: 46px;
  line-height: 1.06;
  font-weight: 600;
  letter-spacing: -0.05em;
  color: #17202a;
}

.doc-collab-guide-hero__summary {
  max-width: 860px;
  margin-top: 16px;
  font-size: 15px;
  line-height: 1.9;
  color: #58636f;
}

.doc-collab-guide-hero__panel,
.doc-collab-guide-card,
.doc-collab-guide-panel {
  border: 1px solid rgba(19, 27, 34, 0.08);
  border-radius: 7px;
  background: rgba(255, 255, 255, 0.84);
}

.doc-collab-guide-hero__panel {
  padding: 18px;
}

.doc-collab-guide-list {
  display: grid;
  gap: 8px;
  margin: 12px 0 0;
  padding-left: 18px;
  font-size: 14px;
  line-height: 1.8;
  color: #56616d;
}

.doc-collab-guide-grid,
.doc-collab-guide-columns,
.doc-collab-guide-stack {
  display: grid;
  gap: 16px;
}

.doc-collab-guide-grid {
  margin-top: 28px;
  grid-template-columns: repeat(3, minmax(0, 1fr));
}

.doc-collab-guide-card {
  padding: 18px;
}

.doc-collab-guide-card__title,
.doc-collab-guide-panel__title,
.doc-collab-guide-section__title {
  color: #17202a;
}

.doc-collab-guide-card__title {
  margin-top: 10px;
  font-size: 22px;
  line-height: 1.25;
  font-weight: 600;
}

.doc-collab-guide-card__text,
.doc-collab-guide-panel__text {
  margin-top: 12px;
  font-size: 14px;
  line-height: 1.9;
  color: #596571;
}

.doc-collab-guide-section {
  margin-top: 28px;
}

.doc-collab-guide-section__head {
  margin-bottom: 14px;
}

.doc-collab-guide-section__title {
  margin-top: 8px;
  font-size: 30px;
  line-height: 1.18;
  font-weight: 600;
  letter-spacing: -0.03em;
}

.doc-collab-guide-columns {
  grid-template-columns: repeat(3, minmax(0, 1fr));
}

.doc-collab-guide-stack {
  grid-template-columns: repeat(2, minmax(0, 1fr));
}

.doc-collab-guide-panel {
  padding: 18px;
}

.doc-collab-guide-panel.is-wide {
  grid-column: 1 / -1;
}

.doc-collab-guide-panel__eyebrow {
  font-size: 11px;
  line-height: 1.4;
  letter-spacing: 0.24em;
  text-transform: uppercase;
  color: #80909d;
}

.doc-collab-guide-panel__title {
  font-size: 20px;
  line-height: 1.3;
  font-weight: 600;
}

.doc-collab-guide-method__head {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 16px;
}

.doc-collab-guide-method__tag {
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

.doc-collab-guide-method__grid {
  display: grid;
  gap: 14px;
  margin-top: 16px;
  grid-template-columns: repeat(3, minmax(0, 1fr));
}

.doc-collab-guide-mini-panel {
  padding: 14px;
  border: 1px solid rgba(19, 27, 34, 0.08);
  border-radius: 7px;
  background: rgba(245, 248, 250, 0.9);
}

.doc-collab-guide-mini-panel__title {
  font-size: 14px;
  font-weight: 600;
  color: #17202a;
}

.doc-collab-guide-code-block {
  margin-top: 14px;
}

@media (max-width: 1080px) {
  .doc-collab-guide-hero,
  .doc-collab-guide-grid,
  .doc-collab-guide-columns,
  .doc-collab-guide-stack,
  .doc-collab-guide-method__grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 900px) {
  .doc-collab-guide-page {
    min-height: auto;
    padding: 18px;
  }

  .doc-collab-guide-page__shell {
    min-height: auto;
  }

  .doc-collab-guide-page__content {
    padding: 18px;
  }

  .doc-collab-guide-hero__title {
    font-size: 36px;
  }

  .doc-collab-guide-section__title {
    font-size: 26px;
  }
}
</style>
