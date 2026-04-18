<template>
  <div class="flex h-full flex-col">
    <div class="border-b border-white/10 px-6 py-7">
      <RouterLink to="/dashboard" class="block">
        <div class="flex items-start gap-4">
          <div
            class="flex h-14 w-14 shrink-0 items-center justify-center rounded-[20px] bg-[linear-gradient(145deg,#f4ead6,#cdb18a)] text-base font-semibold text-[#16191f]"
          >
            LN
          </div>
          <div class="min-w-0">
            <p class="text-[11px] tracking-[0.34em] text-[#cdb18a] uppercase">
              Len / Personal Journal
            </p>
            <h2 class="mt-2 text-2xl font-semibold text-white">
              这不是后台，是一个技术作者的工作界面。
            </h2>
            <p class="mt-3 text-sm leading-7 text-[#afb6c2]">
              写前端架构、全栈交付、AI
              产品和复杂界面，不堆概念，直接谈系统、方法和结果。
            </p>
          </div>
        </div>
      </RouterLink>
    </div>

    <div class="flex-1 overflow-y-auto px-5 py-6">
      <div
        class="grid gap-3 rounded-[26px] border border-white/8 bg-white/[0.04] p-4"
      >
        <div
          v-for="item in profileSummary"
          :key="item.label"
          class="rounded-[20px] border border-white/8 bg-[rgba(255,255,255,0.03)] px-4 py-4"
        >
          <p class="text-[11px] tracking-[0.28em] text-[#8d95a1] uppercase">
            {{ item.label }}
          </p>
          <p class="mt-2 text-sm leading-6 text-[#f4efe7]">
            {{ item.value }}
          </p>
        </div>
      </div>

      <nav class="mt-8 space-y-8">
        <section v-for="section in menuSections" :key="section.title">
          <div class="px-2">
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
              class="rounded-[24px] border p-4 transition"
              :class="
                isGroupActive(item)
                  ? 'border-[#cdb18a]/22 bg-[#cdb18a]/10'
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
                    class="block rounded-[18px] border px-4 py-3 transition"
                    :class="
                      isActive(child.index)
                        ? 'border-[#cdb18a]/26 bg-[#f4ead6] text-[#191d24]'
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
                class="block rounded-[18px] px-1 py-1 transition"
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

    <div class="border-t border-white/10 px-6 py-5">
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

defineProps<{
  isMobile: boolean;
}>();

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

const profileSummary = [
  {
    label: '站点定位',
    value: '个人博客、作品集、学习栏目和职业名片合为一个系统。',
  },
  {
    label: '内容偏好',
    value: '系统设计、技术判断、交互表达、工程交付。',
  },
  {
    label: '写作方式',
    value: '把复杂问题拆成可以执行的结构，而不是复制文档目录。',
  },
];

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
      description: '先认识作者，再决定从哪个角度继续读。',
      keys: ['dashboard', 'resume'],
    },
    {
      title: '写作与作品',
      description: '包含写作现场、项目档案和长期观察。',
      keys: ['workspace', 'operations'],
    },
    {
      title: '互动实验',
      description: '这里放更具表现力和交互性的技术作品。',
      keys: ['globe'],
    },
    {
      title: '学习栏目',
      description: '把各个学习主题整理成可长期浏览的专题。',
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

const currentEntry = computed(() => {
  const allEntries = menuSections.value.flatMap((section) =>
    section.items.flatMap((item) => [item, ...(item.children ?? [])]),
  );

  return allEntries.find((item) => item.index === route.path);
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
