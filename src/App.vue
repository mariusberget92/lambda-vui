<script setup>
import { ref } from 'vue'
import VDarkModeToggle from './components/Theme/V-DarkModeToggle.vue'
import VInput from './components/Form/V-Input.vue'
import VHeading from './components/Typography/V-Heading.vue'
import VTextarea from './components/Form/V-Textarea.vue'
import VCheckbox from './components/Form/V-Checkbox.vue'
import VButton from './components/Form/V-Button.vue'
import VSelect from './components/Form/V-Select.vue'

const input = ref('Test')
const boolean = ref(true)
const select = ref('option-1')
const selectMultiple = ref(['viewAny.user', 'viewAny.role'])
</script>

<template>
  <VDarkModeToggle />

  <div id="app" class="flex p-10">
    <div class="flex">
      <div class="flex w-[400px] flex-col">
        <div class="flex flex-col space-y-4">
          <VHeading heading="h1" size="2xl" text="Input">Input</VHeading>

          <VInput
            required
            v-model="input"
            label="A label"
            helper="A helper text."
            placeholder="Placeholder"
            size="base"
            icon="group"
          />

          <VTextarea
            required
            v-model="input"
            label="A label"
            helper="A helper text."
            placeholder="Placeholder"
            size="base"
          />

          <VCheckbox
            required
            v-model="boolean"
            label="A label"
            helper="A helper text."
            size="base"
          />

          <VButton size="base" text="Submit" icon="group" />

          <VSelect
            required
            v-model="select"
            label="A label"
            helper="A helper text."
            placeholder="Placeholder"
            size="base"
            icon="list"
            search
            :options="[
              'option-1',
              'option-2',
              'option-3',
            ]"
          />

          <VSelect
            required
            v-model="selectMultiple"
            label="A label"
            helper="A helper text."
            placeholder="Placeholder"
            size="base"
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
              { value: 'delete.setting', text: 'Delete a setting' },]"
          />
        </div>
      </div>
    </div>
  </div>
</template>
