<template>
  <FullstackCapabilityArticle
    eyebrow="Frontend Drag Orchestration Engineering"
    title="前端拖拽编排工程"
    summary="拖拽最容易被做成一个能动的 demo，但真实业务里你要处理吸附、排序、跨容器、撤销、触屏、自动滚动和持久化。拖拽编排工程的重点不是让元素跟着鼠标走，而是让布局变化、数据变化和交互反馈始终保持同一套秩序。"
    :outcomes="outcomes"
    :quick-stages="quickStages"
    decision-title="拖拽编排先定数据模型和命中规则，再谈动画与交互"
    :guide-stages="guideStages"
    comparison-title="原生拖拽、指针事件、自定义画布拖拽三种路径的取舍"
    :comparison-cards="comparisonCards"
    checklist-title="拖拽编排上线前必须跑通的 6 项检查"
    :checklist="checklist"
  />
</template>

<script setup lang="ts">
import FullstackCapabilityArticle from '@/components/FullstackCapabilityArticle.vue';

const outcomes = [
  '能把拖拽从视觉效果拆成数据模型、命中策略、反馈动画和持久化四层。',
  '能实现排序、跨容器移动、自动滚动和拖拽结束后的状态提交。',
  '能判断什么时候该用 DOM 拖拽，什么时候该升级到指针事件或画布方案。',
];

const quickStages = [
  {
    order: '01',
    title: '先定数据而不是先写动效',
    summary: '拖拽结束后数据怎么变，才是第一优先级。',
  },
  {
    order: '02',
    title: '命中规则要可解释',
    summary: '插到前面还是后面，跨列还是同列，必须可预测。',
  },
  {
    order: '03',
    title: '反馈要轻',
    summary: '拖拽过程应该顺手，不能一动就抖、就掉帧。',
  },
  {
    order: '04',
    title: '结束态要可提交',
    summary: '拖完后要能落库存储，也要支持撤销。',
  },
  {
    order: '05',
    title: '移动端单独处理',
    summary: '鼠标事件不是触屏拖拽的完整答案。',
  },
];

const guideStages = [
  {
    order: '01',
    title: '先设计拖拽后的数据结构，不要只维护一堆位置信息',
    tag: '数据建模',
    description:
      '拖拽编排最终落地的是顺序、容器归属和布局状态，而不是屏幕上的像素值。更稳的做法是维护结构化数据，例如列、卡片、排序索引和父子关系。视觉坐标只在拖拽过程中临时使用，提交结果时还是要回归数据模型。',
    bestFor: ['看板拖拽', '表单设计器', '流程编排器', '低代码布局编辑'],
    focus: [
      '区分临时位移和最终结构状态',
      '为每个节点保留稳定 id',
      '把跨容器移动和同容器排序统一建模',
    ],
    risks: [
      '只维护 DOM 位置，不维护业务数据',
      '使用数组下标做唯一标识，拖拽后状态混乱',
      '拖拽提交时再反推结构，复杂度过高',
    ],
    language: 'ts',
    code: `type BoardColumn = {
  id: string
  cardIds: string[]
}

type BoardState = {
  columns: Record<string, BoardColumn>
}`,
  },
  {
    order: '02',
    title: '命中检测和插入策略必须稳定，否则用户会觉得“拖不准”',
    tag: '命中策略',
    description:
      '拖拽最核心的体验问题，不是动画，而是命中结果是否稳定。常见做法是根据当前指针位置和目标元素中线，判断插到前半区还是后半区；跨容器时则先决定目标容器，再决定容器内位置。整个判断逻辑要保持一致，不能一会儿按中心点，一会儿按边缘。',
    bestFor: ['列表排序', '看板卡片移动', '表单字段排序', '目录树拖拽'],
    focus: [
      '使用中线或阈值判断前后插入',
      '跨容器时先定目标容器再定索引',
      '拖拽预览位置要与最终落点一致',
    ],
    risks: [
      '命中规则频繁跳变，导致卡片来回抖动',
      '预览位置和提交结果不一致',
      '忽略空容器、边界容器等特殊情况',
    ],
    language: 'ts',
    code: `const getInsertSide = (pointerY: number, rect: DOMRect) => {
  const middle = rect.top + rect.height / 2
  return pointerY < middle ? 'before' : 'after'
}`,
  },
  {
    order: '03',
    title: '拖拽过程和提交过程要拆开，动画归动画，保存归保存',
    tag: '过程分层',
    description:
      '拖动中的跟手反馈应该尽量只更新临时状态，比如 transform、占位符和 hover 容器；只有在 drop 之后，才去真正改业务数据和调用保存接口。这样能显著降低拖动过程的状态抖动，也便于做撤销和失败回滚。',
    bestFor: [
      '复杂布局编辑',
      '多人协作排序',
      '有服务端持久化的拖拽场景',
      '需要撤销重做的界面',
    ],
    focus: [
      '拖动中只维护临时态',
      '放下后统一提交结构变更',
      '服务端失败时支持回滚或重试',
    ],
    risks: [
      '拖动中每一步都同步请求后端',
      '动画状态和真实状态混在一起',
      'drop 后无撤销路径，误操作成本高',
    ],
    language: 'ts',
    code: `const onDrop = async (payload: ReorderPayload) => {
  applyBoardPatch(payload)

  try {
    await saveBoardLayout(payload)
  } catch (error) {
    rollbackBoardPatch(payload)
    throw error
  }
}`,
  },
];

const comparisonCards = [
  {
    title: '原生 HTML5 Drag and Drop',
    summary: '上手快，但定制能力弱、移动端兼容一般，适合简单后台排序场景。',
  },
  {
    title: 'Pointer 事件自定义拖拽',
    summary:
      '控制力最强，适合复杂业务编排、自动滚动和高定制反馈，也是现代 Web 更常见的路径。',
  },
  {
    title: 'Canvas / WebGL 拖拽',
    summary:
      '适合节点很多、元素复杂或需要画布级编排的产品，但实现和调试复杂度最高。',
  },
];

const checklist = [
  '先有稳定的数据结构，再做拖拽动画和视觉反馈。',
  '命中规则必须统一，插入预览和最终结果不能不一致。',
  '拖动过程只维护临时态，落下后再提交真实变更。',
  '空容器、边缘位置、快速拖拽和自动滚动都要自测。',
  '移动端和桌面端事件模型要分开验证。',
  '失败回滚、撤销重做和埋点日志要一起设计。',
];
</script>
