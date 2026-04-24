<template>
  <section class="deployment-guide-page">
    <div class="deployment-guide-page__shell">
      <div class="deployment-guide-page__top">
        <RouterLink
          to="/fullstack-guide"
          class="deployment-guide-page__back"
          aria-label="返回全栈能力菜单"
          title="返回全栈能力菜单"
        >
          <el-icon :size="18"><ArrowLeft /></el-icon>
        </RouterLink>
      </div>

      <div class="deployment-guide-page__content">
        <header class="deployment-guide-hero">
          <div>
            <p class="deployment-guide-hero__eyebrow">Frontend Deployment</p>
            <h1 class="deployment-guide-hero__title">前端部署能力</h1>
            <p class="deployment-guide-hero__summary">
              这一页按渡一前端常见的工程化讲法来组织：先分清构建、发布、部署和回滚不是一回事，再去讲静态资源托管、Nginx
              反向代理、环境变量注入、CI/CD、灰度和回滚策略。重点不是记几条服务器命令，而是知道前端上线为什么会出问题，以及怎么把风险提前拆掉。
            </p>
          </div>

          <div class="deployment-guide-hero__panel">
            <p class="deployment-guide-hero__label">学完结果</p>
            <ul class="deployment-guide-list">
              <li>
                能分清本地构建、静态资源发布、服务端代理和域名接入各自负责什么。
              </li>
              <li>
                能搭出一条稳定的前端发布链路，避免“打包完手传服务器”的低效方式。
              </li>
              <li>
                能把灰度、回滚、缓存失效和环境切换放进同一套上线策略里考虑。
              </li>
            </ul>
          </div>
        </header>

        <section class="deployment-guide-grid">
          <article
            v-for="item in quickStages"
            :key="item.order"
            class="deployment-guide-card"
          >
            <p class="deployment-guide-card__eyebrow">Stage {{ item.order }}</p>
            <h2 class="deployment-guide-card__title">{{ item.title }}</h2>
            <p class="deployment-guide-card__text">{{ item.summary }}</p>
          </article>
        </section>

        <section class="deployment-guide-section">
          <div class="deployment-guide-section__head">
            <div>
              <p class="deployment-guide-section__eyebrow">Decision Order</p>
              <h2 class="deployment-guide-section__title">
                前端部署先拆链路，再决定托管方式和发布策略
              </h2>
            </div>
          </div>

          <div class="deployment-guide-stack">
            <article
              v-for="stage in guideStages"
              :key="stage.order"
              class="deployment-guide-panel is-wide"
            >
              <div class="deployment-guide-method__head">
                <div>
                  <p class="deployment-guide-panel__eyebrow">
                    Stage {{ stage.order }}
                  </p>
                  <h3 class="deployment-guide-panel__title">
                    {{ stage.title }}
                  </h3>
                </div>
                <span class="deployment-guide-method__tag">
                  {{ stage.tag }}
                </span>
              </div>

              <p class="deployment-guide-panel__text">
                {{ stage.description }}
              </p>

              <div class="deployment-guide-method__grid">
                <section class="deployment-guide-mini-panel">
                  <p class="deployment-guide-mini-panel__title">适用场景</p>
                  <ul class="deployment-guide-list">
                    <li v-for="item in stage.bestFor" :key="item">
                      {{ item }}
                    </li>
                  </ul>
                </section>

                <section class="deployment-guide-mini-panel">
                  <p class="deployment-guide-mini-panel__title">实现重点</p>
                  <ul class="deployment-guide-list">
                    <li v-for="item in stage.focus" :key="item">
                      {{ item }}
                    </li>
                  </ul>
                </section>

                <section class="deployment-guide-mini-panel">
                  <p class="deployment-guide-mini-panel__title">常见误区</p>
                  <ul class="deployment-guide-list">
                    <li v-for="item in stage.risks" :key="item">
                      {{ item }}
                    </li>
                  </ul>
                </section>
              </div>

              <AppCodeBlock
                class="deployment-guide-code-block"
                :code="stage.code"
                :lang="stage.language"
              />
            </article>
          </div>
        </section>

        <section class="deployment-guide-section">
          <div class="deployment-guide-section__head">
            <div>
              <p class="deployment-guide-section__eyebrow">Comparison</p>
              <h2 class="deployment-guide-section__title">
                什么时候适合静态托管，什么时候必须接服务器层
              </h2>
            </div>
          </div>

          <div class="deployment-guide-columns">
            <article
              v-for="item in comparisonCards"
              :key="item.title"
              class="deployment-guide-panel"
            >
              <h3 class="deployment-guide-panel__title">{{ item.title }}</h3>
              <p class="deployment-guide-panel__text">{{ item.summary }}</p>
            </article>
          </div>
        </section>

        <section class="deployment-guide-section">
          <div class="deployment-guide-section__head">
            <div>
              <p class="deployment-guide-section__eyebrow">Checklist</p>
              <h2 class="deployment-guide-section__title">
                一套够稳的前端部署落地清单
              </h2>
            </div>
          </div>

          <article class="deployment-guide-panel is-wide">
            <ul class="deployment-guide-list">
              <li>
                先区分构建产物生成、文件上传发布、服务端代理和域名证书接入几个阶段。
              </li>
              <li>
                静态资源必须带 hash
                并配合缓存策略，不然上线后缓存问题会反复出现。
              </li>
              <li>
                环境变量要在构建前明确注入来源，不要上线后再临时改包内容。
              </li>
              <li>
                CI/CD 要做到自动化构建、自动化校验、自动化发布和可追踪回滚。
              </li>
              <li>
                每次上线前后都要关注监控、错误率和资源命中率，而不是只看页面能不能打开。
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
    title: '先分清部署链路',
    summary: '构建、发布、代理、回滚是四个不同动作，别混成“上线”一个词。',
  },
  {
    order: '02',
    title: '静态资源要有缓存策略',
    summary: '前端部署的高频事故之一就是缓存没控住，导致新旧资源混用。',
  },
  {
    order: '03',
    title: '环境变量要前置设计',
    summary: '接口地址、埋点环境、开关配置都要在构建时明确注入来源。',
  },
  {
    order: '04',
    title: 'CI/CD 才是规模化发布入口',
    summary: '项目一多、人员一多，手工上传就必然失控。',
  },
  {
    order: '05',
    title: '上线必须有回滚能力',
    summary: '没有回滚路径的上线，本质上就是让生产环境做测试。',
  },
];

const guideStages = [
  {
    order: '01',
    title: '先建模：前端部署不是把 dist 丢上服务器那么简单',
    tag: '基础认知',
    description:
      '渡一前端讲部署时，通常会先把几个概念拆开。构建是把源码打成产物，发布是把产物放到目标环境，部署则往往还包含代理、域名、证书和缓存策略。很多团队把这几件事混成一句“发版”，结果出了问题根本不知道该查构建、查 Nginx，还是查 CDN。',
    bestFor: ['中后台项目', '官网项目', '多环境项目', '持续交付项目'],
    focus: [
      '明确构建、发布、部署、回滚的边界',
      '先画清上线链路，再选工具',
      '让每一步都可追踪和可回退',
    ],
    risks: [
      '把上线问题都归结成“服务器有问题”',
      '没有版本记录，出问题无法回查',
      '开发环境和生产环境流程差异过大',
    ],
    language: 'text',
    code: `Frontend Deployment Pipeline
- build: 源码 -> dist 产物
- publish: dist 上传到对象存储 / CDN / 服务器
- deploy: 域名、Nginx、反向代理、证书、生效切换
- rollback: 回到上一个稳定版本并恢复流量`,
  },
  {
    order: '02',
    title: '静态资源发布先看托管方式：Nginx、对象存储、CDN 各自的边界',
    tag: '资源托管',
    description:
      '前端项目本质上是静态资源交付，所以先要决定资源落在哪。小型项目常用 Nginx 直接托管；多地域访问和高并发场景更适合对象存储加 CDN；如果还需要后端同域代理，就要把 Nginx 或网关也纳入整体方案。重点不是谁更高级，而是跟访问规模和架构匹配。',
    bestFor: ['管理后台', '官网落地页', '多地域访问项目', '静态站点'],
    focus: [
      '按流量、地域和成本决定托管方式',
      '静态资源和接口代理链路分开规划',
      '提前考虑域名、证书和 HTTPS',
    ],
    risks: [
      '所有资源都堆在单机 Nginx 上',
      'CDN 开了但缓存规则没配',
      '前端资源和接口代理混在一起改，难以排障',
    ],
    language: 'nginx',
    code: `server {
  listen 80;
  server_name admin.example.com;

  root /var/www/admin/dist;
  index index.html;

  location / {
    try_files $uri $uri/ /index.html;
  }

  location /api/ {
    proxy_pass http://127.0.0.1:8080/;
  }
}`,
  },
  {
    order: '03',
    title: '缓存策略必须和产物命名一起设计：hash、HTML、CDN 刷新要配套',
    tag: '缓存策略',
    description:
      '前端部署最典型的坑就是上线后用户拿到一半旧资源、一半新资源。真正稳的做法一定是 hash 产物配长缓存，入口 HTML 走保守策略，再配合 CDN 刷新或版本切换。只改其中一个点通常不够，因为缓存问题本来就是链路问题。',
    bestFor: ['单页应用', '组件库文档站', '高频发版项目', 'CDN 分发项目'],
    focus: [
      '静态产物带 hash 并长期缓存',
      'HTML 保守缓存或协商缓存',
      '发布顺序先资源后 HTML',
    ],
    risks: [
      'HTML 和资源都配长缓存',
      '先发 HTML 后发资源，造成 404',
      '上线后不验证资源命中和缓存生效情况',
    ],
    language: 'typescript',
    code: `import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        entryFileNames: 'assets/[name]-[hash].js',
        chunkFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash][extname]',
      },
    },
  },
})`,
  },
  {
    order: '04',
    title: '环境变量和配置注入要前置设计：别上线后手改 dist',
    tag: '环境管理',
    description:
      '很多团队上线最乱的部分，不在服务器，而在配置。开发、测试、预发、生产到底用哪个接口地址、哪个埋点环境、哪些功能开关，这些都应该在构建前或运行时配置阶段明确，而不是上线后 ssh 到机器里手动改产物。那样做一次能成，多做几次一定失控。',
    bestFor: ['多环境发布', '灰度环境', '不同地域配置', 'SaaS 项目'],
    focus: [
      '把配置来源写进构建脚本或部署脚本',
      '区分构建期常量和运行时配置',
      '不同环境保持同一套约束方式',
    ],
    risks: [
      '直接改 dist 里的 js 文件',
      '开发和生产使用不同配置机制',
      '环境切换没有记录，问题无法追踪',
    ],
    language: 'bash',
    code: `pnpm build --mode production
scp -r dist/* deploy@server:/var/www/admin/releases/20260424-01
ssh deploy@server "ln -sfn /var/www/admin/releases/20260424-01 /var/www/admin/current"
`,
  },
  {
    order: '05',
    title: 'CI/CD 和回滚要一体化：自动校验、自动发布、失败可退',
    tag: '发布闭环',
    description:
      '真正成熟的前端部署，不会停留在“脚本能跑通”。更重要的是每次提交后能自动校验、自动构建、自动发布到目标环境，并且版本可追踪、失败可回滚。这样上线流程才不会依赖某一个人记得哪些命令、哪些目录、哪些顺序。',
    bestFor: ['多人协作项目', '高频发版团队', '生产环境变更治理', '自动化交付'],
    focus: [
      '把 lint、type-check、build 放进发布前校验',
      '发布结果与 git 提交、构建号关联',
      '保留可回滚版本目录和一键切换能力',
    ],
    risks: [
      '发布前不做自动校验',
      '版本号和产物目录对不上',
      '上线失败只能手动猜上一个稳定版本',
    ],
    language: 'yaml',
    code: `name: frontend-deploy

on:
  push:
    branches: [master]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: pnpm
      - run: pnpm install --frozen-lockfile
      - run: pnpm lint
      - run: pnpm type-check
      - run: pnpm build
      - run: ./scripts/deploy-production.sh`,
  },
];

const comparisonCards = [
  {
    title: '静态托管 vs 服务器代理',
    summary:
      '纯静态托管更简单，适合接口域名独立或前后端完全分离的项目；服务器代理更适合同域部署、统一鉴权和历史路由兜底，但运维复杂度会更高。',
  },
  {
    title: '手工发布 vs CI/CD 发布',
    summary:
      '手工发布前期看起来快，但人员一多就容易漏步骤、漏校验、漏回滚；CI/CD 前期配置成本更高，但能把上线质量和可追踪性稳定下来。',
  },
  {
    title: '直接覆盖部署 vs 版本目录切换',
    summary:
      '直接覆盖简单粗暴，但一旦失败很难恢复；版本目录切换更适合正式环境，因为能快速回滚并保留发布记录。',
  },
];
</script>

<style scoped>
.deployment-guide-page {
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

.deployment-guide-page__shell {
  min-height: calc(100vh - 90px);
  border: 1px solid rgba(19, 27, 34, 0.06);
  border-radius: 7px;
  background: rgba(255, 255, 255, 0.82);
}

.deployment-guide-page__top {
  display: flex;
  justify-content: flex-start;
  padding: 18px 18px 0;
}

.deployment-guide-page__back {
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

.deployment-guide-page__back:hover {
  transform: translateY(-1px);
  border-color: rgba(46, 70, 91, 0.18);
  box-shadow: 0 18px 34px rgba(19, 27, 34, 0.08);
}

.deployment-guide-page__content {
  padding: 18px 24px 24px;
}

.deployment-guide-hero {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 320px;
  gap: 20px;
  padding-bottom: 26px;
  border-bottom: 1px solid rgba(19, 27, 34, 0.08);
}

.deployment-guide-hero__eyebrow,
.deployment-guide-section__eyebrow,
.deployment-guide-card__eyebrow,
.deployment-guide-hero__label {
  font-size: 11px;
  line-height: 1.4;
  letter-spacing: 0.24em;
  text-transform: uppercase;
  color: #7b8793;
}

.deployment-guide-hero__title {
  margin-top: 10px;
  font-size: 46px;
  line-height: 1.06;
  font-weight: 600;
  letter-spacing: -0.05em;
  color: #17202a;
}

.deployment-guide-hero__summary {
  max-width: 860px;
  margin-top: 16px;
  font-size: 15px;
  line-height: 1.9;
  color: #58636f;
}

.deployment-guide-hero__panel,
.deployment-guide-card,
.deployment-guide-panel {
  border: 1px solid rgba(19, 27, 34, 0.08);
  border-radius: 7px;
  background: rgba(255, 255, 255, 0.84);
}

.deployment-guide-hero__panel {
  padding: 18px;
}

.deployment-guide-list {
  display: grid;
  gap: 8px;
  margin: 12px 0 0;
  padding-left: 18px;
  font-size: 14px;
  line-height: 1.8;
  color: #56616d;
}

.deployment-guide-grid,
.deployment-guide-columns,
.deployment-guide-stack {
  display: grid;
  gap: 16px;
}

.deployment-guide-grid {
  margin-top: 28px;
  grid-template-columns: repeat(3, minmax(0, 1fr));
}

.deployment-guide-card {
  padding: 18px;
}

.deployment-guide-card__title,
.deployment-guide-panel__title,
.deployment-guide-section__title {
  color: #17202a;
}

.deployment-guide-card__title {
  margin-top: 10px;
  font-size: 22px;
  line-height: 1.25;
  font-weight: 600;
}

.deployment-guide-card__text,
.deployment-guide-panel__text {
  margin-top: 12px;
  font-size: 14px;
  line-height: 1.9;
  color: #596571;
}

.deployment-guide-section {
  margin-top: 28px;
}

.deployment-guide-section__head {
  margin-bottom: 14px;
}

.deployment-guide-section__title {
  margin-top: 8px;
  font-size: 30px;
  line-height: 1.18;
  font-weight: 600;
  letter-spacing: -0.03em;
}

.deployment-guide-columns {
  grid-template-columns: repeat(3, minmax(0, 1fr));
}

.deployment-guide-stack {
  grid-template-columns: repeat(2, minmax(0, 1fr));
}

.deployment-guide-panel {
  padding: 18px;
}

.deployment-guide-panel.is-wide {
  grid-column: 1 / -1;
}

.deployment-guide-panel__eyebrow {
  font-size: 11px;
  line-height: 1.4;
  letter-spacing: 0.24em;
  text-transform: uppercase;
  color: #80909d;
}

.deployment-guide-panel__title {
  font-size: 20px;
  line-height: 1.3;
  font-weight: 600;
}

.deployment-guide-method__head {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 16px;
}

.deployment-guide-method__tag {
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

.deployment-guide-method__grid {
  display: grid;
  gap: 14px;
  margin-top: 16px;
  grid-template-columns: repeat(3, minmax(0, 1fr));
}

.deployment-guide-mini-panel {
  padding: 14px;
  border: 1px solid rgba(19, 27, 34, 0.08);
  border-radius: 7px;
  background: rgba(245, 248, 250, 0.9);
}

.deployment-guide-mini-panel__title {
  font-size: 14px;
  font-weight: 600;
  color: #17202a;
}

.deployment-guide-code-block {
  margin-top: 14px;
}

@media (max-width: 1080px) {
  .deployment-guide-hero,
  .deployment-guide-grid,
  .deployment-guide-columns,
  .deployment-guide-stack,
  .deployment-guide-method__grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 900px) {
  .deployment-guide-page {
    min-height: auto;
    padding: 18px;
  }

  .deployment-guide-page__shell {
    min-height: auto;
  }

  .deployment-guide-page__content {
    padding: 18px;
  }

  .deployment-guide-hero__title {
    font-size: 36px;
  }

  .deployment-guide-section__title {
    font-size: 26px;
  }
}
</style>
