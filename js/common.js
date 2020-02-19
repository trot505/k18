$(document).ready(function() {
	//CONTACT FORM VALIDATION
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
	
	$('body').on('click','.content_close i',function (e) {
		e.preventDefault();
		$('body').removeClass('overflow_hidden');
		$('#full_box').css({'opacity':0});
		setTimeout(() => {
			$('#full_box').removeAttr('style');
			$('#full_box .full_content').empty();
		}, 420);
		
	});
	

	$('body').on('click', '.full_c', function (e) {
		e.preventDefault();
		
		$('#full_box').css({'display':'grid'});
		setTimeout(() => {
			$('#full_box').css({'opacity':1});
			$('body').addClass('overflow_hidden');
		}, 50);
		
		$.post('/menu/menu_new.php',{id:'menu_gallery'}, function (data) {
			let ret = $.parseJSON(data);
			let err = ret.error;
			let fc = ret.html;
			setTimeout(() => {
				if (!err) {
					$('#full_box .full_content').html(fc);
					$('#full_box .full_content .up_slider').fotorama({});
				}
			}, 400);
			
		});
	});

	// end LYNX
});	


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