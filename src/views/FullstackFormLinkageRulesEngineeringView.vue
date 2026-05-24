<template>
  <FullstackCapabilityArticle
    eyebrow="Frontend Form Linkage Rules"
    title="前端表单联动规则工程"
    summary="真正复杂的表单不是把字段堆上去，而是字段之间有显示、禁用、联动、校验和默认值规则。成熟的前端不会把这些 if/else 散在组件里，而是把表单规则抽成可维护的联动系统。"
    :outcomes="outcomes"
    :quick-stages="quickStages"
    decision-title="先抽字段模型与联动规则，再让表单渲染层消费规则结果"
    :guide-stages="guideStages"
    comparison-title="页面硬编码、简单 watch 联动、规则化表单联动三种方式的差异"
    :comparison-cards="comparisonCards"
    checklist-title="表单联动规则工程上线前必须确认的 6 个点"
    :checklist="checklist"
  />
</template>

<script setup lang="ts">
import FullstackCapabilityArticle from '@/components/FullstackCapabilityArticle.vue';

const outcomes = [
  '能把显隐、禁用、必填、默认值等联动从页面逻辑中抽离出来。',
  '能为复杂审批表单、医疗录入单和配置表单提供统一规则层。',
  '能减少表单一复杂就到处写 watch 和 if/else 的失控状态。',
];

const quickStages = [
  {
    order: '01',
    title: '先定义字段模型',
    summary: '字段基础属性、值和校验入口先统一。',
  },
  {
    order: '02',
    title: '联动规则结构化',
    summary: '显隐、禁用、默认值规则都要可配置。',
  },
  {
    order: '03',
    title: '规则驱动渲染',
    summary: '页面只消费规则结果，不直接写判断。',
  },
  {
    order: '04',
    title: '支持依赖刷新',
    summary: '上游字段变更后要重新计算联动状态。',
  },
  {
    order: '05',
    title: '保存前统一校验',
    summary: '校验规则和联动规则不能互相打架。',
  },
];

const guideStages = [
  {
    order: '01',
    title: '表单复杂后，页面直写联动几乎必然失控',
    tag: '抽象字段',
    description:
      '当字段变多、依赖关系增多时，页面里堆 watch 和条件判断会迅速不可维护。更稳的做法是先统一字段描述，再让规则围绕字段模型工作。',
    bestFor: ['审批表单', '病历录入', '问卷配置', '活动配置页'],
    focus: ['字段模型', '统一渲染层', '规则和视图解耦'],
    risks: ['组件里堆满判断', '字段语义不一致', '一改一个联动全表单炸'],
    language: 'ts',
    code: `type FieldSchema = {
  key: string
  visible: boolean
  disabled: boolean
  required: boolean
}`,
  },
  {
    order: '02',
    title: '联动规则最好结构化，不要散落在 watch 里',
    tag: '规则化',
    description:
      '成熟做法是把“当 A=1 时显示 B、当 C>10 时禁用 D”抽成规则对象，统一交给规则引擎或计算层执行，而不是在多个组件里分别写死。',
    bestFor: ['多步骤表单', '动态表单', '规则多变场景'],
    focus: ['条件表达式', '规则优先级', '统一计算入口'],
    risks: ['规则散在多个组件', '调试困难', '新增规则需要改多个地方'],
    language: 'ts',
    code: `type LinkageRule = {
  when: string
  effect: 'show' | 'hide' | 'disable' | 'require'
  target: string
}`,
  },
  {
    order: '03',
    title: '联动和校验要协同，而不是各做各的',
    tag: '协同',
    description:
      '如果某个字段被隐藏了，是否还需要校验？如果字段被禁用，提交时是否要带值？这些都不能等到页面里临时判断，而是要在规则层就统一语义。',
    bestFor: ['复杂录入', '审批流', '配置中心'],
    focus: ['隐藏字段校验', '禁用字段提交', '联动后回填清理'],
    risks: ['隐藏字段仍报错', '禁用字段误提交', '联动后脏值残留'],
    language: 'ts',
    code: `const shouldValidate = field.visible && field.required`,
  },
];

const comparisonCards = [
  { title: '页面硬编码', summary: '前期快，但复杂度上来后最容易失控。' },
  {
    title: '简单 watch 联动',
    summary: '够用但可维护性一般，适合中等复杂度表单。',
  },
  { title: '规则化联动', summary: '更适合重业务、可配置、联动复杂的场景。' },
];

const checklist = [
  '字段模型和渲染层先统一。',
  '联动规则必须结构化。',
  '上游字段变化后要能重算所有依赖。',
  '联动结果要和校验规则协同。',
  '隐藏或禁用字段的提交策略要明确。',
  '不要把规则散写在多个页面组件里。',
];
</script>
