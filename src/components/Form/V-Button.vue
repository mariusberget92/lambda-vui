<script setup>
import { defineProps, computed } from 'vue'

/**
 * Component props.
 *
 * @type {Object}
 */
const props = defineProps({
  /**
   * The type of the button.
   *
   * @type {String}
   * @default submit
   */
  type: {
    type: String,
    default: 'submit',
    validator: (value) => {
      return ['submit', 'reset', 'button'].includes(value)
    },
  },

  /**
   * Button processing state.
   *
   * @type {Boolean}
   */
  processing: {
    type: [Boolean],
    default: false,
  },

  /**
   * The size of the button.
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
   * The color of the button.
   *
   * @type {String}
   * @default blue
   * @options red, green, blue, orange, mauve
   */
  color: {
    type: String,
    default: 'blue',
    validator: (val) => {
      return ['red', 'green', 'blue', 'orange', 'mauve'].includes(val)
    },
  },

  /**
   * The text of the button.
   *
   * @type {String|Boolean|Number}
   * @default false
   */
  text: {
    type: [String, Boolean, Number],
    default: false,
  },

  /**
   * The icon of the button.
   *
   * @type {String|Boolean}
   * @default false
   */
  icon: {
    type: [String, Boolean],
    default: false,
  },

  /**
   * Whether the button is disabled.
   *
   * @type {Boolean}
   * @default false
   */
  disabled: {
    type: Boolean,
    default: false,
  },

  /**
   * The shape of the button.
   *
   * @type {String}
   * @default rounded
   * @options square, rounded, pill
   */
  shape: {
    type: String,
    default: 'rounded',
    validator: (val) => {
      return ['square', 'rounded', 'pill'].includes(val)
    },
  },

  /**
   * Whether the button is outlined.
   *
   * @type {Boolean}
   * @default false
   */
  outline: {
    type: Boolean,
    default: false,
  },
})

/**
 * The classes of the button.
 *
 * @type {import('vue').ComputedRef<String>}
 */
const classButton = computed(() => {
  let classes = []

  const sizeClasses = {
    xs: {
      text: ['space-x-2'],
      icon: ['h-[34px]'],
      both: ['space-x-2'],
    },
    sm: {
      text: ['space-x-2'],
      icon: ['h-[38px]'],
      both: ['space-x-2'],
    },
    base: {
      text: ['space-x-2.5'],
      icon: ['h-[42px]'],
      both: ['space-x-2.5'],
    },
    lg: {
      text: ['space-x-2.5'],
      icon: ['h-[46px]'],
      both: ['space-x-2.5'],
    },
    xl: {
      text: ['space-x-3'],
      icon: ['h-[46px]'],
      both: ['space-x-3'],
    },
    '2xl': {
      text: ['space-x-3'],
      icon: ['h-[50px]'],
      both: ['space-x-3'],
    },
  }

  if (props.text !== false && props.icon !== false) {
    classes.push(...sizeClasses[props.size].both)
  } else if (props.text !== false) {
    classes.push(...sizeClasses[props.size].text)
  } else {
    classes.push(...sizeClasses[props.size].icon)
  }

  const colorClasses = {
    red: [
      'bg-nord-red-300',
      'border-nord-red-100',
      'hover:bg-nord-red-100',
      'hover:shadow-lg hover:shadow-nord-red-100/25',
      'dark:shadow-lg',
    ],
    green: [
      'bg-nord-green-300',
      'border-nord-green-100',
      'hover:bg-nord-green-100',
      'dark:shadow-lg',
      'dark:shadow-nord-green-100/25',
    ],
    blue: [
      'bg-nord-blue-300',
      'border-nord-blue-100',
      'hover:bg-nord-blue-100',
      'dark:shadow-lg',
      'dark:shadow-nord-blue-100/25',
    ],
    orange: [
      'bg-nord-orange-300',
      'border-nord-orange-100',
      'hover:bg-nord-orange-100',
      'dark:shadow-lg',
      'dark:shadow-nord-orange-100/25',
    ],
    mauve: [
      'bg-nord-mauve-300',
      'border-nord-mauve-100',
      'hover:bg-nord-mauve-100',
      'dark:shadow-lg',
      'dark:shadow-nord-mauve-100/25',
    ],
  }

  const outlinedColorClasses = {
    red: [
      'border-nord-red-300',
      'hover:border-nord-red-100',
      'dark:border-nord-red-300',
      'dark:hover:border-nord-red-100',
      'text-nord-red-300',
      'hover:text-nord-red-100',
      'dark:shadow-lg',
      'dark:shadow-nord-red-100/25',
    ],
    green: [
      'border-nord-green-300',
      'hover:border-nord-green-100',
      'dark:border-nord-green-300',
      'dark:hover:border-nord-green-100',
      'text-nord-green-300',
      'hover:text-nord-green-100',
      'dark:shadow-lg',
      'dark:shadow-nord-green-100/25',
    ],
    blue: [
      'border-nord-blue-300',
      'hover:border-nord-blue-100',
      'dark:border-nord-blue-300',
      'dark:hover:border-nord-blue-100',
      'text-nord-blue-300',
      'hover:text-nord-blue-100',
      'dark:shadow-lg',
      'dark:shadow-nord-blue-100/25',
    ],
    orange: [
      'border-nord-orange-300',
      'hover:border-nord-orange-100',
      'dark:border-nord-orange-300',
      'dark:hover:border-nord-orange-100',
      'text-nord-orange-300',
      'hover:text-nord-orange-100',
      'dark:shadow-lg',
      'dark:shadow-nord-orange-100/25',
    ],
    mauve: [
      'border-nord-mauve-300',
      'hover:border-nord-mauve-100',
      'dark:border-nord-mauve-300',
      'dark:hover:border-nord-mauve-100',
      'text-nord-mauve-300',
      'hover:text-nord-mauve-100',
      'dark:shadow-lg',
      'dark:shadow-nord-mauve-100/25',
    ],
  }

  props.outline
    ? classes.push(...outlinedColorClasses[props.color])
    : classes.push(...colorClasses[props.color])

  return classes.join(' ')
})
</script>

<template>
  <button
    :type="type"
    class="flex items-center justify-center border p-2 transition-all duration-300 ease-in-out"
    :class="[
      classButton,
      {
        rounded: shape == 'rounded',
        'rounded-none': shape == 'square',
        'rounded-full': shape == 'pill',
        'opacity-50': processing || disabled,
        'aspect-square': props.icon !== false && !props.text,
        'dark:border-transparent': !outline,
        'bg-transparent': outline,
        'pointer-events-none': disabled || processing,
        'text-white': !props.outline,
      },
    ]"
    :disabled="processing || disabled"
  >
    <span
      v-if="props.icon !== false && !processing"
      :class="$sizeToClass(size)"
      class="material-symbols-rounded"
      >{{ icon }}</span
    >
    <span
      v-if="processing"
      :class="$sizeToClass(size)"
      class="material-symbols-rounded animate-spin"
      >refresh</span
    >
    <span
      v-if="props.text !== false"
      :class="$sizeToClass(size)"
      class="font-medium"
      >{{ text }}</span
    >
  </button>
</template>
