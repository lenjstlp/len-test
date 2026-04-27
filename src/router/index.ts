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
  {
    path: '/fullstack-guide/i18n',
    name: 'fullstack-i18n',
    component: () => import('@/views/FullstackI18nView.vue'),
    meta: {
      title: '前端国际化',
      standaloneLayout: true,
      menuVisible: false,
    },
  },
  {
    path: '/fullstack-guide/realtime',
    name: 'fullstack-realtime',
    component: () => import('@/views/FullstackRealtimeView.vue'),
    meta: {
      title: '前端实时通信',
      standaloneLayout: true,
      menuVisible: false,
    },
  },
  {
    path: '/fullstack-guide/state-management',
    name: 'fullstack-state-management',
    component: () => import('@/views/FullstackStateManagementView.vue'),
    meta: {
      title: '前端状态管理',
      standaloneLayout: true,
      menuVisible: false,
    },
  },
  {
    path: '/fullstack-guide/micro-frontend',
    name: 'fullstack-micro-frontend',
    component: () => import('@/views/FullstackMicroFrontendView.vue'),
    meta: {
      title: '前端微前端',
      standaloneLayout: true,
      menuVisible: false,
    },
  },
  {
    path: '/fullstack-guide/forms',
    name: 'fullstack-forms',
    component: () => import('@/views/FullstackFormsView.vue'),
    meta: {
      title: '前端表单工程',
      standaloneLayout: true,
      menuVisible: false,
    },
  },
  {
    path: '/fullstack-guide/design-system',
    name: 'fullstack-design-system',
    component: () => import('@/views/FullstackDesignSystemView.vue'),
    meta: {
      title: '前端设计系统',
      standaloneLayout: true,
      menuVisible: false,
    },
  },
  {
    path: '/fullstack-guide/pwa',
    name: 'fullstack-pwa',
    component: () => import('@/views/FullstackPwaView.vue'),
    meta: {
      title: '前端离线与 PWA',
      standaloneLayout: true,
      menuVisible: false,
    },
  },
  {
    path: '/fullstack-guide/accessibility',
    name: 'fullstack-accessibility',
    component: () => import('@/views/FullstackAccessibilityView.vue'),
    meta: {
      title: '前端无障碍',
      standaloneLayout: true,
      menuVisible: false,
    },
  },
  {
    path: '/fullstack-guide/seo',
    name: 'fullstack-seo',
    component: () => import('@/views/FullstackSeoView.vue'),
    meta: {
      title: '前端 SEO',
      standaloneLayout: true,
      menuVisible: false,
    },
  },
  {
    path: '/fullstack-guide/bff',
    name: 'fullstack-bff',
    component: () => import('@/views/FullstackBffView.vue'),
    meta: {
      title: '前端 BFF',
      standaloneLayout: true,
      menuVisible: false,
    },
  },
  {
    path: '/fullstack-guide/multi-tenant',
    name: 'fullstack-multi-tenant',
    component: () => import('@/views/FullstackMultiTenantView.vue'),
    meta: {
      title: '前端多租户',
      standaloneLayout: true,
      menuVisible: false,
    },
  },
  {
    path: '/fullstack-guide/feature-flags',
    name: 'fullstack-feature-flags',
    component: () => import('@/views/FullstackFeatureFlagsView.vue'),
    meta: {
      title: '前端特性开关',
      standaloneLayout: true,
      menuVisible: false,
    },
  },
  {
    path: '/fullstack-guide/config-center',
    name: 'fullstack-config-center',
    component: () => import('@/views/FullstackConfigCenterView.vue'),
    meta: {
      title: '前端配置中心',
      standaloneLayout: true,
      menuVisible: false,
    },
  },
  {
    path: '/fullstack-guide/api-contract',
    name: 'fullstack-api-contract',
    component: () => import('@/views/FullstackApiContractView.vue'),
    meta: {
      title: '前端接口契约',
      standaloneLayout: true,
      menuVisible: false,
    },
  },
  {
    path: '/fullstack-guide/resilience',
    name: 'fullstack-resilience',
    component: () => import('@/views/FullstackResilienceView.vue'),
    meta: {
      title: '前端容灾降级',
      standaloneLayout: true,
      menuVisible: false,
    },
  },
  {
    path: '/fullstack-guide/dependency-governance',
    name: 'fullstack-dependency-governance',
    component: () => import('@/views/FullstackDependencyGovernanceView.vue'),
    meta: {
      title: '前端依赖治理',
      standaloneLayout: true,
      menuVisible: false,
    },
  },
  {
    path: '/fullstack-guide/web-worker',
    name: 'fullstack-web-worker',
    component: () => import('@/views/FullstackWebWorkerView.vue'),
    meta: {
      title: '前端 Web Worker',
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
