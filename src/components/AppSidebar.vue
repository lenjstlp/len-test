<template>
  <div class="flex h-full flex-col">
    <div class="border-b border-white/8 px-4 py-5">
      <div class="flex items-center gap-3">
        <div
          class="flex h-11 w-11 shrink-0 items-center justify-center rounded-[18px] bg-[linear-gradient(145deg,#f2e7cf,#d6c1a0)] text-sm font-bold text-slate-950 shadow-[0_12px_30px_rgba(8,11,16,0.3)]"
        >
          LN
        </div>
        <div v-if="!actualCollapsed" class="min-w-0">
          <p
            class="truncate text-sm font-semibold tracking-[0.24em] text-slate-100"
          >
            LEN / SYSTEMS JOURNAL
          </p>
          <p class="mt-1 text-xs leading-5 text-slate-400">
            Frontend architecture, fullstack delivery, AI product thinking
          </p>
        </div>
      </div>
    </div>

    <div class="flex-1 px-3 py-4">
      <el-menu
        :key="activeMenu"
        :default-active="activeMenu"
        :default-openeds="openedMenus"
        :collapse="actualCollapsed"
        :collapse-transition="false"
        background-color="transparent"
        text-color="#8b97a7"
        active-text-color="#f8fafc"
        class="sidebar-menu border-none"
        @select="handleSelect"
      >
        <template v-for="item in navigationMenus" :key="item.index">
          <el-sub-menu
            v-if="isMenuGroup(item)"
            :index="item.index"
            :class="getMenuItemClass(item)"
          >
            <template #title>
              <el-icon><component :is="item.icon" /></el-icon>
              <span>{{ item.label }}</span>
            </template>

            <el-menu-item
              v-for="child in item.children"
              :key="child.index"
              :index="child.index"
            >
              <span>{{ child.label }}</span>
            </el-menu-item>
          </el-sub-menu>

          <el-menu-item v-else :index="item.index">
            <el-icon><component :is="item.icon" /></el-icon>
            <template #title>{{ item.label }}</template>
          </el-menu-item>
        </template>
      </el-menu>
    </div>

    <div v-if="!actualCollapsed" class="border-t border-white/8 px-4 py-4">
      <div
        class="rounded-[24px] border border-[#d6c1a0]/10 bg-[#d6c1a0]/8 px-4 py-4"
      >
        <p class="text-[11px] tracking-[0.28em] text-[#d6c1a0] uppercase">
          Editorial Note
        </p>
        <p class="mt-2 text-sm leading-6 text-slate-300">
          这里不是知识堆砌页，而是持续整理系统设计、工程判断与产品落地的方法论。
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import {
  getNavigationMenusFromRoutes,
  type NavigationMenuGroup,
  isMenuGroup,
} from '@/router/permission';

const props = defineProps<{
  collapsed: boolean;
  isMobile: boolean;
}>();

const emit = defineEmits<{
  navigate: [];
}>();

const route = useRoute();
const router = useRouter();

const navigationMenus = computed(() => getNavigationMenusFromRoutes());
const activeMenu = computed(() => route.path);
const actualCollapsed = computed(() =>
  props.isMobile ? false : props.collapsed,
);
const openedMenus = computed(() =>
  route.matched
    .filter((matchedRoute) => matchedRoute.meta.menuGroup)
    .map((matchedRoute) => matchedRoute.path),
);

const handleSelect = (index: string) => {
  if (route.path !== index) {
    router.push(index);
  }

  emit('navigate');
};

const getMenuItemClass = (item: NavigationMenuGroup) =>
  item.children.some((child) => child.index === route.path)
    ? 'text-slate-100'
    : 'text-slate-300';
</script>

<style scoped>
.sidebar-menu:deep(.el-menu) {
  border-inline-end: none;
}

.sidebar-menu:deep(.el-menu-item),
.sidebar-menu:deep(.el-sub-menu__title) {
  border: 1px solid transparent;
  border-radius: 18px;
  height: 50px;
  margin-bottom: 8px;
}

.sidebar-menu:deep(.el-menu-item:hover),
.sidebar-menu:deep(.el-sub-menu__title:hover) {
  background: rgba(255, 255, 255, 0.06);
  border-color: rgba(255, 255, 255, 0.06);
}

.sidebar-menu:deep(.el-menu-item.is-active) {
  background: linear-gradient(
    135deg,
    rgba(214, 193, 160, 0.18),
    rgba(148, 163, 184, 0.12)
  );
  border-color: rgba(214, 193, 160, 0.18);
}

.sidebar-menu:deep(.el-sub-menu .el-menu-item) {
  min-width: 0;
  margin-left: 8px;
  padding-left: 44px !important;
}
</style>
