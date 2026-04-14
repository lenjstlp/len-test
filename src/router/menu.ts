import {
  Document,
  DataAnalysis,
  HomeFilled,
  Location,
  Monitor,
  Reading,
} from '@element-plus/icons-vue';
import type { Component } from 'vue';

type NavigationMenuBase = {
  index: string;
  label: string;
  icon: Component;
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

export const navigationMenus: NavigationMenuItem[] = [
  {
    index: '/dashboard',
    label: '首页概览',
    icon: HomeFilled,
  },
  {
    index: '/workspace',
    label: '工作台',
    icon: Monitor,
  },
  {
    index: '/globe',
    label: '星球留言',
    icon: Location,
  },
  {
    index: '/canvas-guide',
    label: 'Canvas 入门',
    icon: Document,
  },
  {
    index: '/python-guide',
    label: 'Python 学习',
    icon: Reading,
  },
  {
    index: '/operations',
    label: '业务管理',
    icon: DataAnalysis,
    children: [
      {
        index: '/operations/projects',
        label: '项目列表',
      },
      {
        index: '/operations/reports',
        label: '数据报表',
      },
    ],
  },
];

export const isMenuGroup = (
  item: NavigationMenuItem,
): item is NavigationMenuGroup => 'children' in item;
