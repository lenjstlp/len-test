<template>
  <section class="security-guide-page">
    <div class="security-guide-page__shell">
      <div class="security-guide-page__top">
        <RouterLink
          to="/fullstack-guide"
          class="security-guide-page__back"
          aria-label="返回全栈能力菜单"
          title="返回全栈能力菜单"
        >
          <el-icon :size="18"><ArrowLeft /></el-icon>
        </RouterLink>
      </div>

      <div class="security-guide-page__content">
        <header class="security-guide-hero">
          <div>
            <p class="security-guide-hero__eyebrow">Frontend Security</p>
            <h1 class="security-guide-hero__title">前端安全能力</h1>
            <p class="security-guide-hero__summary">
              这一页按渡一前端常见的讲法来组织：先明确浏览器安全边界，再看 XSS、
              CSRF、鉴权载体、CSP
              和上传下载链路。重点不是背漏洞名词，而是知道“信任边界在哪”“用户输入何时不可信”“前端和服务端各自该兜什么底”。
            </p>
          </div>

          <div class="security-guide-hero__panel">
            <p class="security-guide-hero__label">学完结果</p>
            <ul class="security-guide-list">
              <li>能把 XSS、CSRF、越权和文件链路风险拆成不同防线来设计。</li>
              <li>能判断 Cookie、Token、本地存储和 SameSite 的边界关系。</li>
              <li>
                能把前端安全从“页面写几个判断”升级成“协议、渲染、响应头”三层方案。
              </li>
            </ul>
          </div>
        </header>

        <section class="security-guide-grid">
          <article
            v-for="item in quickStages"
            :key="item.order"
            class="security-guide-card"
          >
            <p class="security-guide-card__eyebrow">Stage {{ item.order }}</p>
            <h2 class="security-guide-card__title">{{ item.title }}</h2>
            <p class="security-guide-card__text">{{ item.summary }}</p>
          </article>
        </section>

        <section class="security-guide-section">
          <div class="security-guide-section__head">
            <div>
              <p class="security-guide-section__eyebrow">Decision Order</p>
              <h2 class="security-guide-section__title">
                前端安全不要背招式，先按信任边界顺序拆问题
              </h2>
            </div>
          </div>

          <div class="security-guide-stack">
            <article
              v-for="stage in guideStages"
              :key="stage.order"
              class="security-guide-panel is-wide"
            >
              <div class="security-guide-method__head">
                <div>
                  <p class="security-guide-panel__eyebrow">
                    Stage {{ stage.order }}
                  </p>
                  <h3 class="security-guide-panel__title">
                    {{ stage.title }}
                  </h3>
                </div>
                <span class="security-guide-method__tag">
                  {{ stage.tag }}
                </span>
              </div>

              <p class="security-guide-panel__text">
                {{ stage.description }}
              </p>

              <div class="security-guide-method__grid">
                <section class="security-guide-mini-panel">
                  <p class="security-guide-mini-panel__title">适用场景</p>
                  <ul class="security-guide-list">
                    <li v-for="item in stage.bestFor" :key="item">
                      {{ item }}
                    </li>
                  </ul>
                </section>

                <section class="security-guide-mini-panel">
                  <p class="security-guide-mini-panel__title">实现重点</p>
                  <ul class="security-guide-list">
                    <li v-for="item in stage.focus" :key="item">
                      {{ item }}
                    </li>
                  </ul>
                </section>

                <section class="security-guide-mini-panel">
                  <p class="security-guide-mini-panel__title">常见误区</p>
                  <ul class="security-guide-list">
                    <li v-for="item in stage.risks" :key="item">
                      {{ item }}
                    </li>
                  </ul>
                </section>
              </div>

              <AppCodeBlock
                class="security-guide-code-block"
                :code="stage.code"
                :lang="stage.language"
              />
            </article>
          </div>
        </section>

        <section class="security-guide-section">
          <div class="security-guide-section__head">
            <div>
              <p class="security-guide-section__eyebrow">Comparison</p>
              <h2 class="security-guide-section__title">
                什么时候靠前端限制，什么时候必须后端兜底
              </h2>
            </div>
          </div>

          <div class="security-guide-columns">
            <article
              v-for="item in comparisonCards"
              :key="item.title"
              class="security-guide-panel"
            >
              <h3 class="security-guide-panel__title">{{ item.title }}</h3>
              <p class="security-guide-panel__text">{{ item.summary }}</p>
            </article>
          </div>
        </section>

        <section class="security-guide-section">
          <div class="security-guide-section__head">
            <div>
              <p class="security-guide-section__eyebrow">Checklist</p>
              <h2 class="security-guide-section__title">
                一套能真正落地的前端安全检查清单
              </h2>
            </div>
          </div>

          <article class="security-guide-panel is-wide">
            <ul class="security-guide-list">
              <li>
                所有用户输入默认不可信，渲染前先决定是转义、过滤还是只作为纯文本展示。
              </li>
              <li>
                涉及登录态的接口，要同时看凭证载体、SameSite、CSRF Token
                和服务端校验。
              </li>
              <li>
                前端能做
                accept、大小、类型限制，但文件内容校验、杀毒和权限绑定必须后端兜底。
              </li>
              <li>
                敏感操作不能只靠按钮显隐，接口侧必须做鉴权和资源归属校验。
              </li>
              <li>
                CSP、X-Frame-Options、Referrer-Policy
                这些响应头，应该纳入正式部署基线。
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
    title: '先确认谁可信',
    summary: '浏览器、用户输入、第三方脚本、接口返回，信任等级并不一样。',
  },
  {
    order: '02',
    title: 'XSS 是前端第一道坎',
    summary: '只要把不可信内容当 HTML 执行，风险就已经出现了。',
  },
  {
    order: '03',
    title: 'CSRF 关注的是登录态被借用',
    summary: '问题不在请求发没发出去，而在浏览器会不会自动带上身份。',
  },
  {
    order: '04',
    title: '鉴权显示和资源权限不是一回事',
    summary: '页面上隐藏按钮不等于接口就安全，真正的权限判断必须落在服务端。',
  },
  {
    order: '05',
    title: '安全是协议加部署基线',
    summary:
      'CSP、SameSite、X-Frame-Options 这些部署项，经常比页面判断更关键。',
  },
];

const guideStages = [
  {
    order: '01',
    title: '先建模：前端安全的本质是信任边界管理',
    tag: '基础认知',
    description:
      '渡一前端讲安全时，通常会先强调一句话：所有进入页面的数据，默认都不可信。无论是用户输入、接口返回、URL 参数，还是第三方脚本注入的数据，只要被你当成代码、HTML 或权限依据使用，就会出问题。安全不是功能补丁，而是“哪些数据能执行、哪些数据只能展示”的边界设计。',
    bestFor: ['前端安全入门', '管理后台', '内容平台', '多角色系统'],
    focus: [
      '把 URL 参数、富文本、接口返回都视为不可信输入',
      '明确哪些场景只能按纯文本展示',
      '把前端安全分成渲染安全、请求安全和权限安全三层',
    ],
    risks: [
      '认为接口返回的数据天然可信',
      '把安全问题理解成只有后端才需要关心',
      '没有信任边界模型，导致后续策略都很碎片',
    ],
    language: 'text',
    code: `Frontend Security Boundaries\n- Untrusted input: form data, query string, rich text, API payload\n- Sensitive actions: payment, delete, export, permission mutation\n- Protected surface: DOM rendering, auth state, upload/download chain\n- Baseline headers: CSP, SameSite, X-Frame-Options, Referrer-Policy`,
  },
  {
    order: '02',
    title: 'XSS 先防渲染：默认转义，少碰 innerHTML 和 v-html',
    tag: '渲染安全',
    description:
      '最常见的前端安全问题还是 XSS。根源很简单：你把本来只该展示的内容，当成可执行内容丢进 DOM。工程里真正稳的做法不是到处打补丁，而是把默认策略设成“纯文本渲染”，只有富文本等少数场景才引入白名单过滤，并且过滤前后都要有明确边界。',
    bestFor: ['评论区', '公告内容', '富文本预览', '管理后台表格展示'],
    focus: [
      '能用文本节点就不要拼 HTML 字符串',
      '富文本展示前使用白名单过滤器',
      '禁止直接信任接口返回的 HTML 片段',
    ],
    risks: [
      '把 v-html 当成普通插值在用',
      '只在输入时过滤，不在展示时过滤',
      '过滤规则过宽，script 去掉了但事件属性仍然残留',
    ],
    language: 'typescript',
    code: `import DOMPurify from 'dompurify'\n\nexport function renderRichText(content: string) {\n  return DOMPurify.sanitize(content, {\n    ALLOWED_TAGS: ['p', 'b', 'strong', 'ul', 'li', 'a', 'code'],\n    ALLOWED_ATTR: ['href', 'target', 'rel'],\n  })\n}\n\nconst safeHtml = renderRichText(apiContent)\n`,
  },
  {
    order: '03',
    title: 'CSRF 要看浏览器会不会自动带身份，不是只看接口地址',
    tag: '请求安全',
    description:
      'CSRF 的核心不是别人能不能访问你的接口地址，而是用户一旦处于登录态，浏览器会不会帮攻击页面自动带上 Cookie。也就是说，只要你的身份凭证是可自动附带的，敏感接口就要额外校验来源或 Token。SameSite 可以降低风险，但真正稳妥的方案通常是 SameSite 加 CSRF Token 加服务端校验。',
    bestFor: ['Cookie 登录态系统', '后台管理', '财务操作', '医疗业务操作'],
    focus: [
      '敏感写操作配 CSRF Token',
      'Cookie 场景配合 SameSite 和 Origin/Referer 校验',
      '区分读接口和写接口的风险级别',
    ],
    risks: [
      '以为开了 CORS 就自然防住 CSRF',
      '只在前端按钮上做二次确认，不做服务端校验',
      '所有接口共享同一套宽松跨站 Cookie 策略',
    ],
    language: 'typescript',
    code: `async function updateProfile(payload: UpdateProfilePayload) {\n  const csrfToken = document\n    .querySelector('meta[name="csrf-token"]')\n    ?.getAttribute('content')\n\n  return fetch('/api/profile', {\n    method: 'POST',\n    credentials: 'include',\n    headers: {\n      'Content-Type': 'application/json',\n      'X-CSRF-Token': csrfToken ?? '',\n    },\n    body: JSON.stringify(payload),\n  })\n}`,
  },
  {
    order: '04',
    title: '鉴权载体要选对：Cookie、Token、本地存储各有边界',
    tag: '身份安全',
    description:
      '很多前端项目把“把 token 存哪”当成唯一安全问题，但真正该看的其实是：身份凭证是否自动发送、是否容易被脚本读取、是否便于服务端统一失效。Cookie 更适合服务端会话和 HttpOnly 防护；显式 Token 更容易做前后端分离，但要承担前端存储与续期设计。重点不是谁绝对安全，而是匹配业务架构。',
    bestFor: ['单页应用', 'BFF 架构', '前后端分离系统', '多端登录体系'],
    focus: [
      '明确凭证是否自动附带',
      '优先让真正敏感凭证避免被 JS 读取',
      '结合刷新机制、过期时间和服务端失效能力设计',
    ],
    risks: [
      '把长期高权限 token 永久塞进 localStorage',
      '前端只判断按钮权限，不校验资源归属',
      '没有刷新机制，导致凭证过期后体验和安全都失控',
    ],
    language: 'typescript',
    code: `type SessionState = {\n  accessToken: string\n  expiresAt: number\n}\n\nexport function shouldRefreshSession(session: SessionState) {\n  const safeWindow = 60 * 1000\n  return Date.now() + safeWindow >= session.expiresAt\n}\n\nexport function buildAuthHeader(token: string) {\n  return {\n    Authorization: \`Bearer \${token}\`,\n  }\n}`,
  },
  {
    order: '05',
    title: '部署基线不能缺：CSP、点击劫持防护、文件链路校验',
    tag: '上线基线',
    description:
      '很多团队把安全理解成页面里的校验，但上线后真正稳定的安全基线，往往来自响应头和服务端协议。CSP 决定页面能加载和执行哪些资源，X-Frame-Options 或 frame-ancestors 用来防点击劫持，上传下载链路则要同时校验文件类型、权限和文件名。只在页面上做 accept 限制，远远不够。',
    bestFor: ['正式生产环境', '医疗系统', '内容管理系统', '文件中心'],
    focus: [
      '为生产环境配置最小可用 CSP',
      '禁用无意义的 iframe 嵌套',
      '下载接口避免直接信任用户传入文件名和路径',
    ],
    risks: [
      'CSP 过宽，script-src 直接放开 unsafe-inline',
      '文件下载接口按 query 里的路径直接读文件',
      '上传只校验后缀，不校验 MIME、内容和业务权限',
    ],
    language: 'nginx',
    code: `add_header Content-Security-Policy "default-src 'self'; img-src 'self' data: https:; style-src 'self' 'unsafe-inline'; script-src 'self'; frame-ancestors 'none'" always;\nadd_header X-Frame-Options "DENY" always;\nadd_header Referrer-Policy "strict-origin-when-cross-origin" always;\nadd_header X-Content-Type-Options "nosniff" always;`,
  },
];

const comparisonCards = [
  {
    title: '前端过滤 vs 服务端过滤',
    summary:
      '前端过滤更多是为了体验和第一层防护，真正兜底仍然必须靠服务端。任何只在前端生效的安全规则，都默认可以被绕过。',
  },
  {
    title: 'Cookie 登录态 vs Bearer Token',
    summary:
      'Cookie 更适合服务端会话和 HttpOnly 管控，但要认真防 CSRF；Bearer Token 更直观，适合前后端分离，但前端存储和续期策略会更敏感。',
  },
  {
    title: '隐藏按钮 vs 接口鉴权',
    summary:
      '隐藏按钮只是在界面上减少误操作，不能算安全策略。真正决定用户能不能操作资源的，永远是接口侧的权限与归属校验。',
  },
];
</script>

<style scoped>
.security-guide-page {
  min-height: calc(100vh - 40px);
  padding: 24px;
  border: 1px solid rgba(19, 27, 34, 0.08);
  border-radius: 7px;
  background:
    radial-gradient(
      circle at top left,
      rgba(222, 230, 236, 0.48),
      transparent 28%
    ),
    linear-gradient(180deg, #fcfdfe 0%, #f3f6f8 100%);
  box-shadow: 0 30px 80px rgba(18, 26, 34, 0.08);
}

.security-guide-page__shell {
  min-height: calc(100vh - 90px);
  border: 1px solid rgba(19, 27, 34, 0.06);
  border-radius: 7px;
  background: rgba(255, 255, 255, 0.82);
}

.security-guide-page__top {
  display: flex;
  justify-content: flex-start;
  padding: 18px 18px 0;
}

.security-guide-page__back {
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

.security-guide-page__back:hover {
  transform: translateY(-1px);
  border-color: rgba(46, 70, 91, 0.18);
  box-shadow: 0 18px 34px rgba(19, 27, 34, 0.08);
}

.security-guide-page__content {
  padding: 18px 24px 24px;
}

.security-guide-hero {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 320px;
  gap: 20px;
  padding-bottom: 26px;
  border-bottom: 1px solid rgba(19, 27, 34, 0.08);
}

.security-guide-hero__eyebrow,
.security-guide-section__eyebrow,
.security-guide-card__eyebrow,
.security-guide-hero__label {
  font-size: 11px;
  line-height: 1.4;
  letter-spacing: 0.24em;
  text-transform: uppercase;
  color: #7b8793;
}

.security-guide-hero__title {
  margin-top: 10px;
  font-size: 46px;
  line-height: 1.06;
  font-weight: 600;
  letter-spacing: -0.05em;
  color: #17202a;
}

.security-guide-hero__summary {
  max-width: 860px;
  margin-top: 16px;
  font-size: 15px;
  line-height: 1.9;
  color: #58636f;
}

.security-guide-hero__panel,
.security-guide-card,
.security-guide-panel {
  border: 1px solid rgba(19, 27, 34, 0.08);
  border-radius: 7px;
  background: rgba(255, 255, 255, 0.84);
}

.security-guide-hero__panel {
  padding: 18px;
}

.security-guide-list {
  display: grid;
  gap: 8px;
  margin: 12px 0 0;
  padding-left: 18px;
  font-size: 14px;
  line-height: 1.8;
  color: #56616d;
}

.security-guide-grid,
.security-guide-columns,
.security-guide-stack {
  display: grid;
  gap: 16px;
}

.security-guide-grid {
  margin-top: 28px;
  grid-template-columns: repeat(3, minmax(0, 1fr));
}

.security-guide-card {
  padding: 18px;
}

.security-guide-card__title,
.security-guide-panel__title,
.security-guide-section__title {
  color: #17202a;
}

.security-guide-card__title {
  margin-top: 10px;
  font-size: 22px;
  line-height: 1.25;
  font-weight: 600;
}

.security-guide-card__text,
.security-guide-panel__text {
  margin-top: 12px;
  font-size: 14px;
  line-height: 1.9;
  color: #596571;
}

.security-guide-section {
  margin-top: 28px;
}

.security-guide-section__head {
  margin-bottom: 14px;
}

.security-guide-section__title {
  margin-top: 8px;
  font-size: 30px;
  line-height: 1.18;
  font-weight: 600;
  letter-spacing: -0.03em;
}

.security-guide-columns {
  grid-template-columns: repeat(3, minmax(0, 1fr));
}

.security-guide-stack {
  grid-template-columns: repeat(2, minmax(0, 1fr));
}

.security-guide-panel {
  padding: 18px;
}

.security-guide-panel.is-wide {
  grid-column: 1 / -1;
}

.security-guide-panel__eyebrow {
  font-size: 11px;
  line-height: 1.4;
  letter-spacing: 0.24em;
  text-transform: uppercase;
  color: #80909d;
}

.security-guide-panel__title {
  font-size: 20px;
  line-height: 1.3;
  font-weight: 600;
}

.security-guide-method__head {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 16px;
}

.security-guide-method__tag {
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

.security-guide-method__grid {
  display: grid;
  gap: 14px;
  margin-top: 16px;
  grid-template-columns: repeat(3, minmax(0, 1fr));
}

.security-guide-mini-panel {
  padding: 14px;
  border: 1px solid rgba(19, 27, 34, 0.08);
  border-radius: 7px;
  background: rgba(245, 248, 250, 0.9);
}

.security-guide-mini-panel__title {
  font-size: 14px;
  font-weight: 600;
  color: #17202a;
}

.security-guide-code-block {
  margin-top: 14px;
}

@media (max-width: 1080px) {
  .security-guide-hero,
  .security-guide-grid,
  .security-guide-columns,
  .security-guide-stack,
  .security-guide-method__grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 900px) {
  .security-guide-page {
    min-height: auto;
    padding: 18px;
  }

  .security-guide-page__shell {
    min-height: auto;
  }

  .security-guide-page__content {
    padding: 18px;
  }

  .security-guide-hero__title {
    font-size: 36px;
  }

  .security-guide-section__title {
    font-size: 26px;
  }
}
</style>
