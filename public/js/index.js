var tabRect = [];
var activButton = "start";
var stage;

$(document).ready(function () {
    $("#fileToUpload").change(function () {
        readURL(this);
    });


    //setMouseListeningForRectSelector();
    $("#start_button").click(function() {
        activButton = "start";
    });

    $("#end_button").click(function() {
        activButton = "end";
    });



    showImg();

    // name of the file appear on select
    $(".custom-file-input").on("change", function () {
        var fileName = $(this).val().split("\\").pop();
        $(this).siblings(".custom-file-label").addClass("selected").html(fileName);
    });

    $('.badge-success').hide();
    $('.badge-warning').hide();

    // When the user clicks on <span> (x), close the modal
    $('.close').click(function () {
        $("#myModal").hide();
    });

        // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
        if (event.target == document.getElementById("myModal")) {
            $("#myModal").hide();
        }
    }


    $(function() {
        $('#nameSlide').on('keypress', function(e) {
            if (e.which == 32)
                return false;
        });
    });


    $( function() {
        $( "#ulSlide" ).sortable();
        $( "#ulSlide" ).disableSelection();
    } );

});

function setMouseListeningForRectSelector() {
    //var stage = new createjs.Stage("affichage_image");
    createjs.Ticker.on("tick", tick);

    var selection = new createjs.Shape(),
        g = selection.graphics.setStrokeStyle(1).beginStroke("#000").beginFill("rgba(0,0,0,0.05)"),
        sd = g.setStrokeDash([10, 5], 0).command,
        r = g.drawRect(0, 0, 100, 100).command,
        moveListener;

    var point1 = new paper.Point();
    var point2 = new paper.Point();
    var point3 = new paper.Point();
    var point4 = new paper.Point();

    stage.on("stagemousedown", dragStart);
    stage.on("stagemouseup", dragEnd);

    function dragStart(event) {
        stage.addChild(selection).set({ x: event.stageX, y: event.stageY });
        r.w = 0; r.h = 0;
        moveListener = stage.on("stagemousemove", drag);
        point1.x = event.stageX;
        point1.y = event.stageY;

        point2.y = event.stageY;
        point4.x = event.stageX;

    };

    function drag(event) {
        r.w = event.stageX - selection.x;
        r.h = event.stageY - selection.y;
    }

    function dragEnd(event) {
        var indice = 0;
        if(activButton == "end")
        {
            indice = 1;
        }

        stage.off("stagemousemove", moveListener);
        point3.x = event.stageX;;
        point3.y = event.stageY;

        point2.x = event.stageX;
        point4.y = event.stageY;

        console.log("Point 1 : "+point1);
        console.log("Point 2 : "+point2);
        console.log("Point 3 : "+point3);
        console.log("Point 4 : "+point4);

        var rectWidth = point2.x - point1.x;
        var rectHeight = point4.y - point2.y;

        if(tabRect[indice])
        {
            stage.removeChild(tabRect[indice]);
        }

        var rect = new createjs.Rectangle();
        var rect = new createjs.Shape();
        rect.graphics.beginFill('rgba(0, 0, 0, 0.5)');
        rect.graphics.drawRect(point1.x, point1.y, rectWidth, rectHeight);
        rect.graphics.endFill();

        stage.addChild(rect);
        stage.update();

        tabRect[indice] = rect;
        
    }

    function tick(event) {
        stage.update(event);
        sd.offset--;
    }
}

function draw(path) {
    if(stage)
    {
        resetStage();
    }
    var canvas = document.getElementById('affichage_image');
    $(canvas).css("background","url("+path+")");
    $(canvas).css("background-size","cover");
    $(canvas).css("background-size","100%");
    $(canvas).css("background-repeat","no-repeat");
    $(canvas).css("background-position","center center");
    stage = new createjs.Stage("affichage_image");
    activButton = "start";
    setMouseListeningForRectSelector();
}

function resetStage() 
{
    stage.removeAllEventListeners();
    stage.removeAllChildren();
    stage.canvas = null;
    stage = null;
}

function readURL(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function (e) {
            draw(e.target.result);
        }

        reader.readAsDataURL(input.files[0]); // convert to base64 string
    }
}


function saveImg(ele) {
    var name = $(ele).parent().find("#name").val();

    var formData = new FormData();
    formData.append('name', name);
    formData.append('saveImg', "yes");
    formData.append('fileToUpload', $(ele).parent().parent().find("#fileToUpload")[0].files[0]);

    // console.dir(name);
    // console.dir($(ele).parent().parent().find("#fileToUpload")[0].files[0]);

    $.ajax({
        type: "POST",
        url: "php/img.php",
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
        url: "php/img.php",
        data: {
            listImg: "yes"
        },
        success: function (data) {
            imgList = JSON.parse(data);
            console.log(imgList);

            html = "<ul>";

            imgList.forEach(function (img) {
                name = img.replace(/^.*[\\\/]/, '');
                html += "<li><input type='button' class='btn btn-primary mr-4' value='Add' onclick='addImgSlide(this)'><img id='" + name + "' src='SlideMe/" + img + "' alt='img_" + name + "' class='img_card' onclick='selectImg(this)'></img><input type='button' value='Delete' class='btn btn-danger ml-4' onclick='deleteImg(this)'></li>";
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

    draw('images/' + name);
}


function deleteImg(ele) {
    name = $(ele).parent().find('img').attr('id');

    $.ajax({
        type: "POST",
        url: "php/img.php",
        data:
        {
            nameDelete: "yes",
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

    var html = "<li class='item ui-state-default'>";

    html += '<div class="parent">';
    html += "<img id='"+name+"' src='images/"+name+"' alt='slide_img_"+name+"' class='img_card unset' onclick='selectImg(this)'></img>";

    html += '<span class="deleteSlideImg" onclick="deleteImgSlide(this)"></span></div></li>';

    $('#ulSlide').append(html);
}

function showSlide() {
    $.ajax({
        type: "POST",
        url: "php/slide.php",
        data: {
            listSlide: 'yes'
        },
        success: function (data) {
            slideList = JSON.parse(data);
            console.log(slideList);

            html = "<ul class='p-2'>";

            slideList.forEach(function (slide) {
                html += "<li id=" + slide + " class='d-flex justify-content-between'>" + slide + "<input type='button' class='btn btn-primary mr-4' value='Select' onclick='selectSlide(this)'></li>";
            });

            html += "</ul>";

            $('#listSlide').html('');
            $('#listSlide').append(html);

            $("#myModal").show();

        },
        error: function () {
        }
    });
}

function saveSlide(ele) {

    slideName = $('#nameSlide').val();
    slideNewName = "";

    //if input name slide is empty
    if(slideName == ""){
        //if no slide is selected
        if($('#ulSlide').attr('slidename') == ""){
            //we select defautlt slide name 
            slideName = 'slideNoName';
        }else{
            //if existing slide is selected 
            slideName = $('#ulSlide').attr('slidename');
        }
    }else if($('#ulSlide').attr('slidename') == "")
    {
        slideName = $('#nameSlide').val();
        slideNewName = "";
    }else if(slideName != $('#ulSlide').attr('slidename'))
    {
        slideName = $('#ulSlide').attr('slidename');
        slideNewName = $('#nameSlide').val();
    }

    alert(slideName);
    alert(slideNewName);

    var listImg = [];

    $('#ulSlide li').each(function () {
        listImg.push($(this).find('img').attr('id'));
    });

    console.dir(listImg);
    $.ajax({
        type: "POST",
        url: "php/slide.php",
        data: {
            saveSlide: 'yes',
            slideName: slideName,
            listImg: listImg,
            slideNewName: slideNewName
        },
        success: function (data) {
            console.log(data);
            $('.slideSaved').show();
            $('.slideDeleted').hide();
            $('#nameSlide').val('');
            var name = data.replace(/^.*[\\\/]/, '');
            $('#ulSlide').attr('slidename', name);
            $('#spanSlideName').html(''+name);
        },
        error: function () {
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
                addImgSlide("", name.substring(2));
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

function reset(){
    $('#ulSlide').html('');            
    $('#ulSlide').attr('slidename', '');
    $('.slideSaved').hide();
    $('.slideDeleted').hide();
    $('#nameSlide').val('');
    $('#spanSlideName').html('');
}

function playSlide(){

}