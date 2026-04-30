<template>
  <section class="message-center-guide-page">
    <div class="message-center-guide-page__shell">
      <div class="message-center-guide-page__top">
        <RouterLink
          to="/fullstack-guide"
          class="message-center-guide-page__back"
          aria-label="返回全栈能力菜单"
          title="返回全栈能力菜单"
        >
          <el-icon :size="18"><ArrowLeft /></el-icon>
        </RouterLink>
      </div>

      <div class="message-center-guide-page__content">
        <header class="message-center-guide-hero">
          <div>
            <p class="message-center-guide-hero__eyebrow">
              Frontend Message Center Engineering
            </p>
            <h1 class="message-center-guide-hero__title">
              前端消息中心工程能力
            </h1>
            <p class="message-center-guide-hero__summary">
              消息中心不是把通知列表渲染出来就结束，而是要把站内信、系统通知、业务提醒、审批催办、活动触达和已读未读状态统一治理。真正难的不是弹窗，而是怎样让消息在多端同步、按优先级送达、支持撤回去重，并且不让页面性能和状态管理失控。
            </p>
          </div>

          <div class="message-center-guide-hero__panel">
            <p class="message-center-guide-hero__label">学完结果</p>
            <ul class="message-center-guide-list">
              <li>能设计消息分类、优先级、已读状态、撤回机制和触达链路。</li>
              <li>能实现消息中心列表、红点、角标、弹层和多端同步方案。</li>
              <li>能判断轮询、SSE、WebSocket 在消息场景下的边界和成本。</li>
            </ul>
          </div>
        </header>

        <section class="message-center-guide-grid">
          <article
            v-for="item in quickStages"
            :key="item.order"
            class="message-center-guide-card"
          >
            <p class="message-center-guide-card__eyebrow">
              Stage {{ item.order }}
            </p>
            <h2 class="message-center-guide-card__title">{{ item.title }}</h2>
            <p class="message-center-guide-card__text">{{ item.summary }}</p>
          </article>
        </section>

        <section class="message-center-guide-section">
          <div class="message-center-guide-section__head">
            <div>
              <p class="message-center-guide-section__eyebrow">Build Order</p>
              <h2 class="message-center-guide-section__title">
                先梳理消息模型，再做触达链路、状态同步和交互治理
              </h2>
            </div>
          </div>

          <div class="message-center-guide-stack">
            <article
              v-for="stage in guideStages"
              :key="stage.order"
              class="message-center-guide-panel is-wide"
            >
              <div class="message-center-guide-method__head">
                <div>
                  <p class="message-center-guide-panel__eyebrow">
                    Stage {{ stage.order }}
                  </p>
                  <h3 class="message-center-guide-panel__title">
                    {{ stage.title }}
                  </h3>
                </div>
                <span class="message-center-guide-method__tag">{{
                  stage.tag
                }}</span>
              </div>

              <p class="message-center-guide-panel__text">
                {{ stage.description }}
              </p>

              <div class="message-center-guide-method__grid">
                <section class="message-center-guide-mini-panel">
                  <p class="message-center-guide-mini-panel__title">适用场景</p>
                  <ul class="message-center-guide-list">
                    <li v-for="item in stage.bestFor" :key="item">
                      {{ item }}
                    </li>
                  </ul>
                </section>

                <section class="message-center-guide-mini-panel">
                  <p class="message-center-guide-mini-panel__title">实现重点</p>
                  <ul class="message-center-guide-list">
                    <li v-for="item in stage.focus" :key="item">
                      {{ item }}
                    </li>
                  </ul>
                </section>

                <section class="message-center-guide-mini-panel">
                  <p class="message-center-guide-mini-panel__title">常见误区</p>
                  <ul class="message-center-guide-list">
                    <li v-for="item in stage.risks" :key="item">
                      {{ item }}
                    </li>
                  </ul>
                </section>
              </div>

              <AppCodeBlock
                class="message-center-guide-code-block"
                :code="stage.code"
                :lang="stage.language"
              />
            </article>
          </div>
        </section>

        <section class="message-center-guide-section">
          <div class="message-center-guide-section__head">
            <div>
              <p class="message-center-guide-section__eyebrow">Comparison</p>
              <h2 class="message-center-guide-section__title">
                消息中心里最容易被混淆的几组设计问题
              </h2>
            </div>
          </div>

          <div class="message-center-guide-columns">
            <article
              v-for="item in comparisonCards"
              :key="item.title"
              class="message-center-guide-panel"
            >
              <h3 class="message-center-guide-panel__title">
                {{ item.title }}
              </h3>
              <p class="message-center-guide-panel__text">{{ item.summary }}</p>
            </article>
          </div>
        </section>

        <section class="message-center-guide-section">
          <div class="message-center-guide-section__head">
            <div>
              <p class="message-center-guide-section__eyebrow">Checklist</p>
              <h2 class="message-center-guide-section__title">
                一套可落地的前端消息中心工程建设清单
              </h2>
            </div>
          </div>

          <article class="message-center-guide-panel is-wide">
            <ul class="message-center-guide-list">
              <li>先统一消息模型，再落地列表、详情、红点、弹层和快捷动作。</li>
              <li>
                已读未读、撤回删除、去重合并都要明确状态机，不能临时打补丁。
              </li>
              <li>实时链路要和兜底拉取配套，不能只押宝单一 WebSocket 通道。</li>
              <li>消息展示要按优先级、场景和打扰级别分层，避免全站乱弹窗。</li>
              <li>分页缓存、未读统计、跨页同步和多端一致性必须一起设计。</li>
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
    title: '先定义消息模型',
    summary:
      '先把消息类型、来源、优先级、跳转行为和已读状态定清楚，后面的列表和红点才不会越做越乱。',
  },
  {
    order: '02',
    title: '送达链路不能单一',
    summary:
      '轮询、SSE、WebSocket 和手动刷新各有边界，消息中心必须有主链路和兜底链路。',
  },
  {
    order: '03',
    title: '未读统计要全局一致',
    summary:
      '角标、列表、详情页和顶部通知需要共用同一份状态，不然用户会频繁看到数字对不上。',
  },
  {
    order: '04',
    title: '消息展示要分层',
    summary:
      '系统公告、审批催办、风险告警和营销消息的打扰级别不同，不能全部用同一种弹窗策略。',
  },
  {
    order: '05',
    title: '多端同步才算完成',
    summary:
      '用户在 Web 已读的消息，要能同步影响移动端和其它标签页，不然消息中心只是假完整。',
  },
];

const guideStages = [
  {
    order: '01',
    title: '建立统一消息资源模型',
    tag: 'Schema First',
    description:
      '消息中心第一步不是写页面，而是给消息建模。至少要定义消息 id、业务类型、优先级、渠道、已读状态、动作按钮、跳转目标、过期时间和幂等键。模型定不清，后面消息合并、去重、撤回、统计都会失控。',
    bestFor: [
      '站内信、审批通知、系统公告共存的后台系统',
      '需要把业务提醒和营销触达统一收口的产品',
      '消息列表、角标、弹层由多个前端模块共同消费的场景',
    ],
    focus: [
      '区分 messageType、priority、status、actionType 等核心字段',
      '约定 unreadCount、lastReadAt、version 等同步字段',
      '消息中心展示模型和后端原始事件模型分层处理',
    ],
    risks: [
      '直接把后端返回结构绑定到页面，后续一改字段全站受影响',
      '没有幂等键，重复推送会造成列表重复和红点失真',
      '未定义过期机制，旧消息长期堆积导致体验和性能同时恶化',
    ],
    language: 'ts',
    code: `type MessagePriority = 'low' | 'normal' | 'high' | 'critical';

type MessageStatus = 'unread' | 'read' | 'archived' | 'recalled';

interface MessageAction {
  type: 'route' | 'external' | 'api';
  label: string;
  target: string;
}

interface MessageItem {
  id: string;
  bizType: string;
  priority: MessagePriority;
  status: MessageStatus;
  title: string;
  summary: string;
  createdAt: string;
  expireAt?: string;
  dedupeKey: string;
  actions: MessageAction[];
}

const normalizeMessage = (payload: Record<string, unknown>): MessageItem => ({
  id: String(payload.id),
  bizType: String(payload.bizType ?? 'system'),
  priority: (payload.priority as MessagePriority) ?? 'normal',
  status: (payload.status as MessageStatus) ?? 'unread',
  title: String(payload.title ?? ''),
  summary: String(payload.summary ?? ''),
  createdAt: String(payload.createdAt ?? ''),
  expireAt: payload.expireAt ? String(payload.expireAt) : undefined,
  dedupeKey: String(payload.dedupeKey ?? payload.id),
  actions: Array.isArray(payload.actions)
    ? (payload.actions as MessageAction[])
    : [],
});`,
  },
  {
    order: '02',
    title: '设计送达链路与兜底刷新',
    tag: 'Realtime Flow',
    description:
      '真正稳的消息中心不会只依赖一种实时技术。常见做法是 WebSocket 负责主通道，页面激活、网络恢复和固定时间片轮询做兜底，确保丢包、断线和重连期间不会漏消息。消息业务的重点不是“实时”两个字，而是最终一致。',
    bestFor: [
      '审批流、IM 以外的系统提醒类场景',
      '中后台系统需要秒级更新但可以接受短暂延迟',
      '多个标签页同时在线，需要共享状态的工作台',
    ],
    focus: [
      '连接状态机要区分 connecting、open、reconnecting、closed',
      '收到推送后先写缓存再更新角标和列表',
      '浏览器恢复焦点时主动拉取增量，避免漏消息',
    ],
    risks: [
      '只连 WebSocket 不做补拉，断线期间的消息会永久丢失',
      '每个页面各自建连接，既浪费资源又让消息重复消费',
      '收到推送直接全量刷新列表，页面会频繁闪动且请求放大',
    ],
    language: 'ts',
    code: `const useMessageChannel = () => {
  let socket: WebSocket | null = null;
  let reconnectTimer: number | null = null;

  const connect = () => {
    socket = new WebSocket('wss://example.com/message-center');

    socket.addEventListener('message', (event) => {
      const payload = JSON.parse(event.data) as MessageItem[];
      messageStore.merge(payload);
    });

    socket.addEventListener('close', () => {
      reconnectTimer = window.setTimeout(connect, 3000);
    });
  };

  const syncOnVisible = async () => {
    if (document.visibilityState === 'visible') {
      await messageStore.fetchIncremental();
    }
  };

  document.addEventListener('visibilitychange', syncOnVisible);
  window.addEventListener('online', syncOnVisible);

  connect();

  return () => {
    socket?.close();
    if (reconnectTimer !== null) {
      window.clearTimeout(reconnectTimer);
    }
  };
};`,
  },
  {
    order: '03',
    title: '统一未读统计和多区域消费',
    tag: 'Single Source',
    description:
      '消息中心最常见的体验 bug 是数字打架。顶部角标说 12 条，列表里却只有 9 条。解决方式不是到处修补，而是把未读统计和消息实体放进统一 store，由列表、详情、下拉面板和页面气泡共同消费。',
    bestFor: [
      '有顶部角标、侧边通知面板、独立消息页三套入口的产品',
      '消息读状态会跨组件联动的复杂工作台',
      '需要跨标签页同步已读状态的后台系统',
    ],
    focus: [
      '读消息、批量已读、删除消息都要更新同一份 store',
      '通过 BroadcastChannel 或 storage 事件同步多标签页',
      '分页数据和总未读数分开维护，避免翻页覆盖统计结果',
    ],
    risks: [
      '列表组件自己缓存一份状态，顶部角标自己再算一份状态',
      '已读接口成功后不更新本地 store，用户必须刷新才能看到结果',
      '批量操作没做乐观更新，交互显得卡顿又不可信',
    ],
    language: 'ts',
    code: `import { defineStore } from 'pinia';

export const useMessageStore = defineStore('message-center', {
  state: () => ({
    items: [] as MessageItem[],
    unreadCount: 0,
  }),
  actions: {
    merge(incoming: MessageItem[]) {
      const map = new Map(this.items.map((item) => [item.dedupeKey, item]));

      incoming.forEach((item) => {
        map.set(item.dedupeKey, item);
      });

      this.items = Array.from(map.values()).sort((a, b) => {
        return Number(new Date(b.createdAt)) - Number(new Date(a.createdAt));
      });
      this.unreadCount = this.items.filter((item) => item.status === 'unread').length;
      channel.postMessage({ type: 'message-sync' });
    },
    markAsRead(id: string) {
      const target = this.items.find((item) => item.id === id);
      if (!target || target.status !== 'unread') return;
      target.status = 'read';
      this.unreadCount -= 1;
    },
  },
});`,
  },
  {
    order: '04',
    title: '处理展示优先级与打扰控制',
    tag: 'UX Governance',
    description:
      '所有消息都抢占用户注意力，消息中心一定会变成噪音中心。合理做法是把消息分成强提醒、弱提醒和沉默入箱三层。真正要弹窗的是风险告警和强业务催办，普通公告更适合角标和列表聚合。',
    bestFor: [
      '业务消息来源多、用户容易被打扰的工作台',
      '既有实时通知又有沉淀型消息的管理平台',
      '需要支持免打扰、静默时段和角色级订阅的产品',
    ],
    focus: [
      '建立 priority 到 UI channel 的映射规则',
      '支持用户级别的静默偏好和业务级白名单',
      '高优消息要有去重节流，避免短时连续弹出',
    ],
    risks: [
      '所有通知都 toast，一周后用户只会机械关闭',
      '没有同类消息聚合策略，批量审批会把界面刷爆',
      '不区分前台和后台场景，页面切换时体验非常突兀',
    ],
    language: 'ts',
    code: `const deliveryStrategy: Record<MessagePriority, 'modal' | 'toast' | 'inbox'> = {
  critical: 'modal',
  high: 'toast',
  normal: 'inbox',
  low: 'inbox',
};

const dispatchMessage = (message: MessageItem) => {
  const channel = deliveryStrategy[message.priority];

  if (channel === 'modal') {
    openRiskDialog(message);
    return;
  }

  if (channel === 'toast') {
    enqueueToast(message, { dedupeKey: message.dedupeKey });
    return;
  }

  messageStore.merge([message]);
};`,
  },
  {
    order: '05',
    title: '治理性能、缓存和一致性',
    tag: 'Operation Ready',
    description:
      '消息中心上线后很容易因为列表过长、轮询过密、未读统计频繁重算而拖慢整个工作台。工程化收尾要关注缓存分页、增量拉取、过期清理、消息归档和多端一致性，不然功能表面完整，运行质量却很差。',
    bestFor: [
      '消息量大、保留周期长的企业后台',
      '一个账号同时在多个浏览器标签页和多个设备登录的场景',
      '需要保留操作审计和消息生命周期的业务系统',
    ],
    focus: [
      '列表分页与增量游标并存，避免每次全量拉取',
      '按时间窗口归档历史消息，减少首屏消息量',
      '把已读、撤回、删除状态变化设计成可回放事件',
    ],
    risks: [
      '未读数每次都遍历全量数组，消息一多就卡顿',
      '缓存永不失效，旧数据长期占据内存',
      '不同端对撤回消息处理不一致，造成已删除消息复活',
    ],
    language: 'ts',
    code: `interface MessageCursor {
  nextCursor?: string;
  updatedAt: string;
}

const fetchIncrementalMessages = async (cursor?: MessageCursor) => {
  const response = await request.get<{
    list: MessageItem[];
    cursor: MessageCursor;
  }>('/api/message-center/incremental', {
    params: cursor ? { cursor: cursor.nextCursor } : undefined,
  });

  messageStore.merge(response.list);
  localStorage.setItem('message-center-cursor', JSON.stringify(response.cursor));
};`,
  },
];

const comparisonCards = [
  {
    title: '消息中心 vs 即时通讯',
    summary:
      '消息中心偏系统触达和任务提醒，强调状态管理、已读未读和业务跳转；即时通讯更强调会话、发送者关系和高频双向交互，两者不能简单共用同一套心智。',
  },
  {
    title: '实时推送 vs 定时拉取',
    summary:
      '实时推送负责时效性，定时拉取负责补偿和最终一致。只做推送容易漏消息，只做轮询又会造成延迟和无效请求。',
  },
  {
    title: '红点提醒 vs 弹窗打断',
    summary:
      '红点适合弱提醒和待处理沉淀，弹窗适合高优先级风险通知。把所有消息都做成弹窗，只会把真正重要的信息淹没。',
  },
];
</script>

<style scoped>
.message-center-guide-page {
  min-height: calc(100vh - 40px);
}

.message-center-guide-page__shell {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.message-center-guide-page__top {
  display: flex;
  align-items: center;
}

.message-center-guide-page__back {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 42px;
  height: 42px;
  border: 1px solid rgba(17, 24, 39, 0.08);
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.92);
  color: #1f2a36;
  text-decoration: none;
  transition:
    transform 160ms ease,
    border-color 160ms ease,
    box-shadow 160ms ease;
}

.message-center-guide-page__back:hover {
  transform: translateY(-1px);
  border-color: rgba(43, 72, 101, 0.2);
  box-shadow: 0 18px 36px rgba(17, 24, 39, 0.08);
}

.message-center-guide-page__content {
  display: flex;
  flex-direction: column;
  gap: 22px;
}

.message-center-guide-hero,
.message-center-guide-panel,
.message-center-guide-card {
  border: 1px solid rgba(19, 27, 34, 0.08);
  border-radius: 7px;
  background: #fff;
  box-shadow: 0 24px 60px rgba(15, 23, 42, 0.05);
}

.message-center-guide-hero {
  display: grid;
  grid-template-columns: minmax(0, 1.6fr) minmax(260px, 0.8fr);
  gap: 20px;
  padding: 28px;
}

.message-center-guide-hero__eyebrow,
.message-center-guide-section__eyebrow,
.message-center-guide-card__eyebrow,
.message-center-guide-panel__eyebrow,
.message-center-guide-hero__label,
.message-center-guide-method__tag,
.message-center-guide-mini-panel__title {
  font-size: 11px;
  line-height: 1.4;
  letter-spacing: 0.24em;
  text-transform: uppercase;
  color: #7b8794;
}

.message-center-guide-hero__title {
  margin-top: 10px;
  font-size: 42px;
  line-height: 1.08;
  font-weight: 600;
  letter-spacing: -0.04em;
  color: #16202a;
}

.message-center-guide-hero__summary {
  margin-top: 16px;
  max-width: 820px;
  font-size: 15px;
  line-height: 1.9;
  color: #52606d;
}

.message-center-guide-hero__panel {
  align-self: stretch;
  padding: 22px;
  border: 1px solid rgba(19, 27, 34, 0.08);
  border-radius: 7px;
  background: linear-gradient(180deg, #fbfcfd 0%, #f4f7fa 100%);
}

.message-center-guide-grid {
  display: grid;
  grid-template-columns: repeat(5, minmax(0, 1fr));
  gap: 16px;
}

.message-center-guide-card {
  padding: 20px;
}

.message-center-guide-card__title,
.message-center-guide-panel__title,
.message-center-guide-section__title {
  color: #16202a;
}

.message-center-guide-card__title {
  margin-top: 10px;
  font-size: 20px;
  line-height: 1.35;
  font-weight: 600;
}

.message-center-guide-card__text,
.message-center-guide-panel__text,
.message-center-guide-list {
  font-size: 14px;
  line-height: 1.9;
  color: #52606d;
}

.message-center-guide-section {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.message-center-guide-section__head {
  display: flex;
  align-items: end;
  justify-content: space-between;
  gap: 16px;
}

.message-center-guide-section__title {
  margin-top: 8px;
  font-size: 28px;
  line-height: 1.25;
  font-weight: 600;
  letter-spacing: -0.03em;
}

.message-center-guide-stack,
.message-center-guide-columns {
  display: grid;
  gap: 16px;
}

.message-center-guide-columns {
  grid-template-columns: repeat(3, minmax(0, 1fr));
}

.message-center-guide-panel {
  padding: 24px;
}

.message-center-guide-panel.is-wide {
  padding: 26px;
}

.message-center-guide-method__head {
  display: flex;
  align-items: start;
  justify-content: space-between;
  gap: 16px;
}

.message-center-guide-method__tag {
  display: inline-flex;
  align-items: center;
  min-height: 32px;
  padding: 0 12px;
  border: 1px solid rgba(19, 27, 34, 0.08);
  border-radius: 999px;
  background: #f5f8fa;
}

.message-center-guide-panel__text {
  margin-top: 14px;
}

.message-center-guide-method__grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 14px;
  margin-top: 18px;
}

.message-center-guide-mini-panel {
  padding: 18px;
  border: 1px solid rgba(19, 27, 34, 0.08);
  border-radius: 7px;
  background: linear-gradient(180deg, #fdfefe 0%, #f7fafc 100%);
}

.message-center-guide-list {
  margin: 12px 0 0;
  padding-left: 18px;
}

.message-center-guide-code-block {
  margin-top: 18px;
}

@media (max-width: 1180px) {
  .message-center-guide-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .message-center-guide-columns,
  .message-center-guide-method__grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 900px) {
  .message-center-guide-hero {
    grid-template-columns: 1fr;
    padding: 22px;
  }

  .message-center-guide-hero__title {
    font-size: 34px;
  }

  .message-center-guide-grid {
    grid-template-columns: 1fr;
  }

  .message-center-guide-panel,
  .message-center-guide-panel.is-wide,
  .message-center-guide-card {
    padding: 20px;
  }
}
</style>
