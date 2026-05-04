<template>
  <section class="error-boundary-guide-page">
    <div class="error-boundary-guide-page__shell">
      <div class="error-boundary-guide-page__top">
        <RouterLink
          to="/fullstack-guide"
          class="error-boundary-guide-page__back"
          aria-label="返回全栈能力菜单"
          title="返回全栈能力菜单"
        >
          <el-icon :size="18"><ArrowLeft /></el-icon>
        </RouterLink>
      </div>

      <div class="error-boundary-guide-page__content">
        <header class="error-boundary-guide-hero">
          <div>
            <p class="error-boundary-guide-hero__eyebrow">
              Frontend Error Boundary Engineering
            </p>
            <h1 class="error-boundary-guide-hero__title">前端错误边界工程</h1>
            <p class="error-boundary-guide-hero__summary">
              这一页讲的不是“报错后显示一句兜底文案”这么简单，而是当组件异常、接口异常、资源异常、第三方脚本异常时，前端如何把故障限制在局部，保住核心路径，并且给用户一个可恢复、可重试、可上报的降级体验。真正有用的错误边界，不是吞掉错误，而是把错误变成可控制的状态。
            </p>
          </div>

          <div class="error-boundary-guide-hero__panel">
            <p class="error-boundary-guide-hero__label">学完结果</p>
            <ul class="error-boundary-guide-list">
              <li>能区分捕获异常、资源异常和业务失败三类问题。</li>
              <li>能设计局部错误边界、回退视图和恢复路径。</li>
              <li>能把错误边界和监控、容灾、权限、重试一起治理。</li>
            </ul>
          </div>
        </header>

        <section class="error-boundary-guide-grid">
          <article
            v-for="item in quickStages"
            :key="item.order"
            class="error-boundary-guide-card"
          >
            <p class="error-boundary-guide-card__eyebrow">
              Stage {{ item.order }}
            </p>
            <h2 class="error-boundary-guide-card__title">{{ item.title }}</h2>
            <p class="error-boundary-guide-card__text">{{ item.summary }}</p>
          </article>
        </section>

        <section class="error-boundary-guide-section">
          <div class="error-boundary-guide-section__head">
            <div>
              <p class="error-boundary-guide-section__eyebrow">
                Decision Order
              </p>
              <h2 class="error-boundary-guide-section__title">
                错误边界先定义故障范围，再定义恢复动作
              </h2>
            </div>
          </div>

          <div class="error-boundary-guide-stack">
            <article
              v-for="stage in guideStages"
              :key="stage.order"
              class="error-boundary-guide-panel is-wide"
            >
              <div class="error-boundary-guide-method__head">
                <div>
                  <p class="error-boundary-guide-panel__eyebrow">
                    Stage {{ stage.order }}
                  </p>
                  <h3 class="error-boundary-guide-panel__title">
                    {{ stage.title }}
                  </h3>
                </div>
                <span class="error-boundary-guide-method__tag">
                  {{ stage.tag }}
                </span>
              </div>

              <p class="error-boundary-guide-panel__text">
                {{ stage.description }}
              </p>

              <div class="error-boundary-guide-method__grid">
                <section class="error-boundary-guide-mini-panel">
                  <p class="error-boundary-guide-mini-panel__title">适用场景</p>
                  <ul class="error-boundary-guide-list">
                    <li v-for="item in stage.bestFor" :key="item">
                      {{ item }}
                    </li>
                  </ul>
                </section>

                <section class="error-boundary-guide-mini-panel">
                  <p class="error-boundary-guide-mini-panel__title">实现重点</p>
                  <ul class="error-boundary-guide-list">
                    <li v-for="item in stage.focus" :key="item">
                      {{ item }}
                    </li>
                  </ul>
                </section>

                <section class="error-boundary-guide-mini-panel">
                  <p class="error-boundary-guide-mini-panel__title">常见误区</p>
                  <ul class="error-boundary-guide-list">
                    <li v-for="item in stage.risks" :key="item">
                      {{ item }}
                    </li>
                  </ul>
                </section>
              </div>

              <AppCodeBlock
                class="error-boundary-guide-code-block"
                :code="stage.code"
                :lang="stage.language"
              />
            </article>
          </div>
        </section>

        <section class="error-boundary-guide-section">
          <div class="error-boundary-guide-section__head">
            <div>
              <p class="error-boundary-guide-section__eyebrow">Comparison</p>
              <h2 class="error-boundary-guide-section__title">
                错误边界、容灾降级、监控上报各自负责什么
              </h2>
            </div>
          </div>

          <div class="error-boundary-guide-columns">
            <article
              v-for="item in comparisonCards"
              :key="item.title"
              class="error-boundary-guide-panel"
            >
              <h3 class="error-boundary-guide-panel__title">
                {{ item.title }}
              </h3>
              <p class="error-boundary-guide-panel__text">{{ item.summary }}</p>
            </article>
          </div>
        </section>

        <section class="error-boundary-guide-section">
          <div class="error-boundary-guide-section__head">
            <div>
              <p class="error-boundary-guide-section__eyebrow">Best Practice</p>
              <h2 class="error-boundary-guide-section__title">
                一套更像项目的错误边界骨架
              </h2>
            </div>
          </div>

          <article class="error-boundary-guide-panel is-wide">
            <p class="error-boundary-guide-panel__text">
              真正实用的错误边界，不是单纯 `try/catch`
              一下，而是把局部异常、降级视图、重试按钮、错误上报和恢复时机一起收口。下面这个骨架展示了如何在组件级别保住主流程，同时把错误信息交给监控链路。
            </p>

            <AppCodeBlock
              class="error-boundary-guide-code-block"
              :code="errorBoundaryCode"
              lang="typescript"
            />
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
    title: '先划定故障范围',
    summary: '先决定错误应该影响整页、模块还是单个组件。',
  },
  {
    order: '02',
    title: '降级不是吞错',
    summary: '错误边界要能显示替代内容，而不是把错误藏起来。',
  },
  {
    order: '03',
    title: '恢复动作要明确',
    summary: '重试、刷新、返回主页、降级数据都要是可选动作。',
  },
  {
    order: '04',
    title: '监控必须接上',
    summary: '没有上报和版本定位，边界只会变成静态兜底页。',
  },
  {
    order: '05',
    title: '局部失败保全局可用',
    summary: '核心链路活着，比局部模块强行展示更重要。',
  },
];

const guideStages = [
  {
    order: '01',
    title: '先把错误边界定义成“局部隔离器”',
    tag: '边界定义',
    description:
      '错误边界的目标不是“什么都不让报错”，而是当某个局部出错时，前端能把故障限制在一个可控范围内。比如图表组件崩了，不应该影响列表和表单；推荐位拉取失败，不应该让整个首页白屏。先把边界定义清楚，后面才知道哪些模块需要单独包裹，哪些故障可以直接降级。',
    bestFor: ['复杂单页应用', '高交互模块', '插件化页面'],
    focus: [
      '错误边界按业务模块拆分',
      '保住核心功能而不是保住所有装饰性内容',
      '每个边界都要有明确的失败视图',
    ],
    risks: [
      '只在根节点包一层，所有错误都混在一起',
      '局部组件报错导致整页白屏',
      '把降级视图做成单纯的报错提示',
    ],
    language: 'ts',
    code: `type ErrorBoundaryState = {
  hasError: boolean;
  error?: Error;
};`,
  },
  {
    order: '02',
    title: '恢复动作要比“请稍后再试”更具体',
    tag: '恢复设计',
    description:
      '一个有用的错误边界，应该告诉用户下一步该做什么。最常见的恢复动作包括重试当前请求、刷新模块数据、返回上一层、切换到降级模式或者使用缓存内容。恢复动作越明确，用户越不容易被困在“出错了但不知道怎么办”的状态里。页面不是只负责展示错误，而是要把恢复路径也设计出来。',
    bestFor: ['业务表单', '数据详情页', '依赖接口较多的模块'],
    focus: [
      '错误视图里提供明确可点击的恢复操作',
      '恢复动作和错误类型绑定',
      '让用户知道是局部问题还是全局问题',
    ],
    risks: [
      '只给一句泛化文案',
      '用户无法判断是否需要刷新整页',
      '恢复按钮存在但没有真正接入逻辑',
    ],
    language: 'ts',
    code: `const handleRetry = async () => {
  state.hasError = false;
  await reloadWidget();
};`,
  },
  {
    order: '03',
    title: '错误要上报，才能和监控闭环打通',
    tag: '监控联动',
    description:
      '错误边界如果只做降级，不做上报，就会失去治理意义。成熟的做法是把错误、路由、版本、用户环境和组件标识一起上传到监控系统，这样后续才能知道是哪一版、哪个页面、哪个模块出了问题。边界负责保命，监控负责定位，两者缺一不可。',
    bestFor: ['持续迭代项目', '多人协作项目', '生产环境问题定位'],
    focus: [
      '错误信息带上路由和版本号',
      '局部错误边界触发监控上报',
      '和 source map、日志、告警统一联动',
    ],
    risks: [
      '只在 console 里打印错误',
      '上报字段缺少版本和上下文',
      '没有和发布版本做关联',
    ],
    language: 'ts',
    code: `const reportBoundaryError = (error: Error) => {
  navigator.sendBeacon('/api/error-boundary', JSON.stringify({
    route: location.pathname,
    version: import.meta.env.VITE_APP_VERSION,
    message: error.message,
  }));
};`,
  },
  {
    order: '04',
    title: '边界要可恢复，而不是一次性报废',
    tag: '状态恢复',
    description:
      '错误边界最怕的是：报错之后永远卡在兜底页。更成熟的方案是允许局部重试、数据刷新、组件重挂载，或者在条件恢复后自动退出错误态。这样边界就不是“报废开关”，而是真正的状态控制器。前端的稳定性治理，最终比拼的是恢复能力，不只是失败时的显示能力。',
    bestFor: ['会波动的接口', '图表和富组件', '依赖外部脚本的模块'],
    focus: [
      '错误态要支持主动恢复',
      '恢复后重新挂载原组件',
      '对短时故障给自动恢复窗口',
    ],
    risks: [
      '错误态一旦进入就无法退出',
      '恢复后状态没有重新初始化',
      '降级视图长期霸占主界面',
    ],
    language: 'ts',
    code: `if (state.hasError && canRecover()) {
  state.hasError = false;
  mountWidget();
}`,
  },
];

const comparisonCards = [
  {
    title: '错误边界',
    summary: '负责隔离局部异常，确保单个模块出错时不会拖垮整页。',
  },
  {
    title: '容灾降级',
    summary: '负责在依赖失败时保住核心能力，给页面一个可用的替代态。',
  },
  {
    title: '监控上报',
    summary: '负责把错误和上下文送回治理系统，支撑后续定位和修复。',
  },
];

const errorBoundaryCode = `class ErrorBoundary extends React.Component<
  { fallback: React.ReactNode },
  { hasError: boolean }
> {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error) {
    reportBoundaryError(error);
  }

  render() {
    if (this.state.hasError) return this.props.fallback;
    return this.props.children;
  }
}`;
</script>

<style scoped>
.error-boundary-guide-page {
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

.error-boundary-guide-page__shell {
  min-height: calc(100vh - 88px);
  display: flex;
  flex-direction: column;
}

.error-boundary-guide-page__top {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 22px;
}

.error-boundary-guide-page__back {
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

.error-boundary-guide-page__back:hover {
  transform: translateY(-1px);
  border-color: rgba(43, 72, 101, 0.2);
  box-shadow: 0 18px 36px rgba(17, 24, 39, 0.08);
}

.error-boundary-guide-page__content {
  display: flex;
  flex-direction: column;
  gap: 22px;
}

.error-boundary-guide-hero,
.error-boundary-guide-panel,
.error-boundary-guide-card {
  border: 1px solid rgba(19, 27, 34, 0.08);
  border-radius: 7px;
  background: #fff;
  box-shadow: 0 24px 60px rgba(15, 23, 42, 0.05);
}

.error-boundary-guide-hero {
  display: grid;
  grid-template-columns: minmax(0, 1.6fr) minmax(260px, 0.8fr);
  gap: 20px;
  padding: 28px;
}

.error-boundary-guide-hero__eyebrow,
.error-boundary-guide-section__eyebrow,
.error-boundary-guide-card__eyebrow,
.error-boundary-guide-panel__eyebrow,
.error-boundary-guide-hero__label,
.error-boundary-guide-method__tag,
.error-boundary-guide-mini-panel__title {
  font-size: 11px;
  line-height: 1.4;
  letter-spacing: 0.24em;
  text-transform: uppercase;
  color: #7b8794;
}

.error-boundary-guide-hero__title {
  margin-top: 10px;
  font-size: 42px;
  line-height: 1.08;
  font-weight: 600;
  letter-spacing: -0.04em;
  color: #16202a;
}

.error-boundary-guide-hero__summary {
  margin-top: 16px;
  max-width: 820px;
  font-size: 15px;
  line-height: 1.9;
  color: #52606d;
}

.error-boundary-guide-hero__panel {
  align-self: stretch;
  padding: 22px;
  border: 1px solid rgba(19, 27, 34, 0.08);
  border-radius: 7px;
  background: linear-gradient(180deg, #fbfcfd 0%, #f4f7fa 100%);
}

.error-boundary-guide-grid {
  display: grid;
  grid-template-columns: repeat(5, minmax(0, 1fr));
  gap: 16px;
}

.error-boundary-guide-card {
  padding: 20px;
}

.error-boundary-guide-card__title,
.error-boundary-guide-panel__title,
.error-boundary-guide-section__title {
  color: #16202a;
}

.error-boundary-guide-card__title {
  margin-top: 10px;
  font-size: 20px;
  line-height: 1.35;
  font-weight: 600;
}

.error-boundary-guide-card__text,
.error-boundary-guide-panel__text,
.error-boundary-guide-list {
  font-size: 14px;
  line-height: 1.9;
  color: #52606d;
}

.error-boundary-guide-section {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.error-boundary-guide-section__title {
  margin-top: 8px;
  font-size: 28px;
  line-height: 1.25;
  font-weight: 600;
  letter-spacing: -0.03em;
}

.error-boundary-guide-stack,
.error-boundary-guide-columns {
  display: grid;
  gap: 16px;
}

.error-boundary-guide-columns {
  grid-template-columns: repeat(3, minmax(0, 1fr));
}

.error-boundary-guide-panel {
  padding: 24px;
}

.error-boundary-guide-panel.is-wide {
  padding: 26px;
}

.error-boundary-guide-method__head {
  display: flex;
  align-items: start;
  justify-content: space-between;
  gap: 16px;
}

.error-boundary-guide-method__tag {
  display: inline-flex;
  align-items: center;
  min-height: 32px;
  padding: 0 12px;
  border: 1px solid rgba(19, 27, 34, 0.08);
  border-radius: 999px;
  background: #f5f8fa;
}

.error-boundary-guide-panel__text {
  margin-top: 14px;
}

.error-boundary-guide-method__grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 14px;
  margin-top: 18px;
}

.error-boundary-guide-mini-panel {
  padding: 18px;
  border: 1px solid rgba(19, 27, 34, 0.08);
  border-radius: 7px;
  background: linear-gradient(180deg, #fdfefe 0%, #f7fafc 100%);
}

.error-boundary-guide-list {
  margin: 12px 0 0;
  padding-left: 18px;
}

.error-boundary-guide-code-block {
  margin-top: 18px;
}

@media (max-width: 1180px) {
  .error-boundary-guide-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .error-boundary-guide-columns,
  .error-boundary-guide-method__grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 900px) {
  .error-boundary-guide-hero {
    grid-template-columns: 1fr;
    padding: 22px;
  }

  .error-boundary-guide-hero__title {
    font-size: 34px;
  }

  .error-boundary-guide-grid {
    grid-template-columns: 1fr;
  }

  .error-boundary-guide-panel,
  .error-boundary-guide-panel.is-wide,
  .error-boundary-guide-card {
    padding: 20px;
  }
}
</style>
