import { LoginOutlined, ProfileOutlined, UserOutlined } from '@ant-design/icons';

const pages = {
  id: 'authentication',
  title: 'Authentication',
  type: 'group',
  children: [
    {
      id: 'login1',
      title: 'Login',
      type: 'item',
      url: '/login',
      icon: LoginOutlined,
      target: true
    },
    {
      id: 'register1',
      title: 'Register',
      type: 'item',
      url: '/register',
      icon: ProfileOutlined,
      target: true
    },
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
