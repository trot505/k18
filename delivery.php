<?php

$src = 'https://booking.sbis.ru/delivery_single?widgetId=729f8c81-e08d-49a9-b91d-e0e2321f13dc&pointId=328&theme=default';
$delivery = '<iframe id="delivery_lx" src="'.$src.'" seamless ></iframe>';

exit(json_encode(compact('delivery')));
?>