<template>
    <div :style="{ display: 'inline-block' }" ref="buttonGroupRef" class="button-group-box">
        <div :class="buttonGroupClasses">
            <div class="highlight" :style="highlightStyle"></div>
            <span ref="buttonsRef" class="button" v-for="item in options" :class="{ active: modelValue == item.value }"
                @click="handelClick(item.value)">
                {{ item.label }}
            </span>
        </div>
    </div>

</template>
<script setup lang="ts">
import { computed, ref, unref } from 'vue';
interface Item {
    label: string,
    value: string | number,
}

const props = defineProps({
    modelValue: [String, Number],
    options: {
        type: Array as () => Array<Item>,
        default: () => []
    },
    size: {
        type: String,
        default: 'medium'
    },
    type: {
        type: String,
        default: 'primary'
    },
})
const emit = defineEmits(['update:modelValue']);
const buttonGroupRef = ref();
const buttonsRef = ref();
const buttonGroupClasses = computed(() => ({
    'button-group': true,
    [`button-group-${props.type}`]: true,
    [`button-group-${props.type}--${props.size}`]: true,
}))
const highlightStyle = computed(() => {
    if (!unref(buttonGroupRef) || !(props.modelValue !== 0 && props.modelValue)) return
    let index = props.options.findIndex(item => item.value == props.modelValue)
    const selectedItem = unref(buttonsRef)[index] as HTMLElement
    const { width } = selectedItem.getBoundingClientRect()
    return {
        width: `${width}px`,
        transform: `translateX(${selectedItem.offsetLeft}px)`
    }
})
const handelClick = (value) => {
    emit('update:modelValue', value)
}
</script>
<style lang="scss" scoped>
@use '../components/styles/Button.scss';
@use '../components/styles/ButtonGroup.scss';
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

.button-group-box+* {
    margin-left: .5em;
}

.button-group {
    @extend .button-group-base !optional;
    margin-top: 5px;
    margin-bottom: 4px;

    .button {
        @extend .button-base !optional;
        z-index: 1;

    }

}


$types: (
    'primary':#007bff,
    'success':#41af1c,
    'warning':#bb7306cb,
    'danger' :#cc4a4a,
);
$font-sizes: (
    small: 12px,
    medium: 14px,
    large: 16px
);

// 基本样式
@each $type, $bgcolor in $types {
    #{".button-group-#{$type}"} {

    // 高亮
    $liner: color.mix($bgcolor, #fff, 10%);
    $dark: color.mix($bgcolor , #000, 95%);
    background-color: $liner;
    color: culTextColor($liner);

    .highlight {
        position: absolute;
        height: 100%;
        background: $dark;
        border-radius: inherit;
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        z-index: 0;
    }

    .button.active {
        color: culTextColor($dark);
    }



    // 大小尺寸
    @each $size, $value in $font-sizes {
        $v: $value/ ($value * 0 + 1);

        &--#{$size} {
            .button {
                font-size: $value;
                padding:#{$v/$v * 0.7}em #{$v/$v*1.4}em;
            }

        }
    }

}
}

// 椭圆样式
@each $type, $bgcolor in $types {
    #{".button-group-R#{$type}"} {
 border-radius: 1.5em;
    // 高亮
    $liner: color.mix($bgcolor, #fff, 10%);
    $line: color.mix($bgcolor , #fff, 50%);
    $dark: color.mix($line , #000, 95%);
    background-color: $liner;
    color: culTextColor($liner);

    .highlight {
        position: absolute;
        height: 100%;
        background: $dark;
        border-radius: inherit;
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        z-index: 0;
    }

    .button.active {
        color: culTextColor($dark);
    }



    // 大小尺寸
    @each $size, $value in $font-sizes {
        $v: $value/ ($value * 0 + 1);

        &--#{$size} {
            .button {
                font-size: $value;
                padding:#{$v/$v * 0.7}em #{$v/$v*1.4}em;
            }

        }
    }

}
}

// 渐变类型
@each $type, $bgcolor in $types {
    #{".button-group-T#{$type}"} {
$r: color.red($bgcolor);
    $g: color.green($bgcolor);
    $b: color.blue($bgcolor);
    $base: rgb($r, $g, $b, 0.8);
    $light: color.mix($base , #fff, 60%);
    $lighter: color.mix($base , #fff, 30%);
    $dark: color.mix($base , #000, 90%);
    background-color: $lighter;
    color: culTextColor($lighter);

    .highlight {
        position: absolute;
        height: 100%;
        background: linear-gradient(to bottom, $light, $base, $dark);
        box-shadow: 0 5px 10px rgba($r, $g, $b, 0.5);
        border-radius: inherit;
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        z-index: 0;
    }

    .button.active {
        color: culTextColor($dark);
    }


    @each $size, $value in $font-sizes {
        $v: $value/ ($value * 0 + 1);

        &--#{$size} {
            .button {
                font-size: $value;
                padding:#{$v/$v * 0.7}em #{$v/$v*1.4}em;
            }

        }
    }
}
}
</style>