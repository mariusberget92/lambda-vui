### Introduction
Buttons are simple components used to have a role of a button or a submit button. They are often used in forms, but can be used as regular buttons to trigger other things as well.

---

### Usage
Usage is very simple. Here are some examples.

---

### Props

| Name       | Type                    | Default | Options                                 | Required | Description                                                                                                                      |
|------------|-------------------------|---------|-----------------------------------------|----------|----------------------------------------------------------------------------------------------------------------------------------|
| type       | String                  | submit  | submit, reset, button                   | false    | What kind of type the button is                                                                                                  |
| processing | Boolean                 | false   |                                         | false    | Example would be is a form is processing then the button would have an animated loading spinner and be disabled while processing |
| size       | String                  | base    | xs, sm, base, lg, xl, 2xl               | false    | The size of the button                                                                                                           |
| color      | String                  | blue    | red, green, blue, orange, yellow, mauve | false    | The color of the button                                                                                                          |
| icon       | String, Boolean         | false   |                                         | false    | Any icon related to Google Material Rounded icons                                                                                |
| text       | String, Boolean, Number | false   |                                         | false    | The text of the button. Can be a number. If none are given, no text will be shown                                                |
| disabled   | Boolean                 | false   |                                         | false    | Adds disabled state to the button if true                                                                                        |
| rounded    | Boolean                 | true    |                                         | false    | If the button will be rounded (rounded-md)                                                                                       |
| outline    | Boolean                 | false   |                                         | false    | If the button will be outlined with a white background instead of a regular button                                               |
| dashed     | Boolean                 | false   |                                         | false    | Whether the button border will be dashed                                                                                         |

---

### Emits

| Emit   | Type    | Description                       |
|--------|---------|-----------------------------------|
| @click | Boolean | Returns a true value when clicked |

---

### Slots
None

---

### Examples

```html
<template>
	<VButton text="Save" icon="save" size="sm" color="blue" />
</template>
```

If you remove the text and only include the icon the button will be a square 1:1 aspect-ratio button (good for tables or small buttons). If you also have a form processing state as you would in Interia.js you could add that so the the button becomes disabled while the form is processing, see example below.

```html
<template>
	<VButton icon="save" size="sm" color="blue" :processing="form.processing" />
</template>
```
<template>
	<VButton text="Save" icon="save" size="sm" color="blue" />
</template>

If you need to trigger something when the button is clicked you can use the `@click` emitted event, see example below.

```html
<template>
	<VButton 
		icon="save"
		size="sm" 
		color="blue" 
		:processing="form.processing" 
		@click="myAlertMethod('Something saved!')" 
	/>
</template>
```
