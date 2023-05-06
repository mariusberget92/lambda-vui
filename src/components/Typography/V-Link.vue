<script setup>
import { defineProps, computed } from 'vue'
import { Link } from '@inertiajs/vue3'

/**
 * Component props.
 *
 * @type {Object}
 */
const props = defineProps({
  /**
   * Url for the href attribute
   *
   * @type {String}
   * @default '#'
   */
  href: {
    type: String,
    default: '#',
  },

  /**
   * Link text
   *
   * @type {String|Boolean}
   * @default false
   */
  text: {
    type: [String, Boolean],
    default: false,
  },

  /**
   * Link icon
   *
   * @type {String|Boolean}
   * @default false
   */
  icon: {
    type: [String, Boolean],
    default: false,
  },

  /**
   * Link size
   *
   * @type {String}
   * @default 'sm'
   * @options ['xs', 'sm', 'base', 'lg', 'xl', '2xl']
   */
  size: {
    type: String,
    default: 'sm',
    validator: (value) =>
      ['xs', 'sm', 'base', 'lg', 'xl', '2xl'].includes(value),
  },

  /**
   * External link
   *
   * @type {Boolean}
   * @default false
   */
  external: {
    type: Boolean,
    default: false,
  },

  /**
   * Show link as button (adds background color)
   *
   * @type {Boolean}
   * @default false
   */
  button: {
    type: Boolean,
    default: false,
  },

  /**
   * Button color
   *
   * @type {String}
   * @default 'blue'
   * @options ['blue', 'red', 'green', 'orange', 'mauve', 'default']
   */
  color: {
    type: String,
    default: 'blue',
    validator: (value) =>
      ['blue', 'red', 'green', 'orange', 'mauve', 'default'].includes(value),
  },

  /**
   * Whether the button is rounded.
   *
   * @type {String}
   * @default 'base'
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
 * @type {import('vue').ComputedRef<import('interiajs/vue3').Link|'a'>}
 */
const tag = computed(() => {
  if (props.external) return 'a'
  else return Link
})

/**
 * Whether the link has an icon.
 *
 * @type {import('vue').ComputedRef<boolean>}
 */
const hasIcon = computed(() => {
  return props.icon !== false
})

/**
 * Whether the link has text.
 *
 * @type {import('vue').ComputedRef<boolean>}
 */
const hasText = computed(() => {
  return props.text !== false
})

/**
 * CSS button classes.
 *
 * @type {import ('vue').ComputedRef<String>}
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

  const sizeClass = sizeClasses[props.size]
  if (hasText.value && hasIcon.value) {
    classes.push(...sizeClass.both)
  } else if (hasText.value) {
    classes.push(...sizeClass.text)
  } else {
    classes.push(...sizeClass.icon)
  }

  const colorClasses = {
    red: [
      'bg-nord-red-300',
      'border-nord-red-100',
      'dark:shadow-xl dark:shadow-nord-red-100/50',
      'hover:bg-nord-red-100',
    ],
    green: [
      'bg-nord-green-300',
      'border-nord-green-100',
      'dark:shadow-xl dark:shadow-nord-green-100/50',
      'hover:bg-nord-green-100',
    ],
    blue: [
      'bg-nord-blue-300',
      'border-nord-blue-100',
      'dark:shadow-xl dark:shadow-nord-blue-100/50',
      'hover:bg-nord-blue-100',
    ],
    orange: [
      'bg-nord-orange-300',
      'border-nord-orange-100',
      'dark:shadow-xl dark:shadow-nord-orange-100/50',
      'hover:bg-nord-orange-100',
    ],
    mauve: [
      'bg-nord-mauve-300',
      'border-nord-mauve-100',
      'dark:shadow-xl dark:shadow-nord-mauve-100/50',
      'hover:bg-nord-mauve-100',
    ],
  }

  classes.push(...colorClasses[props.color])
  classes.push(roundedClasses[props.rounded])

  return classes.join(' ')
})

/**
 * CSS link classes.
 *
 * @type {import ('vue').ComputedRef<String>}
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
      'dark:text-shadow',
      'dark:shadow-nord-red-100/50',
    ],
    green: [
      'text-nord-green-300',
      'hover:text-nord-green-100',
      'focus:text-nord-green-100',
      'dark:text-nord-green-300',
      'dark:hover:text-nord-green-100',
      'dark:focus:text-nord-green-100',
      'dark:text-shadow',
      'dark:shadow-nord-green-100/50',
    ],
    blue: [
      'text-nord-blue-300',
      'hover:text-nord-blue-100',
      'focus:text-nord-blue-100',
      'dark:text-nord-blue-300',
      'dark:hover:text-nord-blue-100',
      'dark:focus:text-nord-blue-100',
      'dark:text-shadow',
      'dark:shadow-nord-blue-100/50',
    ],
    orange: [
      'text-nord-orange-300',
      'hover:text-nord-orange-100',
      'focus:text-nord-orange-100',
      'dark:text-nord-orange-300',
      'dark:hover:text-nord-orange-100',
      'dark:focus:text-nord-orange-100',
      'dark:text-shadow',
      'dark:shadow-nord-orange-100/50',
    ],
    mauve: [
      'text-nord-mauve-300',
      'hover:text-nord-mauve-100',
      'focus:text-nord-mauve-100',
      'dark:text-nord-mauve-300',
      'dark:hover:text-nord-mauve-100',
      'dark:focus:text-nord-mauve-100',
      'dark:text-shadow',
      'dark:shadow-nord-mauve-100/50',
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
 * @type {import ('vue').ComputedRef<string>}
 */
const getLinkClasses = () => {
  return !props.button ? classLink.value : ''
}

/**
 * Button classes.
 * We have to do this because using computed properties directly in the :class attribute,
 * is not supported by Vue 3.
 *
 * @type {import ('vue').ComputedRef<string>}
 */
const getButtonClasses = () => {
  return props.button ? classButton.value : ''
}
</script>

<template>
  <component
    :is="tag"
    :href="href"
    :class="[
      getButtonClasses(),
      getLinkClasses(),
      $sizeToClass(size),
      {
        'aspect-square h-full justify-center': button && hasIcon && !hasText,
        'flex cursor-pointer items-center rounded font-medium text-white transition-colors disabled:opacity-50':
          button,
        'cursor-pointer transition-colors': !button,
      },
    ]"
  >
    <div class="flex items-center" :class="{ 'space-x-1': hasIcon && hasText }">
      <span
        v-if="hasIcon"
        class="material-symbols-rounded flex cursor-pointer items-center justify-center transition-colors"
        :class="$sizeToClass(size)"
        >{{ icon }}</span
      >
      <span v-if="hasText" class="items-center">{{ text }}</span>
    </div>
  </component>
</template>
