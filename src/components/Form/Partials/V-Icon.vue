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
    class="material-symbols-rounded justify-centerbg-transparent flex items-center text-nord-300 dark:text-nord-snow-storm-300"
    :class="[
      $sizeToClass(props.size),
      {
        'pl-2': props.side == 'left',
        'pr-2': props.side == 'right',
      },
    ]"
  >
    {{ icon }}
  </span>
</template>
