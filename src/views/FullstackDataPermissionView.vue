<template>
  <FullstackCapabilityArticle
    eyebrow="Frontend Data Permission Engineering"
    title="前端数据权限工程"
    summary="菜单权限解决的是“你能不能看到页面”，数据权限解决的是“你在同一页面里到底能看到哪些数据、哪些字段、哪些操作范围”。真实业务里，部门树、本人数据、下属数据、跨租户数据、脱敏字段和导出范围都会在这里汇合。前端如果不把数据权限做成工程，页面很快就会充满一堆难以维护的 if。"
    :outcomes="outcomes"
    :quick-stages="quickStages"
    decision-title="数据权限先定义作用域模型，再决定页面过滤、字段脱敏和操作限制"
    :guide-stages="guideStages"
    comparison-title="页面级权限、数据级权限、字段级权限三层控制的职责边界"
    :comparison-cards="comparisonCards"
    checklist-title="数据权限上线前必须补齐的 6 个点"
    :checklist="checklist"
  />
</template>

<script setup lang="ts">
import FullstackCapabilityArticle from '@/components/FullstackCapabilityArticle.vue';

const outcomes = [
  '能分清菜单权限、数据权限和字段权限的边界，不再把三者混成一团。',
  '能为列表、详情、导出、搜索条件和敏感字段设计统一的数据权限模型。',
  '能避免前端散落权限判断，改成可配置、可回显、可联调的数据权限工程方案。',
];

const quickStages = [
  {
    order: '01',
    title: '先定作用域模型',
    summary:
      '先定义“本人、部门、下属、全部、自定义范围”等数据范围，再谈页面实现。',
  },
  {
    order: '02',
    title: '列表和详情分开看',
    summary: '能看到列表，不代表详情字段和历史记录也都能看到。',
  },
  {
    order: '03',
    title: '字段权限要独立',
    summary: '手机号、身份证、金额等敏感字段常常需要单独脱敏或隐藏。',
  },
  {
    order: '04',
    title: '导出权限单独控',
    summary: '页面可见不代表可批量导出，导出往往是更高风险动作。',
  },
  {
    order: '05',
    title: '前后端必须协同',
    summary: '前端负责表达和限制交互，最终的数据裁剪和校验必须由服务端兜底。',
  },
];

const guideStages = [
  {
    order: '01',
    title: '先把数据权限抽象成统一作用域，不要在页面里零散写判断',
    tag: '作用域建模',
    description:
      '真实项目里最容易失控的地方，是每个页面都自己判断“是不是本人”“是不是本部门”“是不是管理员”。更稳的做法是先抽象出统一的数据权限模型，例如 `SELF`、`DEPARTMENT`、`SUB_DEPARTMENT`、`ALL`、`CUSTOM`，页面只消费这个模型，而不是自己重新发明一套规则。',
    bestFor: ['组织型后台', '医疗机构系统', '多角色工单系统', '销售与运营平台'],
    focus: [
      '统一定义数据范围枚举与含义',
      '搜索条件和查询参数都围绕作用域模型构建',
      '前端页面只做消费，不重复定义权限语义',
    ],
    risks: [
      '每个页面自己写一套“本人/全部”判断',
      '角色一多后逻辑散落，没人敢改',
      '前端作用域字段与后端定义不一致',
    ],
    language: 'ts',
    code: `type DataScope =
  | 'SELF'
  | 'DEPARTMENT'
  | 'SUB_DEPARTMENT'
  | 'ALL'
  | 'CUSTOM'`,
  },
  {
    order: '02',
    title: '把页面可见、数据可见、字段可见拆开，别指望一个权限字段全搞定',
    tag: '权限分层',
    description:
      '菜单权限控制入口，数据权限控制记录范围，字段权限控制敏感内容展示，这三层职责完全不同。比如用户能打开患者列表页，不代表能看所有患者；能看某条记录，也不代表能看完整手机号或身份证。前端如果不分层，后面要么误放大权限，要么页面到处特判。',
    bestFor: ['敏感信息系统', '人员管理', '财务与审计页', '跨部门业务台'],
    focus: [
      '菜单权限只管入口和路由',
      '数据权限作用于查询、列表、详情记录范围',
      '字段权限作用于脱敏、隐藏和禁导出',
    ],
    risks: [
      '把页面能访问误认为数据全可见',
      '敏感字段直接跟着列表一起返回展示',
      '字段级限制遗漏在详情、导出等旁路功能',
    ],
    language: 'ts',
    code: `type FieldPermission = {
  canView: boolean
  maskType?: 'phone' | 'idCard' | 'amount'
}

type PagePermission = {
  dataScope: DataScope
  fields: Record<string, FieldPermission>
}`,
  },
  {
    order: '03',
    title: '查询条件、导出动作和批量操作都要挂到数据权限链路里',
    tag: '链路收口',
    description:
      '数据权限不只是后端少返回几条数据这么简单。前端还要约束查询表单里哪些组织节点可选、导出按钮是否可点、批量操作是否能跨范围执行、敏感字段是否显示明文。真正成熟的做法，是让列表、筛选、导出、详情、批量操作都共用同一套权限上下文。',
    bestFor: ['列表检索页', '导出中心', '批处理后台', '复杂详情页'],
    focus: [
      '搜索控件只开放当前用户可选的数据范围',
      '导出、批量删除、批量分配单独鉴权',
      '字段脱敏规则在列表和详情保持一致',
    ],
    risks: [
      '页面列表做了限制，但导出接口漏控',
      '搜索条件允许选到无权限的组织节点',
      '列表脱敏了，详情页却直接展示明文',
    ],
    language: 'ts',
    code: `const canExport = (permission: PagePermission) =>
  permission.dataScope === 'ALL' || permission.dataScope === 'CUSTOM'

const visibleDepartmentIds = computed(() =>
  resolveDepartmentsByScope(currentUser.value, permission.value.dataScope),
)`,
  },
];

const comparisonCards = [
  {
    title: '页面级权限',
    summary:
      '控制用户能不能进入某个菜单或路由，但不负责决定进入后能看到多少数据。',
  },
  {
    title: '数据级权限',
    summary:
      '控制列表、详情、搜索、批量操作等记录范围，是组织型系统里最核心的权限层。',
  },
  {
    title: '字段级权限',
    summary:
      '控制敏感字段展示、脱敏、隐藏与导出，是医疗、财务、人事系统里的高频要求。',
  },
];

const checklist = [
  '先有统一数据作用域模型，再让页面消费，不要页面自定义权限含义。',
  '菜单权限、数据权限、字段权限必须分层设计。',
  '列表、详情、导出、筛选和批量操作都要走同一套权限上下文。',
  '敏感字段的脱敏规则要在列表、详情、导出三处保持一致。',
  '前端限制只是体验和表达层，最终数据裁剪必须由后端兜底。',
  '联调时要覆盖本人、部门、管理员、越权查询、导出越权等关键场景。',
];
</script>
