<template>
    <div class="navbar">
        <Hamburger 
            :is-active="sidebar.opened"
            @toggleClick="toggleSideBar" 
            class="hamburger-container"
        />
        <Breadcrumb />
        
        <Dropdown/>
        
    </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator' 
import {AppModule} from '@/store/modules/app'
import Hamburger from '@/components/Hamburger'
import Breadcrumb from '@/components/Breadcrumb'
import Dropdown from '@/components/Dropdown'
@Component({
    name: 'Navbar',
    components: {
        Hamburger,
        Breadcrumb,
        Dropdown
    }
})
export default class extends Vue {
    get sidebar() {
        return AppModule.sidebar
    }
    private toggleSideBar () {
        AppModule.ToggleSideBar(false)
    }
}
</script>
<style lang="scss" scoped>
    .navbar {
        width: 100%;
        height: 50px;
        display: flex;
        align-items: center;
        border-bottom: 1px solid #ccc;
    }
</style>