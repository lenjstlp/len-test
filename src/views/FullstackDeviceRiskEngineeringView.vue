<template>
  <FullstackCapabilityArticle
    eyebrow="Frontend Device Risk Control"
    title="前端设备风控工程"
    summary="设备风控不是前端多采几个字段，而是把设备指纹、行为特征、风险信号和验证策略做成一套动态决策链。前端在这类系统里的价值，不是替代后端判定，而是稳定采集上下文、触发额外校验、把风险反馈做到低打扰但可升级。"
    :outcomes="outcomes"
    :quick-stages="quickStages"
    decision-title="设备风控先定义风险信号，再决定触发动作"
    :guide-stages="guideStages"
    comparison-title="固定规则、评分模型、实时风控链路的前端配合差异"
    :comparison-cards="comparisonCards"
    checklist-title="设备风控接入前端时必须自查的 6 件事"
    :checklist="checklist"
  />
</template>

<script setup lang="ts">
import FullstackCapabilityArticle from '@/components/FullstackCapabilityArticle.vue';

const outcomes = [
  '能分清设备识别、行为识别、风险决策和二次验证在前端里的不同职责。',
  '能设计风险信号上报、挑战触发和失败回退的前端工程闭环。',
  '能避免把风控做成“前端假校验”，而是让它真正接入业务链路。',
];

const quickStages = [
  {
    order: '01',
    title: '先定风险信号',
    summary: '先知道要采什么，再谈 SDK 和埋点。',
  },
  {
    order: '02',
    title: '高风险动作单独加固',
    summary: '登录、支付、改绑、导出不是同一种风险等级。',
  },
  {
    order: '03',
    title: '前端只做信号采集与挑战展示',
    summary: '风险判定权永远不应该落在浏览器。',
  },
  {
    order: '04',
    title: '验证动作必须可降级',
    summary: '验证码、人机校验、二次确认都要有失败兜底。',
  },
  {
    order: '05',
    title: '风控结果要可观测',
    summary: '没有命中率和误伤率，你根本不知道策略是否有效。',
  },
];

const guideStages = [
  {
    order: '01',
    title: '先分清设备信号和业务信号',
    tag: '信号分层',
    description:
      '前端最容易犯的错误是把所有风险信息都堆成一个大对象上报。更稳的做法是：设备环境信号、交互行为信号、当前业务动作信号分层采集。这样后端风控系统才能按动作类型、敏感等级和租户规则做真正的差异化决策。',
    bestFor: ['登录风险拦截', '支付风控', '医疗数据访问加固'],
    focus: [
      '设备信号与行为信号分开建模',
      '当前操作动作要一起上报',
      '高风险场景单独带资源上下文',
    ],
    risks: [
      '信号字段无版本、无结构，后端难演进',
      '一个接口复用所有场景，导致上下文缺失',
      '只采设备信息，不带当前业务动作',
    ],
    language: 'json',
    code: `{
  "scene": "login",
  "device": {
    "userAgent": "...",
    "platform": "win32",
    "timezone": "Asia/Shanghai"
  },
  "behavior": {
    "focusSwitchCount": 2,
    "pasteDetected": true
  }
}`,
  },
  {
    order: '02',
    title: '挑战策略要按风险等级动态触发',
    tag: '验证升级',
    description:
      '不是所有请求都应该先弹验证码。真正的风控体验，是低风险用户无感通过，中风险用户补充一次校验，高风险用户直接阻断。前端的关键职责是收到策略后，准确拉起验证码、短信确认、人脸或二次密码，而不是自己硬编码“失败三次就弹窗”。',
    bestFor: ['验证码接入', '人机校验', '二次验证流程'],
    focus: [
      '根据服务端返回的 challengeType 动态展示',
      '挑战成功后继续原动作，不要丢上下文',
      '前端保留风险链路 requestId 便于追踪',
    ],
    risks: [
      '把验证码策略写死在前端',
      '挑战完成后原请求参数丢失',
      '挑战失败和真正业务失败不区分',
    ],
    language: 'typescript',
    code: `type RiskDecision =
  | { action: 'allow' }
  | { action: 'challenge'; challengeType: 'captcha' | 'sms' }
  | { action: 'block'; reason: string }
`,
  },
  {
    order: '03',
    title: '风控链路必须有观测和误伤反馈',
    tag: '治理闭环',
    description:
      '风控不是加完就完。你必须知道哪些规则命中了、哪些挑战完成率低、哪些正常用户被误伤。前端至少要把 challenge 展示率、完成率、放弃率和回退率打通到埋点系统，否则风控只会越做越重，没人知道是不是有效。',
    bestFor: ['长期运营系统', '高转化要求页面', '风控策略迭代场景'],
    focus: [
      '挑战前、挑战后、失败回退都要打点',
      '误伤反馈入口要保留 requestId',
      '不同 challengeType 需要分开统计效果',
    ],
    risks: [
      '只统计命中量，不统计通过率',
      '被拦用户没有申诉和回退通道',
      '策略升级后看不到业务损耗',
    ],
    language: 'typescript',
    code: `track('risk.challenge.shown', { requestId, challengeType })
track('risk.challenge.passed', { requestId, challengeType })
track('risk.challenge.failed', { requestId, reason })`,
  },
];

const comparisonCards = [
  {
    title: '固定规则',
    summary: '接入最简单，适合起步阶段，但误伤率高，且难应对复杂行为组合。',
  },
  {
    title: '评分模型',
    summary:
      '更适合中等规模系统，前端需要稳定提供结构化风险信号，便于打分决策。',
  },
  {
    title: '实时风控链路',
    summary:
      '最适合高价值业务，能动态拉起挑战和二次验证，但要求前后端都可观测、可回滚。',
  },
];

const checklist = [
  '前端不做最终风控判定，只做信号采集和挑战执行。',
  '风险信号要带版本和场景字段，方便后端渐进演进。',
  '挑战成功后必须继续原动作，不能让用户重新再操作一次。',
  '所有风控链路都要带 requestId，便于排查误伤和投诉。',
  '验证码或二次验证失败时要有清晰提示，不要吞错。',
  '高风险链路必须能观测挑战展示率、通过率和放弃率。',
];
</script>
