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
defineProps({
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
 * Search query.
 *
 * @type {String}
 */
const searchQuery = ref('')
</script>

<template>
  <VInput
    v-model="searchQuery"
    class="-mt-1"
    placeholder="Search for items"
    :size="size"
    icon="search"
    :search="true"
    @input="emit('onSearch', searchQuery)"
  />
</template>
