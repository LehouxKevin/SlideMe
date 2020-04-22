<?php

if (isset($_FILES['fileToUpload']['name']) && isset($_POST["nom"])) {
    $info = pathinfo($_FILES['fileToUpload']['name']);
    $ext = $info['extension']; // get the extension of the file
    $nom = $_POST["nom"];

    $target = '../images/'.$nom.".".$ext;
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