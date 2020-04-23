<!DOCTYPE html>
<html>
    <head>
        <title>Ken Burns</title>

        <link rel="stylesheet" type="text/css" href="assets/css/bootstrap.css">
        <link rel="stylesheet" type="text/css" href="public/css/index.css">

        <script type="text/javascript" src="assets/js/jquery.js"></script>
        <script type="text/javascript" src="assets/js/bootstrap.bundle.js"></script>
        <script type="text/javascript" src="https://code.createjs.com/1.0.0/easeljs.min.js"></script>
        <script type="text/javascript" src="public/js/index.js"></script>
    </head>

    <body>
        <div class="row margin">
            <div class="col">
                <body onload="draw();">
                    <canvas id="affichage_image" class='imgAfficher'></canvas>
                </body>

                <div id='buttons_containers'>
                    <input class="input_balise" type="button" value="Début">
                    <input class="input_balise" type="button" value="Fin">
                </div>

                <div id="display_bar"></div>      
            </div>

            <div class="col-4 text-center">
                <div>
                    <div>
                        <label class="custom-file-label" for="profile_pic">select image</label>
                        <input type="file" id="fileToUpload" name="fileToUpload" accept=".jpg, .jpeg, .png, .bmp, .svg" class="custom-file-input">
                    </div>

                    <br>

                    <div>
                        <label for="name">Name :</label>
                        <input type="text" id="name" name="name">

                        <input type="button" value="save" class="btn btn-success" onclick="saveImg(this)">
                    </div>

                    <br>
                    
                    <div>
                        <input type="button" value="Refresh images" class="btn btn-info" onclick="showImg()">                    <span class="badge badge-success">Image saved</span>
                        <span class="badge badge-warning">Image deleted</span>
                    </div>

                    <br>

                    <div id='listImg' class="div_list_img">
                    </div>
                </div>
            </div>
        </div>
    </body>
</html>
    