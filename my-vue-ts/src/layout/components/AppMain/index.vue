<template>
    <div class="appMain">
        <div>
            <router-view></router-view>
        </div>
    </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
@Component({
    name: 'AppMain'
})
export default class extends Vue {
    
}
</script>
<style lang="scss" scoped>
    .appMain {
        height: calc(100% - 91px);
        padding: 20px;
        overflow: auto;
        >div {
            height: calc(100% - 40px);
            background: #ccc;
            padding: 20px;
        }
    }
</style>