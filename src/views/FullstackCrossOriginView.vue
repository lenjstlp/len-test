<template>
  <section class="cross-origin-guide-page">
    <div class="cross-origin-guide-page__shell">
      <div class="cross-origin-guide-page__top">
        <RouterLink
          to="/fullstack-guide"
          class="cross-origin-guide-page__back"
          aria-label="返回全栈能力菜单"
          title="返回全栈能力菜单"
        >
          <el-icon :size="18"><ArrowLeft /></el-icon>
        </RouterLink>
      </div>

      <div class="cross-origin-guide-page__content">
        <header class="cross-origin-guide-hero">
          <div>
            <p class="cross-origin-guide-hero__eyebrow">Cross Origin</p>
            <h1 class="cross-origin-guide-hero__title">前端跨域能力</h1>
            <p class="cross-origin-guide-hero__summary">
              这一页按渡一前端“跨域方案的抉择”那类公开讲法来组织内容：先把同源策略讲透，再讲开发阶段代理、生产环境
              CORS、Nginx 反向代理，以及 `postMessage`、JSONP
              这些特殊方案。重点不是把跨域当成面试八股，而是学会先判断问题发生在哪一层，再选对方案。
            </p>
          </div>

          <div class="cross-origin-guide-hero__panel">
            <p class="cross-origin-guide-hero__label">学完结果</p>
            <ul class="cross-origin-guide-list">
              <li>能分清跨域限制的是浏览器，不是服务器互相请求。</li>
              <li>能按开发代理、生产 CORS、网关代理三层判断解决方案。</li>
              <li>能说清预检请求、携带凭证和跨窗口通信的实际边界。</li>
            </ul>
          </div>
        </header>

        <section class="cross-origin-guide-grid">
          <article
            v-for="item in quickStages"
            :key="item.order"
            class="cross-origin-guide-card"
          >
            <p class="cross-origin-guide-card__eyebrow">
              Stage {{ item.order }}
            </p>
            <h2 class="cross-origin-guide-card__title">{{ item.title }}</h2>
            <p class="cross-origin-guide-card__text">{{ item.summary }}</p>
          </article>
        </section>

        <section class="cross-origin-guide-section">
          <div class="cross-origin-guide-section__head">
            <div>
              <p class="cross-origin-guide-section__eyebrow">Decision Order</p>
              <h2 class="cross-origin-guide-section__title">
                跨域不是一个技巧题，而是一条分层决策链
              </h2>
            </div>
          </div>

          <div class="cross-origin-guide-stack">
            <article
              v-for="stage in guideStages"
              :key="stage.order"
              class="cross-origin-guide-panel is-wide"
            >
              <div class="cross-origin-guide-method__head">
                <div>
                  <p class="cross-origin-guide-panel__eyebrow">
                    Stage {{ stage.order }}
                  </p>
                  <h3 class="cross-origin-guide-panel__title">
                    {{ stage.title }}
                  </h3>
                </div>
                <span class="cross-origin-guide-method__tag">
                  {{ stage.tag }}
                </span>
              </div>

              <p class="cross-origin-guide-panel__text">
                {{ stage.description }}
              </p>

              <div class="cross-origin-guide-method__grid">
                <section class="cross-origin-guide-mini-panel">
                  <p class="cross-origin-guide-mini-panel__title">适用场景</p>
                  <ul class="cross-origin-guide-list">
                    <li v-for="item in stage.bestFor" :key="item">
                      {{ item }}
                    </li>
                  </ul>
                </section>

                <section class="cross-origin-guide-mini-panel">
                  <p class="cross-origin-guide-mini-panel__title">实现重点</p>
                  <ul class="cross-origin-guide-list">
                    <li v-for="item in stage.focus" :key="item">
                      {{ item }}
                    </li>
                  </ul>
                </section>

                <section class="cross-origin-guide-mini-panel">
                  <p class="cross-origin-guide-mini-panel__title">常见误区</p>
                  <ul class="cross-origin-guide-list">
                    <li v-for="item in stage.risks" :key="item">
                      {{ item }}
                    </li>
                  </ul>
                </section>
              </div>

              <AppCodeBlock
                class="cross-origin-guide-code-block"
                :code="stage.code"
                :lang="stage.language"
              />
            </article>
          </div>
        </section>

        <section class="cross-origin-guide-section">
          <div class="cross-origin-guide-section__head">
            <div>
              <p class="cross-origin-guide-section__eyebrow">Comparison</p>
              <h2 class="cross-origin-guide-section__title">
                什么时候该改前端，什么时候该改服务端或网关
              </h2>
            </div>
          </div>

          <div class="cross-origin-guide-columns">
            <article
              v-for="item in comparisonCards"
              :key="item.title"
              class="cross-origin-guide-panel"
            >
              <h3 class="cross-origin-guide-panel__title">{{ item.title }}</h3>
              <p class="cross-origin-guide-panel__text">{{ item.summary }}</p>
            </article>
          </div>
        </section>

        <section class="cross-origin-guide-section">
          <div class="cross-origin-guide-section__head">
            <div>
              <p class="cross-origin-guide-section__eyebrow">Checklist</p>
              <h2 class="cross-origin-guide-section__title">
                一套够用的跨域排查清单
              </h2>
            </div>
          </div>

          <article class="cross-origin-guide-panel is-wide">
            <ul class="cross-origin-guide-list">
              <li>
                先看是不是浏览器报错，再确认是不是同源策略问题，不要把所有网络失败都叫跨域。
              </li>
              <li>开发环境优先本地代理，别为了本地调试去污染后端正式配置。</li>
              <li>
                生产环境如果前后端分域，优先 CORS
                或网关反向代理，不要靠前端花活硬绕。
              </li>
              <li>
                只要请求带 cookie，就必须同时处理
                `Access-Control-Allow-Credentials` 和明确来源。
              </li>
              <li>
                出现 OPTIONS 预检时，先检查自定义请求头、方法和 content-type
                是否触发了复杂请求。
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
    title: '先搞清谁在拦你',
    summary: '跨域限制的是浏览器端脚本访问，不是服务器之间天然不能通信。',
  },
  {
    order: '02',
    title: '开发环境优先代理',
    summary:
      '本地开发最稳的是 Vite 或 dev server 代理，不要用奇怪插件乱改浏览器。',
  },
  {
    order: '03',
    title: '生产环境优先 CORS',
    summary: '前后端分离且独立部署时，最常规的方案仍然是服务端显式开放 CORS。',
  },
  {
    order: '04',
    title: '网关也能解决跨域',
    summary: '当服务不方便改时，反向代理和统一网关常常比改前端更靠谱。',
  },
  {
    order: '05',
    title: '特殊场景再上特殊方案',
    summary:
      '跨窗口通信用 postMessage，老接口兼容才会考虑 JSONP 一类特殊手段。',
  },
];

const guideStages = [
  {
    order: '01',
    title: '先把同源策略讲明白：跨域到底拦的是什么',
    tag: '基础认知',
    description:
      '渡一前端讲跨域时很强调一个起点：不要把“请求发不出去”和“被浏览器限制读取响应”混为一谈。浏览器里的 JavaScript 受同源策略约束，只要协议、域名、端口任一不同，就不是同源。这个限制主要是为了安全，防止一个站点随便读另一个站点的敏感信息。',
    bestFor: ['跨域入门认知', '排查浏览器报错', '给团队统一概念'],
    focus: [
      '明确协议、域名、端口三要素',
      '区分浏览器限制与服务端通信',
      '先确认问题是不是发生在前端读响应这一层',
    ],
    risks: [
      '把所有请求失败都叫跨域',
      '以为后端接口本身“不能被访问”',
      '忽略了 cookie、iframe、图片标签等行为边界不同',
    ],
    language: 'typescript',
    code: `const currentOrigin = window.location.origin\nconst apiUrl = 'https://api.example.com/user/profile'\n\n// 这类 fetch 在浏览器里可能成功发出请求，\n// 但若服务端未返回允许的 CORS 头，脚本依然读不到响应。\nawait fetch(apiUrl, {\n  credentials: 'include',\n})\n\nconsole.log('当前页面源:', currentOrigin)`,
  },
  {
    order: '02',
    title: '开发环境最优先：本地代理解决联调跨域',
    tag: '开发联调',
    description:
      '对前端开发来说，最常见也最值得优先掌握的方案就是本地代理。因为开发环境里的跨域，本质是浏览器访问本地页面时去请求另一个域。只要把请求先打到本地 dev server，再由 dev server 转发到目标服务，浏览器看到的就还是同源。',
    bestFor: ['本地联调', '前后端分开启动', '测试环境接口联通'],
    focus: [
      '前端请求统一走相对路径',
      'Vite dev server 代理到真实服务',
      '可顺手处理 path rewrite 和 ws 代理',
    ],
    risks: [
      '把测试域名硬编码进业务代码',
      '开发环境靠浏览器插件绕过跨域，团队不可复制',
      '代理配置和线上访问路径不一致，导致上线后全挂',
    ],
    language: 'typescript',
    code: `import { defineConfig } from 'vite'\n\nexport default defineConfig({\n  server: {\n    proxy: {\n      '/api': {\n        target: 'https://api.example.com',\n        changeOrigin: true,\n        rewrite: (path) => path.replace(/^\\/api/, ''),\n      },\n    },\n  },\n})`,
  },
  {
    order: '03',
    title: '生产环境常规解：服务端显式开放 CORS',
    tag: '标准方案',
    description:
      '如果前端和接口服务就是分域部署，那最标准的做法是服务端返回正确的 CORS 响应头。这里最容易出错的不是 `Access-Control-Allow-Origin` 本身，而是很多人忽略了预检请求、凭证模式和允许的请求头，结果看起来“明明配了 CORS 还是不行”。',
    bestFor: ['前后端分离部署', '正式环境跨域访问', '第三方控制台或门户系统'],
    focus: [
      '明确允许的 Origin，而不是无脑写 *',
      '需要 cookie 时同步返回 credentials 相关头',
      '处理 OPTIONS 预检和自定义请求头',
    ],
    risks: [
      '带 credentials 时还用 * 作为 allow-origin',
      '漏配 Access-Control-Allow-Headers',
      '只放行 GET，结果实际接口是 POST 或 PUT',
    ],
    language: 'typescript',
    code: `import express from 'express'\n\nconst app = express()\n\napp.use((req, res, next) => {\n  const origin = req.headers.origin\n  const allowList = ['https://console.example.com']\n\n  if (origin && allowList.includes(origin)) {\n    res.setHeader('Access-Control-Allow-Origin', origin)\n    res.setHeader('Access-Control-Allow-Credentials', 'true')\n    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')\n    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')\n  }\n\n  if (req.method === 'OPTIONS') {\n    return res.status(204).end()\n  }\n\n  next()\n})`,
  },
  {
    order: '04',
    title: '当服务不方便改时：网关 / Nginx 反向代理常常更稳',
    tag: '部署层方案',
    description:
      '很多真实项目里，跨域并不是你能直接改接口代码就解决的。接口可能是遗留系统、第三方服务，或者统一走 API 网关。这种情况下，最务实的做法往往是在反向代理层做路径转发，让浏览器始终访问同域入口。',
    bestFor: ['Nginx 部署', '统一网关入口', '遗留系统整合', '多服务聚合'],
    focus: [
      '浏览器只访问前台同域地址',
      '由网关转发到内部真实服务',
      '统一鉴权、日志与限流策略',
    ],
    risks: [
      '前台和网关路径规划混乱',
      '代理层没带上真实 Host 或鉴权头',
      '排查问题时只盯浏览器，不看网关日志',
    ],
    language: 'nginx',
    code: `server {\n  listen 80;\n  server_name console.example.com;\n\n  location /api/ {\n    proxy_pass https://api.example.com/;\n    proxy_set_header Host api.example.com;\n    proxy_set_header X-Real-IP $remote_addr;\n    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;\n  }\n}`,
  },
  {
    order: '05',
    title: '特殊场景的特殊方案：postMessage、JSONP、iframe',
    tag: '特殊边界',
    description:
      '这一层不该当默认方案。跨窗口通信的正确工具是 `postMessage`；历史遗留 GET 接口偶尔会用 JSONP；而 iframe 更多是嵌入与窗口协同问题，不是现代接口跨域的主流答案。把这些方案的边界分清，面试和项目里都更不容易乱答。',
    bestFor: [
      '多窗口或嵌入页通信',
      '历史 JSONP 接口兼容',
      '微前端或宿主页面协同',
    ],
    focus: [
      'postMessage 需校验来源 origin',
      'JSONP 只适合 GET，且依赖 script 注入',
      'iframe 更多处理页面通信，不处理通用接口协议',
    ],
    risks: [
      '把 postMessage 当成接口跨域的通用方案',
      '不校验消息来源导致安全风险',
      '在现代业务里继续滥用 JSONP',
    ],
    language: 'typescript',
    code: `window.addEventListener('message', (event) => {\n  if (event.origin !== 'https://portal.example.com') {\n    return\n  }\n\n  console.log('收到父页面消息:', event.data)\n})\n\nwindow.parent.postMessage(\n  { type: 'EMBED_READY', payload: { app: 'console' } },\n  'https://portal.example.com',\n)`,
  },
];

const comparisonCards = [
  {
    title: '开发代理 vs 生产 CORS',
    summary:
      '开发代理解决的是联调效率问题，适合本地开发；生产 CORS 解决的是正式部署后的浏览器访问授权问题，两者根本不是互斥关系，而是分属不同阶段。',
  },
  {
    title: 'CORS vs 反向代理',
    summary:
      '如果你能改服务端，CORS 更直接；如果你有统一网关或遗留服务不方便改，反向代理通常更稳，也更利于统一治理。',
  },
  {
    title: '常规接口跨域 vs 页面通信跨域',
    summary:
      '接口调用跨域优先 CORS / 代理；页面之间通信才考虑 postMessage。把这两类问题混为一谈，往往就是跨域方案选错的源头。',
  },
];
</script>

<style scoped>
.cross-origin-guide-page {
  min-height: calc(100vh - 40px);
  padding: 24px;
  border: 1px solid rgba(19, 27, 34, 0.08);
  border-radius: 7px;
  background:
    radial-gradient(
      circle at top left,
      rgba(222, 229, 235, 0.5),
      transparent 28%
    ),
    linear-gradient(180deg, #fcfdfe 0%, #f4f7f9 100%);
  box-shadow: 0 30px 80px rgba(18, 26, 34, 0.08);
}

.cross-origin-guide-page__shell {
  min-height: calc(100vh - 90px);
  border: 1px solid rgba(19, 27, 34, 0.06);
  border-radius: 7px;
  background: rgba(255, 255, 255, 0.82);
}

.cross-origin-guide-page__top {
  display: flex;
  justify-content: flex-start;
  padding: 18px 18px 0;
}

.cross-origin-guide-page__back {
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

.cross-origin-guide-page__back:hover {
  transform: translateY(-1px);
  border-color: rgba(46, 70, 91, 0.18);
  box-shadow: 0 18px 34px rgba(19, 27, 34, 0.08);
}

.cross-origin-guide-page__content {
  padding: 18px 24px 24px;
}

.cross-origin-guide-hero {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 320px;
  gap: 20px;
  padding-bottom: 26px;
  border-bottom: 1px solid rgba(19, 27, 34, 0.08);
}

.cross-origin-guide-hero__eyebrow,
.cross-origin-guide-section__eyebrow,
.cross-origin-guide-card__eyebrow,
.cross-origin-guide-hero__label {
  font-size: 11px;
  line-height: 1.4;
  letter-spacing: 0.24em;
  text-transform: uppercase;
  color: #7b8793;
}

.cross-origin-guide-hero__title {
  margin-top: 10px;
  font-size: 46px;
  line-height: 1.06;
  font-weight: 600;
  letter-spacing: -0.05em;
  color: #17202a;
}

.cross-origin-guide-hero__summary {
  max-width: 860px;
  margin-top: 16px;
  font-size: 15px;
  line-height: 1.9;
  color: #58636f;
}

.cross-origin-guide-hero__panel,
.cross-origin-guide-card,
.cross-origin-guide-panel {
  border: 1px solid rgba(19, 27, 34, 0.08);
  border-radius: 7px;
  background: rgba(255, 255, 255, 0.84);
}

.cross-origin-guide-hero__panel {
  padding: 18px;
}

.cross-origin-guide-list {
  display: grid;
  gap: 8px;
  margin: 12px 0 0;
  padding-left: 18px;
  font-size: 14px;
  line-height: 1.8;
  color: #56616d;
}

.cross-origin-guide-grid,
.cross-origin-guide-columns,
.cross-origin-guide-stack {
  display: grid;
  gap: 16px;
}

.cross-origin-guide-grid {
  margin-top: 28px;
  grid-template-columns: repeat(3, minmax(0, 1fr));
}

.cross-origin-guide-card {
  padding: 18px;
}

.cross-origin-guide-card__title,
.cross-origin-guide-panel__title,
.cross-origin-guide-section__title {
  color: #17202a;
}

.cross-origin-guide-card__title {
  margin-top: 10px;
  font-size: 22px;
  line-height: 1.25;
  font-weight: 600;
}

.cross-origin-guide-card__text,
.cross-origin-guide-panel__text {
  margin-top: 12px;
  font-size: 14px;
  line-height: 1.9;
  color: #596571;
}

.cross-origin-guide-section {
  margin-top: 28px;
}

.cross-origin-guide-section__head {
  margin-bottom: 14px;
}

.cross-origin-guide-section__title {
  margin-top: 8px;
  font-size: 30px;
  line-height: 1.18;
  font-weight: 600;
  letter-spacing: -0.03em;
}

.cross-origin-guide-columns {
  grid-template-columns: repeat(3, minmax(0, 1fr));
}

.cross-origin-guide-stack {
  grid-template-columns: repeat(2, minmax(0, 1fr));
}

.cross-origin-guide-panel {
  padding: 18px;
}

.cross-origin-guide-panel.is-wide {
  grid-column: 1 / -1;
}

.cross-origin-guide-panel__eyebrow {
  font-size: 11px;
  line-height: 1.4;
  letter-spacing: 0.24em;
  text-transform: uppercase;
  color: #80909d;
}

.cross-origin-guide-panel__title {
  font-size: 20px;
  line-height: 1.3;
  font-weight: 600;
}

.cross-origin-guide-method__head {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 16px;
}

.cross-origin-guide-method__tag {
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

.cross-origin-guide-method__grid {
  display: grid;
  gap: 14px;
  margin-top: 16px;
  grid-template-columns: repeat(3, minmax(0, 1fr));
}

.cross-origin-guide-mini-panel {
  padding: 14px;
  border: 1px solid rgba(19, 27, 34, 0.08);
  border-radius: 7px;
  background: rgba(245, 248, 250, 0.9);
}

.cross-origin-guide-mini-panel__title {
  font-size: 14px;
  font-weight: 600;
  color: #17202a;
}

.cross-origin-guide-code-block {
  margin-top: 14px;
}

@media (max-width: 1080px) {
  .cross-origin-guide-hero,
  .cross-origin-guide-grid,
  .cross-origin-guide-columns,
  .cross-origin-guide-stack,
  .cross-origin-guide-method__grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 900px) {
  .cross-origin-guide-page {
    min-height: auto;
    padding: 18px;
  }

  .cross-origin-guide-page__shell {
    min-height: auto;
  }

  .cross-origin-guide-page__content {
    padding: 18px;
  }

  .cross-origin-guide-hero__title {
    font-size: 36px;
  }

  .cross-origin-guide-section__title {
    font-size: 26px;
  }
}
</style>
