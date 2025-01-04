<template>
    <!-- <FormContainerRenderItem v-for="(formContainerItem, index) in innerFormContainerList"
        :key="formContainerItem.instanceId" :formContainerItem="formContainerItem">
    </FormContainerRenderItem> -->
    <!-- <div>
        <template v-if="groupInfo.type === 'Basic'">
            <el-form-item>
                <component :id="instanceId" :is="getComponent(groupEleItem.component)"></component>
            </el-form-item>
        </template>
<template v-else>
            <component :id="instanceId" :ref="(el) => setLayoutsRefs(instanceId, el)"
                :is="getComponent(groupEleItem.component)">
                <FormContainerRender @onUpdate="onUpdate" :formContainerList="groupEleItem.children">
                </FormContainerRender>
            </component>
        </template>
</div> -->
</template>
<script setup lang="ts">
import { computed, getCurrentInstance, nextTick, onMounted, onUnmounted, ref, unref, watch } from 'vue';
import Sortable from 'sortablejs';
const props = defineProps({
    formContainerList: {
        type: Array as () => FormContainerItem[],
        default: () => {
            return []
        }
    }
})
const emit = defineEmits(['onSelect', 'update:formContainerList', 'onUpdate'])
let innerFormContainerList = ref<FormContainerItem[]>([])
watch(() => props.formContainerList, (newValue) => {
    innerFormContainerList.value = newValue
    // nextTick(() => {
    //     initLayoutsSorable()
    // })
}, {
    deep: true
})
// let sorableLayouts: { [key: string]: Sortable } = {}
// let drag = false
// const initLayoutsSorable = () => {
//     Object.entries(unref(layoutsRefs)).forEach(([id, { $el: el }]) => {
//         if (el && !sorableLayouts[id]) {
//             const sortable = new Sortable(el, {
//                 group: {
//                     name: 'shared', pull: true, put: true
//                 }, // set both lists to same group
//                 sort: true,
//                 animation: 150,
//                 ghostClass: 'blue-background-class',
//                 removeCloneOnHide: true,
//                 onStart: function (/**Event*/evt) {
//                     drag = true
//                 },
//                 onUpdate: function (/**Event*/evt) {
//                     const { oldIndex, newIndex } = evt
//                     let data = unref(innerFormContainerList).map(item => {
//                         if (item.instanceId === id) {
//                             return item
//                         }

//                     })?.[0]
//                     if (data) {
//                         let cach = JSON.parse(JSON.stringify(data.groupEleItem.children))
//                         debugger
//                         if (oldIndex || oldIndex === 0) {
//                             let obj = cach[oldIndex]
//                             cach.splice(oldIndex, 1)
//                             if (newIndex || newIndex === 0) {
//                                 cach.splice(newIndex, 0, obj)
//                             }
//                             console.log('cach', cach);
//                         }
//                         emit('update:formContainerList', cach)
//                         emit('onUpdate', cach)
//                         drag = false
//                     }

//                 },
//             });
//             sorableLayouts[id] = sortable
//         }
//     })
// }
// const onUpdate = (value) => {
//     console.log('value', value);

// }
// let layoutsRefs = ref({})
// const setLayoutsRefs = (instanceId, el) => {
//     if (instanceId && el) {
//         layoutsRefs.value[instanceId] = el
//     }
// }
// const getComponent = (type: string) => {
//     return allComponents[type];
// }
// let sortable: Sortable | null = null
const onSelect = ({ groupEleItem, groupInfo }) => {
    emit('onSelect', { groupEleItem, groupInfo })
}
onUnmounted(() => {
    // if (sortable) {
    //     sortable.destroy();
    //     sortable = null
    // }
    // if (Object.keys(sorableLayouts).length > 0) {
    //     Object.values(sorableLayouts).forEach(sortable => {
    //         sortable.destroy();
    //     })
    //     sorableLayouts = {}
    // }
})
// let allComponents = []
onMounted(() => {
    // const instance = getCurrentInstance();
    // let appContext;
    // if (instance) {
    //     appContext = instance.appContext;
    // }
    // allComponents = appContext.components
})

</script>
<style lang="scss" scoped>
// .outBox {
//     padding: 3px;
//     border: 2px dashed #ccc;

//     &:hover {
//         border: 2px dashed #2E73FF;
//     }
// }

// .flex-container {
//     min-height: 50px;
//     background-color: #fff;
//     border: 2px dashed #eee;
// }

// .grid-container {
//     min-height: 100px;
//     background-color: #fff;
//     border: 2px dashed #eee;
// }

// .blue-background-class {
//     background-color: #C8EBFB;
// }</style>