<?php


$map = '<div id="y_map"></div>
<script type="text/javascript" charset="utf-8" async src="https://api-maps.yandex.ru/services/constructor/1.0/js/?um=constructor%3A6965b64b81a48122a5e0de409bb4b0d625f37c1d9b3fb95caa1b80ae454abcd1&amp;id=y_map&amp;width=98%&amp;height=100%&amp;lang=ru_RU&amp;scroll=true"></script>';

exit(json_encode(compact('map')));

?>