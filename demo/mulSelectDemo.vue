<template>
    <MulSelect v-model='value' :listOptions="[{ label: 'item1', value: 'item1' },
    { label: 'item2', value: 'item2' }]" />
</template>
<script setup lang="ts">
import { ref } from 'vue'
let value = ref([])
</script>