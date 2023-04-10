<script setup>
import { defineProps, computed, defineEmits } from 'vue'

const emit = defineEmits(['select'])

/**
 * Component props.
 *
 * @type {Object}
 */
const props = defineProps({
  /**
   * Multiple select.
   *
   * @type {Boolean}
   * @default false
   */
  multiple: {
    type: Boolean,
    default: false,
  },

  /**
   * Model value of the input.
   *
   * @type {Array|String}
   * @default ''
   */
  modelValue: {
    type: [Array, String],
    default: '',
  },

  /**
   * The options of the input.
   *
   * @type {Array<String>|Array<Object>}
   * @required
   * @default []
   */
  selectOptions: {
    type: [Array],
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
 * CSS wrapper classes.
 *
 * @type {import('vue').ComputedRef<String>}
 */
const classesWrapper = computed(() => {
  let classes = [
    'absolute',
    'rounded',
    'border',
    'border-nord-snow-storm-100',
    'dark:border-nord-400',
    'mt-1',
    'w-full',
    'bg-nord-snow-storm-300',
    'dark:bg-nord-100',
    'z-10',
    'overflow-hidden',
  ]

  if (!props.show) {
    classes.push('hidden')
  }

  return classes.join(' ')
})

/**
 * CSS option classes.
 *
 * @type {import('vue').ComputedRef<String>}
 */
const optionClasses = computed(() => {
  let classes = [
    'flex',
    'flex-col',
    'cursor-pointer',
    'px-4',
    'py-2',
    'text-nord-300',
    'dark:text-nord-snow-storm-300',
    'first:rounded-t',
    'last:rounded-b',
    'bg-nord-snow-storm-300',
    'hover:bg-nord-snow-storm-100',
    'dark:bg-nord-100',
    'dark:hover:bg-nord-200',
  ]

  const sizeClasses = {
    xs: 'text-xs',
    sm: 'text-sm',
    base: 'text-base',
    lg: 'text-lg',
    xl: 'text-xl',
    '2xl': 'text-2xl',
  }

  classes.push(sizeClasses[props.size] || sizeClasses['base'])

  return classes.join(' ')
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
    if (typeof option === 'string') {
      return option
    }

    const fn = type === 'text' ? props.textReducer : props.valueReducer
    return fn(option)
  }
})

/**
 * Check if a option is selected.
 *
 * @type {import('vue').ComputedRef<Function>}
 * @param {String|Object} option
 * @returns {Boolean}
 */
const isSelected = computed(() => {
  return (option) => {
    const value = getOptionInfo.value(option, 'value')
    return props.multiple
      ? props.modelValue.includes(value)
      : props.modelValue === value
  }
})
</script>

<template>
  <div class="relative">
    <div :class="classesWrapper">
      <template
        v-for="option in selectOptions"
        :key="getOptionInfo(option, 'value')"
      >
        <div
          :class="[
            optionClasses,
            {
              '!bg-nord-frost-300 !dark:bg-nord-frost-300 !text-white':
                isSelected(option),
            },
          ]"
          @click="emit('select', option)"
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
        </div>
      </template>
    </div>
  </div>
</template>
