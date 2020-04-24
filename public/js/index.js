var tabRect = [];
var activButton = "start";
var stage;
var stockageSlide = [];

var rectPointStart = new paper.Point();
var rectDimensionStart;

var rectPointEnd = new paper.Point();
var rectDimensionEnd;

$(document).ready(function () {
    $("#fileToUpload").change(function () {
        readURL(this);
    });


    //setMouseListeningForRectSelector();
    $("#start_button").click(function () {
        activButton = "start";
    });

    $("#end_button").click(function () {
        activButton = "end";
    });

    $("#save_animation").click(function () {
        if ($("#animation_duration_input").val().length > 0) {
            saveAnimation();
        }
        else {
            alert("Veuillez entrez une durée d'animation (en ms)");
        }
    });


    setInputFilter(document.getElementById("animation_duration_input"), function (value) {
        return /^\d*\.?\d*$/.test(value); // Allow digits and '.' only, using a RegExp
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
    window.onclick = function (event) {
        if (event.target == document.getElementById("myModal")) {
            $("#myModal").hide();
        }
    }


    $(function () {
        $('#nameSlide').on('keypress', function (e) {
            if (e.which == 32)
                return false;
        });
    });


    $(function () {
        $("#ulSlide").sortable();
        $("#ulSlide").disableSelection();
    });

});

function saveAnimation() {
    //tabImage = getListImage();

    var src = $(".background_picture").find('img').attr('src');
    console.log(src);

    //console.log(tabImage);

    //stockageSlide.push($('#spanSlideName').html());

    var stockageImage = [];
    stockageImage[0] = src;
    stockageImage[1] = rectPointStart.x;
    stockageImage[2] = rectPointStart.y;
    var dimension = rectDimensionStart.split("*");
    stockageImage[3] = dimension[0];
    stockageImage[4] = dimension[1];
    stockageImage[5] = rectPointEnd.x;
    stockageImage[6] = rectPointEnd.y;
    var dimension = rectDimensionEnd.split("*");
    stockageImage[7] = dimension[0];
    stockageImage[8] = dimension[1];
    stockageImage[9] = $("#animation_duration_input").val();
    stockageSlide.push(stockageImage);


    // var stockageImage = [];
    // stockageImage["path"] = src;
    // stockageImage["rectStartX"] = rectPointStart.x;
    // stockageImage["rectStartY"] = rectPointStart.y;
    // var dimension = rectDimensionStart.split("*");
    // stockageImage["rectStartWidth"] = dimension[0];
    // stockageImage["rectStartHeight"] = dimension[1];
    // stockageImage["rectEndX"] = rectPointEnd.x;
    // stockageImage["rectEndY"] = rectPointEnd.y;
    // var dimension = rectDimensionEnd.split("*");
    // stockageImage["rectEndWidth"] = dimension[0];
    // stockageImage["rectEndHeight"] = dimension[1];
    // stockageImage["animationDuration"] = $("#animation_duration_input").val();
    // stockageSlide.push(stockageImage);
    
    console.log(stockageSlide);   
    
}

function setInputFilter(textbox, inputFilter) {
    ["input", "keydown", "keyup", "mousedown", "mouseup", "select", "contextmenu", "drop"].forEach(function (event) {
        textbox.addEventListener(event, function () {
            if (inputFilter(this.value)) {
                this.oldValue = this.value;
                this.oldSelectionStart = this.selectionStart;
                this.oldSelectionEnd = this.selectionEnd;
            } else if (this.hasOwnProperty("oldValue")) {
                this.value = this.oldValue;
                this.setSelectionRange(this.oldSelectionStart, this.oldSelectionEnd);
            } else {
                this.value = "";
            }
        });
    });
}

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
        if (activButton == "end") {
            indice = 1;
        }

        stage.off("stagemousemove", moveListener);
        point3.x = event.stageX;;
        point3.y = event.stageY;

        point2.x = event.stageX;
        point4.y = event.stageY;

        console.log("Point 1 : " + point1);
        console.log("Point 2 : " + point2);
        console.log("Point 3 : " + point3);
        console.log("Point 4 : " + point4);

        var rectWidth = point2.x - point1.x;
        var rectHeight = point4.y - point2.y;

        if (tabRect[indice]) {
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
        if (indice == 0) {
            rectPointStart = point1;
            rectDimensionStart = rectWidth + "*" + rectHeight;
        }
        else {
            rectPointEnd = point1;
            rectDimensionEnd = rectWidth + "*" + rectHeight;
        }

    }

    function tick(event) {
        stage.update(event);
        sd.offset--;
    }
}

function draw(path) {
    if (stage) {
        resetStage();
    }
    var canvas = document.getElementById('affichage_image');
    $(canvas).css("background", "url(" + path + ")");
    $(canvas).css("background-size", "cover");
    $(canvas).css("background-size", "100%");
    $(canvas).css("background-repeat", "no-repeat");
    $(canvas).css("background-position", "center center");
    stage = new createjs.Stage("affichage_image");
    activButton = "start";
    setMouseListeningForRectSelector();
}

function resetStage() {
    stage.removeAllEventListeners();
    stage.removeAllChildren();
    stage.canvas = null;
    stage = null;
}

function kenburns_effect() {
    var $canvas = document.getElementById('affichage_image');
    var ctx = $canvas.getContext('2d');
    var start_time = null;
    var width = $canvas.width();
    var height = $canvas.height();

    var image_paths = options.images;
    var display_time = options.display_time || 7000;
    var fade_time = Math.min(display_time / 2, options.fade_time || 1000);
    var solid_time = display_time - (fade_time * 2);
    var fade_ratio = fade_time - display_time
    var frames_per_second = options.frames_per_second || 30;
    var frame_time = (1 / frames_per_second) * 1000;
    var zoom_level = 1 / (options.zoom || 2);
    var clear_color = options.background_color || '#000000';

    var images = [];
    $(image_paths).each(function (i, image_path) {
        images.push({
            path: image_path,
            initialized: false,
            loaded: false
        });
    });
    function get_time() {
        var d = new Date();
        return d.getTime() - start_time;
    }

    function interpolate_point(x1, y1, x2, y2, i) {
        // Finds a point between two other points
        return {
            x: x1 + (x2 - x1) * i,
            y: y1 + (y2 - y1) * i
        }
    }

    function interpolate_rect(r1, r2, i) {
        // Blend one rect in to another
        var p1 = interpolate_point(r1[0], r1[1], r2[0], r2[1], i);
        var p2 = interpolate_point(r1[2], r1[3], r2[2], r2[3], i);
        return [p1.x, p1.y, p2.x, p2.y];
    }

    function scale_rect(r, scale) {
        // Scale a rect around its center
        var w = r[2] - r[0];
        var h = r[3] - r[1];
        var cx = (r[2] + r[0]) / 2;
        var cy = (r[3] + r[1]) / 2;
        var scalew = w * scale;
        var scaleh = h * scale;
        return [cx - scalew / 2,
        cy - scaleh / 2,
        cx + scalew / 2,
        cy + scaleh / 2];
    }

    function fit(src_w, src_h, dst_w, dst_h) {
        // Finds the best-fit rect so that the destination can be covered
        var src_a = src_w / src_h;
        var dst_a = dst_w / dst_h;
        var w = src_h * dst_a;
        var h = src_h;
        if (w > src_w) {
            var w = src_w;
            var h = src_w / dst_a;
        }
        var x = (src_w - w) / 2;
        var y = (src_h - h) / 2;
        return [x, y, x + w, y + h];
    }

    function get_image_info(image_index, load_callback) {
        // Gets information structure for a given index
        // Also loads the image asynchronously, if required		
        var image_info = images[image_index];
        if (!image_info.initialized) {
            var image = new Image();
            image_info.image = image;
            image_info.loaded = false;
            image.onload = function () {
                image_info.loaded = true;
                var iw = image.width;
                var ih = image.height;

                var r1 = fit(iw, ih, width, height);;
                var r2 = scale_rect(r1, zoom_level);

                var align_x = Math.floor(Math.random() * 3) - 1;
                var align_y = Math.floor(Math.random() * 3) - 1;
                align_x /= 2;
                align_y /= 2;

                var x = r2[0];
                r2[0] += x * align_x;
                r2[2] += x * align_x;

                var y = r2[1];
                r2[1] += y * align_y;
                r2[3] += y * align_y;

                if (image_index % 2) {
                    image_info.r1 = r1;
                    image_info.r2 = r2;
                }
                else {
                    image_info.r1 = r2;
                    image_info.r2 = r1;
                }

                if (load_callback) {
                    load_callback();
                }

            }
            image_info.initialized = true;
            image.src = image_info.path;
        }
        return image_info;
    }

    function render_image(image_index, anim, fade) {
        // Renders a frame of the effect	
        if (anim > 1) {
            return;
        }
        var image_info = get_image_info(image_index);
        if (image_info.loaded) {
            var r = interpolate_rect(image_info.r1, image_info.r2, anim);
            var transparency = Math.min(1, fade);

            if (transparency > 0) {
                ctx.save();
                ctx.globalAlpha = Math.min(1, transparency);
                ctx.drawImage(image_info.image, r[0], r[1], r[2] - r[0], r[3] - r[1], 0, 0, width, height);
                ctx.restore();
            }
        }
    }

    function clear() {
        // Clear the canvas
        ctx.save();
        ctx.globalAlpha = 1;
        ctx.fillStyle = clear_color;
        ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        ctx.restore();
    }

    function update() {
        // Render the next frame										
        var update_time = get_time();

        var top_frame = Math.floor(update_time / (display_time - fade_time));
        var frame_start_time = top_frame * (display_time - fade_time);
        var time_passed = update_time - frame_start_time;

        function wrap_index(i) {
            return (i + images.length) % images.length;
        }

        if (time_passed < fade_time) {
            var bottom_frame = top_frame - 1;
            var bottom_frame_start_time = frame_start_time - display_time + fade_time;
            var bottom_time_passed = update_time - bottom_frame_start_time;
            if (update_time < fade_time) {
                clear();
            } else {
                render_image(wrap_index(bottom_frame), bottom_time_passed / display_time, 1);
            }
        }

        render_image(wrap_index(top_frame), time_passed / display_time, time_passed / fade_time);

        if (options.post_render_callback) {
            options.post_render_callback($canvas, ctx);
        }

        // Pre-load the next image in the sequence, so it has loaded
        // by the time we get to it
        var preload_image = wrap_index(top_frame + 1);
        get_image_info(preload_image);
    }

    // Pre-load the first two images then start a timer	
    get_image_info(0, function () {
        get_image_info(1, function () {
            start_time = get_time();
            setInterval(update, frame_time);
        })
    });


}

function getListImage() {
    var nameSlide = $('#spanSlideName').html();
    var imgList;
    $.ajax({
        type: "POST",
        url: "php/slide.php",
        async: false,
        data: {
            selectSlide: 'yes',
            nameSlide: nameSlide
        },
        success: function (data) {
            imgList = JSON.parse(data);
        },
        error: function () {
        }
    });
    return imgList;
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

    $("img").parent().removeClass('background_picture');
    $("img").removeClass('background_picture');
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
    } else {
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

    jsonData = JSON.stringify(stockageSlide);

    $.ajax({
        type: "POST",
        url: "php/slide.php",
        data: {
            saveSlide: 'yes',
            slideName: slideName,
            listImg: listImg,
            slideNewName: slideNewName,
            jsonData: jsonData
        },
        success: function (data) {
            console.log(data);
            $('.slideSaved').show();
            $('.slideDeleted').hide();
            $('#nameSlide').val('');
            var name = data.replace(/^.*[\\\/]/, '');
            $('#ulSlide').attr('slidename', name);
            $('#spanSlideName').html('' + name);
        },
        error: function (data) {
            console.log(data);
        }
    });

}

function deleteImgSlide(ele) {
    $(ele).parent().parent().remove();
}

function selectSlide(ele) {
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
            imgList.forEach(function (img) {
                var name = img.replace(/^.*[\\\/]/, '');
                addImgSlide("", name.substring(2));
            });

            $('#ulSlide').attr('slidename', nameSlide);
            $('.slideSaved').hide();
            $('.slideDeleted').hide();
            $('#nameSlide').val('');
            $('#spanSlideName').html('' + nameSlide);
        },
        error: function () {
        }
    });
}

function deleteSlide() {
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

function reset() {
    $('#ulSlide').html('');
    $('#ulSlide').attr('slidename', '');
    $('.slideSaved').hide();
    $('.slideDeleted').hide();
    $('#nameSlide').val('');
    $('#spanSlideName').html('');
}

function playSlide(){

}