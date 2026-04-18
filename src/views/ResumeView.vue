<template>
  <section class="resume-page">
    <div class="resume-toolbar">
      <div class="resume-toolbar__intro">
        <p class="resume-toolbar__eyebrow">Personal Resume</p>
        <h1 class="resume-toolbar__title">A4 多页简历</h1>
        <p class="resume-toolbar__text">
          页面按 A4 纸张尺寸居中排版，支持多页内容。点击“导出
          PDF”后，可直接在浏览器打印面板中选择“另存为 PDF”。
        </p>
      </div>

      <div class="resume-toolbar__actions">
        <button
          type="button"
          class="resume-toolbar__button is-dark"
          @click="handleExportPdf"
        >
          导出 PDF
        </button>
        <RouterLink to="/dashboard" class="resume-toolbar__button">
          返回首页
        </RouterLink>
      </div>
    </div>

    <div v-if="siblingEntries.length" class="resume-nav">
      <RouterLink
        v-for="item in siblingEntries"
        :key="item.path"
        :to="item.path"
        class="resume-nav__item"
      >
        {{ item.label }}
      </RouterLink>
    </div>

    <div class="resume-stack">
      <article class="resume-sheet">
        <header class="hero-card">
          <div>
            <p class="hero-card__eyebrow">Len / Systems Product Engineer</p>
            <h2 class="hero-card__title">
              能把复杂的前端、全栈与 AI
              产品问题，整理成可信、可交付、可持续演进的系统。
            </h2>
            <p class="hero-card__summary">
              我更关注长期有效的工程与产品能力：信息结构是否稳固、交互是否有职业感、代码与协作是否支撑未来演化。这也是我构建个人站点、内容体系和作品集的核心方法。
            </p>
          </div>

          <div class="hero-card__meta">
            <article
              v-for="item in profileSnapshot"
              :key="item.label"
              class="metric-card"
            >
              <p class="metric-card__label">{{ item.label }}</p>
              <p class="metric-card__value">{{ item.value }}</p>
              <p class="metric-card__detail">{{ item.detail }}</p>
            </article>
          </div>
        </header>

        <section class="sheet-section">
          <div class="section-heading">
            <p class="section-heading__eyebrow">Signature</p>
            <h3 class="section-heading__title">核心优势</h3>
          </div>

          <div class="strength-grid">
            <article
              v-for="item in signatureStrengths"
              :key="item.title"
              class="strength-card"
            >
              <p class="strength-card__eyebrow">{{ item.eyebrow }}</p>
              <h4 class="strength-card__title">{{ item.title }}</h4>
              <p class="strength-card__text">{{ item.description }}</p>
            </article>
          </div>
        </section>

        <section class="sheet-section">
          <div class="section-heading">
            <p class="section-heading__eyebrow">Focus</p>
            <h3 class="section-heading__title">我能解决什么问题</h3>
          </div>

          <div class="focus-list">
            <article
              v-for="item in focusPoints"
              :key="item.title"
              class="focus-item"
            >
              <div>
                <h4 class="focus-item__title">{{ item.title }}</h4>
                <p class="focus-item__text">{{ item.description }}</p>
              </div>
              <p class="focus-item__outcome">{{ item.outcome }}</p>
            </article>
          </div>
        </section>
      </article>

      <article class="resume-sheet">
        <section class="sheet-section">
          <div class="section-heading">
            <p class="section-heading__eyebrow">Experience Direction</p>
            <h3 class="section-heading__title">职业路径与能力迁移</h3>
          </div>

          <div class="timeline">
            <article
              v-for="item in experienceTimeline"
              :key="item.phase"
              class="timeline-item"
            >
              <div class="timeline-item__phase">{{ item.phase }}</div>
              <div class="timeline-item__body">
                <h4 class="timeline-item__title">{{ item.title }}</h4>
                <p class="timeline-item__summary">{{ item.summary }}</p>
                <ul class="timeline-item__list">
                  <li v-for="detail in item.details" :key="detail">
                    {{ detail }}
                  </li>
                </ul>
              </div>
            </article>
          </div>
        </section>

        <section class="sheet-section">
          <div class="section-heading">
            <p class="section-heading__eyebrow">Capability Matrix</p>
            <h3 class="section-heading__title">能力矩阵</h3>
          </div>

          <div class="capability-grid">
            <article
              v-for="item in capabilityMatrix"
              :key="item.title"
              class="capability-card"
            >
              <h4 class="capability-card__title">{{ item.title }}</h4>
              <p class="capability-card__text">{{ item.description }}</p>
              <div class="capability-card__tags">
                <span v-for="tag in item.tags" :key="tag">
                  {{ tag }}
                </span>
              </div>
            </article>
          </div>
        </section>
      </article>

      <article class="resume-sheet">
        <section class="sheet-section">
          <div class="section-heading">
            <p class="section-heading__eyebrow">Selected Work</p>
            <h3 class="section-heading__title">代表项目与价值证明</h3>
          </div>

          <div class="work-list">
            <article
              v-for="item in selectedWorks"
              :key="item.title"
              class="work-card"
            >
              <div class="work-card__head">
                <h4 class="work-card__title">{{ item.title }}</h4>
                <span class="work-card__role">{{ item.role }}</span>
              </div>
              <p class="work-card__text">{{ item.summary }}</p>
              <p class="work-card__value">价值：{{ item.value }}</p>
            </article>
          </div>
        </section>

        <section class="sheet-section page-split">
          <div class="section-heading">
            <p class="section-heading__eyebrow">Collaboration</p>
            <h3 class="section-heading__title">合作风格与交付原则</h3>
          </div>

          <div class="page-split__grid">
            <div class="collaboration-list">
              <article
                v-for="item in collaborationStyle"
                :key="item.title"
                class="collaboration-card"
              >
                <h4 class="collaboration-card__title">{{ item.title }}</h4>
                <p class="collaboration-card__text">{{ item.description }}</p>
              </article>
            </div>

            <aside class="closing-note">
              <p class="closing-note__eyebrow">Positioning</p>
              <h4 class="closing-note__title">我更像一名系统型的产品工程师</h4>
              <p class="closing-note__text">
                能做界面，也能做结构；能写代码，也能整理知识；能推进交付，也能判断长期方向。对团队而言，这种能力的价值在于减少反复、提升成品感，并让复杂项目更容易走向成熟。
              </p>

              <div class="closing-note__items">
                <div
                  v-for="item in closingPoints"
                  :key="item.label"
                  class="closing-note__item"
                >
                  <p class="closing-note__label">{{ item.label }}</p>
                  <p class="closing-note__value">{{ item.value }}</p>
                </div>
              </div>
            </aside>
          </div>
        </section>
      </article>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { RouterLink, useRoute } from 'vue-router';
import { getNavigationMenusFromRoutes, isMenuGroup } from '@/router/permission';

const route = useRoute();

const handleExportPdf = () => {
  window.print();
};

const siblingEntries = computed(() =>
  getNavigationMenusFromRoutes()
    .flatMap((item) =>
      isMenuGroup(item)
        ? item.children.map((child) => ({
            path: child.index,
            label: `${item.label} · ${child.label}`,
          }))
        : [{ path: item.index, label: item.label }],
    )
    .filter((item) => item.path !== route.path)
    .slice(0, 6),
);

const profileSnapshot = [
  {
    label: '核心定位',
    value: '前端架构 / 全栈交付 / AI 产品界面',
    detail: '从视觉与交互，到路由组织、模块结构和工程策略都能兼顾。',
  },
  {
    label: '擅长问题',
    value: '复杂系统的结构化整理',
    detail: '把混乱需求拆成模块、规则与可维护的长期实现路径。',
  },
  {
    label: '工作风格',
    value: '克制、直接、强调结果',
    detail: '不会停留在表面“做出来”，而是追求成品质量与演进能力。',
  },
];

const signatureStrengths = [
  {
    eyebrow: 'Strength 01',
    title: '会做复杂前台，也会组织系统结构',
    description:
      '不仅能完成界面实现，还能从信息架构、路由、模块边界和交互节奏上提升整个产品质量。',
  },
  {
    eyebrow: 'Strength 02',
    title: '能把技术内容做成有产品力的体系',
    description:
      '擅长把零散知识重构成栏目、专题、学习路径与能力地图，让内容本身具备专业表达与可浏览性。',
  },
  {
    eyebrow: 'Strength 03',
    title: '对 AI 时代的前端升级有清晰判断',
    description:
      '理解 agent、AI UX、工作流协作与未来价值迁移，能够用现实视角判断技术演进方向。',
  },
];

const focusPoints = [
  {
    title: '复杂前台与交互设计',
    description:
      '处理内容密度高、层次复杂、状态切换多的产品页面，避免出现后台模板感或廉价组件味。',
    outcome: '结果：界面更克制，信息更清楚，品牌辨识度更高。',
  },
  {
    title: '信息架构与内容产品化',
    description:
      '把学习体系、专题栏目、能力地图等抽象内容做成结构稳定、路径清晰的可浏览产品。',
    outcome: '结果：用户能快速理解内容边界，也更容易形成站点认知。',
  },
  {
    title: '工程结构升级与长期维护',
    description:
      '关注路由生成、权限菜单、模块分层、页面职责和样式规范，减少项目后续扩展成本。',
    outcome: '结果：需求继续增加时，系统不会迅速失控。',
  },
];

const experienceTimeline = [
  {
    phase: 'Phase 01',
    title: '从页面实现走向系统级前端',
    summary:
      '早期关注高质量界面实现与组件抽象，逐步扩展到路由结构、状态组织和复杂页面体验。',
    details: [
      '能把视觉、交互和代码结构统一起来，不做割裂实现。',
      '关注可维护性，而不是只追求短期完成。',
    ],
  },
  {
    phase: 'Phase 02',
    title: '从功能开发走向产品交付',
    summary:
      '从单点需求转向完整交付视角，开始关注模块关系、发布节奏和系统的持续演进能力。',
    details: [
      '能把需求抽象成模块和规则，而不是只完成单页开发。',
      '理解设计、接口、内容与工程协作之间的真实衔接。',
    ],
  },
  {
    phase: 'Phase 03',
    title: '进入 AI 产品与全栈延展',
    summary:
      '持续关注 agent、AI 应用前台以及从前端走向完整系统交付的升级路径。',
    details: [
      '能识别哪些价值会被 AI 压缩，哪些能力会被进一步放大。',
      '把技术学习组织成路线图，而不是随机补点式成长。',
    ],
  },
];

const capabilityMatrix = [
  {
    title: '前端架构',
    description:
      '擅长前端项目的信息结构、模块分层、路由组织、可维护性设计与长期演进方案。',
    tags: [
      'Route Design',
      'Module Boundaries',
      'UI Systems',
      'Maintainability',
    ],
  },
  {
    title: '交互与视觉判断',
    description:
      '关注界面节奏、信息密度、细节质感和复杂交互的自然体验，避免产品显得廉价或模板化。',
    tags: ['Interaction Design', 'Visual Hierarchy', 'Content UX', 'AI UX'],
  },
  {
    title: '全栈视角',
    description:
      '理解服务端、数据库、部署和协作流程如何影响前台决策，能从整体视角组织系统。',
    tags: [
      'Fullstack Thinking',
      'Delivery',
      'Engineering Workflow',
      'Deployment',
    ],
  },
  {
    title: '技术表达',
    description:
      '能够把复杂知识拆成清晰结构，用专题、教程、能力地图与作品页建立长期职业信誉。',
    tags: [
      'Technical Writing',
      'Knowledge Design',
      'Documentation',
      'Narrative',
    ],
  },
];

const selectedWorks = [
  {
    title: '个人技术博客系统重构',
    role: 'Information Architecture / Frontend Design',
    summary:
      '将原始模板式项目改造成带有个人品牌、专题栏目、独立模块与简历文档的技术博客。',
    value: '证明了从信息结构到视觉气质的整体控制能力。',
  },
  {
    title: '全球留言地球交互页',
    role: 'Interactive Frontend',
    summary:
      '围绕地球仪、头像水滴、缩放层级和 tip 展示规则构建互动表达，同时兼顾性能与视觉完成度。',
    value: '体现复杂交互设计、性能约束下的实现判断与审美控制。',
  },
  {
    title: '前端架构 / 全栈能力地图专题',
    role: 'Technical Content Product',
    summary:
      '把抽象知识做成可浏览、可理解、可升级的能力地图，帮助读者建立现实的成长路径。',
    value: '证明了技术内容产品化与系统化表达能力。',
  },
];

const collaborationStyle = [
  {
    title: '能直接进入复杂问题',
    description:
      '不依赖过度细碎的任务切分，能够自行梳理结构、发现关键路径并推进落地。',
  },
  {
    title: '会主动提出更优解',
    description:
      '如果发现当前做法只是能跑但不够好，会明确指出结构问题并给出更合理的实现方式。',
  },
  {
    title: '重视完成度与职业感',
    description:
      '不仅关心代码是否可用，也关心产品是否显得专业、信息是否清楚、用户是否感受到质量。',
  },
];

const closingPoints = [
  {
    label: '适合场景',
    value: '复杂前端、技术内容产品、AI 应用界面与系统升级',
  },
  {
    label: '带来的价值',
    value: '提升成品感、结构稳定性和长期交付效率',
  },
  {
    label: '合作关键词',
    value: '结构化、审美判断、工程 rigor、长期主义',
  },
];
</script>

<style scoped>
.resume-page {
  --resume-bg: #f6f4ee;
  --resume-paper: #ffffff;
  --resume-paper-soft: #faf8f3;
  --resume-line: rgba(28, 34, 42, 0.1);
  --resume-line-strong: rgba(28, 34, 42, 0.16);
  --resume-title: #17202a;
  --resume-text: #4a5561;
  --resume-muted: #78818b;
  --resume-accent: #7c6955;
  --resume-accent-soft: rgba(124, 105, 85, 0.1);
  padding: 24px 0 64px;
  color: var(--resume-text);
}

.resume-toolbar,
.resume-nav,
.resume-stack {
  width: min(calc(210mm + 72px), calc(100vw - 32px));
  margin: 0 auto;
}

.resume-toolbar {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 20px;
  margin-bottom: 18px;
}

.resume-toolbar__eyebrow,
.section-heading__eyebrow,
.strength-card__eyebrow,
.metric-card__label,
.closing-note__eyebrow,
.closing-note__label,
.hero-card__eyebrow {
  font-size: 11px;
  line-height: 1.4;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--resume-muted);
}

.resume-toolbar__title {
  margin-top: 6px;
  font-size: 28px;
  line-height: 1.2;
  font-weight: 600;
  color: var(--resume-title);
}

.resume-toolbar__text {
  max-width: 680px;
  margin-top: 8px;
  font-size: 14px;
  line-height: 1.9;
}

.resume-toolbar__actions {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.resume-toolbar__button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 42px;
  padding: 0 18px;
  border: 1px solid var(--resume-line);
  border-radius: 7px;
  background: rgba(255, 255, 255, 0.84);
  color: var(--resume-title);
  font-size: 14px;
  font-weight: 500;
  text-decoration: none;
  cursor: pointer;
  transition:
    border-color 160ms ease,
    background-color 160ms ease,
    color 160ms ease;
}

.resume-toolbar__button:hover {
  border-color: var(--resume-line-strong);
  background: var(--resume-paper);
}

.resume-toolbar__button.is-dark {
  border-color: var(--resume-title);
  background: var(--resume-title);
  color: var(--resume-paper);
}

.resume-toolbar__button.is-dark:hover {
  background: #2a3440;
  border-color: #2a3440;
}

.resume-nav {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 20px;
}

.resume-nav__item {
  display: inline-flex;
  align-items: center;
  min-height: 38px;
  padding: 0 14px;
  border: 1px solid var(--resume-line);
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.72);
  color: var(--resume-text);
  font-size: 13px;
  text-decoration: none;
}

.resume-stack {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.resume-sheet {
  width: 210mm;
  min-height: 297mm;
  margin: 0 auto;
  padding: 18mm 16mm;
  border: 1px solid rgba(19, 27, 34, 0.08);
  border-radius: 7px;
  background: linear-gradient(180deg, #fffdfa 0%, #ffffff 100%);
  box-shadow: 0 24px 60px rgba(17, 24, 32, 0.1);
  display: flex;
  flex-direction: column;
  gap: 22px;
}

.hero-card {
  display: grid;
  grid-template-columns: minmax(0, 1.2fr) 240px;
  gap: 18px;
  padding-bottom: 18px;
  border-bottom: 1px solid var(--resume-line);
}

.hero-card__title {
  margin-top: 10px;
  font-size: 34px;
  line-height: 1.24;
  font-weight: 600;
  letter-spacing: -0.03em;
  color: var(--resume-title);
}

.hero-card__summary {
  margin-top: 16px;
  font-size: 15px;
  line-height: 2;
}

.hero-card__meta {
  display: grid;
  gap: 10px;
}

.metric-card,
.strength-card,
.focus-item,
.capability-card,
.work-card,
.collaboration-card,
.closing-note {
  border: 1px solid var(--resume-line);
  border-radius: 7px;
  background: var(--resume-paper);
}

.metric-card {
  padding: 14px;
  background: var(--resume-paper-soft);
}

.metric-card__value {
  margin-top: 8px;
  font-size: 17px;
  line-height: 1.5;
  font-weight: 600;
  color: var(--resume-title);
}

.metric-card__detail {
  margin-top: 8px;
  font-size: 13px;
  line-height: 1.85;
}

.sheet-section {
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.section-heading {
  display: flex;
  align-items: end;
  justify-content: space-between;
  gap: 14px;
}

.section-heading__title {
  margin-top: 5px;
  font-size: 24px;
  line-height: 1.28;
  font-weight: 600;
  color: var(--resume-title);
}

.strength-grid,
.capability-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 12px;
}

.strength-card,
.capability-card,
.collaboration-card,
.closing-note {
  padding: 16px;
}

.strength-card__title,
.capability-card__title,
.focus-item__title,
.timeline-item__title,
.work-card__title,
.collaboration-card__title,
.closing-note__title {
  font-size: 18px;
  line-height: 1.45;
  font-weight: 600;
  color: var(--resume-title);
}

.strength-card__title,
.capability-card__title,
.collaboration-card__title,
.closing-note__title {
  margin-top: 8px;
}

.strength-card__text,
.capability-card__text,
.focus-item__text,
.timeline-item__summary,
.work-card__text,
.collaboration-card__text,
.closing-note__text {
  margin-top: 10px;
  font-size: 14px;
  line-height: 1.9;
}

.focus-list,
.work-list,
.collaboration-list,
.closing-note__items {
  display: grid;
  gap: 12px;
}

.focus-item {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 220px;
  gap: 16px;
  padding: 16px;
}

.focus-item__outcome,
.work-card__value,
.closing-note__value {
  font-size: 13px;
  line-height: 1.85;
  color: var(--resume-accent);
}

.timeline {
  display: grid;
  gap: 14px;
}

.timeline-item {
  display: grid;
  grid-template-columns: 110px minmax(0, 1fr);
  gap: 14px;
  padding: 16px;
  border: 1px solid var(--resume-line);
  border-radius: 7px;
  background: var(--resume-paper);
}

.timeline-item__phase {
  font-size: 12px;
  line-height: 1.4;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--resume-muted);
}

.timeline-item__list {
  margin-top: 12px;
  padding-left: 18px;
  display: grid;
  gap: 8px;
  font-size: 14px;
  line-height: 1.8;
}

.capability-card__tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 12px;
}

.capability-card__tags span {
  display: inline-flex;
  align-items: center;
  min-height: 30px;
  padding: 0 10px;
  border-radius: 999px;
  background: var(--resume-accent-soft);
  color: var(--resume-accent);
  font-size: 12px;
}

.work-card {
  padding: 16px;
  background: linear-gradient(180deg, #ffffff 0%, #fcfaf6 100%);
}

.work-card__head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
}

.work-card__role {
  display: inline-flex;
  align-items: center;
  min-height: 30px;
  padding: 0 10px;
  border-radius: 999px;
  border: 1px solid var(--resume-line);
  font-size: 12px;
  color: var(--resume-muted);
}

.page-split__grid {
  display: grid;
  grid-template-columns: minmax(0, 1.1fr) 250px;
  gap: 14px;
}

.closing-note {
  background: linear-gradient(180deg, #fbfaf6 0%, #f7f3eb 100%);
}

.closing-note__items {
  margin-top: 16px;
}

.closing-note__item {
  padding-top: 12px;
  border-top: 1px solid var(--resume-line);
}

.closing-note__value {
  margin-top: 6px;
}

@media (max-width: 1120px) {
  .resume-page {
    padding-top: 16px;
  }

  .resume-toolbar,
  .resume-nav,
  .resume-stack {
    width: calc(100vw - 24px);
  }

  .resume-toolbar {
    flex-direction: column;
    align-items: stretch;
  }

  .resume-sheet {
    width: 100%;
    min-height: auto;
    padding: 24px;
  }

  .hero-card,
  .strength-grid,
  .capability-grid,
  .page-split__grid,
  .focus-item,
  .timeline-item {
    grid-template-columns: 1fr;
  }
}

@media print {
  @page {
    size: A4;
    margin: 0;
  }

  .resume-page {
    padding: 0;
    background: #ffffff;
  }

  .resume-toolbar,
  .resume-nav {
    display: none;
  }

  .resume-stack {
    width: auto;
    margin: 0;
    gap: 0;
  }

  .resume-sheet {
    width: 210mm;
    min-height: 297mm;
    padding: 18mm 16mm;
    border: none;
    border-radius: 0;
    box-shadow: none;
    page-break-after: always;
    break-after: page;
  }

  .resume-sheet:last-child {
    page-break-after: auto;
    break-after: auto;
  }
}
</style>
