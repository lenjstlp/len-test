<template>
  <section class="permission-guide-page">
    <div class="permission-guide-page__shell">
      <div class="permission-guide-page__top">
        <RouterLink
          to="/fullstack-guide"
          class="permission-guide-page__back"
          aria-label="返回全栈能力菜单"
          title="返回全栈能力菜单"
        >
          <el-icon :size="18"><ArrowLeft /></el-icon>
        </RouterLink>
      </div>

      <div class="permission-guide-page__content">
        <header class="permission-guide-hero">
          <div>
            <p class="permission-guide-hero__eyebrow">
              Frontend Permission System Engineering
            </p>
            <h1 class="permission-guide-hero__title">前端权限系统工程能力</h1>
            <p class="permission-guide-hero__summary">
              权限系统不是把页面按钮隐藏掉就结束，而是要把身份、角色、资源、操作、数据范围和租户上下文统一建模。真正的难点在于：你既要让用户只看到自己该看的内容，又要保证前后端权限语义一致，避免
              UI 看起来安全但接口实际裸奔。
            </p>
          </div>

          <div class="permission-guide-hero__panel">
            <p class="permission-guide-hero__label">学完结果</p>
            <ul class="permission-guide-list">
              <li>
                能分清登录认证、菜单权限、按钮权限、数据权限和租户权限之间的边界。
              </li>
              <li>
                能设计一套资源编码、路由挂载、权限缓存和数据范围控制方案。
              </li>
              <li>
                能判断什么时候适合 RBAC，什么时候需要 ABAC 或更细的策略模型。
              </li>
            </ul>
          </div>
        </header>

        <section class="permission-guide-grid">
          <article
            v-for="item in quickStages"
            :key="item.order"
            class="permission-guide-card"
          >
            <p class="permission-guide-card__eyebrow">Stage {{ item.order }}</p>
            <h2 class="permission-guide-card__title">{{ item.title }}</h2>
            <p class="permission-guide-card__text">{{ item.summary }}</p>
          </article>
        </section>

        <section class="permission-guide-section">
          <div class="permission-guide-section__head">
            <div>
              <p class="permission-guide-section__eyebrow">Build Order</p>
              <h2 class="permission-guide-section__title">
                权限系统先定资源模型，再处理路由、操作、数据范围和治理
              </h2>
            </div>
          </div>

          <div class="permission-guide-stack">
            <article
              v-for="stage in guideStages"
              :key="stage.order"
              class="permission-guide-panel is-wide"
            >
              <div class="permission-guide-method__head">
                <div>
                  <p class="permission-guide-panel__eyebrow">
                    Stage {{ stage.order }}
                  </p>
                  <h3 class="permission-guide-panel__title">
                    {{ stage.title }}
                  </h3>
                </div>
                <span class="permission-guide-method__tag">{{
                  stage.tag
                }}</span>
              </div>

              <p class="permission-guide-panel__text">
                {{ stage.description }}
              </p>

              <div class="permission-guide-method__grid">
                <section class="permission-guide-mini-panel">
                  <p class="permission-guide-mini-panel__title">适用场景</p>
                  <ul class="permission-guide-list">
                    <li v-for="item in stage.bestFor" :key="item">
                      {{ item }}
                    </li>
                  </ul>
                </section>

                <section class="permission-guide-mini-panel">
                  <p class="permission-guide-mini-panel__title">实现重点</p>
                  <ul class="permission-guide-list">
                    <li v-for="item in stage.focus" :key="item">
                      {{ item }}
                    </li>
                  </ul>
                </section>

                <section class="permission-guide-mini-panel">
                  <p class="permission-guide-mini-panel__title">常见误区</p>
                  <ul class="permission-guide-list">
                    <li v-for="item in stage.risks" :key="item">
                      {{ item }}
                    </li>
                  </ul>
                </section>
              </div>

              <AppCodeBlock
                class="permission-guide-code-block"
                :code="stage.code"
                :lang="stage.language"
              />
            </article>
          </div>
        </section>

        <section class="permission-guide-section">
          <div class="permission-guide-section__head">
            <div>
              <p class="permission-guide-section__eyebrow">Comparison</p>
              <h2 class="permission-guide-section__title">
                做权限系统时最容易搞混的几组概念
              </h2>
            </div>
          </div>

          <div class="permission-guide-columns">
            <article
              v-for="item in comparisonCards"
              :key="item.title"
              class="permission-guide-panel"
            >
              <h3 class="permission-guide-panel__title">{{ item.title }}</h3>
              <p class="permission-guide-panel__text">{{ item.summary }}</p>
            </article>
          </div>
        </section>

        <section class="permission-guide-section">
          <div class="permission-guide-section__head">
            <div>
              <p class="permission-guide-section__eyebrow">Checklist</p>
              <h2 class="permission-guide-section__title">
                一套能落地的前端权限系统工程建设清单
              </h2>
            </div>
          </div>

          <article class="permission-guide-panel is-wide">
            <ul class="permission-guide-list">
              <li>
                先定义资源编码、操作编码和数据范围模型，不要只靠页面路径判断权限。
              </li>
              <li>
                路由、菜单、按钮和接口权限要围绕同一套资源语义设计，避免前后端各说各话。
              </li>
              <li>按钮隐藏只能改善体验，不能代替接口鉴权和数据范围校验。</li>
              <li>
                权限缓存、切租户、切角色和刷新令牌时要有完整的失效与重建机制。
              </li>
              <li>
                复杂多组织场景要尽早评估
                ABAC、组织树和数据域模型，而不是死扛简单角色表。
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
    title: '先定义资源模型',
    summary:
      '权限系统第一步不是写守卫，而是先明确页面、按钮、接口和数据范围怎样抽象成统一资源。',
  },
  {
    order: '02',
    title: '登录和授权分开看',
    summary:
      '认证解决“你是谁”，授权解决“你能做什么”，这两个概念混在一起，系统一定会乱。',
  },
  {
    order: '03',
    title: '菜单权限只是表层',
    summary:
      '真正的权限系统不能只控制菜单显示，还要覆盖按钮操作、接口访问和数据可见范围。',
  },
  {
    order: '04',
    title: '多租户会放大复杂度',
    summary:
      '一旦引入组织、租户、角色继承和数据域，简单的角色判断很快就不够用了。',
  },
  {
    order: '05',
    title: '前后端必须同语义',
    summary:
      '前端只做展示控制不够，后端也必须围绕同一套资源语义进行真实权限校验。',
  },
];

const guideStages = [
  {
    order: '01',
    title: '先把资源、操作、角色和数据范围抽象清楚，别把权限写死在页面里',
    tag: 'Resource Model',
    description:
      '一个可扩展的权限系统，一开始就要明确“什么是资源”。页面、菜单、按钮、接口、字段、组织数据都可能是资源；查看、编辑、删除、审批、导出则是操作。只有资源和操作模型先统一，后面的路由注册、按钮控制、接口拦截和审计日志才有共同语言。',
    bestFor: ['后台管理系统', '多角色平台', '企业业务系统', 'SaaS 应用'],
    focus: [
      '资源编码、操作编码和数据范围编码要统一',
      '角色只是权限组合，不要把业务语义全塞进角色名里',
      '前端展示资源与后端接口资源尽量共用编码体系',
    ],
    risks: [
      '页面名称直接当权限标识，没有稳定资源编码',
      '角色数越来越多，角色名承担了全部业务逻辑',
      '前端按钮一套名字，后端接口另一套名字',
    ],
    language: 'ts',
    code: `type PermissionGrant = {
  resource: string
  actions: string[]
  scope?: 'self' | 'dept' | 'tenant' | 'all'
}`,
  },
  {
    order: '02',
    title: '前端路由、菜单和按钮权限，要从同一份授权数据派生，而不是各写各的',
    tag: 'UI Authorization',
    description:
      '前端最常见的问题，是菜单权限、路由守卫和按钮权限分别各做一套判断。这样一旦授权变复杂，很快就会出现菜单能看、页面进不去，或者页面能进、按钮状态错乱的问题。更稳的方式是把权限授权结果拉平为统一可消费的数据结构，然后分别驱动路由注册、菜单生成和按钮展示。',
    bestFor: ['动态菜单系统', '按钮级权限控制', '基于权限注册路由的应用'],
    focus: [
      '统一权限来源，路由与菜单从同一授权结果派生',
      '按钮权限封装成指令、组件或 hooks，不散落在页面里',
      '切角色或切租户时统一重建前端权限态',
    ],
    risks: [
      '菜单、路由、按钮各维护一份权限逻辑',
      '按钮权限直接硬编码在模板里',
      '切换账号后旧权限缓存未清空，界面状态错乱',
    ],
    language: 'ts',
    code: `type AuthorizedRoute = {
  path: string
  name: string
  requiredPermission?: string
  children?: AuthorizedRoute[]
}`,
  },
  {
    order: '03',
    title: '按钮隐藏只是体验优化，真正的安全边界在接口与数据范围',
    tag: 'Data Permission',
    description:
      '前端权限控制常被误解为“把按钮藏起来就安全了”。实际上，真正的权限边界在后端接口和数据范围。前端最多只能减少误操作和优化体验，不能替代真实鉴权。尤其在报表导出、详情查询、批量审批这类场景，数据权限和资源权限必须一起设计，否则用户虽然看不到入口，仍可能通过请求拿到不该看的数据。',
    bestFor: ['组织树数据权限', '导出权限', '明细查看与审批系统'],
    focus: [
      '接口层和数据层必须有真实权限校验',
      '前端理解数据范围并正确传递筛选上下文',
      '对导出、批量操作和详情页等高风险动作重点治理',
    ],
    risks: [
      '只做前端隐藏，不做接口鉴权',
      '列表权限有限制，详情和导出权限却放开',
      '数据范围逻辑分散在多个页面，难统一治理',
    ],
    language: 'text',
    code: `高风险权限场景
- 导出数据
- 批量审批 / 批量删除
- 跨组织查看明细
- 通过 ID 直接访问详情
- 切租户后继续使用旧数据缓存`,
  },
  {
    order: '04',
    title: '多租户、多组织和复杂角色继承，会把简单 RBAC 迅速推到极限',
    tag: 'RBAC / ABAC',
    description:
      '单一后台系统里，RBAC 往往已经够用；但一旦引入租户、组织树、岗位、标签、数据域、临时授权和跨租户协作，简单的“角色拥有权限”就不够表达真实约束了。这个阶段需要进一步考虑 ABAC、组织属性、资源归属和数据域规则，让权限判定不仅看角色，也看上下文。',
    bestFor: ['SaaS 平台', '多组织协同系统', '复杂数据域权限场景'],
    focus: [
      '先用 RBAC 打基础，再按场景引入属性和上下文',
      '组织、租户、岗位和数据归属要进入权限判定模型',
      '权限命中逻辑要能解释为何当前用户有或没有该权限',
    ],
    risks: [
      '所有复杂权限都硬塞进角色表',
      '组织树规则写成零散补丁逻辑',
      '上下文权限没有调试能力，出问题难排查',
    ],
    language: 'text',
    code: `权限模型演进
- RBAC：用户 -> 角色 -> 权限
- RBAC + Scope：角色 + 数据范围
- ABAC：角色 + 属性 + 上下文 + 资源归属
- 多租户：租户上下文 + 组织树 + 数据域`,
  },
  {
    order: '05',
    title: '权限系统上线后，重点变成缓存失效、审计追踪和变更治理',
    tag: 'Governance',
    description:
      '权限系统不是一次性开发任务，而是长期治理系统。角色变更、岗位变更、租户切换、令牌刷新、权限缓存失效、越权审计、临时授权到期，这些都是上线后每天会发生的问题。工程上必须提供统一的权限刷新、缓存清理、审计追踪和异常回滚能力，否则系统会逐渐出现“用户明明没有权限却还能看”的脏状态。',
    bestFor: ['长期运营后台', '企业权限中台', '安全敏感业务系统'],
    focus: [
      '权限变更后前后端缓存一致刷新',
      '记录资源访问、授权变更和高风险操作审计',
      '支持临时授权、过期回收和异常排查',
    ],
    risks: [
      '权限更新后前端缓存仍沿用旧数据',
      '没有审计日志，越权问题无法回溯',
      '临时授权到期后没有自动回收机制',
    ],
    language: 'text',
    code: `权限治理清单
- 登录时拉取权限快照
- 切角色 / 切租户时重建权限态
- 角色变更后强制刷新或失效缓存
- 高风险资源访问留痕与审计
- 临时授权过期自动回收`,
  },
];

const comparisonCards = [
  {
    title: '认证 vs 授权',
    summary:
      '认证回答“你是谁”，授权回答“你能做什么”。两者混在一起会让登录态和权限态都变得难以维护。',
  },
  {
    title: 'RBAC vs ABAC',
    summary:
      'RBAC 足够简单直观，适合大部分后台；ABAC 更灵活，适合复杂组织、租户和数据域，但建模与治理成本更高。',
  },
  {
    title: '前端展示控制 vs 后端真实校验',
    summary:
      '前端展示控制主要解决体验问题，后端真实校验才是安全边界。两者必须配合，不能相互替代。',
  },
];
</script>

<style scoped>
.permission-guide-page {
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

.permission-guide-page__shell {
  min-height: calc(100vh - 90px);
  border: 1px solid rgba(19, 27, 34, 0.06);
  border-radius: 7px;
  background: rgba(255, 255, 255, 0.82);
}

.permission-guide-page__top {
  display: flex;
  justify-content: flex-start;
  padding: 18px 18px 0;
}

.permission-guide-page__back {
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

.permission-guide-page__back:hover {
  transform: translateY(-1px);
  border-color: rgba(46, 70, 91, 0.18);
  box-shadow: 0 18px 34px rgba(19, 27, 34, 0.08);
}

.permission-guide-page__content {
  padding: 18px 24px 24px;
}

.permission-guide-hero {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 320px;
  gap: 20px;
  padding-bottom: 26px;
  border-bottom: 1px solid rgba(19, 27, 34, 0.08);
}

.permission-guide-hero__eyebrow,
.permission-guide-section__eyebrow,
.permission-guide-card__eyebrow,
.permission-guide-hero__label {
  font-size: 11px;
  line-height: 1.4;
  letter-spacing: 0.24em;
  text-transform: uppercase;
  color: #7b8793;
}

.permission-guide-hero__title {
  margin-top: 10px;
  font-size: 46px;
  line-height: 1.06;
  font-weight: 600;
  letter-spacing: -0.05em;
  color: #17202a;
}

.permission-guide-hero__summary {
  max-width: 860px;
  margin-top: 16px;
  font-size: 15px;
  line-height: 1.9;
  color: #58636f;
}

.permission-guide-hero__panel,
.permission-guide-card,
.permission-guide-panel {
  border: 1px solid rgba(19, 27, 34, 0.08);
  border-radius: 7px;
  background: rgba(255, 255, 255, 0.84);
}

.permission-guide-hero__panel {
  padding: 18px;
}

.permission-guide-list {
  display: grid;
  gap: 8px;
  margin: 12px 0 0;
  padding-left: 18px;
  font-size: 14px;
  line-height: 1.8;
  color: #56616d;
}

.permission-guide-grid,
.permission-guide-columns,
.permission-guide-stack {
  display: grid;
  gap: 16px;
}

.permission-guide-grid {
  margin-top: 28px;
  grid-template-columns: repeat(3, minmax(0, 1fr));
}

.permission-guide-card {
  padding: 18px;
}

.permission-guide-card__title,
.permission-guide-panel__title,
.permission-guide-section__title {
  color: #17202a;
}

.permission-guide-card__title {
  margin-top: 10px;
  font-size: 22px;
  line-height: 1.25;
  font-weight: 600;
}

.permission-guide-card__text,
.permission-guide-panel__text {
  margin-top: 12px;
  font-size: 14px;
  line-height: 1.9;
  color: #596571;
}

.permission-guide-section {
  margin-top: 28px;
}

.permission-guide-section__head {
  margin-bottom: 14px;
}

.permission-guide-section__title {
  margin-top: 8px;
  font-size: 30px;
  line-height: 1.18;
  font-weight: 600;
  letter-spacing: -0.03em;
}

.permission-guide-columns {
  grid-template-columns: repeat(3, minmax(0, 1fr));
}

.permission-guide-stack {
  grid-template-columns: repeat(2, minmax(0, 1fr));
}

.permission-guide-panel {
  padding: 18px;
}

.permission-guide-panel.is-wide {
  grid-column: 1 / -1;
}

.permission-guide-panel__eyebrow {
  font-size: 11px;
  line-height: 1.4;
  letter-spacing: 0.24em;
  text-transform: uppercase;
  color: #80909d;
}

.permission-guide-panel__title {
  font-size: 20px;
  line-height: 1.3;
  font-weight: 600;
}

.permission-guide-method__head {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 16px;
}

.permission-guide-method__tag {
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

.permission-guide-method__grid {
  display: grid;
  gap: 14px;
  margin-top: 16px;
  grid-template-columns: repeat(3, minmax(0, 1fr));
}

.permission-guide-mini-panel {
  padding: 14px;
  border: 1px solid rgba(19, 27, 34, 0.08);
  border-radius: 7px;
  background: rgba(245, 248, 250, 0.9);
}

.permission-guide-mini-panel__title {
  font-size: 14px;
  font-weight: 600;
  color: #17202a;
}

.permission-guide-code-block {
  margin-top: 14px;
}

@media (max-width: 1080px) {
  .permission-guide-hero,
  .permission-guide-grid,
  .permission-guide-columns,
  .permission-guide-stack,
  .permission-guide-method__grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 900px) {
  .permission-guide-page {
    min-height: auto;
    padding: 18px;
  }

  .permission-guide-page__shell {
    min-height: auto;
  }

  .permission-guide-page__content {
    padding: 18px;
  }

  .permission-guide-hero__title {
    font-size: 36px;
  }

  .permission-guide-section__title {
    font-size: 26px;
  }
}
</style>
