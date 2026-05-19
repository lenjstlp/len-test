<template>
  <FullstackCapabilityArticle
    eyebrow="Frontend Export Job Center Engineering"
    title="前端导出任务中心工程"
    summary="导出一旦不再是小表格瞬间下载，就会变成一个完整任务系统。真正的难点是状态跟踪、重试、权限、过期清理和用户反馈，而不是单纯调一个下载接口。"
    :outcomes="outcomes"
    :quick-stages="quickStages"
    decision-title="导出任务中心先统一任务状态协议，再治理异步轮询、权限和下载链路"
    :guide-stages="guideStages"
    comparison-title="同步导出、异步导出、任务中心式导出三种路线的差异"
    :comparison-cards="comparisonCards"
    checklist-title="导出任务中心上线前必须补齐的 6 个点"
    :checklist="checklist"
  />
</template>

<script setup lang="ts">
import FullstackCapabilityArticle from '@/components/FullstackCapabilityArticle.vue';

const outcomes = [
  '能把导出任务抽成统一状态模型，而不是在各个页面分散维护导出 loading。',
  '能处理排队中、生成中、成功、失败、过期等状态，并统一轮询与重试逻辑。',
  '能为大数据量报表、病历导出、审计台账导出等场景搭建稳定的任务中心。',
];

const quickStages = [
  {
    order: '01',
    title: '先定任务状态',
    summary: '排队、处理中、成功、失败、过期这些状态先统一。',
  },
  {
    order: '02',
    title: '轮询和刷新可控',
    summary: '别让每个页面都自己写一套轮询逻辑。',
  },
  {
    order: '03',
    title: '下载凭证清晰',
    summary: '任务成功后到底拿什么下载，要有稳定协议。',
  },
  {
    order: '04',
    title: '失败可重试',
    summary: '失败原因、手动重试和系统补偿要有闭环。',
  },
  {
    order: '05',
    title: '过期和清理有规则',
    summary: '文件多久失效、列表如何清理，都要提前定义。',
  },
];

const guideStages = [
  {
    order: '01',
    title: '导出中心不是一个按钮，而是完整的异步任务状态机',
    tag: '状态协议',
    description:
      '小数据量同步导出还能靠按钮 loading 顶住，但一旦生成时间长、任务量大、需要后台异步处理，就必须把导出抽成任务状态机。至少要明确排队中、处理中、成功、失败、取消、过期这些状态，并用统一协议驱动前端展示。',
    bestFor: ['报表导出', '病历导出', '审计数据下载', '运营大表导出'],
    focus: [
      '导出任务状态统一建模',
      '页面展示和后端状态一一对应',
      '不同业务导出共用任务中心能力',
    ],
    risks: [
      '每个页面各写一套导出流程',
      '用户看不到任务当前到底走到哪一步',
      '失败和过期状态没有统一展示',
    ],
    language: 'ts',
    code: `type ExportJobStatus =
  | 'queued'
  | 'running'
  | 'success'
  | 'failed'
  | 'expired'`,
  },
  {
    order: '02',
    title: '轮询策略必须统一，不然很快就会出现重复请求和状态回跳',
    tag: '轮询调度',
    description:
      '导出任务中心最容易被低估的是轮询管理。多个页面、多个任务、多个标签页一起轮询，如果没有统一调度，很容易造成重复请求、旧状态覆盖新状态、页面销毁后定时器泄漏。更稳的方案是统一任务轮询器和刷新策略。',
    bestFor: [
      '多任务导出',
      '任务中心列表',
      '多标签页后台系统',
      '移动端导出列表',
    ],
    focus: [
      '轮询频率统一配置',
      '页面销毁时自动停止订阅',
      '旧任务状态更新不覆盖新结果',
    ],
    risks: [
      '同一任务被多个页面重复轮询',
      '组件卸载后定时器没清掉',
      '高并发导出时接口压力过大',
    ],
    language: 'ts',
    code: `type ExportJob = {
  id: string
  status: ExportJobStatus
  downloadUrl?: string
  errorMessage?: string
}`,
  },
  {
    order: '03',
    title: '下载链路、权限链路和过期链路要放在同一套设计里',
    tag: '下载闭环',
    description:
      '导出成功不是结束，真正闭环还包括：谁可以下载、链接多久失效、是否需要签名 URL、过期后是否可重新生成、是否要记录下载审计。把这些都统一进任务中心设计，才能避免后面每个业务各自补洞。',
    bestFor: ['敏感数据导出', '多角色报表系统', '审计下载中心', '大文件导出'],
    focus: [
      '下载地址与任务状态统一返回',
      '过期策略和重新生成策略清晰',
      '权限和审计进入同一设计闭环',
    ],
    risks: [
      '链接过期后用户无感知',
      '不同角色能下载到不该看的文件',
      '成功任务没有下载审计记录',
    ],
    language: 'ts',
    code: `const canDownloadJob = (job: ExportJob) =>
  job.status === 'success' && Boolean(job.downloadUrl)`,
  },
];

const comparisonCards = [
  {
    title: '同步导出',
    summary: '适合小数据量，简单直接，但在大表场景会卡死或超时。',
  },
  {
    title: '异步导出',
    summary: '解决生成耗时问题，但缺少统一任务中心时体验仍然零散。',
  },
  {
    title: '任务中心式导出',
    summary: '更适合复杂业务后台，状态、下载、失败重试和审计都更统一。',
  },
];

const checklist = [
  '导出任务状态必须标准化。',
  '轮询与刷新策略要统一封装。',
  '成功后的下载地址、过期时间和权限要明确。',
  '失败原因和重试机制要可见。',
  '任务列表要支持筛选、刷新和清理。',
  '敏感文件导出必须考虑审计与过期处理。',
];
</script>
