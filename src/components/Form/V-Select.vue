<script setup>
import { computed, defineProps, ref, defineEmits } from 'vue'
import { vOnClickOutside } from '@vueuse/components'
import VLabel from './Partials/V-Label.vue'
import VIcon from './Partials/V-Icon.vue'
import VDropdown from './Partials/Select/V-Dropdown.vue'

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
   * @type {String}
   * @default ''
   */
  modelValue: {
    type: [String, Array],
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
   * The options of the input.
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
  selectOptionsValue: {
    type: Function,
    default: (option) => option.value,
  },

  /**
   * Reduce to get the text of an option.
   *
   * @type {Function}
   */
  selectOptionsText: {
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

    const fn =
      type === 'text' ? props.selectOptionsText : props.selectOptionsValue
    return fn(option)
  }
})

/**
 * CSS error classes.
 *
 * @type {import ('vue').ComputedRef<Object>}
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
 * @type {import ('vue').ComputedRef<Object>}
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
 * All selected options, either single or multi.
 * We use an array for both bases. The tags display is displayed differently based on the prop: multiple.
 *
 * @type {import('vue').Ref<Array>}
 */
const selectedOptions = ref([])

/**
 * Handle the selection of an option when multiple is false.
 *
 * @param {String|Object} option
 */
const handleSelectSingle = (option) => {
  const value = getOptionInfo.value(option, 'value')
  selectedOptions.value = [option]
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

  if (selectedOptions.value.includes(value)) {
    removeValue(value)
    emit('upade:modelValue', selectedOptions.value)
    return
  }

  selectedOptions.value.push(value)
  emit('upade:modelValue', selectedOptions.value)
}

/**
 * Remove a given value from the selected options.
 *
 * @param {String} value
 * @returns {void}
 */
function removeValue(value) {
  selectedOptions.value = selectedOptions.value.filter((option) => {
    return getOptionInfo.value(option, 'value') !== value
  })
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
  <div class="flex flex-col">
    <VLabel
      v-if="hasLabel"
      :id="id"
      :label="label"
      :required="required"
      :helper="helper"
      :size="size"
    />

    <div
      class="flex mt-1"
      @click="isDropdownOpen = !isDropdownOpen"
      v-on-click-outside="onClickOutsideHandler"
    >
      <VIcon
        v-if="hasIcon"
        :icon="icon"
        :size="size"
        :readOnly="readOnly"
        :class="classesError"
        class="cursor-pointer"
      />

      <input
        :id="id"
        :placeholder="placeholder"
        :required="required"
        :readonly="readOnly"
        :class="classesInput"
        type="text"
        :value="modelValue"
        @keydown.prevent
      />

      <VIcon
        :icon="isDropdownOpen ? 'expand_less' : 'expand_more'"
        :size="size"
        :readOnly="readOnly"
        side="right"
        class="cursor-pointer"
      />
    </div>

    <VDropdown
      :selectOptions="selectOptions"
      :selectOptionsText="selectOptionsText"
      :selectOptionsValue="selectOptionsValue"
      :size="size"
      :multiple="multiple"
      @select="
        multiple ? handleSelectMultiple($event) : handleSelectSingle($event)
      "
      :show="isDropdownOpen"
    />
  </div>
</template>
