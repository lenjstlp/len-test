<template>
  <FullstackCapabilityArticle
    eyebrow="Frontend Webhook Callback Engineering"
    title="前端开放平台回调工程"
    summary="很多团队做开放平台、支付、审批、短信、对象存储直传和三方系统集成时，最容易忽略的不是“能不能调通”，而是回调链路是否真的生产可用。回调工程真正要解决的是验签、幂等、状态补偿、重试去重、人工排查和可观测性，而不是页面里拿到成功通知就弹个 toast。"
    :outcomes="outcomes"
    :quick-stages="quickStages"
    decision-title="回调工程先定协议、验签、幂等和补偿，再考虑前端如何展示任务状态"
    :guide-stages="guideStages"
    comparison-title="浏览器直收回调、服务端中转、任务中心驱动三种接法的现实边界"
    :comparison-cards="comparisonCards"
    checklist-title="上线开放平台回调链路前必须检查的 6 个点"
    :checklist="checklist"
  />
</template>

<script setup lang="ts">
import FullstackCapabilityArticle from '@/components/FullstackCapabilityArticle.vue';

const outcomes = [
  '能把支付、审批、对象存储、开放平台等回调链路设计成可验签、可补偿、可排障的工程模块。',
  '能区分页面轮询、服务端回调、消息通知三种状态来源，不再让前端直接猜任务结果。',
  '能把幂等、重试、回调去重和人工恢复纳入同一套任务状态闭环。',
];

const quickStages = [
  {
    order: '01',
    title: '先统一回调协议',
    summary: '事件名、任务号、签名字段、时间戳和 requestId 先说清楚。',
  },
  {
    order: '02',
    title: '验签与幂等放在服务端',
    summary: '浏览器不是回调落点，真正关键逻辑必须在服务端完成。',
  },
  {
    order: '03',
    title: '前端只消费最终任务状态',
    summary: '别把回调成功与否直接绑在某个页面实例上。',
  },
  {
    order: '04',
    title: '失败补偿要可见',
    summary: '重试、排查、人工恢复都要有明确入口和任务中心。',
  },
  {
    order: '05',
    title: '整条链路必须可追踪',
    summary: '没有 requestId、eventId 和状态时间线，出了问题只能靠猜。',
  },
];

const guideStages = [
  {
    order: '01',
    title: '回调工程的第一步不是写接口，而是先把协议讲清楚',
    tag: '协议优先',
    description:
      '事件类型叫什么、业务主键是什么、幂等键用什么、签名如何拼接、时间戳精度是多少、失败重试策略是什么，这些如果一开始没有统一协议，后面前后端和第三方平台会一直靠口头约定，排查成本极高。',
    bestFor: ['支付回调', '对象存储转码回调', '审批系统回调', '开放平台接入'],
    focus: [
      '先定义 eventType、taskId、requestId、timestamp、signature',
      '回调字段尽量结构化，别只返一个 success 布尔值',
      '协议文档要包含重试与重复投递策略',
    ],
    risks: [
      '第三方字段语义模糊，前端和后端各自猜测',
      '没有 requestId，线上问题无法串联日志',
      '成功失败只返文本消息，页面无从建模状态',
    ],
    language: 'json',
    code: `{
  "eventType": "payment.succeeded",
  "taskId": "pay_20260527_001",
  "requestId": "cb_f8h29d1",
  "timestamp": 1748332800000,
  "signature": "sha256=...",
  "payload": {
    "orderId": "order_1001",
    "status": "paid"
  }
}`,
  },
  {
    order: '02',
    title: '浏览器不是回调终点，验签、幂等和去重必须落在服务端',
    tag: '服务端兜底',
    description:
      '开放平台回调天生属于服务端职责。浏览器既拿不到安全密钥，也无法稳定承接重试和幂等。更稳的做法是：服务端先验签、验时间窗、查幂等、落任务状态，再把最终任务结果提供给前端查询或推送展示。',
    bestFor: ['支付回调', 'Webhook', '设备上报', '第三方任务通知'],
    focus: [
      '服务端统一做验签、时间窗校验和重放保护',
      '同一 eventId 或 requestId 只能处理一次',
      '前端只订阅任务状态，不直接处理外部回调原文',
    ],
    risks: [
      '把签名密钥暴露到浏览器',
      '页面实例关闭后回调结果直接丢失',
      '重复回调导致状态反复跳动',
    ],
    language: 'ts',
    code: `const handleWebhook = async (payload: WebhookPayload) => {
  verifySignature(payload)

  if (await isProcessed(payload.requestId)) {
    return { accepted: true }
  }

  await saveTaskEvent(payload)
  await applyBusinessState(payload)

  return { accepted: true }
}`,
  },
  {
    order: '03',
    title: '前端页面不该“等回调”，而该围绕任务中心消费最终状态',
    tag: '状态解耦',
    description:
      '用户发起支付、导出、审批或转码后，页面最稳的模式不是一直把当前弹窗当作唯一宿主，而是生成任务 id，后续通过轮询、SSE、WebSocket 或消息中心去消费任务状态。这样即使用户刷新、切页或稍后回来，也能继续看到完整结果。',
    bestFor: ['导出任务', '支付任务', '审批异步动作', '大文件处理'],
    focus: [
      '创建任务后立即拿到 taskId',
      '页面围绕 taskId 查询任务状态或订阅推送',
      '任务中心视图要支持离开页面后继续查看结果',
    ],
    risks: [
      '把任务结果只绑定在当前弹窗里',
      '用户刷新后页面不知道回调已经完成',
      '状态靠 toast 一闪而过，没有可追溯记录',
    ],
    language: 'ts',
    code: `const submitJob = async () => {
  const { taskId } = await createExportJob(form.value)
  currentTaskId.value = taskId
  startPollingTask(taskId)
}`,
  },
  {
    order: '04',
    title: '真正麻烦的不是成功回调，而是重复、延迟、失败和补偿',
    tag: '补偿闭环',
    description:
      '生产环境里一定会遇到重复回调、先失败后成功、成功通知延迟到达、第三方超时重推、页面提前关闭等场景。工程上必须明确哪些事件可重放、哪些状态只能单向前进、哪些失败允许人工重试，否则状态很快就会脏掉。',
    bestFor: ['支付补单', '工作流通知', '跨系统同步', '三方异步任务'],
    focus: [
      '状态前进规则要明确，避免旧回调覆盖新状态',
      '失败任务要有手动重试与人工恢复入口',
      '所有回调事件都要落审计日志与时间线',
    ],
    risks: [
      '旧回调晚到把成功状态改回失败',
      '任务失败后没有补偿入口，只能找开发改数据',
      '重复通知导致用户收到多次成功提示',
    ],
    language: 'ts',
    code: `const canTransition = (
  current: 'pending' | 'processing' | 'success' | 'failed',
  next: 'processing' | 'success' | 'failed',
) => {
  if (current === 'success') {
    return false
  }

  return !(current === 'failed' && next === 'processing')
}`,
  },
  {
    order: '05',
    title: '回调工程要有完整观测链路，不然线上问题只会变成玄学',
    tag: '可观测性',
    description:
      '一条回调链路至少要能看到：请求何时到达、验签是否通过、幂等是否命中、状态转移是否成功、前端何时感知到结果。没有这些日志和指标，任何“用户说没成功、第三方说成功了”的问题都很难在分钟级定位。',
    bestFor: ['开放平台控制台', '异步任务中心', '支付和审批追踪', 'SRE 联调'],
    focus: [
      '统一 requestId、taskId、eventType 串联前后端日志',
      '记录验签失败率、重复回调率、状态补偿次数',
      '前端任务详情页要展示状态时间线和最新错误信息',
    ],
    risks: [
      '只在服务端打文本日志，没有结构化字段',
      '前端只知道“失败”，不知道哪一步失败',
      '无法区分第三方未推送还是本方未消费成功',
    ],
    language: 'ts',
    code: `const taskTimeline = [
  { status: 'pending', at: '2026-05-27 10:00:01' },
  { status: 'processing', at: '2026-05-27 10:00:05' },
  { status: 'success', at: '2026-05-27 10:00:12' },
]`,
  },
];

const comparisonCards = [
  {
    title: '浏览器直收回调',
    summary:
      '只适合极轻量试玩或本地联调，不适合生产。安全、稳定性和幂等都没有保障。',
  },
  {
    title: '服务端中转',
    summary:
      '最常见也最稳的模式。服务端承接回调、验签和状态落库，前端只消费任务状态。',
  },
  {
    title: '任务中心驱动',
    summary:
      '适合支付、导出、审批、转码等异步链路更长的系统，能把回调消费、补偿恢复和用户可见状态统一起来。',
  },
];

const checklist = [
  '回调协议里必须有 taskId、requestId、timestamp 和 signature 等关键字段。',
  '验签、时间窗校验、幂等和重复回调去重必须放在服务端或网关。',
  '前端页面要围绕任务状态查询或订阅，不要直接等某个页面实例接回调。',
  '状态机要防旧回调覆盖新状态，关键状态必须单向前进或显式受控回退。',
  '失败补偿、人工恢复和重试入口要在任务中心或控制台中可见。',
  '前后端必须共享 requestId / taskId 日志链路，不然线上排障速度会很差。',
];
</script>
