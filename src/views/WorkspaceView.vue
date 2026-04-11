<template>
  <section
    class="grid gap-6 xl:grid-cols-[minmax(0,1.1fr)_minmax(320px,0.9fr)]"
  >
    <div class="surface-panel rounded-[28px] p-6 lg:p-7">
      <div class="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h2 class="text-2xl font-semibold text-white">工作台看板</h2>
          <p class="mt-2 text-sm leading-6 text-slate-400">
            这个页面用于承载团队协作、发布准备、待办汇总等内容。
          </p>
        </div>
        <span
          class="rounded-full border border-amber-400/20 bg-amber-400/10 px-3 py-1 text-xs text-amber-300"
        >
          Sprint 12
        </span>
      </div>

      <div class="mt-6 grid gap-4">
        <article
          v-for="item in todoItems"
          :key="item.title"
          class="rounded-3xl border border-white/10 bg-slate-950/45 px-5 py-5"
        >
          <div class="flex items-center justify-between gap-3">
            <h3 class="text-lg font-medium text-white">{{ item.title }}</h3>
            <span
              class="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-300"
            >
              {{ item.status }}
            </span>
          </div>
          <p class="mt-3 text-sm text-slate-400">负责人：{{ item.owner }}</p>
        </article>
      </div>
    </div>

    <div class="space-y-6">
      <div class="surface-panel rounded-[28px] p-6">
        <h3 class="text-xl font-semibold text-white">发布检查清单</h3>
        <div class="mt-5 space-y-3">
          <div
            v-for="item in publishChecklist"
            :key="item"
            class="rounded-2xl border border-white/10 bg-white/5 px-4 py-4 text-sm text-slate-200"
          >
            {{ item }}
          </div>
        </div>
      </div>

      <div class="surface-panel rounded-[28px] p-6">
        <h3 class="text-xl font-semibold text-white">当前建议</h3>
        <p class="mt-4 text-sm leading-7 text-slate-300">
          如果这是业务中台项目，下一步优先补登录、权限和接口层；如果这是运营台项目，优先把二级菜单抽象为可配置数据源。
        </p>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const todoItems = [
  {
    title: '接入真实菜单权限',
    owner: 'Frontend',
    status: '进行中',
  },
  {
    title: '补充接口请求层与状态管理',
    owner: 'Platform',
    status: '待开始',
  },
  {
    title: '建立页面级测试基线',
    owner: 'QA',
    status: '待排期',
  },
];

const publishChecklist = [
  '确认路由与菜单映射一致',
  '执行 pnpm lint 与 pnpm build',
  '检查移动端抽屉菜单交互',
  '补充新增页面的文档说明',
];
</script>
