$('body').on('click', '.menu_see', function (e) {
    e.preventDefault();
    $.post('/menu/menu.php',{id:'menu_gallery'}, function (data) {
        let ret = $.parseJSON(data);
        let lx_html = ret.html;
        back_content(e, lx_html);
            $('#content_load .content').html(ret.html);

            
        setTimeout(function () {
            //$('#content_load').addClass('active');
            setTimeout(function () {
                slider_img('#menu_gallery');
            },100);
        },300);
    
    });
    
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
		
		full_img.animate({opacity: 0}, fadeSpeed,'easeInOutQuad',function () {
			$(this).attr('src', src_i);
			setTimeout(function () {
				full_img.animate({opacity: 1}, fadeSpeed,'easeInOutQuad');
			},100);
		});
		
	});

};

let back_content = function (el, lx_html = ''){
    let content = '<div id="content_load"><div class="content_close"><i class="far fa-times-circle"></i></div><div class="content">' + lx_html + '</div></div>';
    let с = getPosition(el);
    let back = $('#back_content');
    let width = back.width();
    back.css({
            'top' : с.y,
            'left' : с.x,
        })
    setTimeout(function () {
        back.toggleClass('active_back');
        if (back.hasClass('active_back')){
            setTimeout(function () {
                $('body').addClass('overflow_hidden');
                back.html(content);
            },500);
        } else {
            back.empty();
            $('body').removeClass('overflow_hidden');
        }
    },100)
    
    
};


let getPosition = function (e){
    let x = y = 0;
    if (!e) {
        let e = window.event;
    }
    if (e.pageX || e.pageY){
        x = e.pageX;
        y = e.pageY;
    } else if (e.clientX || e.clientY){
        x = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
        y = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
    }
    return {x: x, y: y}
};




#back_content{
	box-sizing: border-box;
	width: 0px;
	height: 0px;
	background-color: rgba(46, 219, 219, 0);
	position: fixed;
	z-index: 1000;
	-webkit-box-shadow: 0px 0px 40px 5px rgba(46, 219, 219, 0.2);
	-moz-box-shadow: 0px 0px 40px 5px rgba(46, 219, 219, 0.2);
	box-shadow: 0px 0px 40px 5px rgba(46, 219, 219, 0.2);
	transition: all 1s cubic-bezier(0,0,.58,1);
	box-sizing: border-box;
  }
  
  #back_content.active_back{
	width: 100vw;
	height: 100vh;
	padding: 50px;
	background-color: rgba(46, 219, 219, .98);
	top: 0 !important;
	left: 0 !important;
	right: 0;
	bottom: 0;
	-webkit-box-shadow: 0px 0px 40px 5px rgba(46, 219, 219, 0.8);
	-moz-box-shadow: 0px 0px 40px 5px rgba(46, 219, 219, 0.8);
	box-shadow: 0px 0px 40px 5px rgba(46, 219, 219, 0.8);
	transition: all .5s cubic-bezier(0,0,.58,1);
  }
  
  #content_load {
	display: flex;
	justify-content: center;
	overflow: hidden;
	position: relative;
	width: 100%;
	height: 100%;
	box-sizing: border-box;
	/*
	position: fixed;
	top: 0;
	z-index: 998;  
	left: 100vw;
	background: rgba(145, 255, 255, 0.97);
	opacity: 0;
	-webkit-transition: all ease .5s;
	-moz-transition: all ease .5s;
	-ms-transition: all ease .5s;
	-o-transition: all ease .5s;
	transition: all ease .5s; 
	-webkit-transform-origin: top left;
	-moz-transform-origin: top left;
	-ms-transform-origin: top left;
	-o-transform-origin: top left;
	transform-origin: top left;
	-webkit-transform: rotate(-45deg);
	-moz-transform: rotate(-45deg);
	-ms-transform: rotate(-45deg);
	-o-transform: rotate(-45deg);
	transform: rotate(-45deg);
	*/
  }
  #content_load .content{flex: 1 1 auto;}
  #content_load.active {
	opacity: 1;
	left: 0;
	-webkit-transform: rotate(0deg);
	-moz-transform: rotate(0deg);
	-ms-transform: rotate(0deg);
	-o-transform: rotate(0deg);
	transform: rotate(0deg);
  }


  

.galery_lx{height: 100%; display: flex;flex-direction:column; justify-content: center;}
.galery_lx .slide{display: none; position: absolute; width: 30px; height: 30px;top: calc(50% - 15px); font-size: 2.2em; color: #fff; opacity: .5;}
.galery_lx .slide i {cursor: pointer;}
.galery_lx .slide.slide_prev {left: 10px;}
.galery_lx .slide.slide_next {right: 20px;}
.galery_lx .full_img {height: 80%; flex: 0 0 auto; overflow: hidden; display: flex; justify-content: center;align-items: center;}
.galery_lx .full_img img {height: 100%;}

.galery_lx .small_scroller {margin-top: 10px; padding-top:10px; overflow: hidden; flex: 0 0 90px; display: flex;}
.galery_lx .small_scroller .small_container {position:relative; display: flex;}
.galery_lx .small_scroller .small_container .img_content{position: relative;}
.galery_lx .small_scroller .small_container .img_content img {padding: 3px; height: 100%; width: auto; cursor: pointer;}
@media (max-width: 767px) {
  .galery_lx .small_scroller{display: none;}
  .galery_lx .full_img {height: 100%;flex: 1 1 auto;}
  .galery_lx .slide {display: block;}
}

/*delivery*/
/* #delivery_page .delivery_content .delivery_selection .delivery_menu*/
#delivery_page {display: block;position: fixed; top: 0; left: 0; width: 100vw;height: 100vh;padding: 20px 0px 20px 10px;background: #fff;box-sizing: border-box;}
#delivery_page .delivery_content {display: grid;grid-template-columns: 3fr 1fr;}
.delivery_menu {display: grid;}
.delivery_selection, .delivery_cart {padding: 1em;}
.delivery_page {width: 100%;}
.delivery_page .delivery_product_list {display:none;grid-template-columns: repeat(4,1fr); grid-gap: 10px;overflow-y: auto;}
.delivery_page .delivery_product_list.active_tab{display:grid;}
.product_card {display: block; padding: 5px; border: 1px dashed #949b9e;}
.product_card h3 {text-transform: uppercase; text-align: center; font-weight: 700; color: #130c07;margin-bottom: 5px;}
.product_card img {width: 100%; height: 150px;}

/*end delivery*/

