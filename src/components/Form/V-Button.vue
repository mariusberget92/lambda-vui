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
   * @type {String|Boolean}
   * @default false
   */
  text: {
    type: [String, Boolean],
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

  rounded: {
    type: String,
    default: 'base',
    validator: (val) => {
      return ['none', 'sm', 'base', 'lg', 'full'].includes(val)
    },
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
const classesButton = computed(() => {
  let classes = []

  const roundedClasses = {
    none: 'rounded-none',
    sm: 'rounded-sm',
    base: 'rounded',
    lg: 'rounded-lg',
    full: 'rounded-full',
  }

  const sizeClasses = {
    xs: {
      text: ['px-2', 'py-1'],
      icon: ['p-1', 'aspect-square'],
      both: ['px-2', 'py-1', 'space-x-2'],
    },
    sm: {
      text: ['px-3', 'py-1'],
      icon: ['p-1', 'aspect-square'],
      both: ['px-3', 'py-1', 'space-x-2'],
    },
    base: {
      text: ['px-4', 'py-2'],
      icon: ['p-2', 'aspect-square'],
      both: ['px-4', 'py-2', 'space-x-2.5'],
    },
    lg: {
      text: ['px-6', 'py-3'],
      icon: ['p-3', 'aspect-square'],
      both: ['px-6', 'py-3', 'space-x-2.5'],
    },
    xl: {
      text: ['px-8', 'py-4'],
      icon: ['p-4', 'aspect-square'],
      both: ['px-8', 'py-4', 'space-x-3'],
    },
    '2xl': {
      text: ['px-10', 'py-5'],
      icon: ['p-5', 'aspect-square'],
      both: ['px-10', 'py-5', 'space-x-3'],
    },
  }

  const sizeClass = sizeClasses[props.size] || sizeClasses['base']
  if (hasText.value && hasIcon.value) {
    classes.push(...sizeClass.both)
  } else if (hasText.value) {
    classes.push(...sizeClass.text)
  } else {
    classes.push(...sizeClass.icon)
  }

  const colorClasses = {
    red: [
      'bg-nord-aurora-200',
      'border-nord-aurora-100',
      'dark:shadow-xl dark:shadow-nord-aurora-100/50',
      'hover:bg-nord-aurora-100',
    ],
    green: [
      'bg-nord-aurora-1100',
      'border-nord-aurora-1000',
      'dark:shadow-xl dark:shadow-nord-aurora-1000/50',
      'hover:bg-nord-aurora-1000',
    ],
    blue: [
      'bg-nord-frost-300',
      'border-nord-frost-400',
      'dark:shadow-xl dark:shadow-nord-frost-400/50',
      'hover:bg-nord-frost-400',
    ],
    orange: [
      'bg-nord-aurora-500',
      'border-nord-aurora-400',
      'dark:shadow-xl dark:shadow-nord-aurora-400/50',
      'hover:bg-nord-aurora-400',
    ],
    yellow: [
      'bg-nord-aurora-800',
      'border-nord-aurora-700',
      'dark:shadow-xl dark:shadow-nord-aurora-700/50',
      'hover:bg-nord-aurora-700',
    ],
    mauve: [
      'bg-nord-aurora-1400',
      'border-nord-aurora-1300',
      'dark:shadow-xl dark:shadow-nord-aurora-1300/50',
      'hover:bg-nord-aurora-1300',
    ],
  }

  classes.push(...(colorClasses[props.color] || colorClasses['blue']))
  classes.push(roundedClasses[props.rounded] || roundedClasses['base'])

  return classes.join(' ')
})

/**
 * Button size class.
 *
 * @type {import('vue').ComputedRef<string>}
 */
const buttonSize = computed(() => {
  return {
    xs: ['text-xs'],
    sm: ['text-sm'],
    base: ['text-base'],
    lg: ['text-lg'],
    xl: ['text-xl'],
    '2xl': ['text-2xl'],
  }[props.size].join(' ')
})
</script>

<template>
  <div class="flex" :class="{ 'opacity-50': processing || disabled }">
    <button
      :type="type"
      class="border dark:border-transparent transition-colors flex items-center justify-center h-full"
      :class="classesButton"
      :disabled="processing || disabled"
    >
      <span
        v-if="hasIcon && !processing"
        :class="buttonSize"
        class="material-symbols-rounded text-white"
        >{{ icon }}</span
      >
      <span
        v-if="processing"
        :class="buttonSize"
        class="material-symbols-rounded text-white animate-spin"
        >refresh</span
      >
      <span v-if="hasText" :class="buttonSize" class="font-medium text-white">{{
        text
      }}</span>
    </button>
  </div>
</template>
