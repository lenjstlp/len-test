<template>
  <section class="space-y-6">
    <div class="surface-panel rounded-[32px] p-6 lg:p-7">
      <div class="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p class="text-xs tracking-[0.28em] text-[#d6c1a0] uppercase">
            Portfolio Selection
          </p>
          <h2 class="mt-2 text-3xl font-semibold text-white">项目档案</h2>
          <p class="mt-3 max-w-3xl text-sm leading-7 text-slate-300">
            这里不做流水账式项目列表，而是精选能体现系统能力、产品判断和实现质量的项目方向。重点不是数量，而是能否证明站长能从结构、交互到工程交付全部接住。
          </p>
        </div>
        <span
          class="rounded-full border border-[#d6c1a0]/20 bg-[#d6c1a0]/10 px-3 py-1 text-xs text-[#eadfc9]"
        >
          Selected Works
        </span>
      </div>
    </div>

    <div class="grid gap-6">
      <article
        v-for="project in projectArchives"
        :key="project.title"
        class="surface-panel rounded-[32px] p-6 lg:p-7"
      >
        <div
          class="grid gap-6 xl:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)]"
        >
          <div>
            <p class="text-xs tracking-[0.24em] text-[#d6c1a0] uppercase">
              {{ project.eyebrow }}
            </p>
            <h3 class="mt-3 text-2xl font-semibold text-white">
              {{ project.title }}
            </h3>
            <p class="mt-4 text-sm leading-7 text-slate-300">
              {{ project.summary }}
            </p>

            <div class="mt-5 flex flex-wrap gap-2">
              <span
                v-for="tag in project.tags"
                :key="tag"
                class="rounded-full border border-white/8 bg-white/[0.04] px-3 py-2 text-xs text-slate-300"
              >
                {{ tag }}
              </span>
            </div>
          </div>

          <div class="grid gap-4 lg:grid-cols-2">
            <section
              class="rounded-[26px] border border-white/8 bg-white/[0.04] p-5"
            >
              <p class="text-xs tracking-[0.24em] text-slate-500 uppercase">
                我负责什么
              </p>
              <ul class="mt-4 space-y-3 text-sm leading-7 text-slate-300">
                <li
                  v-for="item in project.ownership"
                  :key="item"
                  class="rounded-[18px] border border-white/8 bg-[rgba(255,255,255,0.03)] px-4 py-3"
                >
                  {{ item }}
                </li>
              </ul>
            </section>

            <section
              class="rounded-[26px] border border-white/8 bg-white/[0.04] p-5"
            >
              <p class="text-xs tracking-[0.24em] text-slate-500 uppercase">
                体现出的能力
              </p>
              <ul class="mt-4 space-y-3 text-sm leading-7 text-slate-300">
                <li
                  v-for="item in project.signals"
                  :key="item"
                  class="rounded-[18px] border border-white/8 bg-[rgba(255,255,255,0.03)] px-4 py-3"
                >
                  {{ item }}
                </li>
              </ul>
            </section>
          </div>
        </div>
      </article>
    </div>

    <div class="grid gap-6 xl:grid-cols-[minmax(0,1fr)_360px]">
      <div class="surface-panel rounded-[32px] p-6 lg:p-7">
        <p class="text-xs tracking-[0.28em] text-[#d6c1a0] uppercase">
          Working Style
        </p>
        <h3 class="mt-2 text-2xl font-semibold text-white">做项目的方式</h3>

        <div class="mt-6 grid gap-4 lg:grid-cols-3">
          <article
            v-for="item in workingStyle"
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
          Delivery Habits
        </p>
        <div class="mt-5 space-y-3">
          <article
            v-for="item in deliveryHabits"
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
const projectArchives = [
  {
    eyebrow: 'Project 01',
    title: '知识型技术博客系统',
    summary:
      '把学习内容、作品展示、路由权限和站点气质统一到一个项目里，让博客本身就是个人能力的最佳演示。',
    tags: ['Vue 3', 'Content Architecture', 'Personal Branding'],
    ownership: [
      '重做整体信息结构，让菜单与路由直接映射真实内容分层。',
      '将普通学习页提升为专题栏目，形成可持续扩展的知识系统。',
      '把主页、简历、栏目、作品与观察组合成一个完整的技术作者站点。',
    ],
    signals: [
      '不仅会搭页面，还能定义站点定位和叙事方式。',
      '懂得用结构和视觉共同建立专业可信度。',
      '能把“内容系统”设计成产品，而不只是静态页面集合。',
    ],
  },
  {
    eyebrow: 'Project 02',
    title: '智能交互前台探索',
    summary:
      '通过地球留言等可视化页面，验证 AI 时代交互产品如何兼顾性能、表达力和信息组织。',
    tags: ['Canvas / WebGL Thinking', 'Interaction', 'Performance'],
    ownership: [
      '设计支持缩放、旋转、分层展示的交互逻辑。',
      '平衡视觉表达与渲染性能，控制同屏展示数量。',
      '让互动组件服务于叙事，而不是只做技术炫技。',
    ],
    signals: [
      '能做不落俗套的可视化交互体验。',
      '理解性能约束下的信息可视化组织。',
      '具备 AI 产品前台所需的界面判断和实现能力。',
    ],
  },
  {
    eyebrow: 'Project 03',
    title: '全栈能力地图构建',
    summary:
      '用专题页面把前端、服务端、数据库、交付与协作能力拆成清晰模块，帮助读者理解真正的全栈边界。',
    tags: ['Fullstack', 'System Design', 'Developer Education'],
    ownership: [
      '拆分能力域，并给出每一层对应的责任范围和升级方向。',
      '梳理语言路线和框架定位，避免“样样都会一点”的伪全栈叙述。',
      '把长期学习内容做成能指导职业升级的结构化产品。',
    ],
    signals: [
      '能把复杂知识体系整理成易于执行的路线图。',
      '兼顾技术深度与表达清晰度。',
      '具备技术内容产品化的能力。',
    ],
  },
];

const workingStyle = [
  {
    title: '先定结构，再定实现',
    description: '先把边界和信息组织想清楚，再进入编码，这样项目不会越做越散。',
  },
  {
    title: '先做关键路径，再做锦上添花',
    description:
      '优先打通真正影响体验和交付的链路，避免把时间耗在低价值装饰上。',
  },
  {
    title: '把工程质量当成产品质量的一部分',
    description:
      '代码结构、命名、路由组织和可扩展性，本身就是最终体验的一部分。',
  },
];

const deliveryHabits = [
  '会主动把需求抽象成模块与规则，而不是只等任务拆好再做。',
  '会关心设计、内容和工程之间是否统一，而不是只关注局部代码。',
  '会把能复用的模式沉淀下来，让项目越往后越稳定，而不是越做越乱。',
];
</script>
