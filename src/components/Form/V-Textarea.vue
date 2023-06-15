<script setup>
import { defineProps, defineEmits } from 'vue'
import VLabel from './Partials/V-Label.vue'

/**
 * Component emits.
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
   * Whether the textarea is rounded.
   *
   * @type {Boolean}
   * @default true
   */
  rounded: {
    type: Boolean,
    default: true,
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
      return ['red', 'green', 'blue', 'orange', 'yellow', 'mauve'].includes(val)
    },
  },
})
</script>

<template>
  <div
    class="flex w-full flex-col"
    :class="{
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
      <textarea
        :id="props.id"
        class="w-full bg-transparent px-3 py-2"
        :class="[
          $sizeToClass(props.size),
          {
            'resize-none': props.resize === 'none',
            'resize-y': props.resize === 'vertical',
            'resize-x': props.resize === 'horizontal',
            resize: props.resize === 'both',
          },
        ]"
        :placeholder="props.placeholder"
        :required="props.required"
        :disabled="props.disabled"
        :value="props.modelValue"
        :aria-labelledby="props.label ? `${props.id}-label` : null"
        :aria-describedby="props.helper ? `${props.id}-helper` : null"
        @input="$emit('update:modelValue', $event.target.value)"
      ></textarea>
    </div>
  </div>
</template>

<style scoped>
.rounded textarea::-webkit-resizer { 
  background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><circle cx="16" cy="16" r="7" fill="rgb(196,202,212)"/></svg>');
  border-radius:5px;
}

textarea::-webkit-resizer { 
  background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><circle cx="16" cy="16" r="7" fill="rgb(196,202,212)"/></svg>');
}

.dark .rounded textarea::-webkit-resizer { 
  background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><circle cx="16" cy="16" r="7" fill="rgb(92,101,120)"/></svg>');
  border-radius:5px;
}
.dark textarea::-webkit-resizer { 
  background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><circle cx="16" cy="16" r="7" fill="rgb(92,101,120)"/></svg>');
}
</style>
