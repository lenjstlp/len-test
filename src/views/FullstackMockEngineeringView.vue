<template>
  <section class="mock-guide-page">
    <div class="mock-guide-page__shell">
      <div class="mock-guide-page__top">
        <RouterLink
          to="/fullstack-guide"
          class="mock-guide-page__back"
          aria-label="返回全栈能力菜单"
          title="返回全栈能力菜单"
        >
          <el-icon :size="18"><ArrowLeft /></el-icon>
        </RouterLink>
      </div>

      <div class="mock-guide-page__content">
        <header class="mock-guide-hero">
          <div>
            <p class="mock-guide-hero__eyebrow">Frontend Mock Engineering</p>
            <h1 class="mock-guide-hero__title">前端 Mock 工程</h1>
            <p class="mock-guide-hero__summary">
              Mock
              不是“后端没写完时先糊一份假数据”，而是前端联调效率、接口契约验证、测试隔离和演示环境稳定性的工程能力。真正成熟的方案，必须回答四个问题：何时
              mock、mock 谁、mock 到哪一层、怎样让 mock 和真实接口长期保持一致。
            </p>
          </div>

          <div class="mock-guide-hero__panel">
            <p class="mock-guide-hero__label">学完结果</p>
            <ul class="mock-guide-list">
              <li>能分清本地假数据、请求拦截、契约生成式 Mock 的职责边界。</li>
              <li>能在开发、测试、演示三种场景下选择合适的 Mock 方案。</li>
              <li>
                能把 Mock 接进类型、测试、接口契约和 CI，而不是停留在临时脚本。
              </li>
            </ul>
          </div>
        </header>

        <section class="mock-guide-grid">
          <article
            v-for="item in quickStages"
            :key="item.order"
            class="mock-guide-card"
          >
            <p class="mock-guide-card__eyebrow">Stage {{ item.order }}</p>
            <h2 class="mock-guide-card__title">{{ item.title }}</h2>
            <p class="mock-guide-card__text">{{ item.summary }}</p>
          </article>
        </section>

        <section class="mock-guide-section">
          <div class="mock-guide-section__head">
            <div>
              <p class="mock-guide-section__eyebrow">Decision Order</p>
              <h2 class="mock-guide-section__title">
                Mock 工程要按真实协作顺序设计
              </h2>
            </div>
          </div>

          <div class="mock-guide-stack">
            <article
              v-for="stage in guideStages"
              :key="stage.order"
              class="mock-guide-panel is-wide"
            >
              <div class="mock-guide-method__head">
                <div>
                  <p class="mock-guide-panel__eyebrow">
                    Stage {{ stage.order }}
                  </p>
                  <h3 class="mock-guide-panel__title">{{ stage.title }}</h3>
                </div>
                <span class="mock-guide-method__tag">{{ stage.tag }}</span>
              </div>

              <p class="mock-guide-panel__text">{{ stage.description }}</p>

              <div class="mock-guide-method__grid">
                <section class="mock-guide-mini-panel">
                  <p class="mock-guide-mini-panel__title">适用场景</p>
                  <ul class="mock-guide-list">
                    <li v-for="item in stage.bestFor" :key="item">
                      {{ item }}
                    </li>
                  </ul>
                </section>

                <section class="mock-guide-mini-panel">
                  <p class="mock-guide-mini-panel__title">实现重点</p>
                  <ul class="mock-guide-list">
                    <li v-for="item in stage.focus" :key="item">
                      {{ item }}
                    </li>
                  </ul>
                </section>

                <section class="mock-guide-mini-panel">
                  <p class="mock-guide-mini-panel__title">常见误区</p>
                  <ul class="mock-guide-list">
                    <li v-for="item in stage.risks" :key="item">
                      {{ item }}
                    </li>
                  </ul>
                </section>
              </div>

              <AppCodeBlock
                class="mock-guide-code-block"
                :code="stage.code"
                :lang="stage.language"
              />
            </article>
          </div>
        </section>

        <section class="mock-guide-section">
          <div class="mock-guide-section__head">
            <div>
              <p class="mock-guide-section__eyebrow">Comparison</p>
              <h2 class="mock-guide-section__title">
                3 种常见 Mock 方式的取舍
              </h2>
            </div>
          </div>

          <div class="mock-guide-columns">
            <article
              v-for="item in comparisonCards"
              :key="item.title"
              class="mock-guide-panel"
            >
              <h3 class="mock-guide-panel__title">{{ item.title }}</h3>
              <p class="mock-guide-panel__text">{{ item.summary }}</p>
            </article>
          </div>
        </section>

        <section class="mock-guide-section">
          <div class="mock-guide-section__head">
            <div>
              <p class="mock-guide-section__eyebrow">Best Practice</p>
              <h2 class="mock-guide-section__title">
                一套能长期维护的 Mock 目录建议
              </h2>
            </div>
          </div>

          <article class="mock-guide-panel is-wide">
            <p class="mock-guide-panel__text">
              最稳的做法不是到处 scattered
              假数据，而是把契约、handlers、样例数据和测试共用资产拆开。这样你既能在本地联调使用，也能在测试和演示环境复用。
            </p>

            <AppCodeBlock
              class="mock-guide-code-block"
              :code="folderExample"
              lang="text"
            />
          </article>
        </section>

        <section class="mock-guide-section">
          <div class="mock-guide-section__head">
            <div>
              <p class="mock-guide-section__eyebrow">Checklist</p>
              <h2 class="mock-guide-section__title">
                让 Mock 真正变成工程能力的落地清单
              </h2>
            </div>
          </div>

          <article class="mock-guide-panel is-wide">
            <ul class="mock-guide-list">
              <li>
                先定义接口契约，再决定 mock 数据长什么样，避免前端字段先飞。
              </li>
              <li>本地开发优先用请求拦截式 Mock，尽量保留真实请求链路。</li>
              <li>
                演示环境和自动化测试不要共用一套脆弱假数据，要按场景维护样例。
              </li>
              <li>Mock 数据要覆盖空态、异常态、权限态，而不是只覆盖成功态。</li>
              <li>
                接口正式上线后，要能快速切回真实接口，并移除临时 mock 逻辑。
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
    title: '先分清 Mock 的目标',
    summary:
      'Mock 是为了解决联调、测试还是演示，不同目标决定你 mock 的层次完全不同。',
  },
  {
    order: '02',
    title: '优先保留真实请求链路',
    summary:
      '能拦截请求就别直接把请求函数改成返回假数据，否则很多问题被提前隐藏了。',
  },
  {
    order: '03',
    title: '让契约驱动数据结构',
    summary: '字段结构最好来自接口契约或类型定义，而不是每个人随手拼一个对象。',
  },
  {
    order: '04',
    title: '场景数据要分层维护',
    summary:
      '成功态、空态、超时、权限不足都要分别准备，避免页面只在 happy path 下可用。',
  },
  {
    order: '05',
    title: 'Mock 要能退出',
    summary: '真实接口可用后，要能快速切换并清理临时逻辑，避免技术债固化。',
  },
];

const guideStages = [
  {
    order: '01',
    title: '先回答为什么要 Mock，不要一上来就造假数据',
    tag: '目标定义',
    description:
      '很多团队做 Mock 的第一反应是“后端还没好”。这只是表层原因。更深一层是：你要不要提前并行开发、要不要稳定重现异常态、要不要给测试提供可控输入、要不要给产品一个固定演示环境。目标不同，方案不同。把这些目标混在一起，最后 Mock 会越做越乱。',
    bestFor: ['前后端并行开发', '早期原型验证', '测试可控输入', '产品演示环境'],
    focus: [
      '明确是为联调、测试还是演示服务',
      '把临时 Mock 和长期工程化 Mock 分开',
      '先定义切换策略，再开始写 handlers',
    ],
    risks: [
      '所有场景共用一份假数据',
      '后端接口可用后仍长期依赖本地 Mock',
      '页面逻辑围绕假数据写死',
    ],
    language: 'text',
    code: `Mock Goal Matrix
- 联调提效：前后端并行开发
- 测试隔离：稳定构造输入与异常
- 演示环境：固定输出，避免依赖外部服务
- 契约验证：提前发现字段与状态不一致`,
  },
  {
    order: '02',
    title: '开发期优先选择请求拦截式 Mock，而不是直接篡改业务层',
    tag: '链路保真',
    description:
      '最推荐的开发期做法，是保留 fetch 或 axios 的真实调用方式，再由 MSW、Vite Mock 插件或本地代理层去拦截。这样 loading、错误处理、重试、取消请求、请求头注入这些行为仍然会真实发生。你如果直接把 service 改成 return Promise.resolve(fakeData)，页面虽然能跑，但大量真实问题会被掩盖。',
    bestFor: ['SPA 联调', '组件联调', '接口切换频繁的项目'],
    focus: [
      '优先拦截网络层，而不是改业务逻辑层',
      '保留请求超时、错误码和 headers 场景',
      '让 mock 开关尽量只影响数据源，不影响页面调用方式',
    ],
    risks: [
      '直接在 service 里 if/else 切换 mock',
      '假数据只返回成功态',
      '切换真实接口时页面行为发生漂移',
    ],
    language: 'typescript',
    code: `import { http, HttpResponse } from 'msw';

export const handlers = [
  http.get('/api/orders', ({ request }) => {
    const url = new URL(request.url);
    const status = url.searchParams.get('status') ?? 'all';

    return HttpResponse.json({
      list: status === 'empty' ? [] : [{ id: 'SO-1001', amount: 1280 }],
      status,
    });
  }),
];`,
  },
  {
    order: '03',
    title: '让契约和类型约束 Mock，而不是反过来让 Mock 主导接口',
    tag: '契约一致',
    description:
      '成熟项目里，Mock 数据结构最好来自 OpenAPI、Zod Schema、TypeScript DTO 或后端契约文件。这样真实接口一改，前端 mock 和类型也会同步暴露问题。反过来，如果先由前端随便写个对象，再让后端“照着改”，最后往往会造成接口语义混乱。',
    bestFor: ['多人协作项目', '接口较多系统', '需要长期维护的 BFF / 前端仓库'],
    focus: [
      '把接口类型定义抽成公共契约',
      'Mock 数据工厂严格返回契约结构',
      '字段变更时优先改契约，再改 handlers 与页面',
    ],
    risks: [
      '假数据字段多于真实接口字段',
      '字段命名和后端协议长期漂移',
      '测试和开发各自维护一套不一致数据结构',
    ],
    language: 'typescript',
    code: `type OrderStatus = 'draft' | 'paid' | 'closed';

interface OrderItemDto {
  id: string;
  amount: number;
  status: OrderStatus;
}

const createOrder = (
  overrides: Partial<OrderItemDto> = {},
): OrderItemDto => ({
  id: 'SO-1001',
  amount: 1280,
  status: 'paid',
  ...overrides,
});`,
  },
  {
    order: '04',
    title: '按场景维护数据样例，不要只维护一份 happy path',
    tag: '场景覆盖',
    description:
      'Mock 真正有价值的地方，是你可以稳定重现那些线上最容易漏掉的情况：空列表、部分字段缺失、分页边界、权限不足、限流、重试、延迟、脏数据。一个成熟页面至少应该在这些输入下跑过一遍。否则 Mock 只是把问题包装得更漂亮。',
    bestFor: ['复杂表格页', '流程型页面', '权限敏感业务'],
    focus: [
      '准备成功态、空态、错误态、权限态、延迟态',
      '按页面或业务域拆分样例数据',
      '把极端数据也纳入可复现输入',
    ],
    risks: [
      '只有一份“正常返回”样例',
      '异常态靠手改代码临时模拟',
      '测试无法稳定复现边界情况',
    ],
    language: 'json',
    code: `{
  "scenarios": {
    "success": { "list": [{ "id": "SO-1001", "amount": 1280 }] },
    "empty": { "list": [] },
    "forbidden": { "code": 403, "message": "无权限查看订单" },
    "slow": { "delay": 2000 },
    "dirty": { "list": [{ "id": "", "amount": -1 }] }
  }
}`,
  },
  {
    order: '05',
    title: '设计统一开关与退出机制，让 Mock 能平滑退场',
    tag: '可切换',
    description:
      'Mock 工程的最后一环，不是“写完了”，而是“能切换”。本地开发、CI、Storybook、演示环境、线上灰度都可能使用不同数据源。你需要一套清晰开关：谁开启、在哪开启、启用后影响哪些接口、真实接口可用后如何撤掉。如果没有退出机制，Mock 很容易变成长期幽灵依赖。',
    bestFor: ['多环境项目', '需要演示环境的产品', '长期演进系统'],
    focus: [
      '使用环境变量或独立运行模式控制 mock',
      '按接口域而不是全局粗暴切换',
      '真实接口落地后安排 mock 清理窗口',
    ],
    risks: [
      '通过注释代码手工切换 mock',
      '整个站点只能全开或全关',
      '没人知道哪些接口还在吃假数据',
    ],
    language: 'typescript',
    code: `const enableMock = import.meta.env.VITE_USE_MOCK === 'true';

export async function bootstrapMock() {
  if (!enableMock) {
    return;
  }

  const { worker } = await import('./mocks/browser');
  await worker.start({
    onUnhandledRequest: 'bypass',
  });
}`,
  },
];

const comparisonCards = [
  {
    title: '本地 JSON / 常量假数据',
    summary:
      '最快，但最脆弱。适合极早期静态原型，不适合长期联调，因为它会绕过真实请求链路，也无法很好覆盖异常与时序问题。',
  },
  {
    title: '请求拦截式 Mock',
    summary:
      '开发体验和真实度最平衡。适合大多数前端项目，用网络层拦截保留请求语义，便于联调、组件测试和演示环境复用。',
  },
  {
    title: '契约生成式 Mock',
    summary:
      '最适合多人协作和长期维护。它的好处是能把 mock 数据绑定到接口契约，但前提是你已经有稳定的契约源和生成流程。',
  },
];

const folderExample = `src/
  api/
    order.ts
    schemas.ts
  mocks/
    browser.ts
    handlers/
      order.handlers.ts
      auth.handlers.ts
    fixtures/
      order.success.ts
      order.empty.ts
      order.forbidden.ts
  tests/
    integration/
      order-page.spec.ts`;
</script>

<style scoped>
.mock-guide-page {
  min-height: 100vh;
  padding: 32px;
  background:
    radial-gradient(
      circle at top left,
      rgba(214, 221, 229, 0.34),
      transparent 26%
    ),
    linear-gradient(180deg, #fbfcfd 0%, #eef2f6 100%);
}

.mock-guide-page__shell {
  max-width: 1240px;
  margin: 0 auto;
}

.mock-guide-page__top {
  display: flex;
  justify-content: flex-start;
  margin-bottom: 18px;
}

.mock-guide-page__back {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 42px;
  height: 42px;
  border: 1px solid rgba(19, 27, 34, 0.08);
  border-radius: 999px;
  color: #17202a;
  background: rgba(255, 255, 255, 0.92);
  text-decoration: none;
  box-shadow: 0 16px 36px rgba(19, 27, 34, 0.08);
  transition:
    transform 160ms ease,
    border-color 160ms ease,
    box-shadow 160ms ease;
}

.mock-guide-page__back:hover {
  transform: translateY(-1px);
  border-color: rgba(67, 94, 118, 0.18);
  box-shadow: 0 18px 42px rgba(19, 27, 34, 0.1);
}

.mock-guide-page__content {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.mock-guide-hero,
.mock-guide-panel,
.mock-guide-card {
  border: 1px solid rgba(19, 27, 34, 0.08);
  border-radius: 7px;
  background: rgba(255, 255, 255, 0.96);
  box-shadow: 0 24px 54px rgba(19, 27, 34, 0.06);
}

.mock-guide-hero {
  display: grid;
  grid-template-columns: minmax(0, 1.4fr) minmax(320px, 0.8fr);
  gap: 18px;
  padding: 28px;
}

.mock-guide-hero__eyebrow,
.mock-guide-section__eyebrow,
.mock-guide-card__eyebrow,
.mock-guide-panel__eyebrow {
  font-size: 11px;
  line-height: 1.4;
  letter-spacing: 0.24em;
  text-transform: uppercase;
  color: #7e8894;
}

.mock-guide-hero__title {
  margin-top: 10px;
  font-size: 42px;
  line-height: 1.06;
  font-weight: 600;
  letter-spacing: -0.04em;
  color: #17202a;
}

.mock-guide-hero__summary,
.mock-guide-panel__text,
.mock-guide-card__text {
  font-size: 15px;
  line-height: 1.9;
  color: #55606c;
}

.mock-guide-hero__summary {
  margin-top: 16px;
  max-width: 760px;
}

.mock-guide-hero__panel,
.mock-guide-mini-panel {
  padding: 20px;
  border: 1px solid rgba(19, 27, 34, 0.08);
  border-radius: 7px;
  background: linear-gradient(180deg, #ffffff 0%, #f5f8fb 100%);
}

.mock-guide-hero__label,
.mock-guide-mini-panel__title {
  font-size: 13px;
  line-height: 1.5;
  font-weight: 600;
  color: #17202a;
}

.mock-guide-list {
  margin: 12px 0 0;
  padding-left: 18px;
  display: grid;
  gap: 8px;
  color: #55606c;
  font-size: 14px;
  line-height: 1.75;
}

.mock-guide-grid,
.mock-guide-columns {
  display: grid;
  gap: 16px;
}

.mock-guide-grid {
  grid-template-columns: repeat(5, minmax(0, 1fr));
}

.mock-guide-card {
  padding: 20px;
}

.mock-guide-card__title,
.mock-guide-panel__title,
.mock-guide-section__title {
  color: #17202a;
}

.mock-guide-card__title {
  margin-top: 8px;
  font-size: 19px;
  line-height: 1.35;
  font-weight: 600;
}

.mock-guide-card__text {
  margin-top: 10px;
}

.mock-guide-section {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.mock-guide-section__head {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
}

.mock-guide-section__title {
  margin-top: 8px;
  font-size: 28px;
  line-height: 1.2;
  font-weight: 600;
  letter-spacing: -0.03em;
}

.mock-guide-stack {
  display: grid;
  gap: 16px;
}

.mock-guide-panel {
  padding: 24px;
}

.mock-guide-panel.is-wide {
  padding: 26px;
}

.mock-guide-method__head {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 12px;
}

.mock-guide-method__tag {
  display: inline-flex;
  align-items: center;
  min-height: 30px;
  padding: 0 12px;
  border-radius: 999px;
  background: rgba(90, 106, 121, 0.1);
  color: #465261;
  font-size: 12px;
  line-height: 1;
}

.mock-guide-panel__title {
  margin-top: 8px;
  font-size: 24px;
  line-height: 1.28;
  font-weight: 600;
}

.mock-guide-panel__text {
  margin-top: 14px;
}

.mock-guide-method__grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 14px;
  margin-top: 18px;
}

.mock-guide-code-block {
  margin-top: 18px;
}

.mock-guide-columns {
  grid-template-columns: repeat(3, minmax(0, 1fr));
}

@media (max-width: 1100px) {
  .mock-guide-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .mock-guide-columns,
  .mock-guide-method__grid,
  .mock-guide-hero {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 720px) {
  .mock-guide-page {
    padding: 18px;
  }

  .mock-guide-grid {
    grid-template-columns: 1fr;
  }

  .mock-guide-hero,
  .mock-guide-card,
  .mock-guide-panel {
    padding: 18px;
  }

  .mock-guide-hero__title {
    font-size: 32px;
  }

  .mock-guide-section__title {
    font-size: 22px;
  }
}
</style>
