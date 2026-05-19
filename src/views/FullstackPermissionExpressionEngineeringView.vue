<template>
  <FullstackCapabilityArticle
    eyebrow="Frontend Permission Expression Engineering"
    title="前端权限表达式工程"
    summary="权限控制如果只停留在按钮显隐，会很快失控。真正复杂的是角色、组织、数据范围、页面状态和业务阶段叠加后的表达式治理。做不好，权限逻辑会散落在每个组件里，最后没人敢动。"
    :outcomes="outcomes"
    :quick-stages="quickStages"
    decision-title="权限表达式先统一条件模型，再治理数据范围、页面状态和组件级复用"
    :guide-stages="guideStages"
    comparison-title="纯角色判断、页面级权限、表达式化权限引擎三种路线的差异"
    :comparison-cards="comparisonCards"
    checklist-title="权限表达式工程上线前必须补齐的 6 个点"
    :checklist="checklist"
  />
</template>

<script setup lang="ts">
import FullstackCapabilityArticle from '@/components/FullstackCapabilityArticle.vue';

const outcomes = [
  '能把权限判断从 scattered if/else 升级成可复用表达式，而不是在每个组件手写条件分支。',
  '能同时处理角色、组织、状态、阶段、数据归属等复合权限条件。',
  '能为中后台、医疗系统、审批系统、数据看板等场景建立可维护的前端权限判断层。',
];

const quickStages = [
  {
    order: '01',
    title: '先定权限上下文',
    summary: '用户角色、组织、数据归属、页面状态要统一进入上下文对象。',
  },
  {
    order: '02',
    title: '条件表达结构化',
    summary: '权限判断别散落在模板里，要能表达 AND/OR 关系。',
  },
  {
    order: '03',
    title: '按钮和字段都可复用',
    summary: '不仅按钮显隐，字段编辑态和页面块级权限也要统一判断。',
  },
  {
    order: '04',
    title: '页面状态纳入条件',
    summary: '同一个人，不同流程阶段权限也会不同。',
  },
  {
    order: '05',
    title: '调试和可视化友好',
    summary: '权限为什么不通过，要能解释出来。',
  },
];

const guideStages = [
  {
    order: '01',
    title: '别再在模板里堆权限 if 了，先抽统一权限上下文',
    tag: '上下文模型',
    description:
      '稳定的权限工程第一步，不是写更多 `v-if`，而是先把权限判断依赖的所有信息抽成统一上下文，比如用户角色、组织 id、数据拥有者、页面状态、流程阶段。只有上下文一致，权限表达式才有统一输入。',
    bestFor: ['中后台权限', '审批系统', '医疗病历权限', '多组织平台'],
    focus: [
      '权限输入上下文统一建模',
      '组件不直接散读多处状态',
      '权限判断函数统一依赖同一份上下文',
    ],
    risks: [
      '每个组件自己拼权限条件',
      '权限输入来源不一致，结果无法追踪',
      '页面状态一变，多处条件同时失效',
    ],
    language: 'ts',
    code: `type PermissionContext = {
  roles: string[]
  orgId: string
  ownerId?: string
  stage?: string
  status?: string
}`,
  },
  {
    order: '02',
    title: '权限规则一复杂，就必须支持 AND/OR 表达式，而不是一层层硬写',
    tag: '表达式模型',
    description:
      '现实权限场景经常是“角色是 A 且状态是草稿，或者角色是 B 且本人创建”。这种规则如果直接堆在模板条件里，很快就无法维护。更稳的方式是把权限规则抽成表达式树，让前端统一解释执行。',
    bestFor: ['复合权限判断', '字段级权限', '操作级权限', '多状态页面'],
    focus: [
      '支持 and/or/not 的表达式树',
      '基础条件原子化，可组合复用',
      '权限判断结果可解释',
    ],
    risks: [
      '权限规则一复杂就没人敢改',
      '同样规则在多个页面重复抄写',
      '条件优先级写错导致权限穿透',
    ],
    language: 'ts',
    code: `type PermissionExpr =
  | { type: 'role'; value: string }
  | { type: 'status'; value: string }
  | { type: 'and'; children: PermissionExpr[] }
  | { type: 'or'; children: PermissionExpr[] }`,
  },
  {
    order: '03',
    title: '真正好用的权限层，不只决定“看不看得见”，还要决定“能不能操作”',
    tag: '能力分层',
    description:
      '权限不只是按钮显隐，还有字段是否可编辑、某个模块是否只读、某个列表是否能看详情、某个 Tab 是否能进入。把权限结果抽成 read/write/hidden 这类能力层，比简单布尔值更接近真实业务需求。',
    bestFor: ['表单权限', '列表操作权限', '模块只读态', '阶段性编辑限制'],
    focus: [
      '权限结果支持 hidden/readonly/editable 等层级',
      '统一封装按钮、字段、区块级权限组件',
      '调试时能说明是哪条规则命中的',
    ],
    risks: [
      '只能做显隐，做不了只读态控制',
      '同一个权限在不同组件行为不一致',
      '权限不通过时无法解释原因',
    ],
    language: 'ts',
    code: `type PermissionDecision = 'hidden' | 'readonly' | 'editable'`,
  },
];

const comparisonCards = [
  {
    title: '纯角色判断',
    summary: '最简单，但一旦叠加状态和数据范围就会迅速崩掉。',
  },
  {
    title: '页面级权限',
    summary: '能解决一部分模块显隐问题，但操作级控制仍然不够细。',
  },
  {
    title: '表达式化权限引擎',
    summary: '更适合复杂业务系统，维护成本可控，复用价值最高。',
  },
];

const checklist = [
  '权限上下文必须统一建模。',
  '复杂权限规则要用表达式结构承载。',
  '权限结果最好支持 hidden/read-only/editable 多层级。',
  '按钮、字段、区块权限要统一封装。',
  '权限不通过原因要可调试、可解释。',
  '前端权限只做体验控制，后端仍要做最终校验。',
];
</script>
