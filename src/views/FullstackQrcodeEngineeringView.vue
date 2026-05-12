<template>
  <FullstackCapabilityArticle
    eyebrow="Frontend QRCode Engineering"
    title="前端二维码与条码工程"
    summary="二维码和条码不是“生成一张图”这么简单。真正落地时，你还要考虑容错率、清晰度、打印、导出、暗色主题、嵌 logo、扫码设备兼容，以及支付、报到、病例标签、物流面单这些不同业务场景下的编码边界。"
    :outcomes="outcomes"
    :quick-stages="quickStages"
    decision-title="二维码能力先定内容协议，再决定渲染方式、导出方式和设备兼容"
    :guide-stages="guideStages"
    comparison-title="Canvas、SVG、服务端出图三种二维码实现路线的取舍"
    :comparison-cards="comparisonCards"
    checklist-title="二维码与条码上线前必须补齐的 6 个点"
    :checklist="checklist"
  />
</template>

<script setup lang="ts">
import FullstackCapabilityArticle from '@/components/FullstackCapabilityArticle.vue';

const outcomes = [
  '能根据扫码、打印、导出、嵌 logo 等场景选择合适的二维码渲染方式。',
  '能理解二维码内容协议、容错级别和视觉样式之间的关系，避免只追求“好看”。',
  '能把二维码与条码能力沉淀成医疗标签、物流单据、签到凭证等场景可复用模块。',
];

const quickStages = [
  {
    order: '01',
    title: '先定编码内容',
    summary: 'URL、业务 id、一次性 token 的安全性和长度完全不同。',
  },
  {
    order: '02',
    title: '选渲染介质',
    summary: '屏幕展示、打印输出、导出图片对 Canvas 和 SVG 的要求不同。',
  },
  {
    order: '03',
    title: '容错别乱配',
    summary: '嵌 logo 或圆角样式越重，越要考虑纠错级别和可识别性。',
  },
  {
    order: '04',
    title: '打印清晰度单测',
    summary: '纸质扫码往往比屏幕扫码更容易暴露尺寸和边缘问题。',
  },
  {
    order: '05',
    title: '扫码链路闭环',
    summary: '生成、失效、校验、过期提示必须和业务状态联动。',
  },
];

const guideStages = [
  {
    order: '01',
    title: '二维码先定义内容协议，不要把业务数据直接裸塞进去',
    tag: '内容协议',
    description:
      '二维码承载的内容应该是一个可校验、可追踪、可控失效的协议，而不是把完整业务 JSON 直接塞进去。多数业务更适合放短链接、短 token 或编码后的业务主键，让后端接管真正的数据解析与权限校验。',
    bestFor: ['扫码登录', '电子票据', '物流标签', '患者腕带'],
    focus: [
      '优先使用短 token 或短链接',
      '内容中包含版本、场景或校验信息',
      '真正敏感数据只在服务端解析',
    ],
    risks: [
      '把敏感数据直接明文写进二维码',
      '内容太长导致码点过密难识别',
      '协议无版本导致后续无法升级',
    ],
    language: 'ts',
    code: `type QrPayload = {
  scene: 'checkin' | 'login' | 'tracking'
  token: string
  version: 1
}`,
  },
  {
    order: '02',
    title: '显示、导出、打印三种场景不要共用一套渲染方案',
    tag: '渲染介质',
    description:
      'Canvas 更适合页面即时渲染和导出位图，SVG 更适合高清缩放和打印。如果你的业务还要求后端批量生成标签图，服务端出图也要纳入方案。真正稳的工程实践，不是选一个技术打天下，而是按场景拆介质。',
    bestFor: ['页面展示', '打印模板', '批量导出', '第三方嵌入'],
    focus: [
      '页面预览优先轻量渲染',
      '打印链路优先保持矢量清晰度',
      '导出时单独控制尺寸、边距和背景色',
    ],
    risks: [
      '屏幕上能扫，打印后模糊失真',
      '导出图片尺寸固定导致不同设备无法识别',
      'SVG 和 Canvas 样式不一致',
    ],
    language: 'ts',
    code: `const resolveQrRenderer = (scene: 'preview' | 'print' | 'export') => {
  if (scene === 'print') return 'svg'
  if (scene === 'export') return 'canvas'
  return 'canvas'
}`,
  },
  {
    order: '03',
    title: '视觉定制必须服从可识别性，别把二维码做成纯装饰图',
    tag: '识别稳定性',
    description:
      '很多产品喜欢嵌 logo、改颜色、改圆角，但任何视觉定制都会影响可识别性。工程上要先验证纠错等级、前景背景对比、留白边界、最小像素尺寸，再决定能不能做视觉加工。样式不能凌驾于识别成功率之上。',
    bestFor: ['品牌化登录页', '票据二维码', '活动邀请函', '物料设计联动'],
    focus: [
      '前景色与背景色保持足够对比度',
      '嵌 logo 时提高容错等级',
      '导出和打印前做扫码回归验证',
    ],
    risks: [
      '渐变太重导致扫码失败',
      'logo 遮挡过大',
      '深色主题下二维码边界消失',
    ],
    language: 'ts',
    code: `const qrStyle = {
  errorCorrectionLevel: 'H',
  margin: 2,
  color: {
    dark: '#18222d',
    light: '#ffffff',
  },
}`,
  },
];

const comparisonCards = [
  {
    title: 'Canvas 渲染',
    summary: '适合页面预览和导出位图，接入简单，但打印缩放时不如 SVG 稳。',
  },
  {
    title: 'SVG 渲染',
    summary: '适合高清缩放和打印，但在某些导出链路中需要额外转图处理。',
  },
  {
    title: '服务端出图',
    summary: '适合批量标签和统一模板输出，但灵活交互不如前端即时渲染。',
  },
];

const checklist = [
  '二维码内容要走短协议，不要直接塞敏感业务数据。',
  '根据预览、导出、打印三种场景选择渲染介质。',
  '样式定制前先验证可识别性，不要只看视觉稿。',
  '暗色主题、低分辨率打印、移动端相机都要实测。',
  '失效、过期、撤销状态必须与扫码校验链路打通。',
  '条码与二维码不要共用同一套尺寸与留白策略。',
];
</script>
