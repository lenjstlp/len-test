<template>
  <FullstackCapabilityArticle
    eyebrow="Frontend Message Template Engineering"
    title="前端消息模板编排工程"
    summary="消息模板并不是几个字符串拼起来那么简单。真正难的是变量占位、渠道差异、预览校验、灰度生效和业务事件绑定。一旦模板体系做乱，通知内容、推送渠道和审计追踪都会一起失控。"
    :outcomes="outcomes"
    :quick-stages="quickStages"
    decision-title="消息模板先统一变量协议，再治理渠道差异、预览和生效策略"
    :guide-stages="guideStages"
    comparison-title="静态文案、轻模板系统、可编排消息中心三种路线的差异"
    :comparison-cards="comparisonCards"
    checklist-title="消息模板编排上线前必须补齐的 6 个点"
    :checklist="checklist"
  />
</template>

<script setup lang="ts">
import FullstackCapabilityArticle from '@/components/FullstackCapabilityArticle.vue';

const outcomes = [
  '能把消息模板、变量占位、渠道类型抽成统一模型，而不是把文案散落在各业务组件里。',
  '能处理站内信、短信、邮件、IM 等多渠道模板的差异化配置与预览。',
  '能为审批通知、风控提醒、患者随访、运营触达等场景搭建可维护的消息模板中心。',
];

const quickStages = [
  {
    order: '01',
    title: '模板和变量分层',
    summary: '模板正文、变量定义和业务事件先拆开。',
  },
  {
    order: '02',
    title: '渠道差异显式化',
    summary: '短信、邮件、站内信的长度和格式限制不同，不能混着配。',
  },
  {
    order: '03',
    title: '预览和校验先做',
    summary: '变量缺失、超长、非法占位符都应该在配置时发现。',
  },
  {
    order: '04',
    title: '生效版本可追踪',
    summary: '模板改了什么、何时生效、谁发布的，要查得到。',
  },
  {
    order: '05',
    title: '事件绑定清晰',
    summary: '哪个业务事件触发哪个模板，必须统一治理。',
  },
];

const guideStages = [
  {
    order: '01',
    title: '先把模板正文、变量协议、业务事件拆开，别把通知写死在代码里',
    tag: '模板协议',
    description:
      '消息模板最容易烂掉的原因，就是把通知文案直接写进各业务组件和后端接口里。更稳的方案是分三层：模板正文负责展示内容，变量协议定义允许注入哪些动态字段，业务事件负责决定什么时候触发模板。',
    bestFor: ['审批通知', '运营触达', '医疗提醒', '风控告警'],
    focus: [
      '模板内容和业务事件解耦',
      '变量列表结构化定义',
      '不同业务共用同一模板平台能力',
    ],
    risks: [
      '模板文案分散在各业务代码里无法统一治理',
      '变量缺失时只能线上报错',
      '同一通知在多个渠道内容不一致',
    ],
    language: 'ts',
    code: `type MessageTemplate = {
  id: string
  channel: 'inbox' | 'sms' | 'email' | 'im'
  title?: string
  content: string
  variables: string[]
}`,
  },
  {
    order: '02',
    title: '多渠道消息不能共用一套展示规则，渠道差异必须显式建模',
    tag: '渠道差异',
    description:
      '短信有长度限制，邮件有标题和富文本需求，站内信可能支持跳转链接，IM 又可能支持卡片结构。如果前端模板中心不把这些渠道差异显式建模，最后就会在一个大表单里堆满条件分支，越来越难维护。',
    bestFor: ['消息中心', '多渠道通知平台', '客服系统', '企业协同平台'],
    focus: [
      '不同渠道采用不同表单结构和校验规则',
      '渠道能力限制前置表达',
      '预览面板按渠道真实效果展示',
    ],
    risks: [
      '一个模板在短信里超长，在邮件里又缺标题',
      '渠道字段混用导致配置界面越来越乱',
      '预览效果和真实发送效果不一致',
    ],
    language: 'ts',
    code: `const channelLimits = {
  sms: { maxLength: 70 },
  inbox: { maxLength: 500 },
  email: { maxLength: 5000 },
}`,
  },
  {
    order: '03',
    title: '模板中心真正值钱的是发布、预览和审计闭环，不只是编辑器',
    tag: '发布治理',
    description:
      '模板平台不能只停留在“可编辑”，还要解决发布审批、灰度生效、历史版本回看、变量预览和错误校验。否则每次改模板都像直接改线上配置，没有发布闭环和回滚能力，风险很高。',
    bestFor: ['强监管通知', '关键业务消息', '频繁改文案场景', '多团队协同编辑'],
    focus: [
      '模板预览、版本、发布状态全链路可追踪',
      '变量缺失和非法占位在发布前发现',
      '历史版本支持回滚和审计',
    ],
    risks: [
      '模板误改后无法快速回滚',
      '线上消息变量缺失才暴露问题',
      '不同团队同时改模板没有发布秩序',
    ],
    language: 'ts',
    code: `const renderTemplatePreview = (
  content: string,
  variables: Record<string, string>,
) =>
  content.replaceAll('{{patientName}}', variables.patientName ?? '[未提供]')`,
  },
];

const comparisonCards = [
  {
    title: '静态文案',
    summary: '简单直接，但很快就会被多渠道、多变量、多版本需求打爆。',
  },
  {
    title: '轻模板系统',
    summary: '适合中小型业务通知，能解决变量替换和基础预览。',
  },
  {
    title: '可编排消息中心',
    summary: '适合多业务线、多渠道和强治理场景，平台价值更高。',
  },
];

const checklist = [
  '模板内容、变量协议和业务事件必须分层。',
  '不同渠道的字段和校验规则要独立建模。',
  '模板预览必须能体现变量替换结果。',
  '模板版本、发布和回滚要可追踪。',
  '变量缺失、超长和非法占位要在前端提前校验。',
  '敏感消息模板需要审计和权限控制。',
];
</script>
