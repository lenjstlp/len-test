<template>
  <FullstackCapabilityArticle
    eyebrow="Frontend Release Workflow Engineering"
    title="前端配置发布工程"
    summary="配置发布工程不是把保存按钮换成发布按钮就结束了。真正上线后，它会牵涉草稿、审批、环境隔离、灰度范围、生效时间、回滚版本和审计留痕。只要配置能影响业务，发布链路就必须被当成正式工程能力来设计。"
    :outcomes="outcomes"
    :quick-stages="quickStages"
    decision-title="配置发布先拆清草稿与正式态，再治理审批、灰度、生效和回滚"
    :guide-stages="guideStages"
    comparison-title="直接覆盖、受控发布、审批灰度发布三种路线的差异"
    :comparison-cards="comparisonCards"
    checklist-title="配置发布工程上线前必须补齐的 6 个点"
    :checklist="checklist"
  />
</template>

<script setup lang="ts">
import FullstackCapabilityArticle from '@/components/FullstackCapabilityArticle.vue';

const outcomes = [
  '能把草稿、发布、灰度、回滚和审计串成完整配置发布链路，而不是停留在单次保存覆盖。',
  '能为配置中心、规则平台、审批模板系统设计更安全的发布工程。',
  '能处理环境隔离、审批确认和发布时间控制等真实高风险场景。',
];

const quickStages = [
  {
    order: '01',
    title: '草稿和正式态分离',
    summary: '编辑中的配置和线上生效配置不能混在一起。',
  },
  {
    order: '02',
    title: '发布动作受控',
    summary: '高风险配置发布要有审批、确认和权限门槛。',
  },
  {
    order: '03',
    title: '支持灰度',
    summary: '范围、租户、环境、时间窗口都可能成为灰度维度。',
  },
  {
    order: '04',
    title: '回滚要顺滑',
    summary: '发布失败后要能快速恢复到上一版。',
  },
  {
    order: '05',
    title: '审计要完整',
    summary: '谁在什么时候发布了什么配置，必须可追踪。',
  },
];

const guideStages = [
  {
    order: '01',
    title: '配置发布的第一原则，是编辑态和生效态必须彻底分离',
    tag: '状态分层',
    description:
      '很多系统事故不是改错配置，而是把未验证的草稿直接变成线上生效值。真正成熟的配置发布，必须先区分草稿态、待发布态、已发布态，再围绕这些状态设计 UI、权限和操作链路。前端如果没把状态分清，后面灰度和回滚也会很乱。',
    bestFor: ['配置中心', '规则平台', '模板系统', '业务开关平台'],
    focus: [
      '草稿、待审核、已发布等状态清晰建模',
      '页面展示和操作按钮跟状态绑定',
      '保存草稿和正式发布不是同一个动作',
    ],
    risks: [
      '编辑中的配置直接覆盖线上配置',
      '用户搞不清当前看到的是草稿还是正式版本',
      '状态流转逻辑散落在页面事件里',
    ],
    language: 'ts',
    code: `type ReleaseStatus =
  | 'draft'
  | 'reviewing'
  | 'scheduled'
  | 'published'
  | 'rolled-back'`,
  },
  {
    order: '02',
    title: '发布链路真正的复杂度，在于审批、灰度和生效窗口',
    tag: '发布控制',
    description:
      '一个配置改动可能只想对某个租户、某个环境或某段时间生效，还可能需要上级审批后才能发。这意味着发布链路不能只是点击即生效，而要把审批人、范围、发布时间、灰度策略都纳入前端交互模型。',
    bestFor: ['高风险业务配置', '多租户系统', '规则平台', '灰度运营系统'],
    focus: [
      '审批信息、灰度范围和生效时间统一建模',
      '发布弹窗能清楚展示影响面',
      '高风险发布动作需要显式确认',
    ],
    risks: [
      '发布范围不清导致误伤全量用户',
      '配置无审批直接上生产',
      '生效时间和当前环境信息展示不清',
    ],
    language: 'ts',
    code: `type ReleasePlan = {
  env: 'test' | 'staging' | 'prod'
  scope: string[]
  effectiveAt?: string
}`,
  },
  {
    order: '03',
    title: '发布工程的价值，不止“发出去”，更在于失败后能回退、能审计',
    tag: '回退审计',
    description:
      '真正成熟的配置发布，必须同时设计好失败回滚和发布留痕。前端需要在发布成功后刷新当前生效版本、更新时间线和回滚入口；发布失败时则要把错误、影响范围和恢复手段展示清楚，而不是只弹一句“发布失败”。',
    bestFor: ['企业后台', '配置平台', '复杂审批系统', '线上高风险控制台'],
    focus: [
      '发布成功后更新当前版本和审计信息',
      '回滚入口与发布记录打通',
      '失败反馈包含可执行的恢复路径',
    ],
    risks: [
      '发布成功但页面仍显示旧版本',
      '出问题后找不到上一版回滚入口',
      '发布记录无法支撑事故追踪',
    ],
    language: 'ts',
    code: `const publishConfig = async (plan: ReleasePlan) => {
  await submitReleasePlan(plan)
  await refreshCurrentRelease()
  await refreshReleaseHistory()
}`,
  },
];

const comparisonCards = [
  {
    title: '直接覆盖',
    summary: '实现最轻，但风险最高，只适合低风险演示场景。',
  },
  {
    title: '受控发布',
    summary: '适合一般业务配置，能显著降低误发布风险。',
  },
  {
    title: '审批灰度发布',
    summary: '适合高风险系统，上线纪律最好，但流程成本更高。',
  },
];

const checklist = [
  '草稿态和正式态必须清晰分离。',
  '发布链路要能表达审批、范围、时间和环境信息。',
  '高风险操作必须有确认或审批门槛。',
  '发布成功后要同步刷新当前版本和记录。',
  '回滚入口必须和发布记录打通。',
  '审计日志要能说明谁在何时发布了什么。',
];
</script>
