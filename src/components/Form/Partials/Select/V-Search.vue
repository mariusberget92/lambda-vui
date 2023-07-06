<script setup>
import { ref, defineEmits, defineProps } from 'vue'
import VInput from '../../V-Input.vue'

/**
 * Component emits.
 *
 * @property {String} onSearch - Emits when the search input is updated.
 */
const emit = defineEmits(['onSearch'])

/**
 * Component props.
 *
 * @property {String} size - Input size.
 * @property {Boolean} rounded - Whether the input is rounded.
 * @property {String} color - The color of the input.
 */
const props = defineProps({
  /**
   * Input size.
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
   * Whether the input is rounded.
   */
  rounded: {
    type: Boolean,
    default: true,
  },

  /**
   * The color of the select.
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
