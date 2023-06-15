<script setup>
import { computed, defineProps, ref, defineEmits } from 'vue'
import { vOnClickOutside } from '@vueuse/components'
import VLabel from './Partials/V-Label.vue'
import VIcon from './Partials/V-Icon.vue'
import VDropdown from './Partials/Select/V-Dropdown.vue'
import VInputResetButton from './Partials/V-InputResetButton.vue'

/**
 * Component emits.
 *
 * @type {Object}
 */
const emit = defineEmits(['update:modelValue', 'select'])

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
   * The color of the select.
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
   * Whether the input is rounded.
   *
   * @type {Boolean}
   * @default true
   */
  rounded: {
    type: Boolean,
    default: true,
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

  /**
   * Whether the input is clearable.
   *
   * @type {Boolean}
   * @default true
   */
  clearButton: {
    type: Boolean,
    default: true,
  },

  /**
   * The maximum number of options that can be selected.
   * If the value is 0, there is no limit.
   *
   * @type {Number}
   * @default 0
   */
  max: {
    type: Number,
    default: 0,
  },
})

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
    emit('select', value)
    return
  }

  // If the select is not multiple, just emit the value.
  emit('update:modelValue', value)
  emit('select', value)
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
 * @returns {void}
 */
const reset = () => {
  if (props.multiple) emit('update:modelValue', [])
  else emit('update:modelValue', '')
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
    v-on-click-outside="onClickOutsideHandler"
    class="flex w-full flex-col"
    :class="{ 'opacity-50': props.disabled }"
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
      class="flex bg-nord-light-400 transition-all duration-100 ease-in-out dark:bg-nord-dark-100"
      :class="[
        {
          rounded: props.rounded,
          '!border-l-4 border-l-nord-red-300': props.error,
          'border-l-4': isDropdownOpen,
          'border-l-0': !isDropdownOpen,
          'border-nord-red-300': props.color === 'red' && isDropdownOpen,
          'border-nord-blue-300': props.color === 'blue' && isDropdownOpen,
          'border-nord-green-300': props.color === 'green' && isDropdownOpen,
          'border-nord-mauve-300': props.color === 'mauve' && isDropdownOpen,
          'border-nord-orange-300': props.color === 'orange' && isDropdownOpen,
          'border-nord-yellow-300': props.color === 'yellow' && isDropdownOpen,
        },
      ]"
      tabindex="0"
      @keydown="keyHandler"
      @click="!props.disabled && toggleDropdown()"
    >
      <VIcon
        v-if="props.icon"
        :icon="props.icon"
        :size="props.size"
        class="cursor-pointer"
      />

      <input
        :id="props.id"
        type="text"
        class="w-full cursor-pointer bg-transparent caret-transparent"
        :class="[
          $sizeToClass(props.size),
          {
            'px-2 py-2': props.icon,
            'px-3 py-2': !props.icon,
          },
        ]"
        :placeholder="props.placeholder"
        :value="inputValue"
        :required="props.required"
        :disabled="props.disabled"
        :aria-labelledby="props.label ? `${props.id}-label` : null"
        :aria-describedby="props.helper ? `${props.id}-helper` : null"
        @keydown.prevent
      />

      <template v-if="props.clearButton">
        <VInputResetButton
          :size="props.size"
          :model-value="props.modelValue"
          @reset="reset"
        />
      </template>

      <VIcon
        :icon="isDropdownOpen ? 'expand_less' : 'expand_more'"
        :size="props.size"
        side="right"
        class="cursor-pointer"
      />
    </div>

    <VDropdown
      ref="dropdown"
      :options="props.options"
      :filtered-options="filteredOptions"
      :text-reducer="props.textReducer"
      :value-reducer="props.valueReducer"
      :size="props.size"
      :selected-options="props.modelValue"
      :rounded="props.rounded"
      :search="props.search"
      :show="isDropdownOpen"
      :color="props.color"
      :multiple="props.multiple"
      :max="props.max"
      @select=";[handleSelect($event), emit('select', $event)]"
      @toggle-all="handleToggleAll"
      @on-search="handleSearchQuery"
    />
  </div>
</template>
