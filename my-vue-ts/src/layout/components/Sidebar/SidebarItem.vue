<template>
    <div class="sidebarItem" v-if="!item.hidden">
       <template v-if="hasOneShowingChild(item.children,item) && (!onlyOneChild.children||onlyOneChild.noShowingChildren) && !item.alwaysShow">
            <AppLink
                v-if="onlyOneChild.meta" :to="resolvePath(onlyOneChild.path)"
            >
                 <el-menu-item
                    :index="resolvePath(onlyOneChild.path)"
                    :class="{'submenu-title-noDropdown': !isNest}"
                >
                    <item :icon="onlyOneChild.meta.icon||(item.meta&&item.meta.icon)" :title="onlyOneChild.meta.title" />
                </el-menu-item>
            </AppLink>
       </template>
        <el-submenu v-else ref="subMenu" :index="resolvePath(item.path)" popper-append-to-body>
            <template slot="title">
                <item v-if="item.meta" :icon="item.meta && item.meta.icon" :title="item.meta.title" />
            </template>
            <template v-for="child in item.children">
                <sidebar-item
                    v-if="child.children&&child.children.length>0"
                    :key="child.path"
                    :is-nest="true"
                    :item="child"
                    :base-path="resolvePath(child.path)"
                    class="nest-menu"
                />
                <app-link v-else :to="resolvePath(child.path)" :key="child.name">
                    <el-menu-item :index="resolvePath(child.path)">
                        <item v-if="child.meta" :icon="child.meta.icon" :title="child.meta.title" />
                    </el-menu-item>
                </app-link>
            </template>
        </el-submenu>
    </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import path from 'path'
import {Route, RouteConfig} from 'vue-router'
import AppLink from './Link'
import Item from './Item'
import {isExternal} from '@/utils/validate'
// import '@/icons/components'
@Component({
    name: 'SidebarItem',
    components: {
        AppLink,
        Item
    }
})
export default class extends Vue {
    @Prop({required: true}) private item!: RouteConfig
    @Prop({default: false}) private isNest!: boolean
    @Prop({default: ''}) private basePath!: string

    private onlyOneChild?: any = null

    private hasOneShowingChild (children:RouteConfig, parent: RouteConfig) {
        if (children) {
            const showingChildren = children.filter(item => {
                if(item.hidden) {
                    return false
                } else {
                    this.onlyOneChild = item
                    return true 
                }
            })
            if (showingChildren.length === 1) {
                return true
            }
            if (showingChildren.length === 0) {
                this.onlyOneChild = { ... parent, path: '', noShowingChildren: true }
                return true
            }
            return false
        }
    }

    private resolvePath(routePath: string) {
        if (isExternal(routePath)) {
            return routePath
        }
        if (isExternal(this.basePath)) {
            return this.basePath
        }
        return path.resolve(this.basePath, routePath)
    }
}
</script>
<style lang="scss" scoped>
    .sidebarItem {
        width: 100%;
    }
</style>