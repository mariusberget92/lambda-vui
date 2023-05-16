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

  /**
   * The maximum number of options that can be selected.
   * If the value is 0, there is no limit.
   *
   * @type {Number}
   * @default 0
   */
  max: {
    type: Number,
    default: 0,
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

/**
 * Check if a option is disabled.
 * 
 * @type {import('vue').ComputedRef<Function>}
 * @param {String|Object} option
 * @returns {Boolean}
 */
const isOptionDisabled = computed(() => {
  const numSelected = props.selectedOptions.length
  if (props.max === 0) {
    return () => false
  }
  return (option) => {
    return numSelected >= props.max && !isSelected.value(option)
  }
})

/**
 * Get the checkbox size.
 *
 * @type {import('vue').ComputedRef<String>}
 * @returns {String}
 */
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
      'scale-75 opacity-0': !props.show,
      'scale-100 opacity-100': props.show,
    }"
  >
    <div
      :class="{
        hidden: !props.show,
        block: props.show,
        rounded: props.rounded,
      }"
      class="absolute mt-1 w-full overflow-y-auto overflow-x-hidden bg-white shadow shadow-3xl dark:bg-nord-dark-200"
    >
      <perfect-scrollbar>
        <div
          v-if="props.multiple || props.search"
          class="flex flex-col"
          :class="{ 'space-y-3 p-2': props.search }"
        >
          <VSearch
            v-if="props.search"
            :size="props.size"
            :rounded="props.rounded"
            :color="props.color"
            @on-search="emit('onSearch', $event)"
          />
        </div>

        <div
          v-if="props.multiple && props.max === 0"
          class="flex px-2 hover:bg-nord-light-500/50 dark:hover:bg-nord-dark-100/50"
          :class="{
            'first:rounded-t last:rounded-b': props.rounded,
          }"
        >
          <VCheckbox
            :checked="allOptionsSelected"
            :size="checkboxSize"
            color="green"
            :rounded="props.rounded"
            class="!space-x-0 pl-2"
            @change="emit('toggleAll')"
          />

          <button
            type="button"
            class="flex w-full cursor-pointer flex-col p-1.5 italic text-nord-blue-300 dark:text-nord-blue-300"
            :class="$sizeToClass(props.size)"
            @click="emit('toggleAll')"
          >
            <span class="flex items-center">
              <span>Toggle all</span>
            </span>
          </button>
        </div>

        <span
          v-if="filteredOptions.length == 0"
          class="flex items-center justify-center p-2 text-nord-dark-300/75 dark:text-nord-light-300/75"
          :class="$sizeToClass(props.size)"
        >
          No options found
        </span>

        <template v-for="(option, index) in filteredOptions" :key="index">
          <div
            class="flex px-2 hover:bg-nord-light-500/50 dark:hover:bg-nord-dark-100/50"
            :class="{
              'first:rounded-t last:rounded-b': props.rounded,
            }"
          >
            <VCheckbox
              v-if="props.multiple"
              :checked="isSelected(option)"
              class="!space-x-0 pl-2"
              :rounded="props.rounded"
              :color="props.color"
              :size="checkboxSize"
              :disabled="isOptionDisabled(option)"
              @click="emit('select', option)"
            />

            <button
              type="button"
              class="flex w-full cursor-pointer flex-col p-1.5 text-nord-dark-300 dark:text-nord-light-300"
              :class="$sizeToClass(props.size)"
              :disabled="(props.multiple) ? isOptionDisabled(option) : false"
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
  max-height:350px;
}
</style>
