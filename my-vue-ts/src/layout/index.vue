<template>
    <div class="app-wrapper">
        <!-- <div
            class="drawer-bg" 
        >
        </div> -->
        <sidebar></sidebar>
    </div>
</template>

<script lang="ts">
    import { Component, Vue } from 'vue-property-decorator' 
     import { Sidebar } from './components'
    @Component({
        name: 'Layout',
        components: {
            Sidebar
        }
    })
    export default class extends Vue {

    }
</script>
<style lang="scss" scoped>
    .app-wrapper {
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