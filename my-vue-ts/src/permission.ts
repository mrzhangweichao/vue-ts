// 路由鉴权 路由守卫
import router from './router'
import { Route } from 'vue-router'
import { UserModule } from '@/store/modules/user'
import { PermissionModule } from '@/store/modules/permission'
import NProgress from 'nprogress' // Progress 进度条
import 'nprogress/nprogress.css'// Progress 进度条样式

const whiteList = ['/login'] // 不重定向白名单

router.beforeEach(async(to: Route, from: Route, next: any) => {
    // NProgress.start()
    if (UserModule.id_token) {
        if (to.path === '/login') {
            next({ path: '/' })
            NProgress.done()
        } else {
            next()
            if (UserModule.roles.length === 0) { 
                try {
                    await UserModule.GetUserInfo() // 获取用户信息 角色
                    const roles = UserModule.roles
                    PermissionModule.GenerateRoutes(roles) // 获取动态路由
                    router.addRoutes(PermissionModule.dynamicRoutes)
                    next({ ...to, replace: true })
                } catch (err) {

                }
            } else {
                next()
            }
        }
    } else {
        if (whiteList.indexOf(to.path) !== -1) {
            next()
        } else  {
            next('/login')
            NProgress.done()
        }
    }
})

router.afterEach(() => {
    NProgress.done() // 结束Progress
})

