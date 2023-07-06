<script setup>
import { defineProps, computed } from 'vue'

/**
 * Component props.
 *
 * @property {String} size - The size of the heading.
 * @property {String} color - The color of the heading.
 * @property {String} heading - The heading of the heading.
 */
const props = defineProps({
  /**
   * The size of the heading.
   * 
   * @values xs, sm, base, lg, xl, 2xl, 3xl, 4xl, 5xl, 6xl, 7xl, 8xl, 9xl
   */
  size: {
    type: String,
    default: 'base',
    validator: (value) => {
      return [
        'xs',
        'sm',
        'base',
        'lg',
        'xl',
        '2xl',
        '3xl',
        '4xl',
        '5xl',
        '6xl',
        '7xl',
        '8xl',
        '9xl',
      ].includes(value)
    },
  },

  /**
   * The color of the heading.
   * 
   * @values red, green, blue, orange, mauve, yellow, default
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

  /**
   * The heading tag.
   *
   * @values h1, h2, h3, h4, h5, h6
   */
  heading: {
    type: String,
    default: 'h1',
    validator: (value) => {
      return ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'].includes(value)
    },
  },
})

/**
 * CSS color classes.
 *
 * @returns {String}
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
  <component
    :is="props.heading"
    class="font-bold leading-none"
    :class="[$sizeToClass(props.size), classColor]"
  >
    <slot />
  </component>
</template>
