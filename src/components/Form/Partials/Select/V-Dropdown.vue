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
   * @type {String|Array<String>|Number|Array<Number>}
   * @default ''
   */
  selectedOptions: {
    type: [String, Array, Number],
    default: '',
  },

  /**
   * The options of the input.
   *
   * @type {Array<String>|Array<Object>|Array<Number>}
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
   * @type {Array<String>|Array<Object>|Array<Number>}
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
    if (typeof option === 'string' || typeof option === 'number') {
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

const checkboxSize = computed(() => {
  return {
    xs: 'xs',
    sm: 'xs',
    base: 'sm',
    lg: 'base',
    xl: 'lg',
    '2xl': 'xl',
  }[props.size]
})
</script>

<template>
  <div
    class="relative z-20 w-full transform transition-all duration-300 ease-in-out"
    :class="{
      'scale-75 opacity-0 ': !show,
      'scale-100 opacity-100': show,
    }"
  >
    <div
      :class="{
        hidden: !show,
        block: show,
        'rounded-none': shape == 'square',
        rounded: shape == 'rounded' || shape == 'pill',
      }"
      class="absolute mt-1 w-full overflow-y-auto overflow-x-hidden border border-nord-light-100 bg-white shadow-xl dark:border-nord-light-100/25 dark:bg-nord-dark-300"
    >
      <perfect-scrollbar>
        <div v-if="multiple || search" class="flex flex-col space-y-3 p-2 pt-3">
          <VSearch
            v-if="search"
            :size="size"
            @on-search="emit('onSearch', $event)"
          />
        </div>

        <div
          v-if="multiple"
          class="flex hover:bg-nord-light-500 dark:hover:bg-nord-dark-200"
          :class="{
            'first:rounded-t last:rounded-b':
              shape == 'rounded' || shape == 'pill',
          }"
        >
          <VCheckbox
            :checked="allOptionsSelected"
            :size="checkboxSize"
            color="green"
            class="pl-2"
            @change="emit('toggleAll')"
          />

          <button
            type="button"
            class="flex w-full cursor-pointer flex-col p-1.5 italic text-nord-blue-300 dark:text-nord-blue-300"
            :class="$sizeToClass(size)"
            @click="emit('toggleAll')"
          >
            <span class="flex items-center">
              <span>Toggle all</span>
            </span>
          </button>
        </div>

        <template v-for="(option, index) in filteredOptions" :key="index">
          <div
            class="flex hover:bg-nord-light-500 dark:hover:bg-nord-dark-200"
            :class="{
              'first:rounded-t last:rounded-b':
                shape == 'rounded' || shape == 'pill',
            }"
          >
            <VCheckbox
              v-if="multiple"
              :checked="isSelected(option)"
              class="pl-2"
              :size="checkboxSize"
              @input="emit('select', option)"
            />

            <button
              type="button"
              class="flex w-full cursor-pointer flex-col p-1.5 text-nord-dark-300 dark:text-nord-light-300"
              :class="$sizeToClass(size)"
              @click="emit('select', option)"
            >
              <span
                class="flex items-center"
                :class="{
                  'space-x-2': option.emoji && option.emoji.length > 0,
                }"
              >
                <span v-if="option.emoji && option.emoji.length > 0">
                  {{ option.emoji }}
                </span>

                <span>{{ getOptionInfo(option, 'text') }}</span>
              </span>
            </button>
          </div>
        </template>
      </perfect-scrollbar>
    </div>
  </div>
</template>

<style scoped>
.ps {
  max-height:300px;
}
</style>
