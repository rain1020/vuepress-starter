<template>
    <div class="virtual-list" :style="listContainStyle" @scroll="onScroll">
        <div class="list-inner" :style="innerStyle">
            <template v-for="(item, index) in blockData" :key="item">
                <div class="list-item" :style="itemStyle(visibleItemsIndex[0] + index)">
                    <slot :index="visibleItemsIndex[0] + index" :item="item"></slot>
                </div>
            </template>
        </div>
    </div>

</template>
<script setup lang="ts">
import { computed, ref, unref } from 'vue'
const props = defineProps({
    data: {
        type: Array,
        default: []
    },
    height: {
        type: Number,
        default: 200
    },
    itemSize: {
        type: Number,
        default: 33
    }
})
const listContainStyle = computed(() => {
    return {
        position: 'relative',
        'overflow-y': 'scroll',
        height: `${unref(height)}px`,
        width: '100%'
    }
})

const innerStyle = computed(() => {
    return {
        height: `${unref(total) * unref(itemHeight)}px`,
        width: '100%'
    }
})
const itemStyle = computed(() => {
    return (index) => {
        return {
            position: 'absolute',
            left: 0,
            top: `${index * unref(itemHeight)}px`,
            height: `${unref(itemHeight)}px`,
            width: '100%',
        }
    }
})
const total = computed(() => {
    return props.data.length
})
const height = computed(() => {
    return props.height
})
const itemHeight = computed(() => {
    return props.itemSize
})
let scrollOffset = ref(0)
const blockData = computed(() => {
    let [startIndex, stopIndex] = unref(visibleItemsIndex)
    let array = [] as any
    for (let index = startIndex; index <= stopIndex; index++) {
        array.push(props.data[index])
    }
    return array
})
const visibleItemsIndex = computed(() => {
    const startIndex = Math.max(0, Math.min(unref(total) - 1, Math.floor(unref(scrollOffset) / unref(itemHeight))))
    const offset = startIndex * unref(itemHeight)
    let size = unref(height)
    const numVisibleItems = Math.ceil(
        (size + unref(scrollOffset) - offset) / unref(itemHeight)
    )
    const stopIndex = Math.max(0, Math.min(unref(total) - 1, startIndex + numVisibleItems - 1)
    )
    return [startIndex, stopIndex]
})

const onScroll = (e) => {
    const { clientHeight, scrollHeight, scrollTop } = e.currentTarget
    scrollOffset.value = Math.max(0, Math.min(scrollTop, scrollHeight - clientHeight))
}
</script>
<style lang="scss" scoped></style>
