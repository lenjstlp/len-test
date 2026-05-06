<template>
  <section class="session-replay-guide-page">
    <div class="session-replay-guide-page__shell">
      <div class="session-replay-guide-page__top">
        <RouterLink
          to="/fullstack-guide"
          class="session-replay-guide-page__back"
          aria-label="返回全栈能力菜单"
          title="返回全栈能力菜单"
        >
          <el-icon :size="18"><ArrowLeft /></el-icon>
        </RouterLink>
      </div>

      <div class="session-replay-guide-page__content">
        <header class="session-replay-guide-hero">
          <div>
            <p class="session-replay-guide-hero__eyebrow">
              Frontend Session Replay Engineering
            </p>
            <h1 class="session-replay-guide-hero__title">前端操作回放工程</h1>
            <p class="session-replay-guide-hero__summary">
              操作回放不是简单录屏。真正的工程问题是：怎样低成本记录用户关键行为、如何把
              DOM
              变化和网络请求还原成可播放时间线、哪些敏感信息必须脱敏、线上采样率如何控制，以及回放数据怎样和埋点、错误、性能指标串成一条可追责的排障链路。
            </p>
          </div>

          <div class="session-replay-guide-hero__panel">
            <p class="session-replay-guide-hero__label">学完结果</p>
            <ul class="session-replay-guide-list">
              <li>能区分错误复现、合规审计和客服排障对回放数据的不同要求。</li>
              <li>
                能设计采样、脱敏、分段上报、异常关联和回放查询的完整链路。
              </li>
              <li>
                能把回放能力接入监控平台，而不是做一个昂贵但用不起来的录制系统。
              </li>
            </ul>
          </div>
        </header>

        <section class="session-replay-guide-grid">
          <article
            v-for="item in quickStages"
            :key="item.order"
            class="session-replay-guide-card"
          >
            <p class="session-replay-guide-card__eyebrow">
              Stage {{ item.order }}
            </p>
            <h2 class="session-replay-guide-card__title">{{ item.title }}</h2>
            <p class="session-replay-guide-card__text">{{ item.summary }}</p>
          </article>
        </section>

        <section class="session-replay-guide-section">
          <div class="session-replay-guide-section__head">
            <div>
              <p class="session-replay-guide-section__eyebrow">
                Engineering Order
              </p>
              <h2 class="session-replay-guide-section__title">
                先定义回放目标，再治理采样、脱敏、关联和存储成本
              </h2>
            </div>
          </div>

          <div class="session-replay-guide-stack">
            <article
              v-for="stage in guideStages"
              :key="stage.order"
              class="session-replay-guide-panel is-wide"
            >
              <div class="session-replay-guide-method__head">
                <div>
                  <p class="session-replay-guide-panel__eyebrow">
                    Stage {{ stage.order }}
                  </p>
                  <h3 class="session-replay-guide-panel__title">
                    {{ stage.title }}
                  </h3>
                </div>
                <span class="session-replay-guide-method__tag">
                  {{ stage.tag }}
                </span>
              </div>

              <p class="session-replay-guide-panel__text">
                {{ stage.description }}
              </p>

              <div class="session-replay-guide-method__grid">
                <section class="session-replay-guide-mini-panel">
                  <p class="session-replay-guide-mini-panel__title">适用场景</p>
                  <ul class="session-replay-guide-list">
                    <li v-for="item in stage.bestFor" :key="item">
                      {{ item }}
                    </li>
                  </ul>
                </section>

                <section class="session-replay-guide-mini-panel">
                  <p class="session-replay-guide-mini-panel__title">实现重点</p>
                  <ul class="session-replay-guide-list">
                    <li v-for="item in stage.focus" :key="item">
                      {{ item }}
                    </li>
                  </ul>
                </section>

                <section class="session-replay-guide-mini-panel">
                  <p class="session-replay-guide-mini-panel__title">常见误区</p>
                  <ul class="session-replay-guide-list">
                    <li v-for="item in stage.risks" :key="item">
                      {{ item }}
                    </li>
                  </ul>
                </section>
              </div>

              <AppCodeBlock
                class="session-replay-guide-code-block"
                :code="stage.code"
                :lang="stage.language"
              />
            </article>
          </div>
        </section>

        <section class="session-replay-guide-section">
          <div class="session-replay-guide-section__head">
            <div>
              <p class="session-replay-guide-section__eyebrow">Comparison</p>
              <h2 class="session-replay-guide-section__title">
                操作回放里最容易混淆的几组策略
              </h2>
            </div>
          </div>

          <div class="session-replay-guide-columns">
            <article
              v-for="item in comparisonCards"
              :key="item.title"
              class="session-replay-guide-panel"
            >
              <h3 class="session-replay-guide-panel__title">
                {{ item.title }}
              </h3>
              <p class="session-replay-guide-panel__text">{{ item.summary }}</p>
            </article>
          </div>
        </section>

        <section class="session-replay-guide-section">
          <div class="session-replay-guide-section__head">
            <div>
              <p class="session-replay-guide-section__eyebrow">Checklist</p>
              <h2 class="session-replay-guide-section__title">
                一套能落地的前端操作回放建设清单
              </h2>
            </div>
          </div>

          <article class="session-replay-guide-panel is-wide">
            <ul class="session-replay-guide-list">
              <li>
                先定义回放是为了解错、客服还是合规，不同目标决定不同采集粒度。
              </li>
              <li>
                默认按采样和命中条件录制，不要全量录全站，成本和风险都太高。
              </li>
              <li>
                输入框、身份证号、手机号、病历内容等敏感数据必须在前端侧优先脱敏。
              </li>
              <li>
                回放事件要能和错误、接口、性能指标按同一 traceId 串联查询。
              </li>
              <li>
                存储、上传、回放查询和删除策略都要可治理，不能只关心录到了没有。
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
    title: '先定义记录目标',
    summary:
      '是为了定位报错、排查体验问题，还是为了客服复现和审计，不同目标决定完全不同的数据方案。',
  },
  {
    order: '02',
    title: '采样必须可控',
    summary:
      '操作回放天然昂贵，不做按用户、按页面、按错误命中条件的采样，成本会迅速失控。',
  },
  {
    order: '03',
    title: '脱敏优先于录制',
    summary:
      '敏感内容必须在事件入库前就被遮蔽，不能先录下来再指望后面某层统一擦除。',
  },
  {
    order: '04',
    title: '异常要能关联',
    summary:
      '回放真正有价值，是因为它能和 JS 错误、接口失败、长任务和埋点串在同一条时间线上。',
  },
  {
    order: '05',
    title: '回放链路要分段',
    summary: '长会话不能一次性全压进内存，必须按时间片或事件数切段上传和落盘。',
  },
];

const guideStages = [
  {
    order: '01',
    title: '先定义回放目标：排障、客服复现、风控审计，还是体验研究',
    tag: 'Goal First',
    description:
      '很多团队一上来就接回放 SDK，最后发现录了一堆数据却没人用。根因通常是目标没定义清楚。排查 JS 报错更关注错误前后的关键路径；客服复现关心用户点击了什么；合规审计又要求行为可追踪但内容可脱敏。目标不清楚，采集粒度、留存周期、查询方式都会乱。',
    bestFor: [
      '线上疑难问题排查',
      '复杂表单系统',
      '客服协同定位问题',
      '高价值转化流程分析',
    ],
    focus: [
      '先定义谁是回放使用者和他们的检索方式',
      '区分错误定位与行为研究的事件粒度',
      '围绕目标决定回放保留时长和采样策略',
    ],
    risks: [
      '全量录制但没人查询，成本高且无产出',
      '排障场景只录点击，不录网络和错误上下文',
      '审计类需求和体验分析共用一套策略，最终两边都不满意',
    ],
    language: 'text',
    code: `Session Replay Goals
- error-debugging: 关注报错前后的关键行为和环境
- support-replay: 关注用户操作路径和界面状态
- compliance-audit: 关注行为留痕、脱敏和可追责
- ux-research: 关注漏斗、犹豫点和页面体验`,
  },
  {
    order: '02',
    title: '回放采集要按命中条件和采样率分层，而不是全量录全站',
    tag: 'Sampling',
    description:
      '操作回放最容易踩的坑，就是默认全量开启。这样不仅前端开销高，上传和存储成本也会炸。更合理的方式是分层采样：普通流量低比例录制，关键页面提升采样率，发生错误、白屏、接口异常或用户投诉时再强制补录当前会话片段。',
    bestFor: [
      '访问量较大的业务系统',
      '多页面工作台',
      '需要控制成本的长期运行平台',
    ],
    focus: [
      '定义基础采样率、关键页面采样率和异常强制采样规则',
      '允许按用户、租户、功能开关动态调整录制策略',
      '录制策略要能远程下发，便于线上应急提样',
    ],
    risks: [
      '默认全量录制，导致性能和存储一起失控',
      '异常会话没有强制补录机制，真正出问题时反而没有数据',
      '采样策略写死在前端，线上无法灵活调整',
    ],
    language: 'ts',
    code: `type ReplaySamplingRule = {
  page: string
  rate: number
  forceOnError: boolean
}

const shouldRecordReplay = (rule: ReplaySamplingRule) => {
  return Math.random() < rule.rate
}`,
  },
  {
    order: '03',
    title: '脱敏必须前置在采集侧，重点字段默认遮罩而不是事后补救',
    tag: 'Privacy',
    description:
      '回放系统最敏感的不是技术，而是合规。账号、手机号、身份证、病历内容、富文本输入、支付信息这类字段，必须在事件采集前就被替换成掩码或直接跳过。真正成熟的方案，会把元素级脱敏规则、白名单策略和租户级配置做成统一策略表，而不是靠业务同学口头约定“别录这个”。',
    bestFor: [
      '医疗系统',
      '金融系统',
      '后台管理系统',
      '含大量表单输入的业务平台',
    ],
    focus: [
      '默认对 input、textarea、contenteditable 做遮罩',
      '对敏感类 selector 或 data 属性做强规则脱敏',
      '把脱敏策略和回放录制策略一起下发与审计',
    ],
    risks: [
      '先录原文再到服务端清洗，一旦上报成功就已经不可逆泄露',
      '只脱敏一部分字段，富文本和自定义组件漏网',
      '脱敏策略散落在业务代码里，长期不可维护',
    ],
    language: 'ts',
    code: `const shouldMaskElement = (element: HTMLElement) => {
  return (
    element.matches('input, textarea, [contenteditable="true"]') ||
    element.dataset.replayMask === 'true'
  )
}

const normalizeText = (element: HTMLElement, text: string) => {
  return shouldMaskElement(element) ? '***' : text
}`,
  },
  {
    order: '04',
    title: '回放事件必须和错误、接口、性能指标共享同一条 trace',
    tag: 'Correlation',
    description:
      '一个能播放的回放视频并不等于好用。真正能排障的回放系统，必须把用户行为、网络请求、控制台错误、资源异常、长任务和路由切换串在同一条时间线里。这样排查时不是单看用户点了哪，而是能知道这次点击后发了哪个请求、哪个接口报错、哪个阶段开始卡顿。',
    bestFor: ['复杂交互系统', '高频线上问题定位', '需要跨前后端协同排查的团队'],
    focus: [
      '为回放、埋点、错误和请求统一生成 traceId',
      '请求拦截器和错误上报都带上 replaySessionId',
      '查询侧按同一会话维度聚合时间线',
    ],
    risks: [
      '回放、日志、错误各查各的，定位一次问题要来回跳系统',
      '只有回放 sessionId，没有和接口日志打通',
      '错误发生后找不到对应时间段的用户操作上下文',
    ],
    language: 'ts',
    code: `const replayContext = {
  replaySessionId: crypto.randomUUID(),
  traceId: crypto.randomUUID(),
}

request.interceptors.request.use((config) => {
  config.headers['x-replay-session-id'] = replayContext.replaySessionId
  config.headers['x-trace-id'] = replayContext.traceId
  return config
})`,
  },
  {
    order: '05',
    title: '大体量回放要分段上传、按需回放，不能一次性把整段会话塞满内存',
    tag: 'Storage',
    description:
      '长会话录制最怕两个问题：前端内存越来越大，后端存储越来越贵。工程上一般会按固定时间窗、事件数量或路由切换把回放切段，边录边传。回放查询时再按 sessionId 聚合多个切片并顺序播放。这样既能控制单段体积，又方便异常时快速定位关键窗口。',
    bestFor: [
      '长时间在线的工作台',
      '多步骤表单系统',
      '客服和审计需要回看长链路的场景',
    ],
    focus: [
      '按时间窗或事件数切 segment',
      '离线上传失败时支持本地暂存与补传',
      '查询侧支持按错误时间点直接定位到对应片段',
    ],
    risks: [
      '整段会话一次性上传，网络和内存压力过大',
      '只存原始碎片，不做索引，查询时根本拼不起来',
      '切片策略不稳定，关键错误前后事件被截断',
    ],
    language: 'ts',
    code: `type ReplaySegment = {
  sessionId: string
  segmentId: string
  startedAt: number
  events: unknown[]
}

const flushReplaySegment = async (segment: ReplaySegment) => {
  if (segment.events.length === 0) return

  await request.post('/api/replay/segments', segment)
  segment.events = []
}`,
  },
];

const comparisonCards = [
  {
    title: '全量录制 vs 条件采样',
    summary:
      '全量录制实现粗暴但代价极高；条件采样更符合工程现实，能把成本集中到关键用户、关键页面和异常会话上。',
  },
  {
    title: '错误录像 vs 行为时间线',
    summary:
      '只会播放页面不够排障，真正有用的是把点击、请求、错误和性能指标按时间线对齐，形成可检索的问题上下文。',
  },
  {
    title: '服务端脱敏 vs 采集侧脱敏',
    summary:
      '服务端脱敏是第二道保险，采集侧脱敏才是第一道底线。敏感内容一旦离开浏览器未被处理，就已经承担了额外风险。',
  },
];
</script>

<style scoped>
.session-replay-guide-page {
  min-height: calc(100vh - 40px);
  padding: 24px;
  border: 1px solid rgba(19, 27, 34, 0.08);
  border-radius: 7px;
  background:
    radial-gradient(
      circle at top left,
      rgba(226, 233, 239, 0.44),
      transparent 28%
    ),
    linear-gradient(180deg, #fcfdfe 0%, #f3f6f8 100%);
  box-shadow: 0 30px 80px rgba(18, 26, 34, 0.08);
}

.session-replay-guide-page__shell {
  min-height: calc(100vh - 90px);
  border: 1px solid rgba(19, 27, 34, 0.06);
  border-radius: 7px;
  background: rgba(255, 255, 255, 0.84);
}

.session-replay-guide-page__top {
  display: flex;
  justify-content: flex-start;
  padding: 18px 18px 0;
}

.session-replay-guide-page__back {
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

.session-replay-guide-page__back:hover {
  transform: translateY(-1px);
  border-color: rgba(46, 70, 91, 0.18);
  box-shadow: 0 18px 34px rgba(19, 27, 34, 0.08);
}

.session-replay-guide-page__content {
  padding: 18px 24px 24px;
}

.session-replay-guide-hero,
.session-replay-guide-panel,
.session-replay-guide-card {
  border: 1px solid rgba(19, 27, 34, 0.08);
  border-radius: 7px;
  background: rgba(255, 255, 255, 0.86);
}

.session-replay-guide-hero {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 320px;
  gap: 20px;
  padding: 28px;
}

.session-replay-guide-hero__eyebrow,
.session-replay-guide-section__eyebrow,
.session-replay-guide-card__eyebrow,
.session-replay-guide-hero__label {
  font-size: 11px;
  line-height: 1.4;
  letter-spacing: 0.24em;
  text-transform: uppercase;
  color: #7b8793;
}

.session-replay-guide-hero__title {
  margin-top: 10px;
  font-size: 46px;
  line-height: 1.06;
  font-weight: 600;
  letter-spacing: -0.05em;
  color: #17202a;
}

.session-replay-guide-hero__summary {
  max-width: 860px;
  margin-top: 16px;
  font-size: 15px;
  line-height: 1.9;
  color: #58636f;
}

.session-replay-guide-hero__panel {
  align-self: stretch;
  padding: 18px;
  border: 1px solid rgba(19, 27, 34, 0.08);
  border-radius: 7px;
  background: linear-gradient(180deg, #fbfcfd 0%, #f4f7fa 100%);
}

.session-replay-guide-list {
  display: grid;
  gap: 8px;
  margin: 12px 0 0;
  padding-left: 18px;
  font-size: 14px;
  line-height: 1.8;
  color: #56616d;
}

.session-replay-guide-grid,
.session-replay-guide-columns,
.session-replay-guide-stack {
  display: grid;
  gap: 16px;
}

.session-replay-guide-grid {
  margin-top: 28px;
  grid-template-columns: repeat(5, minmax(0, 1fr));
}

.session-replay-guide-card {
  padding: 18px;
}

.session-replay-guide-card__title,
.session-replay-guide-panel__title,
.session-replay-guide-section__title {
  color: #17202a;
}

.session-replay-guide-card__title {
  margin-top: 10px;
  font-size: 22px;
  line-height: 1.25;
  font-weight: 600;
}

.session-replay-guide-card__text,
.session-replay-guide-panel__text {
  margin-top: 12px;
  font-size: 14px;
  line-height: 1.9;
  color: #596571;
}

.session-replay-guide-section {
  margin-top: 28px;
}

.session-replay-guide-section__head {
  margin-bottom: 14px;
}

.session-replay-guide-section__title {
  margin-top: 8px;
  font-size: 30px;
  line-height: 1.18;
  font-weight: 600;
  letter-spacing: -0.03em;
}

.session-replay-guide-columns {
  grid-template-columns: repeat(3, minmax(0, 1fr));
}

.session-replay-guide-stack {
  grid-template-columns: repeat(2, minmax(0, 1fr));
}

.session-replay-guide-panel {
  padding: 18px;
}

.session-replay-guide-panel.is-wide {
  grid-column: 1 / -1;
}

.session-replay-guide-panel__eyebrow {
  font-size: 11px;
  line-height: 1.4;
  letter-spacing: 0.24em;
  text-transform: uppercase;
  color: #80909d;
}

.session-replay-guide-panel__title {
  font-size: 20px;
  line-height: 1.3;
  font-weight: 600;
}

.session-replay-guide-method__head {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 16px;
}

.session-replay-guide-method__tag {
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

.session-replay-guide-method__grid {
  display: grid;
  gap: 14px;
  margin-top: 16px;
  grid-template-columns: repeat(3, minmax(0, 1fr));
}

.session-replay-guide-mini-panel {
  padding: 14px;
  border: 1px solid rgba(19, 27, 34, 0.08);
  border-radius: 7px;
  background: rgba(245, 248, 250, 0.9);
}

.session-replay-guide-mini-panel__title {
  font-size: 14px;
  font-weight: 600;
  color: #17202a;
}

.session-replay-guide-code-block {
  margin-top: 14px;
}

@media (max-width: 1080px) {
  .session-replay-guide-hero,
  .session-replay-guide-grid,
  .session-replay-guide-columns,
  .session-replay-guide-stack,
  .session-replay-guide-method__grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 900px) {
  .session-replay-guide-page {
    min-height: auto;
    padding: 18px;
  }

  .session-replay-guide-page__shell {
    min-height: auto;
  }

  .session-replay-guide-page__content {
    padding: 18px;
  }

  .session-replay-guide-hero__title {
    font-size: 36px;
  }

  .session-replay-guide-section__title {
    font-size: 26px;
  }
}
</style>
