<script setup>
import { defineEmits, defineProps, ref, computed } from 'vue'
import VLabel from './Partials/V-Label.vue'

/**
 * Define the component emits.
 *
 * @type {Object}
 */
const emit = defineEmits(['update:modelValue'])

/**
 * Component props.
 *
 * @type {Object}
 */
const props = defineProps({
  /**
   * The ID of the switch.
   * If none is provided, a random one will be generated.
   *
   * @type {String}
   * @required
   * @default lambda-switch-<random>
   */
  id: {
    type: String,
    default: () => {
      return 'lambda-switch-' + Math.random().toString(36).substring(2, 9)
    },
  },

  /**
   * Model value of the switch.
   *
   * @type {Boolean}
   * @default false
   * @required
   */
  modelValue: {
    type: Boolean,
    default: false,
  },

  /**
   * The label of the switch.
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
   * The helper text of the switch.
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
   * Whether the switch is required.
   *
   * @type {Boolean}
   * @default false
   */
  required: {
    type: Boolean,
    default: false,
  },

  /**
   * The size of the switch.
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
   * Whether the switch is disabled.
   *
   * @type {Boolean}
   * @default false
   */
  disabled: {
    type: Boolean,
    default: false,
  },

  /**
   * Whether the switch has icons (check/close).
   * 
   * @type {Boolean}
   * @default false
   */
  icons: {
    type: Boolean,
    default: false,
  },

  /**
   * The color of the switch when it's on.
   * 
   * @type {String}
   * @default blue
   */
  onColor: {
    type: String,
    default: 'blue',
    validator: (val) => {
      return ['green', 'red', 'blue', 'mauve', 'orange', 'yellow', 'default'].includes(val)
    },
  },

  /**
   * The color of the switch when it's off.
   * 
   * @type {String}
   * @default default
   */
  offColor: {
    type: String,
    default: 'default',
    validator: (val) => {
      return ['green', 'red', 'blue', 'mauve', 'orange', 'yellow', 'default'].includes(val)
    },
  },

  /**
   * Shape of the switch.
   * 
   * @type {String}
   * @default pill
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
 * @return {void}
 */
const toggleSwitch = () => {
  isOn.value = !isOn.value
  emit('update:modelValue', isOn.value)
}

/**
 * The switch size classes.
 *
 * @type {Object}
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
      translateText: ['translate-x-17']
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
 * Color classes for the switch.
 * 
 * @type {Object}
 * @return {String}
 */
const classColor = computed(() => {
  return {
    on: {
      green: ['bg-nord-green-500 dark:bg-nord-green-500'],
      red: ['bg-nord-red-500 dark:bg-nord-red-500'],
      blue: ['bg-nord-blue-500 dark:bg-nord-blue-500'],
      mauve: ['bg-nord-mauve-500 dark:bg-nord-mauve-500'],
      orange: ['bg-nord-orange-500 dark:bg-nord-orange-500'],
      yellow: ['bg-nord-yellow-500 dark:bg-nord-yellow-500'],
      default: ['bg-nord-light-400 dark:bg-nord-dark-100'],
    }[props.onColor],
    off: {
      green: ['bg-nord-green-300 dark:bg-nord-green-300'],
      red: ['bg-nord-red-300 dark:bg-nord-red-300'],
      blue: ['bg-nord-blue-300 dark:bg-nord-blue-300'],
      mauve: ['bg-nord-mauve-300 dark:bg-nord-mauve-300'],
      orange: ['bg-nord-orange-300 dark:bg-nord-orange-300'],
      yellow: ['bg-nord-yellow-300 dark:bg-nord-yellow-300'],
      default: ['bg-nord-light-400 dark:bg-nord-dark-100'],
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
      class="relative flex items-center cursor-pointer transition-colors duration-300 ease-in-out"
      :class="[classSwitchSize['switch'], (isOn) ? classColor['on'] : classColor['off'], {
        'rounded': props.shape === 'rounded',
        'rounded-full': props.shape === 'pill',
        'rounded-none': props.shape === 'square',
      }]"
      @click="toggleSwitch()"
    >
      <p
        class="absolute aspect-square transform transition-all duration-300 ease-in-out bg-white"
        :class="[
          classSwitchSize['bullet'],
          isOn && classSwitchSize['translate'],
          {
            'rounded': props.shape === 'rounded',
            'rounded-full': props.shape === 'pill',
            'rounded-none': props.shape === 'square',
          }
        ]"
      ></p>
      <span
        v-if="props.icons"
        class="material-symbols-rounded absolute transform transition-all duration-300 ease-in-out font-bold text-white"
        :class="[$sizeToClass(props.size), (!isOn) && classSwitchSize['translateText'], {
          'translate-x-2': isOn,
        }]"
        >{{ isOn ? 'check' : 'close' }}</span
      >
    </div>
  </div>
</template>
