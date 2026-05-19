<template>
  <FullstackCapabilityArticle
    eyebrow="Frontend Approval Node Orchestration"
    title="前端审批节点编排工程"
    summary="审批流一旦不只是固定两三个节点，前端就不能只把后端返回的流程图渲染出来。真正难的是节点条件、审批人选择、抄送规则、回退分支和流程草稿的统一编排，否则一改规则就全链路出错。"
    :outcomes="outcomes"
    :quick-stages="quickStages"
    decision-title="审批节点编排先统一流程节点协议，再治理条件分支、人员选择和回退规则"
    :guide-stages="guideStages"
    comparison-title="固定审批流、配置化审批流、可编排审批引擎三种路线的差异"
    :comparison-cards="comparisonCards"
    checklist-title="审批节点编排上线前必须补齐的 6 个点"
    :checklist="checklist"
  />
</template>

<script setup lang="ts">
import FullstackCapabilityArticle from '@/components/FullstackCapabilityArticle.vue';

const outcomes = [
  '能把审批节点、分支条件、审批人策略抽成统一协议，而不是把流程逻辑写死在表单页里。',
  '能稳定处理会签、或签、条件分支、抄送、退回和重新提交等审批编排能力。',
  '能为 OA、费用报销、医疗审核、采购审批等场景搭建可持续演进的前端审批流配置层。',
];

const quickStages = [
  {
    order: '01',
    title: '先抽节点协议',
    summary: '节点类型、审批人规则、分支条件先变成结构化数据。',
  },
  {
    order: '02',
    title: '条件分支统一表达',
    summary: '金额、角色、部门等条件判断不能散落在页面逻辑里。',
  },
  {
    order: '03',
    title: '审批人选择有策略',
    summary: '直属上级、指定成员、角色池和自选审批人都要统一建模。',
  },
  {
    order: '04',
    title: '草稿和回显可恢复',
    summary: '流程编辑器刷新后不能丢状态，历史流程也要能稳定回显。',
  },
  {
    order: '05',
    title: '回退和异常规则清晰',
    summary: '退回到哪一节点、节点删除怎么兜底，都要预先定义。',
  },
];

const guideStages = [
  {
    order: '01',
    title: '审批流不是 UI 连线题，先把节点、边和参与者协议定清楚',
    tag: '协议抽象',
    description:
      '审批工程做不稳，通常不是画布组件不够强，而是底层协议没设计清楚。节点要区分发起、审批、抄送、条件分支、结束等类型；边要表达流转方向；参与者要能表示固定人、角色、组织负责人、表单字段映射等多种来源。',
    bestFor: ['OA 审批', '采购流程', '费用报销', '医疗审核流'],
    focus: [
      '节点、边、参与者三层协议拆开设计',
      '节点配置和画布展示解耦',
      '不同流程类型共用同一协议体系',
    ],
    risks: [
      '流程数据结构和渲染结构混在一起',
      '审批人来源一多就无法扩展',
      '每新增一种节点类型都要重写前端逻辑',
    ],
    language: 'ts',
    code: `type FlowNode = {
  id: string
  type: 'start' | 'approve' | 'condition' | 'cc' | 'end'
  participantRule?: string
  config: Record<string, unknown>
}`,
  },
  {
    order: '02',
    title: '条件分支别写死在组件里，要做成规则表达式和字段映射',
    tag: '条件表达',
    description:
      '审批流里最常见的变化，就是“金额大于多少走财务总监，小于多少走部门主管”。如果这些条件都写在 if/else 里，流程一改就得发版。更稳的做法是把条件抽成结构化表达式，让流程配置驱动分支选择。',
    bestFor: ['金额审批', '多部门流转', '表单驱动流程', '规则频繁变动场景'],
    focus: [
      '条件项、操作符、值类型形成统一结构',
      '流程引擎根据规则计算分支',
      '前端编辑器只负责配置，不硬编码业务判断',
    ],
    risks: [
      '页面组件里堆满业务分支判断',
      '规则一改就要重新发版',
      '流程编辑器和运行逻辑使用两套不同条件模型',
    ],
    language: 'ts',
    code: `type BranchCondition = {
  field: string
  operator: 'eq' | 'gt' | 'lt' | 'in'
  value: string | number | string[]
}`,
  },
  {
    order: '03',
    title: '审批人策略必须抽象成规则，不要让节点直接绑死具体人',
    tag: '参与者策略',
    description:
      '很多系统一开始把审批节点直接绑用户 id，看起来简单，但组织一调整就失效。成熟做法是抽象审批人规则，比如直属上级、部门负责人、指定角色、发起人自选、表单字段选人，这样流程才能长期可用。',
    bestFor: ['组织型审批', '跨部门流程', '多角色会签', '人员经常变动场景'],
    focus: [
      '审批人来源规则统一建模',
      '运行时再解析到具体用户集合',
      '支持空结果兜底和多人策略',
    ],
    risks: [
      '节点直接绑定具体用户，组织变更即失效',
      '会签、或签策略混乱',
      '审批人为空时没有兜底策略',
    ],
    language: 'ts',
    code: `type ParticipantRule =
  | { type: 'role'; roleId: string }
  | { type: 'manager'; level: number }
  | { type: 'field'; fieldKey: string }
  | { type: 'user'; userIds: string[] }`,
  },
];

const comparisonCards = [
  {
    title: '固定审批流',
    summary: '上线快，但规则一变就要改代码，适合简单单流程业务。',
  },
  {
    title: '配置化审批流',
    summary: '大部分中后台都应该做到这一步，扩展性和维护性更平衡。',
  },
  {
    title: '可编排审批引擎',
    summary: '适合多业务线和复杂规则平台，投入更高，但复用价值最大。',
  },
];

const checklist = [
  '节点、边、审批人策略必须有统一协议。',
  '条件分支要结构化，不要写死在组件逻辑里。',
  '审批人解析要支持角色、负责人、字段映射等多种策略。',
  '流程草稿保存、回显和版本兼容要提前设计。',
  '回退、撤回、加签、异常兜底规则要明确。',
  '运行态流程和编辑态配置必须共享同一份底层模型。',
];
</script>
