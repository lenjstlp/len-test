<template>
  <FullstackCapabilityArticle
    eyebrow="Frontend Timeline Engineering"
    title="前端业务时间线工程"
    summary="业务时间线不是简单按时间倒序把日志列出来。真正有价值的时间线，要能把状态变更、操作人、系统动作、附件、审批意见和异常事件串成一条可读、可筛、可跳转的业务脉络，让用户一眼看懂这条记录经历了什么。"
    :outcomes="outcomes"
    :quick-stages="quickStages"
    decision-title="业务时间线先统一事件模型，再处理分组、筛选、展开和跳转能力"
    :guide-stages="guideStages"
    comparison-title="原始日志列表、结构化时间线、可筛选审计时间线三种路线的差异"
    :comparison-cards="comparisonCards"
    checklist-title="业务时间线上线前必须补齐的 6 个点"
    :checklist="checklist"
  />
</template>

<script setup lang="ts">
import FullstackCapabilityArticle from '@/components/FullstackCapabilityArticle.vue';

const outcomes = [
  '能把业务操作、系统事件、审批流转和附件变化统一抽象成时间线事件模型。',
  '能设计可筛选、可折叠、可跳转的时间线 UI，而不是单纯输出日志字符串。',
  '能为病例轨迹、工单处理、订单流转、审计追踪等场景沉淀稳定的时间线能力。',
];

const quickStages = [
  {
    order: '01',
    title: '事件先统一模型',
    summary: '操作人、事件类型、业务阶段、附加数据要标准化。',
  },
  {
    order: '02',
    title: '展示不等于原始日志',
    summary: '原始日志适合存储，前端时间线需要可读的展示层模型。',
  },
  {
    order: '03',
    title: '筛选能力前置',
    summary: '只看审批、只看异常、只看附件变更是高频需求。',
  },
  {
    order: '04',
    title: '时间分组要清楚',
    summary: '同一天聚合、按阶段折叠能大幅提升可读性。',
  },
  {
    order: '05',
    title: '要能跳回上下文',
    summary: '时间线项通常要能联动详情、附件或操作快照。',
  },
];

const guideStages = [
  {
    order: '01',
    title: '先统一事件协议，把杂乱日志翻译成可展示的时间线事件',
    tag: '事件建模',
    description:
      '原始日志往往来自多个系统：人工操作、任务调度、审批流、消息回执、附件变更。前端时间线不能直接消费这些异构日志，而是要先把它们翻译成统一事件协议，包括时间、事件类型、标题、摘要、操作者、附加详情和跳转目标。',
    bestFor: ['工单系统', '订单轨迹', '病历日志', '审计追踪页'],
    focus: [
      '不同来源日志统一映射成同一事件模型',
      '展示标题和原始日志内容解耦',
      '事件项支持附加字段和跳转目标',
    ],
    risks: [
      '后端日志直接裸渲染，可读性极差',
      '同一事件来源格式不一致',
      '页面为了适配日志写大量 if/else',
    ],
    language: 'ts',
    code: `type TimelineEvent = {
  id: string
  eventType: 'action' | 'approval' | 'system' | 'attachment'
  occurredAt: string
  title: string
  summary: string
  actor?: string
}`,
  },
  {
    order: '02',
    title: '时间线不是越全越好，而是要能被筛选、分组和折叠',
    tag: '信息组织',
    description:
      '业务时间线最大的问题不是没有信息，而是信息太多。成熟做法通常会支持按事件类型筛选、按日期或阶段分组、默认折叠次要事件，并把关键节点高亮。这样用户才能快速定位真正重要的业务变化，而不是被噪音淹没。',
    bestFor: ['长周期单据', '高频操作记录', '多角色协作流程', '复杂审批链'],
    focus: [
      '关键事件与普通事件视觉分层',
      '按日期或阶段分组展示',
      '支持类型筛选和默认折叠',
    ],
    risks: [
      '所有日志等权展示导致信息噪音过高',
      '用户无法快速定位异常节点',
      '长列表一次性展开性能和阅读体验都差',
    ],
    language: 'ts',
    code: `const groupedEvents = computed(() =>
  groupBy(filteredEvents.value, (event) => event.occurredAt.slice(0, 10)),
)`,
  },
  {
    order: '03',
    title: '时间线项要能跳回业务上下文，别把它做成死列表',
    tag: '上下文联动',
    description:
      '用户点开“附件被替换”后，最好能直接打开对应附件详情；点到“审批驳回”时，最好能联动审批意见和当时表单快照。真正好用的时间线，不只是回顾记录，而是一个进入上下文的导航入口。',
    bestFor: ['详情页', '审计页', '异常排查页', '历史追踪页'],
    focus: [
      '事件项支持目标路由或弹窗联动',
      '关键事件保留快照或扩展详情',
      '异常事件可直接进入处置页面',
    ],
    risks: [
      '时间线只能看不能用',
      '事件项与真实业务上下文脱节',
      '排查问题时还得手动二次搜索',
    ],
    language: 'ts',
    code: `const openTimelineEvent = (event: TimelineEvent) => {
  if (event.eventType === 'attachment') {
    openAttachmentDrawer(event.id)
  }
}`,
  },
];

const comparisonCards = [
  {
    title: '原始日志列表',
    summary: '实现最轻，但用户很难从中迅速读出业务脉络。',
  },
  {
    title: '结构化时间线',
    summary: '更适合详情页阅读，是大多数业务系统的最佳平衡点。',
  },
  {
    title: '可筛选审计时间线',
    summary: '适合复杂流程和异常排查，信息密度高，但设计和建模要求更高。',
  },
];

const checklist = [
  '先定义统一事件协议，再做展示层渲染。',
  '关键事件、普通事件、异常事件要有视觉层级差异。',
  '按类型筛选、按日期分组、按阶段折叠要提前设计。',
  '时间线项要能联动附件、审批意见、操作快照等上下文。',
  '长列表场景要考虑虚拟滚动或按需展开。',
  '后端日志文案不要直接裸渲染到前端时间线。',
];
</script>
