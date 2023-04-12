<script setup>
import { ref } from 'vue'
import VInput from './components/Form/V-Input.vue'
import VCheckbox from './components/Form/V-Checkbox.vue'
import VButton from './components/Form/V-Button.vue'
import VDarkModeToggle from './components/Theme/V-DarkModeToggle.vue'
import VSelect from './components/Form/V-Select.vue'

const select = ref('norge')
const checkbox = ref(false)
const input = ref('test')
</script>

<template>
  <VDarkModeToggle />

  <div id="app" class="flex p-10 space-x-8">
    <div class="flex flex-col space-y-4 w-[300px] max-w-[300px]">
      <VSelect
        v-model="select"
        size="xs"
        label="Select"
        helper="Select an option."
        icon="list"
        :selectOptions="[
          { text: 'Norge', value: 'norge', emoji: '🇳🇴' },
          { text: 'Sverige', value: 'sverige', emoji: '🇸🇪' },
          { text: 'Danmark', value: 'danmark', emoji: '🇩🇰' },
        ]"
      />

      <VInput
        v-model="input"
        size="xs"
        label="Username"
        helper="Your username is required."
        placeholder="Username"
        icon="group"
      />

      <VCheckbox
        v-model="checkbox"
        size="xs"
        label="Remember me"
        helper="Remember me for 30 days."
      />

      <VButton size="xs" text="Save" />
    </div>
  </div>
</template>
