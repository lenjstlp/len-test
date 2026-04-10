<script setup lang="ts">
const summaryCards = [
  {
    label: '模块数量',
    value: '4',
    detail: '当前内置概览、工作台、项目列表、数据报表四个示例视图',
  },
  {
    label: '导航层级',
    value: '2',
    detail: '菜单配置限制为最多两级，避免后续维护成本失控',
  },
  {
    label: '工程状态',
    value: 'Ready',
    detail: '代码规范、构建命令和基础布局均已完成整备',
  },
];

const quickActions = [
  '在 src/router/menu.ts 中新增一级或二级菜单项',
  '在 src/router/index.ts 中补充对应路由组件',
  '在 src/views 下继续拆分业务页面',
];

const milestones = [
  {
    title: '布局基础已就位',
    description:
      '主框架改为后台式左侧导航结构，桌面端支持折叠，移动端使用抽屉菜单。',
  },
  {
    title: '模板残留已清理',
    description: '默认 HelloWorld 和演示图片已移除，当前目录结构聚焦业务开发。',
  },
  {
    title: '文档已补全',
    description:
      'README 新增命令、目录、菜单扩展方式和工程说明，可直接交接使用。',
  },
];
</script>

<template>
  <section class="space-y-6">
    <div class="surface-panel overflow-hidden rounded-[32px]">
      <div
        class="grid gap-8 px-6 py-8 lg:grid-cols-[minmax(0,1.15fr)_minmax(320px,0.85fr)] lg:px-8 lg:py-10"
      >
        <div class="space-y-5">
          <span
            class="inline-flex rounded-full border border-cyan-400/30 bg-cyan-400/10 px-4 py-1 text-xs tracking-[0.32em] text-cyan-300 uppercase"
          >
            Admin Shell
          </span>
          <div class="space-y-3">
            <h2
              class="text-3xl font-semibold tracking-tight text-white lg:text-5xl"
            >
              后台首页已经切换为可扩展的左侧菜单布局。
            </h2>
            <p class="max-w-2xl text-sm leading-7 text-slate-300 lg:text-base">
              现在可以围绕固定框架继续扩展业务模块。菜单支持一级直达和一级分组下的二级页面，适合常见中后台的信息架构。
            </p>
          </div>

          <div class="flex flex-wrap gap-3 text-sm text-slate-200">
            <div
              class="rounded-2xl border border-white/10 bg-white/5 px-4 py-3"
            >
              Vue 3 + Element Plus
            </div>
            <div
              class="rounded-2xl border border-white/10 bg-white/5 px-4 py-3"
            >
              Two-level Navigation
            </div>
            <div
              class="rounded-2xl border border-white/10 bg-white/5 px-4 py-3"
            >
              Ready for Business Views
            </div>
          </div>
        </div>

        <div class="grid gap-4">
          <article
            v-for="item in summaryCards"
            :key="item.label"
            class="stat-card rounded-3xl px-5 py-5"
          >
            <p class="text-sm tracking-[0.24em] text-slate-400 uppercase">
              {{ item.label }}
            </p>
            <p class="mt-3 text-3xl font-semibold text-white">
              {{ item.value }}
            </p>
            <p class="mt-3 text-sm leading-6 text-slate-300">
              {{ item.detail }}
            </p>
          </article>
        </div>
      </div>
    </div>

    <div class="grid gap-6 xl:grid-cols-[minmax(0,1fr)_360px]">
      <div class="surface-panel rounded-[28px] p-6 lg:p-7">
        <div class="flex items-center justify-between gap-4">
          <div>
            <h3 class="text-xl font-semibold text-white">实施里程碑</h3>
            <p class="mt-2 text-sm text-slate-400">
              当前项目已经具备继续业务开发的基础骨架。
            </p>
          </div>
          <span
            class="rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1 text-xs text-emerald-300"
          >
            Stable
          </span>
        </div>

        <div class="mt-6 grid gap-4">
          <article
            v-for="(item, index) in milestones"
            :key="item.title"
            class="rounded-3xl border border-white/10 bg-slate-950/40 px-5 py-5"
          >
            <p class="text-xs tracking-[0.28em] text-cyan-300 uppercase">
              Step 0{{ index + 1 }}
            </p>
            <h4 class="mt-3 text-lg font-medium text-white">
              {{ item.title }}
            </h4>
            <p class="mt-2 text-sm leading-6 text-slate-300">
              {{ item.description }}
            </p>
          </article>
        </div>
      </div>

      <div class="space-y-6">
        <div class="surface-panel rounded-[28px] p-6">
          <h3 class="text-xl font-semibold text-white">快速动作</h3>
          <div class="mt-5 space-y-3">
            <div
              v-for="action in quickActions"
              :key="action"
              class="rounded-2xl border border-white/10 bg-white/5 px-4 py-4 text-sm leading-6 text-slate-200"
            >
              {{ action }}
            </div>
          </div>
        </div>

        <div
          class="rounded-[28px] border border-cyan-400/15 bg-cyan-400/10 p-6"
        >
          <p class="text-xs tracking-[0.28em] text-cyan-300 uppercase">
            Layout Hint
          </p>
          <p class="mt-3 text-sm leading-7 text-slate-100">
            如果后续要接权限、标签页或面包屑，只需要在路由 `meta` 和 `menu.ts`
            上继续扩展，不需要再改整体布局。
          </p>
        </div>
      </div>
    </div>
  </section>
</template>
