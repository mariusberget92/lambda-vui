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
  { ignore: [] },
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
   * @type {String|False}
   * @default false
   * @required
   */
  modelValue: {
    type: [String, Boolean],
    default: false,
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

  /**
   * Whether or not to show the datepicker.
   *
   * @type {Boolean}
   * @default true
   */
  datePicker: {
    type: Boolean,
    default: true,
  },

  /**
   * Whether or not to show the timepicker.
   *
   * @type {Boolean}
   * @default false
   */
  timePicker: {
    type: Boolean,
    default: false,
  },

  /**
   * The color of the datepicker buttons.
   *
   * @type {String}
   * @default blue
   * @options red, green, blue, orange, yellow, mauve
   */
  color: {
    type: String,
    default: 'blue',
    validator: (val) => {
      return ['red', 'green', 'blue', 'orange', 'mauve'].includes(val)
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
 * Whether the dropdown is open or not.
 *
 * @type {import('vue').Ref<boolean>}
 */
const isDropdownOpen = ref(false)

/**
 * Close or toggle the dropdown.
 *
 * @returns {void}
 */
const closeDropdown = () => {
  isDropdownOpen.value = false
}

const toggleDropdown = () => {
  isDropdownOpen.value = !isDropdownOpen.value
}

/**
 * Handle the select event.
 *
 * @param {Object} event
 */
const handleSelect = (event) => {
  if (event == false) {
    emit('update:modelValue', '')
    return
  }
  const day = event.day.toString().padStart(2, '0')
  const month = event.month.toString().padStart(2, '0')
  const year = event.year.toString()
  const hour = event.hour.toString()
  const minute = event.minute.toString()

  const formattedDate = `${year}-${month}-${day}`
  const formattedTime = `${hour}:${minute}`
  const formattedDateTime = `${formattedDate} ${formattedTime}`

  if (props.datePicker && props.timePicker) {
    emit('update:modelValue', formattedDateTime)
  } else if (props.datePicker && !props.timePicker) {
    emit('update:modelValue', formattedDate)
  } else if (props.timePicker && !props.datePicker) {
    emit('update:modelValue', formattedTime)
  }
}

/**
 * Using provide/inject for some stuff that is not possible with props.
 *
 * @type {import('vue').Ref<boolean>}
 * @type {import('vue').Ref<string>}
 */
const shouldReset = ref(false)
const keyToSend = ref('')
provide('reset', shouldReset)
provide('sendKey', keyToSend)

/**
 * Handle the reset event.
 *
 * @returns {void}
 */
const reset = () => {
  emit('update:modelValue', '')
}

/**
 * Handle the key event.
 *
 * @param {KeyboardEvent} event
 * @returns {void}
 */
const keyHandler = (event) => {
  keyToSend.value = event.key
  if (event.key === 'Escape') {
    closeDropdown()
  }
  event.stopPropagation()
}
</script>

<template>
  <div
    v-on-click-outside="onClickOutsideHandler"
    class="flex w-full flex-col"
    :class="{ 'opacity-50': disabled }"
  >
    <VLabel
      v-if="props.label !== false"
      :id="id"
      :label="label"
      :required="required"
      :helper="helper"
      :size="size"
    />

    <div
      class="flex border border-nord-light-100 bg-transparent transition-all duration-300 ease-in-out focus-within:border-nord-blue-300 dark:border-nord-light-100/25 focus-within:dark:border-nord-blue-300 focus-within:dark:shadow-lg focus-within:dark:shadow-nord-blue-100/25"
      :class="{
        '!border-nord-red-300 dark:shadow-lg dark:!shadow-nord-red-100/25':
          props.error !== false,
        'rounded-full': shape === 'pill',
        'rounded-none': shape === 'square',
        rounded: shape === 'rounded',
      }"
      tabindex="0"
      @keydown="keyHandler"
      @click="disabled == false && toggleDropdown()"
    >
      <VIcon v-if="props.icon !== false" :icon="icon" :size="size" />

      <input
        :id="id"
        type="text"
        class="w-full cursor-pointer bg-transparent p-2 caret-transparent"
        :class="[$sizeToClass(size)]"
        :placeholder="placeholder"
        :value="modelValue"
        :required="required"
        :disabled="disabled"
        :aria-labelledby="props.label !== false ? `${id}-label` : null"
        :aria-describedby="props.helper !== false ? `${id}-helper` : null"
        @keydown.prevent
      />

      <div class="relative flex items-center">
        <span
          v-if="modelValue.length > 0"
          class="material-symbols-rounded absolute right-1 flex aspect-square cursor-pointer items-center justify-center rounded-full text-nord-dark-300 duration-300 hover:bg-nord-light-300 dark:text-nord-light-300 dark:hover:bg-nord-dark-300"
          :class="[classRemoveButton, $sizeToClass(size)]"
          @click.stop.prevent="reset"
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
      :date-picker="datePicker"
      :time-picker="timePicker"
      :color="color"
      @select="handleSelect($event)"
      @close-dropdown="closeDropdown"
      @reset="reset"
    />
  </div>
</template>
