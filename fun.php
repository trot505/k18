<?php
function pp($s) {
    echo '<pre>';
    print_r($s);
    echo '</pre>';
}

$form_fields = array(
    'name' => 'Имя',
    'last_name' => 'Фамилия',
    'first_name' => 'Имя',
    'middle_name' => 'Отчество',
    'birtch_day' => 'Дата рождения',
    'e_mail' => 'E-mail',
    'phone' => 'Телефон',
    'region' => 'Регион/Край/Область',
    'city' => 'Город',
    'bid_id' => 'Идентификатор заявки',
    'comment' => 'Текст сообщения',
 );
 
//Simple mail function with HTML header
function sendmail($to, $subject, $message, $from) {
	$replyto = 'g.gorlasty@bk.ru'; 
    $to = ((isset($d['to']))?$d['to']:$replyto);

    $subject = "=?utf-8?B?".base64_encode($d['subject'])."?=";
    $message = "<html><body>{$d['html']}</body></html>";

    $headers  = "Content-type: text/html; charset=UTF-8 \r\n";
    $headers .= (isset($d['from']))?isset($d['from']):"From: Горластый Гарри <info@karaoke18.ru>\r\n";
    //$headers .= "Reply-To: Горластый Гарри <".$replyto.">\r\n";
    $headers .= "Bcc: <trot505@yandex.ru>\r\n";

    return @mail($to, $subject, $message, $headers);
}

function generateEmailTable($rs) {
    $ret = '';
    $table_style = 'style="border-collapse:collapse;"';
    $th_style = 'style="border:solid 1px #ccc;padding:10px 15px;text-align:left"';
    $td_style = 'style="border:solid 1px #ccc;padding:10px 15px;"';
    foreach ($rs as $rk => $rv) {
        $ret .= '<tr><th '.$th_style.'>'.$rk.'</th><td '.$td_style.'>'.$rv.'</td></tr>';
    }
    $ret = '<table '.$table_style.'>'.$ret.'</table>';
    return $ret;
}
