<template>
    <div class="item">
        <svg-icon v-if="icon" :name="icon" :icon-class="icon"/>
        <span class="title" v-if="title">{{title}}</span>
    </div>
    
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import '@/icons/components'
@Component({
    name: 'MenuItem',
})

export default class extends Vue {
    @Prop() icon!: string
    @Prop() title!: string
}
   
</script>
<style lang="scss" scoped>
    .item {
        .title{
            margin-left: 10px;
        }
    }
</style>