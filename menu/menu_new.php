<?php
$img_dir = "../img/images_menu/small/";
$arr_small = array_values(array_diff(scandir($img_dir), ['..','.']));
$error = false;
    
$script = '<link  href="css/fotorama.css" rel="stylesheet">
<script src="js/fotorama.js"></script>';

$html = '<div class="up_slider"  data-nav="thumbs" data-loop="true" data-width="96%" data-height="96%" data-arrows="false">';
foreach($arr_small as $k => $img){
    $html .= '<a href="img/images_menu/full/'.$img.'" data-thumb="img/images_menu/small/'.$img.'"></a>';
}

$html = $html.'</div>'.$script;


exit(json_encode(compact('error','html')));