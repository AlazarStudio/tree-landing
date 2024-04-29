<?php 
session_start();
require 'rb/rb.php';

R::setup( 'mysql:host=localhost; dbname=treelanding_db', 'root', '');
// R::setup( 'mysql:host=localhost; dbname=proekttf_db', 'proekttf_db', 'eP%Hf%L3');

if (!R::testConnection()) {
    exit('Нет подключения к БД');
}

function formatstr($str){
    $str = trim($str);
    $str = stripslashes($str);
    $str = htmlspecialchars($str);
    return $str;
}

?>
