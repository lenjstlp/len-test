# len-test

一个基于 Vue 3、Vite、Element Plus 和 Tailwind CSS 的后台前端模板，已重构为带左侧可伸缩导航的基础管理台。当前菜单支持最多两级结构，适合作为中后台、运营台或内部系统的起步工程。

## 技术栈

- Vue 3
- Vite 8
- Vue Router
- Element Plus
- Tailwind CSS 4
- TypeScript
- ESLint + Prettier
- Husky + lint-staged
- Commitlint + Commitizen (`cz-git`)
- pnpm

## 已完成改造

- 删除默认模板组件和无用静态资源，保留业务化页面结构。
- 首页升级为后台布局，左侧菜单支持展开/收起。
- 菜单结构限制为最多两级，便于控制导航复杂度。
- 提供概览、工作台、项目列表、数据报表 4 个示例页面。
- 修正 `vite` 脚本为 `--configLoader runner`，规避 Windows 环境下 Tailwind 原生依赖导致的配置装载失败。

## 开发命令

```bash
pnpm install
pnpm dev
pnpm type-check
pnpm lint
pnpm format
pnpm build
pnpm commit
```

## 目录结构

```text
src/
  components/
    AppSidebar.vue     左侧菜单组件
  router/
    index.ts           路由定义
    menu.ts            两级菜单配置
  styles/
    main.css           全局样式
  views/
    DashboardView.vue  首页概览
    WorkspaceView.vue  工作台
    ProjectsView.vue   项目列表
    ReportsView.vue    数据报表
```

## 菜单扩展说明

项目菜单定义在 `src/router/menu.ts`。

- 一级菜单可以是直接跳转项。
- 一级菜单也可以带 `children`，但 `children` 只能是叶子节点。
- 当前类型设计不是递归结构，因此天然限制为最多两级菜单。

示例：

```ts
{
  index: '/operations',
  label: '业务管理',
  icon: DataAnalysis,
  children: [
    { index: '/operations/projects', label: '项目列表' },
    { index: '/operations/reports', label: '数据报表' },
  ],
}
```

如果新增页面，需要同时更新两处：

1. `src/router/index.ts` 中注册路由
2. `src/router/menu.ts` 中补充菜单项

## 交付建议

- 业务页面继续按 `views` 拆分，公共组件沉淀到 `components`。
- 如果后续引入权限控制，可基于 `menu.ts` 和路由 `meta` 增加权限字段。
- 提交代码前建议至少执行一次 `pnpm lint` 和 `pnpm build`。

## 提交规范

- `pnpm commit` 会进入交互式约定式提交流程。
- `pre-commit` 会执行 `lint-staged`。
- `commit-msg` 会执行 `commitlint`。
