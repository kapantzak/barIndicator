$(document).ready(function() {
	
	setGoTop();
	toggleGoTop();
	buildContents();
	
	//Intro
	var optIntro = {
		//labelVisibility:'hidden',
		counterStep:1,
		milestones:false,
		horBarHeight:20,
		animTime:1000
	}
	$('#introSample').barIndicator(optIntro);
	
	//#1
	$('#test1').barIndicator();
	//#2
	var opt2 = {
		style:'vertical'
	}
	$('#test2').barIndicator(opt2);
	//#3
	var opt3 = {
		horBarHeight:30
	}
	$('#test3').barIndicator(opt3);
	//#4
	var opt4 = {
		foreColor:'#e25a48'
	}
	$('#test4').barIndicator(opt4);
	//#5
	var opt5 = {
		foreColor:'#e25a48',
		backColor:'rgb(126,196,107)'
	}
	$('#test5').barIndicator(opt5);
	//#6
	var opt6 = {
		//horBarHeight:30,
		horLabelPos:'topRight'
	}
	$('#test6').barIndicator(opt6);
	//#7
	var opt7 = {
		//horBarHeight:30,
		horLabelPos:'left'
	}
	$('#test7').barIndicator(opt7);
	//#8
	var opt8 = {
		//horBarHeight:30,
		horLabelPos:'right'
	}
	$('#test8').barIndicator(opt8);
	//#9
	var opt9 = {
		horTitle:'This is a sample title'
	}
	$('#test9').barIndicator(opt9);
	//#10
	var opt10 = {
		colorRange:true
	}
	$('.testBar1').barIndicator(opt10);
	//#11
	var opt11 = {
		colorRange:true,
		colorRangeLimits: {
			optimal: '0-20',
			newRangeOne: '21-40-#4aa64f',
			newRangeTwo: '41-60-green',
			newRangeThree: '61-90-rgb(241,144,40)',
			critical: '91-100'
		}
	}
	$('.testBar2').barIndicator(opt11);
	//#12
	var opt12 = {
		numType:'absolute',
		numMin:0,
		numMax:250
	}
	$('#test16').barIndicator(opt12);
	//#13
	var opt13 = {
		milestones: {
			1: {
				mlPos: 20,
				mlId: false,
				mlClass: 'bi-custom',
				mlDim: '200%',
				mlLabel: 'Milestone one',
				mlLabelVis: 'hover',	 
				mlHoverRange: 15,	
				mlLineWidth: 1	
			},
			2: {
				mlPos: 60,
				mlId: false,
				mlClass: 'bi-custom',
				mlDim: '200%',
				mlLabel: 'Milestone two',
				mlLabelVis: 'hover',	 
				mlHoverRange: 15,	
				mlLineWidth: 1	
			}
		}
	}
	$('#test17').barIndicator(opt13);
	//#14
	var bar18 = $('#test18'); 
	bar18.barIndicator();
	$('#reanimateBtn').on('click', function() {
		bar18.barIndicator('reanimateBar');
	});
	//#15
	var bar19 = $('#test19');
	bar19.barIndicator();
	$('#loadDataBtn').on('click', function() {
		var data = 85;
		bar19.barIndicator('loadNewData', [data]);
	});
	//#16
	var bar20 = $('#test20');
	bar20.barIndicator();
	$('#destroyBtn').on('click', function() {
		bar20.barIndicator('destroy');
	});
	$('#initBtn').on('click', function() {
		bar20.barIndicator({ forceAnim:true });
	});
	//#17
	var opt14 = {
		avgActive: true,
		avgColorIndicator: true,
		lbDecimals: 2,
		horTitle: 'bi-title-id',
		milestones: false		
	};
	$('.testBar3').barIndicator(opt14);	
	//#18
	var opt15 = {
		numMinLabel:true,
		numMaxLabel:true
	};
	$('#test21').barIndicator(opt15);
	//#19
	var bar22 = $('#test22'); 
	bar22.barIndicator();
	var data22 = bar22.barIndicator('getPluginData');
	$('#getPluginDataBtn').on('click', function() {
		alert(data22.barLength);
	});
	//#20
	var bar23 = $('#test23'); 	
	var btn23Reanim = $('#reanimPluginEventBtn');
	var btn23Data = $('#dataPluginEventBtn');
	$('#initPluginEventBtn').on('click', function() {		
		var ul23 = $('#test23-events');	
		$(document).on('bi.innerContentAppended', function() {
			ul23.append('<li>bi.innerContentAppended</li>');
		});
		$(document).on('bi.milestoneAppended', function() {
			ul23.append('<li>bi.milestoneAppended</li>');
		});
		$(document).on('bi.animationCompleted', function() {
			ul23.append('<li>bi.animationCompleted</li>');
			btn23Reanim.prop('disabled', false);
			btn23Data.prop('disabled', false);
		});
		$(document).on('bi.reanimateBarStart', function() {
			ul23.append('<li>bi.reanimateBarStart</li>');
		});
		$(document).on('bi.reanimateBarStop', function() {
			ul23.append('<li>bi.reanimateBarStop</li>');
		});
		$(document).on('bi.loadDataStart', function() {
			ul23.append('<li>bi.loadDataStart</li>');
		});
		$(document).on('bi.loadDataStop', function() {
			ul23.append('<li>bi.loadDataStop</li>');
		});
		var opt16 = {
			animTime:1500,
			forceAnim:true
		}
		bar23.barIndicator(opt16);			
	});	
	btn23Reanim.on('click', function() {
		bar23.barIndicator('reanimateBar');
	});
	var newData23 = 80;
	btn23Data.on('click', function() {
		bar23.barIndicator('loadNewData', [newData23]);
	});
});

var buildContents = function() {
	var optHolder = $('#cont-options');
	var methodHolder = $('#cont-methods');
	var eventHolder = $('#cont-events');
	
	$('.secOpt').each(function() {
		var that = $(this);
		var id = that.attr('id');
		var txt = that.attr('data-content');
		optHolder.append('<a class="contAnchor" href="#' + id + '">' + txt + '</a>');
	});
	$('.secMethods').each(function() {
		var that = $(this);
		var id = that.attr('id');
		var txt = that.attr('data-content');
		methodHolder.append('<a class="contAnchor" href="#' + id + '">' + txt + '</a>');
	});
	$('.secEvents').each(function() {
		var that = $(this);
		var id = that.attr('id');
		var txt = that.attr('data-content');
		eventHolder.append('<a class="contAnchor" href="#' + id + '">' + txt + '</a>');
	});
}

var setGoTop = function() {
	var gt = $('#goTop');
	var w = $(window).width();
	var mw = $('#main-wrapper').outerWidth();
	var gtw = gt.outerWidth();
	var r = ((parseFloat(w) - parseFloat(mw)) / 2) - parseFloat(gtw) - 5;
	gt.css({'right': r + 'px'});
}
var toggleGoTop = function() {
	var gt = $('#goTop');
	var t = $(window).scrollTop();
	if (t > 200) {
		gt.show();
	} else {
		gt.hide();
	}
}

$(document).on('click', '#cont-toggle', function() {
	var that = $(this);
	var cont = $('#contents');
	if (cont.hasClass('cont-expanded')) {
		that.html('+');
		cont.removeClass('cont-expanded').addClass('cont-collapsed');
	} else if (cont.hasClass('cont-collapsed')) {
		that.html('-');
		cont.addClass('cont-expanded').removeClass('cont-collapsed');
	}
});

$('#goTop').on('click', function() {
	$('body,html').animate({scrollTop:0},350,'easeOutExpo');	
});

$(window).resize(function() {
	setGoTop();
});
$(window).scroll(function() {
	toggleGoTop();
});

