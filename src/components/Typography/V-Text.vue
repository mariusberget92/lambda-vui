<script setup>
import { computed, defineProps } from 'vue'

/**
 * Component props.
 *
 * @type {Object}
 */
const props = defineProps({
  /**
   * The size of the text.
   *
   * @type {String}
   * @default base
   * @options xs, sm, base, lg, xl, 2xl
   */
  size: {
    type: String,
    default: 'base',
    validator: (value) => {
      return ['xs', 'sm', 'base', 'lg', 'xl', '2xl'].includes(value)
    },
  },

  /**
   * The color of the text.
   *
   * @type {String}
   * @default default
   * @options red, green, blue, orange, yellow, mauve, default
   */
  color: {
    type: String,
    default: 'default',
    validator: (value) => {
      return [
        'red',
        'green',
        'blue',
        'orange',
        'yellow',
        'mauve',
        'default',
      ].includes(value)
    },
  },
})

/**
 * CSS size classes.
 *
 * @type {import ('vue').ComputedRef<String>}
 */
const classSize = computed(() => {
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
 * CSS color classes.
 *
 * @type {import ('vue').ComputedRef<String>}
 */
const classColor = computed(() => {
  let classes = []

  const colorClasses = {
    red: [
      'text-nord-aurora-200',
      'dark:text-nord-aurora-200',
      'dark:text-shadow',
      'dark:shadow-nord-aurora-100/75',
    ],
    green: [
      'text-nord-aurora-1100',
      'dark:text-nord-aurora-1100',
      'dark:text-shadow',
      'dark:shadow-nord-aurora-1000/75',
    ],
    blue: [
      'text-nord-frost-300',
      'dark:text-nord-frost-300',
      'dark:text-shadow',
      'dark:shadow-nord-frost-400/75',
    ],
    orange: [
      'text-nord-aurora-500',
      'dark:text-nord-aurora-500',
      'dark:text-shadow',
      'dark:shadow-nord-aurora-400/75',
    ],
    yellow: [
      'text-nord-aurora-800',
      'dark:text-nord-aurora-800',
      'dark:text-shadow',
      'dark:shadow-nord-aurora-700/75',
    ],
    mauve: [
      'text-nord-aurora-1400',
      'dark:text-nord-aurora-1400',
      'dark:text-shadow',
      'dark:shadow-nord-aurora-1300/75',
    ],
    default: ['text-nord-300', 'dark:text-nord-snow-storm-300'],
  }

  classes.push(...colorClasses[props.color])

  return classes.join(' ')
})
</script>

<template>
  <p :class="[classSize, classColor]" class="leading-3">
    <slot />
  </p>
</template>
