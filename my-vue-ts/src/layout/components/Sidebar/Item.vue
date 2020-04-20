<template>
    <div>
        <svg-icon v-if="icon" :name="icon" :icon-class="icon"/>
        <span v-if="title">{{title}}</span>
    </div>
    
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
@Component({
    name: 'MenuItem',
})

export default class extends Vue {
    @Prop() icon!: string
    @Prop() title!: string
}
   
</script>