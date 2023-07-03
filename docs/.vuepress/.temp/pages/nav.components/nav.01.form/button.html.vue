<template><div><h3 id="introduction" tabindex="-1"><a class="header-anchor" href="#introduction" aria-hidden="true">#</a> Introduction</h3>
<p>Buttons are simple components used to have a role of a button or a submit button. They are often used in forms, but can be used as regular buttons to trigger other things as well.</p>
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
<td>type</td>
<td>String</td>
<td>submit</td>
<td>submit, reset, button</td>
<td>false</td>
<td>What kind of type the button is</td>
</tr>
<tr>
<td>processing</td>
<td>Boolean</td>
<td>false</td>
<td></td>
<td>false</td>
<td>Example would be is a form is processing then the button would have an animated loading spinner and be disabled while processing</td>
</tr>
<tr>
<td>size</td>
<td>String</td>
<td>base</td>
<td>xs, sm, base, lg, xl, 2xl</td>
<td>false</td>
<td>The size of the button</td>
</tr>
<tr>
<td>color</td>
<td>String</td>
<td>blue</td>
<td>red, green, blue, orange, yellow, mauve</td>
<td>false</td>
<td>The color of the button</td>
</tr>
<tr>
<td>icon</td>
<td>String, Boolean</td>
<td>false</td>
<td></td>
<td>false</td>
<td>Any icon related to Google Material Rounded icons</td>
</tr>
<tr>
<td>text</td>
<td>String, Boolean, Number</td>
<td>false</td>
<td></td>
<td>false</td>
<td>The text of the button. Can be a number. If none are given, no text will be shown</td>
</tr>
<tr>
<td>disabled</td>
<td>Boolean</td>
<td>false</td>
<td></td>
<td>false</td>
<td>Adds disabled state to the button if true</td>
</tr>
<tr>
<td>rounded</td>
<td>Boolean</td>
<td>true</td>
<td></td>
<td>false</td>
<td>If the button will be rounded (rounded-md)</td>
</tr>
<tr>
<td>outline</td>
<td>Boolean</td>
<td>false</td>
<td></td>
<td>false</td>
<td>If the button will be outlined with a white background instead of a regular button</td>
</tr>
<tr>
<td>dashed</td>
<td>Boolean</td>
<td>false</td>
<td></td>
<td>false</td>
<td>Whether the button border will be dashed</td>
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
<td>@click</td>
<td>Boolean</td>
<td>Returns a true value when clicked</td>
</tr>
</tbody>
</table>
<hr>
<h3 id="slots" tabindex="-1"><a class="header-anchor" href="#slots" aria-hidden="true">#</a> Slots</h3>
<p>None</p>
<hr>
<h3 id="examples" tabindex="-1"><a class="header-anchor" href="#examples" aria-hidden="true">#</a> Examples</h3>
<div class="language-html line-numbers-mode" data-ext="html"><pre v-pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>template</span><span class="token punctuation">></span></span>
	<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>VButton</span> <span class="token attr-name">text</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>Save<span class="token punctuation">"</span></span> <span class="token attr-name">icon</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>save<span class="token punctuation">"</span></span> <span class="token attr-name">size</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>sm<span class="token punctuation">"</span></span> <span class="token attr-name">color</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>blue<span class="token punctuation">"</span></span> <span class="token punctuation">/></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>template</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>If you remove the text and only include the icon the button will be a square 1:1 aspect-ratio button (good for tables or small buttons). If you also have a form processing state as you would in Interia.js you could add that so the the button becomes disabled while the form is processing, see example below.</p>
<div class="language-html line-numbers-mode" data-ext="html"><pre v-pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>template</span><span class="token punctuation">></span></span>
	<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>VButton</span> <span class="token attr-name">icon</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>save<span class="token punctuation">"</span></span> <span class="token attr-name">size</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>sm<span class="token punctuation">"</span></span> <span class="token attr-name">color</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>blue<span class="token punctuation">"</span></span> <span class="token attr-name">:processing</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>form.processing<span class="token punctuation">"</span></span> <span class="token punctuation">/></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>template</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><template>
	<VButton text="Save" icon="save" size="sm" color="blue" />
</template>
<p>If you need to trigger something when the button is clicked you can use the <code v-pre>@click</code> emitted event, see example below.</p>
<div class="language-html line-numbers-mode" data-ext="html"><pre v-pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>template</span><span class="token punctuation">></span></span>
	<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>VButton</span> 
		<span class="token attr-name">icon</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>save<span class="token punctuation">"</span></span>
		<span class="token attr-name">size</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>sm<span class="token punctuation">"</span></span> 
		<span class="token attr-name">color</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>blue<span class="token punctuation">"</span></span> 
		<span class="token attr-name">:processing</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>form.processing<span class="token punctuation">"</span></span> 
		<span class="token attr-name">@click</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>myAlertMethod('Something saved!')<span class="token punctuation">"</span></span> 
	<span class="token punctuation">/></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>template</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></div></template>


