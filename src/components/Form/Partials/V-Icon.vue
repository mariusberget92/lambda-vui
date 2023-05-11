<script setup>
import { defineProps } from 'vue'

/**
 * Component props.
 *
 * @type {Object}
 */
const props = defineProps({
  /**
   * The icon to display (using Google's Material Icons)
   *
   * @type {String}
   * @required
   */
  icon: {
    type: String,
    required: true,
  },

  /**
   * The size of the icon.
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
   * The side of the input the icon should be displayed on.
   *
   * @type {String}
   * @default left
   * @options left, right
   */
  side: {
    type: String,
    default: 'left',
    validator: (val) => {
      return ['left', 'right'].includes(val)
    },
  },
})
</script>

<template>
  <span
    class="material-symbols-rounded flex items-center justify-center text-nord-dark-300 dark:text-nord-light-300"
    :class="[
      $sizeToClass(props.size),
      {
        'pl-3': props.side == 'left',
        'pr-3': props.side == 'right',
      },
    ]"
  >
    {{ props.icon }}
  </span>
</template>
