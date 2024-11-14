<template><div><h1 id="编辑器" tabindex="-1"><a class="header-anchor" href="#编辑器" aria-hidden="true">#</a> 编辑器</h1>
<EditorDemo /><p><a href="https://rain120.github.io/athena/zh/slate/Introduction.html#why" target="_blank" rel="noopener noreferrer">slate 官网链接(Slate (opens new window)是一个 完全 可定制的富文本编辑器框架)<ExternalLinkIcon/></a></p>
<h4 id="节点数据结构" tabindex="-1"><a class="header-anchor" href="#节点数据结构" aria-hidden="true">#</a> 节点数据结构</h4>
<p>待制作...</p>
<h4 id="自定义扩展新功能" tabindex="-1"><a class="header-anchor" href="#自定义扩展新功能" aria-hidden="true">#</a> 自定义扩展新功能</h4>
<p>待制作...</p>
<h4 id="插件" tabindex="-1"><a class="header-anchor" href="#插件" aria-hidden="true">#</a> 插件</h4>
<p>待制作...</p>
<details class="custom-container details"><summary>点击查看代码</summary>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code>    <span class="token operator">&lt;</span>div style<span class="token operator">=</span><span class="token string">"border: 1px solid #ccc"</span><span class="token operator">></span>
        <span class="token operator">&lt;</span><span class="token operator">!</span><span class="token operator">--</span> <span class="token operator">&lt;</span>Toolbar style<span class="token operator">=</span><span class="token string">"border-bottom: 1px solid #ccc"</span> <span class="token operator">:</span>editor<span class="token operator">=</span><span class="token string">"editorRef"</span> <span class="token operator">:</span>defaultConfig<span class="token operator">=</span><span class="token string">"toolbarConfig"</span>
            <span class="token operator">:</span>mode<span class="token operator">=</span><span class="token string">"mode"</span> <span class="token operator">/</span><span class="token operator">></span> <span class="token operator">--</span><span class="token operator">></span>
        <span class="token operator">&lt;</span><span class="token operator">!</span><span class="token operator">--</span> <span class="token operator">&lt;</span>Editor style<span class="token operator">=</span><span class="token string">"height: 300px; overflow-y: hidden"</span> v<span class="token operator">-</span>model<span class="token operator">=</span><span class="token string">"valueHtml"</span> <span class="token operator">:</span>defaultConfig<span class="token operator">=</span><span class="token string">"editorConfig"</span> <span class="token operator">:</span>mode<span class="token operator">=</span><span class="token string">"mode"</span>
            @onCreated<span class="token operator">=</span><span class="token string">"handleCreated"</span> @customPaste<span class="token operator">=</span><span class="token string">"customPast1"</span> @onChange<span class="token operator">=</span><span class="token string">"onChange"</span> @onBlur<span class="token operator">=</span><span class="token string">"onFocus"</span> <span class="token operator">/</span><span class="token operator">></span> <span class="token operator">--</span><span class="token operator">></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code>        <span class="token operator">&lt;</span>el<span class="token operator">-</span>descriptions<span class="token operator">-</span>item label<span class="token operator">=</span><span class="token string">"modalOrPanelHide"</span><span class="token operator">></span><span class="token operator">&lt;</span><span class="token operator">/</span>el<span class="token operator">-</span>descriptions<span class="token operator">-</span>item<span class="token operator">></span>
    <span class="token operator">&lt;</span><span class="token operator">/</span>el<span class="token operator">-</span>descriptions<span class="token operator">></span>
<span class="token operator">&lt;</span><span class="token operator">/</span>template<span class="token operator">></span>
<span class="token operator">&lt;</span>script setup lang<span class="token operator">=</span><span class="token string">"ts"</span><span class="token operator">></span>
<span class="token keyword">import</span> <span class="token string">'@wangeditor/editor/dist/css/style.css'</span><span class="token punctuation">;</span> <span class="token comment">// 引入 css</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> onBeforeUnmount<span class="token punctuation">,</span> ref<span class="token punctuation">,</span> shallowRef<span class="token punctuation">,</span> onMounted <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'vue'</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> Editor<span class="token punctuation">,</span> Toolbar <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'@wangeditor/editor-for-vue'</span><span class="token punctuation">;</span>
<span class="token comment">// import { DomEditor } from '@wangeditor/editor';</span>
<span class="token comment">// 编辑器实例，必须用 shallowRef</span>
<span class="token keyword">const</span> editorRef <span class="token operator">=</span> <span class="token function">shallowRef</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> mode <span class="token operator">=</span> <span class="token string">'default'</span><span class="token punctuation">;</span> <span class="token comment">// 或 'simple'</span>
<span class="token keyword">const</span> toolbarConfig <span class="token operator">=</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">toolbarKeys</span><span class="token operator">:</span> <span class="token punctuation">[</span>
        <span class="token string">'headerSelect'</span><span class="token punctuation">,</span>
        <span class="token comment">// 分割线</span>
        <span class="token string">'|'</span><span class="token punctuation">,</span>
        <span class="token comment">// 菜单 key</span>
        <span class="token string">'bold'</span><span class="token punctuation">,</span>
        <span class="token string">'italic'</span><span class="token punctuation">,</span>
        <span class="token string">'|'</span><span class="token punctuation">,</span>
        <span class="token string">'editLink'</span><span class="token punctuation">,</span>
        <span class="token string">'uploadVideo'</span><span class="token punctuation">,</span>
        <span class="token comment">// 菜单组，包含多个菜单</span>
        <span class="token punctuation">{</span>
            <span class="token literal-property property">key</span><span class="token operator">:</span> <span class="token string">'group-more-style'</span><span class="token punctuation">,</span> <span class="token comment">// 必填，要以 group 开头</span>
            <span class="token literal-property property">title</span><span class="token operator">:</span> <span class="token string">'更多样式'</span><span class="token punctuation">,</span> <span class="token comment">// 必填</span>
            <span class="token literal-property property">iconSvg</span><span class="token operator">:</span> <span class="token string">'&lt;svg>....&lt;/svg>'</span><span class="token punctuation">,</span> <span class="token comment">// 可选</span>
            <span class="token literal-property property">menuKeys</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">'through'</span><span class="token punctuation">,</span> <span class="token string">'code'</span><span class="token punctuation">,</span> <span class="token string">'clearStyle'</span><span class="token punctuation">]</span><span class="token punctuation">,</span> <span class="token comment">// 下级菜单 key ，必填</span>
        <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token punctuation">]</span><span class="token punctuation">,</span>
    <span class="token literal-property property">excludeKeys</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">'headerSelect'</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
    <span class="token literal-property property">modalAppendToBody</span><span class="token operator">:</span> <span class="token boolean">false</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> editorConfig <span class="token operator">=</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">placeholder</span><span class="token operator">:</span> <span class="token string">'请输入内容...'</span><span class="token punctuation">,</span>
    <span class="token literal-property property">readOnly</span><span class="token operator">:</span> <span class="token boolean">false</span><span class="token punctuation">,</span>
    <span class="token literal-property property">autoFocus</span><span class="token operator">:</span> <span class="token boolean">false</span><span class="token punctuation">,</span>
    <span class="token literal-property property">maxLength</span><span class="token operator">:</span> <span class="token number">10000</span><span class="token punctuation">,</span>
    <span class="token literal-property property">hoverbarKeys</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token literal-property property">text</span><span class="token operator">:</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token comment">// 内容 HTML</span>
<span class="token keyword">const</span> valueHtml <span class="token operator">=</span> <span class="token function">ref</span><span class="token punctuation">(</span><span class="token string">'&lt;p>hello&lt;/p>'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// 模拟 ajax 异步获取内容</span>
<span class="token function">onMounted</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
    <span class="token function">setTimeout</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
        valueHtml<span class="token punctuation">.</span>value <span class="token operator">=</span> <span class="token string">'&lt;p>模拟 Ajax 异步设置内容&lt;/p>'</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token number">1500</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">// 组件销毁时，也及时销毁编辑器</span>
<span class="token function">onBeforeUnmount</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
    <span class="token keyword">const</span> editor <span class="token operator">=</span> editorRef<span class="token punctuation">.</span>value<span class="token punctuation">;</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>editor <span class="token operator">==</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token keyword">return</span><span class="token punctuation">;</span>
    editor<span class="token punctuation">.</span><span class="token function">destroy</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></details>
</div></template>


