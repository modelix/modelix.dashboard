import { CloudServerOutlined } from '@ant-design/icons';

const repositories = {
  id: 'group-repositories',
  title: 'Model Repositories',
  type: 'group',
  children: [
    {
      id: 'repositories',
      title: 'Repositories',
      type: 'item',
      url: '/repositories/default',
      icon: CloudServerOutlined,
      breadcrumbs: false
    }
  ]
};

export default repositories;
