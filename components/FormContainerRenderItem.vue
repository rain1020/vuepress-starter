<template>
    <template v-if="formContainerItem.data.groupInfo.type === 'Basic'">
        <el-form-item :data-treeNodeData="JSON.stringify(formContainerItem.data)">
            <component class="outBox" :id="formContainerItem.data.instanceId"
                :is="getComponent(formContainerItem.data.groupEleItem.component)">
            </component>
        </el-form-item>
    </template>
    <template v-else>
        <component :id="formContainerItem.data.instanceId" ref="layoutRef"
            :is="getComponent(formContainerItem.data.groupEleItem.component)" class="outBox"
            :data-treeNodeData="JSON.stringify(formContainerItem.data)">
            <FormContainerRenderItem v-for="(node, index) in formContainerItem.children" :formContainerItem="node"
                @onUpdate="onUpdate" @onEnd="onEnd" :key="node.data.instanceId">
            </FormContainerRenderItem>
        </component>
    </template>
</template>
<script setup lang="ts">
import { onMounted, getCurrentInstance, unref, ref, onUnmounted } from 'vue';

import Sortable from 'sortablejs';
import { TreeNode } from './FormDesign/class/Tree';
const props = defineProps({
    formContainerItem: {
        type: Object as () => TreeNode,
        default: () => {
            return {}
        }
    }
})
const emit = defineEmits(['onUpdate', 'onEnd'])
const getComponent = (type: string) => {
    return allComponents[type];
}
let allComponents = []
let drag = false
const layoutRef = ref()
let sortable: Sortable | null = null
const initSorable = () => {
    const proxy = unref(layoutRef);
    if (proxy) {
        const el = proxy.$el
        sortable = new Sortable(el, {
            group: { name: 'shared', pull: true, put: true }, // set both lists to same group
            sort: true,
            animation: 150,
            ghostClass: 'blue-background-class',
            removeCloneOnHide: true,
            onStart: function (/**Event*/evt) {
                drag = true
            },
            onUpdate: function (/**Event*/evt) {
                emit('onUpdate', evt)
                drag = false
            },
            onEnd: function (/**Event*/evt) {
                emit('onEnd', evt)
                drag = false
            }
        });
    }
}
{
    const instance = getCurrentInstance();
    let appContext;
    if (instance) {
        appContext = instance.appContext;
    }
    allComponents = appContext.components
}
const onUpdate = (evt) => {
    emit('onUpdate', evt)
}
const onEnd = (evt) => {
    emit('onEnd', evt)
}
onMounted(() => {
    if (props.formContainerItem.data.groupInfo.type !== 'Basic') {
        initSorable()
    }
})
onUnmounted(() => {
    if (sortable) {
        sortable.destroy();
        sortable = null
    }
})
</script>
<style lang="scss" scoped>
.el-form-item {
    margin-bottom: 0px;
}

.outBox {
    padding: 3px;
    border: 2px dashed #ccc !important;

    &:hover {
        border: 2px dashed #2E73FF !important;
    }
}

.flex-container {
    min-height: 50px;
    background-color: #fff;
    border: 2px dashed #eee;
}

.grid-container {
    min-height: 100px;
    background-color: #fff;
    border: 2px dashed #eee;
}

.blue-background-class {
    background-color: #C8EBFB;
}
</style>