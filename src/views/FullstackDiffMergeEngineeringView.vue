<template>
  <FullstackCapabilityArticle
    eyebrow="Frontend Diff Merge Engineering"
    title="前端差异对比与合并工程"
    summary="很多业务系统最终都会碰到“版本对比”“前后变更”“驳回修改”“模板差异”这类需求。差异对比与合并不是简单把两段文本放在左右两栏，而是要处理字段级变化、高亮、冲突决策、局部采纳和最终回写，是真正偏编辑器和协作能力的工程模块。"
    :outcomes="outcomes"
    :quick-stages="quickStages"
    decision-title="差异对比先确定对比粒度，再设计冲突表达、采纳流程和结果回写"
    :guide-stages="guideStages"
    comparison-title="纯文本 diff、结构化字段 diff、可交互合并三种路线的差异"
    :comparison-cards="comparisonCards"
    checklist-title="差异对比与合并上线前必须补齐的 6 个点"
    :checklist="checklist"
  />
</template>

<script setup lang="ts">
import FullstackCapabilityArticle from '@/components/FullstackCapabilityArticle.vue';

const outcomes = [
  '能区分文本对比、字段对比和可交互合并三种不同层级的需求，不再一把梭用通用 diff。',
  '能为病历修订、配置比对、模板审批、内容审核设计清晰的差异展示与采纳流程。',
  '能处理字段级冲突、局部采纳、版本来源标记和最终合并结果回写。',
];

const quickStages = [
  {
    order: '01',
    title: '先定对比粒度',
    summary: '是整段文本对比，还是按字段、按区块、按节点对比，必须先定清楚。',
  },
  {
    order: '02',
    title: '冲突表达明确',
    summary: '新增、删除、修改、双方同时改动要有不同视觉语义。',
  },
  {
    order: '03',
    title: '支持局部采纳',
    summary: '真实业务通常不是全盘接受某一边，而是逐项挑选合并。',
  },
  {
    order: '04',
    title: '来源要可追踪',
    summary: '每一处变化来自谁、何时、哪个版本，往往都需要展示。',
  },
  {
    order: '05',
    title: '回写链路闭环',
    summary: '用户选完差异之后，如何生成最终结果并保存，要有明确协议。',
  },
];

const guideStages = [
  {
    order: '01',
    title: '不要一上来就做文本 diff，先确认业务真正关心哪一级变化',
    tag: '对比粒度',
    description:
      '有些场景只需要看一段文本改了什么，有些场景更关心某个字段有没有变化，还有些场景甚至要按树节点或配置项级别对比。真正稳的做法，是先确定业务需要的最小对比单位，再选对应 diff 方案，而不是默认所有内容都按纯文本处理。',
    bestFor: ['病历修订', '表单模板审批', '配置中心比对', '内容审核系统'],
    focus: [
      '先定义对比单位：文本、字段、节点、区块',
      '不同粒度对应不同展示策略',
      '结果数据结构要能承接后续局部采纳',
    ],
    risks: [
      '把结构化数据强行转成文本做 diff',
      '展示高亮很多，但用户看不懂业务含义',
      '后续无法做逐项采纳',
    ],
    language: 'ts',
    code: `type DiffItem = {
  key: string
  type: 'added' | 'removed' | 'changed' | 'conflict'
  leftValue: string
  rightValue: string
}`,
  },
  {
    order: '02',
    title: '差异展示不只是高亮颜色，还要讲清谁改了什么、影响哪一段',
    tag: '变化表达',
    description:
      '一个好用的 diff 页面，至少要让用户快速看懂这次变化是新增、删除还是修改，来自哪个版本，是否存在冲突。对于结构化字段，还要有字段标签、原值、新值和必要说明。否则再漂亮的高亮，也只是机器看得懂的差异，不是人能决策的差异。',
    bestFor: ['审批比对页', '版本审阅', '配置差异页', '修订审核'],
    focus: [
      '新增、删除、修改、冲突用不同视觉语义',
      '字段名、版本来源、更新时间一起展示',
      '复杂内容支持展开原文与精简视图切换',
    ],
    risks: [
      '只有颜色没有语义标签',
      '用户不知道左边右边分别代表什么版本',
      '冲突项和普通修改项混在一起',
    ],
    language: 'ts',
    code: `const resolveDiffTag = (type: DiffItem['type']) => {
  return {
    added: '新增',
    removed: '删除',
    changed: '修改',
    conflict: '冲突',
  }[type]
}`,
  },
  {
    order: '03',
    title: '合并能力要围绕“局部采纳”设计，而不是只支持全量覆盖',
    tag: '合并回写',
    description:
      '真实业务里的合并，通常是“这三项保留左边，那两项采用右边，还有一项手动编辑”。所以前端必须允许逐项采纳、冲突决策和最终结果预览。最后还要把合并结果转成可提交的数据结构，而不是只在页面上看着像合并完成。',
    bestFor: ['版本修订审核', '模板合并', '配置覆盖决策', '多人编辑冲突处理'],
    focus: [
      '每个差异项支持单独采纳左值或右值',
      '冲突项支持手动编辑最终结果',
      '提交前能预览完整合并结果',
    ],
    risks: [
      '只能全量覆盖其中一个版本',
      '局部采纳后无法生成最终 payload',
      '冲突处理结果没法回写后端',
    ],
    language: 'ts',
    code: `type MergeDecision = {
  key: string
  source: 'left' | 'right' | 'manual'
  value: string
}`,
  },
];

const comparisonCards = [
  {
    title: '纯文本 diff',
    summary: '适合代码或长文本对比，实现快，但不适合结构化业务数据决策。',
  },
  {
    title: '结构化字段 diff',
    summary: '适合表单、配置、病历等业务系统，可读性强，便于审批判断。',
  },
  {
    title: '可交互合并',
    summary: '最适合需要逐项采纳的复杂场景，但实现和回写协议要求最高。',
  },
];

const checklist = [
  '先明确业务需要的对比粒度，不要默认走纯文本 diff。',
  '新增、删除、修改、冲突要有明确语义和视觉区分。',
  '左右版本的来源、时间、操作者要能看清楚。',
  '支持逐项采纳、局部覆盖和必要的手动编辑。',
  '最终合并结果必须能导出为稳定的提交 payload。',
  '长文本、大对象和嵌套结构要提前评估性能与渲染策略。',
];
</script>
