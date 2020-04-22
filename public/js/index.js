var isOnDiv = true;

$(document).ready(function () {
    console.log("ready!");
    $("#fileToUpload").change(function () {
        readURL(this);
    });

    
    $("#fenetre_d_affichage").mouseenter(function () { isOnDiv = true;});
    $("#fenetre_d_affichage").mouseleave(function () { isOnDiv = false;});

    setMouseListeningForRectSelector();
    showImg();

    // name of the file appear on select
    $(".custom-file-input").on("change", function() {
        var fileName = $(this).val().split("\\").pop();
        $(this).siblings(".custom-file-label").addClass("selected").html(fileName);
    });

    $('.badge-success').hide();
    $('.badge-warning').hide();
});

function setMouseListeningForRectSelector() {
    console.log(isOnDiv);
    if (isOnDiv == true) {
        var div = document.getElementById('divRectangleSelection1'), x1 = 0, y1 = 0, x2 = 0, y2 = 0;
        function reCalc() { //This will restyle the div
            var x3 = Math.min(x1, x2); //Smaller X
            var x4 = Math.max(x1, x2); //Larger X
            var y3 = Math.min(y1, y2); //Smaller Y
            var y4 = Math.max(y1, y2); //Larger Y
            div.style.left = x3 + 'px';
            div.style.top = y3 + 'px';
            div.style.width = x4 - x3 + 'px';
            div.style.height = y4 - y3 + 'px';
        }
        onmousedown = function (e) {
            div.hidden = 0; //Unhide the div
            x1 = e.clientX; //Set the initial X
            y1 = e.clientY; //Set the initial Y
            reCalc();
        };
        onmousemove = function (e) {
            x2 = e.clientX; //Update the current position X
            y2 = e.clientY; //Update the current position Y
            reCalc();
        };
        onmouseup = function (e) {
            div.hidden = 1; //Hide the div
        };
    }
}

function readURL(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function (e) {
            $('#affichage_image').attr('src', e.target.result);
            $('#affichage_image').attr('width', '700px');
            $('#affichage_image').attr('height', 'auto');
        }

        reader.readAsDataURL(input.files[0]); // convert to base64 string
    }
}


function saveImg(ele) {
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
        success: function (data) {
            console.log(data);
            showImg();
            $('.badge-success').show();
            $('.badge-warning').hide();
        },
        error: function () {
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
            $('.badge-success').hide();
            $('.badge-warning').show();
        },
        error : function(){
        }
    });
}