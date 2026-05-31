<template>
  <FullstackCapabilityArticle
    eyebrow="Frontend Capture Evidence Engineering"
    title="前端截图与录屏取证工程"
    summary="很多业务都需要“把当前现场留证”这件事做稳，比如审批留痕、工单复盘、地图异常上报、医疗影像说明、客服问题反馈。真正困难的地方，从来不是调一个截图 API，而是权限申请、高清导出、敏感信息遮罩、失败回退、文件归档和证据链完整性。"
    :outcomes="outcomes"
    :quick-stages="quickStages"
    decision-title="截图与录屏工程先定取证目标、权限边界和证据归档链路，再选具体实现 API"
    :guide-stages="guideStages"
    comparison-title="DOM 截图、Canvas 导出、浏览器录屏三种取证方式的现实边界"
    :comparison-cards="comparisonCards"
    checklist-title="上线截图与录屏取证能力前必须自查的 6 个点"
    :checklist="checklist"
  />
</template>

<script setup lang="ts">
import FullstackCapabilityArticle from '@/components/FullstackCapabilityArticle.vue';

const outcomes = [
  '能把截图、录屏、批注、归档做成可上线的完整取证链路，而不是只能本地导一张图。',
  '能分清 DOM 截图、Canvas 导出、屏幕采集各自的权限边界、清晰度上限和失败场景。',
  '能提前处理敏感信息遮罩、文件命名、上传归档和证据关联，避免“截到了但不能用”。',
];

const quickStages = [
  {
    order: '01',
    title: '先定取证目标',
    summary: '是截界面、导业务画布，还是录用户操作，目标不同实现完全不同。',
  },
  {
    order: '02',
    title: '权限与降级先讲清',
    summary: '浏览器录屏、系统窗口采集、下载保存都存在能力差异和授权门槛。',
  },
  {
    order: '03',
    title: '敏感信息必须先遮罩',
    summary: '截图前就要处理手机号、身份证、病历号、患者姓名等敏感区域。',
  },
  {
    order: '04',
    title: '文件链路要闭环',
    summary: '命名、上传、归档、业务单号绑定和审计字段都要纳入统一流程。',
  },
  {
    order: '05',
    title: '失败重试要有兜底',
    summary: '截图失败、录屏权限拒绝、上传超时都要能优雅收口。',
  },
];

const guideStages = [
  {
    order: '01',
    title: '先分清你要采集的是 DOM、Canvas 还是真实屏幕',
    tag: '取证对象',
    description:
      '很多团队一提截图就默认上 html2canvas，但真实工程里常见三类对象：DOM 页面、业务画布、浏览器或系统屏幕。DOM 截图适合表单、详情页和审批页；Canvas 导出适合地图标注、签批、图像处理；录屏则适合操作回放和问题复现。对象一旦选错，后面清晰度、权限和跨域问题都会接连出现。',
    bestFor: ['审批留痕', '地图批注', '客服问题反馈', '培训录屏'],
    focus: [
      '先确认取证对象属于页面、画布还是屏幕采集',
      '不同对象走不同 API，不要用一个方案硬吃全部场景',
      '把导出目标定义成图片、视频还是附件归档记录',
    ],
    risks: [
      '拿 DOM 截图方案去处理复杂 Canvas 场景',
      '用户实际想录操作过程，却只做了静态截图',
      '业务方需要证据链，研发只给了一张本地图片',
    ],
    language: 'ts',
    code: `type CaptureMode = "dom" | "canvas" | "screen"

type CaptureTask = {
  mode: CaptureMode
  businessId: string
  needMasking: boolean
}`,
  },
  {
    order: '02',
    title: '录屏能力不是想调就调，权限申请和用户预期必须前置',
    tag: '权限治理',
    description:
      '浏览器录屏一般依赖 `getDisplayMedia`，它会弹系统级选择器；而且很多浏览器只允许用户主动触发。真正的工程实现，必须在点击录制前先讲清“要采集什么、采多久、如何停止、录完存哪里”，否则用户体验和合规性都会出问题。',
    bestFor: ['问题复现录屏', '远程协助', '培训操作录制', '复杂工单上报'],
    focus: [
      '录屏只能由明确的用户动作触发',
      '开始、暂停、结束和取消都要有可见状态',
      '权限拒绝和浏览器不支持要有降级路径',
    ],
    risks: [
      '页面自动拉起录屏权限导致直接失败',
      '用户不知道录了什么，也不知道何时结束',
      '权限失败后页面没有明确反馈，只剩静默报错',
    ],
    language: 'ts',
    code: `const stream = await navigator.mediaDevices.getDisplayMedia({
  video: true,
  audio: false,
})`,
  },
  {
    order: '03',
    title: '敏感信息遮罩必须在采集前完成，不要等采完再补救',
    tag: '合规处理',
    description:
      '医疗、金融、政务、企业后台里最容易翻车的，不是采集能力，而是截到了不该截的信息。真正稳的做法，是在截图或录屏开始前就根据字段规则、角色权限和业务模块，对敏感区做实时遮罩、水印叠层或局部裁切。',
    bestFor: ['医疗系统', '财务后台', '审批中心', '客服操作台'],
    focus: [
      '遮罩规则和业务字段要统一配置',
      '取证时动态叠加水印、用户信息和时间戳',
      '敏感区域遮罩应先于截图触发',
    ],
    risks: [
      '截图完再手工打码，流程不可控',
      '录屏时敏感浮层突然出现导致泄露',
      '不同页面遮罩规则分散，难以长期维护',
    ],
    language: 'ts',
    code: `const maskedFields = ["patientName", "idCard", "phone"]

const shouldMask = (field: string) => maskedFields.includes(field)`,
  },
  {
    order: '04',
    title: '取证结果不能只停在浏览器里，必须绑定业务单据和归档链路',
    tag: '归档闭环',
    description:
      '真正可用的证据，不只是用户本地下载一份 PNG。你需要把截图或录屏和工单号、审批单号、会话号、地图对象 ID、病历记录等业务实体绑定起来，并把上传状态、生成时间、操作者、来源页面、设备环境记进同一套归档记录。',
    bestFor: ['工单系统', '审批系统', 'EMR/HIS', '地图巡检平台'],
    focus: [
      '文件命名要能回溯业务实体和操作人',
      '上传完成后要返回可审计的附件记录 ID',
      '业务界面要能重新打开和复核取证材料',
    ],
    risks: [
      '用户下载了图片，但业务系统里没有痕迹',
      '截图文件名杂乱，无法追溯来源',
      '视频大文件上传失败后没有断点和重试策略',
    ],
    language: 'ts',
    code: `const payload = {
  businessId,
  evidenceType: "screenshot",
  operatorId,
  capturedAt: Date.now(),
}`,
  },
  {
    order: '05',
    title: '失败回退和体验收口要设计完整，不然功能只能演示不能生产',
    tag: '失败收口',
    description:
      '截图失败可能来自跨域图片污染、画布未绘制完成、浏览器能力缺失；录屏失败可能来自权限拒绝、用户提前终止、媒体流中断。生产级能力必须提供失败原因提示、重试入口、兜底上传方案和本地草稿保留。',
    bestFor: ['跨域内容页面', '地图与图像场景', '多浏览器系统', '弱网工单上报'],
    focus: [
      '跨域资源和异步渲染完成状态要先确认',
      '录屏中断后要有草稿保存和重新录制入口',
      '上传失败时要明确告知用户当前证据是否已落地',
    ],
    risks: [
      '截图按钮点了没反应，用户不知道失败原因',
      '录屏结束后文件丢失，没有任何恢复入口',
      '证据已上传但前端误判失败，造成重复提交',
    ],
    language: 'ts',
    code: `try {
  await uploadEvidence(file)
} catch (error) {
  notify("上传失败，已保留本地草稿，可稍后重试")
}`,
  },
];

const comparisonCards = [
  {
    title: 'DOM 截图',
    summary:
      '适合详情页、审批页、报表页，开发成本较低，但容易受跨域资源、复杂样式和异步渲染影响。',
  },
  {
    title: 'Canvas 导出',
    summary:
      '适合地图、签批、图像编辑等画布型业务，清晰度可控，但前提是你对绘制链路有控制权。',
  },
  {
    title: '浏览器录屏',
    summary:
      '最适合复盘和问题复现，能保留操作过程，但权限门槛高、文件更大，归档和压缩链路也更重。',
  },
];

const checklist = [
  '先确认取证对象是 DOM、Canvas 还是屏幕录制，别混用实现方案。',
  '浏览器录屏必须由用户主动触发，并明确告知采集范围和停止方式。',
  '敏感字段遮罩、水印叠层和时间戳要在采集前完成，不要后补。',
  '截图和录屏结果必须绑定业务单据、操作者和归档记录，而不是只给本地下载。',
  '跨域资源、异步渲染完成、录屏权限拒绝和上传失败都要有兜底处理。',
  '大文件上传、失败重试和本地草稿保留要纳入同一条证据链路。',
];
</script>
