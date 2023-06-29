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
import VRating from './components/Form/V-Rating.vue'
import VTags from './components/Form/V-Tags.vue'
import VSwitch from './components/Form/V-Switch.vue'
import VRadio from './components/Form/V-Radio.vue'
import VLink from './components/Typography/V-Link.vue'
import VText from './components/Typography/V-Text.vue'

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
// eslint-disable-next-line no-unused-vars
const rating1 = ref(1)
// eslint-disable-next-line no-unused-vars
const rating2 = ref(3)
// eslint-disable-next-line no-unused-vars
const tags = ref([])
// eslint-disable-next-line no-unused-vars
const switch1 = ref(false)
// eslint-disable-next-line no-unused-vars
const switch2 = ref(false)
// eslint-disable-next-line no-unused-vars
const switch3 = ref(false)
// eslint-disable-next-line no-unused-vars
const switch4 = ref(false)
// eslint-disable-next-line no-unused-vars
const radio = ref('')
</script>

<template>
  <VDarkModeToggle />

  <div id="app" class="flex p-10">
    <div class="flex space-x-8">
      <div class="flex w-[300px] flex-col space-y-4">
        <VHeading heading="h1" size="2xl">Input</VHeading>

        <div class="flex flex-col space-y-4 pb-10">
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

        <div class="flex flex-col space-y-4 pb-10">
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
          />
        </div>

        <VHeading heading="h1" size="2xl">File input</VHeading>

        <div class="flex flex-col space-y-4 pb-10">
          <VFile v-model="file" placeholder="Placeholder" size="sm" required @error="(e) => $toast({ type: 'error', message: e})" />

          <VFile
            v-model="file"
            placeholder="Placeholder"
            size="base"
            required
          />
        </div>

        <VHeading heading="h1" size="2xl">Checkbox</VHeading>

        <div class="flex space-x-4 pb-10">
          <VCheckbox
            v-model="boolean"
            size="sm"
            label="Checkbox"
            helper="Helper text"
            required
          />

          <VCheckbox
            v-model="boolean"
            size="sm"
            required
            label="Checkbox"
            helper="Helper text"
            color="green"
          />
        </div>

        <VHeading heading="h1" size="2xl">Radio</VHeading>

        <div class="flex space-x-4 pb-10">
          <VRadio
            v-model="radio"
            value="1"
            size="sm"
            label="Radio"
            helper="Helper text"
            required
          />

          <VRadio
            v-model="radio"
            size="sm"
            value="2"
            required
            label="Radio"
            helper="Helper text"
            color="green"
          />
        </div>
        <VHeading heading="h1" size="2xl">Switch</VHeading>

        <div class="flex flex-col space-y-2 pb-10">
          <VSwitch v-model="switch1" size="xs" :icons="true" />
          <VSwitch v-model="switch2" size="sm" />
          <VSwitch
            v-model="switch3"
            size="base"
            shape="pill"
            :icons="true"
            on-color="default"
          />
          <VSwitch v-model="switch4" size="lg" />
          <VSwitch v-model="switch4" size="xl" :icons="true" off-color="red" />
          <VSwitch v-model="switch4" size="2xl" />
        </div>
      </div>

      <div class="flex w-[300px] flex-col space-y-4">
        <VHeading heading="h1" size="2xl">Select</VHeading>

        <div class="flex flex-col space-y-4 pb-10">
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
            color="green"
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

        <div class="flex flex-col space-y-4 pb-10">
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
            :max="2"
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

        <VHeading heading="h1" size="2xl">DateTimePicker</VHeading>

        <div class="flex flex-col space-y-4 pb-10">
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
      </div>

      <div class="flex w-[300px] flex-col space-y-4">
        <VHeading heading="h1" size="2xl">Rating</VHeading>

        <div class="flex flex-col space-y-4 pb-10">
          <VRating v-model="rating1" size="sm" />
          <VRating
            v-model="rating2"
            size="sm"
            color="blue"
            rating-icon="dark_mode"
          />
        </div>

        <VHeading heading="h1" size="2xl">Tags</VHeading>

        <div class="flex flex-col space-y-4 pb-10">
          <VTags v-model="tags" size="sm" placeholder="Add tags" :max="2" @error="(e) => $toast({ type: 'error', message: e})" />
        </div>

        <VHeading heading="h1" size="2xl">Buttons</VHeading>

        <div class="flex flex-col space-y-4 pb-10">
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

        <VHeading heading="h1" size="2xl">Toast</VHeading>

        <div class="flex space-x-2 pb-10">
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
            color="yellow"
            icon="warning"
            @click="
              $toast({ type: 'warning', message: 'This is a warning toast' })
            "
          />
        </div>
      </div>

      <div class="flex w-[300px] flex-col space-y-4">

        <VHeading heading="h1" size="2xl">Headings</VHeading>

        <div class="flex space-x-4 pb-10 items-center">
          <VHeading heading="h1" size="xl">H1</VHeading>
          <VHeading heading="h2" size="lg">H2</VHeading>
          <VHeading heading="h3" size="base">H3</VHeading>
          <VHeading heading="h4" size="sm">H4</VHeading>
          <VHeading heading="h5" size="xs">H5</VHeading>
          <VHeading heading="h6" size="xs">H6</VHeading>
        </div>

        <VHeading heading="h1" size="2xl">Text</VHeading>

        <div class="flex items-center space-x-4 pb-10">
          <VText size="2xl">2XL</VText>
          <VText size="xl">XL</VText>
          <VText size="lg">LG</VText>
          <VText size="base">MD</VText>
          <VText size="sm">SM</VText>
          <VText size="xs">XS</VText>
        </div>

        <VHeading heading="h1" size="2xl">Links</VHeading>

        <div class="flex flex-col space-y-4 pb-10">
          <VLink href="#" size="xs" color="mauve" text="Mauve link" />
          <VLink href="#" size="sm" color="blue" text="Blue link (with icon)" icon="group" />
          <VLink href="#" size="base" color="red" text="Next link is only icon" />
          <VLink href="#" size="lg" color="green" icon="dark_mode" />
          <VLink href="#" size="xl" color="yellow" icon="light_mode" button />
          <VLink href="#" size="sm" color="yellow" icon="light_mode" button text="test" />
        </div>
      </div>
    </div>
  </div>
</template>
