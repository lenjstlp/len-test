<template>
  <FullstackCapabilityArticle
    eyebrow="Frontend Advanced Search Engineering"
    title="前端富筛选查询工程"
    summary="真实业务里的查询从来不只是一个输入框。它往往包含关键字、状态、多选标签、日期区间、树形组织、联动字段、已保存方案和 URL 同步。富筛选查询工程的重点，是把条件表达、请求参数、结果状态和用户心智对齐，而不是堆一页表单控件。"
    :outcomes="outcomes"
    :quick-stages="quickStages"
    decision-title="富筛选先做条件模型，再决定交互层和接口层的映射"
    :guide-stages="guideStages"
    comparison-title="即时查询、显式查询、方案化查询三种模式的适用边界"
    :comparison-cards="comparisonCards"
    checklist-title="查询页面上线前要补齐的 6 项能力"
    :checklist="checklist"
  />
</template>

<script setup lang="ts">
import FullstackCapabilityArticle from '@/components/FullstackCapabilityArticle.vue';

const outcomes = [
  '能把复杂查询拆成条件模型、展示模型、接口模型和 URL 模型四层。',
  '能设计高频查询、方案保存、条件回显、重置和分享链接等真实能力。',
  '能避免查询条件越做越乱，最后无人敢改的后台筛选器灾难。',
];

const quickStages = [
  {
    order: '01',
    title: '先建条件模型',
    summary: '查询不是表单堆砌，核心是统一的数据结构。',
  },
  {
    order: '02',
    title: '条件要分主次',
    summary: '高频条件放前面，低频条件收进高级筛选。',
  },
  {
    order: '03',
    title: '展示和值要分离',
    summary: 'UI 里的标签、树节点和日期文案，未必等于接口参数。',
  },
  {
    order: '04',
    title: '状态要能回显',
    summary: '刷新、分享、返回页面后，用户不能从头再筛一次。',
  },
  {
    order: '05',
    title: '方案要可复用',
    summary: '复杂业务查询最终都会走向“保存筛选方案”。',
  },
];

const guideStages = [
  {
    order: '01',
    title: '先把筛选条件建模，不要直接拿表单控件的值去拼请求',
    tag: '条件模型',
    description:
      '富筛选最容易失控的原因，是页面里每个控件都在各自维护自己的值，最后查询参数只能靠临时拼接。更稳的方式是先定义统一的 query model，再把控件值映射进来。这样你后面做回显、保存方案、URL 同步和接口序列化时都会轻很多。',
    bestFor: ['管理后台搜索页', '医疗病历检索', '工单中心', '报表筛选面板'],
    focus: [
      '统一维护 query model',
      '把展示态和接口态拆开',
      '空值、默认值和重置规则统一收口',
    ],
    risks: [
      '每个控件自己拼参数，查询逻辑分散',
      '清空条件时遗漏字段，造成脏参数残留',
      '筛选标签和实际请求不一致',
    ],
    language: 'ts',
    code: `type QueryModel = {
  keyword: string
  statuses: string[]
  dateRange: [string, string] | null
  departmentIds: string[]
  page: number
  pageSize: number
}`,
  },
  {
    order: '02',
    title: '把“高频即查”和“低频高级筛选”拆层，别把页面做成参数仓库',
    tag: '交互分层',
    description:
      '用户每天都会用的关键字、状态、日期范围，应该直接可见；低频但强力的维度，如组织树、精细标签、枚举组合，则更适合收进高级筛选抽屉或折叠区。真正好的查询页不是把所有条件摊开，而是让用户能快速命中高频路径。',
    bestFor: ['高频运营查询', '客服工单检索', '大数据列表页', '复杂医疗筛选台'],
    focus: [
      '主筛选区只放高频条件',
      '高级筛选区承接低频复杂条件',
      '已生效条件要以标签形式明确反馈',
    ],
    risks: [
      '所有条件一字排开，页面极难理解',
      '高级筛选已生效却没有外显标签',
      '改动一个条件就全页重置，用户心智被打断',
    ],
    language: 'ts',
    code: `const buildActiveFilterTags = (query: QueryModel) => [
  query.keyword ? \`关键词: \${query.keyword}\` : '',
  query.statuses.length ? \`状态: \${query.statuses.join('、')}\` : '',
  query.dateRange ? \`日期: \${query.dateRange.join(' ~ ')}\` : '',
].filter(Boolean)`,
  },
  {
    order: '03',
    title: '查询状态必须和 URL、缓存方案、分页联动起来',
    tag: '状态持久化',
    description:
      '复杂查询页如果不做状态持久化，用户一刷新、返回、分享链接就全丢，会非常痛苦。更实用的做法是把核心查询条件同步到 URL，同时支持“保存筛选方案”。这样用户能回显、能分享、能恢复上一次工作上下文。',
    bestFor: [
      '多维列表页',
      '长期运营后台',
      '跨人协作查询链接',
      '需要复用筛选方案的页面',
    ],
    focus: [
      '核心查询参数同步到 URL',
      '分页变更和筛选变更统一收口',
      '支持保存和恢复常用筛选方案',
    ],
    risks: [
      '刷新页面后条件全丢',
      '分页参数和筛选参数不同步',
      'URL 太脏且不可逆解析，导致分享失效',
    ],
    language: 'ts',
    code: `const syncQueryToUrl = (query: QueryModel) => {
  router.replace({
    query: {
      keyword: query.keyword || undefined,
      statuses: query.statuses.join(',') || undefined,
      page: String(query.page),
    },
  })
}`,
  },
];

const comparisonCards = [
  {
    title: '即时查询',
    summary:
      '适合关键词联想和轻量筛选，但要配合防抖和请求取消，不适合代价大的组合检索。',
  },
  {
    title: '显式查询',
    summary:
      '用户改完条件后手动点击查询，更适合复杂后台和耗时检索，心智稳定、便于控制。',
  },
  {
    title: '方案化查询',
    summary:
      '把复杂条件沉淀成可复用方案，适合高频运营、医疗检索和多角色协作场景。',
  },
];

const checklist = [
  '查询条件必须先有统一模型，再映射到控件和接口。',
  '高频条件和低频条件要分层布局，不要全摊开。',
  '生效条件要有可见标签，便于理解当前结果集。',
  'URL 回显、刷新恢复和返回页面状态保持必须自测。',
  '分页、排序和筛选变更要统一走同一条查询链路。',
  '高频复杂查询建议支持保存方案和分享链接。',
];
</script>
