function displayImage(input){
    $filename=input.value;
    $inImg= 'file:///'+$filename;

    document.getElementById("fenetre_d_affichage").innerHTML='<img src="file://'+$filename+'" width="200px" height="auto"/>';
  }


function saveImg(ele){
    var name = $(ele).parent().find("#name").val();

    var formData = new FormData();
    formData.append('name', name);
    formData.append('fileToUpload', $(ele).parent().parent().find("#fileToUpload")[0].files[0]);

    console.log(formData);
    // $.ajax({
    //     type: "POST",
    //     url: "../../php/save.php",
    //     data : formData,
    //     contentType: false, // NEEDED, DON'T OMIT THIS (requires jQuery 1.6+)
    //     processData: false, // NEEDED, DON'T OMIT THIS
    //     success : function(data){
    //         console.log(data);           
    //     },
    //     error : function(){
    //     }
    // });
}
