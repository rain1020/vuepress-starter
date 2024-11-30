<template>
    <el-card class="card" shadow="never" v-for="(item, index) in page.list" :key="index"
        :body-style="{ padding: '3px' }" @click="handelClick(item)">
        <img :src="item.cover" style="width: 100%" :style="{ pointerEvents: 'none' }" />
    </el-card>
</template>
<script setup lang="ts">
import page from './designComponent/data/templateData.json'
import { Page } from './designComponent/class/LeaferCanvas'
const emit = defineEmits(['onPage'])
const handelClick = (item: Partial<Page>) => {
    emit('onPage', item)

}
</script>
<style lang="scss" scoped>
.card {
    box-sizing: border-box;
    width: 50%;
    height: 150px;
    cursor: pointer;
}
</style>