import {LaptopOutlined, GithubOutlined, FileOutlined} from '@ant-design/icons';

import mpsIcon from "../assets/images/mps-logo.png"
import {NavGroupData} from "../layout/Dashboard/Drawer/DrawerContent/Navigation/NavGroup.tsx";

const workspaces: NavGroupData = {
  id: 'group-workspaces',
  title: 'MPS Projects',
  type: 'group',
  children: [
    {
      id: 'mps-assets',
      title: 'MPS Assets',
      type: 'item',
      url: '/workspaces/mps-assets',
      icon: () => <img alt="MPS" src={mpsIcon} width="16px" height="16px" />,
      breadcrumbs: false
    },
    {
      id: 'workspace-templates',
      title: 'Workspace Templates',
      type: 'item',
      url: '/workspaces/workspace-templates',
      icon: FileOutlined,
      breadcrumbs: false
    },
    {
      id: 'workspaces-instances',
      title: 'Workspace Instances',
      type: 'item',
      url: '/workspaces/workspace-instances',
      icon: LaptopOutlined,
      breadcrumbs: false
    },
  ]
};

export default workspaces;