<template>
  <FullstackCapabilityArticle
    eyebrow="Frontend Version Rollback Engineering"
    title="前端版本回滚工程"
    summary="版本回滚工程不是简单保留几份历史记录。真正有价值的回滚能力，要把版本快照、差异展示、风险提示、回滚审批和回滚后状态重建串成闭环，否则用户只会看到一堆“历史版本”而不敢点恢复。"
    :outcomes="outcomes"
    :quick-stages="quickStages"
    decision-title="版本回滚先确定快照粒度，再设计差异确认、权限审批和恢复策略"
    :guide-stages="guideStages"
    comparison-title="仅历史记录、可预览恢复、受控审批回滚三种路线的差异"
    :comparison-cards="comparisonCards"
    checklist-title="版本回滚工程上线前必须补齐的 6 个点"
    :checklist="checklist"
  />
</template>

<script setup lang="ts">
import FullstackCapabilityArticle from '@/components/FullstackCapabilityArticle.vue';

const outcomes = [
  '能把历史版本、差异预览、恢复确认和状态回写串成完整回滚流程，而不是停留在查看记录层面。',
  '能为模板系统、配置中心、表单修订、病历版本管理设计稳健的回滚能力。',
  '能处理回滚风险提示、权限控制和恢复后联动刷新等真实工程问题。',
];

const quickStages = [
  {
    order: '01',
    title: '先定快照粒度',
    summary: '是整单快照、字段快照还是区块快照，必须先定清楚。',
  },
  {
    order: '02',
    title: '恢复前先比对',
    summary: '用户不能盲目回滚，必须先看差异和影响范围。',
  },
  {
    order: '03',
    title: '高风险操作受控',
    summary: '回滚通常不是普通按钮，往往需要权限或审批。',
  },
  {
    order: '04',
    title: '恢复后要重建状态',
    summary: '前端缓存、详情页、列表状态要同步刷新。',
  },
  {
    order: '05',
    title: '操作要可追踪',
    summary: '谁回滚了、回滚到哪版、为什么回滚，必须留痕。',
  },
];

const guideStages = [
  {
    order: '01',
    title: '版本回滚的前提，是你先有稳定的版本快照模型',
    tag: '快照建模',
    description:
      '没有可靠快照，回滚就是空谈。真正稳的版本回滚，要先定义快照内容、创建时机、操作者信息和版本说明。尤其在表单或配置系统里，要明确“保存草稿”“发布版本”“审批通过版本”是不是同一种版本概念。',
    bestFor: ['配置平台', '表单模板系统', '病历修订系统', '内容发布后台'],
    focus: [
      '快照数据结构清晰可还原',
      '版本号、说明、来源和操作者齐全',
      '业务版本与草稿版本语义分离',
    ],
    risks: [
      '只有修改时间，没有完整快照数据',
      '版本类型混乱，用户不知道回滚到什么状态',
      '不同页面对版本定义不一致',
    ],
    language: 'ts',
    code: `type VersionSnapshot = {
  versionId: string
  createdAt: string
  operator: string
  payload: Record<string, unknown>
}`,
  },
  {
    order: '02',
    title: '回滚前必须有差异预览，不然用户根本不敢按恢复',
    tag: '恢复确认',
    description:
      '回滚并不是普通撤销，它往往会影响线上数据、模板结构或业务流程。所以前端必须先展示当前版本与目标版本的差异，让用户明确知道哪些字段、哪些配置、哪些节点会被替换，再决定是否继续。',
    bestFor: ['高风险配置页', '模板管理页', '审批配置', '病历修订回退'],
    focus: [
      '当前版本与目标版本差异可视化',
      '影响范围和不可逆风险展示清楚',
      '恢复动作前需要明确确认文案',
    ],
    risks: [
      '用户不知道回滚后会改掉什么',
      '误回滚导致线上配置异常',
      '前端只做按钮确认，没有上下文信息',
    ],
    language: 'ts',
    code: `type RollbackPreview = {
  targetVersionId: string
  changedFields: string[]
  riskTips: string[]
}`,
  },
  {
    order: '03',
    title: '版本回滚不是按钮行为，而是一条受控操作链',
    tag: '操作闭环',
    description:
      '成熟系统里的回滚通常会涉及权限校验、审批确认、成功回写和操作审计。前端需要把这些节点编排成闭环：谁能看到回滚按钮、回滚后哪些页面刷新、是否生成新版本、是否要同步刷新列表和详情缓存。',
    bestFor: ['企业后台', '配置中心', '医疗记录系统', '版本治理平台'],
    focus: [
      '回滚权限与角色能力绑定',
      '恢复成功后主动重建前端状态',
      '回滚结果写入审计和时间线',
    ],
    risks: [
      '任何人都能回滚高风险配置',
      '回滚成功后前端仍显示旧缓存',
      '操作完成后没有审计记录',
    ],
    language: 'ts',
    code: `const rollbackVersion = async (versionId: string) => {
  await requestRollback(versionId)
  await refreshCurrentDetail()
  await refreshVersionList()
}`,
  },
];

const comparisonCards = [
  {
    title: '仅历史记录',
    summary: '只能看版本，不敢真恢复，适合低风险场景但价值有限。',
  },
  {
    title: '可预览恢复',
    summary: '适合大多数业务系统，用户能看清影响再决定是否回滚。',
  },
  {
    title: '受控审批回滚',
    summary: '适合高风险配置和关键业务数据，安全性最强，但链路更重。',
  },
];

const checklist = [
  '先定义稳定的版本快照协议。',
  '回滚前必须展示差异和风险提示。',
  '回滚按钮的权限和审批链路要清晰。',
  '恢复成功后要重建前端缓存与页面状态。',
  '回滚操作必须进入审计和时间线。',
  '高风险场景要考虑二次确认或审批门槛。',
];
</script>
