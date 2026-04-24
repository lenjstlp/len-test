import {
  createRouter,
  createWebHistory,
  type RouteRecordName,
  type RouteRecordRaw,
} from 'vue-router';
import {
  buildAccessibleRoutes,
  fetchPermissionMenus,
  getDefaultRoutePath,
  setAccessibleRouteTree,
  type AppRouteRecord,
} from './permission';

const constantRoutes = [
  {
    path: '/',
    redirect: () => getDefaultRoutePath(),
  },
  {
    path: '/fullstack-guide/download',
    name: 'fullstack-download',
    component: () => import('@/views/FullstackDownloadView.vue'),
    meta: {
      title: '下载功能',
      standaloneLayout: true,
      menuVisible: false,
    },
  },
  {
    path: '/fullstack-guide/upload',
    name: 'fullstack-upload',
    component: () => import('@/views/FullstackUploadView.vue'),
    meta: {
      title: '前端上传',
      standaloneLayout: true,
      menuVisible: false,
    },
  },
  {
    path: '/fullstack-guide/cross-origin',
    name: 'fullstack-cross-origin',
    component: () => import('@/views/FullstackCrossOriginView.vue'),
    meta: {
      title: '前端跨域',
      standaloneLayout: true,
      menuVisible: false,
    },
  },
  {
    path: '/fullstack-guide/auth',
    name: 'fullstack-auth',
    component: () => import('@/views/FullstackAuthView.vue'),
    meta: {
      title: '前端鉴权',
      standaloneLayout: true,
      menuVisible: false,
    },
  },
  {
    path: '/fullstack-guide/cache',
    name: 'fullstack-cache',
    component: () => import('@/views/FullstackCacheView.vue'),
    meta: {
      title: '前端缓存',
      standaloneLayout: true,
      menuVisible: false,
    },
  },
  {
    path: '/fullstack-guide/performance',
    name: 'fullstack-performance',
    component: () => import('@/views/FullstackPerformanceView.vue'),
    meta: {
      title: '前端性能',
      standaloneLayout: true,
      menuVisible: false,
    },
  },
  {
    path: '/fullstack-guide/security',
    name: 'fullstack-security',
    component: () => import('@/views/FullstackSecurityView.vue'),
    meta: {
      title: '前端安全',
      standaloneLayout: true,
      menuVisible: false,
    },
  },
  {
    path: '/fullstack-guide/monitoring',
    name: 'fullstack-monitoring',
    component: () => import('@/views/FullstackMonitoringView.vue'),
    meta: {
      title: '前端监控',
      standaloneLayout: true,
      menuVisible: false,
    },
  },
  {
    path: '/fullstack-guide/testing',
    name: 'fullstack-testing',
    component: () => import('@/views/FullstackTestingView.vue'),
    meta: {
      title: '前端测试',
      standaloneLayout: true,
      menuVisible: false,
    },
  },
  {
    path: '/fullstack-guide/monorepo',
    name: 'fullstack-monorepo',
    component: () => import('@/views/FullstackMonorepoView.vue'),
    meta: {
      title: 'Monorepo 掌握',
      standaloneLayout: true,
      menuVisible: false,
    },
  },
  {
    path: '/fullstack-guide/deployment',
    name: 'fullstack-deployment',
    component: () => import('@/views/FullstackDeploymentView.vue'),
    meta: {
      title: '前端部署',
      standaloneLayout: true,
      menuVisible: false,
    },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes: constantRoutes,
});

let registeredRouteNames: Array<NonNullable<RouteRecordName>> = [];

const collectRouteNames = (routes: AppRouteRecord[]) => {
  const names: Array<NonNullable<RouteRecordName>> = [];

  routes.forEach((route) => {
    if (route.name) {
      names.push(route.name as NonNullable<RouteRecordName>);
    }

    if (route.children?.length) {
      names.push(...collectRouteNames(route.children));
    }
  });

  return names;
};

const resetPermissionRoutes = () => {
  registeredRouteNames.forEach((name) => {
    if (router.hasRoute(name)) {
      router.removeRoute(name);
    }
  });

  registeredRouteNames = [];
};

export const initializeRouter = async () => {
  resetPermissionRoutes();

  const permissionMenus = await fetchPermissionMenus();
  const accessibleRoutes = buildAccessibleRoutes(permissionMenus);

  setAccessibleRouteTree(accessibleRoutes);
  accessibleRoutes.forEach((route) => router.addRoute(route as RouteRecordRaw));
  registeredRouteNames = collectRouteNames(accessibleRoutes);

  if (router.hasRoute('not-found')) {
    router.removeRoute('not-found');
  }

  router.addRoute({
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    redirect: () => getDefaultRoutePath(),
  });
};

export default router;
