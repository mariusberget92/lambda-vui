<script setup>
import { computed, defineEmits, defineProps } from 'vue'
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
   *
   * @type {Boolean}
   * @default false
   * @required
   */
  modelValue: {
    type: Boolean,
    default: false,
    required: true,
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
})

/**
 * Whether the input has an error.
 *
 * @type {import('vue').ComputedRef<Boolean>}
 */
const hasLabel = computed(() => {
  return props.label !== false
})

/**
 * The classes of the checkbox.
 *
 * @type {import('vue').ComputedRef<String>}
 */
const classesCheckbox = computed(() => {
  let classes = []

  const sizeClasses = {
    xs: ['w-4 h-4'],
    sm: ['w-5 h-5'],
    base: ['w-6 h-6'],
    lg: ['w-7 h-7'],
    xl: ['w-8 h-8'],
    '2xl': ['w-9 h-9'],
  }

  classes.push(...sizeClasses[props.size])

  const colorClasses = {
    red: 'text-nord-aurora-200 checked:dark:shadow-lg checked:dark:shadow-nord-aurora-100/75 checked:!border-nord-aurora-100 checked:dark:!border-transparent',
    green:
      'text-nord-aurora-1100 checked:dark:shadow-lg checked:dark:shadow-nord-aurora-1000/75 checked:!border-nord-aurora-1000 checked:dark:!border-transparent',
    blue: 'text-nord-frost-300 checked:dark:shadow-lg checked:dark:shadow-nord-frost-400/75 checked:!border-nord-frost-400 checked:dark:!border-transparent',
    orange:
      'text-nord-aurora-500 checked:dark:shadow-lg checked:dark:shadow-nord-aurora-400/75 checked:!border-nord-aurora-400 checked:dark:!border-transparent',
    yellow:
      'text-nord-aurora-800 checked:dark:shadow-lg checked:dark:shadow-nord-aurora-700/75 checked:!border-nord-aurora-700 checked:dark:!border-transparent',
    mauve:
      'text-nord-aurora-1400 checked:dark:shadow-lg checked:dark:shadow-nord-aurora-1300/75 checked:!border-nord-aurora-1300 checked:dark:!border-transparent',
  }

  classes.push(colorClasses[props.color])

  return classes.join(' ')
})
</script>

<template>
  <div class="flex items-center space-x-2" :class="{ 'opacity-50': disabled }">
    <input
      type="checkbox"
      :id="id"
      class="rounded bg-nord-snow-storm-300 dark:bg-nord-100 border cursor-pointer border-nord-snow-storm-100 dark:border-nord-400"
      :class="classesCheckbox"
      :disabled="disabled"
      :checked="modelValue"
      :required="required"
      :aria-labelledby="hasLabel ? `${id}-label` : null"
      :aria-describedby="hasLabel ? `${id}-helper` : null"
      @change="$emit('update:modelValue', $event.target.checked)"
    />

    <div class="flex-col">
      <VLabel
        v-if="hasLabel"
        :id="id"
        :label="label"
        :required="required"
        :helper="helper"
        :size="size"
      />
    </div>
  </div>
</template>
