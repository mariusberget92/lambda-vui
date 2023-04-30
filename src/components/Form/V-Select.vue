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
   * @type {String|Array<String>|Number|Array<Number>}
   * @default ''
   * @required
   */
  modelValue: {
    required: true,
    type: [String, Array, Number],
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
   * Whether the input is multiple.
   *
   * @type {Boolean}
   * @default false
   */
  multiple: {
    type: Boolean,
    default: false,
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
   * @prop {Array} options - The options to be displayed.
   * @prop {Object} options[] - An object representing an option in the select component.
   * @prop {string} options[].text - The text to be displayed for the option.
   * @prop {string} options[].value - The value of the option.
   * @prop {string} [options[].emoji] - The emoji associated with the option.
   *
   * @type {Array<String>|Array<Object>}
   * @required
   */
  options: {
    type: Array,
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

  /**
   * The shape of the input.
   *
   * @type {String}
   * @default rounded
   * @options square, rounded, pill
   */
  shape: {
    type: String,
    default: 'rounded',
    validator: (val) => {
      return ['square', 'rounded', 'pill'].includes(val)
    },
  },

  /**
   * Whether the input is searchable.
   *
   * @type {Boolean}
   * @default false
   */
  search: {
    type: Boolean,
    default: false,
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
 * Filtered options after a search query.
 *
 * @type {import('vue').Ref<Array>}
 */
const filteredOptions = ref(props.options)

/**
 * Get the option text or value from an option.
 *
 * @type {import('vue').ComputedRef<Function>}
 * @param {String|Object|Number} option
 * @param {String} type
 * @returns {String}
 */
const getOptionInfo = computed(() => {
  return (option, type) => {
    if (typeof option === 'string' || typeof option === 'number') {
      return option
    }

    const fn = type === 'text' ? props.textReducer : props.valueReducer
    return fn(option)
  }
})

/**
 * Computes the value to be displayed in the input field based on the current selected options.
 *
 * @type {import('vue').ComputedRef<string>}
 * @returns {string}
 */
const inputValue = computed(() => {
  // If no options are selected return an empty string.
  if (props.modelValue.length <= 0) {
    return ''
  }

  // If the input is multiple and only one option is selected return the text of that option.
  // If the input is multiple and more than one option is selected return the number of selected options.
  // If the input is multiple and options are just string return
  if (props.multiple) {
    if (props.modelValue.length > 0) {
      return `${props.modelValue.length} item(s) selected`
    }
  }

  // If the input is not multiple and the options are strings or numbers return the modelValue.
  if (
    typeof props.options[0] === 'string' ||
    typeof props.options[0] === 'number'
  ) {
    return props.modelValue
  }

  // If the input is not multiple and the options are objects return the text of the selected option.
  let selectedOptions = []
  if (typeof props.modelValue === 'number') {
    const option = props.options.find((option) => {
      return getOptionInfo.value(option, 'value') === props.modelValue
    })
    if (option) {
      selectedOptions.push(option)
    }
  } else if (Array.isArray(props.modelValue)) {
    selectedOptions = props.options.filter((option) => {
      return props.modelValue.includes(getOptionInfo.value(option, 'value'))
    })
  }

  return selectedOptions.map((option) => getOptionInfo.value(option, 'text'))
})

/**
 * Handle the selection of an option.
 *
 * @param {String|Object} option
 */
const handleSelect = (option) => {
  const value = getOptionInfo.value(option, 'value')

  // If the select is multiple, add or remove the value from the modelValue
  // before emittind the whole array.
  if (props.multiple) {
    const modelValue = props.modelValue.includes(value)
      ? props.modelValue.filter((val) => val !== value)
      : [...props.modelValue, value]

    emit('update:modelValue', modelValue)
    return
  }

  // If the select is not multiple, just emit the value.
  emit('update:modelValue', value)
  closeDropdown()
}

/**
 * Handle the search query.
 *
 * @returns {void}
 */
const handleSearchQuery = (event) => {
  filteredOptions.value = props.options.filter((option) => {
    const text = getOptionInfo.value(option, 'text')
    return text.toLowerCase().includes(event.toLowerCase())
  })
}

/**
 * Handle the toggle all event.
 *
 * @returns {void}
 */
const handleToggleAll = () => {
  if (props.modelValue.length === props.options.length) {
    emit('update:modelValue', [])
    return
  }

  const values = props.options.map((option) =>
    getOptionInfo.value(option, 'value')
  )
  emit('update:modelValue', values)
}

/**
 * Reset the input value when the "X" is clicked.
 *
 * @param {Event} event
 */
const reset = (event) => {
  if (props.multiple) emit('update:modelValue', [])
  else emit('update:modelValue', '')
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

/**
 * CSS remove button classes.
 *
 * @type {import ('vue').ComputedRef<string>}
 * @returns {string}
 */
const classRemoveButton = computed(() => {
  return {
    xs: ['w-4'],
    sm: ['w-5'],
    base: ['w-6'],
    lg: ['w-7'],
    xl: ['w-8'],
    '2xl': ['w-9'],
  }[props.size].join(' ')
})
</script>

<template>
  <div
    v-on-click-outside="onClickOutsideHandler"
    class="flex w-full flex-col"
    :class="{ 'opacity-50': readOnly || disabled }"
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
      class="flex cursor-pointer border border-nord-snow-storm-100 bg-white focus:border-nord-frost-300 dark:border-nord-400 dark:bg-nord-100"
      :class="{
        '!border-nord-aurora-200 dark:shadow-lg dark:shadow-nord-aurora-100/50': hasError,
        'rounded-full': shape === 'pill',
        'rounded-none': shape === 'square',
        rounded: shape === 'rounded',
      }"
      @click=";(readOnly || disabled) == false && toggleDropdown()"
    >
      <VIcon v-if="hasIcon" :icon="icon" :size="size" />

      <input
        :id="id"
        type="text"
        class="pointer-events-none w-full bg-transparent p-2 text-nord-300 caret-transparent dark:text-nord-snow-storm-300"
        :class="[$sizeToClass(size), $placeholderColors]"
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
          class="material-symbols-rounded absolute right-1 flex aspect-square cursor-pointer items-center justify-center rounded-full text-nord-300 hover:bg-nord-snow-storm-100/50 dark:text-nord-snow-storm-300 dark:hover:bg-nord-300/50"
          :class="[classRemoveButton, $sizeToClass(size)]"
          @click="reset"
        >
          clear
        </span>
      </div>

      <VIcon
        :icon="isDropdownOpen ? 'expand_less' : 'expand_more'"
        :size="size"
        side="right"
        :shape="shape"
      />
    </div>

    <VDropdown
      ref="dropdown"
      :options="options"
      :filtered-options="filteredOptions"
      :text-reducer="textReducer"
      :value-reducer="valueReducer"
      :size="size"
      :selected-options="modelValue"
      :shape="shape"
      :search="search"
      :show="isDropdownOpen"
      :multiple="multiple"
      @select="handleSelect($event)"
      @toggle-all="handleToggleAll"
      @on-search="handleSearchQuery"
    />
  </div>
</template>
