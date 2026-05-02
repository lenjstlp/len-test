<template>
  <section class="multi-tab-sync-page">
    <div class="multi-tab-sync-page__shell">
      <div class="multi-tab-sync-page__top">
        <RouterLink
          to="/fullstack-guide"
          class="multi-tab-sync-page__back"
          aria-label="返回全栈能力菜单"
          title="返回全栈能力菜单"
        >
          <el-icon :size="18"><ArrowLeft /></el-icon>
        </RouterLink>
      </div>

      <div class="multi-tab-sync-page__content">
        <header class="multi-tab-sync-hero">
          <div>
            <p class="multi-tab-sync-hero__eyebrow">
              Frontend Multi Tab Sync Engineering
            </p>
            <h1 class="multi-tab-sync-hero__title">前端多标签页同步工程</h1>
            <p class="multi-tab-sync-hero__summary">
              真实后台和中后台系统里，用户经常会同时打开多个标签页。如果一个标签页退出登录、切换租户、更新草稿、修改筛选条件，其他标签页还停留在旧状态，问题就会立刻出现。多标签页同步本质上是在解决“同一浏览器上下文下的状态一致性”，它属于很实用的前端工程能力。
            </p>
          </div>

          <div class="multi-tab-sync-hero__panel">
            <p class="multi-tab-sync-hero__label">学完结果</p>
            <ul class="multi-tab-sync-list">
              <li>能区分哪些状态必须跨标签同步，哪些状态只留在当前页。</li>
              <li>
                能用 `storage`、`BroadcastChannel` 和服务端回写方案做同步。
              </li>
              <li>能处理登录态、租户、草稿和消息中心的同步一致性问题。</li>
            </ul>
          </div>
        </header>

        <section class="multi-tab-sync-grid">
          <article
            v-for="item in quickStages"
            :key="item.order"
            class="multi-tab-sync-card"
          >
            <p class="multi-tab-sync-card__eyebrow">Stage {{ item.order }}</p>
            <h2 class="multi-tab-sync-card__title">{{ item.title }}</h2>
            <p class="multi-tab-sync-card__text">{{ item.summary }}</p>
          </article>
        </section>

        <section class="multi-tab-sync-section">
          <div class="multi-tab-sync-section__head">
            <div>
              <p class="multi-tab-sync-section__eyebrow">Scenario Split</p>
              <h2 class="multi-tab-sync-section__title">
                先区分同步对象，再决定同步通道
              </h2>
            </div>
          </div>

          <div class="multi-tab-sync-stack">
            <article
              v-for="stage in syncStages"
              :key="stage.order"
              class="multi-tab-sync-panel is-wide"
            >
              <div class="multi-tab-sync-method__head">
                <div>
                  <p class="multi-tab-sync-panel__eyebrow">
                    Stage {{ stage.order }}
                  </p>
                  <h3 class="multi-tab-sync-panel__title">{{ stage.title }}</h3>
                </div>
                <span class="multi-tab-sync-method__tag">{{ stage.tag }}</span>
              </div>

              <p class="multi-tab-sync-panel__text">{{ stage.description }}</p>

              <div class="multi-tab-sync-method__grid">
                <section class="multi-tab-sync-mini-panel">
                  <p class="multi-tab-sync-mini-panel__title">适用场景</p>
                  <ul class="multi-tab-sync-list">
                    <li v-for="item in stage.bestFor" :key="item">
                      {{ item }}
                    </li>
                  </ul>
                </section>

                <section class="multi-tab-sync-mini-panel">
                  <p class="multi-tab-sync-mini-panel__title">实现重点</p>
                  <ul class="multi-tab-sync-list">
                    <li v-for="item in stage.focus" :key="item">
                      {{ item }}
                    </li>
                  </ul>
                </section>

                <section class="multi-tab-sync-mini-panel">
                  <p class="multi-tab-sync-mini-panel__title">常见误区</p>
                  <ul class="multi-tab-sync-list">
                    <li v-for="item in stage.risks" :key="item">
                      {{ item }}
                    </li>
                  </ul>
                </section>
              </div>

              <AppCodeBlock
                class="multi-tab-sync-code-block"
                :code="stage.code"
                :lang="stage.language"
              />
            </article>
          </div>
        </section>

        <section class="multi-tab-sync-section">
          <div class="multi-tab-sync-section__head">
            <div>
              <p class="multi-tab-sync-section__eyebrow">Comparison</p>
              <h2 class="multi-tab-sync-section__title">
                常见同步方案的利弊对比
              </h2>
            </div>
          </div>

          <div class="multi-tab-sync-columns">
            <article
              v-for="item in comparisonCards"
              :key="item.title"
              class="multi-tab-sync-panel"
            >
              <h3 class="multi-tab-sync-panel__title">{{ item.title }}</h3>
              <p class="multi-tab-sync-panel__text">{{ item.summary }}</p>
            </article>
          </div>
        </section>

        <section class="multi-tab-sync-section">
          <div class="multi-tab-sync-section__head">
            <div>
              <p class="multi-tab-sync-section__eyebrow">Checklist</p>
              <h2 class="multi-tab-sync-section__title">
                多标签页同步上线前的 5 个检查点
              </h2>
            </div>
          </div>

          <article class="multi-tab-sync-panel is-wide">
            <ul class="multi-tab-sync-list">
              <li>是否明确了哪些状态需要跨标签同步，哪些只属于本页。</li>
              <li>
                同步消息是否带上来源 tab 标识，避免自己发自己收导致死循环。
              </li>
              <li>
                退出登录、切租户、权限刷新时，是否能让所有标签页一起失效。
              </li>
              <li>
                草稿、未保存表单这类状态，是否做了冲突提示而不是强行覆盖。
              </li>
              <li>
                浏览器不支持 `BroadcastChannel` 时，是否有 `storage` 兜底方案。
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
    title: '先分状态类型',
    summary: '登录态、租户、消息未读数适合共享，临时输入框内容未必适合同步。',
  },
  {
    order: '02',
    title: '再选同步通道',
    summary: '同域标签页优先考虑 BroadcastChannel，不支持时再用 storage 兜底。',
  },
  {
    order: '03',
    title: '消息结构要稳定',
    summary: '同步消息至少要有 type、payload、sourceTabId 和时间戳。',
  },
  {
    order: '04',
    title: '避免循环触发',
    summary: '自己发出的消息自己不再处理，否则很容易形成回声和重复刷新。',
  },
  {
    order: '05',
    title: '冲突策略要提前定',
    summary: '草稿和编辑态经常冲突，要定义覆盖、提示还是合并策略。',
  },
];

const syncStages = [
  {
    order: '01',
    title: '先明确同步边界，不是什么都要跨标签联动',
    tag: '边界定义',
    description:
      '多标签页同步最容易犯的错，就是把所有状态都拿去同步。真正应该同步的通常是登录态、租户、主题、未读数、全局草稿、消息提醒；而分页位置、展开折叠、当前 hover 之类的局部 UI 状态，通常只保留在当前页。',
    bestFor: ['登录态共享', '租户切换', '消息中心', '全局配置同步'],
    focus: [
      '先按全局状态和局部状态分层',
      '同步对象要尽量小而稳定',
      '避免把易抖动状态纳入同步通道',
    ],
    risks: [
      '把鼠标态和表格滚动位置也同步',
      '全局和局部状态混在同一消息流里',
      '没有边界，后面越做越乱',
    ],
    language: 'ts',
    code: `type SyncMessage<T = unknown> = {
  type: string
  payload: T
  sourceTabId: string
  timestamp: number
}

const shouldSyncState = (type: string) => {
  return ['auth/logout', 'tenant/change', 'message/read', 'draft/update'].includes(type)
}`,
  },
  {
    order: '02',
    title: 'BroadcastChannel 是同域多标签同步的优先方案',
    tag: '主通道',
    description:
      '如果浏览器支持 BroadcastChannel，它是最自然的多标签页通信方案。发送和接收都是内存级通道，不需要频繁写 localStorage，也不会引入额外解析负担。它很适合同步退出登录、租户切换、刷新令牌和全局通知。',
    bestFor: ['同域后台系统', '即时状态广播', '登录态变更', '消息刷新'],
    focus: [
      '通道名要稳定，例如 app-shell',
      '消息要有来源 tab 标识',
      '卸载页面时要及时关闭通道',
    ],
    risks: [
      '不带来源 tabId 导致重复处理',
      '多个业务混用一个无规范通道',
      '页面销毁后忘记关闭 channel',
    ],
    language: 'ts',
    code: `const tabId = crypto.randomUUID()
const channel = new BroadcastChannel('app-shell')

const postSyncMessage = <T>(type: string, payload: T) => {
  channel.postMessage({
    type,
    payload,
    sourceTabId: tabId,
    timestamp: Date.now(),
  })
}

channel.onmessage = (event) => {
  const message = event.data
  if (message.sourceTabId === tabId) {
    return
  }

  handleSyncMessage(message)
}`,
  },
  {
    order: '03',
    title: 'storage 事件适合做兼容兜底，但不要滥用',
    tag: '兼容兜底',
    description:
      '有些旧环境不支持 BroadcastChannel，这时可以用 localStorage 写入一个瞬时消息，再依赖 storage 事件广播给其他标签页。它能用，但不是最优解，因为会引入序列化、持久化痕迹和额外清理成本。',
    bestFor: ['旧浏览器环境', '轻量同步兜底', '低频全局事件'],
    focus: [
      '消息写入后可立即移除，避免残留',
      '消息结构要固定，方便统一解析',
      '仅用于低频事件，避免高频广播',
    ],
    risks: [
      '把高频输入也通过 storage 广播',
      '消息残留在 localStorage 中',
      '没有消息版本导致解析出错',
    ],
    language: 'ts',
    code: `const SYNC_KEY = 'app:sync:event'

const emitStorageSync = (message: Record<string, unknown>) => {
  localStorage.setItem(SYNC_KEY, JSON.stringify(message))
  localStorage.removeItem(SYNC_KEY)
}

window.addEventListener('storage', (event) => {
  if (event.key !== SYNC_KEY || !event.newValue) {
    return
  }

  const message = JSON.parse(event.newValue)
  handleSyncMessage(message)
})`,
  },
  {
    order: '04',
    title: '草稿和编辑态不能只同步，还要处理冲突',
    tag: '冲突处理',
    description:
      '多标签页里最棘手的不是广播本身，而是两个标签页同时修改同一份草稿。你必须定义冲突策略，比如后写覆盖、弹窗提示、按更新时间比对，或者只同步“已保存版本”，不强同步“编辑中版本”。',
    bestFor: ['富文本草稿', '表单暂存', '文档编辑', '配置项修改'],
    focus: [
      '区分未保存草稿和已提交版本',
      '同步时带上更新时间和作者标识',
      '冲突时优先提示，而不是直接覆盖',
    ],
    risks: [
      '收到更新后直接覆盖用户正在输入的数据',
      '没有版本信息，谁新谁旧分不清',
      '只做同步，不做冲突提示',
    ],
    language: 'ts',
    code: `const shouldApplyRemoteDraft = (localUpdatedAt: number, remoteUpdatedAt: number) => {
  return remoteUpdatedAt > localUpdatedAt
}

const handleDraftSync = (remoteDraft: {
  content: string
  updatedAt: number
  editor: string
}) => {
  if (!shouldApplyRemoteDraft(currentDraft.updatedAt, remoteDraft.updatedAt)) {
    openDraftConflictTip(remoteDraft)
    return
  }

  applyRemoteDraft(remoteDraft)
}`,
  },
  {
    order: '05',
    title: '退出登录和切租户要做全标签页硬同步',
    tag: '强一致事件',
    description:
      '退出登录、token 失效、租户切换这类动作不能做成“有些页面刷新，有些页面不刷新”。这类事件需要最高优先级，要求所有标签页立刻收敛到一致状态，否则旧标签页继续带旧 token 发请求，系统就会变得很脏。',
    bestFor: ['SSO 退出', 'token 失效', '租户切换', '角色权限刷新'],
    focus: [
      '收到消息后立即清空鉴权和缓存',
      '所有标签页统一跳转登录页或首页',
      '与请求拦截器和缓存层联动清理',
    ],
    risks: [
      '只清当前页，其他页继续使用旧 token',
      '切租户只改 header，没清旧缓存',
      '同步顺序混乱导致先请求后清理',
    ],
    language: 'ts',
    code: `const handleSyncMessage = (message: SyncMessage) => {
  switch (message.type) {
    case 'auth/logout':
      clearAuthState()
      clearPageCache()
      router.replace('/login')
      break
    case 'tenant/change':
      switchTenant(message.payload as string)
      clearPageCache()
      reloadCurrentView()
      break
  }
}`,
  },
];

const comparisonCards = [
  {
    title: 'BroadcastChannel',
    summary:
      '最适合同域标签页即时通信，API 清晰、延迟低、代码整洁。缺点是需要浏览器支持，老环境要补兜底。',
  },
  {
    title: 'storage 事件',
    summary:
      '兼容性更普遍，适合低频同步和兜底场景。缺点是依赖持久化媒介，序列化和残留清理都要考虑。',
  },
  {
    title: '服务端回写',
    summary:
      '适合同账号跨设备或更强一致性需求，比如文档协同和全局通知。缺点是链路更长，开发成本更高。',
  },
];
</script>

<style scoped>
.multi-tab-sync-page {
  min-height: 100%;
  padding: 32px;
}

.multi-tab-sync-page__shell {
  max-width: 1240px;
  margin: 0 auto;
}

.multi-tab-sync-page__top {
  display: flex;
  justify-content: flex-start;
  margin-bottom: 18px;
}

.multi-tab-sync-page__back {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 42px;
  height: 42px;
  border: 1px solid rgba(19, 27, 34, 0.08);
  border-radius: 999px;
  color: #17202a;
  background: rgba(255, 255, 255, 0.92);
  text-decoration: none;
  box-shadow: 0 16px 36px rgba(19, 27, 34, 0.08);
  transition:
    transform 160ms ease,
    border-color 160ms ease,
    box-shadow 160ms ease;
}

.multi-tab-sync-page__back:hover {
  transform: translateY(-1px);
  border-color: rgba(67, 94, 118, 0.18);
  box-shadow: 0 18px 42px rgba(19, 27, 34, 0.1);
}

.multi-tab-sync-page__content {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.multi-tab-sync-hero,
.multi-tab-sync-panel,
.multi-tab-sync-card {
  border: 1px solid rgba(19, 27, 34, 0.08);
  border-radius: 7px;
  background: rgba(255, 255, 255, 0.96);
  box-shadow: 0 24px 54px rgba(19, 27, 34, 0.06);
}

.multi-tab-sync-hero {
  display: grid;
  grid-template-columns: minmax(0, 1.4fr) minmax(320px, 0.8fr);
  gap: 18px;
  padding: 28px;
}

.multi-tab-sync-hero__eyebrow,
.multi-tab-sync-section__eyebrow,
.multi-tab-sync-card__eyebrow,
.multi-tab-sync-panel__eyebrow {
  font-size: 11px;
  line-height: 1.4;
  letter-spacing: 0.24em;
  text-transform: uppercase;
  color: #7e8894;
}

.multi-tab-sync-hero__title {
  margin-top: 10px;
  font-size: 42px;
  line-height: 1.06;
  font-weight: 600;
  letter-spacing: -0.04em;
  color: #17202a;
}

.multi-tab-sync-hero__summary,
.multi-tab-sync-panel__text,
.multi-tab-sync-card__text {
  font-size: 15px;
  line-height: 1.9;
  color: #55606c;
}

.multi-tab-sync-hero__summary {
  margin-top: 16px;
  max-width: 760px;
}

.multi-tab-sync-hero__panel,
.multi-tab-sync-mini-panel {
  padding: 20px;
  border: 1px solid rgba(19, 27, 34, 0.08);
  border-radius: 7px;
  background: linear-gradient(180deg, #ffffff 0%, #f5f8fb 100%);
}

.multi-tab-sync-hero__label,
.multi-tab-sync-mini-panel__title {
  font-size: 13px;
  line-height: 1.5;
  font-weight: 600;
  color: #17202a;
}

.multi-tab-sync-list {
  margin: 12px 0 0;
  padding-left: 18px;
  display: grid;
  gap: 8px;
  color: #55606c;
  font-size: 14px;
  line-height: 1.75;
}

.multi-tab-sync-grid,
.multi-tab-sync-columns {
  display: grid;
  gap: 16px;
}

.multi-tab-sync-grid {
  grid-template-columns: repeat(5, minmax(0, 1fr));
}

.multi-tab-sync-card {
  padding: 20px;
}

.multi-tab-sync-card__title,
.multi-tab-sync-panel__title,
.multi-tab-sync-section__title {
  color: #17202a;
}

.multi-tab-sync-card__title {
  margin-top: 8px;
  font-size: 19px;
  line-height: 1.35;
  font-weight: 600;
}

.multi-tab-sync-card__text {
  margin-top: 10px;
}

.multi-tab-sync-section {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.multi-tab-sync-section__head {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
}

.multi-tab-sync-section__title {
  margin-top: 8px;
  font-size: 28px;
  line-height: 1.2;
  font-weight: 600;
  letter-spacing: -0.03em;
}

.multi-tab-sync-stack {
  display: grid;
  gap: 16px;
}

.multi-tab-sync-panel {
  padding: 24px;
}

.multi-tab-sync-panel.is-wide {
  padding: 26px;
}

.multi-tab-sync-method__head {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 12px;
}

.multi-tab-sync-method__tag {
  display: inline-flex;
  align-items: center;
  min-height: 30px;
  padding: 0 12px;
  border-radius: 999px;
  background: rgba(90, 106, 121, 0.1);
  color: #465261;
  font-size: 12px;
  line-height: 1;
}

.multi-tab-sync-panel__title {
  margin-top: 8px;
  font-size: 24px;
  line-height: 1.28;
  font-weight: 600;
}

.multi-tab-sync-panel__text {
  margin-top: 14px;
}

.multi-tab-sync-method__grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 14px;
  margin-top: 18px;
}

.multi-tab-sync-code-block {
  margin-top: 18px;
}

.multi-tab-sync-columns {
  grid-template-columns: repeat(3, minmax(0, 1fr));
}

@media (max-width: 1100px) {
  .multi-tab-sync-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .multi-tab-sync-columns,
  .multi-tab-sync-method__grid,
  .multi-tab-sync-hero {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 720px) {
  .multi-tab-sync-page {
    padding: 18px;
  }

  .multi-tab-sync-grid {
    grid-template-columns: 1fr;
  }

  .multi-tab-sync-hero,
  .multi-tab-sync-card,
  .multi-tab-sync-panel {
    padding: 18px;
  }

  .multi-tab-sync-hero__title {
    font-size: 32px;
  }

  .multi-tab-sync-section__title {
    font-size: 22px;
  }
}
</style>
