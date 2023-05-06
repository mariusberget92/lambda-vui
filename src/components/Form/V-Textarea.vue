<script setup>
import { defineProps, defineEmits, computed } from 'vue'
import VLabel from './Partials/V-Label.vue'

/**
 * Define the component emits.
 */
defineEmits(['update:modelValue'])

/**
 * Component props.
 *
 * @type {Object}
 */
const props = defineProps({
  /**
   * The ID of the textarea.
   * If none is provided, a random one will be generated.
   *
   * @type {String}
   * @required
   * @default lambda-textarea-<random>
   */
  id: {
    type: String,
    default: () => {
      return 'lambda-textarea-' + Math.random().toString(36).substring(2, 9)
    },
  },

  /**
   * Model value of the textarea.
   *
   * @type {String}
   * @default ''
   * @required
   */
  modelValue: {
    type: String,
    default: '',
    required: true,
  },

  /**
   * Textarea size.
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
   * The label of the textarea.
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
   * The helper text of the textarea.
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
   * Whether the textarea is required.
   *
   * @type {Boolean}
   * @default false
   */
  required: {
    type: Boolean,
    default: false,
  },

  /**
   * The placeholder of the textarea.
   *
   * @type {String}
   * @default ''
   */
  placeholder: {
    type: String,
    default: '',
  },

  /**
   * Whether the textarea is disabled.
   *
   * @type {Boolean}
   * @default false
   */
  disabled: {
    type: Boolean,
    default: false,
  },

  /**
   * Wheter the textarea has an error.
   *
   * @type {String|Boolean}
   * @default false
   */
  error: {
    type: [String, Boolean],
    default: false,
  },

  /**
   * Wheter the textarea can be resized.
   *
   * @type {String}
   * @default vertical
   * @options none, vertical, horizontal, both
   */
  resize: {
    type: String,
    default: 'vertical',
    validator: (val) => {
      return ['none', 'vertical', 'horizontal', 'both'].includes(val)
    },
  },

  /**
   * The shape of the textarea.
   *
   * @type {String}
   * @default rounded
   * @options square, rounded
   */
  shape: {
    type: String,
    default: 'rounded',
    validator: (val) => {
      return ['square', 'rounded'].includes(val)
    },
  },

  /**
   * The color of the datepicker buttons.
   *
   * @type {String}
   * @default blue
   * @options red, green, blue, orange, yellow, mauve
   */
  color: {
    type: String,
    default: 'blue',
    validator: (val) => {
      return ['red', 'green', 'blue', 'orange', 'mauve'].includes(val)
    },
  },
})

/**
 * CSS Border color classes.
 *
 * @type {import ('vue').ComputedRef<string>}
 * @returns {string}
 */
const classBorderColor = computed(() => {
  return {
    red: [
      'focus-within:border-nord-red-300',
      'focus-within:dark:border-nord-red-300',
      'focus-within:dark:shadow-nord-red-100/25',
    ],
    blue: [
      'focus-within:border-nord-blue-300',
      'focus-within:dark:border-nord-blue-300',
      'focus-within:dark:shadow-nord-blue-100/25',
    ],
    green: [
      'focus-within:border-nord-green-300',
      'focus-within:dark:border-nord-green-300',
      'focus-within:dark:shadow-nord-green-100/25',
    ],
    mauve: [
      'focus-within:border-nord-mauve-300',
      'focus-within:dark:border-nord-mauve-300',
      'focus-within:dark:shadow-nord-mauve-100/25',
    ],
    orange: [
      'focus-within:border-nord-orange-300',
      'focus-within:dark:border-nord-orange-300',
      'focus-within:dark:shadow-nord-orange-100/25',
    ],
  }[props.color].join(' ')
})
</script>

<template>
  <div class="flex w-full flex-col" :class="{ 'opacity-50': disabled }">
    <VLabel
      v-if="props.label !== false"
      :id="id"
      :label="label"
      :required="required"
      :helper="helper"
      :size="size"
    />

    <div
      class="flex border border-nord-light-100 bg-transparent transition-all duration-300 ease-in-out dark:border-nord-light-100/25 focus-within:dark:shadow-lg"
      :class="[
        classBorderColor,
        {
          '!border-nord-red-300 dark:shadow-lg dark:!shadow-nord-red-100/25':
            props.error !== false,
          'rounded-none': shape === 'square',
          rounded: shape === 'rounded',
        },
      ]"
    >
      <textarea
        :id="id"
        class="w-full bg-transparent p-2"
        :class="[
          $sizeToClass(size),
          {
            'resize-none': resize === 'none',
            'resize-y': resize === 'vertical',
            'resize-x': resize === 'horizontal',
            resize: resize === 'both',
          },
        ]"
        :placeholder="placeholder"
        :required="required"
        :disabled="disabled"
        :value="modelValue"
        :aria-labelledby="props.label !== false ? `${id}-label` : null"
        :aria-describedby="props.helper !== false ? `${id}-helper` : null"
        @input="$emit('update:modelValue', $event.target.value)"
      ></textarea>
    </div>
  </div>
</template>
