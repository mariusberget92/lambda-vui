<script setup>
import { defineProps, defineEmits, computed } from 'vue'
import VLabel from './Partials/V-Label.vue'
import VIcon from './Partials/V-Icon.vue'

/**
 * Define the component emits.
 */
const emit = defineEmits(['update:modelValue'])

/**
 * Component props.
 *
 * @type {Object}
 */
const props = defineProps({
  /**
   * The ID of the file input.
   * If none is provided, a random one will be generated.
   *
   * @type {String}
   * @required
   * @default lambda-input-<random>
   */
  id: {
    type: String,
    default: () => {
      return 'lambda-file-' + Math.random().toString(36).substring(2, 9)
    },
  },

  /**
   * Model value of the input.
   *
   * @type {File|Boolean|Array}
   * @default false
   * @required
   */
  modelValue: {
    type: [File, Boolean, Array],
    default: false,
    required: true,
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
   * The label of the input.
   *
   * @type {String|Boolean}
   * @required
   * @default false
   */
  label: {
    type: [String, Boolean],
    default: false,
  },

  /**
   * The helper text of the input.
   * Will be displayed under the label.
   *
   * @type {String|Boolean}
   * @default false
   */
  helper: {
    type: [String, Boolean],
    default: false,
  },

  /**
   * Whether the input is required.
   *
   * @type {Boolean}
   * @default false
   */
  required: {
    type: Boolean,
    default: false,
  },

  /**
   * The icon of the input.
   *
   * @type {String|Boolean}
   * @default false
   */
  icon: {
    type: [String, Boolean],
    default: false,
  },

  /**
   * The placeholder of the input.
   *
   * @type {String}
   * @default ''
   */
  placeholder: {
    type: String,
    default: '',
  },

  /**
   * Whether the input is disabled.
   *
   * @type {Boolean}
   * @default false
   */
  disabled: {
    type: Boolean,
    default: false,
  },

  /**
   * Wheter the input has an error.
   *
   * @type {String|Boolean}
   * @default false
   */
  error: {
    type: [String, Boolean],
    default: false,
  },

  /**
   * Input shape.
   *
   * @type {String}
   * @default rounded
   * @options square, rounded, pill
   */
  shape: {
    type: String,
    default: 'rounded',
    validator: (val) => {
      return ['square', 'rounded', 'pill'].includes(val)
    },
  },

  /**
   * The color of the datepicker buttons.
   *
   * @type {String}
   * @default blue
   * @options red, green, blue, orange, yellow, mauve
   */
  color: {
    type: String,
    default: 'blue',
    validator: (val) => {
      return ['red', 'green', 'blue', 'orange', 'mauve'].includes(val)
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
   * The extensions of the file input.
   *
   * @type {Array}
   * @default ['jpeg', 'png']
   */
  extensions: {
    type: Array,
    default: () => ['jpg', 'png'],
    validator: (val) => {
      return val.every((ext) => typeof ext === 'string')
    },
  },

  /**
   * The maximum number of files.
   *
   * @type {Number}
   * @default 1
   */
  maxFiles: {
    type: Number,
    default: 1,
  },

  /**
   * The maximum file size in bytes.
   *
   * @type {Number}
   * @default 5 * 1024 * 1024 = 5MB
   */
  maxFileSize: {
    type: Number,
    default: 5 * 1024 * 1024,
  },

  /**
   * Whether the input is clearable.
   *
   * @type {Boolean}
   * @default true
   */
  clearButton: {
    type: Boolean,
    default: true,
  },
})

/**
 * The input value to be shown as we cannot show files.
 *
 * @type {import ('vue').ComputedRef<string>}
 * @returns {string}
 */
const inputValue = computed(() => {
  if (!props.multiple) {
    if (props.modelValue instanceof File) {
      return props.modelValue.name
    }

    return ''
  } else {
    if (props.modelValue instanceof Array && props.modelValue.length > 0) {
      return `${props.modelValue.length} item(s) selected`
    }

    return ''
  }
})

/**
 * Open the legacy file select.
 *
 * @returns {void}
 */
const openLegacyFileSelect = () => {
  const input = document.getElementById(`${props.id}-file`)
  input.click()
}

const reset = () => {
  emit('update:modelValue', false)
}

/**
 * Handle the file select event.
 *
 * @param {Event} event
 * @returns {void}
 */
const handleFileSelect = (event) => {
  const files = Array.from(event.target.files)

  // Filter files by size and extension
  const filteredFiles = files
    .filter((file) => file.size <= props.maxFileSize)
    .filter((file) => props.extensions.includes(getFileExtension(file.name)))

  // Check if multiple files are allowed but only one was selected
  if (!props.multiple && filteredFiles.length > 1) {
    alert(`You can only select one file.`)
    return
  }

  // Check if the number of files exceeds the maximum
  if (filteredFiles.length > props.maxFiles) {
    alert(`You can only select up to ${props.maxFiles} files.`)
    return
  }

  // Display a warning if some files were filtered out
  if (filteredFiles.length !== files.length) {
    alert(
      `Some files are not allowed. Allowed extensions are ${props.extensions.join(
        ', '
      )}`
    )
  }

  // Validate each file
  const validatedFiles = validateFiles(filteredFiles)

  // Emit the selected file(s) to the parent component
  emit('update:modelValue', props.multiple ? validatedFiles : validatedFiles[0])
}

/**
 * Validate the files.
 *
 * @param {Array} files
 * @returns {Array}
 */
const validateFiles = (files) => {
  return files.map((file) => {
    return file
  })
}

/**
 * Get the file extension.
 *
 * @param {string} fileName
 * @returns {string}
 */
const getFileExtension = (fileName) => {
  return fileName.split('.').pop()
}

/**
 * CSS remove button classes.
 *
 * @type {import ('vue').ComputedRef<string>}
 * @returns {string}
 */
const classRemoveButton = computed(() => {
  return {
    xs: ['w-4'],
    sm: ['w-5'],
    base: ['w-6'],
    lg: ['w-7'],
    xl: ['w-8'],
    '2xl': ['w-9'],
  }[props.size].join(' ')
})

/**
 * CSS Border color classes.
 *
 * @type {import ('vue').ComputedRef<string>}
 * @returns {string}
 */
const classBorderColor = computed(() => {
  return {
    red: [
      'focus-within:shadow-nord-red-100/25',
      'focus-within:border-nord-red-300',
      'focus-within:dark:border-nord-red-300',
      'focus-within:dark:shadow-nord-red-100/25',
    ],
    blue: [
      'focus-within:shadow-nord-blue-100/25',
      'focus-within:border-nord-blue-300',
      'focus-within:dark:border-nord-blue-300',
      'focus-within:dark:shadow-nord-blue-100/25',
    ],
    green: [
      'focus-within:shadow-nord-green-100/25',
      'focus-within:border-nord-green-300',
      'focus-within:dark:border-nord-green-300',
      'focus-within:dark:shadow-nord-green-100/25',
    ],
    mauve: [
      'focus-within:shadow-nord-mauve-100/25',
      'focus-within:border-nord-mauve-300',
      'focus-within:dark:border-nord-mauve-300',
      'focus-within:dark:shadow-nord-mauve-100/25',
    ],
    orange: [
      'focus-within:shadow-nord-orange-100/25',
      'focus-within:border-nord-orange-300',
      'focus-within:dark:border-nord-orange-300',
      'focus-within:dark:shadow-nord-orange-100/25',
    ],
  }[props.color].join(' ')
})
</script>

<template>
  <div class="flex w-full flex-col" :class="{ 'opacity-50': disabled }">
    <VLabel
      v-if="props.label !== false"
      :id="id"
      :label="label"
      :required="required"
      :helper="helper"
      :size="size"
    />

    <div
      class="flex cursor-pointer border border-nord-light-100 bg-transparent transition-all duration-300 ease-in-out focus-within:shadow-lg dark:border-nord-light-100/25 focus-within:dark:shadow-lg"
      :class="[
        classBorderColor,
        {
          '!border-nord-red-300 shadow-lg !shadow-nord-red-100/25 dark:shadow-lg dark:!shadow-nord-red-100/25':
            props.error !== false,
          'rounded-full': shape === 'pill',
          'rounded-none': shape === 'square',
          rounded: shape === 'rounded',
        },
      ]"
      @click="openLegacyFileSelect"
    >
      <VIcon
        v-if="props.icon !== false"
        :icon="icon"
        :size="size"
        class="pointer-events-none"
      />

      <input
        :id="`${id}-file`"
        type="file"
        class="hidden"
        :multiple="multiple"
        @change="handleFileSelect"
      />

      <input
        :id="id"
        type="text"
        class="w-full cursor-pointer bg-transparent p-2 caret-transparent"
        :class="[$sizeToClass(props.size)]"
        :placeholder="placeholder"
        :required="required"
        :disabled="disabled"
        :value="inputValue"
        :aria-labelledby="props.label !== false ? `${id}-label` : null"
        :aria-describedby="props.helper !== false ? `${id}-helper` : null"
        @keydown.prevent
      />

      <div v-if="clearButton" class="relative flex items-center">
        <span
          v-if="modelValue.length > 0 || inputValue.length > 0"
          class="material-symbols-rounded absolute right-1 flex aspect-square cursor-pointer items-center justify-center rounded-full text-nord-dark-300 duration-300 hover:bg-nord-light-300 dark:text-nord-light-300 dark:hover:bg-nord-dark-300"
          :class="[classRemoveButton, $sizeToClass(size)]"
          @click.stop.prevent="reset"
        >
          clear
        </span>
      </div>

      <VIcon
        icon="upload"
        :size="size"
        side="right"
        class="pointer-events-none"
      />
    </div>
  </div>
</template>
