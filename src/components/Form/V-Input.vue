<script setup>
import { defineProps, defineEmits } from 'vue'
import VLabel from './Partials/V-Label.vue'
import VIcon from './Partials/V-Icon.vue'

/**
 * Component emits.
 *
 * @property {String} update:modelValue - Emits when the model value is updated.
 * @property {String} change - Emits when the input is changed.
 */
defineEmits(['update:modelValue', 'change'])

/**
 * Component props.
 *
 * @property {String} id - The ID of the input.
 * @property {String} modelValue - Model value of the input.
 * @property {String|Boolean} label - The label of the input.
 * @property {String|Boolean} helper - The helper text of the input.
 * @property {String} size - Input size.
 * @property {String} color - The color of the input.
 * @property {Boolean} required - Whether the input is required.
 * @property {String|Boolean} icon - The icon of the input.
 * @property {String} placeholder - The placeholder of the input.
 * @property {Boolean} disabled - Whether the input is disabled.
 * @property {String} type - Input type.
 * @property {String|Boolean} error - Wheter the input has an error.
 * @property {Boolean} rounded - Whether the input is rounded.
 * 
 */
const props = defineProps({
  /**
   * The ID of the input.
   */
  id: {
    type: String,
    default: () => {
      return 'lambda-input-' + Math.random().toString(36).substring(2, 9)
    },
  },

  /**
   * Model value of the input.
   */
  modelValue: {
    type: String,
    default: '',
    required: true,
  },

  /**
   * Input size.
   *
   * @values xs, sm, base, lg, xl, 2xl
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
   */
  label: {
    type: [String, Boolean],
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
   * Whether the input is required.
   */
  required: {
    type: Boolean,
    default: false,
  },

  /**
   * The icon of the input.
   */
  icon: {
    type: [String, Boolean],
    default: false,
  },

  /**
   * The placeholder of the input.
   */
  placeholder: {
    type: String,
    default: '',
  },

  /**
   * Whether the input is disabled.
   */
  disabled: {
    type: Boolean,
    default: false,
  },

  /**
   * Input type.
   *
   * @values text, password, email, hidden
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
   */
  error: {
    type: [String, Boolean],
    default: false,
  },

  /**
   * Whether the input is rounded.
   */
  rounded: {
    type: Boolean,
    default: true,
  },

  /**
   * The color of the input.
   *
   * @values red, green, blue, orange, yellow, mauve
   */
  color: {
    type: String,
    default: 'blue',
    validator: (val) => {
      return ['red', 'green', 'blue', 'orange', 'yellow', 'mauve'].includes(val)
    },
  },
})
</script>

<template>
  <div
    class="flex w-full flex-col"
    :class="{
      hidden: props.type === 'hidden',
      'opacity-50': props.disabled,
    }"
  >
    <VLabel
      v-if="props.label"
      :id="props.id"
      :label="props.label"
      :required="props.required"
      :helper="props.helper"
      :size="props.size"
    />

    <div
      class="flex border-l-0 bg-nord-light-400 transition-all duration-100 ease-in-out focus-within:border-l-4 dark:bg-nord-dark-100"
      :class="[
        {
          rounded: props.rounded,
          '!border-l-4 border-l-nord-red-300': props.error,
          'focus-within:border-nord-red-300': props.color === 'red',
          'focus-within:border-nord-blue-300': props.color === 'blue',
          'focus-within:border-nord-green-300': props.color === 'green',
          'focus-within:border-nord-mauve-300': props.color === 'mauve',
          'focus-within:border-nord-orange-300': props.color === 'orange',
          'focus-within:border-nord-yellow-300': props.color === 'yellow',
        },
      ]"
    >
      <VIcon v-if="props.icon" :icon="props.icon" :size="props.size" />

      <input
        :id="props.id"
        :type="props.type"
        class="w-full bg-transparent"
        :class="[
          $sizeToClass(props.size),
          {
            'px-2 py-2': props.icon,
            'px-3 py-2': !props.icon,
          },
        ]"
        :placeholder="props.placeholder"
        :required="props.required"
        :disabled="props.disabled"
        :value="props.modelValue"
        :aria-labelledby="props.label ? `${props.id}-label` : null"
        :aria-describedby="props.helper ? `${props.id}-helper` : null"
        @input="$emit('update:modelValue', $event.target.value), $emit('change', $event.target.value)"
      />
    </div>
  </div>
</template>
