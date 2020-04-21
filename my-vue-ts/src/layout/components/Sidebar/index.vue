<template>
    <div id="sideBar">
        <el-scrollbar wrap-class="scrollbar-wrapper">
            <el-menu
                :default-active="activeMenu"
                :collapse="isCollapse"
                background-color="#304156"
                text-color="#bfcbd9"
                active-text-color="#409EFF"
                :unique-opened="false"

                mode="vertical"
            >
                <sidebarItem 
                    v-for="route in routes"
                    :key="route.path"
                    :item="route"
                    :base-path="route.path"
                />

            </el-menu>
        </el-scrollbar>
    </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { PermissionModule } from '@/store/modules/permission'
import { AppModule } from '@/store/modules/app'
import SidebarItem from './SidebarItem.vue'
import variables from '@/styles/variables.scss'
@Component({
    name: 'SideBar',
    components: {
        SidebarItem
    }
})
export default class extends Vue {
    private variables:any =  variables
    // 路由
    get routes() {
        return PermissionModule.routes
    }
    // 菜单
    get activeMenu() {
        const route = this.$route
        const { meta, path } = route
        return path
    }
    get sidebar() {
        return AppModule.sidebar
    }
    get isCollapse() {
        return !this.sidebar.opened
    }

    private mounted() {
        // console.log(this.$route)
        // console.log(variables)
    }
}
</script>
<style lang="scss">
// .sidebar-container {
//   // reset element-ui css
//   .horizontal-collapse-transition {
//     transition: 0s width ease-in-out, 0s padding-left ease-in-out, 0s padding-right ease-in-out;
//   }

//   .scrollbar-wrapper {
//     overflow-x: hidden !important;
//   }

//   .el-scrollbar__view {
//     height: 100%
//   }

//   .el-scrollbar__bar {
//     &.is-vertical {
//       right: 0px;
//     }

//     &.is-horizontal {
//       display: none;
//     }
//   }
// }
</style>
<style lang="scss" scoped>
    #sideBar {
        // width: 20%;
        height: 100%;
        .el-scrollbar{
            height: 100%;
        }
        ::v-deep .el-scrollbar__view {
            height: 100%;
        }
        ::v-deep .el-menu {
            height: 100%;
        }
    }
</style>