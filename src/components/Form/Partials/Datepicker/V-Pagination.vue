<script setup>
import { computed, defineEmits, defineProps, inject, ref } from 'vue'
import VButton from '../../V-Button.vue'
import VSelect from '../../V-Select.vue'

/**
 * Component emits.
 *
 * @property {Number} updateMonth - Emits when the month is updated.
 * @property {Number} updateYear - Emits when the year is updated.
 * @property {Undefined} previousMonth - Emits when the previous month button is clicked.
 * @property {Undefined} nextMonth - Emits when the next month button is clicked.
 * @property {Undefined} setToday - Emits when the today button is clicked.
 */
const emit = defineEmits([
  'updateMonth',
  'updateYear',
  'previousMonth',
  'nextMonth',
  'setToday',
])

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
    default: 'blue',
    validator: (val) => {
      return ['red', 'green', 'blue', 'orange', 'yellow', 'mauve'].includes(val)
    },
  },

  /**
   * Datepicker size.
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
})

/**
 * Selected year and month injections from parent component.
 *
 * @type {Number}
 */
const selectedYear = inject('selectedYear')
const selectedMonth = inject('selectedMonth')

/**
 * Selected year and month refs.
 *
 * @type {Number}
 */
const selectedYearRef = ref(selectedYear)
const selectedMonthRef = ref(selectedMonth)

/**
 * Months of the year.
 *
 * @type {Array<Object>}
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
 * Years from 1900 to 10 years from now.
 *
 * @returns {Array}
 */
const years = computed(() => {
  const years = []
  for (let i = new Date().getFullYear() + 10; i >= 1900; i--) {
    years.push(i)
  }
  return years
})
</script>

<template>
  <div class="flex flex-col space-y-2">
    <div class="jusify-even flex items-center space-x-2">
      <VSelect
        v-model="selectedMonthRef"
        :options="months"
        :size="props.size"
        :rounded="props.rounded"
        :color="props.color"
        :clear-button="false"
        @select="emit('updateMonth', selectedMonthRef)"
      />

      <VSelect
        v-model="selectedYearRef"
        :options="years"
        :size="props.size"
        :rounded="props.rounded"
        :color="props.color"
        :clear-button="false"
        @select="emit('updateYear', selectedYearRef)"
      />
    </div>

    <div class="flex items-center justify-center space-x-2">
      <VButton
        :size="props.size"
        icon="chevron_left"
        outline
        :rounded="props.rounded"
        :color="props.color"
        @click="emit('previousMonth')"
      />

      <VButton
        :size="props.size"
        text="Today"
        class="grow"
        outline
        :rounded="props.rounded"
        :color="props.color"
        @click="emit('setToday')"
      />

      <VButton
        :size="props.size"
        icon="chevron_right"
        outline
        :rounded="props.rounded"
        :color="props.color"
        @click="emit('nextMonth')"
      />
    </div>
  </div>
</template>
