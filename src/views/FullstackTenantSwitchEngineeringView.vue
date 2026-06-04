<template>
  <FullstackCapabilityArticle
    eyebrow="Frontend Tenant Switching Engineering"
    title="前端租户切换工程"
    summary="租户切换不是把一个 tenantId 存进 localStorage 就结束了。真正复杂的系统里，切换租户会同时影响登录态、权限、缓存、菜单、接口上下文、标签页同步和未保存数据。这个能力如果没工程化，用户切换一次租户，页面状态就会越来越脏。"
    :outcomes="outcomes"
    :quick-stages="quickStages"
    decision-title="租户切换先收敛上下文边界，再处理同步、清理和回退链路"
    :guide-stages="guideStages"
    comparison-title="整页强刷、局部热切换、受控切换三种租户切换方案的差异"
    :comparison-cards="comparisonCards"
    checklist-title="租户切换上线前必须补齐的 6 个点"
    :checklist="checklist"
  />
</template>

<script setup lang="ts">
import FullstackCapabilityArticle from '@/components/FullstackCapabilityArticle.vue';

const outcomes = [
  '能拆清租户切换会影响哪些前端上下文，而不是只改一个请求头。',
  '能设计租户切换时的缓存清理、权限刷新、跨标签页同步和异常回退方案。',
  '能把租户切换沉淀成后台系统、SaaS 平台和医疗多机构系统共用能力。',
];

const quickStages = [
  {
    order: '01',
    title: '先收敛租户上下文',
    summary: '租户切换会影响 token、权限、菜单、缓存和当前业务数据。',
  },
  {
    order: '02',
    title: '切换动作要受控',
    summary: '不能用户点一下就直接切，必须先确认是否有未保存数据和高风险操作。',
  },
  {
    order: '03',
    title: '缓存必须分租户隔离',
    summary: '接口缓存、表单草稿、查询条件和本地快照都不能跨租户串用。',
  },
  {
    order: '04',
    title: '多标签页要同步',
    summary: '一个页签切租户，其他页签必须及时收敛到同一状态。',
  },
  {
    order: '05',
    title: '失败后要能回滚',
    summary: '切租户失败不能把 UI 留在一半新状态、一半旧状态的中间态。',
  },
];

const guideStages = [
  {
    order: '01',
    title: '先定义“租户上下文”到底包括什么',
    tag: '边界建模',
    description:
      '租户切换工程最容易做错的地方，是把租户理解成一个简单 id。真实系统里，租户上下文往往包括当前租户 id、角色集合、菜单树、接口请求头、数据权限、机构范围、主题配置和本地缓存命名空间。只有边界收敛清楚，后面的清理和刷新动作才有标准。',
    bestFor: ['SaaS 平台', '多机构医疗系统', '多公司后台', '多组织工作台'],
    focus: [
      '统一维护 activeTenant 上下文对象',
      '区分租户级状态、用户级状态和页面级状态',
      '把缓存 key 设计成带 tenantId 的命名空间',
    ],
    risks: [
      '把租户上下文只做成一个请求头',
      '用户级缓存和租户级缓存混在一起',
      '切换后页面展示还是旧租户数据',
    ],
    language: 'ts',
    code: `type TenantContext = {
  tenantId: string
  tenantName: string
  roleCodes: string[]
  permissionVersion: string
  apiNamespace: string
}`,
  },
  {
    order: '02',
    title: '切换前必须先做脏状态确认，不要让用户未保存内容直接丢失',
    tag: '切换守卫',
    description:
      '如果当前页面还有未保存表单、正在编辑的富文本、批量导入进度或待提交审批单，租户切换就不能无感发生。更稳的做法是统一注册“切换前守卫”，让页面上报自己是否可安全切换，必要时弹出确认框或要求先保存草稿。',
    bestFor: ['表单后台', '富文本编辑页', '审批流系统', '导入导出任务页'],
    focus: [
      '设计统一的 canLeave / beforeTenantSwitch 协议',
      '高风险页面可阻止切换或要求确认',
      '切换确认文案要明确说明会丢失什么',
    ],
    risks: [
      '租户切换直接强刷导致编辑内容丢失',
      '每个页面各写一套确认逻辑',
      '用户不知道哪些状态会被清空',
    ],
    language: 'ts',
    code: `const canSwitchTenant = async () => {
  const blockers = collectTenantSwitchBlockers()
  return blockers.every((item) => item.safe)
}`,
  },
  {
    order: '03',
    title: '切换动作要拆成“清理旧上下文、拉取新上下文、广播同步”三步',
    tag: '状态收敛',
    description:
      '真正稳定的租户切换不会只做一次接口请求。更合理的顺序是：先冻结 UI 入口，清理旧租户的缓存和请求上下文；再拉取新租户的权限、菜单和初始化数据；最后广播给其他标签页同步切换结果。这样做虽然步骤多，但状态更可控。',
    bestFor: [
      '复杂后台系统',
      '多标签页工作台',
      '高权限业务系统',
      '配置中心场景',
    ],
    focus: [
      '旧租户缓存先清理再拉新数据',
      '切换期间冻结高风险操作按钮',
      '通过 BroadcastChannel 同步其他标签页',
    ],
    risks: [
      '新旧租户缓存并存造成串数据',
      '其他页签继续拿旧租户 token 发请求',
      '切换过程中还能继续提交业务动作',
    ],
    language: 'ts',
    code: `await tenantSession.clearScopedCache(oldTenantId)
const nextContext = await tenantSession.bootstrap(nextTenantId)
broadcastTenantChange(nextContext)`,
  },
];

const comparisonCards = [
  {
    title: '整页强刷',
    summary: '实现最省事，但用户体验最差，也不利于切换前的风险控制和状态确认。',
  },
  {
    title: '局部热切换',
    summary: '切换更顺滑，但如果缓存隔离和权限刷新没做好，最容易留下脏状态。',
  },
  {
    title: '受控切换',
    summary:
      '先确认、再清理、再拉取、再广播，工程成本更高，但最适合长期系统治理。',
  },
];

const checklist = [
  '先定义哪些状态属于租户级，哪些属于用户级，不能混用。',
  '租户切换前统一检查未保存数据、长任务和危险操作。',
  '缓存 key、草稿箱、查询条件和接口数据都要带 tenantId 命名空间。',
  '切换完成后必须刷新权限、菜单、用户范围和默认查询上下文。',
  '多标签页必须同步租户切换，避免旧页签继续操作旧数据。',
  '切换失败要能回滚到旧租户上下文，不能把页面留在半切换状态。',
];
</script>
