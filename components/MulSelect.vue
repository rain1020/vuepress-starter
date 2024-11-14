<template>
    <el-select :modelValue="innerValue" multiple collapse-tags @change="setStatus">
        <el-option ref="ref-fitst-option" :key="-1" :label="firstLabel" :value="firstKey"
            @click.native="choose_first_option"></el-option>
        <el-option v-for="(item, index) in listOptions" :key="index" :label="item.label" :value="item.value"
            :data-value="item.value" @click.native="choose_other_option"></el-option>
    </el-select>
</template>

<script setup lang="ts" name="MulSelect">
import { reactive, ref, computed, nextTick, watch } from 'vue';
const props = defineProps({
    modelValue: {
        type: Array,
        require: true,
    },
    listOptions: {
        type: Array,
        require: true,
    },
});
const emit = defineEmits(['update:modelValue']);
let firstKey = ref(''); // 全部的 key数值
let firstLabel = ref('全部'); // 全部的对外展示数据
let isSelectedFirstOption = ref(false); // 全部 是否被选中
let selectedValue = reactive([]); // 选中的所有value 除全部
let innerValue = ref();

const optionsValues = computed(() => {
    return (props.listOptions || []).map((item) => item.value);
});
watch(
    () => props.modelValue,
    () => {
        let len = [...new Set(props.modelValue)].filter((v) => optionsValues.value.includes(v)).length;
        if (len >= optionsValues.value.length) {
            innerValue.value = [firstKey.value, ...optionsValues.value];
            isSelectedFirstOption.value = true;
        } else {
            isSelectedFirstOption.value = false;
            innerValue.value = [...new Set(props.modelValue)];
        }
    },
    { immediate: true }
);
const setStatus = (val) => {
    selectedValue = val.filter((v) => v != firstKey.value);
};
const choose_first_option = () => {
    isSelectedFirstOption.value = !isSelectedFirstOption.value;
    if (isSelectedFirstOption.value) {
        input(optionsValues.value);
    } else {
        input([]);
    }
};
const choose_other_option = () => {
    nextTick(() => {
        input(selectedValue);
    });
};
const input = (value) => {
    emit('update:modelValue', value);
};
</script>
