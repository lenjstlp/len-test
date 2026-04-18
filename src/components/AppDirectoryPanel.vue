<template>
  <div class="flex h-full flex-col">
    <div class="border-b border-white/10 px-5 py-5">
      <p class="text-[11px] tracking-[0.32em] text-[#cdb18a] uppercase">
        Directory / Unlock
      </p>
      <h2 class="mt-3 text-xl font-semibold text-white">目录模块</h2>
      <p class="mt-3 text-sm leading-7 text-[#aab2be]">
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

          <div class="mt-4 space-y-3">
            <article
              v-for="item in section.items"
              :key="item.index"
              class="rounded-[7px] border p-4 transition"
              :class="
                isGroupActive(item)
                  ? 'border-[#cdb18a]/24 bg-[#cdb18a]/10'
                  : 'border-white/8 bg-white/[0.03]'
              "
            >
              <template v-if="item.children?.length">
                <div class="px-1">
                  <p class="text-base font-semibold text-[#f4efe7]">
                    {{ item.label }}
                  </p>
                  <p class="mt-2 text-sm leading-6 text-[#9ca5b2]">
                    {{ item.description }}
                  </p>
                </div>

                <div class="mt-4 space-y-2">
                  <RouterLink
                    v-for="child in item.children"
                    :key="child.index"
                    :to="child.index"
                    class="block rounded-[7px] border px-4 py-3 transition"
                    :class="
                      isActive(child.index)
                        ? 'border-[#cdb18a]/24 bg-[#f4ead6] text-[#191d24]'
                        : 'border-white/8 bg-white/[0.03] text-[#d7dbe3] hover:border-white/14 hover:bg-white/[0.05]'
                    "
                    @click="emit('navigate')"
                  >
                    <p class="text-sm font-medium">{{ child.label }}</p>
                    <p class="mt-1 text-xs leading-5 opacity-75">
                      {{ child.description }}
                    </p>
                  </RouterLink>
                </div>
              </template>

              <RouterLink
                v-else
                :to="item.index"
                class="block rounded-[7px] transition"
                :class="
                  isActive(item.index) ? 'text-[#f4efe7]' : 'text-[#d7dbe3]'
                "
                @click="emit('navigate')"
              >
                <p class="text-base font-semibold">{{ item.label }}</p>
                <p class="mt-2 text-sm leading-6 opacity-78">
                  {{ item.description }}
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
  children?: SidebarEntry[];
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

const mapRouteToEntry = (routeItem: AppRouteRecord): SidebarEntry => ({
  name: routeItem.name as string | undefined,
  index: routeItem.path,
  label: routeItem.meta.title,
  description: routeItem.meta.description,
  children: routeItem.children
    ?.filter((child) => child.meta.menuVisible !== false)
    .map((child) => ({
      name: child.name as string | undefined,
      index: child.path.startsWith('/')
        ? child.path
        : `${routeItem.path}/${child.path}`,
      label: child.meta.title,
      description: child.meta.description,
    })),
});

const isActive = (path: string) => route.path === path;

const isGroupActive = (item: SidebarEntry) =>
  item.children?.some((child) => isActive(child.index)) ?? false;
</script>
