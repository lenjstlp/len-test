<template>
  <FullstackCapabilityArticle
    eyebrow="Frontend Session Kickout"
    title="前端会话互踢工程"
    summary="会话互踢不是一句“账号在别处登录”提示，而是一套并发会话治理能力。它涉及单端独占、多端上限、强制下线提示、长连接断开、未保存内容保护和多标签页同步。做得差，用户就会在编辑一半时被静默踢掉；做得成熟，互踢会是可理解、可恢复、可审计的系统行为。"
    :outcomes="outcomes"
    :quick-stages="quickStages"
    decision-title="会话互踢先定并发策略，再做体验回收"
    :guide-stages="guideStages"
    comparison-title="独占登录、限制并发、风险互踢三类策略的前端差异"
    :comparison-cards="comparisonCards"
    checklist-title="会话互踢能力上线前要自查的 6 件事"
    :checklist="checklist"
  />
</template>

<script setup lang="ts">
import FullstackCapabilityArticle from '@/components/FullstackCapabilityArticle.vue';

const outcomes = [
  '能分清“账号互踢”“会话过期”“权限失效”这三类退出原因。',
  '能设计 WebSocket、轮询和请求失败三种来源下的一致下线处理。',
  '能在强制下线时保护未保存内容、同步多标签页并给出可理解提示。',
];

const quickStages = [
  {
    order: '01',
    title: '先定并发会话策略',
    summary: '是一号一端，还是允许多端共存，必须先讲清楚。',
  },
  {
    order: '02',
    title: '踢下线原因要结构化',
    summary: '不同原因的前端提示、回退和申诉链路都不同。',
  },
  {
    order: '03',
    title: '强制退出要统一收口',
    summary: 'HTTP 401、WebSocket 事件、轮询结果都应进入同一退出链路。',
  },
  {
    order: '04',
    title: '编辑态要先保护再跳走',
    summary: '对文档、表单、聊天输入框，静默跳转是最差体验。',
  },
  {
    order: '05',
    title: '多标签页同步必须到位',
    summary: '只退出当前页，别的标签还活着，会直接造成状态混乱。',
  },
];

const guideStages = [
  {
    order: '01',
    title: '先定义互踢策略和退出原因码',
    tag: '协议设计',
    description:
      '前端最需要的不是一句“你被踢下线了”，而是明确原因码。是同账号新设备登录、管理员强制下线、密码修改失效、风险策略拦截，还是租户会话重置？只有原因可区分，前端才能决定是直接跳登录页、保留草稿提示，还是给用户展示管理员处理入口。',
    bestFor: ['企业后台', '多人协作平台', '医疗和财务系统'],
    focus: [
      '定义 session_replaced / admin_kicked / credential_changed 等原因',
      '退出事件里附带时间、设备和来源信息',
      '前端用统一 reason code 渲染提示文案',
    ],
    risks: [
      '所有互踢都只返回一个 401',
      '不同场景文案完全一样，用户无法判断原因',
      '没有来源设备信息，用户不敢确认风险',
    ],
    language: 'json',
    code: `{
  "type": "session_kicked",
  "reason": "session_replaced",
  "operator": "ios-device-14",
  "occurredAt": 1788888888888
}`,
  },
  {
    order: '02',
    title: '退出处理必须统一收口到一个会话回收器',
    tag: '状态收敛',
    description:
      '不管是请求返回 401、长连接收到踢下线消息，还是轮询发现会话失效，最终都应该落到一个统一的 `handleSessionTermination`。这样才能保证本地 token、缓存、WebSocket、轮询定时器和多标签页广播全部一次性收干净。',
    bestFor: ['大型 SPA', '多标签页系统', '含长连接产品'],
    focus: [
      '统一关闭长连接和轮询任务',
      '清理 token、用户信息和本地缓存',
      '通过 BroadcastChannel 同步其它标签页退出',
    ],
    risks: [
      '每个请求各自处理 401，逻辑分散',
      'WebSocket 退出和 HTTP 退出走两套流程',
      '清理顺序混乱，导致跳页后还在发请求',
    ],
    language: 'typescript',
    code: `function handleSessionTermination(reason: string) {
  stopPollingTasks()
  disconnectRealtimeChannels()
  clearLocalSession()
  notifyOtherTabs(reason)
  openKickoutDialog(reason)
}`,
  },
  {
    order: '03',
    title: '强制下线时要先保护用户未保存内容',
    tag: '体验补偿',
    description:
      '会话互踢最伤人的地方不是被退出，而是正在编辑的内容瞬间丢失。前端需要在退出前识别是否存在脏数据、未提交草稿或上传中的任务。对于高价值输入场景，至少要给出草稿保留或只读回看能力，再引导用户重新登录。',
    bestFor: ['富文本编辑器', '长表单录入', '工单和病历录入系统'],
    focus: [
      '识别脏数据并在本地做临时保留',
      '优先弹出强制下线解释框，而不是直接路由跳转',
      '重新登录后支持恢复最近一次未提交内容',
    ],
    risks: [
      '先跳登录页，后考虑草稿',
      '提示框遮罩后用户看不到自己写了什么',
      '上传中断却没有中间态说明',
    ],
    language: 'typescript',
    code: `if (hasUnsavedDraft()) {
  saveDraftSnapshot()
}

showKickoutModal({
  reason,
  canRestoreDraft: hasUnsavedDraft(),
})`,
  },
];

const comparisonCards = [
  {
    title: '独占登录',
    summary: '安全边界最清楚，但用户感知也最强，前端必须把被替换原因讲清楚。',
  },
  {
    title: '限制并发',
    summary:
      '允许多端共存，但超限时会淘汰旧会话。前端重点在设备展示和会话列表管理。',
  },
  {
    title: '风险互踢',
    summary:
      '由风控或管理员触发，前端除了退出，还要提供风险说明、申诉或确认入口。',
  },
];

const checklist = [
  '定义结构化退出原因码，而不是全部吞成一个 401。',
  'HTTP、轮询、WebSocket 的退出链路必须统一收口。',
  '退出前优先保护草稿、未提交表单和长任务状态。',
  '多标签页要同步退出，避免部分页面残留旧状态。',
  '互踢提示里最好展示来源设备或操作时间，增强可理解性。',
  '重新登录后要有能力恢复关键草稿或至少解释无法恢复的原因。',
];
</script>
