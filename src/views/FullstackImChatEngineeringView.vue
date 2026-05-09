<template>
  <FullstackCapabilityArticle
    eyebrow="Frontend IM Chat Engineering"
    title="前端 IM 聊天工程"
    summary="聊天系统不是一个消息列表加输入框，而是实时连接、会话列表、已读未读、断线重连、消息顺序、重发补偿、草稿保留和多端同步共同组成的复杂工程。前端在这里最难的从来不是 UI，而是状态一致性和弱网体验。"
    :outcomes="outcomes"
    :quick-stages="quickStages"
    decision-title="聊天工程先定消息模型，再定实时同步策略"
    :guide-stages="guideStages"
    comparison-title="轮询聊天、WebSocket 聊天、混合同步方案的前端差异"
    :comparison-cards="comparisonCards"
    checklist-title="聊天模块上线前必须自查的 6 件事"
    :checklist="checklist"
  />
</template>

<script setup lang="ts">
import FullstackCapabilityArticle from '@/components/FullstackCapabilityArticle.vue';

const outcomes = [
  '能设计消息发送、回执、撤回、重发、已读状态和会话列表的基础数据模型。',
  '能处理 WebSocket 断线重连、消息去重、乱序修复和弱网补偿。',
  '能把聊天系统做成真实可用的工程，而不是只会 append 一条文本消息。',
];

const quickStages = [
  {
    order: '01',
    title: '先定消息 ID 和状态机',
    summary: '没有稳定消息标识，去重、回执、重发都会崩。',
  },
  {
    order: '02',
    title: '连接策略和消息同步分开设计',
    summary: '实时通道负责通知，新旧消息补齐要走历史同步。',
  },
  {
    order: '03',
    title: '发送态要可见',
    summary: '发送中、成功、失败、重发必须在 UI 中有明确反馈。',
  },
  {
    order: '04',
    title: '会话列表和消息流要解耦',
    summary: '未读数、置顶、草稿不是消息列表的附属字段。',
  },
  {
    order: '05',
    title: '多端同步要处理读状态和草稿差异',
    summary: '一端已读、一端未读、一端草稿，这些都要能解释得通。',
  },
];

const guideStages = [
  {
    order: '01',
    title: '消息模型先定义客户端 ID、服务端 ID 和投递状态',
    tag: '消息建模',
    description:
      '聊天消息如果没有稳定模型，后面所有状态都会乱。前端发送时通常先生成 `clientMessageId`，拿它做本地 optimistic 更新；服务端确认后再返回真正的 `serverMessageId`。同时还要维护 sending、sent、failed、revoked 等状态，不然后续重发和撤回就没有抓手。',
    bestFor: ['私聊', '群聊', '客服会话系统'],
    focus: [
      '本地乐观消息先入列表',
      '服务端确认后做 ID 对齐和状态更新',
      '失败态支持原地重发',
    ],
    risks: [
      '消息没有客户端唯一 ID，确认后无法匹配',
      '重发直接再插一条，导致重复消息',
      '撤回状态只改当前页面，不同步会话列表',
    ],
    language: 'typescript',
    code: `type ChatMessage = {
  clientMessageId: string
  serverMessageId?: string
  status: 'sending' | 'sent' | 'failed' | 'revoked'
  content: string
  createdAt: number
}`,
  },
  {
    order: '02',
    title: '实时连接负责通知，历史同步负责补齐',
    tag: '同步策略',
    description:
      '很多聊天前端把 WebSocket 想成万能通道，结果一断线就丢消息。更稳的工程做法是：WebSocket 负责实时推送新事件，但历史缺口补齐、重连后对账、滚动加载旧消息仍然走 HTTP 或专门同步接口。这样即使瞬时掉线，也能靠 seq 或 lastMessageId 把消息补回来。',
    bestFor: ['IM 聊天', '通知会话', '协作评论流'],
    focus: [
      '连接恢复后按 seq 拉缺失消息',
      '事件推送和历史分页走不同接口',
      '列表去重要依赖消息 ID 或 seq',
    ],
    risks: [
      '把历史和实时都压到同一条连接上',
      '掉线后只重连，不补历史缺口',
      '乱序消息直接 append，导致时间线错乱',
    ],
    language: 'typescript',
    code: `async function syncMissedMessages(conversationId: string, lastSeq: number) {
  const response = await fetch('/api/chat/sync', {
    method: 'POST',
    body: JSON.stringify({ conversationId, lastSeq }),
  })

  return response.json()
}`,
  },
  {
    order: '03',
    title: '聊天体验的关键是失败补偿和已读同步',
    tag: '体验治理',
    description:
      '聊天工程里，用户最敏感的不是偶发延迟，而是“我到底发出去没有”“对方到底看没看到”。前端必须明确展示发送中、失败、重发、已读人数和已读时间。对弱网环境，还要把草稿、本地图片占位和失败消息保留起来，避免用户内容瞬间消失。',
    bestFor: ['移动端 Web 聊天', '企业 IM', '客服坐席系统'],
    focus: [
      '发送失败允许原地点击重试',
      '已读状态与消息 ID 精确绑定',
      '输入框草稿随会话切换保留',
    ],
    risks: [
      '发送失败后消息直接消失',
      '已读状态只显示在会话列表，不显示在消息详情',
      '切换会话导致输入草稿丢失',
    ],
    language: 'typescript',
    code: `function retryMessage(message: ChatMessage) {
  updateMessage(message.clientMessageId, { status: 'sending' })
  sendMessage(message)
}`,
  },
];

const comparisonCards = [
  {
    title: '纯轮询聊天',
    summary:
      '实现最简单，但实时性和请求成本都较差，只适合低频留言或轻通知系统。',
  },
  {
    title: 'WebSocket 聊天',
    summary:
      '实时体验最好，但必须配合历史补齐、断线重连和消息去重，工程复杂度明显更高。',
  },
  {
    title: '混合同步方案',
    summary:
      '实时事件走长连接，历史和补齐走 HTTP，这是大多数成熟聊天系统更稳的做法。',
  },
];

const checklist = [
  '消息模型必须同时包含客户端 ID、服务端 ID 和发送状态。',
  'WebSocket 掉线重连后要补拉缺失消息，不能只重连不断点。',
  '发送失败要可见、可重试，不能静默丢消息。',
  '会话列表的未读、草稿、最后一条消息应与消息流解耦管理。',
  '已读状态需要明确到消息级，不只是会话角标。',
  '弱网和多标签页下要测试消息去重、乱序和重复确认问题。',
];
</script>
