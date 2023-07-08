<script setup>
import { defineProps, defineEmits, computed, ref } from 'vue'
import VLabel from './Partials/V-Label.vue'
import VInputResetButton from './Partials/V-InputResetButton.vue'
import VIcon from './Partials/V-Icon.vue'

/**
 * Component emits.
 *
 * @property {Number} update:modelValue - Emits when the model value is updated.
 * @property {Number} change - Emits when the input is changed.
 */
const emit = defineEmits(['update:modelValue', 'click'])

/**
 * Component props.
 *
 * @property {String} id - The ID of the rating input.
 * @property {Number} modelValue - Model value of the rating.
 * @property {String|Boolean} label - The label of the rating.
 * @property {String|Boolean} helper - The helper text of the rating.
 * @property {String} size - The size of the rating.
 * @property {Boolean} required - Whether the rating is required.
 * @property {Boolean} disabled - Whether the rating is disabled.
 * @property {String|Boolean} error - Wheter the rating has an error.
 * @property {String} color - The color of the rating icons.
 * @property {Number} max - The maximum rating.
 * @property {String} ratingIcon - The rating icon.
 * @property {Boolean} clearButton - Whether the rating has a clear button.
 * @property {Boolean} rounded - Whether the rating is rounded.
 * @property {String|Boolean} icon - The icon of the rating.
 */
const props = defineProps({
  /**
   * The ID of the rating input.
   */
  id: {
    type: String,
    default: () => {
      return 'lambda-rating-' + Math.random().toString(36).substring(2, 9)
    },
  },

  /**
   * Model value of the rating.
   */
  modelValue: {
    type: Number,
    default: 0,
    required: true,
  },

  /**
   * Rating size.
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
   * The label of the rating.
   */
  label: {
    type: [String, Boolean],
    default: false,
  },

  /**
   * The helper text of the rating.
   */
  helper: {
    type: [String, Boolean],
    default: false,
  },

  /**
   * Whether the rating is required.
   */
  required: {
    type: Boolean,
    default: false,
  },

  /**
   * Whether the rating is disabled.
   */
  disabled: {
    type: Boolean,
    default: false,
  },

  /**
   * Wheter the rating has an error.
   */
  error: {
    type: [String, Boolean],
    default: false,
  },

  /**
   * The color of the rating icons.
   *
   * @value red, green, blue, orange, yellow, mauve
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
   */
  max: {
    type: Number,
    default: 5,
  },

  /**
   * The rating icon.
   */
  ratingIcon: {
    type: String,
    default: 'star',
  },

  /**
   * Whether the rating has a clear button.
   */
  clearButton: {
    type: Boolean,
    default: true,
  },

  /**
   * Whether the rating is rounded.
   */
  rounded: {
    type: Boolean,
    default: true,
  },

  /**
   * The icon of the rating input.
   */
  icon: {
    type: [String, Boolean],
    default: false,
  },
})

/**
 * Update the rating.
 *
 * @param  {Event} event
 * @param  {Number} rating
 * @return {Void}
 */
const updateRating = (event, rating) => {
  if (!props.disabled) {
    emit('update:modelValue', rating)
    emit('click', rating)
  }
}

/**
 * Hover rating.
 *
 * @type {Number}
 */
const hoverRating = ref(props.modelValue)

/**
 * Reset the rating.
 *
 * @return {Void}
 */
const reset = () => {
  hoverRating.value = 0
  emit('update:modelValue', 0)
}

/**
 * Rating icon size class based on size prop.
 *
 * @return {String}
 */
const ratingIconSize = computed(() => {
  return {
    xs: 'base',
    sm: 'lg',
    base: 'xl',
    lg: '2xl',
    xl: '3xl',
    '2xl': '4xl',
  }[props.size]
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
