<template>
  <FullstackCapabilityArticle
    eyebrow="Frontend Environment Switch Engineering"
    title="前端环境切换工程"
    summary="环境切换工程不是下拉框选个 dev、test、prod 就结束了。真正业务系统里的环境切换，往往还涉及权限隔离、租户隔离、接口域名、地图资源、配置版本、缓存清理和危险操作提醒。处理不好，最容易引发误操作事故。"
    :outcomes="outcomes"
    :quick-stages="quickStages"
    decision-title="环境切换先定义上下文边界，再治理权限、缓存、资源和风险提示"
    :guide-stages="guideStages"
    comparison-title="纯地址切换、上下文切换、受控环境治理三种路线的差异"
    :comparison-cards="comparisonCards"
    checklist-title="环境切换工程上线前必须补齐的 6 个点"
    :checklist="checklist"
  />
</template>

<script setup lang="ts">
import FullstackCapabilityArticle from '@/components/FullstackCapabilityArticle.vue';

const outcomes = [
  '能把环境切换从简单变量切换升级为完整上下文治理，避免误操作和状态污染。',
  '能处理接口域名、配置版本、资源地址、缓存与权限随环境切换同步刷新。',
  '能为多环境后台、多租户平台、配置中心设计更安全的环境切换方案。',
];

const quickStages = [
  {
    order: '01',
    title: '先定环境上下文',
    summary: '环境切换到底会影响哪些资源和权限，必须先说清。',
  },
  {
    order: '02',
    title: '高风险环境提醒',
    summary: '生产环境和测试环境的交互反馈不能一样。',
  },
  {
    order: '03',
    title: '缓存要重建',
    summary: '环境一变，接口缓存、字典缓存、用户上下文都要校验。',
  },
  {
    order: '04',
    title: '权限与租户同步',
    summary: '环境切换常常伴随权限范围变化，不能只改接口地址。',
  },
  {
    order: '05',
    title: '切换过程可追踪',
    summary: '谁切到哪个环境、何时切换，要有记录。',
  },
];

const guideStages = [
  {
    order: '01',
    title: '环境切换真正切换的不是地址，而是整套业务上下文',
    tag: '上下文边界',
    description:
      '很多团队把环境切换理解成 API BaseURL 切换，但真实系统里，环境通常还影响资源域名、配置中心、地图服务、字典版本、权限范围甚至租户集合。前端必须先定义“环境上下文”到底包含哪些内容，再去设计切换动作。',
    bestFor: ['多环境后台', '配置平台', '地图系统', '多租户企业系统'],
    focus: [
      '环境上下文覆盖接口、资源、配置和权限',
      '切换动作不是单点变量修改，而是整体上下文刷新',
      '页面组件不直接散落读取环境细节',
    ],
    risks: [
      '只切了接口地址，其他资源仍指向旧环境',
      '页面里各自读取环境变量，行为不一致',
      '环境切换后上下文状态残留',
    ],
    language: 'ts',
    code: `type EnvironmentContext = {
  env: 'dev' | 'test' | 'staging' | 'prod'
  apiBaseUrl: string
  assetBaseUrl: string
  tenantScope: string[]
}`,
  },
  {
    order: '02',
    title: '环境切换最大的风险，不是切不过去，而是切过去后用户没意识到',
    tag: '风险提醒',
    description:
      '生产环境误操作往往不是因为用户权限太大，而是因为系统没有给足够明显的上下文提醒。成熟做法通常会在高风险环境下强化顶部提示、颜色标识、确认弹窗和关键按钮二次确认，让用户时刻知道自己当前操作的环境。',
    bestFor: ['生产后台', '高风险控制台', '多环境管理平台', '审批配置系统'],
    focus: [
      '高风险环境视觉提示明显',
      '关键操作在高风险环境附加确认',
      '环境切换结果在全局显式展示',
    ],
    risks: [
      '用户误以为自己在测试环境操作生产数据',
      '关键危险按钮缺少环境上下文提醒',
      '环境切换后页面视觉没有任何差异',
    ],
    language: 'ts',
    code: `const isHighRiskEnv = (env: EnvironmentContext['env']) =>
  env === 'prod' || env === 'staging'`,
  },
  {
    order: '03',
    title: '环境切换之后，缓存、权限和字典都要跟着重建',
    tag: '切换重建',
    description:
      '如果切到新环境后仍沿用旧环境缓存，你看到的页面状态很可能是错的。成熟环境切换会同步重建接口缓存、字典缓存、用户信息、可访问菜单和租户范围，让页面真正进入新的上下文，而不是表面切换。',
    bestFor: ['长生命周期单页应用', '复杂工作台', '多标签后台', '配置中心'],
    focus: [
      '环境切换时统一清理或重建关键缓存',
      '权限菜单和租户信息重新拉取',
      '避免旧环境状态泄漏到新环境',
    ],
    risks: [
      '切换后页面仍显示旧环境数据',
      '权限菜单未刷新导致功能越权或缺失',
      '旧环境缓存和新环境数据混用',
    ],
    language: 'ts',
    code: `const switchEnvironment = async (nextEnv: EnvironmentContext) => {
  clearRequestCache()
  clearDictionaryCache()
  await reloadUserContext(nextEnv)
}`,
  },
];

const comparisonCards = [
  {
    title: '纯地址切换',
    summary: '实现最轻，但容易留下大量上下文残留和误操作风险。',
  },
  {
    title: '上下文切换',
    summary: '适合大多数多环境后台，能显著提升稳定性和可控性。',
  },
  {
    title: '受控环境治理',
    summary: '适合高风险平台，安全性最好，但实现和约束都更重。',
  },
];

const checklist = [
  '先明确环境切换影响的上下文边界。',
  '高风险环境必须有明显视觉和交互提醒。',
  '切换后缓存、权限、字典和租户信息要同步重建。',
  '页面不要各自散落读取环境细节。',
  '环境切换动作最好有审计记录。',
  '关键操作要根据环境动态提升确认级别。',
];
</script>
