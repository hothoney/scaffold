import React from 'react';
import { Menu, MenuProps as ArcoMenuProps } from '@arco-design/web-react';
import generatorMenuStructure, {
  type NavSchema,
} from './generateMenuStructure';

interface NavProps {
  schema: NavSchema[];
}

const nav: React.FC<NavProps & ArcoMenuProps> = ({ schema, ...props }) => {
  return <Menu {...props}>{generatorMenuStructure(schema)}</Menu>;
};

export default nav;
