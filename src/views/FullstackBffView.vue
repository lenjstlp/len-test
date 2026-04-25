<template>
  <section class="bff-guide-page">
    <div class="bff-guide-page__shell">
      <div class="bff-guide-page__top">
        <RouterLink
          to="/fullstack-guide"
          class="bff-guide-page__back"
          aria-label="返回全栈能力菜单"
          title="返回全栈能力菜单"
        >
          <el-icon :size="18"><ArrowLeft /></el-icon>
        </RouterLink>
      </div>

      <div class="bff-guide-page__content">
        <header class="bff-guide-hero">
          <div>
            <p class="bff-guide-hero__eyebrow">Frontend BFF And API Gateway</p>
            <h1 class="bff-guide-hero__title">前端 BFF 与接口聚合能力</h1>
            <p class="bff-guide-hero__summary">
              这一页按真实项目建设 BFF
              的顺序来讲：先判断前端是否真的需要接口聚合层，再处理领域边界、鉴权透传、聚合编排、缓存降级、错误收敛和观测治理。重点不是多加一层
              Node 服务，而是让前端交付速度、接口稳定性和跨端复用真正提升。
            </p>
          </div>

          <div class="bff-guide-hero__panel">
            <p class="bff-guide-hero__label">学完结果</p>
            <ul class="bff-guide-list">
              <li>能分清直连后端、网关层和 BFF 层各自解决什么问题。</li>
              <li>
                能设计面向页面或业务域的聚合接口，而不是把后端接口原样转发。
              </li>
              <li>
                能把鉴权、缓存、超时、降级和日志追踪一起纳入 BFF 工程治理。
              </li>
            </ul>
          </div>
        </header>

        <section class="bff-guide-grid">
          <article
            v-for="item in quickStages"
            :key="item.order"
            class="bff-guide-card"
          >
            <p class="bff-guide-card__eyebrow">Stage {{ item.order }}</p>
            <h2 class="bff-guide-card__title">{{ item.title }}</h2>
            <p class="bff-guide-card__text">{{ item.summary }}</p>
          </article>
        </section>

        <section class="bff-guide-section">
          <div class="bff-guide-section__head">
            <div>
              <p class="bff-guide-section__eyebrow">Decision Order</p>
              <h2 class="bff-guide-section__title">
                BFF 先判断协作问题，再建设聚合层与治理层
              </h2>
            </div>
          </div>

          <div class="bff-guide-stack">
            <article
              v-for="stage in guideStages"
              :key="stage.order"
              class="bff-guide-panel is-wide"
            >
              <div class="bff-guide-method__head">
                <div>
                  <p class="bff-guide-panel__eyebrow">
                    Stage {{ stage.order }}
                  </p>
                  <h3 class="bff-guide-panel__title">{{ stage.title }}</h3>
                </div>
                <span class="bff-guide-method__tag">{{ stage.tag }}</span>
              </div>

              <p class="bff-guide-panel__text">{{ stage.description }}</p>

              <div class="bff-guide-method__grid">
                <section class="bff-guide-mini-panel">
                  <p class="bff-guide-mini-panel__title">适用场景</p>
                  <ul class="bff-guide-list">
                    <li v-for="item in stage.bestFor" :key="item">
                      {{ item }}
                    </li>
                  </ul>
                </section>

                <section class="bff-guide-mini-panel">
                  <p class="bff-guide-mini-panel__title">实现重点</p>
                  <ul class="bff-guide-list">
                    <li v-for="item in stage.focus" :key="item">
                      {{ item }}
                    </li>
                  </ul>
                </section>

                <section class="bff-guide-mini-panel">
                  <p class="bff-guide-mini-panel__title">常见误区</p>
                  <ul class="bff-guide-list">
                    <li v-for="item in stage.risks" :key="item">
                      {{ item }}
                    </li>
                  </ul>
                </section>
              </div>

              <AppCodeBlock
                class="bff-guide-code-block"
                :code="stage.code"
                :lang="stage.language"
              />
            </article>
          </div>
        </section>

        <section class="bff-guide-section">
          <div class="bff-guide-section__head">
            <div>
              <p class="bff-guide-section__eyebrow">Comparison</p>
              <h2 class="bff-guide-section__title">BFF 最关键的几组取舍</h2>
            </div>
          </div>

          <div class="bff-guide-columns">
            <article
              v-for="item in comparisonCards"
              :key="item.title"
              class="bff-guide-panel"
            >
              <h3 class="bff-guide-panel__title">{{ item.title }}</h3>
              <p class="bff-guide-panel__text">{{ item.summary }}</p>
            </article>
          </div>
        </section>

        <section class="bff-guide-section">
          <div class="bff-guide-section__head">
            <div>
              <p class="bff-guide-section__eyebrow">Checklist</p>
              <h2 class="bff-guide-section__title">
                一套能落地的前端 BFF 清单
              </h2>
            </div>
          </div>

          <article class="bff-guide-panel is-wide">
            <ul class="bff-guide-list">
              <li>
                先确认前端真的存在多接口拼装、跨端差异和稳定性问题，再引入 BFF。
              </li>
              <li>按业务域拆 BFF 能力，不要把它做成一个全能转发层。</li>
              <li>鉴权、超时、重试、缓存、熔断和错误码映射要统一治理。</li>
              <li>
                聚合接口面向页面或场景输出，避免把后端内部结构直接暴露给前端。
              </li>
              <li>
                日志、traceId、接口耗时和降级路径都要可观测，否则问题只会更隐蔽。
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
    title: '先判断值不值得加一层',
    summary: '不是所有项目都需要 BFF，先看前后端协作成本和跨端差异。',
  },
  {
    order: '02',
    title: '按业务域拆接口',
    summary: '聚合层应该面向页面场景，而不是简单转发后端服务。',
  },
  {
    order: '03',
    title: '鉴权和错误要统一',
    summary: 'BFF 的价值之一，是把权限透传、错误码和日志链路收敛起来。',
  },
  {
    order: '04',
    title: '缓存与降级要明确',
    summary: '聚合之后故障面会扩大，超时、兜底和缓存策略必须提前设计。',
  },
  {
    order: '05',
    title: '治理比接口本身更重要',
    summary: '没有监控、trace 和发布规范的 BFF，只会变成另一层隐蔽复杂度。',
  },
];

const guideStages = [
  {
    order: '01',
    title: '先判断前端是否真的需要 BFF，而不是为了“架构高级”盲目加层',
    tag: '问题建模',
    description:
      'BFF 最常见的适用场景，是前端页面要拼多个后端接口、不同终端对字段结构要求不同、后端接口变动过于频繁、或者前端需要统一鉴权与错误收敛。如果只是一个简单 CRUD 项目，前端直连后端往往更清爽。BFF 不是默认配置，而是协作成本升高后的治理手段。',
    bestFor: ['多端业务', '复杂聚合页', '中后台平台', '接口变动频繁项目'],
    focus: [
      '先识别是否存在明显的拼装和编排痛点',
      '评估跨端差异是否值得独立聚合层',
      '让 BFF 服务协作效率，而不是增加维护层级',
    ],
    risks: [
      '简单项目也强行引入 BFF',
      '把 BFF 当成炫技架构',
      '前后端职责边界没有重新定义',
    ],
    language: 'text',
    code: `BFF Decision
- 页面是否要组合多个后端接口？
- Web / H5 / 小程序是否需要不同字段形态？
- 接口变更是否频繁影响前端交付？
- 如果答案多数是否定，优先保持直连更简单`,
  },
  {
    order: '02',
    title: 'BFF 接口要面向场景输出，不要把后端接口原样透传一遍',
    tag: '接口设计',
    description:
      '很多团队搭了 BFF 以后，实际上只是把 `/api-a` 转成 `/bff/api-a`，这几乎没有创造价值。更合理的做法是，围绕页面场景或业务域组织接口，让 BFF 直接返回页面真正需要的数据结构、默认值、聚合结果和展示态字段。这样前端页面能更薄，后端内部接口调整也更容易被 BFF 吸收。',
    bestFor: ['首页聚合页', '详情页编排', '多服务拼装页面', '跨端展示层'],
    focus: [
      '按页面或领域组织响应结构',
      '在 BFF 层吸收后端字段差异',
      '让接口契约更贴近前端消费模型',
    ],
    risks: [
      '只是把后端接口路径改个前缀',
      '把后端内部表结构直接暴露出去',
      '页面仍然自己做大量字段拼装',
    ],
    language: 'ts',
    code: `type DashboardResponse = {
  user: {
    id: string
    displayName: string
  }
  stats: {
    pendingCount: number
    warningCount: number
  }
  shortcuts: Array<{
    label: string
    path: string
  }>
}`,
  },
  {
    order: '03',
    title: '鉴权、错误码和 traceId 要在 BFF 层统一收敛',
    tag: '协议治理',
    description:
      'BFF 最大的工程价值之一，是把散落在前端页面里的 token 注入、权限透传、错误码转换、日志上下文和 traceId 统一收拢。这样前端页面只关心成功或失败语义，而不必重复处理不同后端服务的协议差异。BFF 层应该是协议适配器，而不是协议污染放大器。',
    bestFor: [
      '多微服务系统',
      '多团队协作平台',
      '需要链路追踪的业务',
      '权限复杂项目',
    ],
    focus: [
      '统一 header、token、traceId 透传',
      '对外暴露稳定错误语义和状态码',
      '把后端服务差异收口到聚合层内部',
    ],
    risks: [
      '每个接口各自定义错误格式',
      'traceId 只在后端有，前端无法追踪',
      '前端页面继续处理底层服务协议差异',
    ],
    language: 'ts',
    code: `const requestContext = {
  traceId: headers['x-trace-id'],
  userId: session.userId,
}

throw createBffError({
  code: 'ORDER_SERVICE_TIMEOUT',
  message: '订单服务响应超时',
  traceId: requestContext.traceId,
})`,
  },
  {
    order: '04',
    title: '聚合之后故障范围会扩大，所以缓存、超时和降级要一起设计',
    tag: '稳定性',
    description:
      '一个页面原本打 3 个接口，现在可能都由 BFF 一次聚合完成。好处是页面简单了，代价是聚合层成了新的关键节点。BFF 需要明确每个下游服务的超时、重试、兜底、缓存与降级规则。否则只要某个依赖抖动，整个页面都可能一起雪崩。',
    bestFor: [
      '高并发聚合页',
      '依赖多服务页面',
      '首页场景',
      '对稳定性要求高的平台',
    ],
    focus: [
      '按接口价值设计超时与重试策略',
      '区分强依赖和可降级依赖',
      '对热点读场景增加合理缓存',
    ],
    risks: [
      '所有下游接口统一长超时',
      '关键页没有降级路径',
      '缓存命中与失效策略不清晰',
    ],
    language: 'ts',
    code: `const profile = await withTimeout(fetchProfile(userId), 800)
const notices = await withFallback(
  withTimeout(fetchNoticeList(userId), 400),
  [],
)

return {
  profile,
  notices,
}`,
  },
  {
    order: '05',
    title: 'BFF 要有独立的工程治理：目录边界、测试、监控和发布规范',
    tag: '工程治理',
    description:
      'BFF 一旦承担了协议适配和聚合编排，就不能只当几段 Node 脚本来写。需要有明确的领域目录、下游调用封装、契约测试、日志规范、指标监控和灰度发布策略。否则随着接口变多，它会迅速从“解耦层”退化成“黑盒层”。',
    bestFor: [
      '多人协作团队',
      '中大型前端团队',
      '长期维护平台',
      '需要稳定演进的项目',
    ],
    focus: [
      '按领域组织 handler、service、client',
      '对聚合接口做契约测试和回归测试',
      '记录耗时、错误率、降级次数和下游依赖状态',
    ],
    risks: [
      '把所有路由和逻辑堆在一个文件里',
      '没有任何接口测试和回归保障',
      '问题出现后只能看 console 日志',
    ],
    language: 'ts',
    code: `src/bff/
  dashboard/
    handler.ts
    service.ts
    client.ts
    contract.spec.ts
  shared/
    auth.ts
    logger.ts
    response.ts`,
  },
];

const comparisonCards = [
  {
    title: '直连后端 vs 引入 BFF',
    summary:
      '简单业务优先直连，复杂聚合页、跨端差异和协议收敛场景再上 BFF。多一层一定有成本，前提是它能换来协作收益。',
  },
  {
    title: '接口转发 vs 场景聚合',
    summary:
      '纯转发几乎没有价值，真正有意义的是把多个后端能力整成前端可直接消费的场景接口，并统一错误和鉴权语义。',
  },
  {
    title: '快速上线 vs 长期治理',
    summary:
      'BFF 初期很容易写得快，但没有目录边界、测试和监控，后面会比直连更难维护。它必须从一开始就带治理意识。',
  },
];
</script>

<style scoped>
.bff-guide-page {
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

.bff-guide-page__shell {
  min-height: calc(100vh - 90px);
  border: 1px solid rgba(19, 27, 34, 0.06);
  border-radius: 7px;
  background: rgba(255, 255, 255, 0.82);
}

.bff-guide-page__top {
  display: flex;
  justify-content: flex-start;
  padding: 18px 18px 0;
}

.bff-guide-page__back {
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

.bff-guide-page__back:hover {
  transform: translateY(-1px);
  border-color: rgba(46, 70, 91, 0.18);
  box-shadow: 0 18px 34px rgba(19, 27, 34, 0.08);
}

.bff-guide-page__content {
  padding: 18px 24px 24px;
}

.bff-guide-hero {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 320px;
  gap: 20px;
  padding-bottom: 26px;
  border-bottom: 1px solid rgba(19, 27, 34, 0.08);
}

.bff-guide-hero__eyebrow,
.bff-guide-section__eyebrow,
.bff-guide-card__eyebrow,
.bff-guide-hero__label {
  font-size: 11px;
  line-height: 1.4;
  letter-spacing: 0.24em;
  text-transform: uppercase;
  color: #7b8793;
}

.bff-guide-hero__title {
  margin-top: 10px;
  font-size: 46px;
  line-height: 1.06;
  font-weight: 600;
  letter-spacing: -0.05em;
  color: #17202a;
}

.bff-guide-hero__summary {
  max-width: 860px;
  margin-top: 16px;
  font-size: 15px;
  line-height: 1.9;
  color: #58636f;
}

.bff-guide-hero__panel,
.bff-guide-card,
.bff-guide-panel {
  border: 1px solid rgba(19, 27, 34, 0.08);
  border-radius: 7px;
  background: rgba(255, 255, 255, 0.84);
}

.bff-guide-hero__panel {
  padding: 18px;
}

.bff-guide-list {
  display: grid;
  gap: 8px;
  margin: 12px 0 0;
  padding-left: 18px;
  font-size: 14px;
  line-height: 1.8;
  color: #56616d;
}

.bff-guide-grid,
.bff-guide-columns,
.bff-guide-stack {
  display: grid;
  gap: 16px;
}

.bff-guide-grid {
  margin-top: 28px;
  grid-template-columns: repeat(3, minmax(0, 1fr));
}

.bff-guide-card {
  padding: 18px;
}

.bff-guide-card__title,
.bff-guide-panel__title,
.bff-guide-section__title {
  color: #17202a;
}

.bff-guide-card__title {
  margin-top: 10px;
  font-size: 22px;
  line-height: 1.25;
  font-weight: 600;
}

.bff-guide-card__text,
.bff-guide-panel__text {
  margin-top: 12px;
  font-size: 14px;
  line-height: 1.9;
  color: #596571;
}

.bff-guide-section {
  margin-top: 28px;
}

.bff-guide-section__head {
  margin-bottom: 14px;
}

.bff-guide-section__title {
  margin-top: 8px;
  font-size: 30px;
  line-height: 1.18;
  font-weight: 600;
  letter-spacing: -0.03em;
}

.bff-guide-columns {
  grid-template-columns: repeat(3, minmax(0, 1fr));
}

.bff-guide-stack {
  grid-template-columns: repeat(2, minmax(0, 1fr));
}

.bff-guide-panel {
  padding: 18px;
}

.bff-guide-panel.is-wide {
  grid-column: 1 / -1;
}

.bff-guide-panel__eyebrow {
  font-size: 11px;
  line-height: 1.4;
  letter-spacing: 0.24em;
  text-transform: uppercase;
  color: #80909d;
}

.bff-guide-panel__title {
  font-size: 20px;
  line-height: 1.3;
  font-weight: 600;
}

.bff-guide-method__head {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 16px;
}

.bff-guide-method__tag {
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

.bff-guide-method__grid {
  display: grid;
  gap: 14px;
  margin-top: 16px;
  grid-template-columns: repeat(3, minmax(0, 1fr));
}

.bff-guide-mini-panel {
  padding: 14px;
  border: 1px solid rgba(19, 27, 34, 0.08);
  border-radius: 7px;
  background: rgba(245, 248, 250, 0.9);
}

.bff-guide-mini-panel__title {
  font-size: 14px;
  font-weight: 600;
  color: #17202a;
}

.bff-guide-code-block {
  margin-top: 14px;
}

@media (max-width: 1080px) {
  .bff-guide-hero,
  .bff-guide-grid,
  .bff-guide-columns,
  .bff-guide-stack,
  .bff-guide-method__grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 900px) {
  .bff-guide-page {
    min-height: auto;
    padding: 18px;
  }

  .bff-guide-page__shell {
    min-height: auto;
  }

  .bff-guide-page__content {
    padding: 18px;
  }

  .bff-guide-hero__title {
    font-size: 36px;
  }

  .bff-guide-section__title {
    font-size: 26px;
  }
}
</style>
