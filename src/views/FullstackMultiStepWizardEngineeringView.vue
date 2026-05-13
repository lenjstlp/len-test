<template>
  <FullstackCapabilityArticle
    eyebrow="Frontend Multi Step Wizard Engineering"
    title="前端多步骤向导工程"
    summary="多步骤向导不是把一个大表单拆成几屏那么简单。真正做成工程时，它涉及步骤流转、跨步校验、局部保存、回退编辑、条件分支和最终汇总页。它本质上是在把复杂流程拆成可推进、可恢复、可回看的一条链。"
    :outcomes="outcomes"
    :quick-stages="quickStages"
    decision-title="多步骤向导先定义步骤状态机，再接表单校验、草稿恢复和条件跳转"
    :guide-stages="guideStages"
    comparison-title="单页长表单、固定多步骤、条件分支向导三种实现路线的差异"
    :comparison-cards="comparisonCards"
    checklist-title="多步骤向导上线前必须补齐的 6 个点"
    :checklist="checklist"
  />
</template>

<script setup lang="ts">
import FullstackCapabilityArticle from '@/components/FullstackCapabilityArticle.vue';

const outcomes = [
  '能把复杂表单拆成清晰步骤，并为每一步建立独立校验与保存边界。',
  '能处理步骤跳转、回退编辑、条件分支和草稿恢复，不再把流程写成一串按钮事件。',
  '能为开户、建档、病例录入、配置创建等复杂流程设计稳定的向导式前端方案。',
];

const quickStages = [
  {
    order: '01',
    title: '先画步骤图',
    summary: '哪些步骤固定、哪些步骤可跳过，要先定义清楚。',
  },
  {
    order: '02',
    title: '每步独立校验',
    summary: '不要把所有校验都压到最终提交。',
  },
  {
    order: '03',
    title: '中途可保存',
    summary: '长流程向导几乎都需要草稿或断点恢复。',
  },
  {
    order: '04',
    title: '条件分支显式化',
    summary: '某一步是否出现，最好由规则决定而不是写死。',
  },
  {
    order: '05',
    title: '汇总页可回看',
    summary: '最终提交前要能让用户回到上一步修正内容。',
  },
];

const guideStages = [
  {
    order: '01',
    title: '步骤要先建成状态机，不要只靠 currentStep 数字硬顶',
    tag: '流程建模',
    description:
      '简单向导用数字索引还能撑住，但一旦出现跳步、回退、条件分支、完成态和草稿态，仅靠一个 `currentStep` 很快不够用。更稳的做法是把步骤抽成状态机，明确每一步的进入条件、离开条件和完成条件。',
    bestFor: ['建档流程', '开通流程', '配置向导', '注册引导'],
    focus: [
      '步骤定义包含状态、前置条件和完成条件',
      '前进和后退都走统一状态流转',
      '流程图与页面实现保持一一对应',
    ],
    risks: [
      '只用数字索引管理步骤',
      '分支流程靠大量 if 切换',
      '回退后状态恢复不完整',
    ],
    language: 'ts',
    code: `type WizardStep = {
  key: string
  title: string
  enabled: boolean
  completed: boolean
}`,
  },
  {
    order: '02',
    title: '每一步都要有自己的数据边界和校验边界',
    tag: '步骤校验',
    description:
      '向导页的意义就在于把复杂任务拆成更小的认知单元，所以每一步都应该有局部数据模型和局部校验。用户点“下一步”时，校验当前步即可；最终提交时，再做一次全局汇总校验。这比所有字段最后一起报错体验好得多。',
    bestFor: ['长表单流程', '分段录入', '多角色填报', '复杂配置创建'],
    focus: [
      '局部校验先过再允许进入下一步',
      '每步数据单独缓存，支持中途恢复',
      '最终页做全局一致性复核',
    ],
    risks: [
      '只在最后一步统一报错',
      '步骤之间数据互相污染',
      '前面步骤改动后未触发后续步骤重校验',
    ],
    language: 'ts',
    code: `const canEnterNextStep = async (stepKey: string) => {
  await validateStep(stepKey)
  return true
}`,
  },
  {
    order: '03',
    title: '条件分支要由规则控制，不要把隐藏步骤当作不存在',
    tag: '分支流程',
    description:
      '比如企业开户时，若选择“个体工商户”，法人信息步骤可能必填；若选择“企业”，股东信息步骤才出现。这种逻辑应该由步骤规则明确控制，而不是简单 `v-if` 掉 UI。否则回退、草稿恢复、汇总页展示都会出问题。',
    bestFor: [
      '开户流程',
      '建档流程',
      '按类型走不同路径的表单',
      '可配置流程平台',
    ],
    focus: [
      '步骤显隐与业务条件绑定',
      '隐藏步骤的数据有明确清理或保留策略',
      '汇总页只展示当前分支真正生效的数据',
    ],
    risks: [
      '隐藏步骤残留脏数据',
      '回退后步骤顺序错乱',
      '草稿恢复时走入错误分支',
    ],
    language: 'ts',
    code: `const visibleSteps = computed(() =>
  allSteps.filter((step) => step.when(formValue.value)),
)`,
  },
];

const comparisonCards = [
  {
    title: '单页长表单',
    summary: '适合简单录入，但认知负担大，不利于长流程分段完成。',
  },
  {
    title: '固定多步骤',
    summary: '适合流程稳定的引导页，实现相对直接，但分支能力有限。',
  },
  {
    title: '条件分支向导',
    summary: '适合复杂业务流程，扩展性强，但对状态管理要求更高。',
  },
];

const checklist = [
  '步骤定义要包含启用、完成、进入条件等信息。',
  '每一步要有独立校验和独立数据边界。',
  '中途保存、草稿恢复和最终提交流程要统一设计。',
  '条件分支必须通过规则控制，不要只做视觉隐藏。',
  '回退编辑后要重算后续步骤的状态和校验结果。',
  '汇总页要支持定位回对应步骤修正数据。',
];
</script>
