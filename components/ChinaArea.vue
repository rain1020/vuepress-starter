<template>
    <div class="area-selector">
        <el-cascader v-model="selectedArea" :disabled="disabled" filterable :options="areaOptions"
            :props="cascaderProps" placeholder="请填入或者选择省市区" @change="handleChange"></el-cascader>
    </div>
</template>

<script setup lang="ts" name="MulSelect">
import { ref, onMounted, computed } from 'vue';
import { pcTextArr, pcaTextArr } from 'element-china-area-data';

interface AreaOption {
    value: string;
    label: string;
    children?: AreaOption[];
}
const props = defineProps({
    modelValue: String,
    // 类型 (二级联动，三级联动)
    type: {
        type: Number,
        default: 3,
    },
    // 是否禁用
    disabled: {
        type: Boolean,
        default: () => false,
    },
});
const emit = defineEmits(['update:modelValue']);
const areaOptions = ref<AreaOption[]>(pcaTextArr);
const selectedArea = computed({
    get: () => {
        return props.modelValue?.split?.(',');
    },
    set: (val) => {
        emit('update:modelValue', val?.join?.(','));
    },
});;
const cascaderProps = {
};

const loadData = () => {
    const { plus, type } = props;
    if (plus) {
        areaOptions.value = type === 2 ? pcTextArr : pcaTextArr;
    } else {
        areaOptions.value = type === 2 ? pcTextArr : pcaTextArr;
    }
};


const handleChange = (value: string[]) => {
}

onMounted(loadData);
</script>
