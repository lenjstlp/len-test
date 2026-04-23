<template>
  <section class="testing-guide-page">
    <div class="testing-guide-page__shell">
      <div class="testing-guide-page__top">
        <RouterLink
          to="/fullstack-guide"
          class="testing-guide-page__back"
          aria-label="返回全栈能力菜单"
          title="返回全栈能力菜单"
        >
          <el-icon :size="18"><ArrowLeft /></el-icon>
        </RouterLink>
      </div>

      <div class="testing-guide-page__content">
        <header class="testing-guide-hero">
          <div>
            <p class="testing-guide-hero__eyebrow">Frontend Testing</p>
            <h1 class="testing-guide-hero__title">前端测试能力</h1>
            <p class="testing-guide-hero__summary">
              这一页按渡一前端常见的工程化讲法来组织：先明确测试不是“把代码全测一遍”，而是把纯函数、组件交互、接口协作和关键业务流程拆开，再讲单元测试、组件测试、接口
              mock、端到端测试和 CI 闭环。重点不是背框架
              API，而是知道什么该测、测到什么程度、怎样避免测试变成负担。
            </p>
          </div>

          <div class="testing-guide-hero__panel">
            <p class="testing-guide-hero__label">学完结果</p>
            <ul class="testing-guide-list">
              <li>能把单元测试、组件测试、集成测试和 E2E 测试分层设计。</li>
              <li>
                能给前端项目搭出一条可维护的测试链路，而不是只写零散断言。
              </li>
              <li>
                能判断哪些逻辑值得测，哪些地方更适合用 mock、契约或冒烟测试。
              </li>
            </ul>
          </div>
        </header>

        <section class="testing-guide-grid">
          <article
            v-for="item in quickStages"
            :key="item.order"
            class="testing-guide-card"
          >
            <p class="testing-guide-card__eyebrow">Stage {{ item.order }}</p>
            <h2 class="testing-guide-card__title">{{ item.title }}</h2>
            <p class="testing-guide-card__text">{{ item.summary }}</p>
          </article>
        </section>

        <section class="testing-guide-section">
          <div class="testing-guide-section__head">
            <div>
              <p class="testing-guide-section__eyebrow">Decision Order</p>
              <h2 class="testing-guide-section__title">
                前端测试先分层，再决定工具和覆盖策略
              </h2>
            </div>
          </div>

          <div class="testing-guide-stack">
            <article
              v-for="stage in guideStages"
              :key="stage.order"
              class="testing-guide-panel is-wide"
            >
              <div class="testing-guide-method__head">
                <div>
                  <p class="testing-guide-panel__eyebrow">
                    Stage {{ stage.order }}
                  </p>
                  <h3 class="testing-guide-panel__title">{{ stage.title }}</h3>
                </div>
                <span class="testing-guide-method__tag">{{ stage.tag }}</span>
              </div>

              <p class="testing-guide-panel__text">{{ stage.description }}</p>

              <div class="testing-guide-method__grid">
                <section class="testing-guide-mini-panel">
                  <p class="testing-guide-mini-panel__title">适用场景</p>
                  <ul class="testing-guide-list">
                    <li v-for="item in stage.bestFor" :key="item">
                      {{ item }}
                    </li>
                  </ul>
                </section>

                <section class="testing-guide-mini-panel">
                  <p class="testing-guide-mini-panel__title">实现重点</p>
                  <ul class="testing-guide-list">
                    <li v-for="item in stage.focus" :key="item">
                      {{ item }}
                    </li>
                  </ul>
                </section>

                <section class="testing-guide-mini-panel">
                  <p class="testing-guide-mini-panel__title">常见误区</p>
                  <ul class="testing-guide-list">
                    <li v-for="item in stage.risks" :key="item">
                      {{ item }}
                    </li>
                  </ul>
                </section>
              </div>

              <AppCodeBlock
                class="testing-guide-code-block"
                :code="stage.code"
                :lang="stage.language"
              />
            </article>
          </div>
        </section>

        <section class="testing-guide-section">
          <div class="testing-guide-section__head">
            <div>
              <p class="testing-guide-section__eyebrow">Comparison</p>
              <h2 class="testing-guide-section__title">
                什么时候该写单测，什么时候该直接上 E2E
              </h2>
            </div>
          </div>

          <div class="testing-guide-columns">
            <article
              v-for="item in comparisonCards"
              :key="item.title"
              class="testing-guide-panel"
            >
              <h3 class="testing-guide-panel__title">{{ item.title }}</h3>
              <p class="testing-guide-panel__text">{{ item.summary }}</p>
            </article>
          </div>
        </section>

        <section class="testing-guide-section">
          <div class="testing-guide-section__head">
            <div>
              <p class="testing-guide-section__eyebrow">Checklist</p>
              <h2 class="testing-guide-section__title">
                一套能持续跑下去的前端测试落地清单
              </h2>
            </div>
          </div>

          <article class="testing-guide-panel is-wide">
            <ul class="testing-guide-list">
              <li>
                优先覆盖纯函数、核心状态转换、关键表单流程和高风险回归点。
              </li>
              <li>
                组件测试关注行为和用户结果，不要把内部实现细节全写进断言。
              </li>
              <li>
                E2E 只覆盖最关键链路，不要把所有场景都堆到浏览器自动化里。
              </li>
              <li>
                接口 mock 要服务于稳定测试，不要让 mock 脱离真实契约太远。
              </li>
              <li>测试必须接进 CI，不然再多用例也只能算本地实验。</li>
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
    title: '先分清测试层次',
    summary: '单元、组件、集成、E2E 不是互相替代，而是分工不同。',
  },
  {
    order: '02',
    title: '先测高价值逻辑',
    summary: '真正值得测的是容易回归、影响大、人工验证成本高的部分。',
  },
  {
    order: '03',
    title: '组件测试看行为',
    summary: '重点是用户看到什么、能操作什么，不是组件里有几个 ref。',
  },
  {
    order: '04',
    title: 'E2E 只保关键链路',
    summary: '浏览器自动化成本最高，应该用来守住下单、登录、提交这类流程。',
  },
  {
    order: '05',
    title: '测试必须接入 CI',
    summary: '没有自动执行的测试，很快就会在迭代里失去存在感。',
  },
];

const guideStages = [
  {
    order: '01',
    title: '先建模：前端测试不是一套工具，而是一套分层策略',
    tag: '基础认知',
    description:
      '渡一前端讲测试时，通常不会一上来先教你写断言，而是先讲“哪些东西值得测”。纯函数、状态转换、表单校验这类逻辑适合单元测试；组件交互和渲染反馈适合组件测试；跨页面关键流程才值得进 E2E。先分层，后面工具选型和覆盖率目标才不会失控。',
    bestFor: ['前端测试入门', '中后台系统', '组件库项目', '多人协作项目'],
    focus: [
      '先拆分逻辑层、组件层、流程层',
      '每一层只解决对应粒度的问题',
      '测试策略优先于测试框架选择',
    ],
    risks: [
      '一上来就要求全量覆盖率',
      '所有场景都塞进浏览器自动化',
      '没有分层意识，导致测试维护成本过高',
    ],
    language: 'text',
    code: `Frontend Testing Layers
- Unit: 纯函数、状态转换、工具方法
- Component: 组件渲染、交互反馈、边界状态
- Integration: 页面协作、接口联动、模块组合
- E2E: 登录、下单、发布、支付等关键用户流程`,
  },
  {
    order: '02',
    title: '单元测试优先守住纯逻辑：状态变化、校验规则、工具函数',
    tag: '单元测试',
    description:
      '前端项目里最稳定、收益最高的一层测试，往往是单元测试。因为纯函数和状态转换没有 DOM 和浏览器环境依赖，执行快、定位准、回归成本低。只要把金额计算、表单校验、权限判断、数据转换这些高价值逻辑守住，很多低级回归就能提前拦掉。',
    bestFor: ['工具函数', '表单校验', '权限判断', '状态机和 reducer'],
    focus: [
      '输入输出要明确，减少环境依赖',
      '边界值和异常分支优先覆盖',
      '断言面向结果，不写无意义快照',
    ],
    risks: [
      '为了写测试而强行 mock 一切',
      '只测 happy path，不测边界',
      '把简单 getter 也堆很多低价值断言',
    ],
    language: 'typescript',
    code: `import { describe, expect, it } from 'vitest'
import { canSubmitOrder } from '@/utils/order'

describe('canSubmitOrder', () => {
  it('库存不足时返回 false', () => {
    expect(
      canSubmitOrder({ stock: 0, amount: 2, login: true }),
    ).toBe(false)
  })

  it('登录且库存充足时返回 true', () => {
    expect(
      canSubmitOrder({ stock: 10, amount: 2, login: true }),
    ).toBe(true)
  })
})`,
  },
  {
    order: '03',
    title: '组件测试重点看用户行为：渲染、输入、点击、反馈',
    tag: '组件测试',
    description:
      '组件测试最容易走偏的地方，是把内部实现细节全测一遍。更成熟的方式是站在用户视角：页面上显示了什么？输入后提示有没有变化？点击按钮有没有触发正确反馈？这样写出来的测试更稳，也更接近真实回归风险。',
    bestFor: ['表单组件', '弹窗组件', '列表筛选', '业务组件交互'],
    focus: [
      '用 Testing Library 风格断言用户可见结果',
      '优先测试输入、点击、加载、报错等行为',
      '只在必要时 mock 外部依赖',
    ],
    risks: [
      '直接断言内部响应式状态',
      '过度依赖 class 名和实现结构',
      '组件一重构测试就大面积无效',
    ],
    language: 'typescript',
    code: `import { render, screen } from '@testing-library/vue'
import userEvent from '@testing-library/user-event'
import LoginForm from '@/components/LoginForm.vue'

it('密码为空时展示校验提示', async () => {
  const user = userEvent.setup()
  render(LoginForm)

  await user.type(screen.getByLabelText('账号'), 'admin')
  await user.click(screen.getByRole('button', { name: '登录' }))

  expect(screen.getByText('请输入密码')).toBeInTheDocument()
})`,
  },
  {
    order: '04',
    title: '接口协作测试要有节制：mock 服务于稳定，不是替代真实联调',
    tag: '集成测试',
    description:
      '前端测试里经常会卡在接口这一层。完全走真实后端，测试不稳定；完全手写 mock，又容易和真实契约脱节。更稳的做法是：本地和测试环境使用统一的 mock 约定，组件和页面测试用可控响应保障稳定，关键链路再保留真实接口或契约校验。',
    bestFor: ['页面联动', '数据回填', '异常分支验证', '接口状态组合场景'],
    focus: [
      'mock 只覆盖当前测试真正需要的接口行为',
      '把成功、失败、空态三类响应都覆盖',
      '关键接口保留契约检查或真实联调校验',
    ],
    risks: [
      'mock 数据长期没人维护，脱离真实接口',
      '一个测试里 mock 太多接口，定位困难',
      '只测成功态，不测失败和空态',
    ],
    language: 'typescript',
    code: `import { http, HttpResponse } from 'msw'

export const handlers = [
  http.get('/api/user/profile', () => {
    return HttpResponse.json({
      id: 'u_001',
      name: 'Len',
      role: 'admin',
    })
  }),
]
`,
  },
  {
    order: '05',
    title: 'E2E 和 CI 是最后一道门：只守关键路径，但必须稳定执行',
    tag: '流程防线',
    description:
      'E2E 不应该承担所有测试任务，但它非常适合守住核心业务流程。比如登录、提交表单、支付、发布内容，这些流程一旦坏掉，影响面很大。真正重要的是把少量高价值 E2E 用例接进 CI，让每次提交、合并或发布前都自动跑一遍，形成持续回归防线。',
    bestFor: ['登录流程', '下单流程', '发布流程', '回归冒烟'],
    focus: [
      '只保留高价值冒烟链路',
      '测试数据和环境要可重复准备',
      '在 CI 里自动执行并快速反馈',
    ],
    risks: [
      '把所有细节都堆到 E2E，执行慢且易碎',
      '测试环境数据不稳定，导致误报',
      'CI 不跑测试，只靠开发本地自觉',
    ],
    language: 'yaml',
    code: `name: frontend-test

on:
  pull_request:
  push:
    branches: [master]

jobs:
  test:
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
      - run: pnpm test
      - run: pnpm test:e2e`,
  },
];

const comparisonCards = [
  {
    title: '单元测试 vs 组件测试',
    summary:
      '单元测试更适合守住纯逻辑，速度快、定位准；组件测试更适合验证用户交互和界面反馈，但维护成本会略高。',
  },
  {
    title: '组件测试 vs E2E',
    summary:
      '组件测试更快、更稳定，适合覆盖大量交互细节；E2E 更接近真实用户，但成本更高，所以只该守关键链路。',
  },
  {
    title: '手写 mock vs 真实接口联调',
    summary:
      '手写 mock 能提升稳定性和执行速度，但容易和真实接口漂移；真实联调更接近生产，但适合留给少量关键流程或契约校验。',
  },
];
</script>

<style scoped>
.testing-guide-page {
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

.testing-guide-page__shell {
  min-height: calc(100vh - 90px);
  border: 1px solid rgba(19, 27, 34, 0.06);
  border-radius: 7px;
  background: rgba(255, 255, 255, 0.82);
}

.testing-guide-page__top {
  display: flex;
  justify-content: flex-start;
  padding: 18px 18px 0;
}

.testing-guide-page__back {
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

.testing-guide-page__back:hover {
  transform: translateY(-1px);
  border-color: rgba(46, 70, 91, 0.18);
  box-shadow: 0 18px 34px rgba(19, 27, 34, 0.08);
}

.testing-guide-page__content {
  padding: 18px 24px 24px;
}

.testing-guide-hero {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 320px;
  gap: 20px;
  padding-bottom: 26px;
  border-bottom: 1px solid rgba(19, 27, 34, 0.08);
}

.testing-guide-hero__eyebrow,
.testing-guide-section__eyebrow,
.testing-guide-card__eyebrow,
.testing-guide-hero__label {
  font-size: 11px;
  line-height: 1.4;
  letter-spacing: 0.24em;
  text-transform: uppercase;
  color: #7b8793;
}

.testing-guide-hero__title {
  margin-top: 10px;
  font-size: 46px;
  line-height: 1.06;
  font-weight: 600;
  letter-spacing: -0.05em;
  color: #17202a;
}

.testing-guide-hero__summary {
  max-width: 860px;
  margin-top: 16px;
  font-size: 15px;
  line-height: 1.9;
  color: #58636f;
}

.testing-guide-hero__panel,
.testing-guide-card,
.testing-guide-panel {
  border: 1px solid rgba(19, 27, 34, 0.08);
  border-radius: 7px;
  background: rgba(255, 255, 255, 0.84);
}

.testing-guide-hero__panel {
  padding: 18px;
}

.testing-guide-list {
  display: grid;
  gap: 8px;
  margin: 12px 0 0;
  padding-left: 18px;
  font-size: 14px;
  line-height: 1.8;
  color: #56616d;
}

.testing-guide-grid,
.testing-guide-columns,
.testing-guide-stack {
  display: grid;
  gap: 16px;
}

.testing-guide-grid {
  margin-top: 28px;
  grid-template-columns: repeat(3, minmax(0, 1fr));
}

.testing-guide-card {
  padding: 18px;
}

.testing-guide-card__title,
.testing-guide-panel__title,
.testing-guide-section__title {
  color: #17202a;
}

.testing-guide-card__title {
  margin-top: 10px;
  font-size: 22px;
  line-height: 1.25;
  font-weight: 600;
}

.testing-guide-card__text,
.testing-guide-panel__text {
  margin-top: 12px;
  font-size: 14px;
  line-height: 1.9;
  color: #596571;
}

.testing-guide-section {
  margin-top: 28px;
}

.testing-guide-section__head {
  margin-bottom: 14px;
}

.testing-guide-section__title {
  margin-top: 8px;
  font-size: 30px;
  line-height: 1.18;
  font-weight: 600;
  letter-spacing: -0.03em;
}

.testing-guide-columns {
  grid-template-columns: repeat(3, minmax(0, 1fr));
}

.testing-guide-stack {
  grid-template-columns: repeat(2, minmax(0, 1fr));
}

.testing-guide-panel {
  padding: 18px;
}

.testing-guide-panel.is-wide {
  grid-column: 1 / -1;
}

.testing-guide-panel__eyebrow {
  font-size: 11px;
  line-height: 1.4;
  letter-spacing: 0.24em;
  text-transform: uppercase;
  color: #80909d;
}

.testing-guide-panel__title {
  font-size: 20px;
  line-height: 1.3;
  font-weight: 600;
}

.testing-guide-method__head {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 16px;
}

.testing-guide-method__tag {
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

.testing-guide-method__grid {
  display: grid;
  gap: 14px;
  margin-top: 16px;
  grid-template-columns: repeat(3, minmax(0, 1fr));
}

.testing-guide-mini-panel {
  padding: 14px;
  border: 1px solid rgba(19, 27, 34, 0.08);
  border-radius: 7px;
  background: rgba(245, 248, 250, 0.9);
}

.testing-guide-mini-panel__title {
  font-size: 14px;
  font-weight: 600;
  color: #17202a;
}

.testing-guide-code-block {
  margin-top: 14px;
}

@media (max-width: 1080px) {
  .testing-guide-hero,
  .testing-guide-grid,
  .testing-guide-columns,
  .testing-guide-stack,
  .testing-guide-method__grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 900px) {
  .testing-guide-page {
    min-height: auto;
    padding: 18px;
  }

  .testing-guide-page__shell {
    min-height: auto;
  }

  .testing-guide-page__content {
    padding: 18px;
  }

  .testing-guide-hero__title {
    font-size: 36px;
  }

  .testing-guide-section__title {
    font-size: 26px;
  }
}
</style>
