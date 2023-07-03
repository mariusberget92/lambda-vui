<script setup>
import { defineProps, ref, defineEmits, provide } from 'vue'
import { vOnClickOutside } from '@vueuse/components'
import VLabel from './Partials/V-Label.vue'
import VIcon from './Partials/V-Icon.vue'
import VDropdown from './Partials/Datepicker/V-Dropdown.vue'
import VInputResetButton from './Partials/V-InputResetButton.vue'

/**
 * Component emits.
 *
 * @type {Object}
 */
const emit = defineEmits(['update:modelValue', 'change'])

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
   * Whether the datepicker is rounded or not.
   *
   * @type {Boolean}
   * @default true
   */
  rounded: {
    type: Boolean,
    default: true,
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
      return ['red', 'green', 'blue', 'orange', 'yellow', 'mauve'].includes(val)
    },
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
    emit('change', '')
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
    emit('change', formattedDateTime)
  } else if (props.datePicker && !props.timePicker) {
    emit('update:modelValue', formattedDate)
    emit('change', formattedDate)
  } else if (props.timePicker && !props.datePicker) {
    emit('update:modelValue', formattedTime)
    emit('change', formattedTime)
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
      @click="!disabled && toggleDropdown()"
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
        :value="props.modelValue"
        :required="props.required"
        :disabled="props.disabled"
        :aria-labelledby="props.label ? `${props.id}-label` : null"
        :aria-describedby="props.helper ? `${props.id}-helper` : null"
        @keydown.prevent
      />

      <template v-if="clearButton">
        <VInputResetButton
          :size="props.size"
          :model-value="props.modelValue"
          @reset="reset"
        />
      </template>

      <VIcon
        icon="calendar_month"
        :size="props.size"
        side="right"
        class="cursor-pointer"
      />
    </div>

    <VDropdown
      ref="dropdown"
      :size="props.size"
      :rounded="props.rounded"
      :selected-date="props.modelValue"
      :show="isDropdownOpen"
      :date-picker="props.datePicker"
      :time-picker="props.timePicker"
      :color="props.color"
      @select="handleSelect($event)"
      @close-dropdown="closeDropdown"
      @reset="reset"
    />
  </div>
</template>
