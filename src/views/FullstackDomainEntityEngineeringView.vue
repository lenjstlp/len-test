<template>
  <FullstackCapabilityArticle
    eyebrow="Frontend Domain Entity"
    title="前端领域实体工程"
    summary="真正复杂的前端项目，页面本身不是核心，核心是业务对象怎么建模。领域实体一旦稳定，表单、列表、审批、详情和联动逻辑就能围绕同一份模型展开。"
    :outcomes="outcomes"
    :quick-stages="quickStages"
    decision-title="先抽业务实体和关系，再让页面围绕模型工作"
    :guide-stages="guideStages"
    comparison-title="页面直写业务逻辑、简单 DTO、领域实体三种组织方式"
    :comparison-cards="comparisonCards"
    checklist-title="领域实体工程上线前必须确认的 6 个点"
    :checklist="checklist"
  />
</template>

<script setup lang="ts">
import FullstackCapabilityArticle from '@/components/FullstackCapabilityArticle.vue';

const outcomes = [
  '能把业务对象抽成稳定实体，而不是把逻辑散在页面里。',
  '能让表单、列表、详情、审批统一围绕同一份模型。',
  '能减少“页面改一下就全链路爆炸”的低效写法。',
];

const quickStages = [
  {
    order: '01',
    title: '先定义实体',
    summary: '订单、单据、患者、设备、审批单都先有自己的模型。',
  },
  { order: '02', title: '再定义关系', summary: '实体之间的关联和约束要明确。' },
  {
    order: '03',
    title: '页面围绕模型',
    summary: '列表、详情、表单都复用统一实体。',
  },
  { order: '04', title: '约束进模型', summary: '校验规则不要散在页面里。' },
  {
    order: '05',
    title: '版本可演进',
    summary: '字段和关系变化时模型能平滑扩展。',
  },
];

const guideStages = [
  {
    order: '01',
    title: '页面不是核心，核心是业务对象本身',
    tag: '建模',
    description:
      '很多前端项目一开始就按页面划分代码，结果业务一复杂，所有逻辑都堆在视图层。成熟做法是先抽实体，明确业务对象和关系，再让页面围绕模型展开。',
    bestFor: ['医疗系统', '审批系统', '订单系统', '资产管理系统'],
    focus: ['实体定义', '关系约束', '模型演进'],
    risks: ['页面逻辑膨胀', '字段分散', '业务规则重复写'],
    language: 'ts',
    code: `type Entity = {
  id: string
  status: string
  meta: Record<string, unknown>
}`,
  },
  {
    order: '02',
    title: '表单、列表、详情应该共享同一份实体语义',
    tag: '复用',
    description:
      '如果表单里的字段名、列表里的列名、详情里的展示字段全都各写一套，业务一致性很容易出问题。更稳的做法是围绕同一实体派生不同视图。',
    bestFor: ['单据流', '病历系统', '设备台账', '审批单管理'],
    focus: ['统一字段语义', '视图派生', '减少重复定义'],
    risks: ['同一字段多套命名', '表单和列表语义不一致', '修改成本高'],
    language: 'ts',
    code: `type PatientRecord = {
  id: string
  name: string
  status: string
}`,
  },
  {
    order: '03',
    title: '领域约束应该进模型，不要堆在页面校验里',
    tag: '约束',
    description:
      '像状态流转、必填条件、关联依赖这些规则，最好沉到模型层或领域服务层，而不是散在多个页面组件里。这样页面更轻，规则也更统一。',
    bestFor: ['审批流', '订单状态', '医疗表单', '库存流转'],
    focus: ['状态流转', '约束集中', '统一校验'],
    risks: ['校验重复', '规则散落', '页面难维护'],
    language: 'ts',
    code: `const canSubmit = entity.status === 'draft'`,
  },
];

const comparisonCards = [
  { title: '页面直写', summary: '速度快，但复杂度很快失控。' },
  { title: '简单 DTO', summary: '能对接接口，但业务语义仍然薄弱。' },
  { title: '领域实体', summary: '最适合复杂业务，长期维护成本更低。' },
];

const checklist = [
  '先定义业务实体，再写页面。',
  '表单、列表、详情要复用同一份语义。',
  '状态流转和约束尽量沉到模型层。',
  '实体字段命名要统一。',
  '页面不要重复写业务规则。',
  '模型需要能随业务演进。',
];
</script>
