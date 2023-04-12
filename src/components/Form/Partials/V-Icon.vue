<script setup>
import { computed, defineProps } from 'vue'

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
 * CSS wrapper classes.
 *
 * @type {import ('vue').ComputedRef<String>}
 */
const classesWrapper = computed(() => {
  let classes = [
    'border',
    'border-r-0',
    'border-nord-snow-storm-100',
    'dark:border-nord-400',
    'rounded-l',
    'p-2',
    'pr-0',
    'bg-nord-snow-storm-300',
    'dark:bg-nord-100',
  ]

  if (props.side === 'right') {
    classes[1] = 'border-l-0'
    classes[4] = 'rounded-r'
    classes[6] = 'pl-0'
  }

  return classes.join(' ')
})

/**
 * CSS icon classes.
 *
 * @type {import ('vue').ComputedRef<String>}
 */
const classesIcon = computed(() => {
  let classes = ['pr-0', 'text-nord-300', 'dark:text-nord-snow-storm-300']

  const sizeClasses = {
    xs: ['text-xs', 'pl-1'],
    sm: ['text-sm', 'pl-1'],
    base: ['text-base', 'pl-2'],
    lg: ['text-lg', 'pl-2'],
    xl: ['text-xl', 'pl-3'],
    '2xl': ['text-2xl', 'pl-3'],
  }

  if (props.side === 'right') {
    classes[1] = 'pl-0'
    sizeClasses['xs'][1] = 'pr-1'
    sizeClasses['sm'][1] = 'pr-1'
    sizeClasses['base'][1] = 'pr-2'
    sizeClasses['lg'][1] = 'pr-2'
    sizeClasses['xl'][1] = 'pr-3'
    sizeClasses['2xl'][1] = 'pr-3'
  }

  classes.push(...(sizeClasses[props.size] || sizeClasses['base']))

  return classes.join(' ')
})
</script>

<template>
  <div class="flex items-center justify-center" :class="classesWrapper">
    <span class="material-symbols-rounded" :class="classesIcon">
      {{ icon }}
    </span>
  </div>
</template>
