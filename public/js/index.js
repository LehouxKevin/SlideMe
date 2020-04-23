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
                html += "<li><img id='" + name + "' src='SlideMe/" + img + "' alt='img_" + name + "' class='img_card' onclick='selectImg(this)'></img><input type='button' value='Delete' class='btn btn-danger delete' onclick='deleteImg(this)'></li>";
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
    $(ele).parent().addClass('background_picture');
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