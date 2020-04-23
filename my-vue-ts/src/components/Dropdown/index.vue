<template>
    <div class="dropdown">
        <el-dropdown trigger="click">
            <div class="el-dropdown-link">
                <svg-icon name="people"></svg-icon>
                {{userName}}
            </div>
            <el-dropdown-menu slot="dropdown">
                <el-dropdown-item><span @click.prevent="profileClick">个人中心</span></el-dropdown-item>
                <el-dropdown-item><span @click.prevent="resetClick">退出</span></el-dropdown-item>
            </el-dropdown-menu>
        </el-dropdown>
    </div>
    
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator' 
import {UserModule} from '@/store/modules/user'
@Component({
    name: 'Dropdown'
})
export default class extends Vue {
    get userName () {
        return UserModule.userName
    }

    private profileClick () {
        this.$router.push({
            path: '/profile'
        })
    }

    private resetClick () {
        this.$store.dispatch('ResetToken')
        this.$store.dispatch('ResetUserName')
    }
}
</script>
<style lang="scss" scoped>
    .dropdown {
        flex: 1;
        padding-right: 20px;
        text-align: right;
        .el-dropdown { 
            .el-dropdown-link {
                cursor: pointer;
                line-height: 50px;
                height: 50px;
            }
        }
    }
    
</style>