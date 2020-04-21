<template>
    <el-breadcrumb class="app-breadcrumb" separator-class="el-icon-arrow-right">
        <transition-group>
                <el-breadcrumb-item
                    v-for="(item,index) in breadcrumbs"
                    :key="item.path"
                >
                    <span 
                        v-if="item.redirect === 'noredirect' || index === breadcrumbs.length-1" 
                        class="no-redirect titleSpan"
                    >{{item.meta.title}}
                    </span>
                    <a class="titleA" v-else @click.prevent="handleLink(item)">{{ item.meta.title }}</a>
                </el-breadcrumb-item>
        </transition-group>
    </el-breadcrumb>
</template>
<script lang="ts">
import * as pathToRegexp from 'path-to-regexp'
import { Component, Watch, Vue } from 'vue-property-decorator' 
import { RouteRecord, Route } from 'vue-router'
@Component({
    name: 'breadcrumb',
})
export default class extends Vue {
    private breadcrumbs: RouteRecord[] = []

    @Watch('$route')
    private onRouteChange(route: Route) {
        if (route.path.startsWith('/redirect/')) {
            return
        }
        this.getBreadcrumb()
    }

    private getBreadcrumb() {
        let matched = this.$route.matched.filter((item) => item.meta && item.meta.title)
        const first = matched[0]
        if (!this.isDashboard(first)) {
            matched = [{ path: '/dashboard', redirect: '/dashboard', meta: { title: '首页' } } as RouteRecord].concat(matched)
        }
        this.breadcrumbs = matched.filter((item) => {
            return item.meta && item.meta.title && item.meta.breadcrumb !== false
        })
    }

    private isDashboard(route: RouteRecord) {
        const name = route && route.name
        if (!name) {
            return false
        }
        return name.trim().toLocaleLowerCase() === 'Dashboard'.toLocaleLowerCase()
    }

    private pathCompile(path: string) {
        // To solve this problem https://github.com/PanJiaChen/vue-element-admin/issues/561
        const { params } = this.$route
        // console.log(pathToRegexp)
        const toPath = pathToRegexp.compile(path)
        return toPath(params)
    }

    private handleLink(item: any) {
        const { redirect, path } = item
        if (redirect) {
            this.$router.push(redirect)
            return
        }
        this.$router.push(this.pathCompile(path))
    }

    mounted() {
        this.getBreadcrumb()
    }
    
}
</script>
<style lang="scss" scoped>
    .app-breadcrumb {
        margin-left: 16px;
        .titleSpan {
            color: #1890ff;
        }
        .titleA {
            color: #000;
        }
    }
</style>