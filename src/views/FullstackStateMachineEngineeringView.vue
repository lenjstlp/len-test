<template>
  <FullstackCapabilityArticle
    eyebrow="Frontend State Machine Engineering"
    title="前端状态机建模工程"
    summary="很多线上交互之所以越做越乱，不是页面多，而是状态没有被建模。支付、导出、审批、上传、会话保活、IM、地图绘制这些复杂模块，一旦只靠几个布尔值和 if-else 硬顶，后面就一定会在回退、重试、补偿和边界态里失控。真正稳的做法，是先把状态和事件讲清楚，再让页面去消费状态机。"
    :outcomes="outcomes"
    :quick-stages="quickStages"
    decision-title="状态机工程先定状态、事件、守卫和副作用，再决定 UI 怎么渲染"
    :guide-stages="guideStages"
    comparison-title="布尔变量堆叠、Reducer 建模、显式状态机三种实现方式的边界"
    :comparison-cards="comparisonCards"
    checklist-title="把复杂前端模块改造成状态机前必须检查的 6 个点"
    :checklist="checklist"
  />
</template>

<script setup lang="ts">
import FullstackCapabilityArticle from '@/components/FullstackCapabilityArticle.vue';

const outcomes = [
  '能把支付、导出、审批、上传、实时连接等复杂模块先建成稳定的状态图，再接 UI。',
  '能区分状态、事件、守卫条件和副作用，不再把所有逻辑都塞进点击回调。',
  '能减少边界态遗漏、状态互斥错误和“按钮能点但业务不该发生”的线上事故。',
];

const quickStages = [
  {
    order: '01',
    title: '先列出真实状态',
    summary: '别只写 loading 和 success，排队、失败、取消、过期都要有名字。',
  },
  {
    order: '02',
    title: '再列出能触发变化的事件',
    summary: '点击、超时、回调成功、重试、人工取消都应该进入同一套事件流。',
  },
  {
    order: '03',
    title: '守卫条件和副作用分开',
    summary: '能不能转移是一回事，转移后要不要调接口是另一回事。',
  },
  {
    order: '04',
    title: '页面只消费状态',
    summary: '按钮显隐、文案和禁用条件从状态机读，不在模板里临时乱算。',
  },
  {
    order: '05',
    title: '异常路径必须可回放',
    summary: '重试、回退、人工恢复和补偿都要能走得通。',
  },
];

const guideStages = [
  {
    order: '01',
    title: '先把“系统会处在哪些状态”说清楚，别一上来写页面',
    tag: '状态识别',
    description:
      '复杂模块最怕的不是状态多，而是状态没名字。比如导出中心最少也有 idle、queued、processing、success、failed、expired；支付页最少也有 pending、paid、closed、refunding。没有这层命名，后续所有 UI 和接口逻辑都会变成散乱条件判断。',
    bestFor: ['支付流程', '导出中心', '审批台', '上传任务'],
    focus: [
      '先列出完整状态集合，而不是只写 happy path',
      '把互斥状态明确命名，避免多个布尔值并存',
      '状态数量宁可清晰偏多，也不要语义模糊',
    ],
    risks: [
      '用 isLoading、isSuccess、hasError 叠出互相冲突的组合',
      '排队中、取消中、过期态没有单独语义',
      '页面和接口各自维护一套状态名',
    ],
    language: 'ts',
    code: `type ExportStatus =
  | 'idle'
  | 'queued'
  | 'processing'
  | 'success'
  | 'failed'
  | 'expired'`,
  },
  {
    order: '02',
    title: '状态机的核心不是页面，而是“事件驱动转移表”',
    tag: '事件驱动',
    description:
      '一旦状态确定，下一步就该定义事件：用户点击开始、接口返回成功、任务超时、人工取消、服务端回调失败、重试按钮点击。真正稳的做法，是明确“在当前状态下收到某事件后，是否允许转移到下一个状态”。这会比散落在多个函数里的 if-else 更可维护。',
    bestFor: ['任务流转', '长轮询任务', '实时连接', '表单审批流程'],
    focus: [
      '让所有状态变化都由显式事件触发',
      '为非法事件提供兜底，而不是悄悄吞掉',
      '把转移规则集中在一处维护',
    ],
    risks: [
      '页面点击直接改状态，服务端回调也直接改状态',
      '某个状态下哪些事件合法没有统一规则',
      '多人维护后同一事件出现多处冲突逻辑',
    ],
    language: 'ts',
    code: `const transitionMap = {
  queued: {
    START: 'processing',
    CANCEL: 'failed',
  },
  processing: {
    RESOLVE: 'success',
    REJECT: 'failed',
    EXPIRE: 'expired',
  },
} as const`,
  },
  {
    order: '03',
    title: '守卫条件和副作用必须拆开，不然状态机会越写越脏',
    tag: '守卫与副作用',
    description:
      '“当前用户是否有权限进入下一状态”“当前表单是否已校验通过”属于守卫；“进入 processing 后要发请求”“进入 success 后要上报埋点”属于副作用。两者如果混在一起，状态机看起来像能跑，实际上很难测试，也很难排查转移错误。',
    bestFor: ['权限动作', '表单提交流', '审批节点流转', '上传和导出任务'],
    focus: [
      '先判断事件是否合法，再决定是否触发副作用',
      '副作用尽量挂在状态切换后统一执行',
      '状态机函数优先保持纯净、可测试',
    ],
    risks: [
      '在 reducer 里直接调接口',
      '守卫失败和接口失败混成一个错误分支',
      '测试时必须 mock 一堆副作用才跑得动',
    ],
    language: 'ts',
    code: `const canSubmit = (ctx: {
  hasPermission: boolean
  isValid: boolean
}) => ctx.hasPermission && ctx.isValid`,
  },
  {
    order: '04',
    title: 'UI 层只负责读状态机，不负责发明业务规则',
    tag: 'UI 解耦',
    description:
      '真正成熟的页面不会在模板里写一大串“如果 A 且非 B 且 C 不为空就展示按钮”。按钮能不能点、什么文案、要不要显示重试入口，都应该从状态机推导。这样页面只是投影层，业务规则收敛在状态模型里。',
    bestFor: ['复杂操作栏', '状态驱动表格', '审批页面', '消息中心'],
    focus: [
      '让按钮显隐和禁用条件从当前状态直接推导',
      '页面文案和颜色体系也跟状态绑定',
      '把业务规则收敛到状态机而不是模板表达式',
    ],
    risks: [
      '模板里堆满三元表达式和复合条件',
      '同一状态在不同页面展示规则不一致',
      '产品改一个状态规则要改多个页面',
    ],
    language: 'ts',
    code: `const actionConfig = {
  processing: { canRetry: false, canCancel: true, label: '处理中' },
  failed: { canRetry: true, canCancel: false, label: '失败，支持重试' },
} as const`,
  },
  {
    order: '05',
    title: '真正生产级的状态机，要把异常恢复和人工补偿也纳进来',
    tag: '恢复能力',
    description:
      '很多 Demo 只处理开始和成功，一到失败、超时、回调重复、用户离开再回来、服务端回放旧状态就全乱了。真正能上线的状态机，必须提前设计重试、回滚、补偿、人工恢复和幂等事件处理，否则系统看起来是状态机，实质还是脆的。',
    bestFor: ['支付补单', '导出重试', '工作流恢复', '消息任务补偿'],
    focus: [
      '把失败、超时、重复回调、人工恢复都建进状态图',
      '关键事件要有幂等保护和日志链路',
      '恢复动作不能只在页面里临时写 patch',
    ],
    risks: [
      '线上异常靠手工改数据库，没有恢复入口',
      '重复回调导致状态来回跳动',
      '失败后没有补偿动作，只能让用户重头再来',
    ],
    language: 'ts',
    code: `const reducer = (state: ExportStatus, event: 'RETRY' | 'TIMEOUT') => {
  if (state === 'failed' && event === 'RETRY') {
    return 'queued'
  }

  if (state === 'processing' && event === 'TIMEOUT') {
    return 'failed'
  }

  return state
}`,
  },
];

const comparisonCards = [
  {
    title: '布尔变量堆叠',
    summary:
      '开发初期快，但很容易出现互斥状态并存，适合极简单交互，不适合生产级复杂模块。',
  },
  {
    title: 'Reducer 建模',
    summary:
      '适合中等复杂度页面，能把事件和状态集中起来，但仍要靠团队自觉维持语义边界。',
  },
  {
    title: '显式状态机',
    summary:
      '最适合复杂业务流、多人协作和高风险模块，前期建模成本更高，但长期稳定性最好。',
  },
];

const checklist = [
  '状态集合里必须包含失败、取消、超时、过期等非 happy path。',
  '所有状态变化都应有显式事件来源，别让页面直接随手改状态。',
  '守卫条件和副作用要拆开，避免状态机函数被异步逻辑污染。',
  '按钮显隐、禁用和文案要从状态推导，不要散落在模板 if-else 中。',
  '异常恢复、重复回调、重试补偿和人工恢复都要提前建模。',
  '关键状态转移要有日志和埋点，不然线上排障只能靠猜。',
];
</script>
