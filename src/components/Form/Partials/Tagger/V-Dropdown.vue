<script setup>
import { defineProps, computed, defineEmits } from 'vue'

/**
 * Component emits.
 *
 * @type {Object}
 */
const emit = defineEmits(['add'])

/**
 * Component props.
 *
 * @type {Object}
 */
const props = defineProps({
  /**
   * Model value of the input.
   *
   * @type {Array}
   * @default []
   */
  modelValue: {
    type: Array,
    default: () => [],
  },

  /**
   * The options of the input.
   *
   * @type {Array<String>|Array<Object>}
   * @required
   * @default []
   */
  options: {
    type: Array,
    default: () => [],
    required: true,
  },

  /**
   * Reduce to get the value of an option.
   *
   * @type {Function}
   */
  valueReducer: {
    type: Function,
    default: (option) => option.value,
  },

  /**
   * Reduce to get the text of an option.
   *
   * @type {Function}
   */
  textReducer: {
    type: Function,
    default: (option) => option.text,
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

/**
 * CSS size class.
 *
 * @type {import('vue').ComputedRef<String>}
 */
const classSize = computed(() => {
  return {
    xs: ['text-xs'],
    sm: ['text-sm'],
    base: ['text-base'],
    lg: ['text-lg'],
    xl: ['text-xl'],
    '2xl': ['text-2xl'],
  }[props.size].join(' ')
})

/**
 * Get the option text or value from an option.
 *
 * @type {import('vue').ComputedRef<Function>}
 * @param {String|Object} option
 * @param {String} type
 * @returns {String}
 */
const getOptionInfo = computed(() => {
  return (option, type) => {
    if (typeof option === 'string' || typeof option === 'number') {
      return option
    }

    const fn = type === 'text' ? props.textReducer : props.valueReducer
    return fn(option)
  }
})
</script>

<template>
  <div class="relative">
    <div
      :class="{ hidden: !show }"
      class="absolute rounded border border-nord-snow-storm-100 dark:border-nord-400 mt-1 w-full bg-nord-snow-storm-300 dark:bg-nord-100 z-10 overflow-y-auto overflow-x-hidden max-h-64"
    >
      <template v-for="(option, index) in options" :key="index">
        <button
          type="button"
          class="flex flex-col cursor-pointer p-2 w-full text-nord-300 dark:text-nord-snow-storm-300 first:rounded-t last:rounded-b bg-nord-snow-storm-300 hover:bg-nord-snow-storm-100 dark:bg-nord-100 dark:hover:bg-nord-200"
          :class="[classSize]"
          @mousedown.prevent="emit('add', option)"
        >
          <span
            class="flex"
            :class="{ 'space-x-2': option.emoji && option.emoji.length > 0 }"
          >
            <span v-if="option.emoji && option.emoji.length > 0">
              {{ option.emoji }}
            </span>

            <span>{{ getOptionInfo(option, 'text') }}</span>
          </span>
        </button>
      </template>
    </div>
  </div>
</template>
