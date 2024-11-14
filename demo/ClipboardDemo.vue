<template>
    案例一:
    <input id="foo" value="我是复制的文本" />
    <el-button v-clipboard="'#foo'">复制</el-button>
    <br />
    <br />
    案例二:
    <el-button v-clipboard.text="'我是复制的文本2'">复制</el-button>
    <br />
    <br />
    案例三:
    <textarea id="bar">我是剪切的文本</textarea>
    <br />
    <br />
    <el-button v-clipboard:cut="'#bar'">剪切</el-button>
</template>
<script setup lang="ts">
import vClipboardDirective from '../components/clibpoardDirective'
const vClipboard = vClipboardDirective
</script>