import { LaptopOutlined, GithubOutlined } from '@ant-design/icons';

import mpsIcon from "../assets/images/mps-logo.png"

const workspaces = {
  id: 'group-workspaces',
  title: 'MPS Workspaces',
  type: 'group',
  children: [
    {
      id: 'workspaces',
      title: 'Workspaces',
      type: 'item',
      url: '/workspaces/workspaces',
      icon: LaptopOutlined,
      breadcrumbs: false
    },
    {
      id: 'git-repositories',
      title: 'Git Repositories',
      type: 'item',
      url: '/workspaces/git-repositories',
      icon: GithubOutlined,
      breadcrumbs: false
    },
    {
      id: 'mps-environments',
      title: 'MPS Environments',
      type: 'item',
      url: '/workspaces/mps-environments',
      icon: () => <img alt="MPS" src={mpsIcon} width="16px" height="16px" />,
      breadcrumbs: false
    }
  ]
};

export default workspaces;