<template>
  <section class="state-guide-page">
    <div class="state-guide-page__shell">
      <div class="state-guide-page__top">
        <RouterLink
          to="/fullstack-guide"
          class="state-guide-page__back"
          aria-label="返回全栈能力菜单"
          title="返回全栈能力菜单"
        >
          <el-icon :size="18"><ArrowLeft /></el-icon>
        </RouterLink>
      </div>

      <div class="state-guide-page__content">
        <header class="state-guide-hero">
          <div>
            <p class="state-guide-hero__eyebrow">Frontend State Management</p>
            <h1 class="state-guide-hero__title">前端状态管理能力</h1>
            <p class="state-guide-hero__summary">
              这一页按真实项目里最常见的决策顺序来讲状态管理：先分清哪些是局部状态、共享状态、服务端状态和
              URL 状态，再去决定是 `props`、组合式函数、Pinia
              还是请求缓存方案。重点不是学一个库，而是知道状态为什么会失控，以及怎么从架构上收回来。
            </p>
          </div>

          <div class="state-guide-hero__panel">
            <p class="state-guide-hero__label">学完结果</p>
            <ul class="state-guide-list">
              <li>能分清局部状态、共享状态、服务端状态和持久化状态的边界。</li>
              <li>能判断什么时候该上状态库，什么时候只用组合式函数就够。</li>
              <li>
                能把状态、派生数据、副作用和持久化拆开，不把 store 写成垃圾桶。
              </li>
            </ul>
          </div>
        </header>

        <section class="state-guide-grid">
          <article
            v-for="item in quickStages"
            :key="item.order"
            class="state-guide-card"
          >
            <p class="state-guide-card__eyebrow">Stage {{ item.order }}</p>
            <h2 class="state-guide-card__title">{{ item.title }}</h2>
            <p class="state-guide-card__text">{{ item.summary }}</p>
          </article>
        </section>

        <section class="state-guide-section">
          <div class="state-guide-section__head">
            <div>
              <p class="state-guide-section__eyebrow">Decision Order</p>
              <h2 class="state-guide-section__title">
                状态管理先给状态分类，再决定工具和边界
              </h2>
            </div>
          </div>

          <div class="state-guide-stack">
            <article
              v-for="stage in guideStages"
              :key="stage.order"
              class="state-guide-panel is-wide"
            >
              <div class="state-guide-method__head">
                <div>
                  <p class="state-guide-panel__eyebrow">
                    Stage {{ stage.order }}
                  </p>
                  <h3 class="state-guide-panel__title">
                    {{ stage.title }}
                  </h3>
                </div>
                <span class="state-guide-method__tag">{{ stage.tag }}</span>
              </div>

              <p class="state-guide-panel__text">{{ stage.description }}</p>

              <div class="state-guide-method__grid">
                <section class="state-guide-mini-panel">
                  <p class="state-guide-mini-panel__title">适用场景</p>
                  <ul class="state-guide-list">
                    <li v-for="item in stage.bestFor" :key="item">
                      {{ item }}
                    </li>
                  </ul>
                </section>

                <section class="state-guide-mini-panel">
                  <p class="state-guide-mini-panel__title">实现重点</p>
                  <ul class="state-guide-list">
                    <li v-for="item in stage.focus" :key="item">
                      {{ item }}
                    </li>
                  </ul>
                </section>

                <section class="state-guide-mini-panel">
                  <p class="state-guide-mini-panel__title">常见误区</p>
                  <ul class="state-guide-list">
                    <li v-for="item in stage.risks" :key="item">
                      {{ item }}
                    </li>
                  </ul>
                </section>
              </div>

              <AppCodeBlock
                class="state-guide-code-block"
                :code="stage.code"
                :lang="stage.language"
              />
            </article>
          </div>
        </section>

        <section class="state-guide-section">
          <div class="state-guide-section__head">
            <div>
              <p class="state-guide-section__eyebrow">Comparison</p>
              <h2 class="state-guide-section__title">
                状态管理里最关键的几组取舍
              </h2>
            </div>
          </div>

          <div class="state-guide-columns">
            <article
              v-for="item in comparisonCards"
              :key="item.title"
              class="state-guide-panel"
            >
              <h3 class="state-guide-panel__title">{{ item.title }}</h3>
              <p class="state-guide-panel__text">{{ item.summary }}</p>
            </article>
          </div>
        </section>

        <section class="state-guide-section">
          <div class="state-guide-section__head">
            <div>
              <p class="state-guide-section__eyebrow">Checklist</p>
              <h2 class="state-guide-section__title">
                一套够稳的状态管理落地清单
              </h2>
            </div>
          </div>

          <article class="state-guide-panel is-wide">
            <ul class="state-guide-list">
              <li>先判断状态归属，不要把所有数据默认塞进全局 store。</li>
              <li>服务端数据优先按请求缓存模型管理，不要混进本地 UI 状态。</li>
              <li>派生状态用 `computed` 或 selector 生成，不要重复存储。</li>
              <li>
                副作用、持久化、埋点都要从 store 主体中拆开，避免职责污染。
              </li>
              <li>每个 store 都要有清晰边界、初始化逻辑和销毁策略。</li>
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
    title: '先分类状态',
    summary: '局部状态、共享状态、服务端状态、URL 状态要分开建模。',
  },
  {
    order: '02',
    title: '先选最小方案',
    summary: '能用组件状态和组合式函数解决，就别急着上全局状态库。',
  },
  {
    order: '03',
    title: '避免重复存储',
    summary: '很多状态爆炸，本质上是把可计算结果也当成源状态存了。',
  },
  {
    order: '04',
    title: '副作用分层',
    summary: '请求、持久化、埋点不要和状态本体搅在一起。',
  },
  {
    order: '05',
    title: 'store 要有边界',
    summary: '按领域拆 store，而不是做一个无所不包的全局对象。',
  },
];

const guideStages = [
  {
    order: '01',
    title: '先给状态分类：不是所有数据都配叫“全局状态”',
    tag: '边界建模',
    description:
      '状态管理的第一步不是选 Pinia 还是别的库，而是判断数据到底属于哪一类。弹窗开关、输入框值这类明显是局部状态；当前登录用户、主题配置这类才更接近共享状态；接口返回列表、详情数据其实更接近服务端状态；分页参数、筛选条件很多时候又适合落在 URL。分类不清，后面一定越写越乱。',
    bestFor: ['中后台项目', '业务复杂 SPA', '多人协作项目', '长期维护产品'],
    focus: [
      '区分 local、shared、server、url state',
      '状态放在离消费点最近的位置',
      '先建模边界再选工具',
    ],
    risks: [
      '把所有数据统一塞进全局 store',
      'URL 能表达的筛选条件却只存在内存里',
      '把服务端数据和界面状态混成一层',
    ],
    language: 'ts',
    code: `type StateBucket =
  | 'local'
  | 'shared'
  | 'server'
  | 'url'

type StateDecision = {
  key: string
  bucket: StateBucket
  owner: string
}`,
  },
  {
    order: '02',
    title: '先选最小治理方案：props、provide、composable、store 是逐级升级关系',
    tag: '方案选型',
    description:
      '很多项目最大的问题不是状态库太弱，而是上来就选了过重方案。组件树浅、共享点少时，props 和 emit 就足够；跨层级但范围有限，可以用 provide/inject；同一类逻辑要在多个页面复用，组合式函数更划算；只有当状态跨页面、跨模块、需要 devtools 和持久化时，才真正需要 store。',
    bestFor: ['Vue 项目', '中小型业务模块', '渐进式重构场景', '多人协作'],
    focus: [
      '按复杂度逐级升级治理手段',
      '优先选择成本最低的可维护方案',
      '状态库只解决共享和治理，不包治百病',
    ],
    risks: [
      '小问题用大方案，维护成本反而更高',
      '多个 composable 隐式共享状态，边界不清',
      '把 store 当成事件总线和缓存池混用',
    ],
    language: 'ts',
    code: `export function useSearchFilters() {
  const keyword = ref('')
  const status = ref<'all' | 'open' | 'closed'>('all')

  const query = computed(() => ({
    keyword: keyword.value.trim(),
    status: status.value,
  }))

  return { keyword, status, query }
}`,
  },
  {
    order: '03',
    title: '源状态和派生状态要分开：能算出来的就不要再存一份',
    tag: '数据规范',
    description:
      '状态越多越难维护，其中一大来源就是重复存储。比如购物车总价、选中条数、过滤后列表，本质上都可以由源状态推导出来。如果你把这些值也写回 store，就会面临同步时机、脏数据和顺序问题。更稳的做法是只保留最少源状态，其他一律派生。',
    bestFor: ['列表筛选', '表单联动', '购物车', '中后台复杂页面'],
    focus: [
      '只存源状态，派生值走 computed 或 selector',
      '减少双向同步和重复写入',
      '确保数据来源唯一',
    ],
    risks: [
      '列表和过滤结果各存一份',
      '总数、金额、状态文本手动同步',
      '派生逻辑分散在多个组件里',
    ],
    language: 'ts',
    code: `const cartItems = ref([
  { id: 'sku-1', price: 99, count: 2 },
  { id: 'sku-2', price: 49, count: 1 },
])

const totalPrice = computed(() =>
  cartItems.value.reduce((sum, item) => sum + item.price * item.count, 0),
)`,
  },
  {
    order: '04',
    title: '服务端状态要单独治理：请求缓存不是传统 store 的强项',
    tag: '服务端状态',
    description:
      '接口数据最容易被错误地塞进全局 store，然后出现缓存失效、重复请求、旧数据闪回等问题。服务端状态和本地状态不是一回事，它需要关心请求生命周期、缓存时间、失效策略、并发覆盖和重新获取。真正稳定的做法是把接口状态当作单独一层来管理。',
    bestFor: ['列表页', '详情页', '高频查询页面', '多标签联动后台'],
    focus: [
      '区分请求缓存和界面状态',
      '定义 stale time、refresh、invalidate 规则',
      '避免页面切换时反复重复请求',
    ],
    risks: [
      '接口结果直接永久写进 store',
      '查询参数变了却复用旧数据',
      '乐观更新后没有统一回滚策略',
    ],
    language: 'ts',
    code: `type QueryState<T> = {
  data: T | null
  loading: boolean
  error: string | null
  updatedAt: number | null
}

const userListQuery = ref<QueryState<User[]>>({
  data: null,
  loading: false,
  error: null,
  updatedAt: null,
})`,
  },
  {
    order: '05',
    title: 'store 要按领域拆，不要让一个 store 养全项目',
    tag: '工程落地',
    description:
      '好的状态管理最后一定会回到领域拆分。用户域、权限域、工作台域、订单域分别管理，各自暴露清晰的 state、action、getter 和重置逻辑。坏的项目通常有一个超级 store，什么都能放，结果谁都不敢改。领域化拆分能让状态边界、测试边界和权限边界保持一致。',
    bestFor: ['大型项目', '多团队协作', '复杂中后台', '长期维护系统'],
    focus: [
      '按领域拆 store 和 action',
      '提供 reset、hydrate、persist 等清晰入口',
      '配合 devtools 和单测保证行为可追踪',
    ],
    risks: [
      '所有 action 混在一个文件',
      '模块之间相互直接改对方状态',
      '刷新恢复、退出登录清理逻辑没有统一入口',
    ],
    language: 'ts',
    code: `export const useSessionStore = defineStore('session', () => {
  const profile = ref<UserProfile | null>(null)
  const permissions = ref<string[]>([])

  const isLoggedIn = computed(() => Boolean(profile.value))

  const reset = () => {
    profile.value = null
    permissions.value = []
  }

  return { profile, permissions, isLoggedIn, reset }
})`,
  },
];

const comparisonCards = [
  {
    title: '组合式函数 vs 全局 store',
    summary:
      '组合式函数更轻、更灵活，适合局部复用逻辑；全局 store 更适合跨页面共享、调试和持久化，但前提是边界清楚，不然只会变成更大的耦合点。',
  },
  {
    title: '本地状态 vs 服务端状态',
    summary:
      '本地状态由前端自己控制，更新时机可预测；服务端状态受网络和缓存影响，更需要请求生命周期和失效策略，而不是简单赋值。',
  },
  {
    title: '一个大 store vs 多个领域 store',
    summary:
      '一个大 store 看起来集中，实际上会迅速失控；按领域拆分更利于多人协作、测试和权限治理，也更符合长期演进。',
  },
];
</script>

<style scoped>
.state-guide-page {
  min-height: calc(100vh - 40px);
  padding: 24px;
  border: 1px solid rgba(19, 27, 34, 0.08);
  border-radius: 7px;
  background:
    radial-gradient(
      circle at top left,
      rgba(220, 227, 233, 0.48),
      transparent 28%
    ),
    linear-gradient(180deg, #fcfdfe 0%, #f3f6f8 100%);
  box-shadow: 0 30px 80px rgba(18, 26, 34, 0.08);
}

.state-guide-page__shell {
  min-height: calc(100vh - 90px);
  border: 1px solid rgba(19, 27, 34, 0.06);
  border-radius: 7px;
  background: rgba(255, 255, 255, 0.82);
}

.state-guide-page__top {
  display: flex;
  justify-content: flex-start;
  padding: 18px 18px 0;
}

.state-guide-page__back {
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

.state-guide-page__back:hover {
  transform: translateY(-1px);
  border-color: rgba(46, 70, 91, 0.18);
  box-shadow: 0 18px 34px rgba(19, 27, 34, 0.08);
}

.state-guide-page__content {
  padding: 18px 24px 24px;
}

.state-guide-hero {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 320px;
  gap: 20px;
  padding-bottom: 26px;
  border-bottom: 1px solid rgba(19, 27, 34, 0.08);
}

.state-guide-hero__eyebrow,
.state-guide-section__eyebrow,
.state-guide-card__eyebrow,
.state-guide-hero__label {
  font-size: 11px;
  line-height: 1.4;
  letter-spacing: 0.24em;
  text-transform: uppercase;
  color: #7b8793;
}

.state-guide-hero__title {
  margin-top: 10px;
  font-size: 46px;
  line-height: 1.06;
  font-weight: 600;
  letter-spacing: -0.05em;
  color: #17202a;
}

.state-guide-hero__summary {
  max-width: 860px;
  margin-top: 16px;
  font-size: 15px;
  line-height: 1.9;
  color: #58636f;
}

.state-guide-hero__panel,
.state-guide-card,
.state-guide-panel {
  border: 1px solid rgba(19, 27, 34, 0.08);
  border-radius: 7px;
  background: rgba(255, 255, 255, 0.84);
}

.state-guide-hero__panel {
  padding: 18px;
}

.state-guide-list {
  display: grid;
  gap: 8px;
  margin: 12px 0 0;
  padding-left: 18px;
  font-size: 14px;
  line-height: 1.8;
  color: #56616d;
}

.state-guide-grid,
.state-guide-columns,
.state-guide-stack {
  display: grid;
  gap: 16px;
}

.state-guide-grid {
  margin-top: 28px;
  grid-template-columns: repeat(3, minmax(0, 1fr));
}

.state-guide-card {
  padding: 18px;
}

.state-guide-card__title,
.state-guide-panel__title,
.state-guide-section__title {
  color: #17202a;
}

.state-guide-card__title {
  margin-top: 10px;
  font-size: 22px;
  line-height: 1.25;
  font-weight: 600;
}

.state-guide-card__text,
.state-guide-panel__text {
  margin-top: 12px;
  font-size: 14px;
  line-height: 1.9;
  color: #596571;
}

.state-guide-section {
  margin-top: 28px;
}

.state-guide-section__head {
  margin-bottom: 14px;
}

.state-guide-section__title {
  margin-top: 8px;
  font-size: 30px;
  line-height: 1.18;
  font-weight: 600;
  letter-spacing: -0.03em;
}

.state-guide-columns {
  grid-template-columns: repeat(3, minmax(0, 1fr));
}

.state-guide-stack {
  grid-template-columns: repeat(2, minmax(0, 1fr));
}

.state-guide-panel {
  padding: 18px;
}

.state-guide-panel.is-wide {
  grid-column: 1 / -1;
}

.state-guide-panel__eyebrow {
  font-size: 11px;
  line-height: 1.4;
  letter-spacing: 0.24em;
  text-transform: uppercase;
  color: #80909d;
}

.state-guide-panel__title {
  font-size: 20px;
  line-height: 1.3;
  font-weight: 600;
}

.state-guide-method__head {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 16px;
}

.state-guide-method__tag {
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

.state-guide-method__grid {
  display: grid;
  gap: 14px;
  margin-top: 16px;
  grid-template-columns: repeat(3, minmax(0, 1fr));
}

.state-guide-mini-panel {
  padding: 14px;
  border: 1px solid rgba(19, 27, 34, 0.08);
  border-radius: 7px;
  background: rgba(245, 248, 250, 0.9);
}

.state-guide-mini-panel__title {
  font-size: 14px;
  font-weight: 600;
  color: #17202a;
}

.state-guide-code-block {
  margin-top: 14px;
}

@media (max-width: 1080px) {
  .state-guide-hero,
  .state-guide-grid,
  .state-guide-columns,
  .state-guide-stack,
  .state-guide-method__grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 900px) {
  .state-guide-page {
    min-height: auto;
    padding: 18px;
  }

  .state-guide-page__shell {
    min-height: auto;
  }

  .state-guide-page__content {
    padding: 18px;
  }

  .state-guide-hero__title {
    font-size: 36px;
  }

  .state-guide-section__title {
    font-size: 26px;
  }
}
</style>
