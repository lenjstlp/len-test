<template>
  <FullstackCapabilityArticle
    eyebrow="Frontend Header Schema Engineering"
    title="前端表头配置工程"
    summary="表头配置工程不是把列名提到一个数组里那么简单。真正复杂的业务列表里，表头常常牵涉排序、固定列、权限显隐、列宽记忆、导出对齐、多行表头和不同场景下的列方案切换。做不好，列表工程会反复返工。"
    :outcomes="outcomes"
    :quick-stages="quickStages"
    decision-title="表头配置先统一列协议，再治理显隐、排序、记忆和场景方案"
    :guide-stages="guideStages"
    comparison-title="写死列、局部列配置、完整表头协议三种路线的差异"
    :comparison-cards="comparisonCards"
    checklist-title="表头配置工程上线前必须补齐的 6 个点"
    :checklist="checklist"
  />
</template>

<script setup lang="ts">
import FullstackCapabilityArticle from '@/components/FullstackCapabilityArticle.vue';

const outcomes = [
  '能把列表列定义抽成统一表头协议，而不是在每个页面模板里重复写列配置。',
  '能处理列显隐、排序、宽度记忆、权限控制和导出一致性等真实表格工程问题。',
  '能为中后台复杂表格、审计列表、报表系统建立稳定的表头配置能力。',
];

const quickStages = [
  {
    order: '01',
    title: '先定列协议',
    summary: '列 key、标题、宽度、排序能力、权限标识先统一。',
  },
  {
    order: '02',
    title: '显隐规则收口',
    summary: '不同角色、不同场景显示哪些列，要集中治理。',
  },
  {
    order: '03',
    title: '宽度和顺序可记忆',
    summary: '用户调过的列布局不该刷新一次就丢。',
  },
  {
    order: '04',
    title: '导出和展示一致',
    summary: '页面上看到什么列，导出链路要能对齐。',
  },
  {
    order: '05',
    title: '方案切换可控',
    summary: '不同业务场景的列方案要能复用与切换。',
  },
];

const guideStages = [
  {
    order: '01',
    title: '列表复杂度一旦上来，表头必须先变成“协议”，不能只是 UI 配置',
    tag: '列协议',
    description:
      '很多项目一开始把表格列写在组件里还能撑住，但一旦出现几十列、不同角色列权限、不同业务视图共用同一张表，就必须先抽出统一列协议。列协议不仅描述标题和字段，还要承载排序、筛选、宽度、固定位置和导出标识。',
    bestFor: ['审计台账', '运营后台', '复杂报表页', '医疗列表系统'],
    focus: [
      '列配置和具体 UI 组件解耦',
      '同一列定义可被多个场景复用',
      '排序、固定、权限等行为进入协议层',
    ],
    risks: [
      '列定义散落在多个组件中重复维护',
      '同一字段在不同页面标题和行为不一致',
      '需求一变就需要全站找表头配置',
    ],
    language: 'ts',
    code: `type TableColumnSchema = {
  key: string
  title: string
  width?: number
  sortable?: boolean
  permission?: string
}`,
  },
  {
    order: '02',
    title: '表头工程的关键难点，往往不是渲染，而是显隐和方案治理',
    tag: '方案治理',
    description:
      '真实列表经常要求“运营看 A/B/C 列，审核看 A/D/E 列，导出还要补 F 列”。如果这些规则都写死在页面判断里，很快就会失控。更稳的方式是为列方案建立场景标识和权限标识，由统一逻辑在进入页面时计算出最终列集。',
    bestFor: ['多角色后台', '报表中心', '多租户平台', '复杂业务台账'],
    focus: [
      '场景列方案和角色权限集中计算',
      '列显隐不依赖页面层零散判断',
      '统一支持默认列、必显列、可选列',
    ],
    risks: [
      '页面模板充满 v-if 控制列显隐',
      '列权限逻辑分散难以排查',
      '切换场景后导出与页面列不一致',
    ],
    language: 'ts',
    code: `const resolveVisibleColumns = (
  columns: TableColumnSchema[],
  permissions: string[],
) => columns.filter((column) => !column.permission || permissions.includes(column.permission))`,
  },
  {
    order: '03',
    title: '用户体验层面，列宽记忆、顺序记忆和导出对齐非常值钱',
    tag: '交互细节',
    description:
      '很多团队把表头工程只理解成“能渲染”，忽略了用户长期使用体验。实际上，列宽拖拽后是否记住、列顺序调整后是否保留、导出是否按当前列方案走，这些细节决定用户会不会觉得你的列表真能用。',
    bestFor: ['高频业务列表', '运营工作台', '分析报表页', '审计中心'],
    focus: [
      '列宽、顺序、显隐状态可持久化',
      '用户自定义列方案可回显',
      '导出链路读取同一份列协议',
    ],
    risks: [
      '用户每次打开页面都要重新调列宽',
      '展示列和导出列逻辑分叉',
      '不同浏览器或标签页表现不一致',
    ],
    language: 'ts',
    code: `type ColumnPreference = {
  key: string
  width?: number
  order: number
  hidden?: boolean
}`,
  },
];

const comparisonCards = [
  {
    title: '写死列',
    summary: '适合简单页面，但一旦需求变复杂，维护成本会急速上升。',
  },
  {
    title: '局部列配置',
    summary: '适合中等复杂度列表，能复用部分能力，但治理仍然有限。',
  },
  {
    title: '完整表头协议',
    summary: '适合复杂后台和报表平台，扩展性最强，但协议设计要求更高。',
  },
];

const checklist = [
  '列协议至少要覆盖 key、标题、宽度、权限和排序能力。',
  '列显隐和角色权限要集中治理。',
  '列宽、顺序、隐藏状态最好支持持久化。',
  '导出链路要和页面列方案保持一致。',
  '多场景列表要支持方案切换而不是复制列定义。',
  '复杂表头场景要提前考虑固定列和多级表头边界。',
];
</script>
