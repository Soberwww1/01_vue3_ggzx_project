// 将路由抽离出来
export const constantRoute = [
  // base基础路由
  // 首页架子
  {
    name: 'layout',
    path: '/',
    component: () => import('@/views/framework/layout/index.vue'),
    meta: {
      title: '首页架子',
      show: true, // 决定该路由导航是否显示 --- true显示；false隐藏
      icon: 'User',
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
  // 权限管理
  {
    name: 'permiss',
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
        name: 'user',
        path: '/permiss/user',
        component: () => import('@/views/permiss_mgmt/user_mgmt.vue'),
        meta: {
          title: '用户管理',
          show: true,
          icon: 'User',
        },
      },
      {
        name: 'role',
        path: '/permiss/role',
        component: () => import('@/views/permiss_mgmt/role_mgmt.vue'),
        meta: {
          title: '角色管理',
          show: true,
          icon: 'Avatar',
        },
      },
      {
        name: 'menu',
        path: '/permiss/menu',
        component: () => import('@/views/permiss_mgmt/menu_mgmt.vue'),
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
    name: 'product',
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
        name: 'brand',
        path: '/product/brand',
        component: () => import('@/views/product_mgmt/brand_mgmt.vue'),
        meta: {
          title: '品牌管理',
          show: true,
          icon: 'ShoppingBag',
        },
      },
      {
        name: 'property',
        path: '/product/property',
        component: () => import('@/views/product_mgmt/property_mgmt.vue'),
        meta: {
          title: '属性管理',
          show: true,
          icon: 'Operation',
        },
      },
      {
        name: 'spu',
        path: '/product/spu',
        component: () => import('@/views/product_mgmt/spu_mgmt.vue'),
        meta: {
          title: 'SPU管理',
          show: true,
          icon: 'Suitcase',
        },
      },
      {
        name: 'sku',
        path: '/product/sku',
        component: () => import('@/views/product_mgmt/sku_mgmt.vue'),
        meta: {
          title: 'SKU管理',
          show: true,
          icon: 'SuitcaseLine',
        },
      },
    ],
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
  {
    name: 'Any',
    path: '/:pathMatch(.*)*',
    redirect: '/404',
    meta: {
      title: '任意路由',
      show: false,
      icon: 'Waring',
    },
  },
]
