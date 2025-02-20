<template>
    <div class="swiper-container2">
        <div class="swiper-wrapper">
            <div class="swiper-slide" v-for="(imgUrl, index) in date" :key="index">
                <img :src="imgUrl" />
            </div>
        </div>
        <div class="swiper-pagination"></div>
    </div>
</template>
<script setup lang="ts">
import Swiper from 'swiper/bundle';
import 'swiper/css/bundle';
import { onMounted, onUnmounted, ref } from 'vue';
let swiper: Swiper | null;
const initSwiper = () => {
    swiper = new Swiper('.swiper-container2', {
        effect: 'coverflow',//设置 Swiper 的动画效果为 coverflow。coverflow 是一种 3D 效果，滑块会以卡片形式排列，并且在滑动时会有旋转和缩放的效果。
        grabCursor: true,//当设置为 true 时，鼠标悬停在 Swiper 容器上时，鼠标光标会变成一个可拖动的光标（类似于抓取手势）。
        centeredSlides: true,//将当前激活的滑块始终居中显示
        slidesPerView: 'auto',//设置每次可视区域显示的滑块数量为自动模式
        coverflowEffect: {
            rotate: 50,//设置滑块的旋转角度
            stretch: 0,//设置滑块的拉伸效果
            depth: 100,//设置滑块的深度效果（Z 轴方向的偏移）。：值越大，滑块之间的层次感越明显。默认值通常是 100
            modifier: 1,//缩放比例的修饰符。用于调整滑块的缩放效果。值越大，缩放效果越明显。默认值是 1，表示不进行额外的缩放修饰。
            slideShadows: true,//是否为滑块添加阴影效果。
        },
        pagination: {
            el: '.swiper-pagination',
        },
    });
}
let date = ref<string[]>([])
const createDate = () => {
    const arr = ['nature-1.jpg', 'nature-2.jpg', 'nature-3.jpg', 'nature-4.jpg', 'nature-5.jpg', 'nature-6.jpg']
    for (let index = 0; index <= arr.length - 1; index++) {
        date.value.push(`https://swiperjs.com/demos/images/${arr[index]}`)
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

.swiper-container2 {
    width: 100%;
    padding-top: 50px;
    padding-bottom: 50px;
    overflow: hidden;
}

.swiper-slide {
    background-size: cover;
    width: 300px;
    height: 300px;

    img {
        width: 300px;
        height: 300px;
    }
}
</style>