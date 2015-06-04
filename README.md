# Bar Indicator #


**BarIndicator** is a jQuery plugin that helps you visualize numeric data (percentage or absolute numbers) in to bars.

## Installation ##


Just include the `bi-style.css` and `jquery-barIndicator.js` files in your project, inside your `<head>` section:

    <head>
		....
		<link href="path/to/../BarIndicator_1.0/css/bi-style.css" rel="stylesheet" />
		<script src="path/to/../jquery-1.11.2.min.js"></script>
		<script src="path/to/../BarIndicator_1.0/jquery-barIndicator.js"></script>
		....
	</head>

## Dependencies ##

As **Bar Indicator** is a jQuery plugin, you have to include **jQuery** before calling the plugin. 

[***Optional***] This plugin uses animations, so you have to use the **easing plugin** if you want to pass any of the amazing easing functions to the animations.

[***Note***] You might not include easing plugin, but if this is the case, you will not be able to use the `easing` option.

## Initialize ##

All you need is a simple element as a `<div>` or a `<span>`. By default, the plugin will try and get the inner text (assuming that it is a numeric string) and visualize as a percentage in a bar with minimum limit equal to zero and maximum limit equal to 100%. 

    <div class="myElement">45</div>

You can, of course, use the plugin to an empty element and provide the number from the options (see `data` option):

	<div class="myElement"></div>

In your scripts file (or inside a `<script>` tag):

    $('.myElement').barIndicator();

That's it! The plugin has initialized using the default options.

## Options ##

There is a number of possible options you can use to customize the appearance and behavior of the plugin. You can store the options object in a variable and pass this variable to the plugin:

    var opt = {
        optionOne: 'value-One',
        optionTwo: 'value-Two',
        ....
        optionN: 'value-N'
    } 
    $('.myElement').barIndicator(opt);

Or directrly:

    $('.myElement').barIndicator({ optionOne:'value-One' });


#### wrpClass

The class that the plugin adds by default to the affected element.

> - Default: `'bi-wrp'`
> - Possible values: `[string]`

#### data

If `false`, the plugin assumes that the affected element contains a number and calculate the bar length based on that number. You can provide a **number** as a value.

> - Default: `false`
> - Possible values: `[number]`

#### style

There are two options: `horizontal` or `vertical`. If you do not pass any value for this option the plugin will produce a horizontal bar getting the default value.

> - Default: `horizontal`
> - Possible values: `'horizontal'` / `'vertical'`

#### theme

Change the appearance by changing the default theme, or you can create your own custom theme and call it from `theme` option.

> - Default: `bi-default-theme`
> - Possible values: `[string]`

#### animation

Enable or disable the animation of the indication bar passing `true` or `false`.

> - Default: `true`
> - Possible values: `true` / `false`

#### animTime

Change the animation time by passing a new duration in milliseconds.


> - Default: `300`
> - Possible values: `[number]`


*Have this in mind:*
> 1000 milliseconds = 1 second

#### easing

This plugin uses animations, so in order to look prettier, uses `easing` functions too. With `easing` option, you can change the `easing` function in order to display a different animation style.

> - Default: `easeOutExpo`
> - Possible values: `[string]` (*any valid easing string*)

#### timeout

Set a time delay between the initialization event and the animation start in milliseconds.

> - Default: `0`
> - Possible values: `[number]`

#### colorRange

If you enable `colorRange`, the plugin will give different color on the bar, depending on the target number.

> - Default: `false`
> - Possible values: `true` / `false`

#### colorRangeLimits

This option accepts an object of limits as value. By default, there are three limit ranges with their respective css styles (`bi-style.css`).

The default color range object looks like this:

    colorRangeLimits: {		
		optimal: '0-40',
		alert: '41-70',
		critical: '71-100'
	} 

This object gives a class of `bi-cRange-<rangeName>` to the parent element according to the range that holds the element's value. 

For example, take the following element:

    <div class="myElement">55</div>

If you instantiate the plugin, the element will get the class `bi-cRange-alert` because `55` (elements value) is inside the second default range (41-70).

You can create as many color ranges as you want, just by adding a new limit range and giving the desired color for this range, either with CSS or directly from the options object.

Let's say you create a new colorRange option object:

> **Important**: As soon as you pass a color range object into the options, you have to include every range you want to exist (not just the new one)

    colorRangeLimits: {
		optimal: '0-20',
        aNewRange: '21-40',
		alert: '41-70',
		critical: '71-100'
    }

Now, you can either create the respective css rule inside the `bi-style.css` file:

> **Note**: Be carefull with the theme you are working (here you are working with the `default` theme)

    .bi-wrp.bi-default-theme.bi-cRange-aNewRange .bi-barInner { background-color:<yourColor> }

Or, you can pass the desired color (`[HEX]|[colorName]|[rgb]`) directly to the color range object:

	colorRangeLimits: {
		optimal: '0-20',
        newRangeOne: '21-40-#f5f5f5',
		newRangeTwo: '41-60-green',
		newRangeThree: '61-68-rgb(150,156,85)',
		alert: '69-85',
		critical: '86-100'
    }


> - Default: `[colorRangeObject]` ( *the default object described above* )
> - Possible values: `[object]` ( *any object that meets the requirements mentioned above* )

#### foreColor

Change the color of the **bar** by passing a valid string that represents a color value into the options object.

> - Default: `false` (*takes the color from the css file*)
> - Possible values: `[string]` ( *any valid `HEX`, `colorName` or `rgb`* )

#### backColor

Change the color of the **bar holder** by passing a valid string that represents a color value into the options object.

> - Default: `false` (*takes the color from the css file*)
> - Possible values: `[string]` ( *any valid `HEX`, `colorName` or `rgb`* )

#### labelColor

Change the color of the **label** by passing a valid string that represents a color value into the options object.

> - Default: `false` (*takes the color from the css file*)
> - Possible values: `[string]` ( *any valid `HEX`, `colorName` or `rgb`* )

#### labelVisibility

Change the visibility of the label by passing one of the following values:

- `default`: always visible label
- `hover`: the label fades in on bar hover
- `hidden`: always hidden


> - Default: `default`
> - Possible values: `'default'`, `'hover'`, `'hidden'`

#### labelHoverPos

Change the position of the label passing a new object into the options (only applies when lable has `labelVisibility:'hover'`)

The default object is this:

	labelHoverPos: {
		top:'0',
		left:'20px'
	}

> - Default: `[object]` (*the default object described above*)
> - Possible values: `[object]`

#### vertLabelPos

The position of the label on **vertical** style mode. This option can take two values: `left` or `right`

> - Default: `right`
> - Possible values: `left` / `right`

#### vertLabelAlign

The vertical alignment of the label on **vertical** style mode. This option can take any valid `vertical-align` property value as described here ([http://www.w3schools.com/cssref/pr_pos_vertical-align.asp](http://www.w3schools.com/cssref/pr_pos_vertical-align.asp)).

> - Default: `middle`
> - Possible values: `[string]` ( *any valid css vertical-align property value* )

#### horLabelPos

The position of the label on **horizontal** style mode.

> - Default: `topLeft`
> - Possible values: `topLeft` / `topRight` / `left` / `right`

#### horTitle

You can give a title to the bar block. By default, no title is visible. Feel free to style the title element as you wish by editing the class `.bi-titleSpan` in the css file ( `bi-style.css` )

> - Default: `false`
> - Possible values: `[string]` ( *the title string* )

#### numType

The type of number that label displays. By default, the number provided to the plugin is manipulated as a percent. The plugin adds the `%` character after the number.

You can set `numType:'absolute'` in order to display an absolute number.

> - Default: `percent`
> - Possible values: `percent` / `absolute`

#### lbDecimals

You can set the number of decimal digits that the label number would have.

> - Default: `0`
> - Possible values: `[number]`

#### numMin

You can set the minimum limit of the bar holder. By default this option is set to zero.

> - Default: `0`
> - Possible values: `[number]`

#### numMax

You can set the maximum limit of the bar holder. By default this option is set to `100`.

For example, you might want to display the temperature, so you can set this options object:

    options = {
		numType:'absolute',
		numMin:-20,
		numMax:120
    }
 
> - Default: `100`
> - Possible values: `[number]`

#### vertBarWidth

Set the width of the **vertical** bar in px


> - Default: `10`
> - Possible values: `[number]`

#### horBarHeight

Set the height of the **horizontal** bar in px

> - Default: `10`
> - Possible values: `[number]`

#### vertBarHeight

Set the height of the **vertical** bar

- `line`: the bar takes the height of it's parent line
- `[px]`: give the desired height in pixels e.g. `15px`
- `hidden`: give the desired height in percentage of the parent line height e.g. `150%`


> - Default: `line`
> - Possible values: `'line'`, `[px]`, `[number%]`

#### triggerEvent

This is the event that triggers the animation and the number counter. By default, the animation starts on `window.load`, but you can set another or even a custom event as the starter.

> - Default: `load`
> - Possible values: `[string]` ( *the event name* )

#### labelNumCount

Enable or disable the number counter.

> - Default: `true`
> - Possible values: `[boolean]`: `true` / `false`

#### counterStep

The step that the counter will calculate as counts to the target number.

> - Default: `10`
> - Possible values: `[number]` ( *any number that is smaller that the target number* )

#### milestones

This is an options object that holds all the milestones of the bar.

The default object holds only one milestone and looks like this:

    milestones: {
		50: {
			mlId: false,
			mlClass: 'bi-middle-mlst',
			mlDim: 'inherit',
			mlLabel: 'Average',
			mlLabelVis: 'hover', 
			mlHoverRange: 15,
			mlLineWidth: 1
		}
	} 

## Methods ##

You can call specific methods in order to perform specific tasks. Some of the available methods accept arguments too. In order to call a method you can pass it's name in a string:

    $('.myElement').barIndicator('methodName', [params]);

A method call is **chainable**. This means that you can call a plugin's method and a jQuery method after that:

    $('.myElement').barIndicator('methodName', [params]).addClass('newClass');


## Getters ##

Getters are methods that return some data and are **not chainable**. You can call a getter and store it's value in a variable:
    
    var dataObj = $('.myElement').barIndicator('getterName');

#### getPluginData [object]

Returns the data object that the plugin has stored to the affected element. 

## Events ##

**Bar Indicator** triggers numerous events in order to notify the user about the actions that take place during the lifecycle of the plugin. You can take advantage of this and trigger some other functions, on each of these events occurrence. For example, if you want to call a function as soon as the bar animation has finished:

    $(document).on('bi.animationCompleted', function() {
        // Trigger this function as soon as the bar completes it'a animation
        myCustomFunction();
    });

Some of these events return usefull information within an object. You can get this object like so:

    $(document).on('bi.innerContentAppended', function(event,obj) {
        var affectedElement = obj;
        myCustomFunction();
    });

#### bi.innerContentAppended (`return $el`)

Triggers as soon as the inner content is appended to the affected element.

- return **$el** [ `object` ]: The element jQuery object

#### bi.milestoneAppended (`return $ml`)

Triggers on milestone append

- return **$ml** [ `object` ]: The milestone jQuery object

#### bi.animationCompleted 

Triggers as soon as the bar animation completes

#### bi.reanimateBarStart 

Triggers on `reanimate` method call start

#### bi.reanimateBarStop 

Triggers as soon as the `reanimate` method bar animation completes
	
#### bi.loadDataStart 

Triggers on `loadData` method call start

#### bi.loadDataStop 

Triggers as soon as the 'loadData' method bar animation completes

## Themes ##

The default theme, used by the plugin is the `bi-default-theme`. To create a custom theme, just copy the part of any built in theme css code, and create your own, replacing the `bi-<themename>-theme` with you own theme name. Then, in order to apply your custom theme, just put it in the options: 

    $('.myElement').barIndicator({ theme: 'bi-<themename>-theme' });

