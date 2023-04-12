<script setup>
import { computed, defineProps, ref, defineEmits } from 'vue'
import { vOnClickOutside } from '@vueuse/components'
import VLabel from './Partials/V-Label.vue'
import VIcon from './Partials/V-Icon.vue'
import VDropdown from './Partials/Select/V-Dropdown.vue'

/**
 * Define the component emits.
 *
 * @type {Object}
 */
const emit = defineEmits(['update:modelValue'])

/**
 * Click outside handler.
 *
 * @type {Array}
 */
const onClickOutsideHandler = [
  () => {
    closeDropdown()
  },
  {
    ignore: [],
  },
]

/**
 * Component props.
 *
 * @type {Object}
 */
const props = defineProps({
  /**
   * The ID of the input.
   * If none is provided, a random one will be generated.
   *
   * @type {String}
   * @required
   * @default lambda-select-<random>
   */
  id: {
    type: String,
    default: () => {
      return 'lambda-select-' + Math.random().toString(36).substring(2, 9)
    },
  },

  /**
   * Model value of the input.
   *
   * @type {String}
   * @default ''
   */
  modelValue: {
    type: String,
    default: '',
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
   * The label of the input.
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
   * The helper text of the input.
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
   * Whether the input is required.
   *
   * @type {Boolean}
   * @default false
   */
  required: {
    type: Boolean,
    default: false,
  },

  /**
   * The icon of the input.
   *
   * @type {String|Boolean}
   * @default false
   */
  icon: {
    type: [String, Boolean],
    default: false,
  },

  /**
   * The placeholder of the input.
   *
   * @type {String}
   * @default 'Select...'
   */
  placeholder: {
    type: String,
    default: 'Select...',
  },

  /**
   * Whether the input is read-only.
   *
   * @type {Boolean}
   * @default false
   */
  readOnly: {
    type: Boolean,
    default: false,
  },

  /**
   * Whether the input is disabled.
   *
   * @type {Boolean}
   * @default false
   */
  disabled: {
    type: Boolean,
    default: false,
  },

  /**
   * Wheter the input has an error.
   *
   * @type {String|Boolean}
   * @default false
   */
  error: {
    type: [String, Boolean],
    default: false,
  },

  /**
   * An array of options to be displayed in the select component.
   * @prop {Array} selectOptions - The options to be displayed.
   * @prop {Object} selectOptions[] - An object representing an option in the select component.
   * @prop {string} selectOptions[].text - The text to be displayed for the option.
   * @prop {string} selectOptions[].value - The value of the option.
   * @prop {string} [selectOptions[].emoji] - The emoji associated with the option.
   *
   * @type {Array<String>|Array<Object>}
   * @required
   * @default []
   */
  selectOptions: {
    type: [Array],
    default: () => [],
    required: true,
  },

  /**
   * Reduce to get the value of an option.
   *
   * @type {Function}
   */
  valueReducer: {
    type: Function,
    default: (option) => option.value,
  },

  /**
   * Reduce to get the text of an option.
   *
   * @type {Function}
   */
  textReducer: {
    type: Function,
    default: (option) => option.text,
  },
})

/**
 * Whether the input has a label.
 *
 * @type {import('vue').ComputedRef<boolean>}
 * @default false
 */
const hasLabel = computed(() => props.label !== false)

/**
 * Whether the input has an error.
 *
 * @type {import('vue').ComputedRef<boolean>}
 * @default false
 */
const hasError = computed(() => props.error !== false)

/**
 * Whether the input has an icon.
 *
 * @type {import('vue').ComputedRef<boolean>}
 * @default false
 */
const hasIcon = computed(() => props.icon !== false)

/**
 * Whether the dropdown is open or not.
 *
 * @type {import('vue').Ref<boolean>}
 */
const isDropdownOpen = ref(false)

/**
 * Get the option text or value from an option.
 *
 * @type {import('vue').ComputedRef<Function>}
 * @param {String|Object} option
 * @param {String} type
 * @returns {String}
 */
const getOptionInfo = computed(() => {
  return (option, type) => {
    if (typeof option === 'string') {
      return option
    }

    const fn = type === 'text' ? props.textReducer : props.valueReducer
    return fn(option)
  }
})

/**
 * CSS error classes.
 *
 * @type {import ('vue').ComputedRef<Object>}
 * @returns {Object}
 */
const classesError = computed(() => {
  return {
    'border-l-4': hasError.value,
    '!border-l-nord-aurora-200': hasError.value,
    'dark:shadow-[-10px_0_10px]': hasError.value,
    'dark:shadow-nord-aurora-100/25': hasError.value,
  }
})

/**
 * CSS input classes.
 *
 * @type {import ('vue').ComputedRef<string>}
 * @returns {string}
 */
const classesInput = computed(() => {
  let classes = [
    'border',
    'border-r-0',
    'border-nord-snow-storm-100',
    'focus:border-nord-snow-storm-100',
    'dark:border-nord-400',
    'dark:focus:border-nord-400',
    'rounded-r-none',
    'bg-nord-snow-storm-300',
    'dark:bg-nord-100',
    'text-nord-300',
    'dark:text-nord-snow-storm-300',
    'caret-transparent',
    'w-full',
    'cursor-pointer',
    'placeholder:text-nord-300/50',
    'dark:placeholder:text-nord-snow-storm-300/50',
  ]

  if (hasIcon.value) {
    classes.push('rounded-l-none', 'border-l-0')
  }

  const sizeClasses = {
    xs: ['text-xs', 'px-2', 'py-1'],
    sm: ['text-sm', 'px-2', 'py-2'],
    base: ['text-base', 'px-3', 'py-2'],
    lg: ['text-lg', 'px-3', 'py-3'],
    xl: ['text-xl', 'px-4', 'py-3'],
    '2xl': ['text-2xl', 'px-4', 'py-4'],
  }

  classes.push(...(sizeClasses[props.size] || sizeClasses['base']))

  return classes.join(' ')
})

const classesRemoveButton = computed(() => {
  let classes = [
    'absolute',
    'rounded-full',
    'text-nord-300',
    'dark:text-nord-snow-storm-300',
    'cursor-pointer',
    'right-1',
    'hover:bg-nord-snow-storm-100',
    'hover:dark:bg-nord-300',
  ]

  const sizeClasses = {
    xs: ['text-xs', 'px-0.5'],
    sm: ['text-sm'],
    base: ['text-base'],
    lg: ['text-lg'],
    xl: ['text-xl'],
    '2xl': ['text-2xl'],
  }

  classes.push(...(sizeClasses[props.size] || sizeClasses['base']))

  return classes.join(' ')
})

/**
 * Computes the value to be displayed in the input field based on the current selected options.
 *
 * @type {import('vue').ComputedRef<string>}
 * @returns {string}
 */
const inputValue = computed(() => {
  if (typeof props.selectOptions[0] === 'string') {
    return props.modelValue
  }

  const selectedOptions = props.selectOptions.filter((option) => {
    return props.modelValue.includes(getOptionInfo.value(option, 'value'))
  })

  return selectedOptions.map((option) => getOptionInfo.value(option, 'text'))
})

/**
 * Handle the selection of an option.
 *
 * @param {String|Object} option
 */
const handleSelect = (option) => {
  emit('update:modelValue', getOptionInfo.value(option, 'value'))
  closeDropdown()
}

/**
 * Reset the input value when the "X" is clicked.
 *
 * @param {Event} event
 */
const reset = (event) => {
  emit('update:modelValue', '')
  event.stopPropagation()
}

/**
 * Close the dropdown.
 *
 * @returns {void}
 */
const closeDropdown = () => {
  isDropdownOpen.value = false
}

/**
 * Toggle the dropdown.
 *
 * @returns {void}
 */
const toggleDropdown = () => {
  isDropdownOpen.value = !isDropdownOpen.value
}
</script>

<template>
  <div
    class="flex flex-col"
    :class="{ 'opacity-50': readOnly || disabled }"
    v-on-click-outside="onClickOutsideHandler"
  >
    <VLabel
      v-if="hasLabel"
      :id="id"
      :label="label"
      :required="required"
      :helper="helper"
      :size="size"
    />

    <div
      class="flex mt-1 cursor-pointer"
      @click=";(readOnly || disabled) == false && toggleDropdown()"
    >
      <VIcon v-if="hasIcon" :icon="icon" :size="size" :class="classesError" />

      <input
        type="text"
        :id="id"
        :class="classesInput"
        :placeholder="placeholder"
        :value="inputValue"
        :required="required"
        :readonly="readOnly"
        :disabled="disabled"
        :aria-labelledby="hasLabel ? `${id}-label` : null"
        :aria-describedby="hasLabel ? `${id}-helper` : null"
        @keydown.prevent
      />

      <div class="relative flex items-center">
        <span
          v-if="modelValue.length > 0"
          class="material-symbols-rounded"
          :class="classesRemoveButton"
          @click="reset"
        >
          clear
        </span>
      </div>

      <VIcon
        :icon="isDropdownOpen ? 'expand_less' : 'expand_more'"
        :size="size"
        side="right"
      />
    </div>

    <VDropdown
      ref="dropdown"
      :selectOptions="selectOptions"
      :textReducer="textReducer"
      :valueReducer="valueReducer"
      :size="size"
      :modelValue="modelValue"
      :show="isDropdownOpen"
      @select="handleSelect($event)"
    />
  </div>
</template>
