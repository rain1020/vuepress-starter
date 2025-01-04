<template>
    <div class="design">
        <div class="design-left" ref="designLeftRef">
            <DesignLeft @onPage="onPage" @onClassify="onClassify"></DesignLeft>
        </div>
        <div class="design-main" ref="designMainRef">
            <DesignEdit ref="designEditRef" @onActivity="onActivity"></DesignEdit>
        </div>
        <div class="design-right" ref="designRightRef">
            <DesignRight :child="children" v-model="activityObject" @onSelect="onSelect" @onLock="onLock"
                @onVisible="onVisible"></DesignRight>
        </div>
    </div>
</template>
<script setup lang="ts">
import { onMounted, onUnmounted, ref, unref, nextTick, watch, watchEffect } from 'vue'
import { Page } from './designComponent/class/LeaferCanvas';
import { IUI } from '@leafer-ui/interface';
const designEditRef = ref()
const designMainRef = ref()
const designLeftRef = ref()
const designRightRef = ref()
let edit
let designLeftWidth, designRightWidth
let children = ref()
let activityObject = ref()
onMounted(() => {
    edit = unref(designEditRef);
    let { clientWidth, clientHeight } = unref(designMainRef)
    edit.initEdit({ width: clientWidth, height: clientHeight })
    designRightWidth = unref(designRightRef).clientWidth
    window.addEventListener('resize', () => {
        resizeEdit()
    })
})
const resizeEdit = () => {
    let { clientWidth } = unref(document.body)
    designLeftWidth = unref(designLeftRef)?.clientWidth
    if (designLeftWidth) {
        edit.resize({ width: clientWidth - designLeftWidth - designRightWidth, height: unref(designMainRef).clientHeight })
    }

}
const onPage = (page: Partial<Page>, key: string) => {
    switch (key) {
        case 'tem':
            edit.importJsonToCurrentPage(page.json, true)
            children.value = edit.getChildren()
            break;
        case 'text':
            edit.add(page.json)
            break;

        default:
            break;
    }

}
const onClassify = (index: number) => {
    nextTick(() => {
        resizeEdit()
    })


}
onUnmounted(() => {
    edit = null
})
const onSelect = (key: string | number) => {
    const objects: IUI[] = edit.findObjectsByIds([key])
    edit.setActiveObjects(objects)
}
const onActivity = (object: IUI) => {
    activityObject.value = object
}
const onLock = (key: string | number) => {
    const objects: IUI[] = edit.findObjectsByIds([key])
    if (objects[0].locked) {
        edit.unLocked(objects[0])
    } else {
        edit.setLocked(objects[0])
    }
    children.value = []
    nextTick(() => {
        children.value = edit.getChildren()
    })
}
const onVisible = (key: string | number) => {
    const objects: IUI[] = edit.findObjectsByIds([key])
    if (objects[0].visible) {
        edit.hidden(objects[0])
    } else {
        edit.setVisible(objects[0])
    }
    children.value = []
    nextTick(() => {
        children.value = edit.getChildren()
    })
}
</script>
<style lang="scss" scoped>
.design {
    display: flex;
    width: 100%;
    height: 100%;

    &-left {
        background-color: bisque;
    }

    &-right {
        padding: 3px;
        width: 150px;
    }

    &-main {
        flex: 1;
        background-color: beige;

    }
}
</style>