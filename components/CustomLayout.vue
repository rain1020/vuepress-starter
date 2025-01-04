<template>
    <ParentLayout>
        <template #page>
            <main class="page">
                <DesignDemo />
            </main>
        </template>
    </ParentLayout>
</template>
<script lang="ts" setup>
import ParentLayout from '@vuepress/theme-default/layouts/Layout.vue'
</script>
<style lang="scss" scoped>
.page {
    padding-top: var(--navbar-height);
    padding-bottom: 2rem;
    height: calc(100vh);
    box-sizing: border-box;

}
</style>
