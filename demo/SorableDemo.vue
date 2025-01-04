<template>
    <ul ref="simbleItems">
        <li>item 1</li>
        <li>item 2</li>
        <li>item 3</li>
    </ul>
</template>
<script setup lang="ts">
import Sortable from 'sortablejs';
import { onMounted, ref, unref, onUnmounted } from 'vue';
let sorable: Sortable | null = null
const simbleItems = ref<HTMLElement | null>()
onMounted(() => {
    const el = unref(simbleItems);
    if (el) {
        sorable = new Sortable(el, {
            animation: 150,
            ghostClass: 'blue-background-class',
        });
    }

})
onUnmounted(() => {
    if (sorable) {
        sorable.destroy()
        sorable = null
    }
})
</script>
<style lang="scss" scoped>
.custom-clone-class {
    color: red;
}

ul {
    list-style-type: none;

    li {
        position: relative;
        display: block;
        padding: .75rem 1.25rem;
        margin-bottom: -1px;
        background-color: #fff;
        border: 1px solid rgba(0, 0, 0, .125);

        &.blue-background-class {
            background-color: #C8EBFB;
        }
    }
}
</style>
