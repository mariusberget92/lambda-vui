<script setup>
import { defineEmits, defineProps } from 'vue'

/**
 * Component emits.
 *
 * @type {Object}
 */
const emit = defineEmits(['reset'])

/**
 * Component props.
 *
 * @type {Object}
 */
const props = defineProps({
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

  /**
   * The model value.
   *
   * @type {String|Array|Number|Boolean}
   * @default ''
   */
  modelValue: {
    type: [String, Array, Number, Boolean],
    Boolean,
    default: '',
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
      class="material-symbols-rounded absolute right-1 flex aspect-square cursor-pointer items-center justify-center rounded-full text-nord-dark-300 duration-300 hover:bg-nord-light-100 dark:text-nord-light-300 dark:hover:bg-nord-dark-300"
      :class="[
        $sizeToClass(props.size),
        {
          'w-4': props.size === 'xs',
          'w-5': props.size === 'sm',
          'w-6': props.size === 'base',
          'w-7': props.size === 'lg',
          'w-8': props.size === 'xl',
          'w-9': props.size === '2xl',
        },
      ]"
      @click.stop.prevent="emit('reset')"
    >
      clear
    </span>
  </div>
</template>
