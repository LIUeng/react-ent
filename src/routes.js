import BasicLayout from './layouts/BasicLayout';
import User from './pages/User';

export default [
  {
    path: '/',
    component: BasicLayout,
    routes: [
      {
        path: '/user',
        component: User,
      },
    ],
  },
  {
    path: '/hello',
    component: User,
    routes: [
      {
        path: '/hello/1',
        component: User,
      },
    ],
  },
];
