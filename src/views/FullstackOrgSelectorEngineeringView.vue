<template>
  <FullstackCapabilityArticle
    eyebrow="Frontend Org Selector Engineering"
    title="前端组织架构选择器工程"
    summary="组织架构选择器不是一个普通树组件，而是后台系统里最常被低估、却最容易失控的基础能力。它往往同时承载部门树、人员搜索、懒加载、回显、单选多选、权限裁剪和虚拟滚动。如果没有工程化方案，业务一多就会变成满屏兼容代码。"
    :outcomes="outcomes"
    :quick-stages="quickStages"
    decision-title="组织选择器先统一数据模型，再处理加载策略、交互形式和性能边界"
    :guide-stages="guideStages"
    comparison-title="一次性加载、按层懒加载、搜索远端联想三种模式的取舍"
    :comparison-cards="comparisonCards"
    checklist-title="组织架构选择器上线前必须补齐的 6 个点"
    :checklist="checklist"
  />
</template>

<script setup lang="ts">
import FullstackCapabilityArticle from '@/components/FullstackCapabilityArticle.vue';

const outcomes = [
  '能把部门、岗位、人员节点抽象成统一结构，而不是每个业务各写一套树数据。',
  '能根据数据量选择一次性加载、懒加载或远程搜索，并处理好回显和权限裁剪。',
  '能把组织选择器沉淀成基础能力，支撑审批、分配、数据过滤、通讯录等多个模块复用。',
];

const quickStages = [
  {
    order: '01',
    title: '先统一节点模型',
    summary: '部门、人员、岗位都要挂到同一套节点协议上。',
  },
  {
    order: '02',
    title: '决定加载策略',
    summary: '小树可全量，大树要懒加载，超大规模要配合远程检索。',
  },
  {
    order: '03',
    title: '选中值要可回显',
    summary: '历史表单回填、详情只读、编辑复开都离不开稳定回显。',
  },
  {
    order: '04',
    title: '权限必须内置',
    summary: '组织选择范围往往与角色、租户、部门权限直接相关。',
  },
  {
    order: '05',
    title: '性能边界要前置',
    summary: '节点过多时要考虑虚拟滚动、搜索防抖和请求缓存。',
  },
];

const guideStages = [
  {
    order: '01',
    title: '把组织节点抽象成统一协议，别让树结构被业务拖着跑',
    tag: '数据建模',
    description:
      '最稳的做法是统一定义节点主键、父子关系、节点类型、是否可选、是否叶子、展示文案等基础字段。这样部门树、人员树、混合通讯录都能复用同一套渲染和交互逻辑，而不是每个业务页都重新适配一次。',
    bestFor: ['审批发起人选择', '部门分配', '人员选择弹窗', '角色授权页'],
    focus: [
      '统一 id、parentId、nodeType、selectable、leaf 字段',
      '前端树渲染只依赖协议，不依赖业务私有字段',
      '标签展示、回显和提交值使用同一主键规则',
    ],
    risks: [
      '后端返回结构不统一，页面写大量转换逻辑',
      '部门和人员节点混用导致交互错乱',
      '回显值和提交值不是同一个字段体系',
    ],
    language: 'ts',
    code: `type OrgNode = {
  id: string
  parentId: string | null
  nodeType: 'department' | 'user' | 'position'
  label: string
  leaf: boolean
  selectable: boolean
}`,
  },
  {
    order: '02',
    title: '先定加载模式，再决定组件交互，不要什么都默认全量树',
    tag: '加载策略',
    description:
      '树只有几百个节点时，一次性加载没有问题；但一旦进入集团、医院、教育等组织体系，节点规模会迅速放大。这个时候要优先决定是按层懒加载、按关键字远程搜索，还是树和搜索混合模式。交互设计必须服务数据规模，而不是反过来。',
    bestFor: [
      '大型组织后台',
      '多租户机构管理',
      '跨区域调度系统',
      '人员主数据平台',
    ],
    focus: [
      '节点规模小于阈值时允许全量树',
      '大树优先走懒加载并缓存子节点',
      '搜索框单独走远程接口，避免在大树上本地模糊匹配',
    ],
    risks: [
      '默认全量树导致首屏卡顿',
      '懒加载后回显链路断裂',
      '搜索结果和树节点不是同一数据协议',
    ],
    language: 'ts',
    code: `const resolveLoadMode = (nodeCount: number) => {
  if (nodeCount < 500) return 'eager'
  if (nodeCount < 5000) return 'lazy'
  return 'remote-search'
}`,
  },
  {
    order: '03',
    title: '回显、禁选、权限裁剪必须做成组件内能力，别丢给业务页兜底',
    tag: '交互稳定性',
    description:
      '组织选择器真正难的不是展开树，而是编辑态回显、部分节点禁选、仅展示授权范围、跨页复用时行为一致。成熟做法是把“值回显、权限过滤、已选节点聚合”都收进组件层，这样业务页只关心输入输出，不再参与细节兼容。',
    bestFor: ['编辑表单', '详情回填', '二次选择弹窗', '权限范围选择器'],
    focus: [
      '初始化时根据 value 反查完整节点信息',
      '禁选规则和权限过滤都在组件内部执行',
      '选中结果统一输出简洁值和完整节点快照',
    ],
    risks: [
      '编辑态只拿到 id 却无法回显文案',
      '权限范围过滤写在业务页导致行为不一致',
      '多选标签与树状态不同步',
    ],
    language: 'ts',
    code: `const buildSelectorPayload = (selectedNodes: OrgNode[]) =>
  selectedNodes.map((node) => ({
    id: node.id,
    label: node.label,
    nodeType: node.nodeType,
  }))`,
  },
];

const comparisonCards = [
  {
    title: '一次性加载',
    summary: '实现简单，适合中小规模数据，但节点一多就会拖慢首屏和交互。',
  },
  {
    title: '按层懒加载',
    summary: '适合大部分企业后台，性能和体验平衡最好，但要额外处理回显和缓存。',
  },
  {
    title: '远程搜索联想',
    summary:
      '适合超大组织结构，定位效率高，但不能替代树层级浏览，需要配合树视图使用。',
  },
];

const checklist = [
  '统一部门、人员、岗位节点协议，避免每个页面自己转换数据。',
  '根据节点规模决定加载模式，不要默认全量树。',
  '回显必须支持只拿 id 反查完整节点信息。',
  '权限裁剪和禁选规则要内置在组件层。',
  '搜索与树节点要使用同一协议，保证选中结果一致。',
  '大数据量场景要补缓存、防抖和虚拟滚动策略。',
];
</script>
