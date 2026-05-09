<template>
  <FullstackCapabilityArticle
    eyebrow="Frontend Single Sign-On"
    title="前端单点登录工程"
    summary="单点登录不是一个跳转按钮，而是一套跨系统身份流转工程。它要处理主站登录态建立、子系统跳转透传、回跳地址保护、静默续期、登出广播和多系统间的失败回收。真正做过的人，关注的一定不是“能不能跳过去”，而是“多个系统在登录、续期、退出时会不会状态打架”。"
    :outcomes="outcomes"
    :quick-stages="quickStages"
    decision-title="单点登录先定身份边界，再定票据流转"
    :guide-stages="guideStages"
    comparison-title="Cookie SSO、Token SSO、OIDC 前端集成的主要差异"
    :comparison-cards="comparisonCards"
    checklist-title="单点登录上线前必须自查的 6 件事"
    :checklist="checklist"
  />
</template>

<script setup lang="ts">
import FullstackCapabilityArticle from '@/components/FullstackCapabilityArticle.vue';

const outcomes = [
  '能分清统一认证中心、业务子系统、前端网关三者的职责边界。',
  '能设计登录跳转、票据换会话、静默续期和统一登出的完整链路。',
  '能处理跨子域、跨系统回跳和多标签页登出同步等高频工程细节。',
];

const quickStages = [
  {
    order: '01',
    title: '先分清认证中心和业务系统',
    summary: 'SSO 的本质是统一认证，不是每个系统各自维护一套登录表单。',
  },
  {
    order: '02',
    title: '票据流必须一次性可校验',
    summary: '前端接收到的 code 或 ticket 只是交换凭证，不能被随意复用。',
  },
  {
    order: '03',
    title: '登录成功后必须收敛到本系统会话',
    summary: '子系统最终还是要建立自己的受控登录态，不能长期拿跳转票据当会话。',
  },
  {
    order: '04',
    title: '续期和登出必须统一广播',
    summary: '只管登录、不管退出和续期的 SSO，迟早会出现系统间状态错乱。',
  },
  {
    order: '05',
    title: '回跳地址要做白名单校验',
    summary: 'returnUrl 一旦不校验，就会变成开放重定向和钓鱼入口。',
  },
];

const guideStages = [
  {
    order: '01',
    title: '先定义主身份和子系统会话边界',
    tag: '身份分层',
    description:
      '单点登录里最容易乱的，是到底谁负责登录、谁负责续期、谁负责退出。正确做法是：认证中心负责统一身份校验和票据签发，业务子系统负责把票据换成本系统会话。这样多个系统才能既共享登录入口，又保留各自的最小授权边界。',
    bestFor: ['企业后台集群', '多域名产品矩阵', '统一账号中心'],
    focus: [
      '认证中心只签发短期 code / ticket',
      '子系统拿票据换本地 session 或 token',
      '权限菜单仍由子系统自己拉取和裁剪',
    ],
    risks: [
      '把认证票据直接当成长会话使用',
      '所有系统共享同一份前端本地 token',
      '权限也交给认证中心一把梭返回',
    ],
    language: 'json',
    code: `{
  "ssoCenter": "https://sso.example.com",
  "clientId": "admin-console",
  "redirectUri": "https://admin.example.com/auth/callback",
  "scope": ["profile", "tenant"],
  "state": "csrf_protection_token"
}`,
  },
  {
    order: '02',
    title: '登录跳转的关键是 code 换会话，不是前端直接认票据',
    tag: '票据交换',
    description:
      '前端从 SSO 中心回跳后，最重要的动作不是把 URL 里的 code 存起来，而是立即交给后端换成本系统可控会话。这个步骤决定了你的登录态是否可吊销、可续期、可审计。真正稳定的做法，都是让前端只处理跳转和状态恢复，票据校验与会话签发全部走服务端。',
    bestFor: ['BFF 架构', '中后台统一登录', '有审计需求的系统'],
    focus: [
      '回调页只负责读取 code 和 state',
      'state 用于防 CSRF 和回跳校验',
      '换到系统 session 后再初始化用户信息',
    ],
    risks: [
      '前端直接解析 code 结果建立登录态',
      '不校验 state，导致登录回调被伪造',
      '换会话失败后不清理 URL 参数',
    ],
    language: 'typescript',
    code: `async function handleSsoCallback(code: string, state: string) {
  const result = await fetch('/api/auth/sso/callback', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ code, state }),
  })

  return result.json() as Promise<{
    accessToken: string
    refreshToken?: string
  }>
}`,
  },
  {
    order: '03',
    title: '统一登出必须做多系统广播',
    tag: '状态收口',
    description:
      '很多系统只做好了统一登录，却没做好统一退出。用户在 A 系统退出后，B 系统仍然保留旧会话，这是典型事故。前端要做的不是自己销毁全部系统，而是接收统一登出事件后，清理本地状态并跳回认证中心登出落点。',
    bestFor: ['多标签页后台', '同一账号多系统切换', '安全要求较高场景'],
    focus: [
      '同系统多标签页使用 BroadcastChannel 同步登出',
      '退出时同时清理本系统缓存态和挂起请求',
      '与认证中心约定 postLogoutRedirectUri',
    ],
    risks: [
      '只清理当前页，不同步其它标签页',
      '前端先跳走，导致本地缓存没删干净',
      '退出后回跳地址无限制',
    ],
    language: 'typescript',
    code: `const logoutChannel = new BroadcastChannel('sso-logout')

logoutChannel.onmessage = () => {
  clearLocalSession()
  window.location.href = '/login'
}

function publishLogout() {
  clearLocalSession()
  logoutChannel.postMessage({ type: 'logout' })
}`,
  },
];

const comparisonCards = [
  {
    title: '同域 Cookie SSO',
    summary:
      '接入成本最低，浏览器自动带 Cookie，适合同域或主子域体系。缺点是跨域受限，且前端对会话控制力较弱。',
  },
  {
    title: 'Token + 认证中心跳转',
    summary:
      '系统间边界更清晰，适合前后端分离和多网关结构。缺点是前端必须更谨慎处理 code、state、续期和本地缓存。',
  },
  {
    title: 'OIDC / 标准协议接入',
    summary:
      '最适合长期演进和多产品统一接入，协议和生态更成熟。缺点是接入理解成本更高，前端和后端都需要按规范实现。',
  },
];

const checklist = [
  '回调页必须校验 state，不能只拿到 code 就直接换会话。',
  'returnUrl / redirectUri 要做白名单限制，避免开放重定向。',
  '统一退出要同步当前标签页、多标签页和认证中心状态。',
  '票据换会话失败时要能回退到登录入口，并清理脏参数。',
  '续期失败时要有统一降级策略，避免系统间半登录半退出状态。',
  '不要把认证中心返回的临时票据直接塞进长期本地存储。',
];
</script>
