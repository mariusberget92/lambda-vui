<script setup>
import { computed, defineProps } from 'vue'

/**
 * Component props.
 *
 * @type {Object}
 */
const props = defineProps({
  /**
   * The size of the text.
   *
   * @type {String}
   * @default base
   * @options xs, sm, base, lg, xl, 2xl
   */
  size: {
    type: String,
    default: 'base',
    validator: (value) => {
      return ['xs', 'sm', 'base', 'lg', 'xl', '2xl'].includes(value)
    },
  },

  /**
   * The color of the text.
   *
   * @type {String}
   * @default default
   * @options red, green, blue, orange, mauve, default
   */
  color: {
    type: String,
    default: 'default',
    validator: (value) => {
      return ['red', 'green', 'blue', 'orange', 'mauve', 'default'].includes(
        value
      )
    },
  },
})

/**
 * CSS color classes.
 *
 * @type {import ('vue').ComputedRef<String>}
 */
const classColor = computed(() => {
  let classes = []

  const colorClasses = {
    red: [
      'text-nord-red-300',
      'dark:text-nord-red-300',
      'dark:text-shadow',
      'dark:shadow-nord-red-100/25',
    ],
    green: [
      'text-nord-green-300',
      'dark:text-nord-green-300',
      'dark:text-shadow',
      'dark:shadow-nord-green-100/25',
    ],
    blue: [
      'text-nord-blue-300',
      'dark:text-nord-blue-300',
      'dark:text-shadow',
      'dark:shadow-nord-blue-100/25',
    ],
    orange: [
      'text-nord-orange-300',
      'dark:text-nord-orange-300',
      'dark:text-shadow',
      'dark:shadow-nord-orange-100/25',
    ],
    mauve: [
      'text-nord-mauve-300',
      'dark:text-nord-mauve-300',
      'dark:text-shadow',
      'dark:shadow-nord-mauve-100/25',
    ],
    default: ['text-nord-dark-300', 'dark:text-nord-light-300'],
  }

  classes.push(...colorClasses[props.color])

  return classes.join(' ')
})
</script>

<template>
  <p :class="[$sizeToClass(props.size), classColor]" class="leading-3">
    <slot />
  </p>
</template>
