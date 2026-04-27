<template>
  <section class="worker-guide-page">
    <div class="worker-guide-page__shell">
      <div class="worker-guide-page__top">
        <RouterLink
          to="/fullstack-guide"
          class="worker-guide-page__back"
          aria-label="返回全栈能力菜单"
          title="返回全栈能力菜单"
        >
          <el-icon :size="18"><ArrowLeft /></el-icon>
        </RouterLink>
      </div>

      <div class="worker-guide-page__content">
        <header class="worker-guide-hero">
          <div>
            <p class="worker-guide-hero__eyebrow">Frontend Web Worker</p>
            <h1 class="worker-guide-hero__title">
              前端 Web Worker 与多线程能力
            </h1>
            <p class="worker-guide-hero__summary">
              这一页按真实项目引入 Web Worker
              的顺序来讲：先判断是不是主线程瓶颈，再拆分消息协议、任务调度、取消机制、错误处理和产物集成。重点不是把代码丢进
              worker，而是让大计算、解析、压缩和导出这类重任务真正脱离主线程，同时保持可维护。
            </p>
          </div>

          <div class="worker-guide-hero__panel">
            <p class="worker-guide-hero__label">学完结果</p>
            <ul class="worker-guide-list">
              <li>
                能判断什么任务应该放进 Web Worker，什么任务留在主线程更合理。
              </li>
              <li>
                能设计任务消息协议、取消机制和错误回传，避免 worker 变成黑盒。
              </li>
              <li>
                能把导出、解析、搜索和批处理等重任务做成稳定的多线程能力模块。
              </li>
            </ul>
          </div>
        </header>

        <section class="worker-guide-grid">
          <article
            v-for="item in quickStages"
            :key="item.order"
            class="worker-guide-card"
          >
            <p class="worker-guide-card__eyebrow">Stage {{ item.order }}</p>
            <h2 class="worker-guide-card__title">{{ item.title }}</h2>
            <p class="worker-guide-card__text">{{ item.summary }}</p>
          </article>
        </section>

        <section class="worker-guide-section">
          <div class="worker-guide-section__head">
            <div>
              <p class="worker-guide-section__eyebrow">Decision Order</p>
              <h2 class="worker-guide-section__title">
                多线程先找主线程瓶颈，再建立任务协议与调度闭环
              </h2>
            </div>
          </div>

          <div class="worker-guide-stack">
            <article
              v-for="stage in guideStages"
              :key="stage.order"
              class="worker-guide-panel is-wide"
            >
              <div class="worker-guide-method__head">
                <div>
                  <p class="worker-guide-panel__eyebrow">
                    Stage {{ stage.order }}
                  </p>
                  <h3 class="worker-guide-panel__title">{{ stage.title }}</h3>
                </div>
                <span class="worker-guide-method__tag">{{ stage.tag }}</span>
              </div>

              <p class="worker-guide-panel__text">{{ stage.description }}</p>

              <div class="worker-guide-method__grid">
                <section class="worker-guide-mini-panel">
                  <p class="worker-guide-mini-panel__title">适用场景</p>
                  <ul class="worker-guide-list">
                    <li v-for="item in stage.bestFor" :key="item">
                      {{ item }}
                    </li>
                  </ul>
                </section>

                <section class="worker-guide-mini-panel">
                  <p class="worker-guide-mini-panel__title">实现重点</p>
                  <ul class="worker-guide-list">
                    <li v-for="item in stage.focus" :key="item">
                      {{ item }}
                    </li>
                  </ul>
                </section>

                <section class="worker-guide-mini-panel">
                  <p class="worker-guide-mini-panel__title">常见误区</p>
                  <ul class="worker-guide-list">
                    <li v-for="item in stage.risks" :key="item">
                      {{ item }}
                    </li>
                  </ul>
                </section>
              </div>

              <AppCodeBlock
                class="worker-guide-code-block"
                :code="stage.code"
                :lang="stage.language"
              />
            </article>
          </div>
        </section>

        <section class="worker-guide-section">
          <div class="worker-guide-section__head">
            <div>
              <p class="worker-guide-section__eyebrow">Comparison</p>
              <h2 class="worker-guide-section__title">
                Web Worker 最容易做错的几组取舍
              </h2>
            </div>
          </div>

          <div class="worker-guide-columns">
            <article
              v-for="item in comparisonCards"
              :key="item.title"
              class="worker-guide-panel"
            >
              <h3 class="worker-guide-panel__title">{{ item.title }}</h3>
              <p class="worker-guide-panel__text">{{ item.summary }}</p>
            </article>
          </div>
        </section>

        <section class="worker-guide-section">
          <div class="worker-guide-section__head">
            <div>
              <p class="worker-guide-section__eyebrow">Checklist</p>
              <h2 class="worker-guide-section__title">
                一套能落地的前端多线程建设清单
              </h2>
            </div>
          </div>

          <article class="worker-guide-panel is-wide">
            <ul class="worker-guide-list">
              <li>
                先用性能分析确认卡顿来自计算或解析，而不是无意义地把任何逻辑都塞进
                worker。
              </li>
              <li>
                任务消息必须有 `type`、`taskId`、`payload`
                和错误返回格式，别直接传散乱对象。
              </li>
              <li>
                长任务要支持取消、超时和进度回传，否则页面状态会越来越难收。
              </li>
              <li>
                注意结构化拷贝成本，大对象频繁跨线程传输时要评估 `Transferable`
                方案。
              </li>
              <li>
                worker 不是性能魔法，它解决的是主线程阻塞，不负责优化无效算法。
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
    title: '先确认是不是主线程问题',
    summary:
      '页面卡顿、输入掉帧、导出阻塞，先确认瓶颈是计算密集还是渲染、网络、DOM 更新。',
  },
  {
    order: '02',
    title: '把任务协议定义清楚',
    summary: 'worker 不是函数调用，消息格式、返回值、错误和取消都要事先设计。',
  },
  {
    order: '03',
    title: '把大任务拆成可调度单元',
    summary:
      '解析、压缩、搜索、导出要能拆批，否则单个 worker 一样可能长时间卡住。',
  },
  {
    order: '04',
    title: '跨线程传输也有成本',
    summary:
      '传大对象不是免费的，结构化拷贝和内存复制很容易吃掉你刚省下来的收益。',
  },
  {
    order: '05',
    title: '把 worker 当能力层治理',
    summary:
      '最终目标不是多开几个线程，而是形成稳定的任务执行、观测和回收机制。',
  },
];

const guideStages = [
  {
    order: '01',
    title: '先判断这是不是适合 Web Worker 的任务，而不是把任何逻辑都迁过去',
    tag: '问题建模',
    description:
      'Web Worker 适合 CPU 密集或长时间占用主线程的任务，例如大 JSON 解析、全文检索、文件哈希、图片压缩、报表导出、坐标计算和复杂格式转换。如果问题主要来自 DOM 重排、组件重复渲染或接口慢，worker 基本帮不上忙。先用浏览器 Performance 看主线程火焰图，再决定要不要做多线程，这一步能避免大量无效工程。',
    bestFor: ['文件导出', '图片处理', '大数据解析', '地图与图形计算'],
    focus: [
      '先定位阻塞是否来自 JavaScript 长任务',
      '把 CPU 计算型任务与 DOM 渲染型问题分开',
      '只把重计算和重解析任务迁出主线程',
    ],
    risks: [
      '接口慢也想靠 worker 解决',
      'DOM 操作直接搬进 worker',
      '没有性能证据就先做复杂改造',
    ],
    language: 'text',
    code: `Worker Suitability
- 长时间纯计算
- 大文件解析与转换
- 搜索索引构建
- 图片压缩与哈希
- 不适合: DOM 更新、简单请求转发、微小任务`,
  },
  {
    order: '02',
    title: '消息协议必须标准化，不要把 worker 做成只能猜参数的黑盒',
    tag: '通信协议',
    description:
      '主线程和 worker 的关系更像两个进程通信。真正可维护的写法，一定会定义统一协议，例如任务类型、任务编号、负载体、进度消息、成功消息和错误消息。如果今天传字符串，明天传半结构化对象，后面你一旦要加取消、重试、并发和日志，整个系统会迅速失控。',
    bestFor: ['多人协作项目', '可扩展任务系统', '需要监控和调试的场景'],
    focus: [
      '统一 message type 与返回格式',
      '每个任务带 taskId 方便追踪与取消',
      '把 progress、result、error 拆成稳定语义',
    ],
    risks: [
      '消息没有类型字段',
      '主线程和 worker 各写各的对象结构',
      '错误只输出 console 不回传业务层',
    ],
    language: 'ts',
    code: `type WorkerRequest =
  | { type: 'build-index'; taskId: string; payload: { rows: string[] } }
  | { type: 'cancel'; taskId: string }

type WorkerResponse =
  | { type: 'progress'; taskId: string; value: number }
  | { type: 'success'; taskId: string; payload: unknown }
  | { type: 'error'; taskId: string; message: string }`,
  },
  {
    order: '03',
    title: '长任务要支持取消、超时和分批执行，否则 worker 只是把阻塞换了个地方',
    tag: '任务调度',
    description:
      '很多人把计算丢进 worker 后就觉得结束了，但真实项目里，用户会关闭弹窗、切换页面、重新上传文件、再次发起导出。如果任务没有取消能力，旧任务会继续跑、继续占内存、继续回写过期结果。更稳的做法是让每个任务都能取消，并且对超长任务做分批和时间片，让线程生命周期可控。',
    bestFor: ['可重复发起的导出任务', '搜索索引构建', '文件上传预处理'],
    focus: [
      '维护任务映射表和取消状态',
      '支持超时、重入保护和过期结果丢弃',
      '大任务拆成 chunk 逐步处理并上报进度',
    ],
    risks: [
      '用户取消后 worker 还在跑',
      '重复点击触发多个同类任务竞争',
      '旧任务完成后覆盖新任务结果',
    ],
    language: 'ts',
    code: `const pendingTasks = new Map<string, AbortController>()

function runExportTask(file: File) {
  const taskId = crypto.randomUUID()
  const controller = new AbortController()
  pendingTasks.set(taskId, controller)

  worker.postMessage({
    type: 'export-report',
    taskId,
    payload: { file },
  })

  return () => {
    controller.abort()
    worker.postMessage({ type: 'cancel', taskId })
  }
}`,
  },
  {
    order: '04',
    title: '跨线程传输要考虑结构化拷贝成本，大对象场景优先评估 Transferable',
    tag: '性能细节',
    description:
      'worker 不是没有成本。默认 `postMessage` 会做结构化拷贝，大数组、大图片、大二进制缓冲频繁来回传输时，复制本身就可能很贵。对于 `ArrayBuffer`、`MessagePort` 这类可转移对象，应该优先考虑 `Transferable` 方案，把所有权移交给 worker，减少复制成本。否则你可能把计算加速了，却被数据搬运拖慢。',
    bestFor: ['图片压缩', '音视频处理', '大二进制解析', '地图瓦片预处理'],
    focus: [
      '识别哪些负载是大对象和高频传输',
      '优先对 ArrayBuffer 等对象使用 transferable',
      '评估内存峰值和线程间复制成本',
    ],
    risks: [
      '把超大对象反复 postMessage',
      '不理解 transferable 导致重复复制',
      '只看单次耗时，不看总内存开销',
    ],
    language: 'ts',
    code: `const buffer = await file.arrayBuffer()

worker.postMessage(
  {
    type: 'compress-image',
    taskId,
    payload: { buffer },
  },
  [buffer],
)`,
  },
  {
    order: '05',
    title: '最终要把 Web Worker 抽成基础能力层，而不是散落在页面里的临时技巧',
    tag: '工程落地',
    description:
      '如果你的页面里到处都是 `new Worker()`，那这个能力后面一定会失控。更好的做法是抽出统一的 worker runtime：负责创建实例、任务派发、超时回收、错误日志、并发上限和页面销毁后的清理。业务页面只应该声明“我要执行什么任务”，而不是直接处理线程细节。这样上传、导出、搜索、AI 预处理都能复用一套执行底座。',
    bestFor: ['中后台复杂页面', '多功能编辑器', '需要长期扩展的应用'],
    focus: [
      '封装 worker manager 统一调度',
      '控制并发上限和实例复用策略',
      '把埋点、异常和资源回收纳入运行时层',
    ],
    risks: [
      '每个页面自己 new Worker',
      '路由切走后线程和监听器没清理',
      '没有统一观测导致问题难排查',
    ],
    language: 'ts',
    code: `class WorkerManager {
  private worker = new Worker(new URL('./app.worker.ts', import.meta.url), {
    type: 'module',
  })

  execute<T>(request: WorkerRequest) {
    return new Promise<T>((resolve, reject) => {
      this.worker.postMessage(request)
      // 统一处理 success / error / progress
    })
  }
}`,
  },
];

const comparisonCards = [
  {
    title: '主线程优化 vs 引入 Worker',
    summary:
      '优先级应该先是减少无效渲染、降低算法复杂度，再考虑 worker。worker 解决的是阻塞，不是替代基础优化。',
  },
  {
    title: '直接 postMessage vs 标准任务协议',
    summary:
      '前者上手快但扩展性差；后者前期多写一点，却能支撑取消、进度、日志和多人协作。',
  },
  {
    title: '单次加速 vs 长期治理',
    summary:
      '一次把压缩逻辑丢进 worker 只能解决当前卡顿；把任务调度层做稳，后续搜索、导出、AI 预处理都能复用。',
  },
];
</script>

<style scoped>
.worker-guide-page {
  min-height: calc(100vh - 40px);
  padding: 32px;
  background:
    radial-gradient(
      circle at top right,
      rgba(218, 225, 232, 0.45),
      transparent 28%
    ),
    linear-gradient(180deg, #fbfcfd 0%, #f2f5f8 100%);
  box-shadow: 0 30px 80px rgba(18, 26, 34, 0.08);
}

.worker-guide-page__shell {
  min-height: calc(100vh - 90px);
  border: 1px solid rgba(19, 27, 34, 0.06);
  border-radius: 7px;
  background: rgba(255, 255, 255, 0.82);
}

.worker-guide-page__top {
  display: flex;
  justify-content: flex-start;
  padding: 18px 18px 0;
}

.worker-guide-page__back {
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

.worker-guide-page__back:hover {
  transform: translateY(-1px);
  border-color: rgba(46, 70, 91, 0.18);
  box-shadow: 0 18px 34px rgba(19, 27, 34, 0.08);
}

.worker-guide-page__content {
  padding: 18px 24px 24px;
}

.worker-guide-hero {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 320px;
  gap: 20px;
  padding-bottom: 26px;
  border-bottom: 1px solid rgba(19, 27, 34, 0.08);
}

.worker-guide-hero__eyebrow,
.worker-guide-section__eyebrow,
.worker-guide-card__eyebrow,
.worker-guide-hero__label {
  font-size: 11px;
  line-height: 1.4;
  letter-spacing: 0.24em;
  text-transform: uppercase;
  color: #7b8793;
}

.worker-guide-hero__title {
  margin-top: 10px;
  font-size: 46px;
  line-height: 1.06;
  font-weight: 600;
  letter-spacing: -0.05em;
  color: #17202a;
}

.worker-guide-hero__summary {
  max-width: 860px;
  margin-top: 16px;
  font-size: 15px;
  line-height: 1.9;
  color: #58636f;
}

.worker-guide-hero__panel,
.worker-guide-card,
.worker-guide-panel {
  border: 1px solid rgba(19, 27, 34, 0.08);
  border-radius: 7px;
  background: rgba(255, 255, 255, 0.84);
}

.worker-guide-hero__panel {
  padding: 18px;
}

.worker-guide-list {
  display: grid;
  gap: 8px;
  margin: 12px 0 0;
  padding-left: 18px;
  font-size: 14px;
  line-height: 1.8;
  color: #56616d;
}

.worker-guide-grid,
.worker-guide-columns,
.worker-guide-stack {
  display: grid;
  gap: 16px;
}

.worker-guide-grid {
  margin-top: 28px;
  grid-template-columns: repeat(3, minmax(0, 1fr));
}

.worker-guide-card {
  padding: 18px;
}

.worker-guide-card__title,
.worker-guide-panel__title,
.worker-guide-section__title {
  color: #17202a;
}

.worker-guide-card__title {
  margin-top: 10px;
  font-size: 22px;
  line-height: 1.25;
  font-weight: 600;
}

.worker-guide-card__text,
.worker-guide-panel__text {
  margin-top: 12px;
  font-size: 14px;
  line-height: 1.9;
  color: #596571;
}

.worker-guide-section {
  margin-top: 28px;
}

.worker-guide-section__head {
  margin-bottom: 14px;
}

.worker-guide-section__title {
  margin-top: 8px;
  font-size: 30px;
  line-height: 1.18;
  font-weight: 600;
  letter-spacing: -0.03em;
}

.worker-guide-columns {
  grid-template-columns: repeat(3, minmax(0, 1fr));
}

.worker-guide-stack {
  grid-template-columns: repeat(2, minmax(0, 1fr));
}

.worker-guide-panel {
  padding: 18px;
}

.worker-guide-panel.is-wide {
  grid-column: 1 / -1;
}

.worker-guide-panel__eyebrow {
  font-size: 11px;
  line-height: 1.4;
  letter-spacing: 0.24em;
  text-transform: uppercase;
  color: #80909d;
}

.worker-guide-panel__title {
  font-size: 20px;
  line-height: 1.3;
  font-weight: 600;
}

.worker-guide-method__head {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 16px;
}

.worker-guide-method__tag {
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

.worker-guide-method__grid {
  display: grid;
  gap: 14px;
  margin-top: 16px;
  grid-template-columns: repeat(3, minmax(0, 1fr));
}

.worker-guide-mini-panel {
  padding: 14px;
  border: 1px solid rgba(19, 27, 34, 0.08);
  border-radius: 7px;
  background: rgba(245, 248, 250, 0.9);
}

.worker-guide-mini-panel__title {
  font-size: 14px;
  font-weight: 600;
  color: #17202a;
}

.worker-guide-code-block {
  margin-top: 14px;
}

@media (max-width: 1080px) {
  .worker-guide-hero,
  .worker-guide-grid,
  .worker-guide-columns,
  .worker-guide-stack,
  .worker-guide-method__grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 900px) {
  .worker-guide-page {
    min-height: auto;
    padding: 18px;
  }

  .worker-guide-page__shell {
    min-height: auto;
  }

  .worker-guide-page__content {
    padding: 18px;
  }

  .worker-guide-hero__title {
    font-size: 36px;
  }

  .worker-guide-section__title {
    font-size: 26px;
  }
}
</style>
