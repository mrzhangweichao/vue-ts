<template>
    <div :class="classObj" class="app-wrapper">
        <!-- <div
            class="drawer-bg" 
        >
        </div> -->
        <sidebar class="sidebar-container"></sidebar>
        <div class="main-container">
            <Navbar/>
            <AppMain/>
        </div>
    </div>
</template>

<script lang="ts">
    import { Component, Vue } from 'vue-property-decorator' 
    import { Sidebar, Navbar, AppMain } from './components'
    @Component({
        name: 'Layout',
        components: {
            Sidebar,
            Navbar,
            AppMain
        }
    })
    export default class extends Vue {
        get sidebar() {
            return this.$store.state.app.sidebar
        }
        get classObj () {
            return {
                hideSidebar: !this.sidebar.opened,
                openSidebar: this.sidebar.opened,
                withoutAnimation: this.sidebar.withoutAnimation,
                // mobile: this.device === 'mobile'
            }
        }
    }
</script>
<style lang="scss" scoped>
    .app-wrapper {
        display: flex;
        // @include clearfix;
        position: relative;
        height: 100%;
        width: 100%;
    }

    // .drawer-bg {
    //     background: #000;
    //     opacity: 0.3;
    //     width: 100%;
    //     top: 0;
    //     height: 100%;
    //     position: absolute;
    //     z-index: 999;
    // }
</style>