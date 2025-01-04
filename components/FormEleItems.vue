<template>
    <div class="form-ele-items">
        <div v-for="(groupInfo, index) in formElesGroup" :key="index" class="form-ele-item">
            <h5 class="form-ele-item-title">{{ groupInfo.name }}</h5>
            <Flexbox class="form-ele-item-content" :ref="(proxy) => setGroupRef(groupInfo, proxy.$el)">
                <el-button class="button" v-for="(eleItem, index) in groupInfo.groupEleItems"
                    :data-groupInfo="JSON.stringify(groupInfo)" :data-eleItem="JSON.stringify(eleItem)">
                    {{ eleItem.name }}
                </el-button>
            </Flexbox>
        </div>
    </div>
</template>
<script setup lang="ts">
import { nextTick } from 'process';
import Sortable from 'sortablejs';
import { onMounted, onUnmounted, ref, unref } from 'vue';
const emit = defineEmits(['onEnd'])


let formElesGroup = ref<GroupInfo[]>([
    {
        name: '基本组件',
        type: 'Basic',
        groupEleItems: [
            {
                name: '输入框',
                type: 'ElInput',
                component: 'ElInput'
            },
            {
                name: '单选框',
                type: 'ElRadio',
                component: 'ElRadio'
            },
            {
                name: '评分',
                type: 'ElRate',
                component: 'ElRate'
            },
            {
                name: '选择器',
                type: 'ElSelect',
                component: 'ElSelect'
            },
        ]
    },
    {
        name: '布局',
        type: 'Layout',
        groupEleItems: [
            {
                name: '弹性布局',
                type: 'Flexbox',
                component: 'Flexbox'
            },
            {
                name: '网格布局',
                type: 'GridContainer',
                component: 'GridContainer'
            },
            {
                name: '圣杯布局',
                type: 'HolyGrailContainer',
                component: 'HolyGrailContainer'
            }
        ]
    }
])
const gourpRefs = ref({});
const setGroupRef = (groupInfo: GroupInfo, el: HTMLElement) => {
    if (groupInfo.id) {
        gourpRefs.value[groupInfo.id] = el;
    }
}
const getNonDuplicateID = (length = 8) => {
    let idStr = Date.now().toString(36);
    idStr += Math.random().toString(36).substring(3, length);
    return idStr;
};
let sorableMap: Sortable[] = ([]);
let drag = false
const initSorable = () => {
    Object.values(unref(gourpRefs)).forEach((el) => {
        const sortable = new Sortable(el as HTMLElement, {
            group: {
                name: 'share', pull: 'clone', put: false
            }, // set both lists to same group
            sort: false,
            animation: 150,
            ghostClass: 'blue-background-class',
            removeCloneOnHide: true,
            onStart: function (/**Event*/evt) {
                drag = true
            },
            onEnd: function (/**Event*/evt) {
                const itemEl = evt.item;
                itemEl.remove()
                const { groupEleItems, ...groupInfo } = JSON.parse(itemEl.getAttribute('data-groupInfo') as string);
                const eleItem = JSON.parse(itemEl.getAttribute('data-eleItem') as string);
                let obj = {
                    groupEleItem: eleItem,
                    groupInfo,
                    options: {
                        to: evt.to,
                        from: evt.from,
                        item: evt.item,
                        oldIndex: evt.oldIndex,
                        newIndex: evt.newIndex,
                    }
                }
                emit('onEnd', obj)
                drag = false
            },
        });
        sorableMap.push(sortable);
    });

}
onMounted(() => {
    formElesGroup.value = unref(formElesGroup).map(groupInfo => {
        return {
            ...groupInfo,
            id: getNonDuplicateID()
        }
    })
    nextTick(() => {
        // 延迟执行，等待dom渲染完成
        initSorable()
    })

})
onUnmounted(() => {
    sorableMap.forEach(sortable => {
        sortable.destroy();
    })
    sorableMap = []
    gourpRefs.value = {};
})

</script>
<style lang="scss" scoped>
.form-ele-item-content {
    flex-wrap: wrap;
    $column: 2;
    $gap: 3px;

    .button {
        width: calc(100% / #{$column} - #{$gap});
        margin: 0;
        margin-bottom: 3px;
        margin-right: $gap;

        &:nth-child(#{$column}) {
            margin-right: 0;
        }
    }


}

.blue-background-class {
    background-color: #C8EBFB;
}
</style>