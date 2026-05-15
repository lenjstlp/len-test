<template>
  <FullstackCapabilityArticle
    eyebrow="Frontend API Adapter Engineering"
    title="前端接口适配层工程"
    summary="接口适配层工程不是多封一层函数那么简单。真正的适配层要承接字段兼容、错误归一、分页协议统一、枚举转换、版本过渡和多后端差异，让页面永远面对稳定的前端协议，而不是直接暴露在接口波动面前。"
    :outcomes="outcomes"
    :quick-stages="quickStages"
    decision-title="接口适配层先统一输入输出协议，再治理兼容、错误和版本差异"
    :guide-stages="guideStages"
    comparison-title="页面直连接口、模块内轻适配、完整 adapter 层三种路线的差异"
    :comparison-cards="comparisonCards"
    checklist-title="接口适配层工程上线前必须补齐的 6 个点"
    :checklist="checklist"
  />
</template>

<script setup lang="ts">
import FullstackCapabilityArticle from '@/components/FullstackCapabilityArticle.vue';

const outcomes = [
  '能把后端协议波动隔离在 adapter 层，不再让页面直接承担字段兼容和错误兜底。',
  '能统一分页、列表、详情、提交等接口输入输出模型，降低联调和演进成本。',
  '能为多后端、多版本并存的系统建立稳定的前端接口适配工程。',
];

const quickStages = [
  {
    order: '01',
    title: '先定前端协议',
    summary: '页面真正消费什么结构，先由前端自己定义清楚。',
  },
  {
    order: '02',
    title: '后端差异收口',
    summary: '字段名、状态码、分页格式差异都要收进 adapter。',
  },
  {
    order: '03',
    title: '错误统一表达',
    summary: '页面不应该直接面对各接口各自不同的错误结构。',
  },
  {
    order: '04',
    title: '版本兼容内聚',
    summary: '旧字段到新字段的过渡逻辑不要散在业务组件里。',
  },
  {
    order: '05',
    title: '输入输出双向治理',
    summary: '请求参数和响应数据都需要适配，不只是响应。',
  },
];

const guideStages = [
  {
    order: '01',
    title: '接口适配层的核心目标，是把“后端协议”翻译成“前端稳定协议”',
    tag: '协议翻译',
    description:
      '如果页面直接吃后端接口，后端一改字段名、分页格式或错误码，前端就会到处受影响。适配层的本质，是在接口和业务页面之间建立翻译层，让页面始终面对稳定的前端协议，接口怎么变都先在 adapter 层吸收。',
    bestFor: [
      '大型后台',
      '多团队协作系统',
      '多版本接口并存项目',
      '复杂列表详情系统',
    ],
    focus: [
      '页面只依赖前端定义的稳定模型',
      '后端变化优先在 adapter 层处理',
      '输入参数和输出结果都统一翻译',
    ],
    risks: [
      '页面直接取后端字段，协议一变全站修补',
      '同类接口在不同页面被各自适配',
      '联调时页面里堆满兼容逻辑',
    ],
    language: 'ts',
    code: `type PageResult<T> = {
  list: T[]
  total: number
}`,
  },
  {
    order: '02',
    title: '分页、错误、枚举和空值，是接口适配里最值得优先统一的四类问题',
    tag: '统一治理',
    description:
      '很多接口表面能用，但分页字段有的叫 `records`，有的叫 `items`；错误消息有的是 `message`，有的是 `msg`；空值有的给 `null`，有的给空串。这些细碎差异会把页面拖得很脏。adapter 层应该优先统一这些高频差异。',
    bestFor: ['列表页', '详情页', '查询接口', '多来源数据聚合页'],
    focus: [
      '分页结构统一成固定前端模型',
      '错误对象统一成一套页面可消费的格式',
      '枚举、空值和默认值在 adapter 层补齐',
    ],
    risks: [
      '不同页面对同一类错误展示不一致',
      '分页列表每页都自己写一套映射',
      '空值判断散落在模板和脚本中',
    ],
    language: 'ts',
    code: `const adaptListResponse = <T>(
  response: { items?: T[]; records?: T[]; total?: number },
): PageResult<T> => ({
  list: response.items ?? response.records ?? [],
  total: response.total ?? 0,
})`,
  },
  {
    order: '03',
    title: 'adapter 层真正的工程价值，在于承接接口演进和多源系统接入',
    tag: '版本过渡',
    description:
      '当一个系统接两个后端、或者接口从 v1 平滑升级到 v2 时，adapter 层几乎是唯一合理的收口点。它可以让页面完全不知道后端来自哪里，只关心最终能拿到什么。这样升级、切换和灰度都会稳定很多。',
    bestFor: ['多后端项目', '版本迁移项目', 'BFF 协作场景', '灰度升级系统'],
    focus: [
      '接口版本差异集中封装',
      '多来源接口输出统一成同一前端模型',
      '灰度切换和兼容逻辑不会污染页面',
    ],
    risks: [
      '版本迁移期间页面层充满 if/else',
      '相同页面接不同后端时适配逻辑分叉',
      '联调和排障时难以判断问题出在哪层',
    ],
    language: 'ts',
    code: `const adaptPatientDetail = (response: Record<string, unknown>) => ({
  patientName: response.patient_name ?? response.name ?? '--',
})`,
  },
];

const comparisonCards = [
  {
    title: '页面直连接口',
    summary: '开发初期快，但页面会越来越脏，几乎没有协议治理能力。',
  },
  {
    title: '模块内轻适配',
    summary: '适合中等复杂度项目，能局部稳定页面结构，但全局一致性有限。',
  },
  {
    title: '完整 adapter 层',
    summary: '适合大型项目和长期演进系统，治理能力最强，但规范要求更高。',
  },
];

const checklist = [
  '页面只依赖前端稳定协议，不直接暴露后端字段细节。',
  '分页、错误、枚举和空值要优先统一治理。',
  '请求参数和响应结果都要有 adapter。',
  '接口版本兼容逻辑要集中，不要散落页面。',
  '多后端接入场景必须收口到统一模型。',
  'adapter 层最好能独立测试和排查。',
];
</script>
