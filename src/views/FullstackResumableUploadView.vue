<template>
  <section class="resumable-upload-page">
    <div class="resumable-upload-page__shell">
      <div class="resumable-upload-page__top">
        <RouterLink
          to="/fullstack-guide"
          class="resumable-upload-page__back"
          aria-label="返回全栈能力菜单"
          title="返回全栈能力菜单"
        >
          <el-icon :size="18"><ArrowLeft /></el-icon>
        </RouterLink>
      </div>

      <div class="resumable-upload-page__content">
        <header class="resumable-upload-hero">
          <div>
            <p class="resumable-upload-hero__eyebrow">
              Frontend Resumable Upload Engineering
            </p>
            <h1 class="resumable-upload-hero__title">前端文件断点续传工程</h1>
            <p class="resumable-upload-hero__summary">
              大文件上传如果只是一个 `FormData`
              直接提交，网络一抖就得从头再来。真正可用的断点续传工程，要解决分片切割、文件指纹、已上传分片探测、失败重传、暂停恢复、秒传和最终合并。它常见于医疗影像、日志归档、视频上传和大附件系统，是很实用的前端工程能力。
            </p>
          </div>

          <div class="resumable-upload-hero__panel">
            <p class="resumable-upload-hero__label">学完结果</p>
            <ul class="resumable-upload-list">
              <li>能把大文件切片上传，并控制分片并发和失败重传。</li>
              <li>能设计文件指纹、已上传分片探测和断点恢复流程。</li>
              <li>能区分秒传、续传和真正的首次上传链路。</li>
            </ul>
          </div>
        </header>

        <section class="resumable-upload-grid">
          <article
            v-for="item in quickStages"
            :key="item.order"
            class="resumable-upload-card"
          >
            <p class="resumable-upload-card__eyebrow">Stage {{ item.order }}</p>
            <h2 class="resumable-upload-card__title">{{ item.title }}</h2>
            <p class="resumable-upload-card__text">{{ item.summary }}</p>
          </article>
        </section>

        <section class="resumable-upload-section">
          <div class="resumable-upload-section__head">
            <div>
              <p class="resumable-upload-section__eyebrow">Execution Order</p>
              <h2 class="resumable-upload-section__title">
                先做文件识别，再做分片上传与恢复
              </h2>
            </div>
          </div>

          <div class="resumable-upload-stack">
            <article
              v-for="stage in practiceStages"
              :key="stage.order"
              class="resumable-upload-panel is-wide"
            >
              <div class="resumable-upload-method__head">
                <div>
                  <p class="resumable-upload-panel__eyebrow">
                    Stage {{ stage.order }}
                  </p>
                  <h3 class="resumable-upload-panel__title">
                    {{ stage.title }}
                  </h3>
                </div>
                <span class="resumable-upload-method__tag">{{
                  stage.tag
                }}</span>
              </div>

              <p class="resumable-upload-panel__text">
                {{ stage.description }}
              </p>

              <div class="resumable-upload-method__grid">
                <section class="resumable-upload-mini-panel">
                  <p class="resumable-upload-mini-panel__title">适用场景</p>
                  <ul class="resumable-upload-list">
                    <li v-for="item in stage.bestFor" :key="item">
                      {{ item }}
                    </li>
                  </ul>
                </section>

                <section class="resumable-upload-mini-panel">
                  <p class="resumable-upload-mini-panel__title">实现重点</p>
                  <ul class="resumable-upload-list">
                    <li v-for="item in stage.focus" :key="item">
                      {{ item }}
                    </li>
                  </ul>
                </section>

                <section class="resumable-upload-mini-panel">
                  <p class="resumable-upload-mini-panel__title">常见误区</p>
                  <ul class="resumable-upload-list">
                    <li v-for="item in stage.risks" :key="item">
                      {{ item }}
                    </li>
                  </ul>
                </section>
              </div>

              <AppCodeBlock
                class="resumable-upload-code-block"
                :code="stage.code"
                :lang="stage.language"
              />
            </article>
          </div>
        </section>

        <section class="resumable-upload-section">
          <div class="resumable-upload-section__head">
            <div>
              <p class="resumable-upload-section__eyebrow">Comparison</p>
              <h2 class="resumable-upload-section__title">
                常见上传方案的适用边界
              </h2>
            </div>
          </div>

          <div class="resumable-upload-columns">
            <article
              v-for="item in comparisonCards"
              :key="item.title"
              class="resumable-upload-panel"
            >
              <h3 class="resumable-upload-panel__title">{{ item.title }}</h3>
              <p class="resumable-upload-panel__text">{{ item.summary }}</p>
            </article>
          </div>
        </section>

        <section class="resumable-upload-section">
          <div class="resumable-upload-section__head">
            <div>
              <p class="resumable-upload-section__eyebrow">Checklist</p>
              <h2 class="resumable-upload-section__title">
                断点续传上线前必须补齐的 5 个点
              </h2>
            </div>
          </div>

          <article class="resumable-upload-panel is-wide">
            <ul class="resumable-upload-list">
              <li>是否有稳定的文件指纹，而不是只用文件名判断唯一性。</li>
              <li>是否能查询服务端已上传分片并跳过重复上传。</li>
              <li>分片失败后是否支持单片重传，而不是整文件重来。</li>
              <li>
                暂停、恢复、取消是否真正作用于上传任务，而不是只改按钮状态。
              </li>
              <li>服务端合并前是否校验分片完整性和顺序。</li>
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
    title: '先生成文件指纹',
    summary: '不先识别文件身份，就没法做秒传、续传和已上传探测。',
  },
  {
    order: '02',
    title: '再切片上传',
    summary: '大文件不能靠单请求硬抗，分片是续传和失败恢复的基础。',
  },
  {
    order: '03',
    title: '已上传分片要可探测',
    summary: '恢复上传前先问服务端哪些片已存在，避免重复浪费。',
  },
  {
    order: '04',
    title: '失败只重传坏片',
    summary: '真正的断点续传不是整文件重来，而是最小代价恢复。',
  },
  {
    order: '05',
    title: '最终还要服务端合并',
    summary: '前端分片只是第一步，完整文件的正确性依赖后端合并校验。',
  },
];

const practiceStages = [
  {
    order: '01',
    title: '文件指纹是秒传和续传的前提',
    tag: '文件识别',
    description:
      '文件名和大小都不可靠，真正稳定的做法是结合 hash、大小、类型等信息生成文件指纹。只有先拿到稳定标识，前端和服务端才能围绕同一文件协作，判断是否已上传、是否能秒传、是否命中历史分片。',
    bestFor: ['医疗影像', '视频上传', '大附件归档', '日志包上传'],
    focus: [
      '生成稳定文件指纹',
      '指纹与文件内容绑定而不是只绑定名称',
      '指纹生成过程要考虑大文件性能',
    ],
    risks: [
      '只用文件名作为唯一标识',
      '每次上传都生成不同 id',
      '主线程里全量 hash 导致页面假死',
    ],
    language: 'ts',
    code: `const createFileIdentity = (file: File) => {
  return [file.name, file.size, file.type, file.lastModified].join(':')
}`,
  },
  {
    order: '02',
    title: '分片切割决定了上传粒度和恢复成本',
    tag: '分片策略',
    description:
      '分片太大，失败重传成本高；分片太小，请求数暴涨。实践里常会根据文件大小动态选择分片大小，再配合并发上限去平衡吞吐与稳定性。分片策略是整个续传方案的核心参数。',
    bestFor: ['大文件上传', '弱网环境', '多并发上传', '断点续传场景'],
    focus: [
      '按文件体积动态设定 chunkSize',
      '切片后记录 index、start、end',
      '为后续重传和合并保留元数据',
    ],
    risks: [
      '所有文件统一极小或极大分片',
      '切片信息不保留 index',
      '前端和后端对分片编号规则不一致',
    ],
    language: 'ts',
    code: `const createChunks = (file: File, chunkSize: number) => {
  const chunks: Array<{ index: number; blob: Blob }> = []

  for (let start = 0, index = 0; start < file.size; start += chunkSize, index += 1) {
    chunks.push({
      index,
      blob: file.slice(start, start + chunkSize),
    })
  }

  return chunks
}`,
  },
  {
    order: '03',
    title: '恢复上传前先探测服务端已存在分片',
    tag: '断点探测',
    description:
      '断点续传不是前端自己记住传到哪了就结束了，真正可靠的依据是服务端已落盘的分片集合。恢复前先调用检查接口，拿到已上传 chunk 列表，再只上传缺失部分，才能避免状态不一致。',
    bestFor: ['上传恢复', '刷新页面后继续', '跨会话续传', '异常中断恢复'],
    focus: [
      '检查接口返回已上传分片索引',
      '恢复时只调度缺失分片',
      '前端本地状态仅作辅助，不作唯一真相',
    ],
    risks: [
      '完全相信本地缓存进度',
      '恢复时从头全部重传',
      '服务端状态改变后前端无感知',
    ],
    language: 'ts',
    code: `const fetchUploadedChunks = async (fileId: string) => {
  const response = await request.get('/api/upload/check', {
    params: {
      fileId,
    },
  })

  return response.data.uploadedChunkIndexes as number[]
}`,
  },
  {
    order: '04',
    title: '失败时只重传坏片，并支持暂停恢复',
    tag: '重传控制',
    description:
      '高质量的上传体验，关键在于失败粒度足够小。单片失败只补这一片，用户点击暂停时真正停止后续调度，点击恢复时从未完成片继续跑。这样即使网络波动，整条链路也不会崩。',
    bestFor: ['大附件上传', '弱网办公', '移动网络切换', '长时间上传任务'],
    focus: [
      '为每个分片维护独立状态',
      '暂停时中断正在进行的分片请求',
      '恢复时继续调度未完成和失败分片',
    ],
    risks: [
      '一个分片失败就整文件失败',
      '暂停只改 UI 不停请求',
      '恢复后重复上传已成功分片',
    ],
    language: 'ts',
    code: `type ChunkStatus = 'waiting' | 'uploading' | 'done' | 'failed'

const chunkStateMap = new Map<number, ChunkStatus>()

const markChunkStatus = (index: number, status: ChunkStatus) => {
  chunkStateMap.set(index, status)
}`,
  },
  {
    order: '05',
    title: '前端上传完成后，还要驱动服务端安全合并',
    tag: '最终合并',
    description:
      '所有分片都传完，并不等于文件可用。前端最后还需要通知服务端按序合并，并由后端校验分片数量、完整性和总 hash。前端这一步通常会负责提交 fileId、chunkCount、文件名等元信息。',
    bestFor: ['文件中心', '视频素材库', '影像上传', '企业附件平台'],
    focus: [
      '上传完成后显式调用合并接口',
      '提交 chunkCount 和文件元信息',
      '等待服务端返回最终文件地址或任务状态',
    ],
    risks: [
      '分片传完就直接认为成功',
      '合并接口缺少分片数量校验',
      '合并过程无状态反馈，用户只能盲等',
    ],
    language: 'ts',
    code: `const finalizeUpload = async (payload: {
  fileId: string
  fileName: string
  chunkCount: number
}) => {
  return request.post('/api/upload/complete', payload)
}`,
  },
];

const comparisonCards = [
  {
    title: '单请求整文件上传',
    summary:
      '实现最简单，适合小文件和临时上传。缺点是失败成本极高，无法暂停恢复，也无法做秒传和续传。',
  },
  {
    title: '分片上传',
    summary:
      '适合大文件和弱网环境。能提升稳定性，但如果没有探测、重传和合并，只能算半成品。',
  },
  {
    title: '断点续传 + 秒传',
    summary:
      '这是更完整的工程化方案，适合正式文件系统。复杂度最高，但体验和稳定性都更好。',
  },
];
</script>

<style scoped>
.resumable-upload-page {
  min-height: 100%;
  padding: 32px;
}

.resumable-upload-page__shell {
  max-width: 1240px;
  margin: 0 auto;
}

.resumable-upload-page__top {
  display: flex;
  justify-content: flex-start;
  margin-bottom: 18px;
}

.resumable-upload-page__back {
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

.resumable-upload-page__back:hover {
  transform: translateY(-1px);
  border-color: rgba(67, 94, 118, 0.18);
  box-shadow: 0 18px 42px rgba(19, 27, 34, 0.1);
}

.resumable-upload-page__content {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.resumable-upload-hero,
.resumable-upload-panel,
.resumable-upload-card {
  border: 1px solid rgba(19, 27, 34, 0.08);
  border-radius: 7px;
  background: rgba(255, 255, 255, 0.96);
  box-shadow: 0 24px 54px rgba(19, 27, 34, 0.06);
}

.resumable-upload-hero {
  display: grid;
  grid-template-columns: minmax(0, 1.4fr) minmax(320px, 0.8fr);
  gap: 18px;
  padding: 28px;
}

.resumable-upload-hero__eyebrow,
.resumable-upload-section__eyebrow,
.resumable-upload-card__eyebrow,
.resumable-upload-panel__eyebrow {
  font-size: 11px;
  line-height: 1.4;
  letter-spacing: 0.24em;
  text-transform: uppercase;
  color: #7e8894;
}

.resumable-upload-hero__title {
  margin-top: 10px;
  font-size: 42px;
  line-height: 1.06;
  font-weight: 600;
  letter-spacing: -0.04em;
  color: #17202a;
}

.resumable-upload-hero__summary,
.resumable-upload-panel__text,
.resumable-upload-card__text {
  font-size: 15px;
  line-height: 1.9;
  color: #55606c;
}

.resumable-upload-hero__summary {
  margin-top: 16px;
  max-width: 760px;
}

.resumable-upload-hero__panel,
.resumable-upload-mini-panel {
  padding: 20px;
  border: 1px solid rgba(19, 27, 34, 0.08);
  border-radius: 7px;
  background: linear-gradient(180deg, #ffffff 0%, #f5f8fb 100%);
}

.resumable-upload-hero__label,
.resumable-upload-mini-panel__title {
  font-size: 13px;
  line-height: 1.5;
  font-weight: 600;
  color: #17202a;
}

.resumable-upload-list {
  margin: 12px 0 0;
  padding-left: 18px;
  display: grid;
  gap: 8px;
  color: #55606c;
  font-size: 14px;
  line-height: 1.75;
}

.resumable-upload-grid,
.resumable-upload-columns {
  display: grid;
  gap: 16px;
}

.resumable-upload-grid {
  grid-template-columns: repeat(5, minmax(0, 1fr));
}

.resumable-upload-card {
  padding: 20px;
}

.resumable-upload-card__title,
.resumable-upload-panel__title,
.resumable-upload-section__title {
  color: #17202a;
}

.resumable-upload-card__title {
  margin-top: 8px;
  font-size: 19px;
  line-height: 1.35;
  font-weight: 600;
}

.resumable-upload-card__text {
  margin-top: 10px;
}

.resumable-upload-section {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.resumable-upload-section__head {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
}

.resumable-upload-section__title {
  margin-top: 8px;
  font-size: 28px;
  line-height: 1.2;
  font-weight: 600;
  letter-spacing: -0.03em;
}

.resumable-upload-stack {
  display: grid;
  gap: 16px;
}

.resumable-upload-panel {
  padding: 24px;
}

.resumable-upload-panel.is-wide {
  padding: 26px;
}

.resumable-upload-method__head {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 12px;
}

.resumable-upload-method__tag {
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

.resumable-upload-panel__title {
  margin-top: 8px;
  font-size: 24px;
  line-height: 1.28;
  font-weight: 600;
}

.resumable-upload-panel__text {
  margin-top: 14px;
}

.resumable-upload-method__grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 14px;
  margin-top: 18px;
}

.resumable-upload-code-block {
  margin-top: 18px;
}

.resumable-upload-columns {
  grid-template-columns: repeat(3, minmax(0, 1fr));
}

@media (max-width: 1100px) {
  .resumable-upload-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .resumable-upload-columns,
  .resumable-upload-method__grid,
  .resumable-upload-hero {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 720px) {
  .resumable-upload-page {
    padding: 18px;
  }

  .resumable-upload-grid {
    grid-template-columns: 1fr;
  }

  .resumable-upload-hero,
  .resumable-upload-card,
  .resumable-upload-panel {
    padding: 18px;
  }

  .resumable-upload-hero__title {
    font-size: 32px;
  }

  .resumable-upload-section__title {
    font-size: 22px;
  }
}
</style>
