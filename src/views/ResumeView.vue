<template>
  <section class="resume-page overflow-hidden rounded-[36px] border">
    <div
      class="sticky top-0 z-10 border-b border-[var(--resume-line)] bg-[rgba(243,238,229,0.9)] px-6 py-4 backdrop-blur lg:px-10"
    >
      <div class="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p
            class="text-xs tracking-[0.24em] text-[var(--resume-muted)] uppercase"
          >
            Resume Landing Page
          </p>
          <p class="mt-1 text-sm leading-6 text-[var(--resume-copy)]">
            用一页说明站长的能力结构、交付方式与技术定位。
          </p>
        </div>

        <div class="flex flex-wrap items-center gap-2">
          <RouterLink
            to="/dashboard"
            class="rounded-full border border-[var(--resume-ink)] bg-[var(--resume-ink)] px-4 py-2 text-sm font-medium text-[var(--resume-paper)] transition hover:bg-[#2d3137]"
          >
            返回首页
          </RouterLink>

          <RouterLink
            v-for="item in siblingEntries"
            :key="item.path"
            :to="item.path"
            class="rounded-full border border-[var(--resume-line)] bg-[var(--resume-card)] px-4 py-2 text-sm font-medium text-[var(--resume-copy)] transition hover:border-[var(--resume-accent)] hover:bg-white"
          >
            {{ item.label }}
          </RouterLink>
        </div>
      </div>
    </div>

    <div
      class="border-b border-[var(--resume-line)] px-6 py-8 lg:px-10 lg:py-10"
    >
      <div class="grid gap-8 xl:grid-cols-[minmax(0,1.2fr)_360px]">
        <div>
          <span
            class="inline-flex rounded-full border border-[var(--resume-accent-soft)] bg-[var(--resume-accent-fog)] px-4 py-1 text-xs font-medium tracking-[0.24em] text-[var(--resume-accent)] uppercase"
          >
            Len / Systems-minded Engineer
          </span>
          <h1
            class="mt-4 max-w-4xl text-4xl font-semibold tracking-tight text-[var(--resume-title)]"
          >
            我擅长把复杂的前端、全栈和 AI 产品问题，整理成可交付的系统。
          </h1>
          <p
            class="mt-4 max-w-4xl text-base leading-8 text-[var(--resume-copy)]"
          >
            这页简历不强调堆技术名词，而强调三个层面：我能把什么做成、我如何组织系统、以及我在团队里如何提升整体交付质量。对需要复杂前台、技术内容产品、AI
            交互体验或工程升级的人来说，这些比“会什么框架”更重要。
          </p>
        </div>

        <div
          class="rounded-[30px] border border-[var(--resume-line)] bg-[var(--resume-card)] p-5"
        >
          <p
            class="text-xs tracking-[0.24em] text-[var(--resume-muted)] uppercase"
          >
            Snapshot
          </p>
          <div class="mt-5 space-y-3">
            <article
              v-for="item in profileSnapshot"
              :key="item.label"
              class="rounded-[22px] border border-[var(--resume-line)] bg-[var(--resume-pane)] px-4 py-4"
            >
              <p
                class="text-xs tracking-[0.22em] text-[var(--resume-muted)] uppercase"
              >
                {{ item.label }}
              </p>
              <p class="mt-2 text-lg font-semibold text-[var(--resume-title)]">
                {{ item.value }}
              </p>
              <p class="mt-2 text-sm leading-6 text-[var(--resume-copy)]">
                {{ item.detail }}
              </p>
            </article>
          </div>
        </div>
      </div>

      <div class="mt-8 grid gap-4 xl:grid-cols-3">
        <article
          v-for="item in signatureStrengths"
          :key="item.title"
          class="rounded-[28px] border border-[var(--resume-line)] bg-[var(--resume-card)] p-5"
        >
          <p
            class="text-xs tracking-[0.24em] text-[var(--resume-muted)] uppercase"
          >
            {{ item.eyebrow }}
          </p>
          <h2 class="mt-3 text-2xl font-semibold text-[var(--resume-title)]">
            {{ item.title }}
          </h2>
          <p class="mt-3 text-sm leading-7 text-[var(--resume-copy)]">
            {{ item.description }}
          </p>
        </article>
      </div>
    </div>

    <div class="px-6 py-8 lg:px-10 lg:py-10">
      <div class="grid gap-6 xl:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)]">
        <section
          class="rounded-[32px] border border-[var(--resume-line)] bg-[var(--resume-card)] p-6 lg:p-7"
        >
          <p
            class="text-xs tracking-[0.24em] text-[var(--resume-muted)] uppercase"
          >
            Experience Direction
          </p>
          <h2 class="mt-2 text-3xl font-semibold text-[var(--resume-title)]">
            代表经历与职业重心
          </h2>

          <div class="mt-6 space-y-4">
            <article
              v-for="item in experienceTimeline"
              :key="item.phase"
              class="rounded-[26px] border border-[var(--resume-line)] bg-[var(--resume-pane)] p-5"
            >
              <p
                class="text-xs tracking-[0.22em] text-[var(--resume-muted)] uppercase"
              >
                {{ item.phase }}
              </p>
              <h3 class="mt-2 text-xl font-semibold text-[var(--resume-title)]">
                {{ item.title }}
              </h3>
              <p class="mt-3 text-sm leading-7 text-[var(--resume-copy)]">
                {{ item.summary }}
              </p>
              <ul
                class="mt-4 space-y-3 text-sm leading-7 text-[var(--resume-copy)]"
              >
                <li
                  v-for="detail in item.details"
                  :key="detail"
                  class="rounded-[18px] border border-[var(--resume-line)] bg-[var(--resume-paper)] px-4 py-3"
                >
                  {{ detail }}
                </li>
              </ul>
            </article>
          </div>
        </section>

        <section
          class="rounded-[32px] border border-[var(--resume-line)] bg-[var(--resume-pane)] p-6 lg:p-7"
        >
          <p
            class="text-xs tracking-[0.24em] text-[var(--resume-muted)] uppercase"
          >
            Capability Matrix
          </p>
          <h2 class="mt-2 text-3xl font-semibold text-[var(--resume-title)]">
            能力矩阵
          </h2>

          <div class="mt-6 space-y-4">
            <article
              v-for="item in capabilityMatrix"
              :key="item.title"
              class="rounded-[24px] border border-[var(--resume-line)] bg-[var(--resume-paper)] p-5"
            >
              <h3 class="text-xl font-semibold text-[var(--resume-title)]">
                {{ item.title }}
              </h3>
              <p class="mt-3 text-sm leading-7 text-[var(--resume-copy)]">
                {{ item.description }}
              </p>
              <div class="mt-4 flex flex-wrap gap-2">
                <span
                  v-for="tag in item.tags"
                  :key="tag"
                  class="rounded-full border border-[var(--resume-line)] bg-[var(--resume-card)] px-3 py-2 text-sm text-[var(--resume-copy)]"
                >
                  {{ tag }}
                </span>
              </div>
            </article>
          </div>
        </section>
      </div>

      <div class="mt-10 grid gap-6 xl:grid-cols-[minmax(0,1.1fr)_360px]">
        <section
          class="rounded-[32px] border border-[var(--resume-line)] bg-[var(--resume-card)] p-6 lg:p-7"
        >
          <div class="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p
                class="text-xs tracking-[0.24em] text-[var(--resume-muted)] uppercase"
              >
                Selected Work
              </p>
              <h2
                class="mt-2 text-3xl font-semibold text-[var(--resume-title)]"
              >
                能拿得出手的代表项目
              </h2>
            </div>
            <p class="max-w-xl text-sm leading-7 text-[var(--resume-copy)]">
              关注的不只是“做过什么”，更是这些项目证明了什么能力。
            </p>
          </div>

          <div class="mt-6 grid gap-4">
            <article
              v-for="item in selectedWorks"
              :key="item.title"
              class="rounded-[26px] border border-[var(--resume-line)] bg-[var(--resume-pane)] p-5"
            >
              <div class="flex flex-wrap items-center justify-between gap-3">
                <h3 class="text-xl font-semibold text-[var(--resume-title)]">
                  {{ item.title }}
                </h3>
                <span
                  class="rounded-full border border-[var(--resume-line)] bg-[var(--resume-paper)] px-3 py-1 text-xs text-[var(--resume-copy)]"
                >
                  {{ item.role }}
                </span>
              </div>
              <p class="mt-3 text-sm leading-7 text-[var(--resume-copy)]">
                {{ item.summary }}
              </p>
              <p
                class="mt-4 text-sm leading-7 text-[var(--resume-accent-deep)]"
              >
                价值：{{ item.value }}
              </p>
            </article>
          </div>
        </section>

        <section
          class="rounded-[32px] border border-[var(--resume-line-strong)] bg-[var(--resume-ink)] p-6 text-[var(--resume-paper)] lg:p-7"
        >
          <p class="text-xs tracking-[0.24em] text-[#b8bebf] uppercase">
            Collaboration Style
          </p>
          <h2 class="mt-2 text-3xl font-semibold text-[var(--resume-paper)]">
            合作方式
          </h2>

          <div class="mt-6 space-y-4">
            <article
              v-for="item in collaborationStyle"
              :key="item.title"
              class="rounded-[24px] border border-white/8 bg-white/5 p-4"
            >
              <h3 class="text-lg font-semibold text-[var(--resume-paper)]">
                {{ item.title }}
              </h3>
              <p class="mt-2 text-sm leading-7 text-[#d6d9da]">
                {{ item.description }}
              </p>
            </article>
          </div>
        </section>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { RouterLink, useRoute } from 'vue-router';
import { getNavigationMenusFromRoutes, isMenuGroup } from '@/router/permission';

const route = useRoute();

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
    .slice(0, 4),
);

const profileSnapshot = [
  {
    label: '核心定位',
    value: '前端架构 / 全栈交付 / AI 产品界面',
    detail: '能从界面、信息结构、工程组织一路推进到产品落地。',
  },
  {
    label: '擅长问题',
    value: '复杂系统的结构化整理',
    detail: '把混乱需求拆成模块、规则和长期可维护的实现路径。',
  },
  {
    label: '工作风格',
    value: '克制、直接、强调结果',
    detail: '关注最终成品的专业感，同时保持工程结构的清晰与稳定。',
  },
];

const signatureStrengths = [
  {
    eyebrow: 'Strength 01',
    title: '会做复杂前台，也会管整体结构',
    description:
      '不仅能完成界面开发，还能从路由、模块边界、信息组织和交互节奏上提升整个产品的质量。',
  },
  {
    eyebrow: 'Strength 02',
    title: '能把技术内容做成产品',
    description:
      '擅长把零散知识重构成栏目、专题和能力地图，让内容系统本身具备产品力。',
  },
  {
    eyebrow: 'Strength 03',
    title: '对 AI 时代的前端有自己的判断',
    description:
      '理解 agent、AI 界面、工作流协作和未来前端价值迁移，不停留在表面热点。',
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
      '开始从单点需求切换到完整交付视角，关注业务模块关系、发布节奏和可持续演进。',
    details: [
      '能把需求抽象成模块和规则，而不是只完成单页开发。',
      '理解团队协作中接口、内容、设计与工程之间的衔接。',
    ],
  },
  {
    phase: 'Phase 03',
    title: '进入 AI 产品与全栈能力延展',
    summary:
      '持续关注 agent、AI 应用前台以及从前端走向完整系统交付的升级路径。',
    details: [
      '能识别哪些价值会被 AI 压缩，哪些能力会被放大。',
      '把技术学习组织成路线图，而不是随机补点式成长。',
    ],
  },
];

const capabilityMatrix = [
  {
    title: '前端架构',
    description:
      '擅长前端项目的信息结构、模块分层、路由组织、可维护性与长期演进方案。',
    tags: [
      'Route Design',
      'Module Boundaries',
      'UI Systems',
      'Maintainability',
    ],
  },
  {
    title: '产品交互',
    description:
      '关注界面高级感、信息密度、节奏控制和复杂交互的自然体验，避免廉价模板感。',
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
      '能把复杂知识拆成明确结构，用教程、专题与作品页建立长期职业信誉。',
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
    title: '个人技术博客系统改造',
    role: 'Information Architecture / Frontend Design',
    summary:
      '将原始模板式项目改造成具有个人品牌、专题栏目、作品展示和独立简历的技术博客。',
    value: '证明了从信息结构到视觉气质的整体控制能力。',
  },
  {
    title: '全球留言地球交互页',
    role: 'Interactive Frontend',
    summary:
      '围绕地球仪、头像水滴、缩放层级和 tip 展示规则构建互动表达，兼顾性能与视觉呈现。',
    value: '体现出复杂交互设计、性能约束下的实现判断和审美控制。',
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
      '不依赖过度细碎的任务切分，能够自己梳理结构、发现关键路径并推进落地。',
  },
  {
    title: '会主动提出更优解',
    description:
      '如果发现当前做法只是能跑但不够好，会明确指出结构问题并给出更合理的实现方式。',
  },
  {
    title: '重视完成度与职业感',
    description:
      '不仅关心代码是否可用，也关心产品是否显得专业、信息是否清楚、用户是否能感受到质量。',
  },
];
</script>

<style scoped>
.resume-page {
  --resume-paper: #fbfaf7;
  --resume-base: #f3eee5;
  --resume-card: rgba(255, 255, 255, 0.74);
  --resume-pane: #efeadf;
  --resume-line: rgba(40, 44, 51, 0.1);
  --resume-line-strong: rgba(40, 44, 51, 0.16);
  --resume-title: #23272d;
  --resume-copy: #4d5660;
  --resume-muted: #7c838a;
  --resume-ink: #252a31;
  --resume-accent: #7f6d56;
  --resume-accent-deep: #6d5d48;
  --resume-accent-soft: rgba(127, 109, 86, 0.18);
  --resume-accent-fog: rgba(127, 109, 86, 0.08);
  background:
    radial-gradient(
      circle at top left,
      rgba(255, 255, 255, 0.5),
      transparent 32%
    ),
    linear-gradient(180deg, #f8f4ed 0%, #f2ede3 54%, #ebe5da 100%);
  border-color: var(--resume-line);
  box-shadow: 0 28px 80px rgba(24, 28, 32, 0.14);
  color: var(--resume-copy);
}
</style>
