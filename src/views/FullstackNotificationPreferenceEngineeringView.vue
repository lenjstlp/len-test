<template>
  <FullstackCapabilityArticle
    eyebrow="Frontend Notification Preference Engineering"
    title="前端通知偏好中心工程"
    summary="通知偏好不是几个开关摆在页面上就结束了。真正复杂的系统里，用户会按消息类型、渠道、时间段、租户、角色和免打扰规则配置自己的接收策略。前端如果没有统一模型，消息中心、短信、邮件、站内信和推送配置很快就会各写各的。"
    :outcomes="outcomes"
    :quick-stages="quickStages"
    decision-title="通知偏好中心先统一消息分类和渠道模型，再治理批量保存、预览和兜底规则"
    :guide-stages="guideStages"
    comparison-title="按渠道配、按事件配、矩阵式配置三种通知偏好方案的差异"
    :comparison-cards="comparisonCards"
    checklist-title="通知偏好中心上线前必须补齐的 6 个点"
    :checklist="checklist"
  />
</template>

<script setup lang="ts">
import FullstackCapabilityArticle from '@/components/FullstackCapabilityArticle.vue';

const outcomes = [
  '能把消息事件、渠道、频率和免打扰时段统一成一套通知偏好模型。',
  '能设计通知偏好中心的批量保存、即时预览、默认值回填和权限兜底逻辑。',
  '能把站内信、短信、邮件、App Push 等通知配置沉淀为一套通用前端能力。',
];

const quickStages = [
  {
    order: '01',
    title: '先统一事件模型',
    summary: '不先统一消息事件分类，通知开关页面迟早会散。',
  },
  {
    order: '02',
    title: '渠道和规则分层',
    summary: '消息类型、渠道、时段、频率和强制通知要拆成不同层次。',
  },
  {
    order: '03',
    title: '默认值要可解释',
    summary: '用户第一次进入时，不同角色和租户的默认策略必须清楚可追踪。',
  },
  {
    order: '04',
    title: '保存要支持批量',
    summary: '通知中心经常一次改多个开关，不能每点一次就单独提交。',
  },
  {
    order: '05',
    title: '强制通知要有兜底',
    summary: '审计、安全和医疗高优先级消息不能完全被用户自行关闭。',
  },
];

const guideStages = [
  {
    order: '01',
    title: '先抽象消息事件，而不是先画一堆开关',
    tag: '事件建模',
    description:
      '通知中心最容易烂掉的原因，是所有业务线都直接往页面上加开关，最后没人知道每个开关到底控制什么。更稳的方案，是先定义事件模型：事件编码、事件名称、业务域、默认渠道、是否强制送达、是否允许用户关闭。前端的开关和矩阵配置，都应该围绕这张事件表展开。',
    bestFor: ['消息中心', '运营触达平台', '审批通知系统', '医疗随访提醒'],
    focus: [
      '先统一事件编码和分类',
      '事件和渠道做多对多配置关系',
      '强制通知与可关闭通知要分开定义',
    ],
    risks: [
      '每个业务线自己发明通知事件名称',
      '同一个开关实际控制多个不透明逻辑',
      '默认值来源说不清楚',
    ],
    language: 'ts',
    code: `type NotificationEvent = {
  code: string
  name: string
  domain: 'approval' | 'security' | 'operation' | 'medical'
  forceDeliver: boolean
  channels: Array<'inbox' | 'sms' | 'email' | 'push'>
}`,
  },
  {
    order: '02',
    title: '偏好中心不是单层布尔值，而是“事件 × 渠道 × 规则”的矩阵',
    tag: '矩阵配置',
    description:
      '真实业务里，用户可能希望审批消息走站内信和邮件，营销消息只走站内信，夜间短信全部关闭，但安全告警无论何时都强制触达。只用一个布尔开关根本无法表达这种现实规则，所以前端要按矩阵建模，而不是按单列开关堆页面。',
    bestFor: ['企业 IM', '多渠道通知中心', 'SaaS 配置后台', '多角色系统'],
    focus: [
      '事件、渠道、免打扰、频率策略分层',
      '支持批量切换同类渠道偏好',
      '保留不可编辑的强制规则展示',
    ],
    risks: [
      '把所有规则压成一个开关',
      '用户看不懂为什么有些项不能关',
      '页面状态和后端偏好协议不一致',
    ],
    language: 'ts',
    code: `type NotificationPreference = {
  eventCode: string
  channel: 'inbox' | 'sms' | 'email' | 'push'
  enabled: boolean
  quietHours?: [string, string]
  frequency?: 'instant' | 'digest'
}`,
  },
  {
    order: '03',
    title: '保存时要做批量提交和脏状态提示，不要把每个开关都做成一次请求',
    tag: '交互治理',
    description:
      '通知偏好中心往往是一个设置页，用户会连续改很多项。如果每点一个开关就立即提交，不仅接口风暴明显，失败回滚也很难做。更稳的方式是前端维护本地编辑态、脏状态提示和统一保存动作，必要时再支持“恢复默认配置”。',
    bestFor: ['偏好中心设置页', '矩阵配置页', '批量规则编辑页', '管理后台'],
    focus: [
      '前端维护编辑态和原始态 diff',
      '统一保存和失败回滚',
      '支持重置默认值和预览最终生效结果',
    ],
    risks: [
      '每个开关点一次发一次请求',
      '保存失败后页面状态和服务端状态分裂',
      '用户不知道自己是否还有未保存改动',
    ],
    language: 'ts',
    code: `const payload = diffNotificationPreferences(originState, draftState)

await request.put('/api/notification/preferences', payload)`,
  },
];

const comparisonCards = [
  {
    title: '按渠道配置',
    summary: '实现简单，但无法精细控制不同业务事件，适合通知类型很少的小系统。',
  },
  {
    title: '按事件配置',
    summary: '更贴业务，但渠道规则容易膨胀，适合先把事件体系做扎实的团队。',
  },
  {
    title: '矩阵式配置',
    summary:
      '表达力最强，最适合长期系统，但前提是事件、渠道和默认值模型都要先统一。',
  },
];

const checklist = [
  '先统一通知事件编码、渠道枚举和默认值来源。',
  '强制送达消息必须和普通可关闭消息分层展示。',
  '通知偏好页面应支持批量保存、脏状态提示和失败回滚。',
  '多租户、多角色系统要支持不同默认策略，不要写死统一初始值。',
  '要提供最终生效预览，避免用户看不懂自己到底会收到什么消息。',
  '免打扰时段、频率和紧急消息兜底规则必须和业务方提前对齐。',
];
</script>
