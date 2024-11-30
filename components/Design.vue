<template>
    <div class="design">
        <div class="design-left">
            <DesignLeft @onPage="onPage"></DesignLeft>
        </div>
        <div class="design-main">
            <DesignEdit ref="designEditRef"></DesignEdit>
        </div>
        <div class="design-right"></div>
    </div>
</template>
<script setup lang="ts">
import { onMounted, onUnmounted, ref, unref } from 'vue'
import { Page } from './designComponent/class/LeaferCanvas';
const designEditRef = ref()
let edit
onMounted(() => {
    edit = unref(designEditRef);
    edit.initEdit()
})
const onPage = (page: Partial<Page>) => {
    edit.importJsonToCurrentPage(page.json, true)

}
onUnmounted(() => {
    edit = null
})
</script>
<style lang="scss" scoped>
.design {
    display: flex;
    width: 100%;
    height: 800px;

    &-left {
        background-color: bisque;
    }

    &-right {
        width: 150px;
        background-color: aquamarine;
    }

    &-main {
        flex: 1;
        background-color: beige;

    }
}
</style>