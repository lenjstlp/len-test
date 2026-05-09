<template>
  <FullstackCapabilityArticle
    eyebrow="Frontend Watermark Leak Prevention"
    title="前端水印防泄漏工程"
    summary="水印防泄漏不是往页面上铺一层半透明文字那么简单。真正的工程要处理文本水印、图片水印、截图对抗、打印控制、明暗主题适配、防篡改和身份可追踪。前端能做的不是绝对防泄漏，而是显著提高外泄成本并增强责任可追溯性。"
    :outcomes="outcomes"
    :quick-stages="quickStages"
    decision-title="水印防泄漏先定追踪目标，再设计展示与对抗策略"
    :guide-stages="guideStages"
    comparison-title="普通背景水印、Canvas 动态水印、文档导出水印的取舍"
    :comparison-cards="comparisonCards"
    checklist-title="水印防泄漏能力上线前必须自查的 6 件事"
    :checklist="checklist"
  />
</template>

<script setup lang="ts">
import FullstackCapabilityArticle from '@/components/FullstackCapabilityArticle.vue';

const outcomes = [
  '能分清页面可视水印、文档导出水印和打印水印三种不同场景。',
  '能设计包含用户身份、时间、租户和设备信息的动态水印方案。',
  '能认识到前端水印的边界，避免把它误当成绝对防泄漏手段。',
];

const quickStages = [
  {
    order: '01',
    title: '先定水印承载什么身份',
    summary: '水印不是装饰，核心是追踪责任到人。',
  },
  {
    order: '02',
    title: '展示层必须不挡核心操作',
    summary: '防泄漏不能以破坏主业务可用性为代价。',
  },
  {
    order: '03',
    title: '导出和打印要单独处理',
    summary: '页面有水印，不代表导出 PDF 和打印自动有水印。',
  },
  {
    order: '04',
    title: '动态水印要防简单删除',
    summary: '纯 DOM 文本最容易被删，至少要有一定篡改感知。',
  },
  {
    order: '05',
    title: '水印命中要和审计联动',
    summary: '只有页面展示，没有审计记录，追踪价值会大打折扣。',
  },
];

const guideStages = [
  {
    order: '01',
    title: '水印字段必须服务追踪，而不是只写一句机密',
    tag: '身份设计',
    description:
      '真正有价值的水印至少要能回答“这是谁在什么时候看的哪类数据”。所以前端水印内容通常会带用户名、租户、日期时间、设备或工号。这样即使截图流出，也能回溯到最小责任范围。单纯一个“内部机密”对追踪帮助很小。',
    bestFor: ['医疗数据查看', '财务报表查看', '后台敏感信息页面'],
    focus: [
      '内容带用户和时间维度',
      '高敏页面可以叠加租户或设备号',
      '水印内容与审计日志字段保持一致',
    ],
    risks: [
      '所有用户都展示同一段固定文案',
      '水印里没有时间维度，难以排查',
      '审计日志和水印内容完全脱节',
    ],
    language: 'typescript',
    code: `const watermarkText = [
  currentUser.name,
  currentTenant.name,
  new Date().toLocaleString(),
].join(' · ')`,
  },
  {
    order: '02',
    title: '页面水印、打印水印、导出水印必须分开实现',
    tag: '场景拆分',
    description:
      '很多系统只在页面上加了个背景水印，就以为防泄漏做完了。实际上，用户导出 PDF、打印预览、图片预览都可能绕开页面层水印。前端要根据承载介质分别处理：页面层做可视动态水印，导出层在请求参数中声明加水印，打印层单独控制 print 样式。',
    bestFor: ['导出中心', '报表打印', '在线文档预览'],
    focus: [
      '页面样式层水印与打印样式分离',
      '导出接口显式带 watermark payload',
      '不同媒体用不同对抗策略',
    ],
    risks: [
      '只做页面背景水印',
      '打印样式把水印全部清掉',
      '导出文件根本不含追踪信息',
    ],
    language: 'json',
    code: `{
  "exportId": "report-2026-05",
  "watermark": {
    "text": "张三 · 华东一区 · 2026-05-08 11:20",
    "opacity": 0.12
  }
}`,
  },
  {
    order: '03',
    title: '动态水印至少要具备一定的篡改感知能力',
    tag: '对抗治理',
    description:
      '前端水印永远不能绝对防删，但可以提高删除成本。常见做法包括 Canvas 渲染、MutationObserver 监听、分层覆盖和定时校验。一旦检测到水印节点被删除或样式异常，前端可以自动恢复或上报异常。这些措施不是防不住一切，而是让随手去水印变得没那么轻松。',
    bestFor: ['企业后台', '高敏页面', '在线预览中心'],
    focus: [
      '使用 Canvas 或背景图提高删改门槛',
      '监听 DOM 被删或样式被覆盖',
      '异常上报与风险提示联动',
    ],
    risks: [
      '只插一个纯文本 DOM，删起来毫无门槛',
      '检测到水印被删却没有任何上报',
      '水印层覆盖按钮，反而影响业务操作',
    ],
    language: 'typescript',
    code: `const observer = new MutationObserver(() => {
  if (!document.querySelector('[data-watermark-root]')) {
    restoreWatermark()
    reportWatermarkTamper()
  }
})`,
  },
];

const comparisonCards = [
  {
    title: '普通背景水印',
    summary: '实现最轻，但最容易被删，适合低到中敏感场景的基础追踪。',
  },
  {
    title: 'Canvas 动态水印',
    summary: '篡改成本更高，适合中高敏页面，但要处理性能、清晰度和主题适配。',
  },
  {
    title: '导出 / 打印水印',
    summary:
      '最适合对外流转介质，前端重点在传递参数和展示预览，不在最终落章本身。',
  },
];

const checklist = [
  '水印内容要带用户、时间、租户等可追踪信息。',
  '页面、导出、打印三种场景不能共用一套简单实现。',
  '水印层不能遮挡关键按钮和交互热点。',
  '高敏场景至少要有一定的删除检测与恢复机制。',
  '水印样式要适配浅色、深色和不同缩放比例。',
  '不要把前端水印当绝对防泄漏手段，它本质上是追踪增强与威慑工具。',
];
</script>
