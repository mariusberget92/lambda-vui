<script setup>
import {ref } from 'vue'
import VDarkModeToggle from './components/Theme/V-DarkModeToggle.vue'
import VInput from './components/Form/V-Input.vue'
import VHeading from './components/Typography/V-Heading.vue';
import VCheckbox from './components/Form/V-Checkbox.vue';
import VButton from './components/Form/V-Button.vue';
import VSelect from './components/Form/V-Select.vue';
import VTagger from './components/Form/V-Tagger.vue';
const tags = ref([])
</script>

<template>
  <VDarkModeToggle />

  <div id="app" class="flex p-10">
    <div class="flex">
      <div class="w-[400px] flex flex-col">
        
        <div class="flex flex-col space-y-4">

          <VHeading
            heading="h1"
            size="2xl"
            text="Input"
          >Input</VHeading>

          <VInput
            required
            label="Name"
            helper="Only letters and spaces are allowed."
            placeholder="Enter your name"
            size="xs"
          />

          <VInput
            required
            label="Password"
            helper="Must be at least 8 characters long."
            placeholder="Enter your password"
            type="password"
            size="sm"
          />

          <VCheckbox
            label="Remember me"
            helper="Check this box if you want to be remembered."
            size="sm"
          />

          <VSelect
            label="Select"
            helper="Select an option."
            size="sm"
            icon="group"
            shape="pill"
            :options="[
              { text: 'Option 1', value: 'option-1' },
              { text: 'Option 2', value: 'option-2' },
              { text: 'Option 3', value: 'option-3' },
            ]"
          />

          <VTagger
            v-model="tags"
            label="Tagger"
            helper="Add tags."
            size="base"
            :options="[
              { text: 'Option 1', value: 'option-1' },
              { text: 'Option 2', value: 'option-2' },
              { text: 'Option 3', value: 'option-3' },
            ]" 
          />

          <div class="flex space-x-1">

            <VButton
            text="Submit"
            size="sm"
            color="red"
          />

          <VButton
            text="Submit"
            icon="group"
            size="sm"
            color="green"
          />

          <VButton
            icon="group"
            size="sm"
            color="blue"
          />
          </div>
          
        </div>

      </div>
    </div>
  </div>
</template>
