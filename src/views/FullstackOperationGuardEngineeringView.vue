<template>
  <FullstackCapabilityArticle
    eyebrow="Frontend Operation Guard Engineering"
    title="前端防误触工程"
    summary="危险操作并不是多弹一个确认框就算完成。真正的防误触工程，要覆盖二次确认、权限校验、上下文提示、撤销能力和操作冷却机制，否则删库式误操作迟早会发生。"
    :outcomes="outcomes"
    :quick-stages="quickStages"
    decision-title="防误触先定义操作风险等级，再治理确认方式、撤销机制和操作冷却"
    :guide-stages="guideStages"
    comparison-title="普通确认框、风险分级确认、带撤销与冷却的防误触体系三种路线的差异"
    :comparison-cards="comparisonCards"
    checklist-title="防误触工程上线前必须补齐的 6 个点"
    :checklist="checklist"
  />
</template>

<script setup lang="ts">
import FullstackCapabilityArticle from '@/components/FullstackCapabilityArticle.vue';

const outcomes = [
  '能按风险等级设计不同的确认方式，而不是所有危险操作都只弹一个通用确认框。',
  '能为删除、作废、发布、回滚、转诊、病历提交等操作设计更稳的防误触链路。',
  '能把确认、撤销、冷却和权限校验组合成统一的操作守卫层。',
];

const quickStages = [
  {
    order: '01',
    title: '先做风险分级',
    summary: '不同危险操作的确认强度不能一刀切。',
  },
  {
    order: '02',
    title: '确认信息具体',
    summary: '确认框不能只有“是否继续”，要把影响范围讲清楚。',
  },
  {
    order: '03',
    title: '支持撤销更值钱',
    summary: '有些操作比确认更适合做可撤销。',
  },
  {
    order: '04',
    title: '冷却与防连点',
    summary: '重复提交、重复删除要在前端守住。',
  },
  {
    order: '05',
    title: '权限和上下文一致',
    summary: '有权限并不代表当前上下文就允许做这件事。',
  },
];

const guideStages = [
  {
    order: '01',
    title: '别把所有危险操作都交给同一个确认弹窗，先做风险分级',
    tag: '风险分级',
    description:
      '删除草稿、删除正式数据、发布配置、回滚线上版本、撤回审批，这些操作的风险完全不同。如果前端用同一套“确定/取消”模板处理，用户很快会麻木。更稳的方式是给操作定义风险等级，再匹配不同确认强度。',
    bestFor: ['删除操作', '配置发布', '审批提交', '医疗关键动作'],
    focus: [
      '低中高风险操作分级',
      '不同等级匹配不同确认方式',
      '高风险动作增加额外上下文确认',
    ],
    risks: [
      '所有危险操作都长得一样，用户形成确认疲劳',
      '高风险操作缺乏足够提示',
      '低风险操作确认过重，体验很差',
    ],
    language: 'ts',
    code: `type GuardLevel = 'low' | 'medium' | 'high'

type GuardAction = {
  code: string
  level: GuardLevel
  confirmText: string
}`,
  },
  {
    order: '02',
    title: '真正有效的确认，不是多问一句，而是把影响范围说清楚',
    tag: '上下文确认',
    description:
      '确认框如果只写“确定删除吗”，几乎没有任何防护价值。真正有效的提示应该包含对象名称、影响范围、是否可恢复、是否会触发通知等关键信息，让用户知道自己到底要承担什么后果。',
    bestFor: ['批量删除', '流程终止', '配置发布', '数据清空'],
    focus: [
      '确认文案必须包含上下文对象',
      '高风险动作展示影响范围和恢复条件',
      '批量操作明确条数和作用域',
    ],
    risks: [
      '用户根本不知道删除的是哪条数据',
      '批量操作误删范围不清晰',
      '高风险发布没有给出真实影响说明',
    ],
    language: 'ts',
    code: `const buildGuardMessage = (name: string, count: number) =>
  count > 1 ? \`确定删除 \${count} 条「\${name}」相关数据吗？\` : \`确定删除「\${name}」吗？\``,
  },
  {
    order: '03',
    title: '有些操作与其死磕确认，不如提供可撤销窗口和操作冷却',
    tag: '撤销机制',
    description:
      '很多误操作并不是因为没看到确认框，而是因为动作做错得太快。像归档、移除、撤回这类可逆操作，提供短暂撤销窗口往往比多弹一次确认框更实用。同时，按钮冷却和幂等限制也要进守卫层设计。',
    bestFor: ['归档操作', '移除成员', '撤销草稿', '轻量级删除'],
    focus: [
      '可逆操作优先考虑撤销策略',
      '按钮防连点和请求幂等要统一设计',
      '确认、撤销、冷却形成组合防护',
    ],
    risks: [
      '连续点击造成重复提交',
      '本可撤销的操作却设计成一次性破坏',
      '不同页面对同类危险操作采用不同守卫策略',
    ],
    language: 'ts',
    code: `const createCooldownGuard = (duration: number) => {
  let locked = false

  return () => {
    if (locked) {
      return false
    }

    locked = true
    setTimeout(() => {
      locked = false
    }, duration)
    return true
  }
}`,
  },
];

const comparisonCards = [
  {
    title: '普通确认框',
    summary: '实现最简单，但很容易让用户形成条件反射式点击确认。',
  },
  {
    title: '风险分级确认',
    summary: '更适合真实业务，能兼顾体验和保护强度。',
  },
  {
    title: '守卫体系',
    summary: '把确认、撤销、冷却、权限统一成能力层，长期最稳。',
  },
];

const checklist = [
  '危险操作必须先有风险分级。',
  '确认文案要包含对象和影响范围。',
  '可逆操作优先考虑撤销方案。',
  '按钮冷却、防连点和幂等要统一处理。',
  '权限校验和上下文允许条件要同时校验。',
  '关键操作需要审计和结果反馈闭环。',
];
</script>
