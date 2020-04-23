$(document).ready(function () {
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
    $('.close').click(function () {
        $("#myModal").hide();
    });

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function (event) {
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
    $(canvas).css("background","url("+path+")");
    $(canvas).css("background-size","cover");
    $(canvas).css("background-size","100%");
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
            $('.badge-success').show();
            $('.badge-warning').hide();
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

    $("li").removeClass('background_picture');
    $("img").removeClass('background_picture');
    $(ele).parent().addClass('background_picture');
    $(ele).addClass('background_picture');
    $('#affichage_image').attr('src', 'images/' + name);
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
            $('.badge-success').hide();
            $('.badge-warning').show();
        },
        error: function () {
        }
    });
}

function addImgSlide(ele) {
    name = $(ele).parent().find('img').attr('id');

    var html = "<li class='item'>";

    html += "<img id='" + name + "' src='images/" + name + "' alt='slide_img_" + name + "' class='img_card' onclick='selectImg(this)'></img>";

    html += '</li>';

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

    var listImg = [];

    $('#ulSlide li').each(function () {
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
        success: function (data) {
            console.log(data);
        },
        error: function () {
        }
    });

}

