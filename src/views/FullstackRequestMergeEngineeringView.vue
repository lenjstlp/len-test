<template>
  <FullstackCapabilityArticle
    eyebrow="Frontend Request Dedup Merge"
    title="前端请求去重合并工程"
    summary="列表刷新、搜索联想、用户详情和级联数据在复杂后台里经常被重复请求。真正成熟的前端不会任由多个相同请求同时打向后端，而是统一做去重、合并、复用和失效控制。"
    :outcomes="outcomes"
    :quick-stages="quickStages"
    decision-title="把相同请求的复用、合并和失效策略统一收口到请求层"
    :guide-stages="guideStages"
    comparison-title="页面各发各的、简单缓存、请求去重合并三种路线的差异"
    :comparison-cards="comparisonCards"
    checklist-title="请求去重合并工程上线前必须补齐的 6 个点"
    :checklist="checklist"
  />
</template>

<script setup lang="ts">
import FullstackCapabilityArticle from '@/components/FullstackCapabilityArticle.vue';

const outcomes = [
  '能把相同接口的并发请求统一合并，减少重复流量。',
  '能稳定处理列表刷新、详情回显和联想搜索中的重复请求。',
  '能把请求复用逻辑从页面里抽走，统一放进请求层或数据层。',
];

const quickStages = [
  {
    order: '01',
    title: '先定义相同请求',
    summary: 'url、method、参数序列化规则要统一。',
  },
  {
    order: '02',
    title: '并发请求合并',
    summary: '相同请求不要同时多次真正发出。',
  },
  {
    order: '03',
    title: '结果复用要可控',
    summary: '什么时候复用，什么时候失效要清楚。',
  },
  {
    order: '04',
    title: '错误也要清晰传递',
    summary: '合并后的失败结果不能吞掉。',
  },
  {
    order: '05',
    title: '支持取消与重发',
    summary: '旧请求失效后要能及时清除占位。',
  },
];

const guideStages = [
  {
    order: '01',
    title: '真正的“相同请求”要先统一判定规则',
    tag: '请求键',
    description:
      '如果你只是粗暴看 url，一些带参数的请求就会误判；如果页面各自定义一套 key，后面又会失控。成熟做法是统一用 method、path、query、body 生成稳定请求键。',
    bestFor: ['搜索联想', '用户详情', '配置加载', '级联字典'],
    focus: ['请求 key 规范', '参数序列化', '统一比较规则'],
    risks: ['页面各自拼 key', '同请求被判成不同', '不同请求被误合并'],
    language: 'ts',
    code: `const requestKey = JSON.stringify({
  method,
  url,
  params,
  data,
})`,
  },
  {
    order: '02',
    title: '去重合并的本质，是共享同一个进行中的 Promise',
    tag: '共享执行',
    description:
      '一旦发现同一个请求已经在飞，就不该再发第二次，而是把新的调用方挂到同一个 Promise 上等待结果。这比简单缓存更适合处理“并发同时发起”的场景。',
    bestFor: ['页面初始化', '多组件同取数', '弹窗和页面并发取详情'],
    focus: ['in-flight map', 'Promise 共享', '请求结束清理'],
    risks: ['相同请求重复打后端', 'Promise 清理时机错误', '失败后残留脏状态'],
    language: 'ts',
    code: `const inflight = new Map<string, Promise<unknown>>()`,
  },
  {
    order: '03',
    title: '去重不等于永久缓存，失效策略必须单独定义',
    tag: '失效控制',
    description:
      '请求去重解决的是“同一时间的重复发起”，而不是无限期复用旧结果。哪些请求只合并并发，哪些请求还要短时缓存，哪些请求必须强制重发，都需要单独设计。',
    bestFor: ['配置项', '列表刷新', '统计面板', '低频详情数据'],
    focus: ['并发合并', '短时缓存', '主动失效'],
    risks: ['把去重写成永久缓存', '旧数据一直复用', '用户触发刷新却拿旧结果'],
    language: 'ts',
    code: `const staleTime = 5_000`,
  },
];

const comparisonCards = [
  { title: '页面各发各的', summary: '实现最直接，但重复流量和状态抖动最多。' },
  { title: '简单缓存', summary: '能减少重复请求，但对并发飞行请求帮助有限。' },
  { title: '请求去重合并', summary: '更适合复杂后台的真实并发场景。' },
];

const checklist = [
  '统一定义请求 key 生成规则。',
  '对进行中的相同请求共享同一个 Promise。',
  '请求结束后及时清理 in-flight 状态。',
  '明确去重和缓存的边界。',
  '失败结果也要对所有调用方正确透传。',
  '支持主动刷新和失效控制。',
];
</script>
