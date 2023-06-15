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

/**
 * Component props.
 *
 * @type {Object}
 */
const props = defineProps({
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
})

/**
 * Selected hour and minute injected from parent component.
 *
 * @type {import('vue').Ref<number>}
 */
const selectedHour = inject('selectedHour')
const selectedMinute = inject('selectedMinute')

/**
 * Selected hour and minute refs.
 *
 * @type {import('vue').Ref<number>}
 */
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
