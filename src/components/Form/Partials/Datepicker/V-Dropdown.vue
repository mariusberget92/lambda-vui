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
} from 'vue'
import VPagination from './V-Pagination.vue'
import VDatePicker from './V-DatePicker.vue'
import VTimePicker from './V-TimePicker.vue'

/**
 * Component emits.
 *
 * @type {Object}
 */
const emit = defineEmits(['select', 'closeDropdown', 'reset'])

/**
 * Component props.
 *
 * @type {Object}
 */
const props = defineProps({
  /**
   * The selected date (YYYY-MM-DD H:i).
   *
   * @type {String|Boolean}
   * @default false
   */
  selectedDate: {
    type: [String, Boolean],
    default: false,
  },

  /**
   * Whether the dropdown is visible.
   *
   * @type {Boolean}
   * @default false
   */
  show: {
    type: Boolean,
    default: false,
  },

  /**
   * Datepicker size.
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
   * Whether the datepicker is rounded.
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
   * The color of the datepicker.
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
})

/**
 * Selected day, month, year, hour and minute refs.
 *
 * @type {import('vue').Ref<number>}
 */
const selectedDay = ref(0)
const selectedMonth = ref(0)
const selectedYear = ref(0)
const selectedHour = ref(0)
const selectedMinute = ref(0)

/**
 * Provide selected date refs.
 *
 * @returns {void}
 */
provide('selectedDay', selectedDay)
provide('selectedMonth', selectedMonth)
provide('selectedYear', selectedYear)
provide('selectedHour', selectedHour)
provide('selectedMinute', selectedMinute)

/**
 * When mounted set selected date before anything else.
 *
 * @returns {void}
 */
onMounted(() => {
  const date = props.selectedDate ? new Date(props.selectedDate) : new Date()

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
 * Watch for date changes and emit the event.
 *
 * @returns {void}
 */
watch(
  [selectedDay, selectedMonth, selectedYear, selectedHour, selectedMinute],
  ([day, month, year, hour, minute]) => {
    emit('select', { day, month, year, hour, minute })
  }
)

/**
 * Days in the month based on selected year and month.
 *
 * @type {import('vue').ComputedRef<Number>}
 * @returns {Number}
 */
const daysInMonth = computed(() => {
  return new Date(selectedYear.value, selectedMonth.value, 0).getDate()
})

/**
 * Dropdown width css classes.
 *
 * @type {import ('vue').ComputedRef<string>}
 * @returns {string}
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
 * Selects the given day.
 * Month and year change themselves when the user does so.
 * @param {Number} day - The day to select.
 * @returns {void}
 */
const selectDate = (day) => {
  selectedDay.value = day
}

/**
 * Set the selected date to today.
 *
 * @returns {void}
 */
const setToday = () => {
  const today = new Date()
  selectedDay.value = today.getDate()
  selectedMonth.value = today.getMonth() + 1
  selectedYear.value = today.getFullYear()
}

/**
 * Set the selected hour/minute to now.
 *
 * @returns {void}
 */
const setNow = () => {
  const timeNow = new Date()
  selectedHour.value = timeNow.getHours().toString().padStart(2, '0')
  selectedMinute.value = timeNow.getMinutes().toString().padStart(2, '0')
}

/**
 * Injections.
 *
 * @type {import('vue').Inject}
 */
const shouldReset = inject('reset')
const keyToSend = inject('sendKey')

/**
 * Watchers.
 *
 * @returns {void}
 */
watch([shouldReset, keyToSend], ([reset, key]) => {
  const shouldResetRef = ref(reset)
  const keyToSendRef = ref(key)

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

  if (keyToSendRef.value !== '') {
    keyHandler(key)
  }
})

/**
 * Handles keyboard key strings.
 *
 * @param {String} key - The key string.
 * @returns {void}
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
 * Selects the previous day.
 *
 * @returns {void}
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
 * Selects the next day.
 *
 * @returns {void}
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
 * Selects the previous week.
 *
 * @returns {void}
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
 * Selects the next week.
 *
 * @returns {void}
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
 * Selects the previous month.
 *
 * @returns {void}
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
 * Selects the next month.
 *
 * @returns {void}
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
 * Selects the first day of the month.
 *
 * @returns {void}
 */
const firstDayOfTheMonth = () => {
  selectedDay.value = 1
}

/**
 * Selects the last day of the month.
 *
 * @returns {void}
 */
const lastDayOfTheMonth = () => {
  selectedDay.value = daysInMonth.value
}

/**
 * Selects the previous year.
 *
 * @returns {void}
 */
const previousYear = () => {
  selectedYear.value--
}

/**
 * Selects the next year.
 *
 * @returns {void}
 */
const nextYear = () => {
  selectedYear.value++
}

/**
 * Closes the dropdown.
 *
 * @returns {void}
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
          @select-day="selectDate($event)"
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
