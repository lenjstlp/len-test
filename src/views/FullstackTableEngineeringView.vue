<template>
  <section class="table-engineering-guide-page">
    <div class="table-engineering-guide-page__shell">
      <div class="table-engineering-guide-page__top">
        <RouterLink
          to="/fullstack-guide"
          class="table-engineering-guide-page__back"
          aria-label="返回全栈能力菜单"
          title="返回全栈能力菜单"
        >
          <el-icon :size="18"><ArrowLeft /></el-icon>
        </RouterLink>
      </div>

      <div class="table-engineering-guide-page__content">
        <header class="table-engineering-guide-hero">
          <div>
            <p class="table-engineering-guide-hero__eyebrow">
              Frontend Table Engineering
            </p>
            <h1 class="table-engineering-guide-hero__title">
              前端表格工程能力
            </h1>
            <p class="table-engineering-guide-hero__summary">
              表格不是把接口数据渲染成 rows
              就结束。真正的工程难点在于：海量数据、复杂筛选、固定列、批量选择、行内编辑、权限按钮、列配置持久化和性能优化会同时出现。你如果没有一套稳定的表格工程方案，项目越做越大，列表页就会变成最难维护的模块。
            </p>
          </div>

          <div class="table-engineering-guide-hero__panel">
            <p class="table-engineering-guide-hero__label">学完结果</p>
            <ul class="table-engineering-guide-list">
              <li>能搭建可复用的表格查询、列配置和批量操作体系。</li>
              <li>能处理大数据量分页、虚拟滚动、固定列和多状态空态展示。</li>
              <li>能把权限、导出、搜索、筛选和编辑能力接进统一表格基座。</li>
            </ul>
          </div>
        </header>

        <section class="table-engineering-guide-grid">
          <article
            v-for="item in quickStages"
            :key="item.order"
            class="table-engineering-guide-card"
          >
            <p class="table-engineering-guide-card__eyebrow">
              Stage {{ item.order }}
            </p>
            <h2 class="table-engineering-guide-card__title">
              {{ item.title }}
            </h2>
            <p class="table-engineering-guide-card__text">{{ item.summary }}</p>
          </article>
        </section>

        <section class="table-engineering-guide-section">
          <div class="table-engineering-guide-section__head">
            <div>
              <p class="table-engineering-guide-section__eyebrow">
                Build Order
              </p>
              <h2 class="table-engineering-guide-section__title">
                先做查询与列模型，再治理性能、操作流和状态一致性
              </h2>
            </div>
          </div>

          <div class="table-engineering-guide-stack">
            <article
              v-for="stage in guideStages"
              :key="stage.order"
              class="table-engineering-guide-panel is-wide"
            >
              <div class="table-engineering-guide-method__head">
                <div>
                  <p class="table-engineering-guide-panel__eyebrow">
                    Stage {{ stage.order }}
                  </p>
                  <h3 class="table-engineering-guide-panel__title">
                    {{ stage.title }}
                  </h3>
                </div>
                <span class="table-engineering-guide-method__tag">{{
                  stage.tag
                }}</span>
              </div>

              <p class="table-engineering-guide-panel__text">
                {{ stage.description }}
              </p>

              <div class="table-engineering-guide-method__grid">
                <section class="table-engineering-guide-mini-panel">
                  <p class="table-engineering-guide-mini-panel__title">
                    适用场景
                  </p>
                  <ul class="table-engineering-guide-list">
                    <li v-for="item in stage.bestFor" :key="item">
                      {{ item }}
                    </li>
                  </ul>
                </section>

                <section class="table-engineering-guide-mini-panel">
                  <p class="table-engineering-guide-mini-panel__title">
                    实现重点
                  </p>
                  <ul class="table-engineering-guide-list">
                    <li v-for="item in stage.focus" :key="item">
                      {{ item }}
                    </li>
                  </ul>
                </section>

                <section class="table-engineering-guide-mini-panel">
                  <p class="table-engineering-guide-mini-panel__title">
                    常见误区
                  </p>
                  <ul class="table-engineering-guide-list">
                    <li v-for="item in stage.risks" :key="item">
                      {{ item }}
                    </li>
                  </ul>
                </section>
              </div>

              <AppCodeBlock
                class="table-engineering-guide-code-block"
                :code="stage.code"
                :lang="stage.language"
              />
            </article>
          </div>
        </section>

        <section class="table-engineering-guide-section">
          <div class="table-engineering-guide-section__head">
            <div>
              <p class="table-engineering-guide-section__eyebrow">Comparison</p>
              <h2 class="table-engineering-guide-section__title">
                表格工程里最容易混淆的几组设计问题
              </h2>
            </div>
          </div>

          <div class="table-engineering-guide-columns">
            <article
              v-for="item in comparisonCards"
              :key="item.title"
              class="table-engineering-guide-panel"
            >
              <h3 class="table-engineering-guide-panel__title">
                {{ item.title }}
              </h3>
              <p class="table-engineering-guide-panel__text">
                {{ item.summary }}
              </p>
            </article>
          </div>
        </section>

        <section class="table-engineering-guide-section">
          <div class="table-engineering-guide-section__head">
            <div>
              <p class="table-engineering-guide-section__eyebrow">Checklist</p>
              <h2 class="table-engineering-guide-section__title">
                一套能落地的前端表格工程建设清单
              </h2>
            </div>
          </div>

          <article class="table-engineering-guide-panel is-wide">
            <ul class="table-engineering-guide-list">
              <li>
                先统一查询参数、分页、排序和筛选模型，不要每个页面各写一套。
              </li>
              <li>
                列配置要支持显隐、顺序、宽度和持久化，避免不断复制粘贴列定义。
              </li>
              <li>
                大数据量表格优先考虑虚拟滚动和懒渲染，而不是盲目堆分页大小。
              </li>
              <li>批量选择、权限按钮、导出和行内操作要共享统一的行为协议。</li>
              <li>
                列表加载、空态、异常态、无权限态必须明确区分，避免用户无从判断。
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
    title: '先统一查询模型',
    summary:
      '分页、排序、筛选、搜索关键字必须先建统一协议，不然后续所有列表页都会各说各话。',
  },
  {
    order: '02',
    title: '列定义要工程化',
    summary:
      '表头展示、宽度、显隐、格式化和权限控制都应该围绕列配置工作，而不是写死在模板里。',
  },
  {
    order: '03',
    title: '状态管理要完整',
    summary:
      '加载中、空结果、错误重试、无权限和局部刷新都要设计清楚，不能只关心成功态。',
  },
  {
    order: '04',
    title: '操作流要可复用',
    summary:
      '批量选择、行操作、行内编辑、导出、刷新都应该是统一协议，避免页面越多越难维护。',
  },
  {
    order: '05',
    title: '大数据量优先保性能',
    summary:
      '当列表成百上千行时，虚拟滚动、惰性渲染和字段裁剪比盲目加机器更有效。',
  },
];

const guideStages = [
  {
    order: '01',
    title: '定义表格查询协议和状态基座',
    tag: 'Schema First',
    description:
      '表格工程第一步不是选组件库，而是先把 query、pagination、sorter、filters、selection 和 loading state 定成一套统一协议。协议不统一，后面封装再多组件也只是把混乱包装起来。',
    bestFor: [
      '有大量后台列表页和复杂筛选条件的系统',
      '列表页需要保存查询条件并支持返回恢复的场景',
      '多个团队共用同一套查询和表格基座的项目',
    ],
    focus: [
      '分页、排序、筛选、关键字和视图状态统一抽象',
      '定义请求前的参数转换和响应后的结果映射',
      '把查询状态、结果状态和交互状态分层管理',
    ],
    risks: [
      '每个页面自己拼接口参数，后续联调和复用成本极高',
      '查询条件和 URL、缓存、返回恢复没有打通，体验很差',
      '把表格交互状态全部塞进组件内部，难以跨模块协作',
    ],
    language: 'ts',
    code: `interface TableQuery {
  page: number;
  pageSize: number;
  keyword?: string;
  sorter?: {
    field: string;
    order: 'asc' | 'desc';
  };
  filters: Record<string, string[]>;
}

interface TableResult<T> {
  list: T[];
  total: number;
}

const createDefaultQuery = (): TableQuery => ({
  page: 1,
  pageSize: 20,
  filters: {},
});`,
  },
  {
    order: '02',
    title: '用列配置驱动展示和权限',
    tag: 'Column Driven',
    description:
      '一旦表格列开始变多，靠模板硬写就会迅速崩溃。正确方式是用列配置来驱动标题、宽度、固定列、格式化、权限显示和 tooltip 规则。这样不同页面只是业务列组合不同，而不是每次都重造一个表格。',
    bestFor: [
      '列表列较多、字段格式化复杂的业务系统',
      '同一实体在多个页面需要不同列组合的场景',
      '需要按权限动态隐藏列和操作按钮的后台',
    ],
    focus: [
      '定义 columns schema，统一 header、cell、width 和 fixed',
      '列渲染逻辑支持格式化器和插槽扩展',
      '列配置与权限、导出字段和搜索项建立映射',
    ],
    risks: [
      '把格式化逻辑直接写满模板，难测也难复用',
      '列显隐和导出字段各管各的，最后数据对不上',
      '固定列和宽度策略没有统一约束，布局经常错位',
    ],
    language: 'ts',
    code: `interface TableColumn<Row> {
  key: string;
  title: string;
  width?: number;
  fixed?: 'left' | 'right';
  hidden?: boolean;
  permissionCode?: string;
  formatter?: (row: Row) => string;
}

const buildVisibleColumns = <Row>(
  columns: TableColumn<Row>[],
  permissions: Set<string>,
) =>
  columns.filter((column) => {
    if (column.hidden) return false;
    if (!column.permissionCode) return true;
    return permissions.has(column.permissionCode);
  });`,
  },
  {
    order: '03',
    title: '规范批量操作和行内行为',
    tag: 'Action Flow',
    description:
      '真正麻烦的不是渲染数据，而是操作数据。选择、批量删除、批量审核、单行编辑、导出当前筛选结果，这些都需要稳定的动作协议。否则每个列表页都自己维护一套选中态和操作确认，bug 会非常多。',
    bestFor: [
      '存在批量审核、批量导出、批量分配的后台系统',
      '行内编辑和操作按钮较多的业务列表页',
      '需要结合权限、状态机和二次确认的复杂操作场景',
    ],
    focus: [
      '统一 selection keys、disabled logic 和 action guards',
      '批量操作前先校验选中项状态是否合法',
      '操作完成后局部刷新数据并重算选中状态',
    ],
    risks: [
      '选中态依赖整行对象引用，翻页或刷新后容易失真',
      '批量操作不校验状态，用户一键提交后半成功半失败',
      '操作成功后全页刷新，导致筛选上下文和滚动位置丢失',
    ],
    language: 'ts',
    code: `const selectedRowKeys = ref<string[]>([]);

const canBatchApprove = computed(() =>
  currentRows.value
    .filter((row) => selectedRowKeys.value.includes(row.id))
    .every((row) => row.status === 'pending'),
);

const handleBatchApprove = async () => {
  if (!canBatchApprove.value) return;

  await request.post('/api/orders/batch-approve', {
    ids: selectedRowKeys.value,
  });

  await reloadTable({ keepPage: true });
};`,
  },
  {
    order: '04',
    title: '针对大表格治理性能瓶颈',
    tag: 'Performance',
    description:
      '列表卡顿的根源通常不是接口慢，而是一次渲染太多节点、固定列重复布局、单元格格式化过重或者滚动联动频繁。大表格必须从数据量、渲染量和交互量三个维度下手，必要时引入虚拟滚动和延迟渲染。',
    bestFor: [
      '单页数据量大、字段多、操作频繁的工作台',
      '涉及明细展开、树形结构和固定列的大型表格',
      '需要在低配设备上也保持可用性的管理系统',
    ],
    focus: [
      '限制首屏行数和单元格复杂度，必要时接入虚拟列表',
      '把重量级格式化提前到数据适配层处理',
      '对滚动、列宽调整和 hover 联动做节流治理',
    ],
    risks: [
      '把所有业务逻辑堆进 cell renderer，滚动时非常容易掉帧',
      '大数据量下仍然完整渲染全部 DOM，性能必然失控',
      '忽略固定列和横向滚动联动，体验上会出现明显撕裂',
    ],
    language: 'ts',
    code: `const visibleRows = computed(() => {
  const start = Math.max(0, Math.floor(scrollTop.value / rowHeight) - overscan);
  const end = start + visibleCount + overscan * 2;

  return tableRows.value.slice(start, end);
});

const translateOffset = computed(() => {
  const start = Math.max(0, Math.floor(scrollTop.value / rowHeight) - overscan);
  return start * rowHeight;
});`,
  },
  {
    order: '05',
    title: '把表格状态与页面生态打通',
    tag: 'Integrated',
    description:
      '表格从来不是孤立组件，它要和搜索表单、详情抽屉、导出任务、权限系统、URL 参数、缓存恢复一起工作。工程化收尾的关键，就是把表格从“一个 UI 组件”升级成“页面中台能力”。',
    bestFor: [
      '列表详情联动、导出任务和路由状态恢复并存的系统',
      '同一实体既有列表页又有看板、统计和详情页的产品',
      '需要沉淀页面基座、规范新页面开发方式的团队',
    ],
    focus: [
      '支持 query 与路由、缓存和默认视图同步',
      '导出、刷新、详情侧滑和权限按钮共享同一数据上下文',
      '把空态、异常态、无权限态和引导态明确拆开',
    ],
    risks: [
      '详情抽屉、导出和筛选各拿一份数据源，最终状态难以一致',
      '刷新后丢失视图上下文，用户每次都得重新筛选',
      '无权限和无数据都展示同一个空态，业务判断混乱',
    ],
    language: 'ts',
    code: `watch(
  () => route.query,
  (query) => {
    tableQuery.value = parseRouteQuery(query);
    reloadTable();
  },
  { immediate: true },
);

const syncQueryToRoute = () => {
  router.replace({
    query: serializeTableQuery(tableQuery.value),
  });
};`,
  },
];

const comparisonCards = [
  {
    title: '普通列表组件 vs 表格工程',
    summary:
      '普通列表组件只解决展示，表格工程要同时解决查询协议、列配置、批量操作、性能和状态管理，复杂度不是一个量级。',
  },
  {
    title: '服务端分页 vs 前端分页',
    summary:
      '服务端分页适合大数据和复杂筛选，前端分页适合数据量小且已完整拿到本地的场景。两者要根据数据规模和交互目标选择，不能一刀切。',
  },
  {
    title: '固定列 vs 虚拟滚动',
    summary:
      '固定列强调横向可读性，虚拟滚动强调大数据性能，两者同时出现时实现难度会明显上升，必须提前验证组件方案和约束边界。',
  },
];
</script>

<style scoped>
.table-engineering-guide-page {
  min-height: calc(100vh - 40px);
}

.table-engineering-guide-page__shell {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.table-engineering-guide-page__top {
  display: flex;
  align-items: center;
}

.table-engineering-guide-page__back {
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

.table-engineering-guide-page__back:hover {
  transform: translateY(-1px);
  border-color: rgba(43, 72, 101, 0.2);
  box-shadow: 0 18px 36px rgba(17, 24, 39, 0.08);
}

.table-engineering-guide-page__content {
  display: flex;
  flex-direction: column;
  gap: 22px;
}

.table-engineering-guide-hero,
.table-engineering-guide-panel,
.table-engineering-guide-card {
  border: 1px solid rgba(19, 27, 34, 0.08);
  border-radius: 7px;
  background: #fff;
  box-shadow: 0 24px 60px rgba(15, 23, 42, 0.05);
}

.table-engineering-guide-hero {
  display: grid;
  grid-template-columns: minmax(0, 1.6fr) minmax(260px, 0.8fr);
  gap: 20px;
  padding: 28px;
}

.table-engineering-guide-hero__eyebrow,
.table-engineering-guide-section__eyebrow,
.table-engineering-guide-card__eyebrow,
.table-engineering-guide-panel__eyebrow,
.table-engineering-guide-hero__label,
.table-engineering-guide-method__tag,
.table-engineering-guide-mini-panel__title {
  font-size: 11px;
  line-height: 1.4;
  letter-spacing: 0.24em;
  text-transform: uppercase;
  color: #7b8794;
}

.table-engineering-guide-hero__title {
  margin-top: 10px;
  font-size: 42px;
  line-height: 1.08;
  font-weight: 600;
  letter-spacing: -0.04em;
  color: #16202a;
}

.table-engineering-guide-hero__summary {
  margin-top: 16px;
  max-width: 820px;
  font-size: 15px;
  line-height: 1.9;
  color: #52606d;
}

.table-engineering-guide-hero__panel {
  align-self: stretch;
  padding: 22px;
  border: 1px solid rgba(19, 27, 34, 0.08);
  border-radius: 7px;
  background: linear-gradient(180deg, #fbfcfd 0%, #f4f7fa 100%);
}

.table-engineering-guide-grid {
  display: grid;
  grid-template-columns: repeat(5, minmax(0, 1fr));
  gap: 16px;
}

.table-engineering-guide-card {
  padding: 20px;
}

.table-engineering-guide-card__title,
.table-engineering-guide-panel__title,
.table-engineering-guide-section__title {
  color: #16202a;
}

.table-engineering-guide-card__title {
  margin-top: 10px;
  font-size: 20px;
  line-height: 1.35;
  font-weight: 600;
}

.table-engineering-guide-card__text,
.table-engineering-guide-panel__text,
.table-engineering-guide-list {
  font-size: 14px;
  line-height: 1.9;
  color: #52606d;
}

.table-engineering-guide-section {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.table-engineering-guide-section__head {
  display: flex;
  align-items: end;
  justify-content: space-between;
  gap: 16px;
}

.table-engineering-guide-section__title {
  margin-top: 8px;
  font-size: 28px;
  line-height: 1.25;
  font-weight: 600;
  letter-spacing: -0.03em;
}

.table-engineering-guide-stack,
.table-engineering-guide-columns {
  display: grid;
  gap: 16px;
}

.table-engineering-guide-columns {
  grid-template-columns: repeat(3, minmax(0, 1fr));
}

.table-engineering-guide-panel {
  padding: 24px;
}

.table-engineering-guide-panel.is-wide {
  padding: 26px;
}

.table-engineering-guide-method__head {
  display: flex;
  align-items: start;
  justify-content: space-between;
  gap: 16px;
}

.table-engineering-guide-method__tag {
  display: inline-flex;
  align-items: center;
  min-height: 32px;
  padding: 0 12px;
  border: 1px solid rgba(19, 27, 34, 0.08);
  border-radius: 999px;
  background: #f5f8fa;
}

.table-engineering-guide-panel__text {
  margin-top: 14px;
}

.table-engineering-guide-method__grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 14px;
  margin-top: 18px;
}

.table-engineering-guide-mini-panel {
  padding: 18px;
  border: 1px solid rgba(19, 27, 34, 0.08);
  border-radius: 7px;
  background: linear-gradient(180deg, #fdfefe 0%, #f7fafc 100%);
}

.table-engineering-guide-list {
  margin: 12px 0 0;
  padding-left: 18px;
}

.table-engineering-guide-code-block {
  margin-top: 18px;
}

@media (max-width: 1180px) {
  .table-engineering-guide-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .table-engineering-guide-columns,
  .table-engineering-guide-method__grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 900px) {
  .table-engineering-guide-hero {
    grid-template-columns: 1fr;
    padding: 22px;
  }

  .table-engineering-guide-hero__title {
    font-size: 34px;
  }

  .table-engineering-guide-grid {
    grid-template-columns: 1fr;
  }

  .table-engineering-guide-panel,
  .table-engineering-guide-panel.is-wide,
  .table-engineering-guide-card {
    padding: 20px;
  }
}
</style>
