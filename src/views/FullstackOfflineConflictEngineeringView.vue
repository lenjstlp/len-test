<template>
  <FullstackCapabilityArticle
    eyebrow="Frontend Offline Conflict Resolution"
    title="前端离线冲突合并工程"
    summary="离线能力真正难的不是缓存页面，而是用户离线修改数据后重新联网，怎样和远端版本合并。这里会碰到版本号、脏字段、冲突提示、自动合并、人工确认和重放失败等问题。前端如果只做本地缓存而不做冲突治理，离线功能迟早会变成数据事故源头。"
    :outcomes="outcomes"
    :quick-stages="quickStages"
    decision-title="离线冲突先定版本模型，再定合并策略"
    :guide-stages="guideStages"
    comparison-title="覆盖写入、字段级合并、人工确认三类冲突处理策略"
    :comparison-cards="comparisonCards"
    checklist-title="离线冲突合并能力上线前要自查的 6 件事"
    :checklist="checklist"
  />
</template>

<script setup lang="ts">
import FullstackCapabilityArticle from '@/components/FullstackCapabilityArticle.vue';

const outcomes = [
  '能分清离线缓存、离线编辑、联网重放和冲突合并在工程上的不同阶段。',
  '能设计本地草稿版本号、远端版本号和字段级冲突提示。',
  '能在数据冲突时提供可解释、可恢复的用户体验，而不是粗暴覆盖。',
];

const quickStages = [
  {
    order: '01',
    title: '先定版本标识',
    summary: '没有版本号或更新时间，冲突检测几乎无从谈起。',
  },
  {
    order: '02',
    title: '本地修改要记录脏字段',
    summary: '只有知道用户改了什么，才谈得上精细合并。',
  },
  {
    order: '03',
    title: '自动合并要有边界',
    summary: '非冲突字段可自动合，真正同字段冲突必须明确提示。',
  },
  {
    order: '04',
    title: '失败重放要可恢复',
    summary: '队列重放失败时，用户要能知道哪条数据卡住了。',
  },
  {
    order: '05',
    title: '冲突提示要讲人话',
    summary: '不要只弹“409 Conflict”，要告诉用户到底冲突在哪里。',
  },
];

const guideStages = [
  {
    order: '01',
    title: '离线编辑必须带基线版本和本地脏字段',
    tag: '版本建模',
    description:
      '用户离线时编辑的数据，不能只存一份“最新值”。更稳的做法是同时记录：编辑开始时的远端版本、本地修改后的字段集合，以及重放队列中的操作顺序。这样重新联网时，前端才能知道当前本地数据是基于哪个远端版本修改出来的。',
    bestFor: ['表单草稿', '移动端巡检录入', '协作文档元数据编辑'],
    focus: [
      '每条记录保留 baseVersion',
      '本地记录 dirtyFields 和 queuedActions',
      '重连后优先拉远端最新版本对账',
    ],
    risks: [
      '离线只存最终对象，没有版本上下文',
      '不知道用户具体改了哪些字段',
      '重放顺序丢失，导致依赖动作错乱',
    ],
    language: 'typescript',
    code: `type OfflineDraft<T> = {
  resourceId: string
  baseVersion: string
  dirtyFields: string[]
  localValue: T
}`,
  },
  {
    order: '02',
    title: '自动合并只适合不相交字段',
    tag: '冲突判定',
    description:
      '前端不要把所有冲突都扔给用户，也不要把所有冲突都默默覆盖。更合理的做法是：如果本地修改字段和远端更新字段没有重叠，可以自动合并；如果同一字段两边都改了，再提示用户选保留哪一边。这种字段级策略最实用，也最容易解释。',
    bestFor: ['结构化表单', '配置项编辑', '业务对象属性修改'],
    focus: [
      '先比对 dirtyFields 和 remoteChangedFields',
      '无交集字段自动合并',
      '有交集字段生成冲突清单供用户确认',
    ],
    risks: [
      '所有字段一旦冲突就整单拦截',
      '直接以后写覆盖前写，用户毫无感知',
      '没有冲突详情，用户根本不知道怎么选',
    ],
    language: 'typescript',
    code: `function hasFieldConflict(local: string[], remote: string[]) {
  return local.some((field) => remote.includes(field))
}`,
  },
  {
    order: '03',
    title: '联网重放失败要进入可恢复队列，而不是静默报错',
    tag: '恢复治理',
    description:
      '离线队列最怕的是一条失败后全部阻塞，但用户完全不知道发生了什么。前端应该把失败项提升为“待处理冲突任务”，展示资源名、失败原因和操作建议，让用户能够继续其它任务，同时逐个处理冲突项。',
    bestFor: ['批量离线录入', '高时延网络场景', '移动办公系统'],
    focus: [
      '冲突项进入待处理中心',
      '成功项继续清队列，不要全阻塞',
      '冲突解决后支持单条重放',
    ],
    risks: [
      '一条冲突卡住整批同步',
      '失败日志只打控制台，不反馈用户',
      '处理冲突后不能局部重试',
    ],
    language: 'typescript',
    code: `type SyncConflictTask = {
  resourceId: string
  reason: 'version_conflict' | 'schema_changed'
  retryable: boolean
}`,
  },
];

const comparisonCards = [
  {
    title: '整条覆盖写入',
    summary: '实现最简单，但风险最大，适合极低价值数据，不适合真实业务主数据。',
  },
  {
    title: '字段级自动合并',
    summary: '最适合结构化表单类业务，既能减少打扰，又能控制真正冲突风险。',
  },
  {
    title: '人工确认合并',
    summary: '适合高价值对象或审批数据，前端需要给出差异视图和逐字段选择能力。',
  },
];

const checklist = [
  '离线草稿必须保留 baseVersion，不能只存一份当前值。',
  '本地修改字段要可追踪，便于字段级合并。',
  '重连后先对账再重放，不要盲目直接提交队列。',
  '真正冲突要展示具体字段差异，不能只弹通用错误。',
  '冲突项要能单独处理和重试，避免整队列阻塞。',
  '离线能力上线前必须测试断网编辑、远端并发修改和半途恢复三种场景。',
];
</script>
