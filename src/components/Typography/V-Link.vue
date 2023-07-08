<script setup>
import { defineProps, computed } from 'vue'
import { Link } from '@inertiajs/vue3'

/**
 * Component props.
 *
 * @property {String} href - Url for the href attribute.
 * @property {String|Boolean} text - Link text.
 * @property {String|Boolean} icon - Link icon.
 * @property {String} size - Link size.
 * @property {Boolean} external - External link.
 * @property {Boolean} button - Show link as button (adds background color).
 * @property {String} color - Button or link color.
 * @property {Boolean} rounded - Whether the button should be rounded if it's a button.
 * 
 */
const props = defineProps({
  /**
   * Url for the href attribute
   */
  href: {
    type: String,
    default: '#',
  },

  /**
   * Link text
   */
  text: {
    type: [String, Boolean],
    default: false,
  },

  /**
   * Link icon
   */
  icon: {
    type: [String, Boolean],
    default: false,
  },

  /**
   * Link size
   *
   * @values xs, sm, base, lg, xl, 2xl
   */
  size: {
    type: String,
    default: 'sm',
    validator: (value) =>
      ['xs', 'sm', 'base', 'lg', 'xl', '2xl'].includes(value),
  },

  /**
   * External link
   */
  external: {
    type: Boolean,
    default: false,
  },

  /**
   * Show link as button (adds background color)
   */
  button: {
    type: Boolean,
    default: false,
  },

  /**
   * Button or link color.
   *
   * @values blue, red, green, orange, yellow, mauve, default
   */
  color: {
    type: String,
    default: 'blue',
    validator: (value) =>
      ['blue', 'red', 'green', 'orange', 'yellow', 'mauve', 'default'].includes(
        value
      ),
  },

  /**
   * Whether the button should be rounded if it's a button.
   * 
   * @values none, sm, base, lg, full
   */
  rounded: {
    type: String,
    default: 'base',
    validator: (val) => {
      return ['none', 'sm', 'base', 'lg', 'full'].includes(val)
    },
  },
})

/**
 * Wheter the link is a Link component or an anchor tag.
 *
 * @returns {String|import ('@inertiajs/inertia-vue3').Link}
 */
const tag = computed(() => {
  if (props.external) return 'a'
  else return Link
})

/**
 * CSS button classes.
 *
 * @returns {String}
 */
const classButton = computed(() => {
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

  const sizeClass = sizeClasses[props.size]
  if (props.text !== false && props.icon !== false) {
    classes.push(...sizeClass.both)
  } else if (props.text !== false) {
    classes.push(...sizeClass.text)
  } else {
    classes.push(...sizeClass.icon)
  }

  const colorClasses = {
    red: ['bg-nord-red-300', 'hover:bg-nord-red-100'],
    green: ['bg-nord-green-300', 'hover:bg-nord-green-100'],
    blue: ['bg-nord-blue-300', 'hover:bg-nord-blue-100'],
    orange: ['bg-nord-orange-300', 'hover:bg-nord-orange-100'],
    mauve: ['bg-nord-mauve-300', 'hover:bg-nord-mauve-100'],
    yellow: ['bg-nord-yellow-300', 'hover:bg-nord-yellow-100'],
  }

  classes.push(...colorClasses[props.color])
  classes.push(roundedClasses[props.rounded])

  return classes.join(' ')
})

/**
 * CSS link classes.
 *
 * @returns {String}
 */
const classLink = computed(() => {
  let classes = []

  const colorClasses = {
    red: [
      'text-nord-red-300',
      'hover:text-nord-red-100',
      'focus:text-nord-red-100',
      'dark:text-nord-red-300',
      'dark:hover:text-nord-red-100',
      'dark:focus:text-nord-red-100',
    ],
    green: [
      'text-nord-green-300',
      'hover:text-nord-green-100',
      'focus:text-nord-green-100',
      'dark:text-nord-green-300',
      'dark:hover:text-nord-green-100',
      'dark:focus:text-nord-green-100',
    ],
    blue: [
      'text-nord-blue-300',
      'hover:text-nord-blue-100',
      'focus:text-nord-blue-100',
      'dark:text-nord-blue-300',
      'dark:hover:text-nord-blue-100',
      'dark:focus:text-nord-blue-100',
    ],
    orange: [
      'text-nord-orange-300',
      'hover:text-nord-orange-100',
      'focus:text-nord-orange-100',
      'dark:text-nord-orange-300',
      'dark:hover:text-nord-orange-100',
      'dark:focus:text-nord-orange-100',
    ],
    mauve: [
      'text-nord-mauve-300',
      'hover:text-nord-mauve-100',
      'focus:text-nord-mauve-100',
      'dark:text-nord-mauve-300',
      'dark:hover:text-nord-mauve-100',
      'dark:focus:text-nord-mauve-100',
    ],
    yellow: [
      'text-nord-yellow-300',
      'hover:text-nord-yellow-100',
      'focus:text-nord-yellow-100',
      'dark:text-nord-yellow-300',
      'dark:hover:text-nord-yellow-100',
      'dark:focus:text-nord-yellow-100',
    ],
    default: [
      'text-nord-dark-300',
      'hover:text-nord-dark-100',
      'focus:text-nord-dark-100',
      'dark:text-nord-light-300',
      'dark:hover:text-nord-light-100',
      'dark:focus:text-nord-light-100',
    ],
  }

  classes.push(...colorClasses[props.color])

  return classes.join(' ')
})

/**
 * Link classes.
 * We have to do this because using computed properties directly in the :class attribute,
 * is not supported by Vue 3.
 *
 * @return {String}
 */
const getLinkClasses = () => {
  return !props.button ? classLink.value : ''
}

/**
 * Button classes.
 * We have to do this because using computed properties directly in the :class attribute,
 * is not supported by Vue 3.
 *
 * @return {String}
 */
const getButtonClasses = () => {
  return props.button ? classButton.value : ''
}
</script>

<template>
  <component
    :is="tag"
    :href="props.href"
    :class="[
      getButtonClasses(),
      getLinkClasses(),
      $sizeToClass(props.size),
      {
        'flex aspect-square max-w-max items-center justify-center p-2 px-4 transition-[background-color] duration-100 ease-in-out':
          props.button && props.icon && !props.text,
        'flex max-w-max cursor-pointer items-center rounded p-2 px-4 font-medium text-white transition-[background-color] disabled:opacity-50':
          props.button && (props.icon || props.text),
        'cursor-pointer transition-[color] max-w-max': !props.button,
      },
    ]"
  >
    <div
      class="flex items-center"
      :class="{ 'space-x-1': props.icon && props.text }"
    >
      <span
        v-if="props.icon"
        class="material-symbols-rounded flex cursor-pointer items-center justify-center leading-none"
        :class="$sizeToClass(props.size)"
        >{{ props.icon }}</span
      >
      <span v-if="props.text" class="items-center">{{ props.text }}</span>
    </div>
  </component>
</template>
