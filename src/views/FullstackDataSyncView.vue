<template>
  <section class="data-sync-guide-page">
    <div class="data-sync-guide-page__shell">
      <div class="data-sync-guide-page__top">
        <RouterLink
          to="/fullstack-guide"
          class="data-sync-guide-page__back"
          aria-label="返回全栈能力菜单"
          title="返回全栈能力菜单"
        >
          <el-icon :size="18"><ArrowLeft /></el-icon>
        </RouterLink>
      </div>

      <div class="data-sync-guide-page__content">
        <header class="data-sync-guide-hero">
          <div>
            <p class="data-sync-guide-hero__eyebrow">
              Frontend Data Synchronization Engineering
            </p>
            <h1 class="data-sync-guide-hero__title">前端数据同步工程</h1>
            <p class="data-sync-guide-hero__summary">
              数据同步不是“请求一下接口重新拉数据”那么简单。真正的工程难点在于：本地变更如何上行、服务端增量如何下发、断网恢复后怎样补齐、多个终端如何避免相互覆盖，以及最终一致性怎样落到产品体验上。这个专题讲的是前端作为同步节点时该具备的核心思维。
            </p>
          </div>

          <div class="data-sync-guide-hero__panel">
            <p class="data-sync-guide-hero__label">学完结果</p>
            <ul class="data-sync-guide-list">
              <li>能区分全量刷新、增量同步、双向同步和实时推送的适用边界。</li>
              <li>能设计前端脏数据标记、同步队列、版本对比和冲突处理流程。</li>
              <li>能把弱网恢复、多端编辑和最终一致性落成可执行的前端方案。</li>
            </ul>
          </div>
        </header>

        <section class="data-sync-guide-grid">
          <article
            v-for="item in quickStages"
            :key="item.order"
            class="data-sync-guide-card"
          >
            <p class="data-sync-guide-card__eyebrow">Stage {{ item.order }}</p>
            <h2 class="data-sync-guide-card__title">{{ item.title }}</h2>
            <p class="data-sync-guide-card__text">{{ item.summary }}</p>
          </article>
        </section>

        <section class="data-sync-guide-section">
          <div class="data-sync-guide-section__head">
            <div>
              <p class="data-sync-guide-section__eyebrow">Decision Order</p>
              <h2 class="data-sync-guide-section__title">
                数据同步先定义数据流向，再设计增量、冲突和恢复机制
              </h2>
            </div>
          </div>

          <div class="data-sync-guide-stack">
            <article
              v-for="stage in guideStages"
              :key="stage.order"
              class="data-sync-guide-panel is-wide"
            >
              <div class="data-sync-guide-method__head">
                <div>
                  <p class="data-sync-guide-panel__eyebrow">
                    Stage {{ stage.order }}
                  </p>
                  <h3 class="data-sync-guide-panel__title">
                    {{ stage.title }}
                  </h3>
                </div>
                <span class="data-sync-guide-method__tag">
                  {{ stage.tag }}
                </span>
              </div>

              <p class="data-sync-guide-panel__text">
                {{ stage.description }}
              </p>

              <div class="data-sync-guide-method__grid">
                <section class="data-sync-guide-mini-panel">
                  <p class="data-sync-guide-mini-panel__title">适用场景</p>
                  <ul class="data-sync-guide-list">
                    <li v-for="item in stage.bestFor" :key="item">
                      {{ item }}
                    </li>
                  </ul>
                </section>

                <section class="data-sync-guide-mini-panel">
                  <p class="data-sync-guide-mini-panel__title">实现重点</p>
                  <ul class="data-sync-guide-list">
                    <li v-for="item in stage.focus" :key="item">
                      {{ item }}
                    </li>
                  </ul>
                </section>

                <section class="data-sync-guide-mini-panel">
                  <p class="data-sync-guide-mini-panel__title">常见误区</p>
                  <ul class="data-sync-guide-list">
                    <li v-for="item in stage.risks" :key="item">
                      {{ item }}
                    </li>
                  </ul>
                </section>
              </div>

              <AppCodeBlock
                class="data-sync-guide-code-block"
                :code="stage.code"
                :lang="stage.language"
              />
            </article>
          </div>
        </section>

        <section class="data-sync-guide-section">
          <div class="data-sync-guide-section__head">
            <div>
              <p class="data-sync-guide-section__eyebrow">Comparison</p>
              <h2 class="data-sync-guide-section__title">
                数据同步里最容易混淆的几组策略
              </h2>
            </div>
          </div>

          <div class="data-sync-guide-columns">
            <article
              v-for="item in comparisonCards"
              :key="item.title"
              class="data-sync-guide-panel"
            >
              <h3 class="data-sync-guide-panel__title">{{ item.title }}</h3>
              <p class="data-sync-guide-panel__text">{{ item.summary }}</p>
            </article>
          </div>
        </section>

        <section class="data-sync-guide-section">
          <div class="data-sync-guide-section__head">
            <div>
              <p class="data-sync-guide-section__eyebrow">Checklist</p>
              <h2 class="data-sync-guide-section__title">
                一套能落地的数据同步清单
              </h2>
            </div>
          </div>

          <article class="data-sync-guide-panel is-wide">
            <ul class="data-sync-guide-list">
              <li>
                先定义同步方向和权威数据源，别让前后端都以为自己是唯一真相。
              </li>
              <li>本地变更要有脏标记和同步状态，不能靠“猜测哪些数据改过”。</li>
              <li>增量同步需要版本号、游标或时间戳，不要每次都全量刷新。</li>
              <li>
                冲突发生时要有明确规则，是最后写入生效、字段合并还是人工确认。
              </li>
              <li>断网恢复、接口失败和重复重试都必须纳入同一条恢复链路。</li>
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
    title: '先定义谁同步谁',
    summary:
      '本地到远端、远端到本地、还是双向同步，方向没定义清楚，后面都会乱。',
  },
  {
    order: '02',
    title: '增量优于全量',
    summary: '只同步变化部分，通常比每次全量重拉更稳也更省。',
  },
  {
    order: '03',
    title: '冲突是常态',
    summary: '多端编辑、弱网重试、离线恢复都会带来冲突，不处理只会把数据搞脏。',
  },
  {
    order: '04',
    title: '本地状态要可见',
    summary: '同步中、待同步、失败、已同步这些状态必须对前端可追踪。',
  },
  {
    order: '05',
    title: '恢复链路要完整',
    summary: '断网恢复、重复提交和失败重试不该靠人工刷新页面解决。',
  },
];

const guideStages = [
  {
    order: '01',
    title: '先定义同步模型：单向拉取、单向上报还是双向同步',
    tag: 'Sync Model',
    description:
      '很多数据同步问题一开始就建模错了。有些系统只是前端拉取服务端权威数据，有些是本地草稿定时上报，还有些是双向同步并允许离线改动。不同模型下，前端需要维护的状态、冲突处理和恢复逻辑完全不同。先把同步方向讲清楚，后面的方案才不会混乱。',
    bestFor: ['离线编辑器', '弱网业务系统', '草稿箱', '多端协作场景'],
    focus: [
      '先定义权威数据源',
      '区分拉取同步和上报同步',
      '双向同步必须单独设计冲突规则',
    ],
    risks: [
      '前端和后端都以为自己是最终真相',
      '不同页面用不同同步规则',
      '没有统一模型就开始写同步代码',
    ],
    language: 'text',
    code: `Synchronization Models
- pull only: 前端只拉服务端数据
- push only: 前端只上报本地变更
- bidirectional: 前后端都可能产生新版本`,
  },
  {
    order: '02',
    title: '前端同步真正要维护的是状态，而不是只会发请求',
    tag: 'State Tracking',
    description:
      '同步系统不是接口调用次数的堆砌，而是一套状态机。每条记录至少要有 dirty、syncing、synced、failed 等状态，前端才能知道哪些数据待上传、哪些正在处理中、哪些失败需要重试。没有这些状态，就只能不断全量比对或人工猜测，系统很快失控。',
    bestFor: ['本地草稿', '本地任务队列', '增量上报场景'],
    focus: [
      '为本地记录定义同步状态',
      '状态变化对 UI 和重试策略都可见',
      '状态迁移要可追踪、可恢复',
    ],
    risks: [
      '记录改了但没有 dirty 标记',
      '失败后看不出是哪条数据没同步成功',
      '状态迁移随意，后续根本排查不动',
    ],
    language: 'ts',
    code: `type SyncStatus = 'dirty' | 'syncing' | 'synced' | 'failed'

type LocalRecord = {
  id: string
  version: number
  updatedAt: number
  syncStatus: SyncStatus
}`,
  },
  {
    order: '03',
    title: '增量同步必须依赖版本号、时间戳或游标，而不是每次全量刷新',
    tag: 'Incremental Sync',
    description:
      '全量刷新最简单，但只要数据量上来、同步频率变高，就会拖慢性能并放大网络消耗。更合理的方式，是给每批同步维护 cursor、version 或 lastSyncAt，只拉自上次同步以来真正变化的记录。这样才能把同步做成持续动作，而不是高成本重刷。',
    bestFor: ['消息列表', '任务列表', '记录类中后台', '离线缓存回补'],
    focus: [
      '定义 lastSyncAt 或 cursor',
      '服务端接口支持增量返回',
      '本地记录应用增量补丁而不是整表覆盖',
    ],
    risks: [
      '每次同步都全量拉取',
      '增量接口没有稳定游标',
      '本地直接整表替换导致状态丢失',
    ],
    language: 'ts',
    code: `const syncChanges = async (cursor: string | null) => {
  const response = await request.get('/api/records/sync', {
    params: { cursor },
  })

  return {
    items: response.items,
    nextCursor: response.nextCursor,
  }
}`,
  },
  {
    order: '04',
    title: '冲突处理要前置设计，不要等覆盖事故发生后再补规则',
    tag: 'Conflict Resolution',
    description:
      '一旦支持离线编辑、多端同步或延迟上报，冲突几乎一定会出现。前端至少要知道：是最后写入生效，还是字段级合并，还是弹给用户手动确认。真正成熟的系统，会在同步前就带上本地 version 和服务端 version，用明确规则决定谁胜出，而不是默默覆盖。',
    bestFor: ['多端协作', '草稿编辑器', '表单系统', '低网环境'],
    focus: [
      '同步请求带版本信息',
      '冲突规则固定且可解释',
      '高风险冲突需要用户可见提示',
    ],
    risks: [
      '冲突发生后直接覆盖旧数据',
      '不同页面用不同冲突规则',
      '用户数据丢了但系统无提示',
    ],
    language: 'ts',
    code: `const resolveConflict = (local: LocalRecord, remote: LocalRecord) => {
  if (local.version > remote.version) {
    return { strategy: 'use-local', record: local }
  }

  return { strategy: 'use-remote', record: remote }
}`,
  },
  {
    order: '05',
    title: '同步的最后一公里是恢复机制：断网、失败、重试、幂等',
    tag: 'Recovery',
    description:
      '同步系统真正值钱的地方，是异常时还能恢复。断网时要保留待同步队列；恢复联网后要自动重试；重复请求要幂等；同步失败不能无限死循环。把恢复链路设计清楚，用户才不会因为刷新、断网或偶发失败就丢数据。',
    bestFor: ['移动端 WebView', '弱网 H5', '高频编辑系统', '本地队列上报'],
    focus: [
      '本地待同步队列持久化',
      '失败重试带退避和上限',
      '同步请求具备幂等标识',
    ],
    risks: [
      '断网后本地变更直接丢失',
      '失败后无限重试打爆接口',
      '重复提交造成服务端重复写入',
    ],
    language: 'ts',
    code: `const retrySync = async (task: { id: string; retries: number }) => {
  if (task.retries >= 5) return

  await wait(2 ** task.retries * 1000)
  await pushChange(task.id)
}`,
  },
];

const comparisonCards = [
  {
    title: '全量刷新 vs 增量同步',
    summary:
      '全量刷新实现简单，但成本高、状态容易丢；增量同步更复杂，但更适合高频更新和大体量数据。',
  },
  {
    title: '最终一致性 vs 实时一致性',
    summary:
      '很多前端系统做不到实时强一致，但可以通过状态、版本和恢复机制做到最终一致且用户可理解。',
  },
  {
    title: '自动合并 vs 人工确认',
    summary:
      '低风险数据适合自动冲突解决，高价值编辑内容则更适合给用户明确提示和人工确认。',
  },
];
</script>

<style scoped>
.data-sync-guide-page {
  min-height: calc(100vh - 40px);
  padding: 24px;
  border: 1px solid rgba(19, 27, 34, 0.08);
  border-radius: 7px;
  background:
    radial-gradient(
      circle at top left,
      rgba(224, 231, 236, 0.48),
      transparent 28%
    ),
    linear-gradient(180deg, #fcfdfe 0%, #f3f6f8 100%);
  box-shadow: 0 30px 80px rgba(18, 26, 34, 0.08);
}

.data-sync-guide-page__shell {
  min-height: calc(100vh - 90px);
  border: 1px solid rgba(19, 27, 34, 0.06);
  border-radius: 7px;
  background: rgba(255, 255, 255, 0.82);
}

.data-sync-guide-page__top {
  display: flex;
  justify-content: flex-start;
  padding: 18px 18px 0;
}

.data-sync-guide-page__back {
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

.data-sync-guide-page__back:hover {
  transform: translateY(-1px);
  border-color: rgba(46, 70, 91, 0.18);
  box-shadow: 0 18px 34px rgba(19, 27, 34, 0.08);
}

.data-sync-guide-page__content {
  padding: 18px 24px 24px;
}

.data-sync-guide-hero,
.data-sync-guide-panel,
.data-sync-guide-card {
  border: 1px solid rgba(19, 27, 34, 0.08);
  border-radius: 7px;
  background: rgba(255, 255, 255, 0.84);
}

.data-sync-guide-hero {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 320px;
  gap: 20px;
  padding: 28px;
}

.data-sync-guide-hero__eyebrow,
.data-sync-guide-section__eyebrow,
.data-sync-guide-card__eyebrow,
.data-sync-guide-hero__label {
  font-size: 11px;
  line-height: 1.4;
  letter-spacing: 0.24em;
  text-transform: uppercase;
  color: #7b8793;
}

.data-sync-guide-hero__title {
  margin-top: 10px;
  font-size: 46px;
  line-height: 1.06;
  font-weight: 600;
  letter-spacing: -0.05em;
  color: #17202a;
}

.data-sync-guide-hero__summary {
  max-width: 860px;
  margin-top: 16px;
  font-size: 15px;
  line-height: 1.9;
  color: #58636f;
}

.data-sync-guide-hero__panel {
  align-self: stretch;
  padding: 18px;
  border: 1px solid rgba(19, 27, 34, 0.08);
  border-radius: 7px;
  background: linear-gradient(180deg, #fbfcfd 0%, #f4f7fa 100%);
}

.data-sync-guide-list {
  display: grid;
  gap: 8px;
  margin: 12px 0 0;
  padding-left: 18px;
  font-size: 14px;
  line-height: 1.8;
  color: #56616d;
}

.data-sync-guide-grid,
.data-sync-guide-columns,
.data-sync-guide-stack {
  display: grid;
  gap: 16px;
}

.data-sync-guide-grid {
  margin-top: 28px;
  grid-template-columns: repeat(5, minmax(0, 1fr));
}

.data-sync-guide-card {
  padding: 18px;
}

.data-sync-guide-card__title,
.data-sync-guide-panel__title,
.data-sync-guide-section__title {
  color: #17202a;
}

.data-sync-guide-card__title {
  margin-top: 10px;
  font-size: 22px;
  line-height: 1.25;
  font-weight: 600;
}

.data-sync-guide-card__text,
.data-sync-guide-panel__text {
  margin-top: 12px;
  font-size: 14px;
  line-height: 1.9;
  color: #596571;
}

.data-sync-guide-section {
  margin-top: 28px;
}

.data-sync-guide-section__head {
  margin-bottom: 14px;
}

.data-sync-guide-section__title {
  margin-top: 8px;
  font-size: 30px;
  line-height: 1.18;
  font-weight: 600;
  letter-spacing: -0.03em;
}

.data-sync-guide-columns {
  grid-template-columns: repeat(3, minmax(0, 1fr));
}

.data-sync-guide-stack {
  grid-template-columns: repeat(2, minmax(0, 1fr));
}

.data-sync-guide-panel {
  padding: 18px;
}

.data-sync-guide-panel.is-wide {
  grid-column: 1 / -1;
}

.data-sync-guide-panel__eyebrow {
  font-size: 11px;
  line-height: 1.4;
  letter-spacing: 0.24em;
  text-transform: uppercase;
  color: #80909d;
}

.data-sync-guide-panel__title {
  font-size: 20px;
  line-height: 1.3;
  font-weight: 600;
}

.data-sync-guide-method__head {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 16px;
}

.data-sync-guide-method__tag {
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

.data-sync-guide-method__grid {
  display: grid;
  gap: 14px;
  margin-top: 16px;
  grid-template-columns: repeat(3, minmax(0, 1fr));
}

.data-sync-guide-mini-panel {
  padding: 14px;
  border: 1px solid rgba(19, 27, 34, 0.08);
  border-radius: 7px;
  background: rgba(245, 248, 250, 0.9);
}

.data-sync-guide-mini-panel__title {
  font-size: 14px;
  font-weight: 600;
  color: #17202a;
}

.data-sync-guide-code-block {
  margin-top: 14px;
}

@media (max-width: 1080px) {
  .data-sync-guide-hero,
  .data-sync-guide-grid,
  .data-sync-guide-columns,
  .data-sync-guide-stack,
  .data-sync-guide-method__grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 900px) {
  .data-sync-guide-page {
    min-height: auto;
    padding: 18px;
  }

  .data-sync-guide-page__shell {
    min-height: auto;
  }

  .data-sync-guide-page__content {
    padding: 18px;
  }

  .data-sync-guide-hero__title {
    font-size: 36px;
  }

  .data-sync-guide-section__title {
    font-size: 26px;
  }
}
</style>
