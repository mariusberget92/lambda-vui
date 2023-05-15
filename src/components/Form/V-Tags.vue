<script setup>
import { defineProps, defineEmits} from 'vue'
import VLabel from './Partials/V-Label.vue'
import VButton from './V-Button.vue'

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
   * The ID of the tags input.
   * If none is provided, a random one will be generated.
   *
   * @type {String}
   * @required
   * @default lambda-input-<random>
   */
  id: {
    type: String,
    default: () => {
      return 'lambda-tgs-' + Math.random().toString(36).substring(2, 9)
    },
  },

  /**
   * Model value of the tags input.
   *
   * @type {Array}
   * @default []
   * @required
   */
  modelValue: {
    type: Array,
    default: () => [],
    required: true,
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
   * The label of the tags input.
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
   * The helper text of the tags input.
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
   * Whether the tags input is required.
   *
   * @type {Boolean}
   * @default false
   */
  required: {
    type: Boolean,
    default: false,
  },

  /**
   * The placeholder of the tags input.
   *
   * @type {String}
   * @default ''
   */
  placeholder: {
    type: String,
    default: '',
  },

  /**
   * Whether the tags input is disabled.
   *
   * @type {Boolean}
   * @default false
   */
  disabled: {
    type: Boolean,
    default: false,
  },

  /**
   * Wheter the tags input has an error.
   *
   * @type {String|Boolean}
   * @default false
   */
  error: {
    type: [String, Boolean],
    default: false,
  },

  /**
   * Whether the tags input is rounded.
   *
   * @type {Boolean}
   * @default true
   */
  rounded: {
    type: Boolean,
    default: true,
  },

  /**
   * The color of the tags input.
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
  <div class="flex w-full flex-col" :class="{ 'opacity-50': props.disabled }">
    <VLabel
      v-if="props.label"
      :id="props.id"
      :label="props.label"
      :required="props.required"
      :helper="props.helper"
      :size="props.size"
    />

    <div class="flex flex-wrap items-center">
      <div v-if="props.modelValue.length > 0">
        <div v-for="(value, index) in props.modelValue" :key="index">
          {{ value }}
        </div>
      </div>

      
      	<VButton :size="size" icon="add_circle" outline dashed />
	
    </div>
  </div>
</template>
