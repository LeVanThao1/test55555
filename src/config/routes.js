// isProtected: các route cần được bảo vệ
// Có thể thêm giá trị vào đây
export default [  
  {
    title: 'Base URL',
    component: '',
    path: '/',
    isProtected: true,
    exact: true
  },
  {
    title: 'Login Page | Sample App',
    component: 'Login',
    path: '/login',
    isProtected: false,
    exact: true
  },
  {
    title: 'Dashboard | Sample App',
    component: 'Dashboard',
    path: '/dashboard',
    isProtected: true,
    exact: true
  },
  {
    title: 'Setting | Sample App',
    component: 'Setting',
    path: '/setting',
    isProtected: true,
    exact: true
  },
  {
    title: 'Functions',
    component: 'Functions',
    path: '/functions',
    isProtected: true,
    exact: true
  },
  {
    title: 'Functions',
    component: 'FunctionFoo',
    path: '/functions/foo',
    isProtected: true,
    exact: true
  },
]
