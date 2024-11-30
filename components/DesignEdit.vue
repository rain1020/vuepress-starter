<template>
    <div ref='editContentRef'></div>
</template>
<script setup lang="ts">
import { onMounted, ref, unref } from 'vue';
import { LeaferCanvas } from './designComponent/class/LeaferCanvas';
const editContentRef = ref()
let leaferCanvas
const initEdit = () => {
    leaferCanvas = new LeaferCanvas()
    unref(editContentRef).append(leaferCanvas.wrapperEl)
}
const importJsonToCurrentPage = (json: any, clearHistory?: boolean) => {
    leaferCanvas.importJsonToCurrentPage(json, clearHistory)

}
defineExpose({
    initEdit,
    importJsonToCurrentPage
})
</script>