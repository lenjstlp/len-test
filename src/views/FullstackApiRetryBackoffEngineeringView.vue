<template>
  <FullstackCapabilityArticle
    eyebrow="Frontend API Retry Backoff"
    title="前端接口重试与退避工程"
    summary="前端不是所有请求失败都该立刻打断用户。真正成熟的接口层，会区分瞬时抖动、幂等等可重试场景和必须立即失败的业务错误，并为重试、退避、熔断留出统一入口。"
    :outcomes="outcomes"
    :quick-stages="quickStages"
    decision-title="把重试、退避和失败兜底统一收口到请求层，而不是散落在各个页面里"
    :guide-stages="guideStages"
    comparison-title="直接重试、固定延迟重试、指数退避与抖动三种方案的差异"
    :comparison-cards="comparisonCards"
    checklist-title="前端重试工程上线前必须确认的 6 个点"
    :checklist="checklist"
  />
</template>

<script setup lang="ts">
import FullstackCapabilityArticle from '@/components/FullstackCapabilityArticle.vue';

const outcomes = [
  '能把请求失败、超时、幂等重试和用户取消统一成一套可控策略。',
  '能避免页面到处写重复的 try/catch 和 setTimeout 重试逻辑。',
  '能为医疗、金融、审批、消息中心这类高频交互系统搭建稳定请求层。',
];

const quickStages = [
  {
    order: '01',
    title: '识别可重试错误',
    summary: '先区分网络抖动、超时、限流和业务失败。',
  },
  {
    order: '02',
    title: '退避策略统一配置',
    summary: '重试次数、间隔和抖动不要散落在页面里。',
  },
  {
    order: '03',
    title: '失败兜底要明确',
    summary: '什么时候 toast，什么时候静默，什么时候直接抛出。',
  },
  {
    order: '04',
    title: '支持手动取消',
    summary: '请求层要和页面销毁、路由切换联动。',
  },
  {
    order: '05',
    title: '日志可追踪',
    summary: '每次重试都要能定位原因和次数。',
  },
];

const guideStages = [
  {
    order: '01',
    title: '不是所有失败都该重试，先分清错误类型',
    tag: '错误分类',
    description:
      '真正要重试的是网络短抖、超时、临时 5xx、限流等具备恢复可能的场景；像参数错误、权限错误、校验失败这类业务错误就不该重试，否则只会放大问题。',
    bestFor: ['高频查询', '导出任务轮询', '弱网场景', '第三方接口代理'],
    focus: ['错误码分类', '超时识别', '业务错误直接失败'],
    risks: [
      '所有错误一律重试',
      '把业务错误误判成网络错误',
      '用户不断看到重复请求',
    ],
    language: 'ts',
    code: `type RetryableError = {
  code: string
  status?: number
  retriable: boolean
}`,
  },
  {
    order: '02',
    title: '退避不是固定等待，而是逐步拉长间隔',
    tag: '退避策略',
    description:
      '重试间隔如果永远固定，很容易在后端恢复前持续打爆服务。更稳的方式是指数退避，必要时加一点随机抖动，避免所有客户端同一时刻再次发起请求。',
    bestFor: ['弱网接口', '批量请求', '后台刷新', '大流量系统'],
    focus: ['指数退避', '随机抖动', '最大重试上限'],
    risks: ['固定间隔重复撞库', '没有上限导致长时间挂起', '所有客户端同步重试'],
    language: 'ts',
    code: `const delay = base * 2 ** retryCount + Math.random() * 200`,
  },
  {
    order: '03',
    title: '请求层要能被页面取消，而不是死等到底',
    tag: '取消能力',
    description:
      '页面切换、弹窗关闭、表单重置时，很多请求其实没必要继续执行。请求层应该支持 AbortController，让页面在合适时机显式取消，避免过期响应覆盖新状态。',
    bestFor: ['搜索联想', '表单提交', '路由切换', '页面销毁'],
    focus: ['AbortController', '取消标识传递', '过期响应忽略'],
    risks: ['旧请求返回覆盖新状态', '页面销毁后仍更新组件', '重复加载浪费资源'],
    language: 'ts',
    code: `const controller = new AbortController()
fetch(url, { signal: controller.signal })`,
  },
];

const comparisonCards = [
  { title: '直接重试', summary: '实现最简单，但对后端恢复期不友好。' },
  {
    title: '固定延迟重试',
    summary: '比直接重试稳一点，但高并发下容易同步撞车。',
  },
  {
    title: '指数退避+抖动',
    summary: '最常见的工程化方案，更适合真实线上系统。',
  },
];

const checklist = [
  '明确哪些错误允许重试，哪些必须立即失败。',
  '统一配置重试次数、间隔和最大等待时间。',
  '请求层要支持取消，不要让过期请求继续占资源。',
  '重试日志要能追踪到接口、次数和错误原因。',
  '避免在页面和组件内重复实现重试逻辑。',
  '对幂等接口和非幂等接口要有不同策略。',
];
</script>
