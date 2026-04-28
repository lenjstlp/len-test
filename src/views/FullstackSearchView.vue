<template>
  <section class="search-guide-page">
    <div class="search-guide-page__shell">
      <div class="search-guide-page__top">
        <RouterLink
          to="/fullstack-guide"
          class="search-guide-page__back"
          aria-label="返回全栈能力菜单"
          title="返回全栈能力菜单"
        >
          <el-icon :size="18"><ArrowLeft /></el-icon>
        </RouterLink>
      </div>

      <div class="search-guide-page__content">
        <header class="search-guide-hero">
          <div>
            <p class="search-guide-hero__eyebrow">Frontend Search System</p>
            <h1 class="search-guide-hero__title">前端搜索能力</h1>
            <p class="search-guide-hero__summary">
              这一页按真实项目搭搜索功能的顺序来讲：先拆清搜索框、筛选器、排序器、结果列表、请求协议和高亮渲染，再决定做本地搜索、服务端搜索还是混合搜索。重点不是把一个输入框接到接口上，而是让搜索在高频输入、复杂筛选、分页加载、埋点分析和性能约束下依然可用。
            </p>
          </div>

          <div class="search-guide-hero__panel">
            <p class="search-guide-hero__label">学完结果</p>
            <ul class="search-guide-list">
              <li>
                能把搜索功能拆成输入层、条件层、请求层、结果层，而不是写成一个混乱组件。
              </li>
              <li>
                能判断什么时候做本地检索，什么时候必须走服务端索引与分页查询。
              </li>
              <li>
                能把防抖、取消请求、关键词高亮、空态与埋点收进同一套搜索系统设计里。
              </li>
            </ul>
          </div>
        </header>

        <section class="search-guide-grid">
          <article
            v-for="item in quickStages"
            :key="item.order"
            class="search-guide-card"
          >
            <p class="search-guide-card__eyebrow">Stage {{ item.order }}</p>
            <h2 class="search-guide-card__title">{{ item.title }}</h2>
            <p class="search-guide-card__text">{{ item.summary }}</p>
          </article>
        </section>

        <section class="search-guide-section">
          <div class="search-guide-section__head">
            <div>
              <p class="search-guide-section__eyebrow">Decision Order</p>
              <h2 class="search-guide-section__title">
                搜索能力先定查询模型，再定请求节奏、结果渲染和性能边界
              </h2>
            </div>
          </div>

          <div class="search-guide-stack">
            <article
              v-for="stage in guideStages"
              :key="stage.order"
              class="search-guide-panel is-wide"
            >
              <div class="search-guide-method__head">
                <div>
                  <p class="search-guide-panel__eyebrow">
                    Stage {{ stage.order }}
                  </p>
                  <h3 class="search-guide-panel__title">{{ stage.title }}</h3>
                </div>
                <span class="search-guide-method__tag">{{ stage.tag }}</span>
              </div>

              <p class="search-guide-panel__text">{{ stage.description }}</p>

              <div class="search-guide-method__grid">
                <section class="search-guide-mini-panel">
                  <p class="search-guide-mini-panel__title">适用场景</p>
                  <ul class="search-guide-list">
                    <li v-for="item in stage.bestFor" :key="item">
                      {{ item }}
                    </li>
                  </ul>
                </section>

                <section class="search-guide-mini-panel">
                  <p class="search-guide-mini-panel__title">实现重点</p>
                  <ul class="search-guide-list">
                    <li v-for="item in stage.focus" :key="item">
                      {{ item }}
                    </li>
                  </ul>
                </section>

                <section class="search-guide-mini-panel">
                  <p class="search-guide-mini-panel__title">常见误区</p>
                  <ul class="search-guide-list">
                    <li v-for="item in stage.risks" :key="item">
                      {{ item }}
                    </li>
                  </ul>
                </section>
              </div>

              <AppCodeBlock
                class="search-guide-code-block"
                :code="stage.code"
                :lang="stage.language"
              />
            </article>
          </div>
        </section>

        <section class="search-guide-section">
          <div class="search-guide-section__head">
            <div>
              <p class="search-guide-section__eyebrow">Comparison</p>
              <h2 class="search-guide-section__title">
                搜索系统最关键的几组取舍
              </h2>
            </div>
          </div>

          <div class="search-guide-columns">
            <article
              v-for="item in comparisonCards"
              :key="item.title"
              class="search-guide-panel"
            >
              <h3 class="search-guide-panel__title">{{ item.title }}</h3>
              <p class="search-guide-panel__text">{{ item.summary }}</p>
            </article>
          </div>
        </section>

        <section class="search-guide-section">
          <div class="search-guide-section__head">
            <div>
              <p class="search-guide-section__eyebrow">Checklist</p>
              <h2 class="search-guide-section__title">
                一套能落地的前端搜索建设清单
              </h2>
            </div>
          </div>

          <article class="search-guide-panel is-wide">
            <ul class="search-guide-list">
              <li>
                先把关键词、筛选器、排序器、分页参数统一收口成 query
                model，再发请求。
              </li>
              <li>高频输入必须做防抖和取消旧请求，别让过时结果覆盖新结果。</li>
              <li>
                空态、无结果、加载中、错误态都要设计，不然搜索只在理想路径下能用。
              </li>
              <li>
                本地搜索只适合中小数据量和离线交互，大数据检索要靠服务端索引系统。
              </li>
              <li>
                埋点至少记录关键词、筛选条件、结果数、点击项和无结果情况，方便持续优化。
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
    title: '先拆搜索模型',
    summary:
      '搜索不是一个字符串，而是关键词、筛选项、排序项、分页参数和展示策略的组合。',
  },
  {
    order: '02',
    title: '再定本地还是服务端',
    summary:
      '数据量小且交互要求高，可以本地搜；数据量大、排序复杂、结果要权重时，通常必须服务端搜。',
  },
  {
    order: '03',
    title: '高频输入要控节奏',
    summary:
      '防抖、取消请求、保留最后一次有效结果，是搜索体验的基础，不是锦上添花。',
  },
  {
    order: '04',
    title: '结果区要做完整态设计',
    summary:
      '加载中、空结果、推荐词、高亮词、分页回填都得进系统，不能只处理成功列表。',
  },
  {
    order: '05',
    title: '最后再谈优化',
    summary:
      '搜索优化不是只提速，而是看召回是否准、排序是否合理、无结果是否能被运营修正。',
  },
];

const guideStages = [
  {
    order: '01',
    title: '先定义搜索查询模型，别把关键词、筛选器和分页散在组件各处',
    tag: '查询建模',
    description:
      '搜索能力一旦复杂起来，就不再是一个 input 的事。真正稳定的做法是先定义统一的 query model，把 keyword、filters、sort、page、pageSize 都收进同一个对象。这样你做回显、缓存、路由同步、分享链接和埋点时，才有统一语义。如果你把每个条件都拆成独立的零散状态，后面只会越来越难维护。',
    bestFor: ['商品列表', '表格检索', '知识库搜索', '管理后台筛选查询'],
    focus: [
      '统一搜索条件结构，避免状态分散',
      '让 query model 可以序列化到 URL',
      '让请求层只接受一种标准查询对象',
    ],
    risks: [
      '关键词、筛选器、分页各自维护，状态难同步',
      '切换筛选器后忘记重置分页',
      '请求层直接读组件状态，耦合过重',
    ],
    language: 'ts',
    code: `type SearchQuery = {
  keyword: string
  filters: {
    status?: 'draft' | 'published'
    tagIds?: string[]
  }
  sort: 'relevance' | 'latest' | 'popular'
  page: number
  pageSize: number
}`,
  },
  {
    order: '02',
    title: '先分清本地搜索和服务端搜索的边界，别为了省事把所有检索都放前端',
    tag: '方案选择',
    description:
      '小型列表、离线数据、前端已有全量数据时，本地搜索很自然，甚至可以配合 fuse.js 这类模糊匹配方案。但只要数据量大、排序规则复杂、涉及权限、跨字段权重或需要全文索引，前端就不该硬扛。前端更合理的角色是构造查询条件、承接结果状态、做高亮与交互，而不是代替搜索引擎本身。',
    bestFor: ['中小列表本地筛选', '大规模服务端搜索', '知识库检索', '内容后台'],
    focus: [
      '按数据规模和权限边界选本地或服务端',
      '全文检索、权重排序、聚合统计优先服务端',
      '前端保留展示层与交互层职责',
    ],
    risks: [
      '几万条数据全塞前端再搜索',
      '有权限隔离的数据仍试图本地搜索',
      '服务端返回结果后前端再做二次随意排序',
    ],
    language: 'text',
    code: `Search Choice
- 数据量小 + 已拿到全量数据 -> local search
- 数据量大 + 复杂排序/权限 -> server search
- 需要全文检索/权重召回 -> dedicated search service
- 前端负责: query, state, render, highlight`,
  },
  {
    order: '03',
    title: '高频输入一定要做防抖和取消请求，不然搜索结果会乱序回写',
    tag: '请求控制',
    description:
      '搜索框是最容易打出并发请求风暴的地方。用户快速输入时，如果你每次 keypress 都发请求，又不取消旧请求，就会出现响应乱序，旧结果覆盖新结果。更稳的方案是：关键词输入防抖，发起新请求前取消旧请求，只保留最后一次有效查询的结果。这样系统既稳，又能减少无意义流量。',
    bestFor: ['联想搜索', '表格搜索', '全文搜索输入框', '远程下拉搜索'],
    focus: [
      '关键词输入做 debounce',
      '使用 AbortController 取消旧请求',
      '只让最新 query 对应的结果生效',
    ],
    risks: [
      '每输入一个字都立即请求',
      '请求成功就直接写结果，不判断是否过期',
      '输入框和结果列表没有共享查询上下文',
    ],
    language: 'ts',
    code: `let activeController: AbortController | null = null

async function search(query: SearchQuery) {
  activeController?.abort()
  activeController = new AbortController()

  const response = await fetch('/api/search', {
    method: 'POST',
    body: JSON.stringify(query),
    signal: activeController.signal,
  })

  return response.json()
}`,
  },
  {
    order: '04',
    title: '结果区不能只会渲染列表，还要处理高亮、空态、推荐词和分页状态',
    tag: '结果呈现',
    description:
      '搜索体验的质量，很多时候不是输在召回，而是输在展示。关键词高亮能帮助用户确认命中位置；空态能决定用户是否继续搜索；推荐词和热门词能降低输入成本；分页和筛选回显能让用户知道自己当前看到的到底是哪一组结果。搜索结果区应该被当成一个完整模块，而不是一个 map 循环。',
    bestFor: ['文档搜索', '后台列表', '商品搜索', '知识库结果页'],
    focus: [
      '命中词高亮与摘要裁剪',
      '空结果给出引导而不是纯空白',
      '结果总数、当前条件、分页状态同步展示',
    ],
    risks: [
      '有结果就渲染，没结果就空白',
      '关键词匹配到了却没有高亮，用户感知弱',
      '分页切换后条件状态丢失',
    ],
    language: 'ts',
    code: `function highlightKeyword(text: string, keyword: string) {
  if (!keyword) return text

  const safeKeyword = keyword.replace(/[.*+?^{}()|[\\]\\\\]/g, '\\\\$&')
  const pattern = new RegExp('(' + safeKeyword + ')', 'ig')
  return text.replace(pattern, '<mark>$1</mark>')
}`,
  },
  {
    order: '05',
    title: '搜索优化最终要回到埋点、无结果分析和排序调优，而不是只看接口耗时',
    tag: '持续优化',
    description:
      '真正成熟的搜索系统，不会只盯着“搜得快不快”。更关键的问题是：用户搜了什么、搜出来多少、有没有点击、哪些词经常无结果、哪些筛选项经常联用。只有把关键词、筛选条件、结果数、点击率、无结果率串起来，你才有机会真正优化搜索质量。否则你只是在做一个输入框，不是在建设搜索能力。',
    bestFor: ['内容平台', '中后台检索', '商品搜索', '长期运营型系统'],
    focus: [
      '记录 query、filters、resultCount、clickedItem',
      '分析高频无结果词和低点击搜索词',
      '把搜索优化视为产品与工程协同能力',
    ],
    risks: [
      '只看接口耗时，不看搜索有效性',
      '没有记录无结果词，运营无从优化',
      '排序策略靠拍脑袋，不结合行为数据',
    ],
    language: 'yaml',
    code: `search-analytics:
  collect:
    - keyword
    - filters
    - resultCount
    - clickedItemId
    - hasResult
  dashboards:
    - no-result keywords
    - low-click queries
    - top filter combinations`,
  },
];

const comparisonCards = [
  {
    title: '本地搜索 vs 服务端搜索',
    summary:
      '本地搜索响应快、交互顺滑，但只能扛中小数据量；服务端搜索扩展性强，能做全文索引和复杂排序，但前端必须处理好请求节奏与状态同步。',
  },
  {
    title: '即时请求 vs 防抖请求',
    summary:
      '即时请求实现最简单，但很容易造成请求风暴和乱序覆盖；防抖加取消虽然多一层控制，却是高频搜索的基本配置。',
  },
  {
    title: '纯关键词搜索 vs 查询模型搜索',
    summary:
      '纯关键词适合极简场景；一旦业务要筛选、排序、分页、路由回填，统一查询模型才是可维护方案。',
  },
];
</script>

<style scoped>
.search-guide-page {
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

.search-guide-page__shell {
  min-height: calc(100vh - 90px);
  border: 1px solid rgba(19, 27, 34, 0.06);
  border-radius: 7px;
  background: rgba(255, 255, 255, 0.82);
}

.search-guide-page__top {
  display: flex;
  justify-content: flex-start;
  padding: 18px 18px 0;
}

.search-guide-page__back {
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

.search-guide-page__back:hover {
  transform: translateY(-1px);
  border-color: rgba(46, 70, 91, 0.18);
  box-shadow: 0 18px 34px rgba(19, 27, 34, 0.08);
}

.search-guide-page__content {
  padding: 18px 24px 24px;
}

.search-guide-hero {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 320px;
  gap: 20px;
  padding-bottom: 26px;
  border-bottom: 1px solid rgba(19, 27, 34, 0.08);
}

.search-guide-hero__eyebrow,
.search-guide-section__eyebrow,
.search-guide-card__eyebrow,
.search-guide-hero__label {
  font-size: 11px;
  line-height: 1.4;
  letter-spacing: 0.24em;
  text-transform: uppercase;
  color: #7b8793;
}

.search-guide-hero__title {
  margin-top: 10px;
  font-size: 46px;
  line-height: 1.06;
  font-weight: 600;
  letter-spacing: -0.05em;
  color: #17202a;
}

.search-guide-hero__summary {
  max-width: 860px;
  margin-top: 16px;
  font-size: 15px;
  line-height: 1.9;
  color: #58636f;
}

.search-guide-hero__panel,
.search-guide-card,
.search-guide-panel {
  border: 1px solid rgba(19, 27, 34, 0.08);
  border-radius: 7px;
  background: rgba(255, 255, 255, 0.84);
}

.search-guide-hero__panel {
  padding: 18px;
}

.search-guide-list {
  display: grid;
  gap: 8px;
  margin: 12px 0 0;
  padding-left: 18px;
  font-size: 14px;
  line-height: 1.8;
  color: #56616d;
}

.search-guide-grid,
.search-guide-columns,
.search-guide-stack {
  display: grid;
  gap: 16px;
}

.search-guide-grid {
  margin-top: 28px;
  grid-template-columns: repeat(3, minmax(0, 1fr));
}

.search-guide-card {
  padding: 18px;
}

.search-guide-card__title,
.search-guide-panel__title,
.search-guide-section__title {
  color: #17202a;
}

.search-guide-card__title {
  margin-top: 10px;
  font-size: 22px;
  line-height: 1.25;
  font-weight: 600;
}

.search-guide-card__text,
.search-guide-panel__text {
  margin-top: 12px;
  font-size: 14px;
  line-height: 1.9;
  color: #596571;
}

.search-guide-section {
  margin-top: 28px;
}

.search-guide-section__head {
  margin-bottom: 14px;
}

.search-guide-section__title {
  margin-top: 8px;
  font-size: 30px;
  line-height: 1.18;
  font-weight: 600;
  letter-spacing: -0.03em;
}

.search-guide-columns {
  grid-template-columns: repeat(3, minmax(0, 1fr));
}

.search-guide-stack {
  grid-template-columns: repeat(2, minmax(0, 1fr));
}

.search-guide-panel {
  padding: 18px;
}

.search-guide-panel.is-wide {
  grid-column: 1 / -1;
}

.search-guide-panel__eyebrow {
  font-size: 11px;
  line-height: 1.4;
  letter-spacing: 0.24em;
  text-transform: uppercase;
  color: #80909d;
}

.search-guide-panel__title {
  font-size: 20px;
  line-height: 1.3;
  font-weight: 600;
}

.search-guide-method__head {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 16px;
}

.search-guide-method__tag {
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

.search-guide-method__grid {
  display: grid;
  gap: 14px;
  margin-top: 16px;
  grid-template-columns: repeat(3, minmax(0, 1fr));
}

.search-guide-mini-panel {
  padding: 14px;
  border: 1px solid rgba(19, 27, 34, 0.08);
  border-radius: 7px;
  background: rgba(245, 248, 250, 0.9);
}

.search-guide-mini-panel__title {
  font-size: 14px;
  font-weight: 600;
  color: #17202a;
}

.search-guide-code-block {
  margin-top: 14px;
}

@media (max-width: 1080px) {
  .search-guide-hero,
  .search-guide-grid,
  .search-guide-columns,
  .search-guide-stack,
  .search-guide-method__grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 900px) {
  .search-guide-page {
    min-height: auto;
    padding: 18px;
  }

  .search-guide-page__shell {
    min-height: auto;
  }

  .search-guide-page__content {
    padding: 18px;
  }

  .search-guide-hero__title {
    font-size: 36px;
  }

  .search-guide-section__title {
    font-size: 26px;
  }
}
</style>
