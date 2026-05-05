<template>
  <section class="session-keepalive-guide-page">
    <div class="session-keepalive-guide-page__shell">
      <div class="session-keepalive-guide-page__top">
        <RouterLink
          to="/fullstack-guide"
          class="session-keepalive-guide-page__back"
          aria-label="返回全栈能力菜单"
          title="返回全栈能力菜单"
        >
          <el-icon :size="18"><ArrowLeft /></el-icon>
        </RouterLink>
      </div>

      <div class="session-keepalive-guide-page__content">
        <header class="session-keepalive-guide-hero">
          <div>
            <p class="session-keepalive-guide-hero__eyebrow">
              Frontend Session Keepalive Engineering
            </p>
            <h1 class="session-keepalive-guide-hero__title">
              前端会话保活工程
            </h1>
            <p class="session-keepalive-guide-hero__summary">
              会话保活不是简单做一个 token
              刷新定时器。真正的工程问题是：接口并发时如何避免重复刷新、用户长时间闲置是否要警告和登出、后台标签页恢复时如何补齐状态、单点登录失效时怎样平滑回收权限，以及整套机制怎样既安全又不打断用户操作。
            </p>
          </div>

          <div class="session-keepalive-guide-hero__panel">
            <p class="session-keepalive-guide-hero__label">学完结果</p>
            <ul class="session-keepalive-guide-list">
              <li>
                能设计 access token、refresh token 与会话过期时间的职责边界。
              </li>
              <li>
                能实现并发请求下的单飞刷新、闲置倒计时和登录失效回收方案。
              </li>
              <li>
                能把标签页切换、断网恢复和单点登录踢下线纳入统一会话治理模型。
              </li>
            </ul>
          </div>
        </header>

        <section class="session-keepalive-guide-grid">
          <article
            v-for="item in quickStages"
            :key="item.order"
            class="session-keepalive-guide-card"
          >
            <p class="session-keepalive-guide-card__eyebrow">
              Stage {{ item.order }}
            </p>
            <h2 class="session-keepalive-guide-card__title">
              {{ item.title }}
            </h2>
            <p class="session-keepalive-guide-card__text">{{ item.summary }}</p>
          </article>
        </section>

        <section class="session-keepalive-guide-section">
          <div class="session-keepalive-guide-section__head">
            <div>
              <p class="session-keepalive-guide-section__eyebrow">
                Engineering Order
              </p>
              <h2 class="session-keepalive-guide-section__title">
                先定义会话生命周期，再处理刷新、闲置、失效与恢复
              </h2>
            </div>
          </div>

          <div class="session-keepalive-guide-stack">
            <article
              v-for="stage in guideStages"
              :key="stage.order"
              class="session-keepalive-guide-panel is-wide"
            >
              <div class="session-keepalive-guide-method__head">
                <div>
                  <p class="session-keepalive-guide-panel__eyebrow">
                    Stage {{ stage.order }}
                  </p>
                  <h3 class="session-keepalive-guide-panel__title">
                    {{ stage.title }}
                  </h3>
                </div>
                <span class="session-keepalive-guide-method__tag">
                  {{ stage.tag }}
                </span>
              </div>

              <p class="session-keepalive-guide-panel__text">
                {{ stage.description }}
              </p>

              <div class="session-keepalive-guide-method__grid">
                <section class="session-keepalive-guide-mini-panel">
                  <p class="session-keepalive-guide-mini-panel__title">
                    适用场景
                  </p>
                  <ul class="session-keepalive-guide-list">
                    <li v-for="item in stage.bestFor" :key="item">
                      {{ item }}
                    </li>
                  </ul>
                </section>

                <section class="session-keepalive-guide-mini-panel">
                  <p class="session-keepalive-guide-mini-panel__title">
                    实现重点
                  </p>
                  <ul class="session-keepalive-guide-list">
                    <li v-for="item in stage.focus" :key="item">
                      {{ item }}
                    </li>
                  </ul>
                </section>

                <section class="session-keepalive-guide-mini-panel">
                  <p class="session-keepalive-guide-mini-panel__title">
                    常见误区
                  </p>
                  <ul class="session-keepalive-guide-list">
                    <li v-for="item in stage.risks" :key="item">
                      {{ item }}
                    </li>
                  </ul>
                </section>
              </div>

              <AppCodeBlock
                class="session-keepalive-guide-code-block"
                :code="stage.code"
                :lang="stage.language"
              />
            </article>
          </div>
        </section>

        <section class="session-keepalive-guide-section">
          <div class="session-keepalive-guide-section__head">
            <div>
              <p class="session-keepalive-guide-section__eyebrow">Comparison</p>
              <h2 class="session-keepalive-guide-section__title">
                会话治理里最容易混淆的几组策略
              </h2>
            </div>
          </div>

          <div class="session-keepalive-guide-columns">
            <article
              v-for="item in comparisonCards"
              :key="item.title"
              class="session-keepalive-guide-panel"
            >
              <h3 class="session-keepalive-guide-panel__title">
                {{ item.title }}
              </h3>
              <p class="session-keepalive-guide-panel__text">
                {{ item.summary }}
              </p>
            </article>
          </div>
        </section>

        <section class="session-keepalive-guide-section">
          <div class="session-keepalive-guide-section__head">
            <div>
              <p class="session-keepalive-guide-section__eyebrow">Checklist</p>
              <h2 class="session-keepalive-guide-section__title">
                一套能落地的前端会话保活建设清单
              </h2>
            </div>
          </div>

          <article class="session-keepalive-guide-panel is-wide">
            <ul class="session-keepalive-guide-list">
              <li>
                先定义 access token、refresh token、会话时长和闲置时长的边界。
              </li>
              <li>
                刷新逻辑必须支持单飞，不能让并发请求同时触发多次 refresh。
              </li>
              <li>
                登录失效要统一回收路由权限、缓存状态和敏感数据，不要只弹个提示。
              </li>
              <li>
                闲置倒计时和后台标签页恢复要联动处理，避免用户以为自己还在线。
              </li>
              <li>
                网络恢复、401 雪崩和单点登录踢下线都要走同一条会话恢复链路。
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
    title: '先定义生命周期',
    summary: '会话多久过期、多久闲置登出、刷新凭证多久失效，必须先讲清楚。',
  },
  {
    order: '02',
    title: '刷新必须单飞',
    summary:
      '并发请求下如果每个 401 都各自刷新，会直接把会话链路冲垮，必须合并成一次刷新。',
  },
  {
    order: '03',
    title: '闲置要可感知',
    summary:
      '高安全系统里，用户长时间不操作不能无限在线，倒计时预警和自动退出都要可解释。',
  },
  {
    order: '04',
    title: '失效要统一回收',
    summary: '单点登录踢下线、refresh 失效、账号禁用，都不该由各页面各自处理。',
  },
  {
    order: '05',
    title: '恢复链路要完整',
    summary: '断网恢复、后台标签页唤醒和应用重开后，都要重新校准当前会话状态。',
  },
];

const guideStages = [
  {
    order: '01',
    title: '先把会话生命周期拆清楚：访问凭证、刷新凭证、闲置时间、绝对过期时间',
    tag: 'Lifecycle',
    description:
      '很多系统会话混乱，不是因为代码不会写，而是概念一开始就揉在一起了。至少要区分 access token 的短期访问能力、refresh token 的续期能力、用户闲置超时和账号会话绝对过期时间。只有生命周期拆清楚，后面才能知道什么时候该静默刷新，什么时候必须重新登录。',
    bestFor: ['企业后台', '医疗系统', '金融系统', '有较高安全要求的管理台'],
    focus: [
      '区分访问凭证和刷新凭证的职责',
      '同时维护闲置超时与绝对会话时长',
      '把服务端返回的过期时间映射到前端会话状态机',
    ],
    risks: [
      '只知道 token 过期，不知道整段会话何时必须终止',
      '闲置超时和刷新成功互相覆盖，造成永不下线',
      '前后端对过期语义理解不一致，导致会话行为混乱',
    ],
    language: 'ts',
    code: `type SessionState = {
  accessToken: string | null
  refreshToken: string | null
  accessExpiresAt: number
  idleExpiresAt: number
  absoluteExpiresAt: number
}`,
  },
  {
    order: '02',
    title: '并发场景里刷新逻辑必须单飞，而不是每个失败请求都自己 refresh',
    tag: 'Single Flight',
    description:
      '最常见的线上事故之一，就是多个请求同时 401，然后各自触发 refresh，请求风暴直接把会话链路打爆。正确做法是只允许一个刷新请求在飞，其余请求挂起等待刷新结果，再统一重放。这样才能避免 refresh token 被并发消费、避免状态先后覆盖。',
    bestFor: ['接口并发高的工作台', '自动轮询系统', '多标签页业务系统'],
    focus: [
      '维护全局 refreshPromise 或刷新锁',
      '刷新成功后统一回放挂起请求',
      '刷新失败时统一清理会话并跳转登录',
    ],
    risks: [
      '多个 401 同时发 refresh 导致后端拒绝重复刷新',
      '先返回的旧 token 覆盖后返回的新 token',
      '失败请求各自处理，页面状态出现分裂',
    ],
    language: 'ts',
    code: `let refreshPromise: Promise<string> | null = null

const refreshAccessToken = async () => {
  if (!refreshPromise) {
    refreshPromise = request
      .post('/api/auth/refresh')
      .then(({ accessToken }) => {
        sessionStore.setAccessToken(accessToken)
        return accessToken
      })
      .finally(() => {
        refreshPromise = null
      })
  }

  return refreshPromise
}`,
  },
  {
    order: '03',
    title: '闲置会话不能只看请求频率，要把用户交互和倒计时提示纳入产品体验',
    tag: 'Idle Timeout',
    description:
      '很多系统只要用户页面不发请求，就默认用户闲置，这是不够的。真实业务里，用户可能正在阅读、录入、查看病历或编辑长文。更合理的方式，是根据键盘、鼠标、路由切换等真实交互更新 idle timer，并在到期前给出倒计时提示，让用户有机会续期或保存草稿。',
    bestFor: ['表单系统', '文档录入系统', '长流程审批系统', '高安全场景'],
    focus: [
      '用真实交互事件刷新 idleExpiresAt',
      '到期前展示明确倒计时和续期入口',
      '超时退出前先处理未保存数据或草稿',
    ],
    risks: [
      '用户正在看页面却被突然踢下线',
      '只绑定某几个事件，导致闲置判断失真',
      '超时退出前不保存上下文，造成用户数据损失',
    ],
    language: 'ts',
    code: `const touchIdleTimer = () => {
  sessionStore.idleExpiresAt = Date.now() + 15 * 60 * 1000
}

;['click', 'keydown', 'mousemove', 'visibilitychange'].forEach((eventName) => {
  window.addEventListener(eventName, touchIdleTimer, { passive: true })
})`,
  },
  {
    order: '04',
    title: '登录失效要统一回收权限、缓存和敏感上下文',
    tag: 'Session Revoke',
    description:
      '会话结束不是只删 token 再跳登录页。真正的工程要求是：把用户信息、权限菜单、业务缓存、草稿、本地敏感数据和长连接订阅一起回收。否则页面虽然跳走了，但本地仍然残留上一个账号的数据，安全和一致性都会出问题。',
    bestFor: ['多角色系统', '共享终端', '带本地缓存的中后台', '医疗和政务系统'],
    focus: [
      '统一封装 signOut 流程',
      '清理 Pinia/本地缓存/路由权限/长连接',
      '区分主动退出与被动失效的提示文案',
    ],
    risks: [
      '只删 token，不清理本地权限和业务状态',
      '账号切换后看到上一个用户残留数据',
      'WebSocket 和轮询还在继续跑，产生幽灵请求',
    ],
    language: 'ts',
    code: `const signOut = async (reason: 'manual' | 'expired' | 'revoked') => {
  permissionStore.reset()
  workspaceStore.reset()
  messageChannel.close()
  localStorage.removeItem('session')
  router.replace('/login?reason=' + reason)
}`,
  },
  {
    order: '05',
    title: '后台标签页恢复、断网恢复和单点登录踢下线都要接入同一条恢复链路',
    tag: 'Recovery',
    description:
      '很多会话问题只在边缘条件下暴露，比如标签页挂后台很久、网络抖动后恢复、用户在别处重新登录或被管理员踢下线。成熟方案不是给每个场景各写一套特判，而是统一在 visibilitychange、online 事件和服务端会话探测里重校验当前会话，再决定续期、重放请求还是强制退出。',
    bestFor: ['多标签页应用', '移动办公系统', 'VPN/弱网环境', '单点登录体系'],
    focus: [
      '在页面唤醒和网络恢复时主动校验会话',
      '多标签页共享会话状态，避免一边退出一边还显示在线',
      '服务端返回 revoked 信号时立即走统一失效处理',
    ],
    risks: [
      '后台挂久了回来继续拿旧 token 发请求',
      '一处退出后其他标签页还保持假在线状态',
      '恢复逻辑散在各页面里，越修越乱',
    ],
    language: 'ts',
    code: `const revalidateSession = async () => {
  const profile = await request.get('/api/auth/session')

  if (!profile.active) {
    await signOut('revoked')
    return
  }

  sessionStore.sync(profile)
}

window.addEventListener('online', revalidateSession)
document.addEventListener('visibilitychange', () => {
  if (document.visibilityState === 'visible') {
    void revalidateSession()
  }
})`,
  },
];

const comparisonCards = [
  {
    title: '静默刷新 vs 强制重登',
    summary:
      '静默刷新适合 access token 过期但 refresh 仍有效的场景；一旦 refresh 失效、会话被吊销或账号权限变化，就必须强制重登并清理上下文。',
  },
  {
    title: '闲置超时 vs 绝对超时',
    summary:
      '闲置超时强调用户长时间不操作要退出；绝对超时强调无论用户是否活跃，到达安全上限后都要结束这段会话，二者不能互相替代。',
  },
  {
    title: '单标签页保活 vs 多标签页会话同步',
    summary:
      '单标签页只要自己能刷新会话还不够，多标签页系统还必须广播登录状态变化，否则用户会在不同标签页看到互相冲突的会话状态。',
  },
];
</script>

<style scoped>
.session-keepalive-guide-page {
  min-height: calc(100vh - 40px);
  padding: 24px;
  border: 1px solid rgba(19, 27, 34, 0.08);
  border-radius: 7px;
  background:
    radial-gradient(
      circle at top right,
      rgba(224, 233, 238, 0.42),
      transparent 26%
    ),
    linear-gradient(180deg, #fbfcfd 0%, #f2f5f8 100%);
  box-shadow: 0 30px 80px rgba(18, 26, 34, 0.08);
}

.session-keepalive-guide-page__shell {
  min-height: calc(100vh - 90px);
  border: 1px solid rgba(19, 27, 34, 0.06);
  border-radius: 7px;
  background: rgba(255, 255, 255, 0.84);
}

.session-keepalive-guide-page__top {
  display: flex;
  justify-content: flex-start;
  padding: 18px 18px 0;
}

.session-keepalive-guide-page__back {
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

.session-keepalive-guide-page__back:hover {
  transform: translateY(-1px);
  border-color: rgba(46, 70, 91, 0.18);
  box-shadow: 0 18px 34px rgba(19, 27, 34, 0.08);
}

.session-keepalive-guide-page__content {
  padding: 18px 24px 24px;
}

.session-keepalive-guide-hero,
.session-keepalive-guide-panel,
.session-keepalive-guide-card {
  border: 1px solid rgba(19, 27, 34, 0.08);
  border-radius: 7px;
  background: rgba(255, 255, 255, 0.86);
}

.session-keepalive-guide-hero {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 320px;
  gap: 20px;
  padding: 28px;
}

.session-keepalive-guide-hero__eyebrow,
.session-keepalive-guide-section__eyebrow,
.session-keepalive-guide-card__eyebrow,
.session-keepalive-guide-hero__label {
  font-size: 11px;
  line-height: 1.4;
  letter-spacing: 0.24em;
  text-transform: uppercase;
  color: #7b8793;
}

.session-keepalive-guide-hero__title {
  margin-top: 10px;
  font-size: 46px;
  line-height: 1.06;
  font-weight: 600;
  letter-spacing: -0.05em;
  color: #17202a;
}

.session-keepalive-guide-hero__summary {
  max-width: 860px;
  margin-top: 16px;
  font-size: 15px;
  line-height: 1.9;
  color: #58636f;
}

.session-keepalive-guide-hero__panel {
  align-self: stretch;
  padding: 18px;
  border: 1px solid rgba(19, 27, 34, 0.08);
  border-radius: 7px;
  background: linear-gradient(180deg, #fbfcfd 0%, #f4f7fa 100%);
}

.session-keepalive-guide-list {
  display: grid;
  gap: 8px;
  margin: 12px 0 0;
  padding-left: 18px;
  font-size: 14px;
  line-height: 1.8;
  color: #56616d;
}

.session-keepalive-guide-grid,
.session-keepalive-guide-columns,
.session-keepalive-guide-stack {
  display: grid;
  gap: 16px;
}

.session-keepalive-guide-grid {
  margin-top: 28px;
  grid-template-columns: repeat(5, minmax(0, 1fr));
}

.session-keepalive-guide-card {
  padding: 18px;
}

.session-keepalive-guide-card__title,
.session-keepalive-guide-panel__title,
.session-keepalive-guide-section__title {
  color: #17202a;
}

.session-keepalive-guide-card__title {
  margin-top: 10px;
  font-size: 22px;
  line-height: 1.25;
  font-weight: 600;
}

.session-keepalive-guide-card__text,
.session-keepalive-guide-panel__text {
  margin-top: 12px;
  font-size: 14px;
  line-height: 1.9;
  color: #596571;
}

.session-keepalive-guide-section {
  margin-top: 28px;
}

.session-keepalive-guide-section__head {
  margin-bottom: 14px;
}

.session-keepalive-guide-section__title {
  margin-top: 8px;
  font-size: 30px;
  line-height: 1.18;
  font-weight: 600;
  letter-spacing: -0.03em;
}

.session-keepalive-guide-columns {
  grid-template-columns: repeat(3, minmax(0, 1fr));
}

.session-keepalive-guide-stack {
  grid-template-columns: repeat(2, minmax(0, 1fr));
}

.session-keepalive-guide-panel {
  padding: 18px;
}

.session-keepalive-guide-panel.is-wide {
  grid-column: 1 / -1;
}

.session-keepalive-guide-panel__eyebrow {
  font-size: 11px;
  line-height: 1.4;
  letter-spacing: 0.24em;
  text-transform: uppercase;
  color: #80909d;
}

.session-keepalive-guide-panel__title {
  font-size: 20px;
  line-height: 1.3;
  font-weight: 600;
}

.session-keepalive-guide-method__head {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 16px;
}

.session-keepalive-guide-method__tag {
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

.session-keepalive-guide-method__grid {
  display: grid;
  gap: 14px;
  margin-top: 16px;
  grid-template-columns: repeat(3, minmax(0, 1fr));
}

.session-keepalive-guide-mini-panel {
  padding: 14px;
  border: 1px solid rgba(19, 27, 34, 0.08);
  border-radius: 7px;
  background: rgba(245, 248, 250, 0.9);
}

.session-keepalive-guide-mini-panel__title {
  font-size: 14px;
  font-weight: 600;
  color: #17202a;
}

.session-keepalive-guide-code-block {
  margin-top: 14px;
}

@media (max-width: 1080px) {
  .session-keepalive-guide-hero,
  .session-keepalive-guide-grid,
  .session-keepalive-guide-columns,
  .session-keepalive-guide-stack,
  .session-keepalive-guide-method__grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 900px) {
  .session-keepalive-guide-page {
    min-height: auto;
    padding: 18px;
  }

  .session-keepalive-guide-page__shell {
    min-height: auto;
  }

  .session-keepalive-guide-page__content {
    padding: 18px;
  }

  .session-keepalive-guide-hero__title {
    font-size: 36px;
  }

  .session-keepalive-guide-section__title {
    font-size: 26px;
  }
}
</style>
