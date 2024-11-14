<template>
    案例1:<br>
    testDate的value为1的时候的数值是：
    <DictCom :options="testDate" value="1">
        <template #default="scope">value1的映射是：{{ scope.label }}</template>
    </DictCom>
    <br>
    <br>
    案例2:<br>
    <el-select v-model="value" placeholder="Select" size="large">
        <el-option v-for="item in testDate" :key="item.value" :label="item.label" :value="item.value" />
    </el-select>
</template>
<script setup lang="ts">
import { useDict } from '../components/DictFn'
const { testDate } = useDict('testDate')
import { ref } from 'vue'
let value = ref('')
</script>