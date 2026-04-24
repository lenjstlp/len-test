<template>
  <section class="i18n-guide-page">
    <div class="i18n-guide-page__shell">
      <div class="i18n-guide-page__top">
        <RouterLink
          to="/fullstack-guide"
          class="i18n-guide-page__back"
          aria-label="返回全栈能力菜单"
          title="返回全栈能力菜单"
        >
          <el-icon :size="18"><ArrowLeft /></el-icon>
        </RouterLink>
      </div>

      <div class="i18n-guide-page__content">
        <header class="i18n-guide-hero">
          <div>
            <p class="i18n-guide-hero__eyebrow">Frontend I18n</p>
            <h1 class="i18n-guide-hero__title">前端国际化能力</h1>
            <p class="i18n-guide-hero__summary">
              这一页按工程项目真正会踩坑的顺序来讲国际化：先确定语言切换影响哪些层，再设计文案资源组织方式，然后处理数字、时间、货币、复数和占位符，最后再落到懒加载、SEO、协作流程和质量检查。重点不是背
              `vue-i18n` API，而是知道项目为什么会把国际化做烂。
            </p>
          </div>

          <div class="i18n-guide-hero__panel">
            <p class="i18n-guide-hero__label">学完结果</p>
            <ul class="i18n-guide-list">
              <li>能分清语言切换、地区格式、时区展示不是同一个问题。</li>
              <li>能搭出可维护的文案资源结构，而不是把翻译文本散在组件里。</li>
              <li>
                能让国际化进入发布流程、测试流程和产品协作流程，而不是最后补洞。
              </li>
            </ul>
          </div>
        </header>

        <section class="i18n-guide-grid">
          <article
            v-for="item in quickStages"
            :key="item.order"
            class="i18n-guide-card"
          >
            <p class="i18n-guide-card__eyebrow">Stage {{ item.order }}</p>
            <h2 class="i18n-guide-card__title">{{ item.title }}</h2>
            <p class="i18n-guide-card__text">{{ item.summary }}</p>
          </article>
        </section>

        <section class="i18n-guide-section">
          <div class="i18n-guide-section__head">
            <div>
              <p class="i18n-guide-section__eyebrow">Decision Order</p>
              <h2 class="i18n-guide-section__title">
                国际化不要从翻译平台开始，先把边界和数据结构想清楚
              </h2>
            </div>
          </div>

          <div class="i18n-guide-stack">
            <article
              v-for="stage in guideStages"
              :key="stage.order"
              class="i18n-guide-panel is-wide"
            >
              <div class="i18n-guide-method__head">
                <div>
                  <p class="i18n-guide-panel__eyebrow">
                    Stage {{ stage.order }}
                  </p>
                  <h3 class="i18n-guide-panel__title">
                    {{ stage.title }}
                  </h3>
                </div>
                <span class="i18n-guide-method__tag">{{ stage.tag }}</span>
              </div>

              <p class="i18n-guide-panel__text">{{ stage.description }}</p>

              <div class="i18n-guide-method__grid">
                <section class="i18n-guide-mini-panel">
                  <p class="i18n-guide-mini-panel__title">适用场景</p>
                  <ul class="i18n-guide-list">
                    <li v-for="item in stage.bestFor" :key="item">
                      {{ item }}
                    </li>
                  </ul>
                </section>

                <section class="i18n-guide-mini-panel">
                  <p class="i18n-guide-mini-panel__title">实现重点</p>
                  <ul class="i18n-guide-list">
                    <li v-for="item in stage.focus" :key="item">
                      {{ item }}
                    </li>
                  </ul>
                </section>

                <section class="i18n-guide-mini-panel">
                  <p class="i18n-guide-mini-panel__title">常见误区</p>
                  <ul class="i18n-guide-list">
                    <li v-for="item in stage.risks" :key="item">
                      {{ item }}
                    </li>
                  </ul>
                </section>
              </div>

              <AppCodeBlock
                class="i18n-guide-code-block"
                :code="stage.code"
                :lang="stage.language"
              />
            </article>
          </div>
        </section>

        <section class="i18n-guide-section">
          <div class="i18n-guide-section__head">
            <div>
              <p class="i18n-guide-section__eyebrow">Comparison</p>
              <h2 class="i18n-guide-section__title">
                国际化项目最常见的几组取舍
              </h2>
            </div>
          </div>

          <div class="i18n-guide-columns">
            <article
              v-for="item in comparisonCards"
              :key="item.title"
              class="i18n-guide-panel"
            >
              <h3 class="i18n-guide-panel__title">{{ item.title }}</h3>
              <p class="i18n-guide-panel__text">{{ item.summary }}</p>
            </article>
          </div>
        </section>

        <section class="i18n-guide-section">
          <div class="i18n-guide-section__head">
            <div>
              <p class="i18n-guide-section__eyebrow">Checklist</p>
              <h2 class="i18n-guide-section__title">
                一套能落到团队协作里的国际化清单
              </h2>
            </div>
          </div>

          <article class="i18n-guide-panel is-wide">
            <ul class="i18n-guide-list">
              <li>
                文案必须全部收口到资源表，不允许组件里硬编码面向用户的文本。
              </li>
              <li>
                语言、地区、时区分别建模，避免一个 locale 字段硬扛所有语义。
              </li>
              <li>数字、日期、货币、复数和占位符格式都要有统一封装。</li>
              <li>新文案进入提测前，要有缺失检测、回退策略和截图校验流程。</li>
              <li>SEO 页面要考虑多语言路由、标题、描述和 canonical 策略。</li>
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
    title: '先拆问题',
    summary: '语言、地区、时区、排版方向分开建模，别全部塞进一个 locale。',
  },
  {
    order: '02',
    title: '先收文案',
    summary: '所有用户可见文本必须可检索、可翻译、可回退。',
  },
  {
    order: '03',
    title: '格式化要统一',
    summary: '日期、金额、百分比和复数规则都不能让每个页面自由发挥。',
  },
  {
    order: '04',
    title: '资源按需加载',
    summary: '语种多了以后，首屏性能和缓存策略必须跟着一起设计。',
  },
  {
    order: '05',
    title: '进入协作流程',
    summary: '国际化不是技术人自己补文案，而是产品、翻译、测试共管的工程能力。',
  },
];

const guideStages = [
  {
    order: '01',
    title: '先定义边界：到底是多语言，还是多地区、多时区产品',
    tag: '问题建模',
    description:
      '很多团队一提国际化就直接上多语言插件，但真正麻烦的往往不是翻译，而是同样一段业务数据在不同地区的展示规则不同。语言解决的是文本表达，地区影响货币、日期、单位，时区影响时间解释，阿拉伯语这类语言还会影响排版方向。边界不拆开，后面所有实现都会混乱。',
    bestFor: ['出海产品', 'SaaS 后台', '跨地区运营平台', '多语言官网'],
    focus: [
      '区分 language、region、timezone 三个维度',
      '提前确认是否需要 RTL 布局',
      '定义默认语言和回退语言',
    ],
    risks: [
      '把 locale 当成唯一配置项',
      '时间全部按浏览器本地时区展示',
      '产品规则和翻译规则耦合在一起',
    ],
    language: 'ts',
    code: `type UserLocaleProfile = {
  language: 'zh-CN' | 'en-US' | 'ja-JP'
  region: 'CN' | 'US' | 'JP'
  timezone: 'Asia/Shanghai' | 'America/New_York' | 'Asia/Tokyo'
  direction: 'ltr' | 'rtl'
}

const defaultLocaleProfile: UserLocaleProfile = {
  language: 'zh-CN',
  region: 'CN',
  timezone: 'Asia/Shanghai',
  direction: 'ltr',
}`,
  },
  {
    order: '02',
    title: '资源组织先统一：文案 key 稳定，比翻译内容本身更重要',
    tag: '资源设计',
    description:
      '国际化最怕的是 key 命名混乱。今天叫 welcome.title，明天叫 homeHeaderText，最后没人知道哪个字段还在用。更稳的方式是按业务域组织资源，把 key 当成接口契约来管理。这样产品、翻译、研发和测试围绕同一套命名工作，后面做缺失检查和批量替换也容易。',
    bestFor: ['多人协作项目', '中大型前端项目', '多语种持续迭代产品'],
    focus: [
      '按业务模块组织 message 文件',
      '统一 key 命名规则和回退规则',
      '区分静态文案与服务端返回文案',
    ],
    risks: [
      '以中文原文当 key，后期很难重构',
      '不同页面重复维护同一份文案',
      '接口返回提示直接裸展示，没有兜底',
    ],
    language: 'json',
    code: `{
  "common": {
    "actions": {
      "save": "保存",
      "cancel": "取消"
    }
  },
  "billing": {
    "invoice": {
      "title": "发票中心",
      "empty": "暂无发票数据"
    }
  }
}`,
  },
  {
    order: '03',
    title: '格式化要收口：金额、日期、复数、插值全部走统一层',
    tag: '显示规则',
    description:
      '项目里真正容易出错的不是纯文案，而是带变量的内容。比如“你有 1 条消息”和“你有 2 条消息”，英文、俄文、阿拉伯文的复数规则都不一样；金额到底展示本币还是美元，日期是 2026/04/24 还是 Apr 24, 2026，也需要统一处理。最佳实践是封装格式化工具，不让组件自己拼字符串。',
    bestFor: ['订单系统', '财务系统', '内容平台', '国际运营系统'],
    focus: [
      '统一日期、数字、货币格式化函数',
      '把变量插值交给 i18n 层处理',
      '优先使用原生 Intl 能力作为底层',
    ],
    risks: [
      '直接字符串拼接变量',
      '日期和金额在组件里各写一套',
      '忽略复数规则和单位换算',
    ],
    language: 'ts',
    code: `export const formatPrice = (
  amount: number,
  locale: string,
  currency: string,
) =>
  new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    maximumFractionDigits: 2,
  }).format(amount)

export const formatDatetime = (
  value: string,
  locale: string,
  timeZone: string,
) =>
  new Intl.DateTimeFormat(locale, {
    dateStyle: 'medium',
    timeStyle: 'short',
    timeZone,
  }).format(new Date(value))`,
  },
  {
    order: '04',
    title: '性能和加载策略要一起做：多语种资源不能一次性全塞进首屏',
    tag: '性能治理',
    description:
      '语种一多，国际化资源本身就会变成性能负担。比较稳的方案通常是默认语言内联，其他语言按路由或用户选择懒加载，同时结合缓存和版本控制。这样既不拖慢首屏，也能保证切换语言时资源可控。国际化不是只考虑体验，也必须考虑产物体积。',
    bestFor: ['单页应用', '文档站', '多语种内容站', '高访问量项目'],
    focus: [
      '默认语言尽量轻量化',
      '其他语言包按需异步加载',
      '缓存语言资源并带版本号',
    ],
    risks: [
      '所有语言包一起打进主包',
      '切换语言后重新整站刷新',
      '没有语言包缓存，导致频繁重复加载',
    ],
    language: 'ts',
    code: `const messageLoaders = {
  'zh-CN': () => import('@/locales/zh-CN.json'),
  'en-US': () => import('@/locales/en-US.json'),
  'ja-JP': () => import('@/locales/ja-JP.json'),
}

export async function ensureMessages(locale: keyof typeof messageLoaders) {
  const messages = await messageLoaders[locale]()
  return messages.default
}`,
  },
  {
    order: '05',
    title: '国际化必须进入团队流程：提词、翻译、测试、发布都要留痕',
    tag: '团队协作',
    description:
      '国际化如果只靠前端同学手动搬运文案，规模一大就必崩。更成熟的做法是把新增 key 检测、缺失翻译检查、伪语言测试、截图回归和发布前校验都纳入流程。这样国际化才是工程能力，而不是某次需求里顺手做的功能点。',
    bestFor: ['长期维护产品', '多人团队', '多角色协作项目', '高频发版项目'],
    focus: [
      '提测前自动检查缺失 key',
      '建立伪语言或拉长文案测试',
      '把翻译资源版本与代码版本关联',
    ],
    risks: [
      '翻译更新不走版本控制',
      '发布时才发现语种缺文案',
      '没有截图回归，布局溢出直到线上才暴露',
    ],
    language: 'yaml',
    code: `name: i18n-check

on:
  pull_request:

jobs:
  validate:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v4
      - run: pnpm install --frozen-lockfile
      - run: pnpm lint
      - run: pnpm type-check
      - run: pnpm test:i18n
      - run: pnpm test:screenshot`,
  },
];

const comparisonCards = [
  {
    title: '组件内写文案 vs 资源表集中管理',
    summary:
      '组件里直接写文案前期快，但一到多语言和批量替换就会全面失控；资源表集中管理前期多一步抽离，但后续维护、翻译和测试都更稳。',
  },
  {
    title: '一次性全量加载 vs 按需加载语言包',
    summary:
      '全量加载实现最简单，但语种一多会直接拖垮首屏；按需加载更符合真实项目，尤其适合后台和内容型产品。',
  },
  {
    title: '只做翻译切换 vs 完整地区化能力',
    summary:
      '只做文本翻译只能解决表层问题；真正面向全球用户的产品，必须连日期、货币、时区、单位和排版方向一起治理。',
  },
];
</script>

<style scoped>
.i18n-guide-page {
  min-height: calc(100vh - 40px);
  padding: 24px;
  border: 1px solid rgba(19, 27, 34, 0.08);
  border-radius: 7px;
  background:
    radial-gradient(
      circle at top left,
      rgba(220, 228, 234, 0.48),
      transparent 28%
    ),
    linear-gradient(180deg, #fcfdfe 0%, #f3f6f8 100%);
  box-shadow: 0 30px 80px rgba(18, 26, 34, 0.08);
}

.i18n-guide-page__shell {
  min-height: calc(100vh - 90px);
  border: 1px solid rgba(19, 27, 34, 0.06);
  border-radius: 7px;
  background: rgba(255, 255, 255, 0.82);
}

.i18n-guide-page__top {
  display: flex;
  justify-content: flex-start;
  padding: 18px 18px 0;
}

.i18n-guide-page__back {
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

.i18n-guide-page__back:hover {
  transform: translateY(-1px);
  border-color: rgba(46, 70, 91, 0.18);
  box-shadow: 0 18px 34px rgba(19, 27, 34, 0.08);
}

.i18n-guide-page__content {
  padding: 18px 24px 24px;
}

.i18n-guide-hero {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 320px;
  gap: 20px;
  padding-bottom: 26px;
  border-bottom: 1px solid rgba(19, 27, 34, 0.08);
}

.i18n-guide-hero__eyebrow,
.i18n-guide-section__eyebrow,
.i18n-guide-card__eyebrow,
.i18n-guide-hero__label {
  font-size: 11px;
  line-height: 1.4;
  letter-spacing: 0.24em;
  text-transform: uppercase;
  color: #7b8793;
}

.i18n-guide-hero__title {
  margin-top: 10px;
  font-size: 46px;
  line-height: 1.06;
  font-weight: 600;
  letter-spacing: -0.05em;
  color: #17202a;
}

.i18n-guide-hero__summary {
  max-width: 860px;
  margin-top: 16px;
  font-size: 15px;
  line-height: 1.9;
  color: #58636f;
}

.i18n-guide-hero__panel,
.i18n-guide-card,
.i18n-guide-panel {
  border: 1px solid rgba(19, 27, 34, 0.08);
  border-radius: 7px;
  background: rgba(255, 255, 255, 0.84);
}

.i18n-guide-hero__panel {
  padding: 18px;
}

.i18n-guide-list {
  display: grid;
  gap: 8px;
  margin: 12px 0 0;
  padding-left: 18px;
  font-size: 14px;
  line-height: 1.8;
  color: #56616d;
}

.i18n-guide-grid,
.i18n-guide-columns,
.i18n-guide-stack {
  display: grid;
  gap: 16px;
}

.i18n-guide-grid {
  margin-top: 28px;
  grid-template-columns: repeat(3, minmax(0, 1fr));
}

.i18n-guide-card {
  padding: 18px;
}

.i18n-guide-card__title,
.i18n-guide-panel__title,
.i18n-guide-section__title {
  color: #17202a;
}

.i18n-guide-card__title {
  margin-top: 10px;
  font-size: 22px;
  line-height: 1.25;
  font-weight: 600;
}

.i18n-guide-card__text,
.i18n-guide-panel__text {
  margin-top: 12px;
  font-size: 14px;
  line-height: 1.9;
  color: #596571;
}

.i18n-guide-section {
  margin-top: 28px;
}

.i18n-guide-section__head {
  margin-bottom: 14px;
}

.i18n-guide-section__title {
  margin-top: 8px;
  font-size: 30px;
  line-height: 1.18;
  font-weight: 600;
  letter-spacing: -0.03em;
}

.i18n-guide-columns {
  grid-template-columns: repeat(3, minmax(0, 1fr));
}

.i18n-guide-stack {
  grid-template-columns: repeat(2, minmax(0, 1fr));
}

.i18n-guide-panel {
  padding: 18px;
}

.i18n-guide-panel.is-wide {
  grid-column: 1 / -1;
}

.i18n-guide-panel__eyebrow {
  font-size: 11px;
  line-height: 1.4;
  letter-spacing: 0.24em;
  text-transform: uppercase;
  color: #80909d;
}

.i18n-guide-panel__title {
  font-size: 20px;
  line-height: 1.3;
  font-weight: 600;
}

.i18n-guide-method__head {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 16px;
}

.i18n-guide-method__tag {
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

.i18n-guide-method__grid {
  display: grid;
  gap: 14px;
  margin-top: 16px;
  grid-template-columns: repeat(3, minmax(0, 1fr));
}

.i18n-guide-mini-panel {
  padding: 14px;
  border: 1px solid rgba(19, 27, 34, 0.08);
  border-radius: 7px;
  background: rgba(245, 248, 250, 0.9);
}

.i18n-guide-mini-panel__title {
  font-size: 14px;
  font-weight: 600;
  color: #17202a;
}

.i18n-guide-code-block {
  margin-top: 14px;
}

@media (max-width: 1080px) {
  .i18n-guide-hero,
  .i18n-guide-grid,
  .i18n-guide-columns,
  .i18n-guide-stack,
  .i18n-guide-method__grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 900px) {
  .i18n-guide-page {
    min-height: auto;
    padding: 18px;
  }

  .i18n-guide-page__shell {
    min-height: auto;
  }

  .i18n-guide-page__content {
    padding: 18px;
  }

  .i18n-guide-hero__title {
    font-size: 36px;
  }

  .i18n-guide-section__title {
    font-size: 26px;
  }
}
</style>
