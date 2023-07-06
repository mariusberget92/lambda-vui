<script setup>
import { computed, defineEmits, inject, defineProps, ref } from 'vue'
import VButton from '../../V-Button.vue'
import VSelect from '../../V-Select.vue'

/**
 * Components emits.
 *
 * @property {Number} updateHour - Emits when the hour is updated.
 * @property {Number} updateMinute - Emits when the minute is updated.
 * @property {Undefined} setNow - Emits when the now button is clicked.
 */
const emit = defineEmits(['updateHour', 'updateMinute', 'setNow'])

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
 * Selected hour and minute injected from parent component.
 *
 * @type {Number}
 */
const selectedHour = inject('selectedHour')
const selectedMinute = inject('selectedMinute')

/**
 * Selected hour and minute refs.
 *
 * @type {Number}
 */
const selectedHourRef = ref(selectedHour)
const selectedMinuteRef = ref(selectedMinute)

/**
 * Array of hours.
 *
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
 * Array of minutes.
 *
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
    <div class="flex space-x-2">
      <VSelect
        v-model="selectedHourRef"
        :options="hours"
        :rounded="props.rounded"
        :size="props.size"
        :clear-button="false"
        :color="props.color"
        @select="emit('updateHour', selectedHourRef)"
      />

      <VSelect
        v-model="selectedMinuteRef"
        :options="minutes"
        :rounded="props.rounded"
        :size="props.size"
        :clear-button="false"
        :color="props.color"
        @select="emit('updateMinute', selectedMinuteRef)"
      />

      <VButton
        outline
        :rounded="props.rounded"
        :color="props.color"
        :size="props.size"
        text="Now"
        @click.prevent="emit('setNow')"
      />
    </div>
  </div>
</template>
