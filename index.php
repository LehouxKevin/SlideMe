<!DOCTYPE html>
<html>
    <head>
        <title>Ken Burns</title>

        <link rel="stylesheet" type="text/css" href="assets/css/bootstrap.css">
        <link rel="stylesheet" type="text/css" href="public/css/index.css">

        <script type="text/javascript" src="assets/js/jquery.js"></script>
        <script type="text/javascript" src="assets/js/bootstrap.bundle.js"></script>
        <script type="text/javascript" src="public/js/index.js"></script>
    </head>

    <body>
        <div>
        <div>
            <label for="profile_pic">select image</label>
            <input type="file" id="fileToUpload" name="fileToUpload" accept=".jpg, .jpeg, .png, .bmp, .svg">
        </div>

        <br>

        <div>
            <label for="name">Name :</label>
            <input type="text" id="name" name="name">

            <input type="button" value="save" onclick="saveImg(this)">
        </div>
        </div>

        <div id="fenetre_d_affichage"><img id="affichage_image" src="#" alt="Votre image" /></div>

        <input class="input_balise" type="button" value="Début">
        
        <div id="display_bar"></div>
    </body>
</html>
    