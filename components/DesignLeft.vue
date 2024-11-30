<template>
    <div class="design-left">
        <div class="design-left-ul">
            <div v-for="(item, index) in widgetClassifyList">
                <span class="design-left-ul_name" :class="[activity === index ? 'red' : '']"
                    @click="onClassify(index)">{{
                        item.name }}</span>
            </div>
        </div>
        <div class="design-left-activity" v-show="activity >= 0">
            <component v-if="widgetClassifyList[activity]" :is="widgetClassifyList[activity].component"
                @onPage="onPage"></component>
        </div>
    </div>
</template>
<script setup lang="ts">
import { ref, unref } from 'vue'
import TempListWrap from './TempListWrap.vue'
import { Page } from './designComponent/class/LeaferCanvas';
const emit = defineEmits(['onPage'])

const widgetClassifyList = ref([
    {
        name: '模版',
        component: TempListWrap,
    }
])
let activity = ref(-1)
const onClassify = (index) => {
    if (unref(activity) === index) {
        activity.value = -1
        return
    }
    activity.value = index
}
const onPage = (page: Partial<Page>) => {
    emit('onPage', page)
}
</script>
<style lang="scss" scoped>
.design-left {
    display: flex;
    padding-top: 10px;
    height: 100%;
    box-sizing: border-box;

    &-ul {
        width: 40px;
        list-style: none;
        text-align: center;

        &_name {
            padding: 8px 0px;
            font-weight: 600;
            font-size: 12px;
            cursor: pointer;

            &.red {
                color: brown;
            }
        }
    }

    &-activity {
        background-color: antiquewhite;
        width: 200px;
        height: 100%;
        display: flex;
        align-content: flex-start;
        flex-wrap: wrap;
    }
}
</style>