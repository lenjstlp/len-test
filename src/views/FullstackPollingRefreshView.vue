<template>
  <section class="polling-refresh-page">
    <div class="polling-refresh-page__shell">
      <div class="polling-refresh-page__top">
        <RouterLink
          to="/fullstack-guide"
          class="polling-refresh-page__back"
          aria-label="返回全栈能力菜单"
          title="返回全栈能力菜单"
        >
          <el-icon :size="18"><ArrowLeft /></el-icon>
        </RouterLink>
      </div>

      <div class="polling-refresh-page__content">
        <header class="polling-refresh-hero">
          <div>
            <p class="polling-refresh-hero__eyebrow">
              Frontend Polling And Incremental Refresh Engineering
            </p>
            <h1 class="polling-refresh-hero__title">前端轮询与增量刷新工程</h1>
            <p class="polling-refresh-hero__summary">
              消息中心、任务面板、监控看板、审批列表经常需要“持续刷新”。但刷新并不等于无脑每
              3
              秒全量拉一次。真正的轮询工程，要解决刷新频率、页面不可见时暂停、错误退避、增量拉取、结果去重以及滚动中数据稳定性。做得好，页面实时且省资源；做不好，系统会抖、卡、乱。
            </p>
          </div>

          <div class="polling-refresh-hero__panel">
            <p class="polling-refresh-hero__label">学完结果</p>
            <ul class="polling-refresh-list">
              <li>能给不同业务场景设计合适的轮询节奏，而不是全站统一间隔。</li>
              <li>能实现可见性暂停、错误退避和增量拉取。</li>
              <li>能避免刷新覆盖用户当前操作，并保证列表数据稳定去重。</li>
            </ul>
          </div>
        </header>

        <section class="polling-refresh-grid">
          <article
            v-for="item in quickStages"
            :key="item.order"
            class="polling-refresh-card"
          >
            <p class="polling-refresh-card__eyebrow">Stage {{ item.order }}</p>
            <h2 class="polling-refresh-card__title">{{ item.title }}</h2>
            <p class="polling-refresh-card__text">{{ item.summary }}</p>
          </article>
        </section>

        <section class="polling-refresh-section">
          <div class="polling-refresh-section__head">
            <div>
              <p class="polling-refresh-section__eyebrow">Execution Order</p>
              <h2 class="polling-refresh-section__title">
                先定刷新节奏，再做增量合并与异常退避
              </h2>
            </div>
          </div>

          <div class="polling-refresh-stack">
            <article
              v-for="stage in practiceStages"
              :key="stage.order"
              class="polling-refresh-panel is-wide"
            >
              <div class="polling-refresh-method__head">
                <div>
                  <p class="polling-refresh-panel__eyebrow">
                    Stage {{ stage.order }}
                  </p>
                  <h3 class="polling-refresh-panel__title">
                    {{ stage.title }}
                  </h3>
                </div>
                <span class="polling-refresh-method__tag">{{ stage.tag }}</span>
              </div>

              <p class="polling-refresh-panel__text">{{ stage.description }}</p>

              <div class="polling-refresh-method__grid">
                <section class="polling-refresh-mini-panel">
                  <p class="polling-refresh-mini-panel__title">适用场景</p>
                  <ul class="polling-refresh-list">
                    <li v-for="item in stage.bestFor" :key="item">
                      {{ item }}
                    </li>
                  </ul>
                </section>

                <section class="polling-refresh-mini-panel">
                  <p class="polling-refresh-mini-panel__title">实现重点</p>
                  <ul class="polling-refresh-list">
                    <li v-for="item in stage.focus" :key="item">
                      {{ item }}
                    </li>
                  </ul>
                </section>

                <section class="polling-refresh-mini-panel">
                  <p class="polling-refresh-mini-panel__title">常见误区</p>
                  <ul class="polling-refresh-list">
                    <li v-for="item in stage.risks" :key="item">
                      {{ item }}
                    </li>
                  </ul>
                </section>
              </div>

              <AppCodeBlock
                class="polling-refresh-code-block"
                :code="stage.code"
                :lang="stage.language"
              />
            </article>
          </div>
        </section>

        <section class="polling-refresh-section">
          <div class="polling-refresh-section__head">
            <div>
              <p class="polling-refresh-section__eyebrow">Comparison</p>
              <h2 class="polling-refresh-section__title">常见刷新策略的差异</h2>
            </div>
          </div>

          <div class="polling-refresh-columns">
            <article
              v-for="item in comparisonCards"
              :key="item.title"
              class="polling-refresh-panel"
            >
              <h3 class="polling-refresh-panel__title">{{ item.title }}</h3>
              <p class="polling-refresh-panel__text">{{ item.summary }}</p>
            </article>
          </div>
        </section>

        <section class="polling-refresh-section">
          <div class="polling-refresh-section__head">
            <div>
              <p class="polling-refresh-section__eyebrow">Checklist</p>
              <h2 class="polling-refresh-section__title">
                轮询刷新上线前必须确认的 5 个点
              </h2>
            </div>
          </div>

          <article class="polling-refresh-panel is-wide">
            <ul class="polling-refresh-list">
              <li>
                是否根据业务实时性定义了不同的轮询间隔，而不是全站统一值。
              </li>
              <li>页面切到后台、标签页隐藏时是否自动暂停或降频。</li>
              <li>刷新是否支持 sinceId、更新时间戳等增量条件。</li>
              <li>错误连续出现时是否会退避，而不是继续稳定打接口。</li>
              <li>
                列表合并时是否按唯一 id 去重，并避免打断当前滚动和编辑操作。
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
    title: '先定刷新节奏',
    summary: '看板、消息、审批任务的实时性要求完全不同，不能共用一个刷新间隔。',
  },
  {
    order: '02',
    title: '页面隐藏要降频',
    summary: '用户看不到页面时继续高频轮询，纯粹是在浪费浏览器和服务端资源。',
  },
  {
    order: '03',
    title: '优先增量拉取',
    summary: '能只拉新增和变更，就不要反复全量覆盖整个列表。',
  },
  {
    order: '04',
    title: '错误要退避',
    summary: '服务异常或网络抖动时，轮询应该主动放缓，而不是持续放大问题。',
  },
  {
    order: '05',
    title: '刷新不能打断用户',
    summary: '列表滚动中、表单编辑中、弹窗操作中，都需要更克制的更新策略。',
  },
];

const practiceStages = [
  {
    order: '01',
    title: '根据场景定义轮询频率，而不是全站一把梭',
    tag: '频率设计',
    description:
      '消息未读数、任务状态、监控告警和审批列表，对实时性的要求完全不同。频率设计应该围绕业务价值，而不是简单写一个 setInterval。高价值状态可以更快，低价值列表应更慢，甚至改为手动刷新。',
    bestFor: ['消息中心', '任务看板', '告警列表', '审批待办'],
    focus: [
      '按业务场景配置刷新频率',
      '高实时和低实时页面分层治理',
      '轮询频率可配置而不是写死',
    ],
    risks: [
      '所有页面统一 3 秒刷新一次',
      '低价值页面刷新过于频繁',
      '频率写死后无法根据环境调整',
    ],
    language: 'ts',
    code: `const pollingConfig = {
  inbox: 15_000,
  taskBoard: 5_000,
  dashboard: 30_000,
  approvals: 20_000,
}`,
  },
  {
    order: '02',
    title: '页面隐藏时暂停或降频，别在后台白跑',
    tag: '可见性控制',
    description:
      '很多页面即使切到后台标签页，轮询也还在全速运行。合理做法是结合 Page Visibility API，在页面不可见时暂停，或者把频率降到一个更低的区间。这样既节省资源，也减少无意义的结果回写。',
    bestFor: ['后台管理系统', '监控页面', '长期开启标签页', '消息面板'],
    focus: [
      '监听 visibilitychange 事件',
      '隐藏时暂停或降频',
      '重新可见时立即补一次刷新',
    ],
    risks: [
      '后台标签页仍保持高频轮询',
      '恢复可见后不做立即同步',
      '多个轮询器各自处理可见性导致混乱',
    ],
    language: 'ts',
    code: `document.addEventListener('visibilitychange', () => {
  if (document.hidden) {
    stopPolling()
    return
  }

  fetchLatest()
  startPolling()
})`,
  },
  {
    order: '03',
    title: '优先走增量刷新，而不是反复全量覆盖',
    tag: '增量拉取',
    description:
      '列表刷新最怕每次都全量替换，既浪费带宽，也会打断滚动和局部交互。更稳妥的是带上最新时间戳、版本号或最后一条数据 id，只拉新增和变化项，再在前端做合并。',
    bestFor: ['消息列表', '日志列表', '任务记录', '动态流式面板'],
    focus: [
      '使用 sinceId、updatedAt 或 cursor',
      '前端合并结果时按唯一键去重',
      '只更新变化项，不整体重建列表',
    ],
    risks: [
      '每次刷新都全量 replace',
      '增量结果不去重导致重复项',
      '服务端和前端 cursor 语义不一致',
    ],
    language: 'ts',
    code: `const fetchIncremental = async (cursor?: string) => {
  const response = await request.get('/api/messages', {
    params: {
      cursor,
    },
  })

  return response.data as {
    items: Array<{ id: string; updatedAt: string }>
    nextCursor?: string
  }
}`,
  },
  {
    order: '04',
    title: '轮询失败后要退避，而不是一直撞墙',
    tag: '异常退避',
    description:
      '接口连续失败时，继续固定频率轮询只会放大服务端压力。更合理的做法是失败次数越多，间隔越长，成功一次后再恢复正常频率。这和重试类似，但轮询的目标是“长期稳定运行”。',
    bestFor: ['外部依赖接口', '监控看板', '长连接降级场景', '弱网环境'],
    focus: [
      '记录连续失败次数',
      '失败时动态拉长轮询间隔',
      '成功后恢复到基础频率',
    ],
    risks: [
      '接口 500 时还保持原频率',
      '失败后不恢复，永久进入超长间隔',
      '退避逻辑分散在多个页面里无法复用',
    ],
    language: 'ts',
    code: `const getNextInterval = (baseInterval: number, failureCount: number) => {
  return Math.min(baseInterval * 2 ** failureCount, 120_000)
}`,
  },
  {
    order: '05',
    title: '刷新结果要克制合并，避免打断用户当前操作',
    tag: '结果回写',
    description:
      '用户正在编辑、勾选、滚动或展开详情时，刷新不能粗暴覆盖页面状态。更好的做法是把服务端新数据合并进列表，只更新真正变化的记录；对于当前编辑中的行，可以先标记“有新版本”，由用户决定是否刷新。',
    bestFor: ['表格编辑', '审批列表', '消息列表', '任务详情面板'],
    focus: [
      '数据层更新与 UI 层状态分离',
      '只替换变化项，保留局部交互状态',
      '编辑中记录优先提示而不是强刷',
    ],
    risks: [
      '刷新后滚动位置和选中态丢失',
      '正在编辑的内容被新数据覆盖',
      '每次轮询都重建整个数组引用',
    ],
    language: 'ts',
    code: `const mergeById = <T extends { id: string }>(current: T[], incoming: T[]) => {
  const map = new Map(current.map((item) => [item.id, item]))

  incoming.forEach((item) => {
    map.set(item.id, {
      ...map.get(item.id),
      ...item,
    })
  })

  return Array.from(map.values())
}`,
  },
];

const comparisonCards = [
  {
    title: '固定间隔全量轮询',
    summary:
      '实现最简单，但资源浪费最大，也最容易造成列表抖动。只适合数据量小、实时性一般的简单场景。',
  },
  {
    title: '可见性感知轮询',
    summary:
      '更适合后台系统和长期驻留页面。它能显著减少后台空转，但仍需要和增量拉取配合。',
  },
  {
    title: '增量刷新 + 退避',
    summary:
      '这是更工程化的组合方案，适合中大型业务。复杂度更高，但实时性、稳定性和成本平衡更好。',
  },
];
</script>

<style scoped>
.polling-refresh-page {
  min-height: 100%;
  padding: 32px;
}

.polling-refresh-page__shell {
  max-width: 1240px;
  margin: 0 auto;
}

.polling-refresh-page__top {
  display: flex;
  justify-content: flex-start;
  margin-bottom: 18px;
}

.polling-refresh-page__back {
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

.polling-refresh-page__back:hover {
  transform: translateY(-1px);
  border-color: rgba(67, 94, 118, 0.18);
  box-shadow: 0 18px 42px rgba(19, 27, 34, 0.1);
}

.polling-refresh-page__content {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.polling-refresh-hero,
.polling-refresh-panel,
.polling-refresh-card {
  border: 1px solid rgba(19, 27, 34, 0.08);
  border-radius: 7px;
  background: rgba(255, 255, 255, 0.96);
  box-shadow: 0 24px 54px rgba(19, 27, 34, 0.06);
}

.polling-refresh-hero {
  display: grid;
  grid-template-columns: minmax(0, 1.4fr) minmax(320px, 0.8fr);
  gap: 18px;
  padding: 28px;
}

.polling-refresh-hero__eyebrow,
.polling-refresh-section__eyebrow,
.polling-refresh-card__eyebrow,
.polling-refresh-panel__eyebrow {
  font-size: 11px;
  line-height: 1.4;
  letter-spacing: 0.24em;
  text-transform: uppercase;
  color: #7e8894;
}

.polling-refresh-hero__title {
  margin-top: 10px;
  font-size: 42px;
  line-height: 1.06;
  font-weight: 600;
  letter-spacing: -0.04em;
  color: #17202a;
}

.polling-refresh-hero__summary,
.polling-refresh-panel__text,
.polling-refresh-card__text {
  font-size: 15px;
  line-height: 1.9;
  color: #55606c;
}

.polling-refresh-hero__summary {
  margin-top: 16px;
  max-width: 760px;
}

.polling-refresh-hero__panel,
.polling-refresh-mini-panel {
  padding: 20px;
  border: 1px solid rgba(19, 27, 34, 0.08);
  border-radius: 7px;
  background: linear-gradient(180deg, #ffffff 0%, #f5f8fb 100%);
}

.polling-refresh-hero__label,
.polling-refresh-mini-panel__title {
  font-size: 13px;
  line-height: 1.5;
  font-weight: 600;
  color: #17202a;
}

.polling-refresh-list {
  margin: 12px 0 0;
  padding-left: 18px;
  display: grid;
  gap: 8px;
  color: #55606c;
  font-size: 14px;
  line-height: 1.75;
}

.polling-refresh-grid,
.polling-refresh-columns {
  display: grid;
  gap: 16px;
}

.polling-refresh-grid {
  grid-template-columns: repeat(5, minmax(0, 1fr));
}

.polling-refresh-card {
  padding: 20px;
}

.polling-refresh-card__title,
.polling-refresh-panel__title,
.polling-refresh-section__title {
  color: #17202a;
}

.polling-refresh-card__title {
  margin-top: 8px;
  font-size: 19px;
  line-height: 1.35;
  font-weight: 600;
}

.polling-refresh-card__text {
  margin-top: 10px;
}

.polling-refresh-section {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.polling-refresh-section__head {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
}

.polling-refresh-section__title {
  margin-top: 8px;
  font-size: 28px;
  line-height: 1.2;
  font-weight: 600;
  letter-spacing: -0.03em;
}

.polling-refresh-stack {
  display: grid;
  gap: 16px;
}

.polling-refresh-panel {
  padding: 24px;
}

.polling-refresh-panel.is-wide {
  padding: 26px;
}

.polling-refresh-method__head {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 12px;
}

.polling-refresh-method__tag {
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

.polling-refresh-panel__title {
  margin-top: 8px;
  font-size: 24px;
  line-height: 1.28;
  font-weight: 600;
}

.polling-refresh-panel__text {
  margin-top: 14px;
}

.polling-refresh-method__grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 14px;
  margin-top: 18px;
}

.polling-refresh-code-block {
  margin-top: 18px;
}

.polling-refresh-columns {
  grid-template-columns: repeat(3, minmax(0, 1fr));
}

@media (max-width: 1100px) {
  .polling-refresh-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .polling-refresh-columns,
  .polling-refresh-method__grid,
  .polling-refresh-hero {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 720px) {
  .polling-refresh-page {
    padding: 18px;
  }

  .polling-refresh-grid {
    grid-template-columns: 1fr;
  }

  .polling-refresh-hero,
  .polling-refresh-card,
  .polling-refresh-panel {
    padding: 18px;
  }

  .polling-refresh-hero__title {
    font-size: 32px;
  }

  .polling-refresh-section__title {
    font-size: 22px;
  }
}
</style>
