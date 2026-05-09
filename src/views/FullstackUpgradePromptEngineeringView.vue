<template>
  <FullstackCapabilityArticle
    eyebrow="Frontend Upgrade Prompt"
    title="前端版本升级提示工程"
    summary="版本升级提示不是简单弹一个“发现新版本，点击刷新”。它要处理静默更新、强制升级、灰度发布、标签页同步、长表单保护、资源哈希失效和 Service Worker 生命周期。真正成熟的升级提示工程，核心是让用户在最少打扰下拿到正确的新版本。"
    :outcomes="outcomes"
    :quick-stages="quickStages"
    decision-title="升级提示先分强制与非强制，再定刷新时机"
    :guide-stages="guideStages"
    comparison-title="硬刷新、弹窗提醒、后台静默切换三种升级体验的取舍"
    :comparison-cards="comparisonCards"
    checklist-title="版本升级提示上线前必须自查的 6 件事"
    :checklist="checklist"
  />
</template>

<script setup lang="ts">
import FullstackCapabilityArticle from '@/components/FullstackCapabilityArticle.vue';

const outcomes = [
  '能区分资源更新、功能灰度、紧急修复和强制升级的不同前端处理方式。',
  '能设计多标签页版本检测、升级提示和刷新时机控制。',
  '能避免用户在编辑过程中被粗暴刷新，提升升级体验和系统稳定性。',
];

const quickStages = [
  {
    order: '01',
    title: '先分升级类型',
    summary: '强制安全修复和普通功能发布，前端处理方式不应一样。',
  },
  {
    order: '02',
    title: '版本检测要结构化',
    summary: '不是只比一个版本号，还要知道是否强制、何时生效、影响范围。',
  },
  {
    order: '03',
    title: '刷新时机必须可控',
    summary: '编辑态、上传态、签署态都不适合立即刷新。',
  },
  {
    order: '04',
    title: '多标签页要统一升级状态',
    summary: '一个标签更新，其他标签也应收到同步提示。',
  },
  {
    order: '05',
    title: '升级失败要有降级策略',
    summary: '不能提示用户刷新后仍拿不到新资源。',
  },
];

const guideStages = [
  {
    order: '01',
    title: '版本检测结果要包含是否强制和建议刷新时机',
    tag: '升级策略',
    description:
      '前端不要把所有版本更新都做成同一种提示。更好的设计是后端返回结构化升级策略：当前版本、最新版本、是否强制、建议刷新窗口、变更摘要。这样前端才能决定是顶部轻提示、确认弹窗，还是立即阻断并刷新。',
    bestFor: ['后台系统', 'PWA 应用', '频繁发版产品'],
    focus: [
      '版本检测结果带 force / effectiveAt / message',
      '普通升级允许用户延后处理',
      '安全升级支持强制刷新和功能降级',
    ],
    risks: [
      '所有升级都只返回 latestVersion',
      '前端只能一刀切刷新',
      '强制升级和普通提示走同一文案',
    ],
    language: 'json',
    code: `{
  "currentVersion": "1.9.3",
  "latestVersion": "1.9.4",
  "force": false,
  "effectiveAt": 1788888888888,
  "message": "修复导出错误并优化表格性能"
}`,
  },
  {
    order: '02',
    title: '升级提示要避开高价值编辑态',
    tag: '刷新时机',
    description:
      '用户最讨厌的升级体验，就是写着长表单、上传着文件、编辑着文档，结果页面忽然刷新。前端需要识别脏数据、上传任务和关键操作中间态，并延后升级提示或先保留快照。真正的升级体验治理，核心是刷新时机控制。',
    bestFor: ['富文本编辑器', '文件上传页', '长表单后台'],
    focus: [
      '识别 hasUnsavedDraft / hasUploadingTasks',
      '允许用户“稍后刷新”并在空闲时再次提醒',
      '强制升级时先做草稿快照保存',
    ],
    risks: [
      '检测到新版本就直接 window.location.reload()',
      '只考虑页面展示，不考虑业务中间态',
      '刷新后用户不知道刚才内容是否保留',
    ],
    language: 'typescript',
    code: `function canRefreshNow() {
  return !hasUnsavedDraft() && !hasPendingUploads() && !isCriticalFlowRunning()
}`,
  },
  {
    order: '03',
    title: '多标签页升级状态要统一广播',
    tag: '多端一致',
    description:
      '如果一个标签页检测到新版本而其它标签还毫不知情，用户会在不同页看到两套资源和行为。前端应通过 BroadcastChannel 或 storage 事件同步升级状态，让所有标签页在合适时机一起提示或一起刷新，避免资源版本错层。',
    bestFor: ['多标签页后台系统', '复杂管理台', '常驻办公产品'],
    focus: [
      '升级状态广播到所有标签页',
      '只由一个标签负责轮询版本检测也可以',
      '统一记录用户是否已延后升级',
    ],
    risks: [
      '每个标签页各自检测各自弹窗',
      '部分页已刷新，部分页仍旧版本',
      '用户在多个标签看到重复提示',
    ],
    language: 'typescript',
    code: `const upgradeChannel = new BroadcastChannel('app-upgrade')

upgradeChannel.postMessage({
  type: 'version-found',
  latestVersion,
  force,
})`,
  },
];

const comparisonCards = [
  {
    title: '硬刷新',
    summary:
      '最简单，但对用户体验伤害也最大，只适合紧急安全修复或致命错误恢复。',
  },
  {
    title: '弹窗提醒后刷新',
    summary: '大多数后台系统最合适的方式，既提醒用户，又能控制刷新时机。',
  },
  {
    title: '后台静默切换',
    summary:
      '体验最好，但实现最复杂，通常要依赖 Service Worker、缓存治理和更细的资源版本控制。',
  },
];

const checklist = [
  '版本检测结果至少要包含最新版本、是否强制和提示文案。',
  '编辑态、上传态和关键流程中要避免立即刷新。',
  '多标签页应同步升级状态，不要各自为战。',
  '强制升级前要尽量保留草稿和关键中间态。',
  '升级失败时要有回退或重试策略，避免无限刷新循环。',
  '不要把灰度发布、普通提示和强制升级做成同一种交互。',
];
</script>
