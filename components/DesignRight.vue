<template>
    <el-tabs v-model="activeName" class="design-right">
        <el-tab-pane label="设置" name="settings">
            <Setting :settingValue="modelValue" @onChange="onChange"></Setting>
        </el-tab-pane>
        <el-tab-pane label="图层" name="layers">
            <Layers ref="layersRef" :page="page" :child="children" @onSelect="onSelect" @onLock="onLock"
                @onVisible="onVisible">
            </Layers>
        </el-tab-pane>
    </el-tabs>
</template>
<script lang="ts" setup>
import { IUI } from '@leafer-ui/interface';
import { computed, ref, unref, watch } from 'vue'
const layersRef = ref()
let activeName = ref('layers')
let props = defineProps({
    modelValue: {
        type: Object
    },
    page: {
        type: Object,
    },
    child: {}
})
const children = ref()

const emit = defineEmits(['onSelect', 'onLock', 'onVisible', 'update:settingValue', 'onChange'])
watch(() => props.child, () => {
    children.value = props.child
}, { deep: true })
watch(() => props.modelValue, () => {
    console.log('props.settingValue', props.modelValue);
    let { innerId } = props.modelValue
    innerId && unref(layersRef).setSelect(innerId)
})
const updateData = (children) => {
    children.value = children
}
const onSelect = (key: string | number) => {
    emit('onSelect', key)
}
const onLock = (key: string | number) => {
    emit('onLock', key)
}
const onVisible = (key: string | number) => {
    emit('onVisible', key)
}
const onChange = (object: IUI) => {
    emit('update:settingValue', object)
}
defineExpose({
    updateData,
    onSelect,
    onLock,
    onVisible,
    onChange

})
</script>
<style lang="scss" scoped>
::v-deep.design-right {
    height: 100%;
    display: flex;
    flex-direction: column;

    .el-tabs__content {
        overflow-y: auto;
    }

}
</style>