<template><div><h1 id="字体库" tabindex="-1"><a class="header-anchor" href="#字体库" aria-hidden="true">#</a> 字体库</h1>
<h3 id="字体包下载地址" tabindex="-1"><a class="header-anchor" href="#字体包下载地址" aria-hidden="true">#</a> 字体包下载地址</h3>
<p><a href="https://www.fonts.net.cn/" target="_blank" rel="noopener noreferrer">字体天下<ExternalLinkIcon/></a>
<a href="https://www.iconfont.cn/fonts/index?spm=a313x.home_index.1998910419.16.58a33a81N6ZzSO" target="_blank" rel="noopener noreferrer">阿里巴巴字体库<ExternalLinkIcon/></a></p>
<h3 id="引用" tabindex="-1"><a class="header-anchor" href="#引用" aria-hidden="true">#</a> 引用</h3>
<div class="language-style line-numbers-mode" data-ext="style"><pre v-pre class="language-style"><code>@font-face {
    font-family:'字体库名称'
    src: 字体包地址，local()函数本地字体包，url(网络字体包)
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><FontDemo /><details class="custom-container details"><summary>点击查看代码</summary>
<div class="language-vue line-numbers-mode" data-ext="vue"><pre v-pre class="language-vue"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>template</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>p</span><span class="token punctuation">></span></span>你好<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>p</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>template</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>style</span> <span class="token attr-name">lang</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>scss<span class="token punctuation">"</span></span> <span class="token attr-name">scoped</span><span class="token punctuation">></span></span><span class="token style"><span class="token language-css">
<span class="token selector">p</span> <span class="token punctuation">{</span>
    <span class="token property">font-family</span><span class="token punctuation">:</span> <span class="token string">'阿里妈妈刀隶体 Regular'</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token comment">/* 在线链接服务仅供平台体验和调试使用，平台不承诺服务的稳定性，企业客户需下载字体包自行发布使用并做好备份。 */</span>
<span class="token atrule"><span class="token rule">@font-face</span></span> <span class="token punctuation">{</span>
    <span class="token property">font-family</span><span class="token punctuation">:</span> <span class="token string">"阿里妈妈刀隶体 Regular"</span><span class="token punctuation">;</span>
    <span class="token property">font-weight</span><span class="token punctuation">:</span> 400<span class="token punctuation">;</span>
    <span class="token property">src</span><span class="token punctuation">:</span> <span class="token url"><span class="token function">url</span><span class="token punctuation">(</span><span class="token string url">"../asses/font/阿里妈妈刀隶体/AlimamaDaoLiTi.woff2"</span><span class="token punctuation">)</span></span> <span class="token function">format</span><span class="token punctuation">(</span><span class="token string">"woff2"</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
        <span class="token url"><span class="token function">url</span><span class="token punctuation">(</span><span class="token string url">"../asses/font/阿里妈妈刀隶体/AlimamaDaoLiTi.woff"</span><span class="token punctuation">)</span></span> <span class="token function">format</span><span class="token punctuation">(</span><span class="token string">"woff"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token property">font-display</span><span class="token punctuation">:</span> swap<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>style</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></details>
</div></template>


