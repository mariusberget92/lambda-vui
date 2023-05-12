<script setup>
import { computed, defineEmits, defineProps, inject, ref } from 'vue'
import VButton from '../../V-Button.vue'
import VSelect from '../../V-Select.vue'

const emit = defineEmits([
  'updateMonth',
  'updateYear',
  'previousMonth',
  'nextMonth',
  'setToday',
])

const props = defineProps({
  /**
   * The color of the datepicker buttons.
   *
   * @type {String}
   * @default blue
   * @options red, green, blue, orange, mauve
   */
  color: {
    type: String,
    default: 'blue',
    validator: (val) => {
      return ['red', 'green', 'blue', 'orange', 'mauve'].includes(val)
    },
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
   * Whether the input is rounded.
   *
   * @type {Boolean}
   * @default true
   */
  rounded: {
    type: Boolean,
    default: true,
  },
})

const selectedYear = inject('selectedYear')
const selectedMonth = inject('selectedMonth')
const selectedYearRef = ref(selectedYear)
const selectedMonthRef = ref(selectedMonth)

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
        @click.prevent="emit('previousMonth')"
      />

      <VButton
        :size="props.size"
        text="Today"
        class="grow"
        outline
        :rounded="props.rounded"
        :color="props.color"
        @click.prevent="emit('setToday')"
      />

      <VButton
        :size="props.size"
        icon="chevron_right"
        outline
        :rounded="props.rounded"
        :color="props.color"
        @click.prevent="emit('nextMonth')"
      />
    </div>
  </div>
</template>
