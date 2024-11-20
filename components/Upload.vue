<template>
    <el-upload v-model:file-list="fileList" action="#" :multiple="mergeMultiple" list-type="picture-card" :limit="limit"
        ref="uploadRef" class="upload-container" :style="styleObject" :on-success="onSuccess" :auto-upload="true"
        :http-request="httpRequest" :before-upload="beforeUpload">
        <el-icon>
            <Plus />
        </el-icon>
        <template #file="{ file }">
            <div class="upload-item">
                <img :src="file.url" alt="" class="upload-image" />
                <div class="upload-handle" @click.stop>
                    <el-icon @click="onEdit(file)">
                        <Edit />
                    </el-icon>
                    <el-icon @click="onPreview">
                        <ZoomIn />
                    </el-icon>
                    <el-icon @click="onDelete(file)">
                        <Delete />
                    </el-icon>
                </div>
            </div>
        </template>
        <template #tip>
            <slot name="tip"></slot>
        </template>
    </el-upload>
    <el-image-viewer :teleported="true" v-if="imgViewVisible" @close="imgViewVisible = false"
        :url-list="viewFileList" />
</template>
<script setup lang="ts">
import { computed, ref, watch, unref, nextTick } from 'vue'
import { Edit, ZoomIn, Delete, Plus } from '@element-plus/icons-vue'
import { ElNotification } from 'element-plus';
import type { UploadRequestOptions } from 'element-plus';
interface UploadFile {
    url: string
}
const props = defineProps({
    limit: { type: Number, default: 1 },
    modelValue: { type: [String, Array], default: '' },
    size: { type: String, default: '148px' },
    fileSize: { type: Number, default: 5 },
    fileType: {
        type: Array as () => string[],
        default: () => ['image/png', 'image/jpeg', 'image/gif']
    },
})
const emit = defineEmits(['update:modelValue'])
let imgViewVisible = ref(false)
let uploadRef = ref()
let fileList = ref<Array<UploadFile>>([])
const mergeMultiple = computed(() =>
    props.limit === 1 ? false : true

)
const styleObject = computed(() => {
    let comment = {
        '--size': props.size,
    }
    return mergeMultiple.value && props.limit > unref(fileList).length || !fileList.value.length ? { '--display-hide': 'inline-flex', ...comment } : { '--display-hide': 'none', ...comment }
})


const viewFileList = computed(() => {
    return fileList.value.map(item => item.url)
})

watch(() => props.modelValue, (newValue) => {
    if (Array.isArray(newValue)) {
        fileList.value = newValue.map(item => {
            if (!(typeof item == 'object' && item !== null &&
                'url' in item)) {
                return { url: String(item) }
            } else {
                return { url: String(item.url) }
            }
        })
    } else {
        fileList.value = props.modelValue ? [{ url: String(props.modelValue) }] : []
    }

}, {
    immediate: true
})
const createInput = () => {
    const input = document.createElement('input')
    input.type = 'file'
    input.accept = 'image/png, image/jpeg, image/gif'
    return input
}

const onEdit = (file: UploadFile) => {
    let input = createInput()
    input.click()
    input.onchange = (e: any) => {
        const newfile = e.target.files[0]
        let res = beforeUpload(newfile)
        if (res) {
            let index = unref(fileList).findIndex(item => item.url === file.url)
            fileList.value[index] = { url: URL.createObjectURL(newfile) }
            nextTick(() => {
                onInput(unref(fileList))
            })

        }
    }
}
const onInput = (filelist: Array<UploadFile>) => {
    if (typeof props.modelValue == 'string') {
        if (filelist.length > 0) {
            emit('update:modelValue', filelist[0].url)
        } else {
            emit('update:modelValue', '')
        }

    } else {
        emit('update:modelValue', filelist.map(item => item.url))
    }
}
const onPreview = () => {
    imgViewVisible.value = true
}
const onDelete = (file: UploadFile) => {
    let index = unref(fileList).findIndex(item => item.url === file.url)
    fileList.value.splice(index, 1)
    onInput(unref(fileList))
}

const beforeUpload = (file: File) => {
    const imgSize = file.size / 1024 / 1024 < props.fileSize;
    const imgType = props.fileType.includes(file.type);
    if (!imgType)
        ElNotification({
            title: '温馨提示',
            message: '上传图片不符合所需的格式！',
            type: 'warning',
        });
    if (!imgSize)
        ElNotification({
            title: '温馨提示',
            message: `上传图片大小不能超过 ${props.fileSize}M！`,
            type: 'warning',
        });
    return imgType && imgSize;
}
const httpRequest = async (options: UploadRequestOptions) => {
    let formData = new FormData();
    formData.append('file', options.file);
    try {
        // const { data } = await request({
        //     url: '',
        //     method: 'post',
        //     headers: {
        //         'Content-Type': 'multipart/form-data',
        //     },
        //     data: formData,
        // });
        onInput(unref(fileList))
    } catch (error) {
        options.onError(error as any);
    }


}
const onSuccess = (res: any, file: File) => {
    console.log('上传成功', res, file)
}

</script>
<style lang="scss" scoped>
:deep.upload-container {
    --display-hide: none;
    --size: 148px;

    .el-upload--picture-card,
    .el-upload-list__item {
        width: var(--size);
        height: var(--size);
    }

    .el-upload-list {
        .el-upload {
            display: var(--display-hide)
        }
    }

    .upload-item {
        width: var(--size);
        height: var(--size);
        max-width: 200px;
        max-height: 200px;
        position: relative;
        border-radius: 5px;
        overflow: hidden;

        .upload-handle {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            justify-content: center;
            align-items: center;
            display: none;
            font-size: 20px;

            i+i {
                margin-left: 20px;
            }
        }

        &:hover {
            .upload-handle {
                display: flex;
                background: var(--el-overlay-color-lighter);
                color: #fff;
            }
        }
    }

    .upload-image {
        width: 100%;
        height: 100%;
        object-fit: contain;
    }
}
</style>