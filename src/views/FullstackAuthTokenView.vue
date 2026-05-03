<template>
  <section class="auth-token-guide-page">
    <div class="auth-token-guide-page__shell">
      <div class="auth-token-guide-page__top">
        <RouterLink
          to="/fullstack-guide"
          class="auth-token-guide-page__back"
          aria-label="返回全栈能力菜单"
          title="返回全栈能力菜单"
        >
          <el-icon :size="18"><ArrowLeft /></el-icon>
        </RouterLink>
      </div>

      <div class="auth-token-guide-page__content">
        <header class="auth-token-guide-hero">
          <div>
            <p class="auth-token-guide-hero__eyebrow">
              Frontend Auth & Token Engineering
            </p>
            <h1 class="auth-token-guide-hero__title">前端认证与令牌工程</h1>
            <p class="auth-token-guide-hero__summary">
              这一页讲的不是“怎么把 token
              存起来”这么简单，而是前端在认证链路里到底该承担什么：登录态管理、令牌刷新、失效处理、跨标签页同步、接口重试、BFF
              协作和安全边界。真正能落地的方案，不是背一个 `localStorage`
              方案，而是能根据业务风险和产品形态做取舍。
            </p>
          </div>

          <div class="auth-token-guide-hero__panel">
            <p class="auth-token-guide-hero__label">学完结果</p>
            <ul class="auth-token-guide-list">
              <li>
                能分清 Cookie、Session、Access Token、Refresh Token 的职责。
              </li>
              <li>能设计前端登录、续期、退出和失效后的完整流程。</li>
              <li>能把安全、体验和工程复杂度放到一张图里做选择。</li>
            </ul>
          </div>
        </header>

        <section class="auth-token-guide-grid">
          <article
            v-for="item in quickStages"
            :key="item.order"
            class="auth-token-guide-card"
          >
            <p class="auth-token-guide-card__eyebrow">Stage {{ item.order }}</p>
            <h2 class="auth-token-guide-card__title">{{ item.title }}</h2>
            <p class="auth-token-guide-card__text">{{ item.summary }}</p>
          </article>
        </section>

        <section class="auth-token-guide-section">
          <div class="auth-token-guide-section__head">
            <div>
              <p class="auth-token-guide-section__eyebrow">Decision Order</p>
              <h2 class="auth-token-guide-section__title">
                认证方案先看风险和边界，再看 token 存哪里
              </h2>
            </div>
          </div>

          <div class="auth-token-guide-stack">
            <article
              v-for="stage in guideStages"
              :key="stage.order"
              class="auth-token-guide-panel is-wide"
            >
              <div class="auth-token-guide-method__head">
                <div>
                  <p class="auth-token-guide-panel__eyebrow">
                    Stage {{ stage.order }}
                  </p>
                  <h3 class="auth-token-guide-panel__title">
                    {{ stage.title }}
                  </h3>
                </div>
                <span class="auth-token-guide-method__tag">{{
                  stage.tag
                }}</span>
              </div>

              <p class="auth-token-guide-panel__text">
                {{ stage.description }}
              </p>

              <div class="auth-token-guide-method__grid">
                <section class="auth-token-guide-mini-panel">
                  <p class="auth-token-guide-mini-panel__title">适用场景</p>
                  <ul class="auth-token-guide-list">
                    <li v-for="item in stage.bestFor" :key="item">
                      {{ item }}
                    </li>
                  </ul>
                </section>

                <section class="auth-token-guide-mini-panel">
                  <p class="auth-token-guide-mini-panel__title">实现重点</p>
                  <ul class="auth-token-guide-list">
                    <li v-for="item in stage.focus" :key="item">
                      {{ item }}
                    </li>
                  </ul>
                </section>

                <section class="auth-token-guide-mini-panel">
                  <p class="auth-token-guide-mini-panel__title">常见误区</p>
                  <ul class="auth-token-guide-list">
                    <li v-for="item in stage.risks" :key="item">
                      {{ item }}
                    </li>
                  </ul>
                </section>
              </div>

              <AppCodeBlock
                class="auth-token-guide-code-block"
                :code="stage.code"
                :lang="stage.language"
              />
            </article>
          </div>
        </section>

        <section class="auth-token-guide-section">
          <div class="auth-token-guide-section__head">
            <div>
              <p class="auth-token-guide-section__eyebrow">Comparison</p>
              <h2 class="auth-token-guide-section__title">
                几种认证存储方式的现实取舍
              </h2>
            </div>
          </div>

          <div class="auth-token-guide-columns">
            <article
              v-for="item in comparisonCards"
              :key="item.title"
              class="auth-token-guide-panel"
            >
              <h3 class="auth-token-guide-panel__title">{{ item.title }}</h3>
              <p class="auth-token-guide-panel__text">{{ item.summary }}</p>
            </article>
          </div>
        </section>

        <section class="auth-token-guide-section">
          <div class="auth-token-guide-section__head">
            <div>
              <p class="auth-token-guide-section__eyebrow">Best Practice</p>
              <h2 class="auth-token-guide-section__title">
                一套更适合真实项目的前端认证骨架
              </h2>
            </div>
          </div>

          <article class="auth-token-guide-panel is-wide">
            <p class="auth-token-guide-panel__text">
              真正能落地的认证工程，重点不是“把 token
              放哪儿”，而是整个链路是否能闭合。登录成功后，前端要知道如何保存状态、何时刷新、接口
              401
              时怎么重试、退出时怎么清理、多个标签页怎么同步。下面这段示例把这些逻辑收束到一个更接近项目的形态里。
            </p>

            <AppCodeBlock
              class="auth-token-guide-code-block"
              :code="authFlowCode"
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
    title: '先理解认证链路',
    summary: '登录、续期、退出、失效处理其实是一条完整流程。',
  },
  {
    order: '02',
    title: '再选存储边界',
    summary: 'Cookie、内存、localStorage 各自有不同的风险和便利性。',
  },
  {
    order: '03',
    title: '接口失败要接管',
    summary: '401 和 token 过期不是异常结尾，而是流程中的正常分支。',
  },
  {
    order: '04',
    title: '多标签页要同步',
    summary: '退出和刷新成功后，要让其它标签页也立刻知道状态变化。',
  },
  {
    order: '05',
    title: '前端只能做协作',
    summary: '真正的信任边界还是在后端和 BFF，前端只负责体验层协调。',
  },
];

const guideStages = [
  {
    order: '01',
    title: '先区分几种认证资料的职责',
    tag: '基础概念',
    description:
      'Cookie、Session、Access Token 和 Refresh Token 不是一回事。Cookie 更像浏览器携带凭据的容器，Session 常用于服务端维护会话，Access Token 用于接口访问，Refresh Token 用于续期。前端做认证工程时，第一件事不是选择“看起来最方便”的存储方式，而是先理解每种资料的生命周期和暴露面。只有把职责划开，后面的安全和体验才有讨论基础。',
    bestFor: ['登录态系统', 'SPA 单页应用', 'BFF 协作场景'],
    focus: [
      '区分访问令牌和刷新令牌',
      '理解浏览器携带凭据与前端读写凭据是两件事',
      '把续期流程和登录流程拆开设计',
    ],
    risks: [
      '把一切都塞进 localStorage',
      '没有区分短期访问和长期续期凭据',
      '忽略退出后其它标签页的残留状态',
    ],
    language: 'ts',
    code: `type AuthState = {
  accessToken: string | null;
  isLoggedIn: boolean;
  refreshAt: number | null;
};`,
  },
  {
    order: '02',
    title: '存储策略要根据风险来选',
    tag: '方案取舍',
    description:
      '如果业务对安全要求高，常见方案会更偏向 HttpOnly Cookie + 服务端会话或受控刷新；如果更重视前端控制和跨域 API 接入，则会考虑 token 配合内存或受控存储。没有绝对正确的方案，只有和业务风险、架构边界、部署形态匹配的方案。关键是别把“能跑”误认为“安全且可维护”。',
    bestFor: ['安全优先系统', 'BFF 架构', '多端统一登录'],
    focus: [
      '存储策略要和风险等级对应',
      '能减少暴露面就尽量减少暴露面',
      '把刷新过程放在受控链路里',
    ],
    risks: [
      '用 localStorage 存所有长期凭据',
      '只看实现方便，不看 XSS 面',
      '跨域、子域和第三方登录链路没设计',
    ],
    language: 'text',
    code: `# 方案取舍
- 高安全：HttpOnly Cookie + 服务端会话
- 前端可控：Access Token 内存保存 + Refresh Token 受控刷新
- 简单 SPA：可读存储 + 更严格的 XSS 防护
`,
  },
  {
    order: '03',
    title: '401、刷新和重试必须做成闭环',
    tag: '工程化',
    description:
      '认证工程最怕的是接口 401 后所有请求一起乱跳。合理做法是：请求失败时统一拦截、只允许单点刷新、刷新成功后重放失败请求、刷新失败则整体退出登录。这样既避免多次刷新，也能把用户体验收住。这个闭环如果没设计好，系统一到 token 过期就会开始抖动。',
    bestFor: ['接口密集型系统', '长时间在线的 Web 应用', '后台管理系统'],
    focus: ['统一拦截 401', '单飞刷新请求避免并发刷新', '刷新成功后重放原请求'],
    risks: [
      '所有请求同时触发刷新',
      '刷新失败后页面还以为登录中',
      '没有统一的退出和重置逻辑',
    ],
    language: 'ts',
    code: `let refreshPromise: Promise<string | null> | null = null;

const refreshAccessToken = async () => {
  if (!refreshPromise) {
    refreshPromise = requestRefreshToken().finally(() => {
      refreshPromise = null;
    });
  }
  return refreshPromise;
};`,
  },
  {
    order: '04',
    title: '多标签页同步是体验分水岭',
    tag: '协同体验',
    description:
      '用户往往不会只开一个标签页，所以退出登录、刷新 token、权限变更都应该尽量同步到其它页面。常见做法包括 BroadcastChannel、storage 事件或者统一的状态桥接。这个环节看起来小，但一旦做得不好，用户会在不同标签页看到互相矛盾的状态，体验非常差。',
    bestFor: ['多标签页使用场景', 'SaaS 控制台', '需要统一登录态的产品'],
    focus: [
      '监听跨标签页状态变化',
      '把退出和失效事件广播出去',
      '让页面 UI 与认证状态保持一致',
    ],
    risks: [
      '一个标签页退出，另一个还在继续操作',
      'token 刷新成功但其它页没同步',
      '状态同步只做一半，最后到处补丁',
    ],
    language: 'ts',
    code: `const channel = new BroadcastChannel('auth-channel');

channel.onmessage = (event) => {
  if (event.data?.type === 'logout') {
    clearAuthState();
  }
};`,
  },
];

const comparisonCards = [
  {
    title: 'localStorage',
    summary:
      '实现简单，但对 XSS 更敏感。适合低风险或受控场景，不适合把它当成默认最佳实践。',
  },
  {
    title: 'HttpOnly Cookie',
    summary:
      '对前端不可读，安全边界更好，但需要配合后端/BFF 设计，跨域和 CSRF 也要一起考虑。',
  },
  {
    title: '内存保存',
    summary:
      '暴露面更小，适合短期 access token，但刷新、刷新页和多标签同步要设计得更细。',
  },
];

const authFlowCode = `type AuthSession = {
  accessToken: string | null;
  refreshToken: string | null;
};

const authSession: AuthSession = {
  accessToken: null,
  refreshToken: null,
};

async function handleRequest(request: () => Promise<Response>) {
  const response = await request();

  if (response.status !== 401) {
    return response;
  }

  const nextToken = await refreshAccessToken();
  if (!nextToken) {
    logout();
    throw new Error('Unauthorized');
  }

  authSession.accessToken = nextToken;
  return request();
}`;
</script>

<style scoped>
.auth-token-guide-page {
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

.auth-token-guide-page__shell {
  min-height: calc(100vh - 88px);
  display: flex;
  flex-direction: column;
}

.auth-token-guide-page__top {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 22px;
}

.auth-token-guide-page__back {
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

.auth-token-guide-page__back:hover {
  transform: translateY(-1px);
  border-color: rgba(43, 72, 101, 0.2);
  box-shadow: 0 18px 36px rgba(17, 24, 39, 0.08);
}

.auth-token-guide-page__content {
  display: flex;
  flex-direction: column;
  gap: 22px;
}

.auth-token-guide-hero,
.auth-token-guide-panel,
.auth-token-guide-card {
  border: 1px solid rgba(19, 27, 34, 0.08);
  border-radius: 7px;
  background: #fff;
  box-shadow: 0 24px 60px rgba(15, 23, 42, 0.05);
}

.auth-token-guide-hero {
  display: grid;
  grid-template-columns: minmax(0, 1.6fr) minmax(260px, 0.8fr);
  gap: 20px;
  padding: 28px;
}

.auth-token-guide-hero__eyebrow,
.auth-token-guide-section__eyebrow,
.auth-token-guide-card__eyebrow,
.auth-token-guide-panel__eyebrow,
.auth-token-guide-hero__label,
.auth-token-guide-method__tag,
.auth-token-guide-mini-panel__title {
  font-size: 11px;
  line-height: 1.4;
  letter-spacing: 0.24em;
  text-transform: uppercase;
  color: #7b8794;
}

.auth-token-guide-hero__title {
  margin-top: 10px;
  font-size: 42px;
  line-height: 1.08;
  font-weight: 600;
  letter-spacing: -0.04em;
  color: #16202a;
}

.auth-token-guide-hero__summary {
  margin-top: 16px;
  max-width: 820px;
  font-size: 15px;
  line-height: 1.9;
  color: #52606d;
}

.auth-token-guide-hero__panel {
  align-self: stretch;
  padding: 22px;
  border: 1px solid rgba(19, 27, 34, 0.08);
  border-radius: 7px;
  background: linear-gradient(180deg, #fbfcfd 0%, #f4f7fa 100%);
}

.auth-token-guide-grid {
  display: grid;
  grid-template-columns: repeat(5, minmax(0, 1fr));
  gap: 16px;
}

.auth-token-guide-card {
  padding: 20px;
}

.auth-token-guide-card__title,
.auth-token-guide-panel__title,
.auth-token-guide-section__title {
  color: #16202a;
}

.auth-token-guide-card__title {
  margin-top: 10px;
  font-size: 20px;
  line-height: 1.35;
  font-weight: 600;
}

.auth-token-guide-card__text,
.auth-token-guide-panel__text,
.auth-token-guide-list {
  font-size: 14px;
  line-height: 1.9;
  color: #52606d;
}

.auth-token-guide-section {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.auth-token-guide-section__title {
  margin-top: 8px;
  font-size: 28px;
  line-height: 1.25;
  font-weight: 600;
  letter-spacing: -0.03em;
}

.auth-token-guide-stack,
.auth-token-guide-columns {
  display: grid;
  gap: 16px;
}

.auth-token-guide-columns {
  grid-template-columns: repeat(3, minmax(0, 1fr));
}

.auth-token-guide-panel {
  padding: 24px;
}

.auth-token-guide-panel.is-wide {
  padding: 26px;
}

.auth-token-guide-method__head {
  display: flex;
  align-items: start;
  justify-content: space-between;
  gap: 16px;
}

.auth-token-guide-method__tag {
  display: inline-flex;
  align-items: center;
  min-height: 32px;
  padding: 0 12px;
  border: 1px solid rgba(19, 27, 34, 0.08);
  border-radius: 999px;
  background: #f5f8fa;
}

.auth-token-guide-panel__text {
  margin-top: 14px;
}

.auth-token-guide-method__grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 14px;
  margin-top: 18px;
}

.auth-token-guide-mini-panel {
  padding: 18px;
  border: 1px solid rgba(19, 27, 34, 0.08);
  border-radius: 7px;
  background: linear-gradient(180deg, #fdfefe 0%, #f7fafc 100%);
}

.auth-token-guide-list {
  margin: 12px 0 0;
  padding-left: 18px;
}

.auth-token-guide-code-block {
  margin-top: 18px;
}

@media (max-width: 1180px) {
  .auth-token-guide-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .auth-token-guide-columns,
  .auth-token-guide-method__grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 900px) {
  .auth-token-guide-hero {
    grid-template-columns: 1fr;
    padding: 22px;
  }

  .auth-token-guide-hero__title {
    font-size: 34px;
  }

  .auth-token-guide-grid {
    grid-template-columns: 1fr;
  }

  .auth-token-guide-panel,
  .auth-token-guide-panel.is-wide,
  .auth-token-guide-card {
    padding: 20px;
  }
}
</style>
