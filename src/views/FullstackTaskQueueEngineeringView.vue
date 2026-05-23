<template>
  <FullstackCapabilityArticle
    eyebrow="Frontend Task Queue"
    title="前端任务队列工程"
    summary="上传、导出、转码、同步和批量操作都不该堆在页面里直接跑。成熟的前端会把这些异步动作收进任务队列，统一做排队、并发控制、失败重试和状态回显。"
    :outcomes="outcomes"
    :quick-stages="quickStages"
    decision-title="把异步动作收敛成任务对象，再统一调度、回显和恢复"
    :guide-stages="guideStages"
    comparison-title="直接在页面执行、全局任务队列、带持久化任务中心三种实现路线"
    :comparison-cards="comparisonCards"
    checklist-title="任务队列上线前必须确认的 6 个点"
    :checklist="checklist"
  />
</template>

<script setup lang="ts">
import FullstackCapabilityArticle from '@/components/FullstackCapabilityArticle.vue';

const outcomes = [
  '能把导出、上传、同步等异步行为变成统一任务模型。',
  '能控制并发、排队、失败重试和取消，避免页面乱套。',
  '能为高频后台场景搭建可追踪的任务中心。',
];

const quickStages = [
  {
    order: '01',
    title: '任务先建模',
    summary: '把动作名、参数、状态和进度统一成任务对象。',
  },
  { order: '02', title: '排队与并发控制', summary: '不要让所有任务同时起跑。' },
  {
    order: '03',
    title: '状态统一回显',
    summary: 'running、success、failed、canceled 要有清晰语义。',
  },
  { order: '04', title: '失败可恢复', summary: '支持重试和恢复上次中断任务。' },
  {
    order: '05',
    title: '支持持久化',
    summary: '刷新页面后任务中心还能继续展示。',
  },
];

const guideStages = [
  {
    order: '01',
    title: '先把异步动作统一成任务对象',
    tag: '任务建模',
    description:
      '任务队列不是简单的数组，而是统一任务模型。每个任务都应包含 id、类型、参数、状态、进度、错误信息和时间戳，这样队列才能真正可管理。',
    bestFor: ['导出任务', '批量上传', '后台同步', '长耗时计算'],
    focus: ['任务 id', '状态机', '进度字段'],
    risks: ['每个页面都自己维护任务状态', '任务语义不统一', '刷新后状态丢失'],
    language: 'ts',
    code: `type TaskItem = {
  id: string
  type: string
  status: 'pending' | 'running' | 'success' | 'failed'
  progress: number
}`,
  },
  {
    order: '02',
    title: '并发控制要放在队列层，而不是页面层',
    tag: '调度',
    description:
      '页面只负责提交任务，真正的并发控制应该由队列层统一管理。比如同一时刻只跑 3 个任务，剩余任务排队等待，这样系统稳定性会高很多。',
    bestFor: ['批量导出', '大文件上传', '多接口同步'],
    focus: ['并发上限', '队列等待', '统一调度'],
    risks: ['页面里堆满定时器', '多个任务同时争抢资源', '状态更新互相覆盖'],
    language: 'ts',
    code: `const concurrency = 3`,
  },
  {
    order: '03',
    title: '任务中心要能在刷新后恢复可见状态',
    tag: '持久化',
    description:
      '如果任务很重要，页面刷新后不能直接消失。任务中心应该把关键状态持久化到本地存储或后端，让用户重新进入时还能看到任务进度和结果。',
    bestFor: ['导出中心', '审批流操作', '批量处理'],
    focus: ['持久化', '恢复展示', '状态同步'],
    risks: ['刷新后任务丢失', '用户不知道任务是否成功', '历史任务无法追踪'],
    language: 'ts',
    code: `localStorage.setItem('tasks', JSON.stringify(tasks))`,
  },
];

const comparisonCards = [
  { title: '页面直跑', summary: '最容易写，但任务一多就不可控。' },
  { title: '全局队列', summary: '更适合中大型后台，调度和状态更统一。' },
  { title: '持久化任务中心', summary: '适合导出、同步、转码等关键流程。' },
];

const checklist = [
  '任务对象字段必须统一，不能页面自定义。',
  '并发上限和排队策略要提前定好。',
  '任务状态需要能持久化和恢复。',
  '支持取消和失败重试。',
  '任务列表要能按状态筛选。',
  '任务执行日志要可追踪。',
];
</script>
