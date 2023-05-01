<script setup>
import {
  defineProps,
  onMounted,
  ref,
  computed,
  defineEmits,
  inject,
  watch,
} from 'vue'
import VSelect from '../../V-Select.vue'
import VButton from '../../V-Button.vue'

/**
 * Emits events.
 *
 * @type {Object}
 */
const emit = defineEmits(['select', 'closeDropdown'])

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
})

/**
 * Days of the week.
 *
 * @type {Array}
 */
const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

/**
 * Months of the year.
 *
 * @type {Array}
 */
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

/**
 * Years.
 *
 * @type {import('vue').ComputedRef<Array>}
 * @returns {Array}
 */
const years = computed(() => {
  const years = []
  for (let i = new Date().getFullYear() + 10; i >= 1900; i--) {
    years.push(i)
  }
  return years
})

/**
 * Hours.
 *
 * @type {import('vue').ComputedRef<Array>}
 * @returns {Array}
 */
const hours = computed(() => {
  const hours = []
  for (let i = 0; i <= 23; i++) {
    hours.push(i.toString().padStart(2, '0'))
  }
  return hours
})

/**
 * Minutes.
 *
 * @type {import('vue').ComputedRef<Array>}
 * @returns {Array}
 */
const minutes = computed(() => {
  const minutes = []
  for (let i = 0; i <= 59; i++) {
    minutes.push(i.toString().padStart(2, '0'))
  }
  return minutes
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

  // Set selected hour and minute if timepicker is enabled.
  if (props.timePicker) {
    selectedHour.value = date.getHours().toString().padStart(2, '0')
    selectedMinute.value = date.getMinutes().toString().padStart(2, '0')
  }
})

/**
 * Selected day, month, year, hour and minute.
 *
 * @type {import('vue').Ref<number>}
 */
const selectedDay = ref(0)
const selectedMonth = ref(0)
const selectedYear = ref(0)
const selectedHour = ref(0)
const selectedMinute = ref(0)

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
    xs: ['w-[340px]'],
    sm: ['w-[370px]'],
    base: ['w-[400px]'],
    lg: ['w-[435px]'],
    xl: ['w-[470px]'],
    '2xl': ['w-[540px]'],
  }[props.size].join(' ')
})

const classSelectedColor = computed(() => {
  const colorClasses = {
    red: [
      'bg-nord-aurora-200',
      'border-nord-aurora-100',
      'hover:bg-nord-aurora-100',
      'text-white',
    ],
    green: [
      'bg-nord-aurora-1100',
      'border-nord-aurora-1000',
      'hover:bg-nord-aurora-1000',
      'text-white',
    ],
    blue: [
      'bg-nord-frost-300',
      'border-nord-frost-400',
      'hover:bg-nord-frost-400',
      'text-white',
    ],
    orange: [
      'bg-nord-aurora-500',
      'border-nord-aurora-400',
      'hover:bg-nord-aurora-400',
      'text-white',
    ],
    yellow: [
      'bg-nord-aurora-800',
      'border-nord-aurora-700',
      'hover:bg-nord-aurora-700',
      'text-white',
    ],
    mauve: [
      'bg-nord-aurora-1400',
      'border-nord-aurora-1300',
      'hover:bg-nord-aurora-1300',
      'text-white',
    ],
  }
  return colorClasses[props.color].join(' ')
})

/**
 * Selects the passed day. Month and year change themselves when the user does so.
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
 * Set the selected hour/minute to now
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
const reset = inject('reset')
const sendKey = inject('sendKey')

/**
 * Watchers.
 *
 * @returns {void}
 */
watch([reset, sendKey], ([resetValue, sendKeyValue]) => {
  if (resetValue) {
    const today = new Date()
    selectedDay.value = today.getDate()
    selectedMonth.value = today.getMonth() + 1
    selectedYear.value = today.getFullYear()
  }

  if (sendKeyValue !== '') {
    keyHandler(sendKeyValue)
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
}

const previousDay = () => {
  if (selectedDay.value == 1) {
    previousMonth()
    lastDayOfTheMonth()
  } else {
    selectedDay.value--
  }
}

const nextDay = () => {
  if (selectedDay.value == daysInMonth.value) {
    nextMonth()
    firstDayOfTheMonth()
  } else {
    selectedDay.value++
  }
}

const previousWeek = () => {
  if (selectedDay.value <= 7) {
    previousMonth()
    selectedDay.value = daysInMonth.value - 6
  } else {
    selectedDay.value -= 7
  }
}

const nextWeek = () => {
  if (selectedDay.value + 7 > daysInMonth.value) {
    nextMonth()
    selectedDay.value = 7 - (daysInMonth.value - selectedDay.value)
  } else {
    selectedDay.value += 7
  }
}

const previousMonth = () => {
  if (selectedMonth.value == 1) {
    selectedMonth.value = 12
    selectedYear.value--
  } else {
    selectedMonth.value--
  }
}

const nextMonth = () => {
  if (selectedMonth.value == 12) {
    selectedMonth.value = 1
    selectedYear.value++
  } else {
    selectedMonth.value++
  }
}

const firstDayOfTheMonth = () => {
  selectedDay.value = 1
}

const lastDayOfTheMonth = () => {
  selectedDay.value = daysInMonth.value
}

const previousYear = () => {
  selectedYear.value--
}

const nextYear = () => {
  selectedYear.value++
}

const closeDropdown = () => {
  emit('closeDropdown', true)
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
      class="absolute mt-1 border border-nord-snow-storm-100 bg-white p-2 shadow-[0_10px_15px_rgba(0,0,0,.15)] dark:border-nord-400 dark:bg-nord-200"
    >
      <div v-if="datePicker" class="flex flex-col space-y-4 pb-4">
        <div class="flex flex-col">
          <span
            class="font-bold text-nord-300 dark:text-nord-snow-storm-300"
            :class="$sizeToClass(size)"
            >Date</span
          >
          <div class="flex items-center justify-between space-x-2">
            <button
              class="material-symbols-rounded aspect-square flex-none rounded border border-nord-snow-storm-100 bg-white dark:border-nord-400 dark:bg-nord-100 dark:text-nord-snow-storm-300"
              :class="classMonthsPaging"
              @click="previousMonth"
            >
              chevron_left
            </button>

            <VSelect
              v-model="selectedMonth"
              class="grow"
              :options="months"
              :size="size"
              :clear-button="false"
            />
            <VButton
              v-if="datePicker"
              class="flex-none"
              :size="size"
              text="Today"
              outline
              :color="color"
              @click.prevent="setToday"
            />
            <VSelect
              v-model="selectedYear"
              class="shrink"
              :options="years"
              :size="size"
              :clear-button="false"
            />

            <button
              class="material-symbols-rounded aspect-square flex-none rounded border border-nord-snow-storm-100 bg-white dark:border-nord-400 dark:bg-nord-100 dark:text-nord-snow-storm-300"
              :class="classMonthsPaging"
              @click="nextMonth"
            >
              chevron_right
            </button>
          </div>
        </div>
        <div class="flex justify-center">
          <div
            class="grid grid-cols-7 grid-rows-1 content-center justify-items-center gap-y-2 gap-x-4 font-bold text-nord-300 dark:text-nord-snow-storm-300"
            :class="[$sizeToClass(size)]"
          >
            <template v-for="(day, index) in days" :key="index">
              <div>
                {{ day }}
              </div>
            </template>

            <template v-for="(day, index) in daysInMonth" :key="index">
              <button
                class="aspect-square h-full rounded p-2 transition-colors hover:bg-nord-snow-storm-100 dark:hover:bg-nord-100"
                :class="[
                  isSelected(day) ? classSelectedColor : '',
                  {
                    'font-black': isToday(day) || isSelected(day),
                    'font-semibold': !isToday(day),
                  },
                  $sizeToClass(size),
                  index == 0 ? classRowStart : '',
                ]"
                @click="selectDate(day)"
              >
                {{ day }}
              </button>
            </template>
          </div>
        </div>
      </div>

      <div v-if="timePicker" class="w-full flex-col">
        <span
          class="font-bold text-nord-300 dark:text-nord-snow-storm-300"
          :class="$sizeToClass(size)"
          >Time</span
        >
        <div class="flex space-x-2">
          <div class="flex flex-col">
            <VSelect
              v-model="selectedHour"
              :options="hours"
              :size="size"
              :clear-button="false"
            />
          </div>
          <div class="flex flex-col">
            <VSelect
              v-model="selectedMinute"
              :options="minutes"
              :size="size"
              :clear-button="false"
            />
          </div>
          <VButton
            outline
            :color="color"
            :size="size"
            text="Now"
            @click.prevent="setNow"
          />
        </div>
      </div>
    </div>
  </div>
</template>
