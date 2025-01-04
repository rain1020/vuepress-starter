<template>
    <div class="flex-container" :class="containerClass">
        <slot></slot>
    </div>
</template>
<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref, unref } from 'vue';

const props = defineProps({
    direction: {
        type: String,
        default: 'row', // 默认为 row 方向
        validator: (value: string) => ['row', 'column'].includes(value),
    },
    justify: {
        type: String,
        default: 'flex-start', // 默认为 flex-start
        validator: (value: string) => ['flex-start', 'flex-end', 'center', 'space-between', 'space-around', 'space-evenly'].includes(value),
    },
    align: {
        type: String,
        default: 'stretch', // 默认为 stretch
        validator: (value: string) => ['stretch', 'flex-start', 'flex-end', 'center', 'baseline'].includes(value),
    },
});
const containerClass = computed(() => {
    return {
        [`flex-direction-${props.direction}`]: true,
        [`justify-content-${props.justify}`]: true,
        [`align-items-${props.align}`]: true,
    };
});
</script>
<style lang="scss" scoped>
.flex-container {
    display: flex;
}

.flex-direction-row {
    flex-direction: row;
}

.flex-direction-column {
    flex-direction: column;
}

.justify-content-flex-start {
    justify-content: flex-start;
}

.justify-content-flex-end {
    justify-content: flex-end;
}

.justify-content-center {
    justify-content: center;
}

.justify-content-space-between {
    justify-content: space-between;
}

.justify-content-space-around {
    justify-content: space-around;
}

.justify-content-space-evenly {
    justify-content: space-evenly;
}

.align-items-stretch {
    align-items: stretch;
}

.align-items-flex-start {
    align-items: flex-start;
}

.align-items-flex-end {
    align-items: flex-end;
}

.align-items-center {
    align-items: center;
}

.align-items-baseline {
    align-items: baseline;
}
</style>