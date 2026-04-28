<template>
  <section class="low-code-guide-page">
    <div class="low-code-guide-page__shell">
      <div class="low-code-guide-page__top">
        <RouterLink
          to="/fullstack-guide"
          class="low-code-guide-page__back"
          aria-label="返回全栈能力菜单"
          title="返回全栈能力菜单"
        >
          <el-icon :size="18"><ArrowLeft /></el-icon>
        </RouterLink>
      </div>

      <div class="low-code-guide-page__content">
        <header class="low-code-guide-hero">
          <div>
            <p class="low-code-guide-hero__eyebrow">
              Frontend Low-Code Platform
            </p>
            <h1 class="low-code-guide-hero__title">前端低代码平台能力</h1>
            <p class="low-code-guide-hero__summary">
              低代码平台不是把组件拖一拖这么简单，本质是把页面结构、组件物料、事件动作、数据源和发布流程都协议化。真正有价值的能力，是你能把“页面搭建器”做成一个稳定的渲染系统，而不是只做一层看起来会拖拽的壳。
            </p>
          </div>

          <div class="low-code-guide-hero__panel">
            <p class="low-code-guide-hero__label">学完结果</p>
            <ul class="low-code-guide-list">
              <li>
                能分清搭建器、渲染器、物料协议、页面 Schema 之间的职责边界。
              </li>
              <li>能设计一套组件注册、属性面板、事件动作和数据源绑定机制。</li>
              <li>能判断什么时候该做低代码，什么时候应该直接开发业务系统。</li>
            </ul>
          </div>
        </header>

        <section class="low-code-guide-grid">
          <article
            v-for="item in quickStages"
            :key="item.order"
            class="low-code-guide-card"
          >
            <p class="low-code-guide-card__eyebrow">Stage {{ item.order }}</p>
            <h2 class="low-code-guide-card__title">{{ item.title }}</h2>
            <p class="low-code-guide-card__text">{{ item.summary }}</p>
          </article>
        </section>

        <section class="low-code-guide-section">
          <div class="low-code-guide-section__head">
            <div>
              <p class="low-code-guide-section__eyebrow">Build Order</p>
              <h2 class="low-code-guide-section__title">
                低代码平台先定协议，再做渲染引擎、物料体系和发布链路
              </h2>
            </div>
          </div>

          <div class="low-code-guide-stack">
            <article
              v-for="stage in guideStages"
              :key="stage.order"
              class="low-code-guide-panel is-wide"
            >
              <div class="low-code-guide-method__head">
                <div>
                  <p class="low-code-guide-panel__eyebrow">
                    Stage {{ stage.order }}
                  </p>
                  <h3 class="low-code-guide-panel__title">{{ stage.title }}</h3>
                </div>
                <span class="low-code-guide-method__tag">{{ stage.tag }}</span>
              </div>

              <p class="low-code-guide-panel__text">{{ stage.description }}</p>

              <div class="low-code-guide-method__grid">
                <section class="low-code-guide-mini-panel">
                  <p class="low-code-guide-mini-panel__title">适用场景</p>
                  <ul class="low-code-guide-list">
                    <li v-for="item in stage.bestFor" :key="item">
                      {{ item }}
                    </li>
                  </ul>
                </section>

                <section class="low-code-guide-mini-panel">
                  <p class="low-code-guide-mini-panel__title">实现重点</p>
                  <ul class="low-code-guide-list">
                    <li v-for="item in stage.focus" :key="item">
                      {{ item }}
                    </li>
                  </ul>
                </section>

                <section class="low-code-guide-mini-panel">
                  <p class="low-code-guide-mini-panel__title">常见误区</p>
                  <ul class="low-code-guide-list">
                    <li v-for="item in stage.risks" :key="item">
                      {{ item }}
                    </li>
                  </ul>
                </section>
              </div>

              <AppCodeBlock
                class="low-code-guide-code-block"
                :code="stage.code"
                :lang="stage.language"
              />
            </article>
          </div>
        </section>

        <section class="low-code-guide-section">
          <div class="low-code-guide-section__head">
            <div>
              <p class="low-code-guide-section__eyebrow">Comparison</p>
              <h2 class="low-code-guide-section__title">
                做低代码平台时最值得提前想清楚的取舍
              </h2>
            </div>
          </div>

          <div class="low-code-guide-columns">
            <article
              v-for="item in comparisonCards"
              :key="item.title"
              class="low-code-guide-panel"
            >
              <h3 class="low-code-guide-panel__title">{{ item.title }}</h3>
              <p class="low-code-guide-panel__text">{{ item.summary }}</p>
            </article>
          </div>
        </section>

        <section class="low-code-guide-section">
          <div class="low-code-guide-section__head">
            <div>
              <p class="low-code-guide-section__eyebrow">Checklist</p>
              <h2 class="low-code-guide-section__title">
                一套能落地的前端低代码平台建设清单
              </h2>
            </div>
          </div>

          <article class="low-code-guide-panel is-wide">
            <ul class="low-code-guide-list">
              <li>
                先定义页面 Schema 和组件协议，别一开始就把拖拽交互当核心。
              </li>
              <li>
                搭建器只是编辑态，真正线上运行的是渲染器，两者必须拆开设计。
              </li>
              <li>
                物料注册、属性面板、事件动作、数据源绑定要统一协议，不要各自魔改。
              </li>
              <li>
                发布流程必须考虑版本管理、回滚、灰度和权限，否则平台很快失控。
              </li>
              <li>
                低代码适合标准化重复页面，不适合强业务耦合、复杂交互和高度定制场景。
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
    title: '先设计页面 Schema',
    summary:
      '低代码平台的核心不是拖拽，而是页面结构能不能被稳定描述、保存、回放和发布。',
  },
  {
    order: '02',
    title: '组件物料必须协议化',
    summary:
      '每个组件都要清楚声明属性、插槽、事件、默认值和可编辑能力，不然平台迟早碎裂。',
  },
  {
    order: '03',
    title: '搭建器与渲染器分离',
    summary:
      '编辑态负责选择、拖拽、属性面板，运行态负责真正渲染页面，不能混写在一起。',
  },
  {
    order: '04',
    title: '动作流要可编排',
    summary:
      '按钮点击后请求谁、更新谁、跳转哪，都要进入统一动作流，而不是散在页面脚本里。',
  },
  {
    order: '05',
    title: '发布和权限是平台底线',
    summary:
      '没有版本管理、审核发布和物料权限，低代码平台用得越多，后续治理成本越高。',
  },
];

const guideStages = [
  {
    order: '01',
    title: '页面 Schema 先定清楚，平台才有“可保存、可回放、可发布”的基础',
    tag: 'Schema',
    description:
      '做低代码最容易犯的错误，是先做拖拽界面，再回头想数据怎么存。正确顺序是先定义页面 Schema：页面由哪些节点组成，节点怎么嵌套，组件类型怎么标识，属性、样式、事件、数据源如何表达。Schema 稳不稳，决定平台后续能不能做版本对比、多人协作、历史回滚和批量迁移。',
    bestFor: ['运营搭建页面', '活动会场页', '中后台表单页', '数据大屏配置'],
    focus: [
      '页面节点树、组件类型、属性结构要提前统一',
      'Schema 既能描述编辑态，也要能支撑线上渲染',
      '保留扩展字段，方便后续接动作流和权限信息',
    ],
    risks: [
      '先做拖拽再补存储结构',
      'Schema 里混进过多视图态临时数据',
      '没有版本化字段，后面无法平滑升级',
    ],
    language: 'ts',
    code: `type PageSchema = {
  id: string
  title: string
  version: string
  nodes: Array<{
    id: string
    component: string
    props: Record<string, unknown>
    children?: string[]
    actions?: ActionSchema[]
  }>
}`,
  },
  {
    order: '02',
    title: '物料体系不是“组件列表”，而是一份前后台都认同的组件协议',
    tag: 'Material',
    description:
      '低代码里的组件物料，要比普通业务组件多一层平台协议。除了渲染逻辑外，还要声明名称、分组、预览图、默认属性、可编辑属性、事件能力、插槽结构，甚至权限和适用端。只有物料协议稳定，搭建器才知道怎么生成属性面板，渲染器才知道怎么正确还原页面。',
    bestFor: ['组件市场', '内部搭建平台', '多团队共享物料'],
    focus: [
      '组件注册信息和真实渲染组件分开维护',
      '属性面板字段配置要标准化',
      '物料要有版本和兼容策略',
    ],
    risks: [
      '直接拿业务组件塞进平台，没有编辑协议',
      '每个组件自己定义一套属性面板规则',
      '升级组件后没有兼容旧 Schema 的方案',
    ],
    language: 'ts',
    code: `type MaterialDefinition = {
  type: string
  title: string
  propsSchema: Array<{
    field: string
    label: string
    editor: 'input' | 'select' | 'switch' | 'color'
  }>
  events: string[]
}`,
  },
  {
    order: '03',
    title: '编辑态和运行态一定分层，否则你永远在修拖拽副作用',
    tag: 'Renderer',
    description:
      '真正稳定的低代码平台，会把搭建器和线上渲染器拆开。编辑态多了选中框、拖拽锚点、对齐辅助线、右键菜单和属性联动，这些都不该出现在线上页面。运行态只关心按照 Schema 正常渲染，并执行事件动作。分层后你才能同时保证编辑体验和线上性能。',
    bestFor: ['需要页面编辑器的 SaaS 平台', '线上运行页面较多的系统'],
    focus: [
      '编辑态注入辅助 UI，运行态只保留纯渲染',
      '共享同一份 Schema 和物料注册表',
      '运行态做懒加载和容错边界，保证稳定性',
    ],
    risks: [
      '把编辑器直接当线上页面使用',
      '编辑辅助节点污染最终渲染结构',
      '为了省事让所有页面都走同一套重逻辑',
    ],
    language: 'vue',
    code: `<template>
  <component
    :is="materialMap[node.component]"
    v-bind="node.props"
  />
</template>`,
  },
  {
    order: '04',
    title: '事件动作和数据源绑定要像流程编排一样统一，不要散落在按钮回调里',
    tag: 'Action Flow',
    description:
      '低代码平台到了业务层，真正难的是“这个按钮点了以后发生什么”。请求接口、更新表单、弹窗、跳转、消息提示、刷新区块，最好都进入统一动作流配置。这样用户是在配置行为，而不是写零散脚本。数据源也一样，要定义查询、变量、依赖和触发时机，避免页面越配越乱。',
    bestFor: ['表单搭建', '审批流页面', '数据看板', '运营活动页'],
    focus: [
      '动作类型、输入输出和执行上下文统一设计',
      '数据源支持初始化、手动触发和联动更新',
      '日志和调试能力要提前考虑',
    ],
    risks: [
      '给组件开放过多自定义脚本，平台逐渐失控',
      '接口调用和界面更新没有统一上下文',
      '线上出问题后没有动作日志可查',
    ],
    language: 'json',
    code: `[
  {
    "event": "click",
    "actions": [
      { "type": "request", "service": "getUserList" },
      { "type": "set-state", "target": "table.data" },
      { "type": "toast", "message": "加载完成" }
    ]
  }
]`,
  },
  {
    order: '05',
    title: '平台要不要做，关键看业务复用度，不是看“拖拽很酷”',
    tag: 'Boundary',
    description:
      '低代码并不是天然提高效率。只有当页面模式高度重复、组件足够稳定、业务变化主要集中在配置层时，低代码才有价值。反过来，如果页面交互复杂、业务逻辑高度定制、研发本来就不慢，那强上低代码只会增加一层限制。工程判断重点不是能不能做出来，而是后续团队是否值得长期维护这套平台。',
    bestFor: ['平台型团队', '多业务线复用场景', '有统一组件资产的组织'],
    focus: [
      '先评估标准化空间，再决定平台投入规模',
      '低代码更适合高复用页面，不适合所有项目',
      '治理成本、培训成本和二开成本都要算进去',
    ],
    risks: [
      '把低代码当作所有页面的万能解',
      '业务组件还没稳定就急着平台化',
      '只算开发效率，不算维护和治理成本',
    ],
    language: 'text',
    code: `适合做低代码的平台场景
- 表单、表格、详情、图表大屏这类重复页面
- 多业务线共享同一套组件和规范
- 非研发同学需要参与搭建或快速改版

不适合强推低代码的场景
- 高复杂交互、图形编辑、强实时协同
- 每个页面都深度定制、逻辑差异极大
- 团队没有稳定物料体系和平台维护能力`,
  },
];

const comparisonCards = [
  {
    title: '页面拖拽体验 vs 底层 Schema 稳定性',
    summary:
      '拖拽体验决定上手门槛，但 Schema 稳定性决定平台能不能长期维护。短期看交互，长期看协议。',
  },
  {
    title: '通用脚本扩展 vs 可治理动作流',
    summary:
      '直接开放脚本最灵活，但容易失控；统一动作流前期约束更强，却能沉淀日志、权限和可视化调试。',
  },
  {
    title: '所有页面都平台化 vs 只平台化高复用场景',
    summary:
      '低代码不是范围越大越好。越是标准化、重复性高的页面，平台收益越明显；复杂业务页则常常得不偿失。',
  },
];
</script>

<style scoped>
.low-code-guide-page {
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

.low-code-guide-page__shell {
  min-height: calc(100vh - 90px);
  border: 1px solid rgba(19, 27, 34, 0.06);
  border-radius: 7px;
  background: rgba(255, 255, 255, 0.82);
}

.low-code-guide-page__top {
  display: flex;
  justify-content: flex-start;
  padding: 18px 18px 0;
}

.low-code-guide-page__back {
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

.low-code-guide-page__back:hover {
  transform: translateY(-1px);
  border-color: rgba(46, 70, 91, 0.18);
  box-shadow: 0 18px 34px rgba(19, 27, 34, 0.08);
}

.low-code-guide-page__content {
  padding: 18px 24px 24px;
}

.low-code-guide-hero {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 320px;
  gap: 20px;
  padding-bottom: 26px;
  border-bottom: 1px solid rgba(19, 27, 34, 0.08);
}

.low-code-guide-hero__eyebrow,
.low-code-guide-section__eyebrow,
.low-code-guide-card__eyebrow,
.low-code-guide-hero__label {
  font-size: 11px;
  line-height: 1.4;
  letter-spacing: 0.24em;
  text-transform: uppercase;
  color: #7b8793;
}

.low-code-guide-hero__title {
  margin-top: 10px;
  font-size: 46px;
  line-height: 1.06;
  font-weight: 600;
  letter-spacing: -0.05em;
  color: #17202a;
}

.low-code-guide-hero__summary {
  max-width: 860px;
  margin-top: 16px;
  font-size: 15px;
  line-height: 1.9;
  color: #58636f;
}

.low-code-guide-hero__panel,
.low-code-guide-card,
.low-code-guide-panel {
  border: 1px solid rgba(19, 27, 34, 0.08);
  border-radius: 7px;
  background: rgba(255, 255, 255, 0.84);
}

.low-code-guide-hero__panel {
  padding: 18px;
}

.low-code-guide-list {
  display: grid;
  gap: 8px;
  margin: 12px 0 0;
  padding-left: 18px;
  font-size: 14px;
  line-height: 1.8;
  color: #56616d;
}

.low-code-guide-grid,
.low-code-guide-columns,
.low-code-guide-stack {
  display: grid;
  gap: 16px;
}

.low-code-guide-grid {
  margin-top: 28px;
  grid-template-columns: repeat(3, minmax(0, 1fr));
}

.low-code-guide-card {
  padding: 18px;
}

.low-code-guide-card__title,
.low-code-guide-panel__title,
.low-code-guide-section__title {
  color: #17202a;
}

.low-code-guide-card__title {
  margin-top: 10px;
  font-size: 22px;
  line-height: 1.25;
  font-weight: 600;
}

.low-code-guide-card__text,
.low-code-guide-panel__text {
  margin-top: 12px;
  font-size: 14px;
  line-height: 1.9;
  color: #596571;
}

.low-code-guide-section {
  margin-top: 28px;
}

.low-code-guide-section__head {
  margin-bottom: 14px;
}

.low-code-guide-section__title {
  margin-top: 8px;
  font-size: 30px;
  line-height: 1.18;
  font-weight: 600;
  letter-spacing: -0.03em;
}

.low-code-guide-columns {
  grid-template-columns: repeat(3, minmax(0, 1fr));
}

.low-code-guide-stack {
  grid-template-columns: repeat(2, minmax(0, 1fr));
}

.low-code-guide-panel {
  padding: 18px;
}

.low-code-guide-panel.is-wide {
  grid-column: 1 / -1;
}

.low-code-guide-panel__eyebrow {
  font-size: 11px;
  line-height: 1.4;
  letter-spacing: 0.24em;
  text-transform: uppercase;
  color: #80909d;
}

.low-code-guide-panel__title {
  font-size: 20px;
  line-height: 1.3;
  font-weight: 600;
}

.low-code-guide-method__head {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 16px;
}

.low-code-guide-method__tag {
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

.low-code-guide-method__grid {
  display: grid;
  gap: 14px;
  margin-top: 16px;
  grid-template-columns: repeat(3, minmax(0, 1fr));
}

.low-code-guide-mini-panel {
  padding: 14px;
  border: 1px solid rgba(19, 27, 34, 0.08);
  border-radius: 7px;
  background: rgba(245, 248, 250, 0.9);
}

.low-code-guide-mini-panel__title {
  font-size: 14px;
  font-weight: 600;
  color: #17202a;
}

.low-code-guide-code-block {
  margin-top: 14px;
}

@media (max-width: 1080px) {
  .low-code-guide-hero,
  .low-code-guide-grid,
  .low-code-guide-columns,
  .low-code-guide-stack,
  .low-code-guide-method__grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 900px) {
  .low-code-guide-page {
    min-height: auto;
    padding: 18px;
  }

  .low-code-guide-page__shell {
    min-height: auto;
  }

  .low-code-guide-page__content {
    padding: 18px;
  }

  .low-code-guide-hero__title {
    font-size: 36px;
  }

  .low-code-guide-section__title {
    font-size: 26px;
  }
}
</style>
