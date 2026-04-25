<template>
  <section class="seo-guide-page">
    <div class="seo-guide-page__shell">
      <div class="seo-guide-page__top">
        <RouterLink
          to="/fullstack-guide"
          class="seo-guide-page__back"
          aria-label="返回全栈能力菜单"
          title="返回全栈能力菜单"
        >
          <el-icon :size="18"><ArrowLeft /></el-icon>
        </RouterLink>
      </div>

      <div class="seo-guide-page__content">
        <header class="seo-guide-hero">
          <div>
            <p class="seo-guide-hero__eyebrow">Frontend SEO And Discovery</p>
            <h1 class="seo-guide-hero__title">前端 SEO 与内容发现能力</h1>
            <p class="seo-guide-hero__summary">
              这一页按真实项目建设 SEO
              能力的顺序来讲：先判断页面是否值得被搜索引擎收录，再处理渲染方式、路由可抓取性、标题与描述、结构化数据、站点地图、内部链接和发布后的监控复盘。重点不是堆关键词，而是让搜索引擎能稳定理解页面主题、结构和内容价值。
            </p>
          </div>

          <div class="seo-guide-hero__panel">
            <p class="seo-guide-hero__label">学完结果</p>
            <ul class="seo-guide-list">
              <li>
                能分清哪些页面适合做 SEO，哪些页面更适合做站内搜索或广告投放。
              </li>
              <li>
                能设计 SSR、SSG、动态渲染和纯 CSR 在搜索场景下的取舍方案。
              </li>
              <li>
                能把标题、描述、结构化数据、站点地图和收录监控组织成可长期维护的链路。
              </li>
            </ul>
          </div>
        </header>

        <section class="seo-guide-grid">
          <article
            v-for="item in quickStages"
            :key="item.order"
            class="seo-guide-card"
          >
            <p class="seo-guide-card__eyebrow">Stage {{ item.order }}</p>
            <h2 class="seo-guide-card__title">{{ item.title }}</h2>
            <p class="seo-guide-card__text">{{ item.summary }}</p>
          </article>
        </section>

        <section class="seo-guide-section">
          <div class="seo-guide-section__head">
            <div>
              <p class="seo-guide-section__eyebrow">Decision Order</p>
              <h2 class="seo-guide-section__title">
                SEO 先判断收录价值，再建设渲染链路和内容治理
              </h2>
            </div>
          </div>

          <div class="seo-guide-stack">
            <article
              v-for="stage in guideStages"
              :key="stage.order"
              class="seo-guide-panel is-wide"
            >
              <div class="seo-guide-method__head">
                <div>
                  <p class="seo-guide-panel__eyebrow">
                    Stage {{ stage.order }}
                  </p>
                  <h3 class="seo-guide-panel__title">
                    {{ stage.title }}
                  </h3>
                </div>
                <span class="seo-guide-method__tag">{{ stage.tag }}</span>
              </div>

              <p class="seo-guide-panel__text">{{ stage.description }}</p>

              <div class="seo-guide-method__grid">
                <section class="seo-guide-mini-panel">
                  <p class="seo-guide-mini-panel__title">适用场景</p>
                  <ul class="seo-guide-list">
                    <li v-for="item in stage.bestFor" :key="item">
                      {{ item }}
                    </li>
                  </ul>
                </section>

                <section class="seo-guide-mini-panel">
                  <p class="seo-guide-mini-panel__title">实现重点</p>
                  <ul class="seo-guide-list">
                    <li v-for="item in stage.focus" :key="item">
                      {{ item }}
                    </li>
                  </ul>
                </section>

                <section class="seo-guide-mini-panel">
                  <p class="seo-guide-mini-panel__title">常见误区</p>
                  <ul class="seo-guide-list">
                    <li v-for="item in stage.risks" :key="item">
                      {{ item }}
                    </li>
                  </ul>
                </section>
              </div>

              <AppCodeBlock
                class="seo-guide-code-block"
                :code="stage.code"
                :lang="stage.language"
              />
            </article>
          </div>
        </section>

        <section class="seo-guide-section">
          <div class="seo-guide-section__head">
            <div>
              <p class="seo-guide-section__eyebrow">Comparison</p>
              <h2 class="seo-guide-section__title">SEO 最关键的几组取舍</h2>
            </div>
          </div>

          <div class="seo-guide-columns">
            <article
              v-for="item in comparisonCards"
              :key="item.title"
              class="seo-guide-panel"
            >
              <h3 class="seo-guide-panel__title">{{ item.title }}</h3>
              <p class="seo-guide-panel__text">{{ item.summary }}</p>
            </article>
          </div>
        </section>

        <section class="seo-guide-section">
          <div class="seo-guide-section__head">
            <div>
              <p class="seo-guide-section__eyebrow">Checklist</p>
              <h2 class="seo-guide-section__title">
                一套能落地的前端 SEO 清单
              </h2>
            </div>
          </div>

          <article class="seo-guide-panel is-wide">
            <ul class="seo-guide-list">
              <li>
                先判断页面是否具备持续搜索价值，再决定是否投入 SSR、SSG
                或专题页建设。
              </li>
              <li>
                确保标题、描述、canonical、Open Graph
                和结构化数据都能随页面内容稳定变化。
              </li>
              <li>
                动态路由必须能被抓取，站点地图、robots
                和内部链接结构要一起设计。
              </li>
              <li>
                正文内容、标题层级、首屏可见文本和图片 alt
                要围绕真实主题，而不是堆砌关键词。
              </li>
              <li>
                发布后持续看收录、展现、点击和核心页面日志，SEO
                是运营链路，不是一次性上线动作。
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
    title: '先判断值不值得做',
    summary: '不是所有页面都值得做 SEO，先看搜索意图和内容生命周期。',
  },
  {
    order: '02',
    title: '渲染方式要对题',
    summary: '搜索场景里，SSR、SSG、动态渲染和 CSR 的取舍会直接影响收录。',
  },
  {
    order: '03',
    title: '元信息要动态化',
    summary: '标题、描述、canonical、结构化数据必须跟随页面内容同步生成。',
  },
  {
    order: '04',
    title: '内容结构先于关键词',
    summary: '标题层级、正文主题、内部链接和图片说明，比堆词更重要。',
  },
  {
    order: '05',
    title: '发布后持续监控',
    summary: 'SEO 真正见功夫的是收录、点击和日志复盘，不是上线那一刻。',
  },
];

const guideStages = [
  {
    order: '01',
    title: '先判断页面是否有被搜索的价值，不要把所有业务页都当 SEO 页面',
    tag: '问题建模',
    description:
      'SEO 不是给整个站点统一加个 title 就结束。首先要判断用户会不会通过搜索引擎寻找这类信息，页面内容是不是稳定、可公开、可持续更新。如果页面本质上是登录后数据、个性化结果页、临时状态页，那更适合做站内搜索和直达链路，而不是硬做搜索引擎收录。',
    bestFor: ['内容型站点', '文档站', '产品落地页', '可公开的专题页'],
    focus: [
      '优先挑选具备持续搜索意图的页面',
      '把登录后页面和公开收录页面拆开治理',
      '让 SEO 服务业务获客，而不是形式化覆盖',
    ],
    risks: [
      '全站所有页面统一套 SEO 模板',
      '把用户私有页暴露给搜索引擎',
      '没有稳定内容还强做收录',
    ],
    language: 'text',
    code: `SEO Decision
- 页面是否公开可访问？
- 用户是否真的会通过搜索进入？
- 内容是否具备稳定主题和持续更新价值？
- 如果答案多数是否定，优先做站内搜索和推荐链路`,
  },
  {
    order: '02',
    title: '根据页面类型选择渲染方式，SSR 和 SSG 解决的是可抓取性与首屏内容',
    tag: '渲染策略',
    description:
      '搜索引擎越来越能执行 JavaScript，但这不代表纯 CSR 就是最佳选择。对文章、文档、目录页这类稳定内容，SSG 往往成本更低且收录稳定；对频繁变化但首屏必须完整可见的页面，SSR 更稳；对内部系统或交互型页面，CSR 仍然合理。关键是首屏 HTML 是否包含清晰主题内容。 ',
    bestFor: ['内容门户', '博客站', '产品官网', '文档平台'],
    focus: [
      '按页面类型拆分 SSG、SSR 和 CSR',
      '保证首屏 HTML 含有核心主题内容',
      '把 SEO 页与重交互业务页分开建模',
    ],
    risks: [
      '所有页面统一强上 SSR',
      'CSR 页面首屏只有空壳和 loading',
      '渲染策略没有和内容类型匹配',
    ],
    language: 'ts',
    code: `export const renderModeMap = {
  '/blog/:slug': 'ssg',
  '/docs/:slug': 'ssg',
  '/product/:id': 'ssr',
  '/dashboard': 'csr',
} as const`,
  },
  {
    order: '03',
    title: '标题、描述、canonical 和结构化数据必须从内容模型里生成',
    tag: '元信息层',
    description:
      'SEO 元信息最怕两件事：一是每个页面都写成同一个模板，二是元信息和正文内容完全脱节。更稳的做法是把标题、摘要、封面、发布时间、作者、栏目这些字段纳入内容模型，再由页面渲染层自动生成 title、meta description、canonical、Open Graph 和 JSON-LD。这样才能在批量页面扩张时保持一致性。',
    bestFor: ['博客系统', 'CMS', '资讯站', '文档站'],
    focus: [
      '元信息跟内容模型统一来源',
      'canonical 避免重复内容竞争',
      '结构化数据围绕文章、产品、FAQ 等实体生成',
    ],
    risks: [
      '每页 title 只有品牌名和栏目名',
      '多个路径指向同一内容没有 canonical',
      '结构化数据写死与正文不一致',
    ],
    language: 'ts',
    code: `const seoMeta = {
  title: article.title,
  description: article.summary,
  canonical: \`https://example.com/blog/\${article.slug}\`,
  ogImage: article.cover,
  schemaType: 'Article',
}`,
  },
  {
    order: '04',
    title: '内容结构、链接结构和站点地图一起做，搜索引擎理解的是整站关系',
    tag: '信息架构',
    description:
      '单页写得再好，如果整站缺少清晰的栏目结构、面包屑、相关文章、上一页下一页和 XML sitemap，搜索引擎仍然很难理解你的内容网络。SEO 不是孤立页面优化，而是信息架构优化。前端在这里要负责把栏目页、详情页、标签页、面包屑和内部链接关系稳定地渲染出来。',
    bestFor: ['多栏目内容站', '学习平台', '产品知识库', '导航聚合页'],
    focus: [
      '标题层级、栏目页和详情页关系清晰',
      '内部链接服务主题聚类而不是随机串联',
      '站点地图、robots 和面包屑统一治理',
    ],
    risks: [
      '只有详情页没有聚合页',
      '栏目关系混乱，链接层级过深',
      '站点地图长期不更新',
    ],
    language: 'xml',
    code: `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://example.com/blog/frontend-seo</loc>
    <lastmod>2026-04-25</lastmod>
  </url>
</urlset>`,
  },
  {
    order: '05',
    title: 'SEO 上线后要持续看收录、日志和点击，不然不知道问题出在内容还是技术',
    tag: '运营治理',
    description:
      '很多团队做 SEO 的问题是上线即结束。实际上你至少要看：页面有没有被抓取、有没有被收录、标题描述是否被替换、点击率是否合理、哪些页面一直没有流量、哪些页面抓取失败。前端要配合埋点、日志和搜索控制台数据，把问题分清是渲染、元信息、链接结构还是内容质量。',
    bestFor: ['长期内容运营', '获客型产品', '多页面站点', 'SEO 团队协作场景'],
    focus: [
      '用搜索控制台和日志看抓取状态',
      '跟踪核心落地页的收录和点击变化',
      '把技术问题和内容问题拆开定位',
    ],
    risks: [
      '发布后从不看抓取和收录数据',
      '把所有流量问题都归咎于技术',
      '改版后链接失效却没人发现',
    ],
    language: 'yaml',
    code: `seo-monitoring:
  crawl:
    - sitemap freshness
    - 404 pages
    - canonical conflicts
  business:
    - indexed pages
    - top landing CTR
    - keyword page coverage`,
  },
];

const comparisonCards = [
  {
    title: 'SSR / SSG / CSR 怎么选',
    summary:
      '稳定内容优先 SSG，动态公开页优先 SSR，强交互登录态业务页可以继续用 CSR。不要把一种渲染模式套满全站。',
  },
  {
    title: '关键词堆砌 vs 主题清晰',
    summary:
      '现代 SEO 更看重页面主题、结构和满足搜索意图的能力。比起反复重复关键词，清晰的标题、摘要、正文和内部链接更有效。',
  },
  {
    title: '一次性上线 vs 长期治理',
    summary:
      'SEO 不是发版动作，而是内容、技术、监控和运营长期协作的链路。没有后续监控和复盘，优化很快失效。',
  },
];
</script>

<style scoped>
.seo-guide-page {
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

.seo-guide-page__shell {
  min-height: calc(100vh - 90px);
  border: 1px solid rgba(19, 27, 34, 0.06);
  border-radius: 7px;
  background: rgba(255, 255, 255, 0.82);
}

.seo-guide-page__top {
  display: flex;
  justify-content: flex-start;
  padding: 18px 18px 0;
}

.seo-guide-page__back {
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

.seo-guide-page__back:hover {
  transform: translateY(-1px);
  border-color: rgba(46, 70, 91, 0.18);
  box-shadow: 0 18px 34px rgba(19, 27, 34, 0.08);
}

.seo-guide-page__content {
  padding: 18px 24px 24px;
}

.seo-guide-hero {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 320px;
  gap: 20px;
  padding-bottom: 26px;
  border-bottom: 1px solid rgba(19, 27, 34, 0.08);
}

.seo-guide-hero__eyebrow,
.seo-guide-section__eyebrow,
.seo-guide-card__eyebrow,
.seo-guide-hero__label {
  font-size: 11px;
  line-height: 1.4;
  letter-spacing: 0.24em;
  text-transform: uppercase;
  color: #7b8793;
}

.seo-guide-hero__title {
  margin-top: 10px;
  font-size: 46px;
  line-height: 1.06;
  font-weight: 600;
  letter-spacing: -0.05em;
  color: #17202a;
}

.seo-guide-hero__summary {
  max-width: 860px;
  margin-top: 16px;
  font-size: 15px;
  line-height: 1.9;
  color: #58636f;
}

.seo-guide-hero__panel,
.seo-guide-card,
.seo-guide-panel {
  border: 1px solid rgba(19, 27, 34, 0.08);
  border-radius: 7px;
  background: rgba(255, 255, 255, 0.84);
}

.seo-guide-hero__panel {
  padding: 18px;
}

.seo-guide-list {
  display: grid;
  gap: 8px;
  margin: 12px 0 0;
  padding-left: 18px;
  font-size: 14px;
  line-height: 1.8;
  color: #56616d;
}

.seo-guide-grid,
.seo-guide-columns,
.seo-guide-stack {
  display: grid;
  gap: 16px;
}

.seo-guide-grid {
  margin-top: 28px;
  grid-template-columns: repeat(3, minmax(0, 1fr));
}

.seo-guide-card {
  padding: 18px;
}

.seo-guide-card__title,
.seo-guide-panel__title,
.seo-guide-section__title {
  color: #17202a;
}

.seo-guide-card__title {
  margin-top: 10px;
  font-size: 22px;
  line-height: 1.25;
  font-weight: 600;
}

.seo-guide-card__text,
.seo-guide-panel__text {
  margin-top: 12px;
  font-size: 14px;
  line-height: 1.9;
  color: #596571;
}

.seo-guide-section {
  margin-top: 28px;
}

.seo-guide-section__head {
  margin-bottom: 14px;
}

.seo-guide-section__title {
  margin-top: 8px;
  font-size: 30px;
  line-height: 1.18;
  font-weight: 600;
  letter-spacing: -0.03em;
}

.seo-guide-columns {
  grid-template-columns: repeat(3, minmax(0, 1fr));
}

.seo-guide-stack {
  grid-template-columns: repeat(2, minmax(0, 1fr));
}

.seo-guide-panel {
  padding: 18px;
}

.seo-guide-panel.is-wide {
  grid-column: 1 / -1;
}

.seo-guide-panel__eyebrow {
  font-size: 11px;
  line-height: 1.4;
  letter-spacing: 0.24em;
  text-transform: uppercase;
  color: #80909d;
}

.seo-guide-panel__title {
  font-size: 20px;
  line-height: 1.3;
  font-weight: 600;
}

.seo-guide-method__head {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 16px;
}

.seo-guide-method__tag {
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

.seo-guide-method__grid {
  display: grid;
  gap: 14px;
  margin-top: 16px;
  grid-template-columns: repeat(3, minmax(0, 1fr));
}

.seo-guide-mini-panel {
  padding: 14px;
  border: 1px solid rgba(19, 27, 34, 0.08);
  border-radius: 7px;
  background: rgba(245, 248, 250, 0.9);
}

.seo-guide-mini-panel__title {
  font-size: 14px;
  font-weight: 600;
  color: #17202a;
}

.seo-guide-code-block {
  margin-top: 14px;
}

@media (max-width: 1080px) {
  .seo-guide-hero,
  .seo-guide-grid,
  .seo-guide-columns,
  .seo-guide-stack,
  .seo-guide-method__grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 900px) {
  .seo-guide-page {
    min-height: auto;
    padding: 18px;
  }

  .seo-guide-page__shell {
    min-height: auto;
  }

  .seo-guide-page__content {
    padding: 18px;
  }

  .seo-guide-hero__title {
    font-size: 36px;
  }

  .seo-guide-section__title {
    font-size: 26px;
  }
}
</style>
