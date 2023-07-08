<script setup>
import { defineEmits, defineProps, ref, computed } from 'vue'
import VLabel from './Partials/V-Label.vue'

/**
 * Component emits.
 *
 * @property {Boolean} update:modelValue - Emits when the model value is updated.
 * @property {Boolean} change - Emits when the switch is toggled.
 */
const emit = defineEmits(['update:modelValue', 'change'])

/**
 * Component props.
 *
 * @property {String} id - The ID of the switch.
 * @property {Boolean} modelValue - Model value of the switch.
 * @property {String|Boolean} label - The label of the switch.
 * @property {String|Boolean} helper - The helper text of the switch.
 * @property {Boolean} required - Whether the switch is required.
 * @property {String} size - The size of the switch.
 * @property {Boolean} disabled - Whether the switch is disabled.
 * @property {Boolean} icons - Whether the switch has icons (check/close).
 * @property {String} onColor - The color of the switch when it's on.
 * @property {String} offColor - The color of the switch when it's off.
 * @property {String} shape - Shape of the switch.
 */
const props = defineProps({
  /**
   * The ID of the switch.
   */
  id: {
    type: String,
    default: () => {
      return 'lambda-switch-' + Math.random().toString(36).substring(2, 9)
    },
  },

  /**
   * Model value of the switch.
   */
  modelValue: {
    type: Boolean,
    default: false,
  },

  /**
   * The label of the switch.
   */
  label: {
    type: [String, Boolean],
    default: false,
  },

  /**
   * The helper text of the switch.
   */
  helper: {
    type: [String, Boolean],
    default: false,
  },

  /**
   * Whether the switch is required.
   */
  required: {
    type: Boolean,
    default: false,
  },

  /**
   * The size of the switch.
   *
   * @values xs, sm, base, lg, xl, 2xl
   */
  size: {
    type: String,
    default: 'base',
    validator: (val) => {
      return ['xs', 'sm', 'base', 'lg', 'xl', '2xl'].includes(val)
    },
  },

  /**
   * Whether the switch is disabled.
   */
  disabled: {
    type: Boolean,
    default: false,
  },

  /**
   * Whether the switch has icons (check/close).
   */
  icons: {
    type: Boolean,
    default: false,
  },

  /**
   * The color of the switch when it's on.
   * 
   * @values green, red, blue, mauve, orange, yellow, default
   */
  onColor: {
    type: String,
    default: 'blue',
    validator: (val) => {
      return [
        'green',
        'red',
        'blue',
        'mauve',
        'orange',
        'yellow',
        'default',
      ].includes(val)
    },
  },

  /**
   * The color of the switch when it's off.
   *
   * @values green, red, blue, mauve, orange, yellow, default
   */
  offColor: {
    type: String,
    default: 'default',
    validator: (val) => {
      return [
        'green',
        'red',
        'blue',
        'mauve',
        'orange',
        'yellow',
        'default',
      ].includes(val)
    },
  },

  /**
   * Shape of the switch.
   * 
   * @values pill, rounded, square
   */
  shape: {
    type: String,
    default: 'pill',
    validator: (val) => {
      return ['pill', 'rounded', 'square'].includes(val)
    },
  },
})

/**
 * Whether the switch is on.
 *
 * @type {Boolean}
 */
const isOn = ref(props.modelValue)

/**
 * Toggle the switch.
 *
 * @return {Void}
 */
const toggleSwitch = () => {
  isOn.value = !isOn.value
  emit('update:modelValue', isOn.value)
  emit('change', isOn.value)
}

/**
 * All the css classes used for sizing and translations for the different
 * parts of the switch.
 *
 * @return {Object}
 */
const classSwitchSize = computed(() => {
  return {
    xs: {
      bullet: ['h-4'],
      switch: ['h-6', 'w-14', 'p-1'],
      translate: ['translate-x-8'],
      translateText: ['translate-x-8'],
    },
    sm: {
      bullet: ['h-6'],
      switch: ['h-8', 'w-18', 'p-1'],
      translate: ['translate-x-10'],
      translateText: ['translate-x-11'],
    },
    base: {
      bullet: ['h-8'],
      switch: ['h-10', 'w-22', 'p-1'],
      translate: ['translate-x-12'],
      translateText: ['translate-x-14'],
    },
    lg: {
      bullet: ['h-10'],
      switch: ['h-12', 'w-26', 'p-1'],
      translate: ['translate-x-14'],
      translateText: ['translate-x-17'],
    },
    xl: {
      bullet: ['h-12'],
      switch: ['h-14', 'w-30', 'p-1'],
      translate: ['translate-x-16'],
      translateText: ['translate-x-20'],
    },
    '2xl': {
      bullet: ['h-14'],
      switch: ['h-16', 'w-34', 'p-1'],
      translate: ['translate-x-18'],
      translateText: ['translate-x-23'],
    },
  }[props.size]
})

/**
 * Color classes for the switch for both on and off states.
 *
 * @return {Object}
 */
const classColor = computed(() => {
  return {
    on: {
      green: ['bg-nord-green-500 dark:bg-nord-green-500 text-white'],
      red: ['bg-nord-red-500 dark:bg-nord-red-500 text-white'],
      blue: ['bg-nord-blue-500 dark:bg-nord-blue-500 text-white'],
      mauve: ['bg-nord-mauve-500 dark:bg-nord-mauve-500 text-white'],
      orange: ['bg-nord-orange-500 dark:bg-nord-orange-500 text-white'],
      yellow: ['bg-nord-yellow-500 dark:bg-nord-yellow-500 text-white'],
      default: [
        'bg-nord-light-400 dark:bg-nord-dark-100 text-nord-light-100 dark:text-nord-dark-500',
      ],
    }[props.onColor],
    off: {
      green: ['bg-nord-green-300 dark:bg-nord-green-300 text-white'],
      red: ['bg-nord-red-300 dark:bg-nord-red-300 text-white'],
      blue: ['bg-nord-blue-300 dark:bg-nord-blue-300 text-white'],
      mauve: ['bg-nord-mauve-300 dark:bg-nord-mauve-300 text-white'],
      orange: ['bg-nord-orange-300 dark:bg-nord-orange-300 text-white'],
      yellow: ['bg-nord-yellow-300 dark:bg-nord-yellow-300 text-white'],
      default: [
        'bg-nord-light-400 dark:bg-nord-dark-100 text-nord-light-100 dark:text-nord-dark-500',
      ],
    }[props.offColor],
  }
})
</script>

<template>
  <div
    class="flex flex-col"
    :class="{ 'pointer-events-none opacity-50': props.disabled }"
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
      :id="props.id"
      class="relative flex cursor-pointer items-center transition-[background-color] duration-300 ease-in-out"
      :class="[
        classSwitchSize['switch'],
        isOn ? classColor['on'] : classColor['off'],
        {
          rounded: props.shape === 'rounded',
          'rounded-full': props.shape === 'pill',
          'rounded-none': props.shape === 'square',
        },
      ]"
      @click="toggleSwitch()"
    >
      <p
        class="absolute aspect-square transform bg-white transition-[transform] duration-300 ease-in-out"
        :class="[
          classSwitchSize['bullet'],
          isOn && classSwitchSize['translate'],
          {
            rounded: props.shape === 'rounded',
            'rounded-full': props.shape === 'pill',
            'rounded-none': props.shape === 'square',
          },
        ]"
      ></p>
      <span
        v-if="props.icons"
        class="material-symbols-rounded absolute transform font-bold transition-[transform] duration-300 ease-in-out"
        :class="[
          $sizeToClass(props.size),
          !isOn && classSwitchSize['translateText'],
          {
            'translate-x-2': isOn,
          },
        ]"
        >{{ isOn ? 'check' : 'close' }}</span
      >
    </div>
  </div>
</template>
