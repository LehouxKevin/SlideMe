
<?php
 
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