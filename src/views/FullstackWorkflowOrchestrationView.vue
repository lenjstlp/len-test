<template>
  <section class="workflow-guide-page">
    <div class="workflow-guide-page__shell">
      <div class="workflow-guide-page__top">
        <RouterLink
          to="/fullstack-guide"
          class="workflow-guide-page__back"
          aria-label="返回全栈能力菜单"
          title="返回全栈能力菜单"
        >
          <el-icon :size="18"><ArrowLeft /></el-icon>
        </RouterLink>
      </div>

      <div class="workflow-guide-page__content">
        <header class="workflow-guide-hero">
          <div>
            <p class="workflow-guide-hero__eyebrow">
              Frontend Workflow Orchestration Engineering
            </p>
            <h1 class="workflow-guide-hero__title">前端工作流编排工程能力</h1>
            <p class="workflow-guide-hero__summary">
              工作流系统不是画几个节点连几条线，而是要把节点状态、审批动作、表单数据、条件分支、通知回调和运行时追踪统一到一套可执行模型中。真正的难点在于：你既要让业务方看得懂、配得动，又要让系统在复杂流程下依然保持一致、可回溯、可恢复。
            </p>
          </div>

          <div class="workflow-guide-hero__panel">
            <p class="workflow-guide-hero__label">学完结果</p>
            <ul class="workflow-guide-list">
              <li>
                能分清流程建模器、运行时引擎、表单系统和审批台各自的职责边界。
              </li>
              <li>能设计一套节点编排、条件路由、表单联动和状态追踪方案。</li>
              <li>
                能判断什么时候前端只做编排器，什么时候需要联动后端流程引擎一起设计。
              </li>
            </ul>
          </div>
        </header>

        <section class="workflow-guide-grid">
          <article
            v-for="item in quickStages"
            :key="item.order"
            class="workflow-guide-card"
          >
            <p class="workflow-guide-card__eyebrow">Stage {{ item.order }}</p>
            <h2 class="workflow-guide-card__title">{{ item.title }}</h2>
            <p class="workflow-guide-card__text">{{ item.summary }}</p>
          </article>
        </section>

        <section class="workflow-guide-section">
          <div class="workflow-guide-section__head">
            <div>
              <p class="workflow-guide-section__eyebrow">Build Order</p>
              <h2 class="workflow-guide-section__title">
                工作流工程先定流程模型，再处理节点编排、运行时、表单与审计
              </h2>
            </div>
          </div>

          <div class="workflow-guide-stack">
            <article
              v-for="stage in guideStages"
              :key="stage.order"
              class="workflow-guide-panel is-wide"
            >
              <div class="workflow-guide-method__head">
                <div>
                  <p class="workflow-guide-panel__eyebrow">
                    Stage {{ stage.order }}
                  </p>
                  <h3 class="workflow-guide-panel__title">
                    {{ stage.title }}
                  </h3>
                </div>
                <span class="workflow-guide-method__tag">{{ stage.tag }}</span>
              </div>

              <p class="workflow-guide-panel__text">{{ stage.description }}</p>

              <div class="workflow-guide-method__grid">
                <section class="workflow-guide-mini-panel">
                  <p class="workflow-guide-mini-panel__title">适用场景</p>
                  <ul class="workflow-guide-list">
                    <li v-for="item in stage.bestFor" :key="item">
                      {{ item }}
                    </li>
                  </ul>
                </section>

                <section class="workflow-guide-mini-panel">
                  <p class="workflow-guide-mini-panel__title">实现重点</p>
                  <ul class="workflow-guide-list">
                    <li v-for="item in stage.focus" :key="item">
                      {{ item }}
                    </li>
                  </ul>
                </section>

                <section class="workflow-guide-mini-panel">
                  <p class="workflow-guide-mini-panel__title">常见误区</p>
                  <ul class="workflow-guide-list">
                    <li v-for="item in stage.risks" :key="item">
                      {{ item }}
                    </li>
                  </ul>
                </section>
              </div>

              <AppCodeBlock
                class="workflow-guide-code-block"
                :code="stage.code"
                :lang="stage.language"
              />
            </article>
          </div>
        </section>

        <section class="workflow-guide-section">
          <div class="workflow-guide-section__head">
            <div>
              <p class="workflow-guide-section__eyebrow">Comparison</p>
              <h2 class="workflow-guide-section__title">
                做工作流系统时最关键的几组取舍
              </h2>
            </div>
          </div>

          <div class="workflow-guide-columns">
            <article
              v-for="item in comparisonCards"
              :key="item.title"
              class="workflow-guide-panel"
            >
              <h3 class="workflow-guide-panel__title">{{ item.title }}</h3>
              <p class="workflow-guide-panel__text">{{ item.summary }}</p>
            </article>
          </div>
        </section>

        <section class="workflow-guide-section">
          <div class="workflow-guide-section__head">
            <div>
              <p class="workflow-guide-section__eyebrow">Checklist</p>
              <h2 class="workflow-guide-section__title">
                一套能落地的前端工作流编排工程建设清单
              </h2>
            </div>
          </div>

          <article class="workflow-guide-panel is-wide">
            <ul class="workflow-guide-list">
              <li>
                先定义流程节点、边、条件和表单变量模型，别一开始就把拖拽交互当成核心。
              </li>
              <li>
                建模器、运行时和审批台要分层设计，不要让编辑态和执行态共用一套混乱状态。
              </li>
              <li>
                节点动作、条件判断、通知触发和回调处理要统一协议，避免每类节点各写一套逻辑。
              </li>
              <li>
                流程历史、审批意见、状态迁移和异常恢复必须可追溯，否则线上问题无法排查。
              </li>
              <li>
                如果流程已经涉及会签、抄送、超时、子流程和回滚，就要尽早联动后端流程引擎一起设计。
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
    title: '先定流程模型',
    summary:
      '工作流工程的第一步不是拖节点，而是明确节点类型、连线规则、变量作用域和执行语义。',
  },
  {
    order: '02',
    title: '编排器只是编辑态',
    summary:
      '流程设计器负责建模和校验，真正执行流程的是运行时，不应把二者混成一个状态系统。',
  },
  {
    order: '03',
    title: '表单与流程必须联动',
    summary:
      '节点条件、字段显隐、审批意见和流程变量都与表单有关，必须用统一数据协议串起来。',
  },
  {
    order: '04',
    title: '状态迁移要有审计',
    summary:
      '流程每一步从谁到谁、为什么变、何时超时、是否回退，都必须留痕，否则工作流没有治理能力。',
  },
  {
    order: '05',
    title: '复杂流程要评估后端引擎',
    summary:
      '前端能做建模与展示，但真正的执行一致性、补偿和并发控制往往需要后端流程引擎协作。',
  },
];

const guideStages = [
  {
    order: '01',
    title: '先把流程节点、连线条件和变量模型说清楚，编排器才不会越做越乱',
    tag: 'Workflow Model',
    description:
      '工作流系统最底层的不是画布，而是流程模型。开始节点、审批节点、抄送节点、条件分支、会签节点、结束节点分别怎么定义，变量在哪里产生、在哪里消费，条件表达式如何计算，这些都要先定。没有稳定模型，后面拖拽再顺也只是好看的壳。',
    bestFor: ['审批流', '请假报销', '病历审核', '业务流程配置平台'],
    focus: [
      '节点类型、边条件、变量作用域和默认行为要规范化',
      '流程模型必须支持序列化、版本化和运行时消费',
      '前端建模器和后端执行器要共享核心协议',
    ],
    risks: [
      '先做画布交互，后补流程语义',
      '不同节点类型字段各自定义，无法统一解析',
      '前端存一套、后端跑一套，最终语义漂移',
    ],
    language: 'ts',
    code: `type WorkflowNode = {
  id: string
  type: 'start' | 'approval' | 'condition' | 'cc' | 'end'
  name: string
  config: Record<string, unknown>
  next: string[]
}`,
  },
  {
    order: '02',
    title: '流程设计器要把“可视化编辑”与“模型校验”一起做，而不只是拖拽',
    tag: 'Designer',
    description:
      '前端工作流编排器的价值，不只是让用户拖节点，而是帮助用户在编辑时就发现错误。比如没有结束节点、条件分支未闭合、会签节点缺审批人、循环依赖、变量未定义，这些都应该在建模阶段被校验出来。否则流程一旦进入运行时，错误成本会更高。',
    bestFor: ['低代码流程配置', '审批设计器', '业务流可视化配置'],
    focus: [
      '画布交互、吸附连线和节点编辑只是基础，模型校验才是核心',
      '保存前做结构校验、语义校验和变量校验',
      '提供错误定位和修复提示，降低业务配置门槛',
    ],
    risks: [
      '设计器只管能拖，不能判断是否合法',
      '错误配置直到发起流程时才暴露',
      '节点属性和画布状态绑死，难以独立校验',
    ],
    language: 'ts',
    code: `type WorkflowValidationError = {
  nodeId: string
  code: 'missing-approver' | 'dangling-branch' | 'unknown-variable'
  message: string
}`,
  },
  {
    order: '03',
    title: '运行时的关键不只是节点前进，而是状态、动作和表单的一致协作',
    tag: 'Runtime',
    description:
      '真正上线后，工作流系统面临的是流程实例如何跑。当前节点是谁，哪些字段可编辑，审批动作有哪些，驳回后回到哪里，通知什么时候发，是否允许催办，这些都属于运行时逻辑。前端审批台和后端流程引擎之间必须围绕流程状态机协同设计，而不是各自猜测当前状态。',
    bestFor: ['审批中心', '任务处理台', '流程发起与待办系统'],
    focus: [
      '流程实例状态、节点状态和表单状态要明确分层',
      '审批动作、驳回、转交、加签等事件要协议化',
      '前端展示态与后端真实执行态保持一致',
    ],
    risks: [
      '只展示节点名字，不建模实例状态',
      '前端允许的操作与后端实际能力不一致',
      '表单字段权限随流程状态变化却没有统一控制',
    ],
    language: 'ts',
    code: `type WorkflowInstance = {
  instanceId: string
  status: 'running' | 'approved' | 'rejected' | 'cancelled'
  currentNodeId: string
  formData: Record<string, unknown>
}`,
  },
  {
    order: '04',
    title: '通知、回调、超时和异常恢复，是工作流系统从 Demo 走向生产的分水岭',
    tag: 'Operations',
    description:
      '很多流程系统前期只关注“能不能提单审批”，忽略了运行中的各种运营问题。比如节点超时怎么办，审批人离职怎么办，回调第三方失败怎么办，通知重复发了怎么办，流程卡死如何人工恢复。这些都不是边角问题，而是生产级工作流的核心治理能力。',
    bestFor: ['企业审批平台', '跨系统流程联动', '复杂业务流程场景'],
    focus: [
      '超时、催办、转交、失败补偿和人工恢复策略要明确',
      '通知与回调最好异步化，并有幂等和重试机制',
      '前端需要可见的运行日志和异常状态提示',
    ],
    risks: [
      '流程只考虑主链路，不考虑失败场景',
      '通知和回调直接绑在页面动作上',
      '流程卡死后没有人工介入和恢复手段',
    ],
    language: 'text',
    code: `工作流运行治理清单
- 节点超时提醒与自动流转策略
- 回调失败重试与幂等保护
- 流程挂起、恢复、终止与人工处理入口
- 审批操作日志、通知记录与异常告警`,
  },
  {
    order: '05',
    title: '复杂业务里，前端编排器通常只是入口，真正稳定执行还得靠后端引擎',
    tag: 'Architecture',
    description:
      '如果业务只是简单审批，前端维护一套轻量流程模型配合接口就能跑。但一旦涉及会签、并签、抄送、子流程、条件回退、跨系统回调和高并发实例，你就已经进入流程引擎问题域。这个阶段前端的重点是建模、可视化和审批台，后端的重点则是调度、持久化、一致性和补偿。',
    bestFor: ['复杂审批流', '跨部门流程系统', '企业流程平台'],
    focus: [
      '分清前端建模职责与后端执行职责',
      '复杂流程优先评估成熟流程引擎或统一编排服务',
      '前后端围绕流程协议、状态和版本一起治理',
    ],
    risks: [
      '把所有流程逻辑都压在前端状态里',
      '流程实例一多，前端无法保证一致性',
      '没有版本兼容策略，老流程发布后直接失效',
    ],
    language: 'text',
    code: `职责划分建议
- 前端：流程建模器、审批台、运行可视化、表单联动
- 后端：流程引擎、状态持久化、任务调度、补偿恢复
- 共同：流程协议、变量模型、版本与审计体系`,
  },
];

const comparisonCards = [
  {
    title: '前端只做建模器 vs 前后端共同做流程平台',
    summary:
      '轻场景下前端做建模器即可；一旦进入复杂运行时和补偿逻辑，就必须让后端流程引擎参与整体设计。',
  },
  {
    title: '拖拽画布体验 vs 流程模型严谨性',
    summary:
      '画布体验决定易用性，但流程模型严谨性决定系统能不能稳定跑。前者是入口，后者是底盘。',
  },
  {
    title: '简单审批流 vs 复杂编排流',
    summary:
      '简单审批流更关注节点前进和权限；复杂编排流还要处理会签、回退、超时、回调和子流程等系统级问题。',
  },
];
</script>

<style scoped>
.workflow-guide-page {
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

.workflow-guide-page__shell {
  min-height: calc(100vh - 90px);
  border: 1px solid rgba(19, 27, 34, 0.06);
  border-radius: 7px;
  background: rgba(255, 255, 255, 0.82);
}

.workflow-guide-page__top {
  display: flex;
  justify-content: flex-start;
  padding: 18px 18px 0;
}

.workflow-guide-page__back {
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

.workflow-guide-page__back:hover {
  transform: translateY(-1px);
  border-color: rgba(46, 70, 91, 0.18);
  box-shadow: 0 18px 34px rgba(19, 27, 34, 0.08);
}

.workflow-guide-page__content {
  padding: 18px 24px 24px;
}

.workflow-guide-hero {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 320px;
  gap: 20px;
  padding-bottom: 26px;
  border-bottom: 1px solid rgba(19, 27, 34, 0.08);
}

.workflow-guide-hero__eyebrow,
.workflow-guide-section__eyebrow,
.workflow-guide-card__eyebrow,
.workflow-guide-hero__label {
  font-size: 11px;
  line-height: 1.4;
  letter-spacing: 0.24em;
  text-transform: uppercase;
  color: #7b8793;
}

.workflow-guide-hero__title {
  margin-top: 10px;
  font-size: 46px;
  line-height: 1.06;
  font-weight: 600;
  letter-spacing: -0.05em;
  color: #17202a;
}

.workflow-guide-hero__summary {
  max-width: 860px;
  margin-top: 16px;
  font-size: 15px;
  line-height: 1.9;
  color: #58636f;
}

.workflow-guide-hero__panel,
.workflow-guide-card,
.workflow-guide-panel {
  border: 1px solid rgba(19, 27, 34, 0.08);
  border-radius: 7px;
  background: rgba(255, 255, 255, 0.84);
}

.workflow-guide-hero__panel {
  padding: 18px;
}

.workflow-guide-list {
  display: grid;
  gap: 8px;
  margin: 12px 0 0;
  padding-left: 18px;
  font-size: 14px;
  line-height: 1.8;
  color: #56616d;
}

.workflow-guide-grid,
.workflow-guide-columns,
.workflow-guide-stack {
  display: grid;
  gap: 16px;
}

.workflow-guide-grid {
  margin-top: 28px;
  grid-template-columns: repeat(3, minmax(0, 1fr));
}

.workflow-guide-card {
  padding: 18px;
}

.workflow-guide-card__title,
.workflow-guide-panel__title,
.workflow-guide-section__title {
  color: #17202a;
}

.workflow-guide-card__title {
  margin-top: 10px;
  font-size: 22px;
  line-height: 1.25;
  font-weight: 600;
}

.workflow-guide-card__text,
.workflow-guide-panel__text {
  margin-top: 12px;
  font-size: 14px;
  line-height: 1.9;
  color: #596571;
}

.workflow-guide-section {
  margin-top: 28px;
}

.workflow-guide-section__head {
  margin-bottom: 14px;
}

.workflow-guide-section__title {
  margin-top: 8px;
  font-size: 30px;
  line-height: 1.18;
  font-weight: 600;
  letter-spacing: -0.03em;
}

.workflow-guide-columns {
  grid-template-columns: repeat(3, minmax(0, 1fr));
}

.workflow-guide-stack {
  grid-template-columns: repeat(2, minmax(0, 1fr));
}

.workflow-guide-panel {
  padding: 18px;
}

.workflow-guide-panel.is-wide {
  grid-column: 1 / -1;
}

.workflow-guide-panel__eyebrow {
  font-size: 11px;
  line-height: 1.4;
  letter-spacing: 0.24em;
  text-transform: uppercase;
  color: #80909d;
}

.workflow-guide-panel__title {
  font-size: 20px;
  line-height: 1.3;
  font-weight: 600;
}

.workflow-guide-method__head {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 16px;
}

.workflow-guide-method__tag {
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

.workflow-guide-method__grid {
  display: grid;
  gap: 14px;
  margin-top: 16px;
  grid-template-columns: repeat(3, minmax(0, 1fr));
}

.workflow-guide-mini-panel {
  padding: 14px;
  border: 1px solid rgba(19, 27, 34, 0.08);
  border-radius: 7px;
  background: rgba(245, 248, 250, 0.9);
}

.workflow-guide-mini-panel__title {
  font-size: 14px;
  font-weight: 600;
  color: #17202a;
}

.workflow-guide-code-block {
  margin-top: 14px;
}

@media (max-width: 1080px) {
  .workflow-guide-hero,
  .workflow-guide-grid,
  .workflow-guide-columns,
  .workflow-guide-stack,
  .workflow-guide-method__grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 900px) {
  .workflow-guide-page {
    min-height: auto;
    padding: 18px;
  }

  .workflow-guide-page__shell {
    min-height: auto;
  }

  .workflow-guide-page__content {
    padding: 18px;
  }

  .workflow-guide-hero__title {
    font-size: 36px;
  }

  .workflow-guide-section__title {
    font-size: 26px;
  }
}
</style>
