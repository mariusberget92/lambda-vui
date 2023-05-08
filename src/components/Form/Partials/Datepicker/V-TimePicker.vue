<script setup>
import { computed, defineEmits, inject, defineProps, ref } from 'vue'
import VButton from '../../V-Button.vue'
import VSelect from '../../V-Select.vue'

/**
 * Components emits.
 *
 * @reutrn {Object}
 */
const emit = defineEmits(['updateHour', 'updateMinute', 'setNow'])

defineProps({
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
})

/**
 * Selected hour and minute.
 *
 * @type {import('vue').Ref<number>}
 */
const selectedHour = inject('selectedHour')
const selectedMinute = inject('selectedMinute')

const selectedHourRef = ref(selectedHour)
const selectedMinuteRef = ref(selectedMinute)

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
</script>

<template>
  <div class="w-full flex-col">
    <span
      class="font-bold text-nord-dark-300 dark:text-nord-light-300"
      :class="$sizeToClass(size)"
      >Time</span
    >

    <div class="flex space-x-2">
      <VSelect
        v-model="selectedHourRef"
        :options="hours"
        :size="size"
        :clear-button="false"
        :color="color"
        @select="emit('updateHour', selectedHourRef)"
      />

      <VSelect
        v-model="selectedMinuteRef"
        :options="minutes"
        :size="size"
        :clear-button="false"
        :color="color"
        @change="emit('updateMinute', selectedMinuteRef)"
      />

      <VButton
        outline
        :color="color"
        :size="size"
        text="Now"
        @click.prevent="emit('setNow')"
      />
    </div>
  </div>
</template>
