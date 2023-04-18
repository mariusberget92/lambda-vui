<script setup>
import { computed, defineProps } from 'vue'

/**
 * Component props.
 *
 * @type {Object}
 */
const props = defineProps({
  /**
   * The icon to display (using Google's Material Icons)
   *
   * @type {String}
   * @required
   */
  icon: {
    type: String,
    required: true,
  },

  /**
   * The size of the icon.
   *
   * @type {String}
   * @default base
   * @options xs, sm, base, lg, xl, 2xl
   */
  size: {
    type: String,
    default: 'base',
    validator: (val) => {
      return ['xs', 'sm', 'base', 'lg', 'xl', '2xl'].includes(val)
    },
  },

  /**
   * The side of the input the icon should be displayed on.
   *
   * @type {String}
   * @default left
   * @options left, right
   */
  side: {
    type: String,
    default: 'left',
    validator: (val) => {
      return ['left', 'right'].includes(val)
    },
  },
})

/**
 * CSS icon classes.
 *
 * @type {import ('vue').ComputedRef<String>}
 */
const classIconSize = computed(() => {
  return {
    xs: ['text-xs'],
    sm: ['text-sm'],
    base: ['text-base'],
    lg: ['text-lg'],
    xl: ['text-xl'],
    '2xl': ['text-2xl'],
  }[props.size].join(' ')
})

/**
 * CSS icon padding classes.
 *
 * @type {import ('vue').ComputedRef<String>}
 */
const classIconPadding = computed(() => {
  return props.side !== 'right'
    ? {
        xs: ['pl-1'],
        sm: ['pl-1'],
        base: ['pl-2'],
        lg: ['pl-2'],
        xl: ['pl-3'],
        '2xl': ['pl-3'],
      }[props.size].join(' ')
    : {
        xs: ['pr-1'],
        sm: ['pr-1'],
        base: ['pr-2'],
        lg: ['pr-2'],
        xl: ['pr-3'],
        '2xl': ['pr-3'],
      }[props.size].join(' ')
})
</script>

<template>
  <div
    class="flex items-center justify-center bg-nord-snow-storm-300 dark:bg-nord-100 border-nord-snow-storm-100 dark:border-nord-400 border p-2"
    :class="{
      'border-l-0 rounded-r pl-0': props.side === 'right',
      'border-r-0 rounded-l pr-0': props.side !== 'right',
    }"
  >
    <span
      class="material-symbols-rounded text-nord-300 dark:text-nord-snow-storm-300"
      :class="[
        classIconSize,
        classIconPadding,
        { 'pl-0': props.side === 'right', 'pr-0': props.side !== 'right' },
      ]"
    >
      {{ icon }}
    </span>
  </div>
</template>
