<script setup>
import { ref } from 'vue'
import VDarkModeToggle from './components/Theme/V-DarkModeToggle.vue'
import VHeading from './components/Typography/V-Heading.vue'
import VInput from './components/Form/V-Input.vue'
import VCheckbox from './components/Form/V-Checkbox.vue'
import VButton from './components/Form/V-Button.vue'
import VTextarea from './components/Form/V-Textarea.vue'
import VSelect from './components/Form/V-Select.vue'
import VDatePicker from './components/Form/V-DatePicker.vue'

// eslint-disable-next-line no-unused-vars
const string = ref('')
// eslint-disable-next-line no-unused-vars
const array = ref([])
// eslint-disable-next-line no-unused-vars
const boolean = ref(true)
</script>

<template>
  <VDarkModeToggle />

  <div id="app" class="flex p-10">
    <div class="flex">
      <div class="flex w-[500px] flex-col">
        <div class="flex flex-col space-y-4">
          <VHeading heading="h1" size="2xl">Input</VHeading>

          <div class="flex space-x-4">
            <VInput
              v-model="string"
              placeholder="Placeholder"
              size="sm"
              icon="search"
              label="Label"
              helper="Helper"
              required
              color="green"
            />

            <VInput
              v-model="string"
              placeholder="Placeholder"
              color="mauve"
              icon="search"
              label="Label"
              helper="Helper"
            />
          </div>

          <div class="flex justify-between">
            <VCheckbox
              v-model="boolean"
              label="Label"
              helper="Helper"
              size="sm"
              color="red"
            />

            <VCheckbox
              v-model="boolean"
              label="Label"
              helper="Helper"
              size="sm"
              color="green"
            />

            <VCheckbox
              v-model="boolean"
              label="Label"
              helper="Helper"
              size="sm"
              color="blue"
            />

            <VCheckbox
              v-model="boolean"
              label="Label"
              helper="Helper"
              size="sm"
              color="orange"
            />

            <VCheckbox
              v-model="boolean"
              label="Label"
              helper="Helper"
              size="sm"
              color="mauve"
            />
          </div>

          <div class="flex space-x-4">
            <VTextarea
              v-model="string"
              placeholder="Placeholder"
              size="sm"
              label="Label"
              helper="Helper"
            />

            <VTextarea
              v-model="string"
              placeholder="Placeholder"
              size="sm"
              error="test"
              label="Label"
              helper="Helper"
            />
          </div>

          <div class="flex space-x-4">
            <VSelect
              v-model="string"
              placeholder="Placeholder"
              size="sm"
              label="Label"
              icon="list"
              helper="Helper"
              :options="['Option 1', 'Option 2', 'Option 3']"
            />

            <VSelect
              v-model="array"
              placeholder="Placeholder"
              size="sm"
              label="Label"
              icon="list"
              error="test"
              search
              multiple
              :text-reducer="(item) => item.label"
              :value-reduder="(item) => item.value"
              helper="Helper"
              :options="[
                { value: 'Option 1', label: 'Option 1' },
                { value: 'Option 2', label: 'Option 2' },
                { value: 'Option 3', label: 'Option 3' },
              ]"
            />
          </div>

          <div class="flex space-x-4">
            <VDatePicker
              v-model="string"
              placeholder="Placeholder"
              size="sm"
              label="Label"
              icon="calendar_month"
              helper="Helper"
              color="mauve"
            />

            <VDatePicker
              v-model="string"
              time-picker
              placeholder="Placeholder"
              size="base"
              label="Label"
              icon="calendar_month"
              helper="Helper"
              color="green"
            />
          </div>

          <VHeading heading="h1" size="2xl">Buttons</VHeading>

          <div class="flex justify-between">
            <VButton
              type="button"
              size="sm"
              color="red"
              text="Button"
              processing
            />

            <VButton type="button" size="sm" color="green" text="Button" />

            <VButton type="button" size="sm" color="blue" text="Button" />

            <VButton type="button" size="sm" color="orange" text="Button" />

            <VButton type="button" size="sm" color="mauve" text="Button" />
          </div>

          <div class="flex justify-between">
            <VButton
              type="button"
              size="sm"
              color="red"
              text="Button"
              outline
            />

            <VButton
              type="button"
              size="sm"
              color="green"
              text="Button"
              outline
              processing
            />

            <VButton
              type="button"
              size="sm"
              color="blue"
              text="Button"
              outline
            />

            <VButton
              type="button"
              size="sm"
              color="orange"
              text="Button"
              outline
            />

            <VButton
              type="button"
              size="sm"
              color="mauve"
              text="Button"
              outline
            />
          </div>

          <div class="flex justify-between">
            <VButton
              type="button"
              size="sm"
              color="red"
              text="Button"
              icon="group"
            />

            <VButton
              type="button"
              size="sm"
              color="green"
              text="Button"
              icon="calendar_month"
            />

            <VButton
              type="button"
              size="sm"
              color="blue"
              text="Button"
              icon="save"
              processing
            />

            <VButton
              type="button"
              size="sm"
              color="orange"
              text="Button"
              icon="settings"
            />

            <VButton
              type="button"
              size="sm"
              color="mauve"
              text="Button"
              icon="music_note"
            />
          </div>

          <div class="flex justify-between">
            <VButton type="button" size="sm" color="red" icon="group" />

            <VButton
              type="button"
              size="sm"
              color="green"
              icon="calendar_month"
            />

            <VButton type="button" size="sm" color="blue" icon="save" />

            <VButton
              type="button"
              size="sm"
              color="orange"
              processing
              icon="settings"
            />

            <VButton type="button" size="sm" color="mauve" icon="music_note" />
          </div>

          <div class="flex justify-between">
            <VButton type="button" size="sm" color="red" icon="group" outline />

            <VButton
              type="button"
              size="sm"
              color="green"
              icon="calendar_month"
              outline
            />

            <VButton type="button" size="sm" color="blue" icon="save" outline />

            <VButton
              type="button"
              size="sm"
              color="orange"
              icon="settings"
              outline
            />

            <VButton
              type="button"
              size="sm"
              color="mauve"
              icon="music_note"
              processing
              outline
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
