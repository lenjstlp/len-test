<script setup lang="ts">
const metrics = [
  {
    label: '本周新增需求',
    value: '24',
    trend: '+12%',
  },
  {
    label: '已完成交付',
    value: '18',
    trend: '+8%',
  },
  {
    label: '平均处理时长',
    value: '2.4d',
    trend: '-0.6d',
  },
];

const dataRows = [
  { dimension: '交付效率', result: '良好', note: '需求响应速度高于上周' },
  { dimension: '缺陷趋势', result: '稳定', note: '未出现高优先级新增缺陷' },
  {
    dimension: '需求积压',
    result: '需关注',
    note: '部分跨团队需求等待排期确认',
  },
];
</script>

<template>
  <section class="space-y-6">
    <div class="grid gap-4 md:grid-cols-3">
      <article
        v-for="item in metrics"
        :key="item.label"
        class="stat-card rounded-[28px] px-5 py-5"
      >
        <p class="text-sm tracking-[0.25em] text-slate-400 uppercase">
          {{ item.label }}
        </p>
        <p class="mt-3 text-3xl font-semibold text-white">{{ item.value }}</p>
        <p class="mt-3 text-sm text-emerald-300">{{ item.trend }}</p>
      </article>
    </div>

    <div class="surface-panel rounded-[28px] p-6 lg:p-7">
      <div class="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h2 class="text-2xl font-semibold text-white">数据报表</h2>
          <p class="mt-2 text-sm leading-6 text-slate-400">
            用于展示二级菜单下的指标视图，后续可以替换为图表、筛选器和导出能力。
          </p>
        </div>
        <el-tag type="info">Weekly Snapshot</el-tag>
      </div>

      <div class="mt-6 grid gap-4">
        <article
          v-for="item in dataRows"
          :key="item.dimension"
          class="rounded-3xl border border-white/10 bg-slate-950/45 px-5 py-5"
        >
          <div class="flex flex-wrap items-center justify-between gap-3">
            <h3 class="text-lg font-medium text-white">{{ item.dimension }}</h3>
            <span
              class="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-300"
            >
              {{ item.result }}
            </span>
          </div>
          <p class="mt-3 text-sm leading-6 text-slate-300">{{ item.note }}</p>
        </article>
      </div>
    </div>
  </section>
</template>
