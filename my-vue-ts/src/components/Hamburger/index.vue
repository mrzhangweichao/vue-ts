<template>
    <div>
        <svg-icon
            @click="toggleClick"
            :class="[{'is-active': isActive}]"
            name="hamburger"
            width="36"
            height="36"
        />
    </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator' 
@Component({
    name: 'hamburger',
})
export default class extends Vue {
    @Prop({ default: false }) private isActive!: boolean
    
    private toggleClick () {
        this.$emit('toggleClick')
    }
}
</script>
<style lang="scss" scoped>
    .svg-icon {
        vertical-align: middle;
    }
    .is-active {
        transform: rotate(180deg);
    }
</style>