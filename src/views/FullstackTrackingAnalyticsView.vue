<template>
  <section class="tracking-guide-page">
    <div class="tracking-guide-page__shell">
      <div class="tracking-guide-page__top">
        <RouterLink
          to="/fullstack-guide"
          class="tracking-guide-page__back"
          aria-label="返回全栈能力菜单"
          title="返回全栈能力菜单"
        >
          <el-icon :size="18"><ArrowLeft /></el-icon>
        </RouterLink>
      </div>

      <div class="tracking-guide-page__content">
        <header class="tracking-guide-hero">
          <div>
            <p class="tracking-guide-hero__eyebrow">
              Frontend Tracking Analytics Engineering
            </p>
            <h1 class="tracking-guide-hero__title">前端埋点工程能力</h1>
            <p class="tracking-guide-hero__summary">
              埋点不是在按钮上随手加一个 click
              事件。真正的工程问题是：事件模型、页面曝光、停留时长、用户身份、实验分桶、公共上下文和数据口径怎样统一，才能让产品、运营和研发看到的是同一份真实数据，而不是一堆互相打架的报表。
            </p>
          </div>

          <div class="tracking-guide-hero__panel">
            <p class="tracking-guide-hero__label">学完结果</p>
            <ul class="tracking-guide-list">
              <li>能建立事件模型、公共字段和业务字段的统一规范。</li>
              <li>能处理曝光、点击、停留、转化和实验埋点的真实落地链路。</li>
              <li>能治理漏报、重复上报、顺序错乱和数据口径不一致问题。</li>
            </ul>
          </div>
        </header>

        <section class="tracking-guide-grid">
          <article
            v-for="item in quickStages"
            :key="item.order"
            class="tracking-guide-card"
          >
            <p class="tracking-guide-card__eyebrow">Stage {{ item.order }}</p>
            <h2 class="tracking-guide-card__title">{{ item.title }}</h2>
            <p class="tracking-guide-card__text">{{ item.summary }}</p>
          </article>
        </section>

        <section class="tracking-guide-section">
          <div class="tracking-guide-section__head">
            <div>
              <p class="tracking-guide-section__eyebrow">Build Order</p>
              <h2 class="tracking-guide-section__title">
                先定义事件协议，再治理采集、投递、校验和分析
              </h2>
            </div>
          </div>

          <div class="tracking-guide-stack">
            <article
              v-for="stage in guideStages"
              :key="stage.order"
              class="tracking-guide-panel is-wide"
            >
              <div class="tracking-guide-method__head">
                <div>
                  <p class="tracking-guide-panel__eyebrow">
                    Stage {{ stage.order }}
                  </p>
                  <h3 class="tracking-guide-panel__title">{{ stage.title }}</h3>
                </div>
                <span class="tracking-guide-method__tag">{{ stage.tag }}</span>
              </div>

              <p class="tracking-guide-panel__text">
                {{ stage.description }}
              </p>

              <div class="tracking-guide-method__grid">
                <section class="tracking-guide-mini-panel">
                  <p class="tracking-guide-mini-panel__title">适用场景</p>
                  <ul class="tracking-guide-list">
                    <li v-for="item in stage.bestFor" :key="item">
                      {{ item }}
                    </li>
                  </ul>
                </section>

                <section class="tracking-guide-mini-panel">
                  <p class="tracking-guide-mini-panel__title">实现重点</p>
                  <ul class="tracking-guide-list">
                    <li v-for="item in stage.focus" :key="item">
                      {{ item }}
                    </li>
                  </ul>
                </section>

                <section class="tracking-guide-mini-panel">
                  <p class="tracking-guide-mini-panel__title">常见误区</p>
                  <ul class="tracking-guide-list">
                    <li v-for="item in stage.risks" :key="item">
                      {{ item }}
                    </li>
                  </ul>
                </section>
              </div>

              <AppCodeBlock
                class="tracking-guide-code-block"
                :code="stage.code"
                :lang="stage.language"
              />
            </article>
          </div>
        </section>

        <section class="tracking-guide-section">
          <div class="tracking-guide-section__head">
            <div>
              <p class="tracking-guide-section__eyebrow">Comparison</p>
              <h2 class="tracking-guide-section__title">
                埋点工程里最容易混淆的几组概念
              </h2>
            </div>
          </div>

          <div class="tracking-guide-columns">
            <article
              v-for="item in comparisonCards"
              :key="item.title"
              class="tracking-guide-panel"
            >
              <h3 class="tracking-guide-panel__title">{{ item.title }}</h3>
              <p class="tracking-guide-panel__text">{{ item.summary }}</p>
            </article>
          </div>
        </section>

        <section class="tracking-guide-section">
          <div class="tracking-guide-section__head">
            <div>
              <p class="tracking-guide-section__eyebrow">Checklist</p>
              <h2 class="tracking-guide-section__title">
                一套能落地的前端埋点工程建设清单
              </h2>
            </div>
          </div>

          <article class="tracking-guide-panel is-wide">
            <ul class="tracking-guide-list">
              <li>
                先统一事件名、页面名、公共字段和业务字段，不要各业务线自行命名。
              </li>
              <li>曝光、点击、停留和转化要明确触发时机，避免统计口径模糊。</li>
              <li>
                埋点 SDK
                要支持批量上报、重试、去重和离线缓存，不能全靠即时发送。
              </li>
              <li>
                数据采集、验收、回放和质量监控必须成套存在，不能只看“有没有发出去”。
              </li>
              <li>
                实验分桶、用户身份和公共上下文要在埋点前统一注入，避免后期拼接失真。
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
    title: '先定事件协议',
    summary:
      '事件名、页面名、模块名、用户上下文和实验上下文必须统一，不然数据天然不可比。',
  },
  {
    order: '02',
    title: '区分曝光和点击',
    summary:
      '点击是用户动作，曝光是内容真正进入可见区域，两者口径不分清，漏斗分析一定失真。',
  },
  {
    order: '03',
    title: '采集链路要稳',
    summary:
      '上报失败、页面关闭、网络断开和重复触发都要有兜底策略，不能只靠 navigator.sendBeacon 碰运气。',
  },
  {
    order: '04',
    title: '数据质量要验收',
    summary:
      '有埋点不等于有数据，必须校验字段完整性、事件顺序、重复率和版本覆盖情况。',
  },
  {
    order: '05',
    title: '分析口径要统一',
    summary:
      '埋点设计必须反向服务分析模型，不能让产品、运营、研发对同一指标有三种解释。',
  },
];

const guideStages = [
  {
    order: '01',
    title: '建立事件模型和公共上下文规范',
    tag: 'Schema First',
    description:
      '埋点工程第一步不是写 SDK，而是先定义事件模型。至少要明确 eventName、pageName、moduleName、timestamp、userId、sessionId、deviceInfo、abBucket 和业务自定义字段。只有协议先统一，后面的 SDK、看板和验收才有稳定基础。',
    bestFor: [
      '多业务线共用同一数据平台的产品',
      '有增长、运营、实验分析需求的应用',
      '需要长期沉淀指标口径的中后台或内容产品',
    ],
    focus: [
      '事件模型拆成公共字段和业务字段两层',
      '为页面、组件、功能模块定义统一编码体系',
      '通过类型约束和 schema 校验防止字段漂移',
    ],
    risks: [
      '每个业务自己命名事件，后续根本无法统一分析',
      '公共字段注入不稳定，导致用户和实验维度无法关联',
      '字段没有版本化，升级后旧数据和新数据很难兼容',
    ],
    language: 'ts',
    code: `interface TrackingEvent<TPayload extends Record<string, unknown>> {
  eventName: string;
  pageName: string;
  moduleName?: string;
  userId?: string;
  sessionId: string;
  timestamp: number;
  abBucket?: string;
  payload: TPayload;
}

type ClickPayload = {
  targetId: string;
  targetText?: string;
  position?: string;
};`,
  },
  {
    order: '02',
    title: '明确曝光、点击和停留时机',
    tag: 'Trigger Timing',
    description:
      '埋点失真很多时候不是 SDK 的问题，而是触发时机错了。点击一般是事件级动作，曝光应该以真实进入视口为准，停留时长要考虑切后台、切页签、页面卸载和多次进入。时机不清晰，指标本身就没有可解释性。',
    bestFor: [
      '首页推荐流、活动页、工作台卡片等曝光敏感场景',
      '漏斗分析、转化分析和用户行为路径分析',
      '需要区分首曝、重复曝光和有效停留的产品',
    ],
    focus: [
      '使用 IntersectionObserver 处理真实曝光',
      '停留统计结合 visibilitychange 和 beforeunload 事件',
      '同一元素重复曝光需要去抖和去重策略',
    ],
    risks: [
      '组件一渲染就记曝光，结果折叠区和首屏外内容全算进去了',
      '切后台仍然持续计时，停留数据被严重夸大',
      '滚动来回触发重复曝光，数据会被无限放大',
    ],
    language: 'ts',
    code: `const exposureObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;

    track('card_exposure', {
      targetId: entry.target.getAttribute('data-id'),
    });

    exposureObserver.unobserve(entry.target);
  });
}, { threshold: 0.6 });`,
  },
  {
    order: '03',
    title: '搭建可靠的投递与缓存链路',
    tag: 'Reliable Delivery',
    description:
      '埋点不能只在事件触发时立刻 fetch 一把。正确的做法是本地队列化、批量发送、失败重试、页面关闭兜底和弱网缓存共存。否则只要用户网络波动、标签页关闭或者事件高频触发，漏报和乱序都会非常明显。',
    bestFor: [
      '高频交互产品，如内容流、编辑器、工作台',
      '弱网或移动端环境较多的场景',
      '实验和转化分析对数据完整性要求较高的业务',
    ],
    focus: [
      '本地事件队列批量上报，减少请求放大',
      '失败事件支持指数退避重试和离线缓存',
      '页面卸载时使用 sendBeacon 做最后兜底',
    ],
    risks: [
      '每个事件直接发请求，性能和网络都会被拖垮',
      '没有重试和缓存，弱网下漏数非常严重',
      '只做 sendBeacon，不做常规批量投递，浏览器兼容和容量都受限',
    ],
    language: 'ts',
    code: `const queue: Array<TrackingEvent<Record<string, unknown>>> = [];

const flush = async () => {
  if (!queue.length) return;

  const batch = queue.splice(0, 20);
  await request.post('/api/tracking/batch', { events: batch });
};

const track = (eventName: string, payload: Record<string, unknown>) => {
  queue.push(createEvent(eventName, payload));
};`,
  },
  {
    order: '04',
    title: '为埋点建立验收和质量监控',
    tag: 'Quality Gate',
    description:
      '埋点最怕“代码发了，但数据没人核”。真正成熟的埋点工程会有字段校验、版本校验、回放调试、采集成功率、重复率和缺失率监控。没有质量体系，埋点只会在问题爆发后才被动排查。',
    bestFor: [
      '指标对业务决策影响较大的产品',
      '多个团队共同维护同一埋点体系的系统',
      '需要灰度发布和版本兼容验证的场景',
    ],
    focus: [
      '开发环境支持埋点可视化回放和调试面板',
      '线上监控事件缺失、异常值、字段漂移和重复率',
      '上线前提供埋点清单和验收脚本',
    ],
    risks: [
      '只要请求 200 就认为埋点成功，忽略内容错误',
      '事件字段拼错或缺失后长期无人发现',
      '新旧版本同时在线时没有兼容校验，分析口径会断裂',
    ],
    language: 'ts',
    code: `const validateTrackingEvent = (event: TrackingEvent<Record<string, unknown>>) => {
  return Boolean(
    event.eventName &&
      event.pageName &&
      event.sessionId &&
      Number.isFinite(event.timestamp),
  );
};

const safeTrack = (event: TrackingEvent<Record<string, unknown>>) => {
  if (!validateTrackingEvent(event)) {
    console.warn('invalid tracking event', event);
    return;
  }

  queue.push(event);
};`,
  },
  {
    order: '05',
    title: '把实验、身份和业务分析链路打通',
    tag: 'Analysis Ready',
    description:
      '埋点的终点不是“采到了”，而是“能分析”。因此在采集阶段就要把登录前后身份拼接、实验分桶、渠道来源、页面上下文和转化链路一起设计进去。否则看板里虽然有一堆事件，但关键问题仍然回答不了。',
    bestFor: [
      'A/B 实验、增长转化、留存分析等数据驱动场景',
      '用户有匿名态到登录态迁移过程的产品',
      '需要跨页面、跨会话还原行为路径的系统',
    ],
    focus: [
      '匿名 ID、登录用户 ID 和设备 ID 的关系要清晰',
      '实验桶信息在采集前统一注入，避免分析后拼接',
      '定义关键转化事件和漏斗节点，保证上下游一致',
    ],
    risks: [
      '登录前后身份断裂，用户路径无法串起来',
      '实验分桶丢失或延迟注入，实验结果不可信',
      '事件很多，但没有围绕关键指标去组织，最后只剩数据噪音',
    ],
    language: 'ts',
    code: `const enrichCommonContext = () => ({
  userId: userStore.user?.id,
  sessionId: sessionStore.sessionId,
  abBucket: experimentStore.currentBucket,
  channel: marketingStore.channel,
});

const createEvent = (
  eventName: string,
  payload: Record<string, unknown>,
): TrackingEvent<Record<string, unknown>> => ({
  eventName,
  pageName: route.name?.toString() ?? 'unknown-page',
  timestamp: Date.now(),
  ...enrichCommonContext(),
  payload,
});`,
  },
];

const comparisonCards = [
  {
    title: '埋点 vs 监控',
    summary:
      '埋点关注用户行为和业务事件，监控关注性能、错误和系统健康。两者都采数据，但目标、口径和使用者完全不同。',
  },
  {
    title: '曝光埋点 vs 点击埋点',
    summary:
      '曝光埋点回答“用户是否真正看到”，点击埋点回答“用户是否主动交互”。这两个指标不能混算，更不能互相替代。',
  },
  {
    title: '实时分析 vs 离线分析',
    summary:
      '实时分析适合运营看板和在线实验，离线分析适合长周期留存和路径归因。埋点设计时就要考虑延迟和精度之间的取舍。',
  },
];
</script>

<style scoped>
.tracking-guide-page {
  min-height: calc(100vh - 40px);
}

.tracking-guide-page__shell {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.tracking-guide-page__top {
  display: flex;
  align-items: center;
}

.tracking-guide-page__back {
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

.tracking-guide-page__back:hover {
  transform: translateY(-1px);
  border-color: rgba(43, 72, 101, 0.2);
  box-shadow: 0 18px 36px rgba(17, 24, 39, 0.08);
}

.tracking-guide-page__content {
  display: flex;
  flex-direction: column;
  gap: 22px;
}

.tracking-guide-hero,
.tracking-guide-panel,
.tracking-guide-card {
  border: 1px solid rgba(19, 27, 34, 0.08);
  border-radius: 7px;
  background: #fff;
  box-shadow: 0 24px 60px rgba(15, 23, 42, 0.05);
}

.tracking-guide-hero {
  display: grid;
  grid-template-columns: minmax(0, 1.6fr) minmax(260px, 0.8fr);
  gap: 20px;
  padding: 28px;
}

.tracking-guide-hero__eyebrow,
.tracking-guide-section__eyebrow,
.tracking-guide-card__eyebrow,
.tracking-guide-panel__eyebrow,
.tracking-guide-hero__label,
.tracking-guide-method__tag,
.tracking-guide-mini-panel__title {
  font-size: 11px;
  line-height: 1.4;
  letter-spacing: 0.24em;
  text-transform: uppercase;
  color: #7b8794;
}

.tracking-guide-hero__title {
  margin-top: 10px;
  font-size: 42px;
  line-height: 1.08;
  font-weight: 600;
  letter-spacing: -0.04em;
  color: #16202a;
}

.tracking-guide-hero__summary {
  margin-top: 16px;
  max-width: 820px;
  font-size: 15px;
  line-height: 1.9;
  color: #52606d;
}

.tracking-guide-hero__panel {
  align-self: stretch;
  padding: 22px;
  border: 1px solid rgba(19, 27, 34, 0.08);
  border-radius: 7px;
  background: linear-gradient(180deg, #fbfcfd 0%, #f4f7fa 100%);
}

.tracking-guide-grid {
  display: grid;
  grid-template-columns: repeat(5, minmax(0, 1fr));
  gap: 16px;
}

.tracking-guide-card {
  padding: 20px;
}

.tracking-guide-card__title,
.tracking-guide-panel__title,
.tracking-guide-section__title {
  color: #16202a;
}

.tracking-guide-card__title {
  margin-top: 10px;
  font-size: 20px;
  line-height: 1.35;
  font-weight: 600;
}

.tracking-guide-card__text,
.tracking-guide-panel__text,
.tracking-guide-list {
  font-size: 14px;
  line-height: 1.9;
  color: #52606d;
}

.tracking-guide-section {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.tracking-guide-section__head {
  display: flex;
  align-items: end;
  justify-content: space-between;
  gap: 16px;
}

.tracking-guide-section__title {
  margin-top: 8px;
  font-size: 28px;
  line-height: 1.25;
  font-weight: 600;
  letter-spacing: -0.03em;
}

.tracking-guide-stack,
.tracking-guide-columns {
  display: grid;
  gap: 16px;
}

.tracking-guide-columns {
  grid-template-columns: repeat(3, minmax(0, 1fr));
}

.tracking-guide-panel {
  padding: 24px;
}

.tracking-guide-panel.is-wide {
  padding: 26px;
}

.tracking-guide-method__head {
  display: flex;
  align-items: start;
  justify-content: space-between;
  gap: 16px;
}

.tracking-guide-method__tag {
  display: inline-flex;
  align-items: center;
  min-height: 32px;
  padding: 0 12px;
  border: 1px solid rgba(19, 27, 34, 0.08);
  border-radius: 999px;
  background: #f5f8fa;
}

.tracking-guide-panel__text {
  margin-top: 14px;
}

.tracking-guide-method__grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 14px;
  margin-top: 18px;
}

.tracking-guide-mini-panel {
  padding: 18px;
  border: 1px solid rgba(19, 27, 34, 0.08);
  border-radius: 7px;
  background: linear-gradient(180deg, #fdfefe 0%, #f7fafc 100%);
}

.tracking-guide-list {
  margin: 12px 0 0;
  padding-left: 18px;
}

.tracking-guide-code-block {
  margin-top: 18px;
}

@media (max-width: 1180px) {
  .tracking-guide-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .tracking-guide-columns,
  .tracking-guide-method__grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 900px) {
  .tracking-guide-hero {
    grid-template-columns: 1fr;
    padding: 22px;
  }

  .tracking-guide-hero__title {
    font-size: 34px;
  }

  .tracking-guide-grid {
    grid-template-columns: 1fr;
  }

  .tracking-guide-panel,
  .tracking-guide-panel.is-wide,
  .tracking-guide-card {
    padding: 20px;
  }
}
</style>
