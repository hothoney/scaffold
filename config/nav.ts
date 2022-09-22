import { type NavConfig } from './types';

export default {
  defaultLayoutTopNavSchema: [
    {
      key: '0',
      title: '顶部菜单 0',
      items: [
        {
          key: '0-1',
          title: '顶部菜单 0-1',
          items: [
            {
              key: '0-1-0',
              title: '顶部菜单 0-1-0',
            },
          ],
        },
        {
          key: '0-2',
          title: '顶部菜单 0-2',
          href: '/hello',
        },
      ],
    },
    {
      key: '1',
      title: '顶部菜单 1',
      items: [
        {
          key: '1-1',
          title: '顶部菜单 1-1',
        },
        {
          key: '1-2',
          title: '顶部菜单 1-2',
        },
        {
          key: '1-3',
          title: '顶部菜单 1-3',
        },
      ],
    },
    {
      key: '2',
      title: '顶部菜单 2',
    },
    {
      key: '3',
      title: '顶部菜单 3',
    },
  ],
  defaultLayoutSideNavSchema: [
    {
      key: '0',
      title: '侧边菜单 0',
      items: [
        {
          key: '0-1',
          title: '侧边菜单 0-1',
          items: [
            {
              key: '0-1-0',
              title: '侧边菜单 0-1-0',
            },
          ],
        },
        {
          key: '0-2',
          title: '侧边菜单 0-2',
          href: '/hello',
        },
      ],
    },
    {
      key: '1',
      title: '侧边菜单 1',
      items: [
        {
          key: '1-1',
          title: '侧边菜单 1-1',
        },
        {
          key: '1-2',
          title: '侧边菜单 1-2',
        },
        {
          key: '1-3',
          title: '侧边菜单 1-3',
        },
      ],
    },
    {
      key: '2',
      title: '侧边菜单 2',
    },
    {
      key: '3',
      title: '侧边菜单 3',
    },
  ],
} as NavConfig;
