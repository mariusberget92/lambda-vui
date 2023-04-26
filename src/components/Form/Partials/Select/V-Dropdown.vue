<script setup>
import { defineProps, computed, defineEmits } from 'vue'
import VCheckbox from '../../V-Checkbox.vue'
import VSearch from './V-Search.vue'

/**
 * Component emits.
 *
 * @type {Object}
 */
const emit = defineEmits(['select', 'onSearch', 'toggleAll'])

/**
 * Component props.
 *
 * @type {Object}
 */
const props = defineProps({
  /**
   * Selected options.
   *
   * @type {String|Array<String>}
   * @default ''
   */
  selectedOptions: {
    type: [String, Array],
    default: '',
  },

  /**
   * The options of the input.
   *
   * @type {Array<String>|Array<Object>}
   * @required
   * @default []
   */
  options: {
    type: Array,
    default: () => [],
    required: true,
  },

  /**
   * The filteredOptions of the input.
   *
   * @type {Array<String>|Array<Object>}
   * @required
   * @default []
   */
  filteredOptions: {
    type: Array,
    default: () => [],
    required: true,
  },

  /**
   * Reduce to get the value of an option.
   *
   * @type {Function}
   */
  valueReducer: {
    type: Function,
    default: (option) => option.value,
  },

  /**
   * Reduce to get the text of an option.
   *
   * @type {Function}
   */
  textReducer: {
    type: Function,
    default: (option) => option.text,
  },

  /**
   * Whether the dropdown is visible.
   *
   * @type {Boolean}
   * @default false
   */
  show: {
    type: Boolean,
    default: false,
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
   * Shape of the dropdown.
   *
   * @type {String}
   * @default rounded
   * @options rounded, square, pill
   */
  shape: {
    type: String,
    default: 'rounded',
    validator: (val) => {
      return ['rounded', 'square', 'pill'].includes(val)
    },
  },

  /**
   * Whether the input is multiple.
   *
   * @type {Boolean}
   * @default false
   */
  multiple: {
    type: Boolean,
    default: false,
  },

  /**
   * Whether the input is searchable.
   *
   * @type {Boolean}
   * @default false
   */
  search: {
    type: Boolean,
    default: false,
  },
})

/**
 * Get the option text or value from an option.
 *
 * @type {import('vue').ComputedRef<Function>}
 * @param {String|Object} option
 * @param {String} type
 * @returns {String}
 */
const getOptionInfo = computed(() => {
  return (option, type) => {
    if (typeof option === 'string') {
      return option
    }

    const fn = type === 'text' ? props.textReducer : props.valueReducer
    return fn(option)
  }
})

/**
 * Check if a option is selected.
 *
 * @type {import('vue').ComputedRef<Function>}
 * @param {String|Object} option
 * @returns {Boolean}
 */
const isSelected = computed(() => {
  return (option) => {
    const value = getOptionInfo.value(option, 'value')
    return props.multiple
      ? props.selectedOptions.includes(value)
      : props.selectedOptions === value
  }
})

/**
 * Check if all options are selected.
 *
 * @type {import('vue').ComputedRef<Boolean>}
 * @returns {Boolean}
 */
const allOptionsSelected = computed(() => {
  return props.options.every((option) => isSelected.value(option))
})
</script>

<template>
  <div class="relative">
    <div
      :class="{
        hidden: !show,
        'rounded-none': shape == 'square',
        rounded: shape == 'rounded' || shape == 'pill',
      }"
      class="absolute z-10 mt-1 max-h-64 w-full overflow-y-auto overflow-x-hidden border border-nord-snow-storm-100 bg-white dark:border-nord-400 dark:bg-nord-200"
    >
      <div v-if="multiple || search" class="flex items-center">
        <VCheckbox
          v-if="multiple"
          :checked="allOptionsSelected"
          class="p-2"
          :class="{ 'mt-1': !search }"
          :size="size"
          color="green"
          @change="emit('toggleAll')"
        />

        <span
          v-if="!search"
          class="mt-1 italic text-nord-300 opacity-75 dark:text-nord-snow-storm-300"
          >Select all</span
        >

        <VSearch
          v-if="search"
          :size="size"
          @on-search="emit('onSearch', $event)"
        />
      </div>

      <template v-for="(option, index) in filteredOptions" :key="index">
        <div
          class="flex hover:bg-nord-snow-storm-100/50 dark:hover:bg-nord-100/50"
          :class="{
            'first:rounded-t last:rounded-b':
              shape == 'rounded' || shape == 'pill',
          }"
        >
          <VCheckbox
            v-if="multiple"
            :checked="isSelected(option)"
            class="pl-2"
            :size="size"
            @input="emit('select', option)"
          />

          <button
            type="button"
            class="flex w-full cursor-pointer flex-col p-2 text-nord-300 dark:text-nord-snow-storm-300"
            :class="$sizeToClass(size)"
            @click="emit('select', option)"
          >
            <span
              class="flex items-center"
              :class="{ 'space-x-2': option.emoji && option.emoji.length > 0 }"
            >
              <span v-if="option.emoji && option.emoji.length > 0">
                {{ option.emoji }}
              </span>

              <span>{{ getOptionInfo(option, 'text') }}</span>
            </span>
          </button>
        </div>
      </template>
    </div>
  </div>
</template>
