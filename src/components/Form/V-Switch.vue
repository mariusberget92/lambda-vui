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
   * The color of the switch.
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
   * Whether the switch is disabled.
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
		'xs' : {
			bullet: ['h-3'],
			switch: ['h-5', 'w-12'],
			translate: ['translate-x-7']
		},
		'sm' : {
			bullet: ['h-4'],
			switch: ['h-6', 'w-14'],
			translate: ['translate-x-8']
		},
		'base' : {
			bullet: ['h-6'],
			switch: ['h-8', 'w-16'],
			translate: ['translate-x-8']
		},
		'lg' : {
			bullet: ['h-8'],
			switch: ['h-10', 'w-20'],
			translate: ['translate-x-10']
		},
		'xl' : {
			bullet: ['h-10'],
			switch: ['h-12', 'w-24'],
			translate: ['translate-x-12']
		},
		'2xl' : {
			bullet: ['h-12'],
			switch: ['h-14', 'w-28'],
			translate: ['translate-x-14']
		},
	}[props.size]
})
</script>

<template>
  <div class="flex flex-col" :class="{ 'opacity-50 pointer-events-none': props.disabled }">
    <VLabel
      v-if="props.label"
      :id="props.id"
      :label="props.label"
      :required="props.required"
      :helper="props.helper"
      :size="props.size"
    />

    <div
      class="relative cursor-pointer rounded-full bg-nord-light-400 p-1 dark:bg-nord-dark-100 transition-colors duration-100 ease-in-out" :class="[classSwitchSize['switch']]"
      @click="toggleSwitch()"
    >
      <p
        class="absolute aspect-square transform rounded-full bg-nord-dark-300/50 transition duration-100 ease-in-out dark:bg-nord-light-300/50"
        :class="[classSwitchSize['bullet'], isOn && classSwitchSize['translate'], { 
					'!bg-nord-red-300': props.color === 'red' && isOn,
					'!bg-nord-green-300': props.color === 'green' && isOn,
					'!bg-nord-blue-300': props.color === 'blue' && isOn,
					'!bg-nord-orange-300': props.color === 'orange' && isOn,
					'!bg-nord-yellow-300': props.color === 'yellow' && isOn,
					'!bg-nord-mauve-300': props.color === 'mauve' && isOn,
				}]"
      ></p>
    </div>
  </div>
</template>
