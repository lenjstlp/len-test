<template>
  <section class="auth-guide-page">
    <div class="auth-guide-page__shell">
      <div class="auth-guide-page__top">
        <RouterLink
          to="/fullstack-guide"
          class="auth-guide-page__back"
          aria-label="返回全栈能力菜单"
          title="返回全栈能力菜单"
        >
          <el-icon :size="18"><ArrowLeft /></el-icon>
        </RouterLink>
      </div>

      <div class="auth-guide-page__content">
        <header class="auth-guide-hero">
          <div>
            <p class="auth-guide-hero__eyebrow">Frontend Auth</p>
            <h1 class="auth-guide-hero__title">前端鉴权能力</h1>
            <p class="auth-guide-hero__summary">
              这一页按渡一前端公开内容里讲 `token`
              无感刷新的思路来组织：先讲清认证和授权的区别，再落到登录态建立、请求携带、过期刷新、路由守卫和退出清理。重点不是记几个拦截器
              API，而是把整条登录态链路设计稳。
            </p>
          </div>

          <div class="auth-guide-hero__panel">
            <p class="auth-guide-hero__label">学完结果</p>
            <ul class="auth-guide-list">
              <li>能分清认证是“你是谁”，授权是“你能干什么”。</li>
              <li>能搭出一条稳定的 token 登录、续期和退出链路。</li>
              <li>能判断哪些逻辑该放前端，哪些必须交给服务端控制。</li>
            </ul>
          </div>
        </header>

        <section class="auth-guide-grid">
          <article
            v-for="item in quickStages"
            :key="item.order"
            class="auth-guide-card"
          >
            <p class="auth-guide-card__eyebrow">Stage {{ item.order }}</p>
            <h2 class="auth-guide-card__title">{{ item.title }}</h2>
            <p class="auth-guide-card__text">{{ item.summary }}</p>
          </article>
        </section>

        <section class="auth-guide-section">
          <div class="auth-guide-section__head">
            <div>
              <p class="auth-guide-section__eyebrow">Decision Order</p>
              <h2 class="auth-guide-section__title">
                登录态不是一个按钮，而是一条完整状态链
              </h2>
            </div>
          </div>

          <div class="auth-guide-stack">
            <article
              v-for="stage in guideStages"
              :key="stage.order"
              class="auth-guide-panel is-wide"
            >
              <div class="auth-guide-method__head">
                <div>
                  <p class="auth-guide-panel__eyebrow">
                    Stage {{ stage.order }}
                  </p>
                  <h3 class="auth-guide-panel__title">{{ stage.title }}</h3>
                </div>
                <span class="auth-guide-method__tag">{{ stage.tag }}</span>
              </div>

              <p class="auth-guide-panel__text">{{ stage.description }}</p>

              <div class="auth-guide-method__grid">
                <section class="auth-guide-mini-panel">
                  <p class="auth-guide-mini-panel__title">适用场景</p>
                  <ul class="auth-guide-list">
                    <li v-for="item in stage.bestFor" :key="item">
                      {{ item }}
                    </li>
                  </ul>
                </section>

                <section class="auth-guide-mini-panel">
                  <p class="auth-guide-mini-panel__title">实现重点</p>
                  <ul class="auth-guide-list">
                    <li v-for="item in stage.focus" :key="item">
                      {{ item }}
                    </li>
                  </ul>
                </section>

                <section class="auth-guide-mini-panel">
                  <p class="auth-guide-mini-panel__title">常见误区</p>
                  <ul class="auth-guide-list">
                    <li v-for="item in stage.risks" :key="item">
                      {{ item }}
                    </li>
                  </ul>
                </section>
              </div>

              <AppCodeBlock
                class="auth-guide-code-block"
                :code="stage.code"
                :lang="stage.language"
              />
            </article>
          </div>
        </section>

        <section class="auth-guide-section">
          <div class="auth-guide-section__head">
            <div>
              <p class="auth-guide-section__eyebrow">Comparison</p>
              <h2 class="auth-guide-section__title">
                前端能做体验兜底，但真正安全边界仍在服务端
              </h2>
            </div>
          </div>

          <div class="auth-guide-columns">
            <article
              v-for="item in comparisonCards"
              :key="item.title"
              class="auth-guide-panel"
            >
              <h3 class="auth-guide-panel__title">{{ item.title }}</h3>
              <p class="auth-guide-panel__text">{{ item.summary }}</p>
            </article>
          </div>
        </section>

        <section class="auth-guide-section">
          <div class="auth-guide-section__head">
            <div>
              <p class="auth-guide-section__eyebrow">Checklist</p>
              <h2 class="auth-guide-section__title">
                一套能进项目的鉴权实现清单
              </h2>
            </div>
          </div>

          <article class="auth-guide-panel is-wide">
            <ul class="auth-guide-list">
              <li>
                先分清登录凭证是 cookie、access token 还是 access + refresh
                token 双 token。
              </li>
              <li>
                前端只负责保存受控登录态和体验跳转，权限判断必须由后端接口兜底。
              </li>
              <li>
                只要用 token
                无感刷新，就要处理并发请求、重复刷新和刷新失败后的统一退出。
              </li>
              <li>路由守卫做的是页面拦截和跳转体验，不是安全边界本身。</li>
              <li>
                退出登录必须把内存状态、持久化状态和请求队列一起清掉，不能只删一个字段。
              </li>
            </ul>
          </article>
        </section>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ArrowLeft } from '@element-plus/icons-vue';
import { RouterLink } from 'vue-router';
import AppCodeBlock from '@/components/AppCodeBlock.vue';

const quickStages = [
  {
    order: '01',
    title: '先分清认证和授权',
    summary: '认证解决身份确认，授权解决能力范围，别一开始就把两者混成一个词。',
  },
  {
    order: '02',
    title: '登录态先建立再分发',
    summary:
      '先拿凭证，再统一写入状态和请求层，不要页面拿到 token 就各自乱存。',
  },
  {
    order: '03',
    title: '过期刷新要防并发',
    summary:
      '无感刷新最容易翻车的点，不是接口调用，而是多个请求同时过期时的协同。',
  },
  {
    order: '04',
    title: '路由守卫只管页面体验',
    summary: '页面可见性可以前端控制，但接口数据边界一定要让后端再判一次。',
  },
  {
    order: '05',
    title: '退出必须做彻底清理',
    summary:
      '退出登录不是跳到登录页那么简单，所有缓存态和挂起请求都要处理干净。',
  },
];

const guideStages = [
  {
    order: '01',
    title: '先把概念讲明白：认证和授权不是一回事',
    tag: '基础认知',
    description:
      '渡一前端讲登录态问题时，通常会先把认证和授权拆开。认证是在回答“你是不是这个人”，授权是在回答“你有没有这个操作资格”。前端常见的误区就是把菜单可见性、路由跳转、按钮显隐、接口权限全部揉成“权限”两个字，结果链路一塌糊涂。',
    bestFor: ['后台系统登录态设计', 'SaaS 控制台', '中后台权限系统'],
    focus: [
      '登录成功后先明确凭证结构',
      '把身份状态和权限状态分开建模',
      '前端只托管表现层权限，不替代后端鉴权',
    ],
    risks: [
      '把页面按钮隐藏当成接口安全',
      '用户信息、权限点、token 混存成一个大对象',
      '没有定义登录态生命周期和刷新规则',
    ],
    language: 'typescript',
    code: `type AuthState = {\n  accessToken: string\n  refreshToken: string\n  expiresAt: number\n  user: {\n    id: string\n    name: string\n    roles: string[]\n    permissions: string[]\n  } | null\n}`,
  },
  {
    order: '02',
    title: '登录成功后的第一步：统一接管 token 和用户状态',
    tag: '状态建立',
    description:
      '真正稳的写法不是某个页面登录成功后顺手把 token 塞进 localStorage，而是有一个明确的 auth store 或 session 模块，统一接手 access token、refresh token、用户信息和过期时间。这样请求层、路由层、页面层才能共享同一套真相来源。',
    bestFor: ['账号密码登录', '验证码登录', '单点登录后的前端接管'],
    focus: [
      '登录结果进入统一 auth store',
      '持久化字段和内存字段分层管理',
      '请求层从统一来源读取 token',
    ],
    risks: [
      '页面里直接读写 localStorage',
      '刷新页面后内存态和持久化态不同步',
      '登录成功没有统一预热用户信息',
    ],
    language: 'typescript',
    code: `export const authStore = reactive({\n  accessToken: '',\n  refreshToken: '',\n  expiresAt: 0,\n  user: null as null | { id: string; name: string },\n})\n\nexport function setSession(payload: {\n  accessToken: string\n  refreshToken: string\n  expiresAt: number\n  user: { id: string; name: string }\n}) {\n  Object.assign(authStore, payload)\n  localStorage.setItem('session', JSON.stringify(payload))\n}`,
  },
  {
    order: '03',
    title: '请求层怎么带 token：别散落在页面里，统一用拦截器或请求封装',
    tag: '请求接入',
    description:
      '只要是需要登录态的项目，请求头里的 token 注入就应该统一做。因为 token 携带、401 处理、失败跳转、刷新重试，天然就是请求层职责。把这件事放在页面里重复写，后面只会越来越乱。',
    bestFor: ['统一接口请求层', '中后台业务系统', '多页面共享登录态'],
    focus: [
      '请求前统一注入 Authorization',
      '401 状态交给请求层兜底处理',
      '避免页面自己处理 token 缺失逻辑',
    ],
    risks: [
      '部分请求带 token，部分忘记带',
      '接口失败后每个页面都弹一次登录过期',
      '请求层不知道当前会话是否已退出',
    ],
    language: 'typescript',
    code: `async function request<T>(url: string, init: RequestInit = {}) {\n  const headers = new Headers(init.headers)\n\n  if (authStore.accessToken) {\n    headers.set('Authorization', 'Bearer ' + authStore.accessToken)\n  }\n\n  const response = await fetch(url, {\n    ...init,\n    headers,\n    credentials: 'include',\n  })\n\n  if (response.status === 401) {\n    throw new Error('UNAUTHORIZED')\n  }\n\n  return (await response.json()) as T\n}`,
  },
  {
    order: '04',
    title: '真正的进阶点：token 无感刷新要处理并发请求排队',
    tag: '核心难点',
    description:
      '渡一前端公开内容里有专门讲 token 无感刷新。难点从来不是“调一下刷新接口”，而是多个请求同时发现 token 过期时，不能每个请求都去刷新一次。更稳的方案是让第一个请求触发刷新，其他请求排队等待刷新结果，然后统一重放。',
    bestFor: [
      'access + refresh token 双 token 方案',
      '长驻后台系统',
      '需要降低频繁登录打断感的产品',
    ],
    focus: [
      '只允许一个 refresh 流程在飞',
      '其他 401 请求挂起等待刷新结果',
      '刷新失败时统一清会话并跳登录页',
    ],
    risks: [
      '并发触发多个 refresh 请求',
      '刷新成功但旧请求没有重放',
      '刷新失败后页面仍保留旧登录态假象',
    ],
    language: 'typescript',
    code: `let refreshPromise: Promise<string> | null = null\n\nasync function refreshAccessToken() {\n  if (!refreshPromise) {\n    refreshPromise = fetch('/api/auth/refresh', {\n      method: 'POST',\n      headers: { 'Content-Type': 'application/json' },\n      body: JSON.stringify({ refreshToken: authStore.refreshToken }),\n    })\n      .then((res) => res.json())\n      .then((data) => {\n        authStore.accessToken = data.accessToken\n        authStore.expiresAt = data.expiresAt\n        return data.accessToken as string\n      })\n      .finally(() => {\n        refreshPromise = null\n      })\n  }\n\n  return refreshPromise\n}`,
  },
  {
    order: '05',
    title: '最后落到页面体验：路由守卫、按钮显隐、退出清理',
    tag: '体验兜底',
    description:
      '前端权限真正该做的是页面层体验控制。比如未登录跳登录页、登录后回原页面、某些菜单只给指定角色显示、按钮根据 permission code 控制可见。但这些都只是体验层，接口层仍然要靠服务端做最后鉴权。',
    bestFor: ['控制台、后台管理系统', '角色菜单展示', '登录后跳转控制'],
    focus: [
      '路由守卫控制跳转体验',
      '菜单和按钮基于角色码或权限点渲染',
      '退出时清除持久化、内存态和请求中断状态',
    ],
    risks: [
      '只做路由守卫，不做接口鉴权',
      '退出登录只跳页面，不清本地状态',
      '权限点硬编码分散在各个组件中',
    ],
    language: 'typescript',
    code: `router.beforeEach((to) => {\n  const requiresAuth = to.meta.requiresAuth !== false\n\n  if (requiresAuth && !authStore.accessToken) {\n    return {\n      path: '/login',\n      query: { redirect: to.fullPath },\n    }\n  }\n\n  return true\n})\n\nexport function logout() {\n  authStore.accessToken = ''\n  authStore.refreshToken = ''\n  authStore.expiresAt = 0\n  authStore.user = null\n  localStorage.removeItem('session')\n  router.replace('/login')\n}`,
  },
];

const comparisonCards = [
  {
    title: 'cookie 会话 vs token 会话',
    summary:
      'cookie 会话更偏传统服务端控制，浏览器自动携带；token 会话更适合前后端分离和多端接入，但前端要自己管理注入、过期和刷新逻辑。',
  },
  {
    title: '页面权限 vs 接口权限',
    summary:
      '页面权限解决的是展示和交互体验，接口权限解决的是数据安全边界。前端可以隐藏按钮，但真正的数据访问控制必须由后端再次校验。',
  },
  {
    title: '简单重登 vs 无感刷新',
    summary:
      '简单重登实现最省事，但用户体验会被频繁打断；无感刷新体验更好，但会引入 token 生命周期、刷新并发控制和失败兜底等额外复杂度。',
  },
];
</script>

<style scoped>
.auth-guide-page {
  min-height: calc(100vh - 40px);
  padding: 24px;
  border: 1px solid rgba(19, 27, 34, 0.08);
  border-radius: 7px;
  background:
    radial-gradient(
      circle at top left,
      rgba(223, 230, 236, 0.5),
      transparent 28%
    ),
    linear-gradient(180deg, #fcfdfe 0%, #f4f7f9 100%);
  box-shadow: 0 30px 80px rgba(18, 26, 34, 0.08);
}

.auth-guide-page__shell {
  min-height: calc(100vh - 90px);
  border: 1px solid rgba(19, 27, 34, 0.06);
  border-radius: 7px;
  background: rgba(255, 255, 255, 0.82);
}

.auth-guide-page__top {
  display: flex;
  justify-content: flex-start;
  padding: 18px 18px 0;
}

.auth-guide-page__back {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 42px;
  height: 42px;
  border: 1px solid rgba(19, 27, 34, 0.08);
  border-radius: 999px;
  background: #ffffff;
  color: #22303c;
  text-decoration: none;
  transition:
    transform 160ms ease,
    border-color 160ms ease,
    box-shadow 160ms ease;
}

.auth-guide-page__back:hover {
  transform: translateY(-1px);
  border-color: rgba(46, 70, 91, 0.18);
  box-shadow: 0 18px 34px rgba(19, 27, 34, 0.08);
}

.auth-guide-page__content {
  padding: 18px 24px 24px;
}

.auth-guide-hero {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 320px;
  gap: 20px;
  padding-bottom: 26px;
  border-bottom: 1px solid rgba(19, 27, 34, 0.08);
}

.auth-guide-hero__eyebrow,
.auth-guide-section__eyebrow,
.auth-guide-card__eyebrow,
.auth-guide-hero__label {
  font-size: 11px;
  line-height: 1.4;
  letter-spacing: 0.24em;
  text-transform: uppercase;
  color: #7b8793;
}

.auth-guide-hero__title {
  margin-top: 10px;
  font-size: 46px;
  line-height: 1.06;
  font-weight: 600;
  letter-spacing: -0.05em;
  color: #17202a;
}

.auth-guide-hero__summary {
  max-width: 860px;
  margin-top: 16px;
  font-size: 15px;
  line-height: 1.9;
  color: #58636f;
}

.auth-guide-hero__panel,
.auth-guide-card,
.auth-guide-panel {
  border: 1px solid rgba(19, 27, 34, 0.08);
  border-radius: 7px;
  background: rgba(255, 255, 255, 0.84);
}

.auth-guide-hero__panel {
  padding: 18px;
}

.auth-guide-list {
  display: grid;
  gap: 8px;
  margin: 12px 0 0;
  padding-left: 18px;
  font-size: 14px;
  line-height: 1.8;
  color: #56616d;
}

.auth-guide-grid,
.auth-guide-columns,
.auth-guide-stack {
  display: grid;
  gap: 16px;
}

.auth-guide-grid {
  margin-top: 28px;
  grid-template-columns: repeat(3, minmax(0, 1fr));
}

.auth-guide-card {
  padding: 18px;
}

.auth-guide-card__title,
.auth-guide-panel__title,
.auth-guide-section__title {
  color: #17202a;
}

.auth-guide-card__title {
  margin-top: 10px;
  font-size: 22px;
  line-height: 1.25;
  font-weight: 600;
}

.auth-guide-card__text,
.auth-guide-panel__text {
  margin-top: 12px;
  font-size: 14px;
  line-height: 1.9;
  color: #596571;
}

.auth-guide-section {
  margin-top: 28px;
}

.auth-guide-section__head {
  margin-bottom: 14px;
}

.auth-guide-section__title {
  margin-top: 8px;
  font-size: 30px;
  line-height: 1.18;
  font-weight: 600;
  letter-spacing: -0.03em;
}

.auth-guide-columns {
  grid-template-columns: repeat(3, minmax(0, 1fr));
}

.auth-guide-stack {
  grid-template-columns: repeat(2, minmax(0, 1fr));
}

.auth-guide-panel {
  padding: 18px;
}

.auth-guide-panel.is-wide {
  grid-column: 1 / -1;
}

.auth-guide-panel__eyebrow {
  font-size: 11px;
  line-height: 1.4;
  letter-spacing: 0.24em;
  text-transform: uppercase;
  color: #80909d;
}

.auth-guide-panel__title {
  font-size: 20px;
  line-height: 1.3;
  font-weight: 600;
}

.auth-guide-method__head {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 16px;
}

.auth-guide-method__tag {
  display: inline-flex;
  align-items: center;
  min-height: 28px;
  padding: 0 12px;
  border-radius: 999px;
  background: rgba(115, 145, 167, 0.1);
  color: #587289;
  font-size: 12px;
  white-space: nowrap;
}

.auth-guide-method__grid {
  display: grid;
  gap: 14px;
  margin-top: 16px;
  grid-template-columns: repeat(3, minmax(0, 1fr));
}

.auth-guide-mini-panel {
  padding: 14px;
  border: 1px solid rgba(19, 27, 34, 0.08);
  border-radius: 7px;
  background: rgba(245, 248, 250, 0.9);
}

.auth-guide-mini-panel__title {
  font-size: 14px;
  font-weight: 600;
  color: #17202a;
}

.auth-guide-code-block {
  margin-top: 14px;
}

@media (max-width: 1080px) {
  .auth-guide-hero,
  .auth-guide-grid,
  .auth-guide-columns,
  .auth-guide-stack,
  .auth-guide-method__grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 900px) {
  .auth-guide-page {
    min-height: auto;
    padding: 18px;
  }

  .auth-guide-page__shell {
    min-height: auto;
  }

  .auth-guide-page__content {
    padding: 18px;
  }

  .auth-guide-hero__title {
    font-size: 36px;
  }

  .auth-guide-section__title {
    font-size: 26px;
  }
}
</style>
