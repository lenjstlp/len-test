<template>
  <div
    class="h-screen overflow-hidden text-slate-100"
    :class="
      isStandaloneLayout
        ? 'bg-[#f4efe7]'
        : 'bg-[radial-gradient(circle_at_top,#31485d_0%,#121922_32%,#090d13_100%)]'
    "
  >
    <div v-if="isStandaloneLayout" class="h-screen overflow-y-auto p-3 lg:p-5">
      <RouterView />
    </div>

    <div v-else class="flex h-screen overflow-hidden">
      <aside
        class="hidden h-screen shrink-0 overflow-hidden border-r border-white/8 bg-[rgba(7,10,16,0.72)] backdrop-blur-xl lg:block"
        :class="sidebarCollapsed ? 'w-[92px]' : 'w-[292px]'"
      >
        <AppSidebar :collapsed="sidebarCollapsed" :is-mobile="false" />
      </aside>

      <el-drawer
        v-model="mobileDrawerVisible"
        :with-header="false"
        direction="ltr"
        size="292px"
        class="lg:!hidden"
      >
        <AppSidebar
          :collapsed="false"
          :is-mobile="true"
          @navigate="mobileDrawerVisible = false"
        />
      </el-drawer>

      <div class="flex min-w-0 flex-1 flex-col overflow-hidden">
        <header
          class="shrink-0 border-b border-white/8 bg-[rgba(8,11,16,0.35)] backdrop-blur-xl"
        >
          <div
            class="flex items-center justify-between gap-4 px-4 py-4 lg:px-8"
          >
            <div class="flex min-w-0 items-center gap-3">
              <el-button
                circle
                class="!border-white/8 !bg-white/5 !text-slate-100 hover:!bg-white/10"
                @click="handleMenuToggle"
              >
                <el-icon><component :is="menuToggleIcon" /></el-icon>
              </el-button>

              <div class="min-w-0">
                <p
                  class="text-[11px] tracking-[0.34em] text-[#d2c3a3] uppercase"
                >
                  LEN / SYSTEMS JOURNAL
                </p>
                <h1 class="truncate text-xl font-semibold text-white">
                  {{ pageTitle }}
                </h1>
              </div>
            </div>

            <div class="hidden max-w-[420px] items-center gap-3 md:flex">
              <div
                class="w-full rounded-[22px] border border-white/8 bg-white/[0.04] px-4 py-3 text-right"
              >
                <p
                  class="text-[11px] tracking-[0.28em] text-slate-500 uppercase"
                >
                  Current Focus
                </p>
                <p class="mt-1 text-sm leading-6 text-slate-200">
                  {{ pageDescription }}
                </p>
              </div>
            </div>
          </div>
        </header>

        <main
          class="flex min-h-0 flex-1 flex-col overflow-hidden px-4 py-4 lg:px-8 lg:py-6"
        >
          <div
            class="mb-6 flex shrink-0 flex-wrap items-center gap-2 rounded-[24px] border border-white/8 bg-white/[0.04] px-4 py-3 text-sm text-slate-300"
          >
            <span
              v-for="item in breadcrumbItems"
              :key="item"
              class="rounded-full border border-white/8 bg-[rgba(255,255,255,0.04)] px-3 py-1"
            >
              {{ item }}
            </span>
          </div>

          <div class="min-h-0 flex-1 overflow-y-auto pr-1 pb-2">
            <RouterView />
          </div>
        </main>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Expand, Fold, Menu as MenuIcon } from '@element-plus/icons-vue';
import { computed, onBeforeUnmount, onMounted, ref } from 'vue';
import { RouterView, useRoute } from 'vue-router';
import AppSidebar from '@/components/AppSidebar.vue';

const route = useRoute();
const sidebarCollapsed = ref(false);
const mobileDrawerVisible = ref(false);
const isMobile = ref(false);

const isStandaloneLayout = computed(() =>
  route.matched.some((matchedRoute) => matchedRoute.meta.standaloneLayout),
);
const pageTitle = computed(() => (route.meta.title as string) ?? 'LEN / BLOG');
const pageDescription = computed(
  () =>
    (route.meta.description as string) ??
    '围绕前端架构、全栈工程与 AI 产品交互持续写作。',
);
const breadcrumbItems = computed(() =>
  route.matched
    .map((matchedRoute) => matchedRoute.meta.title as string | undefined)
    .filter((title): title is string => Boolean(title)),
);
const menuToggleIcon = computed(() => {
  if (isMobile.value) {
    return MenuIcon;
  }

  return sidebarCollapsed.value ? Expand : Fold;
});

let removeViewportListener: (() => void) | undefined;

onMounted(() => {
  const mediaQuery = window.matchMedia('(max-width: 1024px)');
  const handleViewportChange = (event?: MediaQueryListEvent) => {
    isMobile.value = event?.matches ?? mediaQuery.matches;

    if (!isMobile.value) {
      mobileDrawerVisible.value = false;
    }
  };

  handleViewportChange();
  mediaQuery.addEventListener('change', handleViewportChange);
  removeViewportListener = () =>
    mediaQuery.removeEventListener('change', handleViewportChange);
});

onBeforeUnmount(() => {
  removeViewportListener?.();
});

const handleMenuToggle = () => {
  if (isMobile.value) {
    mobileDrawerVisible.value = true;
    return;
  }

  sidebarCollapsed.value = !sidebarCollapsed.value;
};
</script>
