<script setup>
import { ref, defineEmits, defineProps } from 'vue'
import VInput from '../../V-Input.vue'

/**
 * Component emits.
 *
 * @type {Object}
 */
const emit = defineEmits(['search', 'onSearch'])

/**
 * Component props.
 *
 * @type {Object}
 */
const props = defineProps({
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

  /**
   * The color of the select.
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
 * Search query.
 *
 * @type {String}
 */
const searchQuery = ref('')
</script>

<template>
  <VInput
    v-model="searchQuery"
    placeholder="Search for items"
    :size="props.size"
    icon="search"
    :color="props.color"
    :rounded="props.rounded"
    @input="emit('onSearch', searchQuery)"
  />
</template>
