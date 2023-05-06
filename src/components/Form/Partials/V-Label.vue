<script setup>
import { computed, defineProps } from 'vue'

/**
 * Component props.
 *
 * @type {Object}
 */
const props = defineProps({
  /**
   * The ID of the label.
   *
   * @type {String}
   * @required
   */
  id: {
    type: String,
    required: true,
  },

  /**
   * The label of the input.
   *
   * @type {String}
   * @required
   */
  label: {
    type: String,
    required: true,
  },

  /**
   * The size of the label.
   *
   * @type {String}
   * @default base
   * @opions xs, sm, base, lg, xl, 2xl
   */
  size: {
    type: String,
    default: 'base',
    validator: (val) => {
      return ['xs', 'sm', 'base', 'lg', 'xl', '2xl'].includes(val)
    },
  },

  /**
   * Whether the input is required.
   *
   * @type {Boolean}
   * @default false
   */
  required: {
    type: Boolean,
    default: false,
  },

  /**
   * The helper text of the input.
   *
   * @type {String|Boolean}
   * @default false
   */
  helper: {
    type: [String, Boolean],
    default: false,
  },

  /**
   * Whether the label and helper should be compact (for checkboxes)
   *
   * @type {Boolean}
   * @default false
   */
  compact: {
    type: Boolean,
    default: false,
  },
})

/**
 * Helper size class.
 *
 * @type {import('vue').ComputedRef<string>}
 */
const classHelperSize = computed(() => {
  return {
    xs: ['text-xs'],
    sm: ['text-xs'],
    base: ['text-sm'],
    lg: ['text-base'],
    xl: ['text-base'],
    '2xl': ['text-lg'],
  }[props.size].join(' ')
})

/**
 * The ID of the label.
 *
 * @type {import('vue').ComputedRef<string>}
 */
const idLabel = computed(() => {
  return `${props.id}-label`
})

/**
 * The ID of the helper.
 *
 * @type {import('vue').ComputedRef<string>}
 */
const idHelper = computed(() => {
  return `${props.id}-helper`
})
</script>

<template>
  <label
    :id="idLabel"
    :for="id"
    class="font-semibold leading-none text-nord-dark-300 dark:text-nord-light-300"
    :class="[
      $sizeToClass(props.size),
      {
        'mb-0.5': !props.compact,
      },
    ]"
  >
    {{ label }}

    <span
      v-if="required"
      class="leading-none text-nord-red-300"
      :class="$sizeToClass(props.size)"
      >*</span
    >
  </label>

  <span
    v-if="props.helper !== false"
    :id="idHelper"
    class="leading-none text-nord-dark-300/75 dark:text-nord-light-300/75"
    :class="[
      classHelperSize,
      {
        'mb-1': !props.compact,
      },
    ]"
    >{{ helper }}</span
  >
</template>
