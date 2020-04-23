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
    $slidePath = '../slide/'.$slideName;

    $result = 'saveslide page :';

    if (!file_exists($slidePath)) {
        mkdir($slidePath, 0777, true);
    }else{
        if(rmdir($slidePath))
            mkdir($slidePath, 0777, true);
    }

    foreach ($listImg as &$img) {
        if(copy('../images/'.$img, $slidePath."/".$img)){
            $result.= " succes";
        }else{
            $result.= " error";
        }
    }

    echo $result;

}elseif(isset($_POST["selectSlide"])){

    $imgList = [];
    $slideName = $_POST["nameSlide"];
    //Get a list of file paths using the glob function.
    $fileList = glob('../slide/'.$slideName."/*");
 
    //Loop through the array that glob returned.
    foreach($fileList as $filename){
        //Simply print them out onto the screen.
        array_push($imgList, $filename); 
    }

    ob_clean();
    //print_r($imgList);
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

