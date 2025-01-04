<template>
    <div class="form-container">
        <el-form ref="form" class="form">
            <FormContainerRenderItem v-for="(node, index) in innerFormContainerList?.getRoot()?.children || []"
                :key="node.data.instanceId" :formContainerItem="node" @onUpdate="onUpdate" @onEnd="onEnd">
            </FormContainerRenderItem>
        </el-form>
    </div>
</template>
<script setup lang="ts">
import { computed, getCurrentInstance, onMounted, onUnmounted, ref, unref, watch } from 'vue';
import Sortable from 'sortablejs';
import Tree from './FormDesign/class/Tree';
const props = defineProps({
    formContainerList: {
        type: Object as () => Tree,
        default: () => {
            return []
        }
    }
})
const emit = defineEmits(['onSelect', 'onEnd', 'update:formContainerList'])
const form = ref()
let innerFormContainerList = ref<Tree>()
watch(() => props.formContainerList, (newValue) => {
    innerFormContainerList.value = newValue

}, {
    deep: true
})
let sortable: Sortable | null = null
let drag = false
const onSelect = ({ groupEleItem, groupInfo }) => {
    emit('onSelect', { groupEleItem, groupInfo })
}


const initSorable = () => {
    const proxy = unref(form);
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
            onEnd: function (/**Event*/evt) {
                const { oldIndex, newIndex } = evt
                const formContainerList = unref(innerFormContainerList);
                if (!formContainerList) return;
                const rootNode = formContainerList.getRoot()
                if (!rootNode) return
                let moveChildData = evt.item.getAttribute('data-treeNodeData')
                let targetParentData = evt.to.getAttribute('data-treeNodeData') || JSON.stringify(rootNode.data)
                if (moveChildData && targetParentData && (newIndex || newIndex === 0)) {
                    formContainerList.moveChildToPosition(JSON.parse(moveChildData), JSON.parse(targetParentData), newIndex)
                    emit('update:formContainerList', formContainerList)
                    console.log('11111', formContainerList);
                }
                drag = false
            },
        });
    }
}
const onEnd = (evt) => {
    const { oldIndex, newIndex } = evt
    const formContainerList = unref(innerFormContainerList);
    if (!formContainerList) return;
    const rootNode = formContainerList.getRoot()
    if (!rootNode) return
    let moveChildData = evt.item.getAttribute('data-treeNodeData')
    let targetParentData = evt.to.getAttribute('data-treeNodeData') || JSON.stringify(rootNode.data)
    if (moveChildData && targetParentData && (newIndex || newIndex === 0)) {
        formContainerList.moveChildToPosition(JSON.parse(moveChildData), JSON.parse(targetParentData), newIndex)
        emit('update:formContainerList', formContainerList)
    }
    console.log('onEnd', formContainerList);

}
const onUpdate = (evt) => {
    console.log('onUpdate');
}
onUnmounted(() => {
    if (sortable) {
        sortable.destroy();
        sortable = null
    }
})
onMounted(() => {
    initSorable()
})

</script>
<style lang="scss" scoped>
.form-container {
    height: 100%;

    .form {
        height: inherit;
    }
}
</style>