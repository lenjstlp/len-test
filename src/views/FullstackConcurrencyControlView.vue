<template>
  <section class="concurrency-control-page">
    <div class="concurrency-control-page__shell">
      <div class="concurrency-control-page__top">
        <RouterLink
          to="/fullstack-guide"
          class="concurrency-control-page__back"
          aria-label="返回全栈能力菜单"
          title="返回全栈能力菜单"
        >
          <el-icon :size="18"><ArrowLeft /></el-icon>
        </RouterLink>
      </div>

      <div class="concurrency-control-page__content">
        <header class="concurrency-control-hero">
          <div>
            <p class="concurrency-control-hero__eyebrow">
              Frontend Concurrency Control Engineering
            </p>
            <h1 class="concurrency-control-hero__title">前端并发控制工程</h1>
            <p class="concurrency-control-hero__summary">
              真实业务里，前端并不是“请求发得越快越好”。批量上传、列表懒加载、搜索联想、任务轮询、导出队列都会遇到并发失控问题。没有并发上限，页面会卡；没有取消机制，旧请求会污染新结果；没有优先级，关键任务会被低价值请求挤掉。并发控制是很实用的工程能力。
            </p>
          </div>

          <div class="concurrency-control-hero__panel">
            <p class="concurrency-control-hero__label">学完结果</p>
            <ul class="concurrency-control-list">
              <li>能给批量请求、上传和搜索联想设置合理并发上限。</li>
              <li>能实现任务队列、取消机制和优先级调度。</li>
              <li>能避免旧请求覆盖新结果，并让失败任务稳定收口。</li>
            </ul>
          </div>
        </header>

        <section class="concurrency-control-grid">
          <article
            v-for="item in quickStages"
            :key="item.order"
            class="concurrency-control-card"
          >
            <p class="concurrency-control-card__eyebrow">
              Stage {{ item.order }}
            </p>
            <h2 class="concurrency-control-card__title">{{ item.title }}</h2>
            <p class="concurrency-control-card__text">{{ item.summary }}</p>
          </article>
        </section>

        <section class="concurrency-control-section">
          <div class="concurrency-control-section__head">
            <div>
              <p class="concurrency-control-section__eyebrow">
                Execution Order
              </p>
              <h2 class="concurrency-control-section__title">
                先限流，再调度，最后处理取消与收口
              </h2>
            </div>
          </div>

          <div class="concurrency-control-stack">
            <article
              v-for="stage in practiceStages"
              :key="stage.order"
              class="concurrency-control-panel is-wide"
            >
              <div class="concurrency-control-method__head">
                <div>
                  <p class="concurrency-control-panel__eyebrow">
                    Stage {{ stage.order }}
                  </p>
                  <h3 class="concurrency-control-panel__title">
                    {{ stage.title }}
                  </h3>
                </div>
                <span class="concurrency-control-method__tag">{{
                  stage.tag
                }}</span>
              </div>

              <p class="concurrency-control-panel__text">
                {{ stage.description }}
              </p>

              <div class="concurrency-control-method__grid">
                <section class="concurrency-control-mini-panel">
                  <p class="concurrency-control-mini-panel__title">适用场景</p>
                  <ul class="concurrency-control-list">
                    <li v-for="item in stage.bestFor" :key="item">
                      {{ item }}
                    </li>
                  </ul>
                </section>

                <section class="concurrency-control-mini-panel">
                  <p class="concurrency-control-mini-panel__title">实现重点</p>
                  <ul class="concurrency-control-list">
                    <li v-for="item in stage.focus" :key="item">
                      {{ item }}
                    </li>
                  </ul>
                </section>

                <section class="concurrency-control-mini-panel">
                  <p class="concurrency-control-mini-panel__title">常见误区</p>
                  <ul class="concurrency-control-list">
                    <li v-for="item in stage.risks" :key="item">
                      {{ item }}
                    </li>
                  </ul>
                </section>
              </div>

              <AppCodeBlock
                class="concurrency-control-code-block"
                :code="stage.code"
                :lang="stage.language"
              />
            </article>
          </div>
        </section>

        <section class="concurrency-control-section">
          <div class="concurrency-control-section__head">
            <div>
              <p class="concurrency-control-section__eyebrow">Comparison</p>
              <h2 class="concurrency-control-section__title">
                常见并发治理手段的差异
              </h2>
            </div>
          </div>

          <div class="concurrency-control-columns">
            <article
              v-for="item in comparisonCards"
              :key="item.title"
              class="concurrency-control-panel"
            >
              <h3 class="concurrency-control-panel__title">{{ item.title }}</h3>
              <p class="concurrency-control-panel__text">{{ item.summary }}</p>
            </article>
          </div>
        </section>

        <section class="concurrency-control-section">
          <div class="concurrency-control-section__head">
            <div>
              <p class="concurrency-control-section__eyebrow">Checklist</p>
              <h2 class="concurrency-control-section__title">
                并发任务上线前必须确认的 5 个点
              </h2>
            </div>
          </div>

          <article class="concurrency-control-panel is-wide">
            <ul class="concurrency-control-list">
              <li>是否给批量任务设置了明确的最大并发数。</li>
              <li>旧请求是否支持取消，避免结果回写污染当前页面。</li>
              <li>搜索联想、懒加载和轮询是否做了优先级区分。</li>
              <li>失败任务是否有重试或失败收口，而不是卡在队列里。</li>
              <li>队列是否能感知页面销毁、路由切换和用户主动中断。</li>
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
    title: '先限制并发数',
    summary: '批量任务不设上限，浏览器和服务端都会被拖垮。',
  },
  {
    order: '02',
    title: '再做任务队列',
    summary: '不是所有任务都能立刻执行，排队机制决定了系统是否平稳。',
  },
  {
    order: '03',
    title: '旧请求要可取消',
    summary: '搜索联想、切页、切筛选时，旧请求不取消就会覆盖新结果。',
  },
  {
    order: '04',
    title: '关键任务要有优先级',
    summary: '用户当前看的数据，要比后台预取和低价值轮询更先执行。',
  },
  {
    order: '05',
    title: '失败任务必须收口',
    summary: '并发控制不只是发请求，更包括失败、重试和页面销毁后的治理。',
  },
];

const practiceStages = [
  {
    order: '01',
    title: '先给批量任务设置并发上限',
    tag: '并发阈值',
    description:
      '上传、导出、批量详情查询这类任务，如果一次性全量并发，页面线程、带宽和服务端都会承压。合理做法是按业务设置上限，比如 3、5、8 这样的窗口，既保证吞吐，也避免瞬时打爆。',
    bestFor: ['批量上传', '批量导出', '多详情查询', '文件预处理'],
    focus: [
      '并发数按任务类型区分',
      '避免直接 Promise.all 全量并发',
      '窗口大小可以结合环境动态调整',
    ],
    risks: [
      '几百个任务一次性并发',
      '移动端和桌面端用同一并发阈值',
      '把并发限制写死又不留扩展口',
    ],
    language: 'ts',
    code: `const runWithConcurrency = async <T>(
  tasks: Array<() => Promise<T>>,
  limit: number
) => {
  const results: T[] = []
  let currentIndex = 0

  const worker = async () => {
    while (currentIndex < tasks.length) {
      const taskIndex = currentIndex
      currentIndex += 1
      results[taskIndex] = await tasks[taskIndex]()
    }
  }

  await Promise.all(
    Array.from({ length: Math.min(limit, tasks.length) }, () => worker())
  )

  return results
}`,
  },
  {
    order: '02',
    title: '队列化执行，让任务有序流动',
    tag: '任务调度',
    description:
      '并发上限只是第一步，真正稳定的系统往往还需要队列。队列能把待执行任务、执行中任务和已完成任务分开管理，便于做状态展示、失败重试和批量暂停恢复。',
    bestFor: ['上传中心', '导出中心', '离线任务面板', '批量消息发送'],
    focus: [
      '区分 waiting、running、done、failed 状态',
      '任务出队和入队过程保持可观测',
      '支持后续扩展暂停和恢复能力',
    ],
    risks: [
      '只有并发限制，没有队列状态',
      '失败任务丢失，不知道卡在哪',
      '任务完成后不清理，内存持续上涨',
    ],
    language: 'ts',
    code: `type QueueTask<T> = {
  id: string
  run: () => Promise<T>
  status: 'waiting' | 'running' | 'done' | 'failed'
}

const queue: QueueTask<unknown>[] = []

const enqueueTask = (task: QueueTask<unknown>) => {
  queue.push(task)
}`,
  },
  {
    order: '03',
    title: '搜索和筛选类请求要支持取消旧任务',
    tag: '取消机制',
    description:
      '用户连续输入关键字或快速切换筛选时，旧请求已经不再有价值。如果不取消，后返回的旧结果会把新结果覆盖掉。最常见的做法是用 AbortController 或请求序号保证“只认最后一次”。',
    bestFor: ['搜索联想', '筛选面板', '分页切换', '联动表单'],
    focus: [
      '发起新请求前取消旧请求',
      '只回写当前有效请求的结果',
      '页面卸载时统一中断未完成请求',
    ],
    risks: [
      '多个旧请求同时回写页面',
      '切路由后请求继续执行',
      '只做 loading，不做真正的取消',
    ],
    language: 'ts',
    code: `let currentController: AbortController | null = null

const requestLatest = async (keyword: string) => {
  currentController?.abort()
  currentController = new AbortController()

  const response = await fetch('/api/search?keyword=' + keyword, {
    signal: currentController.signal,
  })

  return response.json()
}`,
  },
  {
    order: '04',
    title: '高价值任务要比低价值任务优先执行',
    tag: '优先级',
    description:
      '并发窗口有限时，优先级就很关键。用户当前点击触发的任务，优先级应高于后台预取、埋点补发和低频轮询。否则看起来系统很忙，但忙的不是用户当前最关心的事情。',
    bestFor: ['首屏数据', '用户主动操作', '后台预取', '轮询任务'],
    focus: [
      '给任务定义 high、normal、low 等优先级',
      '队列调度时优先消费高价值任务',
      '避免低优先级任务长期饿死高优先级通道',
    ],
    risks: [
      '所有任务都走一个平队列',
      '后台预取把首屏请求挤掉',
      '只定义优先级，不真正参与调度',
    ],
    language: 'ts',
    code: `type Priority = 'high' | 'normal' | 'low'

const sortTasksByPriority = <T extends { priority: Priority }>(tasks: T[]) => {
  const priorityMap: Record<Priority, number> = {
    high: 3,
    normal: 2,
    low: 1,
  }

  return [...tasks].sort((a, b) => priorityMap[b.priority] - priorityMap[a.priority])
}`,
  },
  {
    order: '05',
    title: '并发任务要有失败收口和生命周期清理',
    tag: '收口治理',
    description:
      '页面销毁、用户取消、网络断开、任务失败都要能被队列感知。否则任务会继续悄悄执行，甚至在页面离开后还回写状态。良好的并发控制必须把“开始执行”与“怎么结束”一起设计。',
    bestFor: ['长任务页面', '上传中心', '大列表预取', '后台同步任务'],
    focus: [
      '任务失败后状态可见',
      '路由离开时统一清理队列和控制器',
      '提供显式取消和再次执行入口',
    ],
    risks: [
      '任务失败后队列永远卡住',
      '页面销毁后还继续 setState',
      '取消只是 UI 消失，任务实际没停',
    ],
    language: 'ts',
    code: `const activeControllers = new Map<string, AbortController>()

const cancelAllTasks = () => {
  activeControllers.forEach((controller) => controller.abort())
  activeControllers.clear()
}

window.addEventListener('beforeunload', () => {
  cancelAllTasks()
})`,
  },
];

const comparisonCards = [
  {
    title: '并发上限',
    summary:
      '最基础的治理手段，适合快速拦住任务洪峰。优点是简单，缺点是缺少状态和优先级管理。',
  },
  {
    title: '任务队列',
    summary:
      '适合需要状态面板和失败治理的复杂场景。开发成本更高，但更适合工程化扩展。',
  },
  {
    title: '取消与优先级',
    summary:
      '适合搜索联想、筛选切换和首屏关键链路。它关注的是结果正确性和用户当前体验，而不只是吞吐量。',
  },
];
</script>

<style scoped>
.concurrency-control-page {
  min-height: 100%;
  padding: 32px;
}

.concurrency-control-page__shell {
  max-width: 1240px;
  margin: 0 auto;
}

.concurrency-control-page__top {
  display: flex;
  justify-content: flex-start;
  margin-bottom: 18px;
}

.concurrency-control-page__back {
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

.concurrency-control-page__back:hover {
  transform: translateY(-1px);
  border-color: rgba(67, 94, 118, 0.18);
  box-shadow: 0 18px 42px rgba(19, 27, 34, 0.1);
}

.concurrency-control-page__content {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.concurrency-control-hero,
.concurrency-control-panel,
.concurrency-control-card {
  border: 1px solid rgba(19, 27, 34, 0.08);
  border-radius: 7px;
  background: rgba(255, 255, 255, 0.96);
  box-shadow: 0 24px 54px rgba(19, 27, 34, 0.06);
}

.concurrency-control-hero {
  display: grid;
  grid-template-columns: minmax(0, 1.4fr) minmax(320px, 0.8fr);
  gap: 18px;
  padding: 28px;
}

.concurrency-control-hero__eyebrow,
.concurrency-control-section__eyebrow,
.concurrency-control-card__eyebrow,
.concurrency-control-panel__eyebrow {
  font-size: 11px;
  line-height: 1.4;
  letter-spacing: 0.24em;
  text-transform: uppercase;
  color: #7e8894;
}

.concurrency-control-hero__title {
  margin-top: 10px;
  font-size: 42px;
  line-height: 1.06;
  font-weight: 600;
  letter-spacing: -0.04em;
  color: #17202a;
}

.concurrency-control-hero__summary,
.concurrency-control-panel__text,
.concurrency-control-card__text {
  font-size: 15px;
  line-height: 1.9;
  color: #55606c;
}

.concurrency-control-hero__summary {
  margin-top: 16px;
  max-width: 760px;
}

.concurrency-control-hero__panel,
.concurrency-control-mini-panel {
  padding: 20px;
  border: 1px solid rgba(19, 27, 34, 0.08);
  border-radius: 7px;
  background: linear-gradient(180deg, #ffffff 0%, #f5f8fb 100%);
}

.concurrency-control-hero__label,
.concurrency-control-mini-panel__title {
  font-size: 13px;
  line-height: 1.5;
  font-weight: 600;
  color: #17202a;
}

.concurrency-control-list {
  margin: 12px 0 0;
  padding-left: 18px;
  display: grid;
  gap: 8px;
  color: #55606c;
  font-size: 14px;
  line-height: 1.75;
}

.concurrency-control-grid,
.concurrency-control-columns {
  display: grid;
  gap: 16px;
}

.concurrency-control-grid {
  grid-template-columns: repeat(5, minmax(0, 1fr));
}

.concurrency-control-card {
  padding: 20px;
}

.concurrency-control-card__title,
.concurrency-control-panel__title,
.concurrency-control-section__title {
  color: #17202a;
}

.concurrency-control-card__title {
  margin-top: 8px;
  font-size: 19px;
  line-height: 1.35;
  font-weight: 600;
}

.concurrency-control-card__text {
  margin-top: 10px;
}

.concurrency-control-section {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.concurrency-control-section__head {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
}

.concurrency-control-section__title {
  margin-top: 8px;
  font-size: 28px;
  line-height: 1.2;
  font-weight: 600;
  letter-spacing: -0.03em;
}

.concurrency-control-stack {
  display: grid;
  gap: 16px;
}

.concurrency-control-panel {
  padding: 24px;
}

.concurrency-control-panel.is-wide {
  padding: 26px;
}

.concurrency-control-method__head {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 12px;
}

.concurrency-control-method__tag {
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

.concurrency-control-panel__title {
  margin-top: 8px;
  font-size: 24px;
  line-height: 1.28;
  font-weight: 600;
}

.concurrency-control-panel__text {
  margin-top: 14px;
}

.concurrency-control-method__grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 14px;
  margin-top: 18px;
}

.concurrency-control-code-block {
  margin-top: 18px;
}

.concurrency-control-columns {
  grid-template-columns: repeat(3, minmax(0, 1fr));
}

@media (max-width: 1100px) {
  .concurrency-control-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .concurrency-control-columns,
  .concurrency-control-method__grid,
  .concurrency-control-hero {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 720px) {
  .concurrency-control-page {
    padding: 18px;
  }

  .concurrency-control-grid {
    grid-template-columns: 1fr;
  }

  .concurrency-control-hero,
  .concurrency-control-card,
  .concurrency-control-panel {
    padding: 18px;
  }

  .concurrency-control-hero__title {
    font-size: 32px;
  }

  .concurrency-control-section__title {
    font-size: 22px;
  }
}
</style>
