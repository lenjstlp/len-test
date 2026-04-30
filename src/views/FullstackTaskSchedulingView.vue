<template>
  <section class="task-scheduling-guide-page">
    <div class="task-scheduling-guide-page__shell">
      <div class="task-scheduling-guide-page__top">
        <RouterLink
          to="/fullstack-guide"
          class="task-scheduling-guide-page__back"
          aria-label="返回全栈能力菜单"
          title="返回全栈能力菜单"
        >
          <el-icon :size="18"><ArrowLeft /></el-icon>
        </RouterLink>
      </div>

      <div class="task-scheduling-guide-page__content">
        <header class="task-scheduling-guide-hero">
          <div>
            <p class="task-scheduling-guide-hero__eyebrow">
              Frontend Task Scheduling Engineering
            </p>
            <h1 class="task-scheduling-guide-hero__title">
              前端任务调度工程能力
            </h1>
            <p class="task-scheduling-guide-hero__summary">
              前端任务调度不是一句“防抖节流”就能概括。真正的工程问题是：当渲染、请求、动画、埋点、搜索建议、编辑器计算和大数据量列表同时抢主线程时，你怎样给任务分级、拆批、让渡执行权，并在交互流畅和业务完整之间拿到稳定结果。
            </p>
          </div>

          <div class="task-scheduling-guide-hero__panel">
            <p class="task-scheduling-guide-hero__label">学完结果</p>
            <ul class="task-scheduling-guide-list">
              <li>能分清宏任务、微任务、渲染阶段和空闲调度的职责边界。</li>
              <li>能设计高优任务抢占、低优任务延后和大任务拆分方案。</li>
              <li>能在编辑器、可视化、搜索和工作台场景中做稳定调度治理。</li>
            </ul>
          </div>
        </header>

        <section class="task-scheduling-guide-grid">
          <article
            v-for="item in quickStages"
            :key="item.order"
            class="task-scheduling-guide-card"
          >
            <p class="task-scheduling-guide-card__eyebrow">
              Stage {{ item.order }}
            </p>
            <h2 class="task-scheduling-guide-card__title">{{ item.title }}</h2>
            <p class="task-scheduling-guide-card__text">{{ item.summary }}</p>
          </article>
        </section>

        <section class="task-scheduling-guide-section">
          <div class="task-scheduling-guide-section__head">
            <div>
              <p class="task-scheduling-guide-section__eyebrow">Build Order</p>
              <h2 class="task-scheduling-guide-section__title">
                先识别主线程压力源，再做优先级、分片执行与降载策略
              </h2>
            </div>
          </div>

          <div class="task-scheduling-guide-stack">
            <article
              v-for="stage in guideStages"
              :key="stage.order"
              class="task-scheduling-guide-panel is-wide"
            >
              <div class="task-scheduling-guide-method__head">
                <div>
                  <p class="task-scheduling-guide-panel__eyebrow">
                    Stage {{ stage.order }}
                  </p>
                  <h3 class="task-scheduling-guide-panel__title">
                    {{ stage.title }}
                  </h3>
                </div>
                <span class="task-scheduling-guide-method__tag">{{
                  stage.tag
                }}</span>
              </div>

              <p class="task-scheduling-guide-panel__text">
                {{ stage.description }}
              </p>

              <div class="task-scheduling-guide-method__grid">
                <section class="task-scheduling-guide-mini-panel">
                  <p class="task-scheduling-guide-mini-panel__title">
                    适用场景
                  </p>
                  <ul class="task-scheduling-guide-list">
                    <li v-for="item in stage.bestFor" :key="item">
                      {{ item }}
                    </li>
                  </ul>
                </section>

                <section class="task-scheduling-guide-mini-panel">
                  <p class="task-scheduling-guide-mini-panel__title">
                    实现重点
                  </p>
                  <ul class="task-scheduling-guide-list">
                    <li v-for="item in stage.focus" :key="item">
                      {{ item }}
                    </li>
                  </ul>
                </section>

                <section class="task-scheduling-guide-mini-panel">
                  <p class="task-scheduling-guide-mini-panel__title">
                    常见误区
                  </p>
                  <ul class="task-scheduling-guide-list">
                    <li v-for="item in stage.risks" :key="item">
                      {{ item }}
                    </li>
                  </ul>
                </section>
              </div>

              <AppCodeBlock
                class="task-scheduling-guide-code-block"
                :code="stage.code"
                :lang="stage.language"
              />
            </article>
          </div>
        </section>

        <section class="task-scheduling-guide-section">
          <div class="task-scheduling-guide-section__head">
            <div>
              <p class="task-scheduling-guide-section__eyebrow">Comparison</p>
              <h2 class="task-scheduling-guide-section__title">
                任务调度里最容易混淆的几组概念
              </h2>
            </div>
          </div>

          <div class="task-scheduling-guide-columns">
            <article
              v-for="item in comparisonCards"
              :key="item.title"
              class="task-scheduling-guide-panel"
            >
              <h3 class="task-scheduling-guide-panel__title">
                {{ item.title }}
              </h3>
              <p class="task-scheduling-guide-panel__text">
                {{ item.summary }}
              </p>
            </article>
          </div>
        </section>

        <section class="task-scheduling-guide-section">
          <div class="task-scheduling-guide-section__head">
            <div>
              <p class="task-scheduling-guide-section__eyebrow">Checklist</p>
              <h2 class="task-scheduling-guide-section__title">
                一套能落地的前端任务调度工程建设清单
              </h2>
            </div>
          </div>

          <article class="task-scheduling-guide-panel is-wide">
            <ul class="task-scheduling-guide-list">
              <li>
                先找出真正占主线程的任务，再决定该拆分、延后还是移出主线程。
              </li>
              <li>
                为不同任务定义优先级，不要让埋点、预加载和输入响应抢同一资源。
              </li>
              <li>长任务必须分片执行，并在批次之间让出渲染机会。</li>
              <li>
                调度体系要和监控联动，能看到长任务、丢帧和交互延迟的真实指标。
              </li>
              <li>
                复杂场景优先用策略表治理，而不是在业务组件里到处塞 setTimeout。
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
    title: '先识别阻塞源',
    summary:
      '任务调度不是凭感觉优化，先定位到底是渲染、计算、请求回流还是序列化在拖慢主线程。',
  },
  {
    order: '02',
    title: '建立任务优先级',
    summary:
      '输入响应、动画更新、视口内渲染、后台统计和预取不能同优先级处理，否则关键交互会被杂务抢占。',
  },
  {
    order: '03',
    title: '长任务必须拆批',
    summary:
      '只要单次执行时间过长，就要考虑分片、让渡和中断恢复，不然页面一定掉帧。',
  },
  {
    order: '04',
    title: '空闲时间用来补尾活',
    summary:
      '预加载、低优数据整理和本地持久化更适合放进空闲窗口，而不是争抢用户交互时段。',
  },
  {
    order: '05',
    title: '调度要可观测',
    summary:
      '没有指标的调度就是猜，至少要看长任务数量、帧预算、交互延迟和任务队列积压情况。',
  },
];

const guideStages = [
  {
    order: '01',
    title: '建立任务分类和优先级模型',
    tag: 'Priority First',
    description:
      '真正的任务调度第一步不是写调度器，而是先给任务分型。通常至少区分输入响应、渲染相关、数据请求、后台统计、缓存持久化和预加载。只有优先级模型先定下来，后面才能知道哪些任务该立即执行，哪些任务该等待或取消。',
    bestFor: [
      '中后台工作台同时承载图表、表格、筛选和编辑场景',
      '富文本、低代码、地图可视化等重交互应用',
      '存在大量异步副作用和跨组件协作的复杂前端系统',
    ],
    focus: [
      '把任务映射成 immediate、user-blocking、normal、background 等层级',
      '为每类任务定义可取消、可合并、可重试的行为约束',
      '把业务任务和浏览器执行窗口之间建立清晰映射',
    ],
    risks: [
      '所有任务共用一个队列，最终一定是高优体验被低优杂务拖垮',
      '没有定义取消策略，过期任务仍然持续占用主线程',
      '把优先级写死在组件细节里，后期几乎无法统一治理',
    ],
    language: 'ts',
    code: `type TaskPriority =
  | 'immediate'
  | 'user-blocking'
  | 'normal'
  | 'background';

interface ScheduledTask {
  id: string;
  priority: TaskPriority;
  run: () => Promise<void> | void;
  dedupeKey?: string;
  abortController?: AbortController;
}

const priorityWeight: Record<TaskPriority, number> = {
  immediate: 0,
  'user-blocking': 1,
  normal: 2,
  background: 3,
};

const sortTasks = (tasks: ScheduledTask[]) =>
  tasks.sort((a, b) => priorityWeight[a.priority] - priorityWeight[b.priority]);`,
  },
  {
    order: '02',
    title: '对长任务做分片执行',
    tag: 'Chunking',
    description:
      '大数据遍历、复杂 diff、筛选聚合和批量布局一旦单次连续执行，就会吃满一整段帧预算。工程化做法是切批处理，在批次之间主动让出主线程，把长任务变成一组可恢复的小任务。',
    bestFor: [
      '大列表筛选、搜索建议、本地索引构建',
      '编辑器语法高亮、差异计算、画布批量节点计算',
      '需要在不中断交互前提下完成较重运算的场景',
    ],
    focus: [
      '按批次大小或时间预算切分任务',
      '每一批执行后让出执行权，允许浏览器先处理输入和渲染',
      '支持中途取消和基于新输入重建任务',
    ],
    risks: [
      '为了快而一次性跑完整段逻辑，最后用户输入完全卡死',
      '只做简单 setTimeout 分割，却不处理取消和过期结果',
      '分批太细导致调度开销过高，吞吐反而下降',
    ],
    language: 'ts',
    code: `const nextFrame = () =>
  new Promise<void>((resolve) => requestAnimationFrame(() => resolve()));

const processInChunks = async <T>(
  list: T[],
  handler: (item: T, index: number) => void,
  chunkSize = 100,
) => {
  for (let index = 0; index < list.length; index += chunkSize) {
    const chunk = list.slice(index, index + chunkSize);

    chunk.forEach((item, innerIndex) => {
      handler(item, index + innerIndex);
    });

    await nextFrame();
  }
};`,
  },
  {
    order: '03',
    title: '把低优任务放入空闲窗口',
    tag: 'Idle Work',
    description:
      '不是所有任务都要立刻做。预拉取、序列化缓存、非关键埋点、二级面板预计算，适合放进空闲窗口执行。这样不会和用户当前交互抢主线程。前提是你要接受它们可能被延后，甚至在繁忙阶段根本没有执行机会。',
    bestFor: [
      '页面预热、次级资源预取、缓存写入',
      '非关键埋点上报和本地数据整理',
      '首页首屏后再逐步补齐增强体验的场景',
    ],
    focus: [
      '兼容 requestIdleCallback 不可用时的降级方案',
      '为空闲任务设置超时，避免长期饥饿',
      '空闲任务失败时不要影响关键路径交互',
    ],
    risks: [
      '把关键任务也丢进空闲队列，结果用户始终看不到数据',
      '没有超时兜底，低优任务在忙碌页面永远不执行',
      '空闲任务内部又发起重计算，把让出来的收益全部吃掉',
    ],
    language: 'ts',
    code: `const scheduleIdleTask = (callback: () => void, timeout = 1500) => {
  if ('requestIdleCallback' in window) {
    return window.requestIdleCallback(
      () => {
        callback();
      },
      { timeout },
    );
  }

  return window.setTimeout(callback, 32);
};

scheduleIdleTask(() => {
  warmupSearchIndex();
  persistDraftSnapshot();
});`,
  },
  {
    order: '04',
    title: '让过期任务可取消、可合并',
    tag: 'Abortable',
    description:
      '搜索联想、远程筛选、地图视野变化和表单联动这类场景，最怕旧任务比新任务晚回来，把界面回滚到过时状态。这里必须把任务做成可取消、可去重、可丢弃，让系统只保留最新意图。',
    bestFor: [
      '输入驱动的请求型交互，如搜索建议、筛选联动',
      '视野频繁变化的可视化和地图系统',
      '用户连续拖拽、连续输入导致任务快速堆积的页面',
    ],
    focus: [
      '新任务到来时取消旧任务或标记旧结果失效',
      '通过 dedupeKey 合并同类后台任务',
      '只提交最后一次有效计算结果，避免界面抖动回滚',
    ],
    risks: [
      '旧请求没有中止能力，最后显示的是过期结果',
      '每次输入都发全套请求和计算，队列很快爆满',
      '只做防抖，不做取消，仍然会出现回包覆盖问题',
    ],
    language: 'ts',
    code: `class TaskManager {
  private running = new Map<string, AbortController>();

  run(key: string, task: (signal: AbortSignal) => Promise<void>) {
    this.running.get(key)?.abort();

    const controller = new AbortController();
    this.running.set(key, controller);

    return task(controller.signal).finally(() => {
      if (this.running.get(key) === controller) {
        this.running.delete(key);
      }
    });
  }
}

const taskManager = new TaskManager();

taskManager.run('search-suggestion', async (signal) => {
  const result = await fetchSuggestion(keyword.value, { signal });
  suggestionStore.replace(result);
});`,
  },
  {
    order: '05',
    title: '把调度策略接入监控与治理',
    tag: 'Observable',
    description:
      '任务调度一旦上了规模，不监控就等于没治理。你需要知道哪些操作产生了长任务、哪类任务最容易积压、哪些页面最常掉帧。只有把调度策略和性能监控打通，后续才能根据真实数据继续调整优先级与阈值。',
    bestFor: [
      '多业务团队共享同一前端底座的系统',
      '复杂交互页上线后需要持续治理性能回归',
      '需要给架构层提供统一调度规范和告警能力的团队',
    ],
    focus: [
      '记录长任务持续时间、任务来源、页面上下文和优先级',
      '把调度失败、取消率和积压时长接入监控平台',
      '基于指标反推 chunkSize、并发上限和任务配额',
    ],
    risks: [
      '只在本地感觉顺滑，线上真实设备上仍然长任务频发',
      '没有来源标记，查到卡顿也不知道是谁触发的',
      '调度层不提供观测点，问题只能靠人工猜测',
    ],
    language: 'ts',
    code: `const reportScheduledTask = (payload: {
  name: string;
  priority: TaskPriority;
  duration: number;
  page: string;
}) => {
  performanceReporter.track('scheduled_task', payload);
};

const measureTask = async (name: string, priority: TaskPriority, run: () => Promise<void>) => {
  const start = performance.now();
  await run();
  reportScheduledTask({
    name,
    priority,
    duration: performance.now() - start,
    page: location.pathname,
  });
};`,
  },
];

const comparisonCards = [
  {
    title: '防抖节流 vs 任务调度',
    summary:
      '防抖节流解决的是触发频率控制，任务调度解决的是执行顺序、优先级和资源分配。前者只是入口限流，后者才是运行时治理。',
  },
  {
    title: 'Web Worker vs 主线程分片',
    summary:
      'Web Worker 适合纯计算和可序列化任务，主线程分片更适合仍然依赖 DOM、布局或同步状态的逻辑。不是所有重任务都能直接扔进 Worker。',
  },
  {
    title: '空闲执行 vs 延迟执行',
    summary:
      '空闲执行强调利用浏览器空档，延迟执行只是简单往后推。前者更关注不打扰关键交互，后者可能只是把问题换个时间爆发。',
  },
];
</script>

<style scoped>
.task-scheduling-guide-page {
  min-height: calc(100vh - 40px);
}

.task-scheduling-guide-page__shell {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.task-scheduling-guide-page__top {
  display: flex;
  align-items: center;
}

.task-scheduling-guide-page__back {
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

.task-scheduling-guide-page__back:hover {
  transform: translateY(-1px);
  border-color: rgba(43, 72, 101, 0.2);
  box-shadow: 0 18px 36px rgba(17, 24, 39, 0.08);
}

.task-scheduling-guide-page__content {
  display: flex;
  flex-direction: column;
  gap: 22px;
}

.task-scheduling-guide-hero,
.task-scheduling-guide-panel,
.task-scheduling-guide-card {
  border: 1px solid rgba(19, 27, 34, 0.08);
  border-radius: 7px;
  background: #fff;
  box-shadow: 0 24px 60px rgba(15, 23, 42, 0.05);
}

.task-scheduling-guide-hero {
  display: grid;
  grid-template-columns: minmax(0, 1.6fr) minmax(260px, 0.8fr);
  gap: 20px;
  padding: 28px;
}

.task-scheduling-guide-hero__eyebrow,
.task-scheduling-guide-section__eyebrow,
.task-scheduling-guide-card__eyebrow,
.task-scheduling-guide-panel__eyebrow,
.task-scheduling-guide-hero__label,
.task-scheduling-guide-method__tag,
.task-scheduling-guide-mini-panel__title {
  font-size: 11px;
  line-height: 1.4;
  letter-spacing: 0.24em;
  text-transform: uppercase;
  color: #7b8794;
}

.task-scheduling-guide-hero__title {
  margin-top: 10px;
  font-size: 42px;
  line-height: 1.08;
  font-weight: 600;
  letter-spacing: -0.04em;
  color: #16202a;
}

.task-scheduling-guide-hero__summary {
  margin-top: 16px;
  max-width: 820px;
  font-size: 15px;
  line-height: 1.9;
  color: #52606d;
}

.task-scheduling-guide-hero__panel {
  align-self: stretch;
  padding: 22px;
  border: 1px solid rgba(19, 27, 34, 0.08);
  border-radius: 7px;
  background: linear-gradient(180deg, #fbfcfd 0%, #f4f7fa 100%);
}

.task-scheduling-guide-grid {
  display: grid;
  grid-template-columns: repeat(5, minmax(0, 1fr));
  gap: 16px;
}

.task-scheduling-guide-card {
  padding: 20px;
}

.task-scheduling-guide-card__title,
.task-scheduling-guide-panel__title,
.task-scheduling-guide-section__title {
  color: #16202a;
}

.task-scheduling-guide-card__title {
  margin-top: 10px;
  font-size: 20px;
  line-height: 1.35;
  font-weight: 600;
}

.task-scheduling-guide-card__text,
.task-scheduling-guide-panel__text,
.task-scheduling-guide-list {
  font-size: 14px;
  line-height: 1.9;
  color: #52606d;
}

.task-scheduling-guide-section {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.task-scheduling-guide-section__head {
  display: flex;
  align-items: end;
  justify-content: space-between;
  gap: 16px;
}

.task-scheduling-guide-section__title {
  margin-top: 8px;
  font-size: 28px;
  line-height: 1.25;
  font-weight: 600;
  letter-spacing: -0.03em;
}

.task-scheduling-guide-stack,
.task-scheduling-guide-columns {
  display: grid;
  gap: 16px;
}

.task-scheduling-guide-columns {
  grid-template-columns: repeat(3, minmax(0, 1fr));
}

.task-scheduling-guide-panel {
  padding: 24px;
}

.task-scheduling-guide-panel.is-wide {
  padding: 26px;
}

.task-scheduling-guide-method__head {
  display: flex;
  align-items: start;
  justify-content: space-between;
  gap: 16px;
}

.task-scheduling-guide-method__tag {
  display: inline-flex;
  align-items: center;
  min-height: 32px;
  padding: 0 12px;
  border: 1px solid rgba(19, 27, 34, 0.08);
  border-radius: 999px;
  background: #f5f8fa;
}

.task-scheduling-guide-panel__text {
  margin-top: 14px;
}

.task-scheduling-guide-method__grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 14px;
  margin-top: 18px;
}

.task-scheduling-guide-mini-panel {
  padding: 18px;
  border: 1px solid rgba(19, 27, 34, 0.08);
  border-radius: 7px;
  background: linear-gradient(180deg, #fdfefe 0%, #f7fafc 100%);
}

.task-scheduling-guide-list {
  margin: 12px 0 0;
  padding-left: 18px;
}

.task-scheduling-guide-code-block {
  margin-top: 18px;
}

@media (max-width: 1180px) {
  .task-scheduling-guide-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .task-scheduling-guide-columns,
  .task-scheduling-guide-method__grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 900px) {
  .task-scheduling-guide-hero {
    grid-template-columns: 1fr;
    padding: 22px;
  }

  .task-scheduling-guide-hero__title {
    font-size: 34px;
  }

  .task-scheduling-guide-grid {
    grid-template-columns: 1fr;
  }

  .task-scheduling-guide-panel,
  .task-scheduling-guide-panel.is-wide,
  .task-scheduling-guide-card {
    padding: 20px;
  }
}
</style>
