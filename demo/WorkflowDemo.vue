<template>
    <FlowNode :flowData="data"></FlowNode>
</template>
<script setup lang="ts">
import { ref } from 'vue'
const data = ref({
    "content": "xxx科技有限公司",
    "children": [
        {
            "content": "产品研发部",
        },
        {
            "content": "客服部",
            "children": [
                {
                    "content": "客服一部",
                    "children": [{ "content": "1号小组" }]
                },
                { "content": "客服二部" }
            ]
        },
        { "content": "业务部" }
    ]
})
</script>