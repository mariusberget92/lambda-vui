<script setup>
import {
  defineProps,
  onMounted,
  ref,
  computed,
  defineEmits,
  inject,
  watch,
  provide,
  nextTick,
} from 'vue'
import VPagination from './V-Pagination.vue'
import VDatePicker from './V-DatePicker.vue'
import VTimePicker from './V-TimePicker.vue'

/**
 * Component emits.
 *
 * @property {Object} select - Emits when a date is selected.
 * @property {Boolean} closeDropdown - Emits when the dropdown is closed.
 * @property {Boolean} reset - Emits when the datepicker is reset.
 */
const emit = defineEmits(['select', 'closeDropdown', 'reset'])

/**
 * Component props.
 *
 * @property {String|Boolean} selectedDate - The selected date (YYYY-MM-DD H:i).
 * @property {Boolean} show - Whether the dropdown is visible.
 * @property {String} size - The datepicker size.
 * @property {Boolean} rounded - Whether the datepicker is rounded.
 * @property {Boolean} datePicker - Whether or not to show the datepicker.
 * @property {Boolean} timePicker - Whether or not to show the timepicker.
 * @property {String} color - The color of the datepicker.
 * 
 */
const props = defineProps({
  /**
   * The selected date (YYYY-MM-DD H:i).
   */
  selectedDate: {
    type: [String, Boolean],
    default: false,
  },

  /**
   * Whether the dropdown is visible.
   */
  show: {
    type: Boolean,
    default: false,
  },

  /**
   * The datepicker size.
   * 
   * @values xs, sm, base, lg, xl, 2xl
   */
  size: {
    type: String,
    default: 'sm',
    validator: (val) => {
      return ['xs', 'sm', 'base', 'lg', 'xl', '2xl'].includes(val)
    },
  },

  /**
   * Whether the datepicker is rounded.
   */
  rounded: {
    type: Boolean,
    default: true,
  },

  /**
   * Whether or not to show the datepicker.
   */
  datePicker: {
    type: Boolean,
    default: true,
  },

  /**
   * Whether or not to show the timepicker.
   */
  timePicker: {
    type: Boolean,
    default: false,
  },

  /**
   * The color of the datepicker.
   * 
   * @values red, green, blue, orange, yellow, mauve
   */
  color: {
    type: String,
    default: 'blue',
    validator: (val) => {
      return ['red', 'green', 'blue', 'orange', 'yellow', 'mauve'].includes(val)
    },
  },
})

/**
 * Selected day, month, year, hour and minute refs.
 *
 * @type {Number}
 */
const selectedDay = ref(0)
const selectedMonth = ref(0)
const selectedYear = ref(0)
const selectedHour = ref(0)
const selectedMinute = ref(0)

/**
 * Provide selected date refs.
 */
provide('selectedDay', selectedDay)
provide('selectedMonth', selectedMonth)
provide('selectedYear', selectedYear)
provide('selectedHour', selectedHour)
provide('selectedMinute', selectedMinute)

/**
 * When mounted set selected date before anything else.
 */
onMounted(() => {
  const date = props.selectedDate 
    ? new Date(props.selectedDate) 
    : new Date()

  selectedDay.value = date.getDate()
  selectedMonth.value = date.getMonth() + 1
  selectedYear.value = date.getFullYear()

  // Set selected hour and minute if timepicker is enabled.
  if (props.timePicker) {
    selectedHour.value = date.getHours().toString().padStart(2, '0')
    selectedMinute.value = date.getMinutes().toString().padStart(2, '0')
  }
})

/**
 * Watch for changes to selected date / time and emit the select event when
 * changes are detected.
 */
watch(
  [selectedDay, selectedMonth, selectedYear, selectedHour, selectedMinute],
  ([day, month, year, hour, minute]) => {
    emit('select', { day, month, year, hour, minute })
  }
)

/**
 * How many days are in the selected month.
 *
 * @returns {Number}
 */
const daysInMonth = computed(() => {
  return new Date(selectedYear.value, selectedMonth.value, 0).getDate()
})

/**
 * Dropdown classes to get the correct width based on size.
 *
 * @returns {String}
 */
const classDropdownWidth = computed(() => {
  return {
    xs: ['w-[340px]', 'max-w-[340px]'],
    sm: ['w-[370px]', 'max-w-[370px]'],
    base: ['w-[400px]', 'max-w-[400px]'],
    lg: ['w-[435px]', 'max-w-[435px]'],
    xl: ['w-[470px]', 'max-w-[470px]'],
    '2xl': ['w-[540px]', 'max-w-[540px]'],
  }[props.size].join(' ')
})

/**
 * Set the selected date to today.
 *
 * @returns {Void}
 */
const setToday = () => {
  const today = new Date()

  // We need to fake a change in the selected date to trigger the watcher.
  // We also need to wait for the next tick to do so.
  selectedDay.value = 0
  selectedMonth.value = 0
  selectedYear.value = 0

  nextTick(() => {
    selectedDay.value = today.getDate()
    selectedMonth.value = today.getMonth() + 1
    selectedYear.value = today.getFullYear()
  })
}

/**
 * Set the selected hour/minute to now.
 *
 * @returns {Void}
 */
const setNow = () => {
  const timeNow = new Date()

  // We need to fake a change in the selected time to trigger the watcher.
  // We also need to wait for the next tick to do so.
  selectedHour.value = 0
  selectedMinute.value = 0

  nextTick(() => {
    selectedHour.value = timeNow.getHours().toString().padStart(2, '0')
    selectedMinute.value = timeNow.getMinutes().toString().padStart(2, '0')
  })
}

/**
 * Injections.
 *
 * @type {import('vue').Inject}
 */
const shouldReset = inject('reset')
const keyToSend = inject('sendKey')

/**
 * Watch for changes to the reset injection and reset the selected date if
 * changes are detected.
 */
watch(
  shouldReset,
  (reset) => {
    const shouldResetRef = ref(reset)

    if (shouldResetRef.value) {
      const today = new Date()
      selectedDay.value = today.getDate()
      selectedMonth.value = today.getMonth() + 1
      selectedYear.value = today.getFullYear()
      if (props.timePicker) {
        selectedHour.value = today.getHours().toString().padStart(2, '0')
        selectedMinute.value = today.getMinutes().toString().padStart(2, '0')
      }
    }
  }
)

/**
 * Watch for changes to the key injection and send the key if changes are
 * detected.
 */
watch(
  keyToSend,
  (key) => {
    const keyToSendRef = ref(key)

    if (keyToSendRef.value !== '') {
      keyHandler(key)
    }
  }
)

/**
 * Key constants.
 */
const KEY_LEFT_ARROW = 'ArrowLeft'
const KEY_RIGHT_ARROW = 'ArrowRight'
const KEY_UP_ARROW = 'ArrowUp'
const KEY_DOWN_ARROW = 'ArrowDown'
const KEY_PAGE_UP = 'PageUp'
const KEY_PAGE_DOWN = 'PageDown'
const KEY_HOME = 'Home'
const KEY_END = 'End'
const KEY_DELETE = 'Delete'
const KEY_INSERT = 'Insert'
const KEY_ESC = 'Escape'

/**
 * Key handler.
 *
 * @param {String} key - The key string.
 * @returns {Void}
 */
const keyHandler = (key) => {
  switch (key) {
    case KEY_LEFT_ARROW:
      previousDay()
      break
    case KEY_RIGHT_ARROW:
      nextDay()
      break
    case KEY_UP_ARROW:
      previousWeek()
      break
    case KEY_DOWN_ARROW:
      nextWeek()
      break
    case KEY_PAGE_UP:
      previousMonth()
      break
    case KEY_PAGE_DOWN:
      nextMonth()
      break
    case KEY_HOME:
      firstDayOfTheMonth()
      break
    case KEY_END:
      lastDayOfTheMonth()
      break
    case KEY_DELETE:
      nextYear()
      break
    case KEY_INSERT:
      previousYear()
      break
    case KEY_ESC:
      closeDropdown()
      break
  }
  keyToSend.value = ''
}

/**
 * Select the previous day.
 *
 * @returns {Void}
 */
const previousDay = () => {
  if (selectedDay.value == 1) {
    previousMonth()
    lastDayOfTheMonth()
  } else {
    selectedDay.value--
  }
}

/**
 * Select the next day.
 *
 * @returns {Void}
 */
const nextDay = () => {
  if (selectedDay.value == daysInMonth.value) {
    nextMonth()
    firstDayOfTheMonth()
  } else {
    selectedDay.value++
  }
}

/**
 * Select the previous week.
 *
 * @returns {Void}
 */
const previousWeek = () => {
  if (selectedDay.value <= 7) {
    previousMonth()
    selectedDay.value = daysInMonth.value - 6
  } else {
    selectedDay.value -= 7
  }
}

/**
 * Select the next week.
 *
 * @returns {Void}
 */
const nextWeek = () => {
  if (selectedDay.value + 7 > daysInMonth.value) {
    nextMonth()
    selectedDay.value = 7 - (daysInMonth.value - selectedDay.value)
  } else {
    selectedDay.value += 7
  }
}

/**
 * Select the previous month.
 *
 * @returns {Void}
 */
const previousMonth = () => {
  if (selectedMonth.value == 1) {
    selectedMonth.value = 12
    selectedYear.value--
  } else {
    selectedMonth.value--
  }
}

/**
 * Select the next month.
 *
 * @returns {Void}
 */
const nextMonth = () => {
  if (selectedMonth.value == 12) {
    selectedMonth.value = 1
    selectedYear.value++
  } else {
    selectedMonth.value++
  }
}

/**
 * Select the first day of the month.
 *
 * @returns {Void}
 */
const firstDayOfTheMonth = () => {
  selectedDay.value = 1
}

/**
 * Select the last day of the month.
 *
 * @returns {Void}
 */
const lastDayOfTheMonth = () => {
  selectedDay.value = daysInMonth.value
}

/**
 * Select the previous year.
 *
 * @returns {Void}
 */
const previousYear = () => {
  selectedYear.value--
}

/**
 * Select the next year.
 *
 * @returns {Void}
 */
const nextYear = () => {
  selectedYear.value++
}

/**
 * Closes the dropdown.
 *
 * @returns {Void}
 */
const closeDropdown = () => {
  emit('closeDropdown', true)
}
</script>

<template>
  <div
    class="relative z-10 w-full transform transition-all duration-300 ease-in-out"
    :class="[
      classDropdownWidth,
      {
        'scale-75 opacity-0': !props.show,
        'scale-100 opacity-100': props.show,
      },
    ]"
  >
    <div
      :class="[
        classDropdownWidth,
        {
          hidden: !props.show,
          block: props.show,
          rounded: props.rounded,
        },
      ]"
      class="absolute mt-1 w-full overflow-visible bg-white p-2 shadow shadow-3xl dark:bg-nord-dark-200"
    >
      <div
        v-if="props.datePicker"
        class="flex flex-col space-y-4"
        :class="{ 'pb-4': props.timePicker }"
      >
        <VPagination
          :rounded="props.rounded"
          :selected-month="selectedMonth"
          :selected-year="selectedYear"
          @next-month="nextMonth"
          @previous-month="previousMonth"
          @update-month="selectedMonth = $event"
          @update-year="selectedYear = $event"
          @set-today="setToday"
        />

        <VDatePicker
          :rounded="props.rounded"
          :selected-day="selectedDay"
          @select-day="selectedDay = $event"
        />
      </div>

      <div v-if="props.timePicker">
        <VTimePicker
          :rounded="props.rounded"
          @update-hour="selectedHour = $event"
          @update-minute="selectedMinute = $event"
          @set-now="setNow"
        />
      </div>
    </div>
  </div>
</template>
