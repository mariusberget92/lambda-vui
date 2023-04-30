<script setup>
import {
  defineProps,
  onMounted,
  ref,
  computed,
  defineEmits,
  inject,
  watchEffect,
} from 'vue'
import VSelect from '../../V-Select.vue'

/**
 * Emits events.
 *
 * @type {Object}
 */
const emit = defineEmits(['select'])

/**
 * Component props.
 *
 * @type {Object}
 */
const props = defineProps({
  /**
   * The selected date (YYYY-MM-DD H:i).
   *
   * @type {String}
   * @default ''
   */
  selectedDate: {
    type: String,
    default: '',
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
   * Shape of the dropdown.
   *
   * @type {String}
   * @default rounded
   * @options rounded, square, pill
   */
  shape: {
    type: String,
    default: 'rounded',
    validator: (val) => {
      return ['rounded', 'square', 'pill'].includes(val)
    },
  },
})

/**
 * Days of the week.
 *
 * @type {Array}
 */
const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

const months = [
  { value: 1, text: 'January' },
  { value: 2, text: 'February' },
  { value: 3, text: 'March' },
  { value: 4, text: 'April' },
  { value: 5, text: 'May' },
  { value: 6, text: 'June' },
  { value: 7, text: 'July' },
  { value: 8, text: 'August' },
  { value: 9, text: 'September' },
  { value: 10, text: 'October' },
  { value: 11, text: 'November' },
  { value: 12, text: 'December' },
]

// Array of years from +/- 10 years from selectedYear.value
const years = computed(() => {
  const years = []
  for (let i = new Date().getFullYear() + 10; i >= 1900; i--) {
    years.push(i)
  }
  return years
})

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
})

/**
 * Selected day, month, and year.
 *
 * @type {import('vue').Ref<number>}
 */
const selectedDay = ref(0)
const selectedMonth = ref(0)
const selectedYear = ref(0)

/**
 * Returns the number of days in the given month and year.
 * @param {Number} month - The month (1-12).
 * @param {Number} year - The year.
 * @returns {Number} - The number of days in the month.
 */
const daysInMonth = (month, year) => {
  return new Date(year, month, 0).getDate()
}

/**
 * Check if a day is today.
 *
 * @type {import('vue').ComputedRef<Function>}
 * @returns {Function}
 * @param {Number} day - The day.
 */
const isToday = computed(() => {
  const today = new Date()
  return (day) => {
    return (
      day === today.getDate() &&
      selectedMonth.value === today.getMonth() + 1 &&
      selectedYear.value === today.getFullYear()
    )
  }
})

/**
 * Check if a day is selected.
 *
 * @type {import('vue').ComputedRef<Function>}
 * @returns {Function}
 * @param {Number} day - The day.
 */
const isSelected = computed(() => {
  return (day) => {
    return (
      day === selectedDay.value &&
      selectedMonth.value === selectedMonth.value &&
      selectedYear.value === selectedYear.value
    )
  }
})

/**
 * A computed property that returns the class name for the first day of the selected month and year.
 * @returns {String} - The class name for the first day of the month.
 */
const classRowStart = computed(() => {
  const dateString = `${selectedYear.value}-${selectedMonth.value}-01`
  const dayOfWeek = new Date(dateString).getDay()
  const classNames = [
    'col-start-1',
    'col-start-2',
    'col-start-3',
    'col-start-4',
    'col-start-5',
    'col-start-6',
    'col-start-7',
  ]
  return classNames[dayOfWeek]
})

/**
 * CSS for months paging.
 *
 * @type {import ('vue').ComputedRef<string>}
 * @returns {string}
 */
const classMonthsPaging = computed(() => {
  return {
    xs: ['w-[34px]', 'h-[34px]', 'text-base'],
    sm: ['w-[38px]', 'h-[38px]', 'text-base'],
    base: ['w-[42px]', 'h-[42px]', 'text-base'],
    lg: ['w-[46px]', 'h-[46px]', 'text-lg'],
    xl: ['w-[46px]', 'h-[46px]', 'text-xl'],
    '2xl': ['w-[50px]', 'h-[50px]', 'text-2xl'],
  }[props.size].join(' ')
})

/**
 * CSS for dropdown width.
 *
 * @type {import ('vue').ComputedRef<string>}
 * @returns {string}
 */
const classDropdownWidth = computed(() => {
  return {
    xs: ['w-[310px]'],
    sm: ['w-[340px]'],
    base: ['w-[370px]'],
    lg: ['w-[425px]'],
    xl: ['w-[435px]'],
    '2xl': ['w-[500px]'],
  }[props.size].join(' ')
})

/**
 * Decrements the selected month by one. If the selected month is January, sets the selected month to December and decrements the selected year.
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
 * Increments the selected month by one. If the selected month is December, sets the selected month to January and increments the selected year.
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
 * Selects the passed day. Month and year change themselves when the user does so.
 * @param {Number} day - The day to select.
 * @returns {void}
 */
const selectDate = (day) => {
  selectedDay.value = day
  emit('select', { day, month: selectedMonth.value, year: selectedYear.value })
}

/**
 * Resets the date to today.
 *
 * @returns {void}
 */
const reset = inject('reset')
const sendKey = inject('sendKey')

watchEffect(() => {
  if (reset.value == true) {
    const today = new Date()
    selectedDay.value = today.getDate()
    selectedMonth.value = today.getMonth() + 1
    selectedYear.value = today.getFullYear()
  }

  if (sendKey.value != '') {
    console.log(sendKey.value)
    keyHandler(sendKey.value)
  }
})

/**
 * Handles keyboard events.
 *
 * @param {KeyboardEvent} event - The keyboard event.
 * @returns {void}
 */
const keyHandler = (key) => {
  if (key === 'ArrowLeft') {
    // Previous day
    if (selectedDay.value > 1) {
      selectedDay.value--
    } else {
      previousMonth()
      selectedDay.value = daysInMonth(selectedMonth.value, selectedYear.value)
    }
    selectDate(selectedDay.value)
  } else if (key === 'ArrowRight') {
    // Next day
    if (
      selectedDay.value < daysInMonth(selectedMonth.value, selectedYear.value)
    ) {
      selectedDay.value++
    } else {
      nextMonth()
      selectedDay.value = 1
    }
    selectDate(selectedDay.value)
  } else if (key === 'ArrowUp') {
    // Previous week
    if (selectedDay.value > 7) {
      selectedDay.value -= 7
    } else {
      previousMonth()
      selectedDay.value =
        daysInMonth(selectedMonth.value, selectedYear.value) -
        (7 - selectedDay.value)
    }
    selectDate(selectedDay.value)
  } else if (key === 'ArrowDown') {
    // Next week
    if (
      selectedDay.value + 7 <=
      daysInMonth(selectedMonth.value, selectedYear.value)
    ) {
      selectedDay.value += 7
    } else {
      nextMonth()
      selectedDay.value =
        selectedDay.value +
        7 -
        daysInMonth(selectedMonth.value, selectedYear.value)
    }
    selectDate(selectedDay.value)
  } else if (key === 'PageUp') {
    // Previous month
    previousMonth()
    selectDate(selectedDay.value)
  } else if (key === 'PageDown') {
    // Next month
    nextMonth()
    selectDate(selectedDay.value)
  } else if (key === 'Home') {
    // First day of month
    selectedDay.value = 1
    selectDate(selectedDay.value)
  } else if (key === 'End') {
    // Last day of month
    selectedDay.value = daysInMonth(selectedMonth.value, selectedYear.value)
    selectDate(selectedDay.value)
  }
}
</script>

<template>
  <div class="relative">
    <div
      :class="[
        classDropdownWidth,
        {
          hidden: !show,
          'rounded-none': shape == 'square',
          rounded: shape == 'rounded' || shape == 'pill',
        },
      ]"
      class="absolute z-10 mt-1 overflow-y-auto overflow-x-hidden border border-nord-snow-storm-100 bg-white p-2 shadow-[0_10px_15px_rgba(0,0,0,.15)] dark:border-nord-400 dark:bg-nord-200"
    >
      <div class="flex flex-col space-y-4">
        <div class="flex items-center justify-between space-x-2">
          <button
            class="material-symbols-rounded aspect-square rounded border border-nord-snow-storm-100 bg-white dark:border-nord-400 dark:bg-nord-100 dark:text-nord-snow-storm-300"
            :class="classMonthsPaging"
            @click="previousMonth"
          >
            chevron_left
          </button>

          <VSelect v-model="selectedMonth" :options="months" :size="size" />
          <VSelect v-model="selectedYear" :options="years" :size="size" />

          <button
            class="material-symbols-rounded aspect-square rounded border border-nord-snow-storm-100 bg-white dark:border-nord-400 dark:bg-nord-100 dark:text-nord-snow-storm-300"
            :class="classMonthsPaging"
            @click="nextMonth"
          >
            chevron_right
          </button>
        </div>

        <div class="flex justify-center">
          <div
            class="grid grid-cols-7 grid-rows-1 content-center justify-items-center gap-2 font-bold text-nord-300 dark:text-nord-snow-storm-300"
            :class="[$sizeToClass(size)]"
          >
            <template v-for="(day, index) in days" :key="index">
              <div>
                {{ day }}
              </div>
            </template>

            <template
              v-for="(day, index) in daysInMonth(selectedMonth, selectedYear)"
              :key="index"
            >
              <button
                class="aspect-square h-full rounded p-2 font-semibold transition-colors hover:bg-nord-snow-storm-100 dark:hover:bg-nord-100"
                :class="[
                  $sizeToClass(size),
                  index == 0 ? classRowStart : '',
                  {
                    'font-black': isToday(day),
                    'bg-nord-frost-300 font-bold text-white hover:bg-nord-frost-300 dark:hover:bg-nord-frost-300':
                      isSelected(day),
                  },
                ]"
                @click="selectDate(day)"
              >
                {{ day }}
              </button>
            </template>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>