<template>
  <FullstackCapabilityArticle
    eyebrow="Frontend API Signature Engineering"
    title="前端接口签名工程"
    summary="接口签名不是前端安全的万能药，但在开放平台、设备接入、三方回调和高敏接口调用里，它能显著提升请求防篡改能力。前端在这类工程里的职责，不是把密钥硬塞到浏览器，而是理解签名字段、时间戳、随机串、摘要算法和服务端验签的边界。"
    :outcomes="outcomes"
    :quick-stages="quickStages"
    decision-title="接口签名先定威胁模型和密钥边界，再决定前端参与方式"
    :guide-stages="guideStages"
    comparison-title="浏览器直签、网关代签、服务端验签三类方案的现实边界"
    :comparison-cards="comparisonCards"
    checklist-title="做接口签名前必须先想清楚的 6 件事"
    :checklist="checklist"
  />
</template>

<script setup lang="ts">
import FullstackCapabilityArticle from '@/components/FullstackCapabilityArticle.vue';

const outcomes = [
  '能说明接口签名究竟防什么，不能防什么，不再把它神化成“前端加密”。',
  '能设计时间戳、随机串、摘要串和服务端验签的基础链路。',
  '能区分浏览器应用、开放平台和设备端场景下签名方案的不同边界。',
];

const quickStages = [
  {
    order: '01',
    title: '先定威胁模型',
    summary: '签名防篡改、防重放，不等于防浏览器源码泄露。',
  },
  {
    order: '02',
    title: '密钥边界优先',
    summary: '浏览器不适合长期持有真正的高价值密钥。',
  },
  {
    order: '03',
    title: '摘要串要规范',
    summary: '参数排序、拼接规则、空值处理都必须统一。',
  },
  {
    order: '04',
    title: '服务端验签才是核心',
    summary: '前端只是参与构造，真正的信任判断在服务端。',
  },
  {
    order: '05',
    title: '时间窗要防重放',
    summary: '没有时间戳和 nonce，签名很容易被重放利用。',
  },
];

const guideStages = [
  {
    order: '01',
    title: '先明确接口签名的边界：它防的是篡改和重放，不是浏览器机密保管',
    tag: '边界认知',
    description:
      '如果系统本身运行在浏览器里，任何静态写死的 secret 都不能视为真正安全。接口签名在前端场景中的价值，更多是和短时令牌、时间戳、nonce、服务端校验一起构成一条防篡改链路，而不是单靠一个前端哈希就能“防黑客”。',
    bestFor: [
      '开放平台控制台',
      '设备接入页',
      '高敏操作二次确认',
      '与网关协同的前台请求',
    ],
    focus: [
      '先定义要防的是参数篡改还是重放攻击',
      '浏览器长期密钥必须谨慎，优先短时票据或服务端代签',
      '验签和权限判断必须放在服务端',
    ],
    risks: [
      '把高价值密钥直接硬编码到前端包里',
      '以为签名后接口就不需要鉴权和权限校验',
      '只做摘要不做时间窗，重放风险依旧存在',
    ],
    language: 'text',
    code: `目标
- 防请求参数在链路中被篡改
- 防短时间内的重复重放
- 协助网关或服务端判断请求是否可信

不能单独解决
- 浏览器源码可见
- 账号权限越权
- XSS / CSRF / 设备被控制`,
  },
  {
    order: '02',
    title: '把签名串构造规则定死，否则前后端永远对不上',
    tag: '摘要规则',
    description:
      '验签最常见的问题，不是算法错，而是拼接规则不一致。参数要不要排序、空值是否参与、对象如何序列化、路径和方法是否计入摘要，这些都必须事先明确成协议。一旦规则飘忽，排查成本会非常高。',
    bestFor: [
      'REST API 验签',
      '开放平台 SDK',
      '网关签名校验',
      '文件上传策略签名',
    ],
    focus: [
      '参数按固定规则排序',
      '明确路径、方法、时间戳、nonce 是否参与签名',
      '前后端使用同一序列化规范',
    ],
    risks: [
      '对象字段顺序不固定，导致签名串漂移',
      '前端过滤了空值，服务端却参与计算',
      '编码方式不同，中文和特殊字符验签失败',
    ],
    language: 'ts',
    code: `const buildCanonicalString = (params: Record<string, string>) =>
  Object.keys(params)
    .sort()
    .map((key) => \`\${key}=\${params[key]}\`)
    .join('&')`,
  },
  {
    order: '03',
    title: '浏览器场景更推荐短时票据或网关代签，不要迷恋前端直签',
    tag: '方案取舍',
    description:
      '如果是真正高价值签名，通常更稳的做法是先由服务端下发短时签名凭据，或直接由 BFF / 网关完成代签。浏览器只负责携带时间戳、nonce 和业务参数。这样既能减少密钥暴露风险，也更方便后端统一治理签名协议。',
    bestFor: ['企业管理台', '多端统一网关', '高敏写操作', '开放平台接入门户'],
    focus: [
      '优先由服务端持有主密钥',
      '前端只处理临时凭据或签名结果',
      '统一在网关层做验签失败拦截和日志审计',
    ],
    risks: [
      '浏览器长期缓存密钥，泄露风险高',
      '多个前端各自拼签名规则，协议难统一',
      '验签失败没有 requestId 和调试信息，难排查',
    ],
    language: 'ts',
    code: `const createSignedHeaders = async (payload: Record<string, string>) => {
  const ticket = await request.get('/api/signature-ticket')
  const timestamp = String(Date.now())
  const nonce = crypto.randomUUID()

  return {
    'x-sign-ticket': ticket.value,
    'x-sign-timestamp': timestamp,
    'x-sign-nonce': nonce,
  }
}`,
  },
];

const comparisonCards = [
  {
    title: '浏览器直签',
    summary:
      '实现直接，但安全边界最弱，只适合低敏或短时凭据场景，不适合长期高价值密钥。',
  },
  {
    title: '网关代签',
    summary:
      '密钥集中管理、协议统一，适合企业系统和多前端接入，是更推荐的长期方案。',
  },
  {
    title: '服务端验签',
    summary:
      '无论前端是否参与构造，真正的签名可信判断都必须在服务端完成，并结合时间窗与 nonce 做防重放。',
  },
];

const checklist = [
  '先定义签名要防的威胁，不要把它当全能安全方案。',
  '高价值密钥不要长驻浏览器，优先短时票据或代签。',
  '参数排序、编码、空值处理和摘要规则必须文档化固定。',
  '验签逻辑必须落在服务端或网关，前端只负责参与构造。',
  '时间戳、nonce 和过期窗口要一起设计，避免重放。',
  '验签失败要保留 requestId 和可追踪日志，便于线上排查。',
];
</script>
