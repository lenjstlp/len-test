<template>
  <section class="tenant-guide-page">
    <div class="tenant-guide-page__shell">
      <div class="tenant-guide-page__top">
        <RouterLink
          to="/fullstack-guide"
          class="tenant-guide-page__back"
          aria-label="返回全栈能力菜单"
          title="返回全栈能力菜单"
        >
          <el-icon :size="18"><ArrowLeft /></el-icon>
        </RouterLink>
      </div>

      <div class="tenant-guide-page__content">
        <header class="tenant-guide-hero">
          <div>
            <p class="tenant-guide-hero__eyebrow">Frontend Multi Tenant</p>
            <h1 class="tenant-guide-hero__title">前端多租户能力</h1>
            <p class="tenant-guide-hero__summary">
              这一页按真实项目建设多租户前端的顺序来讲：先定义租户识别方式，再处理租户上下文注入、菜单与权限隔离、主题与配置差异、数据边界和发布治理。重点不是让页面多几个品牌色，而是确保不同租户在前端入口、配置、权限和缓存层都不会串租。
            </p>
          </div>

          <div class="tenant-guide-hero__panel">
            <p class="tenant-guide-hero__label">学完结果</p>
            <ul class="tenant-guide-list">
              <li>能分清单租户换皮和真正多租户平台的工程差异。</li>
              <li>能设计租户识别、上下文透传、缓存隔离和权限边界。</li>
              <li>能把主题、配置、菜单和发布策略纳入同一套多租户治理体系。</li>
            </ul>
          </div>
        </header>

        <section class="tenant-guide-grid">
          <article
            v-for="item in quickStages"
            :key="item.order"
            class="tenant-guide-card"
          >
            <p class="tenant-guide-card__eyebrow">Stage {{ item.order }}</p>
            <h2 class="tenant-guide-card__title">{{ item.title }}</h2>
            <p class="tenant-guide-card__text">{{ item.summary }}</p>
          </article>
        </section>

        <section class="tenant-guide-section">
          <div class="tenant-guide-section__head">
            <div>
              <p class="tenant-guide-section__eyebrow">Decision Order</p>
              <h2 class="tenant-guide-section__title">
                多租户先定义租户边界，再做配置、权限与缓存隔离
              </h2>
            </div>
          </div>

          <div class="tenant-guide-stack">
            <article
              v-for="stage in guideStages"
              :key="stage.order"
              class="tenant-guide-panel is-wide"
            >
              <div class="tenant-guide-method__head">
                <div>
                  <p class="tenant-guide-panel__eyebrow">
                    Stage {{ stage.order }}
                  </p>
                  <h3 class="tenant-guide-panel__title">{{ stage.title }}</h3>
                </div>
                <span class="tenant-guide-method__tag">{{ stage.tag }}</span>
              </div>

              <p class="tenant-guide-panel__text">{{ stage.description }}</p>

              <div class="tenant-guide-method__grid">
                <section class="tenant-guide-mini-panel">
                  <p class="tenant-guide-mini-panel__title">适用场景</p>
                  <ul class="tenant-guide-list">
                    <li v-for="item in stage.bestFor" :key="item">
                      {{ item }}
                    </li>
                  </ul>
                </section>

                <section class="tenant-guide-mini-panel">
                  <p class="tenant-guide-mini-panel__title">实现重点</p>
                  <ul class="tenant-guide-list">
                    <li v-for="item in stage.focus" :key="item">
                      {{ item }}
                    </li>
                  </ul>
                </section>

                <section class="tenant-guide-mini-panel">
                  <p class="tenant-guide-mini-panel__title">常见误区</p>
                  <ul class="tenant-guide-list">
                    <li v-for="item in stage.risks" :key="item">
                      {{ item }}
                    </li>
                  </ul>
                </section>
              </div>

              <AppCodeBlock
                class="tenant-guide-code-block"
                :code="stage.code"
                :lang="stage.language"
              />
            </article>
          </div>
        </section>

        <section class="tenant-guide-section">
          <div class="tenant-guide-section__head">
            <div>
              <p class="tenant-guide-section__eyebrow">Comparison</p>
              <h2 class="tenant-guide-section__title">
                多租户最关键的几组取舍
              </h2>
            </div>
          </div>

          <div class="tenant-guide-columns">
            <article
              v-for="item in comparisonCards"
              :key="item.title"
              class="tenant-guide-panel"
            >
              <h3 class="tenant-guide-panel__title">{{ item.title }}</h3>
              <p class="tenant-guide-panel__text">{{ item.summary }}</p>
            </article>
          </div>
        </section>

        <section class="tenant-guide-section">
          <div class="tenant-guide-section__head">
            <div>
              <p class="tenant-guide-section__eyebrow">Checklist</p>
              <h2 class="tenant-guide-section__title">
                一套能落地的前端多租户清单
              </h2>
            </div>
          </div>

          <article class="tenant-guide-panel is-wide">
            <ul class="tenant-guide-list">
              <li>
                先确定租户识别入口，是子域名、路径、登录态还是显式切换，不要多套并存。
              </li>
              <li>
                租户
                id、权限、主题和配置要统一注入上下文，避免页面各自读取和拼装。
              </li>
              <li>
                缓存 key、菜单树、请求头和本地存储都要带租户维度，防止串租。
              </li>
              <li>租户差异优先配置化，不要为了个别租户复制一套页面代码。</li>
              <li>
                发布、回滚、监控和埋点都要按租户可观测，否则线上问题很难定位。
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
    title: '先定义租户识别方式',
    summary: '先确定租户从哪里来，再谈权限、配置和页面差异。',
  },
  {
    order: '02',
    title: '上下文统一注入',
    summary: '租户 id、角色、主题、区域配置应该进入统一上下文而不是散落读取。',
  },
  {
    order: '03',
    title: '隔离比换肤重要',
    summary: '多租户的核心不是主题色，而是缓存、菜单、权限和数据边界不会串租。',
  },
  {
    order: '04',
    title: '差异优先配置化',
    summary: '租户能力差异应由配置驱动，而不是复制分叉代码。',
  },
  {
    order: '05',
    title: '发布与观测要带租户维度',
    summary: '多租户问题只有带租户标签的日志、埋点和监控，才能快速定位。',
  },
];

const guideStages = [
  {
    order: '01',
    title: '先定义什么是租户，以及前端如何识别当前租户',
    tag: '问题建模',
    description:
      '很多项目嘴上说多租户，实际上只是同一套系统做了几个品牌皮肤。真正的多租户意味着前端入口、配置、菜单、权限、数据和缓存都要带租户维度。首先要明确租户是通过子域名识别、路径参数识别、登录态绑定，还是用户主动切换。入口不稳定，后面所有隔离策略都会乱。',
    bestFor: ['SaaS 平台', '品牌化后台', '区域化业务系统', '多组织运营平台'],
    focus: [
      '统一租户识别来源',
      '把租户与用户关系建模清楚',
      '让路由、请求和页面上下文围绕租户展开',
    ],
    risks: [
      '一个系统同时支持多种租户识别方式',
      '页面自己猜当前租户',
      '登录态和租户态没有明确绑定',
    ],
    language: 'ts',
    code: `type TenantContext = {
  tenantId: string
  tenantCode: string
  theme: string
  locale: string
  permissions: string[]
}

const resolveTenantId = (hostname: string, pathname: string) => {
  if (hostname.endsWith('.example.com')) {
    return hostname.split('.')[0]
  }

  return pathname.split('/')[1]
}`,
  },
  {
    order: '02',
    title: '租户上下文要统一注入到请求、路由、菜单和配置层',
    tag: '上下文层',
    description:
      '前端多租户最怕“谁用谁去取租户信息”，因为这样很快会出现菜单、接口、缓存和主题各用各的来源。更稳的做法是，登录或首屏初始化后就把租户上下文统一装配好，通过 store、provider 或 app context 注入到整棵应用树。之后页面只消费上下文，不再重复识别。',
    bestFor: ['中大型单页应用', '多模块平台', '需要统一配置加载的项目'],
    focus: [
      '启动阶段完成租户上下文初始化',
      '请求层自动注入租户头信息',
      '菜单、文案和功能开关统一从上下文读取',
    ],
    risks: [
      '每个模块自己去 localStorage 取租户信息',
      '请求头、菜单和主题各自维护一份租户状态',
      '切换租户后部分模块没有刷新上下文',
    ],
    language: 'ts',
    code: `const tenantHeaders = {
  'x-tenant-id': tenantContext.tenantId,
  'x-tenant-code': tenantContext.tenantCode,
}

request.interceptors.request.use((config) => ({
  ...config,
  headers: {
    ...config.headers,
    ...tenantHeaders,
  },
}))`,
  },
  {
    order: '03',
    title: '菜单、权限和数据缓存都必须带租户维度，否则最容易串租',
    tag: '隔离层',
    description:
      '多租户里最危险的问题通常不是主题错了，而是 A 租户看到了 B 租户的数据、菜单或者缓存结果。前端至少要做到：权限菜单按租户隔离，缓存 key 带租户前缀，本地存储和 IndexedDB 按租户命名，请求上下文显式带租户标识。只有这样，切换租户和多租户并行登录才不会留下脏状态。',
    bestFor: ['运营后台', '医疗 SaaS', '教育平台', '多组织协作系统'],
    focus: [
      '缓存 key 带租户标识',
      '菜单与按钮权限按租户和角色双重控制',
      '本地存储和离线数据都按租户隔离',
    ],
    risks: [
      '缓存 key 只按接口路径缓存',
      '同浏览器切换租户后残留上一个租户数据',
      '菜单展示和真实权限使用不同租户源',
    ],
    language: 'ts',
    code: `const tenantCacheKey = (
  tenantId: string,
  resource: string,
  params: string,
) => \`\${tenantId}:\${resource}:\${params}\``,
  },
  {
    order: '04',
    title: '租户差异优先配置化，避免为不同租户复制页面和组件',
    tag: '配置治理',
    description:
      '多租户项目很容易走向分叉开发：甲租户一套页面，乙租户再复制一套。短期看快，长期一定失控。更好的方案是把租户差异放进配置层，例如功能开关、主题 token、文案包、表单字段策略和菜单可见性。前端页面依赖统一的渲染协议，而不是租户专用副本。',
    bestFor: ['白标产品', '品牌定制平台', '功能套餐差异明显项目'],
    focus: [
      '把租户差异收口为配置项和能力开关',
      '组件层面优先做可配置扩展点',
      '避免租户专属代码分支不断增长',
    ],
    risks: [
      '每新增一个租户就复制页面',
      '主题差异和业务差异混在一起',
      '能力开关没有版本和来源管理',
    ],
    language: 'json',
    code: `{
  "tenantId": "hospital-a",
  "theme": "medical-blue",
  "features": {
    "advancedReport": true,
    "aiAssistant": false
  },
  "menuPolicy": ["dashboard", "patient", "billing"]
}`,
  },
  {
    order: '05',
    title: '多租户必须有独立的发布、回滚和观测策略',
    tag: '工程治理',
    description:
      '多租户系统的线上问题往往不是“全站挂了”，而是某个租户出现配置错乱、权限错位或特定菜单异常。因此日志、埋点、接口追踪、配置发布和灰度开关都必须带租户维度。否则问题出现后，你只能知道“有人出问题了”，却不知道是哪一个租户、哪一套配置、哪一轮发版触发的。',
    bestFor: [
      '长期运营平台',
      '高可用 SaaS',
      '多环境部署项目',
      '需要灰度能力的团队',
    ],
    focus: [
      '日志和埋点统一带 tenantId',
      '配置变更支持租户级灰度和回滚',
      '错误监控面板可以按租户筛选',
    ],
    risks: [
      '发布只看全局成功，不看租户差异',
      '配置上线后无法追踪影响范围',
      '线上问题没有 tenantId 维度日志',
    ],
    language: 'yaml',
    code: `release:
  scope: tenant
  targetTenants:
    - hospital-a
    - hospital-b
observability:
  tags:
    - tenantId
    - releaseVersion
    - region`,
  },
];

const comparisonCards = [
  {
    title: '换肤系统 vs 真正多租户',
    summary:
      '只换主题色和 logo 还不算多租户。真正的多租户要处理租户识别、权限菜单、配置差异、缓存隔离和数据边界。',
  },
  {
    title: '代码分叉 vs 配置驱动',
    summary:
      '少量租户时复制代码看起来更快，但后续维护会爆炸。多租户长期稳定的关键是把差异配置化，而不是每个租户一套页面副本。',
  },
  {
    title: '全局治理 vs 租户粒度治理',
    summary:
      '多租户问题通常只发生在局部租户，所以发布、监控和回滚都要能下钻到租户维度，不能只看全局状态。',
  },
];
</script>

<style scoped>
.tenant-guide-page {
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

.tenant-guide-page__shell {
  min-height: calc(100vh - 90px);
  border: 1px solid rgba(19, 27, 34, 0.06);
  border-radius: 7px;
  background: rgba(255, 255, 255, 0.82);
}

.tenant-guide-page__top {
  display: flex;
  justify-content: flex-start;
  padding: 18px 18px 0;
}

.tenant-guide-page__back {
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

.tenant-guide-page__back:hover {
  transform: translateY(-1px);
  border-color: rgba(46, 70, 91, 0.18);
  box-shadow: 0 18px 34px rgba(19, 27, 34, 0.08);
}

.tenant-guide-page__content {
  padding: 18px 24px 24px;
}

.tenant-guide-hero {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 320px;
  gap: 20px;
  padding-bottom: 26px;
  border-bottom: 1px solid rgba(19, 27, 34, 0.08);
}

.tenant-guide-hero__eyebrow,
.tenant-guide-section__eyebrow,
.tenant-guide-card__eyebrow,
.tenant-guide-hero__label {
  font-size: 11px;
  line-height: 1.4;
  letter-spacing: 0.24em;
  text-transform: uppercase;
  color: #7b8793;
}

.tenant-guide-hero__title {
  margin-top: 10px;
  font-size: 46px;
  line-height: 1.06;
  font-weight: 600;
  letter-spacing: -0.05em;
  color: #17202a;
}

.tenant-guide-hero__summary {
  max-width: 860px;
  margin-top: 16px;
  font-size: 15px;
  line-height: 1.9;
  color: #58636f;
}

.tenant-guide-hero__panel,
.tenant-guide-card,
.tenant-guide-panel {
  border: 1px solid rgba(19, 27, 34, 0.08);
  border-radius: 7px;
  background: rgba(255, 255, 255, 0.84);
}

.tenant-guide-hero__panel {
  padding: 18px;
}

.tenant-guide-list {
  display: grid;
  gap: 8px;
  margin: 12px 0 0;
  padding-left: 18px;
  font-size: 14px;
  line-height: 1.8;
  color: #56616d;
}

.tenant-guide-grid,
.tenant-guide-columns,
.tenant-guide-stack {
  display: grid;
  gap: 16px;
}

.tenant-guide-grid {
  margin-top: 28px;
  grid-template-columns: repeat(3, minmax(0, 1fr));
}

.tenant-guide-card {
  padding: 18px;
}

.tenant-guide-card__title,
.tenant-guide-panel__title,
.tenant-guide-section__title {
  color: #17202a;
}

.tenant-guide-card__title {
  margin-top: 10px;
  font-size: 22px;
  line-height: 1.25;
  font-weight: 600;
}

.tenant-guide-card__text,
.tenant-guide-panel__text {
  margin-top: 12px;
  font-size: 14px;
  line-height: 1.9;
  color: #596571;
}

.tenant-guide-section {
  margin-top: 28px;
}

.tenant-guide-section__head {
  margin-bottom: 14px;
}

.tenant-guide-section__title {
  margin-top: 8px;
  font-size: 30px;
  line-height: 1.18;
  font-weight: 600;
  letter-spacing: -0.03em;
}

.tenant-guide-columns {
  grid-template-columns: repeat(3, minmax(0, 1fr));
}

.tenant-guide-stack {
  grid-template-columns: repeat(2, minmax(0, 1fr));
}

.tenant-guide-panel {
  padding: 18px;
}

.tenant-guide-panel.is-wide {
  grid-column: 1 / -1;
}

.tenant-guide-panel__eyebrow {
  font-size: 11px;
  line-height: 1.4;
  letter-spacing: 0.24em;
  text-transform: uppercase;
  color: #80909d;
}

.tenant-guide-panel__title {
  font-size: 20px;
  line-height: 1.3;
  font-weight: 600;
}

.tenant-guide-method__head {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 16px;
}

.tenant-guide-method__tag {
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

.tenant-guide-method__grid {
  display: grid;
  gap: 14px;
  margin-top: 16px;
  grid-template-columns: repeat(3, minmax(0, 1fr));
}

.tenant-guide-mini-panel {
  padding: 14px;
  border: 1px solid rgba(19, 27, 34, 0.08);
  border-radius: 7px;
  background: rgba(245, 248, 250, 0.9);
}

.tenant-guide-mini-panel__title {
  font-size: 14px;
  font-weight: 600;
  color: #17202a;
}

.tenant-guide-code-block {
  margin-top: 14px;
}

@media (max-width: 1080px) {
  .tenant-guide-hero,
  .tenant-guide-grid,
  .tenant-guide-columns,
  .tenant-guide-stack,
  .tenant-guide-method__grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 900px) {
  .tenant-guide-page {
    min-height: auto;
    padding: 18px;
  }

  .tenant-guide-page__shell {
    min-height: auto;
  }

  .tenant-guide-page__content {
    padding: 18px;
  }

  .tenant-guide-hero__title {
    font-size: 36px;
  }

  .tenant-guide-section__title {
    font-size: 26px;
  }
}
</style>
