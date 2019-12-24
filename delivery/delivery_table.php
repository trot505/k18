<?php
include_once "../fun.php";
$file_str = file_get_contents("./delivery_menu.csv");
$arr_string_menu = explode(PHP_EOL,$file_str);
$arr_chapter = [];

foreach ($arr_string_menu as $key => $string_el) {
    $arr_menu_el = explode('_',$string_el);
    $arr_chapter[$arr_menu_el[0]][] = [
        'name' => $arr_menu_el[1],
        'images' => $arr_menu_el[2],
        'property' => $arr_menu_el[3],
        'price' => $arr_menu_el[4],
    ];
}
//pp($arr_chapter);

$delivery_menu = '<div class="delivery_menu" style="grid-template-columns:repeat('.count($arr_chapter).',1fr)">';
$delivery_page = '<div class="delivery_page">';
$count_tab = 0;
foreach ($arr_chapter as $name_menu => $arr_value) {
    if (empty($arr_value)) continue;
    $active_style = ($count_tab == 0)?'active_tab':'';
    $delivery_menu .= '<div class="delivery_menu_item" dtata-id-tab="delivery_tab_'.$count_tab.'">'. $name_menu.'</div>';
    $delivery_page .= '<div id= "delivery_tab_'.$count_tab.'" class="delivery_product_list '.$active_style.'">';
    foreach ($arr_value as $val_product) {
        $delivery_page .= '<div class="product_card">';
        $name; $images; $property; $price;
        foreach ($val_product as $name_options => $v) {
            switch ($name_options){            
                case 'name':
                    $name = '<h3>'.$v.'</h3>';
                    break;
                case 'images':
                    $images = '<img src="'.$v.'"/>';
                    break;
                case 'property':
                    $property = '<div class="product_property">'.$v.'</div>';
                    break;
                case 'price':
                    $price = '<div class="product_price">'.$v.'</div>';
                    break;
                default:
                    break;
            }
        }
        $delivery_page .= $name.$images.$property.$price.'</div>';
    }    
    $delivery_page .= '</div>';
    $count_tab++;
}
$delivery_menu .= '</div>';
$delivery_page .= '</div>';
?>
<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link href="../css/style.css" rel="stylesheet">
    <title>Заказ</title>
</head>
<body>
    <div id="delivery_page">
        <div class="delivery_contact"></div>
        <div class="delivery_content">
            <div class="delivery_selection">
                <?=$delivery_menu?>
                <?=$delivery_page?>
            </div>
            <div class="delivery_cart">

            </div>
        </div>
    </div>
    
</body>
</html>