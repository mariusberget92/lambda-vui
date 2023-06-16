<script setup>
import { defineProps, computed, ref, onMounted } from 'vue'

/**
 * Component props.
 *
 * @type {Object}
 */
const props = defineProps({
  /**
   * Toast duration
   *
   * @type {Number}
   * @default 5000
   */
  duration: {
    type: Number,
    default: 5000,
  },

  /**
   * Toast type
   *
   * @type {String}
   * @default 'success'
   * @options 'success', 'error', 'warning', 'info'
   */
  type: {
    type: String,
    default: 'success',
    validator: (val) => {
      return ['success', 'error', 'warning', 'info'].includes(val)
    },
  },

  /**
   * Toast message
   *
   * @type {String|Boolean}
   * @default false
   */
  message: {
    type: [String, Boolean],
    default: false,
  },

  /**
   * Whether the toast is rounded or not
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
 * Get the icon based on the type
 *
 * @type {String}
 */
const icon = computed(() => {
  return {
    success: 'check_circle',
    error: 'error',
    warning: 'warning',
    info: 'info',
  }[props.type]
})

/**
 * Get the title based on the type
 *
 * @type {String}
 */
const title = computed(() => {
  return props.type.charAt(0).toUpperCase() + props.type.slice(1)
})

/**
 * The progress of the toast
 *
 * @type {Number}
 */
const toastProgress = ref(100)

/**
 * Method to start the progress
 *
 * @return {Void}
 */
const startProgress = () => {
  let start = Date.now()
  const interval = setInterval(() => {
    const elapsed = Date.now() - start
    const remaining = Math.max(props.duration - elapsed, 0)
    toastProgress.value = (remaining / props.duration) * 100
    if (remaining === 0) {
      clearInterval(interval)
    }
  }, 10)
}

/**
 * OnMounted hook
 *
 * @return {Void}
 */
onMounted(() => {
  startProgress()
})
</script>

<template>
  <div
    class="w-[300px] overflow-hidden bg-white shadow-lg dark:bg-nord-dark-300"
    :class="{
      rounded: props.rounded,
    }"
  >
    <div class="flex flex-col px-6 py-4">
      <div class="relative flex items-center">
        <span
          class="material-symbols-rounded absolute -left-8 -top-8 z-10 text-9xl opacity-10"
          :class="{
            'text-nord-green-300': props.type === 'success',
            'text-nord-red-300': props.type === 'error',
            'text-nord-yellow-300': props.type === 'warning',
            'text-nord-blue-300': props.type === 'info',
          }"
          >{{ icon }}</span
        >

        <p
          class="text-2xl font-bold text-nord-dark-300 dark:text-nord-light-300"
        >
          {{ title }}
        </p>
      </div>

      <p class="text-nord-dark-300 dark:text-nord-light-300 text-sm">
        {{ props.message }}
      </p>
    </div>

    <div
      class="h-1"
      :class="{
        'bg-nord-green-300': props.type === 'success',
        'bg-nord-red-300': props.type === 'error',
        'bg-nord-yellow-300': props.type === 'warning',
        'bg-nord-blue-300': props.type === 'info',
      }"
      :style="{
        width: toastProgress + '%',
      }"
    ></div>
  </div>
</template>
