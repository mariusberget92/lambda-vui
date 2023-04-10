<script setup>
import { computed, defineProps, ref, defineEmits } from 'vue'
import { vOnClickOutside } from '@vueuse/components'
import VLabel from './Partials/V-Label.vue'
import VIcon from './Partials/V-Icon.vue'
import VDropdown from './Partials/Select/V-Dropdown.vue'
import VTag from './Partials/Select/V-Tag.vue'

/**
 * Define the component emits.
 */
const emit = defineEmits(['update:modelValue'])

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
   * Multiple select.
   *
   * @type {Boolean}
   * @default false
   */
  multiple: {
    type: Boolean,
    default: false,
  },

  /**
   * Model value of the input.
   *
   * @type {Array|String}
   * @default ''
   */
  modelValue: {
    type: [Array, String],
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
 * Get the option from an text.
 *
 * @type {import('vue').ComputedRef<Function>}
 * @param {String|Object} option
 * @returns {String}
 */
const textToOption = computed(() => {
  return (text) => {
    return props.selectOptions.find((option) => {
      return getOptionInfo.value(option, 'text') === text
    })
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
    'read-only:opacity-75',
    'text-nord-300',
    'dark:text-nord-snow-storm-300',
    'caret-transparent',
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

/**
 * CSS wrapper classes for the fake input if the input is multiple.
 *
 * @type {import ('vue').ComputedRef<string>}
 * @returns {string}
 */
const classesTagWrapper = computed(() => {
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
    'cursor-pointer',
    'flex',
    'space-x-1',
    'overflow-x-scroll',
    'items-center',
    'justify-start',
    'grow',
  ]

  if (hasIcon.value) {
    classes.push('rounded-l-none', 'border-l-0')
  }

  if (props.readOnly) {
    classes.push('opacity-75')
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

/**
 * All selected options, either single or multi.
 * We use an array for both bases. The tags display is displayed differently based on the prop: multiple.
 *
 * @type {import('vue').Ref<Array>}
 */
const selectedOptions = ref([])

/**
 * Computes the value to be displayed in the input field based on the current selected options.
 *
 * @type {import('vue').ComputedRef<string | Array>}
 * @returns {string | Array}
 */
const inputValue = computed(() => {
  if (typeof props.selectOptions[0] === 'string') {
    return selectedOptions.value
  }

  return selectedOptions.value.map((value) => {
    const option = props.selectOptions.find(
      (option) => getOptionInfo.value(option, 'value') === value
    )

    return getOptionInfo.value(option, 'text')
  })
})

/**
 * Handle the selection of an option when multiple is false.
 *
 * @param {String|Object} option
 */
const handleSelectSingle = (option) => {
  const value = getOptionInfo.value(option, 'value')
  selectedOptions.value = [value]
  emit('update:modelValue', value)
  closeDropdown()
}

/**
 * Handle the selection of an option when multiple is true.
 *
 * @param {String|Object} option
 * @returns {void}
 */
const handleSelectMultiple = (option) => {
  const value = getOptionInfo.value(option, 'value')
  const selectedValues = selectedOptions.value.slice()

  if (selectedValues.includes(value)) {
    const index = selectedValues.indexOf(value)
    selectedValues.splice(index, 1)
  } else {
    selectedValues.push(value)
  }

  selectedOptions.value = selectedValues
  emit('update:modelValue', selectedValues)
}

/**
 * Close the dropdown.
 *
 * @returns {void}
 */
function closeDropdown() {
  isDropdownOpen.value = false
}
</script>

<template>
  <div class="flex flex-col" v-on-click-outside="onClickOutsideHandler">
    <VLabel
      v-if="hasLabel"
      :id="id"
      :label="label"
      :required="required"
      :helper="helper"
      :size="size"
    />

    <div class="flex mt-1" @click="isDropdownOpen = !isDropdownOpen">
      <VIcon
        v-if="hasIcon"
        :icon="icon"
        :size="size"
        :readOnly="readOnly"
        :class="classesError"
        class="cursor-pointer"
      />

      <input
        v-if="!multiple"
        :id="id"
        :placeholder="placeholder"
        :required="required"
        :readonly="readOnly"
        :class="classesInput"
        type="text"
        :value="inputValue"
        @keydown.prevent
      />

      <div v-if="multiple" :class="classesTagWrapper">
        <span
          v-if="selectedOptions.length == 0"
          class="text-nord-300/50 dark:text-nord-snow-storm-300/50"
          >{{ props.placeholder }}</span
        >

        <VTag
          v-for="text in inputValue"
          :key="text"
          :option="textToOption(text)"
          :size="size"
          :readOnly="readOnly"
          @remove="handleSelectMultiple"
        />
      </div>

      <VIcon
        :icon="isDropdownOpen ? 'expand_less' : 'expand_more'"
        :size="size"
        :readOnly="readOnly"
        side="right"
        class="cursor-pointer"
      />
    </div>

    <VDropdown
      ref="dropdown"
      :selectOptions="selectOptions"
      :textReducer="textReducer"
      :valueReducer="valueReducer"
      :size="size"
      :modelValue="modelValue"
      :multiple="multiple"
      @select="
        multiple ? handleSelectMultiple($event) : handleSelectSingle($event)
      "
      :show="isDropdownOpen"
    />
  </div>
</template>
