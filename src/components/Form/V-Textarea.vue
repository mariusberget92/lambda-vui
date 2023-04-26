<script setup>
import { computed, defineProps, defineEmits } from 'vue'
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
   * Whether the textarea is read-only.
   *
   * @type {Boolean}
   * @default false
   */
  readOnly: {
    type: Boolean,
    default: false,
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
})

/**
 * Whether the input has a label.
 *
 * @type {import('vue').ComputedRef<boolean>}
 */
const hasLabel = computed(() => props.label !== false)

/**
 * Whether the input has an error.
 *
 * @type {import('vue').ComputedRef<boolean>}
 */
const hasError = computed(() => props.error !== false)

/**
 * CSS textarea classes.
 *
 * @type {import ('vue').ComputedRef<Object>}
 */
const classPadding = computed(() => {
  return {
    xs: ['p-2'],
    sm: ['p-2'],
    base: ['px-3', 'py-2'],
    lg: ['p-3'],
    xl: ['px-4', 'py-3'],
    '2xl': ['p-4'],
  }[props.size].join(' ')
})
</script>

<template>
  <div
    class="flex w-full flex-col"
    :class="{ 'opacity-50': readOnly || disabled }"
  >
    <VLabel
      v-if="hasLabel"
      :id="id"
      :label="label"
      :required="required"
      :helper="helper"
      :size="size"
    />

    <div
      class="mt-1 flex border border-nord-snow-storm-100 bg-white focus:border-nord-frost-300 dark:border-nord-400 dark:bg-nord-100"
      :class="{
        'border-l-4 !border-l-nord-aurora-200': hasError,
        'rounded-none': shape === 'square',
        rounded: shape === 'rounded',
      }"
    >
      <textarea
        :id="id"
        class="w-full bg-transparent text-nord-300 dark:text-nord-snow-storm-300"
        :class="[
          classPadding,
          $sizeToClass(size),
          $placeholderColors,
          {
            'resize-none': resize === 'none',
            'resize-y': resize === 'vertical',
            'resize-x': resize === 'horizontal',
            resize: resize === 'both',
          },
        ]"
        :placeholder="placeholder"
        :required="required"
        :readonly="readOnly"
        :disabled="disabled"
        :value="modelValue"
        :aria-labelledby="hasLabel ? `${id}-label` : null"
        :aria-describedby="hasLabel ? `${id}-helper` : null"
        @input="$emit('update:modelValue', $event.target.value)"
      ></textarea>
    </div>
  </div>
</template>
