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

