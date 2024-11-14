<template>
    <p v-ellipsis="2" class="test">
        我是测试数据我是测试数据我是测试数据我是测试数据我是测试数据我是测试数据我是测试数据我是测试数据我是测试数据我是测试数据我是测试数据我是测试数据我是测试数据我是测试数据我是测试数据我是测试数据
    </p>
</template>

<script setup lang="ts">
import Ellipsis from '../components/unfoldDirective'
const vEllipsis = Ellipsis

</script>
<style lang="scss" scoped>
.test {
    margin: 0px;
    color: #24b383;
    font-size: 20px;
    font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
}
</style>
