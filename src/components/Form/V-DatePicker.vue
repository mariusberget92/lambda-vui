<script setup>
import { defineProps, computed, ref, defineEmits, provide } from 'vue'
import { vOnClickOutside } from '@vueuse/components'
import VLabel from './Partials/V-Label.vue'
import VIcon from './Partials/V-Icon.vue'
import VDropdown from './Partials/Datepicker/V-Dropdown.vue'

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

  /**
   * The shape of the datepicker.
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
 * Handle the select event.
 *
 * @param {Object} event
 */
const handleSelect = (event) => {
  const day = event.day.toString().padStart(2, '0')
  const month = event.month.toString().padStart(2, '0')
  const year = event.year

  const formattedDate = `${year}-${month}-${day}`
  emit('update:modelValue', formattedDate)
}

/**
 * Using provide/inject for some stuff that is not possible with props.
 *
 * @type {import('vue').Ref<boolean>}
 * @type {import('vue').Ref<string>}
 */
const doReset = ref(false)
const sendKey = ref('')
provide('reset', doReset)
provide('sendKey', sendKey)

/**
 * Handle the reset event.
 *
 * @param {Event} event
 * @returns {void}
 */
const reset = (event) => {
  emit('update:modelValue', '')
  doReset.value = true
  event.stopPropagation()
}

/**
 * Handle the key event.
 *
 * @param {KeyboardEvent} event
 * @returns {void}
 */
const keyHandler = (event) => {
  sendKey.value = event.key
  setTimeout(() => {
    sendKey.value = ''
  }, 100)
  event.stopPropagation()
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
      class="flex cursor-pointer border border-nord-snow-storm-100 bg-white dark:border-nord-400 dark:bg-nord-100"
      :class="{
        '!border-nord-aurora-200 dark:shadow-lg dark:shadow-nord-aurora-100/50': hasError,
        'rounded-full': shape === 'pill',
        'rounded-none': shape === 'square',
        rounded: shape === 'rounded',
      }"
      tabindex="0"
      @keydown="keyHandler"
      @click=";(readOnly || disabled) == false && toggleDropdown()"
    >
      <VIcon v-if="hasIcon" :icon="icon" :size="size" />

      <input
        :id="id"
        type="text"
        class="pointer-events-none w-full bg-transparent p-2 text-nord-300 caret-transparent dark:text-nord-snow-storm-300"
        :class="[$sizeToClass(size), $placeholderColors]"
        :placeholder="placeholder"
        :value="modelValue"
        :required="required"
        :readonly="readOnly"
        :disabled="disabled"
        :aria-labelledby="hasLabel ? `${id}-label` : null"
        :aria-describedby="hasLabel ? `${id}-helper` : null"
      />

      <div class="relative flex items-center">
        <span
          v-if="modelValue.length > 0"
          class="material-symbols-rounded absolute right-1 flex aspect-square cursor-pointer items-center justify-center rounded-full text-nord-300 hover:bg-nord-snow-storm-100 dark:text-nord-snow-storm-300 hover:dark:bg-nord-300"
          :class="[classRemoveButton, $sizeToClass(size)]"
          @click="reset"
        >
          clear
        </span>
      </div>

      <VIcon icon="calendar_month" :size="size" side="right" />
    </div>

    <VDropdown
      ref="dropdown"
      :size="size"
      :shape="shape"
      :selected-date="modelValue"
      :show="isDropdownOpen"
      @select="handleSelect($event)"
    />
  </div>
</template>
