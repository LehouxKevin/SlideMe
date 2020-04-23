$(document).ready(function () {
    console.log("ready!");
    $("#fileToUpload").change(function () {
        readURL(this);
    });


    setMouseListeningForRectSelector();


    showImg();

    // name of the file appear on select
    $(".custom-file-input").on("change", function () {
        var fileName = $(this).val().split("\\").pop();
        $(this).siblings(".custom-file-label").addClass("selected").html(fileName);
    });

    $('.badge-success').hide();
    $('.badge-warning').hide();

    // When the user clicks on <span> (x), close the modal
    $('.close').click(function() {
        $("#myModal").hide();
    });

        // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
        if (event.target == document.getElementById("myModal")) {
            $("#myModal").hide();
        }
    }

});

function setMouseListeningForRectSelector() {
    var stage = new createjs.Stage("affichage_image");
    createjs.Ticker.on("tick", tick);

    var selection = new createjs.Shape(),
        g = selection.graphics.setStrokeStyle(1).beginStroke("#000").beginFill("rgba(0,0,0,0.05)"),
        sd = g.setStrokeDash([10, 5], 0).command,
        r = g.drawRect(0, 0, 100, 100).command,
        moveListener;


    stage.on("stagemousedown", dragStart);
    stage.on("stagemouseup", dragEnd);

    function dragStart(event) {
        stage.addChild(selection).set({ x: event.stageX, y: event.stageY });
        r.w = 0; r.h = 0;
        moveListener = stage.on("stagemousemove", drag);
    };

    function drag(event) {
        r.w = event.stageX - selection.x;
        r.h = event.stageY - selection.y;
    }

    function dragEnd(event) {
        stage.off("stagemousemove", moveListener);
    }

    function tick(event) {
        stage.update(event);
        sd.offset--;
    }
}

function draw(path) {
    var canvas = document.getElementById('affichage_image');
    var context = canvas.getContext('2d');
    var cascade = new Image();
    cascade.src = path;
    context.drawImage(cascade,0,0);



    /*var ctx = document.getElementById('affichage_image').getContext('2d');
    var img = new Image();
    img.onload = function() {
        ctx.drawImage(img, 0, 0);
        ctx.stroke();
    };
    img.src = path;*/
  }

function readURL(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function (e) {
            console.log(e.target.result);
            draw(e.target.result);
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
        data: formData,
        contentType: false, // NEEDED, DON'T OMIT THIS (requires jQuery 1.6+)
        processData: false, // NEEDED, DON'T OMIT THIS
        success: function (data) {
            console.log(data);
            showImg();
            $('.imgSaved').show();
            $('.imgDeleted').hide();
        },
        error: function () {
        }
    });
}

function showImg() {
    $.ajax({
        type: "POST",
        url: "php/imgList.php",
        success: function (data) {
            imgList = JSON.parse(data);
            console.log(imgList);

            html = "<ul>";

            imgList.forEach(function (img) {
                name = img.replace(/^.*[\\\/]/, '');
                html += "<li><input type='button' class='btn btn-primary mr-4' value='Add' onclick='addImgSlide(this)'><img id='"+name+"' src='SlideMe/"+img+"' alt='img_"+name+"' class='img_card' onclick='selectImg(this)'></img><input type='button' value='Delete' class='btn btn-danger ml-4' onclick='deleteImg(this)'></li>";
            });

            html += "</ul>";

            $('#listImg').html('');
            $('#listImg').append(html);

        },
        error: function () {
        }
    });
}

function selectImg(ele) {
    name = $(ele).attr('id');

    $( "img" ).parent().removeClass( 'background_picture' );
    $( "img" ).removeClass( 'background_picture' );
    $(ele).parent().addClass('background_picture');
    $(ele).addClass('background_picture');
    $('#affichage_image').attr('src', 'images/'+name);
}

function deleteImg(ele) {
    name = $(ele).parent().find('img').attr('id');

    $.ajax({
        type: "POST",
        url: "php/delete.php",
        data:
        {
            name: name
        },
        success: function (data) {
            console.log(data);
            showImg();
            $('.imgSaved').hide();
            $('.imgDeleted').show();
        },
        error: function () {
        }
    });
}

function addImgSlide(ele, nm){
    
    if(nm != undefined){
        name = nm;
    }else{
        name = $(ele).parent().find('img').attr('id');
    }
    
    var html = "<li class='item'>";

    html += '<div class="parent">';
    html += "<img id='"+name+"' src='images/"+name+"' alt='slide_img_"+name+"' class='img_card' onclick='selectImg(this)'></img>";

    html += '<span class="deleteSlideImg" onclick="deleteImgSlide(this)"></span></div></li>';

    $('#ulSlide').append(html);
}


function showSlide(){
    $.ajax({
        type: "POST",
        url: "php/slide.php",
        data: {
            listSlide: 'yes'
        },
        success : function(data){
            slideList = JSON.parse(data);
            console.log(slideList);

            html = "<ul class='p-2'>";

            slideList.forEach(function(slide){
                html += "<li id="+slide+" class='d-flex justify-content-between'>"+slide+"<input type='button' class='btn btn-primary mr-4' value='Select' onclick='selectSlide(this)'></li>";
            });

            html += "</ul>";

            $('#listSlide').html('');
            $('#listSlide').append(html);

            $("#myModal").show();
            
        },
        error : function(){
        }
    });
}

function saveSlide(ele){

    slideName = $('#nameSlide').val();

    var listImg = [];
 
    $('#ulSlide li').each(function() {
        listImg.push($(this).find('img').attr('id'));
    });

    $.ajax({
        type: "POST",
        url: "php/slide.php",
        data: {
            saveSlide: 'yes',
            slideName: slideName,
            listImg: listImg
        },
        success : function(data){
            console.log(data);
            $('.slideSaved').show();
            $('.slideDeleted').hide();
            $('#nameSlide').val('');
            $('#ulSlide').attr('slidename', slideName);
            $('#spanSlideName').html(''+slideName);
        },
        error : function(){
        }
    });

}

function deleteImgSlide(ele){
    $(ele).parent().parent().remove();
}

function selectSlide(ele){
    var nameSlide = $(ele).parent().attr('id');
    
    $.ajax({
        type: "POST",
        url: "php/slide.php",
        data: {
            selectSlide: 'yes',
            nameSlide: nameSlide
        },
        success: function (data) {
            imgList = JSON.parse(data);
            console.dir(imgList);

            $('#ulSlide').html('');
            $("#myModal").hide();
            imgList.forEach(function(img){
                var name = img.replace(/^.*[\\\/]/, '');
                addImgSlide("", name);
            });
            
            $('#ulSlide').attr('slidename', nameSlide);
            $('.slideSaved').hide();
            $('.slideDeleted').hide();
            $('#nameSlide').val('');
            $('#spanSlideName').html(''+nameSlide);
        },
        error: function () {
        }
    });
}

function deleteSlide(){
    var nameSlide = $('#ulSlide').attr('slidename');

    $.ajax({
        type: "POST",
        url: "php/slide.php",
        data: {
            deleteSlide: 'yes',
            nameSlide: nameSlide
        },
        success: function (data) {
            console.dir(data);

            $('#ulSlide').html('');            
            $('#ulSlide').attr('slidename', '');
            $('.slideSaved').hide();
            $('.slideDeleted').show();
            $('#nameSlide').val('');
            $('#spanSlideName').html('');
        },
        error: function () {
        }
    });
}