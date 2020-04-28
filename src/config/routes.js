// isProtected: các route cần được bảo vệ
// Có thể thêm giá trị vào đây
export const privateRoute = [  
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
export const publicRoute = [
  {
    title: 'Login Page | Sample App',
    component: 'Login',
    path: '/login',
    isProtected: false,
    exact: true
  },
  {
    title: 'Not Found',
    component: 'NotFound',
    path: '/*',
    isProtected: false,
    exact: true
  }
]