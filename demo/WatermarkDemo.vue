<template>
    <br>
    段落加水印
    <Watermark :text="'Confidential'" :opacity="0.3" :font-size="20" :font-color="'rgba(255, 0, 0, 0.5)'">
        <p>Your content here...Your content here...Your content here...Your content here...Your
            content here...Your content here...Your content here...Your content here...Your content here...Your content
            here...Your content here...Your content here...Your content here...Your content here...Your content
            here...Your content here...Your content here...Your content here...Your content here...Your content
            here...Your content here...Your content here...</p>
    </Watermark>
    图片加水印
    <br>
    <br>
    <Watermark :text="'马'" :font-color="'rgba(271, 271, 271, 1)'" :font-size="18">
        <el-image src="https://fuss10.elemecdn.com/1/34/19aa98b1fcb2781c4fba33d850549jpeg.jpeg" fit="cover"
            style="width: 100%; height: 300px" />
    </Watermark>
</template>
<script setup lang="ts">
</script>