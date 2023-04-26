<script setup>
import { defineProps } from 'vue'

/**
 * Component props.
 *
 * @type {Object}
 */
// eslint-disable-next-line no-unused-vars
const props = defineProps({
  /**
   * The selected date (YYYY-MM-DD).
   *
   * @type {String|Boolean}
   * @default false
   */
  selectedDate: {
    type: [String, Boolean],
    default: false,
  },

  /**
   * The selected time (HH:MM).
   *
   * @type {String|Boolean}
   * @default false
   */
  selectedTime: {
    type: [String, Boolean],
    default: false,
  },

  /**
   * Whether the dropdown is visible.
   *
   * @type {Boolean}
   * @default false
   */
  show: {
    type: Boolean,
    default: false,
  },

  /**
   * Input size.
   *
   * @type {String}
   * @default base
   * @options xs, sm, base, lg, xl, 2xl
   */
  size: {
    type: String,
    default: 'sm',
    validator: (val) => {
      return ['xs', 'sm', 'base', 'lg', 'xl', '2xl'].includes(val)
    },
  },
})
</script>

<template>
  <div class="relative">
    <div
      :class="{ hidden: !show }"
      class="absolute z-10 mt-1 max-h-64 w-full overflow-y-auto overflow-x-hidden rounded border border-nord-snow-storm-100 bg-nord-snow-storm-300 dark:border-nord-400 dark:bg-nord-100"
    >
      <div id="lambda-datepicker-calendar">
        <div class="flex items-center justify-between px-2 py-1">
          <span class="material-symbols-rounded text-2xl">chevron_left</span>
          <span class="material-symbols-rounded text-2xl">chevron_right</span>
        </div>
      </div>
    </div>
  </div>
</template>
