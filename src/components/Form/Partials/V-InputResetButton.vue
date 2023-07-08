<script setup>
import { defineEmits, defineProps } from 'vue'

/**
 * Component emits.
 *
 * @property {Undefined} reset - Emits when the reset button is clicked.
 */
const emit = defineEmits(['reset'])

/**
 * Component props.
 *
 * @property {String} size - Reset button size.
 * @property {String|Array|Number|Boolean} modelValue - The model value.
 * @property {Boolean} absolute - Absolute positioning.
 */
const props = defineProps({
  /**
   * Reset button size.
   *
   * @values xs, sm, base, lg, xl, 2xl
   */
  size: {
    type: String,
    default: 'sm',
    validator: (val) => {
      return ['xs', 'sm', 'base', 'lg', 'xl', '2xl'].includes(val)
    },
  },

  /**
   * The model value.
   */
  modelValue: {
    type: [String, Array, Number, Boolean],
    Boolean,
    default: '',
  },

  /**
   * Absolute positioning.
   */
  absolute: {
    type: Boolean,
    default: true,
  },
})
</script>

<template>
  <div class="relative flex items-center">
    <span
      v-if="
        props.modelValue.length > 0 ||
        props.modelValue === true ||
        props.modelValue > 0
      "
      class="material-symbols-rounded flex aspect-square cursor-pointer items-center justify-center rounded-full text-nord-dark-300 hover:bg-nord-light-100 dark:text-nord-light-300 dark:hover:bg-nord-dark-300"
      :class="[
        $sizeToClass(props.size),
        {
          'w-4': props.size === 'xs',
          'w-5': props.size === 'sm',
          'w-6': props.size === 'base',
          'w-7': props.size === 'lg',
          'w-8': props.size === 'xl',
          'w-9': props.size === '2xl',
          'absolute right-1': props.absolute,
        },
      ]"
      @click.stop.prevent="emit('reset')"
    >
      clear
    </span>
  </div>
</template>
