### Introduction
This is the date time picker. Basically it's a input that displays a calendar and time (or only one of them) when clicked. You can select a date and a time or only one of them based on the props passed.

---

### Usage
Usage is very simple. Here are some examples.

---

### Props

| Name         	| Type            	| Default                    	| Options                                 	| Required 	| Description                                                                                                	|
|--------------	|-----------------	|----------------------------	|-----------------------------------------	|----------	|------------------------------------------------------------------------------------------------------------	|
| id           	| String          	| lambda-datepicker-<random> 	|                                         	| false    	| This is the ID used for the input so the label (if set) would link up to this input.                       	|
| modelValue   	| String, Boolean 	| false                      	|                                         	| true     	| !missing                                                                                                   	|
| label        	| String, Boolean 	| false                      	|                                         	| false    	| The label of the input (optional).                                                                         	|
| helper       	| String, Boolean 	| false                      	|                                         	| false    	| The helper text of the input (optional).                                                                   	|
| required     	| Boolean         	| false                      	|                                         	| false    	| Will put the well known red asterix to the label to visually tell the user that this field is required.    	|
| size         	| String          	| base                       	| xs, sm, base, lg, xl, 2xl               	| false    	| The size of the input.                                                                                     	|
| color        	| String          	| blue                       	| red, green, blue, orange, yellow, mauve 	| false    	| The color of the input.                                                                                    	|
| disabled     	| Boolean         	| false                      	|                                         	| false    	| Adds the disabled state to the input.                                                                      	|
| rounded      	| Boolean         	| true                       	|                                         	| false    	| If the checkbox will be rounded or not.                                                                    	|
| icon         	| String, Boolean 	| false                      	|                                         	| false    	| Any icon related to Google Material Rounded icons.                                                         	|
| placeholder  	| String          	|                            	|                                         	| false    	| Input placeholder.                                                                                         	|
| error        	| String, Boolean 	| false                      	|                                         	| false    	| If set a visual indicator will be set to show the user that there is an error with this input.             	|
| date-picker  	| Boolean         	| true                       	|                                         	| false    	| Use the datepicker.                                                                                        	|
| time-picker  	| Boolean         	| false                      	|                                         	| false    	| Use the timepicker. You need to set either this, the above, or both to true (datepicker defaults to true). 	|
| clear-button 	| Boolean         	| true                       	|                                         	| false    	| Will display a clear button when input is filled. Basically allows the input to be reset.                  	|
---

### Emits

| Emit   | Type    | Description                       |
|--------|---------|-----------------------------------|
| @update:modelValue | String | Updates the `v-model` |
| @change | String | Returns the date/time string |


---

### Slots
None

---

### Examples

```html
<template>
	<VDateTimePicker v-model="time" placeholder="Select time" size="sm" time-picker :date-picker="false" required />
</template>
```

If you need to trigger something when a date or time changes instead of using a `v-model` you can use the `@change` emitted event.