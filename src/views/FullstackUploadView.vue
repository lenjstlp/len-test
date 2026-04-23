<template>
  <section class="upload-guide-page">
    <div class="upload-guide-page__shell">
      <div class="upload-guide-page__top">
        <RouterLink
          to="/fullstack-guide"
          class="upload-guide-page__back"
          aria-label="返回全栈能力菜单"
          title="返回全栈能力菜单"
        >
          <el-icon :size="18"><ArrowLeft /></el-icon>
        </RouterLink>
      </div>

      <div class="upload-guide-page__content">
        <header class="upload-guide-hero">
          <div>
            <p class="upload-guide-hero__eyebrow">Frontend Upload</p>
            <h1 class="upload-guide-hero__title">前端上传能力</h1>
            <p class="upload-guide-hero__summary">
              这一页按渡一前端常见的讲法来组织：先把浏览器里“文件到底是什么”讲清楚，再去讲
              `input`、`File`、`FormData`、进度、对象存储直传和分片上传。重点不是记几个
              API，而是建立一条真实项目里的上传决策链。
            </p>
          </div>

          <div class="upload-guide-hero__panel">
            <p class="upload-guide-hero__label">学完结果</p>
            <ul class="upload-guide-list">
              <li>能分清普通上传、带进度上传、直传云存储、分片上传的边界。</li>
              <li>能把前端上传功能拆成选文件、校验、预览、传输、回填五步。</li>
              <li>能和后端约定上传协议，而不是把上传功能写成一坨事件代码。</li>
            </ul>
          </div>
        </header>

        <section class="upload-guide-grid">
          <article
            v-for="item in quickStages"
            :key="item.order"
            class="upload-guide-card"
          >
            <p class="upload-guide-card__eyebrow">Stage {{ item.order }}</p>
            <h2 class="upload-guide-card__title">{{ item.title }}</h2>
            <p class="upload-guide-card__text">{{ item.summary }}</p>
          </article>
        </section>

        <section class="upload-guide-section">
          <div class="upload-guide-section__head">
            <div>
              <p class="upload-guide-section__eyebrow">Decision Order</p>
              <h2 class="upload-guide-section__title">
                上传功能不要一上来就谈分片，先按顺序拆问题
              </h2>
            </div>
          </div>

          <div class="upload-guide-stack">
            <article
              v-for="stage in uploadStages"
              :key="stage.order"
              class="upload-guide-panel is-wide"
            >
              <div class="upload-guide-method__head">
                <div>
                  <p class="upload-guide-panel__eyebrow">
                    Stage {{ stage.order }}
                  </p>
                  <h3 class="upload-guide-panel__title">{{ stage.title }}</h3>
                </div>
                <span class="upload-guide-method__tag">{{ stage.tag }}</span>
              </div>

              <p class="upload-guide-panel__text">{{ stage.description }}</p>

              <div class="upload-guide-method__grid">
                <section class="upload-guide-mini-panel">
                  <p class="upload-guide-mini-panel__title">适用场景</p>
                  <ul class="upload-guide-list">
                    <li v-for="item in stage.bestFor" :key="item">
                      {{ item }}
                    </li>
                  </ul>
                </section>

                <section class="upload-guide-mini-panel">
                  <p class="upload-guide-mini-panel__title">实现重点</p>
                  <ul class="upload-guide-list">
                    <li v-for="item in stage.focus" :key="item">
                      {{ item }}
                    </li>
                  </ul>
                </section>

                <section class="upload-guide-mini-panel">
                  <p class="upload-guide-mini-panel__title">常见误区</p>
                  <ul class="upload-guide-list">
                    <li v-for="item in stage.risks" :key="item">
                      {{ item }}
                    </li>
                  </ul>
                </section>
              </div>

              <AppCodeBlock
                class="upload-guide-code-block"
                :code="stage.code"
                :lang="stage.language"
              />
            </article>
          </div>
        </section>

        <section class="upload-guide-section">
          <div class="upload-guide-section__head">
            <div>
              <p class="upload-guide-section__eyebrow">Comparison</p>
              <h2 class="upload-guide-section__title">
                真正有用的不是 API 列表，而是方案之间的取舍
              </h2>
            </div>
          </div>

          <div class="upload-guide-columns">
            <article
              v-for="item in comparisonCards"
              :key="item.title"
              class="upload-guide-panel"
            >
              <h3 class="upload-guide-panel__title">{{ item.title }}</h3>
              <p class="upload-guide-panel__text">{{ item.summary }}</p>
            </article>
          </div>
        </section>

        <section class="upload-guide-section">
          <div class="upload-guide-section__head">
            <div>
              <p class="upload-guide-section__eyebrow">Frontend Practice</p>
              <h2 class="upload-guide-section__title">
                前端上传组件，应该沉淀成哪几个稳定能力
              </h2>
            </div>
          </div>

          <div class="upload-guide-columns">
            <article class="upload-guide-panel">
              <h3 class="upload-guide-panel__title">选择文件</h3>
              <ul class="upload-guide-list">
                <li>统一处理 `accept`、数量限制、拖拽与点击选择入口。</li>
                <li>把 `FileList` 第一时间转成稳定的前端数据模型。</li>
                <li>不要把原生事件对象一路往下传，尽早转为业务对象。</li>
              </ul>
            </article>

            <article class="upload-guide-panel">
              <h3 class="upload-guide-panel__title">上传前处理</h3>
              <ul class="upload-guide-list">
                <li>先做类型、大小、尺寸校验，再决定是否允许进入上传队列。</li>
                <li>图片类需求经常要做预览、裁剪、压缩和水印。</li>
                <li>这一步失败要能明确告诉用户，而不是直接沉默拒绝。</li>
              </ul>
            </article>

            <article class="upload-guide-panel">
              <h3 class="upload-guide-panel__title">传输与回填</h3>
              <ul class="upload-guide-list">
                <li>上传完成后要回填 URL、文件 ID、缩略图和展示状态。</li>
                <li>失败、重试、取消、进度展示都应该属于统一上传状态机。</li>
                <li>别把成功回调写死在页面里，上传能力最好是可复用模块。</li>
              </ul>
            </article>
          </div>
        </section>

        <section class="upload-guide-section">
          <div class="upload-guide-section__head">
            <div>
              <p class="upload-guide-section__eyebrow">Backend Contract</p>
              <h2 class="upload-guide-section__title">
                前后端协作时，上传协议至少要约定清楚这些东西
              </h2>
            </div>
          </div>

          <article class="upload-guide-panel is-wide">
            <ul class="upload-guide-list">
              <li>
                普通上传：字段名、是否多文件、成功返回的文件 URL 和文件 ID。
              </li>
              <li>
                直传对象存储：签名接口返回哪些字段、有效期多久、失败后如何重签。
              </li>
              <li>
                分片上传：切片大小、分片编号、校验方式、合并接口、断点恢复规则。
              </li>
              <li>
                安全约束：允许的
                MIME、文件体积、是否杀毒、是否需要鉴权或业务绑定。
              </li>
            </ul>
          </article>
        </section>

        <section class="upload-guide-section">
          <div class="upload-guide-section__head">
            <div>
              <p class="upload-guide-section__eyebrow">Checklist</p>
              <h2 class="upload-guide-section__title">
                一套能直接拿去做项目的上传判断清单
              </h2>
            </div>
          </div>

          <article class="upload-guide-panel is-wide">
            <ul class="upload-guide-list">
              <li>先判断是普通文件上传，还是对象存储直传、还是大文件分片。</li>
              <li>
                需要进度条时优先考虑 `XMLHttpRequest`，别强行在 `fetch` 上补洞。
              </li>
              <li>
                图片类需求别只盯着上传，通常还要预览、尺寸校验、裁剪和压缩。
              </li>
              <li>
                前端上传完成不等于业务完成，记得把文件结果回填到表单或业务记录。
              </li>
              <li>
                一旦涉及百兆级文件，就别再用单次上传思路硬抗，直接进分片方案。
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
    title: '文件从哪里来',
    summary: '先理解 `input[type=file]`、`File`、`Blob` 这几个浏览器原生对象。',
  },
  {
    order: '02',
    title: '普通上传怎么做',
    summary: '大部分业务先从 `FormData + fetch` 起步，不需要一上来上复杂方案。',
  },
  {
    order: '03',
    title: '预览和校验如何补齐',
    summary: '上传体验的分水岭通常不在传输，而在上传前处理做得够不够完整。',
  },
  {
    order: '04',
    title: '进度条为什么常用 XHR',
    summary: '因为上传进度是 XHR 的成熟能力，这一步别为了新 API 硬拗。',
  },
  {
    order: '05',
    title: '什么时候上直传和分片',
    summary:
      '当文件变大、并发变多、成本敏感时，上传问题就不再只是前端事件处理。',
  },
];

const uploadStages = [
  {
    order: '01',
    title: '先搞清浏览器拿到的到底是什么：File、Blob、FormData',
    tag: '基础认知',
    description:
      '渡一前端讲上传，通常不会跳过浏览器基础。因为只要你不知道 `File` 本质上是带文件元信息的 `Blob`，后面很多 API 会显得像在背。上传的起点不是网络请求，而是浏览器先把用户选中的文件对象交给你。',
    bestFor: [
      '所有上传需求的起点',
      '图片、文档、视频等常规文件',
      '上传组件封装',
    ],
    focus: [
      '从 input change 事件里拿到 File',
      '用 FormData 组织 multipart/form-data 请求体',
      '尽早把原生 File 转成业务层文件对象',
    ],
    risks: [
      '把文件对象直接塞进响应式大对象里导致管理混乱',
      '把上传逻辑写死在页面 click 事件里',
      '不理解字段名和服务端接收字段之间的映射',
    ],
    language: 'typescript',
    code: `async function uploadAvatar(file: File) {\n  const formData = new FormData()\n  formData.append('file', file)\n  formData.append('scene', 'avatar')\n\n  const response = await fetch('/api/upload', {\n    method: 'POST',\n    body: formData,\n    credentials: 'include',\n  })\n\n  if (!response.ok) {\n    throw new Error('上传失败')\n  }\n\n  return response.json()\n}`,
  },
  {
    order: '02',
    title: '上传前处理才是体验分水岭：预览、类型校验、尺寸校验',
    tag: '体验关键',
    description:
      '用户真正感知到“这个上传组件好不好用”，往往不是因为你会发请求，而是因为你能不能在上传前就把明显不合格的文件挡掉，并把预览效果做顺。图片类需求更是经常要带裁剪、压缩、水印这些前处理动作。',
    bestFor: ['头像上传', '图片墙上传', '医疗影像缩略图', '附件上传组件'],
    focus: [
      '先校验大小和 MIME，再进入上传流程',
      '通过 object URL 或 FileReader 生成预览',
      '图片类文件可在上传前读取宽高信息',
    ],
    risks: [
      '只校验扩展名，不校验真实 MIME',
      '预览 URL 不释放造成内存泄漏',
      '失败提示太晚，用户已经等了很久才知道不能传',
    ],
    language: 'typescript',
    code: `function createPreview(file: File) {\n  const isImage = file.type.startsWith('image/')\n  const maxSize = 5 * 1024 * 1024\n\n  if (!isImage) {\n    throw new Error('只允许上传图片')\n  }\n\n  if (file.size > maxSize) {\n    throw new Error('图片不能超过 5MB')\n  }\n\n  const previewUrl = URL.createObjectURL(file)\n\n  return {\n    name: file.name,\n    size: file.size,\n    previewUrl,\n    revoke() {\n      URL.revokeObjectURL(previewUrl)\n    },\n  }\n}`,
  },
  {
    order: '03',
    title: '要进度条就别装酷：上传进度成熟方案仍然是 XHR',
    tag: '工程实战',
    description:
      '很多人学上传时容易卡在一个误区里，觉得 `fetch` 更新就一定更现代。问题是上传进度这件事，浏览器里最成熟的能力仍然在 `XMLHttpRequest.upload.onprogress` 上。你要的是稳定业务能力，不是 API 信仰。',
    bestFor: [
      '需要展示上传进度',
      '多文件队列上传',
      '支持取消与失败重试',
      '后台管理上传组件',
    ],
    focus: [
      '用 xhr.upload.onprogress 计算百分比',
      '把上传状态抽成 idle/uploading/success/error',
      '取消上传时配合 abort 终止请求',
    ],
    risks: [
      '直接把百分比计算散落在组件各处',
      '只做成功态，不做失败和取消态',
      '把 UI 状态和网络状态混在一起，不利于复用',
    ],
    language: 'typescript',
    code: `function uploadWithProgress(file: File, onProgress: (value: number) => void) {\n  return new Promise<{ url: string }>((resolve, reject) => {\n    const xhr = new XMLHttpRequest()\n    const formData = new FormData()\n\n    formData.append('file', file)\n    xhr.open('POST', '/api/upload')\n    xhr.withCredentials = true\n\n    xhr.upload.onprogress = (event) => {\n      if (!event.lengthComputable) {\n        return\n      }\n\n      onProgress(Math.round((event.loaded / event.total) * 100))\n    }\n\n    xhr.onload = () => {\n      if (xhr.status >= 200 && xhr.status < 300) {\n        resolve(JSON.parse(xhr.responseText))\n      } else {\n        reject(new Error('上传失败'))\n      }\n    }\n\n    xhr.onerror = () => reject(new Error('网络异常'))\n    xhr.send(formData)\n  })\n}`,
  },
  {
    order: '04',
    title: '文件一大，或者要省后端流量，就进入直传和分片',
    tag: '进阶方案',
    description:
      '当上传对象变成大文件、高频文件或云存储文件时，前端就不能只盯着一个 `/upload` 接口了。更常见的升级路线是：先让业务后端签名，再由前端直传对象存储；再往上是切片上传、断点续传和最终合并。这时候前端已经在参与一条完整的上传链路设计。',
    bestFor: ['视频上传', '超大附件上传', '对象存储方案', '断点续传'],
    focus: [
      '前端先拿签名或上传凭证',
      '用 file.slice 切片并带 chunkIndex 上传',
      '最后调用合并接口让服务端组装文件',
    ],
    risks: [
      '切片大小不合理，导致请求数过多',
      '没有文件 hash 或 uploadId，断点续传无法恢复',
      '合并接口缺少校验，容易把错误分片拼成脏文件',
    ],
    language: 'typescript',
    code: `async function uploadByChunks(file: File, chunkSize = 5 * 1024 * 1024) {\n  const totalChunks = Math.ceil(file.size / chunkSize)\n  const uploadId = crypto.randomUUID()\n\n  for (let index = 0; index < totalChunks; index += 1) {\n    const start = index * chunkSize\n    const end = Math.min(file.size, start + chunkSize)\n    const chunk = file.slice(start, end)\n    const formData = new FormData()\n\n    formData.append('file', chunk)\n    formData.append('uploadId', uploadId)\n    formData.append('chunkIndex', String(index))\n    formData.append('totalChunks', String(totalChunks))\n\n    await fetch('/api/upload/chunk', {\n      method: 'POST',\n      body: formData,\n      credentials: 'include',\n    })\n  }\n\n  await fetch('/api/upload/merge', {\n    method: 'POST',\n    headers: { 'Content-Type': 'application/json' },\n    credentials: 'include',\n    body: JSON.stringify({ uploadId, fileName: file.name, totalChunks }),\n  })\n}`,
  },
];

const comparisonCards = [
  {
    title: '普通上传 vs 分片上传',
    summary:
      '普通上传适合中小文件，开发最快；分片上传适合大文件和不稳定网络，但前后端协议、状态恢复和合并流程都会复杂很多。',
  },
  {
    title: 'fetch vs XMLHttpRequest',
    summary:
      '普通上传请求用 fetch 完全没问题，但只要你明确需要上传进度，XHR 仍然是更稳的浏览器方案。别为了“统一写 fetch”牺牲业务能力。',
  },
  {
    title: '经过业务后端 vs 直传对象存储',
    summary:
      '经过业务后端实现最直观，但会吃服务端带宽；直传对象存储能减压后端，但需要额外的签名、回调和权限策略设计。',
  },
];
</script>

<style scoped>
.upload-guide-page {
  min-height: calc(100vh - 40px);
  padding: 24px;
  border: 1px solid rgba(19, 27, 34, 0.08);
  border-radius: 7px;
  background:
    radial-gradient(
      circle at top left,
      rgba(223, 231, 237, 0.5),
      transparent 28%
    ),
    linear-gradient(180deg, #fcfdfe 0%, #f3f6f8 100%);
  box-shadow: 0 30px 80px rgba(18, 26, 34, 0.08);
}

.upload-guide-page__shell {
  min-height: calc(100vh - 90px);
  border: 1px solid rgba(19, 27, 34, 0.06);
  border-radius: 7px;
  background: rgba(255, 255, 255, 0.82);
}

.upload-guide-page__top {
  display: flex;
  justify-content: flex-start;
  padding: 18px 18px 0;
}

.upload-guide-page__back {
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

.upload-guide-page__back:hover {
  transform: translateY(-1px);
  border-color: rgba(46, 70, 91, 0.18);
  box-shadow: 0 18px 34px rgba(19, 27, 34, 0.08);
}

.upload-guide-page__content {
  padding: 18px 24px 24px;
}

.upload-guide-hero {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 320px;
  gap: 20px;
  padding-bottom: 26px;
  border-bottom: 1px solid rgba(19, 27, 34, 0.08);
}

.upload-guide-hero__eyebrow,
.upload-guide-section__eyebrow,
.upload-guide-card__eyebrow,
.upload-guide-hero__label {
  font-size: 11px;
  line-height: 1.4;
  letter-spacing: 0.24em;
  text-transform: uppercase;
  color: #7b8793;
}

.upload-guide-hero__title {
  margin-top: 10px;
  font-size: 46px;
  line-height: 1.06;
  font-weight: 600;
  letter-spacing: -0.05em;
  color: #17202a;
}

.upload-guide-hero__summary {
  max-width: 860px;
  margin-top: 16px;
  font-size: 15px;
  line-height: 1.9;
  color: #58636f;
}

.upload-guide-hero__panel,
.upload-guide-card,
.upload-guide-panel {
  border: 1px solid rgba(19, 27, 34, 0.08);
  border-radius: 7px;
  background: rgba(255, 255, 255, 0.84);
}

.upload-guide-hero__panel {
  padding: 18px;
}

.upload-guide-list {
  display: grid;
  gap: 8px;
  margin: 12px 0 0;
  padding-left: 18px;
  font-size: 14px;
  line-height: 1.8;
  color: #56616d;
}

.upload-guide-grid,
.upload-guide-columns,
.upload-guide-stack {
  display: grid;
  gap: 16px;
}

.upload-guide-grid {
  margin-top: 28px;
  grid-template-columns: repeat(3, minmax(0, 1fr));
}

.upload-guide-card {
  padding: 18px;
}

.upload-guide-card__title,
.upload-guide-panel__title,
.upload-guide-section__title {
  color: #17202a;
}

.upload-guide-card__title {
  margin-top: 10px;
  font-size: 22px;
  line-height: 1.25;
  font-weight: 600;
}

.upload-guide-card__text,
.upload-guide-panel__text {
  margin-top: 12px;
  font-size: 14px;
  line-height: 1.9;
  color: #596571;
}

.upload-guide-section {
  margin-top: 28px;
}

.upload-guide-section__head {
  margin-bottom: 14px;
}

.upload-guide-section__title {
  margin-top: 8px;
  font-size: 30px;
  line-height: 1.18;
  font-weight: 600;
  letter-spacing: -0.03em;
}

.upload-guide-columns {
  grid-template-columns: repeat(3, minmax(0, 1fr));
}

.upload-guide-stack {
  grid-template-columns: repeat(2, minmax(0, 1fr));
}

.upload-guide-panel {
  padding: 18px;
}

.upload-guide-panel.is-wide {
  grid-column: 1 / -1;
}

.upload-guide-panel__eyebrow {
  font-size: 11px;
  line-height: 1.4;
  letter-spacing: 0.24em;
  text-transform: uppercase;
  color: #80909d;
}

.upload-guide-panel__title {
  font-size: 20px;
  line-height: 1.3;
  font-weight: 600;
}

.upload-guide-method__head {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 16px;
}

.upload-guide-method__tag {
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

.upload-guide-method__grid {
  display: grid;
  gap: 14px;
  margin-top: 16px;
  grid-template-columns: repeat(3, minmax(0, 1fr));
}

.upload-guide-mini-panel {
  padding: 14px;
  border: 1px solid rgba(19, 27, 34, 0.08);
  border-radius: 7px;
  background: rgba(245, 248, 250, 0.9);
}

.upload-guide-mini-panel__title {
  font-size: 14px;
  font-weight: 600;
  color: #17202a;
}

.upload-guide-code-block {
  margin-top: 14px;
}

@media (max-width: 1080px) {
  .upload-guide-hero,
  .upload-guide-grid,
  .upload-guide-columns,
  .upload-guide-stack,
  .upload-guide-method__grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 900px) {
  .upload-guide-page {
    min-height: auto;
    padding: 18px;
  }

  .upload-guide-page__shell {
    min-height: auto;
  }

  .upload-guide-page__content {
    padding: 18px;
  }

  .upload-guide-hero__title {
    font-size: 36px;
  }

  .upload-guide-section__title {
    font-size: 26px;
  }
}
</style>
