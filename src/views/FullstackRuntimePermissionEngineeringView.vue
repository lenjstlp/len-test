<template>
  <FullstackCapabilityArticle
    eyebrow="Frontend Runtime Permission"
    title="前端运行时权限工程"
    summary="真正可维护的权限，不是把菜单写死在前端，而是把页面权限、按钮权限、数据权限和路由权限统一纳入运行时策略，让权限变化只改配置和后端返回结果。"
    :outcomes="outcomes"
    :quick-stages="quickStages"
    decision-title="把路由、按钮和数据权限统一成同一套运行时权限模型"
    :guide-stages="guideStages"
    comparison-title="静态权限、路由级权限、运行时细粒度权限三种方式的区别"
    :comparison-cards="comparisonCards"
    checklist-title="权限工程上线前必须确认的 6 个点"
    :checklist="checklist"
  />
</template>

<script setup lang="ts">
import FullstackCapabilityArticle from '@/components/FullstackCapabilityArticle.vue';

const outcomes = [
  '能把菜单、路由、按钮和数据权限统一建模。',
  '能支持后端下发权限后前端动态控制页面能力。',
  '能避免权限改动就必须发版本的低效模式。',
];

const quickStages = [
  {
    order: '01',
    title: '权限先统一建模',
    summary: '路由、按钮、接口权限不要各写各的。',
  },
  {
    order: '02',
    title: '运行时再解析',
    summary: '权限信息来自后端或策略中心。',
  },
  {
    order: '03',
    title: '页面按权限渲染',
    summary: '菜单、按钮、字段都能被控制。',
  },
  {
    order: '04',
    title: '缺权时有兜底',
    summary: '无权限时的文案、跳转、提示要统一。',
  },
  {
    order: '05',
    title: '支持权限刷新',
    summary: '用户切换身份后权限要能及时更新。',
  },
];

const guideStages = [
  {
    order: '01',
    title: '权限不该散落成一堆 if 判断',
    tag: '统一模型',
    description:
      '如果页面里到处写 `if (hasPermission(...))`，权限系统很快就会失控。更合理的做法是统一抽象权限模型，让页面、路由、按钮和数据层都消费同一份权限结果。',
    bestFor: ['后台系统', '医疗系统', '多角色平台', '多租户产品'],
    focus: ['权限模型统一', '后端下发', '前端消费一致'],
    risks: ['权限判断散落', '页面和后端权限模型不一致', '改权限就改代码'],
    language: 'ts',
    code: `type Permission = {
  code: string
  scope: 'route' | 'button' | 'data'
}`,
  },
  {
    order: '02',
    title: '路由权限和按钮权限要分层管理',
    tag: '分层',
    description:
      '路由权限决定能不能进页面，按钮权限决定能不能执行动作，数据权限决定能看到哪些内容。这三层不是一回事，必须分开建模，否则后面扩展会很痛苦。',
    bestFor: ['审批流', '医疗 EMR', 'CRM', '进销存系统'],
    focus: ['路由级控制', '按钮级控制', '数据级过滤'],
    risks: [
      '把所有权限写成同一层',
      '进页面后按钮还能乱点',
      '数据权限只靠前端隐藏',
    ],
    language: 'ts',
    code: `type PermissionScope = 'route' | 'button' | 'data'`,
  },
  {
    order: '03',
    title: '权限变化应由配置和后端驱动，而不是前端发版',
    tag: '运行时',
    description:
      '成熟的权限体系，应该在用户登录后由后端下发当前可访问菜单和动作权限。前端只负责消费这些结果，而不是把权限关系硬编码死。',
    bestFor: ['多角色后台', 'SaaS 产品', '组织架构频繁变化场景'],
    focus: ['后端下发', '前端动态解析', '刷新后重新计算'],
    risks: ['前端死写权限', '组织调整就发版', '权限更新不及时'],
    language: 'ts',
    code: `const canAccess = permissions.includes(code)`,
  },
];

const comparisonCards = [
  { title: '静态权限', summary: '实现简单，但权限调整要依赖发版。' },
  { title: '路由级权限', summary: '比静态权限进了一步，适合大多数后台。' },
  { title: '运行时细粒度权限', summary: '最灵活，适合复杂组织和多租户平台。' },
];

const checklist = [
  '路由、按钮、数据权限要分层定义。',
  '权限结果应由后端或配置中心下发。',
  '前端只消费权限，不硬编码权限关系。',
  '缺权时要有统一兜底交互。',
  '支持身份切换后权限刷新。',
  '权限模型要能覆盖菜单、按钮和字段级控制。',
];
</script>
