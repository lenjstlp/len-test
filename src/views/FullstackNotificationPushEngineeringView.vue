<template>
  <section class="notification-push-guide-page">
    <div class="notification-push-guide-page__shell">
      <div class="notification-push-guide-page__top">
        <RouterLink
          to="/fullstack-guide"
          class="notification-push-guide-page__back"
          aria-label="返回全栈能力菜单"
          title="返回全栈能力菜单"
        >
          <el-icon :size="18"><ArrowLeft /></el-icon>
        </RouterLink>
      </div>

      <div class="notification-push-guide-page__content">
        <header class="notification-push-guide-hero">
          <div>
            <p class="notification-push-guide-hero__eyebrow">
              Frontend Notification Push Engineering
            </p>
            <h1 class="notification-push-guide-hero__title">
              前端通知推送工程
            </h1>
            <p class="notification-push-guide-hero__summary">
              通知推送不是只弹一个系统提示。真正的工程问题是：站内信、系统通知、浏览器
              Notification、WebSocket
              推送和离线推送如何分工，权限授权率怎样提升，Service Worker
              生命周期如何管理，点击通知后怎样准确路由回业务页，以及推送风暴如何限流和去重。
            </p>
          </div>

          <div class="notification-push-guide-hero__panel">
            <p class="notification-push-guide-hero__label">学完结果</p>
            <ul class="notification-push-guide-list">
              <li>
                能区分站内消息、系统通知、浏览器推送与离线推送的适用边界。
              </li>
              <li>
                能设计授权、订阅、消息分发、点击回跳和去重限流的完整链路。
              </li>
              <li>
                能把推送能力接入会话、权限、埋点和消息中心，而不是做成孤立功能。
              </li>
            </ul>
          </div>
        </header>

        <section class="notification-push-guide-grid">
          <article
            v-for="item in quickStages"
            :key="item.order"
            class="notification-push-guide-card"
          >
            <p class="notification-push-guide-card__eyebrow">
              Stage {{ item.order }}
            </p>
            <h2 class="notification-push-guide-card__title">
              {{ item.title }}
            </h2>
            <p class="notification-push-guide-card__text">{{ item.summary }}</p>
          </article>
        </section>

        <section class="notification-push-guide-section">
          <div class="notification-push-guide-section__head">
            <div>
              <p class="notification-push-guide-section__eyebrow">
                Engineering Order
              </p>
              <h2 class="notification-push-guide-section__title">
                先分清消息层级，再治理授权、订阅、送达和点击回跳
              </h2>
            </div>
          </div>

          <div class="notification-push-guide-stack">
            <article
              v-for="stage in guideStages"
              :key="stage.order"
              class="notification-push-guide-panel is-wide"
            >
              <div class="notification-push-guide-method__head">
                <div>
                  <p class="notification-push-guide-panel__eyebrow">
                    Stage {{ stage.order }}
                  </p>
                  <h3 class="notification-push-guide-panel__title">
                    {{ stage.title }}
                  </h3>
                </div>
                <span class="notification-push-guide-method__tag">
                  {{ stage.tag }}
                </span>
              </div>

              <p class="notification-push-guide-panel__text">
                {{ stage.description }}
              </p>

              <div class="notification-push-guide-method__grid">
                <section class="notification-push-guide-mini-panel">
                  <p class="notification-push-guide-mini-panel__title">
                    适用场景
                  </p>
                  <ul class="notification-push-guide-list">
                    <li v-for="item in stage.bestFor" :key="item">
                      {{ item }}
                    </li>
                  </ul>
                </section>

                <section class="notification-push-guide-mini-panel">
                  <p class="notification-push-guide-mini-panel__title">
                    实现重点
                  </p>
                  <ul class="notification-push-guide-list">
                    <li v-for="item in stage.focus" :key="item">{{ item }}</li>
                  </ul>
                </section>

                <section class="notification-push-guide-mini-panel">
                  <p class="notification-push-guide-mini-panel__title">
                    常见误区
                  </p>
                  <ul class="notification-push-guide-list">
                    <li v-for="item in stage.risks" :key="item">{{ item }}</li>
                  </ul>
                </section>
              </div>

              <AppCodeBlock
                class="notification-push-guide-code-block"
                :code="stage.code"
                :lang="stage.language"
              />
            </article>
          </div>
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
    title: '先分消息层级',
    summary: '站内消息、系统通知、离线推送和强提醒不是同一层能力，不能混着做。',
  },
  {
    order: '02',
    title: '授权时机要谨慎',
    summary: '用户一进站就弹 Notification 权限，只会大幅降低授权率。',
  },
  {
    order: '03',
    title: '订阅链路要稳定',
    summary: 'Service Worker、Push Subscription 与会话状态必须长期一致。',
  },
  {
    order: '04',
    title: '点击回跳要准确',
    summary: '用户点通知后要回到具体业务上下文，而不是只打开首页。',
  },
  {
    order: '05',
    title: '推送需要限流去重',
    summary: '批量事件和重复消息必须合并，否则用户会很快把权限关掉。',
  },
];

const guideStages = [
  {
    order: '01',
    title: '先分清站内信、浏览器通知、离线推送和强提醒的职责边界',
    tag: 'Message Layer',
    description:
      '消息系统最常见的问题，是把所有提示都做成同一种弹窗。其实站内消息适合沉淀可回看记录，浏览器 Notification 适合前台弱打扰提醒，离线推送适合用户不在页面时叫回，强提醒则应该只留给少数高优事件。层级不分清，最终不是提醒太弱，就是全站都在打扰用户。',
    bestFor: ['消息中心', '审批系统', '客服工作台', '协同产品'],
    focus: [
      '按紧急程度和用户在线状态划分消息通道',
      '站内消息与通知推送共享消息唯一标识',
      '把消息展示层与分发层拆开',
    ],
    risks: [
      '所有消息都弹系统通知，用户迅速疲劳',
      '只有站内信，没有离站召回能力',
      '同一条消息在多个通道重复出现且无统一状态',
    ],
    language: 'text',
    code: `Notification Channels
- inbox message
- in-app toast
- browser notification
- offline push
- urgent blocking alert`,
  },
  {
    order: '02',
    title: '权限申请不能抢前台，应该在价值点触发并解释收益',
    tag: 'Permission',
    description:
      '浏览器通知权限一旦被拒，后续很难挽回。所以不要在用户一进站就弹授权。更好的策略是在用户真正感知到价值的节点触发，比如“订阅审批结果”“关注任务完成提醒”，并配合自定义引导解释收益。权限申请本身也是产品体验的一部分。',
    bestFor: [
      '需要用户主动订阅提醒的工作流系统',
      '任务型协作产品',
      '高价值业务提醒场景',
    ],
    focus: [
      '把权限申请放在用户主动操作后',
      '在正式 requestPermission 前做软引导',
      '记录授权率与拒绝率并持续优化文案',
    ],
    risks: [
      '首次访问直接弹权限，授权率极低',
      '没做软引导，用户不知道为什么要给权限',
      '被拒后没有替代提醒通道',
    ],
    language: 'ts',
    code: `const requestNotificationPermission = async () => {
  if (!('Notification' in window)) return 'unsupported'
  if (Notification.permission === 'granted') return 'granted'

  return Notification.requestPermission()
}`,
  },
  {
    order: '03',
    title: '订阅关系要和登录态、设备标识、Service Worker 生命周期同步',
    tag: 'Subscription',
    description:
      '推送订阅真正麻烦的地方，不在于调用一次 subscribe，而在于它要和账号、设备、浏览器实例、Service Worker 注册状态长期同步。用户退出登录、切账号、权限变化、订阅失效或 Service Worker 更新时，都必须重新校准服务端订阅关系，否则你根本不知道消息该发给谁。',
    bestFor: ['多账号系统', '长期在线工作台', '需要离线推送的后台产品'],
    focus: [
      '订阅上传时绑定 userId、deviceId、subscriptionId',
      '账号切换或退出时同步撤销订阅',
      'Service Worker 更新后重校验订阅有效性',
    ],
    risks: [
      '用户切账号后仍收到上个账号的通知',
      '服务端持有过期 subscription，送达率持续下降',
      '只在首次注册时上传一次订阅，后续不再校准',
    ],
    language: 'ts',
    code: `const syncPushSubscription = async () => {
  const registration = await navigator.serviceWorker.ready
  const subscription = await registration.pushManager.getSubscription()

  await request.post('/api/push/subscription/sync', {
    subscription,
    userId: authStore.userId,
    deviceId: deviceStore.id,
  })
}`,
  },
  {
    order: '04',
    title: '点击通知后的回跳必须能落到业务上下文，而不是只打开首页',
    tag: 'Deep Link',
    description:
      '通知真正有没有价值，往往取决于用户点开后能不能马上进入具体上下文。审批提醒应直接进入该单据，评论提醒应直达对应楼层，异常告警应带着筛选条件进入排障页。通知 payload 里要明确携带路由信息、对象标识和必要参数，回跳失败会直接摧毁整条链路体验。',
    bestFor: ['审批系统', '消息互动系统', '告警平台', '多页面工作台'],
    focus: [
      '为每条通知定义统一 deep link 协议',
      '点击时优先聚焦已打开标签页，否则新开页',
      '进入页面后自动定位到对应对象或筛选态',
    ],
    risks: [
      '点通知只进首页，用户还要自己再找一次',
      '不同通知各自拼接路由，长期维护混乱',
      '通知打开新标签页但没有把原标签页聚焦策略处理好',
    ],
    language: 'ts',
    code: `self.addEventListener('notificationclick', (event) => {
  const targetUrl = event.notification.data?.url || '/'

  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then((windowClients) => {
      const matched = windowClients.find((client) => client.url.includes(targetUrl))

      return matched ? matched.focus() : clients.openWindow(targetUrl)
    }),
  )
})`,
  },
  {
    order: '05',
    title: '推送要做去重、折叠和频控，避免提醒风暴反噬授权率',
    tag: 'Throttle',
    description:
      '一旦系统里某个批量任务、同步事件或消息风暴触发几十条通知，如果没有折叠和去重，用户第一反应通常是关权限。工程上应该为通知定义唯一业务键、聚合窗口和频控策略，同一对象的连续更新合并成一次提醒，多条同类提醒按会话折叠展示。',
    bestFor: ['高频业务事件系统', '消息中心', '工单与协同平台', '监控告警面板'],
    focus: [
      '同一业务对象共享 dedupeKey',
      '对短时间内的多条消息做聚合折叠',
      '按用户维度做频控与静默时段',
    ],
    risks: [
      '每次状态变化都单独推一条，形成通知轰炸',
      '没有 dedupeKey，重试消息和真实新消息无法区分',
      '高频推送把用户权限全部打没',
    ],
    language: 'ts',
    code: `type PushEnvelope = {
  id: string
  dedupeKey: string
  title: string
  body: string
  url: string
}

const shouldDropPush = (incoming: PushEnvelope, recentKeys: Set<string>) => {
  return recentKeys.has(incoming.dedupeKey)
}`,
  },
];
</script>

<style scoped>
.notification-push-guide-page {
  min-height: calc(100vh - 40px);
  padding: 24px;
  border: 1px solid rgba(19, 27, 34, 0.08);
  border-radius: 7px;
  background:
    radial-gradient(
      circle at top right,
      rgba(224, 232, 238, 0.42),
      transparent 28%
    ),
    linear-gradient(180deg, #fcfdfe 0%, #f3f6f8 100%);
  box-shadow: 0 30px 80px rgba(18, 26, 34, 0.08);
}

.notification-push-guide-page__shell {
  min-height: calc(100vh - 90px);
  border: 1px solid rgba(19, 27, 34, 0.06);
  border-radius: 7px;
  background: rgba(255, 255, 255, 0.84);
}

.notification-push-guide-page__top {
  display: flex;
  justify-content: flex-start;
  padding: 18px 18px 0;
}

.notification-push-guide-page__back {
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

.notification-push-guide-page__back:hover {
  transform: translateY(-1px);
  border-color: rgba(46, 70, 91, 0.18);
  box-shadow: 0 18px 34px rgba(19, 27, 34, 0.08);
}

.notification-push-guide-page__content {
  padding: 18px 24px 24px;
}

.notification-push-guide-hero,
.notification-push-guide-panel,
.notification-push-guide-card {
  border: 1px solid rgba(19, 27, 34, 0.08);
  border-radius: 7px;
  background: rgba(255, 255, 255, 0.86);
}

.notification-push-guide-hero {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 320px;
  gap: 20px;
  padding: 28px;
}

.notification-push-guide-hero__eyebrow,
.notification-push-guide-section__eyebrow,
.notification-push-guide-card__eyebrow,
.notification-push-guide-hero__label {
  font-size: 11px;
  line-height: 1.4;
  letter-spacing: 0.24em;
  text-transform: uppercase;
  color: #7b8793;
}

.notification-push-guide-hero__title {
  margin-top: 10px;
  font-size: 46px;
  line-height: 1.06;
  font-weight: 600;
  letter-spacing: -0.05em;
  color: #17202a;
}

.notification-push-guide-hero__summary {
  max-width: 860px;
  margin-top: 16px;
  font-size: 15px;
  line-height: 1.9;
  color: #58636f;
}

.notification-push-guide-hero__panel {
  align-self: stretch;
  padding: 18px;
  border: 1px solid rgba(19, 27, 34, 0.08);
  border-radius: 7px;
  background: linear-gradient(180deg, #fbfcfd 0%, #f4f7fa 100%);
}

.notification-push-guide-list {
  display: grid;
  gap: 8px;
  margin: 12px 0 0;
  padding-left: 18px;
  font-size: 14px;
  line-height: 1.8;
  color: #56616d;
}

.notification-push-guide-grid,
.notification-push-guide-stack {
  display: grid;
  gap: 16px;
}

.notification-push-guide-grid {
  margin-top: 28px;
  grid-template-columns: repeat(5, minmax(0, 1fr));
}

.notification-push-guide-card {
  padding: 18px;
}

.notification-push-guide-card__title,
.notification-push-guide-panel__title,
.notification-push-guide-section__title {
  color: #17202a;
}

.notification-push-guide-card__title {
  margin-top: 10px;
  font-size: 22px;
  line-height: 1.25;
  font-weight: 600;
}

.notification-push-guide-card__text,
.notification-push-guide-panel__text {
  margin-top: 12px;
  font-size: 14px;
  line-height: 1.9;
  color: #596571;
}

.notification-push-guide-section {
  margin-top: 28px;
}

.notification-push-guide-section__head {
  margin-bottom: 14px;
}

.notification-push-guide-section__title {
  margin-top: 8px;
  font-size: 30px;
  line-height: 1.18;
  font-weight: 600;
  letter-spacing: -0.03em;
}

.notification-push-guide-stack {
  grid-template-columns: repeat(2, minmax(0, 1fr));
}

.notification-push-guide-panel {
  padding: 18px;
}

.notification-push-guide-panel.is-wide {
  grid-column: 1 / -1;
}

.notification-push-guide-panel__eyebrow {
  font-size: 11px;
  line-height: 1.4;
  letter-spacing: 0.24em;
  text-transform: uppercase;
  color: #80909d;
}

.notification-push-guide-panel__title {
  font-size: 20px;
  line-height: 1.3;
  font-weight: 600;
}

.notification-push-guide-method__head {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 16px;
}

.notification-push-guide-method__tag {
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

.notification-push-guide-method__grid {
  display: grid;
  gap: 14px;
  margin-top: 16px;
  grid-template-columns: repeat(3, minmax(0, 1fr));
}

.notification-push-guide-mini-panel {
  padding: 14px;
  border: 1px solid rgba(19, 27, 34, 0.08);
  border-radius: 7px;
  background: rgba(245, 248, 250, 0.9);
}

.notification-push-guide-mini-panel__title {
  font-size: 14px;
  font-weight: 600;
  color: #17202a;
}

.notification-push-guide-code-block {
  margin-top: 14px;
}

@media (max-width: 1080px) {
  .notification-push-guide-hero,
  .notification-push-guide-grid,
  .notification-push-guide-stack,
  .notification-push-guide-method__grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 900px) {
  .notification-push-guide-page {
    min-height: auto;
    padding: 18px;
  }

  .notification-push-guide-page__shell {
    min-height: auto;
  }

  .notification-push-guide-page__content {
    padding: 18px;
  }

  .notification-push-guide-hero__title {
    font-size: 36px;
  }

  .notification-push-guide-section__title {
    font-size: 26px;
  }
}
</style>
