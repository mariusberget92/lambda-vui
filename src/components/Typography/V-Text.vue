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
   * @options red, green, blue, orange, mauve, yellow, default
   */
  color: {
    type: String,
    default: 'default',
    validator: (value) => {
      return [
        'red',
        'green',
        'blue',
        'orange',
        'mauve',
        'yellow',
        'default',
      ].includes(value)
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
    red: ['text-nord-red-300', 'dark:text-nord-red-300'],
    green: ['text-nord-green-300', 'dark:text-nord-green-300'],
    blue: ['text-nord-blue-300', 'dark:text-nord-blue-300'],
    orange: ['text-nord-orange-300', 'dark:text-nord-orange-300'],
    mauve: ['text-nord-mauve-300', 'dark:text-nord-mauve-300'],
    yellow: ['text-nord-yellow-300', 'dark:text-nord-yellow-300'],
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
