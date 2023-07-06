<script setup>
import { computed, defineProps } from 'vue'

/**
 * Component props.
 *
 * @property {String} id - The ID of the label (corresponds to the ID of the input field).
 * @property {String} label - The label of the input.
 * @property {String} size - The size of the label.
 * @property {Boolean} required - Whether the input is required. Will show a red asterisk next to the label.
 * @property {String|Boolean} helper - The helper text of the input.
 * @property {Boolean} compact - Whether the label and helper should be compact (for checkboxes).
 */
const props = defineProps({
  /**
   * The ID of the label (corresponds to the ID of the input field).
   */
  id: {
    type: String,
    required: true,
  },

  /**
   * The label of the input.
   */
  label: {
    type: String,
    required: true,
  },

  /**
   * The size of the label.
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
   * Whether the input is required.
   * Will show a red asterisk next to the label.
   */
  required: {
    type: Boolean,
    default: false,
  },

  /**
   * The helper text of the input.
   */
  helper: {
    type: [String, Boolean],
    default: false,
  },

  /**
   * Whether the label and helper should be compact (for checkboxes).
   */
  compact: {
    type: Boolean,
    default: false,
  },
})

/**
 * The ID of the label.
 *
 * @return {String}
 */
const idLabel = computed(() => {
  return `${props.id}-label`
})

/**
 * The ID of the helper.
 *
 * @return {String}
 */
const idHelper = computed(() => {
  return `${props.id}-helper`
})

/**
 * Text size class for the helper text.
 *
 * @return {String}
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
</script>

<template>
  <div class="flex flex-col">
    <label
      :id="idLabel"
      :for="props.id"
      class="font-semibold leading-none text-nord-dark-300 dark:text-nord-light-300"
      :class="[
        $sizeToClass(props.size),
        {
          'mb-0.5': !props.compact,
        },
      ]"
    >
      {{ props.label }}

      <span
        v-if="props.required"
        class="leading-none text-nord-red-300"
        :class="$sizeToClass(props.size)"
        >*</span
      >
    </label>

    <span
      v-if="props.helper"
      :id="idHelper"
      class="leading-none text-nord-dark-300/75 dark:text-nord-light-300/75"
      :class="[
        classHelperSize,
        {
          'mb-1': !props.compact,
        },
      ]"
      >{{ props.helper }}</span
    >
  </div>
</template>
