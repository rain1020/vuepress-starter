<template>
    <div class="grid-container" :style="gridStyle">
        <slot></slot>
    </div>
</template>

<script setup lang="ts">
import { computed, onMounted, onUnmounted, unref } from 'vue';

// 组件 props 定义
const props = defineProps({
    // 定义列数
    columns: {
        type: Number,
        default: 3
    },
    // 定义行数
    rows: {
        type: Number,
        default: 2
    }
});

// 计算容器的 CSS 样式
const gridStyle = computed(() => {
    return {
        'grid-template-columns': `repeat(${props.columns}, 1fr)`,
        'grid-template-rows': `repeat(${props.rows}, auto)`
    };
});
</script>

<style scoped lang="scss">
.grid-container {
    display: grid;
    gap: 10px;
    /* 网格项之间的间距 */
    padding: 10px;
    background-color: #f0f0f0;
    /* 容器背景色 */
}
</style>