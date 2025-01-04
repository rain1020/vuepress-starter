<template>
    <div class="layers">
        <el-tree ref="treeRef" style="max-width: 600px" class="filter-tree" :data="treeData" :props="defaultProps"
            show-checkbox node-key="key" default-expand-all>
            <template #default="{ node, data }">
                <span class="custom-tree-node" @click="onSelect(data)">
                    <span class="node">{{ node.label }}</span>
                    <span class="handel-node">
                        <a @click="(e: Event) => onLock(e, data)">
                            {{ data.locked ? 'UL' : 'L' }}
                        </a>
                        <a style="margin-left: 8px" @click="(e: Event) => onVisible(e, data)">
                            {{ data.visible ? 'UV' : 'V' }}
                        </a>
                    </span>
                </span>
            </template>
        </el-tree>
    </div>
</template>
<script lang="ts" setup>
import { ref, computed, onMounted, unref } from 'vue';

const props = defineProps({
    page: {
        type: Object
    },
    child: {
    },
})
const emit = defineEmits(['onSelect', 'onLock', 'onVisible'])
const defaultProps = {
    children: 'children',
    label: '_name',
}
const treeRef = ref()
const treeData = computed(() => {
    return getTreeData(props.child)
})

const getTreeData = (
    objects: any,
    searchKey?: string,
    parentVisible = true,
) => {
    const objs: ITreeNodeData[] = []
    if (!objects) return objs
    for (const object of objects) {
        const isCollection = Array.isArray(object.children)
        const proxyData = object.__
        const children = isCollection
            ? getTreeData(object.children, searchKey, parentVisible && proxyData._visible)
            : []
        const nodeData = Object.assign(proxyData, {
            key: object.innerId,
            draggable: true,
            children: children,
            aa: "124",
        })
        objs.unshift(nodeData)
    }
    return objs
}
const onSelect = (data: ITreeNodeData) => {
    emit('onSelect', data.key);
}
const setSelect = (key: string | number) => {
    unref(treeRef).setCheckedKeys([key], true)
}
const onLock = (e: Event, data: ITreeNodeData) => {
    e.stopPropagation();
    emit('onLock', data.key);
}
const onVisible = (e: Event, data: ITreeNodeData) => {
    e.stopPropagation();
    emit('onVisible', data.key);

}
onMounted(() => {


})
defineExpose({
    setSelect
})
</script>
<style lang="scss" scoped>
@import '../demo/CommentCSS.scss';

.custom-tree-node {
    display: flex;
    flex: 1;

    .dot {
        $size: 8px;
        width: $size;
        height: $size;
        margin-top: 4PX;
        margin-right: 3px;
        border-radius: 50%;
        background-color: bisque;
        display: none;

        &.select {
            display: block;
        }
    }

    .node {
        flex: 1;
        @include single-line-ellipsis(80px);
    }

    .handel-node {
        width: 50px;
    }
}
</style>