<template>
  <section class="pwa-guide-page">
    <div class="pwa-guide-page__shell">
      <div class="pwa-guide-page__top">
        <RouterLink
          to="/fullstack-guide"
          class="pwa-guide-page__back"
          aria-label="返回全栈能力菜单"
          title="返回全栈能力菜单"
        >
          <el-icon :size="18"><ArrowLeft /></el-icon>
        </RouterLink>
      </div>

      <div class="pwa-guide-page__content">
        <header class="pwa-guide-hero">
          <div>
            <p class="pwa-guide-hero__eyebrow">Frontend Offline And PWA</p>
            <h1 class="pwa-guide-hero__title">前端离线与 PWA 能力</h1>
            <p class="pwa-guide-hero__summary">
              这一页按真实项目建设离线能力的顺序来讲：先判断业务是否真的需要离线，再设计缓存分层、资源预缓存、接口兜底、安装能力、更新策略和数据同步。重点不是把站点做成可安装，而是知道离线到底缓存什么、什么时候更新、失败后如何回退。
            </p>
          </div>

          <div class="pwa-guide-hero__panel">
            <p class="pwa-guide-hero__label">学完结果</p>
            <ul class="pwa-guide-list">
              <li>
                能分清离线缓存静态资源、接口数据和用户草稿不是同一个问题。
              </li>
              <li>
                能设计 service
                worker、缓存策略、更新提示和离线回退页的完整链路。
              </li>
              <li>能判断哪些业务适合做 PWA，哪些场景做了只会增加维护成本。</li>
            </ul>
          </div>
        </header>

        <section class="pwa-guide-grid">
          <article
            v-for="item in quickStages"
            :key="item.order"
            class="pwa-guide-card"
          >
            <p class="pwa-guide-card__eyebrow">Stage {{ item.order }}</p>
            <h2 class="pwa-guide-card__title">{{ item.title }}</h2>
            <p class="pwa-guide-card__text">{{ item.summary }}</p>
          </article>
        </section>

        <section class="pwa-guide-section">
          <div class="pwa-guide-section__head">
            <div>
              <p class="pwa-guide-section__eyebrow">Decision Order</p>
              <h2 class="pwa-guide-section__title">
                离线能力先拆缓存对象，再决定 PWA 能力层级
              </h2>
            </div>
          </div>

          <div class="pwa-guide-stack">
            <article
              v-for="stage in guideStages"
              :key="stage.order"
              class="pwa-guide-panel is-wide"
            >
              <div class="pwa-guide-method__head">
                <div>
                  <p class="pwa-guide-panel__eyebrow">
                    Stage {{ stage.order }}
                  </p>
                  <h3 class="pwa-guide-panel__title">
                    {{ stage.title }}
                  </h3>
                </div>
                <span class="pwa-guide-method__tag">{{ stage.tag }}</span>
              </div>

              <p class="pwa-guide-panel__text">{{ stage.description }}</p>

              <div class="pwa-guide-method__grid">
                <section class="pwa-guide-mini-panel">
                  <p class="pwa-guide-mini-panel__title">适用场景</p>
                  <ul class="pwa-guide-list">
                    <li v-for="item in stage.bestFor" :key="item">
                      {{ item }}
                    </li>
                  </ul>
                </section>

                <section class="pwa-guide-mini-panel">
                  <p class="pwa-guide-mini-panel__title">实现重点</p>
                  <ul class="pwa-guide-list">
                    <li v-for="item in stage.focus" :key="item">
                      {{ item }}
                    </li>
                  </ul>
                </section>

                <section class="pwa-guide-mini-panel">
                  <p class="pwa-guide-mini-panel__title">常见误区</p>
                  <ul class="pwa-guide-list">
                    <li v-for="item in stage.risks" :key="item">
                      {{ item }}
                    </li>
                  </ul>
                </section>
              </div>

              <AppCodeBlock
                class="pwa-guide-code-block"
                :code="stage.code"
                :lang="stage.language"
              />
            </article>
          </div>
        </section>

        <section class="pwa-guide-section">
          <div class="pwa-guide-section__head">
            <div>
              <p class="pwa-guide-section__eyebrow">Comparison</p>
              <h2 class="pwa-guide-section__title">
                离线与 PWA 最关键的几组取舍
              </h2>
            </div>
          </div>

          <div class="pwa-guide-columns">
            <article
              v-for="item in comparisonCards"
              :key="item.title"
              class="pwa-guide-panel"
            >
              <h3 class="pwa-guide-panel__title">{{ item.title }}</h3>
              <p class="pwa-guide-panel__text">{{ item.summary }}</p>
            </article>
          </div>
        </section>

        <section class="pwa-guide-section">
          <div class="pwa-guide-section__head">
            <div>
              <p class="pwa-guide-section__eyebrow">Checklist</p>
              <h2 class="pwa-guide-section__title">一套能落地的 PWA 清单</h2>
            </div>
          </div>

          <article class="pwa-guide-panel is-wide">
            <ul class="pwa-guide-list">
              <li>
                先区分静态资源缓存、接口缓存、用户输入缓存，不要一个 Cache
                全装进去。
              </li>
              <li>
                明确更新策略，是强更、静默更新还是提示用户刷新，避免缓存新旧混用。
              </li>
              <li>
                离线页、骨架屏、失败兜底文案都要作为产品体验的一部分设计。
              </li>
              <li>
                后台同步、草稿恢复、重试机制要和业务接口一起设计，不只是浏览器缓存。
              </li>
              <li>
                安装提示、图标、manifest、service worker
                生命周期都需要统一治理。
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
    title: '先判断值不值得做',
    summary: '不是所有 Web 项目都需要离线和安装能力，先看业务场景。',
  },
  {
    order: '02',
    title: '缓存要分层',
    summary: '静态资源、接口数据、用户草稿必须分开治理。',
  },
  {
    order: '03',
    title: '更新策略先定',
    summary: 'PWA 真正难的是资源更新和旧缓存失效，不是注册 SW。',
  },
  {
    order: '04',
    title: '离线体验要设计',
    summary: '离线页、失败回退和重试是产品体验，不是技术补丁。',
  },
  {
    order: '05',
    title: '同步链路要闭环',
    summary: '用户草稿、待提交数据和恢复策略必须能形成闭环。',
  },
];

const guideStages = [
  {
    order: '01',
    title: '先判断业务场景是否真的需要离线与 PWA',
    tag: '问题建模',
    description:
      'PWA 很容易被理解成“能安装到桌面”，但真正决定值不值得做的，是弱网、断网、高频访问和跨终端便捷性需求。比如巡检、门店、医疗查房、移动录入这种场景，离线能力价值很高；而纯内容官网多数时候并不需要复杂的离线数据同步。',
    bestFor: ['巡检系统', '移动录入', '弱网后台', '高频访问工具站'],
    focus: [
      '先判断弱网与离线是否是核心需求',
      '把安装能力和离线能力分开评估',
      '明确业务数据是否需要断网继续工作',
    ],
    risks: [
      '为了“像 App”而强行上 PWA',
      '安装体验做了但离线能力空心化',
      '高维护成本和业务收益不匹配',
    ],
    language: 'text',
    code: `PWA Decision
- 业务是否存在弱网/断网操作场景？
- 是否需要桌面图标、全屏体验、快捷访问？
- 是否存在本地草稿、离线表单、离线上传重试？
- 如果只是普通官网，优先做性能与缓存即可`,
  },
  {
    order: '02',
    title: '缓存对象必须拆层：静态资源、接口数据、用户输入不是一类东西',
    tag: '缓存治理',
    description:
      '很多 PWA 出问题的根源，是把所有内容都交给同一套缓存。静态资源更适合 precache 或 cache-first；接口数据要考虑 stale-while-revalidate 或 network-first；用户输入和草稿则应放进 IndexedDB 这类更稳定的存储层。缓存对象不同，策略就不应该一样。',
    bestFor: ['复杂业务系统', '多页签应用', '需要草稿恢复的项目'],
    focus: [
      '静态资源、接口数据、草稿数据分层缓存',
      '为不同对象选择不同缓存策略',
      '避免单一缓存桶造成污染和失控',
    ],
    risks: [
      '所有请求都走同一个 cache-first',
      '接口缓存过久导致数据陈旧',
      '草稿只存在内存刷新即丢',
    ],
    language: 'ts',
    code: `const cacheBuckets = {
  static: 'app-static-v1',
  api: 'app-api-v1',
  offlineDraft: 'indexeddb:offline-draft',
}`,
  },
  {
    order: '03',
    title: '更新策略必须先定，service worker 不是注册完就结束',
    tag: '更新策略',
    description:
      '离线能力最难排查的问题通常是更新。用户到底什么时候拿到新版本？旧资源什么时候作废？发现新 service worker 后是立刻替换、等下次打开、还是给用户一个刷新提示？如果这条链路不提前设计，缓存问题会很难看。',
    bestFor: ['频繁发版项目', '多终端使用场景', '缓存敏感业务系统'],
    focus: [
      '明确新版本发现与激活策略',
      '处理旧缓存清理和版本迁移',
      '给用户可理解的更新提示',
    ],
    risks: [
      '新旧资源同时存在导致白屏',
      '静默更新后用户界面状态错乱',
      '没有版本提示，用户长期停在旧包',
    ],
    language: 'ts',
    code: `navigator.serviceWorker.addEventListener('message', (event) => {
  if (event.data?.type === 'SW_UPDATED') {
    showUpdateToast({
      message: '发现新版本，刷新后生效',
      onConfirm: () => window.location.reload(),
    })
  }
})`,
  },
  {
    order: '04',
    title: '离线体验是产品能力，不只是技术兜底',
    tag: '体验设计',
    description:
      '一个真正可用的 PWA，不只是断网还能打开页面，而是用户知道现在处于什么状态、哪些功能可用、哪些操作会稍后同步。离线页、离线标识、重试按钮、待同步列表，这些都属于完整体验的一部分。',
    bestFor: ['移动端工具', '流程录入系统', '现场作业系统'],
    focus: [
      '给用户明确的离线状态反馈',
      '设计离线页、重试和同步提示',
      '让不可用功能有清晰降级方式',
    ],
    risks: [
      '断网后页面空白或无提示',
      '用户不知道操作是否已保存',
      '离线状态下仍展示不可用入口',
    ],
    language: 'html',
    code: `<section class="offline-fallback">
  <h1>当前网络不可用</h1>
  <p>你仍然可以查看已缓存内容，待网络恢复后再同步数据。</p>
  <button>重新尝试</button>
</section>`,
  },
  {
    order: '05',
    title: '真正的难点在数据同步：草稿、重试、冲突解决要闭环',
    tag: '工程落地',
    description:
      '如果业务需要离线写入，单有缓存远远不够。你还要处理本地草稿保存、提交队列、恢复重试、网络恢复后的批量同步，以及服务端冲突处理。很多项目只做到了“离线能填”，但一到同步阶段就彻底断链。',
    bestFor: ['离线录入', '表单草稿', '移动巡检', '现场作业应用'],
    focus: [
      '本地持久化草稿与提交队列',
      '网络恢复后自动或手动重试',
      '处理重复提交与数据冲突',
    ],
    risks: [
      '离线填写后刷新丢数据',
      '恢复网络后重复提交多次',
      '本地草稿与服务端数据冲突无处理策略',
    ],
    language: 'ts',
    code: `type PendingTask = {
  id: string
  type: 'submit-form' | 'upload-file'
  payload: unknown
  createdAt: number
}

async function flushPendingTasks(tasks: PendingTask[]) {
  for (const task of tasks) {
    await syncTask(task)
  }
}`,
  },
];

const comparisonCards = [
  {
    title: '缓存网页 vs 真正离线业务',
    summary:
      '缓存网页只解决打开速度和基础可达性；真正离线业务还要处理草稿、写入、同步、冲突和恢复链路，两者不是一个复杂度级别。',
  },
  {
    title: 'Cache API vs IndexedDB',
    summary:
      'Cache API 更适合资源和响应缓存；IndexedDB 更适合结构化数据、草稿和待同步任务。二者应按职责分工，而不是互相替代。',
  },
  {
    title: '静默更新 vs 用户确认更新',
    summary:
      '静默更新体验更顺，但对状态一致性要求更高；用户确认更新更稳，尤其适合后台和表单类应用，能减少中途中断和缓存错位问题。',
  },
];
</script>

<style scoped>
.pwa-guide-page {
  min-height: calc(100vh - 40px);
  padding: 24px;
  border: 1px solid rgba(19, 27, 34, 0.08);
  border-radius: 7px;
  background:
    radial-gradient(
      circle at top left,
      rgba(220, 227, 233, 0.48),
      transparent 28%
    ),
    linear-gradient(180deg, #fcfdfe 0%, #f3f6f8 100%);
  box-shadow: 0 30px 80px rgba(18, 26, 34, 0.08);
}

.pwa-guide-page__shell {
  min-height: calc(100vh - 90px);
  border: 1px solid rgba(19, 27, 34, 0.06);
  border-radius: 7px;
  background: rgba(255, 255, 255, 0.82);
}

.pwa-guide-page__top {
  display: flex;
  justify-content: flex-start;
  padding: 18px 18px 0;
}

.pwa-guide-page__back {
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

.pwa-guide-page__back:hover {
  transform: translateY(-1px);
  border-color: rgba(46, 70, 91, 0.18);
  box-shadow: 0 18px 34px rgba(19, 27, 34, 0.08);
}

.pwa-guide-page__content {
  padding: 18px 24px 24px;
}

.pwa-guide-hero {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 320px;
  gap: 20px;
  padding-bottom: 26px;
  border-bottom: 1px solid rgba(19, 27, 34, 0.08);
}

.pwa-guide-hero__eyebrow,
.pwa-guide-section__eyebrow,
.pwa-guide-card__eyebrow,
.pwa-guide-hero__label {
  font-size: 11px;
  line-height: 1.4;
  letter-spacing: 0.24em;
  text-transform: uppercase;
  color: #7b8793;
}

.pwa-guide-hero__title {
  margin-top: 10px;
  font-size: 46px;
  line-height: 1.06;
  font-weight: 600;
  letter-spacing: -0.05em;
  color: #17202a;
}

.pwa-guide-hero__summary {
  max-width: 860px;
  margin-top: 16px;
  font-size: 15px;
  line-height: 1.9;
  color: #58636f;
}

.pwa-guide-hero__panel,
.pwa-guide-card,
.pwa-guide-panel {
  border: 1px solid rgba(19, 27, 34, 0.08);
  border-radius: 7px;
  background: rgba(255, 255, 255, 0.84);
}

.pwa-guide-hero__panel {
  padding: 18px;
}

.pwa-guide-list {
  display: grid;
  gap: 8px;
  margin: 12px 0 0;
  padding-left: 18px;
  font-size: 14px;
  line-height: 1.8;
  color: #56616d;
}

.pwa-guide-grid,
.pwa-guide-columns,
.pwa-guide-stack {
  display: grid;
  gap: 16px;
}

.pwa-guide-grid {
  margin-top: 28px;
  grid-template-columns: repeat(3, minmax(0, 1fr));
}

.pwa-guide-card {
  padding: 18px;
}

.pwa-guide-card__title,
.pwa-guide-panel__title,
.pwa-guide-section__title {
  color: #17202a;
}

.pwa-guide-card__title {
  margin-top: 10px;
  font-size: 22px;
  line-height: 1.25;
  font-weight: 600;
}

.pwa-guide-card__text,
.pwa-guide-panel__text {
  margin-top: 12px;
  font-size: 14px;
  line-height: 1.9;
  color: #596571;
}

.pwa-guide-section {
  margin-top: 28px;
}

.pwa-guide-section__head {
  margin-bottom: 14px;
}

.pwa-guide-section__title {
  margin-top: 8px;
  font-size: 30px;
  line-height: 1.18;
  font-weight: 600;
  letter-spacing: -0.03em;
}

.pwa-guide-columns {
  grid-template-columns: repeat(3, minmax(0, 1fr));
}

.pwa-guide-stack {
  grid-template-columns: repeat(2, minmax(0, 1fr));
}

.pwa-guide-panel {
  padding: 18px;
}

.pwa-guide-panel.is-wide {
  grid-column: 1 / -1;
}

.pwa-guide-panel__eyebrow {
  font-size: 11px;
  line-height: 1.4;
  letter-spacing: 0.24em;
  text-transform: uppercase;
  color: #80909d;
}

.pwa-guide-panel__title {
  font-size: 20px;
  line-height: 1.3;
  font-weight: 600;
}

.pwa-guide-method__head {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 16px;
}

.pwa-guide-method__tag {
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

.pwa-guide-method__grid {
  display: grid;
  gap: 14px;
  margin-top: 16px;
  grid-template-columns: repeat(3, minmax(0, 1fr));
}

.pwa-guide-mini-panel {
  padding: 14px;
  border: 1px solid rgba(19, 27, 34, 0.08);
  border-radius: 7px;
  background: rgba(245, 248, 250, 0.9);
}

.pwa-guide-mini-panel__title {
  font-size: 14px;
  font-weight: 600;
  color: #17202a;
}

.pwa-guide-code-block {
  margin-top: 14px;
}

@media (max-width: 1080px) {
  .pwa-guide-hero,
  .pwa-guide-grid,
  .pwa-guide-columns,
  .pwa-guide-stack,
  .pwa-guide-method__grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 900px) {
  .pwa-guide-page {
    min-height: auto;
    padding: 18px;
  }

  .pwa-guide-page__shell {
    min-height: auto;
  }

  .pwa-guide-page__content {
    padding: 18px;
  }

  .pwa-guide-hero__title {
    font-size: 36px;
  }

  .pwa-guide-section__title {
    font-size: 26px;
  }
}
</style>
