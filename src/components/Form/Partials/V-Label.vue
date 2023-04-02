<script setup>
import { computed, defineProps } from 'vue'

const props = defineProps({
  /**
   * The ID of the input.
   *
   * @type {String}
   * @required
   */
  id: {
    type: String,
    required: true,
  },

  /**
   * The label of the input.
   *
   * @type {String}
   * @required
   */
  label: {
    type: String,
    required: true,
  },

  /**
   * The size of the label.
   *
   * @type {String}
   * @default base
   * @opions xs, sm, base, lg, xl, 2xl
   */
  size: {
    type: String,
    default: 'base',
    validator: (val) => {
      return ['xs', 'sm', 'base', 'lg', 'xl', '2xl'].includes(val)
    },
  },

  /**
   * Whether the input is required.
   *
   * @type {Boolean}
   * @default false
   */
  required: {
    type: Boolean,
    default: false,
  },

  /**
   * The helper text of the input.
   *
   * @type {String|Boolean}
   * @default false
   */
  helper: {
    type: [String, Boolean],
    default: false,
  },
})

/**
 * Wheter the input has a helper text.
 *
 * @type {import('vue').ComputedRef<boolean>}
 */
const hasHelper = computed(() => {
  return props.helper !== false
})

/**
 * The classes of the label.
 *
 * @type {import('vue').ComputedRef<string>}
 */
const classesLabel = computed(() => {
  let classes = [
    'font-semibold',
    'leading-none',
    'text-nord-300',
    'dark:text-nord-snow-storm-300',
  ]

  const sizeClasses = {
    xs: ['text-xs'],
    sm: ['text-sm'],
    base: ['text-base'],
    lg: ['text-lg'],
    xl: ['text-xl'],
    '2xl': ['text-2xl'],
  }

  classes.push(...(sizeClasses[props.size] || sizeClasses['base']))

  return classes.join(' ')
})

/**
 * The classes of the required asterisk.
 *
 * @type {import('vue').ComputedRef<string>}
 */
const classesRequired = computed(() => {
  let classes = [
    'text-nord-aurora-200',
    'dark:text-shadow',
    'dark:shadow-nord-aurora-100',
    'leading-none',
  ]

  const sizeClasses = {
    xs: ['text-xs'],
    sm: ['text-sm'],
    base: ['text-base'],
    lg: ['text-lg'],
    xl: ['text-xl'],
    '2xl': ['text-2xl'],
  }

  classes.push(...(sizeClasses[props.size] || sizeClasses['base']))

  return classes.join(' ')
})

/**
 * The classes of the helper text.
 *
 * @type {import('vue').ComputedRef<string>}
 */
const classesHelper = computed(() => {
  let classes = [
    'font-regular',
    'opacity-50',
    'leading-none',
    'text-nord-300',
    'dark:text-nord-snow-storm-300',
    'mt-0.5',
  ]

  const sizeClasses = {
    xs: ['text-xs'],
    sm: ['text-xs'],
    base: ['text-sm'],
    lg: ['text-base'],
    xl: ['text-base'],
    '2xl': ['text-lg'],
  }

  classes.push(...(sizeClasses[props.size] || sizeClasses['base']))

  return classes.join(' ')
})
</script>

<template>
  <div class="flex space-x-1">
    <label :for="id" :class="classesLabel">
      {{ label }}
    </label>

    <span v-if="required" :class="classesRequired">*</span>
  </div>

  <div class="flex">
    <span v-if="hasHelper" :class="classesHelper">{{ helper }}</span>
  </div>
</template>
