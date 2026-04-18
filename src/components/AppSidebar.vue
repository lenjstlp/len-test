<template>
  <div class="flex flex-col">
    <div class="border-b border-white/10 px-5 py-6">
      <RouterLink to="/dashboard" class="block" @click="emit('navigate')">
        <div class="flex items-start gap-4">
          <div
            class="flex h-12 w-12 shrink-0 items-center justify-center rounded-[7px] bg-[linear-gradient(145deg,#f4ead6,#cdb18a)] text-sm font-semibold text-[#16191f]"
          >
            LN
          </div>
          <div class="min-w-0">
            <p class="text-[11px] tracking-[0.34em] text-[#cdb18a] uppercase">
              Len / Personal Journal
            </p>
            <h2 class="mt-2 text-xl leading-8 font-semibold text-white">
              技术作者、系统设计者、交付导向的前端工程师。
            </h2>
            <p class="mt-3 text-sm leading-7 text-[#afb6c2]">
              把前端架构、全栈能力、AI
              产品体验和复杂交互，整理成一个可以长期浏览的知识系统。
            </p>
          </div>
        </div>
      </RouterLink>
    </div>

    <div class="px-5 py-5">
      <div class="grid gap-3">
        <div
          v-for="item in profileSummary"
          :key="item.label"
          class="rounded-[7px] border border-white/8 bg-white/[0.04] px-4 py-4"
        >
          <p class="text-[11px] tracking-[0.28em] text-[#8d95a1] uppercase">
            {{ item.label }}
          </p>
          <p class="mt-2 text-sm leading-6 text-[#f4efe7]">
            {{ item.value }}
          </p>
        </div>
      </div>
    </div>

    <div class="border-t border-white/10 px-5 py-5">
      <p class="text-[11px] tracking-[0.3em] text-[#8d95a1] uppercase">
        当前页面
      </p>
      <p class="mt-2 text-lg font-semibold text-[#f4efe7]">
        {{ currentEntry?.label ?? '首页' }}
      </p>
      <p class="mt-2 text-sm leading-6 text-[#a7afb9]">
        {{
          currentEntry?.description ??
          '围绕复杂系统、技术表达与产品判断持续输出。'
        }}
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { RouterLink, useRoute } from 'vue-router';
import {
  getAccessibleRouteTree,
  type AppRouteRecord,
} from '@/router/permission';

const emit = defineEmits<{
  navigate: [];
}>();

const route = useRoute();

type SidebarEntry = {
  index: string;
  label: string;
  description?: string;
  children?: SidebarEntry[];
};

const profileSummary = [
  {
    label: '站点定位',
    value: '个人博客、作品集、学习栏目与职业名片合为一个系统。',
  },
  {
    label: '内容偏好',
    value: '系统设计、技术判断、交互表达、工程交付。',
  },
  {
    label: '写作方式',
    value: '把复杂问题拆成可执行的结构，而不是复制教程目录。',
  },
];

const routeEntries = computed<SidebarEntry[]>(() =>
  getAccessibleRouteTree()
    .filter((item) => item.meta.menuVisible !== false)
    .map((item) => mapRouteToEntry(item)),
);

const currentEntry = computed(() => {
  const allEntries = routeEntries.value.flatMap((item) => [
    item,
    ...(item.children ?? []),
  ]);

  return allEntries.find((item) => item.index === route.path);
});

const mapRouteToEntry = (routeItem: AppRouteRecord): SidebarEntry => ({
  index: routeItem.path,
  label: routeItem.meta.title,
  description: routeItem.meta.description,
  children: routeItem.children
    ?.filter((child) => child.meta.menuVisible !== false)
    .map((child) => ({
      index: child.path.startsWith('/')
        ? child.path
        : `${routeItem.path}/${child.path}`,
      label: child.meta.title,
      description: child.meta.description,
    })),
});
</script>
