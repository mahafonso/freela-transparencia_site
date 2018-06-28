'use strict';

var init = function() {
	$('.faq li .title').click(function(){
		$(this).parent().toggleClass('active');
		$(this).siblings('.text').slideToggle();
	});
};

init();