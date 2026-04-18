<template>
  <div class="flex h-full flex-col">
    <div class="border-b border-black/8 px-5 py-5">
      <p class="text-[11px] tracking-[0.32em] text-[#8b7557] uppercase">
        Directory / Unlock
      </p>
      <h2 class="mt-3 text-xl font-semibold text-[#171b21]">目录模块</h2>
      <p class="mt-3 text-sm leading-7 text-[#5f6772]">
        这里专门用来解锁各个菜单，按内容类型分组进入，不再把所有东西塞进同一个大盒子里。
      </p>
    </div>

    <div class="flex-1 overflow-y-auto px-5 py-5">
      <nav class="space-y-7">
        <section v-for="section in menuSections" :key="section.title">
          <div class="px-1">
            <p class="text-[11px] tracking-[0.32em] text-[#8d95a1] uppercase">
              {{ section.title }}
            </p>
            <p class="mt-2 text-sm leading-6 text-[#6c7480]">
              {{ section.description }}
            </p>
          </div>

          <div class="mt-4 space-y-2">
            <article
              v-for="item in section.items"
              :key="item.index"
              class="rounded-[7px] border p-3 transition"
              :class="
                isGroupActive(item)
                  ? 'border-[#cdb18a]/24 bg-[#fff8ed]'
                  : 'border-black/8 bg-[#fff]'
              "
            >
              <RouterLink
                :to="{ path: item.index, query: item.query }"
                class="block rounded-[7px] transition"
                :class="
                  isActive(item.index, item.query)
                    ? 'text-[#171b21]'
                    : 'text-[#4f5864]'
                "
                @click="emit('navigate')"
              >
                <p class="text-[15px] leading-5 font-semibold">
                  {{ item.label }}
                </p>
              </RouterLink>
            </article>
          </div>
        </section>
      </nav>
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
  name?: string;
  index: string;
  label: string;
  description?: string;
  query?: Record<string, string>;
};

type SidebarSection = {
  title: string;
  description: string;
  items: SidebarEntry[];
};

const routeEntries = computed<SidebarEntry[]>(() =>
  getAccessibleRouteTree()
    .filter((item) => item.meta.menuVisible !== false)
    .map((item) => mapRouteToEntry(item)),
);

const menuSections = computed<SidebarSection[]>(() => {
  const entryMap = new Map(
    routeEntries.value.map((item) => [item.name ?? item.index, item]),
  );

  const definitions = [
    {
      title: '入口',
      description: '先认识站长，再进入代表性的核心内容。',
      keys: ['dashboard', 'resume'],
    },
    {
      title: '写作与作品',
      description: '写作现场、项目档案和观察笔记都从这里进入。',
      keys: ['workspace', 'operations'],
    },
    {
      title: '互动实验',
      description: '收纳更有表现力的前端交互和视觉作品。',
      keys: ['globe'],
    },
    {
      title: '学习栏目',
      description: '用于系统化解锁各个学习主题和专题模块。',
      keys: [
        'canvas-guide',
        'python-guide',
        'agent-guide',
        'nextjs-guide',
        'frontend-architecture',
        'fullstack-guide',
      ],
    },
  ];

  return definitions
    .map((section) => ({
      title: section.title,
      description: section.description,
      items: section.keys
        .map((key) => entryMap.get(key))
        .filter((item): item is SidebarEntry => Boolean(item)),
    }))
    .filter((section) => section.items.length > 0);
});

const mapRouteToEntry = (routeItem: AppRouteRecord): SidebarEntry => {
  if (routeItem.children?.length) {
    return {
      name: routeItem.name as string | undefined,
      index: routeItem.path,
      label: routeItem.meta.title,
      description: routeItem.meta.description,
    };
  }

  return {
    name: routeItem.name as string | undefined,
    index: routeItem.path,
    label: routeItem.meta.title,
    description: routeItem.meta.description,
  };
};

const isActive = (path: string, query?: Record<string, string>) => {
  if (route.path !== path) {
    return false;
  }

  return !query?.chapter || route.query.chapter === query.chapter;
};

const isGroupActive = (item: SidebarEntry) =>
  isActive(item.index, item.query) || route.path.startsWith(`${item.index}/`);
</script>
