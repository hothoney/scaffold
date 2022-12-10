import { IconHistory, IconStorage } from '@arco-design/web-react/icon';
import { type NavConfig } from './types';

export default {
  defaultLayoutTopNavSchema: [
    {
      key: '0',
      title: '首页',
    },
    {
      key: '1',
      title: '寄养中心',
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
      key: '1',
      title: '寄养中心',
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
  ],
  defaultLayoutSideNavSchema: [
    {
      key: '0',
      title: '主数据维护',
      icon: <IconStorage />,
      items: [
        {
          key: '0-1',
          title: '药物种类维护',
          href: '/data/drug',
        },
        {
          key: '0-2',
          title: '宠物物种维护',
          href: '/data/petSpecie',
        },
      ],
    },
    {
      key: '1',
      title: '记录',
      icon: <IconHistory />,
      items: [
        {
          key: '/record/drug',
          title: '药物记录',
          href: '/record/drug',
        },
        {
          key: '/record/foster',
          title: '寄养',
          href: '/record/foster',
        },{
          key: '/record/pet',
          title: '宠物',
          href: '/record/pet',
        },
      ],
    },
  ],
} as NavConfig;
