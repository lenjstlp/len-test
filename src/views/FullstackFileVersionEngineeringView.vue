<template>
  <FullstackCapabilityArticle
    eyebrow="Frontend File Version Engineering"
    title="前端文件版本治理工程"
    summary="文件版本治理不是简单地在文件名后面加一个 v2。真正的工程问题在于：同一个文件在预览、编辑、签章、审批、协作、回滚和下载时，到底引用的是哪一版，谁创建的，能不能覆盖，能不能恢复，怎么防止用户签错版本。前端如果不把版本链路建清楚，文件类业务一定会越来越危险。"
    :outcomes="outcomes"
    :quick-stages="quickStages"
    decision-title="文件版本治理先统一版本标识和引用规则，再处理预览、回滚和审计链路"
    :guide-stages="guideStages"
    comparison-title="覆盖式更新、显式新版本、带分支草稿三种文件版本方案的差异"
    :comparison-cards="comparisonCards"
    checklist-title="文件版本治理上线前必须补齐的 6 个点"
    :checklist="checklist"
  />
</template>

<script setup lang="ts">
import FullstackCapabilityArticle from '@/components/FullstackCapabilityArticle.vue';

const outcomes = [
  '能把文件资源、版本记录、引用关系和当前生效版本拆成清晰模型。',
  '能设计文件预览、编辑、回滚、签章和审批时的版本一致性校验。',
  '能把文件版本治理沉淀成病历文档、合同审批、知识库和项目附件的共用能力。',
];

const quickStages = [
  {
    order: '01',
    title: '先拆资源和版本',
    summary: '文件本体和文件版本不是一回事，必须分成两层模型。',
  },
  {
    order: '02',
    title: '引用必须指向版本',
    summary: '签章、审批、预览和下载都要知道自己引用的是哪一版。',
  },
  {
    order: '03',
    title: '编辑和回滚要可追踪',
    summary: '谁生成了新版本、为什么回滚、回到哪一版，都必须可审计。',
  },
  {
    order: '04',
    title: '预览前要校验版本一致性',
    summary: '不能用户看的是旧版，提交动作却作用在新版。',
  },
  {
    order: '05',
    title: '签章与审批要冻结版本',
    summary: '一旦进入关键业务动作，文件版本就不能再被悄悄覆盖。',
  },
];

const guideStages = [
  {
    order: '01',
    title: '资源模型和版本模型一定要拆开，否则后面所有动作都会乱',
    tag: '模型拆分',
    description:
      '成熟的文件系统至少要区分两层：文件资源层负责标识“这是哪份文件”，版本层负责标识“这是这份文件的第几版”。这样一来，预览、下载、签章、审批和协作就能明确地绑定到某一个版本，而不是对着一个会变的文件 URL 操作。',
    bestFor: ['合同系统', '医疗文档系统', '知识库', '附件中心'],
    focus: [
      '资源 id 和版本 id 分离',
      '当前生效版本与历史版本链路都要保留',
      '引用关系最好绑定版本 id 而不是文件名',
    ],
    risks: [
      '直接用文件名或 URL 当唯一标识',
      '版本覆盖后历史操作无法追溯',
      '同一文件在不同页面引用到不同隐式版本',
    ],
    language: 'ts',
    code: `type FileAsset = {
  assetId: string
  currentVersionId: string
}

type FileVersion = {
  versionId: string
  assetId: string
  versionNo: number
  createdBy: string
  createdAt: string
  hash: string
}`,
  },
  {
    order: '02',
    title: '前端所有关键动作都要带版本号，不要只带文件 id',
    tag: '一致性校验',
    description:
      '如果前端在提交审批、确认签章、发起下载或进入编辑时只传文件 id，那么服务端很难判断用户到底针对哪一版在操作。更稳的做法是：所有关键动作都显式带上 versionId 或 hash，并在服务端校验当前上下文是否一致。',
    bestFor: ['电子签章', '审批流附件', '在线预览', '协作文档系统'],
    focus: [
      '关键动作显式携带 versionId',
      '预览页和提交动作保持同版本上下文',
      '必要时带 hash 防止同版本号错绑',
    ],
    risks: [
      '用户看的是旧版，提交作用在新版',
      '签章动作没有版本冻结',
      '回滚后前端缓存仍指向旧链接',
    ],
    language: 'ts',
    code: `await request.post('/api/file/sign', {
  assetId,
  versionId,
  hash,
})`,
  },
  {
    order: '03',
    title: '版本回滚不是简单把 current 指回去，还要同步预览、缓存和审计',
    tag: '回滚治理',
    description:
      '一旦文件支持版本回滚，前端就不只是刷新一个列表。你还要同步更新预览地址、附件卡片、编辑入口、当前版本标签、下载链接和相关审计展示。如果只改了“当前版本号”，页面上的其他入口仍可能继续拿旧缓存操作错误版本。',
    bestFor: ['附件中心', '合同审阅系统', '病历文档系统', '知识库平台'],
    focus: [
      '回滚后刷新所有引用版本的页面状态',
      '审计信息要展示回滚来源和目标版本',
      '预览和下载链接缓存要同步失效',
    ],
    risks: [
      '回滚成功但页面仍展示旧版本标签',
      '下载链接没失效，用户拿到错误文件',
      '没有回滚审计，出了问题无法追责',
    ],
    language: 'ts',
    code: `await request.post('/api/file/version/rollback', {
  assetId,
  targetVersionId,
  reason,
})`,
  },
];

const comparisonCards = [
  {
    title: '覆盖式更新',
    summary: '实现最省事，但历史不可追溯，最不适合签章、审批和高合规文档系统。',
  },
  {
    title: '显式新版本',
    summary:
      '当前最稳的通用方案，资源与版本分离后，大多数文件业务都能清楚治理。',
  },
  {
    title: '带分支草稿',
    summary:
      '适合协作和复杂编辑流，但模型明显更重，只建议在确有多人并行编辑需求时引入。',
  },
];

const checklist = [
  '文件资源和版本记录必须拆层建模，不能混成一个对象。',
  '关键动作必须显式带版本号或 hash，不能只传文件 id。',
  '预览、下载、审批、签章和编辑入口要保证引用同一版本上下文。',
  '版本回滚后，要同步刷新预览链接、缓存和页面状态。',
  '关键版本动作必须留审计日志，包括创建、回滚、签章和审批确认。',
  '高合规场景下，进入审批或签章后必须冻结目标文件版本。',
];
</script>
