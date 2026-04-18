<template>
  <section class="space-y-14 text-[#23272d]">
    <header class="border-b border-black/8 pb-10">
      <p class="text-[11px] tracking-[0.34em] text-[#8d7557] uppercase">
        Writing Studio
      </p>
      <div class="mt-4 grid gap-8 xl:grid-cols-[minmax(0,1.15fr)_320px]">
        <div>
          <h1
            class="max-w-4xl text-4xl leading-[1.12] font-semibold text-[#171b21] lg:text-6xl"
          >
            写作现场不是待办列表，而是站长如何构建长期知识资产的地方。
          </h1>
          <p class="mt-6 max-w-3xl text-base leading-8 text-[#5f6772]">
            这里不追求日更和热闹，而是围绕那些真正能拉开差距的问题持续积累：前端如何成为系统能力，AI
            产品如何避免廉价感，技术内容如何从教程升级成方法论。
          </p>
        </div>

        <aside class="rounded-[30px] border border-black/8 bg-white/55 p-6">
          <p class="text-[11px] tracking-[0.28em] text-[#8c8580] uppercase">
            当前原则
          </p>
          <div class="mt-5 space-y-3">
            <article
              v-for="item in writingRules"
              :key="item.title"
              class="border-b border-black/8 pb-3 last:border-b-0 last:pb-0"
            >
              <h2 class="text-base font-semibold text-[#171b21]">
                {{ item.title }}
              </h2>
              <p class="mt-2 text-sm leading-7 text-[#5f6772]">
                {{ item.description }}
              </p>
            </article>
          </div>
        </aside>
      </div>
    </header>

    <section class="grid gap-8 xl:grid-cols-3">
      <article
        v-for="item in writingAngles"
        :key="item.title"
        class="rounded-[30px] border border-black/8 bg-white/50 p-6"
      >
        <p class="text-[11px] tracking-[0.28em] text-[#8d7557] uppercase">
          {{ item.eyebrow }}
        </p>
        <h2 class="mt-4 text-2xl font-semibold text-[#171b21]">
          {{ item.title }}
        </h2>
        <p class="mt-4 text-sm leading-7 text-[#5f6772]">
          {{ item.description }}
        </p>
      </article>
    </section>

    <section class="border-t border-black/8 pt-12">
      <div class="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p class="text-[11px] tracking-[0.3em] text-[#8d7557] uppercase">
            Pipeline
          </p>
          <h2 class="mt-3 text-3xl font-semibold text-[#171b21]">
            正在形成中的文章
          </h2>
        </div>
        <p class="max-w-md text-sm leading-7 text-[#6a717c]">
          所有主题都要求能落到真实场景，不做只适合收藏、不能用于工作的文章。
        </p>
      </div>

      <div class="mt-6 divide-y divide-black/8">
        <article
          v-for="item in contentPipeline"
          :key="item.title"
          class="grid gap-4 py-6 lg:grid-cols-[180px_minmax(0,1fr)_240px]"
        >
          <p class="text-sm text-[#8b7557]">{{ item.status }}</p>
          <div>
            <h3 class="text-2xl font-semibold text-[#171b21]">
              {{ item.title }}
            </h3>
            <p class="mt-3 text-sm leading-7 text-[#5f6772]">
              {{ item.summary }}
            </p>
          </div>
          <div class="flex flex-wrap gap-2 lg:justify-end">
            <span
              v-for="tag in item.tags"
              :key="tag"
              class="rounded-full border border-black/10 bg-white/60 px-3 py-2 text-xs text-[#5f6772]"
            >
              {{ tag }}
            </span>
          </div>
        </article>
      </div>
    </section>
  </section>
</template>

<script setup lang="ts">
const writingAngles = [
  {
    eyebrow: 'Angle 01',
    title: '架构应该讲边界，不该只讲工具',
    description: '写作会先解决“这一层到底负责什么”，再谈对应的框架和支持库。',
  },
  {
    eyebrow: 'Angle 02',
    title: 'AI 产品要有可信的界面秩序',
    description:
      '再强的模型，如果前台界面失控、信息堆叠、反馈混乱，用户也不会觉得专业。',
  },
  {
    eyebrow: 'Angle 03',
    title: '全栈成长要以完整交付为目标',
    description:
      '不是多学几个名词，而是逐步具备把一个系统真正做完、上线、维护下去的能力。',
  },
];

const writingRules = [
  {
    title: '每篇都必须回答“所以呢”',
    description: '写完后读者应该知道这项能力在项目里到底能承担什么责任。',
  },
  {
    title: '优先写能长期成立的问题',
    description: '系统结构、产品判断和组织方式，比短期版本细节更值得沉淀。',
  },
  {
    title: '让内容本身带有审美',
    description:
      '技术文章也应该有节奏、有层级、有好的阅读体验，而不是粗暴堆字。',
  },
];

const contentPipeline = [
  {
    title: '为什么很多“前端架构文章”其实只是工具清单',
    status: '构思中',
    summary:
      '把“架构”这个词拆开，解释什么才算真实的结构能力，什么只是表层工具认知。',
    tags: ['Architecture', 'Boundaries', 'System Design'],
  },
  {
    title: 'AI 前端为什么最容易做得廉价',
    status: '调研中',
    summary:
      '从信息密度、交互反馈和视觉秩序分析为什么很多 AI 产品虽然能用，但看起来很便宜。',
    tags: ['AI UX', 'Product Design', 'Interaction'],
  },
  {
    title: '全栈路线里最容易产生误解的几个节点',
    status: '准备写作',
    summary:
      '集中回答“会一点后端是不是全栈”“如何选主路线”“什么时候该补部署和数据库”这些问题。',
    tags: ['Fullstack', 'Career', 'Delivery'],
  },
];
</script>
