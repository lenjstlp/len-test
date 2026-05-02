<template>
  <section class="retry-idempotency-page">
    <div class="retry-idempotency-page__shell">
      <div class="retry-idempotency-page__top">
        <RouterLink
          to="/fullstack-guide"
          class="retry-idempotency-page__back"
          aria-label="返回全栈能力菜单"
          title="返回全栈能力菜单"
        >
          <el-icon :size="18"><ArrowLeft /></el-icon>
        </RouterLink>
      </div>

      <div class="retry-idempotency-page__content">
        <header class="retry-idempotency-hero">
          <div>
            <p class="retry-idempotency-hero__eyebrow">
              Frontend Retry And Idempotency Engineering
            </p>
            <h1 class="retry-idempotency-hero__title">前端重试与幂等工程</h1>
            <p class="retry-idempotency-hero__summary">
              接口失败后直接无限重试，或者用户连续点三次提交按钮，往往会把系统打得更乱。真正的重试与幂等工程，解决的是“该不该重试”“怎么重试”“重复提交如何只生效一次”“失败后如何优雅收口”。这是订单、支付、表单提交流程里非常常见的实战能力。
            </p>
          </div>

          <div class="retry-idempotency-hero__panel">
            <p class="retry-idempotency-hero__label">学完结果</p>
            <ul class="retry-idempotency-list">
              <li>能区分网络抖动、超时、服务异常与业务错误的处理策略。</li>
              <li>能实现指数退避重试，并避免重试风暴。</li>
              <li>能给提交类接口设计幂等 key，防止重复创建和重复扣费。</li>
            </ul>
          </div>
        </header>

        <section class="retry-idempotency-grid">
          <article
            v-for="item in quickStages"
            :key="item.order"
            class="retry-idempotency-card"
          >
            <p class="retry-idempotency-card__eyebrow">
              Stage {{ item.order }}
            </p>
            <h2 class="retry-idempotency-card__title">{{ item.title }}</h2>
            <p class="retry-idempotency-card__text">{{ item.summary }}</p>
          </article>
        </section>

        <section class="retry-idempotency-section">
          <div class="retry-idempotency-section__head">
            <div>
              <p class="retry-idempotency-section__eyebrow">Execution Order</p>
              <h2 class="retry-idempotency-section__title">
                先判断错误类型，再决定重试和幂等策略
              </h2>
            </div>
          </div>

          <div class="retry-idempotency-stack">
            <article
              v-for="stage in practiceStages"
              :key="stage.order"
              class="retry-idempotency-panel is-wide"
            >
              <div class="retry-idempotency-method__head">
                <div>
                  <p class="retry-idempotency-panel__eyebrow">
                    Stage {{ stage.order }}
                  </p>
                  <h3 class="retry-idempotency-panel__title">
                    {{ stage.title }}
                  </h3>
                </div>
                <span class="retry-idempotency-method__tag">{{
                  stage.tag
                }}</span>
              </div>

              <p class="retry-idempotency-panel__text">
                {{ stage.description }}
              </p>

              <div class="retry-idempotency-method__grid">
                <section class="retry-idempotency-mini-panel">
                  <p class="retry-idempotency-mini-panel__title">适用场景</p>
                  <ul class="retry-idempotency-list">
                    <li v-for="item in stage.bestFor" :key="item">
                      {{ item }}
                    </li>
                  </ul>
                </section>

                <section class="retry-idempotency-mini-panel">
                  <p class="retry-idempotency-mini-panel__title">实现重点</p>
                  <ul class="retry-idempotency-list">
                    <li v-for="item in stage.focus" :key="item">
                      {{ item }}
                    </li>
                  </ul>
                </section>

                <section class="retry-idempotency-mini-panel">
                  <p class="retry-idempotency-mini-panel__title">常见误区</p>
                  <ul class="retry-idempotency-list">
                    <li v-for="item in stage.risks" :key="item">
                      {{ item }}
                    </li>
                  </ul>
                </section>
              </div>

              <AppCodeBlock
                class="retry-idempotency-code-block"
                :code="stage.code"
                :lang="stage.language"
              />
            </article>
          </div>
        </section>

        <section class="retry-idempotency-section">
          <div class="retry-idempotency-section__head">
            <div>
              <p class="retry-idempotency-section__eyebrow">Comparison</p>
              <h2 class="retry-idempotency-section__title">
                不同策略的适用边界
              </h2>
            </div>
          </div>

          <div class="retry-idempotency-columns">
            <article
              v-for="item in comparisonCards"
              :key="item.title"
              class="retry-idempotency-panel"
            >
              <h3 class="retry-idempotency-panel__title">{{ item.title }}</h3>
              <p class="retry-idempotency-panel__text">{{ item.summary }}</p>
            </article>
          </div>
        </section>

        <section class="retry-idempotency-section">
          <div class="retry-idempotency-section__head">
            <div>
              <p class="retry-idempotency-section__eyebrow">Checklist</p>
              <h2 class="retry-idempotency-section__title">
                提交链路上线前必须补齐的 5 个点
              </h2>
            </div>
          </div>

          <article class="retry-idempotency-panel is-wide">
            <ul class="retry-idempotency-list">
              <li>是否明确哪些错误允许重试，哪些错误必须直接失败。</li>
              <li>重试是否带上次数上限、退避间隔和取消能力。</li>
              <li>创建、支付、审批等接口是否带上幂等 key。</li>
              <li>
                按钮防抖、请求锁和服务端幂等是否协同，而不是只做其中一层。
              </li>
              <li>失败后是否给用户明确反馈，而不是一直转圈或静默失败。</li>
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
    title: '先分失败类型',
    summary:
      '网络超时、502、429、参数错误、库存不足，它们不能共用同一种重试策略。',
  },
  {
    order: '02',
    title: '限制重试次数',
    summary: '重试的目的不是无限碰运气，而是在合理窗口里抗住瞬时抖动。',
  },
  {
    order: '03',
    title: '提交必须带幂等',
    summary: '创建订单、发起支付、提交表单这类动作，不能因重复点击而重复生效。',
  },
  {
    order: '04',
    title: '前后端要协同',
    summary: '前端只能减少重复请求，真正的一次性生效还要靠服务端识别幂等 key。',
  },
  {
    order: '05',
    title: '失败要能收口',
    summary: '达到上限后需要明确提示和恢复入口，而不是卡在 loading 里。',
  },
];

const practiceStages = [
  {
    order: '01',
    title: '先给错误分类，不是所有失败都能重试',
    tag: '错误分层',
    description:
      '网络中断、超时、临时 502、服务过载 429 这类“瞬时性失败”通常适合重试；而参数错误、权限不足、库存不足、业务校验失败，则不能靠重试解决。先把错误分层，后面的策略才不会乱。',
    bestFor: ['上传失败', '弱网环境', '偶发服务波动', '提交链路治理'],
    focus: [
      '区分网络错误、HTTP 错误和业务错误',
      '只对可恢复失败开放重试',
      '业务错误优先透传给用户',
    ],
    risks: [
      '所有异常都统一重试',
      '业务错误被重试掩盖',
      '429 限流时反而继续猛打接口',
    ],
    language: 'ts',
    code: `const shouldRetry = (error: {
  status?: number
  code?: string
  isNetworkError?: boolean
}) => {
  if (error.isNetworkError) {
    return true
  }

  return [408, 429, 502, 503, 504].includes(error.status ?? 0)
}`,
  },
  {
    order: '02',
    title: '重试要带指数退避，避免把服务打穿',
    tag: '退避控制',
    description:
      '重试不是立刻再发三次，而是要随着失败次数增长逐步拉开间隔。指数退避能在短时间内给系统一个恢复窗口，同时也避免多个客户端在同一时间一起重试，形成重试风暴。',
    bestFor: ['弱网接口', '三方 API', '偶发超时请求', '批量提交任务'],
    focus: ['设置最大重试次数', '重试间隔逐步增长', '允许调用方中断重试链路'],
    risks: [
      '毫秒级连续重试',
      '无上限重试导致页面卡死',
      '用户切页后重试仍继续执行',
    ],
    language: 'ts',
    code: `const sleep = (ms: number) =>
  new Promise((resolve) => window.setTimeout(resolve, ms))

const requestWithRetry = async <T>(
  task: () => Promise<T>,
  retryCount = 3
) => {
  for (let attempt = 0; attempt <= retryCount; attempt += 1) {
    try {
      return await task()
    } catch (error) {
      if (attempt === retryCount || !shouldRetry(error as { status?: number })) {
        throw error
      }

      const delay = 300 * 2 ** attempt
      await sleep(delay)
    }
  }

  throw new Error('unreachable')
}`,
  },
  {
    order: '03',
    title: '提交型接口必须设计幂等 key',
    tag: '幂等识别',
    description:
      '按钮禁用、防抖、节流只能减少重复触发，但不能绝对保证“一次点击只生效一次”。真正的幂等要让同一业务动作拥有稳定标识，重复请求到服务端时仍然只产生一次结果。',
    bestFor: ['订单提交', '支付发起', '审批提交', '创建资源接口'],
    focus: [
      '客户端生成稳定幂等 key',
      '幂等 key 与业务动作绑定',
      '失败重试时复用同一 key',
    ],
    risks: [
      '每次重试都生成新 key',
      '一个 key 被多个不同动作复用',
      '前端做了按钮禁用就以为够了',
    ],
    language: 'ts',
    code: `const createIdempotencyKey = (scene: string, businessId: string) => {
  return [scene, businessId, Date.now()].join(':')
}

const submitOrder = async (payload: Record<string, unknown>) => {
  const idempotencyKey = createIdempotencyKey('order-submit', String(payload.orderDraftId))

  return request.post('/api/orders', payload, {
    headers: {
      'x-idempotency-key': idempotencyKey,
    },
  })
}`,
  },
  {
    order: '04',
    title: 'UI 层要有请求锁，减少重复点击和重复弹窗',
    tag: '前端防抖',
    description:
      '幂等不代表前端什么都不用做。提交期间锁住按钮、阻止重复点击、统一 loading 态，能减少无意义的重复请求，也能让用户知道当前动作正在执行。前端这一层是体验治理，不是替代服务端幂等。',
    bestFor: ['表单提交', '弹窗确认', '导出任务创建', '审批操作'],
    focus: [
      '请求发起后立即加锁',
      '成功失败都要解锁',
      '避免多个按钮共享同一把全局锁',
    ],
    risks: [
      '只在成功时解锁，失败后按钮永久禁用',
      '一个页面所有操作共用同一 loading',
      '请求未发出前就被多次点击',
    ],
    language: 'ts',
    code: `const pendingMap = new Map<string, boolean>()

const runLockedAction = async <T>(key: string, action: () => Promise<T>) => {
  if (pendingMap.get(key)) {
    return
  }

  pendingMap.set(key, true)

  try {
    return await action()
  } finally {
    pendingMap.delete(key)
  }
}`,
  },
  {
    order: '05',
    title: '重试失败后要明确收口，不要让用户继续猜',
    tag: '失败收口',
    description:
      '达到最大重试次数后，不应该继续让页面一直 loading，也不能只在控制台报错。更合理的做法是展示失败原因、提供重新尝试入口、保留用户输入，必要时引导走人工兜底流程。',
    bestFor: ['关键表单', '订单链路', '支付确认', '长耗时上传'],
    focus: [
      '区分自动重试失败和业务失败',
      '保留用户已填写的数据',
      '提供明确的再次尝试入口',
    ],
    risks: [
      '失败后直接清空表单',
      '只提示“请求异常”没有上下文',
      '卡住 loading 让用户重复刷新页面',
    ],
    language: 'ts',
    code: `const submitWithFallback = async () => {
  try {
    await runLockedAction('order-submit', () =>
      requestWithRetry(() => submitOrder(formModel), 2)
    )
    ElMessage.success('提交成功')
  } catch (error) {
    openFailureDialog(error)
  }
}`,
  },
];

const comparisonCards = [
  {
    title: '按钮禁用',
    summary:
      '实现最简单，主要解决用户短时间内重复点击的问题。它只能改善体验，不能替代真正的幂等设计。',
  },
  {
    title: '自动重试',
    summary:
      '适合瞬时失败，能显著改善弱网和偶发波动场景。但必须有边界、有退避、有上限，不能无脑重试。',
  },
  {
    title: '服务端幂等',
    summary:
      '这是防止重复创建、重复支付、重复扣减的核心方案。成本更高，但对于关键提交链路是必备能力。',
  },
];
</script>

<style scoped>
.retry-idempotency-page {
  min-height: 100%;
  padding: 32px;
}

.retry-idempotency-page__shell {
  max-width: 1240px;
  margin: 0 auto;
}

.retry-idempotency-page__top {
  display: flex;
  justify-content: flex-start;
  margin-bottom: 18px;
}

.retry-idempotency-page__back {
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

.retry-idempotency-page__back:hover {
  transform: translateY(-1px);
  border-color: rgba(67, 94, 118, 0.18);
  box-shadow: 0 18px 42px rgba(19, 27, 34, 0.1);
}

.retry-idempotency-page__content {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.retry-idempotency-hero,
.retry-idempotency-panel,
.retry-idempotency-card {
  border: 1px solid rgba(19, 27, 34, 0.08);
  border-radius: 7px;
  background: rgba(255, 255, 255, 0.96);
  box-shadow: 0 24px 54px rgba(19, 27, 34, 0.06);
}

.retry-idempotency-hero {
  display: grid;
  grid-template-columns: minmax(0, 1.4fr) minmax(320px, 0.8fr);
  gap: 18px;
  padding: 28px;
}

.retry-idempotency-hero__eyebrow,
.retry-idempotency-section__eyebrow,
.retry-idempotency-card__eyebrow,
.retry-idempotency-panel__eyebrow {
  font-size: 11px;
  line-height: 1.4;
  letter-spacing: 0.24em;
  text-transform: uppercase;
  color: #7e8894;
}

.retry-idempotency-hero__title {
  margin-top: 10px;
  font-size: 42px;
  line-height: 1.06;
  font-weight: 600;
  letter-spacing: -0.04em;
  color: #17202a;
}

.retry-idempotency-hero__summary,
.retry-idempotency-panel__text,
.retry-idempotency-card__text {
  font-size: 15px;
  line-height: 1.9;
  color: #55606c;
}

.retry-idempotency-hero__summary {
  margin-top: 16px;
  max-width: 760px;
}

.retry-idempotency-hero__panel,
.retry-idempotency-mini-panel {
  padding: 20px;
  border: 1px solid rgba(19, 27, 34, 0.08);
  border-radius: 7px;
  background: linear-gradient(180deg, #ffffff 0%, #f5f8fb 100%);
}

.retry-idempotency-hero__label,
.retry-idempotency-mini-panel__title {
  font-size: 13px;
  line-height: 1.5;
  font-weight: 600;
  color: #17202a;
}

.retry-idempotency-list {
  margin: 12px 0 0;
  padding-left: 18px;
  display: grid;
  gap: 8px;
  color: #55606c;
  font-size: 14px;
  line-height: 1.75;
}

.retry-idempotency-grid,
.retry-idempotency-columns {
  display: grid;
  gap: 16px;
}

.retry-idempotency-grid {
  grid-template-columns: repeat(5, minmax(0, 1fr));
}

.retry-idempotency-card {
  padding: 20px;
}

.retry-idempotency-card__title,
.retry-idempotency-panel__title,
.retry-idempotency-section__title {
  color: #17202a;
}

.retry-idempotency-card__title {
  margin-top: 8px;
  font-size: 19px;
  line-height: 1.35;
  font-weight: 600;
}

.retry-idempotency-card__text {
  margin-top: 10px;
}

.retry-idempotency-section {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.retry-idempotency-section__head {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
}

.retry-idempotency-section__title {
  margin-top: 8px;
  font-size: 28px;
  line-height: 1.2;
  font-weight: 600;
  letter-spacing: -0.03em;
}

.retry-idempotency-stack {
  display: grid;
  gap: 16px;
}

.retry-idempotency-panel {
  padding: 24px;
}

.retry-idempotency-panel.is-wide {
  padding: 26px;
}

.retry-idempotency-method__head {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 12px;
}

.retry-idempotency-method__tag {
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

.retry-idempotency-panel__title {
  margin-top: 8px;
  font-size: 24px;
  line-height: 1.28;
  font-weight: 600;
}

.retry-idempotency-panel__text {
  margin-top: 14px;
}

.retry-idempotency-method__grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 14px;
  margin-top: 18px;
}

.retry-idempotency-code-block {
  margin-top: 18px;
}

.retry-idempotency-columns {
  grid-template-columns: repeat(3, minmax(0, 1fr));
}

@media (max-width: 1100px) {
  .retry-idempotency-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .retry-idempotency-columns,
  .retry-idempotency-method__grid,
  .retry-idempotency-hero {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 720px) {
  .retry-idempotency-page {
    padding: 18px;
  }

  .retry-idempotency-grid {
    grid-template-columns: 1fr;
  }

  .retry-idempotency-hero,
  .retry-idempotency-card,
  .retry-idempotency-panel {
    padding: 18px;
  }

  .retry-idempotency-hero__title {
    font-size: 32px;
  }

  .retry-idempotency-section__title {
    font-size: 22px;
  }
}
</style>
