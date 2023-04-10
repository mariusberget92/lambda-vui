<script setup>
import { defineProps, computed, defineEmits } from 'vue'

/**
 * Component emits.
 *
 * @type {Object}
 */
const emit = defineEmits(['remove'])

/**
 * Component props.
 *
 * @type {Object}
 */
const props = defineProps({
  /**
   * The selected option.
   *
   * @type {String|Object}
   * @required
   */
  option: {
    type: [String, Object],
    required: true,
  },

  /**
   * Tag size
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
})

/**
 * CSS classes for the tag.
 *
 * @type {import('vue').ComputedRef<String>}
 */
const classesTag = computed(() => {
  let classes = [
    'rounded',
    'bg-nord-frost-300',
    'text-white',
    'leading-3',
    'py-1',
    'px-1.5',
    'dark:shadow-lg',
    'dark:shadow-nord-frost-400/50',
  ]

  const sizeClasses = {
    xs: 'text-xs px-1 py-0.5',
    sm: 'text-sm px-1 py-0.5',
    base: 'text-base px-1 py-0.5',
    lg: 'text-lg px-1 py-0.5',
    xl: 'text-xl px-1 py-0.5',
    '2xl': 'text-2xl px-1 py-0.5',
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
 * Handle tag click.
 *
 * @param {Event} event
 * @returns {void}
 */
function handleTagClick(event) {
  event.stopPropagation()
  emit('remove', props.option)
}
</script>

<template>
  <div @click="handleTagClick">
    <span :class="classesTag">{{ getOptionInfo(props.option, 'text') }}</span>
  </div>
</template>
