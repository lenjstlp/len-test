<template>
  <section class="payment-guide-page">
    <div class="payment-guide-page__shell">
      <div class="payment-guide-page__top">
        <RouterLink
          to="/fullstack-guide"
          class="payment-guide-page__back"
          aria-label="返回全栈能力菜单"
          title="返回全栈能力菜单"
        >
          <el-icon :size="18"><ArrowLeft /></el-icon>
        </RouterLink>
      </div>

      <div class="payment-guide-page__content">
        <header class="payment-guide-hero">
          <div>
            <p class="payment-guide-hero__eyebrow">
              Frontend Payment Engineering
            </p>
            <h1 class="payment-guide-hero__title">前端支付工程</h1>
            <p class="payment-guide-hero__summary">
              支付不是“点一下按钮跳个收银台”这么简单。前端真正要扛的是下单参数收敛、支付态防抖、回跳页补单、结果轮询、失败重试、幂等防重复提交和对账可追踪。做得差，用户会重复扣款、误以为没支付成功；做得稳，支付链路才算真正上线可用。
            </p>
          </div>

          <div class="payment-guide-hero__panel">
            <p class="payment-guide-hero__label">学完结果</p>
            <ul class="payment-guide-list">
              <li>
                能分清下单、拉起支付、支付确认、补单回执这 4 个阶段的边界。
              </li>
              <li>
                能设计前端支付页的防重、状态恢复、轮询查询与异常兜底逻辑。
              </li>
              <li>能和后端约定幂等单号、支付状态机、回跳参数和补单接口。</li>
            </ul>
          </div>
        </header>

        <section class="payment-guide-grid">
          <article
            v-for="item in quickStages"
            :key="item.order"
            class="payment-guide-card"
          >
            <p class="payment-guide-card__eyebrow">Stage {{ item.order }}</p>
            <h2 class="payment-guide-card__title">{{ item.title }}</h2>
            <p class="payment-guide-card__text">{{ item.summary }}</p>
          </article>
        </section>

        <section class="payment-guide-section">
          <div class="payment-guide-section__head">
            <div>
              <p class="payment-guide-section__eyebrow">Decision Order</p>
              <h2 class="payment-guide-section__title">
                支付工程先稳状态，再谈交互体验
              </h2>
            </div>
          </div>

          <div class="payment-guide-stack">
            <article
              v-for="stage in paymentStages"
              :key="stage.order"
              class="payment-guide-panel is-wide"
            >
              <div class="payment-guide-method__head">
                <div>
                  <p class="payment-guide-panel__eyebrow">
                    Stage {{ stage.order }}
                  </p>
                  <h3 class="payment-guide-panel__title">{{ stage.title }}</h3>
                </div>
                <span class="payment-guide-method__tag">{{ stage.tag }}</span>
              </div>

              <p class="payment-guide-panel__text">{{ stage.description }}</p>

              <div class="payment-guide-method__grid">
                <section class="payment-guide-mini-panel">
                  <p class="payment-guide-mini-panel__title">适用场景</p>
                  <ul class="payment-guide-list">
                    <li v-for="item in stage.bestFor" :key="item">
                      {{ item }}
                    </li>
                  </ul>
                </section>

                <section class="payment-guide-mini-panel">
                  <p class="payment-guide-mini-panel__title">实现重点</p>
                  <ul class="payment-guide-list">
                    <li v-for="item in stage.focus" :key="item">
                      {{ item }}
                    </li>
                  </ul>
                </section>

                <section class="payment-guide-mini-panel">
                  <p class="payment-guide-mini-panel__title">常见误区</p>
                  <ul class="payment-guide-list">
                    <li v-for="item in stage.risks" :key="item">
                      {{ item }}
                    </li>
                  </ul>
                </section>
              </div>

              <AppCodeBlock
                class="payment-guide-code-block"
                :code="stage.code"
                :lang="stage.language"
              />
            </article>
          </div>
        </section>

        <section class="payment-guide-section">
          <div class="payment-guide-section__head">
            <div>
              <p class="payment-guide-section__eyebrow">Comparison</p>
              <h2 class="payment-guide-section__title">
                常见支付链路的取舍差异
              </h2>
            </div>
          </div>

          <div class="payment-guide-columns">
            <article
              v-for="item in comparisonCards"
              :key="item.title"
              class="payment-guide-panel"
            >
              <h3 class="payment-guide-panel__title">{{ item.title }}</h3>
              <p class="payment-guide-panel__text">{{ item.summary }}</p>
            </article>
          </div>
        </section>

        <section class="payment-guide-section">
          <div class="payment-guide-section__head">
            <div>
              <p class="payment-guide-section__eyebrow">Best Practice</p>
              <h2 class="payment-guide-section__title">
                一个支付页最小状态机应该长什么样
              </h2>
            </div>
          </div>

          <article class="payment-guide-panel is-wide">
            <p class="payment-guide-panel__text">
              支付页最怕“按钮点了没反应”或者“支付成功了页面还显示处理中”。所以最稳的做法不是堆
              toast，而是先把状态机立住，再让页面围绕状态机渲染。
            </p>

            <AppCodeBlock
              class="payment-guide-code-block"
              :code="stateMachineExample"
              lang="typescript"
            />
          </article>
        </section>

        <section class="payment-guide-section">
          <div class="payment-guide-section__head">
            <div>
              <p class="payment-guide-section__eyebrow">Checklist</p>
              <h2 class="payment-guide-section__title">
                支付页上线前必须自查的 5 件事
              </h2>
            </div>
          </div>

          <article class="payment-guide-panel is-wide">
            <ul class="payment-guide-list">
              <li>支付按钮必须防重复提交，并且下单接口要有幂等单号兜底。</li>
              <li>
                支付拉起失败、用户取消、支付成功但前端未回跳，都要有补单查询方案。
              </li>
              <li>
                支付结果页不要完全信任 URL 参数，最终状态必须以后端查询为准。
              </li>
              <li>
                订单超时、风控拒绝、库存变化等异常要有明确文案和恢复路径。
              </li>
              <li>
                埋点至少覆盖下单、拉起支付、支付成功、支付失败、取消支付和补单成功。
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
    title: '先生成支付单',
    summary:
      '支付页第一件事不是跳第三方，而是先拿到业务订单和支付单的稳定编号。',
  },
  {
    order: '02',
    title: '拉起支付要防重',
    summary: '按钮去抖和后端幂等都要有，不然用户双击一次就可能制造两笔单。',
  },
  {
    order: '03',
    title: '结果确认不要只看前端',
    summary: '支付成功提示只能算中间态，最终状态必须依赖查询或回执确认。',
  },
  {
    order: '04',
    title: '回跳页要能补单',
    summary: '用户切后台、断网、关闭页面都很常见，回跳和补单是支付体验关键。',
  },
  {
    order: '05',
    title: '日志与对账要可追踪',
    summary: '支付问题必须能追到订单号、支付单号、渠道单号和具体阶段。',
  },
];

const paymentStages = [
  {
    order: '01',
    title: '下单阶段先收敛支付参数，别让页面直接拼第三方字段',
    tag: '订单收口',
    description:
      '成熟的支付链路里，前端一般不会直接组装第三方支付参数，而是先请求业务下单接口，由服务端生成支付单号、金额摘要、过期时间和渠道配置。前端只拿“可拉起支付的最小数据”。这样后续换支付渠道、改签名规则、补单追踪都会轻得多。',
    bestFor: ['电商支付', '会员订阅', '医疗挂号缴费', '企业 SaaS 续费'],
    focus: [
      '先生成业务订单号和支付单号',
      '支付金额、商品描述等核心字段以后端为准',
      '页面只保留拉起支付所需最小字段',
    ],
    risks: [
      '前端直接拼第三方签名字段',
      '金额和订单信息以页面本地状态为准',
      '没有统一支付单号，后续难补单难追踪',
    ],
    language: 'json',
    code: `{
  "orderId": "ORDER-20260502-001",
  "paymentId": "PAY-20260502-001",
  "channel": "wechat-h5",
  "amount": 19900,
  "expireAt": "2026-05-02T18:30:00+08:00"
}`,
  },
  {
    order: '02',
    title: '拉起支付必须同时做前端防重和后端幂等',
    tag: '防重支付',
    description:
      '支付按钮点两下、网络卡顿后用户反复刷新、浏览器回退再进入，这些都很常见。前端要做按钮锁定和状态禁用，但这只是第一层。真正的底线在后端幂等单号，确保同一笔业务订单不会被重复创建多次支付请求。',
    bestFor: ['Web 收银台', 'H5 支付页', 'App 内嵌支付页'],
    focus: [
      '拉起支付期间锁按钮和表单',
      '同一订单重复请求时复用既有支付单',
      '支付渠道参数过期时要能安全重建',
    ],
    risks: [
      '只做前端按钮禁用，后端无幂等',
      '用户刷新后重新生成一笔新支付单',
      '支付中途还能修改订单关键参数',
    ],
    language: 'typescript',
    code: `const isSubmitting = ref(false);

async function handlePay() {
  if (isSubmitting.value) {
    return;
  }

  isSubmitting.value = true;

  try {
    const payload = await createPaymentOrder({
      orderId,
      idempotencyKey: orderId,
    });

    await openPaymentChannel(payload);
  } finally {
    isSubmitting.value = false;
  }
}`,
  },
  {
    order: '03',
    title: '支付完成页不要只靠回跳参数判成功，必须查单确认',
    tag: '结果确认',
    description:
      '很多第三方回跳只会告诉你“用户回来了”，不代表一定扣款成功。更稳的策略是：前端进入结果页后拿 paymentId 主动查询后端支付状态，必要时轮询几次，直到明确成功、失败或超时。这样即使用户在第三方页面停留过久，或者回跳参数不完整，也能补到最终结果。',
    bestFor: ['第三方收银台回跳', '扫码支付结果页', 'APP WebView 支付回执页'],
    focus: [
      '结果页使用 paymentId 主动查单',
      '轮询次数和超时策略明确',
      '状态文案区分处理中、成功、失败、已关闭',
    ],
    risks: [
      '只根据 query 参数显示支付成功',
      '轮询无终止条件导致页面一直转圈',
      '状态不明时没有人工补单入口',
    ],
    language: 'typescript',
    code: `async function pollPaymentResult(paymentId: string) {
  for (let i = 0; i < 6; i += 1) {
    const result = await fetchPaymentStatus(paymentId);

    if (result.status !== 'processing') {
      return result;
    }

    await new Promise((resolve) => setTimeout(resolve, 2000));
  }

  return { status: 'unknown' as const };
}`,
  },
  {
    order: '04',
    title: '支付失败和用户取消都要能恢复，而不是只弹一句“请重试”',
    tag: '异常恢复',
    description:
      '支付链路常见异常不是系统挂了，而是用户主动取消、风控拦截、订单超时、库存失效、回跳丢失。前端需要根据失败类型给出不同恢复路径，比如重新下单、继续支付、联系客服或返回订单详情。否则支付体验会非常粗暴，业务也会丢单。',
    bestFor: ['复杂商品交易', '限时订单', '高客单价支付场景'],
    focus: [
      '按错误类型映射不同恢复动作',
      '超时订单与可继续支付订单区分清楚',
      '支付失败后保留订单上下文，避免用户重填',
    ],
    risks: [
      '所有失败都提示同一句话',
      '失败后直接丢失订单上下文',
      '用户取消后无法再次进入支付流程',
    ],
    language: 'text',
    code: `Recovery Strategy
- cancel: 返回订单详情，可再次拉起支付
- timeout: 提示订单已关闭，需要重新下单
- risk-blocked: 给出人工审核或联系客服入口
- inventory-changed: 刷新价格与库存后重新确认`,
  },
  {
    order: '05',
    title: '支付链路一定要打通埋点、日志和对账字段',
    tag: '可追踪性',
    description:
      '支付问题不是“看一下控制台”能解决的。前端至少要把 orderId、paymentId、channel、当前阶段、失败原因这些字段打出去。这样一旦用户说“我付了钱但没到账”，你能快速关联服务端日志、支付渠道回执和前端埋点，定位到底卡在哪一层。',
    bestFor: ['线上支付系统', '需要客服排障的业务', '高频支付产品'],
    focus: [
      '埋点和日志都带 orderId / paymentId',
      '关键节点统一命名：下单、拉起、回跳、查单、补单',
      '和后端约定渠道单号、业务单号、支付单号映射关系',
    ],
    risks: [
      '埋点字段和日志字段名称不一致',
      '支付问题发生后无法关联链路',
      '客服拿不到任何可定位的支付信息',
    ],
    language: 'json',
    code: `{
  "event": "payment_result_polled",
  "orderId": "ORDER-20260502-001",
  "paymentId": "PAY-20260502-001",
  "channelTradeNo": "WX20260502123456",
  "status": "success"
}`,
  },
];

const comparisonCards = [
  {
    title: '站内收银台支付',
    summary:
      '用户留在当前页面，体验最完整，但状态管理也最复杂。适合需要保留上下文和做精细补单的业务系统。',
  },
  {
    title: '第三方跳转支付',
    summary:
      '接入快，但回跳不稳定，必须补查询与结果页兜底。适合中小型 Web 支付链路或外部渠道强约束场景。',
  },
  {
    title: '二维码 / 扫码支付',
    summary:
      '很适合桌面端大屏或线下场景，但核心难点变成轮询状态、支付超时、二维码刷新与已支付确认。',
  },
];

const stateMachineExample = `type PaymentState =
  | 'idle'
  | 'creating-order'
  | 'awaiting-channel'
  | 'paying'
  | 'checking-result'
  | 'success'
  | 'failed'
  | 'cancelled';

const transitions: Record<PaymentState, PaymentState[]> = {
  idle: ['creating-order'],
  'creating-order': ['awaiting-channel', 'failed'],
  'awaiting-channel': ['paying', 'failed', 'cancelled'],
  paying: ['checking-result', 'failed', 'cancelled'],
  'checking-result': ['success', 'failed'],
  success: [],
  failed: ['creating-order'],
  cancelled: ['creating-order'],
};`;
</script>

<style scoped>
.payment-guide-page {
  min-height: 100vh;
  padding: 32px;
  background:
    radial-gradient(
      circle at top left,
      rgba(214, 221, 229, 0.34),
      transparent 26%
    ),
    linear-gradient(180deg, #fbfcfd 0%, #eef2f6 100%);
}

.payment-guide-page__shell {
  max-width: 1240px;
  margin: 0 auto;
}

.payment-guide-page__top {
  display: flex;
  justify-content: flex-start;
  margin-bottom: 18px;
}

.payment-guide-page__back {
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

.payment-guide-page__back:hover {
  transform: translateY(-1px);
  border-color: rgba(67, 94, 118, 0.18);
  box-shadow: 0 18px 42px rgba(19, 27, 34, 0.1);
}

.payment-guide-page__content {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.payment-guide-hero,
.payment-guide-panel,
.payment-guide-card {
  border: 1px solid rgba(19, 27, 34, 0.08);
  border-radius: 7px;
  background: rgba(255, 255, 255, 0.96);
  box-shadow: 0 24px 54px rgba(19, 27, 34, 0.06);
}

.payment-guide-hero {
  display: grid;
  grid-template-columns: minmax(0, 1.4fr) minmax(320px, 0.8fr);
  gap: 18px;
  padding: 28px;
}

.payment-guide-hero__eyebrow,
.payment-guide-section__eyebrow,
.payment-guide-card__eyebrow,
.payment-guide-panel__eyebrow {
  font-size: 11px;
  line-height: 1.4;
  letter-spacing: 0.24em;
  text-transform: uppercase;
  color: #7e8894;
}

.payment-guide-hero__title {
  margin-top: 10px;
  font-size: 42px;
  line-height: 1.06;
  font-weight: 600;
  letter-spacing: -0.04em;
  color: #17202a;
}

.payment-guide-hero__summary,
.payment-guide-panel__text,
.payment-guide-card__text {
  font-size: 15px;
  line-height: 1.9;
  color: #55606c;
}

.payment-guide-hero__summary {
  margin-top: 16px;
  max-width: 760px;
}

.payment-guide-hero__panel,
.payment-guide-mini-panel {
  padding: 20px;
  border: 1px solid rgba(19, 27, 34, 0.08);
  border-radius: 7px;
  background: linear-gradient(180deg, #ffffff 0%, #f5f8fb 100%);
}

.payment-guide-hero__label,
.payment-guide-mini-panel__title {
  font-size: 13px;
  line-height: 1.5;
  font-weight: 600;
  color: #17202a;
}

.payment-guide-list {
  margin: 12px 0 0;
  padding-left: 18px;
  display: grid;
  gap: 8px;
  color: #55606c;
  font-size: 14px;
  line-height: 1.75;
}

.payment-guide-grid,
.payment-guide-columns {
  display: grid;
  gap: 16px;
}

.payment-guide-grid {
  grid-template-columns: repeat(5, minmax(0, 1fr));
}

.payment-guide-card {
  padding: 20px;
}

.payment-guide-card__title,
.payment-guide-panel__title,
.payment-guide-section__title {
  color: #17202a;
}

.payment-guide-card__title {
  margin-top: 8px;
  font-size: 19px;
  line-height: 1.35;
  font-weight: 600;
}

.payment-guide-card__text {
  margin-top: 10px;
}

.payment-guide-section {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.payment-guide-section__head {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
}

.payment-guide-section__title {
  margin-top: 8px;
  font-size: 28px;
  line-height: 1.2;
  font-weight: 600;
  letter-spacing: -0.03em;
}

.payment-guide-stack {
  display: grid;
  gap: 16px;
}

.payment-guide-panel {
  padding: 24px;
}

.payment-guide-panel.is-wide {
  padding: 26px;
}

.payment-guide-method__head {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 12px;
}

.payment-guide-method__tag {
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

.payment-guide-panel__title {
  margin-top: 8px;
  font-size: 24px;
  line-height: 1.28;
  font-weight: 600;
}

.payment-guide-panel__text {
  margin-top: 14px;
}

.payment-guide-method__grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 14px;
  margin-top: 18px;
}

.payment-guide-code-block {
  margin-top: 18px;
}

.payment-guide-columns {
  grid-template-columns: repeat(3, minmax(0, 1fr));
}

@media (max-width: 1100px) {
  .payment-guide-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .payment-guide-columns,
  .payment-guide-method__grid,
  .payment-guide-hero {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 720px) {
  .payment-guide-page {
    padding: 18px;
  }

  .payment-guide-grid {
    grid-template-columns: 1fr;
  }

  .payment-guide-hero,
  .payment-guide-card,
  .payment-guide-panel {
    padding: 18px;
  }

  .payment-guide-hero__title {
    font-size: 32px;
  }

  .payment-guide-section__title {
    font-size: 22px;
  }
}
</style>
