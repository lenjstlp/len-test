<template>
  <FullstackCapabilityArticle
    eyebrow="Frontend Request Cancellation Engineering"
    title="前端请求取消工程"
    summary="请求取消不是一个小优化，而是列表筛选、搜索建议、页面切换、并发表单和流式任务里非常核心的稳定性能力。真正要解决的不是“能不能 abort”，而是过期请求别再污染页面、离开的页面别再更新状态、最新请求永远赢。"
    :outcomes="outcomes"
    :quick-stages="quickStages"
    decision-title="请求取消先区分“主动终止”和“结果过期”，再决定控制层级"
    :guide-stages="guideStages"
    comparison-title="AbortController、序号门闩、任务池管理三种手段的协作边界"
    :comparison-cards="comparisonCards"
    checklist-title="请求取消接入前必须检查的 6 个点"
    :checklist="checklist"
  />
</template>

<script setup lang="ts">
import FullstackCapabilityArticle from '@/components/FullstackCapabilityArticle.vue';

const outcomes = [
  '能在搜索、筛选、切页、组件卸载等场景下稳定取消旧请求。',
  '能区分真正 abort 掉请求和仅仅忽略过期结果的差异。',
  '能避免旧响应覆盖新页面、卸载组件后仍 setState、并发链路互相污染等问题。',
];

const quickStages = [
  {
    order: '01',
    title: '先识别过期请求',
    summary: '不是所有问题都要真的取消网络层，有时忽略旧结果就够了。',
  },
  {
    order: '02',
    title: '页面离开要终止',
    summary: '组件已经卸载，响应就不该再回来改状态。',
  },
  {
    order: '03',
    title: '最新请求优先',
    summary: '搜索框和筛选器里，最后一次输入必须赢。',
  },
  {
    order: '04',
    title: '并发要可管理',
    summary: '同一页面可能有多类请求，不能全用一把全局取消锁。',
  },
  {
    order: '05',
    title: '错误类型要分开',
    summary: '取消不等于失败，日志和提示都应分流。',
  },
];

const guideStages = [
  {
    order: '01',
    title: '先把“请求失败”和“请求取消”拆开，它们不是一回事',
    tag: '语义分层',
    description:
      '主动取消通常是预期行为，比如用户继续输入、切走页面、重选筛选条件。这类情况不该弹错误，也不该计入接口异常率。真正稳定的实现，第一步就是把 abort、timeout、network error、business error 分开处理。',
    bestFor: ['搜索建议', '筛选列表', '联动下拉', '离开页面中止任务'],
    focus: [
      '把取消视为受控结束，而不是异常',
      '日志监控中单独标记 abort 场景',
      'UI 层不要对取消弹失败提示',
    ],
    risks: [
      '把用户主动取消也当作接口失败处理',
      '取消后仍然 toast 报错，造成误导',
      '异常监控里混入大量正常取消噪声',
    ],
    language: 'ts',
    code: `const isAbortError = (error: unknown) =>
  error instanceof DOMException && error.name === 'AbortError'`,
  },
  {
    order: '02',
    title: '搜索和筛选场景优先用“最新请求赢”的控制模型',
    tag: '结果门闩',
    description:
      '有时候底层请求未必真的能被取消，但你仍然可以通过请求序号或 requestId 做结果门闩。每次发起请求都递增序号，只有最后一次请求返回时才允许更新界面。这样即使旧请求晚回来，也不会污染最新结果。',
    bestFor: ['输入联想', '远程筛选', '分页切换', '多条件联动查询'],
    focus: [
      '为请求维护递增序号或唯一标识',
      '响应回来时先验证是否还是当前请求',
      '把取消控制和结果采纳控制分开设计',
    ],
    risks: [
      '旧请求后返回，把新结果覆盖掉',
      '只做 AbortController，没有结果门闩',
      '多个查询区域共享一个请求标识，互相误伤',
    ],
    language: 'ts',
    code: `let latestRequestId = 0

const loadOptions = async (keyword: string) => {
  const requestId = ++latestRequestId
  const data = await fetchOptions(keyword)

  if (requestId !== latestRequestId) {
    return
  }

  optionList.value = data
}`,
  },
  {
    order: '03',
    title: '当底层支持时，用 AbortController 真正终止请求链路',
    tag: '网络终止',
    description:
      '如果你使用原生 `fetch` 或支持 `signal` 的请求封装，就应该在页面卸载、参数切换和新请求覆盖旧请求时，及时 abort 前一个控制器。这样既减少无效流量，也减少后续响应处理负担。对于长任务、流式请求和上传，这一步尤其重要。',
    bestFor: ['fetch 请求', '流式输出', '文件上传', '长耗时报表查询'],
    focus: [
      '每类请求维护自己的 controller',
      '新请求前先 abort 旧 controller',
      '组件卸载时统一清理未完成任务',
    ],
    risks: [
      '所有请求共享一个 controller，导致误取消',
      '只创建 controller，但没有在合适时机 abort',
      '上传和流式请求取消后资源没清理干净',
    ],
    language: 'ts',
    code: `let controller: AbortController | null = null

const loadList = async (query: Record<string, unknown>) => {
  controller?.abort()
  controller = new AbortController()

  const response = await fetch('/api/list', {
    method: 'POST',
    body: JSON.stringify(query),
    signal: controller.signal,
  })

  return response.json()
}`,
  },
];

const comparisonCards = [
  {
    title: 'AbortController',
    summary:
      '能真正终止请求，适合 fetch、上传和流式任务，但需要底层请求库支持 signal。',
  },
  {
    title: '请求序号门闩',
    summary: '不能减少流量，但能阻止旧结果污染新状态，适合搜索建议和筛选列表。',
  },
  {
    title: '任务池管理',
    summary:
      '适合一个页面同时管理多类并发任务，能做到按区域、按业务线精细取消。',
  },
];

const checklist = [
  '取消和失败必须分开处理，别把 abort 当异常弹错。',
  '搜索、联想、筛选类场景要有“最新请求赢”的结果门闩。',
  '页面卸载、切参和重发请求时要正确清理旧 controller。',
  '不要所有请求共享一个取消器，避免互相误杀。',
  '流式请求、上传请求和长任务要验证取消后的资源释放。',
  '埋点和监控里单独统计取消率，避免污染真实异常率。',
];
</script>
