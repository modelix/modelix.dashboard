import {ClusterOutlined} from '@ant-design/icons';
import {NavGroupData} from "../layout/Dashboard/Drawer/DrawerContent/Navigation/NavGroup.tsx";

const repositories: NavGroupData = {
  id: 'group-repositories',
  title: 'Model Repositories',
  type: 'group',
  children: [
    {
      id: 'repositories',
      title: 'Repositories',
      type: 'item',
      route: '/repositories/default',
      icon: ClusterOutlined,
      breadcrumbs: false
    }
  ]
};

export default repositories;
