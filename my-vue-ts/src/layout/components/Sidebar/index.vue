<template>
    <div id="sideBar">
        <el-scrollbar wrap-class="scrollbar-wrapper">
            <el-menu
                :default-active="activeMenu"
                :background-color="variables.menuBg"
                :text-color="variables.menuText"
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
        return []
    }
    // 菜单
    get activeMenu() {
        const route = this.$route
        const { meta, path } = route
        return path
    }

    private mounted() {
        console.log(this.$route)
        console.log(variables)
    }
}
</script>