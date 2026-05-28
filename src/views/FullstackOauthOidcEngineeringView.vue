<template>
  <FullstackCapabilityArticle
    eyebrow="Frontend OAuth / OIDC Engineering"
    title="前端 OAuth / OIDC 接入工程"
    summary="很多团队把第三方登录看成“跳一下再回来”，结果一上生产就被 state 丢失、redirectUri 不一致、token 落浏览器、静默续期失效、多标签页状态错乱这些问题打爆。真正的 OAuth / OIDC 接入工程，不是在页面里拼几个参数，而是先厘清授权码流、前后端职责、回跳安全、会话落点和刷新策略。"
    :outcomes="outcomes"
    :quick-stages="quickStages"
    decision-title="OAuth / OIDC 接入先定授权流和会话落点，再谈前端回跳和状态恢复"
    :guide-stages="guideStages"
    comparison-title="Implicit、Authorization Code、Authorization Code + PKCE 三种接法的现实边界"
    :comparison-cards="comparisonCards"
    checklist-title="第三方身份接入上线前必须自查的 6 个点"
    :checklist="checklist"
  />
</template>

<script setup lang="ts">
import FullstackCapabilityArticle from '@/components/FullstackCapabilityArticle.vue';

const outcomes = [
  '能把第三方登录、企业身份平台或开放平台账号接入做成可上线的完整链路，而不是 demo 式跳转。',
  '能分清前端回跳、服务端换票、会话落库、刷新续期和退出清理各自的职责边界。',
  '能避免 state 丢失、redirectUri 不一致、回跳伪造和多标签页登录态打架等常见事故。',
];

const quickStages = [
  {
    order: '01',
    title: '先选对授权流',
    summary: 'Web 应用优先考虑 Authorization Code，现代场景再加 PKCE。',
  },
  {
    order: '02',
    title: '前端只管跳转与回跳',
    summary: '真正的 code 兑换和会话签发应该在服务端完成。',
  },
  {
    order: '03',
    title: 'state 和 redirectUri 必须严控',
    summary: '这是防回跳伪造和防配置漂移的底线。',
  },
  {
    order: '04',
    title: '登录成功只是开始',
    summary: '续期、退出、多标签同步和失效恢复都要纳入同一套会话治理。',
  },
  {
    order: '05',
    title: '联调文档比代码更重要',
    summary: 'scope、issuer、回跳地址、错误码和租户参数要提前说清。',
  },
];

const guideStages = [
  {
    order: '01',
    title: '先分清 OAuth 和 OIDC：一个是授权协议，一个是身份层扩展',
    tag: '概念边界',
    description:
      'OAuth 解决的是“允许某个客户端代表用户访问资源”，OIDC 则在 OAuth 之上补了身份层，让你能拿到标准化的用户身份声明。很多前端接入问题，根源就是把“拿访问令牌”和“拿登录身份”混在一起，最后 scope、id_token、userinfo、session 都乱掉。',
    bestFor: [
      '企业身份平台接入',
      '第三方登录',
      '多系统统一身份',
      '开放平台账号体系',
    ],
    focus: [
      '先明确当前接入要的是授权能力还是身份能力',
      '区分 access_token、id_token、refresh_token 的职责',
      '不要把 OAuth 文档中的所有字段都当成登录态本体',
    ],
    risks: [
      '只会背流程图，不清楚 token 各自用途',
      '把 id_token 当成后端业务访问凭证',
      'scope 和用户资料映射关系没有提前约定',
    ],
    language: 'ts',
    code: `type OauthArtifacts = {
  accessToken: string
  idToken?: string
  refreshToken?: string
}`,
  },
  {
    order: '02',
    title: '现代 Web 前端接入优先用 Authorization Code，必要时叠 PKCE',
    tag: '授权流选择',
    description:
      'Implicit Flow 已经不适合现代 Web 应用，最大的问题是令牌直接暴露在前端回跳链路中。更稳的做法是用授权码模式，让前端只负责跳到身份中心、带着 code 回来，再交给服务端换取本系统可控会话。若是纯前端或特殊公有客户端，再结合 PKCE 强化安全性。',
    bestFor: ['后台管理台', '企业门户', 'SaaS 控制台', '第三方联合登录'],
    focus: [
      '优先选择 Authorization Code Flow',
      '需要公有客户端能力时补充 PKCE',
      '令牌兑换和会话签发尽量由服务端完成',
    ],
    risks: [
      '仍使用 implicit，令牌暴露在 URL 片段中',
      '前端直接长期持有敏感令牌',
      'PKCE code_verifier 和 challenge 配对逻辑混乱',
    ],
    language: 'ts',
    code: `const authUrl = new URL('https://sso.example.com/authorize')
authUrl.searchParams.set('response_type', 'code')
authUrl.searchParams.set('client_id', clientId)
authUrl.searchParams.set('redirect_uri', redirectUri)
authUrl.searchParams.set('scope', 'openid profile email')
authUrl.searchParams.set('state', state)`,
  },
  {
    order: '03',
    title: '前端回跳页只负责接住 code 和 state，真正换票必须交给服务端',
    tag: '职责分层',
    description:
      '浏览器回跳后最重要的不是把 code 存 localStorage，而是尽快把 `code + state` 交给后端回调接口，让后端验证 state、换取令牌、签发本系统 session，然后前端只负责恢复页面上下文。这样令牌可控、会话可吊销、审计也更完整。',
    bestFor: [
      '服务端渲染应用',
      '后台系统',
      '有统一用户中心的产品',
      '高安全要求业务',
    ],
    focus: [
      '回跳页只解析参数并立即交后端处理',
      '后端负责兑换 code 与建立本系统会话',
      '前端拿到的是可控业务登录态，不是三方原始令牌',
    ],
    risks: [
      '把 code、token 长时间留在浏览器存储',
      '前端和后端都各自维护一套登录态',
      '回跳成功后没有恢复原始目标页面上下文',
    ],
    language: 'ts',
    code: `const params = new URLSearchParams(window.location.search)
await fetch('/api/auth/oidc/callback', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    code: params.get('code'),
    state: params.get('state'),
  }),
})`,
  },
  {
    order: '04',
    title: 'state、redirectUri、issuer 是三条绝不能糊涂的安全线',
    tag: '回跳安全',
    description:
      '回跳伪造、开放重定向、环境配置错乱，基本都和这三个字段有关。state 要和发起登录前保存的上下文严格匹配；redirectUri 必须走白名单并且环境值一致；issuer、clientId、租户参数等也要固定来源，不能让页面临时拼。',
    bestFor: ['多环境系统', '企业 SSO', '多租户产品', '第三方联合登录'],
    focus: [
      'state 既承载防伪，也承载原目标页恢复信息',
      'redirectUri 必须和身份平台配置严格一致',
      'issuer 和 client 配置统一走环境与服务端配置中心',
    ],
    risks: [
      '回跳时不校验 state',
      '开发、测试、生产 redirectUri 混用',
      '前端随手拼 issuer 导致多租户接入混乱',
    ],
    language: 'ts',
    code: `const loginContext = {
  state,
  redirectTo: router.currentRoute.value.fullPath,
}
sessionStorage.setItem('oidc_login_context', JSON.stringify(loginContext))`,
  },
  {
    order: '05',
    title:
      'OAuth / OIDC 工程不是登录完成就结束，还要把续期、退出和多标签同步收尾',
    tag: '会话治理',
    description:
      '真正上线后，问题往往出在后半程。比如 refresh 失效后多标签页是否一起退、SSO 中心退出后本系统是否广播清理、用户切换租户后旧身份缓存是否回收、后台恢复时令牌是否已过期。这些都属于 OAuth / OIDC 接入工程的一部分，而不是之后再补的小功能。',
    bestFor: ['长时间在线系统', '多标签后台', '企业门户', '多租户 SaaS'],
    focus: [
      '把续期、退出、失效恢复统一纳入会话治理',
      '多标签页之间共享登录态广播和失效通知',
      '令牌过期、刷新失败和静默续期失败要有统一处理链路',
    ],
    risks: [
      '只处理登录成功，不处理后续续期和退出',
      '一个标签页退出，其他标签页仍显示已登录',
      '刷新失败后页面局部报错但不统一跳转收口',
    ],
    language: 'ts',
    code: `window.addEventListener('storage', (event) => {
  if (event.key === 'auth:event' && event.newValue === 'logout') {
    router.replace('/login')
  }
})`,
  },
];

const comparisonCards = [
  {
    title: 'Implicit Flow',
    summary:
      '历史方案，接入快但安全边界差，现代 Web 项目通常不应再作为主方案。',
  },
  {
    title: 'Authorization Code',
    summary:
      '最适合有后端协作的 Web 产品，能把令牌兑换与会话签发收回到服务端控制。',
  },
  {
    title: 'Authorization Code + PKCE',
    summary:
      '适合现代前端或公有客户端场景，在授权码模式基础上进一步增强安全性。',
  },
];

const checklist = [
  '明确当前接入是 OAuth 授权能力还是 OIDC 身份能力，不要混用概念。',
  'Web 场景优先选择 Authorization Code，必要时补充 PKCE，避免使用 implicit。',
  '前端回跳页只接参数，真正的 code 兑换和会话建立必须交给服务端。',
  'state、redirectUri、issuer、clientId 和租户参数要统一治理并严格校验。',
  '续期、退出、多标签同步和失效恢复要接入统一会话治理链路。',
  '联调文档必须覆盖错误码、scope、回跳地址、环境差异和账号映射规则。',
];
</script>
