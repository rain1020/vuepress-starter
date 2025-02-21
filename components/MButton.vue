<template>
    <button :class="buttonClasses">
        <slot></slot>
    </button>
</template>
<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps({
    type: {
        type: String,
        default: 'primary'
    },
    size: {
        type: String,
        default: 'medium'
    },
    disabled: {
        type: Boolean,
        default: false
    },
})
const buttonClasses = computed(() => ({
    'button-base': true,
    [`button-${props.type}`]: true,
    [`button-${props.type}--${props.size}`]: true,
}))
const parseColorToRGB = (color) => {
    // 处理 Hex 格式
    if (color.startsWith('#')) {
        const hex = color.slice(1).padEnd(6, '0');
        const hexVal = parseInt(hex, 16);
        if (isNaN(hexVal)) return null;
        return [
            (hexVal >> 16) & 255,
            (hexVal >> 8) & 255,
            hexVal & 255
        ];
    }

    // 处理 RGB 格式 "rgb(r,g,b)" 或 "rgba(r,g,b,a)"
    const rgbMatch = color.match(/(\d+),\s*(\d+),\s*(\d+)/);
    if (rgbMatch) {
        return rgbMatch.slice(1, 4).map(Number);
    }

    return null; // 无效颜色
}
const getQuickContrastColor = (bgColor) => {
    const rgb = parseColorToRGB(bgColor);
    console.log('rgb', rgb);

    if (!rgb) return '#000000';

    // 简化亮度计算（加权平均）
    const brightness = (rgb[0] * 299 + rgb[1] * 587 + rgb[2] * 114) / 1000;
    return brightness > 128 ? '#000000' : '#ffffff';
}
console.log(getQuickContrastColor('#21a675'));

</script>
<style lang="scss" scoped>
@use 'sass:color';

@function culTextColor($color) {
    $lightness: color.lightness($color);
    $r: color.red($color);
    $g: color.green($color);
    $b: color.blue($color);
    $contrast: if($lightness > 60%, #000, #fff);

    @if $lightness >40% and $lightness < 60% {
        // 近似相对亮度公式（更快）
        $brightness: (
            $r * 299 + $g * 587 + $b * 114) / 1000;
        $contrast: if($brightness > 128, #000, #fff
        );
}

@return $contrast;
}

.button-base {
    border: none;
    outline: none;
    cursor: pointer;
    font-family: inherit;
    font-weight: bold;
    transition: background-color 0.3s ease, transform 0.3s ease;
    text-align: center;
    border-radius: .4em;

    &:hover {
        transform: scale(1.05);
    }

    &:active {
        transform: scale(0.95);
    }
}

.button-base+.button-base {
    margin-left: .5em;
}


$types: (
    'primary':#007bff,
    'success':#41af1c,
    'warning':#bb7306cb,
    'danger' :#cc4a4a,
);
$button-font-sizes: (
    small: 12px,
    medium: 14px,
    large: 16px
);

// 基本样式
@each $type, $bgcolor in $types {
    #{".button-#{$type}"} {
@extend .button-base;
    background-color: $bgcolor;
    color: culTextColor($bgcolor);
    box-sizing: border-box;

    &:hover {
        background-color: darken($bgcolor, 8%);
    }

    // 大小尺寸
    @each $size, $value in $button-font-sizes {
        $v: $value/ ($value * 0 + 1);

        &--#{$size} {
            font-size: $value;
            padding:#{$v/$v * 0.7}em #{$v/$v*1.4}em;
        }
    }

}
}

// 渐变类型
@each $type, $bgcolor in $types {
    #{".button-T#{$type}"} {
@extend .button-base;
    $r: color.red($bgcolor);
    $g: color.green($bgcolor);
    $b: color.blue($bgcolor);
    $base: rgb($r, $g, $b, 0.8);
    $light: color-mix(in sRGB, $base 60%, #fff);
    $dark: color-mix(in sRGB, $base 90%, #000);
    background: linear-gradient(to bottom, $light, $base, $dark);
    box-shadow: 0 5px 10px rgba($r, $g, $b, 0.5);
    color: culTextColor($base);

    &:hover {
        background-color: darken($base, 8%);
    }

    @each $size, $value in $button-font-sizes {
        $v: $value/ ($value * 0 + 1);

        &--#{$size} {
            font-size: $value;
            padding:#{$v/$v * 0.7}em #{$v/$v*1.4}em;
        }
    }
}
}

// 镂空样式系列
@each $type, $bgcolor in $types {
    #{".button-O#{$type}"}{
@extend .button-base;
    $lighter: color.mix($bgcolor, #fff, 12%);
    $h: color.hue($bgcolor);
    $s: color.saturation($bgcolor);
    $l: color.lightness($bgcolor);
    background: $lighter;
    color: culTextColor($lighter);
    border: 1px solid $bgcolor;

    &:hover {
        color: culTextColor($lighter);
        background-color: hsla($h, calc($s * 1.1), calc($l * 0.9), 0.9);
    }

    @each $size, $value in $button-font-sizes {
        $v: $value/ ($value * 0 + 1);

        &--#{$size} {
            font-size: $value;
            padding:#{$v/$v * 0.7}em #{$v/$v*1.4}em;
        }
    }
}

}
</style>