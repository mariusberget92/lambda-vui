<script setup>
import { defineProps, defineEmits, ref, onMounted } from 'vue'
import VLabel from './Partials/V-Label.vue'
import VButton from './V-Button.vue'

/**
 * Define the component emits.
 */
const emit = defineEmits(['update:modelValue', 'error'])

/**
 * Component props.
 *
 * @type {Object}
 */
const props = defineProps({
  /**
   * The ID of the tags input.
   * If none is provided, a random one will be generated.
   *
   * @type {String}
   * @required
   * @default lambda-input-<random>
   */
  id: {
    type: String,
    default: () => {
      return 'lambda-tgs-' + Math.random().toString(36).substring(2, 9)
    },
  },

  /**
   * Model value of the tags input.
   *
   * @type {Array}
   * @default []
   * @required
   */
  modelValue: {
    type: Array,
    default: () => [],
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
   * The label of the tags input.
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
   * The helper text of the tags input.
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
   * Whether the tags input is required.
   *
   * @type {Boolean}
   * @default false
   */
  required: {
    type: Boolean,
    default: false,
  },

  /**
   * The placeholder of the tags input.
   *
   * @type {String}
   * @default ''
   */
  placeholder: {
    type: String,
    default: '',
  },

  /**
   * Whether the tags input is disabled.
   *
   * @type {Boolean}
   * @default false
   */
  disabled: {
    type: Boolean,
    default: false,
  },

  /**
   * Wheter the tags input has an error.
   *
   * @type {String|Boolean}
   * @default false
   */
  error: {
    type: [String, Boolean],
    default: false,
  },

  /**
   * Whether the tags input is rounded.
   *
   * @type {Boolean}
   * @default true
   */
  rounded: {
    type: Boolean,
    default: true,
  },

  /**
   * The color of the tags input.
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
   * The maximum amount of tags.
   * 0 means no limit.
   *
   * @type {Number}
   * @default 5
   */
  max: {
    type: Number,
    default: 5,
  },
})

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
 * @type {Object}
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
 * @return {void}
 */
const toggleTagButton = () => {
  showNewTagButton.value = !showNewTagButton.value
}

/**
 * Key handler.
 *
 * @param  {Event} event
 * @return {void}
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
  }
}

/**
 * Add a new tag.
 *
 * @param  {String} tag
 * @return {void}
 */
const addTag = (tag) => {
  if (tag.length === 0) {
    return
  }

  if (tagAlreadyExists(tag.trim())) {
    resetTagInput()
    emit('error', 'Tag already exists')
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
}

/**
 * Remove a tag.
 *
 * @param  {String} tag
 * @return {void}
 */
// eslint-disable-next-line no-unused-vars
const removeTag = (tag) => {
  tags.value = tags.value.filter((t) => t !== tag)
  emit('update:modelValue', tags.value)
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
 * @return {void}
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
        class="flex items-center gap-x-2 border-l-4 bg-nord-light-400 px-2 py-2 text-nord-dark-300 dark:bg-nord-dark-100 dark:text-nord-light-300"
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

        <span
          class="material-symbols-rounded flex aspect-square cursor-pointer items-center justify-center rounded-full text-nord-dark-300 duration-300 hover:bg-nord-light-100 dark:text-nord-light-300 dark:hover:bg-nord-dark-300"
          :class="[
            $sizeToClass(props.size),
            {
              'w-4': props.size === 'xs',
              'w-5': props.size === 'sm',
              'w-6': props.size === 'base',
              'w-7': props.size === 'lg',
              'w-8': props.size === 'xl',
              'w-9': props.size === '2xl',
            },
          ]"
          @click="removeTag(value)"
        >
          close
        </span>
      </div>

      <span
        ref="tagInputRef"
        class="flex h-auto w-8 grow overflow-hidden border-l-4 bg-nord-light-400 px-2 py-2 text-nord-dark-300 outline-none dark:bg-nord-dark-100 dark:text-nord-light-300"
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
