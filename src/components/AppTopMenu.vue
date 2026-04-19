<template>
  <div class="h-[60px] border-b border-black/8 bg-[#fff]">
    <div
      class="mx-auto flex h-full max-w-[1680px] items-center gap-4 px-3 lg:gap-6 lg:px-6"
    >
      <RouterLink
        to="/dashboard"
        class="shrink-0 text-lg font-semibold tracking-tight text-[#171b21]"
      >
        LEN
      </RouterLink>

      <nav class="flex min-w-0 flex-1 items-center gap-1 overflow-x-auto">
        <RouterLink
          v-for="item in primaryChannels"
          :key="item.index"
          :to="item.index"
          class="shrink-0 rounded-[7px] px-4 py-2 text-sm transition"
          :class="
            isActive(item.index)
              ? 'bg-[#171b21] font-medium'
              : 'text-[#5f6772] hover:bg-[#f7f4ef] hover:text-[#171b21]'
          "
          :style="
            isActive(item.index)
              ? {
                  color: '#ffffff',
                }
              : undefined
          "
        >
          {{ item.label }}
        </RouterLink>
      </nav>

      <div class="hidden shrink-0 items-center gap-2 lg:flex">
        <span
          v-for="item in quickTags"
          :key="item"
          class="rounded-[7px] bg-[#f7f4ef] px-3 py-2 text-xs text-[#7a6a54]"
        >
          {{ item }}
        </span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { RouterLink, useRoute } from 'vue-router';

const route = useRoute();

const primaryChannels = [
  { index: '/dashboard', label: '推荐' },
  { index: '/frontend-architecture', label: '专栏' },
  { index: '/algorithm-guide', label: '算法题' },
  { index: '/operations/projects', label: '作品' },
  { index: '/operations/reports', label: '热榜' },
  { index: '/globe', label: '社区' },
  { index: '/resume', label: '简历' },
];

const quickTags = ['知乎式推荐', '掘金式专栏', 'LeetCode式路径'];

const isActive = (path: string) =>
  route.path === path ||
  route.fullPath.startsWith(`${path}?`) ||
  (path !== '/dashboard' && route.path.startsWith(`${path}/`));
</script>
