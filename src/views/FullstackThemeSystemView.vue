<template>
  <section class="theme-system-guide-page">
    <div class="theme-system-guide-page__shell">
      <div class="theme-system-guide-page__top">
        <RouterLink
          to="/fullstack-guide"
          class="theme-system-guide-page__back"
          aria-label="返回全栈能力菜单"
          title="返回全栈能力菜单"
        >
          <el-icon :size="18"><ArrowLeft /></el-icon>
        </RouterLink>
      </div>

      <div class="theme-system-guide-page__content">
        <header class="theme-system-guide-hero">
          <div>
            <p class="theme-system-guide-hero__eyebrow">
              Frontend Theme System Engineering
            </p>
            <h1 class="theme-system-guide-hero__title">前端主题系统工程能力</h1>
            <p class="theme-system-guide-hero__summary">
              主题系统不是简单切一下深色模式。真正的工程问题是：设计令牌、品牌色、亮暗模式、组件状态色、图表配色、地图底图、编辑器高亮和多端一致性要怎样统一建模，才能让换肤稳定、可扩展、可治理，而不是每个页面到处写一堆条件样式。
            </p>
          </div>

          <div class="theme-system-guide-hero__panel">
            <p class="theme-system-guide-hero__label">学完结果</p>
            <ul class="theme-system-guide-list">
              <li>能搭建设计令牌、语义色板和运行时换肤的统一体系。</li>
              <li>能处理亮暗主题、品牌主题、组件库主题和图表主题联动。</li>
              <li>能避免主题切换闪烁、样式漂移和多端主题不一致问题。</li>
            </ul>
          </div>
        </header>

        <section class="theme-system-guide-grid">
          <article
            v-for="item in quickStages"
            :key="item.order"
            class="theme-system-guide-card"
          >
            <p class="theme-system-guide-card__eyebrow">
              Stage {{ item.order }}
            </p>
            <h2 class="theme-system-guide-card__title">{{ item.title }}</h2>
            <p class="theme-system-guide-card__text">{{ item.summary }}</p>
          </article>
        </section>

        <section class="theme-system-guide-section">
          <div class="theme-system-guide-section__head">
            <div>
              <p class="theme-system-guide-section__eyebrow">Build Order</p>
              <h2 class="theme-system-guide-section__title">
                先统一令牌和语义层，再落地切换、同步和治理
              </h2>
            </div>
          </div>

          <div class="theme-system-guide-stack">
            <article
              v-for="stage in guideStages"
              :key="stage.order"
              class="theme-system-guide-panel is-wide"
            >
              <div class="theme-system-guide-method__head">
                <div>
                  <p class="theme-system-guide-panel__eyebrow">
                    Stage {{ stage.order }}
                  </p>
                  <h3 class="theme-system-guide-panel__title">
                    {{ stage.title }}
                  </h3>
                </div>
                <span class="theme-system-guide-method__tag">{{
                  stage.tag
                }}</span>
              </div>

              <p class="theme-system-guide-panel__text">
                {{ stage.description }}
              </p>

              <div class="theme-system-guide-method__grid">
                <section class="theme-system-guide-mini-panel">
                  <p class="theme-system-guide-mini-panel__title">适用场景</p>
                  <ul class="theme-system-guide-list">
                    <li v-for="item in stage.bestFor" :key="item">
                      {{ item }}
                    </li>
                  </ul>
                </section>

                <section class="theme-system-guide-mini-panel">
                  <p class="theme-system-guide-mini-panel__title">实现重点</p>
                  <ul class="theme-system-guide-list">
                    <li v-for="item in stage.focus" :key="item">
                      {{ item }}
                    </li>
                  </ul>
                </section>

                <section class="theme-system-guide-mini-panel">
                  <p class="theme-system-guide-mini-panel__title">常见误区</p>
                  <ul class="theme-system-guide-list">
                    <li v-for="item in stage.risks" :key="item">
                      {{ item }}
                    </li>
                  </ul>
                </section>
              </div>

              <AppCodeBlock
                class="theme-system-guide-code-block"
                :code="stage.code"
                :lang="stage.language"
              />
            </article>
          </div>
        </section>

        <section class="theme-system-guide-section">
          <div class="theme-system-guide-section__head">
            <div>
              <p class="theme-system-guide-section__eyebrow">Comparison</p>
              <h2 class="theme-system-guide-section__title">
                主题系统里最容易混淆的几组概念
              </h2>
            </div>
          </div>

          <div class="theme-system-guide-columns">
            <article
              v-for="item in comparisonCards"
              :key="item.title"
              class="theme-system-guide-panel"
            >
              <h3 class="theme-system-guide-panel__title">{{ item.title }}</h3>
              <p class="theme-system-guide-panel__text">{{ item.summary }}</p>
            </article>
          </div>
        </section>

        <section class="theme-system-guide-section">
          <div class="theme-system-guide-section__head">
            <div>
              <p class="theme-system-guide-section__eyebrow">Checklist</p>
              <h2 class="theme-system-guide-section__title">
                一套能落地的前端主题系统工程建设清单
              </h2>
            </div>
          </div>

          <article class="theme-system-guide-panel is-wide">
            <ul class="theme-system-guide-list">
              <li>
                先定义设计令牌和语义令牌，再映射到组件和业务页面，不要直接写死颜色值。
              </li>
              <li>
                亮暗主题、品牌主题、节日主题要复用同一切换机制，而不是各写一套判断。
              </li>
              <li>
                主题切换要覆盖组件库、图表、编辑器和插画资源，而不是只换页面背景。
              </li>
              <li>
                首屏要解决主题闪烁和 SSR/CSR 不一致问题，避免用户看到颜色跳变。
              </li>
              <li>
                主题能力必须可观测、可回滚、可扩展，不然后续品牌扩张会越来越难维护。
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
    title: '先拆分令牌层级',
    summary:
      '基础色、语义色、组件色和业务场景色必须分层建模，不然后续换品牌或切暗色会牵一发而动全身。',
  },
  {
    order: '02',
    title: '运行时切换要统一',
    summary:
      '主题切换、系统跟随、用户偏好和租户品牌都应该走同一状态入口，而不是各自修改 DOM。',
  },
  {
    order: '03',
    title: '组件库要被主题驱动',
    summary:
      '按钮、表格、表单、弹窗和图表都需要消费同一套主题令牌，否则局部主题永远对不齐。',
  },
  {
    order: '04',
    title: '资源层也要纳入主题',
    summary:
      '图标、插画、地图、编辑器高亮和图表配色都属于主题体系，不能只关注 CSS 变量。',
  },
  {
    order: '05',
    title: '首屏稳定优先',
    summary:
      '主题系统上线后最常见的问题不是配色，而是首屏闪白、持久化错乱和跨标签页不同步。',
  },
];

const guideStages = [
  {
    order: '01',
    title: '建立设计令牌与语义令牌体系',
    tag: 'Token First',
    description:
      '真正的主题系统第一步不是定义 dark 和 light 两个 class，而是先建立 token 分层。基础层负责原始颜色、阴影、圆角、间距；语义层负责 primary、success、surface、text 等可读语义。只有这样，换品牌和换模式时才是在替换映射，而不是全项目搜索颜色值。',
    bestFor: [
      '有长期演进计划、多个业务模块共存的中后台产品',
      '需要支持亮暗主题和品牌换肤的 SaaS 系统',
      '设计和前端协作较多、需要沉淀设计令牌规范的团队',
    ],
    focus: [
      '把 raw token、semantic token、component token 拆成三层',
      '约定令牌命名和作用域，避免语义混乱',
      '用 CSS Variables 或 token build pipeline 作为统一承载',
    ],
    risks: [
      '直接在组件里写具体颜色值，后续切主题只能全局硬改',
      '语义令牌太粗，导致复杂场景下复用能力不足',
      '令牌层级混乱，设计改一处会牵动无关模块',
    ],
    language: 'ts',
    code: `type ThemeMode = 'light' | 'dark';

interface ThemeTokens {
  colorBgPage: string;
  colorBgCard: string;
  colorTextPrimary: string;
  colorTextSecondary: string;
  colorBrandPrimary: string;
  colorBorderDefault: string;
}

const themeTokenMap: Record<ThemeMode, ThemeTokens> = {
  light: {
    colorBgPage: '#f7f9fc',
    colorBgCard: '#ffffff',
    colorTextPrimary: '#13202b',
    colorTextSecondary: '#5f6b76',
    colorBrandPrimary: '#3f6db3',
    colorBorderDefault: 'rgba(19, 32, 43, 0.08)',
  },
  dark: {
    colorBgPage: '#0f1720',
    colorBgCard: '#16202a',
    colorTextPrimary: '#eef3f8',
    colorTextSecondary: '#a7b3be',
    colorBrandPrimary: '#84aef8',
    colorBorderDefault: 'rgba(255, 255, 255, 0.08)',
  },
};`,
  },
  {
    order: '02',
    title: '统一主题状态与运行时切换入口',
    tag: 'Single Source',
    description:
      '主题切换不能由多个页面各自决定。用户手动选择、系统跟随、租户品牌、活动皮肤都应收敛到一个主题状态中心，再把结果投射到 html data-attribute、CSS Variables 和本地持久化。这样才能保证多页面、多标签页和刷新后都保持一致。',
    bestFor: [
      '有用户偏好设置、租户品牌和系统自动跟随的产品',
      '需要在多个应用壳子之间共享主题状态的前端系统',
      '对首屏稳定和多标签页同步有要求的业务',
    ],
    focus: [
      '使用统一 store 管理 mode、brand、resolvedTheme',
      '切换主题时一次性更新 DOM attribute 和持久化缓存',
      '支持系统 prefers-color-scheme 监听和 BroadcastChannel 同步',
    ],
    risks: [
      '一个页面改 class、另一个页面改变量，最终主题状态混乱',
      '本地缓存和系统跟随冲突，刷新后体验不可预测',
      '多标签页不同步，用户会看到两个不同主题并存',
    ],
    language: 'ts',
    code: `const applyTheme = (mode: ThemeMode) => {
  const tokens = themeTokenMap[mode];
  const root = document.documentElement;

  root.dataset.theme = mode;
  Object.entries(tokens).forEach(([key, value]) => {
    root.style.setProperty(\`--\${key}\`, value);
  });

  localStorage.setItem('theme-mode', mode);
};`,
  },
  {
    order: '03',
    title: '把组件库、图表和编辑器纳入同一主题域',
    tag: 'Cross Surface',
    description:
      '很多项目表面支持换肤，但按钮和表格换了，图表、代码高亮、富文本、地图底图还是另一套颜色，体验会非常割裂。正确做法是把所有“视觉表面”统一纳入主题域，让它们消费同一语义令牌，而不是各玩各的。',
    bestFor: [
      '后台系统里既有表单、图表又有代码块和地图的产品',
      '低代码、编辑器、监控大盘等可视化较重的项目',
      '希望视觉统一度足够高的设计驱动型团队',
    ],
    focus: [
      '组件库主题变量与业务主题令牌打通',
      '图表配色、编辑器主题、地图底图同步切换',
      '图标和插画资源提供至少双主题版本或滤镜方案',
    ],
    risks: [
      '只覆盖常规组件，导致图表和代码区看起来像别的产品',
      '第三方库主题配置零散分布，后续维护成本很高',
      '资源层没有准备暗色版本，临时用反色会严重失真',
    ],
    language: 'ts',
    code: `const buildChartTheme = (tokens: ThemeTokens) => ({
  backgroundColor: tokens.colorBgCard,
  textStyle: {
    color: tokens.colorTextSecondary,
  },
  color: [
    tokens.colorBrandPrimary,
    '#5aa7a2',
    '#d1a15c',
    '#ba6d73',
  ],
});`,
  },
  {
    order: '04',
    title: '解决首屏闪烁和服务端同构问题',
    tag: 'No Flash',
    description:
      '主题系统一旦做成运行时切换，最容易出现的就是 FOUC。用户刷新页面先看到默认浅色，再跳成深色，体验非常差。工程上要在应用挂载前尽早读取缓存和系统偏好，把主题先写入 html，再让应用渲染，SSR 场景还要保证服务端初始主题和客户端一致。',
    bestFor: [
      '首屏体验要求高的官网、控制台和博客系统',
      '使用 SSR、预渲染或静态生成的项目',
      '移动端或低性能设备上更容易感知闪烁的场景',
    ],
    focus: [
      '在入口脚本最前面执行 theme bootstrap',
      'SSR 时把初始主题写进 html 或内联脚本',
      '避免组件挂载后再二次覆盖主题变量',
    ],
    risks: [
      '主题初始化太晚，用户肉眼可见颜色跳变',
      '服务端渲染默认浅色，客户端根据缓存切深色，导致 hydration 不稳',
      '每次进页面都重算主题，造成无意义抖动',
    ],
    language: 'ts',
    code: `const bootstrapTheme = () => {
  const cached = localStorage.getItem('theme-mode') as ThemeMode | null;
  const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const nextMode = cached ?? (systemDark ? 'dark' : 'light');

  applyTheme(nextMode);
};

bootstrapTheme();`,
  },
  {
    order: '05',
    title: '为主题系统建立治理与扩展机制',
    tag: 'Governance',
    description:
      '主题系统不是一劳永逸的。品牌扩张、节日活动、海外站点和租户定制都会不断提出新要求。真正可持续的做法，是把主题做成配置化、可观测、可回滚的能力，并约束新页面必须消费语义令牌，不能绕开系统直接写样式常量。',
    bestFor: [
      '多品牌、多租户、多国家站点的前端系统',
      '需要长期演进且多人协作的主题工程',
      '想把设计资产沉淀为平台能力的团队',
    ],
    focus: [
      '对主题切换、主题命中率、异常覆盖做监控',
      '提供新增品牌主题和活动主题的标准接入流程',
      '在 lint、review 和组件规范中禁止裸写关键颜色值',
    ],
    risks: [
      '新增主题没有校验流程，上线后常出现可读性问题',
      '业务页面绕过语义令牌，后续品牌切换频繁漏改',
      '缺少主题能力统计，无法知道哪些模块尚未主题化',
    ],
    language: 'ts',
    code: `const reportThemeUsage = (payload: {
  mode: ThemeMode;
  page: string;
  brand?: string;
}) => {
  analytics.track('theme_usage', payload);
};

watchEffect(() => {
  reportThemeUsage({
    mode: themeStore.mode,
    page: location.pathname,
    brand: themeStore.brand,
  });
});`,
  },
];

const comparisonCards = [
  {
    title: '设计系统 vs 主题系统',
    summary:
      '设计系统关注组件规范、交互模式和视觉规则，主题系统关注这些规则在不同品牌和模式下如何稳定映射。前者偏“定义什么”，后者偏“如何切换和落地”。',
  },
  {
    title: '深色模式 vs 品牌换肤',
    summary:
      '深色模式核心是亮度和对比度体系变化，品牌换肤核心是品牌识别与语义色映射。两者都属于主题，但驱动目标和风险点不同。',
  },
  {
    title: 'CSS 变量换肤 vs 构建时换肤',
    summary:
      'CSS 变量适合运行时切换和动态主题，构建时换肤更适合主题数量固定且追求静态产物最优的场景。要根据业务对实时切换和复杂度的要求选择。',
  },
];
</script>

<style scoped>
.theme-system-guide-page {
  min-height: calc(100vh - 40px);
}

.theme-system-guide-page__shell {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.theme-system-guide-page__top {
  display: flex;
  align-items: center;
}

.theme-system-guide-page__back {
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

.theme-system-guide-page__back:hover {
  transform: translateY(-1px);
  border-color: rgba(43, 72, 101, 0.2);
  box-shadow: 0 18px 36px rgba(17, 24, 39, 0.08);
}

.theme-system-guide-page__content {
  display: flex;
  flex-direction: column;
  gap: 22px;
}

.theme-system-guide-hero,
.theme-system-guide-panel,
.theme-system-guide-card {
  border: 1px solid rgba(19, 27, 34, 0.08);
  border-radius: 7px;
  background: #fff;
  box-shadow: 0 24px 60px rgba(15, 23, 42, 0.05);
}

.theme-system-guide-hero {
  display: grid;
  grid-template-columns: minmax(0, 1.6fr) minmax(260px, 0.8fr);
  gap: 20px;
  padding: 28px;
}

.theme-system-guide-hero__eyebrow,
.theme-system-guide-section__eyebrow,
.theme-system-guide-card__eyebrow,
.theme-system-guide-panel__eyebrow,
.theme-system-guide-hero__label,
.theme-system-guide-method__tag,
.theme-system-guide-mini-panel__title {
  font-size: 11px;
  line-height: 1.4;
  letter-spacing: 0.24em;
  text-transform: uppercase;
  color: #7b8794;
}

.theme-system-guide-hero__title {
  margin-top: 10px;
  font-size: 42px;
  line-height: 1.08;
  font-weight: 600;
  letter-spacing: -0.04em;
  color: #16202a;
}

.theme-system-guide-hero__summary {
  margin-top: 16px;
  max-width: 820px;
  font-size: 15px;
  line-height: 1.9;
  color: #52606d;
}

.theme-system-guide-hero__panel {
  align-self: stretch;
  padding: 22px;
  border: 1px solid rgba(19, 27, 34, 0.08);
  border-radius: 7px;
  background: linear-gradient(180deg, #fbfcfd 0%, #f4f7fa 100%);
}

.theme-system-guide-grid {
  display: grid;
  grid-template-columns: repeat(5, minmax(0, 1fr));
  gap: 16px;
}

.theme-system-guide-card {
  padding: 20px;
}

.theme-system-guide-card__title,
.theme-system-guide-panel__title,
.theme-system-guide-section__title {
  color: #16202a;
}

.theme-system-guide-card__title {
  margin-top: 10px;
  font-size: 20px;
  line-height: 1.35;
  font-weight: 600;
}

.theme-system-guide-card__text,
.theme-system-guide-panel__text,
.theme-system-guide-list {
  font-size: 14px;
  line-height: 1.9;
  color: #52606d;
}

.theme-system-guide-section {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.theme-system-guide-section__head {
  display: flex;
  align-items: end;
  justify-content: space-between;
  gap: 16px;
}

.theme-system-guide-section__title {
  margin-top: 8px;
  font-size: 28px;
  line-height: 1.25;
  font-weight: 600;
  letter-spacing: -0.03em;
}

.theme-system-guide-stack,
.theme-system-guide-columns {
  display: grid;
  gap: 16px;
}

.theme-system-guide-columns {
  grid-template-columns: repeat(3, minmax(0, 1fr));
}

.theme-system-guide-panel {
  padding: 24px;
}

.theme-system-guide-panel.is-wide {
  padding: 26px;
}

.theme-system-guide-method__head {
  display: flex;
  align-items: start;
  justify-content: space-between;
  gap: 16px;
}

.theme-system-guide-method__tag {
  display: inline-flex;
  align-items: center;
  min-height: 32px;
  padding: 0 12px;
  border: 1px solid rgba(19, 27, 34, 0.08);
  border-radius: 999px;
  background: #f5f8fa;
}

.theme-system-guide-panel__text {
  margin-top: 14px;
}

.theme-system-guide-method__grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 14px;
  margin-top: 18px;
}

.theme-system-guide-mini-panel {
  padding: 18px;
  border: 1px solid rgba(19, 27, 34, 0.08);
  border-radius: 7px;
  background: linear-gradient(180deg, #fdfefe 0%, #f7fafc 100%);
}

.theme-system-guide-list {
  margin: 12px 0 0;
  padding-left: 18px;
}

.theme-system-guide-code-block {
  margin-top: 18px;
}

@media (max-width: 1180px) {
  .theme-system-guide-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .theme-system-guide-columns,
  .theme-system-guide-method__grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 900px) {
  .theme-system-guide-hero {
    grid-template-columns: 1fr;
    padding: 22px;
  }

  .theme-system-guide-hero__title {
    font-size: 34px;
  }

  .theme-system-guide-grid {
    grid-template-columns: 1fr;
  }

  .theme-system-guide-panel,
  .theme-system-guide-panel.is-wide,
  .theme-system-guide-card {
    padding: 20px;
  }
}
</style>
