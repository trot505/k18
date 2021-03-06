<?php 
header("Content-Type: text/html; charset=utf-8");
?>
<!DOCTYPE html>
<html lang="ru">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="description" content="">
<meta name="author" content="Краоке бар Горластый Гарри">
<link rel="shortcut icon" href="/favicon.ico">
<title>Горластый Гарри</title>
<!-- CSS -->
<link href="css/style.css" rel="stylesheet">
<link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.12.0/css/all.css" integrity="sha384-REHJTs1r2ErKBuJB0fCK99gCYsVjwxHrSU0N7I1zl9vZbggVJXRMsv/sLlOAGb4M" crossorigin="anonymous">


</head>
<body class="frontpage">

<div id="loader-wrapper">
<div id="loader"></div>
<div class="loader-section section-left"></div>
<div class="loader-section section-right"></div>
</div>
<section id="full_box"><div class="content_close"><i class="fas fa-times"></i></div><div class="full_content"></div></section>

<div class="fixed_delivery"><i class="fas fa-truck"></i></div>

<div class="fixedcallicon">
	<i class="fa fa-phone"></i><a href="tel:+73412775095">+7 (3412) 775-095</a>
</div>

<div class="container">
	<section class="background">
	<div class="content-wrapper">
		<div class="intro">
			<h1><span class="smaller">Ижевск, пер. Интернациональный, 3</span>
			<span class="small">- Пой со мной -</span><br/>
			<a href="#" class="full_c">Фото</a>
			</h1>
		</div>
	</div>
	</section>
	<section class="background">
	<div class="content-wrapper">
		<div class="about">
			<div class="aboutbadge">
				<span>
				<span class="border">Режим работы</span><br>
				Пн. - Чт. с 18 до 24 часов<br>
				Пт. - Сб. с 18 до 05 часов<br>
				Вс. с 18 до 24 часов
				<span class="info"> Вы мождете ознакомится с планом <a href="https://izhevsk360.ru/panorama/izhevsk/gorlastygarry" trget="_blank">зала -></a> или посмотреть <a href="https://izhevsk360.ru/panorama/izhevsk/gorlastygarry" target="_blank">3D-тур -></a></span>
				</span>
			</div>
		</div>
	</div>
	</section>
	<section class="background">
	<div class="content-wrapper">
		<div class="voucher">
			<div class="voucher-whitetransparent">
				<h2>СПИСОК ПЕСЕН</h2>
				<h2>ПРАВИЛА БАРА</h2>
			</div>
		</div>
	</div>
	</section>
	<section class="background">
	<div class="content-wrapper">
		<div class="pricingbadge">
			<h4>МЕНЮ КУХНИ И БАРА</h4>
			<h4>АКЦИИ</h4>
		</div>
	</div>
	</section>
	<section class="background">
	<div class="content-wrapper">
		<div class="testimonialarea">
			<div class="contact-bubble">
				<div class="contact">
					<p><i class="fas fa-map-marked-alt"></i><span>г. Ижевск, пер. Интернациональный 3<span></p>
					<p><a href="tel:+73412775095"><i class="fas fa-phone-square-alt"></i><small>+7 (3412)</small><span class="number">775-095</span></a></p>
					<p><i class="fas fa-at"></i><span>g.gorlasty@bk.ru</span></p>
				</div>
			</div>
			<div class="contactform-bubble">
				<form autocomplete="off" class="contactform" method="post" action="contact.php" id="contactform">
					<h4>Для бронирования столика заполните форму.</h4>
					<input name="name" type="text" maxlength="100" placeholder="Ваше имя" required>
					<input name="phone" type="tel" maxlength="21" placeholder="Телефон" required>
					<textarea name="comment" placeholder="Укажите на какую дату и время Вы планируете заказать столик." rows="4" required></textarea>
					<input value="ОТПРАВИТЬ" type="submit" id="submit" class="btnsend">
				</form>
			</div>
			<div class="social-bubble">
				<div class="social">
					<h4>МЫ В СЕТИ</h4>
					<a href="https://vk.com/gorlastiygarry" target="_blank"><i class="fab fa-vk"></i></a>
					<a href="https://www.instagram.com/gorlastiygarry/" target="_blank"><i class="fab fa-instagram"></i></a>
				</div>
			</div>
		</div>
	
</div>


	</section>
</div>

<!-- Scripts -->
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery-easing/1.4.1/jquery.easing.min.js"></script>
<script src="js/common.js"></script>
<script src="js/home.js"></script>

</body>
</html>