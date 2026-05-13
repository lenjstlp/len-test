<template>
  <FullstackCapabilityArticle
    eyebrow="Frontend Filter Form Engineering"
    title="前端筛选表单工程"
    summary="筛选表单几乎存在于所有后台系统里，但多数项目都把它做成了一堆散乱控件。真正做成工程时，它应该同时解决条件建模、回显、重置、联动、缓存、URL 同步和查询节流问题，成为列表系统的核心输入层。"
    :outcomes="outcomes"
    :quick-stages="quickStages"
    decision-title="筛选表单先统一条件模型，再处理联动、缓存和查询触发策略"
    :guide-stages="guideStages"
    comparison-title="即时查询、手动查询、条件草稿三种筛选表单模式的取舍"
    :comparison-cards="comparisonCards"
    checklist-title="筛选表单上线前必须补齐的 6 个点"
    :checklist="checklist"
  />
</template>

<script setup lang="ts">
import FullstackCapabilityArticle from '@/components/FullstackCapabilityArticle.vue';

const outcomes = [
  '能把筛选条件抽成稳定的数据模型，而不是让每个表单控件自己决定查询格式。',
  '能处理条件联动、默认值、快速重置、历史恢复和 URL 同步等列表工程高频问题。',
  '能为搜索、报表、审批列表、运营后台建立可复用的筛选表单工程方案。',
];

const quickStages = [
  {
    order: '01',
    title: '先统一条件结构',
    summary: '日期区间、枚举、多选、组织树都要先映射到统一查询模型。',
  },
  {
    order: '02',
    title: '触发策略分清',
    summary: '哪些字段即时查，哪些字段手动点查询，不能混成一锅。',
  },
  {
    order: '03',
    title: '条件要可恢复',
    summary: '返回列表、刷新页面、分享链接后都应尽量保留筛选状态。',
  },
  {
    order: '04',
    title: '联动要收口',
    summary: '省市区、组织部门、状态子类等联动关系最好集中管理。',
  },
  {
    order: '05',
    title: '重置不是清空一切',
    summary: '默认值、固定条件和只读条件常常不能被一键抹掉。',
  },
];

const guideStages = [
  {
    order: '01',
    title: '筛选表单先定义查询协议，不要直接把组件值塞给接口',
    tag: '条件建模',
    description:
      '很多列表页的问题不是控件不好用，而是查询参数根本没有统一协议。比如日期范围到底传开始结束两个字段，还是传一个数组？多选状态是逗号串还是数组？如果这一层没统一，前端后端都会越来越乱。最稳的做法是先定义查询协议，再让控件适配协议。',
    bestFor: ['检索列表', '报表系统', '审批台账', '运营管理页'],
    focus: [
      '控件值与接口参数之间有明确映射层',
      '日期、区间、多选等复杂条件统一序列化规则',
      '默认条件、固定条件、用户输入条件分层存放',
    ],
    risks: [
      '每个页面自己组装查询参数',
      '同类控件在不同页面传参格式不一致',
      '重置和回显时无法准确还原',
    ],
    language: 'ts',
    code: `type FilterQuery = {
  keyword?: string
  statusList?: string[]
  dateStart?: string
  dateEnd?: string
}`,
  },
  {
    order: '02',
    title: '把查询触发策略抽出来，别让每个字段自己随缘发请求',
    tag: '触发策略',
    description:
      '搜索词适合防抖即时查询，复杂高级筛选更适合用户点按钮统一执行。如果没有清晰触发策略，页面就会出现输入一个字符查一次、改个日期又查一次、还没选完组织树就已经发了三次请求的混乱体验。',
    bestFor: ['搜索密集列表', '高级筛选面板', '实时搜索页', '后台运营检索页'],
    focus: [
      '字段级别区分即时查询和手动查询',
      '防抖、去抖和取消前一次请求统一处理',
      '高级筛选统一由“查询”按钮触发',
    ],
    risks: [
      '输入过程频繁触发请求',
      '联动字段中间态也被错误查询',
      '查询按钮和即时查询混用导致状态不一致',
    ],
    language: 'ts',
    code: `const triggerSearch = (mode: 'debounced' | 'manual') => {
  if (mode === 'debounced') {
    debounceFetch()
    return
  }
  fetchList()
}`,
  },
  {
    order: '03',
    title: '条件缓存、URL 同步和返回回显要统一，否则列表体验会很差',
    tag: '状态恢复',
    description:
      '用户从列表进入详情再返回，如果筛选条件全丢，就会非常挫败。成熟做法通常会在 URL、store 或 session 里保留筛选状态，并明确页面初始化优先读取哪一层，这样刷新、分享、回退都能维持较稳定的查询上下文。',
    bestFor: [
      '长列表管理页',
      '多标签后台',
      '报表查询页',
      '需要分享筛选结果的页面',
    ],
    focus: [
      '定义 URL、缓存、默认值的优先级',
      '页面初始化时统一做条件恢复',
      '重置操作只重置可重置条件',
    ],
    risks: [
      '详情返回后筛选状态全部丢失',
      'URL 和缓存冲突，导致页面回显错乱',
      '清空条件时把固定默认值也误删',
    ],
    language: 'ts',
    code: `const restoreFilterState = () => {
  const queryState = parseRouteQuery()
  return queryState ?? loadSessionState() ?? defaultFilterState
}`,
  },
];

const comparisonCards = [
  {
    title: '即时查询',
    summary: '适合简单关键词和轻量筛选，但字段一多就容易产生噪音请求。',
  },
  {
    title: '手动查询',
    summary: '适合复杂高级筛选，用户心智稳定，但交互反馈要足够明确。',
  },
  {
    title: '条件草稿',
    summary: '适合高复杂筛选台账系统，能保存用户工作上下文，但实现成本更高。',
  },
];

const checklist = [
  '先统一查询协议，再让控件适配，不要反过来。',
  '即时查询和手动查询的触发策略要明确。',
  '联动字段中间态不要误发请求。',
  '筛选条件要支持返回回显、刷新恢复和必要的 URL 同步。',
  '重置逻辑要区分默认条件、固定条件和用户输入条件。',
  '复杂筛选面板要有已选条件摘要，方便用户理解当前过滤范围。',
];
</script>
