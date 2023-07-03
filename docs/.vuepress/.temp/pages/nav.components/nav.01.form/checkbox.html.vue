<template><div><h3 id="introduction" tabindex="-1"><a class="header-anchor" href="#introduction" aria-hidden="true">#</a> Introduction</h3>
<p>Checkboxes are data-inputs. They are often used in forms, but can be used outside a form to trigger other stuff when clicked.</p>
<hr>
<h3 id="usage" tabindex="-1"><a class="header-anchor" href="#usage" aria-hidden="true">#</a> Usage</h3>
<p>Usage is very simple. Here are some examples.</p>
<hr>
<h3 id="props" tabindex="-1"><a class="header-anchor" href="#props" aria-hidden="true">#</a> Props</h3>
<table>
<thead>
<tr>
<th>Name</th>
<th>Type</th>
<th>Default</th>
<th>Options</th>
<th>Required</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>id</td>
<td>String</td>
<td>lambda-checkbox-<random></td>
<td></td>
<td>false</td>
<td>This is the ID used for the input so the label (if set) would link up to this input.</td>
</tr>
<tr>
<td>modelValue</td>
<td>Boolean</td>
<td>false</td>
<td></td>
<td>false</td>
<td>When binding input to a model use <code v-pre>v-model</code> not <code v-pre>model-value</code>. If you are using a model, do not pass the <code v-pre>checked</code></td>
</tr>
<tr>
<td>label</td>
<td>String, Boolean</td>
<td>false</td>
<td></td>
<td>false</td>
<td>The label of the input (optional).</td>
</tr>
<tr>
<td>helper</td>
<td>String, Boolean</td>
<td>false</td>
<td></td>
<td>false</td>
<td>The helper text of the input (optional).</td>
</tr>
<tr>
<td>required</td>
<td>Boolean</td>
<td>false</td>
<td></td>
<td>false</td>
<td>Will put the well known red asterix to the label to visually tell the user that this field is required.</td>
</tr>
<tr>
<td>size</td>
<td>String</td>
<td>base</td>
<td>xs, sm, base, lg, xl, 2xl</td>
<td>false</td>
<td>The size of the input.</td>
</tr>
<tr>
<td>color</td>
<td>String</td>
<td>blue</td>
<td>red, green, blue, orange, yellow, mauve</td>
<td>false</td>
<td>The color of the input.</td>
</tr>
<tr>
<td>disabled</td>
<td>Boolean</td>
<td>false</td>
<td></td>
<td>false</td>
<td>Adds the disabled state to the input.</td>
</tr>
<tr>
<td>rounded</td>
<td>Boolean</td>
<td>true</td>
<td></td>
<td>false</td>
<td>If the checkbox will be rounded or not.</td>
</tr>
<tr>
<td>checked</td>
<td>Boolean</td>
<td>false</td>
<td></td>
<td>false</td>
<td>If you do not bind a model (<code v-pre>v-model</code>), you could use this to pass the initial state of the checkbox.</td>
</tr>
</tbody>
</table>
<hr>
<h3 id="emits" tabindex="-1"><a class="header-anchor" href="#emits" aria-hidden="true">#</a> Emits</h3>
<table>
<thead>
<tr>
<th>Emit</th>
<th>Type</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>@change</td>
<td>Boolean</td>
<td>Returns the boolean checked value of the checkbox on change.</td>
</tr>
<tr>
<td>@update:modelValue</td>
<td>Boolean</td>
<td>Updates the <code v-pre>v-model</code></td>
</tr>
</tbody>
</table>
<hr>
<h3 id="slots" tabindex="-1"><a class="header-anchor" href="#slots" aria-hidden="true">#</a> Slots</h3>
<p>None</p>
<hr>
<h3 id="examples" tabindex="-1"><a class="header-anchor" href="#examples" aria-hidden="true">#</a> Examples</h3>
<div class="language-html line-numbers-mode" data-ext="html"><pre v-pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>template</span><span class="token punctuation">></span></span>
	<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>VCheckbox</span> <span class="token attr-name">size</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>sm<span class="token punctuation">"</span></span> <span class="token attr-name">color</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>green<span class="token punctuation">"</span></span> <span class="token attr-name">label</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>Terms<span class="token punctuation">"</span></span> <span class="token attr-name">helper</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>You need to accept the terms to continue.<span class="token punctuation">"</span></span> <span class="token attr-name">v-model</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>my_model<span class="token punctuation">"</span></span> <span class="token punctuation">/></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>template</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>If you need to trigger something when the checkbox changes state instead of using a <code v-pre>v-model</code> you can use the <code v-pre>@change</code> emitted event, see example below.</p>
<div class="language-html line-numbers-mode" data-ext="html"><pre v-pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>template</span><span class="token punctuation">></span></span>
	<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>VCheckbox</span> <span class="token attr-name">size</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>sm<span class="token punctuation">"</span></span> <span class="token attr-name">color</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>green<span class="token punctuation">"</span></span> <span class="token attr-name">label</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>Terms<span class="token punctuation">"</span></span> <span class="token attr-name">helper</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>You need to accept the terms to continue.<span class="token punctuation">"</span></span> <span class="token attr-name">@change</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>alert('The box changed state!')<span class="token punctuation">"</span></span> <span class="token punctuation">/></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>template</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></div></template>


