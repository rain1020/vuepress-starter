<template>
    <div class="box">
        <ul ref="shareItemsLeft">
            <li>item 1</li>
            <li>item 2</li>
            <li>item 3</li>
        </ul>
        <ul ref="shareItemsRight">
            <li>item 1</li>
            <li>item 2</li>
            <li>item 3</li>
        </ul>
    </div>

</template>
<script setup lang="ts">
import Sortable from 'sortablejs';
import { onMounted, ref, unref, onUnmounted } from 'vue';
const shareItemsLeft = ref<HTMLElement | null>()
const shareItemsRight = ref<HTMLElement | null>()
let sorableLeft: Sortable | null = null
let sorableright: Sortable | null = null
onMounted(() => {
    const elLeft = unref(shareItemsLeft);
    if (elLeft) {
        sorableLeft = new Sortable(elLeft, {
            group: 'shared', // set both lists to same group
            animation: 150,
            ghostClass: 'blue-background-class'
        });
    }
    const elRight = unref(shareItemsRight);
    if (elRight) {
        sorableright = new Sortable(elRight, {
            group: 'shared', // set both lists to same group
            animation: 150,
            ghostClass: 'blue-background-class',
        });

    }
})
onUnmounted(() => {
    if (sorableLeft) {
        sorableLeft.destroy();
        sorableLeft = null;
    }
    if (sorableright) {
        sorableright.destroy();
        sorableright = null;
    }
})
</script>
<style lang="scss" scoped>
.box {
    display: flex;
    min-height: 200px;
    height: 200px;
    overflow-y: auto;

    ul {
        flex: 1;
    }
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
