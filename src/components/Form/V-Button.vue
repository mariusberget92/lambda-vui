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
   * Whether the button is rounded.
   *
   * @type {Boolean}
   * @default true
   */
  rounded: {
    type: Boolean,
    default: true,
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
      text: ['space-x-1.5 !h-[32px]'],
      icon: ['h-[32px]'],
      both: ['space-x-1.5 !h-[32px]'],
    },
    sm: {
      text: ['space-x-1.5 !h-[36px]'],
      icon: ['h-[36px]'],
      both: ['space-x-1.5 !h-[36px]'],
    },
    base: {
      text: ['space-x-2 h-[40px]'],
      icon: ['h-[40px]'],
      both: ['space-x-2 h-[40px]'],
    },
    lg: {
      text: ['space-x-2 h-[44px]'],
      icon: ['h-[44px]'],
      both: ['space-x-2 h-[44px]'],
    },
    xl: {
      text: ['space-x-2.5 h-[44px]'],
      icon: ['h-[44px]'],
      both: ['space-x-2.5 h-[44px]'],
    },
    '2xl': {
      text: ['space-x-2.5 h-[48px]'],
      icon: ['h-[48px]'],
      both: ['space-x-2.5 h-[48px]'],
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
    red: ['bg-nord-red-300', 'hover:bg-nord-red-100'],
    green: [
      'bg-nord-green-300',
      'hover:bg-nord-green-100',
    ],
    blue: [
      'bg-nord-blue-300',
      'hover:bg-nord-blue-100',
    ],
    orange: [
      'bg-nord-orange-300',
      'hover:bg-nord-orange-100',
    ],
    mauve: [
      'bg-nord-mauve-300',
      'hover:bg-nord-mauve-100',
    ],
  }

  const outlinedColorClasses = {
    red: [
      'text-nord-red-300',
      'border-nord-red-300',
      'hover:border-nord-red-100',
      'hover:text-nord-red-100',
    ],
    green: [
      'text-nord-green-300',
      'border-nord-green-300',
      'hover:border-nord-green-100',
      'hover:text-nord-green-100',
    ],
    blue: [
      'text-nord-blue-300',
      'border-nord-blue-300',
      'hover:border-nord-blue-100',
      'hover:text-nord-blue-100',
    ],
    orange: [
      'text-nord-orange-300',
      'border-nord-orange-300',
      'hover:border-nord-orange-100',
      'hover:text-nord-orange-100',
    ],
    mauve: [
      'text-nord-mauve-300',
      'border-nord-mauve-300',
      'hover:border-nord-mauve-100',
      'hover:text-nord-mauve-100',
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
    :type="props.type"
    class="flex items-center justify-center border p-2 px-4 transition-all duration-100 ease-in-out"
    :class="[
      classButton,
      {
        rounded: props.rounded,
        'pointer-events-none opacity-50': props.processing || props.disabled,
        'aspect-square': props.icon && !props.text,
        'bg-transparent': props.outline,
        'text-white': !props.outline,
        'border-transparent': !props.outline,
      },
    ]"
    :disabled="props.processing || props.disabled"
  >
    <span
      v-if="props.icon && !props.processing"
      :class="$sizeToClass(props.size)"
      class="material-symbols-rounded leadin-none"
      >{{ props.icon }}</span
    >
    <span
      v-if="props.processing"
      :class="$sizeToClass(props.size)"
      class="material-symbols-rounded animate-spin leading-none"
      >refresh</span
    >
    <span
      v-if="props.text"
      :class="$sizeToClass(props.size)"
      class="font-medium leading-none"
      >{{ props.text }}</span
    >
  </button>
</template>
