<?php

$result = "save page";
$true = 1;

if (isset($_FILES['fileToUpload']['name'])) {
    $info = pathinfo($_FILES['fileToUpload']['name']);
    $ext = $info['extension']; // get the extension of the file
    $name = $_POST["name"];

    if($name != ""){
        $target = '../images/'.$name.".".$ext;
    }else{
        $target = '../images/'.$_FILES['fileToUpload']['name'];
    }
    
}else{
    $true = 0;
    $result = "Erreur : Image vide";
}      
        
if ($true == 1) {           
    if(move_uploaded_file($_FILES['fileToUpload']['tmp_name'], $target)){
        $result= "Image telechargé avec succes";
    }else{
        $result= "Erreur : Echec telechargement de l'image";
    }
}

echo $result;
