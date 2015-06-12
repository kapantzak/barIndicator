# Bar Indicator ![alt tag](img/plugin-logo-sm.png)

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

By default, no title is visible. You can give a title to the bar block setting one of these options:

- `bi-title-id`: Display the element's id (if set)
- `bi-data-title`: Display the data-title attribute value (if set)
- `[string]`: Any title string

Feel free to style the title element as you wish by editing the class `.bi-titleSpan` in the css file ( `bi-style.css` )

> - Default: `false`
> - Possible values: `'bi-title-id'` / `bi-data-title` / `[string]` ( *the title string* )

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

#### numMinLabel

Enable or disable the starting point label of the bar.

> - Default: `false`
> - Possible values: `[boolean]`: `true` / `false`

#### numMaxLabel

Enable or disable the ending point label of the bar.

> - Default: `false`
> - Possible values: `[boolean]`: `true` / `false`

#### numMinLbLeft

Set the `left` position of the minimum label.

> - Default: `false`
> - Possible values: `false` / `[number]` ( *The desired left position in pixels* )

#### numMaxLbRight

Set the `right` position of the maximum label.

> - Default: `false`
> - Possible values: `false` / `[number]` ( *The desired right position in pixels* )

#### numMinLbTop

Set the `top` position of the minimum label.

> - Default: `false`
> - Possible values: `false` / `[number]` ( *The desired top position in pixels* )

#### numMaxLbTop

Set the `top` position of the maximum label.

> - Default: `false`
> - Possible values: `false` / `[number]` ( *The desired top position in pixels* )

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

#### forceAnim

Set to `true` if you want to trigger the animation instantly (ignores the `triggerEvent` option)

> - Default: `false`
> - Possible values: `[boolean]`: `true` / `false`

#### forceDelay

Delays the animation and takes place only if `forceAnim` option is set to `true`.

> - Default: `100`
> - Possible values: `[number]`: ( *a number representing milliseconds* )

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

    1: {
		mlPos: 50,
		mlId: 'mlst-half',
		mlClass: 'bi-middle-mlst',
		mlDim: 'inherit',
		mlLabel: 'Half',
		mlLabelVis: 'hover',	 
		mlHoverRange: 15,	
		mlLineWidth: 1	
	}

##### milestones.mlPos

The position of the milestone in percentage, or in absolute number if is set so (`numType='absolute'`).

> - Default: `50`
> - Possible values: `[number]` ( *Any number* )

##### milestones.mlId

Provide an `id` for the milestone.

> - Default: `mlst-half`
> - Possible values: `[string]` ( *the desired id* ) 

##### milestones.mlClass

The class that the milestone gets.

> - Default: `'bi-middle-mlst'`
> - Possible values: `[string]` ( *the desired class* )

##### milestones.mlDim

The dimension that the milestone gets.

- `'inherit'`: The milestone gets the height (or width) of the wrapper element
- `x[%]`: The milstone gets it's height (or width) according to the given percentage relatively to it's parent element
- `x[px]`: The milestone get's the exact given dimention in pixels 

> - Default: `'inherit'`
> - Possible values: `[string]`: `'inherit'` / `[px]` / `[%]`

##### milestones.mlLabel

The label that the milestone will display.

> - Default: `'Half'`
> - Possible values: `[string]` ( *The desired label* )

##### milestones.mlLabelVis

The display method of the milestone label.

> - Default: `'hover'`
> - Possible values: `'hover'` / `'visible'` / `'hidden'`


##### milestones.mlHoverRange

The milestone's wrapper width that triggers the label hover event. (The smaller you set it, the more accurate the hover trigger event will be)

> - Default: `15`
> - Possible values: `[number]` ( *The desired range in pixels* )

##### milestones.mlLineWidth

The milestone's line width in pixels

> - Default: `1`
> - Possible values: `[number]` ( *The desired width in pixels* )

#### avgActive

Enable or disable the average amount calculation of grouped elements. 

In order for the average calculator to work, you have to provide `data-avgClass` attribute to every element you want to be calculated in a group.

For example, you might have 10 elements but you want to devide them into two smaller groups. You can give `data-avgClass="groupOne"` to the first 5 elements and `data-avgClass="groupTwo"` to the last 5 of them.

> - Default: `false`
> - Possible values: `[boolean]`: `true` / `false`

#### avgColorIndicator

Set this option to `true` if you want to have different bar colour for those elements that are above the average amount and those that are below it.

> Note that this will work only if `avgActive` is set to `true`
> 
> - Default: `false`
> - Possible values: `[boolean]`: `true` / `false`

#### avgColorBelowAvg

Set the bar colour for those elements that are **below the average**. By default this colour is given by the `bi-style.css` file by the following selector:

`.bi-wrp.bi-default-theme.bi-avgBelow .bi-barInner`

> Note that this will work only if `avgActive` and `avgColorIndicator` are set to `true`
> 
> - Default: `false`
> - Possible values: `[string]` ( *any valid `HEX`, `colorName` or `rgb`* )

#### avgColorAboveAvg

Set the bar colour for those elements that are **above the average**. By default this colour is given by the `bi-style.css` file by the following selector:

`.bi-wrp.bi-default-theme.bi-avgAbove .bi-barInner`

> Note that this will work only if `avgActive` and `avgColorIndicator` are set to `true`
> 
> - Default: `false`
> - Possible values: `[string]` ( *any valid `HEX`, `colorName` or `rgb`* )

#### avgMlId

Provide an optional `id` for the average indication milestone.

> - Default: `false`
> - Possible values: `[string]` ( *the desired id* ) 

#### avgMlClass

The class that the average indication milestone gets.

> - Default: `'bi-average-mlst'`
> - Possible values: `[string]` ( *the desired class* )

#### avgMlDim

The dimension that the average indication milestone gets. This is the same as the `mlDim` property (check the `milestones` option).

> - Default: `'inherit'`
> - Possible values: `[string]`

#### avgLabel

The average indication milestone's label.

> - Default: `'Average'`
> - Possible values: `[string]` ( *The desired label* )

#### avgLabelNum

Set this to `false` if you don't want for the average amount to be displayed on the average indication milestone's label.

> - Default: `true`
> - Possible values: `[boolean]`: `true` / `false`

#### avgLabelVis

The display method of the average indication milestone label.

> - Default: `'hover'`
> - Possible values: `'hover'` / `'visible'` / `'hidden'`


#### avgLabelHoverRange

The average indication milestone's wrapper width that triggers the label hover event. (The smaller you set it, the more accurate the hover trigger event will be)

> - Default: `15`
> - Possible values: `[number]` ( *The desired range in pixels* )

#### avgLineWidth

The average indication milestone's line width in pixels

> - Default: `1`
> - Possible values: `[number]` ( *The desired width in pixels* )

#### limLabel

Enable or disable the min / max label indicator of grouped elements

> - Default: `true`
> - Possible values: `[boolean]`: `true` / `false`

#### limMinLabel

The text that the minimum label will display.

> - Default: `'min'`
> - Possible values: `[string]` ( *The desired text* )

#### limMaxLabel

The text that the maximum label will display.

> - Default: `true`
> - Possible values: `[string]` ( *The desired text* )

#### limMinVisible

Display or hide the minimum label

> - Default: `true`
> - Possible values: `[boolean]`: `true` / `false`

#### limMaxVisible

Display or hide the maximum label

> - Default: `true`
> - Possible values: `[boolean]`: `true` / `false`

#### limLabelPos

Attach the min/max label either to the number, or to the title (if given)

> - Default: `'num'`
> - Possible values: `'num'` / `'title'`

## Methods ##


You can call specific methods in order to perform specific tasks. Some of the available methods accept arguments too. In order to call a method you can pass it's name in a string:

    $('.myElement').barIndicator('methodName', [params]);

A method call is **chainable**. This means that you can call a plugin's method and a jQuery method after that:

    $('.myElement').barIndicator('methodName', [params]).addClass('newClass');

#### reanimateBar

Call this method if you want to execute the loading animation on demand.

    $('.myElement').barIndicator('reanimateBar');

#### loadNewData

Call this method if you want to load new data on demand. Accepts the new data as a parameter (`data`)

	var data = 85; //Any number
	$('.myElement').barIndicator('loadNewData', [data]);

#### destroy

Call this method if you want to disable the plugin and remove all of it's data.

	$('.myElement').barIndicator('destroy');


## Getters ##


Getters are methods that return some data and are **not chainable**. You can call a getter and store it's value in a variable:
    
    var dataObj = $('.myElement').barIndicator('getterName');

#### getPluginData

Returns the data object that the plugin has stored to the affected element. 

	//Initialize
	$('.myElement').barIndicator();
	//Call the getter and store it's value to a variable
	var storedData = $('.myElement').barIndicator('getPluginData');
	console.log(storedData);	

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

### Specific events

You can listen an event from a specific element. You just have to provide an id to this element and listen to that *specific* event like this:

    <span id="elemID">25</span>

Now, you can listen for the *specific* event:

    //Initialize the plugin
    $('#elemID').barIndicator();
    //Listen the 'bi.innerContentAppended' event
	//Add an underscore and the element's id after bi string
	$(document).on('bi_elemID.innerContentAppended', function() {
		//do your stuff..
	});

The same way, if you would like to listen for the *specific* `bi.animationCompleted` event you would listen for this event:

	'bi_elemID.animationCompleted'


## Themes ##


The default theme, used by the plugin is the `bi-default-theme`. To create a custom theme, just copy the part of any built in theme css code, and create your own, replacing the `bi-<themename>-theme` with you own theme name. Then, in order to apply your custom theme, just put it in the options: 

    $('.myElement').barIndicator({ theme: 'bi-<themename>-theme' });

