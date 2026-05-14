<template>
  <FullstackCapabilityArticle
    eyebrow="Frontend Field Schema Engineering"
    title="前端字段配置工程"
    summary="字段配置工程不是做一个动态表单渲染器就结束了。真正进入业务阶段后，它要同时覆盖列表列配置、搜索条件、详情展示、校验规则、显隐联动和角色裁剪，本质上是在构建一套前端字段协议。"
    :outcomes="outcomes"
    :quick-stages="quickStages"
    decision-title="字段配置先定义 schema 协议，再统一渲染、联动、校验和权限裁剪"
    :guide-stages="guideStages"
    comparison-title="静态写死字段、局部动态渲染、完整 schema 驱动三种路线的差异"
    :comparison-cards="comparisonCards"
    checklist-title="字段配置工程上线前必须补齐的 6 个点"
    :checklist="checklist"
  />
</template>

<script setup lang="ts">
import FullstackCapabilityArticle from '@/components/FullstackCapabilityArticle.vue';

const outcomes = [
  '能把表单、详情、列表等字段展示抽成统一 schema，而不是每个页面都重复描述同一批业务字段。',
  '能处理字段显隐、必填、只读、校验和角色裁剪等配置型需求，降低中后台迭代成本。',
  '能为低代码后台、配置型表单、医疗建档系统沉淀可靠的字段配置方案。',
];

const quickStages = [
  {
    order: '01',
    title: '先定 schema',
    summary: '字段 key、组件类型、校验规则、权限规则先统一协议。',
  },
  {
    order: '02',
    title: '渲染层解耦',
    summary: '页面不要直接操作字段细节，而是消费 schema 渲染结果。',
  },
  {
    order: '03',
    title: '联动规则集中',
    summary: '显隐、禁用、必填联动不能散落在模板里。',
  },
  {
    order: '04',
    title: '校验跟着字段走',
    summary: '字段配置变了，校验逻辑也要自动同步。',
  },
  {
    order: '05',
    title: '权限裁剪前置',
    summary: '哪些角色能看、能改、能提交，要进 schema 层。',
  },
];

const guideStages = [
  {
    order: '01',
    title: '字段 schema 的核心价值，是让同一份业务字段定义服务多个视图',
    tag: '协议定义',
    description:
      '一个患者姓名字段，不应该在搜索区写一遍、表单里写一遍、详情页再写一遍。更成熟的做法是定义统一 schema，让组件类型、标签、占位、枚举、校验和权限都挂在同一份协议上，再由不同渲染器消费。',
    bestFor: ['动态表单', '配置型列表页', '详情页生成', '多角色录入系统'],
    focus: [
      '同一字段定义被多处复用',
      '字段协议同时描述展示和行为',
      '业务字段变更时能集中调整',
    ],
    risks: [
      '同一个字段在不同页面定义不一致',
      '新增字段需要改多个视图文件',
      '联动与校验逻辑重复实现',
    ],
    language: 'ts',
    code: `type FieldSchema = {
  key: string
  label: string
  component: 'input' | 'select' | 'date' | 'switch'
  required?: boolean
}`,
  },
  {
    order: '02',
    title: '动态渲染只是第一步，字段联动和权限裁剪才是真复杂度来源',
    tag: '联动裁剪',
    description:
      '很多项目做到“根据 component 渲染不同控件”就停了，但真实难点在于：字段会因为值变化而显隐、因为角色不同而只读、因为业务状态不同而禁用。这些规则如果不进入 schema 层，最终还是会回到页面里写一堆 if。',
    bestFor: ['审批流表单', '多角色台账', '分支录入流程', '配置后台'],
    focus: [
      '显隐、禁用、只读等规则跟随字段定义',
      '规则执行引擎统一计算字段状态',
      '角色与业务状态对字段的影响可配置化',
    ],
    risks: [
      '页面模板中堆满 v-if 和 disabled 判断',
      '同一字段在不同角色下行为不一致',
      '联动规则难以测试和复用',
    ],
    language: 'ts',
    code: `type FieldRuleContext = {
  role: string
  formValue: Record<string, unknown>
  bizStatus: string
}`,
  },
  {
    order: '03',
    title: '字段配置工程最终要落到“可维护”，不是追求无限动态',
    tag: '工程边界',
    description:
      '字段 schema 并不意味着什么都动态化。成熟做法是把高复用、强规则、变化频繁的部分抽进 schema，而把复杂交互组件保留在业务层。这样才能平衡灵活性与可维护性，避免把系统做成难以调试的动态黑盒。',
    bestFor: ['配置驱动后台', '医疗建档', '复杂录入系统', '低代码扩展层'],
    focus: [
      '区分可配置字段和定制交互组件',
      'schema 只承担高价值复用部分',
      '调试、测试和回溯链路保持清晰',
    ],
    risks: [
      '什么都想抽动态，最终变成维护灾难',
      'schema 协议膨胀过快，难以演进',
      '排查字段异常时定位困难',
    ],
    language: 'ts',
    code: `const shouldRenderField = (
  schema: FieldSchema,
  context: FieldRuleContext,
) => true`,
  },
];

const comparisonCards = [
  {
    title: '静态写死字段',
    summary: '简单直接，但复用差，一旦字段频繁变化就会迅速失控。',
  },
  {
    title: '局部动态渲染',
    summary: '适合中等复杂度系统，能覆盖大部分常见字段配置需求。',
  },
  {
    title: '完整 schema 驱动',
    summary: '适合高配置型平台，扩展性最强，但协议设计要求非常高。',
  },
];

const checklist = [
  '字段 key、展示类型、校验规则要统一 schema 协议。',
  '显隐、禁用、只读规则要集中管理。',
  '字段配置要同时考虑表单、列表和详情复用。',
  '不要把所有复杂交互都强塞进 schema。',
  '字段变更要能快速定位影响面。',
  '调试、埋点和测试必须支持 schema 渲染链路。',
];
</script>
