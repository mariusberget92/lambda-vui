<script setup>
import { defineProps, defineEmits, ref } from 'vue'
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

    let newValue = parseFloat(range);

    // Allow the input to be empty or a single negative sign
    if (isNaN(newValue) && range !== '-') {
      event.target.value = props.modelValue;
      return;
    }

    // Allow entering a negative value by typing just a '-'
    if (range === '-') {
      event.target.value = '-';
      return;
    }

    // Ensure the newValue is within the valid range [min, max]
    newValue = Math.min(Math.max(newValue, props.min), props.max);

    // Calculate the nearest value that aligns with the step
    const remainder = (newValue - props.min) % props.step;
    if (remainder !== 0) {
      // Round the value to the nearest step
      newValue = newValue - remainder + (remainder < props.step / 2 ? 0 : props.step);
    }

    // Make sure the newValue is still within the valid range [min, max]
    newValue = Math.min(Math.max(newValue, props.min), props.max);

    // Update the input value to the calculated and clamped value
    event.target.value = newValue;

    // Do not allow modelValue to be higher than max or lower than min
    if (newValue > props.max || newValue < props.min) {
      return;
    }

    // Update the model value
    emit('update:modelValue', newValue);
  }
}

/**
 * Convert a string to a number.
 *
 * @param  {String} value
 * @return {Number}
 */
const stringToNumber = (value) => {
  return Number(value)
}

/**
 * Reset the range.
 *
 * @return {Void}
 */
const reset = () => {
  emit('update:modelValue', defaultValue.value)
}

/**
 * Update based on key press (up, down, left, right).
 * 
 * @param {Event} event
 */
const keyHandler = (event) => {
  if (event.key === 'ArrowUp' || event.key === 'ArrowRight') {
    if (props.modelValue + props.step <= props.max) {
      emit('update:modelValue', props.modelValue + props.step)
    } else {
      emit('update:modelValue', props.max)
    }
  } else if (event.key === 'ArrowDown' || event.key === 'ArrowLeft') {
    if (props.modelValue - props.step >= props.min) {
      emit('update:modelValue', props.modelValue - props.step)
    } else {
      emit('update:modelValue', props.min)
    }
  }
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
      class="flex w-max max-w-full border-l-0 bg-nord-light-400 transition-[border-width] duration-100 ease-in-out focus-within:border-l-4 dark:bg-nord-dark-100"
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
      <VIcon
        v-if="props.icon"
        :icon="props.icon"
        :size="props.size"
        class="pr-2"
      />

      <div class="flex w-full">
        <input
          type="text"
          class="w-1/5 bg-transparent cursor-pointer appearance-none focus:outline-none"
          :class="[
            $sizeToClass(props.size),
            {
              'px-2 py-2': props.icon,
              'px-3 py-2': !props.icon,
            },
          ]"
          :value="props.modelValue"
          :disabled="props.disabled"
          @input="updateRange($event, stringToNumber($event.target.value))"
          @keydown="keyHandler($event)"
        />

        <input
          :id="props.id"
          class="bg-nord-light-200 dark:bg-nord-dark-300 rounded h-2 m-2 mt-3.5 cursor-pointer appearance-none focus:outline-none flex-1"
          type="range"
          :min="props.min"
          :max="props.max"
          :step="props.step"
          :value="props.modelValue"
          :disabled="props.disabled"
          @input="updateRange($event, stringToNumber($event.target.value))" 
        />
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
