<?php
//include_once("../fun.php");
$id = $_REQUEST['id'];
$img_dir = "./images_menu/small/";
$arr_small = array_values(array_diff(scandir($img_dir), ['..','.']));
$html = '<div id="'.$id.'" class="galery_lx">
            <div class="slide slide_prev"><i class="fas fa-chevron-circle-left"></i></div>
            <div class="slide slide_next"><i class="fas fa-chevron-circle-right"></i></div>
            <div class="full_img">
                <img src="menu/images_menu/full/'.$arr_small[0].'" />
            </div>
            <div class="small_scroller">
                <div class="small_container">';  
foreach($arr_small as $k => $img){
    $style = ($k == 0)?'active_img':'';
    $html .= '<div class="img_content"><img src="menu/images_menu/small/'.$img.'" class="'.$style.'"/></div>';
}
$html .= '</div></div></div>';

exit(json_encode(compact('html')));