<?php

if (isset($_FILES['fileToUpload']['name'])) {
    $info = pathinfo($_FILES['fileToUpload']['name']);
    $ext = $info['extension']; // get the extension of the file
    if($ext != "jpg"){
        $true = 0;
        $result = "Erreur : Image obligatoirement en PNG";
    }elseif($ext != "png"){
        $true = 0;
        $result = "Erreur : Image obligatoirement en PNG";
    }else{
        $target = '../Images/Cadeaux/'.$id.".".$ext;
    }
}else{
    $true = 0;
    $result = "Erreur : Image vide";
}
        
        
if ($true == 1) {           
    if(move_uploaded_file($_FILES['fileToUpload']['tmp_name'], $target)){
        $result= "Image telechargé avec succes";
        $dbcontroller = new DBController();
        $stmt1 = mysqli_prepare($dbcontroller->getConn(), "UPDATE cadeaux SET libelle = ?, a = ?, b = ?, c = ? WHERE id = ?");
        mysqli_stmt_bind_param($stmt1, 'ssssi', $libelle, $A, $B, $C, $id);
        $data1 = $dbcontroller->executeQueryMSQL($stmt1);
        $dbcontroller->closeQuerySQL(); 
        if ($data1) {
            $result .= " Opération effectuée avec succès";
        }
        else {
            $result .= " Opération non effectuée";
        }
    }else{
        $result= "Erreur : Echec telechargement de l'image";
    }
}