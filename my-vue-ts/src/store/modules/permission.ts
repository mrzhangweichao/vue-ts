import {
    VuexModule,
    Module,
    Mutation,
    Action,
    getModule
  } from 'vuex-module-decorators'
import { RouteConfig } from 'vue-router'
import { asyncRoutes, constantRoutes } from '@/router'
import store from '@/store'

const hasPermission = (roles: string[], asyncRoutesItem: RouteConfig) => {
    // if (asyncRoutesItem.meta && asyncRoutesItem.meta.roles) {
    //     return roles.some(role => asyncRoutesItem.meta.roles.includes(role))
    // } else {
    //     return true
    // }
    console.log('999', roles.some(role => asyncRoutesItem.meta.roles.includes(role)))
    return roles.some(role => asyncRoutesItem.meta.roles.includes(role))
    
}

export const filterAsyncRoutes = (asyncRoutes: RouteConfig[], roles: string[]) => { // 过滤权限路由
    const res: RouteConfig[] = []

    asyncRoutes.forEach(route => {
        const r = { ...route }
        if (hasPermission(roles,r)) {
            if (r.children) {
                r.children = filterAsyncRoutes(r.children, roles)
            }
            res.push(r)
        }
    })
    return res
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
        this.routes = constantRoutes.concat(routes)
        this.dynamicRoutes = routes
    }

    @Action
    public GenerateRoutes(roles: string[]) {
        let accessedRoutes
        accessedRoutes = filterAsyncRoutes(asyncRoutes, roles)
        this.SET_ROUTES(accessedRoutes)
    }
}

export const PermissionModule = getModule(Permission)
