<template>
    123
</template>
<script lang="ts" setup>
const props = defineProps({
    settingValue: {
        type: Object
    }
})
const emit = defineEmits(['update:settingValue', 'onChange'])
const onChange = () => {
    emit('update:settingValue')
}
</script>
<style lang="scss" scoped></style>