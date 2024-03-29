<script setup>
import { defineProps, defineEmits, ref, onMounted } from 'vue'
import VLabel from './Partials/V-Label.vue'
import VButton from './V-Button.vue'
import VInputResetButton from './Partials/V-InputResetButton.vue'

/**
 * Component emits.
 *
 * @property {Array} update:modelValue - Emits when the model value is updated.
 * @property {Array} change - Emits when the tags input is changed.
 * @property {String} error - Emits when the tags input has an error.
 */
const emit = defineEmits(['update:modelValue', 'error', 'change'])

/**
 * Component props.
 *
 * @property {String} id - The ID of the tags input.
 * @property {Array} modelValue - Model value of the tags input.
 * @property {String} size - The size of the tags input.
 * @property {String|Boolean} label - The label of the tags input.
 * @property {String|Boolean} helper - The helper text of the tags input.
 * @property {Boolean} required - Whether the tags input is required.
 * @property {String} placeholder - The placeholder of the tags input.
 * @property {Boolean} disabled - Whether the tags input is disabled.
 * @property {String|Boolean} error - Wheter the tags input has an error.
 * @property {Boolean} rounded - Whether the tags input is rounded.
 * @property {String} color - The color of the tags input.
 * @property {Number} max - The maximum amount of tags. 0 for unlimited.
 */
const props = defineProps({
  /**
   * The ID of the tags input.
   */
  id: {
    type: String,
    default: () => {
      return 'lambda-tgs-' + Math.random().toString(36).substring(2, 9)
    },
  },

  /**
   * Model value of the tags input.
   */
  modelValue: {
    type: Array,
    default: () => [],
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
   * The label of the tags input.
   */
  label: {
    type: [String, Boolean],
    default: false,
  },

  /**
   * The helper text of the tags input.
   */
  helper: {
    type: [String, Boolean],
    default: false,
  },

  /**
   * Whether the tags input is required.
   */
  required: {
    type: Boolean,
    default: false,
  },

  /**
   * The placeholder of the tags input.
   */
  placeholder: {
    type: String,
    default: '',
  },

  /**
   * Whether the tags input is disabled.
   */
  disabled: {
    type: Boolean,
    default: false,
  },

  /**
     * Wheter the tags input has an error.
   */
  error: {
    type: [String, Boolean],
    default: false,
  },

  /**
   * Whether the tags input is rounded.
   */
  rounded: {
    type: Boolean,
    default: true,
  },

  /**
   * The color of the tags input.
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
   * The maximum amount of tags. 0 for unlimited.
   */
  max: {
    type: Number,
    default: 5,
  },
})

/**
 * Focus the tag input on mount.
 * 
 * @return {void}
 */
onMounted(() => {
  tagInputRef.value.focus()
})

/**
 * The tags model.
 *
 * @type {Array}
 */
const tags = ref(props.modelValue)

/**
 * The tag input ref.
 *
 * @type {Null|HTMLElement}
 */
const tagInputRef = ref(null)

/**
 * Whether the new tag button should be shown.
 *
 * @type {Boolean}
 */
const showNewTagButton = ref(true)

/**
 * Toggle the new tag button.
 *
 * @return {Void}
 */
const toggleTagButton = () => {
  showNewTagButton.value = !showNewTagButton.value
}

/**
 * Key handler.
 *
 * @param  {Event} event
 * @return {Void}
 */
const keyHandler = (event) => {
  if (event.key === 'Enter' || event.key === 'Tab') {
    event.preventDefault()
    addTag(tagInputRef.value.innerText)
  }

  if (event.key === 'Escape') {
    event.preventDefault()
    resetTagInput()
    toggleTagButton()
  }

  if (event.key === 'Backspace' && tagInputRef.value.innerText === '') {
    tags.value.pop()
    emit('update:modelValue', tags.value)
    emit('change', tags.value)
  }
}

/**
 * Add a new tag.
 *
 * @param  {String} tag
 * @return {Void}
 */
const addTag = (tag) => {
  if (tag.length === 0) {
    return
  }

  if (tagAlreadyExists(tag.trim())) {
    resetTagInput()
    emit('error', 'Tag already added')
    return
  }

  if (props.max !== 0 && tags.value.length >= props.max) {
    resetTagInput()
    emit('error', 'Maximum amount of tags reached')
    return
  }

  tags.value.push(tag)
  resetTagInput()
  emit('update:modelValue', tags.value)
  emit('change', tags.value)
}

/**
 * Remove a tag.
 *
 * @param  {String} tag
 * @return {Void}
 */
const removeTag = (tag) => {
  tags.value = tags.value.filter((t) => t !== tag)
  emit('update:modelValue', tags.value)
  emit('change', tags.value)
}

/**
 * Whether a tag already exists.
 *
 * @param  {String} tag
 * @return {Boolean}
 */
const tagAlreadyExists = (tag) => {
  return tags.value.includes(tag)
}

/**
 * Reset the tag input.
 *
 * @return {Void}
 */
const resetTagInput = () => {
  tagInputRef.value.innerHTML = ''
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

    <div class="flex flex-wrap items-center gap-x-2 gap-y-1">
      <div
        v-for="(value, index) in props.modelValue"
        :key="index"
        class="flex items-center gap-x-2 border-l-4 bg-nord-light-400 p-2 text-nord-dark-300 dark:bg-nord-dark-100 dark:text-nord-light-300"
        :class="[
          $sizeToClass(props.size),
          {
            rounded: props.rounded,
            'border-nord-red-300 dark:border-nord-red-300':
              props.color === 'red',
            'border-nord-green-300 dark:border-nord-green-300':
              props.color === 'green',
            'border-nord-blue-300 dark:border-nord-blue-300':
              props.color === 'blue',
            'border-nord-orange-300 dark:border-nord-orange-300':
              props.color === 'orange',
            'border-nord-yellow-300 dark:border-nord-yellow-300':
              props.color === 'yellow',
            'border-nord-mauve-300 dark:border-nord-mauve-300':
              props.color === 'mauve',
          },
        ]"
      >
        {{ value }}

        <VInputResetButton
          :size="props.size"
          :model-value="1"
          :absolute="false"
          @reset="removeTag(value)"
        />
      </div>

      <span
        ref="tagInputRef"
        class="flex h-auto w-8 grow overflow-hidden border-l-4 bg-nord-light-400 p-2 text-nord-dark-300 outline-none dark:bg-nord-dark-100 dark:text-nord-light-300"
        :class="[
          $sizeToClass(props.size),
          {
            rounded: props.rounded,
            'border-nord-red-300 dark:border-nord-red-300':
              props.color === 'red',
            'border-nord-green-300 dark:border-nord-green-300':
              props.color === 'green',
            'border-nord-blue-300 dark:border-nord-blue-300':
              props.color === 'blue',
            'border-nord-orange-300 dark:border-nord-orange-300':
              props.color === 'orange',
            'border-nord-yellow-300 dark:border-nord-yellow-300':
              props.color === 'yellow',
            'border-nord-mauve-300 dark:border-nord-mauve-300':
              props.color === 'mauve',
            hidden: showNewTagButton,
          },
        ]"
        role="textbox"
        contenteditable
        @blur="showNewTagButton = true"
        @keydown="keyHandler"
      ></span>

      <VButton
        v-if="showNewTagButton"
        :size="size"
        icon="add_circle"
        :rounded="props.rounded"
        :text="props.placeholder"
        @click="toggleTagButton"
      />
    </div>
  </div>
</template>
