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

          <div class="mt-4 space-y-3">
            <article
              v-for="item in section.items"
              :key="item.index"
              class="rounded-[7px] border p-4 transition"
              :class="
                isGroupActive(item)
                  ? 'border-[#cdb18a]/24 bg-[#fff8ed]'
                  : 'border-black/8 bg-[#fff]'
              "
            >
              <template v-if="item.children?.length">
                <div class="px-1">
                  <p class="text-base font-semibold text-[#171b21]">
                    {{ item.label }}
                  </p>
                  <p class="mt-2 text-sm leading-6 text-[#5f6772]">
                    {{ item.description }}
                  </p>
                </div>

                <div class="mt-4 space-y-2">
                  <RouterLink
                    v-for="child in item.children"
                    :key="`${child.index}-${child.query?.chapter ?? 'root'}`"
                    :to="{ path: child.index, query: child.query }"
                    class="block rounded-[7px] border px-4 py-3 transition"
                    :class="
                      isActive(child.index, child.query)
                        ? 'border-[#cdb18a]/24 bg-[#f4ead6] text-[#191d24]'
                        : 'border-black/8 bg-[#fff] text-[#4f5864] hover:border-black/14 hover:bg-[#faf8f4]'
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
                :to="{ path: item.index, query: item.query }"
                class="block rounded-[7px] transition"
                :class="
                  isActive(item.index, item.query)
                    ? 'text-[#171b21]'
                    : 'text-[#4f5864]'
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
import { agentGuideChapters } from '@/data/agentGuide';
import { canvasGuideChapters } from '@/data/canvasGuide';
import { nextjsGuideChapters } from '@/data/nextjsGuide';
import { pythonGuideChapters } from '@/data/pythonGuide';
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
  children?: SidebarEntry[];
};

type SidebarSection = {
  title: string;
  description: string;
  items: SidebarEntry[];
};

const guideChapterMap = {
  'agent-guide': agentGuideChapters,
  'canvas-guide': canvasGuideChapters,
  'nextjs-guide': nextjsGuideChapters,
  'python-guide': pythonGuideChapters,
} as const;

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
  const routeName = routeItem.name as keyof typeof guideChapterMap | undefined;
  const guideChapters = routeName ? guideChapterMap[routeName] : undefined;

  return {
    name: routeItem.name as string | undefined,
    index: routeItem.path,
    label: routeItem.meta.title,
    description: routeItem.meta.description,
    children: guideChapters?.length
      ? guideChapters.map((chapter) => ({
          index: routeItem.path,
          label: chapter.label,
          description: chapter.description,
          query: {
            chapter: chapter.id,
          },
        }))
      : routeItem.children
          ?.filter((child) => child.meta.menuVisible !== false)
          .map((child) => ({
            name: child.name as string | undefined,
            index: child.path.startsWith('/')
              ? child.path
              : `${routeItem.path}/${child.path}`,
            label: child.meta.title,
            description: child.meta.description,
          })),
  };
};

const resolveCurrentChapter = (path: string) => {
  const entry = routeEntries.value.find((item) => item.index === path);
  const routeName = entry?.name as keyof typeof guideChapterMap | undefined;
  const guideChapters = routeName ? guideChapterMap[routeName] : undefined;

  if (!guideChapters?.length) {
    return '';
  }

  const queryChapter =
    typeof route.query.chapter === 'string'
      ? route.query.chapter
      : Array.isArray(route.query.chapter)
        ? (route.query.chapter[0] ?? '')
        : '';

  return guideChapters.some((chapter) => chapter.id === queryChapter)
    ? queryChapter
    : guideChapters[0].id;
};

const isActive = (path: string, query?: Record<string, string>) => {
  if (route.path !== path) {
    return false;
  }

  if (!query?.chapter) {
    return true;
  }

  return resolveCurrentChapter(path) === query.chapter;
};

const isGroupActive = (item: SidebarEntry) =>
  item.children?.some((child) => isActive(child.index, child.query)) ?? false;
</script>
