<!DOCTYPE html>
<html>
    <head>
        <title>Ken Burns</title>

        <script type="text/javascript" src="assets/js/jquery.js"></script>
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

            <input type="button" value="save" onclick="saveImg(ele)">
        </div>
        </div>

        <div id="fenetre_d_affichage"><img id="affichage_image" src="#" alt="Votre image" /></div>
        

    </body>
</html>
    