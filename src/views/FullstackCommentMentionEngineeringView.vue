<template>
  <FullstackCapabilityArticle
    eyebrow="Frontend Comment Mention Engineering"
    title="前端评论与@提及工程"
    summary="评论框看上去很轻，但一旦要支持 `@提及`、引用回复、草稿恢复、表情插入、权限校验和通知联动，它就不再是一个普通输入框，而是一套完整的交互链路。做不好，消息乱飞；做复杂了，又会卡到无法输入。"
    :outcomes="outcomes"
    :quick-stages="quickStages"
    decision-title="评论系统先稳输入模型，再接 mention 检索、草稿恢复和通知链路"
    :guide-stages="guideStages"
    comparison-title="纯文本评论、富文本评论、轻量 mention 编辑器三种路线的取舍"
    :comparison-cards="comparisonCards"
    checklist-title="评论与@提及上线前必须补齐的 6 个点"
    :checklist="checklist"
  />
</template>

<script setup lang="ts">
import FullstackCapabilityArticle from '@/components/FullstackCapabilityArticle.vue';

const outcomes = [
  '能区分展示文本、提交文本和 mention 实体，不再把 `@用户` 当普通字符串处理。',
  '能处理输入法、删除 mention、光标定位、异步搜索和草稿恢复等高频边界。',
  '能为评论区、任务协作、工单流转、病例讨论等场景搭建稳定的 mention 交互。',
];

const quickStages = [
  {
    order: '01',
    title: '文本和实体分层',
    summary: '显示内容是一回事，真正提交给后端的 mention 实体是另一回事。',
  },
  {
    order: '02',
    title: '搜索要防抖',
    summary: '输入 `@` 后的检索要考虑异步乱序和频率控制。',
  },
  {
    order: '03',
    title: '光标必须稳定',
    summary: '插入 mention 后的光标位置和删除行为是最容易出 bug 的地方。',
  },
  {
    order: '04',
    title: '草稿可恢复',
    summary: '长评论、多人协作、临时中断都要求草稿能完整恢复。',
  },
  {
    order: '05',
    title: '通知要闭环',
    summary: '提及谁、回复谁、是否已删除用户，都要和消息系统对齐。',
  },
];

const guideStages = [
  {
    order: '01',
    title: '把评论正文和 mention 实体拆开存，不要指望后端自己猜',
    tag: '输入模型',
    description:
      '成熟的做法通常会同时保存展示文本和 mention 实体列表。展示文本负责给用户看，实体列表负责告诉后端真正提及了谁、起止位置在哪、节点 id 是什么。这样即使昵称变更、显示文案变化，也不会影响通知和权限逻辑。',
    bestFor: ['评论区', '任务协作', '病历讨论', '工单流转'],
    focus: [
      '提交 payload 中单独维护 mention 实体',
      '实体与显示文案解耦',
      '回显时优先依赖实体而非重新解析字符串',
    ],
    risks: [
      '只提交纯文本，后端无法准确识别被提及对象',
      '用户改名后历史 mention 失真',
      '删除文本后 mention 实体不同步',
    ],
    language: 'ts',
    code: `type MentionEntity = {
  userId: string
  label: string
  start: number
  end: number
}`,
  },
  {
    order: '02',
    title: 'mention 搜索必须做防抖和结果乱序保护',
    tag: '异步检索',
    description:
      '用户输入 `@li`、`@lin`、`@lind` 时，前端会连续发起多次搜索。如果不做请求去重和乱序保护，旧结果就可能覆盖新结果，导致下拉列表闪烁甚至错人。实践上要么加请求序号，要么用取消请求方案保证只有最后一次结果生效。',
    bestFor: ['远程通讯录', '组织内搜索', '多租户用户检索', '海量用户系统'],
    focus: [
      '输入防抖避免高频请求',
      '异步返回使用 requestId 做乱序保护',
      '空关键字和仅 @ 状态要有默认结果策略',
    ],
    risks: [
      '快速输入时结果回跳',
      '删除关键字后旧结果残留',
      '搜索接口被高频打爆',
    ],
    language: 'ts',
    code: `let latestRequestId = 0

const searchMentionUsers = async (keyword: string) => {
  const requestId = ++latestRequestId
  const result = await fetchUsers(keyword)

  if (requestId !== latestRequestId) {
    return []
  }

  return result
}`,
  },
  {
    order: '03',
    title: '删除和回显要围绕 mention 原子块处理，不能按普通文本切',
    tag: '交互细节',
    description:
      '一个 mention 在视觉上像一段文字，但交互上应该更像一个原子块。比如光标移到中间删除时，要么整体删除，要么转成纯文本；回显历史评论时，也要能准确高亮或渲染被提及对象，而不是重新正则解析一遍赌运气。',
    bestFor: ['富输入框', '引用回复', '长评论编辑', '评论二次编辑'],
    focus: [
      'mention 插入后维护稳定的 range 信息',
      '删除时定义清楚原子块行为',
      '历史回显走实体数据，不做弱解析',
    ],
    risks: [
      '用户删掉一半 mention 造成数据脏乱',
      '二次编辑后实体位置全错',
      '历史评论回显和实际通知对象不一致',
    ],
    language: 'ts',
    code: `const normalizeEntities = (content: string, entities: MentionEntity[]) =>
  entities.filter(
    (entity) =>
      entity.start >= 0 &&
      entity.end <= content.length &&
      content.slice(entity.start, entity.end) === entity.label,
  )`,
  },
];

const comparisonCards = [
  {
    title: '纯文本评论',
    summary: '实现最轻，但无法稳定支撑 @提及、引用和结构化通知。',
  },
  {
    title: '富文本评论',
    summary: '表达力强，但实现和性能成本更高，适合内容型产品。',
  },
  {
    title: '轻量 mention 编辑器',
    summary: '最适合后台协作类系统，在复杂度和体验之间平衡最好。',
  },
];

const checklist = [
  '评论正文与 mention 实体必须分层存储。',
  'mention 搜索要做防抖、取消或乱序保护。',
  '插入、删除、回显都要围绕 mention 原子块定义行为。',
  '草稿恢复时要同时恢复文本和 mention 实体。',
  '消息通知要校验用户是否仍可被提及。',
  '输入法、复制粘贴和移动端软键盘场景要单独回归。',
];
</script>
