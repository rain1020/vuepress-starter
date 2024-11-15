<template>
    <div v-if="modelValue" class="tour-mask" :style="({
        position: 'fixed',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        zIndex: 1000,
        pointerEvents: 'none',
    })">

        <svg :style="{
        width: '100%',
        height: '100%',
    }">
            <path :style="pathStyle" :d="path"></path>
        </svg>
    </div>
    <div class="tour-dialog" v-if="modelValue" ref="contentRef" :style="contentStyle">
        <el-icon class="tour-close" @click="onClose">
            <Close />
        </el-icon>
        <div class="tour-step">
            <h3>{{ currentStep.title }}</h3>
            <p>{{ currentStep.description }}</p>
        </div>
        <footer class="tour-footer">
            <el-button @click="onPrev" v-if="current > 0">上一步</el-button>
            <el-button @click="onNext" v-if="current <= total - 1">
                {{ current === total - 1 ? '完成' : '下一步' }}
            </el-button>
        </footer>
    </div>
</template>
<script lang="ts" setup>
import { ref, computed, onMounted, nextTick, watchEffect, onBeforeUnmount, inject, watch, unref, toRef } from 'vue'
import type { CSSProperties } from 'vue'
import { Close } from '@element-plus/icons-vue'
const props = defineProps({
    stepInfo: {
        type: Array,
        required: true,
    },
    modelValue: {
        type: Boolean,
        default: false,
    },
})

const emit = defineEmits(['update:modelValue']);
let current = ref()
const total = computed(() => {
    return props.stepInfo.length
})
const currentStep = computed(() => {
    return props.stepInfo[current.value]
})
let currentTarget
watch(
    () => current.value,
    (val) => {
        currentTarget = currentStep.value.target?.$el
        nextTick(() => {
            updatePosInfo()
            update()
        })

    }
)
watch(
    () => props.modelValue,
    (val) => {
        if (val) {
            current.value = 0
        }
    }
)
const onPrev = () => {
    current.value -= 1
}
const onNext = () => {
    if (current.value >= total.value - 1) {
        onClose()
    } else {
        current.value += 1
    }

}
const onClose = () => {
    emit('update:modelValue', false)
}
const pathStyle = computed<CSSProperties>(() => {
    return {
        fill: 'rgba(0,0,0,0.5)',
        pointerEvents: 'auto',
        cursor: 'auto',
    }
})

let posInfo = ref({
    left: 0,
    top: 0,
    width: 0,
    height: 0,
    radius: 0
})
const radius = computed(() => posInfo.value.radius ?? 2)
const roundInfo = computed(() => {
    const v = radius.value
    const baseInfo = `a${v},${v} 0 0 1`
    return {
        topRight: `${baseInfo} ${v},${v}`,
        bottomRight: `${baseInfo} ${-v},${v}`,
        bottomLeft: `${baseInfo} ${-v},${-v}`,
        topLeft: `${baseInfo} ${v},${-v}`,
    }
})

const path = computed(() => {
    const width = window.innerWidth
    const height = window.innerHeight
    const info = roundInfo.value
    const _path = `M${width},0 L0,0 L0,${height} L${width},${height} L${width},0 Z`
    const _radius = radius.value
    let props = {
        pos: posInfo.value,
    }
    return props.pos
        ? `${_path} M${props.pos.left + _radius},${props.pos.top} h${props.pos.width - _radius * 2
        } ${info.topRight} v${props.pos.height - _radius * 2} ${info.bottomRight
        } h${-props.pos.width + _radius * 2} ${info.bottomLeft} v${-props.pos.height + _radius * 2
        } ${info.topLeft} z`
        : _path
})
const updatePosInfo = () => {
    if (currentTarget) {
        const { left, top, width, height } = currentTarget.getBoundingClientRect()
        posInfo.value = {
            left: left - 6,
            top: top - 6,
            width: width + 6 * 2,
            height: height + 6 * 2,
            radius: 2,
        }
    }
}
onMounted(() => {
    window.addEventListener('resize', updatePosInfo)
    window.addEventListener('resize', update)
})
onBeforeUnmount(() => {
    window.removeEventListener('resize', updatePosInfo)
    window.removeEventListener('resize', update)
})
import type {
    ComputePositionReturn,
    Middleware,
} from '@floating-ui/dom'
const contentRef = ref()
const x = ref<number>()
const y = ref<number>()
const middlewareData = ref<ComputePositionReturn['middlewareData']>({})
const states = {
    x,
    y,
    placement: toRef('bottom'),
    strategy: toRef('fixed'),
    middlewareData: middlewareData
} as const
import {
    arrow,
    autoUpdate,
    computePosition,
    detectOverflow,
    flip,
    offset as offsetMiddelware,
    shift,
} from '@floating-ui/dom'
const overflowMiddleware = (): Middleware => {
    return {
        name: 'overflow',
        async fn(state) {
            const overflow = await detectOverflow(state)
            let overWidth = 0
            if (overflow.left > 0) overWidth = overflow.left
            if (overflow.right > 0) overWidth = overflow.right
            const floatingWidth = state.rects.floating.width
            return {
                data: {
                    maxWidth: floatingWidth - overWidth,
                },
            }
        },
    }
}
const middleware = computed(() => {
    const _middleware: Middleware[] = [
        offsetMiddelware(unref(10)),
        flip(),
        shift(),
        overflowMiddleware(),
    ]
    return _middleware
})
const update = async () => {
    const referenceEl = currentTarget
    const contentEl = unref(contentRef)
    if (!referenceEl || !contentEl) return
    const data = await computePosition(referenceEl, contentEl, {
        placement: 'bottom',
        strategy: 'fixed',
        middleware: unref(middleware),
    })
    Object.keys(states).forEach((key) => {
        states[key].value = data[key]
    })

}
const contentStyle = computed<CSSProperties>(() => {
    const { overflow } = unref(middlewareData)
    return {
        position: 'fixed',
        zIndex: '2000',
        top: unref(y) != null ? `${unref(y)}px` : '',
        left: unref(x) != null ? `${unref(x)}px` : '',
        maxWidth: overflow?.maxWidth ? `${overflow?.maxWidth}px` : '',
    }
})

</script>
<style lang="scss" scoped>
.tour-dialog {
    background-color: white;
    padding: 12px;
    min-width: 200px;
    border-radius: 5px;

    .tour-close {
        float: right;
    }

    .tour-footer {
        float: right
    }
}
</style>