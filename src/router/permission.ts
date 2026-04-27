import {
  Cpu,
  DataAnalysis,
  Document,
  Grid,
  HomeFilled,
  Location,
  Monitor,
  Reading,
  SetUp,
  UserFilled,
} from '@element-plus/icons-vue';
import type { Component } from 'vue';
import type { RouteRecordRaw } from 'vue-router';

type IconKey =
  | 'Cpu'
  | 'DataAnalysis'
  | 'Document'
  | 'Grid'
  | 'HomeFilled'
  | 'Location'
  | 'Monitor'
  | 'Reading'
  | 'SetUp'
  | 'UserFilled';

type ViewKey =
  | 'AlgorithmGuideView'
  | 'AgentGuideView'
  | 'CanvasGuideView'
  | 'DashboardView'
  | 'DockerGuideView'
  | 'FrontendArchitectureGuideView'
  | 'FullstackGuideView'
  | 'GitGuideView'
  | 'GlobeView'
  | 'NextjsGuideView'
  | 'ProjectsView'
  | 'PythonGuideView'
  | 'ResumeView'
  | 'ReportsView'
  | 'Vue3SourceGuideView'
  | 'WorkspaceView';

type PermissionMenuPayload = {
  name: string;
  path: string;
  title: string;
  description?: string;
  icon?: IconKey;
  component?: ViewKey;
  redirect?: string;
  standaloneLayout?: boolean;
  children?: PermissionMenuPayload[];
};

export type AppRouteMeta = {
  title: string;
  description?: string;
  icon?: Component;
  menuVisible?: boolean;
  menuGroup?: boolean;
  standaloneLayout?: boolean;
};

export type AppRouteRecord = Omit<RouteRecordRaw, 'children' | 'meta'> & {
  children?: AppRouteRecord[];
  meta: AppRouteMeta;
};

type NavigationMenuBase = {
  index: string;
  label: string;
  icon?: Component;
};

export type NavigationMenuLeaf = NavigationMenuBase & {
  children?: never;
};

export type NavigationMenuGroup = NavigationMenuBase & {
  children: Array<{
    index: string;
    label: string;
  }>;
};

export type NavigationMenuItem = NavigationMenuLeaf | NavigationMenuGroup;

const iconMap: Record<IconKey, Component> = {
  Cpu,
  DataAnalysis,
  Document,
  Grid,
  HomeFilled,
  Location,
  Monitor,
  Reading,
  SetUp,
  UserFilled,
};

const viewMap: Record<ViewKey, () => Promise<unknown>> = {
  AlgorithmGuideView: () => import('@/views/AlgorithmGuideView.vue'),
  AgentGuideView: () => import('@/views/AgentGuideView.vue'),
  CanvasGuideView: () => import('@/views/CanvasGuideView.vue'),
  DashboardView: () => import('@/views/DashboardView.vue'),
  DockerGuideView: () => import('@/views/DockerGuideView.vue'),
  FrontendArchitectureGuideView: () =>
    import('@/views/FrontendArchitectureGuideView.vue'),
  FullstackGuideView: () => import('@/views/FullstackGuideView.vue'),
  GitGuideView: () => import('@/views/GitGuideView.vue'),
  GlobeView: () => import('@/views/GlobeView.vue'),
  NextjsGuideView: () => import('@/views/NextjsGuideView.vue'),
  ProjectsView: () => import('@/views/ProjectsView.vue'),
  PythonGuideView: () => import('@/views/PythonGuideView.vue'),
  ResumeView: () => import('@/views/ResumeView.vue'),
  ReportsView: () => import('@/views/ReportsView.vue'),
  Vue3SourceGuideView: () => import('@/views/Vue3SourceGuideView.vue'),
  WorkspaceView: () => import('@/views/WorkspaceView.vue'),
};

const mockPermissionMenus: PermissionMenuPayload[] = [
  {
    name: 'dashboard',
    path: '/dashboard',
    title: '首页',
    description: '站长定位、代表栏目、核心观点与长期输出方向。',
    icon: 'HomeFilled',
    component: 'DashboardView',
  },
  {
    name: 'workspace',
    path: '/workspace',
    title: '写作现场',
    description: '展示内容选题、写作原则、方法论沉淀与长期研究方向。',
    icon: 'Monitor',
    component: 'WorkspaceView',
  },
  {
    name: 'resume',
    path: '/resume',
    title: '个人简历',
    description: '展示站长的能力矩阵、代表经历、合作方式与交付视角。',
    icon: 'UserFilled',
    component: 'ResumeView',
    standaloneLayout: true,
  },
  {
    name: 'globe',
    path: '/globe',
    title: '星球留言',
    description: '查看全球留言互动、坐标故事与分层展示的头像信息。',
    icon: 'Location',
    component: 'GlobeView',
  },
  {
    name: 'canvas-guide',
    path: '/canvas-guide',
    title: 'Canvas 入门',
    description:
      '通过分章节的入门文章，建立 Canvas 与 canvas-editor 的实现基础。',
    icon: 'Document',
    component: 'CanvasGuideView',
  },
  {
    name: 'python-guide',
    path: '/python-guide',
    title: 'Python 学习',
    description:
      '系统学习 Python 基础、工程组织与 agent 开发模式，支撑后续智能体实现。',
    icon: 'Reading',
    component: 'PythonGuideView',
  },
  {
    name: 'git-guide',
    path: '/git-guide',
    title: 'Git 命令',
    description: '系统整理 Git 的初始化、提交、分支、远程与回退命令。',
    icon: 'Document',
    component: 'GitGuideView',
  },
  {
    name: 'docker-guide',
    path: '/docker-guide',
    title: 'Docker 学习',
    description:
      '系统学习 Docker 的基础概念、常用命令、Dockerfile、Compose 与前后端项目部署。',
    icon: 'Document',
    component: 'DockerGuideView',
  },
  {
    name: 'agent-guide',
    path: '/agent-guide',
    title: 'Agent 入门',
    description:
      '系统了解 agent 的概念、能力边界、开发方式与截至 2026 年 4 月的市场产品格局。',
    icon: 'Cpu',
    component: 'AgentGuideView',
  },
  {
    name: 'algorithm-guide',
    path: '/algorithm-guide',
    title: '算法题',
    description: '按 LeetCode 顺序逐题补充，用经典题建立真正可迁移的刷题思维。',
    icon: 'Document',
    component: 'AlgorithmGuideView',
  },
  {
    name: 'nextjs-guide',
    path: '/nextjs-guide',
    title: 'Next.js 入门',
    description:
      '从 App Router、Server Components 到部署生产化，建立现代 Next.js 开发基础。',
    icon: 'Document',
    component: 'NextjsGuideView',
  },
  {
    name: 'vue3-source-guide',
    path: '/vue3-source-guide',
    title: 'Vue3 源码',
    description:
      '面向只懂 JavaScript 的读者，从响应式到渲染器，系统讲解 Vue 3 源码主干并附简化示例。',
    icon: 'Document',
    component: 'Vue3SourceGuideView',
  },
  {
    name: 'frontend-architecture',
    path: '/frontend-architecture',
    title: '前端架构',
    description: '系统梳理前端架构需要掌握的领域、支持库与工程化必备知识。',
    icon: 'Grid',
    component: 'FrontendArchitectureGuideView',
    standaloneLayout: true,
  },
  {
    name: 'fullstack-guide',
    path: '/fullstack-guide',
    title: '全栈能力汇总',
    description: '汇总全栈开发需要具备的能力域、语言路线、框架定位与升级路径。',
    icon: 'SetUp',
    component: 'FullstackGuideView',
    standaloneLayout: true,
  },
  {
    name: 'operations',
    path: '/operations',
    title: '作品与观察',
    description: '收纳项目档案与长期观察，保留最多两级的信息组织。',
    icon: 'DataAnalysis',
    redirect: '/operations/projects',
    children: [
      {
        name: 'projects',
        path: '/operations/projects',
        title: '项目档案',
        description: '展示代表项目、产品判断和复杂系统的落地方式。',
        component: 'ProjectsView',
      },
      {
        name: 'reports',
        path: '/operations/reports',
        title: '观察笔记',
        description: '记录技术判断、产品趋势与工程方法上的长期观察。',
        component: 'ReportsView',
      },
    ],
  },
];

let accessibleRouteTree: AppRouteRecord[] = [];

export const fetchPermissionMenus = async (): Promise<
  PermissionMenuPayload[]
> => Promise.resolve(mockPermissionMenus);

const resolveIcon = (icon?: IconKey) => (icon ? iconMap[icon] : undefined);

const getRelativePath = (parentPath: string, currentPath: string) => {
  const normalizedParent = parentPath.endsWith('/')
    ? parentPath
    : `${parentPath}/`;

  if (!currentPath.startsWith(normalizedParent)) {
    return currentPath.replace(/^\//, '');
  }

  return currentPath.slice(normalizedParent.length);
};

const buildRouteRecord = (
  item: PermissionMenuPayload,
  parentPath?: string,
): AppRouteRecord => {
  const routePath = parentPath
    ? getRelativePath(parentPath, item.path)
    : item.path;

  if (item.children?.length) {
    return {
      path: routePath,
      name: item.name,
      redirect: item.redirect,
      meta: {
        title: item.title,
        description: item.description,
        icon: resolveIcon(item.icon),
        menuVisible: true,
        menuGroup: true,
        standaloneLayout: item.standaloneLayout,
      },
      children: item.children.map((child) =>
        buildRouteRecord(child, item.path),
      ),
    };
  }

  if (!item.component) {
    throw new Error(`Route "${item.name}" is missing a component mapping.`);
  }

  return {
    path: routePath,
    name: item.name,
    component: viewMap[item.component],
    meta: {
      title: item.title,
      description: item.description,
      icon: resolveIcon(item.icon),
      menuVisible: true,
      standaloneLayout: item.standaloneLayout,
    },
  };
};

export const buildAccessibleRoutes = (
  permissionMenus: PermissionMenuPayload[],
): AppRouteRecord[] => permissionMenus.map((item) => buildRouteRecord(item));

const findFirstVisiblePath = (routes: AppRouteRecord[]): string | undefined => {
  for (const route of routes) {
    if (route.children?.length) {
      const childPath = findFirstVisiblePath(route.children);

      if (childPath) {
        return childPath.startsWith('/')
          ? childPath
          : `${route.path}/${childPath}`;
      }
    }

    if (route.meta.menuVisible !== false) {
      return route.path;
    }
  }

  return undefined;
};

export const setAccessibleRouteTree = (routes: AppRouteRecord[]) => {
  accessibleRouteTree = routes;
};

export const getAccessibleRouteTree = () => accessibleRouteTree;

export const getDefaultRoutePath = () =>
  findFirstVisiblePath(accessibleRouteTree) ?? '/';

export const getNavigationMenusFromRoutes = (
  routes: AppRouteRecord[] = accessibleRouteTree,
): NavigationMenuItem[] =>
  routes
    .filter((route) => route.meta.menuVisible !== false)
    .map((route) => {
      if (route.children?.length) {
        return {
          index: route.path,
          label: route.meta.title,
          icon: route.meta.icon,
          children: route.children
            .filter((child) => child.meta.menuVisible !== false)
            .map((child) => ({
              index: child.path.startsWith('/')
                ? child.path
                : `${route.path}/${child.path}`,
              label: child.meta.title,
            })),
        };
      }

      return {
        index: route.path,
        label: route.meta.title,
        icon: route.meta.icon,
      };
    });

export const isMenuGroup = (
  item: NavigationMenuItem,
): item is NavigationMenuGroup => 'children' in item;
