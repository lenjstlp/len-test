<template>
  <FullstackCapabilityArticle
    eyebrow="Frontend Edit State Recovery"
    title="前端编辑态回显恢复工程"
    summary="复杂业务里，用户经常会在编辑过程中刷新、切页面、切标签或被动掉线。成熟的前端不会让用户重头再填，而是会把编辑态、回显态和恢复策略统一建模。"
    :outcomes="outcomes"
    :quick-stages="quickStages"
    decision-title="把编辑过程中的回显、草稿、恢复和冲突处理统一成一套机制"
    :guide-stages="guideStages"
    comparison-title="只管提交、简单本地缓存、完整编辑态恢复工程三种能力差异"
    :comparison-cards="comparisonCards"
    checklist-title="编辑态回显恢复工程上线前必须补齐的 6 个点"
    :checklist="checklist"
  />
</template>

<script setup lang="ts">
import FullstackCapabilityArticle from '@/components/FullstackCapabilityArticle.vue';

const outcomes = [
  '能在刷新、掉线、切页后恢复用户上次编辑状态。',
  '能把回显、草稿、自动保存和冲突提示统一成完整链路。',
  '能提升审批、病历、配置表单等长编辑流程的容错性。',
];

const quickStages = [
  {
    order: '01',
    title: '先区分展示态和编辑态',
    summary: '详情回显和正在编辑的数据不能混成一份。',
  },
  {
    order: '02',
    title: '自动保存草稿',
    summary: '关键字段变化后要能有节制地持久化。',
  },
  {
    order: '03',
    title: '刷新后恢复',
    summary: '重进页面时能自动拉起编辑上下文。',
  },
  {
    order: '04',
    title: '冲突要提示',
    summary: '本地草稿和服务端最新版本冲突时不能静默覆盖。',
  },
  {
    order: '05',
    title: '恢复路径清晰',
    summary: '用户要知道自己恢复的是哪一版内容。',
  },
];

const guideStages = [
  {
    order: '01',
    title: '编辑态数据不能直接复用详情态对象',
    tag: '状态分层',
    description:
      '详情回显数据是只读基线，编辑态则会不断变化。如果两者混成同一个对象，撤销、比较、脏值判断和草稿恢复都会非常混乱。成熟做法是明确区分基线数据、编辑数据和草稿数据。',
    bestFor: ['审批单编辑', '病历编辑', '大表单配置', '多步骤编辑'],
    focus: ['基线数据', '编辑副本', '脏值判断'],
    risks: [
      '详情和编辑状态互相污染',
      '无法判断是否有改动',
      '恢复后覆盖最新数据',
    ],
    language: 'ts',
    code: `type EditState<T> = {
  source: T
  draft: T
  dirty: boolean
}`,
  },
  {
    order: '02',
    title: '自动保存不能过猛，节流和触发点都要控制',
    tag: '草稿保存',
    description:
      '每改一个字符就写存储会让性能和体验都变差。更合理的是按字段重要性、时间间隔或离开页面时统一触发保存，同时要把草稿版本号和时间戳一起存下来。',
    bestFor: ['长表单', '富文本录入', '配置中心', '低网环境'],
    focus: ['节流保存', '草稿版本号', '离开前兜底保存'],
    risks: ['保存过于频繁', '草稿版本混乱', '用户不知道草稿来自何时'],
    language: 'ts',
    code: `const draftKey = \`draft:\${formId}:\${recordId}\``,
  },
  {
    order: '03',
    title: '恢复不只是把值塞回去，还要校验上下文是否还成立',
    tag: '恢复判断',
    description:
      '当本地草稿恢复时，服务端数据可能已经变化，字段结构也可能升级了。恢复前需要判断草稿版本是否还能兼容，必要时给出差异提示，而不是盲目回填。',
    bestFor: ['多人协作表单', '跨端编辑', '版本频繁演进场景'],
    focus: ['版本兼容', '冲突提示', '恢复前校验'],
    risks: [
      '旧草稿强行覆盖新数据',
      '字段已变化仍直接回填',
      '用户恢复后发现数据错乱',
    ],
    language: 'ts',
    code: `const canRestore = draft.version === schema.version`,
  },
];

const comparisonCards = [
  { title: '只管提交', summary: '实现简单，但用户一旦中断编辑就会丢内容。' },
  { title: '简单本地缓存', summary: '能恢复一部分状态，但兼容和冲突处理弱。' },
  { title: '完整恢复工程', summary: '更适合高价值长编辑流程。' },
];

const checklist = [
  '区分详情基线、编辑副本和草稿数据。',
  '自动保存要有节流和明确触发点。',
  '草稿要带版本号和时间戳。',
  '恢复前校验草稿与当前上下文是否兼容。',
  '冲突时给出用户可理解的提示。',
  '恢复成功后要同步清理过期草稿。',
];
</script>
