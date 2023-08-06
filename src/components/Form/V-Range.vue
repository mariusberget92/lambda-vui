<script setup>
import { defineProps, defineEmits, computed, ref } from 'vue'
import VLabel from './Partials/V-Label.vue'
import VInputResetButton from './Partials/V-InputResetButton.vue'
import VIcon from './Partials/V-Icon.vue'

/**
 * Component emits.
 *
 * @property {Number} update:modelValue - Emits when the model value is updated.
 */
const emit = defineEmits(['update:modelValue'])

/**
 * Component props.
 *
 * @property {String} id - The ID of the range input.
 * @property {Number} modelValue - Model value of the range.
 * @property {String|Boolean} label - The label of the range.
 * @property {String|Boolean} helper - The helper text of the range.
 * @property {String} size - The size of the range.
 * @property {Boolean} required - Whether the range is required.
 * @property {Boolean} disabled - Whether the range is disabled.
 * @property {String|Boolean} error - Wheter the range has an error.
 * @property {String} color - The color of the range icons.
 * @property {Number} min - The minimum range.
 * @property {Number} max - The maximum range.
 * @property {Number} step - The step of the range.
 * @property {Boolean} resetButton - Whether the range has a reset button.
 * @property {Boolean} rounded - Whether the range is rounded.
 * @property {String|Boolean} icon - The icon of the range.
 */
const props = defineProps({
  /**
   * The ID of the range input.
   */
  id: {
    type: String,
    default: () => {
      return 'lambda-range-' + Math.random().toString(36).substring(2, 9)
    },
  },

  /**
   * Model value of the range.
   */
  modelValue: {
    type: Number,
    default: 0,
    required: true,
  },

  /**
   * Range size.
   *
   * @value xs, sm, base, lg, xl, 2xl
   */
  size: {
    type: String,
    default: 'sm',
    validator: (val) => {
      return ['xs', 'sm', 'base', 'lg', 'xl', '2xl'].includes(val)
    },
  },

  /**
   * The label of the range.
   */
  label: {
    type: [String, Boolean],
    default: false,
  },

  /**
   * The helper text of the range.
   */
  helper: {
    type: [String, Boolean],
    default: false,
  },

  /**
   * Whether the range is required.
   */
  required: {
    type: Boolean,
    default: false,
  },

  /**
   * Whether the range is disabled.
   */
  disabled: {
    type: Boolean,
    default: false,
  },

  /**
   * Wheter the range has an error.
   */
  error: {
    type: [String, Boolean],
    default: false,
  },

  /**
   * The color of the range.
   *
   * @value red, green, blue, orange, yellow, mauve
   */
  color: {
    type: String,
    default: 'blue',
    validator: (val) => {
      return ['red', 'green', 'blue', 'orange', 'yellow', 'mauve'].includes(val)
    },
  },

  /**
   * The minimum range.
   */
  min: {
    type: Number,
    default: 0,
  },

  /**
   * The maximum range.
   */
  max: {
    type: Number,
    default: 100,
  },

  /**
   * The step of the range.
   */
  step: {
    type: Number,
    default: 1,
  },

  /**
   * Whether the range has a reset button.
   */
  resetButton: {
    type: Boolean,
    default: true,
  },

  /**
   * Whether the range is rounded.
   */
  rounded: {
    type: Boolean,
    default: true,
  },

  /**
   * The icon of the range input.
   */
  icon: {
    type: [String, Boolean],
    default: false,
  },
})

/**
 * Default value of the range.
 */
const defaultValue = ref(props.modelValue)

/**
 * Update the range.
 *
 * @param  {Event} event
 * @param  {Number} range
 * @return {Void}
 */
const updateRange = (event, range) => {
  if (!props.disabled) {
    emit('update:modelValue', range)
  }
}

/**
 * Reset the range.
 *
 * @return {Void}
 */
const reset = () => {
  emit('update:modelValue', defaultValue.value)
}
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
      class="flex w-max border-l-0 bg-nord-light-400 transition-[border-width] duration-100 ease-in-out focus-within:border-l-4 dark:bg-nord-dark-100"
      :class="[
        {
          rounded: props.rounded,
          'pr-1': props.clearButton && props.modelValue > 0,
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
      <div
        class="flex transform py-1 transition-[padding] duration-100 ease-in-out"
        :class="{
          '!pr-9': props.clearButton && props.modelValue > 0,
          'px-2.5': !props.icon,
          'pr-2': props.icon,
        }"
      >
        <VIcon
          v-if="props.icon"
          :icon="props.icon"
          :size="props.size"
          class="pr-2"
        />

        <span
          v-for="i in props.max"
          :key="i"
          class="material-symbols-rounded relative cursor-pointer"
          :class="[
            $sizeToClass(ratingIconSize),
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
              'text-nord-dark-300/60 dark:text-nord-light-300/60':
                hoverRating < i,
            },
          ]"
          @mouseenter="hoverRating = i"
          @mouseleave="hoverRating = props.modelValue"
          @click="updateRating($event, i)"
        >
          {{ props.ratingIcon }}
        </span>
      </div>

      <template v-if="props.clearButton">
        <VInputResetButton
          :size="props.size"
          :model-value="props.modelValue"
          @reset="reset"
        />
      </template>
    </div>
  </div>
</template>
