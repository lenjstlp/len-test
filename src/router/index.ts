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
    path: '/fullstack-guide/auth-token',
    name: 'fullstack-auth-token',
    component: () => import('@/views/FullstackAuthTokenView.vue'),
    meta: {
      title: '前端认证与令牌工程',
      standaloneLayout: true,
      menuVisible: false,
    },
  },
  {
    path: '/fullstack-guide/qr-login-engineering',
    name: 'fullstack-qr-login-engineering',
    component: () => import('@/views/FullstackQrLoginEngineeringView.vue'),
    meta: {
      title: '前端扫码登录工程',
      standaloneLayout: true,
      menuVisible: false,
    },
  },
  {
    path: '/fullstack-guide/sso-engineering',
    name: 'fullstack-sso-engineering',
    component: () => import('@/views/FullstackSsoEngineeringView.vue'),
    meta: {
      title: '前端单点登录工程',
      standaloneLayout: true,
      menuVisible: false,
    },
  },
  {
    path: '/fullstack-guide/device-risk-engineering',
    name: 'fullstack-device-risk-engineering',
    component: () => import('@/views/FullstackDeviceRiskEngineeringView.vue'),
    meta: {
      title: '前端设备风控工程',
      standaloneLayout: true,
      menuVisible: false,
    },
  },
  {
    path: '/fullstack-guide/session-kickout-engineering',
    name: 'fullstack-session-kickout-engineering',
    component: () =>
      import('@/views/FullstackSessionKickoutEngineeringView.vue'),
    meta: {
      title: '前端会话互踢工程',
      standaloneLayout: true,
      menuVisible: false,
    },
  },
  {
    path: '/fullstack-guide/electronic-signature',
    name: 'fullstack-electronic-signature',
    component: () => import('@/views/FullstackElectronicSignatureView.vue'),
    meta: {
      title: '前端电子签章工程',
      standaloneLayout: true,
      menuVisible: false,
    },
  },
  {
    path: '/fullstack-guide/im-chat-engineering',
    name: 'fullstack-im-chat-engineering',
    component: () => import('@/views/FullstackImChatEngineeringView.vue'),
    meta: {
      title: '前端 IM 聊天工程',
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
    path: '/fullstack-guide/api-cache-engineering',
    name: 'fullstack-api-cache-engineering',
    component: () => import('@/views/FullstackApiCacheEngineeringView.vue'),
    meta: {
      title: '前端 API 缓存工程',
      standaloneLayout: true,
      menuVisible: false,
    },
  },
  {
    path: '/fullstack-guide/multi-tab-sync',
    name: 'fullstack-multi-tab-sync',
    component: () => import('@/views/FullstackMultiTabSyncView.vue'),
    meta: {
      title: '前端多标签页同步工程',
      standaloneLayout: true,
      menuVisible: false,
    },
  },
  {
    path: '/fullstack-guide/retry-idempotency',
    name: 'fullstack-retry-idempotency',
    component: () => import('@/views/FullstackRetryIdempotencyView.vue'),
    meta: {
      title: '前端重试与幂等工程',
      standaloneLayout: true,
      menuVisible: false,
    },
  },
  {
    path: '/fullstack-guide/concurrency-control',
    name: 'fullstack-concurrency-control',
    component: () => import('@/views/FullstackConcurrencyControlView.vue'),
    meta: {
      title: '前端并发控制工程',
      standaloneLayout: true,
      menuVisible: false,
    },
  },
  {
    path: '/fullstack-guide/polling-refresh',
    name: 'fullstack-polling-refresh',
    component: () => import('@/views/FullstackPollingRefreshView.vue'),
    meta: {
      title: '前端轮询与增量刷新工程',
      standaloneLayout: true,
      menuVisible: false,
    },
  },
  {
    path: '/fullstack-guide/resumable-upload',
    name: 'fullstack-resumable-upload',
    component: () => import('@/views/FullstackResumableUploadView.vue'),
    meta: {
      title: '前端文件断点续传工程',
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
    path: '/fullstack-guide/performance-governance',
    name: 'fullstack-performance-governance',
    component: () => import('@/views/FullstackPerformanceGovernanceView.vue'),
    meta: {
      title: '前端性能治理工程',
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
    path: '/fullstack-guide/browser-compatibility',
    name: 'fullstack-browser-compatibility',
    component: () => import('@/views/FullstackBrowserCompatibilityView.vue'),
    meta: {
      title: '前端浏览器兼容工程',
      standaloneLayout: true,
      menuVisible: false,
    },
  },
  {
    path: '/fullstack-guide/bundle-governance',
    name: 'fullstack-bundle-governance',
    component: () => import('@/views/FullstackBundleGovernanceView.vue'),
    meta: {
      title: '前端包体积治理工程',
      standaloneLayout: true,
      menuVisible: false,
    },
  },
  {
    path: '/fullstack-guide/local-database',
    name: 'fullstack-local-database',
    component: () => import('@/views/FullstackLocalDatabaseView.vue'),
    meta: {
      title: '前端本地数据库工程',
      standaloneLayout: true,
      menuVisible: false,
    },
  },
  {
    path: '/fullstack-guide/data-sync',
    name: 'fullstack-data-sync',
    component: () => import('@/views/FullstackDataSyncView.vue'),
    meta: {
      title: '前端数据同步工程',
      standaloneLayout: true,
      menuVisible: false,
    },
  },
  {
    path: '/fullstack-guide/session-keepalive',
    name: 'fullstack-session-keepalive',
    component: () => import('@/views/FullstackSessionKeepaliveView.vue'),
    meta: {
      title: '前端会话保活工程',
      standaloneLayout: true,
      menuVisible: false,
    },
  },
  {
    path: '/fullstack-guide/session-replay',
    name: 'fullstack-session-replay',
    component: () => import('@/views/FullstackSessionReplayView.vue'),
    meta: {
      title: '前端操作回放工程',
      standaloneLayout: true,
      menuVisible: false,
    },
  },
  {
    path: '/fullstack-guide/url-state-engineering',
    name: 'fullstack-url-state-engineering',
    component: () => import('@/views/FullstackUrlStateEngineeringView.vue'),
    meta: {
      title: '前端 URL 状态工程',
      standaloneLayout: true,
      menuVisible: false,
    },
  },
  {
    path: '/fullstack-guide/clipboard-engineering',
    name: 'fullstack-clipboard-engineering',
    component: () => import('@/views/FullstackClipboardEngineeringView.vue'),
    meta: {
      title: '前端剪贴板工程',
      standaloneLayout: true,
      menuVisible: false,
    },
  },
  {
    path: '/fullstack-guide/notification-push-engineering',
    name: 'fullstack-notification-push-engineering',
    component: () =>
      import('@/views/FullstackNotificationPushEngineeringView.vue'),
    meta: {
      title: '前端通知推送工程',
      standaloneLayout: true,
      menuVisible: false,
    },
  },
  {
    path: '/fullstack-guide/undo-redo-engineering',
    name: 'fullstack-undo-redo-engineering',
    component: () => import('@/views/FullstackUndoRedoEngineeringView.vue'),
    meta: {
      title: '前端撤销重做工程',
      standaloneLayout: true,
      menuVisible: false,
    },
  },
  {
    path: '/fullstack-guide/gradual-release',
    name: 'fullstack-gradual-release',
    component: () => import('@/views/FullstackGradualReleaseView.vue'),
    meta: {
      title: '前端灰度发布工程',
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
    path: '/fullstack-guide/environment-variables',
    name: 'fullstack-environment-variables',
    component: () => import('@/views/FullstackEnvironmentVariablesView.vue'),
    meta: {
      title: '前端环境变量工程',
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
    path: '/fullstack-guide/error-boundary',
    name: 'fullstack-error-boundary',
    component: () => import('@/views/FullstackErrorBoundaryView.vue'),
    meta: {
      title: '前端错误边界工程',
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
  {
    path: '/fullstack-guide/package-manager',
    name: 'fullstack-package-manager',
    component: () => import('@/views/FullstackPackageManagerView.vue'),
    meta: {
      title: 'Node 包管理',
      standaloneLayout: true,
      menuVisible: false,
    },
  },
  {
    path: '/fullstack-guide/package-json',
    name: 'fullstack-package-json',
    component: () => import('@/views/FullstackPackageJsonView.vue'),
    meta: {
      title: 'package.json 详解',
      standaloneLayout: true,
      menuVisible: false,
    },
  },
  {
    path: '/fullstack-guide/scaffolding',
    name: 'fullstack-scaffolding',
    component: () => import('@/views/FullstackScaffoldingView.vue'),
    meta: {
      title: '前端脚手架工程',
      standaloneLayout: true,
      menuVisible: false,
    },
  },
  {
    path: '/fullstack-guide/search',
    name: 'fullstack-search',
    component: () => import('@/views/FullstackSearchView.vue'),
    meta: {
      title: '前端搜索',
      standaloneLayout: true,
      menuVisible: false,
    },
  },
  {
    path: '/fullstack-guide/rich-text-editor',
    name: 'fullstack-rich-text-editor',
    component: () => import('@/views/FullstackRichTextEditorView.vue'),
    meta: {
      title: '前端富文本编辑器',
      standaloneLayout: true,
      menuVisible: false,
    },
  },
  {
    path: '/fullstack-guide/low-code',
    name: 'fullstack-low-code',
    component: () => import('@/views/FullstackLowCodeView.vue'),
    meta: {
      title: '前端低代码平台',
      standaloneLayout: true,
      menuVisible: false,
    },
  },
  {
    path: '/fullstack-guide/visualization',
    name: 'fullstack-visualization',
    component: () => import('@/views/FullstackVisualizationView.vue'),
    meta: {
      title: '前端可视化工程',
      standaloneLayout: true,
      menuVisible: false,
    },
  },
  {
    path: '/fullstack-guide/map-engineering',
    name: 'fullstack-map-engineering',
    component: () => import('@/views/FullstackMapEngineeringView.vue'),
    meta: {
      title: '前端地图工程',
      standaloneLayout: true,
      menuVisible: false,
    },
  },
  {
    path: '/fullstack-guide/report-printing',
    name: 'fullstack-report-printing',
    component: () => import('@/views/FullstackReportPrintingView.vue'),
    meta: {
      title: '前端报表打印工程',
      standaloneLayout: true,
      menuVisible: false,
    },
  },
  {
    path: '/fullstack-guide/document-collaboration',
    name: 'fullstack-document-collaboration',
    component: () => import('@/views/FullstackDocumentCollaborationView.vue'),
    meta: {
      title: '前端文档协同工程',
      standaloneLayout: true,
      menuVisible: false,
    },
  },
  {
    path: '/fullstack-guide/workflow-orchestration',
    name: 'fullstack-workflow-orchestration',
    component: () => import('@/views/FullstackWorkflowOrchestrationView.vue'),
    meta: {
      title: '前端工作流编排工程',
      standaloneLayout: true,
      menuVisible: false,
    },
  },
  {
    path: '/fullstack-guide/rule-engine',
    name: 'fullstack-rule-engine',
    component: () => import('@/views/FullstackRuleEngineView.vue'),
    meta: {
      title: '前端规则引擎工程',
      standaloneLayout: true,
      menuVisible: false,
    },
  },
  {
    path: '/fullstack-guide/permission-system',
    name: 'fullstack-permission-system',
    component: () => import('@/views/FullstackPermissionSystemView.vue'),
    meta: {
      title: '前端权限系统工程',
      standaloneLayout: true,
      menuVisible: false,
    },
  },
  {
    path: '/fullstack-guide/message-center',
    name: 'fullstack-message-center',
    component: () => import('@/views/FullstackMessageCenterView.vue'),
    meta: {
      title: '前端消息中心工程',
      standaloneLayout: true,
      menuVisible: false,
    },
  },
  {
    path: '/fullstack-guide/task-scheduling',
    name: 'fullstack-task-scheduling',
    component: () => import('@/views/FullstackTaskSchedulingView.vue'),
    meta: {
      title: '前端任务调度工程',
      standaloneLayout: true,
      menuVisible: false,
    },
  },
  {
    path: '/fullstack-guide/table-engineering',
    name: 'fullstack-table-engineering',
    component: () => import('@/views/FullstackTableEngineeringView.vue'),
    meta: {
      title: '前端表格工程',
      standaloneLayout: true,
      menuVisible: false,
    },
  },
  {
    path: '/fullstack-guide/file-preview',
    name: 'fullstack-file-preview',
    component: () => import('@/views/FullstackFilePreviewView.vue'),
    meta: {
      title: '前端文件预览工程',
      standaloneLayout: true,
      menuVisible: false,
    },
  },
  {
    path: '/fullstack-guide/theme-system',
    name: 'fullstack-theme-system',
    component: () => import('@/views/FullstackThemeSystemView.vue'),
    meta: {
      title: '前端主题系统工程',
      standaloneLayout: true,
      menuVisible: false,
    },
  },
  {
    path: '/fullstack-guide/tracking-analytics',
    name: 'fullstack-tracking-analytics',
    component: () => import('@/views/FullstackTrackingAnalyticsView.vue'),
    meta: {
      title: '前端埋点工程',
      standaloneLayout: true,
      menuVisible: false,
    },
  },
  {
    path: '/fullstack-guide/sdk-engineering',
    name: 'fullstack-sdk-engineering',
    component: () => import('@/views/FullstackSdkEngineeringView.vue'),
    meta: {
      title: '前端 SDK 工程',
      standaloneLayout: true,
      menuVisible: false,
    },
  },
  {
    path: '/fullstack-guide/mock-engineering',
    name: 'fullstack-mock-engineering',
    component: () => import('@/views/FullstackMockEngineeringView.vue'),
    meta: {
      title: '前端 Mock 工程',
      standaloneLayout: true,
      menuVisible: false,
    },
  },
  {
    path: '/fullstack-guide/import-engineering',
    name: 'fullstack-import-engineering',
    component: () => import('@/views/FullstackImportEngineeringView.vue'),
    meta: {
      title: '前端导入工程',
      standaloneLayout: true,
      menuVisible: false,
    },
  },
  {
    path: '/fullstack-guide/payment-engineering',
    name: 'fullstack-payment-engineering',
    component: () => import('@/views/FullstackPaymentEngineeringView.vue'),
    meta: {
      title: '前端支付工程',
      standaloneLayout: true,
      menuVisible: false,
    },
  },
  {
    path: '/fullstack-guide/audit-log-engineering',
    name: 'fullstack-audit-log-engineering',
    component: () => import('@/views/FullstackAuditLogEngineeringView.vue'),
    meta: {
      title: '前端审计日志工程',
      standaloneLayout: true,
      menuVisible: false,
    },
  },
  {
    path: '/fullstack-guide/export-engineering',
    name: 'fullstack-export-engineering',
    component: () => import('@/views/FullstackExportEngineeringView.vue'),
    meta: {
      title: '前端导出工程',
      standaloneLayout: true,
      menuVisible: false,
    },
  },
  {
    path: '/fullstack-guide/draft-box-engineering',
    name: 'fullstack-draft-box-engineering',
    component: () => import('@/views/FullstackDraftBoxEngineeringView.vue'),
    meta: {
      title: '前端草稿箱工程',
      standaloneLayout: true,
      menuVisible: false,
    },
  },
  {
    path: '/fullstack-guide/recycle-bin-engineering',
    name: 'fullstack-recycle-bin-engineering',
    component: () => import('@/views/FullstackRecycleBinEngineeringView.vue'),
    meta: {
      title: '前端回收站工程',
      standaloneLayout: true,
      menuVisible: false,
    },
  },
  {
    path: '/fullstack-guide/data-masking-engineering',
    name: 'fullstack-data-masking-engineering',
    component: () => import('@/views/FullstackDataMaskingEngineeringView.vue'),
    meta: {
      title: '前端数据脱敏工程',
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
