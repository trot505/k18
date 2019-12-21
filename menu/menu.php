<?
include_once("../fun.php");
$id = $_REQUEST['id'];
$img_dir = "./images_menu/small/";
$arr_small = array_values(array_diff(scandir($img_dir), ['..','.']));
$html = '<div id="menu_gallery">
            <div id="full_img">
                <img src="menu/images_menu/full/'.$arr_small[0].'" />
            </div>
            <div id="'.$id.'">
                <div class="small_container">';  
foreach($arr_small as $img){
    $html .= '<div class="img_content"><img src="menu/images_menu/small/'.$img.'"/></div>';
}
$html .= '</div></div></div>';

exit(json_encode(compact('html')));