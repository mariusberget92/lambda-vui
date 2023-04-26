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
   * @options ['blue', 'red', 'green', 'yellow', 'orange', 'mauve']
   */
  color: {
    type: String,
    default: 'blue',
    validator: (value) =>
      ['blue', 'red', 'green', 'yellow', 'orange', 'mauve'].includes(value),
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
      'text-nord-aurora-200',
      'hover:text-nord-aurora-100',
      'focus:text-nord-aurora-100',
      'dark:text-nord-aurora-200',
      'dark:hover:text-nord-aurora-100',
      'dark:focus:text-nord-aurora-100',
      'dark:text-shadow',
      'dark:shadow-nord-aurora-100/75',
    ],
    green: [
      'text-nord-aurora-1100',
      'hover:text-nord-aurora-1000',
      'focus:text-nord-aurora-1000',
      'dark:text-nord-aurora-1100',
      'dark:hover:text-nord-aurora-1000',
      'dark:focus:text-nord-aurora-1000',
      'dark:text-shadow',
      'dark:shadow-nord-aurora-1000/75',
    ],
    blue: [
      'text-nord-frost-300',
      'hover:text-nord-frost-400',
      'focus:text-nord-frost-400',
      'dark:text-nord-frost-300',
      'dark:hover:text-nord-frost-400',
      'dark:focus:text-nord-frost-400',
      'dark:text-shadow',
      'dark:shadow-nord-frost-400/75',
    ],
    orange: [
      'text-nord-aurora-500',
      'hover:text-nord-aurora-400',
      'focus:text-nord-aurora-400',
      'dark:text-nord-aurora-500',
      'dark:hover:text-nord-aurora-400',
      'dark:focus:text-nord-aurora-400',
      'dark:text-shadow',
      'dark:shadow-nord-aurora-400/75',
    ],
    yellow: [
      'text-nord-aurora-800',
      'hover:text-nord-aurora-700',
      'focus:text-nord-aurora-700',
      'dark:text-nord-aurora-800',
      'dark:hover:text-nord-aurora-700',
      'dark:focus:text-nord-aurora-700',
      'dark:text-shadow',
      'dark:shadow-nord-aurora-700/75',
    ],
    mauve: [
      'text-nord-aurora-1400',
      'hover:text-nord-aurora-1300',
      'focus:text-nord-aurora-1300',
      'dark:text-nord-aurora-1400',
      'dark:hover:text-nord-aurora-1300',
      'dark:focus:text-nord-aurora-1300',
      'dark:text-shadow',
      'dark:shadow-nord-aurora-1300/75',
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
  <div class="flex">
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
      <div
        class="flex items-center"
        :class="{ 'space-x-1': hasIcon && hasText }"
      >
        <span
          v-if="hasIcon"
          class="material-symbols-rounded flex cursor-pointer items-center justify-center transition-colors"
          :class="$sizeToClass(size)"
          >{{ icon }}</span
        >
        <span v-if="hasText" class="items-center">{{ text }}</span>
      </div>
    </component>
  </div>
</template>
