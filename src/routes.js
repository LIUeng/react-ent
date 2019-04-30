import BasicLayout from './layouts/BasicLayout';
import UserLayout from './layouts/UserLayout';
import User from './pages/User';
import Hello from './pages/Hello';
import Not404Found from './404';

export default [
  {
    path: '/user',
    component: UserLayout,
    routes: [
      {
        path: '/user/login',
        exact: true,
        component: User,
      },
      {
        component: Not404Found,
        exact: true,
      },
    ],
  },

  {
    path: '/',
    component: BasicLayout,
    routes: [
      {
        path: '/',
        redirect: '/hello',
        exact: true,
      },
      {
        path: '/hello',
        routes: [
          {
            path: '/hello/1',
            exact: true,
            component: Hello,
          },
        ],
      },
      {
        component: Not404Found,
        exact: true,
      },
    ],
  },

  {
    component: Not404Found,
    exact: true,
  },
];
