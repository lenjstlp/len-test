<template>
  <div
    class="h-screen overflow-hidden text-slate-50"
    :class="
      isStandaloneLayout
        ? 'bg-[#f6f1e8]'
        : 'bg-[radial-gradient(circle_at_top,#14334a_0%,#0f172a_35%,#04070d_100%)]'
    "
  >
    <div v-if="isStandaloneLayout" class="h-screen overflow-y-auto p-4 lg:p-6">
      <RouterView />
    </div>

    <div v-else class="flex h-screen overflow-hidden">
      <aside
        class="hidden h-screen shrink-0 overflow-hidden border-r border-white/10 bg-slate-950/80 backdrop-blur lg:block"
        :class="sidebarCollapsed ? 'w-[88px]' : 'w-[280px]'"
      >
        <AppSidebar :collapsed="sidebarCollapsed" :is-mobile="false" />
      </aside>

      <el-drawer
        v-model="mobileDrawerVisible"
        :with-header="false"
        direction="ltr"
        size="280px"
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
          class="shrink-0 border-b border-white/10 bg-slate-950/35 backdrop-blur"
        >
          <div class="flex items-center justify-between px-4 py-4 lg:px-8">
            <div class="flex min-w-0 items-center gap-3">
              <el-button
                circle
                class="!border-white/10 !bg-white/5 !text-slate-100 hover:!bg-white/10"
                @click="handleMenuToggle"
              >
                <el-icon><component :is="menuToggleIcon" /></el-icon>
              </el-button>

              <div class="min-w-0">
                <p class="text-xs tracking-[0.35em] text-cyan-300 uppercase">
                  LEN TEST
                </p>
                <h1 class="truncate text-xl font-semibold text-white">
                  {{ pageTitle }}
                </h1>
              </div>
            </div>

            <div class="hidden items-center gap-3 md:flex">
              <div
                class="rounded-2xl border border-white/10 bg-white/5 px-4 py-2 text-right"
              >
                <p class="text-xs tracking-[0.28em] text-slate-400 uppercase">
                  Current View
                </p>
                <p class="mt-1 text-sm text-slate-100">{{ pageDescription }}</p>
              </div>
              <el-button
                circle
                class="!border-white/10 !bg-white/5 !text-slate-100 hover:!bg-white/10"
              >
                <el-icon><Bell /></el-icon>
              </el-button>
            </div>
          </div>
        </header>

        <main
          class="flex min-h-0 flex-1 flex-col overflow-hidden px-4 py-4 lg:px-8 lg:py-6"
        >
          <div
            class="mb-6 flex shrink-0 flex-wrap items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-300"
          >
            <span
              v-for="item in breadcrumbItems"
              :key="item"
              class="rounded-full border border-white/10 bg-slate-950/40 px-3 py-1"
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
import { Bell, Expand, Fold, Menu as MenuIcon } from '@element-plus/icons-vue';
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
const pageTitle = computed(() => (route.meta.title as string) ?? '项目首页');
const pageDescription = computed(
  () =>
    (route.meta.description as string) ?? '使用左侧导航组织业务模块和视图。',
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
