import HomePage from 'pages/home';
import PermitPage from 'pages/permit';
import IRoute from './route';

const routes: IRoute[] = [
  {
    path: '/',
    name: 'Home Page',
    component: HomePage,
    exact: true,
  },
  {
    path: '/permit',
    name: 'Permit Page',
    component: PermitPage,
    exact: true,
  },
  {
    path: '/authority',
    name: 'Authority Page',
    component: PermitPage,
    exact: true,
  },
  {
    path: '/loan',
    name: 'Loan Page',
    component: PermitPage,
    exact: true,
  },
  {
    path: '/bank',
    name: 'Bank Page',
    component: PermitPage,
    exact: true,
  },
];

export default routes;
