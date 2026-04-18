<template>
  <section class="space-y-14 text-[#23272d]">
    <header class="border-b border-black/8 pb-10">
      <p class="text-[11px] tracking-[0.34em] text-[#8d7557] uppercase">
        Selected Work
      </p>
      <div class="mt-4 grid gap-8 xl:grid-cols-[minmax(0,1.16fr)_320px]">
        <div>
          <h1
            class="max-w-4xl text-4xl leading-[1.12] font-semibold text-[#171b21] lg:text-6xl"
          >
            项目档案不应该像需求表，而应该像一份能证明站长水平的作品册。
          </h1>
          <p class="mt-6 max-w-3xl text-base leading-8 text-[#5f6772]">
            所以这里只保留真正能代表方法、结构和审美的项目方向。它们不只是“做过”，更重要的是能说明站长有能力从信息组织、交互体验到工程落地全部接住。
          </p>
        </div>

        <aside
          class="rounded-[30px] border border-black/8 bg-[#171b21] p-6 text-[#f4efe7]"
        >
          <p class="text-[11px] tracking-[0.28em] text-[#cdb18a] uppercase">
            Work Method
          </p>
          <div class="mt-5 space-y-4">
            <article
              v-for="item in workMethod"
              :key="item.title"
              class="border-b border-white/10 pb-4 last:border-b-0 last:pb-0"
            >
              <h2 class="text-base font-semibold">{{ item.title }}</h2>
              <p class="mt-2 text-sm leading-7 text-[#c3c9d2]">
                {{ item.description }}
              </p>
            </article>
          </div>
        </aside>
      </div>
    </header>

    <div class="space-y-10">
      <article
        v-for="project in projectArchives"
        :key="project.title"
        class="rounded-[34px] border border-black/8 bg-white/55 p-6 lg:p-8"
      >
        <div
          class="grid gap-6 xl:grid-cols-[88px_minmax(0,1.02fr)_minmax(320px,0.98fr)]"
        >
          <p class="text-sm text-[#8b7557]">{{ project.eyebrow }}</p>

          <div>
            <h2 class="text-3xl font-semibold text-[#171b21]">
              {{ project.title }}
            </h2>
            <p class="mt-4 text-sm leading-8 text-[#5f6772]">
              {{ project.summary }}
            </p>

            <div class="mt-5 flex flex-wrap gap-2">
              <span
                v-for="tag in project.tags"
                :key="tag"
                class="rounded-full border border-black/10 bg-white/70 px-3 py-2 text-xs text-[#5f6772]"
              >
                {{ tag }}
              </span>
            </div>
          </div>

          <div class="grid gap-4 lg:grid-cols-2">
            <section
              class="rounded-[26px] border border-black/8 bg-[#f7f2ea] p-5"
            >
              <p class="text-[11px] tracking-[0.28em] text-[#8c8580] uppercase">
                我负责什么
              </p>
              <ul class="mt-4 space-y-3 text-sm leading-7 text-[#5f6772]">
                <li v-for="item in project.ownership" :key="item">
                  {{ item }}
                </li>
              </ul>
            </section>

            <section
              class="rounded-[26px] border border-black/8 bg-[#f7f2ea] p-5"
            >
              <p class="text-[11px] tracking-[0.28em] text-[#8c8580] uppercase">
                说明了什么能力
              </p>
              <ul class="mt-4 space-y-3 text-sm leading-7 text-[#5f6772]">
                <li v-for="item in project.signals" :key="item">
                  {{ item }}
                </li>
              </ul>
            </section>
          </div>
        </div>
      </article>
    </div>
  </section>
</template>

<script setup lang="ts">
const projectArchives = [
  {
    eyebrow: '01',
    title: '知识型技术博客系统',
    summary:
      '把学习模块、简历、专题栏目、路由组织和视觉语言统一成一个个人品牌站点，让博客本身成为最有说服力的作品。',
    tags: ['Vue 3', 'Information Architecture', 'Brand System'],
    ownership: [
      '重构站点骨架，摆脱后台式承载方式，改成作者主页 + 内容画布。',
      '把菜单入口变成栏目系统，让内容结构本身具备可阅读性和表达力。',
      '统一简历、专题、作品与观察，形成完整的职业展示链路。',
    ],
    signals: [
      '能做的不只是页面，而是整套信息结构和叙事方式。',
      '理解个人品牌站点如何通过内容与设计共同建立可信度。',
      '会把“知识内容”做成可持续演进的产品系统。',
    ],
  },
  {
    eyebrow: '02',
    title: '全球留言地球交互页',
    summary:
      '围绕地球仪、头像点位、缩放分层和 tip 展示规则构建互动作品，让视觉表达和性能控制同时成立。',
    tags: ['Interactive Frontend', 'Performance', 'Visual Storytelling'],
    ownership: [
      '设计缩放、旋转、优先级展示与留言切换的核心交互规则。',
      '平衡视觉表现、数据数量和浏览流畅度，避免只炫技不落地。',
      '让互动效果服务内容叙事，而不是脱离上下文单独存在。',
    ],
    signals: [
      '能做复杂且不落俗套的前端体验。',
      '理解性能约束下的信息分层与视觉组织。',
      '具备 AI 时代互动前台所需的产品感与实现判断。',
    ],
  },
  {
    eyebrow: '03',
    title: '前端架构与全栈能力地图',
    summary:
      '将原本容易写成流水账的学习主题，拆成明确能力域和升级路径，帮助读者理解“掌握后能干什么”。',
    tags: ['Architecture', 'Fullstack', 'Technical Writing'],
    ownership: [
      '把抽象知识做成结构清晰、可导航、可长期更新的专题内容。',
      '用职责、边界和交付结果组织技术，而不是罗列名词。',
      '通过内容产品化建立站长在技术判断上的说服力。',
    ],
    signals: [
      '会把复杂知识整理成可以执行的方法论。',
      '技术表达能力足够支撑长期写作与专业形象。',
      '能把学习内容升级为真正的内容产品。',
    ],
  },
];

const workMethod = [
  {
    title: '先判断结构，再进入实现',
    description: '先想清楚层级、关系和边界，代码阶段才不会越写越散。',
  },
  {
    title: '先做关键路径，再做装饰',
    description: '优先解决影响最终体验和交付的链路，而不是先堆低价值模块。',
  },
  {
    title: '把职业感当作质量的一部分',
    description: '代码、界面、信息组织和叙事方式，都应该共同指向专业感。',
  },
];
</script>
