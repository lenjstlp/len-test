<template>
  <FullstackCapabilityArticle
    eyebrow="Frontend Optimistic Update Engineering"
    title="前端乐观更新工程"
    summary="真正的乐观更新不是接口还没成功就瞎改页面，而是在用户操作后先给出本地成功态，再用请求结果做确认、回滚或修正。它解决的是交互延迟、批量反馈和状态一致性，不是简单地把 loading 去掉。"
    :outcomes="outcomes"
    :quick-stages="quickStages"
    decision-title="乐观更新先判断业务可回滚性，再决定本地先行策略"
    :guide-stages="guideStages"
    comparison-title="悲观更新、乐观更新、最终一致修正三种模式的边界"
    :comparison-cards="comparisonCards"
    checklist-title="上线乐观更新前要补齐的 6 个点"
    :checklist="checklist"
  />
</template>

<script setup lang="ts">
import FullstackCapabilityArticle from '@/components/FullstackCapabilityArticle.vue';

const outcomes = [
  '能判断哪些操作适合做乐观更新，哪些必须等待服务端确认。',
  '能设计本地补丁、失败回滚和结果修正链路，而不是只改一处列表状态。',
  '能让点赞、收藏、排序、状态切换等交互明显更跟手，同时不牺牲一致性。',
];

const quickStages = [
  {
    order: '01',
    title: '先看是否可回滚',
    summary: '如果失败后代价极高，就别轻易做本地先行。',
  },
  {
    order: '02',
    title: '先存旧状态',
    summary: '没有快照就没有安全回滚。',
  },
  {
    order: '03',
    title: '成功不等于结束',
    summary: '服务端可能返回修正后的真实状态，还要做二次对齐。',
  },
  {
    order: '04',
    title: '失败要可恢复',
    summary: '不能只弹一句失败，然后页面还是成功态。',
  },
  {
    order: '05',
    title: '并发要可串联',
    summary: '连续点击、撤销、重新提交都要纳入同一状态机。',
  },
];

const guideStages = [
  {
    order: '01',
    title: '先判断业务动作适不适合乐观更新',
    tag: '场景筛选',
    description:
      '点赞、收藏、标记已读、切换开关这类动作，失败后可以回退，通常很适合乐观更新。支付、删除不可恢复数据、审批生效这类动作则更适合悲观确认。不要把“用户想快一点”直接翻译成“所有动作都先改 UI”。',
    bestFor: ['点赞收藏', '标签切换', '状态勾选', '排序拖拽提交'],
    focus: [
      '先评估失败成本和回滚成本',
      '把高风险动作与低风险动作分层',
      '必要时只对局部字段做乐观更新',
    ],
    risks: [
      '支付、审批类动作也直接先展示成功',
      '服务端校验复杂，却假设一定能成功',
      '乐观更新范围过大，失败回滚代价高',
    ],
    language: 'ts',
    code: `const canOptimisticUpdate = (action: 'like' | 'delete' | 'pay') => {
  return ['like'].includes(action)
}`,
  },
  {
    order: '02',
    title: '先打本地补丁，但必须保存回滚快照',
    tag: '本地补丁',
    description:
      '乐观更新的核心不是直接改数据，而是“先应用一份可撤销的本地补丁”。你需要在提交前保存旧值、应用新值、记录 requestId 或 mutationId，等请求返回后再决定保留、修正还是回退。',
    bestFor: ['列表项状态切换', '计数器更新', '局部字段编辑', '消息已读标记'],
    focus: [
      '修改前保存旧数据快照',
      '为每次变更打唯一 mutationId',
      '回滚时只恢复相关字段，不误伤别的变更',
    ],
    risks: [
      '直接覆盖状态，失败后不知道回哪',
      '多个并发操作共享一份旧值，回滚错乱',
      '成功返回后没有和真实结果重新对齐',
    ],
    language: 'ts',
    code: `const runOptimisticMutation = async <T>(
  applyPatch: () => void,
  rollback: () => void,
  task: () => Promise<T>,
) => {
  applyPatch()

  try {
    return await task()
  } catch (error) {
    rollback()
    throw error
  }
}`,
  },
  {
    order: '03',
    title: '把成功、失败、修正三种结果拆开，不要只做成功或失败两态',
    tag: '状态收口',
    description:
      '服务端返回成功，并不代表本地状态完全正确。比如点赞数可能被服务端重新计算，排序可能被后端规则二次调整。更稳的做法是把结果拆成：成功确认、失败回滚、成功但需修正三类，然后统一收口。',
    bestFor: ['社交计数', '协同列表排序', '状态机流转', '批量编辑结果确认'],
    focus: [
      '成功后用服务端返回值覆盖临时值',
      '失败回滚同时给用户明确反馈',
      '并发情况下只处理当前 mutation 的回调',
    ],
    risks: [
      '请求成功就直接信本地状态，不做服务端对齐',
      '失败后数据回滚了，但提示和 loading 没收口',
      '后返回的旧请求覆盖了新的本地状态',
    ],
    language: 'ts',
    code: `const finalizeMutation = (
  mutationId: string,
  activeMutationId: string,
  commit: () => void,
) => {
  if (mutationId !== activeMutationId) {
    return
  }

  commit()
}`,
  },
];

const comparisonCards = [
  {
    title: '悲观更新',
    summary: '最稳，但交互延迟明显。适合审批、支付、删除等失败成本很高的动作。',
  },
  {
    title: '乐观更新',
    summary: '体验最好，适合可回滚的局部操作，但必须补齐快照、回滚和并发保护。',
  },
  {
    title: '最终一致修正',
    summary:
      '先给本地反馈，再等待服务端返回真实结果修正 UI，适合计数和协同状态类场景。',
  },
];

const checklist = [
  '先判断操作是否适合乐观更新，不要全局一刀切。',
  '所有乐观更新必须保留旧值快照和 mutation 标识。',
  '失败后要真实回滚，不要只弹 toast。',
  '成功后仍要用服务端返回值做二次对齐。',
  '连续点击和并发请求要防止旧响应覆盖新状态。',
  '把 loading、提示、撤销入口和埋点一起设计，不要只改数据层。',
];
</script>
