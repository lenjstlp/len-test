<template>
  <section
    class="grid gap-6 xl:grid-cols-[minmax(0,1.08fr)_minmax(320px,0.92fr)]"
  >
    <div class="space-y-6">
      <div class="surface-panel rounded-[32px] p-6 lg:p-7">
        <div class="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p class="text-xs tracking-[0.28em] text-[#d6c1a0] uppercase">
              Writing Desk
            </p>
            <h2 class="mt-2 text-3xl font-semibold text-white">写作现场</h2>
            <p class="mt-3 max-w-3xl text-sm leading-7 text-slate-300">
              这里用来公开站长的写作策略。目标不是追热点，而是持续沉淀那些能拉开技术差距的判断：系统边界、产品抽象、工程组织和
              AI 时代的人机协作。
            </p>
          </div>
          <span
            class="rounded-full border border-[#d6c1a0]/20 bg-[#d6c1a0]/10 px-3 py-1 text-xs text-[#e9dcc2]"
          >
            Ongoing Research
          </span>
        </div>

        <div class="mt-6 grid gap-4 lg:grid-cols-3">
          <article
            v-for="item in writingAngles"
            :key="item.title"
            class="rounded-[26px] border border-white/8 bg-white/[0.04] p-5"
          >
            <p class="text-xs tracking-[0.22em] text-slate-500 uppercase">
              {{ item.eyebrow }}
            </p>
            <h3 class="mt-3 text-lg font-semibold text-white">
              {{ item.title }}
            </h3>
            <p class="mt-3 text-sm leading-7 text-slate-300">
              {{ item.description }}
            </p>
          </article>
        </div>
      </div>

      <div class="surface-panel rounded-[32px] p-6 lg:p-7">
        <div class="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p class="text-xs tracking-[0.28em] text-[#d6c1a0] uppercase">
              Current Pipeline
            </p>
            <h3 class="mt-2 text-2xl font-semibold text-white">近期写作队列</h3>
          </div>
          <p class="max-w-xl text-sm leading-7 text-slate-400">
            站点的价值不靠一次性堆内容，而靠持续更新的结构化栏目。
          </p>
        </div>

        <div class="mt-6 grid gap-4">
          <article
            v-for="item in contentPipeline"
            :key="item.title"
            class="rounded-[28px] border border-white/8 bg-[rgba(255,255,255,0.03)] p-5"
          >
            <div class="flex flex-wrap items-center justify-between gap-3">
              <h4 class="text-lg font-semibold text-white">{{ item.title }}</h4>
              <span
                class="rounded-full border border-white/8 bg-white/5 px-3 py-1 text-xs text-slate-300"
              >
                {{ item.status }}
              </span>
            </div>
            <p class="mt-3 text-sm leading-7 text-slate-300">
              {{ item.summary }}
            </p>
            <div class="mt-4 flex flex-wrap gap-2">
              <span
                v-for="tag in item.tags"
                :key="tag"
                class="rounded-full border border-white/8 bg-white/[0.04] px-3 py-2 text-xs text-slate-300"
              >
                {{ tag }}
              </span>
            </div>
          </article>
        </div>
      </div>
    </div>

    <div class="space-y-6">
      <div class="surface-panel rounded-[32px] p-6">
        <p class="text-xs tracking-[0.28em] text-[#d6c1a0] uppercase">
          Writing Rules
        </p>
        <div class="mt-5 space-y-3">
          <article
            v-for="item in writingRules"
            :key="item.title"
            class="rounded-[24px] border border-white/8 bg-white/[0.04] px-4 py-4"
          >
            <h4 class="text-base font-semibold text-white">{{ item.title }}</h4>
            <p class="mt-2 text-sm leading-6 text-slate-300">
              {{ item.description }}
            </p>
          </article>
        </div>
      </div>

      <div class="surface-panel rounded-[32px] p-6">
        <p class="text-xs tracking-[0.28em] text-[#d6c1a0] uppercase">
          Reader Promise
        </p>
        <div class="mt-5 space-y-3">
          <article
            v-for="item in readerPromises"
            :key="item"
            class="rounded-[24px] border border-white/8 bg-white/[0.04] px-4 py-4 text-sm leading-6 text-slate-300"
          >
            {{ item }}
          </article>
        </div>
      </div>

      <div class="rounded-[32px] border border-[#d6c1a0]/15 bg-[#d6c1a0]/8 p-6">
        <p class="text-xs tracking-[0.28em] text-[#d6c1a0] uppercase">Tone</p>
        <p class="mt-3 text-sm leading-7 text-slate-100">
          文章会尽量写得像一个能带项目、能做系统的人在解释问题，而不是像“知识点搬运工”在背目录。
        </p>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const writingAngles = [
  {
    eyebrow: 'Angle 01',
    title: '架构不是库清单',
    description: '重点不是背诵工具，而是清楚系统分层、职责边界和演进顺序。',
  },
  {
    eyebrow: 'Angle 02',
    title: 'AI 前端要有产品质感',
    description: '真正好的 AI 界面需要交互秩序、信息密度控制和可信反馈机制。',
  },
  {
    eyebrow: 'Angle 03',
    title: '从前端走向完整交付',
    description: '写作会持续覆盖如何从界面开发升级到可独立交付整套系统。',
  },
];

const contentPipeline = [
  {
    title: '前端架构中的“可维护性”到底怎么设计',
    status: '构思中',
    summary:
      '不再泛泛而谈“可维护”，而是拆到目录结构、边界约束、依赖方向和协作成本。',
    tags: ['Architecture', 'Codebase Design', 'Scalability'],
  },
  {
    title: 'AI 产品为什么最容易做出“廉价感”',
    status: '调研中',
    summary:
      '分析信息堆叠、缺少交互秩序和反馈机制失衡，为什么会让产品失去高级感。',
    tags: ['AI UX', 'Product Thinking', 'Interaction'],
  },
  {
    title: '全栈能力里最容易被误解的三件事',
    status: '准备写作',
    summary:
      '回答“会一点后端算不算全栈”“技术栈如何取舍”“交付能力如何建立”这些关键问题。',
    tags: ['Fullstack', 'Engineering', 'Delivery'],
  },
];

const writingRules = [
  {
    title: '每篇文章都必须回答“所以你能拿来做什么”',
    description: '不写只有术语和空洞原则的内容，必须有可负责的事情作为落点。',
  },
  {
    title: '优先写判断密度高的话题',
    description:
      '实现细节会变化，但架构判断、协作设计和系统抽象更值得长期沉淀。',
  },
  {
    title: '保持设计感与技术感并存',
    description: '内容和界面都要体现审美，不做陈旧模板，也不做虚浮包装。',
  },
];

const readerPromises = [
  '读完后能知道一个能力模块在真实项目里承担什么责任。',
  '看到的不只是学习路线，还包括取舍逻辑和系统观。',
  '即便是入门主题，也会用专业站点应有的方式组织内容。',
];
</script>
