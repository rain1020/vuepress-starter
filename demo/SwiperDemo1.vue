<template>
    <div class="swiper-container1">
        <div class="swiper-wrapper">
            <div class="swiper-slide" v-for="info in date">
                <div class="message-item">{{ info }}</div>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import Swiper from 'swiper/bundle';
import 'swiper/css/bundle';
import { onMounted, onUnmounted, ref } from 'vue';
let swiper: Swiper | null;
const initSwiper = () => {
    swiper = new Swiper('.swiper-container1', {
        direction: 'vertical',  // 垂直方向
        slidesPerView: 10,      // 同时显示10条
        spaceBetween: 5,        // 条目间距
        loop: true,              // 循环模式
        autoplay: {
            delay: 0,        // 自动切换间隔（ms）
            disableOnInteraction: true // 用户操作后继续自动播放
        },
        speed: 3000,            // 切换速度（ms）
        grabCursor: false,       // 不显示抓取手势
        allowTouchMove: false,   // 禁止触摸滑动
    });
}
let date = ref<Array<String>>([])
const createDate = () => {
    for (let index = 0; index < 50; index++) {
        date.value.push(`这是第第${index + 1}个数据这是第这是第这是第这是第这是第这是第这是第这是第这是第这是第这是第这是第这是第这是第这是`)
    }
}
{
    createDate()
}
onMounted(() => {
    initSwiper()
})
onUnmounted(() => {
    if (swiper) {
        swiper.destroy()
        swiper = null;
    }
})

</script>
<style lang="scss" scoped>
@import '../demo/CommentCSS.scss';

$height: 30px;
$p: 10px;

.swiper-container1 {
    position: relative;
    height: calc($height * 10);
    overflow: hidden;
    border: 12px solid transparent;
    border-radius: 5px;


    &::before {
        content: '';
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        border: inherit;
        border-radius: inherit;
        border: inherit;
        $c: #f94144, #f3722c, #f8961e, #f9844a, #f9c74f, #90be6d, #43aa8b, #4d908e, #277da1, #577590;
        background: conic-gradient(from var(--α),
            #{$c}, #{nth($c, 1)}) border-box;
        $full: conic-gradient(red 0 0);
        mask: $full no-clip subtract,
            $full content-box;
        filter: blur(10px);
        animation: α 4s linear infinite;
    }
}

.swiper-wrapper {
    transition-timing-function: linear;
    /* 匀速滚动 */
}

.message-item {
    padding: 10px 20px;
    font-size: 16px;
    color: #333;
    box-sizing: border-box;
    @include single-line-ellipsis(100%);
}

@keyframes α {
    to {
        --α: 1turn;
    }
}

@property --α {
    syntax: '<angle>';
    initial-value: 0deg;
    inherits: false;
}
</style>