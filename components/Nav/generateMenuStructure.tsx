import { Menu } from '@arco-design/web-react';
import Link from 'next/link';

export interface NavSchema {
  key: string;
  title: React.ReactNode;
  icon?: React.ReactNode;
  href?: string;
  disabled?: boolean;
  items?: NavSchema[];
}

/**
 * 根据 Schema 生成菜单组件
 *
 * @param {NavSchema[]} navSchema
 * @return {*}  {JSX.Element[]}
 */
const generatorNavStructure = (navSchema: NavSchema[]): JSX.Element[] => {
  return navSchema.map(({ title, icon, ...navItem }) => {
    const itemContent = (
      <>
        {icon}
        {title}
      </>
    );

    if (navItem?.items && Array.isArray(navItem.items)) {
      return (
        <Menu.SubMenu key={navItem.key} title={itemContent}>
          {generatorNavStructure(navItem.items)}
        </Menu.SubMenu>
      );
    } else {
      return (
        <Menu.Item {...navItem}>
          {navItem.href ? (
            <Link href={navItem.href}>{itemContent}</Link>
          ) : (
            itemContent
          )}
        </Menu.Item>
      );
    }
  });
};

export default generatorNavStructure;
