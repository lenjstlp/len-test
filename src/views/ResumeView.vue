<template>
  <section class="resume-page">
    <div class="resume-toolbar">
      <div class="resume-toolbar__intro">
        <p class="resume-toolbar__eyebrow">Resume</p>
        <h1 class="resume-toolbar__title">双版本简历</h1>
        <p class="resume-toolbar__text">
          保留医疗信息化与 WebGL 两个方向，内容压缩在两页 A4
          内，重点看技术栈、负责模块和实际开发细节。
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

    <div class="resume-switcher">
      <button
        v-for="variant in resumeVariants"
        :key="variant.key"
        type="button"
        class="resume-switcher__button"
        :class="variant.key === activeVersion ? 'is-active' : ''"
        @click="handleSwitchVersion(variant.key)"
      >
        <span>{{ variant.switchLabel }}</span>
        <small>{{ variant.switchHint }}</small>
      </button>
    </div>

    <div class="resume-stack">
      <article class="resume-sheet">
        <header class="resume-header">
          <div class="resume-header__identity">
            <p class="resume-header__name">LEN</p>
            <h2 class="resume-header__title">{{ activeResume.title }}</h2>
            <p class="resume-header__summary">{{ activeResume.summary }}</p>
          </div>

          <div class="resume-header__facts">
            <article
              v-for="item in activeResume.facts"
              :key="item.label"
              class="fact-card"
            >
              <p class="fact-card__label">{{ item.label }}</p>
              <p class="fact-card__value">{{ item.value }}</p>
            </article>
          </div>
        </header>

        <div class="resume-sheet__main">
          <aside class="resume-sidebar">
            <section class="resume-block">
              <div class="section-heading">
                <p class="section-heading__eyebrow">Positioning</p>
                <h3 class="section-heading__title">核心定位</h3>
              </div>

              <div class="strength-list">
                <article
                  v-for="item in activeResume.strengths"
                  :key="item.title"
                  class="strength-item"
                >
                  <h4 class="strength-item__title">{{ item.title }}</h4>
                  <p class="strength-item__text">{{ item.description }}</p>
                </article>
              </div>
            </section>

            <section class="resume-block">
              <div class="section-heading">
                <p class="section-heading__eyebrow">Stack</p>
                <h3 class="section-heading__title">技术栈</h3>
              </div>

              <div class="stack-list">
                <article
                  v-for="group in activeResume.stackGroups"
                  :key="group.title"
                  class="stack-card"
                >
                  <h4 class="stack-card__title">{{ group.title }}</h4>
                  <div class="tag-list">
                    <span v-for="tag in group.tags" :key="tag">{{ tag }}</span>
                  </div>
                </article>
              </div>
            </section>
          </aside>

          <div class="resume-content">
            <section class="resume-block">
              <div class="section-heading">
                <p class="section-heading__eyebrow">Experience</p>
                <h3 class="section-heading__title">经历概览</h3>
              </div>

              <div class="experience-list">
                <article
                  v-for="item in activeResume.experience"
                  :key="item.phase"
                  class="experience-item"
                >
                  <div class="experience-item__phase">{{ item.phase }}</div>
                  <div class="experience-item__body">
                    <h4 class="experience-item__title">{{ item.title }}</h4>
                    <p class="experience-item__summary">{{ item.summary }}</p>
                    <ul class="bullet-list">
                      <li v-for="detail in item.details" :key="detail">
                        {{ detail }}
                      </li>
                    </ul>
                  </div>
                </article>
              </div>
            </section>

            <section class="resume-block">
              <div class="section-heading">
                <p class="section-heading__eyebrow">Delivery</p>
                <h3 class="section-heading__title">我能直接负责的事</h3>
              </div>

              <div class="ownership-grid">
                <article
                  v-for="item in activeResume.ownership"
                  :key="item.title"
                  class="ownership-card"
                >
                  <h4 class="ownership-card__title">{{ item.title }}</h4>
                  <p class="ownership-card__text">{{ item.description }}</p>
                </article>
              </div>
            </section>
          </div>
        </div>
      </article>

      <article class="resume-sheet">
        <section class="resume-block">
          <div class="section-heading">
            <p class="section-heading__eyebrow">Projects</p>
            <h3 class="section-heading__title">代表项目与开发细节</h3>
          </div>

          <div class="project-list">
            <article
              v-for="item in activeResume.projects"
              :key="item.title"
              class="project-card"
            >
              <div class="project-card__head">
                <div>
                  <h4 class="project-card__title">{{ item.title }}</h4>
                  <p class="project-card__role">{{ item.role }}</p>
                </div>
                <p class="project-card__stack">{{ item.stack }}</p>
              </div>

              <p class="project-card__challenge">场景：{{ item.challenge }}</p>

              <ul class="bullet-list">
                <li v-for="detail in item.details" :key="detail">
                  {{ detail }}
                </li>
              </ul>

              <p class="project-card__result">结果：{{ item.result }}</p>
            </article>
          </div>
        </section>

        <div class="resume-sheet__footer">
          <section class="resume-block">
            <div class="section-heading">
              <p class="section-heading__eyebrow">Architecture</p>
              <h3 class="section-heading__title">架构与带队</h3>
            </div>

            <div class="summary-card">
              <ul class="bullet-list">
                <li v-for="item in activeResume.leadership" :key="item">
                  {{ item }}
                </li>
              </ul>
            </div>
          </section>

          <section class="resume-block">
            <div class="section-heading">
              <p class="section-heading__eyebrow">Fit</p>
              <h3 class="section-heading__title">岗位适配</h3>
            </div>

            <div class="fit-card">
              <h4 class="fit-card__title">{{ activeResume.fitTitle }}</h4>
              <p class="fit-card__summary">{{ activeResume.fitSummary }}</p>

              <div class="fit-card__list">
                <div
                  v-for="item in activeResume.fitPoints"
                  :key="item.label"
                  class="fit-card__item"
                >
                  <p class="fit-card__label">{{ item.label }}</p>
                  <p class="fit-card__value">{{ item.value }}</p>
                </div>
              </div>
            </div>
          </section>
        </div>
      </article>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { RouterLink, useRoute, useRouter } from 'vue-router';

type ResumeVariantKey = 'medical' | 'webgl';

type ResumeFact = {
  label: string;
  value: string;
};

type ResumeStrength = {
  title: string;
  description: string;
};

type ResumeStackGroup = {
  title: string;
  tags: string[];
};

type ResumeExperience = {
  phase: string;
  title: string;
  summary: string;
  details: string[];
};

type ResumeOwnership = {
  title: string;
  description: string;
};

type ResumeProject = {
  title: string;
  role: string;
  stack: string;
  challenge: string;
  details: string[];
  result: string;
};

type ResumeFitPoint = {
  label: string;
  value: string;
};

type ResumeVariant = {
  key: ResumeVariantKey;
  switchLabel: string;
  switchHint: string;
  title: string;
  summary: string;
  facts: ResumeFact[];
  strengths: ResumeStrength[];
  stackGroups: ResumeStackGroup[];
  experience: ResumeExperience[];
  ownership: ResumeOwnership[];
  projects: ResumeProject[];
  leadership: string[];
  fitTitle: string;
  fitSummary: string;
  fitPoints: ResumeFitPoint[];
};

const route = useRoute();
const router = useRouter();

const handleExportPdf = () => {
  window.print();
};

const resumeVariants: ResumeVariant[] = [
  {
    key: 'medical',
    switchLabel: '医疗信息化简历',
    switchHint: 'OnlyOffice / EMR / HIS / 前端架构',
    title: '前端架构师 / 医疗信息化方向',
    summary:
      '长期处理复杂业务前端，做过基于 OnlyOffice 的 EMR 与 HIS 相关系统，能同时承担前端架构、核心模块开发和 5 人左右团队协作推进。',
    facts: [
      {
        label: '核心方向',
        value: '医疗信息化 / 复杂业务系统 / 前端架构',
      },
      {
        label: '代表场景',
        value: 'EMR、HIS、病历编辑、复杂表单、权限流程',
      },
      {
        label: '团队经验',
        value: '带过 5 人左右开发小组',
      },
      {
        label: '交付方式',
        value: '方案设计 + 模块拆分 + 关键模块兜底',
      },
    ],
    strengths: [
      {
        title: '能做架构，不只做页面',
        description:
          '能把路由、状态流、组件边界、权限体系和工程规范收束成可维护结构。',
      },
      {
        title: '熟悉医疗场景复杂度',
        description:
          '理解病历编辑、表单联动、权限校验、流程节点和接口映射的实现难点。',
      },
      {
        title: '关键模块能自己下场',
        description:
          '编辑器集成、复杂页面状态、多人协作冲突点，能亲自收口并压住风险。',
      },
    ],
    stackGroups: [
      {
        title: '主技术栈',
        tags: ['Vue 3', 'TypeScript', 'Vite', 'Pinia', 'Element Plus'],
      },
      {
        title: '业务能力',
        tags: ['OnlyOffice', 'EMR', 'HIS', '复杂表单', '权限系统'],
      },
      {
        title: '工程能力',
        tags: ['前端架构', '模块拆分', '组件体系', '代码规范', '带队推进'],
      },
    ],
    experience: [
      {
        phase: '01',
        title: '复杂业务页面开发',
        summary: '从常规页面实现转向高状态密度和高耦合业务场景。',
        details: [
          '做过多字段联动、分权限展示、长流程页面。',
          '开始从页面实现转向系统结构设计。',
        ],
      },
      {
        phase: '02',
        title: 'OnlyOffice + EMR / HIS 项目落地',
        summary: '负责病历编辑器集成、业务字段映射和系统联动。',
        details: [
          '处理文档编辑状态与业务流程状态同步。',
          '打通病历内容、表单数据和业务模块之间的映射关系。',
        ],
      },
      {
        phase: '03',
        title: '承担前端架构与团队推进',
        summary: '负责方案统一、模块拆分、代码评审和复杂问题收口。',
        details: [
          '带过 5 人左右开发小组推进版本。',
          '关键模块自己兜底，避免多人协作把系统做乱。',
        ],
      },
    ],
    ownership: [
      {
        title: '复杂医疗模块设计',
        description: '病历页、复杂表单、权限流转、审核节点等高耦合模块。',
      },
      {
        title: '编辑器与业务系统集成',
        description:
          'OnlyOffice 接入、文档结构映射、业务字段回填和编辑状态管理。',
      },
      {
        title: '前端架构治理',
        description: '模块边界、状态收敛、组件复用和工程规范沉淀。',
      },
      {
        title: '多人协作推进',
        description: '任务拆分、风险识别、代码评审和交付节奏控制。',
      },
    ],
    projects: [
      {
        title: 'OnlyOffice 驱动的 EMR 病历系统',
        role: 'Frontend Architect / Core Module Owner',
        stack: 'Vue 3 / TypeScript / OnlyOffice / Pinia / Element Plus',
        challenge:
          '病历编辑既要有文档协同能力，又要和医疗业务字段、审核流程、权限控制保持一致。',
        details: [
          '负责编辑器接入、病历结构映射和业务字段联动方案。',
          '处理病历编辑状态、流程节点状态和页面权限之间的同步问题。',
          '拆分病历页模块，收敛高耦合状态，降低后续维护成本。',
        ],
        result: '把编辑器能力嵌进医疗业务流，而不是孤立做一个文档页面。',
      },
      {
        title: 'HIS 相关业务模块建设',
        role: 'Architecture Owner / Multi-module Delivery',
        stack: 'Vue 3 / TypeScript / Vite / 权限体系 / 复杂表单',
        challenge: '模块多、联动多、权限差异大，单纯堆页面很快就会失控。',
        details: [
          '设计页面结构和模块职责，控制表单、列表、审核模块之间的边界。',
          '统一状态管理和接口约定，减少多人协作中的联调混乱。',
          '负责复杂模块兜底与代码质量把关，保障版本可交付。',
        ],
        result: '让项目从“能跑”变成“能维护、能协作、能稳定迭代”。',
      },
    ],
    leadership: [
      '带过 5 人左右开发小组，负责拆任务、定方案、做评审和卡质量底线。',
      '能从业务复杂度、模块边界、交付节奏三个维度推进项目，而不是只盯单个页面。',
      '适合承担医疗信息化前端负责人、前端架构或复杂模块 Owner 角色。',
    ],
    fitTitle: '适合复杂医疗系统的前端架构与交付岗位',
    fitSummary:
      '我能处理的不只是页面产出，而是复杂业务系统里从架构设计到关键模块落地，再到多人协作推进的整套问题。',
    fitPoints: [
      {
        label: '技术栈关键词',
        value: 'Vue 3 / TypeScript / OnlyOffice / EMR / HIS',
      },
      {
        label: '直接可承担',
        value: '前端架构、病历系统核心模块、多人协作交付',
      },
      {
        label: '项目价值',
        value: '把高复杂度医疗前端做成可维护、可交付、可持续迭代的系统',
      },
    ],
  },
  {
    key: 'webgl',
    switchLabel: 'WebGL 地图简历',
    switchHint: 'WebGL / 地图渲染 / 高交互 / 前端架构',
    title: '前端架构师 / WebGL 地图方向',
    summary:
      '做过基于 WebGL 的地图项目，负责图层组织、空间交互与性能平衡，也能承担前端架构和 5 人左右团队推进，适合可视化与复杂交互并重的前端岗位。',
    facts: [
      {
        label: '核心方向',
        value: 'WebGL 地图 / 高交互前端 / 前端架构',
      },
      {
        label: '代表场景',
        value: '地图图层、空间交互、数据可视化、性能治理',
      },
      {
        label: '团队经验',
        value: '带过 5 人左右开发小组',
      },
      {
        label: '交付方式',
        value: '渲染实现 + 工程架构 + 团队推进并行',
      },
    ],
    strengths: [
      {
        title: '高交互项目不失控',
        description:
          '不仅关注视觉效果，也会约束状态、模块和协作边界，避免项目越做越乱。',
      },
      {
        title: '能处理地图与性能平衡',
        description: '做过图层组织、交互响应和渲染成本之间的工程权衡。',
      },
      {
        title: '适合带复杂前端团队',
        description:
          '架构、核心模块、交付节奏都能自己压住，不依赖单点英雄式开发。',
      },
    ],
    stackGroups: [
      {
        title: '主技术栈',
        tags: ['Vue 3', 'TypeScript', 'Vite', 'Pinia', 'Element Plus'],
      },
      {
        title: '图形与交互',
        tags: ['WebGL', '地图渲染', '图层管理', '空间交互', '性能优化'],
      },
      {
        title: '工程能力',
        tags: ['前端架构', '模块分层', '状态治理', '组件体系', '带队推进'],
      },
    ],
    experience: [
      {
        phase: '01',
        title: '高质量前端与复杂交互实现',
        summary: '从普通业务页面转向高信息密度、高交互复杂度的前端系统。',
        details: [
          '处理过大量状态切换和复杂界面联动。',
          '开始从交互实现上升到结构设计。',
        ],
      },
      {
        phase: '02',
        title: '基于 WebGL 的地图项目',
        summary: '负责地图图层、空间交互和视觉表现相关模块。',
        details: [
          '处理图层组织和空间交互逻辑。',
          '在表现力与渲染开销之间做工程取舍。',
        ],
      },
      {
        phase: '03',
        title: '承担架构与带队职责',
        summary: '负责方案统一、复杂模块兜底和多人协作推进。',
        details: [
          '带过 5 人左右开发小组。',
          '负责架构治理、代码评审和关键问题收口。',
        ],
      },
    ],
    ownership: [
      {
        title: '地图核心模块开发',
        description: '地图图层、交互事件、可视化叠加和场景化表现模块。',
      },
      {
        title: '复杂交互架构设计',
        description: '高交互页面的状态边界、模块层次和扩展方式设计。',
      },
      {
        title: '性能与体验平衡',
        description: '在渲染效果、响应速度和工程可维护性之间做合理取舍。',
      },
      {
        title: '团队交付推进',
        description: '方案统一、协作拆分、代码把关和关键问题收口。',
      },
    ],
    projects: [
      {
        title: '基于 WebGL 的地图项目',
        role: 'Frontend Architect / Visualization Engineering',
        stack: 'Vue 3 / TypeScript / WebGL / 地图图层 / 交互性能优化',
        challenge: '地图既要保证视觉表现，也要维持交互响应和后续扩展能力。',
        details: [
          '负责地图图层组织、空间交互逻辑和高表现力前端模块建设。',
          '梳理地图状态职责，避免图层、交互和业务数据混成一团。',
          '控制渲染表现与性能成本之间的平衡，保证项目可持续迭代。',
        ],
        result: '把地图能力做成可交付产品，而不是一次性的演示效果。',
      },
      {
        title: '复杂前端系统架构与团队推进',
        role: 'Architecture Owner / Team Lead',
        stack: 'Vue 3 / TypeScript / 模块分层 / 状态流治理 / 代码规范',
        challenge: '高交互项目一旦多人并行开发，很容易在结构和质量上迅速失控。',
        details: [
          '统一模块边界、状态流和代码规范，降低团队协作摩擦。',
          '负责复杂模块兜底，确保关键页面结构和交互方案稳定。',
          '通过评审与任务拆分控制系统增长速度，减少返工成本。',
        ],
        result: '让高表现力前端项目兼顾视觉效果、性能和工程稳定性。',
      },
    ],
    leadership: [
      '带过 5 人左右开发小组，负责拆分任务、统一方案、卡代码质量和收关键风险。',
      '做可视化项目时，不只关注酷炫效果，也关注长期维护和团队协作成本。',
      '适合承担可视化前端负责人、WebGL 地图核心岗位或前端架构角色。',
    ],
    fitTitle: '适合可视化与复杂交互并重的前端岗位',
    fitSummary:
      '如果项目既要视觉表现，也要工程结构和多人协作能力，我可以同时处理渲染交互、架构治理和交付推进三类问题。',
    fitPoints: [
      {
        label: '技术栈关键词',
        value: 'Vue 3 / TypeScript / WebGL / 地图渲染 / 性能优化',
      },
      {
        label: '直接可承担',
        value: '地图核心模块、可视化前端架构、复杂交互系统推进',
      },
      {
        label: '项目价值',
        value: '把高交互可视化项目做成可维护、可扩展、可持续交付的产品能力',
      },
    ],
  },
];

const resolveVersion = (value: unknown): ResumeVariantKey => {
  if (value === 'webgl') {
    return 'webgl';
  }

  return 'medical';
};

const activeVersion = computed<ResumeVariantKey>(() =>
  resolveVersion(route.query.version),
);

const activeResume = computed(
  () =>
    resumeVariants.find((item) => item.key === activeVersion.value) ??
    resumeVariants[0],
);

const handleSwitchVersion = (version: ResumeVariantKey) => {
  void router.replace({
    query: {
      ...route.query,
      version,
    },
  });
};
</script>

<style scoped>
.resume-page {
  --resume-paper: #ffffff;
  --resume-line: rgba(17, 24, 39, 0.1);
  --resume-line-strong: rgba(17, 24, 39, 0.16);
  --resume-title: #16202b;
  --resume-text: #475569;
  --resume-muted: #7c8796;
  --resume-accent: #556477;
  --resume-accent-soft: rgba(85, 100, 119, 0.1);
  padding: 24px 0 64px;
  color: var(--resume-text);
}

.resume-toolbar,
.resume-switcher,
.resume-stack {
  width: min(calc(210mm + 32px), calc(100vw - 32px));
  margin: 0 auto;
}

.resume-toolbar {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 20px;
  margin-bottom: 16px;
}

.resume-toolbar__eyebrow,
.section-heading__eyebrow,
.fact-card__label,
.resume-header__name,
.fit-card__label {
  font-size: 11px;
  line-height: 1.4;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--resume-muted);
}

.resume-toolbar__title {
  margin-top: 6px;
  font-size: 26px;
  line-height: 1.15;
  font-weight: 600;
  color: var(--resume-title);
}

.resume-toolbar__text {
  max-width: 640px;
  margin-top: 8px;
  font-size: 13px;
  line-height: 1.8;
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
  min-height: 40px;
  padding: 0 18px;
  border: 1px solid var(--resume-line);
  border-radius: 7px;
  background: #ffffff;
  color: var(--resume-title);
  font-size: 14px;
  font-weight: 500;
  text-decoration: none;
  cursor: pointer;
}

.resume-toolbar__button.is-dark {
  border-color: var(--resume-title);
  background: var(--resume-title);
  color: #ffffff;
}

.resume-switcher {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 12px;
  margin-bottom: 16px;
}

.resume-switcher__button {
  display: grid;
  gap: 6px;
  padding: 13px 15px;
  border: 1px solid var(--resume-line);
  border-radius: 7px;
  background: #ffffff;
  text-align: left;
  cursor: pointer;
}

.resume-switcher__button span {
  font-size: 14px;
  line-height: 1.5;
  font-weight: 600;
  color: var(--resume-title);
}

.resume-switcher__button small {
  font-size: 12px;
  line-height: 1.6;
  color: var(--resume-muted);
}

.resume-switcher__button.is-active {
  border-color: var(--resume-line-strong);
  background: #f8fafc;
}

.resume-stack {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
}

.resume-sheet {
  box-sizing: border-box;
  width: 210mm;
  height: 297mm;
  padding: 12mm;
  overflow: hidden;
  border: 1px solid rgba(15, 23, 42, 0.08);
  border-radius: 7px;
  background: #ffffff;
  box-shadow: 0 24px 60px rgba(15, 23, 42, 0.08);
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.resume-header {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 248px;
  gap: 14px;
  padding-bottom: 12px;
  border-bottom: 1px solid var(--resume-line);
}

.resume-header__title {
  margin-top: 8px;
  font-size: 27px;
  line-height: 1.12;
  letter-spacing: -0.03em;
  color: var(--resume-title);
}

.resume-header__summary {
  margin-top: 10px;
  font-size: 12px;
  line-height: 1.8;
}

.resume-header__facts {
  display: grid;
  gap: 8px;
}

.fact-card,
.strength-item,
.stack-card,
.experience-item,
.ownership-card,
.project-card,
.summary-card,
.fit-card {
  border: 1px solid var(--resume-line);
  border-radius: 7px;
  background: #ffffff;
}

.fact-card {
  padding: 10px 11px;
  background: #f8fafc;
}

.fact-card__value {
  margin-top: 6px;
  font-size: 13px;
  line-height: 1.55;
  font-weight: 600;
  color: var(--resume-title);
}

.resume-sheet__main {
  display: grid;
  grid-template-columns: 244px minmax(0, 1fr);
  gap: 12px;
  min-height: 0;
  flex: 1;
}

.resume-sidebar,
.resume-content {
  display: flex;
  flex-direction: column;
  gap: 12px;
  min-height: 0;
}

.resume-block {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.section-heading {
  display: flex;
  flex-direction: column;
  gap: 3px;
}

.section-heading__title {
  font-size: 18px;
  line-height: 1.2;
  font-weight: 600;
  color: var(--resume-title);
}

.strength-list,
.stack-list,
.experience-list,
.project-list {
  display: grid;
  gap: 8px;
}

.strength-item,
.stack-card,
.ownership-card,
.summary-card,
.fit-card {
  padding: 11px;
}

.strength-item__title,
.stack-card__title,
.experience-item__title,
.ownership-card__title,
.project-card__title,
.fit-card__title {
  font-size: 14px;
  line-height: 1.45;
  font-weight: 600;
  color: var(--resume-title);
}

.strength-item__text,
.experience-item__summary,
.ownership-card__text,
.fit-card__summary,
.project-card__role,
.project-card__challenge {
  margin-top: 6px;
  font-size: 11px;
  line-height: 1.75;
}

.tag-list {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-top: 8px;
}

.tag-list span {
  display: inline-flex;
  align-items: center;
  min-height: 24px;
  padding: 0 9px;
  border-radius: 999px;
  background: var(--resume-accent-soft);
  color: var(--resume-accent);
  font-size: 11px;
}

.experience-item {
  display: grid;
  grid-template-columns: 44px minmax(0, 1fr);
  gap: 10px;
  padding: 11px;
}

.experience-item__phase {
  font-size: 11px;
  line-height: 1.5;
  font-weight: 600;
  color: var(--resume-muted);
}

.bullet-list {
  margin: 8px 0 0;
  padding-left: 16px;
  display: grid;
  gap: 4px;
  font-size: 11px;
  line-height: 1.7;
  color: var(--resume-text);
}

.ownership-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 8px;
}

.project-card {
  padding: 12px;
}

.project-card__head {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 12px;
}

.project-card__stack {
  max-width: 250px;
  font-size: 11px;
  line-height: 1.65;
  text-align: right;
  color: var(--resume-muted);
}

.project-card__result,
.fit-card__value {
  margin-top: 8px;
  font-size: 11px;
  line-height: 1.75;
  color: var(--resume-accent);
}

.resume-sheet__footer {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 272px;
  gap: 12px;
}

.fit-card {
  background: #f8fafc;
}

.fit-card__list {
  display: grid;
  gap: 8px;
  margin-top: 10px;
}

.fit-card__item {
  padding-top: 8px;
  border-top: 1px solid var(--resume-line);
}

@media (max-width: 1120px) {
  .resume-page {
    padding-top: 16px;
  }

  .resume-toolbar,
  .resume-switcher,
  .resume-stack {
    width: calc(100vw - 24px);
  }

  .resume-toolbar {
    flex-direction: column;
    align-items: stretch;
  }

  .resume-switcher,
  .resume-header,
  .resume-sheet__main,
  .resume-sheet__footer,
  .ownership-grid {
    grid-template-columns: 1fr;
  }

  .resume-sheet {
    width: 100%;
    height: auto;
    min-height: auto;
    padding: 24px;
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
  .resume-switcher {
    display: none;
  }

  .resume-stack {
    width: auto;
    margin: 0;
    gap: 0;
  }

  .resume-sheet {
    width: 210mm;
    height: 297mm;
    padding: 12mm;
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
