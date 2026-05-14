<template>
  <FullstackCapabilityArticle
    eyebrow="Frontend Dictionary Engineering"
    title="前端字典管理工程"
    summary="字典管理不是做几个下拉选项那么简单。真正落到业务系统里，它涉及字典拉取、缓存策略、版本刷新、展示映射、权限裁剪和多端一致性。只要项目稍微复杂，字典能力就应该被抽成独立工程，而不是散落在每个页面里各自请求一遍。"
    :outcomes="outcomes"
    :quick-stages="quickStages"
    decision-title="字典管理先统一来源与缓存层，再设计映射、失效和回退机制"
    :guide-stages="guideStages"
    comparison-title="页面内硬编码、本地缓存字典中心、可控版本字典平台三种路线的差异"
    :comparison-cards="comparisonCards"
    checklist-title="字典管理上线前必须补齐的 6 个点"
    :checklist="checklist"
  />
</template>

<script setup lang="ts">
import FullstackCapabilityArticle from '@/components/FullstackCapabilityArticle.vue';

const outcomes = [
  '能把下拉选项、状态文案、标签色值等字典能力统一抽到平台层，而不是散落在业务页面里重复维护。',
  '能设计字典缓存、失效、版本刷新和兜底展示，让页面首屏、联调和线上发布更稳定。',
  '能为多模块后台、医疗系统、运营平台沉淀可靠的前端字典管理方案。',
];

const quickStages = [
  {
    order: '01',
    title: '先统一字典来源',
    summary: '哪些字典后端下发，哪些本地维护，必须先分清。',
  },
  {
    order: '02',
    title: '加缓存层',
    summary: '同一份字典不要每个页面各拉一次。',
  },
  {
    order: '03',
    title: '展示映射统一',
    summary: '值转文案、值转标签色、值转图标都要收口。',
  },
  {
    order: '04',
    title: '考虑版本刷新',
    summary: '字典更新后前端何时失效、何时重拉，要有机制。',
  },
  {
    order: '05',
    title: '兜底要明确',
    summary: '缺失字典项时页面不能直接空白或报错。',
  },
];

const guideStages = [
  {
    order: '01',
    title: '字典能力要从页面里抽出来，形成统一的字典中心',
    tag: '来源治理',
    description:
      '很多项目一开始都在页面里直接请求字典接口，或者把状态文案硬编码在组件里。短期看快，长期会变成维护灾难。更稳的做法是建设统一字典中心，负责加载、缓存、映射和失效，这样所有页面都从同一入口消费字典。',
    bestFor: ['后台管理系统', '医疗表单系统', '运营平台', '多模块单页应用'],
    focus: [
      '页面只关心拿到字典结果，不直接处理接口细节',
      '同类字典通过统一 key 管理',
      '字典加载、重试和错误兜底集中处理',
    ],
    risks: [
      '页面各自请求字典，重复拉取严重',
      '同一状态值在不同页面展示不同文案',
      '字典接口变更时全项目需要分散修改',
    ],
    language: 'ts',
    code: `type DictionaryItem = {
  value: string
  label: string
  color?: string
}

type DictionaryMap = Record<string, DictionaryItem[]>`,
  },
  {
    order: '02',
    title: '字典不只是下拉选项，还承担值到展示层的完整映射',
    tag: '展示映射',
    description:
      '成熟项目里的字典通常不只是给表单用。列表状态文案、tag 颜色、审批阶段图标、禁用原因、枚举说明，都应该和字典层打通。这样字典才能真正成为“值到展示”的中枢，而不是几组 option 数组。',
    bestFor: ['列表页', '详情页', '表单页', '审计追踪页'],
    focus: [
      '值转文案、值转颜色、值转图标统一封装',
      '业务组件只消费映射结果',
      '缺失映射时有统一 fallback',
    ],
    risks: [
      '页面里写大量 switch/case 做文案转换',
      '状态标签颜色在不同模块不一致',
      '新增枚举值后漏改某些页面',
    ],
    language: 'ts',
    code: `const resolveDictionaryLabel = (
  list: DictionaryItem[],
  value: string,
) => list.find((item) => item.value === value)?.label ?? '--'`,
  },
  {
    order: '03',
    title: '缓存、版本和失效策略不清楚，字典中心一样会失控',
    tag: '缓存策略',
    description:
      '字典虽然体量不大，但如果没有缓存与失效策略，页面依然会反复请求，或者长时间拿到旧值。成熟做法通常会为字典加内存缓存、会话缓存或版本号比对，并明确什么时候主动刷新、什么时候延迟刷新。',
    bestFor: [
      '高频列表系统',
      '大后台平台',
      '多标签页应用',
      '需要离线兜底的系统',
    ],
    focus: [
      '定义缓存层级：内存、session、local',
      '版本号或更新时间驱动字典失效',
      '页面进入和系统刷新时的重拉策略一致',
    ],
    risks: [
      '页面频繁重复请求同一字典',
      '字典更新后用户长时间看到旧文案',
      '刷新和切页后字典行为不一致',
    ],
    language: 'ts',
    code: `type DictionaryCacheRecord = {
  version: string
  items: DictionaryItem[]
  updatedAt: number
}`,
  },
];

const comparisonCards = [
  {
    title: '页面内硬编码',
    summary: '开发最快，但维护成本极高，适合一次性 demo，不适合真实业务系统。',
  },
  {
    title: '本地缓存字典中心',
    summary: '适合大多数后台项目，成本和收益平衡较好，是最实用的方案。',
  },
  {
    title: '可控版本字典平台',
    summary: '适合大型平台和多端系统，治理能力最强，但需要更完整的配套机制。',
  },
];

const checklist = [
  '字典加载要统一入口，不要分散到各页面。',
  '值转文案、颜色、图标等映射要统一封装。',
  '缓存层级和失效策略要明确。',
  '缺失字典项时必须有稳定兜底展示。',
  '新增字典值时要保证历史页面不崩。',
  '接口异常、离线状态和旧版本缓存都要能回退。',
];
</script>
