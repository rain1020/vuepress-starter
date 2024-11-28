<template>
    <VirtualList :data="data" :height="200">
        <template #default="{ item }">
            <span class="item">{{ item }}</span>
        </template>
    </VirtualList>
</template>
<script setup lang="ts">
import { ref, onMounted } from 'vue'
let data = ref<number[]>([])
onMounted(() => {
    for (let index = 0; index < 100; index++) {
        data.value.push(index + 1)
    }
})
</script>
<style lang="scss" scoped>
.item {
    display: inline-block;
    width: 100%;
    height: 100%;
    border-bottom: 1px solid #ddd;
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>