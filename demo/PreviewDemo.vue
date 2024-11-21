<template>
    <el-upload class="upload-demo" drag action="#" ref="uploadRef" :http-request="httpRequest" :show-file-list="false">
        <el-icon class="el-icon--upload"><upload-filled /></el-icon>
        <div class="el-upload__text">
            Drop file here or <em>click to upload</em>
        </div>
        <template #tip>
            <div class="el-upload__tip">
                <el-text type="primary">
                    预览xmind 文件
                </el-text>
            </div>
        </template>
    </el-upload>
    <div class="preview-box">
        <Preview :file="file" v-show="file"></Preview>
        <div class="model" v-show="!file">预览区域</div>
    </div>
</template>
<script setup lang="ts">
import type { UploadRequestOptions } from 'element-plus';
import { ref } from 'vue'
let file = ref()
const httpRequest = (options: UploadRequestOptions) => {
    file.value = options.file
}
</script>
<style lang="scss" scoped>
.preview-box {
    position: relative;
    width: 100%;
    height: 400px;

    .model {
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        background-color: cornsilk;
        display: flex;
        justify-content: center;
        align-items: center;
    }
}
</style>