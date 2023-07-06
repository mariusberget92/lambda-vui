<script setup>
import { defineProps } from 'vue'

/**
 * Component props.
 *
 * @property {String} icon - The icon to display. Important: Google's Material Icons only!
 * @property {String} size - The size of the icon.
 * @property {String} side - The side of the input the icon should be displayed on.
 */
const props = defineProps({
  /**
   * The icon to display. Important: Google's Material Icons only!
   */
  icon: {
    type: String,
    required: true,
  },

  /**
   * The size of the icon.
   *
   * @values xs, sm, base, lg, xl, 2xl
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
   * @values left, right
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
