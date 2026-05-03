<template>
  <section class="environment-variables-guide-page">
    <div class="environment-variables-guide-page__shell">
      <div class="environment-variables-guide-page__top">
        <RouterLink
          to="/fullstack-guide"
          class="environment-variables-guide-page__back"
          aria-label="返回全栈能力菜单"
          title="返回全栈能力菜单"
        >
          <el-icon :size="18"><ArrowLeft /></el-icon>
        </RouterLink>
      </div>

      <div class="environment-variables-guide-page__content">
        <header class="environment-variables-guide-hero">
          <div>
            <p class="environment-variables-guide-hero__eyebrow">
              Frontend Environment Variables Engineering
            </p>
            <h1 class="environment-variables-guide-hero__title">
              前端环境变量工程
            </h1>
            <p class="environment-variables-guide-hero__summary">
              这一页不是教你会写
              `.env`，而是讲清楚环境变量在前端工程里的真实边界：它负责区分构建环境、运行时注入和本地开发差异，但不该被滥用成配置中心、特性开关或者秘密仓库。真正能落地的环境变量工程，要同时管住命名、暴露范围、构建时机、部署注入和团队规范。
            </p>
          </div>

          <div class="environment-variables-guide-hero__panel">
            <p class="environment-variables-guide-hero__label">学完结果</p>
            <ul class="environment-variables-guide-list">
              <li>能分清构建期环境变量、运行时配置和特性开关的边界。</li>
              <li>能设计一套可维护的 `.env` 分层和命名规范。</li>
              <li>能把部署注入、CI/CD 和前端构建串成一条稳定链路。</li>
            </ul>
          </div>
        </header>

        <section class="environment-variables-guide-grid">
          <article
            v-for="item in quickStages"
            :key="item.order"
            class="environment-variables-guide-card"
          >
            <p class="environment-variables-guide-card__eyebrow">
              Stage {{ item.order }}
            </p>
            <h2 class="environment-variables-guide-card__title">
              {{ item.title }}
            </h2>
            <p class="environment-variables-guide-card__text">
              {{ item.summary }}
            </p>
          </article>
        </section>

        <section class="environment-variables-guide-section">
          <div class="environment-variables-guide-section__head">
            <div>
              <p class="environment-variables-guide-section__eyebrow">
                Decision Order
              </p>
              <h2 class="environment-variables-guide-section__title">
                先分清变量生命周期，再决定它应该被谁读取
              </h2>
            </div>
          </div>

          <div class="environment-variables-guide-stack">
            <article
              v-for="stage in guideStages"
              :key="stage.order"
              class="environment-variables-guide-panel is-wide"
            >
              <div class="environment-variables-guide-method__head">
                <div>
                  <p class="environment-variables-guide-panel__eyebrow">
                    Stage {{ stage.order }}
                  </p>
                  <h3 class="environment-variables-guide-panel__title">
                    {{ stage.title }}
                  </h3>
                </div>
                <span class="environment-variables-guide-method__tag">
                  {{ stage.tag }}
                </span>
              </div>

              <p class="environment-variables-guide-panel__text">
                {{ stage.description }}
              </p>

              <div class="environment-variables-guide-method__grid">
                <section class="environment-variables-guide-mini-panel">
                  <p class="environment-variables-guide-mini-panel__title">
                    适用场景
                  </p>
                  <ul class="environment-variables-guide-list">
                    <li v-for="item in stage.bestFor" :key="item">
                      {{ item }}
                    </li>
                  </ul>
                </section>

                <section class="environment-variables-guide-mini-panel">
                  <p class="environment-variables-guide-mini-panel__title">
                    实现重点
                  </p>
                  <ul class="environment-variables-guide-list">
                    <li v-for="item in stage.focus" :key="item">
                      {{ item }}
                    </li>
                  </ul>
                </section>

                <section class="environment-variables-guide-mini-panel">
                  <p class="environment-variables-guide-mini-panel__title">
                    常见误区
                  </p>
                  <ul class="environment-variables-guide-list">
                    <li v-for="item in stage.risks" :key="item">
                      {{ item }}
                    </li>
                  </ul>
                </section>
              </div>

              <AppCodeBlock
                class="environment-variables-guide-code-block"
                :code="stage.code"
                :lang="stage.language"
              />
            </article>
          </div>
        </section>

        <section class="environment-variables-guide-section">
          <div class="environment-variables-guide-section__head">
            <div>
              <p class="environment-variables-guide-section__eyebrow">
                Comparison
              </p>
              <h2 class="environment-variables-guide-section__title">
                环境变量、配置中心、特性开关的边界要一次讲清
              </h2>
            </div>
          </div>

          <div class="environment-variables-guide-columns">
            <article
              v-for="item in comparisonCards"
              :key="item.title"
              class="environment-variables-guide-panel"
            >
              <h3 class="environment-variables-guide-panel__title">
                {{ item.title }}
              </h3>
              <p class="environment-variables-guide-panel__text">
                {{ item.summary }}
              </p>
            </article>
          </div>
        </section>

        <section class="environment-variables-guide-section">
          <div class="environment-variables-guide-section__head">
            <div>
              <p class="environment-variables-guide-section__eyebrow">
                Best Practice
              </p>
              <h2 class="environment-variables-guide-section__title">
                一个能进项目的前端环境变量规范
              </h2>
            </div>
          </div>

          <article class="environment-variables-guide-panel is-wide">
            <p class="environment-variables-guide-panel__text">
              真实项目里，环境变量最常见的失败方式不是“不会写”，而是“写得太散”。不同环境命名不一致、前端能读到不该暴露的值、构建和部署约定不统一、运行时注入后前端仍按构建期变量写死，这些都会让系统越来越脆。下面这套规则，是偏工程化、能长期维护的写法。
            </p>

            <AppCodeBlock
              class="environment-variables-guide-code-block"
              :code="envExampleCode"
              lang="typescript"
            />
          </article>

          <div class="environment-variables-guide-columns">
            <article class="environment-variables-guide-panel">
              <h3 class="environment-variables-guide-panel__title">
                前端应该坚持的原则
              </h3>
              <ul class="environment-variables-guide-list">
                <li>只把构建期差异放进环境变量，不把运行期配置混进去。</li>
                <li>以 `VITE_` 前缀暴露给前端的值必须默认公开、可审计。</li>
                <li>敏感密钥不要进前端环境变量，前端不是秘密存储器。</li>
                <li>变量命名要稳定，别在不同环境里起不同名字。</li>
              </ul>
            </article>

            <article class="environment-variables-guide-panel">
              <h3 class="environment-variables-guide-panel__title">
                部署时最容易漏掉的点
              </h3>
              <ul class="environment-variables-guide-list">
                <li>CI 里注入了变量，但前端构建缓存没清，导致值没生效。</li>
                <li>本地 `.env.local` 覆盖了测试环境变量，误判成线上故障。</li>
                <li>部署平台和本地命名不同，切换环境时经常出现空值。</li>
                <li>
                  运行时注入和构建时替换混用，最后没人知道变量到底从哪来。
                </li>
              </ul>
            </article>

            <article class="environment-variables-guide-panel">
              <h3 class="environment-variables-guide-panel__title">
                这门课最该记住的一句话
              </h3>
              <p class="environment-variables-guide-panel__text">
                环境变量不是配置中心，它只负责让同一份代码在不同构建环境下得到不同初始值。只要你把这句话记住，后面做部署、CI/CD、运行时配置和特性开关时，边界就不会轻易混掉。
              </p>
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
    title: '先分清生命周期',
    summary: '构建期、运行时、本地开发三种变量不能混写。',
  },
  {
    order: '02',
    title: '再统一命名规则',
    summary: '变量名一旦发散，后续切环境就会持续踩坑。',
  },
  {
    order: '03',
    title: '暴露范围要明确',
    summary: '能进前端的值必须默认公开，不能默认保密。',
  },
  {
    order: '04',
    title: '部署注入要闭环',
    summary: 'CI、构建、发布、运行时读取要形成稳定链路。',
  },
  {
    order: '05',
    title: '和配置中心分开',
    summary: '运行期可变配置应该走配置中心，而不是全靠环境变量。',
  },
];

const guideStages = [
  {
    order: '01',
    title: '先定义环境变量的职责边界',
    tag: '边界定义',
    description:
      '环境变量在前端工程里最常见的职责，是区分构建环境和本地开发差异，例如接口基址、站点标题、埋点开关、调试模式、静态资源域名等。它不适合承载频繁变更的业务配置，更不适合做运行期配置中心。只要把生命周期说清楚，后面的命名、部署和排错才有基础。',
    bestFor: ['不同环境接口地址', '本地开发调试', '构建期开关', '静态资源路径'],
    focus: [
      '区分构建期变量、运行期配置和特性开关',
      '保持变量只服务“编译后初始值”',
      '不要把后端秘密直接暴露到前端',
    ],
    risks: [
      '把配置中心的职责塞进 `.env`',
      '把业务参数和部署参数混为一谈',
      '以为所有平台都能用同一套注入方式',
    ],
    language: 'ts',
    code: `type EnvMode = 'local' | 'dev' | 'test' | 'prod';

type FrontendEnv = {
  mode: EnvMode;
  apiBaseUrl: string;
  appName: string;
  enableDebugPanel: boolean;
  assetsBaseUrl: string;
};`,
  },
  {
    order: '02',
    title: '命名和分层要先定规矩',
    tag: '规范设计',
    description:
      '如果 `.env.local`、`.env.development`、`.env.production`、`.env.staging` 的命名没有统一规则，团队很快会出现“同一个值到处叫不同名字”的情况。更稳妥的做法，是约定一层基础默认值，再按环境覆盖，并且只允许少量前缀变量暴露给前端。这个约束不是为了限制灵活性，而是为了让排错时一眼知道值来自哪里。',
    bestFor: ['多人协作项目', '长期维护前端工程', '多环境部署场景'],
    focus: [
      '建立 `.env` 分层覆盖顺序',
      '统一前缀和暴露规则',
      '给每个变量写用途注释和默认值说明',
    ],
    risks: [
      '同一个变量在不同环境里名字不一致',
      '本地变量悄悄覆盖线上预期值',
      '变量越加越多，没人知道哪些仍然有效',
    ],
    language: 'text',
    code: `.env
.env.local
.env.development
.env.production
.env.staging

# 只暴露给前端的值建议统一前缀
VITE_API_BASE_URL=
VITE_APP_NAME=
VITE_ENABLE_DEBUG_PANEL=`,
  },
  {
    order: '03',
    title: '构建和部署要保证变量真的生效',
    tag: '交付链路',
    description:
      '很多前端环境变量问题，不是变量没写，而是变量注入链路没闭合。最常见的情况是：CI 写进去了，构建缓存没刷新；平台配了值，前端读取还是旧包；本地能生效，线上 Docker 或静态托管环境却拿不到。工程上要把注入点、构建产物和部署目标明确分开看。',
    bestFor: ['CI/CD 流水线', 'Docker 部署', '静态站点托管'],
    focus: [
      '明确变量在“构建前”还是“运行时”注入',
      '发布时确认产物和配置版本对应',
      '对空值和错值准备默认兜底',
    ],
    risks: [
      '构建缓存导致变量不刷新',
      '生产环境和测试环境共用一套配置文件',
      '把运行时变量当成构建时常量写死',
    ],
    language: 'ts',
    code: `const getEnv = (key: string, fallback = '') => {
  const value = import.meta.env[key as keyof ImportMetaEnv];
  return typeof value === 'string' && value.length > 0 ? value : fallback;
};`,
  },
  {
    order: '04',
    title: '消费侧要做防御和校验',
    tag: '运行时防御',
    description:
      '前端不能默认相信环境变量一定存在。尤其是团队协作、CI 变更、平台迁移的时候，变量缺失比变量写错更常见。好的做法是：对变量做集中读取、统一兜底、必要时在启动时校验并提示错误，这样不会把问题拖到用户页面里才暴露。',
    bestFor: ['复杂 SPA', '多环境发布', '高可用前端工程'],
    focus: [
      '统一封装 `getEnv` 读取函数',
      '对关键变量做启动期校验',
      '保留 fallback 逻辑和错误提示',
    ],
    risks: [
      '页面各处直接读 `import.meta.env`',
      '关键值缺失后仍继续运行',
      '错误配置只在用户手上暴露',
    ],
    language: 'ts',
    code: `const requiredEnvKeys = ['VITE_API_BASE_URL', 'VITE_APP_NAME'] as const;

const missingKeys = requiredEnvKeys.filter(
  (key) => !import.meta.env[key] || String(import.meta.env[key]).trim() === '',
);

if (missingKeys.length > 0) {
  throw new Error(\`Missing env keys: \${missingKeys.join(', ')}\`);
}`,
  },
];

const comparisonCards = [
  {
    title: '环境变量 vs 配置中心',
    summary:
      '环境变量解决的是“不同环境的初始差异”，配置中心解决的是“运行期动态变更”。两者职责不同，不能互相替代。',
  },
  {
    title: '环境变量 vs 特性开关',
    summary:
      '环境变量通常面向部署环境，特性开关通常面向用户分桶或实验灰度。一个是环境维度，一个是流量维度。',
  },
  {
    title: '构建期 vs 运行时',
    summary:
      '构建期变量写进产物，运行时配置在页面加载后再读。混用这两者，往往就是线上事故的起点。',
  },
];

const envExampleCode = `// env.ts
export const env = {
  apiBaseUrl: import.meta.env.VITE_API_BASE_URL,
  appName: import.meta.env.VITE_APP_NAME,
  enableDebugPanel: import.meta.env.VITE_ENABLE_DEBUG_PANEL === 'true',
} as const;

// main.ts
if (!env.apiBaseUrl) {
  throw new Error('VITE_API_BASE_URL is required');
}`;
</script>

<style scoped>
.environment-variables-guide-page {
  min-height: calc(100vh - 40px);
  padding: 24px;
  border: 1px solid rgba(19, 27, 34, 0.08);
  border-radius: 7px;
  background:
    radial-gradient(
      circle at top right,
      rgba(223, 229, 236, 0.5),
      transparent 30%
    ),
    linear-gradient(180deg, #fbfcfd 0%, #f3f6f8 100%);
  box-shadow: 0 30px 80px rgba(18, 26, 34, 0.08);
}

.environment-variables-guide-page__shell {
  min-height: calc(100vh - 88px);
  display: flex;
  flex-direction: column;
  border-radius: 7px;
}

.environment-variables-guide-page__top {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 22px;
}

.environment-variables-guide-page__back {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 38px;
  height: 38px;
  border: 1px solid rgba(19, 27, 34, 0.08);
  border-radius: 50%;
  color: #18212a;
  background: rgba(255, 255, 255, 0.88);
  text-decoration: none;
  transition:
    transform 160ms ease,
    border-color 160ms ease,
    box-shadow 160ms ease;
}

.environment-variables-guide-page__back:hover {
  transform: translateY(-1px);
  border-color: rgba(43, 72, 101, 0.2);
  box-shadow: 0 18px 36px rgba(17, 24, 39, 0.08);
}

.environment-variables-guide-page__content {
  display: flex;
  flex-direction: column;
  gap: 22px;
}

.environment-variables-guide-hero,
.environment-variables-guide-panel,
.environment-variables-guide-card {
  border: 1px solid rgba(19, 27, 34, 0.08);
  border-radius: 7px;
  background: #fff;
  box-shadow: 0 24px 60px rgba(15, 23, 42, 0.05);
}

.environment-variables-guide-hero {
  display: grid;
  grid-template-columns: minmax(0, 1.6fr) minmax(260px, 0.8fr);
  gap: 20px;
  padding: 28px;
}

.environment-variables-guide-hero__eyebrow,
.environment-variables-guide-section__eyebrow,
.environment-variables-guide-card__eyebrow,
.environment-variables-guide-panel__eyebrow,
.environment-variables-guide-hero__label,
.environment-variables-guide-method__tag,
.environment-variables-guide-mini-panel__title {
  font-size: 11px;
  line-height: 1.4;
  letter-spacing: 0.24em;
  text-transform: uppercase;
  color: #7b8794;
}

.environment-variables-guide-hero__title {
  margin-top: 10px;
  font-size: 42px;
  line-height: 1.08;
  font-weight: 600;
  letter-spacing: -0.04em;
  color: #16202a;
}

.environment-variables-guide-hero__summary {
  margin-top: 16px;
  max-width: 820px;
  font-size: 15px;
  line-height: 1.9;
  color: #52606d;
}

.environment-variables-guide-hero__panel {
  align-self: stretch;
  padding: 22px;
  border: 1px solid rgba(19, 27, 34, 0.08);
  border-radius: 7px;
  background: linear-gradient(180deg, #fbfcfd 0%, #f4f7fa 100%);
}

.environment-variables-guide-grid {
  display: grid;
  grid-template-columns: repeat(5, minmax(0, 1fr));
  gap: 16px;
}

.environment-variables-guide-card {
  padding: 20px;
}

.environment-variables-guide-card__title,
.environment-variables-guide-panel__title,
.environment-variables-guide-section__title {
  color: #16202a;
}

.environment-variables-guide-card__title {
  margin-top: 10px;
  font-size: 20px;
  line-height: 1.35;
  font-weight: 600;
}

.environment-variables-guide-card__text,
.environment-variables-guide-panel__text,
.environment-variables-guide-list {
  font-size: 14px;
  line-height: 1.9;
  color: #52606d;
}

.environment-variables-guide-section {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.environment-variables-guide-section__head {
  display: flex;
  align-items: end;
  justify-content: space-between;
  gap: 16px;
}

.environment-variables-guide-section__title {
  margin-top: 8px;
  font-size: 28px;
  line-height: 1.25;
  font-weight: 600;
  letter-spacing: -0.03em;
}

.environment-variables-guide-stack,
.environment-variables-guide-columns {
  display: grid;
  gap: 16px;
}

.environment-variables-guide-columns {
  grid-template-columns: repeat(3, minmax(0, 1fr));
}

.environment-variables-guide-panel {
  padding: 24px;
}

.environment-variables-guide-panel.is-wide {
  padding: 26px;
}

.environment-variables-guide-method__head {
  display: flex;
  align-items: start;
  justify-content: space-between;
  gap: 16px;
}

.environment-variables-guide-method__tag {
  display: inline-flex;
  align-items: center;
  min-height: 32px;
  padding: 0 12px;
  border: 1px solid rgba(19, 27, 34, 0.08);
  border-radius: 999px;
  background: #f5f8fa;
}

.environment-variables-guide-panel__text {
  margin-top: 14px;
}

.environment-variables-guide-method__grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 14px;
  margin-top: 18px;
}

.environment-variables-guide-mini-panel {
  padding: 18px;
  border: 1px solid rgba(19, 27, 34, 0.08);
  border-radius: 7px;
  background: linear-gradient(180deg, #fdfefe 0%, #f7fafc 100%);
}

.environment-variables-guide-list {
  margin: 12px 0 0;
  padding-left: 18px;
}

.environment-variables-guide-code-block {
  margin-top: 18px;
}

@media (max-width: 1180px) {
  .environment-variables-guide-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .environment-variables-guide-columns,
  .environment-variables-guide-method__grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 900px) {
  .environment-variables-guide-hero {
    grid-template-columns: 1fr;
    padding: 22px;
  }

  .environment-variables-guide-hero__title {
    font-size: 34px;
  }

  .environment-variables-guide-grid {
    grid-template-columns: 1fr;
  }

  .environment-variables-guide-panel,
  .environment-variables-guide-panel.is-wide,
  .environment-variables-guide-card {
    padding: 20px;
  }
}
</style>
