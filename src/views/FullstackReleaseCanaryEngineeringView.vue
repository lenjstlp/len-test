<template>
  <FullstackCapabilityArticle
    eyebrow="Frontend Canary Release"
    title="前端灰度发布工程"
    summary="灰度发布不是只在后端做开关，前端同样需要支持按用户、按租户、按环境逐步放量。成熟的前端工程，会把版本切换、资源回滚和功能开关统一成一套发布策略。"
    :outcomes="outcomes"
    :quick-stages="quickStages"
    decision-title="把版本、资源和功能开关统一纳入灰度发布策略"
    :guide-stages="guideStages"
    comparison-title="一次性全量发布、功能开关发布、灰度发布三种方式对比"
    :comparison-cards="comparisonCards"
    checklist-title="灰度发布上线前必须确认的 6 个点"
    :checklist="checklist"
  />
</template>

<script setup lang="ts">
import FullstackCapabilityArticle from '@/components/FullstackCapabilityArticle.vue';

const outcomes = [
  '能把前端版本放量、回滚和功能开关统一成一套策略。',
  '能按用户、租户或环境逐步开放新功能。',
  '能降低前端发版带来的事故半径。',
];

const quickStages = [
  {
    order: '01',
    title: '先定灰度粒度',
    summary: '按用户、租户、角色还是环境放量先定清楚。',
  },
  {
    order: '02',
    title: '功能开关化',
    summary: '新功能能关能开，出现问题可快速回退。',
  },
  {
    order: '03',
    title: '资源版本可切换',
    summary: '前端资源要支持按版本加载。',
  },
  {
    order: '04',
    title: '回滚策略明确',
    summary: '上线出问题时能快速切换到旧版本。',
  },
  {
    order: '05',
    title: '监控要接上',
    summary: '灰度期间必须看得到错误和转化变化。',
  },
];

const guideStages = [
  {
    order: '01',
    title: '灰度不是发布完就结束，而是一个持续观察过程',
    tag: '观察',
    description:
      '灰度发布的核心价值在于先让少量用户看到新版本，再根据监控情况决定是否扩大范围。所以发布后必须有观察窗口，不能一键全量之后再祈祷没问题。',
    bestFor: ['大版本升级', '新页面上线', '核心流程改造'],
    focus: ['分批放量', '实时监控', '回滚机制'],
    risks: ['一次性全量', '无监控上线', '出问题影响所有用户'],
    language: 'ts',
    code: `type ReleasePlan = {
  percent: number
  scope: string
}`,
  },
  {
    order: '02',
    title: '功能开关让你先部署代码，再决定是否开放能力',
    tag: '开关',
    description:
      '功能开关可以让代码先上线，但新能力是否对用户开放由配置控制。这样既能提前完成部署，又能在出现问题时快速关闭功能而不必回滚整个版本。',
    bestFor: ['新功能试运行', 'AB 测试', '大改造功能'],
    focus: ['开关配置', '按用户放量', '快速关闭'],
    risks: ['代码上线即全部可见', '出问题只能回滚版本', '缺少试运行能力'],
    language: 'ts',
    code: `const enabled = featureFlags['new-ui']`,
  },
  {
    order: '03',
    title: '前端资源版本也要可控',
    tag: '资源',
    description:
      '如果前端资源不可控，页面可能因为缓存、CDN 或构建版本不一致而出问题。成熟做法是资源版本可识别、可切换，并能快速回退到旧包。',
    bestFor: ['大型门户', '多环境发布', '高频迭代系统'],
    focus: ['资源版本', '缓存控制', '快速回退'],
    risks: ['缓存污染', '版本错配', '无法快速回滚'],
    language: 'ts',
    code: `const assetVersion = '20260521'`,
  },
];

const comparisonCards = [
  { title: '一次性全量', summary: '最简单，但事故半径最大。' },
  { title: '功能开关', summary: '适合控制功能开闭，但不等于完整灰度。' },
  { title: '灰度发布', summary: '把范围控制、回滚和监控一起纳入策略。' },
];

const checklist = [
  '明确灰度粒度和放量策略。',
  '功能开关要能快速关闭。',
  '前端资源版本要可控。',
  '发布后必须有监控观察期。',
  '回滚策略要提前演练。',
  '灰度范围和用户分层要统一。',
];
</script>
