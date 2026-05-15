<template>
  <FullstackCapabilityArticle
    eyebrow="Frontend Operation Replay Engineering"
    title="前端操作日志回放工程"
    summary="操作日志回放工程不是把日志列表按时间排序就结束了。真正可用的回放能力，要能复原当时的页面状态、用户操作序列、关键参数变化和失败节点，让排障、培训和审计都有可视上下文，而不是只看文字流水账。"
    :outcomes="outcomes"
    :quick-stages="quickStages"
    decision-title="操作回放先定义事件模型，再治理时间轴、状态快照和回放控制"
    :guide-stages="guideStages"
    comparison-title="纯日志列表、带时间轴操作流、可视状态回放三种路线的差异"
    :comparison-cards="comparisonCards"
    checklist-title="操作日志回放上线前必须补齐的 6 个点"
    :checklist="checklist"
  />
</template>

<script setup lang="ts">
import FullstackCapabilityArticle from '@/components/FullstackCapabilityArticle.vue';

const outcomes = [
  '能把操作记录升级成可回放的事件流，而不是停留在简单日志文案展示。',
  '能为排障、培训、审计和行为复盘设计可视化的前端回放能力。',
  '能处理时间轴控制、状态快照、关键节点高亮和失败定位等真实工程难点。',
];

const quickStages = [
  {
    order: '01',
    title: '先定事件模型',
    summary: '操作、系统回执、状态变更要统一成可回放事件。',
  },
  {
    order: '02',
    title: '状态快照可还原',
    summary: '只存日志不够，关键状态要能回到当时。',
  },
  {
    order: '03',
    title: '时间轴可控制',
    summary: '播放、暂停、跳转、倍速这些是回放能力基础。',
  },
  {
    order: '04',
    title: '异常节点可定位',
    summary: '失败发生在哪一步，要能被快速看见。',
  },
  {
    order: '05',
    title: '隐私与脱敏前置',
    summary: '日志回放往往涉及敏感数据，脱敏策略不能后补。',
  },
];

const guideStages = [
  {
    order: '01',
    title: '回放能力的前提，是先把日志从“文案”升级为“事件流”',
    tag: '事件建模',
    description:
      '如果日志只是“谁在几点做了什么”的文案集合，最多只能阅读，无法回放。真正可回放的系统，会把用户点击、表单变更、接口回执、状态变化等动作抽成事件流，让前端能够按时间顺序重演业务过程。',
    bestFor: ['审计平台', '培训回放', '操作复盘', '问题排查系统'],
    focus: [
      '日志记录不仅有文案，还要有事件类型和上下文数据',
      '用户操作和系统事件统一进入时间轴模型',
      '事件模型能驱动 UI 回放而不只是文本展示',
    ],
    risks: [
      '日志只有字符串，无法驱动真实回放',
      '用户操作和系统状态变更分散记录',
      '回放时只能看到一堆时间排序的文字',
    ],
    language: 'ts',
    code: `type ReplayEvent = {
  id: string
  type: 'click' | 'input' | 'request' | 'state-change'
  occurredAt: string
  payload: Record<string, unknown>
}`,
  },
  {
    order: '02',
    title: '如果没有状态快照，所谓回放通常只是“日志朗读”',
    tag: '状态还原',
    description:
      '真正有价值的回放，不只是告诉你“点了保存”，而是能让你看到保存前表单里是什么、保存后状态怎么变、哪一个字段触发了异常。这意味着关键状态要能被快照化，至少在关键节点可以还原，而不是只有过程文案。',
    bestFor: ['复杂表单系统', '工作流平台', '配置中心', '培训复盘系统'],
    focus: [
      '关键节点保存页面状态快照',
      '状态回放与事件流可以联动推进',
      '异常节点前后的状态差异清楚展示',
    ],
    risks: [
      '回放只有事件，没有页面上下文',
      '用户看不出操作前后发生了什么变化',
      '异常排查仍然需要手动脑补状态变化',
    ],
    language: 'ts',
    code: `type ReplaySnapshot = {
  eventId: string
  viewState: Record<string, unknown>
}`,
  },
  {
    order: '03',
    title: '回放工程真正的体验上限，在于时间轴控制和异常聚焦',
    tag: '播放控制',
    description:
      '当事件序列很长时，用户不会愿意从头慢慢看。成熟的回放系统应该支持播放、暂停、快进、跳到指定节点、只看异常步骤等控制能力。这样回放才能服务排障和培训，而不是变成一个花哨但低效的动画。',
    bestFor: ['排障中心', '培训系统', '审计回放页', '操作复盘场景'],
    focus: [
      '播放控制和时间轴跳转能力完备',
      '关键步骤、错误步骤、人工操作步骤可筛选',
      '回放和事件详情面板联动展示',
    ],
    risks: [
      '事件序列太长，用户无法快速定位重点',
      '回放节奏不可控，体验很差',
      '异常事件被淹没在普通操作里',
    ],
    language: 'ts',
    code: `type ReplayControllerState = {
  currentIndex: number
  playing: boolean
  speed: 1 | 2 | 4
}`,
  },
];

const comparisonCards = [
  {
    title: '纯日志列表',
    summary: '实现最轻，但只能阅读，几乎没有真正回放能力。',
  },
  {
    title: '带时间轴操作流',
    summary: '适合多数排障和培训场景，信息组织明显更清楚。',
  },
  {
    title: '可视状态回放',
    summary: '最适合复杂业务系统，效果最好，但状态建模要求最高。',
  },
];

const checklist = [
  '日志要先升级为可驱动 UI 的事件流。',
  '关键节点最好有状态快照或最小可还原上下文。',
  '时间轴要支持播放、暂停、跳转和倍速。',
  '异常节点必须可以快速筛出和定位。',
  '敏感字段和隐私信息要先脱敏再回放。',
  '回放系统最好和审计、时间线、详情联动。',
];
</script>
