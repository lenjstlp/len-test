<template>
  <section class="qr-login-guide-page">
    <div class="qr-login-guide-page__shell">
      <div class="qr-login-guide-page__top">
        <RouterLink
          to="/fullstack-guide"
          class="qr-login-guide-page__back"
          aria-label="返回全栈能力菜单"
          title="返回全栈能力菜单"
        >
          <el-icon :size="18"><ArrowLeft /></el-icon>
        </RouterLink>
      </div>

      <div class="qr-login-guide-page__content">
        <header class="qr-login-guide-hero">
          <div>
            <p class="qr-login-guide-hero__eyebrow">
              Frontend QR Login Engineering
            </p>
            <h1 class="qr-login-guide-hero__title">前端扫码登录工程</h1>
            <p class="qr-login-guide-hero__summary">
              扫码登录不是把二维码展示出来就结束。真正的工程实现要同时处理二维码
              ticket 生成、轮询或推送、移动端确认、PC 端登录态建立、过期刷新、
              幂等消费和风险控制。做得粗糙，用户会遇到“扫码成功但网页没登录”“二维码过期还在转圈”“重复确认把登录态打乱”这类典型事故。做得成熟，扫码登录会成为桌面端产品里极顺手的一条登录通道。
            </p>
          </div>

          <div class="qr-login-guide-hero__panel">
            <p class="qr-login-guide-hero__label">学完结果</p>
            <ul class="qr-login-guide-list">
              <li>
                能独立设计扫码登录的前后端状态流，而不是只会调一个轮询接口。
              </li>
              <li>
                能分清“待扫码、已扫码、待确认、已确认、已过期”的状态边界和前端职责。
              </li>
              <li>
                能判断什么时候用轮询、什么时候上 WebSocket /
                SSE，以及如何处理幂等和安全。
              </li>
            </ul>
          </div>
        </header>

        <section class="qr-login-guide-grid">
          <article
            v-for="item in quickStages"
            :key="item.order"
            class="qr-login-guide-card"
          >
            <p class="qr-login-guide-card__eyebrow">Stage {{ item.order }}</p>
            <h2 class="qr-login-guide-card__title">{{ item.title }}</h2>
            <p class="qr-login-guide-card__text">{{ item.summary }}</p>
          </article>
        </section>

        <section class="qr-login-guide-section">
          <div class="qr-login-guide-section__head">
            <div>
              <p class="qr-login-guide-section__eyebrow">Decision Order</p>
              <h2 class="qr-login-guide-section__title">
                扫码登录先定义状态机，再选消息通道
              </h2>
            </div>
          </div>

          <div class="qr-login-guide-stack">
            <article
              v-for="stage in guideStages"
              :key="stage.order"
              class="qr-login-guide-panel is-wide"
            >
              <div class="qr-login-guide-method__head">
                <div>
                  <p class="qr-login-guide-panel__eyebrow">
                    Stage {{ stage.order }}
                  </p>
                  <h3 class="qr-login-guide-panel__title">
                    {{ stage.title }}
                  </h3>
                </div>
                <span class="qr-login-guide-method__tag">{{ stage.tag }}</span>
              </div>

              <p class="qr-login-guide-panel__text">{{ stage.description }}</p>

              <div class="qr-login-guide-method__grid">
                <section class="qr-login-guide-mini-panel">
                  <p class="qr-login-guide-mini-panel__title">适用场景</p>
                  <ul class="qr-login-guide-list">
                    <li v-for="item in stage.bestFor" :key="item">
                      {{ item }}
                    </li>
                  </ul>
                </section>

                <section class="qr-login-guide-mini-panel">
                  <p class="qr-login-guide-mini-panel__title">实现重点</p>
                  <ul class="qr-login-guide-list">
                    <li v-for="item in stage.focus" :key="item">
                      {{ item }}
                    </li>
                  </ul>
                </section>

                <section class="qr-login-guide-mini-panel">
                  <p class="qr-login-guide-mini-panel__title">常见误区</p>
                  <ul class="qr-login-guide-list">
                    <li v-for="item in stage.risks" :key="item">
                      {{ item }}
                    </li>
                  </ul>
                </section>
              </div>

              <AppCodeBlock
                class="qr-login-guide-code-block"
                :code="stage.code"
                :lang="stage.language"
              />
            </article>
          </div>
        </section>

        <section class="qr-login-guide-section">
          <div class="qr-login-guide-section__head">
            <div>
              <p class="qr-login-guide-section__eyebrow">State Model</p>
              <h2 class="qr-login-guide-section__title">
                扫码登录最核心的是状态机要稳定
              </h2>
            </div>
          </div>

          <article class="qr-login-guide-panel is-wide">
            <p class="qr-login-guide-panel__text">
              如果状态定义模糊，前端就会出现两个典型问题：一是二维码已经过期但界面还在轮询，二是移动端已经确认但桌面端没有正确建立会话。扫码登录不怕步骤多，怕的是状态不闭合。
            </p>

            <AppCodeBlock
              class="qr-login-guide-code-block"
              :code="stateModelExample"
              lang="typescript"
            />
          </article>
        </section>

        <section class="qr-login-guide-section">
          <div class="qr-login-guide-section__head">
            <div>
              <p class="qr-login-guide-section__eyebrow">Comparison</p>
              <h2 class="qr-login-guide-section__title">
                轮询、SSE、WebSocket 该怎么选
              </h2>
            </div>
          </div>

          <div class="qr-login-guide-columns">
            <article
              v-for="item in comparisonCards"
              :key="item.title"
              class="qr-login-guide-panel"
            >
              <h3 class="qr-login-guide-panel__title">{{ item.title }}</h3>
              <p class="qr-login-guide-panel__text">{{ item.summary }}</p>
            </article>
          </div>
        </section>

        <section class="qr-login-guide-section">
          <div class="qr-login-guide-section__head">
            <div>
              <p class="qr-login-guide-section__eyebrow">Best Practice</p>
              <h2 class="qr-login-guide-section__title">
                一个可落地的扫码登录前端流程
              </h2>
            </div>
          </div>

          <article class="qr-login-guide-panel is-wide">
            <p class="qr-login-guide-panel__text">
              对大多数 Web
              管理端，最佳实践不是一开始就上最重的实时通道，而是把状态定义清楚后，优先用短轮询做第一版，再根据登录量和实时性需求决定是否升级为
              SSE 或 WebSocket。
            </p>

            <AppCodeBlock
              class="qr-login-guide-code-block"
              :code="workflowExample"
              lang="typescript"
            />
          </article>
        </section>

        <section class="qr-login-guide-section">
          <div class="qr-login-guide-section__head">
            <div>
              <p class="qr-login-guide-section__eyebrow">Checklist</p>
              <h2 class="qr-login-guide-section__title">
                扫码登录上线前必须自查的 6 件事
              </h2>
            </div>
          </div>

          <article class="qr-login-guide-panel is-wide">
            <ul class="qr-login-guide-list">
              <li>
                二维码 ticket 要设置明确过期时间，并在前端做倒计时和过期刷新。
              </li>
              <li>
                PC
                端只根据服务端返回的最终确认态建立会话，不要根据“已扫码”提前登录。
              </li>
              <li>移动端确认动作必须幂等，重复点击确认不能生成多个登录态。</li>
              <li>轮询终止条件要完整覆盖成功、拒绝、过期、异常和页面卸载。</li>
              <li>
                登录成功后要统一进入既有鉴权链路，别绕开 token / session
                初始化。
              </li>
              <li>高风险系统要补设备信息、IP 变化、异地提醒和二次校验策略。</li>
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
    title: '先定状态，不要先写轮询',
    summary:
      '扫码登录的难点是状态流，不是生成二维码图片。状态没定义清楚，后面的实现都会乱。',
  },
  {
    order: '02',
    title: '二维码本质是 ticket',
    summary:
      '二维码里装的通常不是用户信息，而是一次性 ticket 或 login token，用来绑定这次登录流程。',
  },
  {
    order: '03',
    title: '移动端负责确认，不直接发凭证',
    summary:
      '移动端扫描后只是告诉服务端“这个已登录用户同意这次桌面登录”，最终会话仍由服务端发给 PC。',
  },
  {
    order: '04',
    title: '消息通道按复杂度升级',
    summary:
      '大部分项目先用轮询即可，只有在实时性和并发量上来后，才值得切到 SSE 或 WebSocket。',
  },
  {
    order: '05',
    title: '登录成功必须走统一会话链路',
    summary:
      '扫码登录只是登录入口不同，不应该绕开原有 token、session、权限拉取和用户信息初始化。',
  },
];

const guideStages = [
  {
    order: '01',
    title: '先把扫码登录拆成 5 个明确状态',
    tag: '状态机',
    description:
      '扫码登录至少要有 `pending`、`scanned`、`confirmed`、`rejected`、`expired` 这几类状态。PC 端展示二维码后进入待扫码，移动端扫到后进入已扫码，用户在移动端确认后才进入已确认，若超时则过期。前端最容易犯的错误，是把“已扫码”和“已确认”混成一个成功状态，导致用户只是扫了一下，PC 就误判为可以登录。',
    bestFor: ['后台登录页', '桌面站点登录页', '企业内控台登录'],
    focus: [
      '状态定义与 UI 展示一一对应',
      '过期与拒绝都是终态，需要终止轮询',
      '只在 confirmed 后建立桌面端会话',
    ],
    risks: [
      '把 scanned 当成登录成功',
      '二维码过期后还继续轮询',
      '状态切换没有幂等，导致界面闪烁',
    ],
    language: 'typescript',
    code: `type QrLoginStatus =
  | 'pending'
  | 'scanned'
  | 'confirmed'
  | 'rejected'
  | 'expired'

type QrLoginSession = {
  ticket: string
  status: QrLoginStatus
  expireAt: number
  scannedAt?: number
  confirmedAt?: number
}`,
  },
  {
    order: '02',
    title: '二维码展示的是一次性 ticket，而不是用户凭证',
    tag: '凭证边界',
    description:
      '二维码只是把这次桌面登录流程的 ticket 暴露给移动端，真正的用户身份仍由移动端当前已登录态提供。服务端拿到 ticket 后，会把“这次桌面登录请求”和“当前已登录手机用户”绑定起来。这样做的好处是 PC 端不需要提前知道是谁，二维码本身泄露时也不会直接暴露用户会话。',
    bestFor: ['微信式扫码登录', '企业 App 辅助登录', '多端统一账号体系'],
    focus: [
      '二维码内容用 ticket 或短期 code',
      'ticket 单次有效且具备过期时间',
      '服务端保存 ticket 与 PC 会话的映射',
    ],
    risks: [
      '直接把 access token 放进二维码',
      'ticket 复用导致旧码还能登录',
      'ticket 和 PC 会话没有强绑定',
    ],
    language: 'json',
    code: `{
  "ticket": "qr_login_9f2c5d8a",
  "scene": "pc-login",
  "expireAt": 1788888888888,
  "pollUrl": "/api/auth/qr-login/status"
}`,
  },
  {
    order: '03',
    title: 'PC 端消息通道先用轮询，复杂度最低',
    tag: '链路落地',
    description:
      '绝大多数扫码登录场景，对“秒级通知”已经够用，用 1 到 2 秒一次的短轮询就能把工程做稳。它的优点是接入简单、兼容性高、和现有网关体系不冲突。只有当登录量很大、轮询成本明显上升，或者对实时反馈要求更高时，才考虑 SSE 或 WebSocket。',
    bestFor: ['管理后台', '低到中等并发产品', '先做 MVP 的扫码登录'],
    focus: [
      '轮询间隔控制在 1 到 2 秒',
      '终态立即停轮询并清理定时器',
      '页面隐藏或离开时要暂停或销毁请求',
    ],
    risks: [
      '轮询过快导致无意义请求洪峰',
      '页面销毁后定时器没清掉',
      '异常重试没有上限，把失败状态无限放大',
    ],
    language: 'typescript',
    code: `async function pollQrLoginStatus(ticket: string) {
  const response = await fetch('/api/auth/qr-login/status', {
    method: 'POST',
    body: JSON.stringify({ ticket }),
  })

  return response.json() as Promise<{
    status: 'pending' | 'scanned' | 'confirmed' | 'rejected' | 'expired'
    authToken?: string
  }>
}`,
  },
  {
    order: '04',
    title: '移动端确认动作必须幂等，并把最终登录态交给服务端签发',
    tag: '确认链路',
    description:
      '移动端点“确认登录”后，真正要做的是把当前用户身份和 ticket 绑定，并由服务端生成给 PC 的最终登录态。这个确认接口必须是幂等的，因为用户可能会重复点确认，或者弱网下重复提交。前端需要把按钮状态锁住，但真正的幂等还是要靠服务端保证。',
    bestFor: ['金融 / 医疗 / 企业系统', '账号安全要求较高的业务'],
    focus: [
      '确认接口以 ticket 作为幂等主键',
      '已确认状态重复提交时返回同一结果',
      'PC 会话只接收服务端签发的最终 token / session',
    ],
    risks: [
      '重复确认生成多个会话',
      '前端只做按钮禁用，后端没有幂等控制',
      'PC 端自己拼用户态而不是拉服务端结果',
    ],
    language: 'typescript',
    code: `async function confirmQrLogin(ticket: string) {
  return fetch('/api/auth/qr-login/confirm', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ ticket }),
  })
}`,
  },
  {
    order: '05',
    title: '扫码成功后仍要回到统一鉴权初始化流程',
    tag: '系统收口',
    description:
      '扫码登录只是获取登录态的入口，不是独立的一套身份系统。登录成功后，前端仍然要走既有的用户信息拉取、权限菜单加载、路由重定向和本地缓存写入流程。这样后面做退出、续期、权限刷新时，扫码登录和账号密码登录才能复用同一套代码路径。',
    bestFor: ['已有账号密码登录体系的产品', '多登录方式并存的后台系统'],
    focus: [
      '登录成功后调用统一 bootstrapAuth',
      '菜单、权限、用户信息都走同一初始化链路',
      '扫码登录失败时不要污染现有登录态',
    ],
    risks: [
      '为了快，单独写一套扫码成功逻辑',
      '扫码登录成功后没有拉权限，页面状态不完整',
      '失败态残留旧 ticket，导致下次登录异常',
    ],
    language: 'typescript',
    code: `async function bootstrapAuth(authToken: string) {
  saveAccessToken(authToken)
  const profile = await fetchCurrentUser()
  const permissions = await fetchPermissionMenus()

  return {
    profile,
    permissions,
  }
}`,
  },
];

const stateModelExample = `const terminalStates = new Set([
  'confirmed',
  'rejected',
  'expired',
])

function isTerminalStatus(status: string) {
  return terminalStates.has(status)
}

function shouldRefreshQrCode(expireAt: number, now = Date.now()) {
  return now >= expireAt
}`;

const workflowExample = `let pollingTimer: number | null = null

async function startQrLogin(ticket: string) {
  stopQrLoginPolling()

  pollingTimer = window.setInterval(async () => {
    const result = await pollQrLoginStatus(ticket)

    if (result.status === 'confirmed' && result.authToken) {
      stopQrLoginPolling()
      await bootstrapAuth(result.authToken)
      return
    }

    if (['rejected', 'expired'].includes(result.status)) {
      stopQrLoginPolling()
    }
  }, 1500)
}

function stopQrLoginPolling() {
  if (pollingTimer !== null) {
    window.clearInterval(pollingTimer)
    pollingTimer = null
  }
}`;

const comparisonCards = [
  {
    title: '短轮询',
    summary:
      '最适合第一版落地。实现简单、运维友好、兼容性最好。缺点是请求会按固定频率打到服务端，高并发下需要评估成本。',
  },
  {
    title: 'SSE',
    summary:
      '适合服务端单向主动推送状态更新，比轮询更实时，也比 WebSocket 更轻。缺点是部分网关和老旧基础设施支持没那么稳定。',
  },
  {
    title: 'WebSocket',
    summary:
      '适合需要双向通信或高实时性的复杂场景，但接入、鉴权、连接保活和网关治理成本最高。扫码登录单场景通常不必一开始就上。',
  },
];
</script>

<style scoped>
.qr-login-guide-page {
  min-height: calc(100vh - 40px);
  padding: 32px;
  border: 1px solid rgba(19, 27, 34, 0.08);
  border-radius: 7px;
  background:
    radial-gradient(
      circle at top right,
      rgba(220, 228, 235, 0.48),
      transparent 30%
    ),
    linear-gradient(180deg, #fbfcfd 0%, #f3f6f9 100%);
  box-shadow: 0 30px 80px rgba(18, 26, 34, 0.08);
}

.qr-login-guide-page__shell {
  width: min(1180px, 100%);
  margin: 0 auto;
}

.qr-login-guide-page__top {
  margin-bottom: 20px;
}

.qr-login-guide-page__back {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 42px;
  height: 42px;
  border: 1px solid rgba(19, 27, 34, 0.1);
  border-radius: 999px;
  color: #17202a;
  background: rgba(255, 255, 255, 0.92);
  text-decoration: none;
  transition:
    transform 160ms ease,
    border-color 160ms ease,
    box-shadow 160ms ease;
}

.qr-login-guide-page__back:hover {
  transform: translateY(-1px);
  border-color: rgba(67, 94, 118, 0.2);
  box-shadow: 0 18px 36px rgba(21, 29, 36, 0.08);
}

.qr-login-guide-page__content {
  display: grid;
  gap: 24px;
}

.qr-login-guide-hero {
  display: grid;
  grid-template-columns: minmax(0, 1.5fr) minmax(280px, 0.8fr);
  gap: 20px;
}

.qr-login-guide-hero__eyebrow,
.qr-login-guide-card__eyebrow,
.qr-login-guide-section__eyebrow,
.qr-login-guide-panel__eyebrow {
  font-size: 11px;
  line-height: 1.4;
  letter-spacing: 0.24em;
  text-transform: uppercase;
  color: #7e8894;
}

.qr-login-guide-hero__title {
  margin-top: 10px;
  font-size: 42px;
  line-height: 1.08;
  font-weight: 600;
  letter-spacing: -0.04em;
  color: #17202a;
}

.qr-login-guide-hero__summary {
  margin-top: 16px;
  font-size: 15px;
  line-height: 1.9;
  color: #57616d;
}

.qr-login-guide-hero__panel,
.qr-login-guide-panel,
.qr-login-guide-card,
.qr-login-guide-mini-panel {
  border: 1px solid rgba(19, 27, 34, 0.08);
  border-radius: 7px;
  background: rgba(255, 255, 255, 0.96);
  box-shadow: 0 18px 42px rgba(21, 29, 36, 0.06);
}

.qr-login-guide-hero__panel {
  padding: 22px;
}

.qr-login-guide-hero__label,
.qr-login-guide-mini-panel__title,
.qr-login-guide-method__tag {
  font-size: 12px;
  line-height: 1.4;
  font-weight: 600;
  color: #52606d;
}

.qr-login-guide-grid,
.qr-login-guide-columns {
  display: grid;
  gap: 16px;
}

.qr-login-guide-grid {
  grid-template-columns: repeat(5, minmax(0, 1fr));
}

.qr-login-guide-columns {
  grid-template-columns: repeat(3, minmax(0, 1fr));
}

.qr-login-guide-card,
.qr-login-guide-panel {
  padding: 20px;
}

.qr-login-guide-card__title,
.qr-login-guide-panel__title,
.qr-login-guide-section__title {
  margin-top: 8px;
  font-size: 22px;
  line-height: 1.3;
  font-weight: 600;
  color: #17202a;
}

.qr-login-guide-card__text,
.qr-login-guide-panel__text,
.qr-login-guide-list,
.qr-login-guide-list li {
  font-size: 14px;
  line-height: 1.85;
  color: #57616d;
}

.qr-login-guide-list {
  margin: 10px 0 0;
  padding-left: 18px;
}

.qr-login-guide-section {
  display: grid;
  gap: 16px;
}

.qr-login-guide-section__head {
  display: flex;
  align-items: end;
  justify-content: space-between;
  gap: 16px;
}

.qr-login-guide-stack {
  display: grid;
  gap: 16px;
}

.qr-login-guide-panel.is-wide {
  padding: 24px;
}

.qr-login-guide-method__head,
.qr-login-guide-detail__head {
  display: flex;
  align-items: start;
  justify-content: space-between;
  gap: 16px;
}

.qr-login-guide-method__tag {
  display: inline-flex;
  align-items: center;
  padding: 6px 10px;
  border-radius: 999px;
  background: rgba(227, 233, 239, 0.7);
}

.qr-login-guide-method__grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 14px;
  margin-top: 18px;
}

.qr-login-guide-mini-panel {
  padding: 16px;
  background: linear-gradient(180deg, #ffffff 0%, #f8fafc 100%);
}

.qr-login-guide-code-block {
  margin-top: 18px;
}

@media (max-width: 1080px) {
  .qr-login-guide-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .qr-login-guide-columns,
  .qr-login-guide-method__grid,
  .qr-login-guide-hero {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 720px) {
  .qr-login-guide-page {
    min-height: auto;
    padding: 22px;
  }

  .qr-login-guide-grid {
    grid-template-columns: 1fr;
  }

  .qr-login-guide-hero__title {
    font-size: 34px;
  }

  .qr-login-guide-card__title,
  .qr-login-guide-panel__title,
  .qr-login-guide-section__title {
    font-size: 20px;
  }
}
</style>
