<template>
    <div class="swiper-container3">
        <div class="swiper-wrapper">
            <div class="swiper-slide" v-for="number in 7">
                {{ number }}
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
    swiper = new Swiper('.swiper-container3', {
        effect: 'cards',
        grabCursor: true,
    });
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
@use 'sass:math';
@import '../demo/CommentCSS.scss';

.swiper-container3 {
    width: 240px;
    height: 320px;
    margin: auto;

    .swiper-slide {
        border-radius: 18px;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 40px;
        font-weight: 600;

        @for $i from 1 through 100 {
            &:nth-child(#{$i}) {
                $r: math.random(255);
                $g: math.random(255);
                $b: math.random(255);
                $base: rgb($r, $g, $b, 0.8);
                $light: color-mix(in sRGB, $base 60%, #fff);
                $dark: color-mix(in sRGB, $base 90%, #000);
                background: linear-gradient(to bottom, $light, $base, $dark);
                border-radius: 20px;
                box-shadow: 0 5px 10px rgba($r, $g, $b, 0.5);
                $complementary-color: color-mix(in sRGB, $base 0%, white);
                color: $complementary-color;
            }
        }


    }
}
</style>