<template>
    <div class="swiper-container">
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
    swiper = new Swiper('.swiper-container', {
        direction: 'vertical',  // 垂直方向
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
    for (let index = 0; index < 10; index++) {
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

.swiper-container {
    height: 60px;
    background: #f5f5f5;
    overflow: hidden;
}

.swiper-wrapper {
    transition-timing-function: linear;
    /* 匀速滚动 */
}

.message-item {
    padding: 10px 20px;
    font-size: 16px;
    color: #333;
    height: 60px;
    box-sizing: border-box;
    @include single-line-ellipsis(100%)
}
</style>