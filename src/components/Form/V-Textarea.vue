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
 * CSS error classes.
 *
 * @type {import ('vue').ComputedRef<Object>}
 */
const classError = computed(() => {
  return [
    'border-l-4',
    '!border-l-nord-aurora-200',
    'dark:shadow-[-10px_0_10px]',
    'dark:shadow-nord-aurora-100/25',
  ].join(' ')
})

/**
 * CSS textarea classes.
 *
 * @type {import ('vue').ComputedRef<Object>}
 */
const classTextarea = computed(() => {
  let classes = []

  const resizeClasses = {
    none: ['resize-none'],
    vertical: ['resize-y'],
    horizontal: ['resize-x'],
    both: ['resize'],
  }

  const sizeClasses = {
    xs: ['text-xs'],
    sm: ['text-sm'],
    base: ['text-base'],
    lg: ['text-lg'],
    xl: ['text-xl'],
    '2xl': ['text-2xl'],
  }

  const paddingClasses = {
    xs: ['px-2', 'py-2'],
    sm: ['px-2', 'py-2'],
    base: ['px-3', 'py-2'],
    lg: ['px-3', 'py-3'],
    xl: ['px-4', 'py-3'],
    '2xl': ['px-4', 'py-4'],
  }

  classes.push(...resizeClasses[props.resize])
  classes.push(...sizeClasses[props.size])
  classes.push(...paddingClasses[props.size])

  return classes.join(' ')
})

/**
 * Input error classes.
 * We have to do this because using computed properties directly in the :class attribute,
 * is not supported by Vue 3.
 *
 * @type {import ('vue').ComputedRef<string>}
 */
const getInputErrorClasses = () => {
  return hasError.value ? classError.value : ''
}
</script>

<template>
  <div
    class="flex flex-col w-full"
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

    <div class="mt-1 flex">
      <textarea
        :id="id"
        class="border border-nord-snow-storm-100 focus:border-nord-snow-storm-100 dark:border-nord-400 dark:focus:border-nord-400 rounded bg-nord-snow-storm-300 dark:bg-nord-100 text-nord-300 dark:text-nord-snow-storm-300 placeholder:text-nord-300/50 dark:placeholder:text-nord-snow-storm-300/50 w-full"
        :class="[classTextarea, getInputErrorClasses()]"
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
