<script setup>
import { ref } from 'vue'
import VDarkModeToggle from './components/Theme/V-DarkModeToggle.vue'
import VHeading from './components/Typography/V-Heading.vue'
import VDatePicker from './components/Form/V-DatePicker.vue'

const date = ref('2023-05-02 12:00')
</script>

<template>
  <VDarkModeToggle />

  <div id="app" class="flex p-10">
    <div class="flex">
      <div class="flex w-[400px] flex-col">
        <div class="flex flex-col space-y-4">
          <VHeading heading="h1" size="2xl" text="Input">Input</VHeading>

          <VDatePicker
            v-model="date"
            time-picker
            label="Datepicker input"
            helper="Datepicker input with keyboard navigation as long as the focus is on the input."
            placeholder="Placeholder"
            size="sm"
            color="mauve"
            icon="calendar_month"
          />
        </div>
      </div>
    </div>
  </div>
</template>
