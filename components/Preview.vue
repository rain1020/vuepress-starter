<template>
    <div ref="xmindViewerRef" class="xmind-viewer" :style="{ height: '100%' }"></div>
</template>
<script setup lang="ts">
import { XMindEmbedViewer } from 'xmind-embed-viewer'
import { ref, unref, watch, computed, onMounted, onUnmounted, nextTick } from 'vue'
const xmindViewerRef = ref()
const props = defineProps({
    file: {
        type: File,
    }
})

let reader
let viewer
watch(
    () => props.file,
    () => {
        if (props.file && props.file instanceof File)
            reader.readAsArrayBuffer(props.file);
    },
    { immediate: true }
)

const previewXMind = (content: ArrayBuffer) => {
    viewer.load(content)
}

const destroyViewer = () => {
    if (viewer) {
        viewer.destroy();
        viewer = null;
    }
    if (reader) {
        reader = null
    }
}


onMounted(() => {
    reader = new FileReader();
    reader.onload = function (event) {
        if (event.target) {
            previewXMind(event.target.result)
        }
    };
    reader.onerror = function (error) {
        console.error('Error reading file:', error);
    };
    viewer = new XMindEmbedViewer({
        el: unref(xmindViewerRef),
        styles: { height: '100%', width: '100%' },
        region: 'cn',

    });
})

onUnmounted(() => {
    destroyViewer();
})
</script>
<style lang="scss" scoped>
.xmind-viewer {
    background-color: inherit;
}
</style>