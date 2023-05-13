<script setup>
import { ref } from 'vue'
import VDarkModeToggle from './components/Theme/V-DarkModeToggle.vue'
import VHeading from './components/Typography/V-Heading.vue'
import VInput from './components/Form/V-Input.vue'
import VTextarea from './components/Form/V-Textarea.vue'
import VButton from './components/Form/V-Button.vue'
import VSelect from './components/Form/V-Select.vue'
import VFile from './components/Form/V-File.vue'
import VCheckbox from './components/Form/V-Checkbox.vue'
import VDateTimePicker from './components/Form/V-DateTimePicker.vue'

// eslint-disable-next-line no-unused-vars
const string = ref('')
// eslint-disable-next-line no-unused-vars
const text = ref('')
// eslint-disable-next-line no-unused-vars
const array = ref([])
// eslint-disable-next-line no-unused-vars
const boolean = ref(true)
// eslint-disable-next-line no-unused-vars
const date = ref('')
// eslint-disable-next-line no-unused-vars
const time = ref('')
// eslint-disable-next-line no-unused-vars
const datetime = ref('')
// eslint-disable-next-line no-unused-vars
const file = ref(false)
</script>

<template>
  <VDarkModeToggle />

  <div id="app" class="flex p-10">
    <div class="flex space-x-4">
      <div class="flex w-[300px] flex-col space-y-4">
        <VHeading heading="h1" size="2xl">Input</VHeading>

        <div class="flex flex-col space-y-4">
          <VInput
            v-model="string"
            placeholder="Placeholder"
            size="sm"
            icon="search"
            required
          />

          <VInput
            v-model="string"
            placeholder="Placeholder"
            size="base"
            icon="search"
            required
          />
        </div>

        <VHeading heading="h1" size="2xl">Textarea</VHeading>

        <div class="flex flex-col space-y-4">
          <VTextarea
            v-model="text"
            placeholder="Placeholder"
            size="sm"
            required
          />

          <VTextarea
            v-model="text"
            placeholder="Placeholder"
            size="base"
            required
            :rounded="false"
          />
        </div>

        <VHeading heading="h1" size="2xl">File input</VHeading>

        <div class="flex flex-col space-y-4">
          <VFile v-model="file" placeholder="Placeholder" size="sm" required />

          <VFile
            v-model="text"
            placeholder="Placeholder"
            size="base"
            required
          />
        </div>

        <VHeading heading="h1" size="2xl">Checkbox</VHeading>

        <div class="flex flex-col space-y-4">
          <VCheckbox
            v-model="boolean"
            size="sm"
            label="Checkbox"
            helper="Helper text"
            required
          />

          <VCheckbox
            v-model="boolean"
            size="base"
            required
            label="Checkbox"
            helper="Helper text"
            color="green"
          />
        </div>
      </div>

      <div class="flex w-[300px] flex-col space-y-4">
        <VHeading heading="h1" size="2xl">Buttons</VHeading>

        <div class="flex flex-col space-y-4">
          <div class="flex space-x-2">
            <VButton text="Save" size="sm" color="blue" />
            <VButton text="Save" icon="save" size="sm" color="blue" />
            <VButton size="sm" color="blue" icon="save" />
            <VButton size="sm" color="blue" icon="save" disabled />
            <VButton size="sm" color="blue" icon="save" processing />
          </div>

          <div class="flex space-x-2">
            <VButton text="Save" size="sm" color="blue" outline />
            <VButton text="Save" icon="save" size="sm" color="blue" outline />
            <VButton size="sm" color="blue" icon="save" outline />
            <VButton size="sm" color="blue" icon="save" disabled outline />
            <VButton size="sm" color="blue" icon="save" processing outline />
          </div>
        </div>

        <VHeading heading="h1" size="2xl">Select</VHeading>

        <div class="flex flex-col space-y-4">
          <VSelect
            v-model="string"
            placeholder="Placeholder"
            size="sm"
            :options="[
              'Example 1',
              'Example 2',
              'Example 3',
              'Example 4',
              'Example 5',
            ]"
            required
          />

          <VSelect
            v-model="string"
            search
            placeholder="Placeholder"
            size="sm"
            :options="[
              'Example 1',
              'Example 2',
              'Example 3',
              'Example 4',
              'Example 5',
            ]"
            required
          />
        </div>

        <VHeading heading="h1" size="2xl">Select (multiple)</VHeading>

        <div class="flex flex-col space-y-4">
          <VSelect
            v-model="array"
            placeholder="Placeholder"
            size="sm"
            multiple
            :options="[
              'Example 1',
              'Example 2',
              'Example 3',
              'Example 4',
              'Example 5',
            ]"
            required
          />

          <VSelect
            v-model="array"
            search
            multiple
            placeholder="Placeholder"
            size="sm"
            :options="[
              'Example 1',
              'Example 2',
              'Example 3',
              'Example 4',
              'Example 5',
            ]"
            required
          />
        </div>
      </div>

      <div class="flex w-[300px] flex-col space-y-4">
        <VHeading heading="h1" size="2xl">DateTimePicker</VHeading>

        <div class="flex flex-col space-y-4">
          <VDateTimePicker
            v-model="date"
            placeholder="Placeholder"
            size="sm"
            required
          />

          <VDateTimePicker
            v-model="datetime"
            placeholder="Placeholder"
            size="sm"
            time-picker
            required
          />

          <VDateTimePicker
            v-model="time"
            placeholder="Placeholder"
            size="sm"
            time-picker
            :date-picker="false"
            required
          />
        </div>

        <VHeading heading="h1" size="2xl">Toast</VHeading>

        <div class="flex space-x-2">
          <VButton
            size="sm"
            color="green"
            icon="check_circle"
            @click="
              $toast({ type: 'success', message: 'This is a success toast' })
            "
          />

          <VButton
            size="sm"
            color="red"
            icon="error"
            @click="
              $toast({ type: 'error', message: 'This is an error toast' })
            "
          />

          <VButton
            size="sm"
            color="blue"
            icon="info"
            @click="$toast({ type: 'info', message: 'This is an info toast' })"
          />

          <VButton
            size="sm"
            color="orange"
            icon="warning"
            @click="
              $toast({ type: 'warning', message: 'This is a warning toast' })
            "
          />
        </div>
      </div>
    </div>
  </div>
</template>
