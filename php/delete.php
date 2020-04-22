<?php

$result = "delete page";

if(isset($_POST['name'])){
    $file = '../images/'.$_POST['name'];

    if(file_exists($file)){
        unlink($file);
        $result = "image supprimé";
    }else{
        $result = "image non supprimé";
    }
}

echo $result;
