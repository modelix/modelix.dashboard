import {LaptopOutlined, GithubOutlined, FileOutlined} from '@ant-design/icons';

import mpsIcon from "../assets/images/mps-logo.png"
import {NavGroupData} from "../layout/Dashboard/Drawer/DrawerContent/Navigation/NavGroup.tsx";

const workspaces: NavGroupData = {
  id: 'group-workspaces',
  title: 'Workspaces',
  type: 'group',
  children: [
    {
      id: 'mps-assets',
      title: 'MPS Assets',
      type: 'item',
      url: '/workspaces/mps-assets',
      icon: () => <img alt="MPS" src={mpsIcon} width="16px" height="16px"/>,
      breadcrumbs: false
    },
    {
      id: 'workspace-templates',
      title: 'Templates',
      type: 'item',
      url: '/workspaces/templates',
      icon: FileOutlined,
      breadcrumbs: false
    },
    {
      id: 'workspaces',
      title: 'Workspaces',
      type: 'item',
      url: '/workspaces/workspaces',
      icon: FileOutlined,
      breadcrumbs: false
    },
    {
      id: 'workspaces-instances',
      title: 'Instances',
      type: 'item',
      url: '/workspaces/instances',
      icon: LaptopOutlined,
      breadcrumbs: false
    },
  ]
};

export default workspaces;