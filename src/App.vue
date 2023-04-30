<script setup>
import { ref } from 'vue'
import VDarkModeToggle from './components/Theme/V-DarkModeToggle.vue'
import VInput from './components/Form/V-Input.vue'
import VHeading from './components/Typography/V-Heading.vue'
import VTextarea from './components/Form/V-Textarea.vue'
import VCheckbox from './components/Form/V-Checkbox.vue'
import VButton from './components/Form/V-Button.vue'
import VSelect from './components/Form/V-Select.vue'
import VDatePicker from './components/Form/V-DatePicker.vue'

const input = ref('')
const boolean = ref(true)
const select = ref('option-1')
const selectMultiple = ref(['viewAny.user', 'viewAny.role'])
const date = ref('')
</script>

<template>
  <VDarkModeToggle />

  <div id="app" class="flex p-10">
    <div class="flex">
      <div class="flex w-[400px] flex-col">
        <div class="flex flex-col space-y-4">
          <VHeading heading="h1" size="2xl" text="Input">Input</VHeading>

          <VInput
            v-model="input"
            label="Text input without an icon and not required"
            helper="A helper text."
            placeholder="Placeholder"
            size="sm"
          />

          <VInput
            v-model="input"
            required
            label="Text input"
            helper="A helper text."
            placeholder="Placeholder"
            size="sm"
            icon="group"
          />

          <VInput
            v-model="input"
            required
            label="Text input with an error"
            helper="A helper text."
            placeholder="Placeholder"
            size="sm"
            icon="group"
            error="Some error"
          />

          <VTextarea
            v-model="input"
            required
            label="Textarea"
            helper="A helper text."
            placeholder="Textarea cannot have icons."
            size="sm"
          />

          <VCheckbox
            v-model="boolean"
            required
            label="Checkbox input"
            helper="They can only have a boolean model ( true or false )."
            size="sm"
          />

          <VSelect
            v-model="select"
            required
            label="Single select input"
            helper="With search for filtering."
            placeholder="Placeholder"
            size="sm"
            icon="list"
            search
            :options="['option-1', 'option-2', 'option-3']"
          />

          <VSelect
            v-model="selectMultiple"
            required
            label="Multiselect input"
            helper="With search for filtering and toggle all checkbox."
            placeholder="Placeholder"
            size="sm"
            search
            multiple
            :options="[
              { value: 'viewAny.user', text: 'View all users' },
              { value: 'viewAny.role', text: 'View all roles' },
              { value: 'viewAny.permission', text: 'View all permissions' },
              { value: 'viewAny.setting', text: 'View all settings' },
              { value: 'create.user', text: 'Create a user' },
              { value: 'create.role', text: 'Create a role' },
              { value: 'create.permission', text: 'Create a permission' },
              { value: 'create.setting', text: 'Create a setting' },
              { value: 'edit.user', text: 'Edit a user' },
              { value: 'edit.role', text: 'Edit a role' },
              { value: 'edit.permission', text: 'Edit a permission' },
              { value: 'edit.setting', text: 'Edit a setting' },
              { value: 'delete.user', text: 'Delete a user' },
              { value: 'delete.role', text: 'Delete a role' },
              { value: 'delete.permission', text: 'Delete a permission' },
              { value: 'delete.setting', text: 'Delete a setting' },
            ]"
          />

          <VDatePicker
            v-model="date"
            label="Datepicker input"
            helper="Datepicker input with keyboard navigation as long as the focus is on the input."
            placeholder="Placeholder"
            size="sm"
            icon="calendar_month"
          />
  
          <div class="flex flex-wrap gap-2">
            <VButton size="sm" text="Outline button" icon="group" outline />
            <VButton size="sm" icon="group" color="green" />
            <VButton size="sm" text="Submit" color="yellow" />
            <VButton size="sm" icon="save" :processing="true" color="orange" outline />
            <VButton size="sm" text="Submit" color="mauve" />
            <VButton size="sm" text="Submit" color="blue" />
            <VButton
              size="sm"
              text="Submit"
              color="orange"
              :processing="true"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
