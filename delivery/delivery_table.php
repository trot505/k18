<?
include_once "../fun.php";
$file_str = file_get_contents("./delivery_menu.csv");
$arr_string_menu = explode(PHP_EOL,$file_str);
pp($arr_string_menu);

?>