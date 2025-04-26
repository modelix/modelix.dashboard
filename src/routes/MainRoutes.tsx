import { lazy } from 'react';

// project imports
import Loadable from '../components/Loadable';
import DashboardLayout from '../layout/Dashboard';

// render- Dashboard
const DashboardDefault = Loadable(lazy(() => import('../pages/dashboard/default')));

const WorkspacesList = Loadable(lazy(() => import('../pages/workspaces/workspaces.tsx')));
const WorkspacesGitRepositories = Loadable(lazy(() => import('../pages/workspaces/git-repositories.tsx')));
const WorkspacesMpsEnvironments = Loadable(lazy(() => import('../pages/workspaces/mps-environments.tsx')));

// render - color
const Color = Loadable(lazy(() => import('../pages/component-overview/color')));
const Typography = Loadable(lazy(() => import('../pages/component-overview/typography')));
const Shadow = Loadable(lazy(() => import('../pages/component-overview/shadows')));

// render - sample page
const SamplePage = Loadable(lazy(() => import('../pages/extra-pages/sample-page')));


interface Route {
  path: string,

}


const MainRoutes = {
  path: '/',
  element: <DashboardLayout />,
  children: [
    {
      path: '/',
      element: <DashboardDefault />
    },
    {
      path: 'dashboard',
      children: [
        {
          path: 'default',
          element: <DashboardDefault />
        }
      ]
    },
    {
      path: 'workspaces',
      children: [
        {
          path: 'workspaces',
          element: <WorkspacesList />
        },
        {
          path: 'git-repositories',
          element: <WorkspacesGitRepositories />
        },
        {
          path: 'mps-environments',
          element: <WorkspacesMpsEnvironments />
        }
      ]
    },
    {
      path: 'typography',
      element: <Typography />
    },
    {
      path: 'color',
      element: <Color />
    },
    {
      path: 'shadow',
      element: <Shadow />
    },
    {
      path: 'sample-page',
      element: <SamplePage />
    }
  ]
};

export default MainRoutes;
