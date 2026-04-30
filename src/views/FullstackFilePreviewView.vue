<template>
  <section class="file-preview-guide-page">
    <div class="file-preview-guide-page__shell">
      <div class="file-preview-guide-page__top">
        <RouterLink
          to="/fullstack-guide"
          class="file-preview-guide-page__back"
          aria-label="返回全栈能力菜单"
          title="返回全栈能力菜单"
        >
          <el-icon :size="18"><ArrowLeft /></el-icon>
        </RouterLink>
      </div>

      <div class="file-preview-guide-page__content">
        <header class="file-preview-guide-hero">
          <div>
            <p class="file-preview-guide-hero__eyebrow">
              Frontend File Preview Engineering
            </p>
            <h1 class="file-preview-guide-hero__title">前端文件预览工程能力</h1>
            <p class="file-preview-guide-hero__summary">
              文件预览不是简单把 PDF
              丢给浏览器打开。真正的工程问题是：图片、PDF、Office、音视频、压缩包、文本和医疗文档等多种格式如何统一接入，怎样处理鉴权、转码、分页预览、失败降级、敏感信息控制和跨端一致体验。没有工程化方案，预览功能很快就会变成一堆临时判断。
            </p>
          </div>

          <div class="file-preview-guide-hero__panel">
            <p class="file-preview-guide-hero__label">学完结果</p>
            <ul class="file-preview-guide-list">
              <li>能搭建统一的文件预览接入层、格式判断和降级链路。</li>
              <li>
                能处理 PDF、图片、Office、文本和音视频等常见文件预览场景。
              </li>
              <li>能把鉴权、水印、下载控制、转码失败和异常态纳入统一治理。</li>
            </ul>
          </div>
        </header>

        <section class="file-preview-guide-grid">
          <article
            v-for="item in quickStages"
            :key="item.order"
            class="file-preview-guide-card"
          >
            <p class="file-preview-guide-card__eyebrow">
              Stage {{ item.order }}
            </p>
            <h2 class="file-preview-guide-card__title">{{ item.title }}</h2>
            <p class="file-preview-guide-card__text">{{ item.summary }}</p>
          </article>
        </section>

        <section class="file-preview-guide-section">
          <div class="file-preview-guide-section__head">
            <div>
              <p class="file-preview-guide-section__eyebrow">Build Order</p>
              <h2 class="file-preview-guide-section__title">
                先统一文件能力模型，再接格式渲染、转码和安全治理
              </h2>
            </div>
          </div>

          <div class="file-preview-guide-stack">
            <article
              v-for="stage in guideStages"
              :key="stage.order"
              class="file-preview-guide-panel is-wide"
            >
              <div class="file-preview-guide-method__head">
                <div>
                  <p class="file-preview-guide-panel__eyebrow">
                    Stage {{ stage.order }}
                  </p>
                  <h3 class="file-preview-guide-panel__title">
                    {{ stage.title }}
                  </h3>
                </div>
                <span class="file-preview-guide-method__tag">{{
                  stage.tag
                }}</span>
              </div>

              <p class="file-preview-guide-panel__text">
                {{ stage.description }}
              </p>

              <div class="file-preview-guide-method__grid">
                <section class="file-preview-guide-mini-panel">
                  <p class="file-preview-guide-mini-panel__title">适用场景</p>
                  <ul class="file-preview-guide-list">
                    <li v-for="item in stage.bestFor" :key="item">
                      {{ item }}
                    </li>
                  </ul>
                </section>

                <section class="file-preview-guide-mini-panel">
                  <p class="file-preview-guide-mini-panel__title">实现重点</p>
                  <ul class="file-preview-guide-list">
                    <li v-for="item in stage.focus" :key="item">
                      {{ item }}
                    </li>
                  </ul>
                </section>

                <section class="file-preview-guide-mini-panel">
                  <p class="file-preview-guide-mini-panel__title">常见误区</p>
                  <ul class="file-preview-guide-list">
                    <li v-for="item in stage.risks" :key="item">
                      {{ item }}
                    </li>
                  </ul>
                </section>
              </div>

              <AppCodeBlock
                class="file-preview-guide-code-block"
                :code="stage.code"
                :lang="stage.language"
              />
            </article>
          </div>
        </section>

        <section class="file-preview-guide-section">
          <div class="file-preview-guide-section__head">
            <div>
              <p class="file-preview-guide-section__eyebrow">Comparison</p>
              <h2 class="file-preview-guide-section__title">
                文件预览工程里最容易混淆的几组问题
              </h2>
            </div>
          </div>

          <div class="file-preview-guide-columns">
            <article
              v-for="item in comparisonCards"
              :key="item.title"
              class="file-preview-guide-panel"
            >
              <h3 class="file-preview-guide-panel__title">{{ item.title }}</h3>
              <p class="file-preview-guide-panel__text">{{ item.summary }}</p>
            </article>
          </div>
        </section>

        <section class="file-preview-guide-section">
          <div class="file-preview-guide-section__head">
            <div>
              <p class="file-preview-guide-section__eyebrow">Checklist</p>
              <h2 class="file-preview-guide-section__title">
                一套能落地的前端文件预览工程建设清单
              </h2>
            </div>
          </div>

          <article class="file-preview-guide-panel is-wide">
            <ul class="file-preview-guide-list">
              <li>
                先统一文件元数据、预览能力、鉴权参数和降级策略，再接入具体渲染器。
              </li>
              <li>
                不同格式的预览器要支持插件化接入，避免预览入口里到处写 if/else。
              </li>
              <li>
                PDF、Office、图片、视频等格式要明确原生预览、转码预览和下载兜底边界。
              </li>
              <li>水印、权限控制、过期链接和敏感内容提示必须纳入统一治理。</li>
              <li>
                失败态要区分格式不支持、转码中、转码失败、权限不足和网络异常。
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
    title: '先统一文件模型',
    summary:
      '文件名、后缀、mime、大小、权限、预览地址和下载地址必须先规范，不然很难做统一接入。',
  },
  {
    order: '02',
    title: '预览链路分层',
    summary:
      '原生可预览、转码后预览、第三方文档服务和纯下载兜底要分层设计，不能混在一起判断。',
  },
  {
    order: '03',
    title: '不同格式插件化',
    summary:
      'PDF、图片、Office、文本、音视频的渲染方式不同，应该通过适配器注册，而不是页面里硬编码。',
  },
  {
    order: '04',
    title: '异常态要可感知',
    summary:
      '转码中、预览失败、权限不足、链接失效、格式不支持都应该给用户明确反馈，而不是统一白屏。',
  },
  {
    order: '05',
    title: '安全控制不能后补',
    summary:
      '水印、下载控制、审计日志和敏感信息提示要从一开始就纳入设计，不是上线后再临时打补丁。',
  },
];

const guideStages = [
  {
    order: '01',
    title: '建立统一文件预览能力模型',
    tag: 'Capability First',
    description:
      '文件预览第一步不是挑 PDF 库，而是先定义文件元数据和能力描述。至少要明确 mime、扩展名、是否支持原生预览、是否需要转码、是否允许下载、是否带水印、是否需要签名地址。能力模型一旦统一，前端就可以稳定决定走哪条预览链路。',
    bestFor: [
      '有图片、PDF、Office、文本、视频等多格式文件的系统',
      '医疗、政企、文档平台等对预览能力要求较高的业务',
      '需要支持私有存储和鉴权下载的后台系统',
    ],
    focus: [
      '把文件基础元数据和预览能力拆开建模',
      '让前端只消费 previewType、previewUrl、downloadable 等标准字段',
      '对签名链接、过期时间和权限级别做统一约定',
    ],
    risks: [
      '直接从文件后缀猜能力，遇到错误扩展名就会误判',
      '每个接口返回一套不同字段，前端适配成本持续上升',
      '能力模型没有包含安全控制，后续补水印和禁下载很痛苦',
    ],
    language: 'ts',
    code: `type PreviewType =
  | 'image'
  | 'pdf'
  | 'office'
  | 'text'
  | 'video'
  | 'audio'
  | 'unsupported';

interface FilePreviewMeta {
  id: string;
  name: string;
  mime: string;
  extension: string;
  size: number;
  previewType: PreviewType;
  previewUrl?: string;
  downloadUrl?: string;
  allowDownload: boolean;
  requireWatermark: boolean;
  needTranscode: boolean;
}`,
  },
  {
    order: '02',
    title: '把格式渲染器做成插件注册',
    tag: 'Adapter',
    description:
      '格式渲染一定要走适配器思路。页面只负责拿到文件能力并渲染对应预览组件，而不是自己判断每一种格式。这样后续新增 CAD、DICOM、Markdown 或 OFD 时，只需要加一个 preview adapter，不会冲击既有页面逻辑。',
    bestFor: [
      '文件格式会持续增加或替换渲染方案的项目',
      '一个系统里有多个文件预览入口的业务',
      '需要逐步替换第三方文档服务的团队',
    ],
    focus: [
      '维护 previewType 到 component 的注册表',
      '适配器统一接收 file meta、鉴权信息和容器参数',
      '保留 unsupported fallback 和 loading shell',
    ],
    risks: [
      '所有格式判断堆在一个页面组件里，代码会迅速不可维护',
      '新增格式时必须改核心入口，回归范围被放大',
      '没有默认兜底渲染，遇到不支持格式直接崩页面',
    ],
    language: 'ts',
    code: `const previewRegistry: Record<PreviewType, string> = {
  image: 'ImagePreviewer',
  pdf: 'PdfPreviewer',
  office: 'OfficePreviewer',
  text: 'TextPreviewer',
  video: 'VideoPreviewer',
  audio: 'AudioPreviewer',
  unsupported: 'UnsupportedPreviewer',
};

const resolvePreviewComponent = (file: FilePreviewMeta) => {
  return previewRegistry[file.previewType] ?? previewRegistry.unsupported;
};`,
  },
  {
    order: '03',
    title: '设计原生预览、转码预览和下载兜底链路',
    tag: 'Fallback Chain',
    description:
      '不是所有文件都适合直接用原始地址预览。PDF、图片、文本通常可以原生处理，Office、OFD、某些私有格式可能要先转码成 HTML 或 PDF 才能稳定展示。正确的做法是明确主链路和降级链路，而不是失败后再临时弹一个“请下载查看”。',
    bestFor: [
      '需要同时支持浏览器原生预览和后端转码服务的系统',
      '文档类业务希望在浏览器内完成大部分查看行为',
      '有多终端、多浏览器兼容要求的项目',
    ],
    focus: [
      '优先走最轻链路，失败时自动切到转码或下载兜底',
      '转码中状态要支持轮询和重试',
      '失败原因要结构化，便于前端做精确反馈',
    ],
    risks: [
      '把所有格式都先转码，资源成本和等待时间都会被拉高',
      '没有转码状态查询，用户只会看到长时间空白',
      '原生预览失败后不兜底，功能看起来像随机可用',
    ],
    language: 'ts',
    code: `const getPreviewStrategy = (file: FilePreviewMeta) => {
  if (!file.previewUrl && !file.downloadUrl) return 'unavailable';
  if (!file.needTranscode && file.previewUrl) return 'direct-preview';
  if (file.needTranscode && file.previewUrl) return 'transcoded-preview';
  if (file.downloadUrl) return 'download-only';
  return 'unavailable';
};`,
  },
  {
    order: '04',
    title: '把水印、鉴权和下载控制纳入统一治理',
    tag: 'Security',
    description:
      '文件预览往往伴随敏感数据，尤其是医疗、合同、财务、设计图等内容。这里不能只顾体验。你要从链接签名、短时授权、水印叠加、审计埋点和下载控制几个维度一起考虑，避免“能预览就等于能无限传播”。',
    bestFor: [
      '包含患者资料、合同、财务凭证等敏感文件的系统',
      '需要限制导出、下载和外链传播的企业产品',
      '要求对预览行为做审计留痕的场景',
    ],
    focus: [
      '预览地址使用短时签名并在前端自动续签',
      '下载按钮展示要受权限和文件安全级别控制',
      '高敏文件预览时加水印并记录访问行为',
    ],
    risks: [
      '把永久直链暴露给前端，文件泄露成本极低',
      '只有前端隐藏下载按钮，后端并未做真实校验',
      '水印是前端静态文本，缺少用户和时间上下文，追责价值不高',
    ],
    language: 'ts',
    code: `const canDownloadFile = (file: FilePreviewMeta, permissions: Set<string>) => {
  if (!file.allowDownload) return false;
  return permissions.has('file:download');
};

const buildPreviewHeaders = (token: string) => ({
  Authorization: \`Bearer \${token}\`,
  'X-Preview-Scene': 'detail',
});`,
  },
  {
    order: '05',
    title: '把预览状态和页面交互打通',
    tag: 'UX Integrated',
    description:
      '文件预览不是孤立页面。它通常与上传记录、审批详情、病历文档、附件列表和下载中心联动。工程化收尾要把加载态、转码进度、翻页、缩放、全屏、重试和下载动作统一到一个稳定的交互框架里。',
    bestFor: [
      '附件列表、详情抽屉和独立预览页并存的业务',
      '需要支持预览历史、最近查看和多文件切换的系统',
      '有复杂文件操作闭环的后台产品',
    ],
    focus: [
      '预览页支持上一份、下一份切换和上下文返回',
      '分页、缩放、重试、全屏等动作统一抽象',
      '加载、失败、转码中和无权限都要有明确页面反馈',
    ],
    risks: [
      '每种文件预览器自己维护一套交互，用户体验不一致',
      '切换文件时上下文断裂，用户要频繁返回列表重进',
      '错误态只给一个 toast，用户无法判断该重试还是下载',
    ],
    language: 'ts',
    code: `const previewState = reactive({
  loading: false,
  page: 1,
  scale: 1,
  errorCode: '',
});

const openPreview = async (fileId: string) => {
  previewState.loading = true;
  previewState.errorCode = '';

  try {
    currentFile.value = await request.get<FilePreviewMeta>(\`/api/files/\${fileId}/preview\`);
  } catch (error) {
    previewState.errorCode = 'preview-fetch-failed';
  } finally {
    previewState.loading = false;
  }
};`,
  },
];

const comparisonCards = [
  {
    title: '原生预览 vs 转码预览',
    summary:
      '原生预览成本低、速度快，但格式和浏览器兼容受限；转码预览可控性更强，但服务成本、等待时间和失败链路更复杂。',
  },
  {
    title: '在线预览 vs 强制下载',
    summary:
      '在线预览更利于流程效率和内容浏览，强制下载更适合不常用或不支持格式。关键在于按格式、权限和业务场景做分层，不是一刀切。',
  },
  {
    title: '前端渲染 vs 第三方文档服务',
    summary:
      '前端渲染可控性高、体验可深度定制，但接入成本更大；第三方服务上线快，但对私有化、安全和定制化往往有限制。',
  },
];
</script>

<style scoped>
.file-preview-guide-page {
  min-height: calc(100vh - 40px);
}

.file-preview-guide-page__shell {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.file-preview-guide-page__top {
  display: flex;
  align-items: center;
}

.file-preview-guide-page__back {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 42px;
  height: 42px;
  border: 1px solid rgba(17, 24, 39, 0.08);
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.92);
  color: #1f2a36;
  text-decoration: none;
  transition:
    transform 160ms ease,
    border-color 160ms ease,
    box-shadow 160ms ease;
}

.file-preview-guide-page__back:hover {
  transform: translateY(-1px);
  border-color: rgba(43, 72, 101, 0.2);
  box-shadow: 0 18px 36px rgba(17, 24, 39, 0.08);
}

.file-preview-guide-page__content {
  display: flex;
  flex-direction: column;
  gap: 22px;
}

.file-preview-guide-hero,
.file-preview-guide-panel,
.file-preview-guide-card {
  border: 1px solid rgba(19, 27, 34, 0.08);
  border-radius: 7px;
  background: #fff;
  box-shadow: 0 24px 60px rgba(15, 23, 42, 0.05);
}

.file-preview-guide-hero {
  display: grid;
  grid-template-columns: minmax(0, 1.6fr) minmax(260px, 0.8fr);
  gap: 20px;
  padding: 28px;
}

.file-preview-guide-hero__eyebrow,
.file-preview-guide-section__eyebrow,
.file-preview-guide-card__eyebrow,
.file-preview-guide-panel__eyebrow,
.file-preview-guide-hero__label,
.file-preview-guide-method__tag,
.file-preview-guide-mini-panel__title {
  font-size: 11px;
  line-height: 1.4;
  letter-spacing: 0.24em;
  text-transform: uppercase;
  color: #7b8794;
}

.file-preview-guide-hero__title {
  margin-top: 10px;
  font-size: 42px;
  line-height: 1.08;
  font-weight: 600;
  letter-spacing: -0.04em;
  color: #16202a;
}

.file-preview-guide-hero__summary {
  margin-top: 16px;
  max-width: 820px;
  font-size: 15px;
  line-height: 1.9;
  color: #52606d;
}

.file-preview-guide-hero__panel {
  align-self: stretch;
  padding: 22px;
  border: 1px solid rgba(19, 27, 34, 0.08);
  border-radius: 7px;
  background: linear-gradient(180deg, #fbfcfd 0%, #f4f7fa 100%);
}

.file-preview-guide-grid {
  display: grid;
  grid-template-columns: repeat(5, minmax(0, 1fr));
  gap: 16px;
}

.file-preview-guide-card {
  padding: 20px;
}

.file-preview-guide-card__title,
.file-preview-guide-panel__title,
.file-preview-guide-section__title {
  color: #16202a;
}

.file-preview-guide-card__title {
  margin-top: 10px;
  font-size: 20px;
  line-height: 1.35;
  font-weight: 600;
}

.file-preview-guide-card__text,
.file-preview-guide-panel__text,
.file-preview-guide-list {
  font-size: 14px;
  line-height: 1.9;
  color: #52606d;
}

.file-preview-guide-section {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.file-preview-guide-section__head {
  display: flex;
  align-items: end;
  justify-content: space-between;
  gap: 16px;
}

.file-preview-guide-section__title {
  margin-top: 8px;
  font-size: 28px;
  line-height: 1.25;
  font-weight: 600;
  letter-spacing: -0.03em;
}

.file-preview-guide-stack,
.file-preview-guide-columns {
  display: grid;
  gap: 16px;
}

.file-preview-guide-columns {
  grid-template-columns: repeat(3, minmax(0, 1fr));
}

.file-preview-guide-panel {
  padding: 24px;
}

.file-preview-guide-panel.is-wide {
  padding: 26px;
}

.file-preview-guide-method__head {
  display: flex;
  align-items: start;
  justify-content: space-between;
  gap: 16px;
}

.file-preview-guide-method__tag {
  display: inline-flex;
  align-items: center;
  min-height: 32px;
  padding: 0 12px;
  border: 1px solid rgba(19, 27, 34, 0.08);
  border-radius: 999px;
  background: #f5f8fa;
}

.file-preview-guide-panel__text {
  margin-top: 14px;
}

.file-preview-guide-method__grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 14px;
  margin-top: 18px;
}

.file-preview-guide-mini-panel {
  padding: 18px;
  border: 1px solid rgba(19, 27, 34, 0.08);
  border-radius: 7px;
  background: linear-gradient(180deg, #fdfefe 0%, #f7fafc 100%);
}

.file-preview-guide-list {
  margin: 12px 0 0;
  padding-left: 18px;
}

.file-preview-guide-code-block {
  margin-top: 18px;
}

@media (max-width: 1180px) {
  .file-preview-guide-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .file-preview-guide-columns,
  .file-preview-guide-method__grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 900px) {
  .file-preview-guide-hero {
    grid-template-columns: 1fr;
    padding: 22px;
  }

  .file-preview-guide-hero__title {
    font-size: 34px;
  }

  .file-preview-guide-grid {
    grid-template-columns: 1fr;
  }

  .file-preview-guide-panel,
  .file-preview-guide-panel.is-wide,
  .file-preview-guide-card {
    padding: 20px;
  }
}
</style>
