<script setup>
import { defineProps, defineEmits, ref } from 'vue'
import VLabel from './Partials/V-Label.vue'

/**
 * Define the component emits.
 */
const emit = defineEmits(['update:modelValue', 'click'])

/**
 * Component props.
 *
 * @type {Object}
 */
const props = defineProps({
  /**
   * The ID of the rating input.
   * If none is provided, a random one will be generated.
   *
   * @type {String}
   * @required
   * @default lambda-rating-<random>
   */
  id: {
    type: String,
    default: () => {
      return 'lambda-rating-' + Math.random().toString(36).substring(2, 9)
    },
  },

  /**
   * Model value of the rating.
   *
   * @type {String}
   * @default 0
   * @required
   */
  modelValue: {
    type: Number,
    default: 0,
    required: true,
  },

  /**
   * Rating size.
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
   * The label of the rating.
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
   * The helper text of the rating.
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
   * Whether the rating is required.
   *
   * @type {Boolean}
   * @default false
   */
  required: {
    type: Boolean,
    default: false,
  },

  /**
   * Whether the rating is disabled.
   *
   * @type {Boolean}
   * @default false
   */
  disabled: {
    type: Boolean,
    default: false,
  },

  /**
   * Wheter the rating has an error.
   *
   * @type {String|Boolean}
   * @default false
   */
  error: {
    type: [String, Boolean],
    default: false,
  },

  /**
   * The color of the rating icons.
   *
   * @type {String}
   * @default yellow
   * @options red, green, blue, orange, yellow, mauve
   */
  color: {
    type: String,
    default: 'yellow',
    validator: (val) => {
      return ['red', 'green', 'blue', 'orange', 'yellow', 'mauve'].includes(val)
    },
  },

  /**
   * The maximum rating.
   *
   * @type {Number}
   * @default 5
   */
  max: {
    type: Number,
    default: 5,
  },

  /**
   * The rating icon.
   *
   * @type {String}
   * @default star
   */
  icon: {
    type: String,
    default: 'star',
  },
})

/**
 * Update the rating.
 *
 * @param  {Number} rating
 * @return {void}
 */
const updateRating = (event, rating) => {
  if (props.disabled) {
    return
  }

  emit('update:modelValue', rating)
  emit('click', rating)
}

/**
 * Hover rating.
 *
 * @type {Number}
 */
const hoverRating = ref(props.modelValue)
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

    <div class="flex">
      <span
        v-for="i in props.max"
        :key="i"
        :size="props.size"
        class="material-symbols-rounded cursor-pointer transition-colors duration-100"
        :class="[
          $sizeToClass(props.size),
          {
            'text-nord-yellow-300 dark:text-nord-yellow-300':
              hoverRating >= i && props.color === 'yellow',
            'text-nord-red-300 dark:text-nord-red-300':
              hoverRating >= i && props.color === 'red',
            'text-nord-green-300 dark:text-nord-green-300':
              hoverRating >= i && props.color === 'green',
            'text-nord-blue-300 dark:text-nord-blue-300':
              hoverRating >= i && props.color === 'blue',
            'text-nord-orange-300 dark:text-nord-orange-300':
              hoverRating >= i && props.color === 'orange',
            'text-nord-mauve-300 dark:text-nord-mauve-300':
              hoverRating >= i && props.color === 'mauve',
            'text-nord-light-400 dark:text-nord-dark-100': hoverRating < i,
          },
        ]"
        @mouseenter="hoverRating = i"
        @mouseleave="hoverRating = props.modelValue"
        @click="updateRating($event, i)"
      >
        {{ props.icon }}
      </span>
    </div>
  </div>
</template>
