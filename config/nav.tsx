import { IconHistory, IconStorage } from '@arco-design/web-react/icon';
import { AuthEnum } from '../hooks/useAuth/types';
import { parseToken } from '../hooks/useAuth/utils';
import { type NavConfig } from './types';

export enum UserType {
  /// <summary>
  /// 工作人员
  /// </summary>
  self = 99, //所有菜单
  /// <summary>
  /// 工作人员
  /// </summary>
  Staff = 0, //所有菜单
  /// <summary>
  /// 药品供应商
  /// </summary>
  Manufacturer = 1,
  /// <summary>
  /// 客户
  /// </summary>
  client = 2, //宠物，和寄养信息
}

export default {
  defaultLayoutTopNavSchema: [
    {
      key: '0',
      title: '首页',
    },
    {
      key: '1',
      title: '寄养中心',
    },
  ],
  defaultLayoutSideNavSchema: (role: UserType) => [
    {
      key: '0',
      title: '主数据维护',
      icon: <IconStorage />,
      hidden: role === UserType.client || role === UserType.Manufacturer,
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
      hidden: role === UserType.client,
      items: [
        {
          key: '/record/drug',
          hidden: role === UserType.client,
          title: '药物记录',
          href: '/record/drug',
        },
        {
          key: '/record/foster',
          title: '寄养',
          href: '/record/foster',
        },
        {
          key: '/record/pet',
          title: '宠物',
          href: '/record/pet',
        },
      ],
    },
    {
      key: '2',
      title: '用户数据维护',
      icon: <IconStorage />,
      items: [
        {
          key: '3-1',
          title: '用户',
          href: '/user/user',
        },
      ],
    },
  ],
};
