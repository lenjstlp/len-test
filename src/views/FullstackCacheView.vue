<template>
  <section class="cache-guide-page">
    <div class="cache-guide-page__shell">
      <div class="cache-guide-page__top">
        <RouterLink
          to="/fullstack-guide"
          class="cache-guide-page__back"
          aria-label="返回全栈能力菜单"
          title="返回全栈能力菜单"
        >
          <el-icon :size="18"><ArrowLeft /></el-icon>
        </RouterLink>
      </div>

      <div class="cache-guide-page__content">
        <header class="cache-guide-hero">
          <div>
            <p class="cache-guide-hero__eyebrow">Frontend Cache</p>
            <h1 class="cache-guide-hero__title">前端缓存能力</h1>
            <p class="cache-guide-hero__summary">
              这一页按渡一教育公开内容里讲浏览器缓存的思路来组织：先把“缓存到底发生在哪一层”讲清楚，再讲强缓存、协商缓存、版本指纹和业务数据缓存。重点不是只背
              `Cache-Control`
              几个值，而是先判断资源是哪一类，再决定该用什么缓存策略。
            </p>
          </div>

          <div class="cache-guide-hero__panel">
            <p class="cache-guide-hero__label">学完结果</p>
            <ul class="cache-guide-list">
              <li>
                能分清 memory cache、disk cache、HTTP 缓存和业务缓存不是一回事。
              </li>
              <li>能按静态资源、HTML、接口数据三类资源分别设计缓存策略。</li>
              <li>
                能说清强缓存、协商缓存、版本指纹和缓存失效之间的边界关系。
              </li>
            </ul>
          </div>
        </header>

        <section class="cache-guide-grid">
          <article
            v-for="item in quickStages"
            :key="item.order"
            class="cache-guide-card"
          >
            <p class="cache-guide-card__eyebrow">Stage {{ item.order }}</p>
            <h2 class="cache-guide-card__title">{{ item.title }}</h2>
            <p class="cache-guide-card__text">{{ item.summary }}</p>
          </article>
        </section>

        <section class="cache-guide-section">
          <div class="cache-guide-section__head">
            <div>
              <p class="cache-guide-section__eyebrow">Decision Order</p>
              <h2 class="cache-guide-section__title">
                缓存不是一个头字段，而是一套分层判断模型
              </h2>
            </div>
          </div>

          <div class="cache-guide-stack">
            <article
              v-for="stage in guideStages"
              :key="stage.order"
              class="cache-guide-panel is-wide"
            >
              <div class="cache-guide-method__head">
                <div>
                  <p class="cache-guide-panel__eyebrow">
                    Stage {{ stage.order }}
                  </p>
                  <h3 class="cache-guide-panel__title">{{ stage.title }}</h3>
                </div>
                <span class="cache-guide-method__tag">{{ stage.tag }}</span>
              </div>

              <p class="cache-guide-panel__text">{{ stage.description }}</p>

              <div class="cache-guide-method__grid">
                <section class="cache-guide-mini-panel">
                  <p class="cache-guide-mini-panel__title">适用场景</p>
                  <ul class="cache-guide-list">
                    <li v-for="item in stage.bestFor" :key="item">
                      {{ item }}
                    </li>
                  </ul>
                </section>

                <section class="cache-guide-mini-panel">
                  <p class="cache-guide-mini-panel__title">实现重点</p>
                  <ul class="cache-guide-list">
                    <li v-for="item in stage.focus" :key="item">
                      {{ item }}
                    </li>
                  </ul>
                </section>

                <section class="cache-guide-mini-panel">
                  <p class="cache-guide-mini-panel__title">常见误区</p>
                  <ul class="cache-guide-list">
                    <li v-for="item in stage.risks" :key="item">
                      {{ item }}
                    </li>
                  </ul>
                </section>
              </div>

              <AppCodeBlock
                class="cache-guide-code-block"
                :code="stage.code"
                :lang="stage.language"
              />
            </article>
          </div>
        </section>

        <section class="cache-guide-section">
          <div class="cache-guide-section__head">
            <div>
              <p class="cache-guide-section__eyebrow">Comparison</p>
              <h2 class="cache-guide-section__title">
                什么时候靠 HTTP 缓存，什么时候靠业务缓存
              </h2>
            </div>
          </div>

          <div class="cache-guide-columns">
            <article
              v-for="item in comparisonCards"
              :key="item.title"
              class="cache-guide-panel"
            >
              <h3 class="cache-guide-panel__title">{{ item.title }}</h3>
              <p class="cache-guide-panel__text">{{ item.summary }}</p>
            </article>
          </div>
        </section>

        <section class="cache-guide-section">
          <div class="cache-guide-section__head">
            <div>
              <p class="cache-guide-section__eyebrow">Checklist</p>
              <h2 class="cache-guide-section__title">
                一套足够稳的缓存落地清单
              </h2>
            </div>
          </div>

          <article class="cache-guide-panel is-wide">
            <ul class="cache-guide-list">
              <li>HTML 不要做长时间强缓存，通常只做协商缓存或短时缓存。</li>
              <li>
                带 hash 的静态资源优先长效强缓存，真正靠文件名变更完成失效。
              </li>
              <li>
                接口数据别只盯浏览器 HTTP 缓存，更多时候要做业务层 stale time
                和手动失效。
              </li>
              <li>
                强缓存失效后才会进入协商缓存，所以别把它们当成互斥二选一。
              </li>
              <li>
                排查缓存问题时先看资源类型、响应头和构建产物命名，再看代码层缓存。
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
    title: '先分清缓存发生在哪',
    summary: '浏览器内存缓存、磁盘缓存、HTTP 缓存和应用层缓存是不同层面的事。',
  },
  {
    order: '02',
    title: '静态资源优先看指纹',
    summary: '带 hash 的 JS/CSS 才适合放心给长效强缓存。',
  },
  {
    order: '03',
    title: 'HTML 不适合长缓存',
    summary: '入口 HTML 往往承载最新资源索引，缓存策略必须保守。',
  },
  {
    order: '04',
    title: '接口数据更多是业务缓存',
    summary: 'HTTP 缓存能帮一部分，但数据新鲜度多数还是应用层在管。',
  },
  {
    order: '05',
    title: '缓存策略必须跟资源类型绑定',
    summary: '别拿同一套缓存头去打所有资源，风险很大。',
  },
];

const guideStages = [
  {
    order: '01',
    title: '先理解浏览器缓存不是一个抽屉，而是多层结构',
    tag: '基础认知',
    description:
      '渡一教育公开讲缓存时，通常会先把浏览器缓存分层讲清楚。因为很多人一提缓存就只想到强缓存和协商缓存，但真实浏览器里还涉及 memory cache、disk cache 以及页面关闭后的持久化表现。只有先知道资源可能被存在哪一层，后面再看响应头才不会混乱。',
    bestFor: ['浏览器缓存入门', '前端网络基础', '性能排查'],
    focus: [
      '明确 memory cache 和 disk cache 的差异',
      '知道 HTTP 响应头只控制其中一部分行为',
      '排查时配合 DevTools Network 的 Size 和状态标识',
    ],
    risks: [
      '把所有缓存都归结到 Cache-Control',
      '看到 from memory cache 就以为服务端配置错了',
      '不知道资源关闭标签页后为什么表现不一致',
    ],
    language: 'text',
    code: `Browser Cache Layers\n- memory cache: 更快，但通常跟当前进程生命周期更相关\n- disk cache: 落盘后可跨标签页、跨进程复用\n- HTTP cache policy: 由响应头控制资源何时可复用\n- app cache/state cache: 业务层自行管理的数据缓存`,
  },
  {
    order: '02',
    title: '强缓存：先问浏览器能不能连请求都不发',
    tag: 'HTTP 基础',
    description:
      '强缓存是浏览器在本地判断资源还没过期，于是直接复用，不向服务器发请求。现在最值得记的是 Cache-Control，而不是老式的 Expires。真正工程里需要的不是死记字段，而是知道哪些资源适合走长效强缓存，哪些不适合。',
    bestFor: ['hash 静态资源', '图片字体资源', 'CDN 产物'],
    focus: [
      '优先用 Cache-Control 管控 max-age',
      '静态资源和 HTML 区分策略',
      '明确 immutable 只适用于内容指纹资源',
    ],
    risks: [
      '给入口 HTML 配了很长的 max-age',
      '无 hash 文件却配置长效强缓存',
      '还在只依赖 Expires 而忽略 Cache-Control',
    ],
    language: 'nginx',
    code: `location /assets/ {\n  add_header Cache-Control "public, max-age=31536000, immutable";\n}\n\nlocation = /index.html {\n  add_header Cache-Control "no-cache";\n}`,
  },
  {
    order: '03',
    title: '协商缓存：资源过期后，再问服务端还能不能继续用旧副本',
    tag: 'HTTP 基础',
    description:
      '协商缓存不是替代强缓存，而是强缓存失效后的第二道门。浏览器会带上 If-None-Match 或 If-Modified-Since 去问服务端：我手里的这个旧版本还有效吗？如果有效，服务端回 304，浏览器继续复用本地缓存。',
    bestFor: [
      'HTML 文件',
      '不适合长时间强缓存的资源',
      '需要保守更新策略的入口资源',
    ],
    focus: [
      '优先理解 ETag / If-None-Match',
      'Last-Modified 适合简单场景但粒度较粗',
      '304 返回时仍要保留关键缓存响应头',
    ],
    risks: [
      '把协商缓存理解成完全不走网络',
      '服务端 304 响应头不完整导致行为异常',
      '误以为 ETag 和 Last-Modified 只能二选一',
    ],
    language: 'typescript',
    code: `import express from 'express'\n\nconst app = express()\n\napp.get('/index.html', (req, res) => {\n  const etag = 'W/"build-2026-04-23"'\n\n  if (req.headers['if-none-match'] === etag) {\n    return res.status(304).setHeader('ETag', etag).end()\n  }\n\n  res.setHeader('Cache-Control', 'no-cache')\n  res.setHeader('ETag', etag)\n  res.sendFile('/dist/index.html')\n})`,
  },
  {
    order: '04',
    title: '真正稳定的静态资源缓存方案：版本指纹 + 长缓存',
    tag: '构建策略',
    description:
      '现代前端项目里，缓存做得稳不稳，核心往往不只是 HTTP 头，而是构建产物有没有 hash。只要产物名带内容指纹，你就可以大胆给长缓存；资源变了，文件名也跟着变，浏览器自然会拉新文件。这比靠人工改缓存头安全得多。',
    bestFor: ['Vite/Webpack 构建产物', 'CDN 静态资源', '长期部署产物'],
    focus: [
      '产物命名带 content hash',
      '入口 HTML 始终指向最新 hash 文件',
      '上线时先发静态资源，再切换 HTML',
    ],
    risks: [
      '先发 HTML 后发静态资源导致 404',
      '构建产物没 hash 却开长缓存',
      'CDN 缓存和源站版本切换时机混乱',
    ],
    language: 'typescript',
    code: `import { defineConfig } from 'vite'\n\nexport default defineConfig({\n  build: {\n    rollupOptions: {\n      output: {\n        entryFileNames: 'assets/[name]-[hash].js',\n        chunkFileNames: 'assets/[name]-[hash].js',\n        assetFileNames: 'assets/[name]-[hash][extname]',\n      },\n    },\n  },\n})`,
  },
  {
    order: '05',
    title: '接口数据缓存更多属于业务层：staleTime、失效和手动刷新',
    tag: '应用层缓存',
    description:
      '真正的业务开发里，接口数据大多不是靠浏览器强缓存解决，而是靠业务层数据缓存。比如列表页多久内复用旧数据、切页回来要不要立即重新请求、提交表单后哪些缓存要失效，这些其实更像状态管理和数据层设计问题。',
    bestFor: ['列表查询', '详情缓存', '后台系统数据复用', '请求库封装'],
    focus: [
      '给不同资源定义不同 staleTime',
      '提交变更后精确失效相关查询',
      '区分首屏直出、后台刷新和手动刷新',
    ],
    risks: [
      '接口数据永远读旧值不刷新',
      '任意操作都全量清缓存导致抖动',
      '把浏览器 HTTP 缓存和业务查询缓存混在一起排查',
    ],
    language: 'typescript',
    code: `const queryClient = new QueryClient({\n  defaultOptions: {\n    queries: {\n      staleTime: 30_000,\n      gcTime: 5 * 60_000,\n      refetchOnWindowFocus: false,\n    },\n  },\n})\n\nqueryClient.invalidateQueries({\n  queryKey: ['user-list'],\n})`,
  },
];

const comparisonCards = [
  {
    title: '强缓存 vs 协商缓存',
    summary:
      '强缓存命中时浏览器连请求都不发，性能更高；协商缓存会带条件请求问一次服务端，但更适合入口 HTML 这类需要谨慎更新的资源。',
  },
  {
    title: '静态资源缓存 vs 接口数据缓存',
    summary:
      '静态资源缓存主要靠 HTTP 头和构建指纹；接口数据缓存更多是业务层控制新鲜度、复用范围和失效时机，这两者不要混为一谈。',
  },
  {
    title: 'HTML 缓存 vs 带 hash 的 JS/CSS 缓存',
    summary:
      '入口 HTML 应该保守更新，通常只做 no-cache 或协商缓存；带 hash 的 JS/CSS 才适合长时间强缓存，因为文件名变化本身就是失效机制。',
  },
];
</script>

<style scoped>
.cache-guide-page {
  min-height: calc(100vh - 40px);
  padding: 24px;
  border: 1px solid rgba(19, 27, 34, 0.08);
  border-radius: 7px;
  background:
    radial-gradient(
      circle at top left,
      rgba(223, 231, 236, 0.5),
      transparent 28%
    ),
    linear-gradient(180deg, #fcfdfe 0%, #f4f7f9 100%);
  box-shadow: 0 30px 80px rgba(18, 26, 34, 0.08);
}

.cache-guide-page__shell {
  min-height: calc(100vh - 90px);
  border: 1px solid rgba(19, 27, 34, 0.06);
  border-radius: 7px;
  background: rgba(255, 255, 255, 0.82);
}

.cache-guide-page__top {
  display: flex;
  justify-content: flex-start;
  padding: 18px 18px 0;
}

.cache-guide-page__back {
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

.cache-guide-page__back:hover {
  transform: translateY(-1px);
  border-color: rgba(46, 70, 91, 0.18);
  box-shadow: 0 18px 34px rgba(19, 27, 34, 0.08);
}

.cache-guide-page__content {
  padding: 18px 24px 24px;
}

.cache-guide-hero {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 320px;
  gap: 20px;
  padding-bottom: 26px;
  border-bottom: 1px solid rgba(19, 27, 34, 0.08);
}

.cache-guide-hero__eyebrow,
.cache-guide-section__eyebrow,
.cache-guide-card__eyebrow,
.cache-guide-hero__label {
  font-size: 11px;
  line-height: 1.4;
  letter-spacing: 0.24em;
  text-transform: uppercase;
  color: #7b8793;
}

.cache-guide-hero__title {
  margin-top: 10px;
  font-size: 46px;
  line-height: 1.06;
  font-weight: 600;
  letter-spacing: -0.05em;
  color: #17202a;
}

.cache-guide-hero__summary {
  max-width: 860px;
  margin-top: 16px;
  font-size: 15px;
  line-height: 1.9;
  color: #58636f;
}

.cache-guide-hero__panel,
.cache-guide-card,
.cache-guide-panel {
  border: 1px solid rgba(19, 27, 34, 0.08);
  border-radius: 7px;
  background: rgba(255, 255, 255, 0.84);
}

.cache-guide-hero__panel {
  padding: 18px;
}

.cache-guide-list {
  display: grid;
  gap: 8px;
  margin: 12px 0 0;
  padding-left: 18px;
  font-size: 14px;
  line-height: 1.8;
  color: #56616d;
}

.cache-guide-grid,
.cache-guide-columns,
.cache-guide-stack {
  display: grid;
  gap: 16px;
}

.cache-guide-grid {
  margin-top: 28px;
  grid-template-columns: repeat(3, minmax(0, 1fr));
}

.cache-guide-card {
  padding: 18px;
}

.cache-guide-card__title,
.cache-guide-panel__title,
.cache-guide-section__title {
  color: #17202a;
}

.cache-guide-card__title {
  margin-top: 10px;
  font-size: 22px;
  line-height: 1.25;
  font-weight: 600;
}

.cache-guide-card__text,
.cache-guide-panel__text {
  margin-top: 12px;
  font-size: 14px;
  line-height: 1.9;
  color: #596571;
}

.cache-guide-section {
  margin-top: 28px;
}

.cache-guide-section__head {
  margin-bottom: 14px;
}

.cache-guide-section__title {
  margin-top: 8px;
  font-size: 30px;
  line-height: 1.18;
  font-weight: 600;
  letter-spacing: -0.03em;
}

.cache-guide-columns {
  grid-template-columns: repeat(3, minmax(0, 1fr));
}

.cache-guide-stack {
  grid-template-columns: repeat(2, minmax(0, 1fr));
}

.cache-guide-panel {
  padding: 18px;
}

.cache-guide-panel.is-wide {
  grid-column: 1 / -1;
}

.cache-guide-panel__eyebrow {
  font-size: 11px;
  line-height: 1.4;
  letter-spacing: 0.24em;
  text-transform: uppercase;
  color: #80909d;
}

.cache-guide-panel__title {
  font-size: 20px;
  line-height: 1.3;
  font-weight: 600;
}

.cache-guide-method__head {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 16px;
}

.cache-guide-method__tag {
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

.cache-guide-method__grid {
  display: grid;
  gap: 14px;
  margin-top: 16px;
  grid-template-columns: repeat(3, minmax(0, 1fr));
}

.cache-guide-mini-panel {
  padding: 14px;
  border: 1px solid rgba(19, 27, 34, 0.08);
  border-radius: 7px;
  background: rgba(245, 248, 250, 0.9);
}

.cache-guide-mini-panel__title {
  font-size: 14px;
  font-weight: 600;
  color: #17202a;
}

.cache-guide-code-block {
  margin-top: 14px;
}

@media (max-width: 1080px) {
  .cache-guide-hero,
  .cache-guide-grid,
  .cache-guide-columns,
  .cache-guide-stack,
  .cache-guide-method__grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 900px) {
  .cache-guide-page {
    min-height: auto;
    padding: 18px;
  }

  .cache-guide-page__shell {
    min-height: auto;
  }

  .cache-guide-page__content {
    padding: 18px;
  }

  .cache-guide-hero__title {
    font-size: 36px;
  }

  .cache-guide-section__title {
    font-size: 26px;
  }
}
</style>
