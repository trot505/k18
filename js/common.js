//////CONTACT FORM VALIDATION
$(document).ready(function() {
	//if submit button is clicked
	$('#submit').click(function () {		
		
		//Get the data from all the fields
		var name = $('input[name=name]');
		var email = $('input[name=email]');
		var regx = /^([a-z0-9_\-\.])+\@([a-z0-9_\-\.])+\.([a-z]{2,4})$/i;
		var comment = $('textarea[name=comment]');
		var returnError = false;
		
		//Simple validation to make sure user entered something
		//Add your own error checking here with JS, but also do some error checking with PHP.
		//If error found, add hightlight class to the text field
		if (name.val() == '') {
			name.addClass('error');
			returnError = true;
		} else name.removeClass('error');
		
		if (email.val() == '') {
			email.addClass('error');
			returnError = true;
		} else email.removeClass('error');		
		
		if(!regx.test(email.val())){
			email.addClass('error');
			returnError = true;
		} else email.removeClass('error');
		
		
		if (comment.val()=='') {
			comment.addClass('error');
			returnError = true;
		} else comment.removeClass('error');
		
		// Highlight all error fields, then quit.
		if(returnError == true){
			return false;	
		}
		
		//organize the data
		
		var data = 'name=' + name.val() + '&email=' + email.val() + '&comment='  + encodeURIComponent(comment.val());

		//disabled all the text fields
		$('.text').attr('disabled','true');
		
		//show the loading sign
		$('.loading').show();
		
		//start the ajax
		$.ajax({
			//this is the php file that processes the data and sends email
			url: "contact.php",	
			
			//GET method is used
			type: "GET",

			//pass the data			
			data: data,		
			
			//Do not cache the page
			cache: false,
			
			//success
			success: function (html) {				
				//if contact.php returned 1/true (send mail success)
				if (html==1) {
				
					//show the success message
					$('.done').fadeIn('slow');
					
					$(".form").find('input[type=text], textarea').val("");
					
				//if contact.php returned 0/false (send mail failed)
				} else alert('Во воремя отправки сообщения что-то пошло не так. Попробуйте позже.');				
			}		
		});
		
		//cancel the submit button default behaviours
		return false;
	});	
	// Start LYNX
	$('body').on('click', '.galery', function (e) {
		e.preventDefault();
		$('#content_load').addClass('active');
	});
	$('body').on('click','.content_close i',function (e) {
		e.preventDefault();
		$('#content_load').removeClass('active');
		setTimeout(function () {
			$('#content_load .content').html('');
		},200);
	});
	$('body').on('click', '.menu_see', function (e) {
		e.preventDefault();
		$.post('/menu/menu.php',{id:'menu_gallery'}, function (data) {
			let ret = $.parseJSON(data);
			$('#content_load .content').html(ret.html);
			
			setTimeout(function () {
				$('#content_load').addClass('active');
				setTimeout(function () {
					slider_img('#menu_gallery');
				},100);
			},300);
		});
		
	});
	// end LYNX
});	

let slider_img = function (id) {
	sliderWidth = $(id + ' .small_scroller').innerWidth();
	let totalContent = 0;
	
	$(id + ' .small_scroller .img_content').each(function () {
		totalContent += $(this).innerWidth();
	});
	if (sliderWidth > totalContent) $(id).css('justify-content', 'center');
	$(id + ' .small_scroller .small_container').css('width',totalContent);
	
	$(id).mousemove(function(e){
		if($(id + ' .small_scroller .small_container').width()>sliderWidth){
			let mouseCoords=(e.pageX - this.offsetLeft);
			let mousePercentX=mouseCoords/sliderWidth;
			let destX=-(((totalContent-(sliderWidth))-sliderWidth)*(mousePercentX));
			let thePosA=mouseCoords-destX;
			let thePosB=destX-mouseCoords;
			let animSpeed=600; //ease amount
			let easeType='easeOutCirc';
			
			if(mouseCoords==destX){
				$(id + ' .small_scroller .small_container').stop();
			}
			else if(mouseCoords>destX){
				$(id + ' .small_scroller .small_container').stop().animate({left: -thePosA}, animSpeed,easeType);
			}
			else if(mouseCoords<destX){
				$(id + ' .small_scroller .small_container').stop().animate({left: thePosB}, animSpeed,easeType);
			}
			
		}
	});

	let fadeSpeed=300;
	$(id + ' .small_scroller .small_container .img_content img').each(function () {
		if (!$(this).hasClass('active_img')) $(this).fadeTo(fadeSpeed, 0.6);
	});
	
	$(id + ' .small_scroller .small_container .img_content img').hover(
	function(){ //mouse over
		$(this).fadeTo(fadeSpeed, 1);
	},
	function(){ //mouse out
		if (!$(this).hasClass('active_img')) $(this).fadeTo(fadeSpeed, 0.6);
	});

	$('body').on('click', id + ' .small_scroller .small_container .img_content img', function (e) {
		let el = $(this);
		let img_src = this.src.replace('small','full');
		let full_img = $(id + ' .full_img img');
		
		$(id + ' .small_scroller .small_container .img_content').each(function () {
			if ($(this).children('img').hasClass('active_img')) {
				$(this).children('img').removeClass('active_img').fadeTo(fadeSpeed, 0.6);
			}
		});
		el.addClass('active_img');
		full_img.animate({opacity: 0}, fadeSpeed,'easeInOutQuad',function () {
			$(this).attr('src', img_src);
			setTimeout(function () {
				full_img.animate({opacity: 1}, fadeSpeed,'easeInOutQuad');
			},100);
		});
	});

	$('body').on('click', id + ' .slide i', function (e) {
		let par = $(this).parent('.slide');
		let i = 0;
		let add_c = 0;
		let full_img = $(id + ' .full_img img');
		let src_i;
		let img_arr = $(id + ' .small_scroller .small_container .img_content img');

		img_arr.each(function (key) {
			if ($(this).hasClass('active_img')) i = key;
		});
		let l = img_arr.length - 1;
		if (par.hasClass('slide_prev')){
			if(i == 0){
				src_i = img_arr[l].src;	
				add_c = l;
			} else {
				src_i = img_arr[i].src;
				add_c = i - 1;
			}
		} else if (par.hasClass('slide_next')) {
			if(i == l) src_i = img_arr[0].src;	
			else {
				add_c = i + 1;
				src_i = img_arr[add_c].src;
			}
		}
		
		src_i = src_i.replace('small','full');
		$(img_arr[i]).removeClass('active_img');
		$(img_arr[add_c]).addClass('active_img');
		console.log(src_i + ' i - ' + i + ' add_c-' + add_c);
		full_img.animate({opacity: 0}, fadeSpeed,'easeInOutQuad',function () {
			$(this).attr('src', src_i);
			setTimeout(function () {
				full_img.animate({opacity: 1}, fadeSpeed,'easeInOutQuad');
			},100);
		});
		
	});

};
	// Page Loader
	setTimeout(function(){
		$('body').addClass('loaded')
	}, 1000);
	
	
	
	
	
	// Menu
	$(window).on("resize", function () {
  var positionTop = window.innerHeight / 2;
  $('nav ul').css('top', positionTop);
  var marginTop = $('nav ul').height() / 2;
  $('nav ul').css('margin-top', -marginTop);
}).resize();