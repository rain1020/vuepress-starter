<template>
    <h2>上传单张图片</h2>
    <br>
    <Upload v-model="fileList" size="120px"></Upload>
    <h2>上传多张图片</h2>
    <br>
    <Upload v-model="fileList1" :limit="3" size="120px">
        <template #tip>
            <p>
                <el-text type="primary"> 只能上传
                    <el-text type="danger" size="large"> jpg/png/gif</el-text>
                    格式的图片，且不超过
                    <el-text type="danger" size="large"> 5M</el-text>
                    ,最多传
                    <el-text type="danger" size="large">3</el-text>
                    张
                </el-text>
            </p>
        </template>
    </Upload>
</template>
<script setup lang="ts">
import { ref } from 'vue'
let fileList = ref('https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100')
let fileList1 = ref(['https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100', 'https://fuss10.elemecdn.com/1/34/19aa98b1fcb2781c4fba33d850549jpeg.jpeg', 'https://fuss10.elemecdn.com/3/28/bbf893f792f03a54408b3b7a7ebf0jpeg.jpeg'])
</script>