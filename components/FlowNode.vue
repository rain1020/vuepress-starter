<template>
    <div class="flow">
        <Node :nodeData="flowData"></Node>
    </div>

</template>
<script setup lang="ts">
interface NodeData {
    content: string,
    children?: NodeData[]
}
const props = defineProps({
    flowData: {
        type: Object
    }
})
</script>
<style lang="scss" scoped>
.flow {
    >.node {
        &:after {
            border-left: 0;
        }
    }
}
</style>