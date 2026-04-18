<template>
  <section class="space-y-14 text-[#23272d]">
    <header class="border-b border-black/8 pb-10">
      <p class="text-[11px] tracking-[0.34em] text-[#8d7557] uppercase">
        Notes / Long-term View
      </p>
      <div class="mt-4 grid gap-8 xl:grid-cols-[minmax(0,1.18fr)_320px]">
        <div>
          <h1
            class="max-w-4xl text-4xl leading-[1.12] font-semibold text-[#171b21] lg:text-6xl"
          >
            观察笔记不是资讯汇总，而是站长长期有效的判断集。
          </h1>
          <p class="mt-6 max-w-3xl text-base leading-8 text-[#5f6772]">
            好的个人站点不只是展示“做了什么”，还应该展示“怎么想”。这里保留那些不依赖一时热度、但会持续影响产品和工程质量的判断。
          </p>
        </div>

        <aside class="rounded-[30px] border border-black/8 bg-white/55 p-6">
          <p class="text-[11px] tracking-[0.28em] text-[#8c8580] uppercase">
            Summary
          </p>
          <div class="mt-5 grid gap-3">
            <article
              v-for="item in headlineMetrics"
              :key="item.label"
              class="rounded-[22px] border border-black/8 bg-[#f7f2ea] px-4 py-4"
            >
              <p class="text-[11px] tracking-[0.26em] text-[#8c8580] uppercase">
                {{ item.label }}
              </p>
              <p class="mt-2 text-lg font-semibold text-[#171b21]">
                {{ item.value }}
              </p>
              <p class="mt-2 text-sm leading-6 text-[#5f6772]">
                {{ item.detail }}
              </p>
            </article>
          </div>
        </aside>
      </div>
    </header>

    <div class="space-y-8">
      <article
        v-for="item in noteDeck"
        :key="item.title"
        class="rounded-[34px] border border-black/8 bg-white/55 p-6 lg:p-8"
      >
        <div class="grid gap-5 xl:grid-cols-[140px_minmax(0,1fr)_280px]">
          <p class="text-sm text-[#8b7557]">{{ item.tag }}</p>

          <div>
            <h2 class="text-3xl font-semibold text-[#171b21]">
              {{ item.title }}
            </h2>
            <p class="mt-4 text-sm leading-8 text-[#5f6772]">
              {{ item.summary }}
            </p>
          </div>

          <div
            class="rounded-[24px] border border-black/8 bg-[#171b21] p-5 text-[#f4efe7]"
          >
            <p class="text-[11px] tracking-[0.28em] text-[#cdb18a] uppercase">
              结论
            </p>
            <p class="mt-4 text-sm leading-7 text-[#d8dde4]">
              {{ item.conclusion }}
            </p>
          </div>
        </div>
      </article>
    </div>

    <div class="grid gap-8 border-t border-black/8 pt-12 xl:grid-cols-3">
      <article
        v-for="item in opinionStack"
        :key="item.title"
        class="rounded-[30px] border border-black/8 bg-white/50 p-6"
      >
        <h2 class="text-2xl font-semibold text-[#171b21]">{{ item.title }}</h2>
        <p class="mt-4 text-sm leading-7 text-[#5f6772]">
          {{ item.description }}
        </p>
      </article>
    </div>
  </section>
</template>

<script setup lang="ts">
const headlineMetrics = [
  {
    label: '长期关注',
    value: '架构 / 全栈 / AI / 交付',
    detail: '不追单点热点，而是追踪会持续影响技术职业价值的方向。',
  },
  {
    label: '内容语气',
    value: '克制，但有锋芒',
    detail: '保持明确立场，同时避免流于营销话术和空洞判断。',
  },
  {
    label: '站点目标',
    value: '建立职业信誉',
    detail: '让读者能从观点、作品和结构中感受到站长真正的水平。',
  },
];

const noteDeck = [
  {
    title: 'AI 提升了系统设计能力的含金量',
    tag: 'AI + Engineering',
    summary:
      '当实现本身越来越容易被模型加速时，真正稀缺的能力会回到结构判断、模块切分、工作流设计和质量控制。',
    conclusion:
      '以后更值钱的不是“写得快”，而是能定义系统、约束系统并让团队稳定协作的人。',
  },
  {
    title: '全栈不是多知道几个技术名词',
    tag: 'Fullstack',
    summary:
      '全栈真正的难点不在于“学了前后端”，而在于是否能独立串起服务、数据、前台、部署与维护的完整链路。',
    conclusion:
      '没有完整交付视角的“全栈”，大多只是知识覆盖变宽了，不等于能力成型。',
  },
  {
    title: '好技术写作本质上是高级建模',
    tag: 'Writing',
    summary:
      '真正值得看的文章，会把一个复杂问题的关键变量抽出来，让读者以后遇到类似场景也知道怎么处理。',
    conclusion:
      '强站长写文章，不是为了收藏量，而是为了让自己的系统思维被别人感知到。',
  },
  {
    title: '高级感来自秩序，不来自模块堆砌',
    tag: 'Design + Product',
    summary:
      '页面显得廉价，往往不是因为颜色错了，而是因为信息堆太满、层次混乱、重点不明确。',
    conclusion: '真正成熟的界面会知道该删什么，而不是不断往上加东西。',
  },
];

const opinionStack = [
  {
    title: '先组织信息，再组织界面',
    description: '界面只是载体，真正决定上限的是信息怎么被切分、连接和导航。',
  },
  {
    title: '写得少但准，比写得多更能证明能力',
    description: '一个判断明确、结构清楚的专题，往往比十篇流水账更有说服力。',
  },
  {
    title: '作品、观点、简历必须互相印证',
    description: '只有这些内容彼此支持，个人站点才会真正像一个专业人士的主场。',
  },
];
</script>
