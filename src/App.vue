<template>
  <div class="min-h-screen bg-[#fff]">
    <div class="pointer-events-none fixed inset-0 bg-[#fff]" />

    <button
      type="button"
      class="fixed top-4 right-4 z-40 flex h-12 w-12 items-center justify-center rounded-full border border-black/8 bg-[#16191f] text-[#f4efe7] shadow-[0_16px_32px_rgba(15,18,24,0.18)] backdrop-blur lg:hidden"
      @click="mobileMenuVisible = true"
    >
      <el-icon :size="20"><Menu /></el-icon>
    </button>

    <transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition duration-150 ease-in"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-if="mobileMenuVisible && !isStandaloneLayout"
        class="fixed inset-0 z-50 bg-[rgba(16,19,24,0.42)] p-3 backdrop-blur-sm lg:hidden"
      >
        <div
          class="ml-auto flex h-full max-w-[344px] flex-col gap-3 overflow-y-auto rounded-[7px] border border-white/10 bg-[#171b21] p-3 text-[#f5f0e9] shadow-[0_28px_60px_rgba(7,10,15,0.32)]"
        >
          <div class="flex justify-end px-1 pt-1">
            <button
              type="button"
              class="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white"
              @click="mobileMenuVisible = false"
            >
              <el-icon :size="18"><Close /></el-icon>
            </button>
          </div>

          <AppSidebar @navigate="mobileMenuVisible = false" />
          <AppDirectoryPanel @navigate="mobileMenuVisible = false" />
        </div>
      </div>
    </transition>

    <div v-if="isStandaloneLayout" class="relative px-3 py-3 lg:px-5 lg:py-5">
      <RouterView />
    </div>

    <div
      v-else
      class="relative mx-auto min-h-screen max-w-[1680px] px-3 py-3 lg:px-6 lg:py-6"
    >
      <div
        class="mb-4 overflow-hidden rounded-[7px] border border-black/6 bg-[#fff] shadow-[0_20px_48px_rgba(56,45,30,0.06)]"
      >
        <AppTopMenu />
      </div>

      <div class="flex gap-4 lg:gap-6">
        <aside class="hidden w-[304px] shrink-0 lg:block">
          <div class="sticky top-6 flex flex-col gap-4">
            <div
              class="h-[280px] overflow-y-auto rounded-[7px] border border-white/10 bg-[#171b21] text-[#f4efe7] shadow-[0_30px_70px_rgba(13,17,23,0.24)]"
            >
              <AppSidebar />
            </div>

            <div
              class="h-[420px] overflow-hidden rounded-[7px] border border-white/10 bg-[#171b21] text-[#f4efe7] shadow-[0_30px_70px_rgba(13,17,23,0.24)]"
            >
              <AppDirectoryPanel />
            </div>
          </div>
        </aside>

        <main class="min-w-0 flex-1">
          <div
            class="overflow-hidden rounded-[7px] border border-black/6 bg-[#fff] shadow-[0_32px_80px_rgba(56,45,30,0.08)]"
          >
            <div class="px-4 py-6 lg:px-10 lg:py-10">
              <RouterView />
            </div>
          </div>
        </main>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Close, Menu } from '@element-plus/icons-vue';
import { computed, ref, watch } from 'vue';
import { RouterView, useRoute } from 'vue-router';
import AppDirectoryPanel from '@/components/AppDirectoryPanel.vue';
import AppSidebar from '@/components/AppSidebar.vue';
import AppTopMenu from '@/components/AppTopMenu.vue';

const route = useRoute();
const mobileMenuVisible = ref(false);

const isStandaloneLayout = computed(() =>
  route.matched.some((matchedRoute) => matchedRoute.meta.standaloneLayout),
);

watch(
  () => route.fullPath,
  () => {
    mobileMenuVisible.value = false;
  },
);
</script>
