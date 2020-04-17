import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import Layout from '@/layout/index.vue'

Vue.use(VueRouter);

const constantRoutes: RouteConfig[] = [
  {
    path: '/',
    redirect: '/dashboard',
    name: 'Dashboard',
    component: Layout,
    children: [
    {
          path: 'dashboard',
          component: () => import(/* webpackChunkName: "dashboard" */ '@/views/dashboard/index.vue'),
          name: 'Dashboard',
          meta: {
              title: 'dashboard',
              icon: 'dashboard'
          }
      }
    ]
  },
  {
    path: '/login',
    name: 'login',
    // webpackChunkName：懒加载后的文件名
    component: () => import(/* webpackChunkName: "login" */ '@/views/login/index.vue'),
  },
  {
    path: '/profile',
    component: Layout,
    redirect: '/profile/index',
    // meta: { hidden: true },
    children: [
        {
            path: 'index',
            component: () => import(/* webpackChunkName: "profile" */ '@/views/profile/index.vue'),
            name: 'Profile',
            meta: {
                title: '个人中心',
                icon: 'user',
                // noCache: true
            }
        }
    ]
  },
  {
    path: '/404',
    component: () => import(/* webpackChunkName: "404" */ '@/views/error-page/error404.vue'),
    // meta: {hidden: true}
  }

];
export const asyncRoutes: RouteConfig[] = [
  {
    path: '/pages1',
    name: 'pages1',
    component: Layout,
    redirect: '/pages1/pages11',
    meta: {
      title: '菜单1',
      icon: 'example'
    },
    children: [
      {
        path: 'pages11',
        component: () => import(/* webpackChunkName: "first-step" */ '@/views/pages1/pages11.vue'),
        name: 'pages11',
        meta: {
            title: '菜单11'
        }
      },
      {
        path: 'pages12',
        component: () => import(/* webpackChunkName: "first-step" */ '@/views/pages1/pages12.vue'),
        name: 'pages12',
        meta: {
            title: '菜单12'
        }
      }
    ]
  },
  {
    path: '/pages2',
    name: 'pages2',
    component: Layout,
    redirect: '/pages2/pages21',
    meta: {
      title: '菜单2',
      icon: 'example'
    },
    children: [
      {
        path: 'pages21',
        component: () => import(/* webpackChunkName: "first-step" */ '@/views/pages2/pages21.vue'),
        name: 'pages11',
        meta: {
            title: '菜单21'
        }
      },
      {
        path: 'pages22',
        component: () => import(/* webpackChunkName: "first-step" */ '@/views/pages2/pages22.vue'),
        name: 'pages22',
        meta: {
            title: '菜单22'
        }
      }
    ]
  }
]

// const router = new VueRouter({
//   mode: 'history',
//   base: process.env.BASE_URL,
//   routes,
// });
const createRouter = () => new VueRouter({
    // scrollBehavior功能只在 HTML5 history 模式下可用，当切换到新路由时，想要页面滚到顶部，或者是保持原先的滚动位置，就像重新加载页面那样
    // mode: 'history',
    scrollBehavior: (to, from, savedPosition) => {
      if (savedPosition) {// 当且仅当 popstate 导航 (通过浏览器的 前进/后退 按钮触发) 时才可用
        return savedPosition
      } else {
        return { x: 0, y: 0 }
      }
    },
    base: process.env.BASE_URL,
    routes: constantRoutes
})


const router = createRouter()

export default router;
