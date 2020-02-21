<?php

include_once 'fun.php';

$req = $_REQUEST;
$err = false;
$message = 'Проверка';

$d = date('d-m-Y H:i');

$rows = [];
foreach ($form_fields as $form_field_name => $form_field) {
    if (isset($req[$form_field_name]) && $req[$form_field_name] != '') {
        $rows[$form_field] = nl2br(htmlentities(strip_tags(urldecode($req[$form_field_name])), ENT_QUOTES, "UTF-8"));
    }
 }

$html = generateEmailTable($rows);

$d = [
	'to' => 'trot505@yandex.ru',
    'subject' => 'Бронирование стола с сайта Горластый Гарри',
	'from' => "From: Горластый Гарии (инфо) <info@karaoke18.ru>\r\n",
	'html' => $html,
];

if (sendMail($d)) $message = 'Ваше сообщение отправлено.<br /> В ближайшее время с Вами сяжется администратор для учтонения деталей бронирования.<br /> Хорошего Вам дня!';
else {
	$err = true;
	$message = 'Извените сообщение не доставлено, просим повторить отправку позднее.';
}

exit(json_encode(compact('err','message')));

?>