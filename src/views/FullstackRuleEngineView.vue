<template>
  <section class="rule-guide-page">
    <div class="rule-guide-page__shell">
      <div class="rule-guide-page__top">
        <RouterLink
          to="/fullstack-guide"
          class="rule-guide-page__back"
          aria-label="返回全栈能力菜单"
          title="返回全栈能力菜单"
        >
          <el-icon :size="18"><ArrowLeft /></el-icon>
        </RouterLink>
      </div>

      <div class="rule-guide-page__content">
        <header class="rule-guide-hero">
          <div>
            <p class="rule-guide-hero__eyebrow">
              Frontend Rule Engine Engineering
            </p>
            <h1 class="rule-guide-hero__title">前端规则引擎工程能力</h1>
            <p class="rule-guide-hero__summary">
              规则引擎不是把一堆 `if else`
              搬进配置，而是要把条件表达式、命中顺序、变量上下文、动作执行和灰度发布都沉淀成一套可治理系统。真正困难的地方在于：业务想要高灵活度，工程却必须保证规则可读、可测、可回滚，不能让配置平台最后变成一团不可维护的隐式代码。
            </p>
          </div>

          <div class="rule-guide-hero__panel">
            <p class="rule-guide-hero__label">学完结果</p>
            <ul class="rule-guide-list">
              <li>
                能分清规则模型、表达式求值器、动作执行器和配置台各自的职责边界。
              </li>
              <li>能设计一套规则配置、命中调试、灰度验证和版本回滚方案。</li>
              <li>
                能判断什么时候该抽规则引擎，什么时候继续保持业务代码内聚更合理。
              </li>
            </ul>
          </div>
        </header>

        <section class="rule-guide-grid">
          <article
            v-for="item in quickStages"
            :key="item.order"
            class="rule-guide-card"
          >
            <p class="rule-guide-card__eyebrow">Stage {{ item.order }}</p>
            <h2 class="rule-guide-card__title">{{ item.title }}</h2>
            <p class="rule-guide-card__text">{{ item.summary }}</p>
          </article>
        </section>

        <section class="rule-guide-section">
          <div class="rule-guide-section__head">
            <div>
              <p class="rule-guide-section__eyebrow">Build Order</p>
              <h2 class="rule-guide-section__title">
                规则引擎先定规则模型，再处理求值、动作、灰度与治理
              </h2>
            </div>
          </div>

          <div class="rule-guide-stack">
            <article
              v-for="stage in guideStages"
              :key="stage.order"
              class="rule-guide-panel is-wide"
            >
              <div class="rule-guide-method__head">
                <div>
                  <p class="rule-guide-panel__eyebrow">
                    Stage {{ stage.order }}
                  </p>
                  <h3 class="rule-guide-panel__title">{{ stage.title }}</h3>
                </div>
                <span class="rule-guide-method__tag">{{ stage.tag }}</span>
              </div>

              <p class="rule-guide-panel__text">{{ stage.description }}</p>

              <div class="rule-guide-method__grid">
                <section class="rule-guide-mini-panel">
                  <p class="rule-guide-mini-panel__title">适用场景</p>
                  <ul class="rule-guide-list">
                    <li v-for="item in stage.bestFor" :key="item">
                      {{ item }}
                    </li>
                  </ul>
                </section>

                <section class="rule-guide-mini-panel">
                  <p class="rule-guide-mini-panel__title">实现重点</p>
                  <ul class="rule-guide-list">
                    <li v-for="item in stage.focus" :key="item">
                      {{ item }}
                    </li>
                  </ul>
                </section>

                <section class="rule-guide-mini-panel">
                  <p class="rule-guide-mini-panel__title">常见误区</p>
                  <ul class="rule-guide-list">
                    <li v-for="item in stage.risks" :key="item">
                      {{ item }}
                    </li>
                  </ul>
                </section>
              </div>

              <AppCodeBlock
                class="rule-guide-code-block"
                :code="stage.code"
                :lang="stage.language"
              />
            </article>
          </div>
        </section>

        <section class="rule-guide-section">
          <div class="rule-guide-section__head">
            <div>
              <p class="rule-guide-section__eyebrow">Comparison</p>
              <h2 class="rule-guide-section__title">
                做规则引擎时最容易判断失误的几组选择
              </h2>
            </div>
          </div>

          <div class="rule-guide-columns">
            <article
              v-for="item in comparisonCards"
              :key="item.title"
              class="rule-guide-panel"
            >
              <h3 class="rule-guide-panel__title">{{ item.title }}</h3>
              <p class="rule-guide-panel__text">{{ item.summary }}</p>
            </article>
          </div>
        </section>

        <section class="rule-guide-section">
          <div class="rule-guide-section__head">
            <div>
              <p class="rule-guide-section__eyebrow">Checklist</p>
              <h2 class="rule-guide-section__title">
                一套能落地的前端规则引擎工程建设清单
              </h2>
            </div>
          </div>

          <article class="rule-guide-panel is-wide">
            <ul class="rule-guide-list">
              <li>
                先确认哪些逻辑真的适合抽成规则，不要把所有业务分支都平台化。
              </li>
              <li>
                规则模型、变量上下文和动作类型必须标准化，否则配置一多就无法维护。
              </li>
              <li>
                求值过程要支持调试日志、命中链路和回放验证，不能只给最终结果。
              </li>
              <li>
                上线前必须有灰度、回滚和版本冻结能力，避免错误规则全量伤害业务。
              </li>
              <li>
                复杂高风险决策规则应让后端参与裁决，前端不应独自承担最终一致性责任。
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
    title: '先定义规则模型',
    summary:
      '规则引擎的第一步不是做可视化配置，而是明确条件、动作、优先级和上下文如何表达。',
  },
  {
    order: '02',
    title: '求值器要可解释',
    summary:
      '业务不仅要结果，还要知道为什么命中这条规则，因此求值过程必须可追踪、可调试。',
  },
  {
    order: '03',
    title: '动作执行要协议化',
    summary:
      '规则命中后执行什么，必须是标准动作而不是任意脚本，否则平台会迅速失控。',
  },
  {
    order: '04',
    title: '灰度与回滚必须内建',
    summary:
      '规则配置一旦出错，影响范围通常很大，没有灰度和回滚能力就不具备生产可用性。',
  },
  {
    order: '05',
    title: '规则边界要守住',
    summary:
      '不是所有逻辑都适合平台化，复杂核心决策和高一致性逻辑仍然应由业务代码或后端承担。',
  },
];

const guideStages = [
  {
    order: '01',
    title: '先判断哪些场景适合抽规则，不要把 if else 换个皮肤就叫引擎',
    tag: 'Scope',
    description:
      '真正适合规则引擎的场景，通常具备三个特点：规则变化频繁、业务方需要参与配置、条件与动作相对稳定。例如表单显隐、字段校验、审批路由、营销触达和风控分层。反过来，如果逻辑高度耦合、需要强事务一致性或代码上下文极重，硬抽规则只会增加复杂度。',
    bestFor: ['表单联动', '营销活动规则', '审批条件路由', '低代码业务配置'],
    focus: [
      '优先识别高变化且结构稳定的业务规则',
      '区分“可配置规则”与“核心业务代码”边界',
      '先做小范围规则平台，避免一口气全量平台化',
    ],
    risks: [
      '把所有业务分支都往配置里塞',
      '规则抽象过度，最后谁也看不懂',
      '高风险决策只靠前端配置，没有后端兜底',
    ],
    language: 'text',
    code: `适合抽规则的场景
- 表单字段显隐 / 必填 / 默认值
- 审批分支 / 角色路由 / 节点跳转
- 营销触达 / 标签命中 / UI 展示策略

不适合强行抽规则的场景
- 强事务业务
- 高并发资金计算
- 高耦合核心流程`,
  },
  {
    order: '02',
    title: '规则模型要标准化，条件、优先级、命中方式和动作都要有统一协议',
    tag: 'Rule Model',
    description:
      '一个可维护的规则引擎，不会允许每个业务自己发明一套规则格式。你需要先定义规则主键、启停状态、命中优先级、条件组合方式、变量来源和动作列表。只有模型先统一，后面的配置台、求值器、日志系统和回放能力才有基础。',
    bestFor: ['规则平台', '配置中心', '前端策略系统'],
    focus: [
      '规则主结构和条件 DSL 统一建模',
      '变量上下文和动作类型提前定义清楚',
      '支持版本号、启停、排序和环境隔离',
    ],
    risks: [
      '每个业务模块私有一套 JSON 规则格式',
      '条件和动作字段无约束，后续难扩展',
      '没有版本与环境概念，线上变更不可控',
    ],
    language: 'ts',
    code: `type RuleDefinition = {
  id: string
  name: string
  enabled: boolean
  priority: number
  when: RuleConditionGroup
  then: RuleAction[]
}`,
  },
  {
    order: '03',
    title: '表达式求值器必须可解释、可回放，不能只返回 true 或 false',
    tag: 'Evaluator',
    description:
      '规则系统一旦出现误判，业务最想知道的是“为什么”。所以求值器不能只告诉你结果，还要告诉你命中了哪组条件、读取了哪些变量、在哪个步骤短路、最终触发了哪些动作。只有求值链路可回放，规则平台才具备真正的可运营性和排障能力。',
    bestFor: ['复杂条件命中', '业务调试平台', '配置平台运营'],
    focus: [
      '求值日志、变量快照和条件树命中路径要可输出',
      '支持本地调试与线上回放同一套求值器',
      '为高频场景控制求值性能和缓存策略',
    ],
    risks: [
      '只有结果，没有命中链路',
      '调试和线上使用两套不同求值逻辑',
      '表达式能力无限制，导致性能和安全风险',
    ],
    language: 'ts',
    code: `type RuleExecutionTrace = {
  ruleId: string
  matched: boolean
  steps: Array<{
    field: string
    operator: string
    actual: unknown
    expected: unknown
    result: boolean
  }>
}`,
  },
  {
    order: '04',
    title: '动作执行器要有限能力、强约束，不要把平台变成任意脚本执行器',
    tag: 'Action Runtime',
    description:
      '规则命中后执行什么，决定了平台的安全边界。常见动作包括设置字段值、展示提示、跳转节点、请求补充数据、发送通知等。工程上应尽量让动作类型有限、输入输出清晰，而不是允许配置任意脚本。越是开放的动作系统，后续越难治理。',
    bestFor: ['表单规则', '工作流节点联动', '前端策略执行'],
    focus: [
      '动作类型、参数结构和执行上下文统一规范',
      '前端动作与后端动作分层，避免职责混淆',
      '执行失败要有错误处理和熔断机制',
    ],
    risks: [
      '开放任意 JS 脚本执行',
      '动作副作用过强，规则平台变成隐式业务代码',
      '失败后没有回滚或兜底策略',
    ],
    language: 'ts',
    code: `type RuleAction =
  | { type: 'set-field'; field: string; value: unknown }
  | { type: 'show-message'; level: 'info' | 'warning' | 'error'; text: string }
  | { type: 'goto-step'; stepId: string }`,
  },
  {
    order: '05',
    title: '规则平台一旦上线，就要像发版系统一样治理灰度、审计和回滚',
    tag: 'Governance',
    description:
      '规则错误通常会瞬间影响大量用户，因此它本质上属于“低门槛发版能力”。你必须把规则变更当作正式发布去治理：谁改了、改了什么、在什么环境、是否灰度、是否审核、能否一键回滚。没有这些能力，规则平台越方便，风险越大。',
    bestFor: ['多人共用规则平台', '高频配置变更场景', '影响面广的策略系统'],
    focus: [
      '规则版本、灰度范围、审批发布和操作审计全部留痕',
      '支持环境隔离、回滚和冻结版本',
      '为规则变更提供沙箱验证和命中回放',
    ],
    risks: [
      '线上直接改规则，没有审核和预演',
      '规则配置覆盖后无法恢复旧版本',
      '灰度范围不受控，出问题时影响全量用户',
    ],
    language: 'text',
    code: `规则治理清单
- 规则版本号、发布人、发布时间、变更说明
- 沙箱调试、样本回放、灰度发布、一键回滚
- 环境隔离：dev / test / staging / prod
- 命中监控、异常告警、操作审计`,
  },
];

const comparisonCards = [
  {
    title: '业务代码内写规则 vs 平台化规则引擎',
    summary:
      '代码内写规则维护简单但灵活度低；平台化规则引擎更适合高变化场景，但治理成本和抽象成本都更高。',
  },
  {
    title: '自由表达式能力 vs 强约束 DSL',
    summary:
      '自由表达式短期看最灵活，但长期安全和维护风险极高；强约束 DSL 能力受限一些，却更适合长期治理。',
  },
  {
    title: '前端独立求值 vs 前后端协同裁决',
    summary:
      '轻量 UI 规则可由前端独立处理；一旦规则影响核心业务或强一致性结果，就应该让后端参与最终裁决。',
  },
];
</script>

<style scoped>
.rule-guide-page {
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

.rule-guide-page__shell {
  min-height: calc(100vh - 90px);
  border: 1px solid rgba(19, 27, 34, 0.06);
  border-radius: 7px;
  background: rgba(255, 255, 255, 0.82);
}

.rule-guide-page__top {
  display: flex;
  justify-content: flex-start;
  padding: 18px 18px 0;
}

.rule-guide-page__back {
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

.rule-guide-page__back:hover {
  transform: translateY(-1px);
  border-color: rgba(46, 70, 91, 0.18);
  box-shadow: 0 18px 34px rgba(19, 27, 34, 0.08);
}

.rule-guide-page__content {
  padding: 18px 24px 24px;
}

.rule-guide-hero {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 320px;
  gap: 20px;
  padding-bottom: 26px;
  border-bottom: 1px solid rgba(19, 27, 34, 0.08);
}

.rule-guide-hero__eyebrow,
.rule-guide-section__eyebrow,
.rule-guide-card__eyebrow,
.rule-guide-hero__label {
  font-size: 11px;
  line-height: 1.4;
  letter-spacing: 0.24em;
  text-transform: uppercase;
  color: #7b8793;
}

.rule-guide-hero__title {
  margin-top: 10px;
  font-size: 46px;
  line-height: 1.06;
  font-weight: 600;
  letter-spacing: -0.05em;
  color: #17202a;
}

.rule-guide-hero__summary {
  max-width: 860px;
  margin-top: 16px;
  font-size: 15px;
  line-height: 1.9;
  color: #58636f;
}

.rule-guide-hero__panel,
.rule-guide-card,
.rule-guide-panel {
  border: 1px solid rgba(19, 27, 34, 0.08);
  border-radius: 7px;
  background: rgba(255, 255, 255, 0.84);
}

.rule-guide-hero__panel {
  padding: 18px;
}

.rule-guide-list {
  display: grid;
  gap: 8px;
  margin: 12px 0 0;
  padding-left: 18px;
  font-size: 14px;
  line-height: 1.8;
  color: #56616d;
}

.rule-guide-grid,
.rule-guide-columns,
.rule-guide-stack {
  display: grid;
  gap: 16px;
}

.rule-guide-grid {
  margin-top: 28px;
  grid-template-columns: repeat(3, minmax(0, 1fr));
}

.rule-guide-card {
  padding: 18px;
}

.rule-guide-card__title,
.rule-guide-panel__title,
.rule-guide-section__title {
  color: #17202a;
}

.rule-guide-card__title {
  margin-top: 10px;
  font-size: 22px;
  line-height: 1.25;
  font-weight: 600;
}

.rule-guide-card__text,
.rule-guide-panel__text {
  margin-top: 12px;
  font-size: 14px;
  line-height: 1.9;
  color: #596571;
}

.rule-guide-section {
  margin-top: 28px;
}

.rule-guide-section__head {
  margin-bottom: 14px;
}

.rule-guide-section__title {
  margin-top: 8px;
  font-size: 30px;
  line-height: 1.18;
  font-weight: 600;
  letter-spacing: -0.03em;
}

.rule-guide-columns {
  grid-template-columns: repeat(3, minmax(0, 1fr));
}

.rule-guide-stack {
  grid-template-columns: repeat(2, minmax(0, 1fr));
}

.rule-guide-panel {
  padding: 18px;
}

.rule-guide-panel.is-wide {
  grid-column: 1 / -1;
}

.rule-guide-panel__eyebrow {
  font-size: 11px;
  line-height: 1.4;
  letter-spacing: 0.24em;
  text-transform: uppercase;
  color: #80909d;
}

.rule-guide-panel__title {
  font-size: 20px;
  line-height: 1.3;
  font-weight: 600;
}

.rule-guide-method__head {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 16px;
}

.rule-guide-method__tag {
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

.rule-guide-method__grid {
  display: grid;
  gap: 14px;
  margin-top: 16px;
  grid-template-columns: repeat(3, minmax(0, 1fr));
}

.rule-guide-mini-panel {
  padding: 14px;
  border: 1px solid rgba(19, 27, 34, 0.08);
  border-radius: 7px;
  background: rgba(245, 248, 250, 0.9);
}

.rule-guide-mini-panel__title {
  font-size: 14px;
  font-weight: 600;
  color: #17202a;
}

.rule-guide-code-block {
  margin-top: 14px;
}

@media (max-width: 1080px) {
  .rule-guide-hero,
  .rule-guide-grid,
  .rule-guide-columns,
  .rule-guide-stack,
  .rule-guide-method__grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 900px) {
  .rule-guide-page {
    min-height: auto;
    padding: 18px;
  }

  .rule-guide-page__shell {
    min-height: auto;
  }

  .rule-guide-page__content {
    padding: 18px;
  }

  .rule-guide-hero__title {
    font-size: 36px;
  }

  .rule-guide-section__title {
    font-size: 26px;
  }
}
</style>
