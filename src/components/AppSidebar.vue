<template>
  <div class="flex h-full flex-col">
    <div class="border-b border-white/10 px-4 py-5">
      <div class="flex items-center gap-3">
        <div
          class="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-400 via-emerald-300 to-lime-200 text-sm font-bold text-slate-950"
        >
          LT
        </div>
        <div v-if="!actualCollapsed" class="min-w-0">
          <p
            class="truncate text-sm font-semibold tracking-[0.24em] text-slate-100"
          >
            LEN TEST
          </p>
          <p class="mt-1 text-xs leading-5 text-slate-400">
            Admin starter with 2-level navigation
          </p>
        </div>
      </div>
    </div>

    <div class="flex-1 overflow-hidden px-3 py-4">
      <el-scrollbar height="100%">
        <el-menu
          :key="activeMenu"
          :default-active="activeMenu"
          :default-openeds="openedMenus"
          :collapse="actualCollapsed"
          :collapse-transition="false"
          background-color="transparent"
          text-color="#94a3b8"
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
      </el-scrollbar>
    </div>

    <div v-if="!actualCollapsed" class="border-t border-white/10 px-4 py-4">
      <div
        class="rounded-2xl border border-cyan-400/10 bg-cyan-400/10 px-4 py-3"
      >
        <p class="text-xs tracking-[0.28em] text-cyan-300 uppercase">
          Navigation Rule
        </p>
        <p class="mt-2 text-sm leading-6 text-slate-300">
          当前导航限制为最多两级，避免菜单层级失控。
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import {
  navigationMenus,
  type NavigationMenuGroup,
  isMenuGroup,
} from '@/router/menu';

const props = defineProps<{
  collapsed: boolean;
  isMobile: boolean;
}>();

const emit = defineEmits<{
  navigate: [];
}>();

const route = useRoute();
const router = useRouter();

const activeMenu = computed(() => route.path);
const actualCollapsed = computed(() =>
  props.isMobile ? false : props.collapsed,
);
const openedMenus = computed(() => {
  if (route.path.startsWith('/operations/')) {
    return ['/operations'];
  }

  return [];
});

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
  border-radius: 16px;
  height: 48px;
  margin-bottom: 6px;
}

.sidebar-menu:deep(.el-menu-item:hover),
.sidebar-menu:deep(.el-sub-menu__title:hover) {
  background: rgba(255, 255, 255, 0.06);
}

.sidebar-menu:deep(.el-menu-item.is-active) {
  background: linear-gradient(
    135deg,
    rgba(34, 211, 238, 0.22),
    rgba(59, 130, 246, 0.18)
  );
}

.sidebar-menu:deep(.el-sub-menu .el-menu-item) {
  min-width: 0;
  margin-left: 6px;
  padding-left: 44px !important;
}
</style>
