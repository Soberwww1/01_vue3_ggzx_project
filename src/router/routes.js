// 将路由抽离出来
export const constantRoute = [
  // base基础路由
  // 首页架子
  {
    name: 'layout',
    path: '/',
    component: () => import('@/views/framework/layout/index.vue'),
    meta: {
      title: '',
      show: true, // 决定该路由导航是否显示 --- true显示；false隐藏
    },
    redirect: '/home',
    // layout首页具有很多二级路由 --- 这里进行test测试
    children: [
      {
        name: 'home',
        path: '/home', // 首页
        component: () => import('@/views/home/index.vue'),
        meta: {
          title: '首页',
          show: true,
          icon: 'HomeFilled',
        },
      },
    ],
  },
  // 登录路由
  {
    name: 'login',
    path: '/login',
    component: () => import('@/views/framework/login/index.vue'),
    meta: {
      title: '登录路由',
      show: false,
      icon: 'Promotion',
    },
  },
  // 数据可视化大屏路由
  {
    name: 'visual',
    path: '/visual',
    component: () => import('@/views/visualization/index.vue'),
    meta: {
      title: '数据可视化',
      show: true,
      icon: 'Platform',
    },
  },
  // 404 --- error路由
  {
    name: '404',
    path: '/404',
    component: () => import('@/views/framework/error/index.vue'),
    meta: {
      title: '404 --- error',
      show: false,
      icon: 'Waring',
    },
  },
  // 任意页面路由 --- 跳转到404页面
  // {
  //   name: 'Any',
  //   path: '/:pathMatch(.*)*',
  //   redirect: '/404',
  //   meta: {
  //     title: '任意路由',
  //     show: false,
  //     icon: 'Waring',
  //   },
  // },
]

// 异步路由 --- 特定权限用户智能访问特定路由
export const asyncRoute = [
  // 权限管理
  {
    name: 'Acl',
    path: '/permiss',
    component: () => import('@/views/framework/layout/index.vue'),
    meta: {
      title: '权限管理',
      show: true,
      icon: 'Checked',
    },
    redirect: '/permiss/user',
    // 权限管理一级路由下具有很多二级路由
    children: [
      {
        name: 'User',
        path: '/permiss/user',
        component: () => import('@/views/permiss_mgmt/user_mgmt/index.vue'),
        meta: {
          title: '用户管理',
          show: true,
          icon: 'User',
        },
      },
      {
        name: 'Role',
        path: '/permiss/role',
        component: () => import('@/views/permiss_mgmt/role_mgmt/index.vue'),
        meta: {
          title: '角色管理',
          show: true,
          icon: 'Avatar',
        },
      },
      {
        name: 'Permission',
        path: '/permiss/menu',
        component: () => import('@/views/permiss_mgmt/menu_mgmt/index.vue'),
        meta: {
          title: '菜单管理',
          show: true,
          icon: 'Menu',
        },
      },
    ],
  },
  // 商品管理
  {
    name: 'Product',
    path: '/product',
    component: () => import('@/views/framework/layout/index.vue'),
    meta: {
      title: '商品管理',
      show: true,
      icon: 'GoodsFilled',
    },
    redirect: '/product/brand',
    // 商品管理一级路由下具有很多二级路由
    children: [
      {
        name: 'Trademark',
        path: '/product/brand',
        component: () => import('@/views/product_mgmt/brand_mgmt/index.vue'),
        meta: {
          title: '品牌管理',
          show: true,
          icon: 'ShoppingBag',
        },
      },
      {
        name: 'Attr',
        path: '/product/property',
        component: () => import('@/views/product_mgmt/property_mgmt/index.vue'),
        meta: {
          title: '属性管理',
          show: true,
          icon: 'Operation',
        },
      },
      {
        name: 'Spu',
        path: '/product/spu',
        component: () => import('@/views/product_mgmt/spu_mgmt/index.vue'),
        meta: {
          title: 'SPU管理',
          show: true,
          icon: 'Suitcase',
        },
      },
      {
        name: 'Sku',
        path: '/product/sku',
        component: () => import('@/views/product_mgmt/sku_mgmt/index.vue'),
        meta: {
          title: 'SKU管理',
          show: true,
          icon: 'SuitcaseLine',
        },
      },
    ],
  },
]

// 任意页面路由 --- 跳转到404页面
// 这个也要异步加载注册，因为路由异步加载注册是异步的，需要时间，
// 如果任意路由是常量路由，那么会在异步路由加载注册之前拦截并重载到404页面，
// 所以任意路由也要成为异步加载的路由，并且还要在用户的特定权限路由注册之后注册
export const anyRoute = {
  name: 'Any',
  path: '/:pathMatch(.*)*',
  redirect: '/404',
  meta: {
    title: '任意路由',
    show: false,
    icon: 'Waring',
  },
}
