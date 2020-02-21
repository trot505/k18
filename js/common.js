$(document).ready(function() {
	let chek_i = (el, ret = false)=>{
		let vi = el.val();
		
		let len = vi.length;
		let type = (el[0].tagName == 'TEXTAREA')?'textarea':el.attr('type');
		let err = true;

		let reg_name = /^[?!,.а-яА-ЯёЁ\s]+$/gi;
		let reg_phone = /^[0-9\-+()]+$/gi;
		let reg_coment = /^[?!\-\(\)\/,.а-яА-ЯёЁ0-9\s]+$/gi;

		if (len > 2){
			switch (type) {
				case 'text':
					if (vi == '' || !reg_name.test(vi)){
						if (!el.hasClass('error')) el.addClass('error');
					} else {
						el.removeClass('error');
						err = false;
					}
					break;
				case 'tel':
					if (vi == '' || !reg_phone.test(vi) || (len >= 21 || len < 6)) {
						if (!el.hasClass('error')) el.addClass('error');
					} else {
						el.removeClass('error');
						err = false;
					}
					break;
				case 'textarea':
					if (vi == '' || !reg_coment.test(vi)) {
						if (!el.hasClass('error')) el.addClass('error');
					} else {
						el.removeClass('error');
						err = false;
					}
					break;
				default:
					break;
			}
		}
		if (ret) {
			let name = el.attr('name');
			return { err : err, name : name, value : encodeURIComponent(vi)};	
		} else return err;
		
	};
	$('body').on('keyup', 'input, textarea', (e) => {
		let i = $(e.target);
		let ret = chek_i(i);
	});
	//CONTACT FORM VALIDATION
	//if submit button is clicked
	$('#submit').click(function (e) {		
		e.preventDefault();
		let returnError = false;
		//Get the data from all the fields
		let form = $(this).parents('#contactform');
		//let sForm = form.serializeArray();
		let req = {};
		form.find('input:not([type="submit"]),  textarea').each((key, element) => {
			let out = chek_i($(element), true);
			req[out.name] = out.value;			
			returnError = (returnError)?returnError:out.err;
		});
		
		// Highlight all error fields, then quit.
		if(returnError == true){
			return false;	
		}

		$.post('contact.php', req, function(j) {
			let d = $.parseJSON(j);
			let h = $('<div class="done"><p>' + d.message + '</p></div>').appendTo('.contactform-bubble');
			if (d.err) h.addClass('done_err');
			else $('.contactform-bubble form')[0].reset();
			setTimeout(() => {
				h.css({'opacity':1});	
			}, 100);
			
			setTimeout(() => {
				h.css({'opacity':0}).delay(800).queue(() => {h.remove()});
			}, 3000);
		});

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
		open_full();		
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

	$('body').on('click', '.contact .fa-map-marked-alt', (e) =>{
		e.preventDefault();
		open_full();
		$.post('map.php', function (data) {
			let ret = $.parseJSON(data);
			let map = ret.map;
			setTimeout(() => { $('#full_box .full_content').html(map);}, 400);
		});
	});

	$('body').on('click', '.fixed_delivery', (e) =>{
		e.preventDefault();
		open_full();
		$('#full_box').css({'max-width':'700px'});
		$.post('delivery.php', function (data) {
			let ret = $.parseJSON(data);
			let delivery = ret.delivery;
			setTimeout(() => { 
				$('#full_box .full_content').html(delivery);
			}, 300);
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

function open_full() {
	$('#full_box').css({ 'display': 'grid' });
	setTimeout(() => {
		$('#full_box').css({ 'opacity': 1 });
		$('body').addClass('overflow_hidden');
	}, 50);
}
