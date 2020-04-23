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
            <div class="col text-center">
                <div class="border-bottom border-info p-2" >
                    <body onload="draw();">
                        <canvas id="affichage_image" class='imgAfficher'></canvas>
                    </body>

                    <div id='buttons_containers'>
                        <input class="input_balise" type="button" value="Début">
                        <input class="input_balise" type="button" value="Fin">
                    </div>
                </div>

                <h2><span class="badge badge-secondary" id="spanSlideName"></span></h2>
                <span class="badge badge-success slideSaved">Slide saved</span>
                <span class="badge badge-warning slideDeleted">Slide deleted</span>
                <div id='slide' class="div_slide">
                    <ul id='ulSlide' slidename=''>

                    </ul>
                    <div class="float-right flex-container mt-1">
                        <div class="flex-col pb-2">
                            <input type="button" value="Play" class="btn btn-info" onclick="playSlide()">
                        </div>

                        <div class="flex-col p-2">
                            <input type="button" value="Select slide" class="btn btn-light" onclick="showSlide()">
                        </div>

                        <div class="flex-col p-2">
                            <input type="text" id="nameSlide" name="name" placeholder="Slide name ..">
                        </div>

                        <div class="flex-col p-2">
                            <input type="button" value="Save" class="btn btn-success" onclick="saveSlide(this)">
                            <input type="button" value="Delete" class="btn btn-danger" onclick="deleteSlide(this)">
                        </div>
                    </div>   
                </div>  
            </div>

            <div class="col-4 border-left border-info m-2 p-2">
                <div>
                    <div class="custom-file mb-3">
                        <label class="custom-file-label" for="profile_pic">select image</label>
                        <input type="file" id="fileToUpload" name="fileToUpload" accept=".jpg, .jpeg, .png, .bmp, .svg" class="custom-file-input">
                    </div>

                    <div class="d-flex justify-content-around mb-3">
                        <input type="text" id="name" name="name" placeholder="Name ..">

                        <input type="button" value="Save" class="btn btn-success" onclick="saveImg(this)">
                    </div>
                    
                    <div class="text-center mb-3">
                        <input type="button" value="Refresh images" class="btn btn-info" onclick="showImg()">                    <span class="badge badge-success imgSaved">Image saved</span>
                        <span class="badge badge-warning imgDeleted">Image deleted</span>
                    </div>

                    <div id='listImg' class="div_list_img text-center">
                    </div>
                </div>
            </div>

            <!-- The Modal -->
            <div id="myModal" class="modal">

            <!-- Modal content -->
            <div class="modal-content">
                <div class="modal-header">
                    <span class="close">&times;</span>
                </div>
                <div class="modal-body">
                    <div id='listSlide' class="div_list_slide text-center">
                    </div>
                </div>
                <div class="modal-footer">
                </div>
            </div>

            </div>
        </div>
    </body>
</html>
    