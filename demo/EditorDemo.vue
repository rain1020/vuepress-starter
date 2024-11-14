<template>
    <div style="border: 1px solid #ccc">
        <!-- <Toolbar style="border-bottom: 1px solid #ccc" :editor="editorRef" :defaultConfig="toolbarConfig"
            :mode="mode" /> -->
        <!-- <Editor style="height: 300px; overflow-y: hidden" v-model="valueHtml" :defaultConfig="editorConfig" :mode="mode"
            @onCreated="handleCreated" @customPaste="customPast1" @onChange="onChange" @onBlur="onFocus" /> -->
    </div>
    <el-descriptions class="margin-top" title="工具栏配置" :column="1" border>
        <el-descriptions-item label="toolbarKeys">重新配置工具栏，显示哪些菜单，以及菜单的排序、分组</el-descriptions-item>
        <el-descriptions-item label="excludeKeys">如果仅仅想排除掉某些菜单，其他都保留，可以使用 excludeKeys
            来配置</el-descriptions-item>
        <el-descriptions-item label="modalAppendToBody">将菜单弹出的 modal 添加到 body 下，并自定义 modal
            的定位和其他样式</el-descriptions-item>
    </el-descriptions>
    <el-descriptions class="margin-top" title="编辑器配置" :column="1" border style="width: 100%" class-name="desc-content">
        <el-descriptions-item label="placeholder">配置编辑器 placeholder</el-descriptions-item>
        <el-descriptions-item label="readOnly">配置编辑器是否只读，默认为 false</el-descriptions-item>
        <el-descriptions-item label="MENU_CONF">
            <el-table :data="tableData" style="width: 100%">
                <el-table-column type="expand">
                    <template #default="props">
                        <div m="4">
                            <p m="t-0 b-2" v-for="(item, index) in props.row.propsList" :key="index">
                                {{ item.key }}: {{ item.example }}
                            </p>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column label="名称" prop="name" />
                <el-table-column label="属性名称" prop="prop" />
            </el-table>
        </el-descriptions-item>
    </el-descriptions>
    <el-descriptions class="margin-top" title="编辑器api" :column="1" border>
        <!-- config操作 -->
        <el-descriptions-item label="getConfig">可查看当前的 hoverbarKeys,excludeKeys等</el-descriptions-item>
        <el-descriptions-item label="getAllMenuKeys">
            查询编辑器注册的所有菜单 key（可能有的不在工具栏上）</el-descriptions-item>
        <el-descriptions-item label="getMenuConfig">查看菜单的当前配置</el-descriptions-item>
        <!-- 文本操作 -->
        <el-descriptions-item label="getHtml">获取非格式化的 html</el-descriptions-item>
        <el-descriptions-item label="getText">获取当前编辑器的纯文本内容</el-descriptions-item>
        <el-descriptions-item label="getSelectionText">获取选中的文本</el-descriptions-item>
        <el-descriptions-item label="getElemsByType">通过 type 获取编辑器的 element 列表</el-descriptions-item>
        <el-descriptions-item label="getElemsByTypePrefix">通过 type 前缀获取编辑器的 element 列表</el-descriptions-item>
        <el-descriptions-item label="getFragment">获取选中的内容，json 格式</el-descriptions-item>
        <el-descriptions-item label="setHtml">重置编辑器的 HTML 内容。【注意】只能解析 editor.getHtml() 返回的 HTML 格式，不支持自定义 HTML
            格式</el-descriptions-item>
        <el-descriptions-item label="dangerouslyInsertHtml">如果是 editor.getHtml() 获取的 HTML
            格式，可以完美解析</el-descriptions-item>
        <el-descriptions-item label="insertText">在选区插入文本</el-descriptions-item>
        <el-descriptions-item label="insertBreak">在选区回车换行</el-descriptions-item>
        <el-descriptions-item label="deleteBackward">向后删除，相当于按 backspace 键</el-descriptions-item>
        <el-descriptions-item label="deleteForward">向后删除，相当于按 delete 键（部分键盘没有这个键）</el-descriptions-item>
        <el-descriptions-item label="deleteFragment">删除选中的内容</el-descriptions-item>
        <!-- 非文本操作 -->
        <el-descriptions-item label="getParentNode">获取一个节点的父节点</el-descriptions-item>
        <el-descriptions-item label="toDOMNode">获取一个节点对应的 DOM 节点</el-descriptions-item>
        <el-descriptions-item label="insertNode">在选区插入一个节点</el-descriptions-item>
        <el-descriptions-item label="insertNodes">在选区插入多个节点</el-descriptions-item>
        <el-descriptions-item label="removeNodes">删除选区所在的节点</el-descriptions-item>
        <!-- mark操作 -->
        <el-descriptions-item label="marks">获取选中文字的标记（文本样式）</el-descriptions-item>
        <el-descriptions-item label="addMark">为选中的文本添加标记（文本样式）</el-descriptions-item>
        <el-descriptions-item label="removeMark">对选中的文字，取消标记（文本样式）</el-descriptions-item>
        <!-- 编辑器操作 -->
        <el-descriptions-item label="id 属性">获取编辑器 id</el-descriptions-item>
        <el-descriptions-item label="fullScreen">设置为全屏</el-descriptions-item>
        <el-descriptions-item label="unFullScreen">取消全屏</el-descriptions-item>
        <el-descriptions-item label="isFullScreen">编辑器是否全屏</el-descriptions-item>
        <el-descriptions-item label="focus">聚焦到编辑器</el-descriptions-item>
        <el-descriptions-item label="blur">失焦编辑器</el-descriptions-item>
        <el-descriptions-item label="isFocused">判断当前编辑器是否聚焦</el-descriptions-item>
        <el-descriptions-item label="enable">判断当前编辑器是否只读</el-descriptions-item>
        <el-descriptions-item label="disable">取消禁用，取消只读</el-descriptions-item>
        <el-descriptions-item label="isDisabled">判断当前编辑器是否只读</el-descriptions-item>
        <el-descriptions-item label="clear">清空编辑器内容</el-descriptions-item>
        <el-descriptions-item label="updateView">强制更新视图</el-descriptions-item>
        <el-descriptions-item label="scrollToElem">滚动到指定元素</el-descriptions-item>
        <!-- 判断 -->
        <el-descriptions-item label="isEmpty">判断当前编辑器内容是否为空（只有一个空段落）</el-descriptions-item>
        <el-descriptions-item label="isText">判断一个节点是否是 text</el-descriptions-item>
        <el-descriptions-item label="isElement">判断一个节点是否是 elem</el-descriptions-item>
        <el-descriptions-item label="isFullScreen">编辑器是否全屏</el-descriptions-item>
        <el-descriptions-item label="isDisabled">判断当前编辑器是否只读</el-descriptions-item>
        <el-descriptions-item label="isSelectedAll">判断编辑器是否全部选中</el-descriptions-item>
        <!-- 选取操作 -->
        <el-descriptions-item label="select">选中一个指定的选区</el-descriptions-item>
        <el-descriptions-item label="selectAll">选中所有内容</el-descriptions-item>
        <el-descriptions-item label="insertText">在选区插入文本</el-descriptions-item>
        <el-descriptions-item label="insertBreak">在选区回车换行</el-descriptions-item>
        <el-descriptions-item label="insertNode">在选区插入一个节点</el-descriptions-item>
        <el-descriptions-item label="insertNodes">在选区插入多个节点</el-descriptions-item>
        <el-descriptions-item label="deselect">取消选中</el-descriptions-item>
        <!-- 光标操作 -->
        <el-descriptions-item label="move">移动光标</el-descriptions-item>
        <el-descriptions-item label="moveReverse">反向移动光标</el-descriptions-item>

        <!-- 其他 -->
        <el-descriptions-item label="showProgressBar">显示进度条，一般用于上传功能</el-descriptions-item>
        <el-descriptions-item label="hidePanelOrModal">隐藏当前的弹框 （如插入链接） 和下拉列表（如设置标题、设置字体）</el-descriptions-item>
        <el-descriptions-item label="getSelectionPosition">获取选区的定位，将视情况返回 left right top bottom
            的其中几个</el-descriptions-item>
        <el-descriptions-item label="getNodePosition">获取某个节点的定位，将视情况返回 left right top bottom
            的其中几个</el-descriptions-item>
        <el-descriptions-item label="destroy">销毁编辑器和工具栏</el-descriptions-item>


    </el-descriptions>
    <el-descriptions class="margin-top" title="event" :column="1" border>
        <el-descriptions-item label="onMaxLength">当达到 maxlength 限制时，触发该回调函数</el-descriptions-item>
        <el-descriptions-item label="onCreated">编辑器创建完毕时的回调函数</el-descriptions-item>
        <el-descriptions-item label="onChange">编辑器内容、选区变化时的回调函数</el-descriptions-item>
        <el-descriptions-item label="onDestroyed">编辑器销毁时的回调函数。调用 editor.destroy()即可销毁编辑器</el-descriptions-item>
        <el-descriptions-item label="onFocus">编辑器 focus 时的回调函数</el-descriptions-item>
        <el-descriptions-item label="onBlur">编辑器 blur 时的回调函数</el-descriptions-item>
        <el-descriptions-item label="customPaste">自定义粘贴。可阻止编辑器的默认粘贴，实现自己的粘贴逻辑</el-descriptions-item>
        <el-descriptions-item label="fullScreen"></el-descriptions-item>
        <el-descriptions-item label="unFullScreen"></el-descriptions-item>
        <el-descriptions-item label="fullScreen"></el-descriptions-item>
        <el-descriptions-item label="scroll"></el-descriptions-item>
        <el-descriptions-item label="modalOrPanelShow"></el-descriptions-item>
        <el-descriptions-item label="modalOrPanelHide"></el-descriptions-item>
    </el-descriptions>
</template>
<script setup lang="ts">
import '@wangeditor/editor/dist/css/style.css'; // 引入 css
import { onBeforeUnmount, ref, shallowRef, onMounted } from 'vue';
import { Editor, Toolbar } from '@wangeditor/editor-for-vue';
// import { DomEditor } from '@wangeditor/editor';
// 编辑器实例，必须用 shallowRef
const editorRef = shallowRef();
const mode = 'default'; // 或 'simple'
const toolbarConfig = {
    toolbarKeys: [
        'headerSelect',
        // 分割线
        '|',
        // 菜单 key
        'bold',
        'italic',
        '|',
        'editLink',
        'uploadVideo',
        // 菜单组，包含多个菜单
        {
            key: 'group-more-style', // 必填，要以 group 开头
            title: '更多样式', // 必填
            iconSvg: '<svg>....</svg>', // 可选
            menuKeys: ['through', 'code', 'clearStyle'], // 下级菜单 key ，必填
        },
    ],
    excludeKeys: ['headerSelect'],
    modalAppendToBody: false,
};
const editorConfig = {
    placeholder: '请输入内容...',
    readOnly: false,
    autoFocus: false,
    maxLength: 10000,
    hoverbarKeys: {
        text: {},
    },
};
// 内容 HTML
const valueHtml = ref('<p>hello</p>');

// 模拟 ajax 异步获取内容
onMounted(() => {
    setTimeout(() => {
        valueHtml.value = '<p>模拟 Ajax 异步设置内容</p>';
    }, 1500);
});
// 组件销毁时，也及时销毁编辑器
onBeforeUnmount(() => {
    const editor = editorRef.value;
    if (editor == null) return;
    editor.destroy();
});
const handleCreated = (editor) => {
    editorRef.value = editor; // 记录 editor 实例，重要！
};
const tableData = ref([
    {
        name: '颜色',
        prop: 'color',
        propsList: [{ key: 'colors', example: "['#000', '#333', '#666']" }],
    },
    {
        name: '字号',
        prop: 'fontSize',
        propsList: [
            {
                key: 'fontSizeList',
                example: `[12px','16px',{ name: '24px', value: '24px' },'40px',]`,
            },
        ],
    },
    {
        name: '字体',
        prop: 'fontFamily',
        propsList: [
            {
                key: 'fontFamilyList',
                example: `'黑体',
        '楷体',
        { name: '仿宋', value: '仿宋' },`,
            },
        ],
    },
    {
        name: '行高',
        prop: 'lineHeight',
        propsList: [{ key: 'lineHeightList', example: "['1', '1.5', '2', '2.5']" }],
    },
    {
        name: '表情',
        prop: 'emotion',
        propsList: [
            {
                key: 'emotion',
                example:
                    "emotions: '😀 😃 😄 😁 😆 😅 😂 🤣 😊 😇 🙂 🙃 😉'.split(' ') ",
            },
        ],
    },
    {
        name: '链接',
        prop: 'insertLink',
        propsList: [
            {
                key: 'checkLink',
                tran: '校验链接',
                example:
                    'customCheckLinkFn(text: string, url: string): string | boolean | undefined {  }',
            },
            {
                key: 'parseLinkUrl',
                tran: '转换链接 url',
                example: 'customParseLinkUrl(url: string): string { }',
            },
        ],
    },
    {
        name: '图片',
        prop: 'insertImage',
        propsList: [
            { key: 'onInsertedImage', tran: '插入图片之后的回调', example: `customCheckImageFn(src: string, alt: string, url: string): boolean | undefined | string {}` },
            { key: 'onUpdatedImage', tran: '更新图片之后的回调' },
            { key: 'checkImage', tran: '校验图片链接' },
            { key: 'parseImageSrc', tran: '转换图片链接' }],
    },
    {
        name: '上传图片',
        prop: 'uploadImage',
        propsList: [
            { key: 'server', example: "/api/upload'" },
            { key: 'fieldName', example: "['#000', '#333', '#666']" },
            { key: 'maxFileSize', example: "['#000', '#333', '#666']" },
            { key: 'maxNumberOfFiles', example: "['#000', '#333', '#666']" },
            { key: 'allowedFileTypes', example: "['#000', '#333', '#666']" },
            { key: 'meta', example: "['#000', '#333', '#666']" },
            { key: 'metaWithUrl', example: "['#000', '#333', '#666']" },
            { key: 'headers', example: "['#000', '#333', '#666']" },
            { key: 'withCredentials', example: "['#000', '#333', '#666']" },
            { key: 'onBeforeUpload', example: "['#000', '#333', '#666']" },
            { key: 'onProgress', example: "['#000', '#333', '#666']" },
            { key: 'onSuccess', example: "['#000', '#333', '#666']" },
            { key: 'onFailed', example: "['#000', '#333', '#666']" },
            { key: 'onError', example: "['#000', '#333', '#666']" },
            { key: 'customInsert', example: "['#000', '#333', '#666']" },
            { key: 'customUpload', example: "['#000', '#333', '#666']" },
            { key: 'customBrowseAndUpload', example: "['#000', '#333', '#666']" },
            { key: 'base64LimitSize', example: "['#000', '#333', '#666']" },
        ],
    },
    {
        name: '视频',
        prop: 'insertVideo',
        propsList: [{ key: 'colors', example: "['#000', '#333', '#666']" }],
    },
    {
        name: '上传视频',
        prop: 'uploadVideo',
        propsList: [{ key: 'colors', example: "['#000', '#333', '#666']" }],
    },
    {
        name: '代码高亮',
        prop: 'codeSelectLang',
        propsList: [{ key: 'colors', example: "['#000', '#333', '#666']" }],
    },
    {
        name: '其他',
    },
]);
const onChange = (editor) => {
    // console.log(editor.getHtml());
    console.log(editor.getElemsByTypePrefix('header'));

}
const onFocus = (editor) => {
    // console.log(editor.getSelectionText());

}
const customPast1 = (editor, event) => {
    editor.insertText('xxx');

    // 异步
    setTimeout(() => {
        editor.insertText('yy');
    }, 1000);

    // 阻止默认的粘贴行为
    event.preventDefault();
    return false;
};
</script>
<style lang="scss">
.el-descriptions {
    width: 100%;

    .el-descriptions__body {
        tbody {
            width: 100%;
            display: inline-table;
        }
    }
}
</style>
