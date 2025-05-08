import { LoginOutlined, ProfileOutlined, UserOutlined } from '@ant-design/icons';
import {NavGroupData} from "../layout/Dashboard/Drawer/DrawerContent/Navigation/NavGroup.tsx";

const pages: NavGroupData = {
  id: 'admin',
  title: 'Administration',
  type: 'group',
  children: [
    {
      id: 'user-management',
      title: 'Users',
      type: 'item',
      url: 'https://modelix-dev.q60.de/admin/',
      icon: UserOutlined,
      target: true
    }
  ]
};

export default pages;
