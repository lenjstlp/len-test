<template>
  <div class="border-b border-black/8 bg-[#fff] px-4 py-4 lg:px-10">
    <div class="flex flex-wrap items-center gap-3 lg:gap-4">
      <p
        class="shrink-0 text-[11px] tracking-[0.32em] text-[#8b7557] uppercase"
      >
        Menu
      </p>

      <div class="flex min-w-0 flex-1 gap-2 overflow-x-auto pb-1">
        <RouterLink
          v-for="item in menuEntries"
          :key="item.index"
          :to="item.index"
          class="shrink-0 rounded-[7px] border px-4 py-2 text-sm transition"
          :class="
            isActive(item.index)
              ? 'border-[#171b21] bg-[#171b21] text-[#f6f0e8]'
              : 'border-black/10 bg-[#fff] text-[#4f5864] hover:border-black/18 hover:bg-[#faf8f4]'
          "
        >
          {{ item.label }}
        </RouterLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { RouterLink, useRoute } from 'vue-router';
import { getAccessibleRouteTree } from '@/router/permission';

const route = useRoute();

type TopMenuEntry = {
  index: string;
  label: string;
};

const menuEntries = computed<TopMenuEntry[]>(() =>
  getAccessibleRouteTree().flatMap((item) => {
    const baseEntry = {
      index: item.path,
      label: item.meta.title,
    };

    if (!item.children?.length) {
      return [baseEntry];
    }

    return item.children
      .filter((child) => child.meta.menuVisible !== false)
      .map((child) => ({
        index: child.path.startsWith('/')
          ? child.path
          : `${item.path}/${child.path}`,
        label: child.meta.title,
      }));
  }),
);

const isActive = (path: string) => route.path === path;
</script>
