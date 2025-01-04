<template>
    <div class="holy-grail-container">
        <div class="body">
            <div class="left-sidebar">
                <slot name="left-sidebar"></slot>
            </div>
            <div class="main-content">
                <slot name="main-content"></slot>
            </div>
            <div class="right-sidebar">
                <slot name="right-sidebar"></slot>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts"></script>
<style lang="scss" scoped>
.holy-grail-container {
    display: flex;
    flex-direction: column;
    min-height: 100%;
    height: 100%;
    overflow-x: auto;

    .body {
        display: flex;
        flex: 1;
        padding: 1rem;
    }

    .left-sidebar,
    .right-sidebar {
        flex: 0 0 150px;
        /* Fixed width for sidebars */
        background: #f4f4f4;
        padding: 1rem;
    }

    .main-content {
        flex: 1;
        padding: 1rem;
        background: #ddd;
    }
}
</style>