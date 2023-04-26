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
      text: ['px-2', 'py-2', 'space-x-2'],
      icon: ['p-2', 'aspect-square', 'space-x-2'],
      both: ['px-2', 'py-2', 'space-x-2'],
    },
    sm: {
      text: ['px-3', 'py-2', 'space-x-2'],
      icon: ['p-2', 'aspect-square', 'space-x-2'],
      both: ['px-3', 'py-2', 'space-x-2'],
    },
    base: {
      text: ['px-4', 'py-2', 'space-x-2.5'],
      icon: ['p-2', 'aspect-square', 'space-x-2.5'],
      both: ['px-4', 'py-2', 'space-x-2.5'],
    },
    lg: {
      text: ['px-6', 'py-3', 'space-x-2.5'],
      icon: ['p-3', 'aspect-square', 'space-x-2.5'],
      both: ['px-6', 'py-3', 'space-x-2.5'],
    },
    xl: {
      text: ['px-8', 'py-3', 'space-x-3'],
      icon: ['p-3', 'aspect-square', 'space-x-3'],
      both: ['px-8', 'py-3', 'space-x-3'],
    },
    '2xl': {
      text: ['px-10', 'py-4', 'space-x-3'],
      icon: ['p-4', 'aspect-square', 'space-x-3'],
      both: ['px-10', 'py-4', 'space-x-3'],
    },
  }

  if (hasText.value && hasIcon.value) {
    classes.push(...sizeClasses[props.size].both)
  } else if (hasText.value) {
    classes.push(...sizeClasses[props.size].text)
  } else {
    classes.push(...sizeClasses[props.size].icon)
  }

  const colorClasses = {
    red: [
      'bg-nord-aurora-200',
      'border-nord-aurora-100',
      'hover:bg-nord-aurora-100',
    ],
    green: [
      'bg-nord-aurora-1100',
      'border-nord-aurora-1000',
      'hover:bg-nord-aurora-1000',
    ],
    blue: [
      'bg-nord-frost-300',
      'border-nord-frost-400',
      'hover:bg-nord-frost-400',
    ],
    orange: [
      'bg-nord-aurora-500',
      'border-nord-aurora-400',
      'hover:bg-nord-aurora-400',
    ],
    yellow: [
      'bg-nord-aurora-800',
      'border-nord-aurora-700',
      'hover:bg-nord-aurora-700',
    ],
    mauve: [
      'bg-nord-aurora-1400',
      'border-nord-aurora-1300',
      'hover:bg-nord-aurora-1300',
    ],
  }

  classes.push(...colorClasses[props.color])

  return classes.join(' ')
})
</script>

<template>
  <div
    class="flex"
    :class="{
      'opacity-50': processing || disabled,
      'w-full': hasIcon && !hasText,
    }"
  >
    <button
      :type="type"
      class="flex h-full items-center justify-center border transition-colors dark:border-transparent"
      :class="[
        classButton,
        {
          rounded: shape == 'rounded',
          'rounded-none': shape == 'square',
          'rounded-full': shape == 'pill',
        },
      ]"
      :disabled="processing || disabled"
    >
      <span
        v-if="hasIcon && !processing"
        :class="$sizeToClass(size)"
        class="material-symbols-rounded text-white"
        >{{ icon }}</span
      >
      <span
        v-if="processing"
        :class="$sizeToClass(size)"
        class="material-symbols-rounded animate-spin text-white"
        >refresh</span
      >
      <span
        v-if="hasText"
        :class="$sizeToClass(size)"
        class="font-medium text-white"
        >{{ text }}</span
      >
    </button>
  </div>
</template>
