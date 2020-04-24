<?php

if(isset($_POST['saveImg'])){
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
}
else if(isset($_POST['listImg'])){
    $imgList = [];
    //Get a list of file paths using the glob function.
    $fileList = glob('../images/*');
 
    //Loop through the array that glob returned.
    foreach($fileList as $filename){
        //Simply print them out onto the screen.
        array_push($imgList, $filename); 
    }

    ob_clean();
    //print_r($data1);
    echo json_encode($imgList);
}
else if(isset($_POST['nameDelete'])){
    $file = '../images/'.$_POST['name'];

    if(file_exists($file)){
        unlink($file);
        $result = "image supprimé";
    }else{
        $result = "image non supprimé";
    }

    echo $result;
}


