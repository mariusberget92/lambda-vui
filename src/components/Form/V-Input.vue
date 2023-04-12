<script setup>
import { computed, defineProps, defineEmits } from 'vue'
import VLabel from './Partials/V-Label.vue'
import VIcon from './Partials/V-Icon.vue'

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
   * The ID of the input.
   * If none is provided, a random one will be generated.
   *
   * @type {String}
   * @required
   * @default lambda-input-<random>
   */
  id: {
    type: String,
    default: () => {
      return 'lambda-input-' + Math.random().toString(36).substring(2, 9)
    },
  },

  /**
   * Model value of the input.
   *
   * @type {String}
   * @default ''
   */
  modelValue: {
    type: String,
    default: '',
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
   * The icon of the input.
   *
   * @type {String|Boolean}
   * @default false
   */
  icon: {
    type: [String, Boolean],
    default: false,
  },

  /**
   * The placeholder of the input.
   *
   * @type {String}
   * @default ''
   */
  placeholder: {
    type: String,
    default: '',
  },

  /**
   * Whether the input is read-only.
   *
   * @type {Boolean}
   * @default false
   */
  readOnly: {
    type: Boolean,
    default: false,
  },

  /**
   * Whether the input is disabled.
   *
   * @type {Boolean}
   * @default false
   */
  disabled: {
    type: Boolean,
    default: false,
  },

  /**
   * Input type.
   *
   * @type {String}
   * @default text
   * @options text, password, email, number
   */
  type: {
    type: String,
    default: 'text',
    validator: (val) => {
      return ['text', 'password', 'email', 'hidden'].includes(val)
    },
  },

  /**
   * Wheter the input has an error.
   *
   * @type {String|Boolean}
   * @default false
   */
  error: {
    type: [String, Boolean],
    default: false,
  },
})

/**
 * Whether the input is hidden.
 *
 * @type {import('vue').ComputedRef<boolean>}
 */
const isHidden = computed(() => props.type === 'hidden')

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
 * Whether the input has an icon.
 *
 * @type {import('vue').ComputedRef<boolean>}
 */
const hasIcon = computed(() => props.icon !== false)

/**
 * CSS error classes.
 *
 * @type {import ('vue').ComputedRef<Object>}
 */
const classesError = computed(() => {
  return {
    'border-l-4': hasError.value,
    '!border-l-nord-aurora-200': hasError.value,
    'dark:shadow-[-10px_0_10px]': hasError.value,
    'dark:shadow-nord-aurora-100/25': hasError.value,
  }
})

/**
 * CSS input classes.
 *
 * @type {import ('vue').ComputedRef<Object>}
 */
const classesInput = computed(() => {
  let classes = [
    'border',
    'border-nord-snow-storm-100',
    'focus:border-nord-snow-storm-100',
    'dark:border-nord-400',
    'dark:focus:border-nord-400',
    'rounded',
    'w-full',
    'bg-nord-snow-storm-300',
    'dark:bg-nord-100',
    'text-nord-300',
    'dark:text-nord-snow-storm-300',
    'placeholder:text-nord-300/50',
    'dark:placeholder:text-nord-snow-storm-300/50',
  ]

  if (hasIcon.value) {
    classes.push('rounded-l-none', 'border-l-0')
  }

  const sizeClasses = {
    xs: ['text-xs', 'px-2', 'py-1'],
    sm: ['text-sm', 'px-2', 'py-2'],
    base: ['text-base', 'px-3', 'py-2'],
    lg: ['text-lg', 'px-3', 'py-3'],
    xl: ['text-xl', 'px-4', 'py-3'],
    '2xl': ['text-2xl', 'px-4', 'py-4'],
  }

  classes.push(...(sizeClasses[props.size] || sizeClasses['base']))

  return classes.join(' ')
})
</script>

<template>
  <div
    class="flex flex-col"
    :class="{ hidden: isHidden, 'opacity-50': readOnly || disabled }"
  >
    <VLabel
      v-if="hasLabel"
      :id="id"
      :label="label"
      :required="required"
      :helper="helper"
      :size="size"
    />

    <div class="flex mt-1">
      <VIcon v-if="hasIcon" :icon="icon" :size="size" :class="classesError" />

      <input
        :type="type"
        :id="id"
        :class="classesInput"
        :placeholder="placeholder"
        :required="required"
        :readonly="readOnly"
        :disabled="disabled"
        :value="modelValue"
        :aria-labelledby="hasLabel ? `${id}-label` : null"
        :aria-describedby="hasLabel ? `${id}-helper` : null"
        @input="$emit('update:modelValue', $event.target.value)"
      />
    </div>
  </div>
</template>
