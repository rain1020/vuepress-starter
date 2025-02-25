<template>
    <ButtonGroup v-model="value" :options="options" type="success" size="large"></ButtonGroup>
    <ButtonGroup v-model="value" :options="options"></ButtonGroup>
    <ButtonGroup v-model="value" :options="options" type="danger" size="small"></ButtonGroup>
    <ButtonGroup v-model="value" :options="options" type="warning"></ButtonGroup>
    <br>
    <ButtonGroup v-model="value" type="Rprimary" :options="options" size="large"></ButtonGroup>
    <ButtonGroup v-model="value" type="Rwarning" :options="options"></ButtonGroup>
    <ButtonGroup v-model="value" type="Rdanger" :options="options" size="small"></ButtonGroup>
    <ButtonGroup v-model="value" type="Rsuccess" :options="options" size="small"></ButtonGroup>
    <br>
    <ButtonGroup v-model="value" type="Tprimary" :options="options" size="large"></ButtonGroup>
    <ButtonGroup v-model="value" type="Twarning" :options="options"></ButtonGroup>
    <ButtonGroup v-model="value" type="Tdanger" :options="options" size="small"></ButtonGroup>
    <ButtonGroup v-model="value" type="Tsuccess" :options="options" size="small"></ButtonGroup>
</template>
<script setup lang="ts">
import { ref } from 'vue';
let value = ref(1)

const options = ref([{
    label: '选项1',
    value: 1
}, {
    label: '选项2',
    value: 2
}, {
    label: '选项3',
    value: 3
}])
</script>
<style lang="scss" scoped></style>