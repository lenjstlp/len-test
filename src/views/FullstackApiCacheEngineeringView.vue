<template>
  <section class="api-cache-guide-page">
    <div class="api-cache-guide-page__shell">
      <div class="api-cache-guide-page__top">
        <RouterLink
          to="/fullstack-guide"
          class="api-cache-guide-page__back"
          aria-label="返回全栈能力菜单"
          title="返回全栈能力菜单"
        >
          <el-icon :size="18"><ArrowLeft /></el-icon>
        </RouterLink>
      </div>

      <div class="api-cache-guide-page__content">
        <header class="api-cache-guide-hero">
          <div>
            <p class="api-cache-guide-hero__eyebrow">
              Frontend API Cache Engineering
            </p>
            <h1 class="api-cache-guide-hero__title">前端 API 缓存工程</h1>
            <p class="api-cache-guide-hero__summary">
              真正的 API 缓存工程，不是简单地把接口响应塞进
              `localStorage`。它要解决的是请求去重、重复加载、TTL
              失效、后台预取、手动刷新、页面切换后的数据复用，以及缓存和权限、参数、租户之间的边界问题。做得好，页面更快，接口更稳，用户也不会反复看到加载闪烁。
            </p>
          </div>

          <div class="api-cache-guide-hero__panel">
            <p class="api-cache-guide-hero__label">学完结果</p>
            <ul class="api-cache-guide-list">
              <li>能区分内存缓存、持久化缓存、请求去重和数据预取的职责。</li>
              <li>能给接口结果设计 key、TTL、失效策略和手动刷新机制。</li>
              <li>
                能把缓存和参数、权限、租户、分页条件绑定起来，避免错用脏数据。
              </li>
            </ul>
          </div>
        </header>

        <section class="api-cache-guide-grid">
          <article
            v-for="item in quickStages"
            :key="item.order"
            class="api-cache-guide-card"
          >
            <p class="api-cache-guide-card__eyebrow">Stage {{ item.order }}</p>
            <h2 class="api-cache-guide-card__title">{{ item.title }}</h2>
            <p class="api-cache-guide-card__text">{{ item.summary }}</p>
          </article>
        </section>

        <section class="api-cache-guide-section">
          <div class="api-cache-guide-section__head">
            <div>
              <p class="api-cache-guide-section__eyebrow">Decision Order</p>
              <h2 class="api-cache-guide-section__title">
                API 缓存要先定 key 和失效策略，再决定存哪里
              </h2>
            </div>
          </div>

          <div class="api-cache-guide-stack">
            <article
              v-for="stage in cacheStages"
              :key="stage.order"
              class="api-cache-guide-panel is-wide"
            >
              <div class="api-cache-guide-method__head">
                <div>
                  <p class="api-cache-guide-panel__eyebrow">
                    Stage {{ stage.order }}
                  </p>
                  <h3 class="api-cache-guide-panel__title">
                    {{ stage.title }}
                  </h3>
                </div>
                <span class="api-cache-guide-method__tag">{{ stage.tag }}</span>
              </div>

              <p class="api-cache-guide-panel__text">{{ stage.description }}</p>

              <div class="api-cache-guide-method__grid">
                <section class="api-cache-guide-mini-panel">
                  <p class="api-cache-guide-mini-panel__title">适用场景</p>
                  <ul class="api-cache-guide-list">
                    <li v-for="item in stage.bestFor" :key="item">
                      {{ item }}
                    </li>
                  </ul>
                </section>

                <section class="api-cache-guide-mini-panel">
                  <p class="api-cache-guide-mini-panel__title">实现重点</p>
                  <ul class="api-cache-guide-list">
                    <li v-for="item in stage.focus" :key="item">
                      {{ item }}
                    </li>
                  </ul>
                </section>

                <section class="api-cache-guide-mini-panel">
                  <p class="api-cache-guide-mini-panel__title">常见误区</p>
                  <ul class="api-cache-guide-list">
                    <li v-for="item in stage.risks" :key="item">
                      {{ item }}
                    </li>
                  </ul>
                </section>
              </div>

              <AppCodeBlock
                class="api-cache-guide-code-block"
                :code="stage.code"
                :lang="stage.language"
              />
            </article>
          </div>
        </section>

        <section class="api-cache-guide-section">
          <div class="api-cache-guide-section__head">
            <div>
              <p class="api-cache-guide-section__eyebrow">Comparison</p>
              <h2 class="api-cache-guide-section__title">
                同样是缓存，策略不同，结果差很多
              </h2>
            </div>
          </div>

          <div class="api-cache-guide-columns">
            <article
              v-for="item in comparisonCards"
              :key="item.title"
              class="api-cache-guide-panel"
            >
              <h3 class="api-cache-guide-panel__title">{{ item.title }}</h3>
              <p class="api-cache-guide-panel__text">{{ item.summary }}</p>
            </article>
          </div>
        </section>

        <section class="api-cache-guide-section">
          <div class="api-cache-guide-section__head">
            <div>
              <p class="api-cache-guide-section__eyebrow">Best Practice</p>
              <h2 class="api-cache-guide-section__title">
                一个够用的前端缓存 key 结构
              </h2>
            </div>
          </div>

          <article class="api-cache-guide-panel is-wide">
            <p class="api-cache-guide-panel__text">
              缓存 key
              不能只拿接口路径硬拼，否则分页、筛选、权限和租户一变就会串数据。更稳妥的是把业务标识、参数摘要、用户身份和版本号都纳入
              key 设计。
            </p>

            <AppCodeBlock
              class="api-cache-guide-code-block"
              :code="recordExample"
              lang="json"
            />
          </article>
        </section>

        <section class="api-cache-guide-section">
          <div class="api-cache-guide-section__head">
            <div>
              <p class="api-cache-guide-section__eyebrow">Checklist</p>
              <h2 class="api-cache-guide-section__title">
                API 缓存上线前必须补齐的 5 个点
              </h2>
            </div>
          </div>

          <article class="api-cache-guide-panel is-wide">
            <ul class="api-cache-guide-list">
              <li>缓存 key 是否包含了分页、筛选、用户、租户和版本信息。</li>
              <li>缓存过期后是自动失效、后台刷新，还是前台强制拉新。</li>
              <li>接口错误、权限变化、切租户后是否会继续命中旧缓存。</li>
              <li>请求去重是否会把同一时刻的重复请求合并掉。</li>
              <li>缓存与乐观更新、手动刷新、预取策略是否一致。</li>
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
    title: '先定义缓存对象',
    summary: '不是所有接口都值得缓存，先判断数据是否稳定、是否依赖当前用户。',
  },
  {
    order: '02',
    title: '再定义缓存 key',
    summary: '分页、筛选、租户、版本都要纳入 key，否则很容易错命中。',
  },
  {
    order: '03',
    title: '最后定义失效机制',
    summary: 'TTL、手动刷新、权限变化和切换条件都应该能让缓存失效。',
  },
  {
    order: '04',
    title: '请求去重也算缓存',
    summary: '同一时刻的重复请求合并掉，体验和性能都会更稳。',
  },
  {
    order: '05',
    title: '预取能减少等待',
    summary: '提前加载下一页、下一屏或常用数据，能明显减少加载闪烁。',
  },
];

const cacheStages = [
  {
    order: '01',
    title: '先判断哪些 API 值得缓存',
    tag: '缓存边界',
    description:
      '不是所有接口都应该缓存。配置类、字典类、静态列表、首页首屏数据、详情页基础信息通常适合缓存；而强实时、强权限、强上下文变化的数据则要慎重。先把可缓存对象定义清楚，后面 key 和失效策略才有意义。',
    bestFor: ['字典接口', '配置中心', '首页首屏', '分页列表', '详情页基础数据'],
    focus: [
      '先按数据稳定性和用户相关性分层',
      '强实时数据默认不缓存或短缓存',
      '明确哪些接口允许跨页面复用',
    ],
    risks: [
      '把所有接口都塞进缓存层',
      '列表数据和实时状态共用一个 key',
      '强权限数据缓存后忘记按用户区分',
    ],
    language: 'text',
    code: `Cache Candidates
- stable config data
- dictionary lists
- first-screen bootstrap data
- page-level static list data
- detail base information`,
  },
  {
    order: '02',
    title: '缓存 key 要包含足够的业务维度',
    tag: 'Key 设计',
    description:
      '缓存错用，十有八九是 key 设计太粗。一个合格的 key，至少要区分接口名、业务参数、分页条件、用户身份、租户信息和版本号。只有把这些变化维度都纳进去，缓存才不会在不同上下文之间串掉。',
    bestFor: ['列表分页', '多租户后台', '权限敏感页面', '复杂筛选表格'],
    focus: [
      '把会影响结果的参数都纳入 key',
      '对对象参数做稳定序列化或摘要',
      '给 key 加版本号方便整体迁移',
    ],
    risks: [
      '只用接口路径当 key',
      '分页参数没进 key，下一页命中第一页',
      '用户切换后仍然读到旧身份缓存',
    ],
    language: 'ts',
    code: `const buildCacheKey = (params: {
  path: string
  userId: string
  tenantId?: string
  page?: number
  pageSize?: number
  filters?: Record<string, unknown>
  version?: string
}) => {
  const filterPart = JSON.stringify(params.filters ?? {})

  return [
    'api-cache',
    params.version ?? 'v1',
    params.path,
    params.userId,
    params.tenantId ?? 'default',
    params.page ?? 1,
    params.pageSize ?? 20,
    filterPart,
  ].join('::')
}`,
  },
  {
    order: '03',
    title: 'TTL、手动刷新和失效要同时设计',
    tag: '失效策略',
    description:
      '缓存不是永久存着就行，必须有失效规则。TTL 负责自然过期，手动刷新负责用户主动更新，权限变化和切租户则必须强制失效。否则你会在“缓存很快”之外，得到“数据很旧”。',
    bestFor: ['后台列表', '配置项', '详情页基础信息', '搜索建议'],
    focus: [
      '给不同缓存对象配置不同 TTL',
      '提供显式刷新入口',
      '用户、租户、权限变化时主动清理',
    ],
    risks: [
      '缓存只进不出',
      '权限变了还继续用旧数据',
      'TTL 统一太长导致页面长期旧数据',
    ],
    language: 'ts',
    code: `type CacheEntry<T> = {
  data: T
  expiredAt: number
}

const cache = new Map<string, CacheEntry<unknown>>()

const setCache = <T>(key: string, data: T, ttl = 60_000) => {
  cache.set(key, {
    data,
    expiredAt: Date.now() + ttl,
  })
}

const getCache = <T>(key: string) => {
  const entry = cache.get(key) as CacheEntry<T> | undefined
  if (!entry || entry.expiredAt <= Date.now()) {
    cache.delete(key)
    return null
  }
  return entry.data
}`,
  },
  {
    order: '04',
    title: '请求去重能减少重复加载',
    tag: 'Dedup',
    description:
      '同一个数据如果正在请求中，后续相同请求不应该再发一遍。更好的做法是把进行中的 Promise 缓存起来，让后来的请求直接复用同一份结果。这样不仅省请求，也能减少界面反复 loading。',
    bestFor: ['首屏 bootstrap', '列表刷新', '并发触发的详情页'],
    focus: [
      '把 in-flight 请求作为可复用对象',
      '请求结束后清理进行中缓存',
      '失败也要确保状态收口',
    ],
    risks: [
      '并发点太多时发出重复请求',
      '失败请求没有清理，导致后续一直复用错误结果',
      '不同参数的请求被误合并',
    ],
    language: 'ts',
    code: `const pendingRequests = new Map<string, Promise<unknown>>()

const requestOnce = <T>(key: string, factory: () => Promise<T>) => {
  if (pendingRequests.has(key)) {
    return pendingRequests.get(key) as Promise<T>
  }

  const task = factory().finally(() => {
    pendingRequests.delete(key)
  })

  pendingRequests.set(key, task)
  return task
}`,
  },
  {
    order: '05',
    title: '缓存预取适合做顺手的数据准备',
    tag: 'Prefetch',
    description:
      '预取不是把所有东西提前拉回来，而是只把高概率会用到的数据提前准备好，比如下一页、常用筛选、展开详情、首屏骨架后面的基础数据。做得好，用户看到的就是“页面很顺”，做得过头就会白白浪费流量。',
    bestFor: ['分页表格', '详情页跳转', '常用筛选切换', '首页首屏'],
    focus: [
      '只预取高概率会用到的数据',
      '把预取结果写入同一缓存层',
      '避免和当前请求互相抢资源',
    ],
    risks: [
      '把所有数据都提前拉取',
      '预取过多导致首屏变慢',
      '预取和正式请求使用不同缓存逻辑',
    ],
    language: 'ts',
    code: `const prefetchPage = (page: number) => {
  void requestOnce('page:' + page, () =>
    fetch('/api/list?page=' + page).then((res) => res.json())
  )
}`,
  },
];

const comparisonCards = [
  {
    title: '内存缓存',
    summary:
      '速度最快，适合页面生命周期内复用，但刷新页面后就会丢失。最适合请求去重、短期复用和当前页数据。',
  },
  {
    title: '持久化缓存',
    summary:
      '适合配置、字典、离线场景，但一定要有 TTL 和版本控制，否则很容易把旧结构长期留下。',
  },
  {
    title: '预取缓存',
    summary:
      '本质是提前加载未来可能需要的数据。体验很好，但要控制范围，别让预取反而拖慢当前页面。',
  },
];

const recordExample = `{
  "key": "api-cache::v1::/api/list::user-01::tenant-a::1::20::{\\"status\\":\\"open\\"}",
  "ttl": 60000,
  "scope": "user+tenant+query",
  "strategy": {
    "dedup": true,
    "prefetch": true,
    "manualRefresh": true
  }
}`;
</script>

<style scoped>
.api-cache-guide-page {
  min-height: 100%;
  padding: 32px;
}

.api-cache-guide-page__shell {
  max-width: 1240px;
  margin: 0 auto;
}

.api-cache-guide-page__top {
  display: flex;
  justify-content: flex-start;
  margin-bottom: 18px;
}

.api-cache-guide-page__back {
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

.api-cache-guide-page__back:hover {
  transform: translateY(-1px);
  border-color: rgba(67, 94, 118, 0.18);
  box-shadow: 0 18px 42px rgba(19, 27, 34, 0.1);
}

.api-cache-guide-page__content {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.api-cache-guide-hero,
.api-cache-guide-panel,
.api-cache-guide-card {
  border: 1px solid rgba(19, 27, 34, 0.08);
  border-radius: 7px;
  background: rgba(255, 255, 255, 0.96);
  box-shadow: 0 24px 54px rgba(19, 27, 34, 0.06);
}

.api-cache-guide-hero {
  display: grid;
  grid-template-columns: minmax(0, 1.4fr) minmax(320px, 0.8fr);
  gap: 18px;
  padding: 28px;
}

.api-cache-guide-hero__eyebrow,
.api-cache-guide-section__eyebrow,
.api-cache-guide-card__eyebrow,
.api-cache-guide-panel__eyebrow {
  font-size: 11px;
  line-height: 1.4;
  letter-spacing: 0.24em;
  text-transform: uppercase;
  color: #7e8894;
}

.api-cache-guide-hero__title {
  margin-top: 10px;
  font-size: 42px;
  line-height: 1.06;
  font-weight: 600;
  letter-spacing: -0.04em;
  color: #17202a;
}

.api-cache-guide-hero__summary,
.api-cache-guide-panel__text,
.api-cache-guide-card__text {
  font-size: 15px;
  line-height: 1.9;
  color: #55606c;
}

.api-cache-guide-hero__summary {
  margin-top: 16px;
  max-width: 760px;
}

.api-cache-guide-hero__panel,
.api-cache-guide-mini-panel {
  padding: 20px;
  border: 1px solid rgba(19, 27, 34, 0.08);
  border-radius: 7px;
  background: linear-gradient(180deg, #ffffff 0%, #f5f8fb 100%);
}

.api-cache-guide-hero__label,
.api-cache-guide-mini-panel__title {
  font-size: 13px;
  line-height: 1.5;
  font-weight: 600;
  color: #17202a;
}

.api-cache-guide-list {
  margin: 12px 0 0;
  padding-left: 18px;
  display: grid;
  gap: 8px;
  color: #55606c;
  font-size: 14px;
  line-height: 1.75;
}

.api-cache-guide-grid,
.api-cache-guide-columns {
  display: grid;
  gap: 16px;
}

.api-cache-guide-grid {
  grid-template-columns: repeat(5, minmax(0, 1fr));
}

.api-cache-guide-card {
  padding: 20px;
}

.api-cache-guide-card__title,
.api-cache-guide-panel__title,
.api-cache-guide-section__title {
  color: #17202a;
}

.api-cache-guide-card__title {
  margin-top: 8px;
  font-size: 19px;
  line-height: 1.35;
  font-weight: 600;
}

.api-cache-guide-card__text {
  margin-top: 10px;
}

.api-cache-guide-section {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.api-cache-guide-section__head {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
}

.api-cache-guide-section__title {
  margin-top: 8px;
  font-size: 28px;
  line-height: 1.2;
  font-weight: 600;
  letter-spacing: -0.03em;
}

.api-cache-guide-stack {
  display: grid;
  gap: 16px;
}

.api-cache-guide-panel {
  padding: 24px;
}

.api-cache-guide-panel.is-wide {
  padding: 26px;
}

.api-cache-guide-method__head {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 12px;
}

.api-cache-guide-method__tag {
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

.api-cache-guide-panel__title {
  margin-top: 8px;
  font-size: 24px;
  line-height: 1.28;
  font-weight: 600;
}

.api-cache-guide-panel__text {
  margin-top: 14px;
}

.api-cache-guide-method__grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 14px;
  margin-top: 18px;
}

.api-cache-guide-code-block {
  margin-top: 18px;
}

.api-cache-guide-columns {
  grid-template-columns: repeat(3, minmax(0, 1fr));
}

@media (max-width: 1100px) {
  .api-cache-guide-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .api-cache-guide-columns,
  .api-cache-guide-method__grid,
  .api-cache-guide-hero {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 720px) {
  .api-cache-guide-page {
    padding: 18px;
  }

  .api-cache-guide-grid {
    grid-template-columns: 1fr;
  }

  .api-cache-guide-hero,
  .api-cache-guide-card,
  .api-cache-guide-panel {
    padding: 18px;
  }

  .api-cache-guide-hero__title {
    font-size: 32px;
  }

  .api-cache-guide-section__title {
    font-size: 22px;
  }
}
</style>
