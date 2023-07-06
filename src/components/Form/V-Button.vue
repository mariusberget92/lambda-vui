<script setup>
import { defineProps, computed, defineEmits, nextTick } from 'vue'

/**
 * Component emits.
 *
 * @property {Undefined} click - Emits when the button is clicked.
 */
const emit = defineEmits(['click'])

/**
 * Component props.
 *
 * @property {String} type - The type of the button.
 * @property {Boolean} processing - Button processing state.
 * @property {String} size - The size of the button.
 * @property {String} color - The color of the button.
 * @property {String|Boolean|Number} text - The text of the button.
 * @property {String|Boolean} icon - The icon of the button.
 * @property {Boolean} disabled - Whether the button is disabled.
 * @property {Boolean} rounded - Whether the button is rounded.
 * @property {Boolean} outline - Whether the button is outlined.
 * @property {Boolean} dashed - Whether the button border is dashed.
 */
const props = defineProps({
  /**
   * The type of the button.
   *
   * @values submit, reset, button
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
   */
  processing: {
    type: [Boolean],
    default: false,
  },

  /**
   * The size of the button.
   *
   * @tvalues xs, sm, base, lg, xl, 2xl
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
   * @values red, green, blue, orange, yellow, mauve
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
   */
  text: {
    type: [String, Boolean, Number],
    default: false,
  },

  /**
   * The icon of the button.
   */
  icon: {
    type: [String, Boolean],
    default: false,
  },

  /**
   * Whether the button is disabled.
   */
  disabled: {
    type: Boolean,
    default: false,
  },

  /**
   * Whether the button is rounded.
   */
  rounded: {
    type: Boolean,
    default: true,
  },

  /**
   * Whether the button is outlined.
   */
  outline: {
    type: Boolean,
    default: false,
  },

  /**
   * Whether the button border is dashed.
   */
  dashed: {
    type: Boolean,
    default: false,
  },
})

/**
 * The calculated classes that are needed for the button.
 *
 * @returns {String}
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
    red: ['bg-nord-red-300', 'hover:bg-nord-red-100', 'focus:bg-nord-red-100'],
    green: [
      'bg-nord-green-300',
      'hover:bg-nord-green-100',
      'focus:bg-nord-green-100',
    ],
    blue: [
      'bg-nord-blue-300',
      'hover:bg-nord-blue-100',
      'focus:bg-nord-blue-100',
    ],
    orange: [
      'bg-nord-orange-300',
      'hover:bg-nord-orange-100',
      'focus:bg-nord-orange-100',
    ],
    mauve: [
      'bg-nord-mauve-300',
      'hover:bg-nord-mauve-100',
      'focus:bg-nord-mauve-100',
    ],
    yellow: [
      'bg-nord-yellow-300',
      'hover:bg-nord-yellow-100',
      'focus:bg-nord-yellow-100',
    ],
  }

  const outlinedColorClasses = {
    red: [
      'text-nord-red-300',
      'border-nord-red-300',
      'hover:border-nord-red-100',
      'hover:text-nord-red-100',
      'focus:border-nord-red-100',
      'focus:text-nord-red-100',
    ],
    green: [
      'text-nord-green-300',
      'border-nord-green-300',
      'hover:border-nord-green-100',
      'hover:text-nord-green-100',
      'focus:border-nord-green-100',
      'focus:text-nord-green-100',
    ],
    blue: [
      'text-nord-blue-300',
      'border-nord-blue-300',
      'hover:border-nord-blue-100',
      'hover:text-nord-blue-100',
      'focus:border-nord-blue-100',
      'focus:text-nord-blue-100',
    ],
    orange: [
      'text-nord-orange-300',
      'border-nord-orange-300',
      'hover:border-nord-orange-100',
      'hover:text-nord-orange-100',
      'focus:border-nord-orange-100',
      'focus:text-nord-orange-100',
    ],
    mauve: [
      'text-nord-mauve-300',
      'border-nord-mauve-300',
      'hover:border-nord-mauve-100',
      'hover:text-nord-mauve-100',
      'focus:border-nord-mauve-100',
      'focus:text-nord-mauve-100',
    ],
    yellow: [
      'text-nord-yellow-300',
      'border-nord-yellow-300',
      'hover:border-nord-yellow-100',
      'hover:text-nord-yellow-100',
      'focus:border-nord-yellow-100',
      'focus:text-nord-yellow-100',
    ],
  }

  props.outline
    ? classes.push(...outlinedColorClasses[props.color])
    : classes.push(...colorClasses[props.color])

  return classes.join(' ')
})

/**
 * Blur the button after the nextTick when clicked.
 *
 * @param {Event} event
 * @returns {Void}
 */
const blurOnClick = (event) => {
  nextTick(() => {
    event.target.blur()
  })
}
</script>

<template>
  <button
    :type="props.type"
    class="flex items-center justify-center border p-2 px-4 transition-all duration-100 ease-in-out"
    :class="[
      classButton,
      {
        rounded: props.rounded,
        'border-2 border-dashed': props.outline && props.dashed,
        'pointer-events-none opacity-50': props.processing || props.disabled,
        'aspect-square': props.icon && !props.text,
        'bg-transparent': props.outline,
        'text-white border-transparent': !props.outline,
      },
    ]"
    :disabled="props.processing || props.disabled"
    @click=";[emit('click'), blurOnClick($event)]"
  >
    <span
      v-if="props.icon && !props.processing"
      :class="$sizeToClass(props.size)"
      class="material-symbols-rounded leadin-none pointer-events-none"
      >{{ props.icon }}</span
    >
    <span
      v-if="props.processing"
      :class="$sizeToClass(props.size)"
      class="material-symbols-rounded pointer-events-none animate-spin leading-none"
      >refresh</span
    >
    <span
      v-if="props.text"
      :class="$sizeToClass(props.size)"
      class="pointer-events-none font-medium leading-none"
      >{{ props.text }}</span
    >
  </button>
</template>
