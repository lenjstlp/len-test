<template>
  <FullstackCapabilityArticle
    eyebrow="Frontend Tree Data Engineering"
    title="前端大数据树形组件工程"
    summary="树形组件看起来像“把数据递归渲染出来”就完了，但一到真实业务就会爆：十万节点权限树、组织架构选择器、知识目录、地图图层树、审批模板树、多选联动、懒加载、搜索定位、虚拟滚动和选中态回显全部会一起出现。真正的大数据树形组件工程，考验的是数据索引、交互状态和渲染性能的整体设计。"
    :outcomes="outcomes"
    :quick-stages="quickStages"
    decision-title="大数据树形组件工程先定数据规模、交互能力和索引结构，再决定渲染方式"
    :guide-stages="guideStages"
    comparison-title="直接递归渲染、懒加载树、虚拟树三种实现方式的工程边界"
    :comparison-cards="comparisonCards"
    checklist-title="上线大数据树形组件前必须自查的 6 个点"
    :checklist="checklist"
  />
</template>

<script setup lang="ts">
import FullstackCapabilityArticle from '@/components/FullstackCapabilityArticle.vue';

const outcomes = [
  '能把组织架构树、权限树、目录树、图层树做成在大数据量下仍可用的稳定组件。',
  '能分清原始树数据、拍平索引、展开状态、勾选状态和搜索定位这些不同层次的状态职责。',
  '能在懒加载、搜索、虚拟滚动和多选联动并存时保持性能和交互一致性。',
];

const quickStages = [
  {
    order: '01',
    title: '先确认规模',
    summary: '一千节点和十万节点不是一个问题，渲染策略必须随规模变化。',
  },
  {
    order: '02',
    title: '状态分层',
    summary: '原始树、拍平列表、展开态、选中态、过滤结果不能混成一个对象。',
  },
  {
    order: '03',
    title: '索引先于渲染',
    summary: '父子映射、路径索引、关键字索引准备好，交互才能稳。',
  },
  {
    order: '04',
    title: '大树默认别全展开',
    summary: '懒加载、按需展开和虚拟列表通常要一起上。',
  },
  {
    order: '05',
    title: '搜索定位要可回显',
    summary: '找到节点只是第一步，让它自动展开祖先并滚动定位才算完成。',
  },
];

const guideStages = [
  {
    order: '01',
    title: '树形组件真正的难点不是递归，而是规模和状态爆炸',
    tag: '问题建模',
    description:
      '几十个节点时，递归渲染足够；几千上万节点时，问题就变成了状态治理。你要同时处理展开、收起、半选、多选、搜索命中、路径高亮、懒加载占位、异步回填和滚动定位。真正的工程实现，必须先把这些状态拆开建模。',
    bestFor: ['组织架构树', '权限树', '知识目录树', '地图图层树'],
    focus: [
      '先识别业务规模和交互复杂度',
      '不要把所有状态都挂回原始树节点上',
      '组件设计目标应覆盖搜索、勾选、懒加载和定位能力',
    ],
    risks: [
      '原始树对象被塞满临时 UI 字段，难以维护',
      '节点量一大就全靠递归重渲染硬顶',
      '搜索、选中和展开状态互相覆盖',
    ],
    language: 'ts',
    code: `type TreeNode = {
  id: string
  parentId: string | null
  label: string
  children?: TreeNode[]
}`,
  },
  {
    order: '02',
    title: '大树要先建立拍平索引，别每次交互都重新深度遍历整棵树',
    tag: '索引结构',
    description:
      '真正高频的不是“渲染整棵树”，而是“查这个节点的父链”“找所有可见节点”“把搜索命中的祖先全部展开”“算勾选联动”。这些动作都应该建立在拍平索引之上，例如 `nodeMap`、`parentMap`、`childrenMap` 和 `pathMap`。',
    bestFor: ['权限勾选联动', '搜索定位', '节点快速跳转', '大规模树操作'],
    focus: [
      '把树转换成多种索引而不是反复 DFS',
      '父链和子链映射要提前准备好',
      '可见节点列表要从展开状态推导生成',
    ],
    risks: [
      '每点一次节点都重扫整棵树，性能迅速变差',
      '展开祖先链只能临时递归回溯，逻辑重复',
      '选中态联动和搜索定位各写一套遍历',
    ],
    language: 'ts',
    code: `type TreeIndex = {
  nodeMap: Map<string, TreeNode>
  parentMap: Map<string, string | null>
  childrenMap: Map<string, string[]>
}`,
  },
  {
    order: '03',
    title: '展开态、勾选态、半选态必须和原始数据分离',
    tag: '状态分层',
    description:
      '树组件最容易烂掉的原因，是把“节点数据”和“节点界面状态”硬绑在一起。真正稳的做法，是让原始树只存业务数据，展开态用 `Set`，勾选态用 `Set`，半选态由子节点状态计算，搜索结果再单独维护。这样各种状态才不会互相污染。',
    bestFor: ['多选树', '权限配置树', '审批模板树', '图层管理树'],
    focus: [
      '原始数据、展开态和选择态严格分层',
      '半选态尽量由计算推导，不手工到处写入',
      '状态更新优先围绕节点 ID 而不是节点对象引用',
    ],
    risks: [
      '节点对象里塞满 expanded、checked、matched 等字段',
      '局部更新后半选态没有统一重算',
      '树数据刷新一次，所有交互状态全部丢失',
    ],
    language: 'ts',
    code: `const expandedKeys = new Set<string>()
const checkedKeys = new Set<string>()
const halfCheckedKeys = new Set<string>()`,
  },
  {
    order: '04',
    title: '十万级树节点下，虚拟化和懒加载通常要一起上',
    tag: '渲染性能',
    description:
      '如果节点量很大，默认一次渲染所有可见 DOM 注定会卡。真正可用的方案通常是：数据层做懒加载，界面层对拍平后的可见节点列表做虚拟滚动。前者减少数据压力，后者减少 DOM 压力，两者缺一不可。',
    bestFor: ['超大组织架构', '日志目录树', '地图图层树', '知识库目录'],
    focus: [
      '按需加载子节点，不要默认全量拉取',
      '对可见节点列表做虚拟列表渲染',
      '搜索高亮和滚动定位要和虚拟列表联动',
    ],
    risks: [
      '一次性渲染几千上万个节点导致页面卡死',
      '懒加载后搜索不到未展开节点，体验割裂',
      '虚拟滚动后节点定位和自动展开逻辑写乱',
    ],
    language: 'ts',
    code: `const visibleNodeIds = flattenVisibleTree({
  rootIds,
  expandedKeys,
  childrenMap,
})`,
  },
  {
    order: '05',
    title: '搜索定位不是 filter 一下就结束，必须自动展开祖先并滚动到目标',
    tag: '搜索体验',
    description:
      '树组件搜索最差的实现，是把不匹配节点全部隐藏后让用户自己找。真正的工程体验应该是：命中后自动展开祖先链、保留上下文、支持高亮关键字，并在虚拟列表中自动滚动到目标节点，让搜索成为“直接到达”的能力。',
    bestFor: ['组织选人', '知识目录检索', '配置树查找', '图层快速定位'],
    focus: [
      '搜索命中后自动补全祖先展开态',
      '滚动定位和高亮要联动实现',
      '搜索模式和普通浏览模式的状态切换要有边界',
    ],
    risks: [
      '搜索只过滤结果，不展开祖先导致节点仍然不可见',
      '定位到节点后没高亮，用户不知道哪个是命中项',
      '退出搜索后树状态全部丢失，体验割裂',
    ],
    language: 'ts',
    code: `const expandPath = (path: string[]) => {
  for (const id of path) {
    expandedKeys.add(id)
  }
}`,
  },
];

const comparisonCards = [
  {
    title: '直接递归渲染',
    summary:
      '适合节点量较小、交互简单的树，一旦规模和状态复杂度上来，很快就会卡和乱。',
  },
  {
    title: '懒加载树',
    summary:
      '适合数据量大但用户不会一次看全量的场景，能减轻数据压力，但仍需处理局部展开性能。',
  },
  {
    title: '虚拟树',
    summary:
      '适合大规模可见节点场景，能控制 DOM 数量，但前提是先把树拍平成可见列表来驱动渲染。',
  },
];

const checklist = [
  '先明确节点规模和交互复杂度，再决定是否需要懒加载和虚拟化。',
  '原始树数据、展开态、勾选态、半选态和搜索结果必须分层管理。',
  '父链、子链、节点映射和路径索引要提前建立，别靠每次 DFS 临时算。',
  '大树场景不要默认全展开，数据层和渲染层都要做按需处理。',
  '搜索命中后必须自动展开祖先链，并支持滚动定位和高亮。',
  '节点刷新、懒加载回填和选择态联动要有统一状态收口，避免互相污染。',
];
</script>
