<template>
  <FullstackCapabilityArticle
    eyebrow="Frontend Virtual Scrolling Engineering"
    title="前端虚拟滚动工程"
    summary="列表一多就卡，问题从来不只是渲染慢，而是一次性把几十万行 DOM、监听器和测量逻辑全压给浏览器。虚拟滚动工程真正解决的是：只渲染视口附近的数据、稳定复用节点、处理动态高度，并保证滚动体验和搜索定位都不崩。"
    :outcomes="outcomes"
    :quick-stages="quickStages"
    decision-title="虚拟滚动先确定数据规模和高度模型，再决定窗口策略"
    :guide-stages="guideStages"
    comparison-title="固定高度、动态高度、分段缓存三种方案的工程取舍"
    :comparison-cards="comparisonCards"
    checklist-title="列表上线前必须自查的 6 个点"
    :checklist="checklist"
  />
</template>

<script setup lang="ts">
import FullstackCapabilityArticle from '@/components/FullstackCapabilityArticle.vue';

const outcomes = [
  '能判断一个列表是否真的需要虚拟滚动，而不是见长列表就上复杂方案。',
  '能实现固定高度和动态高度两类窗口渲染，并理解滚动占位原理。',
  '能处理定位、选中、高亮、懒加载和动态数据插入等真实业务问题。',
];

const quickStages = [
  {
    order: '01',
    title: '先看规模',
    summary: '几百条数据和几万条数据，策略完全不是一个量级。',
  },
  {
    order: '02',
    title: '先定高度模型',
    summary: '固定高度最好做，动态高度最难做，也最容易抖动。',
  },
  {
    order: '03',
    title: '只渲染窗口',
    summary: '视口外的数据用占位高度表达，不真的生成 DOM。',
  },
  {
    order: '04',
    title: '滚动要可预估',
    summary: '列表跳转、锚点定位、选中回显都依赖滚动偏移的稳定计算。',
  },
  {
    order: '05',
    title: '性能要可观测',
    summary: '滚动掉帧、测量抖动、重排次数都要能看见。',
  },
];

const guideStages = [
  {
    order: '01',
    title: '先确认是不是“渲染瓶颈”，别把所有卡顿都甩给长列表',
    tag: '问题定位',
    description:
      '很多列表卡，不一定是节点太多，也可能是单行组件太重、监听器太多、滚动时做了同步布局测量。先确认是数据量问题还是单项渲染问题，再决定是否引入虚拟滚动。否则你会把简单问题做复杂。',
    bestFor: ['日志列表', '聊天消息流', '表格明细页', '组织树结果列表'],
    focus: [
      '先测 DOM 数量、首屏渲染时长和滚动 FPS',
      '区分“单项太重”和“一次性渲染太多”',
      '优先优化渲染热点，再上窗口化方案',
    ],
    risks: [
      '几百条数据就直接上虚拟滚动',
      '单行渲染逻辑很重，却只盯着列表容器',
      '没有基准数据就做技术选型',
    ],
    language: 'ts',
    code: `const shouldUseVirtualScroll = ({
  total,
  averageRowCost,
}: {
  total: number
  averageRowCost: number
}) => total > 300 && averageRowCost > 1.2`,
  },
  {
    order: '02',
    title: '固定高度场景先拿下，这是虚拟滚动最稳的主战场',
    tag: '窗口计算',
    description:
      '如果每一项高度固定，窗口计算会非常干净。你只要根据 `scrollTop / itemHeight` 算出起始索引，再额外加一点 overscan 作为缓冲区，就能稳定得到应该渲染的切片。这个方案性能最好，也最容易排查问题。',
    bestFor: ['管理后台表格', '简单消息列表', '日志流', '下拉长选项'],
    focus: [
      '用容器高度和单行高度计算可视数量',
      '预留 overscan，避免滚动时白屏',
      '通过 translateY 或占位块表达前置高度',
    ],
    risks: [
      '不加 overscan，快滚时出现空白',
      '滚动事件里做过多同步计算',
      '列表 key 不稳定导致节点频繁重建',
    ],
    language: 'ts',
    code: `const itemHeight = 44
const overscan = 6

const getWindowRange = (scrollTop: number, viewportHeight: number) => {
  const visibleCount = Math.ceil(viewportHeight / itemHeight)
  const start = Math.max(0, Math.floor(scrollTop / itemHeight) - overscan)
  const end = start + visibleCount + overscan * 2

  return { start, end }
}`,
  },
  {
    order: '03',
    title: '动态高度才是真实工程难点，必须把测量和缓存做稳',
    tag: '动态高度',
    description:
      '只要列表项高度会因为内容、图片、展开态而变化，就不能再靠单一 `itemHeight` 估算。更实用的做法是：先用预估高度占位，首轮渲染后测量真实高度并缓存，再逐步修正偏移映射。这样才能在性能和准确性之间平衡。',
    bestFor: ['富文本消息流', '评论列表', '医疗记录时间线', '混排附件列表'],
    focus: [
      '为每个节点维护高度缓存',
      '初始用估算值，渲染后再校准真实值',
      '避免滚动中反复全量测量造成重排',
    ],
    risks: [
      '每次滚动都同步遍历所有节点算高度',
      '没有缓存，导致定位抖动和滚动跳变',
      '图片加载后高度变化，却不做偏移修正',
    ],
    language: 'ts',
    code: `const sizeCache = new Map<number, number>()

const getItemSize = (index: number) => sizeCache.get(index) ?? 72

const updateItemSize = (index: number, size: number) => {
  if (sizeCache.get(index) === size) {
    return
  }

  sizeCache.set(index, size)
}`,
  },
];

const comparisonCards = [
  {
    title: '固定高度',
    summary:
      '实现最简单、性能最好，适合大多数后台表格和规则行高列表，是虚拟滚动的首选方案。',
  },
  {
    title: '动态高度',
    summary:
      '更贴近真实业务，但必须付出测量、缓存和滚动校准的复杂度，适合消息流与富内容列表。',
  },
  {
    title: '分段缓存',
    summary:
      '当数据量极大且存在跳转定位需求时，可按区段缓存偏移，减少每次从头累计的成本。',
  },
];

const checklist = [
  '先确认问题是不是由渲染量造成，而不是单行组件本身太重。',
  '固定高度优先，不要一上来就做动态高度。',
  '窗口计算要带 overscan，避免快速滚动白屏。',
  '滚动过程中不要频繁同步测量 DOM，尽量缓存并批处理。',
  '定位、高亮、选中和回滚位置都要在虚拟滚动下自测通过。',
  '埋点观察滚动 FPS、渲染数和重排次数，别只凭感觉说快。',
];
</script>
