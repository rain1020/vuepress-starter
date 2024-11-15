<template>
    <el-button ref="ref1" @click="click">Upload</el-button>
    <el-button ref="ref2">download</el-button>
    <el-button ref="ref3">apply</el-button>
    <Tour :stepInfo="stepInfo" v-model="visible"></Tour>
</template>
<script setup lang="ts">
import { ref, computed } from 'vue'
const ref1 = ref<ButtonInstance>()
const ref2 = ref<ButtonInstance>()
const ref3 = ref<ButtonInstance>()

let visible = ref(false)
let stepInfo = computed(() => {
    return [
        {
            target: ref1.value,
            title: 'Upload',
            description: 'this is Upload'
        },
        {
            target: ref2.value,
            title: 'download',
            description: 'this is downloadthis'
        },
        {
            target: ref3.value,
            title: 'apply',
            description: 'this is apply'
        }
    ]
})
const click = () => {
    visible.value = true
}
</script>