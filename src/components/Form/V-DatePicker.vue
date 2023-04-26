<script setup>
import { defineProps, computed, ref, defineEmits } from 'vue'
import { vOnClickOutside } from '@vueuse/components'
import VLabel from './Partials/V-Label.vue'
import VIcon from './Partials/V-Icon.vue'
import VDropdown from './Partials/Datepicker/V-Dropdown.vue'

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
 * Define the component emits.
 *
 * @type {Object}
 */
const emit = defineEmits(['update:modelValue', 'dateChange', 'timeChange'])

/**
 * Component props.
 *
 * @type {Object}
 */
const props = defineProps({
  /**
   * The ID of the datepicker.
   * If none is provided, a random one will be generated.
   *
   * @type {String}
   * @required
   * @default lambda-datepicker-<random>
   */
  id: {
    type: String,
    default: () => {
      return 'lambda-datepicker-' + Math.random().toString(36).substring(2, 9)
    },
  },

  /**
   * Model value of the datepicker.
   *
   * @type {String}
   * @default ''
   * @required
   */
  modelValue: {
    type: String,
    default: '',
    required: true,
  },

  /**
   * The size of the datepicker.
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
   * The icon of the datepicker.
   *
   * @type {String|Boolean}
   * @default false
   */
  icon: {
    type: [String, Boolean],
    default: false,
  },

  /**
   * The placeholder of the datepicker.
   *
   * @type {String}
   * @default ''
   */
  placeholder: {
    type: String,
    default: '',
  },

  /**
   * Whether the datepicker is disabled.
   *
   * @type {Boolean}
   * @default false
   */
  disabled: {
    type: Boolean,
    default: false,
  },

  /**
   * Wheter the datepicker is readonly.
   *
   * @type {Boolean}
   * @default false
   */
  readOnly: {
    type: Boolean,
    default: false,
  },

  /**
   * The label of the datepicker.
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
   * The helper text of the datepicker.
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
   * Whether the datepicker is required.
   *
   * @type {Boolean}
   * @default false
   */
  required: {
    type: Boolean,
    default: false,
  },

  /**
   * Wheter the datepicker has an error.
   *
   * @type {String|Boolean}
   * @default false
   */
  error: {
    type: [String, Boolean],
    default: false,
  },
})

/**
 * CSS error classes.
 *
 * @type {import ('vue').ComputedRef<string>}
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

/**
 * Whether the input has a label.
 *
 * @type {import('vue').ComputedRef<boolean>}
 */
const hasLabel = computed(() => props.label !== false)

/**
 * Whether the input has an error.
 *
 * @type {import('vue').ComputedRef<boolean>}
 */
const hasError = computed(() => props.error !== false)

/**
 * Whether the input has an icon.
 *
 * @type {import('vue').ComputedRef<boolean>}
 */
const hasIcon = computed(() => props.icon !== false)

/**
 * Datepicker error classes.
 * We have to do this because using computed properties directly in the :class attribute,
 * is not supported by Vue 3.
 *
 * @type {import ('vue').ComputedRef<string>}
 */
const getInputErrorClasses = () => {
  return hasError.value && !hasIcon.value ? classError.value : ''
}

/**
 * Datepicker error classes.
 * We have to do this because using computed properties directly in the :class attribute,
 * is not supported by Vue 3.
 *
 * @type {import ('vue').ComputedRef<string>}
 */
const getIconErrorClasses = () => {
  return hasError.value ? classError.value : ''
}

/**
 * Selected date in the format YYYY-MM-DD.
 *
 * @type {import('vue').Ref<string>}
 */
const selectedDate = ref('')

/**
 * Selected time in the format HH:MM.
 *
 * @type {import('vue').Ref<string>}
 */
const selectedTime = ref('')

/**
 * Whether the dropdown is open or not.
 *
 * @type {import('vue').Ref<boolean>}
 */
const isDropdownOpen = ref(false)

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
 * Reset the datepicker.
 *
 * @returns {void}
 */
const reset = () => {
  selectedDate.value = ''
  selectedTime.value = ''
  emit('update:modelValue', '')
}
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
      class="mt-1 flex cursor-pointer"
      @click=";(readOnly || disabled) == false && toggleDropdown()"
    >
      <VIcon
        v-if="hasIcon"
        :icon="icon"
        :size="size"
        :class="getIconErrorClasses()"
      />

      <input
        :id="id"
        type="text"
        class="w-full cursor-pointer rounded rounded-r-none border border-r-0 border-nord-snow-storm-100 bg-nord-snow-storm-300 text-nord-300 caret-transparent placeholder:text-nord-300/50 focus:border-nord-snow-storm-100 dark:border-nord-400 dark:bg-nord-100 dark:text-nord-snow-storm-300 dark:placeholder:text-nord-snow-storm-300/50 dark:focus:border-nord-400"
        :class="[
          classInput,
          $sizeToClass(size),
          getInputErrorClasses(),
          { 'rounded-l-none border-l-0': hasIcon },
        ]"
        :placeholder="placeholder"
        :value="modelValue"
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
          class="material-symbols-rounded absolute right-1 flex aspect-square cursor-pointer items-center justify-center rounded-full text-nord-300 hover:bg-nord-snow-storm-100 dark:text-nord-snow-storm-300 hover:dark:bg-nord-300"
          :class="[classRemoveButton, classSize]"
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
      :size="size"
      :selected-date="selectedDate"
      :selected-time="selectedTime"
      :show="isDropdownOpen"
      @select="handleSelect($event)"
    />
  </div>
</template>
