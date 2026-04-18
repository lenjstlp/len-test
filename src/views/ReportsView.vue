<template>
  <section class="space-y-6">
    <div class="grid gap-4 md:grid-cols-3">
      <article
        v-for="item in headlineMetrics"
        :key="item.label"
        class="stat-card rounded-[28px] px-5 py-5"
      >
        <p class="text-xs tracking-[0.25em] text-slate-500 uppercase">
          {{ item.label }}
        </p>
        <p class="mt-3 text-3xl font-semibold text-white">{{ item.value }}</p>
        <p class="mt-3 text-sm leading-6 text-[#e4d6bd]">{{ item.detail }}</p>
      </article>
    </div>

    <div class="surface-panel rounded-[32px] p-6 lg:p-7">
      <div class="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p class="text-xs tracking-[0.28em] text-[#d6c1a0] uppercase">
            Notes & Signals
          </p>
          <h2 class="mt-2 text-3xl font-semibold text-white">观察笔记</h2>
          <p class="mt-3 max-w-3xl text-sm leading-7 text-slate-300">
            这里记录的不是新闻摘要，而是长期成立的判断。好的技术站点应该有自己的观点系统，否则再漂亮也只是一层皮。
          </p>
        </div>
        <span
          class="rounded-full border border-[#d6c1a0]/20 bg-[#d6c1a0]/10 px-3 py-1 text-xs text-[#eadfc9]"
        >
          Long-term View
        </span>
      </div>

      <div class="mt-6 grid gap-4">
        <article
          v-for="item in noteDeck"
          :key="item.title"
          class="rounded-[28px] border border-white/8 bg-[rgba(255,255,255,0.03)] p-5"
        >
          <div class="flex flex-wrap items-center justify-between gap-3">
            <h3 class="text-xl font-semibold text-white">{{ item.title }}</h3>
            <span
              class="rounded-full border border-white/8 bg-white/5 px-3 py-1 text-xs text-slate-300"
            >
              {{ item.tag }}
            </span>
          </div>
          <p class="mt-3 text-sm leading-7 text-slate-300">
            {{ item.summary }}
          </p>
          <p class="mt-4 text-sm leading-7 text-[#e4d6bd]">
            结论：{{ item.conclusion }}
          </p>
        </article>
      </div>
    </div>

    <div class="grid gap-6 xl:grid-cols-[minmax(0,1fr)_360px]">
      <div class="surface-panel rounded-[32px] p-6 lg:p-7">
        <p class="text-xs tracking-[0.28em] text-[#d6c1a0] uppercase">
          Opinion Stack
        </p>
        <h3 class="mt-2 text-2xl font-semibold text-white">核心立场</h3>

        <div class="mt-6 grid gap-4 lg:grid-cols-3">
          <article
            v-for="item in opinionStack"
            :key="item.title"
            class="rounded-[26px] border border-white/8 bg-white/[0.04] p-5"
          >
            <h4 class="text-lg font-semibold text-white">{{ item.title }}</h4>
            <p class="mt-3 text-sm leading-7 text-slate-300">
              {{ item.description }}
            </p>
          </article>
        </div>
      </div>

      <div class="surface-panel rounded-[32px] p-6">
        <p class="text-xs tracking-[0.28em] text-[#d6c1a0] uppercase">
          Tone Guide
        </p>
        <div class="mt-5 space-y-3">
          <article
            v-for="item in toneGuide"
            :key="item"
            class="rounded-[24px] border border-white/8 bg-white/[0.04] px-4 py-4 text-sm leading-6 text-slate-300"
          >
            {{ item }}
          </article>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const headlineMetrics = [
  {
    label: '长期关注',
    value: '04',
    detail: '架构、全栈、AI 产品、交付方法',
  },
  {
    label: '内容立场',
    value: '判断优先',
    detail: '不迷信概念表演，更看重边界、取舍与结果。',
  },
  {
    label: '站点语气',
    value: '克制但锋利',
    detail: '保持审美与表达密度，不做浮夸包装。',
  },
];

const noteDeck = [
  {
    title: 'AI 提高了“系统设计能力”的含金量',
    tag: 'AI + Engineering',
    summary:
      '越是能被模型自动补全的实现细节，越说明真正稀缺的是结构化思考、模块切分和工作流设计。',
    conclusion:
      '未来真正值钱的不是“写得快”，而是能定义系统、约束系统并让团队稳定协作。',
  },
  {
    title: '全栈不是“前后端都沾一点”',
    tag: 'Fullstack',
    summary:
      '全栈的关键在于你能不能独立负责完整交付链路，而不是知道几个框架的名字。',
    conclusion:
      '如果没有数据、服务、部署和协作视角，只能算扩展型前端，不能算完整全栈。',
  },
  {
    title: '好的技术写作，本质上是建模能力',
    tag: 'Writing',
    summary:
      '真正有价值的文章不是把概念堆起来，而是给读者一个可以迁移的问题框架。',
    conclusion: '一个强技术站长，写作应该能反映其系统能力，而不只是阅读量。',
  },
  {
    title: '界面高级感来自秩序，不来自特效堆砌',
    tag: 'Design + Product',
    summary:
      '很多技术站点看起来“很努力”，但仍然显得廉价，根本原因是缺少节奏、留白和层级控制。',
    conclusion:
      '越想显得专业，越要控制颜色、动效和信息密度，而不是拼命加模块。',
  },
];

const opinionStack = [
  {
    title: '先组织信息，再组织页面',
    description: '站点和产品都一样，信息结构先决定上限，视觉只是放大器。',
  },
  {
    title: '会写是能力，会删更是能力',
    description: '真正成熟的产品表达，往往来自删掉不必要的模块和噪音。',
  },
  {
    title: '技术深度要能转化为职业信誉',
    description: '博客、简历、作品和观察必须连成一体，才能形成真正的个人品牌。',
  },
];

const toneGuide = [
  '保持明确观点，但不用营销式夸张语气。',
  '让每条观察都能回到真实项目和交付场景。',
  '写得克制一点，反而更容易显出底层判断力。',
];
</script>
