import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      redirect: '/dashboard',
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: () => import('@/views/DashboardView.vue'),
      meta: {
        title: '首页概览',
        description: '展示项目状态、常用入口与交付节奏。',
      },
    },
    {
      path: '/workspace',
      name: 'workbench',
      component: () => import('@/views/WorkspaceView.vue'),
      meta: {
        title: '工作台',
        description: '集中查看开发任务、发布准备和团队协作信息。',
      },
    },
    {
      path: '/globe',
      name: 'globe',
      component: () => import('@/views/GlobeView.vue'),
      meta: {
        title: '星球留言',
        description: '查看可旋转地球、头像坐标点位与来自世界各处的留言。',
      },
    },
    {
      path: '/canvas-guide',
      name: 'canvas-guide',
      component: () => import('@/views/CanvasGuideView.vue'),
      meta: {
        title: 'Canvas 入门',
        description:
          '通过分章节的入门文章，建立 Canvas 与 canvas-editor 的实现基础。',
      },
    },
    {
      path: '/python-guide',
      name: 'python-guide',
      component: () => import('@/views/PythonGuideView.vue'),
      meta: {
        title: 'Python 学习',
        description:
          '系统学习 Python 基础、工程组织与 agent 开发模式，支撑后续智能体实现。',
      },
    },
    {
      path: '/agent-guide',
      name: 'agent-guide',
      component: () => import('@/views/AgentGuideView.vue'),
      meta: {
        title: 'Agent 入门',
        description:
          '系统了解 agent 的概念、能力边界、开发方式与截至 2026 年 4 月的市场产品格局。',
      },
    },
    {
      path: '/operations/projects',
      name: 'projects',
      component: () => import('@/views/ProjectsView.vue'),
      meta: {
        title: '项目列表',
        description: '二级菜单示例，用于项目与需求的统一管理。',
        parentTitle: '业务管理',
      },
    },
    {
      path: '/operations/reports',
      name: 'reports',
      component: () => import('@/views/ReportsView.vue'),
      meta: {
        title: '数据报表',
        description: '二级菜单示例，用于查看核心经营和交付指标。',
        parentTitle: '业务管理',
      },
    },
  ],
});

export default router;
