<template>
  <FullstackCapabilityArticle
    eyebrow="Frontend Image Compression Engineering"
    title="前端图像压缩与上传链路工程"
    summary="图片上传一旦进入真实业务，问题马上就不是“能不能传上去”，而是清晰度、体积、方向、尺寸、裁剪、压缩耗时、弱网重试、移动端发热、服务端验图和失败回显。真正的图像压缩工程，不是随手调个 quality，而是把预处理、压缩、预览、上传、校验和回滚做成一条稳定链路。"
    :outcomes="outcomes"
    :quick-stages="quickStages"
    decision-title="图像压缩工程先定目标尺寸、清晰度和上传预算，再选压缩策略与执行位置"
    :guide-stages="guideStages"
    comparison-title="原图直传、前端压缩、前后端协同压缩三种链路的现实取舍"
    :comparison-cards="comparisonCards"
    checklist-title="上线图像压缩与上传链路前必须自查的 6 个点"
    :checklist="checklist"
  />
</template>

<script setup lang="ts">
import FullstackCapabilityArticle from '@/components/FullstackCapabilityArticle.vue';

const outcomes = [
  '能把图片上传从“能传”提升为“体积、清晰度、耗时和失败恢复都可控”的工程链路。',
  '能区分缩尺寸、降质量、裁剪、旋转修正和格式转换在画质与性能上的不同作用。',
  '能在移动端、弱网和大批量上传场景下稳定处理压缩、预览、重试和服务端校验。',
];

const quickStages = [
  {
    order: '01',
    title: '先定上传预算',
    summary: '目标体积、目标边长、上传时延预算不先定，压缩策略就没有依据。',
  },
  {
    order: '02',
    title: '预处理优先于压缩',
    summary: '方向修正、裁剪、尺寸收缩通常比盲目调低质量更重要。',
  },
  {
    order: '03',
    title: '压缩链路要可感知',
    summary: '用户要知道当前是在处理中、压缩中还是上传中，避免界面假死。',
  },
  {
    order: '04',
    title: '失败链路要可恢复',
    summary: '压缩失败、浏览器崩溃、上传超时都要有明确的重新选择和草稿回显。',
  },
  {
    order: '05',
    title: '服务端规则必须前后统一',
    summary: '前端压完了，后端又二次拒绝，会把整条链路体验打碎。',
  },
];

const guideStages = [
  {
    order: '01',
    title: '图片上传工程先定目标，不要一上来就调 quality',
    tag: '目标预算',
    description:
      '很多团队一碰图片体积问题，第一反应就是把质量调到 0.6，但真正正确的顺序是先明确业务需要什么：头像、报销票据、病灶截图、地图截图、商品图、证件照，它们对分辨率、清晰度、文字可读性和上传延迟的要求都不同。没有目标预算，压缩就只能靠猜。',
    bestFor: ['头像上传', '票据影像', '医疗截图', '商品图管理'],
    focus: [
      '先给出目标体积、目标边长和清晰度底线',
      '不同业务类型要有不同压缩策略模板',
      '文字类图片和照片类图片不能混用同一套质量参数',
    ],
    risks: [
      '所有图片统一压到一个质量值，导致体验两头都差',
      '业务要看清文字，但压缩策略只看体积不看可读性',
      '没有上传预算，后续优化没有客观标准',
    ],
    language: 'ts',
    code: `type ImagePolicy = {
  maxWidth: number
  maxHeight: number
  maxSizeKB: number
  quality: number
}`,
  },
  {
    order: '02',
    title: '预处理通常比压缩更重要：方向修正、裁剪和尺寸收缩优先做',
    tag: '预处理',
    description:
      '手机拍照最常见的问题不是文件太大，而是 EXIF 方向没处理、边界太空、长边过大。很多时候先把方向转正、把无效边界裁掉、把尺寸缩到业务上限，得到的体积下降已经很可观，而且对画质损失更小。',
    bestFor: ['移动端拍照上传', '身份证件照', '票据上传', '拍照留证'],
    focus: [
      '先读取元信息，处理拍照方向',
      '先缩尺寸再压质量，画质更稳',
      '裁剪要和业务比例要求绑定',
    ],
    risks: [
      '图片方向错误，预览和落库全是歪的',
      '不做尺寸收缩，只靠质量压缩导致画质很差',
      '票据边缘留白过多，体积浪费严重',
    ],
    language: 'ts',
    code: `const maxSide = 1600
const scale = Math.min(1, maxSide / Math.max(width, height))`,
  },
  {
    order: '03',
    title: '压缩执行不能只看结果体积，还要看主线程开销和设备发热',
    tag: '性能执行',
    description:
      '前端图像压缩经常发生在移动端和中低配电脑上。Canvas 重绘、大图解码、格式转换都很吃 CPU 和内存。真正的工程实现，应该考虑分步处理、异步状态反馈、必要时下沉到 Web Worker，避免页面看起来像卡死。',
    bestFor: ['移动端 H5', '批量图片上传', '后台素材管理', '弱设备终端'],
    focus: [
      '压缩过程要展示处理中状态和可取消入口',
      '大图处理应避免阻塞主线程太久',
      '批量上传要限制并发，别同时压十几张原图',
    ],
    risks: [
      '页面长时间无响应，用户误以为上传失败',
      '一次选很多图直接把浏览器内存顶爆',
      '移动端发热严重，影响后续操作',
    ],
    language: 'ts',
    code: `const queue = files.slice(0, 3)

for (const file of queue) {
  await compressAndUpload(file)
}`,
  },
  {
    order: '04',
    title: '压缩、预览、上传必须是一条连续可追踪的状态链',
    tag: '链路编排',
    description:
      '用户视角里它是一次“上传图片”，但工程上至少包含：读取文件、预处理、压缩、生成预览、发起上传、等待回执、服务端验图和最终回写。每一步都应该有状态、错误码和可恢复动作，否则一旦失败，用户和研发都不知道卡在哪。',
    bestFor: ['素材平台', '表单附件上传', '多图批量处理', '审批流附件中心'],
    focus: [
      '前端状态要区分读取中、压缩中、上传中和校验失败',
      '预览图、压缩图和最终服务端 URL 要分开管理',
      '失败时要保留原始文件和当前阶段信息',
    ],
    risks: [
      '上传失败后原文件和压缩结果都丢失，只能重选',
      '界面只显示 loading，看不出卡在哪一步',
      '服务端验图失败时没有把原因透给用户',
    ],
    language: 'ts',
    code: `type UploadStage =
  | "reading"
  | "compressing"
  | "uploading"
  | "verifying"
  | "done"
  | "failed"`,
  },
  {
    order: '05',
    title: '服务端验图规则要和前端压缩策略联动，不然整条链路会互相打架',
    tag: '前后端契约',
    description:
      '前端把图片压到 1MB，不代表后端就一定接受；后端可能还要求最小分辨率、格式白名单、透明通道策略或 OCR 可读性。真正可上线的系统，一定会把这些约束同步成统一策略，而不是一边压、一边拒。',
    bestFor: ['票据 OCR', '身份校验', '图片风控', '商品素材审核'],
    focus: [
      '前后端统一尺寸、格式、体积和清晰度要求',
      '服务端验图失败原因要回传到前端可展示状态',
      '压缩策略升级时要同步联动测试后端校验链路',
    ],
    risks: [
      '前端压缩后看似成功，后端却因分辨率不足拒收',
      '后端规则升级，前端仍沿用旧参数导致批量失败',
      '失败原因只写“上传失败”，用户完全无从修正',
    ],
    language: 'ts',
    code: `const uploadPolicy = {
  accept: ["image/jpeg", "image/png"],
  minWidth: 800,
  maxSizeKB: 1024,
}`,
  },
];

const comparisonCards = [
  {
    title: '原图直传',
    summary:
      '实现最快，但在弱网、移动端和大图场景里成本极高，服务端压力和上传时延都难控。',
  },
  {
    title: '前端压缩',
    summary:
      '能显著降低上传体积和服务端成本，但会引入浏览器性能、兼容性和压缩质量治理问题。',
  },
  {
    title: '前后端协同压缩',
    summary:
      '前端先做预处理和预算内压缩，服务端再做验图与二次处理，整体最稳，但契约和联调成本更高。',
  },
];

const checklist = [
  '先按业务类型定义目标体积、尺寸和清晰度预算，不要统一用一个 quality 值。',
  '方向修正、裁剪和尺寸收缩通常要先于质量压缩执行。',
  '压缩过程必须有阶段状态、进度反馈和失败收口，避免页面假死。',
  '批量图片处理要限制并发，防止主线程阻塞和内存暴涨。',
  '压缩结果、预览图、原始文件和上传回执要分层管理，失败时可恢复。',
  '前端压缩规则必须和后端验图规则同步治理，避免前后互相打架。',
];
</script>
