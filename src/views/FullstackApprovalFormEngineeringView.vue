<template>
  <FullstackCapabilityArticle
    eyebrow="Frontend Approval Form Engineering"
    title="前端审批流表单联动工程"
    summary="审批表单真正难的从来不是画几个输入框，而是字段联动、流程条件、节点规则、草稿回填、审批意见以及不同节点看到的不同表单态。它本质上是“表单引擎 + 流程规则 + 权限视图”的组合问题。"
    :outcomes="outcomes"
    :quick-stages="quickStages"
    decision-title="审批流表单先拆模型、联动和节点态，再谈页面长什么样"
    :guide-stages="guideStages"
    comparison-title="静态表单、配置化表单、轻量表单引擎三种实现路线的边界"
    :comparison-cards="comparisonCards"
    checklist-title="审批流表单上线前必须补齐的 6 个点"
    :checklist="checklist"
  />
</template>

<script setup lang="ts">
import FullstackCapabilityArticle from '@/components/FullstackCapabilityArticle.vue';

const outcomes = [
  '能把字段定义、联动规则和节点权限拆开，不再把审批表单写成一整页 `if/else`。',
  '能处理发起态、审批态、抄送态、只读态等不同节点下的字段行为差异。',
  '能为医疗、财务、行政等重表单场景设计可扩展的前端审批表单方案。',
];

const quickStages = [
  {
    order: '01',
    title: '字段先结构化',
    summary: '字段元数据、校验、默认值和展示配置要先抽出来。',
  },
  {
    order: '02',
    title: '联动规则独立',
    summary: '显隐、禁用、必填切换不能散落在模板里。',
  },
  {
    order: '03',
    title: '节点态分层',
    summary: '发起人、审批人、抄送人看到的字段能力往往不同。',
  },
  {
    order: '04',
    title: '草稿与回填统一',
    summary: '临时保存、编辑重开、驳回重提要走同一套数据恢复逻辑。',
  },
  {
    order: '05',
    title: '流程条件可追踪',
    summary: '金额、部门、类型等字段如何决定流向，前端必须能表达和调试。',
  },
];

const guideStages = [
  {
    order: '01',
    title: '先做字段元数据层，不要从页面模板直接起手',
    tag: '表单建模',
    description:
      '审批单一多，最先失控的就是字段定义。稳妥方式是先建立字段元数据，包括字段类型、标签、默认值、校验规则、组件类型和布局信息，然后再把页面渲染建立在元数据之上。这样后续做动态配置、联动和节点权限才有抓手。',
    bestFor: ['OA 审批', '费用报销', '医疗申请单', '行政流程平台'],
    focus: [
      '字段定义与页面渲染分层',
      '校验规则挂在元数据层',
      '布局与值模型分开，避免 UI 和数据耦合',
    ],
    risks: [
      '字段全写死在页面模板里',
      '同一个字段在多个节点重复定义',
      '新增一个字段就要改多处逻辑',
    ],
    language: 'ts',
    code: `type FormFieldSchema = {
  field: string
  label: string
  component: 'input' | 'select' | 'date' | 'upload'
  required?: boolean
  defaultValue?: unknown
}`,
  },
  {
    order: '02',
    title: '把联动规则做成声明式条件，不要把模板变成大型条件树',
    tag: '规则联动',
    description:
      '审批表单里最常见的是“当类型为采购时显示供应商字段”“当金额超过阈值时必须上传附件”。这些逻辑如果直接写在模板里，后面任何一个字段改动都会牵一发而动全身。更稳的方式是把联动做成声明式规则，在表单值变化时统一求值。',
    bestFor: ['动态申请单', '多步骤审批', '条件分支流程', '复杂表单配置平台'],
    focus: [
      '显隐、禁用、必填统一走规则引擎',
      '联动计算在表单层集中执行',
      '页面模板只消费结果状态',
    ],
    risks: [
      '模板里遍地都是 v-if/v-show 条件',
      '联动链过长时无法排查',
      '字段状态和校验状态不同步',
    ],
    language: 'ts',
    code: `type FieldRule = {
  field: string
  effect: 'visible' | 'disabled' | 'required'
  when: (formValue: Record<string, unknown>) => boolean
}`,
  },
  {
    order: '03',
    title: '节点权限和表单态分开，别把审批流状态混进字段规则里',
    tag: '节点视图',
    description:
      '同一张单据在发起节点可编辑，在审批节点可能只能补充意见，在归档节点则完全只读。正确做法是把流程节点态抽成单独维度，再和字段联动结果叠加，最终得出“当前节点下该字段能不能看、能不能改、需不需要填”。',
    bestFor: ['驳回重提', '多级审批', '会签加签', '归档留痕页面'],
    focus: [
      '节点态独立于字段规则计算',
      '发起态、审批态、只读态有明确枚举',
      '表单组件最终只消费合成后的字段状态',
    ],
    risks: [
      '流程状态和字段逻辑混在一起',
      '不同节点复用同一表单时行为不一致',
      '驳回重提后字段状态无法恢复',
    ],
    language: 'ts',
    code: `const resolveFieldAbility = (
  nodeMode: 'draft' | 'approve' | 'readonly',
  visible: boolean,
  disabled: boolean,
) => ({
  visible,
  editable: nodeMode === 'draft' && !disabled,
})`,
  },
];

const comparisonCards = [
  {
    title: '静态表单',
    summary:
      '开发快，但只适合少量固定流程。一旦联动和节点态变多，维护成本会急剧上升。',
  },
  {
    title: '配置化表单',
    summary: '适合中等复杂度审批系统，能复用字段和规则，但要控制配置复杂度。',
  },
  {
    title: '轻量表单引擎',
    summary: '适合长期演进的平台型审批产品，前期设计成本高，但扩展性最好。',
  },
];

const checklist = [
  '字段元数据、联动规则、节点权限三层要明确拆开。',
  '草稿保存、驳回重提、详情回填必须走同一套还原逻辑。',
  '联动条件要可调试，避免线上只能靠猜。',
  '审批节点态要独立建模，不要混进字段定义里。',
  '上传、日期、金额等复杂字段要覆盖边界校验。',
  '流程条件变化时要能追踪是哪条规则触发了哪个节点分支。',
];
</script>
