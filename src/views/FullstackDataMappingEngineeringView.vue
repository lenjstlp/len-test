<template>
  <FullstackCapabilityArticle
    eyebrow="Frontend Data Mapping Engineering"
    title="前端数据映射工程"
    summary="数据映射工程不是把接口字段 rename 一下那么简单。真正复杂的系统里，前端几乎总在做“接口协议 -> 视图模型 -> 提交模型”的三段转换。如果这层没有工程化，页面就会充满零散转换逻辑，越做越难维护。"
    :outcomes="outcomes"
    :quick-stages="quickStages"
    decision-title="数据映射先拆清输入模型、视图模型、提交模型，再统一转换入口"
    :guide-stages="guideStages"
    comparison-title="页面内零散转换、模块级 mapper、完整模型映射层三种路线的差异"
    :comparison-cards="comparisonCards"
    checklist-title="数据映射工程上线前必须补齐的 6 个点"
    :checklist="checklist"
  />
</template>

<script setup lang="ts">
import FullstackCapabilityArticle from '@/components/FullstackCapabilityArticle.vue';

const outcomes = [
  '能把接口原始数据、前端展示模型、表单提交模型拆清楚，不再让页面直接消费后端原始结构。',
  '能为复杂列表、详情、表单、图表场景建立统一的数据转换层，降低页面复杂度。',
  '能处理字段兼容、默认值补齐、类型修正和接口升级迁移等真实工程问题。',
];

const quickStages = [
  {
    order: '01',
    title: '先拆三层模型',
    summary: '接口输入、视图展示、提交输出三层不要混用。',
  },
  {
    order: '02',
    title: '映射统一入口',
    summary: '转换逻辑不要散在组件 computed 和 methods 里。',
  },
  {
    order: '03',
    title: '默认值显式化',
    summary: '空字符串、空数组、缺省对象都要有统一补齐规则。',
  },
  {
    order: '04',
    title: '兼容旧协议',
    summary: '接口升级过程中前端映射层要承担平滑过渡责任。',
  },
  {
    order: '05',
    title: '回写也要收口',
    summary: '提交接口前的反向转换同样要统一管理。',
  },
];

const guideStages = [
  {
    order: '01',
    title: '页面不要直接消费后端原始结构，先做视图模型映射',
    tag: '视图模型',
    description:
      '很多前端页面一开始直接拿接口响应就渲染，看起来省事，但只要后端字段命名不直观、嵌套复杂、值类型不稳定，页面层很快会被拖垮。更稳的方式是先做一层 view model，把页面真正需要的数据整理成易读结构。',
    bestFor: ['复杂详情页', '聚合列表页', '图表看板', '表单回显页'],
    focus: [
      '接口原始结构与视图结构解耦',
      '页面只消费整理后的 view model',
      '复杂嵌套和字段补齐集中在 mapper 处理',
    ],
    risks: [
      '模板里充满深层链式取值',
      '空值判断和默认值散落全页面',
      '接口字段调整时影响面不可控',
    ],
    language: 'ts',
    code: `type PatientDetailResponse = {
  patient_name?: string
  visit_info?: { dept_name?: string }
}`,
  },
  {
    order: '02',
    title: '提交模型和展示模型往往不是同一份数据结构',
    tag: '提交回写',
    description:
      '一个表单页面常常会把多个接口字段合并成一个展示字段，或者把后端枚举转换成更易操作的前端结构。等提交时，又需要反向拆回接口协议。如果这条回写链路没收口，页面里就会到处写拼装 payload 的逻辑。',
    bestFor: ['复杂表单页', '审批提交流程', '配置编辑页', '导入导出转换场景'],
    focus: [
      'view model 与 submit model 显式区分',
      '提交前转换由 mapper 统一处理',
      '双向映射规则可复用、可测试',
    ],
    risks: [
      '页面里直接手写 payload 拼装',
      '展示结构改了，提交逻辑漏改',
      '接口字段兼容期内逻辑越来越乱',
    ],
    language: 'ts',
    code: `const toSubmitPayload = (formValue: Record<string, unknown>) => ({
  patient_name: formValue.patientName,
  dept_id: formValue.deptId,
})`,
  },
  {
    order: '03',
    title: '映射层真正的价值，是帮你承接接口演进和业务兼容',
    tag: '兼容演进',
    description:
      '真实项目里接口协议经常会调整：字段改名、结构变深、枚举扩展、旧字段逐步废弃。页面如果直接依赖原始协议，每次联调都会很痛苦；而 mapper 层可以帮你吸收这部分变化，让业务页面尽量稳定。',
    bestFor: ['长期演进系统', '多人协作后台', '版本兼容场景', '多接口聚合页面'],
    focus: [
      '接口升级时优先改 mapper，而不是全站改页面',
      '旧字段到新字段的兼容逻辑集中管理',
      '映射层可独立补测试，降低联调风险',
    ],
    risks: [
      '接口升级后页面满地修补',
      '同一字段兼容逻辑在多个组件重复出现',
      '缺少统一映射层导致难以排查数据异常',
    ],
    language: 'ts',
    code: `const resolveDeptName = (response: PatientDetailResponse) =>
  response.visit_info?.dept_name ?? '未分配科室'`,
  },
];

const comparisonCards = [
  {
    title: '页面内零散转换',
    summary: '开发初期最快，但维护性最差，几乎注定越做越乱。',
  },
  {
    title: '模块级 mapper',
    summary: '适合多数业务模块，成本适中，能明显降低页面复杂度。',
  },
  {
    title: '完整模型映射层',
    summary: '适合大型平台和高复杂系统，治理能力最强，但规范要求更高。',
  },
];

const checklist = [
  '接口输入、视图展示、提交输出模型要显式区分。',
  '数据转换逻辑要统一入口，不要散落在页面中。',
  '默认值、空值和类型兼容规则要收口。',
  '提交前反向映射同样要工程化。',
  '接口演进优先修改映射层，减少页面受影响范围。',
  '复杂 mapper 要能独立测试和排查。',
];
</script>
