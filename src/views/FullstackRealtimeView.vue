<template>
  <section class="realtime-guide-page">
    <div class="realtime-guide-page__shell">
      <div class="realtime-guide-page__top">
        <RouterLink
          to="/fullstack-guide"
          class="realtime-guide-page__back"
          aria-label="返回全栈能力菜单"
          title="返回全栈能力菜单"
        >
          <el-icon :size="18"><ArrowLeft /></el-icon>
        </RouterLink>
      </div>

      <div class="realtime-guide-page__content">
        <header class="realtime-guide-hero">
          <div>
            <p class="realtime-guide-hero__eyebrow">Frontend Realtime</p>
            <h1 class="realtime-guide-hero__title">前端实时通信能力</h1>
            <p class="realtime-guide-hero__summary">
              这一页按真实项目里最容易做错的顺序来讲实时通信：先分清轮询、长轮询、SSE、WebSocket
              各自能解决什么，再设计连接状态、心跳、重连、消息确认、顺序保证和离线补偿。重点不是把
              socket 接上，而是让实时能力在生产环境里可控。
            </p>
          </div>

          <div class="realtime-guide-hero__panel">
            <p class="realtime-guide-hero__label">学完结果</p>
            <ul class="realtime-guide-list">
              <li>能分清轮询、SSE、WebSocket 的适用边界和协议特点。</li>
              <li>能设计连接生命周期、重连退避、消息去重和确认机制。</li>
              <li>
                能把实时通信落成可维护的前端模块，而不是页面里乱写事件回调。
              </li>
            </ul>
          </div>
        </header>

        <section class="realtime-guide-grid">
          <article
            v-for="item in quickStages"
            :key="item.order"
            class="realtime-guide-card"
          >
            <p class="realtime-guide-card__eyebrow">Stage {{ item.order }}</p>
            <h2 class="realtime-guide-card__title">{{ item.title }}</h2>
            <p class="realtime-guide-card__text">{{ item.summary }}</p>
          </article>
        </section>

        <section class="realtime-guide-section">
          <div class="realtime-guide-section__head">
            <div>
              <p class="realtime-guide-section__eyebrow">Decision Order</p>
              <h2 class="realtime-guide-section__title">
                实时通信不要直接上 WebSocket，先按问题顺序拆
              </h2>
            </div>
          </div>

          <div class="realtime-guide-stack">
            <article
              v-for="stage in guideStages"
              :key="stage.order"
              class="realtime-guide-panel is-wide"
            >
              <div class="realtime-guide-method__head">
                <div>
                  <p class="realtime-guide-panel__eyebrow">
                    Stage {{ stage.order }}
                  </p>
                  <h3 class="realtime-guide-panel__title">
                    {{ stage.title }}
                  </h3>
                </div>
                <span class="realtime-guide-method__tag">{{ stage.tag }}</span>
              </div>

              <p class="realtime-guide-panel__text">{{ stage.description }}</p>

              <div class="realtime-guide-method__grid">
                <section class="realtime-guide-mini-panel">
                  <p class="realtime-guide-mini-panel__title">适用场景</p>
                  <ul class="realtime-guide-list">
                    <li v-for="item in stage.bestFor" :key="item">
                      {{ item }}
                    </li>
                  </ul>
                </section>

                <section class="realtime-guide-mini-panel">
                  <p class="realtime-guide-mini-panel__title">实现重点</p>
                  <ul class="realtime-guide-list">
                    <li v-for="item in stage.focus" :key="item">
                      {{ item }}
                    </li>
                  </ul>
                </section>

                <section class="realtime-guide-mini-panel">
                  <p class="realtime-guide-mini-panel__title">常见误区</p>
                  <ul class="realtime-guide-list">
                    <li v-for="item in stage.risks" :key="item">
                      {{ item }}
                    </li>
                  </ul>
                </section>
              </div>

              <AppCodeBlock
                class="realtime-guide-code-block"
                :code="stage.code"
                :lang="stage.language"
              />
            </article>
          </div>
        </section>

        <section class="realtime-guide-section">
          <div class="realtime-guide-section__head">
            <div>
              <p class="realtime-guide-section__eyebrow">Comparison</p>
              <h2 class="realtime-guide-section__title">
                实时方案的关键不是酷，而是协议和成本匹配
              </h2>
            </div>
          </div>

          <div class="realtime-guide-columns">
            <article
              v-for="item in comparisonCards"
              :key="item.title"
              class="realtime-guide-panel"
            >
              <h3 class="realtime-guide-panel__title">{{ item.title }}</h3>
              <p class="realtime-guide-panel__text">{{ item.summary }}</p>
            </article>
          </div>
        </section>

        <section class="realtime-guide-section">
          <div class="realtime-guide-section__head">
            <div>
              <p class="realtime-guide-section__eyebrow">Checklist</p>
              <h2 class="realtime-guide-section__title">
                一套可上线的实时通信落地清单
              </h2>
            </div>
          </div>

          <article class="realtime-guide-panel is-wide">
            <ul class="realtime-guide-list">
              <li>先判断是否真的需要双向实时，很多需求用轮询或 SSE 就够了。</li>
              <li>
                连接状态要独立建模，至少区分
                connecting、open、reconnecting、closed。
              </li>
              <li>消息要有唯一 id、时间戳和类型，防止重复消费和乱序渲染。</li>
              <li>重连必须有退避策略，不能网络一抖就疯狂重连打挂服务端。</li>
              <li>上线前必须验证弱网、断网恢复、后台切前台和多标签页场景。</li>
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
    title: '先选协议',
    summary: '不是所有实时需求都该上 WebSocket，很多场景 SSE 或轮询更稳。',
  },
  {
    order: '02',
    title: '连接状态要显式化',
    summary: '连接中、已连接、重连中、断开都必须能被页面和业务感知。',
  },
  {
    order: '03',
    title: '消息要可追踪',
    summary: '唯一 id、顺序、确认和去重缺一不可，不然 UI 会乱。',
  },
  {
    order: '04',
    title: '弱网要能活',
    summary: '真正上线后，心跳、退避重连和离线补偿比 demo 成功更重要。',
  },
  {
    order: '05',
    title: '统一封装',
    summary: '实时通信应该是基础设施，不该每个页面各自 new 一个 socket。',
  },
];

const guideStages = [
  {
    order: '01',
    title: '先判断实时需求到底是什么，不要动不动就双向长连接',
    tag: '协议选型',
    description:
      '实时通信的第一步不是写代码，而是判断业务到底需不需要双向长连接。通知中心、价格刷新、任务进度这类场景，服务端单向推送就够了；聊天室、协同编辑、对战这类交互频繁的场景，才更适合 WebSocket。协议选错，后面所有复杂度都会白涨。',
    bestFor: ['通知中心', '客服会话', '协同编辑', '消息推送'],
    focus: [
      '根据单双向通信需求选择协议',
      '先估算消息频率和在线时长',
      '把服务端承载成本一起考虑',
    ],
    risks: [
      '只因为“实时”两个字就默认 WebSocket',
      '忽略移动网络和企业代理环境',
      '业务简单却引入过重基础设施',
    ],
    language: 'text',
    code: `Protocol Selection
- Polling: 实现简单，适合低频状态刷新
- SSE: 服务端单向推送，适合通知流和日志流
- WebSocket: 双向通信，适合聊天室、协同类业务
- Long Polling: 兼容性兜底方案，不是首选`,
  },
  {
    order: '02',
    title: '连接生命周期必须建模，别把连接状态藏在事件回调里',
    tag: '状态管理',
    description:
      '实时模块最容易烂的点，是连接状态没有统一管理。页面只知道 onopen 和 onmessage，却不知道当前是不是正在重连、是不是断线、上一次错误是什么。更稳的实现是把连接生命周期抽成状态机，这样 UI 提示、重连策略、业务降级都能挂上去。',
    bestFor: ['SPA 应用', '多页面通信模块', '后台系统', '移动端 H5'],
    focus: [
      '把连接状态做成统一 store 或 service',
      '记录最近一次错误和重连次数',
      '页面通过订阅状态而不是直接绑 socket',
    ],
    risks: [
      '多个页面分别维护连接状态',
      '断开连接后 UI 没有反馈',
      '业务逻辑直接散落在 onmessage 里',
    ],
    language: 'ts',
    code: `type ConnectionState =
  | 'idle'
  | 'connecting'
  | 'open'
  | 'reconnecting'
  | 'closed'

type RealtimeSnapshot = {
  state: ConnectionState
  retryCount: number
  lastError?: string
}`,
  },
  {
    order: '03',
    title: '消息模型要先定：消息 id、类型、确认、顺序都不能后补',
    tag: '消息协议',
    description:
      '真正的难点不在收消息，而在正确消费消息。消息有没有唯一 id，用来怎么去重；有没有 ack，用来确认送达；有没有 sequence，用来保证顺序；断线期间错过的消息怎么补，这些都要先和后端约定。否则前端只能不停打补丁。',
    bestFor: ['聊天系统', '通知系统', '行情系统', '协作产品'],
    focus: [
      '统一消息 envelope 结构',
      '明确 ack、重放和去重规则',
      '按消息类型分发到不同业务通道',
    ],
    risks: [
      '后端推什么前端就直接用什么',
      '没有消息唯一 id，重复消费无法识别',
      '消息顺序错乱却只在 UI 侧硬修',
    ],
    language: 'ts',
    code: `type RealtimeMessage<T = unknown> = {
  id: string
  type: 'chat' | 'notice' | 'presence' | 'system'
  seq: number
  timestamp: number
  payload: T
}

type AckMessage = {
  id: string
  ack: true
}`,
  },
  {
    order: '04',
    title: '弱网和异常恢复要前置设计：心跳、退避重连、离线补偿一起做',
    tag: '稳定性',
    description:
      '上线环境最真实的问题是网络不稳定。浏览器标签页切后台、笔记本休眠、地铁切换网络、代理中断，都会让连接异常。如果没有心跳和退避重连，系统就会频繁抖动；如果没有离线补偿，用户看到的数据就会断层。稳定性逻辑不能等线上报错了再补。',
    bestFor: ['移动端 H5', '长时间在线后台', '网络波动环境', '消息密集场景'],
    focus: [
      '定期心跳检测连接活性',
      '使用指数退避避免雪崩重连',
      '断线恢复后主动拉取缺失区间消息',
    ],
    risks: [
      '重连间隔写死成 1 秒',
      '后台切前台后连接状态不刷新',
      '只重连不补消息，导致状态断层',
    ],
    language: 'ts',
    code: `const getRetryDelay = (retryCount: number) =>
  Math.min(1000 * 2 ** retryCount, 15000)

const shouldHeartbeat = (lastPongAt: number, now: number) =>
  now - lastPongAt > 30000

const shouldFetchMissedMessages = (
  lastSeq: number,
  serverSeq: number,
) => serverSeq - lastSeq > 1`,
  },
  {
    order: '05',
    title: '前端实现要收口为基础设施：连接层、消息层、业务层分离',
    tag: '工程落地',
    description:
      '最佳实践不是做一个全局单例然后所有页面直接调，而是把实时能力拆成三层。连接层负责协议和重连；消息层负责序列化、ack、分发；业务层只订阅自己关心的事件。这样你换协议、加埋点、接监控时，不会牵一发动全身。',
    bestFor: [
      '复杂前端项目',
      '多人协作项目',
      '持续迭代产品',
      '可观测性要求高的系统',
    ],
    focus: [
      '分层封装连接、协议和业务订阅',
      '埋点记录连接成功率和重连次数',
      '把实时模块做成可测试、可替换的 service',
    ],
    risks: [
      '组件里直接创建和销毁连接',
      '实时能力和页面生命周期绑死',
      '出了问题只能靠 console.log 排查',
    ],
    language: 'ts',
    code: `export class RealtimeClient {
  connect() {}
  disconnect() {}
  send() {}
  subscribe() {}
}

export const realtimeNoticeChannel = {
  mount(client: RealtimeClient) {},
  unmount() {},
}`,
  },
];

const comparisonCards = [
  {
    title: '轮询 vs SSE',
    summary:
      '轮询实现最简单，但会浪费请求；SSE 更适合服务端单向推送，适合通知流、日志流和任务进度，但不适合复杂双向交互。',
  },
  {
    title: 'SSE vs WebSocket',
    summary:
      'SSE 成本更低、语义更清晰，适合单向更新；WebSocket 更灵活，适合双向低延迟通信，但连接治理、鉴权和运维复杂度都更高。',
  },
  {
    title: '页面直连 vs 基础设施封装',
    summary:
      '页面直连启动快，但很快就会失控；统一封装能把重连、心跳、日志和监控收拢到一处，适合长期维护项目。',
  },
];
</script>

<style scoped>
.realtime-guide-page {
  min-height: calc(100vh - 40px);
  padding: 24px;
  border: 1px solid rgba(19, 27, 34, 0.08);
  border-radius: 7px;
  background:
    radial-gradient(
      circle at top left,
      rgba(221, 228, 233, 0.48),
      transparent 28%
    ),
    linear-gradient(180deg, #fcfdfe 0%, #f3f6f8 100%);
  box-shadow: 0 30px 80px rgba(18, 26, 34, 0.08);
}

.realtime-guide-page__shell {
  min-height: calc(100vh - 90px);
  border: 1px solid rgba(19, 27, 34, 0.06);
  border-radius: 7px;
  background: rgba(255, 255, 255, 0.82);
}

.realtime-guide-page__top {
  display: flex;
  justify-content: flex-start;
  padding: 18px 18px 0;
}

.realtime-guide-page__back {
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

.realtime-guide-page__back:hover {
  transform: translateY(-1px);
  border-color: rgba(46, 70, 91, 0.18);
  box-shadow: 0 18px 34px rgba(19, 27, 34, 0.08);
}

.realtime-guide-page__content {
  padding: 18px 24px 24px;
}

.realtime-guide-hero {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 320px;
  gap: 20px;
  padding-bottom: 26px;
  border-bottom: 1px solid rgba(19, 27, 34, 0.08);
}

.realtime-guide-hero__eyebrow,
.realtime-guide-section__eyebrow,
.realtime-guide-card__eyebrow,
.realtime-guide-hero__label {
  font-size: 11px;
  line-height: 1.4;
  letter-spacing: 0.24em;
  text-transform: uppercase;
  color: #7b8793;
}

.realtime-guide-hero__title {
  margin-top: 10px;
  font-size: 46px;
  line-height: 1.06;
  font-weight: 600;
  letter-spacing: -0.05em;
  color: #17202a;
}

.realtime-guide-hero__summary {
  max-width: 860px;
  margin-top: 16px;
  font-size: 15px;
  line-height: 1.9;
  color: #58636f;
}

.realtime-guide-hero__panel,
.realtime-guide-card,
.realtime-guide-panel {
  border: 1px solid rgba(19, 27, 34, 0.08);
  border-radius: 7px;
  background: rgba(255, 255, 255, 0.84);
}

.realtime-guide-hero__panel {
  padding: 18px;
}

.realtime-guide-list {
  display: grid;
  gap: 8px;
  margin: 12px 0 0;
  padding-left: 18px;
  font-size: 14px;
  line-height: 1.8;
  color: #56616d;
}

.realtime-guide-grid,
.realtime-guide-columns,
.realtime-guide-stack {
  display: grid;
  gap: 16px;
}

.realtime-guide-grid {
  margin-top: 28px;
  grid-template-columns: repeat(3, minmax(0, 1fr));
}

.realtime-guide-card {
  padding: 18px;
}

.realtime-guide-card__title,
.realtime-guide-panel__title,
.realtime-guide-section__title {
  color: #17202a;
}

.realtime-guide-card__title {
  margin-top: 10px;
  font-size: 22px;
  line-height: 1.25;
  font-weight: 600;
}

.realtime-guide-card__text,
.realtime-guide-panel__text {
  margin-top: 12px;
  font-size: 14px;
  line-height: 1.9;
  color: #596571;
}

.realtime-guide-section {
  margin-top: 28px;
}

.realtime-guide-section__head {
  margin-bottom: 14px;
}

.realtime-guide-section__title {
  margin-top: 8px;
  font-size: 30px;
  line-height: 1.18;
  font-weight: 600;
  letter-spacing: -0.03em;
}

.realtime-guide-columns {
  grid-template-columns: repeat(3, minmax(0, 1fr));
}

.realtime-guide-stack {
  grid-template-columns: repeat(2, minmax(0, 1fr));
}

.realtime-guide-panel {
  padding: 18px;
}

.realtime-guide-panel.is-wide {
  grid-column: 1 / -1;
}

.realtime-guide-panel__eyebrow {
  font-size: 11px;
  line-height: 1.4;
  letter-spacing: 0.24em;
  text-transform: uppercase;
  color: #80909d;
}

.realtime-guide-panel__title {
  font-size: 20px;
  line-height: 1.3;
  font-weight: 600;
}

.realtime-guide-method__head {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 16px;
}

.realtime-guide-method__tag {
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

.realtime-guide-method__grid {
  display: grid;
  gap: 14px;
  margin-top: 16px;
  grid-template-columns: repeat(3, minmax(0, 1fr));
}

.realtime-guide-mini-panel {
  padding: 14px;
  border: 1px solid rgba(19, 27, 34, 0.08);
  border-radius: 7px;
  background: rgba(245, 248, 250, 0.9);
}

.realtime-guide-mini-panel__title {
  font-size: 14px;
  font-weight: 600;
  color: #17202a;
}

.realtime-guide-code-block {
  margin-top: 14px;
}

@media (max-width: 1080px) {
  .realtime-guide-hero,
  .realtime-guide-grid,
  .realtime-guide-columns,
  .realtime-guide-stack,
  .realtime-guide-method__grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 900px) {
  .realtime-guide-page {
    min-height: auto;
    padding: 18px;
  }

  .realtime-guide-page__shell {
    min-height: auto;
  }

  .realtime-guide-page__content {
    padding: 18px;
  }

  .realtime-guide-hero__title {
    font-size: 36px;
  }

  .realtime-guide-section__title {
    font-size: 26px;
  }
}
</style>
