<script setup>
import { defineEmits, defineProps } from 'vue'
import VLabel from './Partials/V-Label.vue'

/**
 * Define the component emits.
 *
 * @type {Object}
 */
defineEmits(['update:modelValue'])

/**
 * Component props.
 *
 * @type {Object}
 */
const props = defineProps({
  /**
   * The ID of the checkbox.
   * If none is provided, a random one will be generated.
   *
   * @type {String}
   * @required
   * @default lambda-checkbox-<random>
   */
  id: {
    type: String,
    default: () => {
      return 'lambda-checkbox-' + Math.random().toString(36).substring(2, 9)
    },
  },

  /**
   * Model value of the input.
   * If you want to use a v-model, do not pass "checked" prop.
   *
   * @type {Boolean}
   * @default false
   * @required
   */
  modelValue: {
    type: Boolean,
    default: false,
  },

  /**
   * The label of the input.
   *
   * @type {String|Boolean}
   * @required
   * @default false
   */
  label: {
    type: [String, Boolean],
    default: false,
  },

  /**
   * The helper text of the input.
   * Will be displayed under the label.
   *
   * @type {String|Boolean}
   * @default false
   */
  helper: {
    type: [String, Boolean],
    default: false,
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
   * The size of the checkbox.
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
   * The color of the checkbox.
   *
   * @type {String}
   * @default blue
   * @options red, green, blue, orange, yellow, mauve
   */
  color: {
    type: String,
    default: 'blue',
    validator: (val) => {
      return ['red', 'green', 'blue', 'orange', 'yellow', 'mauve'].includes(val)
    },
  },

  /**
   * Whether the checkbox is disabled.
   *
   * @type {Boolean}
   * @default false
   */
  disabled: {
    type: Boolean,
    default: false,
  },

  /**
   * Whether the checkbox is rounded.
   *
   * @type {Boolean}
   * @default true
   */
  rounded: {
    type: Boolean,
    default: true,
  },

  /**
   * Whether the checkbox is checked.
   * If you do not bind a v-model, you can use this prop to set the initial state.
   *
   * @type {Boolean}
   * @default false
   */
  checked: {
    type: Boolean,
    default: false,
  },
})
</script>

<template>
  <div
    class="flex items-center"
    :class="{ 'opacity-50': props.disabled, 'space-x-2': props.label }"
  >
    <input
      :id="props.id"
      type="checkbox"
      class="flex cursor-pointer bg-nord-light-400 transition-all duration-100 ease-in-out dark:bg-nord-dark-100"
      :class="[
        {
          rounded: props.rounded,
          'text-nord-red-300': props.color === 'red',
          'text-nord-green-300': props.color === 'green',
          'text-nord-blue-300': props.color === 'blue',
          'text-nord-orange-300': props.color === 'orange',
          'text-nord-mauve-300': props.color === 'mauve',
          'text-nord-yellow-300': props.color === 'yellow',
          'h-4 w-4': props.size === 'xs',
          'h-5 w-5': props.size === 'sm',
          'h-6 w-6': props.size === 'base',
          'h-7 w-7': props.size === 'lg',
          'h-8 w-8': props.size === 'xl',
          'h-9 w-9': props.size === '2xl',
        },
      ]"
      :disabled="props.disabled"
      :checked="props.modelValue || props.checked"
      :required="props.required"
      :aria-labelledby="props.label ? `${props.id}-label` : null"
      :aria-describedby="props.helper ? `${props.id}-helper` : null"
      @change="$emit('update:modelValue', $event.target.checked)"
    />

    <VLabel
      v-if="props.label"
      :id="props.id"
      compact
      :label="props.label"
      :required="props.required"
      :helper="props.helper"
      :size="props.size"
    />
  </div>
</template>
