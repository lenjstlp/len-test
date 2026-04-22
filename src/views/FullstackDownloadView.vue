<template>
  <section class="download-guide-page">
    <div class="download-guide-page__shell">
      <div class="download-guide-page__top">
        <RouterLink
          to="/fullstack-guide"
          class="download-guide-page__back"
          aria-label="返回全栈能力菜单"
          title="返回全栈能力菜单"
        >
          <el-icon :size="18"><ArrowLeft /></el-icon>
        </RouterLink>
      </div>

      <div class="download-guide-page__content">
        <header class="download-guide-hero">
          <div>
            <p class="download-guide-hero__eyebrow">Web Download</p>
            <h1 class="download-guide-hero__title">下载功能</h1>
            <p class="download-guide-hero__summary">
              这一页不按 API
              名字讲，而是按真实开发里的思考顺序来讲。先把下载这件事的本质讲清楚，再讲浏览器直接下载和前端接管下载的区别，然后再落到
              a
              标签、地址跳转、表单、Blob、流式下载这些具体做法。学完之后，你不是背了几个写法，而是真能判断一个下载需求该怎么设计。
            </p>
          </div>

          <div class="download-guide-hero__panel">
            <p class="download-guide-hero__label">学完结果</p>
            <ul class="download-guide-list">
              <li>先分清“浏览器直接下”还是“前端拿到数据后再组织下载”。</li>
              <li>看到鉴权、大文件、导出报表时，能立刻判断方案边界。</li>
              <li>能把下载功能讲出原理、讲出取舍、也能落到代码实现。</li>
            </ul>
          </div>
        </header>

        <section class="download-guide-grid">
          <article
            v-for="method in quickMethods"
            :key="method.order"
            class="download-guide-card"
          >
            <p class="download-guide-card__eyebrow">
              Method {{ method.order }}
            </p>
            <h2 class="download-guide-card__title">{{ method.title }}</h2>
            <p class="download-guide-card__text">{{ method.summary }}</p>
          </article>
        </section>

        <section class="download-guide-section">
          <div class="download-guide-section__head">
            <div>
              <p class="download-guide-section__eyebrow">Decision Order</p>
              <h2 class="download-guide-section__title">
                先问清三个问题，再决定下载方案
              </h2>
            </div>
          </div>

          <div class="download-guide-stack">
            <article
              v-for="method in orderedMethods"
              :key="method.order"
              class="download-guide-panel is-wide"
            >
              <div class="download-guide-method__head">
                <div>
                  <p class="download-guide-panel__eyebrow">
                    Method {{ method.order }}
                  </p>
                  <h3 class="download-guide-panel__title">
                    {{ method.title }}
                  </h3>
                </div>
                <span class="download-guide-method__tag">
                  {{ method.recommendation }}
                </span>
              </div>

              <p class="download-guide-panel__text">{{ method.description }}</p>

              <div class="download-guide-method__grid">
                <section class="download-guide-mini-panel">
                  <p class="download-guide-mini-panel__title">适用场景</p>
                  <ul class="download-guide-list">
                    <li v-for="item in method.bestFor" :key="item">
                      {{ item }}
                    </li>
                  </ul>
                </section>

                <section class="download-guide-mini-panel">
                  <p class="download-guide-mini-panel__title">优点</p>
                  <ul class="download-guide-list">
                    <li v-for="item in method.pros" :key="item">{{ item }}</li>
                  </ul>
                </section>

                <section class="download-guide-mini-panel">
                  <p class="download-guide-mini-panel__title">缺点</p>
                  <ul class="download-guide-list">
                    <li v-for="item in method.cons" :key="item">{{ item }}</li>
                  </ul>
                </section>
              </div>

              <AppCodeBlock
                class="download-guide-code-block"
                :code="method.code"
                :lang="method.language"
              />
            </article>
          </div>
        </section>

        <section class="download-guide-section">
          <div class="download-guide-section__head">
            <div>
              <p class="download-guide-section__eyebrow">Comparison</p>
              <h2 class="download-guide-section__title">
                把下载这件事真正讲透，而不是只记住几个 API
              </h2>
            </div>
          </div>

          <div class="download-guide-columns">
            <article
              v-for="item in comparisonCards"
              :key="item.title"
              class="download-guide-panel"
            >
              <h3 class="download-guide-panel__title">{{ item.title }}</h3>
              <p class="download-guide-panel__text">{{ item.summary }}</p>
            </article>
          </div>
        </section>

        <section class="download-guide-section">
          <div class="download-guide-section__head">
            <div>
              <p class="download-guide-section__eyebrow">Frontend Practice</p>
              <h2 class="download-guide-section__title">
                前端该怎么封装，才像能进项目的代码
              </h2>
            </div>
          </div>

          <div class="download-guide-stack">
            <article class="download-guide-panel is-wide">
              <h3 class="download-guide-panel__title">
                推荐统一封装 Blob / 鉴权下载函数
              </h3>
              <p class="download-guide-panel__text">
                真正能进业务项目的写法，不是到处复制 `fetch + blob +
                a.click()`，而是把请求、鉴权、文件名提取、失败提示、资源释放统一收口。这样你的下载功能才不会越写越散。
              </p>
              <AppCodeBlock
                class="download-guide-code-block"
                :code="frontendDownloadCode"
                lang="typescript"
              />
            </article>

            <article class="download-guide-panel">
              <h3 class="download-guide-panel__title">前端注意事项</h3>
              <ul class="download-guide-list">
                <li>Blob URL 用完就释放，这是典型的细节题，很多人会漏。</li>
                <li>
                  鉴权下载别把 token 拼到 URL 上，优先走 cookie 或受控请求头。
                </li>
                <li>
                  文件名优先信后端响应头，前端传入名字只做兜底，不要本末倒置。
                </li>
                <li>下载失败必须给反馈，不然用户看到的只是“点了没反应”。</li>
              </ul>
            </article>

            <article class="download-guide-panel">
              <h3 class="download-guide-panel__title">什么时候别默认用 Blob</h3>
              <ul class="download-guide-list">
                <li>文件很大时，浏览器整块吃下二进制本身就是风险。</li>
                <li>视频、压缩包、数据库备份更适合后端直接流式返回。</li>
                <li>如果浏览器只是中转站，就说明方案还有继续简化的空间。</li>
              </ul>
            </article>
          </div>
        </section>

        <section class="download-guide-section">
          <div class="download-guide-section__head">
            <div>
              <p class="download-guide-section__eyebrow">Backend Practice</p>
              <h2 class="download-guide-section__title">
                后端才是下载稳定性的上限
              </h2>
            </div>
          </div>

          <div class="download-guide-stack">
            <article class="download-guide-panel is-wide">
              <h3 class="download-guide-panel__title">
                Node / Express 下载接口示例
              </h3>
              <p class="download-guide-panel__text">
                前端最多决定体验，后端才决定这个下载稳不稳。权限校验、文件路径安全、响应头、流式输出、异常中断处理，这些事只要后端没做好，前端界面做再漂亮也没用。
              </p>
              <AppCodeBlock
                class="download-guide-code-block"
                :code="backendDownloadCode"
                lang="typescript"
              />
            </article>

            <article class="download-guide-panel">
              <h3 class="download-guide-panel__title">后端必须做到的事</h3>
              <ul class="download-guide-list">
                <li>权限判断必须落在接口里，不能只靠前端按钮是否显示。</li>
                <li>文件路径必须白名单化，下载接口是路径穿越高发区。</li>
                <li>大文件优先流式返回，不要 `readFile` 后再整块塞给响应。</li>
                <li>文件名要考虑 UTF-8 编码，不然中文名基本迟早出问题。</li>
              </ul>
            </article>

            <article class="download-guide-panel">
              <h3 class="download-guide-panel__title">响应头重点</h3>
              <ul class="download-guide-list">
                <li>`Content-Type`：告诉浏览器文件类型。</li>
                <li>`Content-Disposition: attachment`：强制下载而不是预览。</li>
                <li>`Content-Length`：在可知时返回，有利于进度展示。</li>
                <li>`Cache-Control`：按业务决定是否允许缓存。</li>
              </ul>
            </article>
          </div>
        </section>

        <section class="download-guide-section">
          <div class="download-guide-section__head">
            <div>
              <p class="download-guide-section__eyebrow">Production Notes</p>
              <h2 class="download-guide-section__title">
                课上容易略过，但项目里最容易翻车的点
              </h2>
            </div>
          </div>

          <div class="download-guide-columns">
            <article class="download-guide-panel">
              <h3 class="download-guide-panel__title">文件名乱码</h3>
              <p class="download-guide-panel__text">
                中文文件名不要只写 `filename="xxx"`，更稳妥的是同时提供
                `filename*=` 的 UTF-8 版本。
              </p>
            </article>

            <article class="download-guide-panel">
              <h3 class="download-guide-panel__title">权限绕过</h3>
              <p class="download-guide-panel__text">
                只校验前端按钮显示是不够的。真正的权限必须在下载接口里做，并和文件归属关系绑定。
              </p>
            </article>

            <article class="download-guide-panel">
              <h3 class="download-guide-panel__title">内存打爆</h3>
              <p class="download-guide-panel__text">
                后端 `readFile` 整块读、前端 `blob()`
                吞超大文件，都可能导致内存暴涨。大文件优先流式方案。
              </p>
            </article>
          </div>
        </section>

        <section class="download-guide-section">
          <div class="download-guide-section__head">
            <div>
              <p class="download-guide-section__eyebrow">Checklist</p>
              <h2 class="download-guide-section__title">
                像做题一样判断下载需求
              </h2>
            </div>
          </div>

          <article class="download-guide-panel is-wide">
            <ul class="download-guide-list">
              <li>能用公开链接解决，就不要上来写复杂 Blob 逻辑。</li>
              <li>
                只要涉及 token、cookie、导出任务，优先走 `fetch/axios + Blob`。
              </li>
              <li>文件足够大时，优先后端流式输出，不要整块读到内存。</li>
              <li>表单 POST 下载适合老系统和传统报表，不适合复杂错误处理。</li>
              <li>后端始终要控制权限、响应头、文件名编码和异常中断处理。</li>
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

const frontendDownloadCode = [
  'export async function downloadFile(',
  '  url: string,',
  '  options?: {',
  "    method?: 'GET' | 'POST'",
  '    body?: BodyInit | null',
  '    headers?: Record<string, string>',
  '    fileName?: string',
  '  },',
  ') {',
  '  const response = await fetch(url, {',
  "    method: options?.method ?? 'GET',",
  '    body: options?.body ?? null,',
  '    headers: options?.headers,',
  "    credentials: 'include',",
  '  })',
  '',
  '  if (!response.ok) {',
  "    throw new Error('下载失败: ' + response.status)",
  '  }',
  '',
  "  const disposition = response.headers.get('content-disposition') ?? ''",
  '  const matchedFileName =',
  "    disposition.match(/filename\\*=UTF-8''([^;]+)/)?.[1] ??",
  '    disposition.match(/filename="?([^"]+)"?/)?.[1]',
  '',
  '  const finalFileName = decodeURIComponent(',
  "    matchedFileName ?? options?.fileName ?? 'download',",
  '  )',
  '',
  '  const blob = await response.blob()',
  '  const blobUrl = URL.createObjectURL(blob)',
  "  const anchor = document.createElement('a')",
  '',
  '  anchor.href = blobUrl',
  '  anchor.download = finalFileName',
  "  anchor.style.display = 'none'",
  '',
  '  document.body.appendChild(anchor)',
  '  anchor.click()',
  '  anchor.remove()',
  '  URL.revokeObjectURL(blobUrl)',
  '}',
].join('\n');

const backendDownloadCode = [
  "import fs from 'node:fs'",
  "import path from 'node:path'",
  "import express from 'express'",
  '',
  'const app = express()',
  '',
  "app.get('/api/download/:id', async (req, res) => {",
  '  const user = req.user',
  '  const file = await getFileMeta(req.params.id)',
  '',
  '  if (!user || !file || !canDownload(user, file)) {',
  "    return res.status(403).json({ message: '无权限下载该文件' })",
  '  }',
  '',
  '  const filePath = path.resolve(file.absolutePath)',
  '  const stream = fs.createReadStream(filePath)',
  '',
  "  res.setHeader('Content-Type', file.mimeType || 'application/octet-stream')",
  '  res.setHeader(',
  "    'Content-Disposition',",
  '    "attachment; filename*=UTF-8\'\'" + encodeURIComponent(file.fileName),',
  '  )',
  '',
  "  stream.on('error', () => {",
  '    if (!res.headersSent) {',
  "      res.status(500).json({ message: '文件读取失败' })",
  '    } else {',
  '      res.end()',
  '    }',
  '  })',
  '',
  '  stream.pipe(res)',
  '})',
].join('\n');

const quickMethods = [
  {
    order: '01',
    title: '先看有没有现成 URL',
    summary: '如果后端已经给了稳定地址，浏览器原生下载往往就是最优解。',
  },
  {
    order: '02',
    title: '再看前端是不是只负责“触发”',
    summary: '有些下载前端并不处理文件，只是把用户送到下载地址。',
  },
  {
    order: '03',
    title: '如果是 POST，就看浏览器能不能接管',
    summary: '表单方案本质上是把参数交给浏览器，再由浏览器接收文件流。',
  },
  {
    order: '04',
    title: '要鉴权和错误处理，就让前端接管响应',
    summary: '一旦要拿响应头、处理失败、解析文件名，Blob 才真正有意义。',
  },
  {
    order: '05',
    title: '文件一大，思路就得从 API 切到链路',
    summary: '大文件下载拼的是传输设计，不是会不会写 `blob()`。',
  },
];

const orderedMethods = [
  {
    order: '01',
    title: '第一问：后端有没有直接可用的下载地址',
    recommendation: '先别急着上 JS',
    description:
      '渡一前端那类讲法里很强调一件事：先判断有没有必要让 JavaScript 介入。如果文件就是公开资源，或者后端已经给你一个稳定、能直接访问的 URL，那最好的方案通常不是写一堆下载逻辑，而是让浏览器自己完成下载。',
    bestFor: ['静态资源下载', 'CDN 文件', '不需要鉴权的 PDF、图片、安装包'],
    pros: ['实现成本最低', '浏览器原生行为最稳定', '几乎没有前端维护负担'],
    cons: ['拿不到失败细节', '不适合鉴权资源', '文件名与响应头控制空间有限'],
    language: 'html',
    code: `<a href="/files/report.pdf" download>下载报告</a>`,
  },
  {
    order: '02',
    title: '第二问：前端是不是只负责触发下载，不负责处理文件',
    recommendation: '本质还是地址跳转',
    description:
      '很多人一看到按钮点击就想用 fetch。其实如果下载还是一个普通 GET，前端只是做一个按钮交互，那 `window.open` 或 `location.href` 就够了。你要理解它和 a 标签没有本质区别，只是把“点击链接”换成了“脚本触发跳转”。',
    bestFor: ['按钮触发下载', '携带少量查询参数', '签名 URL 的短时下载'],
    pros: ['和事件交互结合自然', '实现简单', '适合快速完成下载入口'],
    cons: [
      '仍然拿不到接口错误细节',
      '不适合复杂鉴权',
      '部分浏览器受弹窗策略影响',
    ],
    language: 'typescript',
    code: `function handleDownload() {\n  window.location.href = '/api/export?id=123'\n}`,
  },
  {
    order: '03',
    title: '第三问：如果必须 POST，能不能让浏览器自己接住下载',
    recommendation: '传统报表系统常用',
    description:
      '这一步特别能体现思路。不是只有 GET 才能让浏览器接管下载，POST 也可以。只不过方式不是跳地址，而是交一个表单。很多老系统、报表系统就是这么干的，因为后端生成文件后直接把流返回给浏览器就行。',
    bestFor: [
      '传统报表导出',
      '依赖大量 POST 参数的下载',
      '不要求前端展示失败细节',
    ],
    pros: ['支持 POST 提交', '浏览器直接接收文件流', '适配传统后端方案容易'],
    cons: [
      '前端难统一处理失败状态',
      'loading 和交互体验弱',
      '不适合现代精细化反馈',
    ],
    language: 'typescript',
    code: `const form = document.createElement('form')\nform.method = 'POST'\nform.action = '/api/export'\nform.style.display = 'none'\n\ndocument.body.appendChild(form)\nform.submit()\nform.remove()`,
  },
  {
    order: '04',
    title: '第四问：前端是不是必须先拿到响应，再决定怎么下',
    recommendation: '现代业务主力方案',
    description:
      '只要你想控制失败提示、想拿响应头里的文件名、想带 cookie 或 token，下载就不能再完全交给浏览器了。这时前端要先拿到响应，把二进制转成 Blob，再主动制造一个临时下载链接。很多人把 Blob 当成下载的默认答案，其实它只是“需要前端接管响应”时的答案。',
    bestFor: [
      '需要登录态的下载',
      '导出 Excel、PDF 等动态文件',
      '需要统一提示和文件名处理的业务系统',
    ],
    pros: [
      '控制力最强',
      '适合做统一下载工具',
      '能处理鉴权、错误提示和文件名解析',
    ],
    cons: ['文件越大越吃内存', '实现复杂度明显更高', '前后端响应头必须配合好'],
    language: 'typescript',
    code: `const response = await fetch('/api/download/1', {\n  credentials: 'include',\n})\nconst blob = await response.blob()\nconst url = URL.createObjectURL(blob)`,
  },
  {
    order: '05',
    title: '第五问：文件一旦很大，问题就不再是“怎么写下载按钮”',
    recommendation: '大文件必选',
    description:
      '文件一旦大到几十兆、几百兆甚至更大，下载这件事就不能只从前端 API 来思考了。你得开始考虑流式输出、断点续传、Range 请求、对象存储、网关超时这些问题。这个阶段拼的是链路设计，而不是某个前端函数写得漂不漂亮。',
    bestFor: [
      '视频、压缩包、数据库备份',
      '超大体积导出文件',
      '对象存储场景下的生产级下载',
    ],
    pros: [
      '内存压力更小',
      '更适合长时间传输',
      '方便扩展进度、续传、取消等能力',
    ],
    cons: [
      '实现和联调都更复杂',
      '前后端和存储链路都要设计',
      '排障与运维成本更高',
    ],
    language: 'text',
    code: `ReadableStream -> response body -> file stream\nRange request -> chunk download -> resume support`,
  },
];

const comparisonCards = [
  {
    title: '下载不是一个 API，而是一套浏览器处理资源的机制',
    summary:
      '真正要先理解的不是 `download`、`blob()` 这些写法，而是浏览器什么时候会直接下载，什么时候只是打开一个资源，什么时候前端必须先拿到响应再自己组织下载。',
  },
  {
    title: 'Blob 不是高级答案，它只是“前端接管响应”后的自然结果',
    summary:
      '很多人一上来就写 Blob，是因为它看起来最灵活。但只要是公开链接、签名地址、浏览器能直接下的资源，用 Blob 反而是在增加复杂度和内存压力。',
  },
  {
    title: '大文件和小文件不是一个问题，别拿同一套思路硬套',
    summary:
      '小文件重点是交互与易用性，大文件重点是链路与稳定性。前者更多是前端方案选择，后者更多是后端输出、存储策略、传输协议和网关配置。',
  },
];
</script>

<style scoped>
.download-guide-page {
  min-height: calc(100vh - 40px);
  padding: 24px;
  border: 1px solid rgba(19, 27, 34, 0.08);
  border-radius: 7px;
  background:
    radial-gradient(
      circle at top left,
      rgba(227, 233, 238, 0.46),
      transparent 26%
    ),
    linear-gradient(180deg, #fcfdfe 0%, #f4f7f9 100%);
  box-shadow: 0 30px 80px rgba(18, 26, 34, 0.08);
}

.download-guide-page__shell {
  min-height: calc(100vh - 90px);
  border: 1px solid rgba(19, 27, 34, 0.06);
  border-radius: 7px;
  background: rgba(255, 255, 255, 0.8);
}

.download-guide-page__top {
  display: flex;
  justify-content: flex-start;
  padding: 18px 18px 0;
}

.download-guide-page__back {
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

.download-guide-page__back:hover {
  transform: translateY(-1px);
  border-color: rgba(46, 70, 91, 0.18);
  box-shadow: 0 18px 34px rgba(19, 27, 34, 0.08);
}

.download-guide-page__content {
  padding: 18px 24px 24px;
}

.download-guide-hero {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 320px;
  gap: 20px;
  padding-bottom: 26px;
  border-bottom: 1px solid rgba(19, 27, 34, 0.08);
}

.download-guide-hero__eyebrow,
.download-guide-section__eyebrow,
.download-guide-card__eyebrow,
.download-guide-hero__label {
  font-size: 11px;
  line-height: 1.4;
  letter-spacing: 0.24em;
  text-transform: uppercase;
  color: #7b8793;
}

.download-guide-hero__title {
  margin-top: 10px;
  font-size: 46px;
  line-height: 1.06;
  font-weight: 600;
  letter-spacing: -0.05em;
  color: #17202a;
}

.download-guide-hero__summary {
  max-width: 860px;
  margin-top: 16px;
  font-size: 15px;
  line-height: 1.9;
  color: #58636f;
}

.download-guide-hero__panel,
.download-guide-card,
.download-guide-panel {
  border: 1px solid rgba(19, 27, 34, 0.08);
  border-radius: 7px;
  background: rgba(255, 255, 255, 0.82);
}

.download-guide-hero__panel {
  padding: 18px;
}

.download-guide-list {
  margin: 12px 0 0;
  padding-left: 18px;
  display: grid;
  gap: 8px;
  font-size: 14px;
  line-height: 1.8;
  color: #56616d;
}

.download-guide-grid,
.download-guide-columns,
.download-guide-stack {
  display: grid;
  gap: 16px;
}

.download-guide-grid {
  margin-top: 28px;
  grid-template-columns: repeat(3, minmax(0, 1fr));
}

.download-guide-card {
  padding: 18px;
}

.download-guide-card__title,
.download-guide-panel__title,
.download-guide-section__title {
  color: #17202a;
}

.download-guide-card__title {
  margin-top: 10px;
  font-size: 22px;
  line-height: 1.25;
  font-weight: 600;
}

.download-guide-card__text,
.download-guide-panel__text {
  margin-top: 12px;
  font-size: 14px;
  line-height: 1.9;
  color: #596571;
}

.download-guide-section {
  margin-top: 28px;
}

.download-guide-section__head {
  margin-bottom: 14px;
}

.download-guide-section__title {
  margin-top: 8px;
  font-size: 30px;
  line-height: 1.18;
  font-weight: 600;
  letter-spacing: -0.03em;
}

.download-guide-columns {
  grid-template-columns: repeat(3, minmax(0, 1fr));
}

.download-guide-stack {
  grid-template-columns: repeat(2, minmax(0, 1fr));
}

.download-guide-panel {
  padding: 18px;
}

.download-guide-panel.is-wide {
  grid-column: 1 / -1;
}

.download-guide-panel__eyebrow {
  font-size: 11px;
  line-height: 1.4;
  letter-spacing: 0.24em;
  text-transform: uppercase;
  color: #80909d;
}

.download-guide-panel__title {
  font-size: 20px;
  line-height: 1.3;
  font-weight: 600;
}

.download-guide-method__head {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 16px;
}

.download-guide-method__tag {
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

.download-guide-method__grid {
  display: grid;
  gap: 14px;
  margin-top: 16px;
  grid-template-columns: repeat(3, minmax(0, 1fr));
}

.download-guide-mini-panel {
  padding: 14px;
  border: 1px solid rgba(19, 27, 34, 0.08);
  border-radius: 7px;
  background: rgba(245, 248, 250, 0.9);
}

.download-guide-mini-panel__title {
  font-size: 14px;
  font-weight: 600;
  color: #17202a;
}

.download-guide-code-block {
  margin-top: 14px;
}

@media (max-width: 1080px) {
  .download-guide-hero,
  .download-guide-grid,
  .download-guide-columns,
  .download-guide-stack,
  .download-guide-method__grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 900px) {
  .download-guide-page {
    min-height: auto;
    padding: 18px;
  }

  .download-guide-page__shell {
    min-height: auto;
  }

  .download-guide-page__content {
    padding: 18px;
  }

  .download-guide-hero__title {
    font-size: 36px;
  }

  .download-guide-section__title {
    font-size: 26px;
  }
}
</style>
