import {
    VuexModule,
    Module,
    Mutation,
    Action,
    getModule
  } from 'vuex-module-decorators'
import { RouteConfig } from 'vue-router'
import router, { asyncRoutes, constantRoutes } from '@/router'
import store from '@/store'

export const filterAsyncRoutes = (asyncRoutes: RouteConfig[], roles: string[]) => { // 过滤权限路由
    console.log('tests777',asyncRoutes,roles)
    const res: RouteConfig[] = []

    asyncRoutes.forEach(route => {
        const r = { ...route }
        console.log('369',r)
    })
}

export interface IPermissionState {
    routes: RouteConfig[]
    dynamicRoutes: RouteConfig[] // 动态路由
}

@Module({ dynamic: true, store, name: 'permission' })
class Permission extends VuexModule implements IPermissionState {
    public routes: RouteConfig[] = []
    public dynamicRoutes: RouteConfig[] = []

    @Mutation
    private SET_ROUTES(routes: RouteConfig[]) {

    }

    @Action
    public GenerateRoutes(roles: string[]) {
        let accessedRoutes
        accessedRoutes = filterAsyncRoutes(asyncRoutes, roles)
        // this.SET_ROUTES(accessedRoutes)
    }
}

export const PermissionModule = getModule(Permission)
