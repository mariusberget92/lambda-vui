<script setup>
import { defineProps, computed, ref, onMounted, defineEmits } from 'vue'

/**
 * Component emits.
 *
 * @property {Boolean} change - Whether dark mode has changed.
 */
const emit = defineEmits(['change'])

/**
 * Component props.
 * 
 * @property {String} position - Position of the dark mode toggle.
 */
const props = defineProps({
  /**
   * Position of the dark mode toggle.
   *
   * @values top-right, top-left, bottom-right, bottom-left
   */
  position: {
    type: String,
    default: 'top-right',
    validator: (val) => {
      return ['top-right', 'top-left', 'bottom-right', 'bottom-left'].includes(val)
    },
  },
})

/**
 * Dark mode enabled.
 *
 * @type {Boolean}
 */
const isDarkMode = ref(false)

/**
 * Classes for the wrapper.
 *
 * @type {String}
 */
const classWrapper = computed(() => {
  return {
    'top-right': ['top-5', 'right-5'],
    'top-left': ['top-5', 'left-5'],
    'bottom-right': ['bottom-5', 'right-5'],
    'bottom-left': ['bottom-5', 'left-5'],
  }[props.position].join(' ')
})

/**
 * Toggle dark mode.
 *
 * @returns {Void}
 */
function toggleDarkMode() {
  isDarkMode.value = !isDarkMode.value
  document.querySelector('body').classList.toggle('dark')

  isDarkMode.value
    ? localStorage.setItem('darkMode', 'true')
    : localStorage.setItem('darkMode', 'false')

  emit('change', isDarkMode.value)
}

/**
 * Set dark mode on page load (onMounted).
 *
 * @returns {Void}
 */
onMounted(() => {
  const darkMode = localStorage.getItem('darkMode') === 'true'
  isDarkMode.value = darkMode
  darkMode
    ? document.querySelector('body').classList.add('dark')
    : document.querySelector('body').classList.remove('dark')
})
</script>

<template>
  <div :class="classWrapper" class="z-2 fixed">
    <div
      class="material-symbols-rounded cursor-pointer text-nord-dark-300 dark:text-nord-light-300"
    >
      <span v-if="isDarkMode" @click="toggleDarkMode">light_mode</span>
      <span v-else @click="toggleDarkMode">dark_mode</span>
    </div>
  </div>
</template>
