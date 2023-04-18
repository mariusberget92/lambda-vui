<script setup>
import { defineProps, computed, ref, defineEmits } from 'vue'
import { vOnClickOutside } from '@vueuse/components'
import VLabel from './Partials/V-Label.vue'
import VIcon from './Partials/V-Icon.vue'
import VDropdown from './Partials/Tagger/V-Dropdown.vue'

/**
 * Component emits.
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
  { ignore: [] },
]

/**
 * Component props.
 *
 * @type {Object}
 */
const props = defineProps({
  /**
   * The ID of the tagger.
   * If none is provided, a random one will be generated.
   *
   * @type {String}
   * @required
   * @default lambda-tagger-<random>
   */
  id: {
    type: String,
    default: () => {
      return 'lambda-tagger-' + Math.random().toString(36).substring(2, 9)
    },
  },

  /**
   * An array of options to be displayed in the dropdown component.
   * @prop {Array} selectOptions - The options to be displayed.
   * @prop {Object} selectOptions[] - An object representing an option in the select component.
   * @prop {string} selectOptions[].text - The text to be displayed for the option.
   * @prop {string} selectOptions[].value - The value of the option (you can use other properties, see text and valueReducer).
   * @prop {string} selectOptions[].emoji - The emoji associated with the option (optional)
   *
   * @type {Array<String>|Array<Object>}
   * @required
   */
  options: {
    type: Array,
    required: true,
  },

  /**
   * Model value of the tagger.
   *
   * @type {Array}
   * @default []
   * @required
   */
  modelValue: {
    type: Array,
    default: () => {
      return []
    },
    required: true,
  },

  /**
   * Tagger size.
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
   * The label of the tagger.
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
   * The helper text of the tagger.
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
   * Whether the tagger is required.
   *
   * @type {Boolean}
   * @default false
   */
  required: {
    type: Boolean,
    default: false,
  },

  /**
   * The icon of the tagger.
   *
   * @type {String|Boolean}
   * @default false
   */
  icon: {
    type: [String, Boolean],
    default: false,
  },

  /**
   * The placeholder of the tagger.
   *
   * @type {String}
   * @default 'Select...'
   */
  placeholder: {
    type: String,
    default: '',
  },

  /**
   * Whether the tagger is read-only.
   *
   * @type {Boolean}
   * @default false
   */
  readOnly: {
    type: Boolean,
    default: false,
  },

  /**
   * Whether the tagger is disabled.
   *
   * @type {Boolean}
   * @default false
   */
  disabled: {
    type: Boolean,
    default: false,
  },

  /**
   * Wheter the tagger has an error.
   *
   * @type {String|Boolean}
   * @default false
   */
  error: {
    type: [String, Boolean],
    default: false,
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
 * The value of the input.
 *
 * @type {String}
 */
const search = ref('')

/**
 * Whether the dropdown is open.
 *
 * @type {Boolean}
 */
const isDropdownOpen = ref(false)

/**
 * Handle search input.
 *
 * @param {Event} e - The event.
 */
const handleSearch = (e) => {
  if (!isDropdownOpen.value) {
    openDropdown()
  }

  search.value = e.target.value
}

/**
 * Handle auto-complete.
 * When thhe user presses Tab when there is a suggestion option,
 * that option is added to the model value.
 *
 * @param {Event} e - The event.
 * @returns {void}
 */
const handleAutocomplete = (e) => {
  if (suggestedOptionText.value && search.value !== '') {
    let value = getValueFromText(suggestedOptionText.value)
    add(value)
  }
  e.preventDefault()
}

/**
 * Handle backspace.
 * When the users hits backspace when there is no input to the search field,
 * then the last tag is removed.
 *
 * @returns {void}
 */
const handleBackspace = () => {
  if (!search.value && props.modelValue.length > 0) {
    remove(props.modelValue[props.modelValue.length - 1])
  }
}

/**
 * FilteredOptions.
 * Every option except the ones that are already selected.
 * If there is a search value, then every option that matches the search value, will be filtered out.
 *
 * @type {Array}
 * @returns {Array}
 */
const filteredOptions = computed(() => {
  const searchValue = search.value.trim()
  if (searchValue.length < 0) {
    return props.options.filter(
      (option) => !props.modelValue.includes(getOptionValue(option))
    )
  }

  const regex = new RegExp(`^${searchValue}`)

  return props.options.filter((option) => {
    const optionText = getOptionText(option)

    return (
      !props.modelValue.includes(getOptionValue(option)) &&
      regex.test(optionText)
    )
  })
})

/**
 * Generate the value of an option from its text.
 * We are just choosing the first option from the filtered options.
 *
 * @param {String} text - The text of the option.
 * @returns {String}
 */
const suggestedOptionText = computed(() => {
  let suggestedOption =
    filteredOptions.value.length > 0
      ? getOptionText(filteredOptions.value[0])
      : null

  return suggestedOption
})

/**
 * Get the value of an option.
 *
 * @param {String|Object} option
 * @return {String}
 */
const getOptionValue = (option) => {
  if (typeof option === 'string' || typeof option === 'number') {
    return option
  } else {
    return props.valueReducer(option)
  }
}

/**
 * Get the text of an option.
 *
 * @param {String|Object} option
 * @return {String}
 */
const getOptionText = (option) => {
  if (typeof option === 'string' || typeof option === 'number') {
    return option
  } else {
    return props.textReducer(option)
  }
}

/**
 * Get the value of an option from its text.
 *
 * @param {String} text
 * @return {String}
 */
const getValueFromText = (text) => {
  const option = props.options.find((option) => getOptionText(option) === text)
  return option ? getOptionValue(option) : ''
}

/**
 * Get the text of an option from its value.
 *
 * @param {String} value
 * @return {String}
 */
const getTextFromValue = (value) => {
  const option = props.options.find(
    (option) => getOptionValue(option) === value
  )
  return option ? getOptionText(option) : ''
}

/**
 * Add a value to the model.
 *
 * @param {String} value
 * @return {void}
 */
const add = (option) => {
  const value = getOptionValue(option)
  if (!props.modelValue.includes(value)) {
    emit('update:modelValue', [...props.modelValue, value])
  }
}

/**
 * Remove a value from the model.
 *
 * @param {String} value
 * @return {void}
 */
const remove = (value) => {
  emit(
    'update:modelValue',
    props.modelValue.filter((v) => v !== value)
  )
}

/**
 * Close the dropdown.
 *
 * @return {void}
 */
const closeDropdown = () => {
  isDropdownOpen.value = false
}

/**
 * Open the dropdown.
 *
 * @return {void}
 */
const openDropdown = () => {
  isDropdownOpen.value = true
}

/**
 * Toggle the dropdown.
 *
 * @return {void}
 */
const toggleDropdown = () => {
  isDropdownOpen.value = !isDropdownOpen.value
}

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
 * CSS size classes.
 *
 * @type {import ('vue').ComputedRef<string>}
 * @returns {string}
 */
const classSize = computed(() => {
  return {
    xs: ['text-xs'],
    sm: ['text-xs'],
    base: ['text-sm'],
    lg: ['text-base'],
    xl: ['text-base'],
    '2xl': ['text-lg'],
  }[props.size].join(' ')
})

/**
 * CSS padding classes.
 *
 * @type {import ('vue').ComputedRef<string>}
 * @returns {string}
 */
const classPadding = computed(() => {
  return {
    xs: ['px-2', 'py-2'],
    sm: ['px-2', 'py-2'],
    base: ['px-3', 'py-2'],
    lg: ['px-3', 'py-3'],
    xl: ['px-4', 'py-3'],
    '2xl': ['px-4', 'py-4'],
  }[props.size].join(' ')
})

/**
 * CSS error classes.
 *
 * @type {import ('vue').ComputedRef<Object>}
 * @returns {Object}
 */
const classError = computed(() => {
  return [
    'border-l-4',
    '!border-l-nord-aurora-200',
    'dark:shadow-[-10px_0_10px]',
    'dark:shadow-nord-aurora-100/25',
  ].join(' ')
})

/**
 * Input error classes.
 * We have to do this because using computed properties directly in the :class attribute,
 * is not supported by Vue 3.
 *
 * @type {import ('vue').ComputedRef<string>}
 */
const getInputErrorClasses = () => {
  return hasError.value && !hasIcon.value ? classError.value : ''
}

/**
 * Icon error classes.
 * We have to do this because using computed properties directly in the :class attribute,
 * is not supported by Vue 3.
 *
 * @type {import ('vue').ComputedRef<string>}
 */
const getIconErrorClasses = () => {
  return hasError.value ? classError.value : ''
}

/**
 * Get the size classes.
 * We have to do this because using computed properties directly in the :class attribute,
 * is not supported by Vue 3.
 *
 * @type {import ('vue').ComputedRef<string>}
 */
const getPaddingClasses = () => {
  return classPadding.value
}
</script>

<template>
  <div
    class="flex flex-col w-full"
    :class="{ 'opacity-50': disabled }"
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
      class="mt-1 flex cursor-pointer"
      @click=";(readOnly || disabled) == false && toggleDropdown()"
    >
      <VIcon
        v-if="hasIcon"
        :icon="icon"
        :size="size"
        :class="getIconErrorClasses()"
      />

      <div
        :class="[{ 'border-l rounded-l': !hasIcon }, getPaddingClasses()]"
        class="flex w-full flex-wrap gap-1 items-baseline border-t w-full border-b border-nord-snow-storm-100 focus:border-nord-snow-storm-100 dark:border-nord-400 dark:focus:border-nord-400 bg-nord-snow-storm-300 dark:bg-nord-100 text-nord-300 dark:text-nord-snow-storm-300"
      >
        <span
          v-for="tag in modelValue"
          :key="tag"
          @mousedown.prevent="remove(tag)"
          class="bg-nord-frost-300 text-white rounded px-2 whitespace-nowrap cursor-pointer"
          :class="classSize"
        >
          {{ getTextFromValue(tag) }}
        </span>

        <div class="relative flex items-center">
          <input
            type="text"
            class="py-0 px-1 border-none w-32 max-w-32 bg-nord-snow-storm-300 dark:bg-nord-100 text-nord-300 dark:text-nord-snow-storm-300 placeholder:text-nord-300/50 dark:placeholder:text-nord-snow-storm-300/50"
            :class="[classSize, getInputErrorClasses()]"
            :placeholder="placeholder"
            :required="required"
            :disabled="disabled"
            :readonly="readOnly"
            :aria-labelledby="hasLabel ? `${id}-label` : null"
            :aria-describedby="hasLabel ? `${id}-helper` : null"
            @keydown.tab.prevent="handleAutocomplete"
            @keydown.backspace="handleBackspace"
            @input="handleSearch"
          />

          <div
            v-if="search.length > 0 && filteredOptions.length > 0"
            :class="[classSize, classPadding]"
            class="pointer-events-none bg-transparent absolute left-1 right-0 top-0 text-nord-300 dark:text-nord-snow-storm-300 opacity-50 whitespace-nowrap"
          >
            {{ suggestedOptionText }}
          </div>
        </div>
      </div>

      <VIcon
        :icon="isDropdownOpen ? 'expand_less' : 'expand_more'"
        :size="size"
        side="right"
      />
    </div>

    <VDropdown
      v-if="filteredOptions.length > 0 && isDropdownOpen"
      ref="dropdown"
      :options="filteredOptions"
      :textReducer="textReducer"
      :valueReducer="valueReducer"
      :size="size"
      :modelValue="modelValue"
      :show="isDropdownOpen"
      @add="add($event)"
    />
  </div>
</template>
