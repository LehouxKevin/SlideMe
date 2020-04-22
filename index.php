<!DOCTYPE html>
<html>
    <head>
        <title>Ken Burns</title>

        <script type="text/javascript" src="public/js/index.js"></script>
    </head>

    <body>
        <div>
            <label for="profile_pic">Sélectionnez le fichier à utiliser</label>
            <input type="file" id="profile_pic" name="profile_pic" accept=".jpg, .jpeg, .png, .bmp, .svg">
        </div>

        <br>

        <div>
            <label for="name">Name :</label>
            <input type="text" id="name" name="name">

            <input type="button" value="sauvegarder">
        </div>

        <div id="fenetre_d_affichage"></div>

    </body>
</html>
    