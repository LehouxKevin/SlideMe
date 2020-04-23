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

    print_r($listImg);
    echo $result;
}
