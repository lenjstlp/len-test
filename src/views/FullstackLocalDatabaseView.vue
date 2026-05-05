<template>
  <section class="local-database-guide-page">
    <div class="local-database-guide-page__shell">
      <div class="local-database-guide-page__top">
        <RouterLink
          to="/fullstack-guide"
          class="local-database-guide-page__back"
          aria-label="返回全栈能力菜单"
          title="返回全栈能力菜单"
        >
          <el-icon :size="18"><ArrowLeft /></el-icon>
        </RouterLink>
      </div>

      <div class="local-database-guide-page__content">
        <header class="local-database-guide-hero">
          <div>
            <p class="local-database-guide-hero__eyebrow">
              Frontend Local Database Engineering
            </p>
            <h1 class="local-database-guide-hero__title">前端本地数据库工程</h1>
            <p class="local-database-guide-hero__summary">
              本地数据库不是“把数据放浏览器里”这么简单。真正的工程问题在于：什么时候该用
              IndexedDB，怎样管理表结构升级，如何做离线草稿、同步冲突、查询索引和数据清理。它解决的不是缓存几条接口数据，而是前端在弱网、离线和重交互场景中的持续可用性。
            </p>
          </div>

          <div class="local-database-guide-hero__panel">
            <p class="local-database-guide-hero__label">学完结果</p>
            <ul class="local-database-guide-list">
              <li>
                能区分 LocalStorage、SessionStorage、Cache API 和 IndexedDB
                的边界。
              </li>
              <li>能设计前端本地库的表结构、索引、版本升级和清理策略。</li>
              <li>能处理离线草稿、断网编辑、重新同步和冲突合并等真实问题。</li>
            </ul>
          </div>
        </header>

        <section class="local-database-guide-grid">
          <article
            v-for="item in quickStages"
            :key="item.order"
            class="local-database-guide-card"
          >
            <p class="local-database-guide-card__eyebrow">
              Stage {{ item.order }}
            </p>
            <h2 class="local-database-guide-card__title">
              {{ item.title }}
            </h2>
            <p class="local-database-guide-card__text">
              {{ item.summary }}
            </p>
          </article>
        </section>

        <section class="local-database-guide-section">
          <div class="local-database-guide-section__head">
            <div>
              <p class="local-database-guide-section__eyebrow">
                Decision Order
              </p>
              <h2 class="local-database-guide-section__title">
                本地数据库先判断数据形态，再决定存储引擎、索引和同步模型
              </h2>
            </div>
          </div>

          <div class="local-database-guide-stack">
            <article
              v-for="stage in guideStages"
              :key="stage.order"
              class="local-database-guide-panel is-wide"
            >
              <div class="local-database-guide-method__head">
                <div>
                  <p class="local-database-guide-panel__eyebrow">
                    Stage {{ stage.order }}
                  </p>
                  <h3 class="local-database-guide-panel__title">
                    {{ stage.title }}
                  </h3>
                </div>
                <span class="local-database-guide-method__tag">
                  {{ stage.tag }}
                </span>
              </div>

              <p class="local-database-guide-panel__text">
                {{ stage.description }}
              </p>

              <div class="local-database-guide-method__grid">
                <section class="local-database-guide-mini-panel">
                  <p class="local-database-guide-mini-panel__title">适用场景</p>
                  <ul class="local-database-guide-list">
                    <li v-for="item in stage.bestFor" :key="item">
                      {{ item }}
                    </li>
                  </ul>
                </section>

                <section class="local-database-guide-mini-panel">
                  <p class="local-database-guide-mini-panel__title">实现重点</p>
                  <ul class="local-database-guide-list">
                    <li v-for="item in stage.focus" :key="item">
                      {{ item }}
                    </li>
                  </ul>
                </section>

                <section class="local-database-guide-mini-panel">
                  <p class="local-database-guide-mini-panel__title">常见误区</p>
                  <ul class="local-database-guide-list">
                    <li v-for="item in stage.risks" :key="item">
                      {{ item }}
                    </li>
                  </ul>
                </section>
              </div>

              <AppCodeBlock
                class="local-database-guide-code-block"
                :code="stage.code"
                :lang="stage.language"
              />
            </article>
          </div>
        </section>

        <section class="local-database-guide-section">
          <div class="local-database-guide-section__head">
            <div>
              <p class="local-database-guide-section__eyebrow">Comparison</p>
              <h2 class="local-database-guide-section__title">
                前端本地存储方案最容易混淆的几组边界
              </h2>
            </div>
          </div>

          <div class="local-database-guide-columns">
            <article
              v-for="item in comparisonCards"
              :key="item.title"
              class="local-database-guide-panel"
            >
              <h3 class="local-database-guide-panel__title">
                {{ item.title }}
              </h3>
              <p class="local-database-guide-panel__text">
                {{ item.summary }}
              </p>
            </article>
          </div>
        </section>

        <section class="local-database-guide-section">
          <div class="local-database-guide-section__head">
            <div>
              <p class="local-database-guide-section__eyebrow">Checklist</p>
              <h2 class="local-database-guide-section__title">
                一套能落地的前端本地数据库清单
              </h2>
            </div>
          </div>

          <article class="local-database-guide-panel is-wide">
            <ul class="local-database-guide-list">
              <li>先定义本地数据的生命周期，不要默认“永久保留”。</li>
              <li>建表前先想清楚查询条件，否则后面补索引会很痛。</li>
              <li>
                本地草稿和服务端数据要区分版本号或更新时间，便于冲突判断。
              </li>
              <li>升级数据库版本时要有迁移策略，不能直接清空用户数据。</li>
              <li>断网恢复后的同步、失败重试和脏数据清理要配套存在。</li>
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
    title: '先判断存什么',
    summary:
      '接口缓存、草稿、离线任务、查询数据表，数据形态不同，存储方案也不同。',
  },
  {
    order: '02',
    title: 'IndexedDB 是主角',
    summary:
      '只要涉及结构化数据查询和离线持久化，IndexedDB 通常比 LocalStorage 合适。',
  },
  {
    order: '03',
    title: '索引设计很关键',
    summary: '本地库不是只会写入，真正难点是后续怎样高效读取和筛选。',
  },
  {
    order: '04',
    title: '同步比存储更难',
    summary: '离线编辑恢复后如何合并服务端变化，才是真正的工程问题。',
  },
  {
    order: '05',
    title: '版本升级要稳',
    summary: '数据库 schema 一旦变更，迁移逻辑必须考虑用户已有数据。',
  },
];

const guideStages = [
  {
    order: '01',
    title: '先分清本地存储的边界：不是所有数据都该进数据库',
    tag: '问题建模',
    description:
      '很多团队一说前端本地存储，就把所有东西都扔进 LocalStorage 或 IndexedDB。真正稳的做法，是先区分数据形态：临时 UI 状态、登录态、接口缓存、离线草稿、任务队列、可检索表数据，这些适合的载体完全不同。本地数据库解决的是结构化、可查询、可持久的数据，不是浏览器里的杂物间。',
    bestFor: ['离线草稿', '本地任务队列', '大体量结构化缓存', '弱网应用'],
    focus: [
      '先分类数据，再选存储方式',
      '区分临时状态和持久状态',
      '本地数据库只承接真正需要结构化管理的数据',
    ],
    risks: [
      '把所有数据都塞进一个存储方案',
      '本地和服务端职责混乱',
      '没有清理策略导致存储越来越脏',
    ],
    language: 'text',
    code: `Storage Decision
- 临时 UI 状态 -> memory / pinia
- 小体量键值数据 -> LocalStorage
- 静态资源缓存 -> Cache API
- 结构化离线数据 -> IndexedDB`,
  },
  {
    order: '02',
    title: '真正可用的前端本地库，通常都要建立在 IndexedDB 之上',
    tag: '存储引擎',
    description:
      'LocalStorage 虽然简单，但它是同步 API、容量有限、缺少索引和事务能力，不适合承载中大型结构化数据。IndexedDB 更像浏览器里的嵌入式数据库，支持对象仓库、索引、事务和异步读写。只要你要处理草稿、记录列表、同步队列或本地查询，IndexedDB 才是更实际的选项。',
    bestFor: ['文档草稿', '离线表单', '消息记录缓存', '本地查询列表'],
    focus: [
      '理解对象仓库、索引和事务模型',
      '异步封装访问层，避免业务层直接操作原生 API',
      '优先用数据库抽象而不是散落的存取代码',
    ],
    risks: [
      '继续用 LocalStorage 硬扛结构化数据',
      '业务代码到处直接写 IndexedDB 原生调用',
      '忽视事务导致写入状态不一致',
    ],
    language: 'ts',
    code: `const request = indexedDB.open('app-local-db', 1)

request.onupgradeneeded = () => {
  const db = request.result
  const store = db.createObjectStore('drafts', { keyPath: 'id' })
  store.createIndex('updatedAt', 'updatedAt')
}`,
  },
  {
    order: '03',
    title: '表结构和索引要先围绕查询设计，而不是先存进去再说',
    tag: 'Schema Design',
    description:
      '前端本地数据库最容易被低估的部分，是查询模型。你到底是按用户查、按更新时间查、按状态查，还是按业务 ID 查？如果不先想清楚这些问题，后续就只能全表扫描。真正的本地库设计，和后端表结构设计一样，也需要提前考虑主键、二级索引和数据拆分方式。',
    bestFor: ['本地草稿箱', '消息列表', '多条件筛选缓存', '离线任务表'],
    focus: [
      '根据查询路径设计 keyPath 和 index',
      '不同业务实体分仓库存储',
      '避免一个 store 承担所有数据',
    ],
    risks: [
      '没有索引，后续只能低效扫描',
      '所有数据都塞进一个对象仓库',
      'schema 跟着业务临时拼凑，没有长期演进能力',
    ],
    language: 'ts',
    code: `type DraftRecord = {
  id: string
  userId: string
  content: string
  status: 'editing' | 'syncing' | 'failed'
  updatedAt: number
}`,
  },
  {
    order: '04',
    title: '离线草稿和同步冲突，才是本地数据库最难的地方',
    tag: 'Sync Strategy',
    description:
      '把数据存下来只是第一步，真正棘手的是恢复联网之后怎么同步。比如本地草稿编辑期间，服务端版本已经变了；或者多标签页、多设备同时改了同一条记录。成熟方案通常会给本地记录维护 `version`、`updatedAt`、`syncStatus` 等字段，用来判断谁是最新状态、是否需要人工冲突处理。',
    bestFor: ['离线编辑器', '移动端 WebView', '弱网业务系统', '草稿箱类产品'],
    focus: [
      '本地记录带同步状态和版本信息',
      '重新联网后分批同步并处理失败重试',
      '冲突判断规则要明确可解释',
    ],
    risks: [
      '离线恢复后直接覆盖服务端数据',
      '本地和远端版本没有任何比较依据',
      '失败同步反复重试但没有状态标记',
    ],
    language: 'ts',
    code: `const mergeDraft = (local: DraftRecord, remote: DraftRecord) => {
  if (local.updatedAt >= remote.updatedAt) {
    return { winner: 'local', record: local }
  }

  return { winner: 'remote', record: remote }
}`,
  },
  {
    order: '05',
    title: '数据库版本升级和清理策略必须纳入长期治理',
    tag: 'Lifecycle',
    description:
      '本地数据库不是建完就结束。业务字段变更、索引新增、历史数据淘汰都会带来 schema 升级问题。你不能每次升级都清空用户本地数据，否则体验会很差。更稳的方式是用 `onupgradeneeded` 做渐进迁移，并配合 TTL、容量上限、业务归档策略定期清理陈旧数据。',
    bestFor: ['长期迭代项目', '有历史数据积累的业务', '多版本并行环境'],
    focus: [
      '数据库版本变更要写迁移逻辑',
      '过期数据定期清理',
      '用户数据迁移失败时要有兜底方案',
    ],
    risks: [
      '版本升级直接清库',
      '历史数据无限增长没人清理',
      '迁移逻辑不可重复执行，升级容易炸库',
    ],
    language: 'ts',
    code: `request.onupgradeneeded = (event) => {
  const db = request.result
  const oldVersion = event.oldVersion

  if (oldVersion < 2) {
    const store = request.transaction!.objectStore('drafts')
    store.createIndex('status', 'status')
  }
}`,
  },
];

const comparisonCards = [
  {
    title: 'LocalStorage vs IndexedDB',
    summary:
      'LocalStorage 适合小体量简单键值，IndexedDB 适合结构化、可索引、可事务的数据。两者不是同一层级的工具。',
  },
  {
    title: '接口缓存 vs 本地数据库',
    summary:
      '接口缓存偏向短期复用请求结果，本地数据库偏向长期持久化和本地查询能力。前者解决性能，后者解决可用性与离线能力。',
  },
  {
    title: '离线存储 vs 同步系统',
    summary:
      '把数据存下来只是离线能力的一半，另一半是恢复联网后如何可靠同步、合并和清理。',
  },
];
</script>

<style scoped>
.local-database-guide-page {
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

.local-database-guide-page__shell {
  min-height: calc(100vh - 90px);
  border: 1px solid rgba(19, 27, 34, 0.06);
  border-radius: 7px;
  background: rgba(255, 255, 255, 0.82);
}

.local-database-guide-page__top {
  display: flex;
  justify-content: flex-start;
  padding: 18px 18px 0;
}

.local-database-guide-page__back {
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

.local-database-guide-page__back:hover {
  transform: translateY(-1px);
  border-color: rgba(46, 70, 91, 0.18);
  box-shadow: 0 18px 34px rgba(19, 27, 34, 0.08);
}

.local-database-guide-page__content {
  padding: 18px 24px 24px;
}

.local-database-guide-hero,
.local-database-guide-panel,
.local-database-guide-card {
  border: 1px solid rgba(19, 27, 34, 0.08);
  border-radius: 7px;
  background: rgba(255, 255, 255, 0.84);
}

.local-database-guide-hero {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 320px;
  gap: 20px;
  padding: 28px;
}

.local-database-guide-hero__eyebrow,
.local-database-guide-section__eyebrow,
.local-database-guide-card__eyebrow,
.local-database-guide-hero__label {
  font-size: 11px;
  line-height: 1.4;
  letter-spacing: 0.24em;
  text-transform: uppercase;
  color: #7b8793;
}

.local-database-guide-hero__title {
  margin-top: 10px;
  font-size: 46px;
  line-height: 1.06;
  font-weight: 600;
  letter-spacing: -0.05em;
  color: #17202a;
}

.local-database-guide-hero__summary {
  max-width: 860px;
  margin-top: 16px;
  font-size: 15px;
  line-height: 1.9;
  color: #58636f;
}

.local-database-guide-hero__panel {
  align-self: stretch;
  padding: 18px;
  border: 1px solid rgba(19, 27, 34, 0.08);
  border-radius: 7px;
  background: linear-gradient(180deg, #fbfcfd 0%, #f4f7fa 100%);
}

.local-database-guide-list {
  display: grid;
  gap: 8px;
  margin: 12px 0 0;
  padding-left: 18px;
  font-size: 14px;
  line-height: 1.8;
  color: #56616d;
}

.local-database-guide-grid,
.local-database-guide-columns,
.local-database-guide-stack {
  display: grid;
  gap: 16px;
}

.local-database-guide-grid {
  margin-top: 28px;
  grid-template-columns: repeat(5, minmax(0, 1fr));
}

.local-database-guide-card {
  padding: 18px;
}

.local-database-guide-card__title,
.local-database-guide-panel__title,
.local-database-guide-section__title {
  color: #17202a;
}

.local-database-guide-card__title {
  margin-top: 10px;
  font-size: 22px;
  line-height: 1.25;
  font-weight: 600;
}

.local-database-guide-card__text,
.local-database-guide-panel__text {
  margin-top: 12px;
  font-size: 14px;
  line-height: 1.9;
  color: #596571;
}

.local-database-guide-section {
  margin-top: 28px;
}

.local-database-guide-section__head {
  margin-bottom: 14px;
}

.local-database-guide-section__title {
  margin-top: 8px;
  font-size: 30px;
  line-height: 1.18;
  font-weight: 600;
  letter-spacing: -0.03em;
}

.local-database-guide-columns {
  grid-template-columns: repeat(3, minmax(0, 1fr));
}

.local-database-guide-stack {
  grid-template-columns: repeat(2, minmax(0, 1fr));
}

.local-database-guide-panel {
  padding: 18px;
}

.local-database-guide-panel.is-wide {
  grid-column: 1 / -1;
}

.local-database-guide-panel__eyebrow {
  font-size: 11px;
  line-height: 1.4;
  letter-spacing: 0.24em;
  text-transform: uppercase;
  color: #80909d;
}

.local-database-guide-panel__title {
  font-size: 20px;
  line-height: 1.3;
  font-weight: 600;
}

.local-database-guide-method__head {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 16px;
}

.local-database-guide-method__tag {
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

.local-database-guide-method__grid {
  display: grid;
  gap: 14px;
  margin-top: 16px;
  grid-template-columns: repeat(3, minmax(0, 1fr));
}

.local-database-guide-mini-panel {
  padding: 14px;
  border: 1px solid rgba(19, 27, 34, 0.08);
  border-radius: 7px;
  background: rgba(245, 248, 250, 0.9);
}

.local-database-guide-mini-panel__title {
  font-size: 14px;
  font-weight: 600;
  color: #17202a;
}

.local-database-guide-code-block {
  margin-top: 14px;
}

@media (max-width: 1080px) {
  .local-database-guide-hero,
  .local-database-guide-grid,
  .local-database-guide-columns,
  .local-database-guide-stack,
  .local-database-guide-method__grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 900px) {
  .local-database-guide-page {
    min-height: auto;
    padding: 18px;
  }

  .local-database-guide-page__shell {
    min-height: auto;
  }

  .local-database-guide-page__content {
    padding: 18px;
  }

  .local-database-guide-hero__title {
    font-size: 36px;
  }

  .local-database-guide-section__title {
    font-size: 26px;
  }
}
</style>
