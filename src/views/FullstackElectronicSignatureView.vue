<template>
  <FullstackCapabilityArticle
    eyebrow="Frontend Electronic Signature"
    title="前端电子签章工程"
    summary="电子签章工程不只是画一个签字板，而是把签名采集、签章定位、文件预览、权限确认、时间戳、回放追踪和法律效力要求串成一条可审计链路。前端在这里的难点，不是把笔迹画出来，而是让签章操作真实、可还原、可验证。"
    :outcomes="outcomes"
    :quick-stages="quickStages"
    decision-title="电子签章先分采集层和落章层，再谈文件合成"
    :guide-stages="guideStages"
    comparison-title="手写签名、图片印章、服务端证书签章的前端差异"
    :comparison-cards="comparisonCards"
    checklist-title="电子签章模块上线前必须自查的 6 件事"
    :checklist="checklist"
  />
</template>

<script setup lang="ts">
import FullstackCapabilityArticle from '@/components/FullstackCapabilityArticle.vue';

const outcomes = [
  '能分清签名采集、签章定位、签章落盘和签章审计四个阶段。',
  '能处理 PDF / 图片预览上的可视化选点、缩放映射和多页坐标换算。',
  '能把签章操作和身份确认、时间戳、原文件版本绑定起来，避免“看起来签了，实际上不可审计”。',
];

const quickStages = [
  {
    order: '01',
    title: '先分签名与签章',
    summary: '手写笔迹只是输入，真正生效的是落到文件上的签章动作。',
  },
  {
    order: '02',
    title: '坐标映射要稳定',
    summary: '缩放预览和真实文件坐标必须能精确互转。',
  },
  {
    order: '03',
    title: '签章动作必须绑定身份确认',
    summary: '不能点一下印章图片就算完成签署。',
  },
  {
    order: '04',
    title: '文件版本必须冻结',
    summary: '签章前后的文件不能悄悄发生结构变化。',
  },
  {
    order: '05',
    title: '审计链路要可追踪',
    summary: '谁签的、何时签的、签在哪一页，都要能回放。',
  },
];

const guideStages = [
  {
    order: '01',
    title: '预览层的核心是页面坐标和文件坐标互转',
    tag: '坐标体系',
    description:
      '前端做电子签章时，最容易低估的是坐标体系。用户看到的是经过缩放、分页、滚动后的预览层，而后端真正要写入的是原始 PDF 或图像坐标。你必须稳定维护 viewport 坐标到文档坐标的映射，否则用户点在这里，签章落到别处。',
    bestFor: ['PDF 签章', '合同预览签署', '病历和报告签发'],
    focus: [
      '记录当前页、缩放比例、滚动偏移',
      '将点击区域转换成文档原始坐标',
      '多页文档需带 pageIndex 一起上报',
    ],
    risks: [
      '只存像素坐标，不存原始文档坐标',
      '缩放变化后签章位置漂移',
      '多页签章未区分页码',
    ],
    language: 'typescript',
    code: `function mapViewportToDocument(point: { x: number; y: number }) {
  return {
    page: currentPage,
    x: point.x / zoomRatio,
    y: point.y / zoomRatio,
  }
}`,
  },
  {
    order: '02',
    title: '签章动作要绑定身份确认和文件版本',
    tag: '操作确权',
    description:
      '真正有价值的签章不是“落了个图”，而是“这个用户在这个时间，对这版文件完成了确认”。前端要做的是：在点击签章前，展示签章摘要、文件版本号、签署位置和确认动作，必要时叠加短信、人脸或密码二次确认。',
    bestFor: ['法律文件签署', '医疗文书签发', '企业审批盖章'],
    focus: [
      '签章请求中带文件 hash 或版本号',
      '确认框展示签署对象与位置摘要',
      '高风险场景接入二次确认',
    ],
    risks: [
      '用户不知道签的是哪一版文件',
      '签章动作没有身份再确认',
      '前端展示和后端落章版本不一致',
    ],
    language: 'json',
    code: `{
  "documentId": "contract-2026-05",
  "version": "sha256:xxxx",
  "page": 3,
  "position": { "x": 148, "y": 356 },
  "confirmType": "password"
}`,
  },
  {
    order: '03',
    title: '签章完成后要生成可审计回放信息',
    tag: '审计回放',
    description:
      '签章链路不能只返回一个“成功”。前端至少要拿到签署时间、签章人、签章位置、签章批次和回看链接。这样用户后续查看文档时，才能知道哪些位置已经签过、由谁签的，以及这次签章是不是最新版本。',
    bestFor: ['审批流文档中心', '已签文件回看', '多角色签署场景'],
    focus: [
      '签章完成后刷新签章元数据',
      '已签区域在预览中高亮可查看',
      '回看模式和可编辑模式分离',
    ],
    risks: [
      '签完即结束，没有已签状态展示',
      '后续回看不知道谁签的',
      '审计信息与预览视图脱节',
    ],
    language: 'typescript',
    code: `type SignatureRecord = {
  signer: string
  signedAt: string
  page: number
  position: { x: number; y: number }
  batchId: string
}`,
  },
];

const comparisonCards = [
  {
    title: '手写签名',
    summary:
      '适合个人确认场景，但前端要处理笔迹采样、平滑和设备差异，法律效力通常还要结合后端认证。',
  },
  {
    title: '图片印章',
    summary:
      '视觉效果直观，但风险也高，必须绑定文件版本与操作审计，否则只是贴图。',
  },
  {
    title: '服务端证书签章',
    summary:
      '法律效力和可验证性更强，前端重点在位置选择、确认流程和签后展示，不在证书细节本身。',
  },
];

const checklist = [
  '预览坐标和原文档坐标必须可逆映射，缩放后不能漂移。',
  '签章请求要带文件版本或 hash，防止签错版本。',
  '高风险签章动作最好增加密码或短信确认。',
  '签章结果要有元数据回写，支持后续高亮和回放。',
  '编辑模式与已签回看模式要分离，防止误操作。',
  '不要把图片贴上去就当签章完成，审计信息必须完整。',
];
</script>
