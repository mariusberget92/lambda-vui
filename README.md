# Lambda VUI

This component library is designed for use with Vue 3 and is built using the Composition API. It features a modern, flat design with the NORD color palette and includes both light and dark themes.

The library also includes a customizable toast plugin, which enables you to display success, error, info, and warning messages in various positions and durations. Additionally, the library features customizable color animations that activate when users interact with components like inputs.

It's intended to be used with [Laravel](https://github.com/laravel/laravel), [InertiaJS](https://github.com/inertiajs/inertia) and [Vue 3](https://github.com/vuejs/vue).

There is currently no documentation for this library, but it will be added in the future.
<hr />

## Showcase GIF
![Showcase GIF](https://github.com/mariusberget92/lambda-vui/blob/main/showcase.gif)

## Components
<span>✅</span> Implemented<br>
<span>❌</span> Not implemented


## Form components
<span>✅</span> Input component<br>
<span>✅</span> Select component<br>
<span>✅</span> Textarea component<br>
<span>✅</span> Checkbox component<br>
<span>✅</span> File component<br>
<span>✅</span> Date & Time component<br>
<span>✅</span> Button component<br>
<span>❌</span> Dropzone upload component<br>
<span>❌</span> Radio component<br>
<span>❌</span> Switch component<br>
<span>❌</span> Range component<br>
<span>❌</span> Color component<br>
<span>✅</span> Tags component<br>
<span>✅</span> Rating component<br>

## Typography components
<span>✅</span> Heading component<br>
<span>✅</span> Text/paragraph component<br>
<span>✅</span> Link component<br>

## Bugs / Todo
📝 Fix DateTimePicker component to be initialized with a empty value (currently it's initialized with the current date and time but can be resat to empty with the clear button). Just using the reset method will not work (month and year will display as 00-00 in the input)
📝 Make tags component also take a options prop (like the select component) so that it can be used as a select component with predefined options only or a mix between predefined and user defined tags.