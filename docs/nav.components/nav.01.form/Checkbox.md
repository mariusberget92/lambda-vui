### Introduction
Checkboxes are data-inputs. They are often used in forms, but can be used outside a form to trigger other stuff when clicked.

---

### Usage
Usage is very simple. Here are some examples.

---

### Props

| Name       	| Type            	| Default                  	| Options                                 	| Required 	| Description                                                                                                        	|
|------------	|-----------------	|--------------------------	|-----------------------------------------	|----------	|--------------------------------------------------------------------------------------------------------------------	|
| id         	| String          	| lambda-checkbox-<random> 	|                                         	| false    	| This is the ID used for the input so the label (if set) would link up to this input.                               	|
| modelValue 	| Boolean         	| false                    	|                                         	| false    	| When binding input to a model use `v-model` not `model-value`. If you are using a model, do not pass the `checked` 	|
| label      	| String, Boolean 	| false                    	|                                         	| false    	| The label of the input (optional).                                                                                 	|
| helper     	| String, Boolean 	| false                    	|                                         	| false    	| The helper text of the input (optional).                                                                           	|
| required   	| Boolean         	| false                    	|                                         	| false    	| Will put the well known red asterix to the label to visually tell the user that this field is required.            	|
| size       	| String          	| base                     	| xs, sm, base, lg, xl, 2xl               	| false    	| The size of the input.                                                                                             	|
| color      	| String          	| blue                     	| red, green, blue, orange, yellow, mauve 	| false    	| The color of the input.                                                                                            	|
| disabled   	| Boolean         	| false                    	|                                         	| false    	| Adds the disabled state to the input.                                                                              	|
| rounded    	| Boolean         	| true                     	|                                         	| false    	| If the checkbox will be rounded or not.                                                                            	|
| checked    	| Boolean         	| false                    	|                                         	| false    	| If you do not bind a model (`v-model`), you could use this to pass the initial state of the checkbox.              	|
---

### Emits

| Emit   | Type    | Description                       |
|--------|---------|-----------------------------------|
| @change | Boolean | Returns the boolean checked value of the checkbox on change. |
| @update:modelValue | Boolean | Updates the `v-model` |

---

### Slots
None

---

### Examples

```html
<template>
	<VCheckbox size="sm" color="green" label="Terms" helper="You need to accept the terms to continue." v-model="my_model" />
</template>
```

If you need to trigger something when the checkbox changes state instead of using a `v-model` you can use the `@change` emitted event, see example below.

```html
<template>
	<VCheckbox size="sm" color="green" label="Terms" helper="You need to accept the terms to continue." @change="alert('The box changed state!')" />
</template>
```
