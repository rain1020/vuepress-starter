<template>
    <HolyGrailContainer>
        <template #left-sidebar>
            <FormEleItems @onEnd="onEnd"></FormEleItems>
        </template>
        <template #main-content>
            <FormContainer @onSelect="onSelect" v-model:formContainerList="formContainerList" ref="formContainer">
            </FormContainer>
        </template>
        <template #right-sidebar>
            <div>右侧栏内容</div>
        </template>
    </HolyGrailContainer>
</template>
<script setup lang="ts">
import { onMounted, ref, unref } from 'vue';
import Tree, { TreeNode, TreeNodeData } from './FormDesign/class/Tree';

let formContainerList = ref<Tree>(new Tree())
const getNonDuplicateID = (length = 8) => {
    let idStr = Date.now().toString(36);
    idStr += Math.random().toString(36).substring(3, length);
    return idStr;
};
// let map = new Map()
const onEnd = ({ groupEleItem, groupInfo, options }) => {
    let { newIndex } = options
    let nodeData: TreeNodeData = {
        instanceId: getNonDuplicateID(),
        groupInfo: { ...groupInfo },
        groupEleItem: { ...groupEleItem }
    }
    let parentData = options.to.getAttribute('data-treeNodeData') || JSON.stringify(rootData)
    unref(formContainerList).insertChildAtIndex(JSON.parse(parentData), nodeData, newIndex)
}
let rootData: TreeNodeData = {
    instanceId: getNonDuplicateID(),
    groupInfo: {
        name: '布局',
        type: 'Layout',
    },
    groupEleItem: {
        name: '网格布局',
        type: 'GridContainer',
        component: 'GridContainer'
    }
}
onMounted(() => {
    unref(formContainerList).setRoot(rootData)
})
const onSelect = (groupInfo) => {
    console.log(groupInfo)
}
</script>