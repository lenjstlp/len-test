<template>
  <FullstackCapabilityArticle
    eyebrow="Frontend Attachment Center Engineering"
    title="前端附件中心工程"
    summary="很多系统最后都会长出一个“附件区”，但真正做成工程时，它已经不只是上传列表，而是附件分类、预览、权限、版本、引用关系、批量操作、病毒校验提示、跨业务复用的综合能力。真正成熟的方案应该把附件当成独立资源中心。"
    :outcomes="outcomes"
    :quick-stages="quickStages"
    decision-title="附件中心先抽资源模型，再设计上传、引用、预览和权限链路"
    :guide-stages="guideStages"
    comparison-title="页面内嵌附件区、独立附件组件、统一附件中心三种路线的差异"
    :comparison-cards="comparisonCards"
    checklist-title="附件中心上线前必须补齐的 6 个点"
    :checklist="checklist"
  />
</template>

<script setup lang="ts">
import FullstackCapabilityArticle from '@/components/FullstackCapabilityArticle.vue';

const outcomes = [
  '能把附件抽成独立资源模型，而不是在每个业务表单里重复堆上传组件。',
  '能处理附件上传、预览、权限、引用关系、版本替换和批量下载等完整链路。',
  '能把附件中心沉淀为医疗病历、审批单据、项目文档等场景共用的能力模块。',
];

const quickStages = [
  {
    order: '01',
    title: '资源模型先统一',
    summary: '文件 id、业务 id、分类、来源、权限和预览地址都要收进模型。',
  },
  {
    order: '02',
    title: '上传与引用分离',
    summary: '先有文件资源，再挂到业务单据，不要把两者绑死。',
  },
  {
    order: '03',
    title: '预览链路稳定',
    summary: '图片、PDF、Office、视频的预览策略最好统一收口。',
  },
  {
    order: '04',
    title: '版本与替换明确',
    summary: '是覆盖旧文件还是追加版本，要有明确策略。',
  },
  {
    order: '05',
    title: '权限不可后补',
    summary: '查看、下载、删除、替换、批量导出权限要从一开始就设计。',
  },
];

const guideStages = [
  {
    order: '01',
    title: '把附件当资源中心建模，不要把上传结果直接塞进表单字段',
    tag: '资源模型',
    description:
      '附件中心最重要的是资源建模。每个文件都应该有独立资源 id、原始文件名、类型、大小、上传人、上传时间、预览地址和当前业务引用关系。只有这样，附件才能在多个模块间复用，而不是被某一个表单字段永久绑死。',
    bestFor: ['病历附件', '审批单据', '项目资料', '合同档案'],
    focus: [
      '文件资源与业务引用解耦',
      '独立维护附件分类和来源信息',
      '预览、下载、删除统一基于资源 id 处理',
    ],
    risks: [
      '上传结果直接写进业务字段',
      '多个业务引用同一文件时关系混乱',
      '文件一旦替换历史记录丢失',
    ],
    language: 'ts',
    code: `type AttachmentResource = {
  fileId: string
  fileName: string
  extension: string
  size: number
  previewUrl?: string
  bizRefs: Array<{ bizType: string; bizId: string }>
}`,
  },
  {
    order: '02',
    title: '上传、挂载、预览、下载要拆成独立动作，别靠一个组件硬包办',
    tag: '动作拆分',
    description:
      '一个成熟的附件中心至少会有四个动作：上传文件、挂到业务、预览文件、下载文件。它们的接口、权限、失败提示和埋点都不同。如果把所有逻辑都塞进一个上传组件里，后面做批量引用、补挂附件、历史回放时会非常难扩展。',
    bestFor: ['复用型后台', '资料归档系统', '附件补录流程', '跨模块附件页'],
    focus: [
      '动作级接口边界清晰',
      '文件上传成功不等于业务挂载成功',
      '下载和预览权限单独鉴定',
    ],
    risks: [
      '上传成功但业务未挂载，页面却误判为已完成',
      '下载按钮直接暴露原始地址',
      '预览失败和上传失败共用一套提示',
    ],
    language: 'ts',
    code: `const attachFileToBusiness = (fileId: string, bizType: string, bizId: string) =>
  request.post('/attachment/bind', { fileId, bizType, bizId })`,
  },
  {
    order: '03',
    title: '附件列表要内置权限和状态表达，别把所有按钮都默认亮着',
    tag: '状态与权限',
    description:
      '附件资源常见的状态有上传中、转码中、可预览、审核中、已失效、病毒校验失败等。再叠加查看、下载、删除、替换权限，列表每一项其实都需要状态机。工程上应先定义文件状态和按钮权限映射，再让 UI 消费结果。',
    bestFor: ['安全审计系统', '医疗文档系统', '审批附件区', '文档归档中心'],
    focus: [
      '文件状态枚举要完整',
      '按钮能力按状态与权限联合计算',
      '列表项支持错误提示和重试入口',
    ],
    risks: [
      '文件处理中却允许下载',
      '无权限用户仍看到高风险操作按钮',
      '失败状态没有恢复入口只能刷新页面',
    ],
    language: 'ts',
    code: `const resolveAttachmentActions = (
  status: 'uploading' | 'ready' | 'blocked',
  canDelete: boolean,
) => ({
  preview: status === 'ready',
  download: status === 'ready',
  remove: status !== 'uploading' && canDelete,
})`,
  },
];

const comparisonCards = [
  {
    title: '页面内嵌附件区',
    summary: '实现快，但很快会在不同业务里复制出多套不一致逻辑。',
  },
  {
    title: '独立附件组件',
    summary: '适合中型项目复用，能收敛上传和展示，但资源管理能力仍有限。',
  },
  {
    title: '统一附件中心',
    summary: '适合长期演进系统，前期成本更高，但最利于跨业务复用与审计。',
  },
];

const checklist = [
  '附件资源和业务引用必须解耦。',
  '上传成功、挂载成功、预览成功是三件不同的事。',
  '附件项状态要覆盖转码、失效、审核、异常等真实场景。',
  '查看、下载、替换、删除权限都要独立控制。',
  '图片、PDF、Office、视频的预览策略要统一规划。',
  '批量下载、批量引用、历史版本替换要预留扩展点。',
];
</script>
