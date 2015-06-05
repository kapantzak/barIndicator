$(document).ready(function() {
	
	setGoTop();
	toggleGoTop();
	
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
		horBarHeight:30,
		foreColor:'#e25a48'
	}
	$('#test4').barIndicator(opt4);
	//#5
	var opt5 = {
		horBarHeight:30,
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
		bar20.barIndicator();
	});
});

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

$('#goTop').on('click', function() {
	$('body,html').animate({scrollTop:0},350,'easeOutExpo');	
});

$(window).resize(function() {
	setGoTop();
});
$(window).scroll(function() {
	toggleGoTop();
});

