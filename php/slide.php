<?php

if(isset($_POST["listSlide"])){
 
    $slideList = [];

    $dir = new DirectoryIterator('../slide/');
    foreach ($dir as $fileinfo) {
        if ($fileinfo->isDir() && !$fileinfo->isDot()) {
            array_push($slideList, $fileinfo->getFilename());
        }
    }
    ob_clean();
    //print_r($data1);
    echo json_encode($slideList);

}elseif(isset($_POST["saveSlide"])){

    $listImg = $_POST['listImg'];
    $slideName = $_POST['slideName'];
    $slideNewName = $_POST['slideNewName'];

    $slidePath = '../slide/'.$slideName;

    $result = $slideName;
    $exist = 0;
    //check if folder exist
    if (!file_exists($slidePath)) {
        //create new folder if dont exist 
        mkdir($slidePath, 0777, true);

    }else{
        //if name folder is slideNoName (genereted auto when user forget to add slide name)
        if(($slidePath == "../slide/slideNoName")){     
            
            $exist = 1;
            //if user want to rename folder named slideNoName
            if(isset($slideNewName) && $slideNewName != ""){
                //delete img in folder
                array_map('unlink', glob($slidePath."/*.*"));
                //delete folder
                if(rmdir($slidePath)){
                    $slidePath = '../slide/'.$slideNewName;
                    // create new folder with new name
                    mkdir($slidePath, 0777, true);
                }
            }else{
                //if user forget to name slide folder and slideNoName already exist
                $slidePath = "../slide/slideNoName".rand();
                mkdir($slidePath, 0777, true);
            }

        }//if folder name is not slideNoName
        else{
            // if user want to rename folder 
            if(isset($slideNewName) && $slideNewName != ""){
                array_map('unlink', glob($slidePath."/*.*"));
                if(rmdir($slidePath)){
                    $slidePath = '../slide/'.$slideNewName;
                    mkdir($slidePath, 0777, true);
                }
            }else{
                array_map('unlink', glob($slidePath."/*.*"));
                if(rmdir($slidePath)){
                    mkdir($slidePath, 0777, true);
                } 
            }
        }
    }

    //add img in folder from list given 
    $i = 0;
    foreach ($listImg as &$img) {
        if($i<10){
            $order = "0".$i;
        }else{
            $order = $i;
        }

        if(copy('../images/'.$img, $slidePath."/".$order."".$img)){
            $result = $slidePath;
        }
        $i++;
    }

   echo $result;

}elseif(isset($_POST["selectSlide"])){

    $imgList = [];
    $slideName = $_POST["nameSlide"];
    //Get a list of file paths using the glob function.
    $fileList = glob('../slide/'.$slideName."/*");
 
    //Loop through the array that glob returned.
    foreach($fileList as $filename){
        array_push($imgList, $filename); 
    }

    ob_clean();
    echo json_encode($imgList);

}elseif(isset($_POST["deleteSlide"])){

    $result = "non supprimé";
    $slideName = $_POST["nameSlide"];
    $slidePath = '../slide/'.$slideName;

    if (file_exists($slidePath)) {
        array_map('unlink', glob($slidePath."/*.*"));
        rmdir($slidePath);
        $result = "supprimer";
    }

    ob_clean();

    echo $result;
}

