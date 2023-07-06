<script setup>
import { computed, defineEmits, defineProps, inject, ref } from 'vue'

/**
 * Component emits.
 * 
 * @property {Number} selectDay - Emits when a day is selected. 
 */
const emit = defineEmits(['selectDay'])

/**
 * Component props.
 * 
 * @property {String} color - The color of the datepicker.
 * @property {String} size - The datepicker size.
 * @property {Boolean} rounded - Whether the datepicker is rounded.
 */
const props = defineProps({
  /**
   * The color of the datepicker.
   *
   * @values red, green, blue, orange, yellow, mauve
   */
  color: {
    type: String,
    required: true,
    default: 'blue',
    validator: (val) => {
      return ['red', 'green', 'blue', 'orange', 'yellow', 'mauve'].includes(val)
    },
  },

  /**
   * The datepicker size.
   *
   * @values xs, sm, base, lg, xl, 2xl
   */
  size: {
    type: String,
    required: true,
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
    required: true,
    default: true,
  },
})

/**
 * Days of the week, used for calendar header.
 * 
 * @type {Array<String>}
 */
const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

/**
 * Selected day, month and year injections from the parent component.
 * 
 * @type {Number}
 */
const selectedDay = inject('selectedDay')
const selectedMonth = inject('selectedMonth')
const selectedYear = inject('selectedYear')

/**
 * Selected day, month and year refs.
 *
 * @type {Number}
 */
const selectedDayRef = ref(selectedDay)
const selectedMonthRef = ref(selectedMonth)
const selectedYearRef = ref(selectedYear)

/**
 * Check if a day is today.
 * 
 * @param {Number} day - The day.
 * @returns {Boolean}
 */
const isToday = computed(() => {
  const today = new Date()
  return (day) => {
    return (
      day === today.getDate() &&
      selectedMonthRef.value === today.getMonth() + 1 &&
      selectedYearRef.value === today.getFullYear()
    )
  }
})

/**
 * Check if a day is selected.
 *
 * @param {Number} day - The day.
 * @returns {Boolean}
 */
const isSelected = computed(() => {
  return (day) => {
    return day === selectedDayRef.value
  }
})

/**
 * How many days are in the selected month.
 *
 * @returns {Number}
 */
 const daysInMonth = computed(() => {
  return new Date(selectedYearRef.value, selectedMonthRef.value, 0).getDate()
})

/**
 * Determine the class name for the first day of the month, so we know what column to start the month on.
 * 
 * @returns {String} - The class name for the first day of the month.
 */
const classRowStart = computed(() => {
  const dateString = `${selectedYearRef.value}-${selectedMonthRef.value}-01`
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
 * Color classes for the selected date.
 *
 * @returns {String}
 */
const classSelectedColor = computed(() => {
  const colorClasses = {
    red: ['bg-nord-red-300', 'border-nord-red-100'],
    green: ['bg-nord-green-300', 'border-nord-green-100'],
    blue: ['bg-nord-blue-300', 'border-nord-blue-100'],
    orange: ['bg-nord-orange-300', 'border-nord-orange-100'],
    mauve: ['bg-nord-mauve-300', 'border-nord-mauve-100'],
    yellow: ['bg-nord-yellow-300', 'border-nord-yellow-100'],
  }
  return colorClasses[props.color].join(' ')
})

/**
 * Color classes for a normal unselected date.
 *
 * @returns {String}
 */
const classNormalColor = computed(() => {
  const colorClasses = {
    red: ['hover:bg-nord-red-300/50'],
    green: ['hover:bg-nord-green-300/50'],
    blue: ['hover:bg-nord-blue-300/50'],
    orange: ['hover:bg-nord-orange-300/50'],
    mauve: ['hover:bg-nord-mauve-300/50'],
    yellow: ['hover:bg-nord-yellow-300/50'],
  }

  return colorClasses[props.color].join(' ')
})
</script>

<template>
  <div class="flex justify-center px-1">
    <div
      class="grid grid-cols-7 grid-rows-1 content-center justify-items-center gap-x-4 gap-y-2 font-bold text-nord-dark-300 dark:text-nord-light-300"
      :class="[$sizeToClass(props.size)]"
    >
      <template v-for="(day, index) in days" :key="index">
        <div>
          {{ day }}
        </div>
      </template>

      <template v-for="(day, index) in daysInMonth" :key="index">
        <button
          class="aspect-square h-full p-2 transition-colors"
          :class="[
            isSelected(day) ? classSelectedColor : classNormalColor,
            {
              'font-black': isToday(day) || isSelected(day),
              'font-semibold': !isToday(day),
              'text-white': isSelected(day),
              'hover:text-white': !isSelected(day),
              rounded: props.rounded,
            },
            $sizeToClass(props.size),
            index == 0 ? classRowStart : '',
          ]"
          @click="emit('selectDay', day)"
        >
          {{ day }}
        </button>
      </template>
    </div>
  </div>
</template>
