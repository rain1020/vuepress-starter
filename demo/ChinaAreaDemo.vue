<template>
    <br>
    省市区数据
    <ChinaArea v-model='value' class="area-selector" />
    省市数据
    <ChinaArea v-model='value1' :type="2" class="area-selector" />
    禁用
    <ChinaArea v-model='value2' disabled class="area-selector" />
</template>
<script setup lang="ts">
import { ref } from 'vue'
let value = ref('')
let value1 = ref('')
let value2 = ref('上海市,市辖区,青浦区')
</script>
<style lang="scss" scoped>
:deep.area-selector {
    width: 100%;
    margin: 0 auto;
    padding: 20px 0;

    .el-cascader {
        width: 50%;
    }
}
</style>
