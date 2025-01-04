<template>
    <div class="design-left">
        <div class="design-left-ul">
            <div v-for="(item, index) in widgetClassifyList">
                <span class="design-left-ul_name" :class="[activity === item.key ? 'red' : '']"
                    @click="onClassify(item.key)">{{
                        item.name }}</span>
            </div>
        </div>
        <div class="design-left-activity" v-show="activity">
            <component v-if="activity" :is="currentClassify?.component" @onPage="onPage"></component>
        </div>
    </div>
</template>
<script setup lang="ts">
import { computed, ref, unref } from 'vue'
import TempListWrap from './TempListWrap.vue'
import TextListWrap from './TextListWrap.vue'
import { Page } from './designComponent/class/LeaferCanvas';
import { nextTick } from 'process';
const emit = defineEmits(['onPage', 'onClassify'])

const widgetClassifyList = ref([
    {
        name: '模版',
        key: 'tem',
        component: TempListWrap,
    },
    {
        name: '文字',
        key: 'text',
        component: TextListWrap,
    },
])
let activity = ref('')
const currentClassify = computed(() => {
    return unref(widgetClassifyList).find(item => item.key === unref(activity))
})
const onClassify = (key: string) => {
    if (unref(activity) === key) {
        activity.value = ''
    } else {
        activity.value = key
    }
    emit('onClassify', key)
}
const onPage = (page: Partial<Page>) => {
    emit('onPage', page, activity.value)
}
</script>
<style lang="scss" scoped>
.design-left {
    display: flex;
    height: 100%;
    box-sizing: border-box;

    &-ul {
        box-sizing: border-box;
        padding-top: 10px;
        width: 40px;
        list-style: none;
        text-align: center;
        border-right: 1px solid rgba(0, 0, 0, .07);

        &_name {
            padding: 8px 0px;
            font-weight: 600;
            font-size: 12px;
            cursor: pointer;

            &.red {
                color: rgb(22, 93, 255);
            }
        }
    }

    &-activity {
        box-sizing: border-box;
        padding-top: 10px;
        background-color: antiquewhite;
        width: 200px;
        height: 100%;
        display: flex;
        align-content: flex-start;
        flex-wrap: wrap;
    }
}
</style>