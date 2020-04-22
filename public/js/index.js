$( document ).ready(function() {
    console.log( "ready!" );
    $("#fileToUpload").change(function() {
        readURL(this);
    });
});

function readURL(input) {
    if (input.files && input.files[0]) {
      var reader = new FileReader();
      
      reader.onload = function(e) {
        $('#affichage_image').attr('src', e.target.result);
      }
      
      reader.readAsDataURL(input.files[0]); // convert to base64 string
    }
  }


function sauvegarderCadeau(ele){
    var libelle = $(ele).parent().parent().find("#libelle"+ele.id).val();
    var uet = $(ele).parent().parent().find("#A"+ele.id).is(":checked");
    var atelier = $(ele).parent().parent().find("#B"+ele.id).is(":checked");
    var departement = $(ele).parent().parent().find("#C"+ele.id).is(":checked");
    //alert(libelle + " | " + Number(uet) + " | " + Number(atelier) + " | " + Number(departement));
    //console.dir($(ele).parent().parent().find("#upload"+ele.id)[0].files[0]);

    var formData = new FormData();
    formData.append('id', ele.id);
    formData.append('libelle', libelle);
    formData.append('uet', Number(uet));
    formData.append('atelier', Number(atelier));
    formData.append('departement', Number(departement));
    formData.append('fileToUpload', $(ele).parent().parent().find("#upload"+ele.id)[0].files[0]);



    $.ajax({
        type: "POST",
        url: "data/sauvegarderCadeau",
        data : formData,
        contentType: false, // NEEDED, DON'T OMIT THIS (requires jQuery 1.6+)
        processData: false, // NEEDED, DON'T OMIT THIS
        success : function(data){
            console.log(data);
            if(data == "Erreur : Image obligatoirement en PNG"){
                $('#afficherInfo').html("");
                //$('#afficherInfo').show();
                $('#afficherInfo').html("Erreur : Image obligatoirement en PNG");
                var el = $("#afficherInfo");
                newone = el.clone(true);
                el.before(newone);
                $("." + el.attr("class") + ":last").remove();
                $("#afficherInfo").addClass("Notif");
                el.remove();

            }else{
                document.location.href = "cadeaux";
            }
            
        },
        error : function(){
        }
    });
}
