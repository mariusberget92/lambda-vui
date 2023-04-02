<script setup>
import { ref } from 'vue'
import VInput from './components/Form/V-Input.vue'
import VCheckbox from './components/Form/V-Checkbox.vue'
import VButton from './components/Form/V-Button.vue'
import VDarkModeToggle from './components/Theme/V-DarkModeToggle.vue'
import VSelect from './components/Form/V-Select.vue'

const dataArray = ref([])
</script>

<template>
  <VDarkModeToggle />

  <div id="app" class="flex p-10 space-x-8">
    <div class="flex flex-col space-y-4">
      <VSelect
        v-model="dataArray"
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
    </div>

    <div class="flex flex-col space-y-4">
      <VButton size="xs" icon="save" />
      <VButton size="sm" color="red" icon="save" />
      <VButton size="base" color="green" icon="save" />
      <VButton size="lg" color="orange" icon="save" />
      <VButton size="xl" color="yellow" icon="save" />
      <VButton size="2xl" color="mauve" icon="save" />
    </div>

    <div class="flex flex-col space-y-4">
      <VCheckbox
        size="xs"
        label="Remember me"
        helper="Remember me for 30 days."
      />

      <VCheckbox
        size="sm"
        label="Remember me"
        helper="Remember me for 30 days."
        required
      />

      <VCheckbox
        size="base"
        label="Remember me"
        helper="Remember me for 30 days."
        required
      />

      <VCheckbox
        size="lg"
        label="Remember me"
        helper="Remember me for 30 days."
        required
      />

      <VCheckbox
        size="xl"
        label="Remember me"
        helper="Remember me for 30 days."
        required
      />

      <VCheckbox
        size="2xl"
        label="Remember me"
        helper="Remember me for 30 days."
        required
      />
    </div>

    <div class="flex flex-col space-y-4">
      <VInput
        size="xs"
        label="Username"
        helper="Your username is required."
        placeholder="Username"
        icon="group"
        error="Some error"
        required
      />

      <VInput
        size="sm"
        label="Password"
        helper="Your password is required."
        placeholder="Password"
        icon="lock"
        type="password"
        required
      />

      <VInput
        size="base"
        label="Email"
        helper="Your email is required."
        placeholder="Email"
        icon="mail"
        type="email"
        required
      />

      <VInput
        size="lg"
        label="Phone"
        helper="Your phone is optional."
        placeholder="Phone"
        icon="phone"
      />

      <VInput
        size="xl"
        label="First name"
        helper="Your first name is optional."
        placeholder="First name"
        icon="signature"
      />

      <VInput
        size="2xl"
        label="Last name"
        helper="Your last name is optional."
        placeholder="Last name"
        icon="signature"
      />
    </div>
  </div>
</template>
