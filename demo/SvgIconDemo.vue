<template>
    1233333
    <svg v-if="flag" viewBox="0 0 10 10" xmlns="http://www.w3.org/2000/svg">
        <use href="#myDot1" x="5" y="5" style="opacity:1.0" />
    </svg>
</template>
<script setup lang="ts">
import { onMounted, ref } from 'vue'
let flag = ref(false)
onMounted(() => {
    let dom = document.querySelector("#aa")
    if (document.body.firstChild) {
        dom?.appendChild(document.body.firstChild)
    }
    setTimeout(() => {
        console.log('1111');
        flag.value = true
    }, 2000)
    console.log(dom);
})
// import { readFileSync, readdirSync } from 'node:fs/promises';
// let body = document.body
// let svg = document.createElement('svg')
// svg.setAttribute('id', 'local-icon')
// svg.setAttribute('xmlns', 'http://www.w3.org/2000/svg')
// svg.setAttribute('xmlns:xlink', 'http://www.w3.org/1999/xlink')
// svg.setAttribute('style', 'position: absolute; width: 0; height: 0')
// svg.innerHTML = page.value.icons
// body.appendChild(svg)
</script>