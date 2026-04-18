<template>
  <section class="space-y-6">
    <div class="surface-panel overflow-hidden rounded-[36px]">
      <div
        class="grid gap-8 px-6 py-8 lg:grid-cols-[minmax(0,1.18fr)_minmax(320px,0.82fr)] lg:px-8 lg:py-10"
      >
        <div class="space-y-6">
          <span
            class="inline-flex rounded-full border border-[#d6c1a0]/20 bg-[#d6c1a0]/10 px-4 py-1 text-xs tracking-[0.32em] text-[#d6c1a0] uppercase"
          >
            Personal Tech Blog
          </span>

          <div class="space-y-4">
            <h2
              class="max-w-4xl text-3xl font-semibold tracking-tight text-white lg:text-5xl"
            >
              我把前端架构、全栈工程与 AI 产品交互整理成一个长期可读的知识系统。
            </h2>
            <p class="max-w-3xl text-sm leading-8 text-slate-300 lg:text-base">
              这里不是模板站，也不是碎片化笔记仓库。内容围绕复杂前端、系统抽象、工程治理和可交付产品展开，让访客在几分钟内就知道站长不仅会写代码，还能搭系统、定方向、做产品。
            </p>
          </div>

          <div class="flex flex-wrap gap-3">
            <RouterLink
              to="/resume"
              class="rounded-full border border-[#d6c1a0]/20 bg-[#d6c1a0]/12 px-5 py-3 text-sm font-medium text-[#f3e8d0] transition hover:bg-[#d6c1a0]/18"
            >
              查看个人简历
            </RouterLink>
            <RouterLink
              to="/frontend-architecture"
              class="rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm font-medium text-slate-100 transition hover:bg-white/10"
            >
              阅读前端架构模块
            </RouterLink>
          </div>

          <div class="grid gap-4 md:grid-cols-3">
            <article
              v-for="item in heroFacts"
              :key="item.label"
              class="rounded-[26px] border border-white/8 bg-white/[0.04] px-4 py-4"
            >
              <p class="text-xs tracking-[0.24em] text-slate-500 uppercase">
                {{ item.label }}
              </p>
              <p class="mt-3 text-2xl font-semibold text-white">
                {{ item.value }}
              </p>
              <p class="mt-3 text-sm leading-6 text-slate-300">
                {{ item.detail }}
              </p>
            </article>
          </div>
        </div>

        <div class="grid gap-4">
          <article
            v-for="item in authoritySignals"
            :key="item.title"
            class="stat-card rounded-[28px] px-5 py-5"
          >
            <p class="text-xs tracking-[0.24em] text-[#d6c1a0] uppercase">
              {{ item.eyebrow }}
            </p>
            <h3 class="mt-3 text-xl font-semibold text-white">
              {{ item.title }}
            </h3>
            <p class="mt-3 text-sm leading-7 text-slate-300">
              {{ item.description }}
            </p>
          </article>
        </div>
      </div>
    </div>

    <div class="grid gap-6 xl:grid-cols-[minmax(0,1fr)_360px]">
      <div class="space-y-6">
        <div class="surface-panel rounded-[32px] p-6 lg:p-7">
          <div class="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p class="text-xs tracking-[0.28em] text-[#d6c1a0] uppercase">
                Featured Columns
              </p>
              <h3 class="mt-2 text-2xl font-semibold text-white">代表栏目</h3>
            </div>
            <p class="max-w-xl text-sm leading-7 text-slate-400">
              用学习模块做博客栏目，让知识体系本身成为站长能力的展示方式。
            </p>
          </div>

          <div class="mt-6 grid gap-4 lg:grid-cols-2">
            <RouterLink
              v-for="item in featuredColumns"
              :key="item.path"
              :to="item.path"
              class="group rounded-[28px] border border-white/8 bg-[rgba(255,255,255,0.03)] p-5 transition hover:border-[#d6c1a0]/24 hover:bg-[rgba(255,255,255,0.05)]"
            >
              <p class="text-xs tracking-[0.24em] text-slate-500 uppercase">
                {{ item.eyebrow }}
              </p>
              <h4 class="mt-3 text-xl font-semibold text-white">
                {{ item.title }}
              </h4>
              <p class="mt-3 text-sm leading-7 text-slate-300">
                {{ item.description }}
              </p>
              <p
                class="mt-4 text-sm font-medium text-[#e8dcc4] transition group-hover:translate-x-1"
              >
                进入栏目
              </p>
            </RouterLink>
          </div>
        </div>

        <div class="surface-panel rounded-[32px] p-6 lg:p-7">
          <div class="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p class="text-xs tracking-[0.28em] text-[#d6c1a0] uppercase">
                Editorial Principles
              </p>
              <h3 class="mt-2 text-2xl font-semibold text-white">内容方法论</h3>
            </div>
            <p class="max-w-xl text-sm leading-7 text-slate-400">
              好的技术博客不是复制文档，而是把复杂问题整理成可迁移的判断结构。
            </p>
          </div>

          <div class="mt-6 grid gap-4 lg:grid-cols-3">
            <article
              v-for="item in editorialPrinciples"
              :key="item.title"
              class="rounded-[26px] border border-white/8 bg-[rgba(255,255,255,0.03)] p-5"
            >
              <h4 class="text-lg font-semibold text-white">{{ item.title }}</h4>
              <p class="mt-3 text-sm leading-7 text-slate-300">
                {{ item.description }}
              </p>
            </article>
          </div>
        </div>
      </div>

      <div class="space-y-6">
        <div class="surface-panel rounded-[32px] p-6">
          <p class="text-xs tracking-[0.28em] text-[#d6c1a0] uppercase">
            Why This Site Feels Strong
          </p>
          <div class="mt-5 space-y-3">
            <article
              v-for="item in proofSignals"
              :key="item.title"
              class="rounded-[24px] border border-white/8 bg-white/[0.04] px-4 py-4"
            >
              <h4 class="text-base font-semibold text-white">
                {{ item.title }}
              </h4>
              <p class="mt-2 text-sm leading-6 text-slate-300">
                {{ item.description }}
              </p>
            </article>
          </div>
        </div>

        <div
          class="rounded-[32px] border border-[#d6c1a0]/15 bg-[#d6c1a0]/8 p-6"
        >
          <p class="text-xs tracking-[0.28em] text-[#d6c1a0] uppercase">
            Positioning
          </p>
          <p class="mt-3 text-sm leading-7 text-slate-100">
            这个站点的目标不是“看起来学了很多”，而是让人一眼感受到站长具备复杂系统的建模能力、交付意识和审美判断。
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router';

const heroFacts = [
  {
    label: '内容方向',
    value: '前端 / 全栈 / AI',
    detail: '从界面实现一路写到系统边界、工程组织与产品能力。',
  },
  {
    label: '输出风格',
    value: '判断 > 堆概念',
    detail: '强调结构、边界和真实交付，而不是简单罗列术语。',
  },
  {
    label: '站点定位',
    value: '技术作者主页',
    detail: '既能做作品集，也能承载长期写作与职业信誉。',
  },
];

const authoritySignals = [
  {
    eyebrow: 'Architecture',
    title: '会搭系统，不只会拼页面',
    description:
      '内容从路由、权限、信息结构一路延伸到前端架构与支持库职责，不停留在组件层。',
  },
  {
    eyebrow: 'Delivery',
    title: '关注最终交付，不沉迷概念表演',
    description:
      '每个模块都强调“掌握后能干什么”，把技术学习和可落地结果直接绑定。',
  },
  {
    eyebrow: 'AI Product',
    title: '懂 AI 时代的人机交互与工作流',
    description:
      '除了工程能力，也关注 agent、AI 产品界面和未来协作方式的变化。',
  },
];

const featuredColumns = [
  {
    path: '/resume',
    eyebrow: 'Resume',
    title: '个人简历',
    description: '用一页完整展示能力矩阵、代表经历、合作风格和系统视角。',
  },
  {
    path: '/frontend-architecture',
    eyebrow: 'Column 01',
    title: '前端架构能力地图',
    description: '把前端真正需要掌握的模块拆开讲，直接对应可负责的事情。',
  },
  {
    path: '/fullstack-guide',
    eyebrow: 'Column 02',
    title: '全栈能力汇总',
    description: '从语言路线、服务端能力到交付方式，搭出完整升级路径。',
  },
  {
    path: '/agent-guide',
    eyebrow: 'Column 03',
    title: 'Agent 与 AI 应用视角',
    description: '梳理 agent 是什么、如何开发，以及市场产品格局的变化。',
  },
  {
    path: '/nextjs-guide',
    eyebrow: 'Column 04',
    title: 'Next.js 现代 Web 路线',
    description: '从 App Router 到生产部署，整理现代 React 应用的主流路径。',
  },
  {
    path: '/globe',
    eyebrow: 'Interactive',
    title: '星球留言实验',
    description: '用视觉交互表达全球留言与内容热度，是站点中的互动型作品。',
  },
];

const editorialPrinciples = [
  {
    title: '先讲系统，再讲工具',
    description: '读者先理解边界与职责，才能知道每个框架和支持库的真实位置。',
  },
  {
    title: '先讲结果，再讲学习',
    description: '每个主题都对应未来能独立承担的工作，不写脱离交付的抽象空话。',
  },
  {
    title: '先讲判断，再讲实现',
    description: '实现会被 AI 加速，但判断、架构、取舍和表达是更稳定的价值。',
  },
];

const proofSignals = [
  {
    title: '菜单结构直接反映内容结构',
    description: '站点的信息架构本身就是能力展示，不是随意堆页面。',
  },
  {
    title: '学习模块像栏目，不像文档搬运',
    description: '每个专题都带有清晰主题和独立视觉，而不是统一模板复刻。',
  },
  {
    title: '作品、简历、观察形成闭环',
    description: '既有“做过什么”，也有“怎么想”和“为什么这样做”。',
  },
];
</script>
