<template>
  <section class="space-y-16 text-[#23272d]">
    <div
      class="grid gap-10 border-b border-black/8 pb-12 xl:grid-cols-[minmax(0,1.2fr)_340px]"
    >
      <div>
        <p class="text-[11px] tracking-[0.34em] text-[#8d7557] uppercase">
          Personal Blog / Home
        </p>
        <h1
          class="mt-4 max-w-5xl text-5xl leading-[1.08] font-semibold tracking-tight text-[#171b21] lg:text-7xl"
        >
          一个真正像技术大佬主页的站点，应该先让人看到判断力，而不是看到模板。
        </h1>
        <p class="mt-6 max-w-3xl text-lg leading-9 text-[#5f6772]">
          所以这里不再沿用后台系统的壳子，而是直接把站长的能力、作品、专题和方法论放到前面。读者进入首页后，应该像走进一个长期运转的技术工作室，而不是进入一个换皮管理后台。
        </p>

        <div class="mt-8 flex flex-wrap gap-3">
          <RouterLink
            to="/resume"
            class="rounded-full bg-[#171b21] px-6 py-3 text-sm font-medium text-[#f6f0e8] transition hover:bg-[#252a31]"
          >
            查看简历
          </RouterLink>
          <RouterLink
            to="/frontend-architecture"
            class="rounded-full border border-black/10 bg-white/50 px-6 py-3 text-sm font-medium text-[#22262d] transition hover:bg-white"
          >
            前端架构专题
          </RouterLink>
        </div>
      </div>

      <aside class="space-y-4">
        <article
          v-for="item in manifesto"
          :key="item.title"
          class="rounded-[7px] border border-black/8 bg-white/55 p-5"
        >
          <p class="text-[11px] tracking-[0.28em] text-[#8c8580] uppercase">
            {{ item.eyebrow }}
          </p>
          <h2 class="mt-3 text-xl font-semibold text-[#171b21]">
            {{ item.title }}
          </h2>
          <p class="mt-3 text-sm leading-7 text-[#5f6772]">
            {{ item.description }}
          </p>
        </article>
      </aside>
    </div>

    <div
      class="grid gap-8 xl:grid-cols-[minmax(0,1.18fr)_minmax(320px,0.82fr)]"
    >
      <section>
        <div
          class="flex items-end justify-between gap-4 border-b border-black/8 pb-5"
        >
          <div>
            <p class="text-[11px] tracking-[0.3em] text-[#8d7557] uppercase">
              Featured Columns
            </p>
            <h2 class="mt-3 text-3xl font-semibold text-[#171b21]">
              从这里进入整套知识系统
            </h2>
          </div>
          <p class="max-w-md text-sm leading-7 text-[#6a717c]">
            不再把菜单当成功能入口，而是把它们当成作者长期经营的栏目。
          </p>
        </div>

        <div class="mt-6 divide-y divide-black/8">
          <RouterLink
            v-for="(item, index) in featuredColumns"
            :key="item.path"
            :to="item.path"
            class="group grid gap-5 py-6 transition lg:grid-cols-[72px_minmax(0,1fr)_180px]"
          >
            <p class="text-sm text-[#8b7557]">0{{ index + 1 }}</p>
            <div>
              <h3 class="text-2xl font-semibold text-[#171b21]">
                {{ item.title }}
              </h3>
              <p class="mt-3 max-w-2xl text-sm leading-7 text-[#5f6772]">
                {{ item.description }}
              </p>
            </div>
            <p
              class="self-start text-sm font-medium text-[#8b7557] transition group-hover:translate-x-1"
            >
              {{ item.note }}
            </p>
          </RouterLink>
        </div>
      </section>

      <section class="space-y-5">
        <div
          class="rounded-[7px] border border-black/8 bg-[#161a20] p-6 text-[#f4efe7]"
        >
          <p class="text-[11px] tracking-[0.28em] text-[#cdb18a] uppercase">
            Positioning
          </p>
          <p class="mt-4 text-2xl leading-9 font-semibold">
            站长最强的地方，不是学了很多，而是能把很多东西组织成系统。
          </p>
        </div>

        <div class="rounded-[7px] border border-black/8 bg-white/55 p-6">
          <p class="text-[11px] tracking-[0.28em] text-[#8c8580] uppercase">
            Capability Signals
          </p>
          <div class="mt-5 space-y-4">
            <article
              v-for="item in capabilitySignals"
              :key="item.title"
              class="border-b border-black/8 pb-4 last:border-b-0 last:pb-0"
            >
              <h3 class="text-lg font-semibold text-[#171b21]">
                {{ item.title }}
              </h3>
              <p class="mt-2 text-sm leading-7 text-[#5f6772]">
                {{ item.description }}
              </p>
            </article>
          </div>
        </div>
      </section>
    </div>

    <div class="grid gap-8 border-t border-black/8 pt-12 xl:grid-cols-3">
      <article
        v-for="item in editorialBeliefs"
        :key="item.title"
        class="rounded-[7px] border border-black/8 bg-white/50 p-6"
      >
        <p class="text-[11px] tracking-[0.28em] text-[#8d7557] uppercase">
          {{ item.eyebrow }}
        </p>
        <h3 class="mt-4 text-2xl font-semibold text-[#171b21]">
          {{ item.title }}
        </h3>
        <p class="mt-4 text-sm leading-7 text-[#5f6772]">
          {{ item.description }}
        </p>
      </article>
    </div>
  </section>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router';

const manifesto = [
  {
    eyebrow: 'Why It Feels Different',
    title: '拒绝后台味',
    description:
      '页面不再依赖顶栏、面包屑、统计卡和功能菜单的套路，而是以作者表达为中心。',
  },
  {
    eyebrow: 'What It Shows',
    title: '用内容证明能力',
    description:
      '读者看到的不是“会用什么框架”，而是站长如何搭系统、做产品和写结构化内容。',
  },
];

const featuredColumns = [
  {
    path: '/resume',
    title: '个人简历',
    description: '把能力矩阵、代表经历、合作方式和系统视角放在一页里完整展开。',
    note: '职业名片',
  },
  {
    path: '/frontend-architecture',
    title: '前端架构能力地图',
    description: '不是库清单，而是前端真正应该掌握的模块、边界和进阶顺序。',
    note: '系统判断',
  },
  {
    path: '/fullstack-guide',
    title: '全栈能力汇总',
    description: '从服务端、数据库、部署到协作，把完整交付的能力域拆清楚。',
    note: '完整交付',
  },
  {
    path: '/agent-guide',
    title: 'Agent 与 AI 应用',
    description: '用产品和工程视角理解 agent，不停留在热点词汇和工具搬运。',
    note: '未来方向',
  },
];

const capabilitySignals = [
  {
    title: '会把知识做成产品',
    description: '站点本身就是一个结构化作品，而不是随便拼起来的若干页面。',
  },
  {
    title: '会把界面做出职业感',
    description: '不靠堆模块、不靠炫特效，而靠留白、层级、节奏和信息组织取胜。',
  },
  {
    title: '会把技术说清楚',
    description: '内容表达追求可执行性，读者应该读完就知道能做什么、怎么升级。',
  },
];

const editorialBeliefs = [
  {
    eyebrow: 'Belief 01',
    title: '系统比样式更重要',
    description:
      '真正显得强，不是因为页面上有多少组件，而是因为结构背后有清晰判断。',
  },
  {
    eyebrow: 'Belief 02',
    title: '长期输出比短期热闹更重要',
    description:
      '博客不是一次性作品，而是一个不断扩展的知识系统和职业信誉载体。',
  },
  {
    eyebrow: 'Belief 03',
    title: 'AI 时代更需要人的组织能力',
    description:
      '实现会越来越快，真正稀缺的是定义结构、控制质量和形成完整交付的能力。',
  },
];
</script>
