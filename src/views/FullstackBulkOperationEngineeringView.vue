<template>
  <FullstackCapabilityArticle
    eyebrow="Frontend Bulk Operation Engineering"
    title="前端批量操作工程"
    summary="批量操作不是在表格上加一个多选框这么简单。真正做成工程时，它牵涉到跨页选择、禁选规则、风险确认、部分成功回写、操作撤销和大批量性能边界。很多后台系统一旦数据量起来，批量能力就会变成核心生产力功能。"
    :outcomes="outcomes"
    :quick-stages="quickStages"
    decision-title="批量操作先确定选择模型，再设计校验、执行反馈和失败回收"
    :guide-stages="guideStages"
    comparison-title="当前页批量、跨页批量、全量条件批量三种模式的取舍"
    :comparison-cards="comparisonCards"
    checklist-title="批量操作上线前必须补齐的 6 个点"
    :checklist="checklist"
  />
</template>

<script setup lang="ts">
import FullstackCapabilityArticle from '@/components/FullstackCapabilityArticle.vue';

const outcomes = [
  '能区分当前页选择、跨页选择和条件全选，不再把所有批量操作都做成“选中 id 数组”。',
  '能为批量删除、批量分配、批量导出、批量审核设计稳健的交互与执行链路。',
  '能处理部分成功、失败明细、禁选项和高风险确认等真实业务复杂度。',
];

const quickStages = [
  {
    order: '01',
    title: '先定选择模型',
    summary: '是当前页选中、跨页累积，还是按条件全选，必须先讲清楚。',
  },
  {
    order: '02',
    title: '禁选规则前置',
    summary: '已归档、无权限、状态冲突的数据要在选择阶段就拦住。',
  },
  {
    order: '03',
    title: '执行反馈细化',
    summary: '成功多少条、失败多少条、失败原因是什么，要能看清。',
  },
  {
    order: '04',
    title: '高风险操作二次确认',
    summary: '删除、作废、发布这类动作不能只靠一个按钮误触。',
  },
  {
    order: '05',
    title: '支持异常回收',
    summary: '部分成功后的前端状态和列表回刷策略必须明确。',
  },
];

const guideStages = [
  {
    order: '01',
    title: '把“选择结果”建成独立状态，而不是单纯依赖表格勾选',
    tag: '选择模型',
    description:
      '很多系统一开始直接拿表格组件的已勾选行当批量结果，但只要涉及翻页、筛选变化、跨页保留，就会迅速失控。更稳的方式是单独维护批量选择状态，明确当前页选中、跨页已选、排除项和是否全选当前条件。',
    bestFor: ['管理后台列表页', '批量审核页', '多筛选检索页', '运营批处理页面'],
    focus: [
      '选中状态脱离表格组件单独维护',
      '支持跨页累计与条件全选',
      '筛选条件变化时定义清楚是否重置选择',
    ],
    risks: [
      '翻页后已选数据丢失',
      '条件全选与手动勾选语义混乱',
      '列表刷新后选中状态错乱',
    ],
    language: 'ts',
    code: `type BulkSelectionState = {
  mode: 'page' | 'cross-page' | 'all-by-filter'
  includedIds: string[]
  excludedIds: string[]
}`,
  },
  {
    order: '02',
    title: '批量操作要先做前置校验，不要等接口报错再告诉用户',
    tag: '前置校验',
    description:
      '批量操作里最糟糕的体验，就是用户选了一堆数据点执行后才发现一半状态不允许。更好的做法是在选择阶段就把不可选原因提示出来，并在执行前做一次统一校验，告诉用户哪些记录会被跳过、哪些会失败。',
    bestFor: ['批量上下架', '批量分配负责人', '批量归档', '批量导出'],
    focus: [
      '禁选原因直接可见',
      '执行前弹窗展示风险摘要',
      '高风险批量操作要求二次确认文案',
    ],
    risks: [
      '接口失败后用户不知道哪条有问题',
      '禁选和可选规则散落在页面里',
      '批量按钮只看数量不看数据合法性',
    ],
    language: 'ts',
    code: `const getDisabledReason = (record: { status: string; editable: boolean }) => {
  if (!record.editable) return '当前账号无权限操作'
  if (record.status === 'archived') return '已归档数据不支持批量修改'
  return ''
}`,
  },
  {
    order: '03',
    title: '执行结果要支持部分成功和失败明细回放',
    tag: '结果回写',
    description:
      '真实业务里，批量操作很少做到百分百成功。更常见的是 80 条成功、20 条失败。前端不能只弹一句“执行完成”，而要能展示成功失败数量、失败原因、可重试项和列表如何局部回刷。这样用户才能真正继续处理剩余问题。',
    bestFor: ['批量审批', '批量推送', '批量删除', '批量导出任务'],
    focus: [
      '结果摘要和失败明细分层展示',
      '支持局部回刷而非整页重载',
      '失败项可单独重试或导出错误清单',
    ],
    risks: [
      '部分成功后页面状态与后端不一致',
      '失败原因被吞掉无法定位',
      '一次操作后只能全量刷新列表',
    ],
    language: 'ts',
    code: `type BulkActionResult = {
  successCount: number
  failed: Array<{ id: string; reason: string }>
}`,
  },
];

const comparisonCards = [
  {
    title: '当前页批量',
    summary: '实现最简单，适合小列表，但无法覆盖真正的大数据处理场景。',
  },
  {
    title: '跨页批量',
    summary: '适合后台常见批处理需求，复杂度适中，但要维护稳定的选择状态。',
  },
  {
    title: '按条件全选批量',
    summary: '最强大，适合海量数据，但必须把过滤条件和排除项建模清楚。',
  },
];

const checklist = [
  '批量选择状态要独立于表格组件维护。',
  '跨页保留、全选当前条件、排除项语义要定义明确。',
  '禁选原因在选择阶段就要可见。',
  '高风险操作要补二次确认和影响范围提示。',
  '执行结果必须支持部分成功和失败明细。',
  '列表回刷、局部更新、重试入口都要提前设计。',
];
</script>
