import {
  Cpu,
  DataAnalysis,
  Document,
  Grid,
  HomeFilled,
  Location,
  Monitor,
  Reading,
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
  | 'Reading';

type ViewKey =
  | 'AgentGuideView'
  | 'CanvasGuideView'
  | 'DashboardView'
  | 'FrontendArchitectureGuideView'
  | 'GlobeView'
  | 'ProjectsView'
  | 'PythonGuideView'
  | 'ReportsView'
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
};

const viewMap: Record<ViewKey, () => Promise<unknown>> = {
  AgentGuideView: () => import('@/views/AgentGuideView.vue'),
  CanvasGuideView: () => import('@/views/CanvasGuideView.vue'),
  DashboardView: () => import('@/views/DashboardView.vue'),
  FrontendArchitectureGuideView: () =>
    import('@/views/FrontendArchitectureGuideView.vue'),
  GlobeView: () => import('@/views/GlobeView.vue'),
  ProjectsView: () => import('@/views/ProjectsView.vue'),
  PythonGuideView: () => import('@/views/PythonGuideView.vue'),
  ReportsView: () => import('@/views/ReportsView.vue'),
  WorkspaceView: () => import('@/views/WorkspaceView.vue'),
};

const mockPermissionMenus: PermissionMenuPayload[] = [
  {
    name: 'dashboard',
    path: '/dashboard',
    title: '首页概览',
    description: '展示项目状态、常用入口与交付节奏。',
    icon: 'HomeFilled',
    component: 'DashboardView',
  },
  {
    name: 'workspace',
    path: '/workspace',
    title: '工作台',
    description: '集中查看开发任务、发布准备和团队协作信息。',
    icon: 'Monitor',
    component: 'WorkspaceView',
  },
  {
    name: 'globe',
    path: '/globe',
    title: '星球留言',
    description: '查看可旋转地球、头像坐标点位与来自世界各处的留言。',
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
    name: 'agent-guide',
    path: '/agent-guide',
    title: 'Agent 入门',
    description:
      '系统了解 agent 的概念、能力边界、开发方式与截至 2026 年 4 月的市场产品格局。',
    icon: 'Cpu',
    component: 'AgentGuideView',
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
    name: 'operations',
    path: '/operations',
    title: '业务管理',
    description: '统一承载二级业务菜单和管理页面。',
    icon: 'DataAnalysis',
    redirect: '/operations/projects',
    children: [
      {
        name: 'projects',
        path: '/operations/projects',
        title: '项目列表',
        description: '二级菜单示例，用于项目与需求的统一管理。',
        component: 'ProjectsView',
      },
      {
        name: 'reports',
        path: '/operations/reports',
        title: '数据报表',
        description: '二级菜单示例，用于查看核心经营和交付指标。',
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
