<template>
    <div id="dashboard">首页</div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { UserModule } from '@/store/modules/user'
@Component({
    name: 'dashboard',
})
export default class extends Vue {
    get token() {
            return UserModule.id_token
        }
}
</script>