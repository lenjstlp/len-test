<template>
  <section class="url-state-guide-page">
    <div class="url-state-guide-page__shell">
      <div class="url-state-guide-page__top">
        <RouterLink
          to="/fullstack-guide"
          class="url-state-guide-page__back"
          aria-label="返回全栈能力菜单"
          title="返回全栈能力菜单"
        >
          <el-icon :size="18"><ArrowLeft /></el-icon>
        </RouterLink>
      </div>

      <div class="url-state-guide-page__content">
        <header class="url-state-guide-hero">
          <div>
            <p class="url-state-guide-hero__eyebrow">
              Frontend URL State Engineering
            </p>
            <h1 class="url-state-guide-hero__title">前端 URL 状态工程</h1>
            <p class="url-state-guide-hero__summary">
              URL 状态不是简单把筛选条件拼到 query
              上。真正的工程问题是：哪些状态值得公开进地址栏、复杂筛选怎样序列化、前进后退如何保持一致、分享链接怎样可复现，以及
              URL、内存状态和服务端数据请求如何保持同一事实来源。
            </p>
          </div>

          <div class="url-state-guide-hero__panel">
            <p class="url-state-guide-hero__label">学完结果</p>
            <ul class="url-state-guide-list">
              <li>能区分页面 UI 临时状态与值得进入 URL 的可分享状态。</li>
              <li>能设计 query、path、hash 与本地状态之间的同步和回放规则。</li>
              <li>
                能实现筛选、分页、搜索、工作台布局等复杂场景的 URL 工程方案。
              </li>
            </ul>
          </div>
        </header>

        <section class="url-state-guide-grid">
          <article
            v-for="item in quickStages"
            :key="item.order"
            class="url-state-guide-card"
          >
            <p class="url-state-guide-card__eyebrow">Stage {{ item.order }}</p>
            <h2 class="url-state-guide-card__title">{{ item.title }}</h2>
            <p class="url-state-guide-card__text">{{ item.summary }}</p>
          </article>
        </section>

        <section class="url-state-guide-section">
          <div class="url-state-guide-section__head">
            <div>
              <p class="url-state-guide-section__eyebrow">Engineering Order</p>
              <h2 class="url-state-guide-section__title">
                先定义哪些状态值得进入 URL，再处理序列化、同步和回退一致性
              </h2>
            </div>
          </div>

          <div class="url-state-guide-stack">
            <article
              v-for="stage in guideStages"
              :key="stage.order"
              class="url-state-guide-panel is-wide"
            >
              <div class="url-state-guide-method__head">
                <div>
                  <p class="url-state-guide-panel__eyebrow">
                    Stage {{ stage.order }}
                  </p>
                  <h3 class="url-state-guide-panel__title">
                    {{ stage.title }}
                  </h3>
                </div>
                <span class="url-state-guide-method__tag">{{ stage.tag }}</span>
              </div>

              <p class="url-state-guide-panel__text">{{ stage.description }}</p>

              <div class="url-state-guide-method__grid">
                <section class="url-state-guide-mini-panel">
                  <p class="url-state-guide-mini-panel__title">适用场景</p>
                  <ul class="url-state-guide-list">
                    <li v-for="item in stage.bestFor" :key="item">
                      {{ item }}
                    </li>
                  </ul>
                </section>

                <section class="url-state-guide-mini-panel">
                  <p class="url-state-guide-mini-panel__title">实现重点</p>
                  <ul class="url-state-guide-list">
                    <li v-for="item in stage.focus" :key="item">{{ item }}</li>
                  </ul>
                </section>

                <section class="url-state-guide-mini-panel">
                  <p class="url-state-guide-mini-panel__title">常见误区</p>
                  <ul class="url-state-guide-list">
                    <li v-for="item in stage.risks" :key="item">{{ item }}</li>
                  </ul>
                </section>
              </div>

              <AppCodeBlock
                class="url-state-guide-code-block"
                :code="stage.code"
                :lang="stage.language"
              />
            </article>
          </div>
        </section>

        <section class="url-state-guide-section">
          <div class="url-state-guide-section__head">
            <div>
              <p class="url-state-guide-section__eyebrow">Comparison</p>
              <h2 class="url-state-guide-section__title">
                URL 状态里最容易混淆的几组边界
              </h2>
            </div>
          </div>

          <div class="url-state-guide-columns">
            <article
              v-for="item in comparisonCards"
              :key="item.title"
              class="url-state-guide-panel"
            >
              <h3 class="url-state-guide-panel__title">{{ item.title }}</h3>
              <p class="url-state-guide-panel__text">{{ item.summary }}</p>
            </article>
          </div>
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
    title: '先定义可分享状态',
    summary:
      '不是所有 UI 状态都值得进入地址栏，能分享、能刷新恢复的状态才有 URL 价值。',
  },
  {
    order: '02',
    title: '序列化规则要稳定',
    summary: '筛选数组、排序、视图模式等复杂状态必须有一致的编码与解码规则。',
  },
  {
    order: '03',
    title: 'URL 是外部事实源',
    summary: '页面初始化、刷新、前进后退都应该以 URL 为准重新还原状态。',
  },
  {
    order: '04',
    title: '更新时机要克制',
    summary:
      '输入联想和拖拽过程不能每次都 push 历史，必须区分 replace 与 push。',
  },
  {
    order: '05',
    title: '请求链路要同步',
    summary: 'URL 变了之后，请求参数、缓存 key 和页面视图都要跟着统一切换。',
  },
];

const guideStages = [
  {
    order: '01',
    title: '先区分哪些状态该进 URL，哪些只该留在内存',
    tag: 'State Boundary',
    description:
      'URL 最适合承载可分享、可刷新恢复、可前进后退追踪的状态，比如筛选条件、分页、排序、搜索关键字、当前 tab。反过来，弹窗开关、hover 状态、输入中草稿等强瞬时状态通常不该进地址栏。边界不清楚，页面一刷新就会暴露出状态设计混乱。',
    bestFor: ['列表页筛选', '报表系统', '多标签工作台', '可分享查询结果页'],
    focus: [
      '先列出哪些状态需要支持刷新恢复与分享',
      '保持 URL 中只出现有业务意义的最小状态集合',
      '把临时交互态留在内存或组件本地',
    ],
    risks: [
      '把一切状态都塞进 query，URL 长且难维护',
      '明明需要分享的状态却没进 URL，刷新后全丢',
      '页面状态一半在 URL 一半在 store，来源冲突',
    ],
    language: 'text',
    code: `Good URL State
- keyword
- page
- pageSize
- sort
- activeTab
- filters

Keep In Memory
- modalVisible
- hoverRowId
- draftInput
- loadingFlags`,
  },
  {
    order: '02',
    title: '复杂筛选必须有稳定的序列化和解码协议',
    tag: 'Serialization',
    description:
      'URL 状态真正难的地方，不是怎么 setQuery，而是复杂结构怎么稳定编码。数组筛选、范围查询、多字段排序、工作台布局都不能临时拼字符串。工程上应该定义一套可逆的序列化协议，保证刷新、分享、后端日志和埋点查询看到的是同一份语义。',
    bestFor: ['高级筛选面板', 'BI 报表', '地图多条件检索', '运营工作台'],
    focus: [
      '为数组、枚举、时间范围定义统一编码规则',
      '避免同一状态在不同页面使用不同 query 命名',
      '编码规则要可逆且便于调试',
    ],
    risks: [
      '业务同学各自拼 query，长期无法治理',
      '解码失败时页面 silently fallback，排查困难',
      '数组顺序不稳定导致缓存 key 和 URL 一直变化',
    ],
    language: 'ts',
    code: `type QueryState = {
  keyword?: string
  page?: number
  tags?: string[]
}

const encodeQueryState = (state: QueryState) => ({
  keyword: state.keyword ?? undefined,
  page: state.page ? String(state.page) : undefined,
  tags: state.tags?.join(',') || undefined,
})`,
  },
  {
    order: '03',
    title: '初始化、刷新、前进后退都必须以 URL 为外部事实源',
    tag: 'Source of Truth',
    description:
      '一旦某些状态被定义进 URL，就必须承认 URL 是外部事实源。页面初次进入要先从地址栏解析状态，再驱动 store 和请求；用户点击浏览器前进后退时，也要完整复现之前那一屏。不能只在进入页面时解析一次，后面又完全依赖内存状态，这样历史栈就会失真。',
    bestFor: ['需要深链接的业务页面', '多步骤可回退流程', '复杂查询页'],
    focus: [
      '路由进入时统一 parse URL',
      'watch route 变化而不是只 watch 本地 store',
      '让数据请求参数与 URL 派生值保持一致',
    ],
    risks: [
      '首次加载按 URL 解析，后续路由变化却不同步',
      '前进后退后只改了地址，页面没复原',
      'URL 和 store 互相写，造成循环更新',
    ],
    language: 'ts',
    code: `watch(
  () => route.query,
  (query) => {
    const state = decodeQueryState(query)
    searchStore.patchFromUrl(state)
    void searchStore.fetchList()
  },
  { immediate: true },
)`,
  },
  {
    order: '04',
    title: '要区分 replace 与 push，不能让历史栈被高频输入刷爆',
    tag: 'History Control',
    description:
      'URL 状态一旦和输入联动，如果每敲一个字都 push 一条 history，浏览器后退就会退成灾难。常见策略是：高频变更阶段用 replace 保持当前记录更新，只有明确提交搜索、切页、切 tab、切视图时再 push 新历史。这样既保留可回退节点，又不会污染历史栈。',
    bestFor: ['搜索页', '工作台筛选栏', '交互频繁的查询系统'],
    focus: [
      '输入中 replace，确认动作再 push',
      '批量更新多个 query 时合并一次路由变更',
      '把用户真正能感知的状态跃迁作为 history 节点',
    ],
    risks: [
      '每次输入都 push，后退体验极差',
      '所有动作都 replace，用户无法回到上一步结果',
      '多个筛选项连续更新各自发路由，造成抖动',
    ],
    language: 'ts',
    code: `const syncKeywordToUrl = async (keyword: string, committed: boolean) => {
  const nextQuery = {
    ...route.query,
    keyword,
    page: '1',
  }

  await router[committed ? 'push' : 'replace']({ query: nextQuery })
}`,
  },
  {
    order: '05',
    title: 'URL 状态要和缓存 key、接口参数、SSR 入口统一建模',
    tag: 'Data Sync',
    description:
      '成熟系统里，URL 状态不只是页面显示用，还会影响接口参数、缓存 key、服务端渲染入口和埋点维度。如果这些链路各自拼一份参数，很快就会出现页面展示、缓存命中和日志记录都不一致的问题。最稳的做法是从 URL 派生出一份标准查询对象，所有链路共用它。',
    bestFor: ['SSR 页面', '缓存较重的查询页', '报表和搜索系统'],
    focus: [
      '从 URL 派生 canonical query object',
      '让请求 key 和缓存 key 共用同一份对象',
      '埋点记录当前 URL 派生查询态，便于复盘',
    ],
    risks: [
      '页面展示按 route.query，请求参数按 store，二者不一致',
      '缓存 key 与地址栏不同步，导致命中错乱',
      'SSR 首屏和客户端 hydration 参数不一致',
    ],
    language: 'ts',
    code: `const buildCanonicalQuery = (query: RouteLocationNormalizedLoaded['query']) => {
  const state = decodeQueryState(query)

  return {
    keyword: state.keyword || '',
    page: state.page || 1,
    tags: state.tags || [],
  }
}`,
  },
];

const comparisonCards = [
  {
    title: 'URL 状态 vs 组件本地状态',
    summary:
      '前者适合分享、刷新恢复和回退；后者适合瞬时交互与短生命周期 UI 细节。',
  },
  {
    title: 'push vs replace',
    summary:
      'push 用于创建用户可感知的新历史节点，replace 用于在当前节点上平滑修订状态。',
  },
  {
    title: 'query 编码 vs store 直写',
    summary:
      'query 编码更利于分享和恢复，store 直写适合短期内存态；二者混用时必须明确单一事实源。',
  },
];
</script>

<style scoped>
.url-state-guide-page {
  min-height: calc(100vh - 40px);
  padding: 24px;
  border: 1px solid rgba(19, 27, 34, 0.08);
  border-radius: 7px;
  background:
    radial-gradient(
      circle at top right,
      rgba(223, 232, 238, 0.44),
      transparent 28%
    ),
    linear-gradient(180deg, #fcfdfe 0%, #f3f6f8 100%);
  box-shadow: 0 30px 80px rgba(18, 26, 34, 0.08);
}

.url-state-guide-page__shell {
  min-height: calc(100vh - 90px);
  border: 1px solid rgba(19, 27, 34, 0.06);
  border-radius: 7px;
  background: rgba(255, 255, 255, 0.84);
}

.url-state-guide-page__top {
  display: flex;
  justify-content: flex-start;
  padding: 18px 18px 0;
}

.url-state-guide-page__back {
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

.url-state-guide-page__back:hover {
  transform: translateY(-1px);
  border-color: rgba(46, 70, 91, 0.18);
  box-shadow: 0 18px 34px rgba(19, 27, 34, 0.08);
}

.url-state-guide-page__content {
  padding: 18px 24px 24px;
}

.url-state-guide-hero,
.url-state-guide-panel,
.url-state-guide-card {
  border: 1px solid rgba(19, 27, 34, 0.08);
  border-radius: 7px;
  background: rgba(255, 255, 255, 0.86);
}

.url-state-guide-hero {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 320px;
  gap: 20px;
  padding: 28px;
}

.url-state-guide-hero__eyebrow,
.url-state-guide-section__eyebrow,
.url-state-guide-card__eyebrow,
.url-state-guide-hero__label {
  font-size: 11px;
  line-height: 1.4;
  letter-spacing: 0.24em;
  text-transform: uppercase;
  color: #7b8793;
}

.url-state-guide-hero__title {
  margin-top: 10px;
  font-size: 46px;
  line-height: 1.06;
  font-weight: 600;
  letter-spacing: -0.05em;
  color: #17202a;
}

.url-state-guide-hero__summary {
  max-width: 860px;
  margin-top: 16px;
  font-size: 15px;
  line-height: 1.9;
  color: #58636f;
}

.url-state-guide-hero__panel {
  align-self: stretch;
  padding: 18px;
  border: 1px solid rgba(19, 27, 34, 0.08);
  border-radius: 7px;
  background: linear-gradient(180deg, #fbfcfd 0%, #f4f7fa 100%);
}

.url-state-guide-list {
  display: grid;
  gap: 8px;
  margin: 12px 0 0;
  padding-left: 18px;
  font-size: 14px;
  line-height: 1.8;
  color: #56616d;
}

.url-state-guide-grid,
.url-state-guide-columns,
.url-state-guide-stack {
  display: grid;
  gap: 16px;
}

.url-state-guide-grid {
  margin-top: 28px;
  grid-template-columns: repeat(5, minmax(0, 1fr));
}

.url-state-guide-card {
  padding: 18px;
}

.url-state-guide-card__title,
.url-state-guide-panel__title,
.url-state-guide-section__title {
  color: #17202a;
}

.url-state-guide-card__title {
  margin-top: 10px;
  font-size: 22px;
  line-height: 1.25;
  font-weight: 600;
}

.url-state-guide-card__text,
.url-state-guide-panel__text {
  margin-top: 12px;
  font-size: 14px;
  line-height: 1.9;
  color: #596571;
}

.url-state-guide-section {
  margin-top: 28px;
}

.url-state-guide-section__head {
  margin-bottom: 14px;
}

.url-state-guide-section__title {
  margin-top: 8px;
  font-size: 30px;
  line-height: 1.18;
  font-weight: 600;
  letter-spacing: -0.03em;
}

.url-state-guide-columns {
  grid-template-columns: repeat(3, minmax(0, 1fr));
}

.url-state-guide-stack {
  grid-template-columns: repeat(2, minmax(0, 1fr));
}

.url-state-guide-panel {
  padding: 18px;
}

.url-state-guide-panel.is-wide {
  grid-column: 1 / -1;
}

.url-state-guide-panel__eyebrow {
  font-size: 11px;
  line-height: 1.4;
  letter-spacing: 0.24em;
  text-transform: uppercase;
  color: #80909d;
}

.url-state-guide-panel__title {
  font-size: 20px;
  line-height: 1.3;
  font-weight: 600;
}

.url-state-guide-method__head {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 16px;
}

.url-state-guide-method__tag {
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

.url-state-guide-method__grid {
  display: grid;
  gap: 14px;
  margin-top: 16px;
  grid-template-columns: repeat(3, minmax(0, 1fr));
}

.url-state-guide-mini-panel {
  padding: 14px;
  border: 1px solid rgba(19, 27, 34, 0.08);
  border-radius: 7px;
  background: rgba(245, 248, 250, 0.9);
}

.url-state-guide-mini-panel__title {
  font-size: 14px;
  font-weight: 600;
  color: #17202a;
}

.url-state-guide-code-block {
  margin-top: 14px;
}

@media (max-width: 1080px) {
  .url-state-guide-hero,
  .url-state-guide-grid,
  .url-state-guide-columns,
  .url-state-guide-stack,
  .url-state-guide-method__grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 900px) {
  .url-state-guide-page {
    min-height: auto;
    padding: 18px;
  }

  .url-state-guide-page__shell {
    min-height: auto;
  }

  .url-state-guide-page__content {
    padding: 18px;
  }

  .url-state-guide-hero__title {
    font-size: 36px;
  }

  .url-state-guide-section__title {
    font-size: 26px;
  }
}
</style>
