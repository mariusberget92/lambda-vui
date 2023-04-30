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
   * @options red, green, blue, orange, yellow, mauve
   */
  color: {
    type: String,
    default: 'blue',
    validator: (val) => {
      return ['red', 'green', 'blue', 'orange', 'yellow', 'mauve'].includes(val)
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

  /**
   * Whether the button is unstyled.
   *
   * @type {Boolean}
   * @default false
   */
  unstyled: {
    type: Boolean,
    default: false,
  },
})

/**
 * Whether the input has a icon.
 *
 * @type {import('vue').ComputedRef<Boolean>}
 */
const hasIcon = computed(() => {
  return props.icon !== false
})

/**
 * Whether the input has a text.
 *
 * @type {import('vue').ComputedRef<Boolean>}
 */
const hasText = computed(() => {
  return props.text !== false
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
      text: ['p-2', 'space-x-2'],
      icon: ['p-2', 'h-[34px]'],
      both: ['p-2', 'space-x-2'],
    },
    sm: {
      text: ['p-2', 'space-x-2'],
      icon: ['p-2', 'h-[38px]'],
      both: ['p-2', 'space-x-2'],
    },
    base: {
      text: ['p-2', 'space-x-2.5'],
      icon: ['p-2', 'h-[42px]'],
      both: ['p-2', 'space-x-2.5'],
    },
    lg: {
      text: ['p-3', 'space-x-2.5'],
      icon: ['p-3', 'h-[46px]'],
      both: ['p-3', 'space-x-2.5'],
    },
    xl: {
      text: ['p-3', 'space-x-3'],
      icon: ['p-3', 'h-[46px]'],
      both: ['p-3', 'space-x-3'],
    },
    '2xl': {
      text: ['p-4', 'space-x-3'],
      icon: ['p-4', 'h-[50px]'],
      both: ['p-4', 'space-x-3'],
    },
  }
  
  if (!props.unstyled) {
    if (hasText.value && hasIcon.value) {
      classes.push(...sizeClasses[props.size].both)
    } else if (hasText.value) {
      classes.push(...sizeClasses[props.size].text)
    } else {
      classes.push(...sizeClasses[props.size].icon)
    }
  }

  const colorClasses = {
    red: [
      'bg-nord-aurora-200',
      'border-nord-aurora-100',
      'hover:bg-nord-aurora-100',
      'text-white',
    ],
    green: [
      'bg-nord-aurora-1100',
      'border-nord-aurora-1000',
      'hover:bg-nord-aurora-1000',
      'text-white',
    ],
    blue: [
      'bg-nord-frost-300',
      'border-nord-frost-400',
      'hover:bg-nord-frost-400',
      'text-white',
    ],
    orange: [
      'bg-nord-aurora-500',
      'border-nord-aurora-400',
      'hover:bg-nord-aurora-400',
      'text-white',
    ],
    yellow: [
      'bg-nord-aurora-800',
      'border-nord-aurora-700',
      'hover:bg-nord-aurora-700',
      'text-white',
    ],
    mauve: [
      'bg-nord-aurora-1400',
      'border-nord-aurora-1300',
      'hover:bg-nord-aurora-1300',
      'text-white',
    ],
  }

  const outlinedColorClasses = {
    red: [
      'bg-transparent',
      'border-nord-aurora-200',
      'hover:border-nord-aurora-100',
      'dark:border-nord-aurora-200',
      'dark:hover:border-nord-aurora-100',
      'text-nord-aurora-200',
      'hover:text-nord-aurora-100',
    ],
    green: [
      'bg-transparent',
      'border-nord-aurora-1100',
      'hover:border-nord-aurora-1000',
      'dark:border-nord-aurora-1100',
      'dark:hover:border-nord-aurora-1000',
      'text-nord-aurora-1100',
      'hover:text-nord-aurora-1000',
    ],
    blue: [
      'bg-transparent',
      'border-nord-frost-300',
      'hover:border-nord-frost-400',
      'dark:border-nord-frost-300',
      'dark:hover:border-nord-frost-400',
      'text-nord-frost-300',
      'hover:text-nord-frost-400',
    ],
    orange: [
      'bg-transparent',
      'border-nord-aurora-500',
      'hover:border-nord-aurora-400',
      'dark:border-nord-aurora-500',
      'dark:hover:border-nord-aurora-400',
      'text-nord-aurora-500',
      'hover:text-nord-aurora-400',
    ],
    yellow: [
      'bg-transparent',
      'border-nord-aurora-800',
      'hover:border-nord-aurora-700',
      'dark:border-nord-aurora-800',
      'dark:hover:border-nord-aurora-700',
      'text-nord-aurora-800',
      'hover:text-nord-aurora-700',
    ],
    mauve: [
      'bg-transparent',
      'border-nord-aurora-1400',
      'hover:border-nord-aurora-1300',
      'dark:border-nord-aurora-1400',
      'dark:hover:border-nord-aurora-1300',
      'text-nord-aurora-1400',
      'hover:text-nord-aurora-1300',
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
    class="flex items-center justify-center border transition-colors dark:border-transparent"
    :class="[
      classButton,
      {
        rounded: shape == 'rounded',
        'rounded-none': shape == 'square',
        'rounded-full': shape == 'pill',
        'opacity-50': processing || disabled,
        'aspect-square': hasIcon && !hasText,
      },
    ]"
    :disabled="processing || disabled"
  >
    <span
      v-if="hasIcon && !processing"
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
    <span v-if="hasText" :class="$sizeToClass(size)" class="font-medium">{{
      text
    }}</span>
  </button>
</template>
