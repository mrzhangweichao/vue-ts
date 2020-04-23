<template>
    <div>pages11
        <el-button v-if="isRole" type="primary">编辑</el-button>
    </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import {UserModule} from '@/store/modules/user'
@Component({
    name: 'pages11',
})
export default class extends Vue {
    get roles() {
        return UserModule.roles
    }

    get isRole() {
        let index = this.roles.findIndex(item => item === 'super_admin')
        if (index >= 0) {
            return true
        } else {
            return false
        }
    }

    mounted () {
        
        
    }
}
</script>