// component
import SvgColor from '../../../components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />;

const navConfig = [
  {
    title: 'dashboard',
    path: '/dashboard/app',
    icon: icon('ic_analytics'),
  },
  {
    title: 'user',
    path: '/dashboard/user',
    icon: icon('ic_user'),
  },

  {
    title: 'login',
    path: '/login',
    icon: icon('ic_lock'),
  },
  {
    title: 'Expired Passwords',
    path: '/passwords',
    icon: icon('ic_lock'),
  },

  {
    title: 'email',
    path: '/email',
    icon: icon('ic_lock'),
  },
  {
    title: 'Page Not found',
    path: '/404',
    icon: icon('ic_disabled'),
  },
];

export default navConfig;