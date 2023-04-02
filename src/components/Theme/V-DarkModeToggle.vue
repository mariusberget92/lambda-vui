<script setup>
import { defineProps, computed, ref, onMounted } from 'vue'

const props = defineProps({
  /**
   * Position of the dark mode toggle.
   *
   * @type {String}
   * @default top-right
   * @options top-right, top-left, bottom-right, bottom-left
   */
  position: {
    type: String,
    default: 'top-right',
    validator: (val) => {
      return ['top-right', 'top-left', 'bottom-right', 'bottom-left'].includes(
        val
      )
    },
  },
})

/**
 * Is dark mode enabled?
 *
 * @type {import('vue').Ref<Boolean>}
 */
const isDarkMode = ref(false)

/**
 * Classes for the icon.
 *
 * @type {import('vue').ComputedRef<String>}
 */
const classesIcon = computed(() => {
  let classes = [
    'material-symbols-rounded',
    'text-nord-200',
    'dark:text-nord-snow-storm-300',
    'cursor-pointer',
  ]

  return classes.join(' ')
})

/**
 * Classes for the wrapper.
 *
 * @type {import('vue').ComputedRef<String>}
 */
const classesWrapper = computed(() => {
  let classes = ['fixed', 'z-2']

  const positionClasses = {
    'top-right': ['top-5', 'right-5'],
    'top-left': ['top-5', 'left-5'],
    'bottom-right': ['bottom-5', 'right-5'],
    'bottom-left': ['bottom-5', 'left-5'],
  }

  classes.push(
    ...(positionClasses[props.position] || positionClasses['top-right'])
  )

  return classes.join(' ')
})

/**
 * Toggle dark mode.
 *
 * @returns {void}
 */
function toggleDarkMode() {
  isDarkMode.value = !isDarkMode.value
  document.querySelector('body').classList.toggle('dark')

  isDarkMode.value
    ? localStorage.setItem('darkMode', 'true')
    : localStorage.setItem('darkMode', 'false')
}

/**
 * Set dark mode on page load.
 *
 * @returns {void}
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
  <div :class="classesWrapper">
    <div :class="classesIcon">
      <span v-if="isDarkMode" @click="toggleDarkMode">light_mode</span>
      <span v-else @click="toggleDarkMode">dark_mode</span>
    </div>
  </div>
</template>
