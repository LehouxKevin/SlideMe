$( document ).ready(function() {
    console.log( "ready!" );
    $("#fileToUpload").change(function() {
        readURL(this);
    });

    showImg();

    // name of the file appear on select
    $(".custom-file-input").on("change", function() {
        var fileName = $(this).val().split("\\").pop();
        $(this).siblings(".custom-file-label").addClass("selected").html(fileName);
    });
});

function readURL(input) {
    if (input.files && input.files[0]) {
      var reader = new FileReader();
      
      reader.onload = function(e) {
        $('#affichage_image').attr('src', e.target.result);
      }
      
      reader.readAsDataURL(input.files[0]); // convert to base64 string
    }
  }


function saveImg(ele){
    var name = $(ele).parent().find("#name").val();

    var formData = new FormData();
    formData.append('name', name);
    formData.append('fileToUpload', $(ele).parent().parent().find("#fileToUpload")[0].files[0]);

    // console.dir(name);
    // console.dir($(ele).parent().parent().find("#fileToUpload")[0].files[0]);

    $.ajax({
        type: "POST",
        url: "php/save.php",
        data : formData,
        contentType: false, // NEEDED, DON'T OMIT THIS (requires jQuery 1.6+)
        processData: false, // NEEDED, DON'T OMIT THIS
        success : function(data){
            console.log(data);
        },
        error : function(){
        }
    });
}

function showImg(){
    $.ajax({
        type: "POST",
        url: "php/imgList.php",
        success : function(data){
            imgList = JSON.parse(data);
            console.log(imgList);

            html = "<ul>";

            imgList.forEach(function(img){
                name = img.replace(/^.*[\\\/]/, '');
                html += "<li><img id='"+name+"' src='SlideMe/"+img+"' alt='img_"+name+"' class='img_card' onclick='selectImg(this)'></img><input type='button' value='Delete' class='btn btn-danger delete' onclick='deleteImg(this)'></li>";
            });

            html += "</ul>";

            $('#listImg').html('');
            $('#listImg').append(html);
            
        },
        error : function(){
        }
    });
}

function selectImg(ele){
    name = $(ele).attr('id');

    $( "li" ).removeClass( 'background_picture' );
    $(ele).parent().addClass('background_picture');
    $('#affichage_image').attr('src', 'images/'+name);
}

function deleteImg(ele){
    name = $(ele).parent().find('img').attr('id');
    
    $.ajax({
        type: "POST",
        url: "php/delete.php",
        data :
        {
            name: name
        },
        success : function(data){
            console.log(data);
            showImg();
        },
        error : function(){
        }
    });
}