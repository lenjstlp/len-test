<template>
  <FullstackCapabilityArticle
    eyebrow="Frontend Review Annotation Engineering"
    title="前端批注审阅工程"
    summary="批注审阅工程不是给文本旁边加个评论框就够了。真实业务里的审阅能力，要同时解决锚点定位、批注状态、权限角色、审阅模式切换、引用上下文和版本变化后的锚点稳定性，否则批注很快就会失效或变得难用。"
    :outcomes="outcomes"
    :quick-stages="quickStages"
    decision-title="批注审阅先定义锚点模型，再治理状态流转、权限模式和版本稳定性"
    :guide-stages="guideStages"
    comparison-title="静态评论、行级批注、可追溯审阅系统三种路线的差异"
    :comparison-cards="comparisonCards"
    checklist-title="批注审阅工程上线前必须补齐的 6 个点"
    :checklist="checklist"
  />
</template>

<script setup lang="ts">
import FullstackCapabilityArticle from '@/components/FullstackCapabilityArticle.vue';

const outcomes = [
  '能把批注、回复、处理状态和审阅模式做成独立工程能力，而不是散落在编辑器外层的几条评论。',
  '能处理锚点定位、版本变更后的批注迁移和审阅权限等高难度问题。',
  '能为文档审阅、病历修订、合同审核和在线协作场景设计稳定的批注系统。',
];

const quickStages = [
  {
    order: '01',
    title: '先定锚点',
    summary: '批注到底挂在哪一段内容上，必须有稳定模型。',
  },
  {
    order: '02',
    title: '状态流转清晰',
    summary: '未处理、已解决、已关闭等状态要明确。',
  },
  {
    order: '03',
    title: '审阅模式分开',
    summary: '编辑态、审阅态、只读态不要混在一起。',
  },
  {
    order: '04',
    title: '权限要精细',
    summary: '谁能发批注、谁能回复、谁能关闭，都要分清。',
  },
  {
    order: '05',
    title: '版本变化可追溯',
    summary: '内容变了以后批注锚点怎么保住，是系统上限所在。',
  },
];

const guideStages = [
  {
    order: '01',
    title: '批注工程的核心不是评论，而是“批注锚点”必须稳定存在',
    tag: '锚点模型',
    description:
      '一条批注真正挂载的是某段内容，而不是某个页面坐标。所以系统必须先定义清楚：批注锚点是按字符范围、节点路径、区块 ID 还是行号定位。锚点模型如果不稳定，内容一改，批注就会漂移甚至丢失。',
    bestFor: ['合同审阅', '病历修订', '富文本批注', '协作文档系统'],
    focus: [
      '批注锚点独立于 UI 展示存在',
      '不同文档模型下选择合适定位方式',
      '版本变化后锚点仍可回溯或迁移',
    ],
    risks: [
      '批注只是挂在 DOM 坐标上，刷新就失效',
      '内容编辑后批注漂移到错误位置',
      '不同终端回显同一批注位置不一致',
    ],
    language: 'ts',
    code: `type AnnotationAnchor = {
  blockId: string
  startOffset: number
  endOffset: number
}`,
  },
  {
    order: '02',
    title: '批注系统真正难的地方，在于状态、回复和审阅模式要并行工作',
    tag: '状态模式',
    description:
      '批注并不只是留言，它还有未处理、已解决、已关闭、已驳回等状态；还会涉及回复链、@提醒、审阅模式和只读查看。前端如果把这些都揉成一种“评论”状态，后面很快就会撑不住。',
    bestFor: ['多人审阅系统', '审批修订流程', '协作平台', '审核中心'],
    focus: [
      '批注主贴、回复、状态流转分层建模',
      '编辑态与审阅态 UI 明确分离',
      '状态变化和通知提醒形成闭环',
    ],
    risks: [
      '批注和普通评论混成一套模型',
      '用户无法区分已解决与待处理批注',
      '审阅模式切换后界面行为混乱',
    ],
    language: 'ts',
    code: `type AnnotationStatus = 'open' | 'resolved' | 'closed'`,
  },
  {
    order: '03',
    title: '高质量批注系统，必须考虑版本演进后的可追溯性',
    tag: '版本追踪',
    description:
      '文档内容会改，批注也要能跟着走。成熟做法通常会为批注保存上下文片段、版本号和锚点信息，在内容更新后尝试重定位。即便无法自动迁移，也要告诉用户这条批注原来对应哪一段内容，而不是直接丢失。',
    bestFor: ['长期迭代文档', '病历修订链', '合同多轮审阅', '复杂协作编辑器'],
    focus: [
      '批注保存版本信息和上下文快照',
      '内容变化后尝试重新定位锚点',
      '无法迁移时提供可追溯降级方案',
    ],
    risks: [
      '一改内容旧批注全部失联',
      '用户不知道批注原本针对哪段文本',
      '审阅历史无法支撑追责和排障',
    ],
    language: 'ts',
    code: `type AnnotationRecord = {
  id: string
  anchor: AnnotationAnchor
  versionId: string
  quote: string
}`,
  },
];

const comparisonCards = [
  {
    title: '静态评论',
    summary: '实现最轻，但无法真正绑定内容，不适合严肃审阅场景。',
  },
  {
    title: '行级批注',
    summary: '适合简单文档和代码审阅，成本适中，但定位能力有限。',
  },
  {
    title: '可追溯审阅系统',
    summary: '适合复杂文档和长期协作，能力最强，但锚点与版本设计要求很高。',
  },
];

const checklist = [
  '先定义稳定的批注锚点模型。',
  '批注、回复和状态流转要分层建模。',
  '编辑态和审阅态 UI 不要混在一起。',
  '权限要能控制发起、回复、关闭和查看。',
  '版本变化后要有锚点迁移或可追溯兜底。',
  '通知、时间线和审计最好能与批注系统打通。',
];
</script>
