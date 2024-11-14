<template>
    <template v-for="(item, index) in props.options" :key="index">
        <template v-if="valuesArr.includes(item.value)">
            <slot v-if="$slots.default" :label="item.label" :item="item"></slot>
            <span v-else>{{ item.label }}</span>
        </template>
    </template>
</template>
<script setup lang="ts">
import { computed } from 'vue'
const props = defineProps({
    options: {
        type: Array,
        require: true
    },
    value: {
        type: [Number, String, Array]
    }
})
const valuesArr = computed(() => {
    if (Array.isArray(props.value)) {
        return props.value
    } else if (props.value) {
        return [props.value]
    } else {
        return []
    }
})
</script>