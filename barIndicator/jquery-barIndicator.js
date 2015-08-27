/*!
*	jQuery - barIndicator
*	A jQuery plugin that helps you visualize percentage or absolute amounts with bars
*	Author: Ioannis Kapantzakis
*	Released under the MIT License
*/ 
;(function($, window, document, undefined) {
	
	var pluginName = 'barIndicator';
	
	function Plugin(element, options, selector) {
		this.el = element;
		this.$el = $(element);		
		this.opt = $.extend({}, $.fn[pluginName].defaults, options );
		this.selector = selector;
		this._init();
	}
	
	Plugin.prototype = {
		
		//Private methods -------------------------------------------------------------------------------- //
		_init: function() {
			var that = this;
			var $el = that.$el;
			var opt = that.opt;
			var selector = that.selector;
			var style = opt.style;
			var data = opt.data;
			var type = opt.numType;
			var dec = opt.lbDecimals;	
			var $elID = $el.attr('id');
			
			var orText = $el.text();
			var orClass = $el.attr('class');

			if (data && !isNaN(data)) {
				var num = parseFloat(data).toFixed(dec);
			} else if (data == false) {
				var num = parseFloat(orText.replace(',','.')).toFixed(dec);
			} else {
				console.log('data are not valid');
			}
			//Get length object
			var paramsLength = {
				that: that,
				num: num
			}
			var lengthObj = Plugin.prototype._getLength.apply(this, [paramsLength]);
			var lbNum = lengthObj.lbNum;
			var barLength = lengthObj.barLength;
			
			//Add unique data-biID
			var paramsID = {
				that: that
			}
			var unID = Plugin.prototype._getUniqueID.apply(this, [paramsID]);
			$el.attr('data-biID', unID);
			
			//Add classes (bi-wrp + theme class)
			$el.addClass(opt.wrpClass + ' ' + opt.theme).attr('data-lbNum', lbNum);
			
			//Store original attributes (applied on destroy)
			$.data($el, 'storedAttr', {
				'selector': selector,
				'orClass': orClass,
				'orText': orText,
				'barLength': barLength,
				'num': num,
				'lbNum': lbNum,
				'numType': type
			});
			//console.log($.data($el, 'storedAttr'));
			
			// Build and get inner html ------------------------------------------------------------------------------------------------- //
			var numMin = opt.numMin;
			var numMax = opt.numMax;
			var numMinLabel = opt.numMinLabel;
			var numMaxLabel = opt.numMaxLabel;
			var numMinLbLeft = (opt.numMinLbLeft && !isNaN(opt.numMinLbLeft)) ? opt.numMinLbLeft : '';
			var numMaxLbRight = (opt.numMaxLbRight && !isNaN(opt.numMaxLbRight)) ? opt.numMaxLbRight : '';
			var numMinLbTop = (opt.numMinLbTop && !isNaN(opt.numMinLbTop)) ? opt.numMinLbTop : '';
			var numMaxLbTop = (opt.numMaxLbTop && !isNaN(opt.numMaxLbTop)) ? opt.numMaxLbTop : '';
			var numLabelEdge = '';
			if (numMinLabel) {
				numLabelEdge += '<span class="bi-labelEdge bi-edge-min" style="left:' + numMinLbLeft + 'px;top:' + numMinLbTop + 'px">' + numMin + '</span>';
			}
			if (numMaxLabel) {
				numLabelEdge += '<span class="bi-labelEdge bi-edge-max" style="right:' + numMaxLbRight + 'px;top:' + numMaxLbTop + 'px">' + numMax + '</span>';
			}
			if (style == 'vertical') {	
				var lb = opt.vertLabelPos;		
				var w = opt.vertBarWidth;
				var h = opt.vertBarHeight;
				var elemH = $el.css('height');
				var va = opt.vertLabelAlign;				
				$el.addClass('bi-vertical');
				
				if (h == 'line') {
					var bh = elemH;
				} else if (h.indexOf('%') != -1) {
					//Percent of line height
					var bh = parseFloat(elemH) * (parseFloat(h.replace('%','')) / 100);
				} else if (h.indexOf('px') != -1) {
					var bh = h.replace('px','');
				}
					
				var bar = '<div class="bi-bar" style="width:' + w + 'px;height:' + bh + '">' + numLabelEdge + '<div class="bi-barInner"></div></div>';
				if (lb == 'right') {
					var label = '<span class="bi-label bi-label-r" style="vertical-align:' + va + '">' + lbNum + '</span>';
					var inner = bar + label;
				} else if (lb == 'left') {
					var label = '<span class="bi-label bi-label-l" style="vertical-align:' + va + '">' + lbNum + '</span>';
					var inner = label + bar;
				}
			} else if (style == 'horizontal') {
				var bh = opt.horBarHeight;
				var lbPos = opt.horLabelPos;
				var ttl = opt.horTitle;
								
				var label = '<span class="bi-label">' + lbNum + '</span>';
				var bar = '<div class="bi-bar" style="height:' + bh + 'px">' + numLabelEdge + '<div class="bi-barInner"></div></div>';	
								
				switch (lbPos) {
					case 'topLeft':
						var horPosClass = 'bi-hor-topLeft';
						var inner = label + bar;
						break;
					case 'topRight':
						var horPosClass = 'bi-hor-topRight';
						var inner = label + bar;
						break;
					case 'left':
						var horPosClass = 'bi-hor-left';
						var inner = label + bar;
						break;
					case 'right':
						var horPosClass = 'bi-hor-right';
						var inner = bar + label;
						break;
				}
				$el.addClass('bi-horizontal ' + horPosClass);
			}
			
			if (style == 'horizontal' && ttl) {
				var t = '';
				if (ttl == 'bi-title-id') {
					t = $el.attr('id');
				} else if (ttl == 'bi-data-title') {
					var dataT = $el.attr('data-title');
					t = (dataT) ? dataT : 'noTitle';
				} else {
					t = ttl;
				}
				var limSpan = '<span class="bi-limSpan"></span>';
				var title = '<span class="bi-titleSpan bi-titleSpan-' + lbPos + '">' + t + ' ' + limSpan + '</span>';
				inner = title + inner;
			}
			
			//Append inner html
			$el.empty().append(inner);
			var bi_bar = $el.find('.bi-barInner');
			var bi_barHolder = $el.find('.bi-bar');
			var bi_label = $el.find('.bi-label');
			//Trigger event
			$(document).trigger('bi.innerContentAppended', [$el]);			
			if ($elID) {
				$(document).trigger('bi_' + $elID + '.innerContentAppended');
			}
			
			if (style == 'horizontal') {
				var lbPos = opt.horLabelPos;
				if (lbPos == 'left' || lbPos == 'right') {
					var wrpW = parseFloat($el.outerWidth());
					var lbW = parseFloat($el.find('.bi-label').outerWidth());
					var barWrpW = wrpW - lbW - 1;
					var lbH = $el.find('.bi-label').outerHeight();
					var topPos = (lbH - bh) / 2;
					//console.log(lbH + ' - ' + bh);
					bi_barHolder.css({'width':barWrpW + 'px','top':topPos + 'px'});					
				}
			}
			
			//ColorRange
			var paramsColorRange = {
				that: that,
				num: num
			}
			var lengthObj = Plugin.prototype._getColorRangeClass.apply(this, [paramsColorRange]);
			
			//Apply colours (if set in options)
			var foreColor = opt.foreColor;
			var backColor = opt.backColor;
			var labelColor = opt.labelColor;
			if (foreColor) {
				var fColor = Plugin.prototype._getColorValue.apply(this, [foreColor]);
				if (fColor) {
					bi_bar.css({'background-color':fColor});
				}
			}
			if (backColor) {
				var bColor = Plugin.prototype._getColorValue.apply(this, [backColor]);
				if (bColor) {
					bi_barHolder.css({'background-color':bColor});
				}
			}
			if (labelColor) {
				var lColor = Plugin.prototype._getColorValue.apply(this, [labelColor]);
				if (lColor) {
					bi_label.css({'color':lColor});
				}
			}
			
			//Set label visibility and position (hover)
			switch (opt.labelVisibility) {
				case 'default':
					var labelVisClass = 'bi-label-vis-default';
					break;
				case 'hover':
					var labelVisClass = 'bi-label-vis-hover';
					var posObj = opt.labelHoverPos;
					var lb = $el.find('.bi-label');
					var posString = '';
					for(n in posObj) {
						switch (n) {
							case 'top':
							case 'left':
							case 'bottom':
							case 'right':
								lb.css({n:posObj[n]});
								break;
						}
					}
					break;
				case 'hidden':
					var labelVisClass = 'bi-label-vis-hidden';
					break;
			}
			$el.addClass(labelVisClass);
			
			//If average (avgActive) is set to true, first calculate the average and then set the milestones
			var avg = opt.avgActive;
			if (avg) {
				var paramsAvg = {
					that: that
				}
				Plugin.prototype._getAverage.apply(this, [paramsAvg]);
			} else {
				//Set milestones
				var mlst = opt.milestones; 
				if (mlst && !$.isEmptyObject(mlst)) {
					var paramsMlst = {
						that: that
					}
					Plugin.prototype._getMilestones.apply(this, [paramsMlst]);
				}
			}
						
			//Load bar -------------------------------------------------------------------------------------------------------- //			
			if (opt.animation) {
				var timeOut = opt.timeout;
				var event = opt.triggerEvent;
				var forceAnim = opt.forceAnim;
				var forceDelay = opt.forceDelay;
				var paramsAnim = {
					that: that,
					bl: barLength
				}
				var paramsCount = {
					that: that,
					target: num
				}
				if (forceAnim == false) {
					if (event == 'load') {
						$(window).load(function() {
							Plugin.prototype._animateBar.apply(this, [paramsAnim]);
							if (opt.labelNumCount) {
								Plugin.prototype._labelNumCounter.apply(this, [paramsCount]);
							}
						});
					} else {
						$(document).on(event, function() {
							Plugin.prototype._animateBar.apply(this, [paramsAnim]);
							if (opt.labelNumCount) {
								Plugin.prototype._labelNumCounter.apply(this, [paramsCount]);
							}
						});
					}
				} else {
					setTimeout(function() {
						Plugin.prototype._animateBar.apply(this, [paramsAnim]);
						if (opt.labelNumCount) {
							Plugin.prototype._labelNumCounter.apply(this, [paramsCount]);
						}
					},forceDelay);					
				}
			} else {
				var style = opt.style;
				if (style == 'vertical') {
					bi_bar.css({'height': barLength});
				} else if (style == 'horizontal') {
					bi_bar.css({'width': barLength});
				}
			}
		},
		
		_getUniqueID: function(par) {
			if (par) {
				var that = par.that;
				var opt = that.opt;
				var wrpClass = opt.wrpClass;
				var idnum = 0;
				var nArr = [];
				$('.' + wrpClass).each(function() {
					var dn = $(this).attr('data-biID');
					if (dn) {
						var n = parseInt(dn.replace('bi_', ''));
						nArr.push(n);
					}
				});					
				if (nArr.length > 0) {
					var nmax = nArr.sort(function(a,b) { return b-a });
					idnum = parseInt(nmax) + 1;
				}
				return 'bi_' + idnum;
			}
		},
				
		_getLength: function(par) {
			if (par) {
				var that = par.that;
				var opt = that.opt;
				var type = opt.numType;
				var num = par.num;
				
				if (type == 'percent') {
					var lbNum = num + '%';
					var barLength = num + '%';
				} else if (type == 'absolute') {
					var lbNum = num;
					var min = opt.numMin;
					var max = opt.numMax;
					var barLength = (num / (max - min)) * 100 + '%';
				}
				var lengthObj = {
					lbNum: lbNum,
					barLength: barLength
				};
				
				return lengthObj;
			}
		},
				
		_getColorRangeClass: function(par) {
			if (par) {				
				var that = par.that;
				var num = par.num;
				var $el = that.$el;
				var bar = $el.find('.bi-barInner');
				var opt = that.opt;	
				var barstyle = bar.attr('style');
				if (barstyle) {
					bar.attr('style', barstyle.replace('background-color', ''));
				}
				if (opt.colorRange) {
					var limObj = opt.colorRangeLimits;					
					var allRangeClasses = '';
					for (l in limObj) {						
						var rng = limObj[l].split('-');
						var min = parseFloat(rng[0]);
						var max = parseFloat(rng[1]);
						//If range colour is passed into the options object						
						if (num >= min && num <= max) {
							var rangeClass = 'bi-cRange-' + l;
							if (rng.length == 3) {
								var rngColor = rng[2];
								var rngCl = Plugin.prototype._getColorValue.apply(this, [rngColor]);
								if (typeof rngCl !== 'undefined') {
									bar.css({'background-color':rngCl});
								};
							}
						}
						allRangeClasses += 'bi-cRange-' + l + ' ';
					}					
					//Remove any bi-cRange-* class and add the appropriate one
					$el.removeClass(allRangeClasses).addClass(rangeClass);
				}
			}
		},
				
		_animateBar: function(par) {
			if (par) {
				var that = par.that;
				var $el = that.$el;
				var $elID = $el.attr('id');
				var opt = that.opt;
				var style = opt.style;
				var at = opt.animTime;
				var eas = opt.easing;
				var tm = opt.timeOut;
				var bar = that.$el.find('.bi-barInner');
				var bl = par.bl;
				setTimeout(function() {
					if (style == 'vertical') {
						if (par.reanim) {
							bar.css({'height':0}); 
						}
						bar.animate({'height':bl},at,eas).queue(function() {
							$(document).trigger('bi.animationCompleted');
							if ($elID) {
								$(document).trigger('bi_' + $elID + '.animationCompleted');
							}
							if (par.reanim) {
								$(document).trigger('bi.reanimateBarStop'); 
								if ($elID) {
									$(document).trigger('bi_' + $elID + '.reanimateBarStop');
								}
							}
							if (par.loadData) {
								$(document).trigger('bi.loadDataStop');
								if ($elID) {
									$(document).trigger('bi_' + $elID + '.loadDataStop');
								}
							}
							$(this).dequeue();
						});
					} else if (style == 'horizontal') {
						if (par.reanim) {
							bar.css({'width':0}); 
						}
						bar.animate({'width':bl},at,eas).queue(function() {
							$(document).trigger('bi.animationCompleted');
							if ($elID) {
								$(document).trigger('bi_' + $elID + '.animationCompleted');
							}
							if (par.reanim) {
								$(document).trigger('bi.reanimateBarStop'); 
								if ($elID) {
									$(document).trigger('bi_' + $elID + '.reanimateBarStop');
								}
							}
							if (par.loadData) {
								$(document).trigger('bi.loadDataStop'); 
								if ($elID) {
									$(document).trigger('bi_' + $elID + '.loadDataStop');
								}
							}
							$(this).dequeue();
						});
					}
				},tm);
			}
		},
				
		_labelNumCounter: function(par) {
			if (par) {
				var that = par.that;
				var opt = that.opt;
				var $el = that.$el;
				var label = $el.find('.bi-label');
				var min = opt.numMin;
				var target = parseFloat(par.target);
				var countTime = opt.animTime;
				var decim = opt.lbDecimals;
				var step = opt.counterStep;
				var type = opt.numType; 
				var limLabelPos = opt.limLabelPos;
				
				if (type == 'percent') {
					var sign = '%';
				} else if (type == 'absolute') {					
					var sign = '';
				}
				var i = parseFloat(min);
				var ct = (countTime / (target - i)) * step;
				label.html(min + sign);
				function counter() {
					setTimeout(function() {
						label.html(i.toFixed(decim) + sign);					
						if (i<target) {
							i = Math.min(i + step, target);
							counter();
						} else {
							if (limLabelPos == 'num') { 
								var counterLb = label.closest('.bi-wrp').find('.bi-limSpan').prop('outerHTML');
								if (typeof counterLb != 'undefined') {
									var cntrLb = counterLb;
								} else {
									var cntrLb = '';
								}
								label.html(label.html() + cntrLb);
							}
						}
					},ct);				
				}	
				counter();		
			}
		},
				
		_getColorValue: function(par) {
			if (par) {
				var validHex = new RegExp(/(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i);
				var colorNameList = ["AliceBlue","AntiqueWhite","Aqua","Aquamarine","Azure","Beige","Bisque","Black","BlanchedAlmond","Blue","BlueViolet","Brown","BurlyWood","CadetBlue","Chartreuse","Chocolate","Coral","CornflowerBlue","Cornsilk","Crimson","Cyan","DarkBlue","DarkCyan","DarkGoldenRod","DarkGray","DarkGrey","DarkGreen","DarkKhaki","DarkMagenta","DarkOliveGreen","Darkorange","DarkOrchid","DarkRed","DarkSalmon","DarkSeaGreen","DarkSlateBlue","DarkSlateGray","DarkSlateGrey","DarkTurquoise","DarkViolet","DeepPink","DeepSkyBlue","DimGray","DimGrey","DodgerBlue","FireBrick","FloralWhite","ForestGreen","Fuchsia","Gainsboro","GhostWhite","Gold","GoldenRod","Gray","Grey","Green","GreenYellow","HoneyDew","HotPink","IndianRed","Indigo","Ivory","Khaki","Lavender","LavenderBlush","LawnGreen","LemonChiffon","LightBlue","LightCoral","LightCyan","LightGoldenRodYellow","LightGray","LightGrey","LightGreen","LightPink","LightSalmon","LightSeaGreen","LightSkyBlue","LightSlateGray","LightSlateGrey","LightSteelBlue","LightYellow","Lime","LimeGreen","Linen","Magenta","Maroon","MediumAquaMarine","MediumBlue","MediumOrchid","MediumPurple","MediumSeaGreen","MediumSlateBlue","MediumSpringGreen","MediumTurquoise","MediumVioletRed","MidnightBlue","MintCream","MistyRose","Moccasin","NavajoWhite","Navy","OldLace","Olive","OliveDrab","Orange","OrangeRed","Orchid","PaleGoldenRod","PaleGreen","PaleTurquoise","PaleVioletRed","PapayaWhip","PeachPuff","Peru","Pink","Plum","PowderBlue","Purple","Red","RosyBrown","RoyalBlue","SaddleBrown","Salmon","SandyBrown","SeaGreen","SeaShell","Sienna","Silver","SkyBlue","SlateBlue","SlateGray","SlateGrey","Snow","SpringGreen","SteelBlue","Tan","Teal","Thistle","Tomato","Turquoise","Violet","Wheat","White","WhiteSmoke","Yellow","YellowGreen"];
				if (par.indexOf('rgb') == -1) {
					if (par.indexOf('#') == 0) {
						if (validHex.test(par)) {
							var fColor = par;
						}
					} else {
						if ($.inArray(par, colorNameList)) {
							var fColor = par;
						}
					}
				} else {
					var fColor = par;
				}
				return fColor;
			}
		},
				
		_getMilestones: function(par) {
			if (par) {
				var that = par.that;
				var $el = that.$el;	
				var $elID = $el.attr('id');
				var opt = that.opt;
				var style = opt.style;
				var mlst = opt.milestones;
				var slf = par.self; 
				var barWrp = (slf || $el).find('.bi-bar');

				//Append milestones
				if (par.mlstObj) {
					mlst = par.mlstObj;
				}	
				for (m in mlst) {	
					var mlstObj = mlst[m];
					var pos = mlstObj.mlPos;
					var mlstId = mlstObj.mlId;
					var mlstClass = mlstObj.mlClass;
					var mlstDim = mlstObj.mlDim;
					var mlstLabel = mlstObj.mlLabel;
					var mlstVis = mlstObj.mlLabelVis;
					var mlstHoverRange = mlstObj.mlHoverRange;
					var mlstLineHeight = mlstObj.mlLineWidth;
					//Get length object
					var paramsLength = {
						that: that,
						num: pos
					}
					var mlstLb = mlstLabel;
					if (opt.avgLabelNum) {
						if (mlstObj.mlClass == 'bi-average-mlst') {							
							mlstLb = mlstLabel + ' ' + mlstObj.mlPos;
							if (opt.numType == 'percent') {
								mlstLb += '%';
							}
						}						
					}
					var lengthObj = Plugin.prototype._getLength.apply(this, [paramsLength]);
					var barLength = lengthObj.barLength;
					var ml = '<span class="bi-milestone bi-mlst_' + m + ' ' + mlstClass + '" data-id="' + mlstId + '" data-pos="' + barLength + '" data-dim="' + mlstDim + '" data-label="' + mlstLabel + '" data-visible="' + mlstVis + '" data-hoverRange="' + mlstHoverRange + '" data-mlLineWidth="' + mlstLineHeight + '">';
					ml += '<span class="bi-mlst-inner"><span class="bi-mlst-innerLine"></span>';
					ml += '<span class="bi-mlst-label"><span class="bi-mlst-labelTxt">' + mlstLb + '</span></span>';
					ml +=' </span></span>';
					barWrp.append(ml);
					var $ml = barWrp.find('.bi-mlst_' + m);
					$(document).trigger('bi.milestoneAppended', [$ml]);
					if ($elID) {
						$(document).trigger('bi_' + $elID + '_' + mlstId + '.milestoneAppended');
					}
				}
				//Give position and (if true)dimensions
				var thisEl = (slf || $el);

				thisEl.find('.bi-milestone').each(function() {
					var ml = $(this);
					var mlId = ml.attr('data-id');
					var mlPos = ml.attr('data-pos');
					var mlDim = ml.attr('data-dim');
					var mlLabel = ml.attr('data-label');
					var mlVis = ml.attr('data-visible');
					var mlHoverRange = ml.attr('data-hoverRange');
					var mlLineWidth = ml.attr('data-mlLineWidth');
					var absolutePull = parseFloat(mlHoverRange) / 2;
					var mlLineAbsPull = parseFloat(mlLineWidth) / 2;
										
					var mlInner = ml.find('.bi-mlst-inner');
					var mlLine = mlInner.find('.bi-mlst-innerLine');
										
					//Get id (if set)
					if (mlId != 'false') {
						ml.attr('id', mlId);
					}					
					//Get position
					if (style == 'vertical') {						
						ml.css({
							'bottom':mlPos,
							'height':mlHoverRange + 'px',
							'margin-bottom': -absolutePull + 'px'
						});
						mlLine.css({
							'height': mlLineWidth + 'px',
							'margin-top': -mlLineAbsPull + 'px'
						});
					} else if (style == 'horizontal') {
						ml.css({
							'left':mlPos,
							'width':mlHoverRange + 'px',
							'margin-left': -absolutePull + 'px'
						});
						mlLine.css({
							'width': mlLineWidth + 'px',
							'margin-left': -mlLineAbsPull + 'px'
						});
					}
					//Get label visibility
					if (mlVis == 'hover') {
						mlInner.addClass('bi-mlst-innerHover').removeClass('bi-mlst-innerVisible bi-mlst-innerHidden');
					} else if (mlVis == 'visible') {
						mlInner.addClass('bi-mlst-innerVisible').removeClass('bi-mlst-innerHover bi-mlst-innerHidden');
					} else if (mlVis == 'hidden') {
						mlInner.addClass('bi-mlst-innerHidden').removeClass('bi-mlst-innerVisible bi-mlst-innerHover');
					}
					//If mlDim -> apply the given dimensions
					if (mlDim) {
						if (mlDim == 'inherit') {
							var d = '100%';
						} else if (mlDim.indexOf('%') != -1 || mlDim.indexOf('px') != -1) {
							var d = mlDim;
						}						
						if (style == 'vertical') {						
							ml.css({'width':d});
							var mlW = ml.css('width');
							var mrgL = parseFloat(mlW.replace('px','')) / 2;
							ml.css({marginLeft: -mrgL + 'px'});
						} else if (style == 'horizontal') {
							ml.css({'height':d});
							var mlH = ml.css('height');
							var mrgT = parseFloat(mlH.replace('px','')) / 2;
							ml.css({marginTop: -mrgT + 'px'});
						}
					}					
				});				
			}
		},
		
		_getAverage: function(par) {
			if (par) {
				var that = par.that;
				var $el = that.$el;
				var opt = that.opt;
				var barWrp = $el.find('.bi-bar');
				
				var avgMlDim = opt.avgMlDim;
				var avgLabel = opt.avgLabel;
				var avgLabelNum = opt.avgLabelNum;
				var avgLabelVis = opt.avgLabelVis;
				var avgLabelHoverRange = opt.avgLabelHoverRange;
				var avgLineHeight = opt.avgLineWidth;
				var lim = opt.limLabel;
				var limMinLabel = opt.limMinLabel;
				var limMaxLabel = opt.limMaxLabel;
				var limMinVisible = opt.limMinVisible;
				var limMaxVisible = opt.limMaxVisible;
				var limLabelPos = opt.limLabelPos;
				
				//Detect data-avgClass attributes
				var dtAvgCl = $el.attr('data-avgClass');
				if (dtAvgCl && dtAvgCl.length > 0) {
					var avgAttr = $el.attr('data-biAvg');
					var sel = $.data($el,'storedAttr').selector;
					var elem = $(sel + '[data-avgClass="' + dtAvgCl + '"]');
					var notInitCount = 0;
					elem.each(function() {	
						var notInit = !$.data(this, 'plugin_' + pluginName);
						if (notInit) {
							notInitCount++;
						}
					});
					if (notInitCount == 1 && elem.length > 1) {
						var sum = 0;
						var i = 1;
						var numArr = [];
						elem.each(function() {		
							var that = $(this);
							if (!that.hasClass('bi-avgCalculated')) {
								var lbNum = parseFloat(that.attr('data-lbNum'));
								that.addClass('bi-avgCalculated');							
								sum += lbNum;
								i++;
								numArr.push(lbNum);
							}
						});
						var avg = sum / (i - 1);
						if (lim) {
							var numArrSorted = numArr.sort(function(a,b) { return a-b });
							var numArrMin = numArrSorted[0];
							var	numArrMax = numArrSorted[numArrSorted.length - 1];
							elem.each(function() {
								var self = $(this);
								if (self.attr('data-lbNum').indexOf(numArrMin) != -1 && limMinVisible) {
									self.addClass('bi-lbNum-min').find('.bi-limSpan').html(limMinLabel).addClass('bi-limSpan-min');
								}
								if (self.attr('data-lbNum').indexOf(numArrMax) != -1 && limMaxVisible) {
									self.addClass('bi-lbNum-max').find('.bi-limSpan').html(limMaxLabel).addClass('bi-limSpan-max');									
								}
								if (limLabelPos == 'num') {
									elem.addClass('bi-limPos-num');
								} else if (limLabelPos == 'title') {
									elem.addClass('bi-limPos-title');
								}
							});
						}
						elem.attr('data-biAvg', avg.toFixed(2));	
						var trigObj = {
							that: par.that,
							sel: sel
						}
						$(document).trigger('bi.dataAvgSet', [trigObj]);
					}	
				}
			}
		},
		
		_setAvgMilestone: function(par) {
			if (par) {
				var that = par.that;
				var $el = par.$el;
				var opt = that.opt;
				var mlst = opt.milestones;
				var avgColorIndicator = opt.avgColorIndicator;
				var avgColorBelowAvg = opt.avgColorBelowAvg;
				var avgColorAboveAvg = opt.avgColorAboveAvg;
				var avgAttr = $el.attr('data-biAvg');
				if (avgAttr && avgAttr.length > 0) {
					var avg = parseFloat(avgAttr);
					var avgObj = {
						avg: {
							mlPos: avg,
							mlId: opt.avgMlId,
							mlClass: opt.avgMlClass,
							mlDim: opt.avgMlDim,
							mlLabel: opt.avgLabel,
							mlLabelVis: opt.avgLabelVis,	 
							mlHoverRange: opt.avgLabelHoverRange,	
							mlLineWidth: opt.avgLineWidth	
						}
					};
					var mlstObj = $.extend({}, mlst, avgObj);
					if (avgColorIndicator) {
						var innerBar = $el.find('.bi-barInner');
						var lbNum = $el.attr('data-lbnum');						
						if (parseFloat(lbNum) > avg) {
							$el.addClass('bi-avgAbove');
							if (avgColorAboveAvg) {
								var colAbove = Plugin.prototype._getColorValue.apply(this, [avgColorAboveAvg]);
								innerBar.css({'background-color':colAbove});
							}
						} else {
							$el.addClass('bi-avgBelow');
							if (avgColorBelowAvg) {
								var colBelow = Plugin.prototype._getColorValue.apply(this, [avgColorBelowAvg]);
								innerBar.css({'background-color':colBelow});
							}
						}
					}
				} else {
					var mlstObj = mlst;
				}				
				if (mlstObj && !$.isEmptyObject(mlstObj)) {					
					var paramsMlst = {
						that: par.that,
						self: par.$el,
						mlstObj: mlstObj
					}					
					Plugin.prototype._getMilestones.apply(this, [paramsMlst]);
				}
			}
		},
		
		//Getters (no chainability) ---------------------------------------------------------------------- //
		getPluginData: function() {			
			var $el = this.$el;
			var pluginData = $.data($el,'storedAttr');
			return pluginData;
		},
		
		//Public methods --------------------------------------------------------------------------------- //
		reanimateBar: function() {
			var $el = this.$el;
			var $elID = $el.attr('id');
			var opt = this.opt;
			var barLength = $.data($el, 'storedAttr').barLength;
			var num = $.data($el, 'storedAttr').num;	

			//Get color range class
			var paramsColorRange = {
				that: this,
				num: num
			}
			var lengthObj = Plugin.prototype._getColorRangeClass.apply(this, [paramsColorRange]);
			
			//Reanimate bar
			var paramsAnim = {
				that: this,
				bl: barLength,
				reanim: true
			}		
			var paramsCount = {
				that: this,
				target: num
			}
			Plugin.prototype._animateBar.apply(this, [paramsAnim]);
			if (opt.labelNumCount) {
				Plugin.prototype._labelNumCounter.apply(this, [paramsCount]);
			}
			//Trigger event
			$(document).trigger('bi.reanimateBarStart');
			if ($elID) {
				$(document).trigger('bi_' + $elID + '.reanimateBarStart');
			}
		},
		
		loadNewData: function(par) {
			if (par) {
				var newNum = par;
				var $elID = this.$el.attr('id');
				//Get length object
				var paramsLength = {
					that: this,
					num: newNum
				}
				var lengthObj = Plugin.prototype._getLength.apply(this, [paramsLength]);
				var lbNum = lengthObj.lbNum;
				var barLength = lengthObj.barLength;
				
				//Get color range class
				var paramsColorRange = {
					that: this,
					num: parseFloat(lbNum)
				}
				var lengthObj = Plugin.prototype._getColorRangeClass.apply(this, [paramsColorRange]);
				
				var paramsAnim = {
					that: this,
					bl: barLength,
					loadData: true
				}
				var paramsCount = {
					that: this,
					target: lbNum
				}	
				Plugin.prototype._animateBar.apply(this, [paramsAnim]);
				if (this.opt.labelNumCount) {
					Plugin.prototype._labelNumCounter.apply(this, [paramsCount]);
				}
				//Trigger event
				$(document).trigger('bi.loadDataStart');
				if ($elID) {
					$(document).trigger('bi_' + $elID + '.loadDataStart');
				}
				//Change plugin stored data
				var storedData = $.data(this.$el, 'storedAttr');
				storedData['barLength'] = barLength;				
				storedData['num'] = parseFloat(newNum);
			}
		},
				
		destroy: function() {
			//console.log('destroy()');
			var $el = this.$el;
			var opt = this.opt;
			var storedData = $.data($el, 'storedAttr'); 
			var orText = storedData.orText;
			var orClass = storedData.orClass;
			$el.removeData()
				.empty()
				.html(orText)
				.attr('class', orClass)
				.removeAttr('data-lbNum data-biid');
		}
		
	}
		
	$.fn[pluginName] = function(options) {
		var args = arguments;	
		var selector = $(this).selector;
		if (options === undefined || typeof options === 'object') {
			return this.each(function() {			
				if (!$.data(this, 'plugin_' + pluginName)) {
					$.data(this, 'plugin_' + pluginName, new Plugin(this, options, selector));
				}
			});	
		} else if (typeof options === 'string' && options[0] !== '_' && options !== 'init') {
			if (Array.prototype.slice.call(args, 1).length == 0 && $.inArray(options, $.fn[pluginName].getters) != -1) {
				var instance = $.data(this[0], 'plugin_' + pluginName);
				return instance[options].apply(instance, Array.prototype.slice.call(args,1));
			} else {
				return this.each(function() {
					var instance = $.data(this, 'plugin_' + pluginName);
					if (instance instanceof Plugin && typeof instance[options] === 'function') {
						instance[options].apply(instance, Array.prototype.slice.call(args, 1));
					}
				});
			}
		}
	}
	
	$.fn[pluginName].getters = ['getPluginData'];
	
	$.fn[pluginName].defaults = {
		wrpClass: 'bi-wrp',
		data: false,
		style: 'horizontal',	
		theme: 'bi-default-theme',
		animation: true,
		animTime: 300,	
		easing: 'easeOutExpo',
		timeout: 0,	
		colorRange: false,	
		colorRangeLimits: {		
			optimal: '0-40',
			alert: '41-70',
			critical: '71-100'
		},
		foreColor: false,	
		backColor: false,
		labelColor: false,		
		labelVisibility: 'default', 
		labelHoverPos: {
			top:'0',
			left:'20px'
		},
		vertLabelPos: 'right',	
		vertLabelAlign: 'middle',	
		horLabelPos: 'topLeft', 
		horTitle: false,
		numType: 'percent',
		lbDecimals: 0,
		numMin: 0,
		numMax: 100,
		numMinLabel: false,	
		numMaxLabel: false,	
		numMinLbLeft: false, 
		numMaxLbRight: false, 
		numMinLbTop: false, 
		numMaxLbTop: false,
		vertBarWidth: 10,
		horBarHeight: 10,
		vertBarHeight: 'line',			
		triggerEvent: 'load',	
		forceAnim: false,
		forceDelay: 100,
		labelNumCount: true,	
		counterStep: 10,		
		milestones: {
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
		},
		avgActive: false,
		avgColorIndicator: false,	
		avgColorBelowAvg: false,
		avgColorAboveAvg: false,
		avgMlId: false,
		avgMlClass: 'bi-average-mlst',
		avgMlDim: 'inherit',
		avgLabel: 'Average',
		avgLabelNum: true,	
		avgLabelVis: 'hover',	
		avgLabelHoverRange: 15,	
		avgLineWidth: 1,
		limLabel: true,
		limMinLabel: 'min',
		limMaxLabel: 'max',
		limMinVisible: true,
		limMaxVisible: true,
		limLabelPos: 'num'	
	}
	
	$(document).on('bi.dataAvgSet', function(e,a) {		
		var sel = a.sel;
		$(sel).each(function() {			
			var self = $(this);
			var paramsAvg = {
				that: a.that,
				$el: self
			};
			Plugin.prototype._setAvgMilestone.apply(this, [paramsAvg]);
		});
	});
		
})(jQuery, window, document);
