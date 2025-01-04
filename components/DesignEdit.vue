<template>
    <div ref='editContentRef' class="designEdit"></div>
</template>
<script setup lang="ts">
import { onMounted, ref, unref } from 'vue';
import { LeaferCanvas } from './designComponent/class/LeaferCanvas';
import { Text, Group } from 'leafer-ui'
import { EditorEvent } from "@leafer-in/editor";
import { ICanvasContext2D, ILeafer, IPointData, IUI, IUIInputData } from "@leafer-ui/interface";
const emit = defineEmits(['onActivity'])
const editContentRef = ref()
let leaferCanvas: LeaferCanvas
const initEdit = ({ width, height }: { width: number, height: number }) => {
    if (width && height) {
        leaferCanvas = new LeaferCanvas({ width, height })
        unref(editContentRef).append(leaferCanvas.wrapperEl)
        leaferCanvas.app.editor.on(EditorEvent.SELECT, (arg: EditorEvent) => {
            emit('onActivity', arg.editor.element)
        })
    }
}
const resize = ({ width, height }: { width: number, height: number }) => {
    if (width && height) {
        leaferCanvas.app.resize({ width, height })
    }

}
const importJsonToCurrentPage = (json: any, clearHistory?: boolean) => {
    leaferCanvas.importJsonToCurrentPage(json, clearHistory)

}
const findObjectsByIds = (ids: (string | number)[]) => {
    const objects = leaferCanvas.contentLayer.find(function (item) {
        return ids.includes(item.innerId) ? 1 : 0
    })
    return objects
}
const setActiveObjects = (objects: IUI[] | undefined) => {
    if (objects) {
        leaferCanvas.setActiveObjects(objects)
    }
}
const setLocked = (object: IUI) => {
    object.locked = true
}
const unLocked = (object: IUI) => {
    object.locked = false
}
const setVisible = (object: IUI) => {
    object.visible = true
}
const hidden = (object: IUI) => {
    object.visible = false
}
const getChildren = () => {
    return leaferCanvas.contentFrame.children
}
const add = (json: any, index?: number) => {
    let text
    switch (json.tag) {
        case 'Text':
            text = new Text({
                ...json,
            })
            break;

        default:
            text = new Group(json)
            break;
    }

    leaferCanvas.add(text, index)
}
defineExpose({
    initEdit,
    getChildren,
    findObjectsByIds,
    add,
    setActiveObjects,
    importJsonToCurrentPage,
    resize,
    setLocked,
    unLocked,
    setVisible,
    hidden
})
</script>