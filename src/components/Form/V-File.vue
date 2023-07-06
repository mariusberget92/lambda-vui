<script setup>
import { defineProps, defineEmits, computed } from 'vue'
import VLabel from './Partials/V-Label.vue'
import VIcon from './Partials/V-Icon.vue'
import VInputResetButton from './Partials/V-InputResetButton.vue'

/**
 * Component emits.
 *
 * @property {File|Boolean|Array} update:modelValue - Emits when the model value is updated.
 * @property {File|Boolean|Array} change - Emits when the input is changed.
 * @property {String} error - Emits when the input is invalid.
 */
const emit = defineEmits(['update:modelValue', 'error', 'change'])

/**
 * Component props.
 *
 * @property {String} id - The ID of the file input.
 * @property {File|Boolean|Array} modelValue - Model value of the input.
 * @property {String} size - Input size.
 * @property {String|Boolean} label - The label of the input.
 * @property {String|Boolean} helper - The helper text of the input.
 * @property {Boolean} required - Whether the input is required.
 * @property {String|Boolean} icon - The icon of the input.
 * @property {String} placeholder - The placeholder of the input.
 * @property {Boolean} disabled - Whether the input is disabled.
 * @property {String|Boolean} error - Wheter the input has an error.
 * @property {Boolean} rounded - Whether the input is rounded.
 * @property {String} color - The color of the input.
 * @property {Boolean} multiple - Whether the input accepts multiple files.
 * @property {Array} extensions - The accepted file extensions.
 * @property {Number} maxFiles - The maximum number of files.
 * @property {Number} maxFileSize - The maximum file size in bytes.
 * @property {Boolean} clearButton - Whether the input is clearable.
 */
const props = defineProps({
  /**
   * The ID of the file input.
   */
  id: {
    type: String,
    default: () => {
      return 'lambda-file-' + Math.random().toString(36).substring(2, 9)
    },
  },

  /**
   * Model value of the input.
   */
  modelValue: {
    type: [File, Boolean, Array],
    default: false,
    required: true,
  },

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
   * The label of the input.
   */
  label: {
    type: [String, Boolean],
    default: false,
  },

  /**
   * The helper text of the input.
   */
  helper: {
    type: [String, Boolean],
    default: false,
  },

  /**
   * Whether the input is required.
   */
  required: {
    type: Boolean,
    default: false,
  },

  /**
   * The icon of the input.
   */
  icon: {
    type: [String, Boolean],
    default: false,
  },

  /**
   * The placeholder of the input.
   */
  placeholder: {
    type: String,
    default: '',
  },

  /**
   * Whether the input is disabled.
   */
  disabled: {
    type: Boolean,
    default: false,
  },

  /**
   * Wheter the input has an error.
   */
  error: {
    type: [String, Boolean],
    default: false,
  },

  /**
   * Whether the input is rounded.
   */
  rounded: {
    type: Boolean,
    default: true,
  },

  /**
   * The color of the datepicker buttons.
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

  /**
   * Whether the input is multiple.
   */
  multiple: {
    type: Boolean,
    default: false,
  },

  /**
   * The accepted file extensions.
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
   */
  maxFiles: {
    type: Number,
    default: 1,
  },

  /**
   * The maximum file size in bytes.
   */
  maxFileSize: {
    type: Number,
    default: 5 * 1024 * 1024,
  },

  /**
   * Whether the input is clearable.
   */
  clearButton: {
    type: Boolean,
    default: true,
  },
})

/**
 * Key handler.
 *
 * @param {KeyboardEvent} event
 * @returns {Void}
 */
const keyHandler = (event) => {
  if (event.key === 'Enter') {
    openLegacyFileSelect()
  }

  if (event.key === 'Tab') {
    return
  }

  event.preventDefault()
}

/**
 * The input value to be shown as we cannot show files as plain string values.
 *
 * @returns {String}
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
 * @returns {Void}
 */
const openLegacyFileSelect = () => {
  const input = document.getElementById(`${props.id}-file`)
  input.click()
}

/**
 * Reset the input.
 *
 * @returns {Void}
 */
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
    emit('error', 'You can only select one file.')
    return
  }

  // Check if the number of files exceeds the maximum
  if (filteredFiles.length > props.maxFiles) {
    emit('error', `You can only select up to ${props.maxFiles} files.`)
    return
  }

  // Display a warning if some files were filtered out
  if (filteredFiles.length !== files.length) {
    emit(
      'error',
      `Some files are not allowed and are filtered out. Allowed extensions are ${props.extensions.join(
        ', '
      )}`
    )
  }

  // Validate each file
  const validatedFiles = validateFiles(filteredFiles)

  // Emit the selected file(s) to the parent component
  emit('update:modelValue', props.multiple ? validatedFiles : validatedFiles[0])
  emit('change', props.multiple ? validatedFiles : validatedFiles[0])
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
 * @param {String} fileName
 * @returns {String}
 */
const getFileExtension = (fileName) => {
  return fileName.split('.').pop()
}
</script>

<template>
  <div class="flex w-full flex-col" :class="{ 'opacity-50': props.disabled }">
    <VLabel
      v-if="props.label"
      :id="props.id"
      :label="props.label"
      :required="props.required"
      :helper="props.helper"
      :size="props.size"
    />

    <div
      class="flex border-l-0 bg-nord-light-400 transition-all duration-100 ease-in-out focus-within:border-l-4 dark:bg-nord-dark-100"
      :class="[
        {
          rounded: props.rounded,
          '!border-l-4 border-l-nord-red-300': props.error,
          'focus-within:border-nord-red-300': props.color === 'red',
          'focus-within:border-nord-blue-300': props.color === 'blue',
          'focus-within:border-nord-green-300': props.color === 'green',
          'focus-within:border-nord-mauve-300': props.color === 'mauve',
          'focus-within:border-nord-orange-300': props.color === 'orange',
          'focus-within:border-nord-yellow-300': props.color === 'yellow',
        },
      ]"
      @click="!props.disabled && openLegacyFileSelect()"
    >
      <VIcon
        v-if="props.icon"
        :icon="props.icon"
        :size="props.size"
        class="cursor-pointer"
      />

      <input
        :id="`${props.id}-file`"
        type="file"
        class="hidden"
        :multiple="props.multiple"
        @change="handleFileSelect"
      />

      <input
        :id="props.id"
        type="text"
        class="w-full cursor-pointer bg-transparent caret-transparent"
        :class="[
          $sizeToClass(props.size),
          {
            'px-2 py-2': props.icon,
            'px-3 py-2': !props.icon,
          },
        ]"
        :placeholder="props.placeholder"
        :required="props.required"
        :disabled="props.disabled"
        :value="inputValue"
        :aria-labelledby="props.label ? `${props.id}-label` : null"
        :aria-describedby="props.helper ? `${props.id}-helper` : null"
        @keydown="keyHandler"
      />

      <template v-if="props.clearButton">
        <VInputResetButton
          :size="props.size"
          :model-value="props.modelValue"
          @reset="reset"
        />
      </template>

      <VIcon
        icon="upload"
        :size="props.size"
        side="right"
        class="cursor-pointer"
      />
    </div>
  </div>
</template>
