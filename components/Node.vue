<template>
    <div class="node">
        <div class="node-content"> {{ nodeData.content }} </div>
        <div class="node-children" v-if="nodeData.children">
            <Node v-for="item in nodeData
            .children" :nodeData="item"></Node>
        </div>
    </div>
</template>
<script setup lang="ts">
interface NodeData {
    content: string,
    children?: NodeData[]
}
defineOptions({
    name: 'node',
})
const props = defineProps(
    {
        nodeData: {
            type: Object as () => NodeData,
        }
    }

)
</script>
<style lang="scss" scoped>
$height: 20px;

.node {
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
    padding-top: $height;

    &:before,
    &:after {
        content: '';
        position: absolute;
        left: 0;
        top: 0;
        width: 50%;
        height: $height;
    }

    &:after {
        left: 50%;
    }

    &:not(:first-child):before,
    &:not(:last-child):after {
        border-top: 1px solid #ddd;
    }

    &:after {
        border-left: 1px solid #ddd;
    }

    .node-content {
        display: flex;
        padding: 10px 20px;
        text-align: center;
        border-radius: 2px;
        box-shadow: 0 1px 5px #00000026
    }

    .node-children {
        display: flex;
        position: relative;
        padding-top: $height;
        width: 100%;

        >* {
            flex: 1
        }

        &:before {
            content: '';
            position: absolute;
            left: 50%;
            top: 0;
            height: $height;
            width: 0;
            border-left: 1px solid #ddd;
        }
    }
}
</style>
