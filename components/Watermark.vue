<template>
    <div class="watermark">
        <slot></slot>
        <div :style="watermarkStyle"></div>
    </div>
</template>

<script setup lang="ts" name="Watermark">
import { defineComponent, onMounted, onUnmounted, ref, watch } from 'vue';
const props = defineProps({
    text: {
        type: String,
        default: 'Watermark'
    },
    opacity: {
        type: Number,
        default: 0.5
    },
    fontSize: {
        type: Number,
        default: 20
    },
    fontColor: {
        type: String,
        default: 'rgba(0, 0, 0, 0.2)'
    },
    angle: {
        type: Number,
        default: 45
    },
    zIndex: {
        type: Number,
        default: 1000
    }
});
const watermarkStyle = ref({});
const createWatermark = (text: string) => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const ratio = window.devicePixelRatio || 1;
    // 调整水印密集度
    canvas.width = canvas.height = 100 * ratio;
    if (ctx) {
        ctx.font = `${props.fontSize}px Arial`;
        ctx.fillStyle = props.fontColor;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';

        // 保存当前状态
        ctx.save();
        // 计算文本位置
        let x = canvas.width / 2;
        let y = canvas.height / 2;

        // 将 Canvas 原点移动到文本中心
        ctx.translate(x, y);

        // 旋转文本（例如，旋转45度）
        ctx.rotate((Math.PI / 180) * props.angle);

        // 绘制文本
        ctx.fillText(text, 0, 0);
        // 恢复之前保存的状态
        ctx.restore();
    }
    return canvas;
};

const updateWatermark = () => {
    const watermarkCanvas = createWatermark(props.text);
    watermarkStyle.value = {
        position: 'absolute',
        top: '0%',
        left: '0',
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: props.zIndex,
        background: props.opacity ? `url(${watermarkCanvas.toDataURL('image/png')}) left top repeat` : '',
        opacity: props.opacity
    };

};

onMounted(updateWatermark);
onUnmounted(() => {
    watermarkStyle.value = {};
});
</script>
<style lang="scss" scoped>
.watermark {
    position: relative;
}
</style>