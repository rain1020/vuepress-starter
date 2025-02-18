<template>
    <div class='card'></div>
</template>
<script setup lang="ts">
</script>
<style lang="scss" scoped>
$c: #f94144, #f3722c, #f8961e, #f9844a, #f9c74f, #90be6d, #43aa8b, #4d908e, #277da1, #577590;
$b: 6px; // border-width
$r: 2em; // blur radius

.card {
    background-color: #222;
    max-width: 100%;
    position: relative;
    aspect-ratio: 5 / 2;
    border: solid $b #0000;
    padding: .75em;
    border-radius: 1em;

    &::before,
    &::after {
        content: '';
        --full: conic-gradient(red 0 0);
        position: absolute;
        inset: 2*$b;
        border: inherit;
        border-radius: inherit;
        box-shadow: 0 0 3*$r rgba(0 0 0/ .001);
        background: conic-gradient(from var(--α),
            #{$c}, #{nth($c, 1)}) border-box;
        mask: var(--full) no-clip subtract,
            var(--full) padding-box;
        pointer-events: none;
        animation: α 4s linear infinite;

    }
}

@property --α {
    syntax: '<angle>';
    initial-value: 0deg;
    inherits: false;
}

@keyframes α {
    to {
        --α: 1turn;
    }
}
</style>