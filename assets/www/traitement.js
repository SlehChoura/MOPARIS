var adresseServeur = "www.mo-paris.fr";
var ajout_adr = false;
var Oajout_adr = false;
var ajout_car = false;
var Oajout_car = false;

var key = "6rybr6yvtr16yt7y6rehdtrhvtdr6h76762tdr7hvtr14tr53h040013568hvd841h1hd06";
function rc4(key, str) {
    var s = [], j = 0, x, res = '';
    for (var i = 0; i < 256; i++) {
        s[i] = i;
    }
    for (i = 0; i < 256; i++) {
        j = (j + s[i] + key.charCodeAt(i % key.length)) % 256;
        x = s[i];
        s[i] = s[j];
        s[j] = x;
    }
    i = 0;
    j = 0;
    for (var y = 0; y < str.length; y++) {
        i = (i + 1) % 256;
        j = (j + s[i]) % 256;
        x = s[i];
        s[i] = s[j];
        s[j] = x;
        res += String.fromCharCode(str.charCodeAt(y) ^ s[(s[i] + s[j]) % 256]);
    }
    return res;
}
$.mobile.page.prototype.options.addBackBtn = "True";
$.mobile.page.prototype.options.backBtnText = "Retour";

$.ajaxSetup({
    beforeSend: function () {
        $.mobile.showPageLoadingMsg();

    },
    complete: function () {
        $.mobile.hidePageLoadingMsg();

    },
    error: function () {
        alert("Verifier la connexion internet");
    }
});

var origineMassage = true;
var aide = false;
var note = 0;
var dateDeReservation;
var minDispo;
var maxDispo;
var year = new Date().getFullYear();
var month = new Date().getMonth();
var day = new Date().getDate();

var eventData = {
    events: [
      { 'id': 1, 'start': new Date(year, month, day, 12), 'end': new Date(year, month, day, 13, 35), 'title': 'Lunch with Mike' },
      { 'id': 2, 'start': new Date(year, month, day, 14), 'end': new Date(year, month, day, 14, 45), 'title': 'Dev Meeting' },
      { 'id': 3, 'start': new Date(year, month, day + 1, 18), 'end': new Date(year, month, day + 1, 18, 45), 'title': 'Hair cut' },
      { 'id': 4, 'start': new Date(year, month, day - 1, 8), 'end': new Date(year, month, day - 1, 9, 30), 'title': 'Team breakfast' },
      { 'id': 5, 'start': new Date(year, month, day + 1, 14), 'end': new Date(year, month, day + 1, 15), 'title': 'Product showcase' }
    ]
};
function testpassage() {

    var tmp = minDispo.toString().split(" ");
    minDispo = tmp[4].toString().substr(0, 5);
      var tmp1 = maxDispo.toString().split(" ");
    maxDispo = tmp1[4].toString().substr(0, 5);
     if (origineMassage) {
        jQuery("input[name=jourReservation]").attr("value", dateDeReservation);
        $.mobile.changePage("#reservation", { transition: "slide" });
    } else {
        jQuery("input[name=jourReservationO]").attr("value", dateDeReservation);
        $.mobile.changePage("#reservationOsteo", { transition: "slide" });
    }

}

jQuery(document).ready(function ($) {

    $('#heureDebut').timepicker({ 'timeFormat': 'H:i ', 'step': 30 });
    $('#heureFin').timepicker({ 'timeFormat': 'H:i ', 'step': 30 });
    var srcIn = 'images/star_in.png'; //image au survol
    var srcOut = 'images/star_out.png'; // image non survolée

    // Obtenir id numérique des étoiles au format star_numero
    function idNum(id) {
        var id = id.split('_');
        var id = id[1];
        return id;
    }

    // Survol des étoiles
    $('.star').hover(function () {
        var id = idNum($(this).attr('id')); // id numérique de l'étoile survolée
        var nbStars = $('.star').length; // Nombre d'étoiles de la classe .star
        var i; // Variable d'incrémentation
        for (i = 1; i <= nbStars; i++) {
            if (i <= id) $('#star_' + i).attr({ src: srcIn });
            else if (i > id) $('#star_' + i).attr({ src: srcOut });
            if (i == id) note = i;//$('#note').attr({value:i}); // affectation de la note au formulaire
        }
    }, function () { });

});

$("#voircalendarC").on('swipeleft', function () {

    jQuery('#voircalendarC').weekCalendar("next");
});
$("#voircalendarC").on('swiperight', function () {
    jQuery('#voircalendarC').weekCalendar("prev");
});
$("#home1").on('swipedown', function () {
    $.mobile.changePage("#home2", { transition: "slidedown", reverse: false });
});
$("#home2").on('swipedown', function () {
    $.mobile.changePage("#home3", { transition: "slidedown", reverse: false });
});
$("#home2").on('swipeup', function () {
    $.mobile.changePage("#home1", { transition: "slideup", reverse: false });
});
$("#home3").on('swipedown', function () {
    $.mobile.changePage("#home4", { transition: "slidedown", reverse: false });
});
$("#home3").on('swipeup', function () {
    $.mobile.changePage("#home2", { transition: "slideup", reverse: false });
});

$("#home4").on('swipedown', function () {
    $.mobile.changePage("#home5", { transition: "slidedown", reverse: false });
});
$("#home4").on('swipeup', function () {
    $.mobile.changePage("#home3", { transition: "slideup", reverse: false });
});

$("#home5").on('swipeup', function () {
    $.mobile.changePage("#home4", { transition: "slideup", reverse: false });
});

function envoi() {

    $("#form_cration1").validate({
        rules: {
            nom: {
                "required": true,
                "minlength": 3,
                "maxlength": 30
            },
            prenom: {
                "required": true,
                "minlength": 3
            },

            tel: {
                "required": true,
                "digits": true,
                "minlength": 10,
                "maxlength": 10

            },


            code_parrain: {

                "email": true
            },

            mdp: {
                "required": true,
                "minlength": 8
            },

            confirmation_mdp: {
                "required": true,
                "minlength": 8
            }
        }
    });

    if ($("#form_cration1").valid()) {

        var Nom = $("input[name=nom]").attr("value");
        var Prenom = $("input[name=prenom]").attr("value");
        var Ville = $('#ville option').filter(':selected').text();
        var Civilite = $('#civilite option').filter(':selected').text();
        var Tel = $("input[name=tel]").attr("value");
        var Mdp = $("input[name=mdp]").attr("value");
        var Confirm = $("input[name=confirmation_mdp]").attr("value");
        var Code_parrain = $("input[name=code_parrain]").attr("value");

        if (Mdp != Confirm) {
            alert("Veillez vérifier le mot de passe");
        }

        else {

            var storage = window.localStorage;
            window.localStorage.setItem("nom", Nom);
            window.localStorage.setItem("prenom", Prenom);
            window.localStorage.setItem("ville", Ville);
            window.localStorage.setItem("civilite", Civilite);
            window.localStorage.setItem("tel", Tel);
            window.localStorage.setItem("mdp", Mdp);
            window.localStorage.setItem("code_parrain", Code_parrain);
            $.mobile.changePage("#creation2", { transition: "slide", changeHash: true });

        }
    }

}

function envoi1() {

    $("#form_cration2").validate({
        rules: {
            mail: {
                "required": true,
                "email": true
            },
            adresse: {
                "required": true
            },

            etage: {

                "digits": true,
                "maxlength": 3

            }



        }
    });


    var Mail = $("input[name=mail]").attr("value");
    var Adresse = $("input[name=adresse]").attr("value");
     var Etage = $("input[name=etage]").attr("value");
    var D_g = $('#d_g option').filter(':selected').text();
    var Info = $("input[name=info]").attr("value");
     var Contact = $("#contact").attr("checked");
    if (Contact == "checked") { Contact = 1; }
    else { Contact = 0; }
  if ($("#form_cration2").valid()) {
        window.localStorage.setItem("mail", Mail);
        window.localStorage.setItem("adresse", Adresse);
        window.localStorage.setItem("etage", Etage);
        window.localStorage.setItem("d_g", D_g);
        window.localStorage.setItem("info", Info);
        window.localStorage.setItem("contact", Contact);
  var posting = $.post("http://"+adresseServeur+"/services/connaitre_mail2.php"
                        , { mail: window.localStorage.getItem("mail") },

                        function (data) {
      if (data == "existe") {
                                alert("Ce mail est déjà utilisé");

                            }
                            else {
                                $.mobile.changePage("#creation3", { transition: "slide", changeHash: true });
                            }

                        }
                        , "json")

    }
}

function envoi2() {

    $("#form_cration3").validate({
        rules: {
            carte: {
                "digits": true,
                "maxlength": 16,
                "minlength": 16

            },
            cvv: {
                "digits": true,
                "maxlength": 3,
                "minlength": 3
            }


        }
    });

    var Carte = $("input[name=carte]").attr("value");
     var Mois = $('#mois option').filter(':selected').text();
    var Annee = $('#annee option').filter(':selected').text();
    var CVV = $("input[name=cvv]").attr("value");
   if ($("#form_cration3").valid()) {

        if ((Carte == "" && CVV == "") || (Carte != "" && CVV != "")) {
            window.localStorage.setItem("carte", Carte);
            window.localStorage.setItem("mois", Mois);
            window.localStorage.setItem("annee", Annee);
            window.localStorage.setItem("cvv", CVV);
            $.mobile.changePage("#home1", { transition: "slide", changeHash: false });
            $.post("http://"+adresseServeur+"/services/inscription.php", {
                civilite: window.localStorage.getItem("civilite")
                                                                , nom: window.localStorage.getItem("nom")
                                                                , prenom: window.localStorage.getItem("prenom")
                                                                , tel: window.localStorage.getItem("tel")
                                                                , mdp: rc4(key, window.localStorage.getItem("mdp"))
                                                                , mail: window.localStorage.getItem("mail")
                                                                , code: window.localStorage.getItem("code_parrain")
                                                                , contact: window.localStorage.getItem("contact")

                                                                , adresse: window.localStorage.getItem("adresse")
                                                                , ville: window.localStorage.getItem("ville")
                                                                , etage: window.localStorage.getItem("etage")
                                                                , d_g: window.localStorage.getItem("d_g")
                                                                , info: window.localStorage.getItem("info")


                                                                , carte: rc4(key, window.localStorage.getItem("carte"))
                                                                , mois: window.localStorage.getItem("mois")
                                                                , annee: window.localStorage.getItem("annee")
                                                                , cvv: rc4(key, window.localStorage.getItem("cvv"))


            });
        }

        else alert(" Données bancaires incomplètes");
    }

}

function directementAide() {


    if (aide == true || (window.localStorage.getItem("id_client") != null && window.localStorage.getItem("id_client") != "undefined")) {

        $.mobile.changePage("#accueil", { transition: "slide", changeHash: true });
    } else if (window.localStorage.getItem("idmed") != null && window.localStorage.getItem("idmed") != "undefined") {
        $.mobile.changePage("#accueilMedecin", { transition: "slide", changeHash: true });

    }
    else {

        $.mobile.changePage("#connexion", { transition: "slide", changeHash: true });
    }
}
function connecterClient() {


    var email = $("input[name=e-mail]").attr("value");
    var mdp2 = $("input[name=mdp2]").attr("value");
    window.localStorage.setItem("mail", email);
    window.localStorage.setItem("mdpaverifier", mdp2);
   var jqxhr = $.post("http://"+adresseServeur+"/services/connecter.php", { mail: window.localStorage.getItem("mail"), mdpa: rc4(key, window.localStorage.getItem("mdpaverifier")), mdpMed: mdp2 }, function (data, status) {
      
        if (data.indexOf("true") == 0) {

            var idforsession = data.split("#");
            if (idforsession[1] == "med") {
                window.localStorage.setItem("idmed", idforsession[2]);
                $.mobile.changePage("#accueilMedecin", { transition: "slide", changeHash: true });

            } else if (idforsession[1] == "client") {

                window.localStorage.setItem("id_client", idforsession[2]);
                window.localStorage.setItem("fidelite", idforsession[3]);
                if (idforsession[4] == "Anoter") {
                    window.localStorage.setItem("idcommande", idforsession[5]);

                    $.mobile.changePage("#avis1", { transition: "slide", changeHash: true });

                }
                else {

                    $.mobile.changePage("#accueil", { transition: "slide", changeHash: true });
                }

            }
        }
        else if (data == "false") {

            alert("Mot de passe incorrecte");



        }
        else {
             alert("Erreur de connexion ");

        }
       }).done(function () {
       })
  .error(function (request, status, error) {
  })
  .always(function () {
   });


}
function oublier() {
    var email = $("input[name=e-mail]").attr("value");
    window.localStorage.setItem("mail", email);

    $.post("http://"+adresseServeur+"/services/oublier.php", { mail: window.localStorage.getItem("mail") }, function (data) {
         if (data == "false") {
            alert("Ce mail n'existe pas ");

        }
        else {
          
            $.post("http://"+adresseServeur+"/services/envoieMailOublie.php", { mdp: rc4(key,data), mail: window.localStorage.getItem("mail") });
            alert("Un mail contenant votre mot de passe a été envoyé");
   }

    }, "html");
}
function decrireMO() {
    $.mobile.changePage("#choisirdescription", { transition: "slide", changeHash: true });

}
function monCompte() {
    $.mobile.changePage("#AccueilClient", { transition: "slide", changeHash: true });
}
function tarif() {
    $.mobile.changePage("#tarifs", { transition: "slide", changeHash: true });

}
function MassageBienEtre() {
    $.mobile.changePage("#MassageBienEtre", { transition: "slide", changeHash: true });

}
function osteopathie() {
    $.mobile.changePage("#MassageOsteo", { transition: "slide", changeHash: true });

}
function telephoner() {
  
}
function envoyerMail() {
    $.mobile.changePage("#AccueilClient", { transition: "slide", changeHash: true });

}
function MassageBien1() {
    var choixsexe = $("input[name=radio-choice-1]:checked").attr("value");
    var choixcode = $("input[name=practicienH]").attr("value");
    window.localStorage.setItem("choixsexe", choixsexe);
    window.localStorage.setItem("choixcode", choixcode);
    $.post("http://"+adresseServeur+"/services/variableDechoix.php", { fidelite: window.localStorage.getItem("fidelite"), sexe: choixsexe, code: choixcode }, function (data) {
        jQuery('#voircalendarC').weekCalendar("refresh");

    }, "html");
    origineMassage = true;
    $.mobile.changePage("#voircalendar", { transition: "slide", changeHash: true });


}
function MassageOsteo1() {
     var choixcode2 = $("input[name=practicienH2]").attr("value");

    $.post("http://"+adresseServeur+"/services/variableDechoix.php", { fidelite: window.localStorage.getItem("fidelite"), code: choixcode2 }, function (data) {
        jQuery('#voircalendarC').weekCalendar("refresh");

    }, "html");
    origineMassage = false;
    $.mobile.changePage("#voircalendar", { transition: "slide", changeHash: true });


}
function testtest() {
 
}
function ajoutdispo() {
    var dateprac = $("input[name=datemedecin]").attr("value");
    var heureDebut = $("input[name=heureDebut]").attr("value");
    var heureFin = $("input[name=heureFin]").attr("value");
    var Hd = heureDebut;
    var Hf = heureFin;
    if (Hf > Hd && dateprac != "") {
        var tmpduree1 = heureDebut.split(":");
        var nb = parseFloat(tmpduree1[0]);
        if (tmpduree1[1] == 30) {
            nb = nb + 0.5;
        }
        var tmpduree2 = heureFin.split(":");
        var nb2 = parseFloat(tmpduree2[0]);
        if (tmpduree2[1] == 30) {
            nb2 = nb2 + 0.5;
        }
        var dureeDispo = nb2 - nb;
         heureDebut = dateprac + "T" + heureDebut;
        heureFin = dateprac + "T" + heureFin;
        var posting1 = $.post("http://"+adresseServeur+"/services/ajoutdispo.php", { dureedispMed: dureeDispo, datep: dateprac, Hdebut: heureDebut, Hfin: heureFin, Hdeb2: Hd, Hfin2: Hf, idmed: window.localStorage.getItem("idmed") }, function (data) {
         
            if (data == "true") {
                alert("Ajout de disponibilite reussi");
                $.mobile.changePage("#accueilMedecin", { transition: "slide", changeHash: false });

            }
            else {
                alert("Erreur de connexion");
            }


        }, "html");


    } else if (dateprac == "") {
        alert("Veuillez choisir la date");
    }
    else {
        alert("Heure debut < heure de fin");
    }
}





function ajout_adresse() {

    $("#form_ajout_adresse").validate({
        rules: {
            adresse_ajout: {
                "required": true
            },

            etage_ajout: {

                "digits": true,
                "maxlength": 3

            }

        }

    });

    var Adresse_ajout = $("input[name=adresse_ajout]").attr("value");
    var Etage_ajout = $("input[name=etage_ajout]").attr("value");
    var D_g_ajout = $('#d_g_ajout option').filter(':selected').text();
    var Info_ajout = $("input[name=info_ajout]").attr("value");

    if ($("#form_ajout_adresse").valid()) {

        window.localStorage.setItem("adresse_ajout", Adresse_ajout);
        window.localStorage.setItem("etage_ajout", Etage_ajout);
        window.localStorage.setItem("d_g_ajout", D_g_ajout);
        window.localStorage.setItem("info_ajout", Info_ajout);
        $.post("http://"+adresseServeur+"/services/ajout_adresse.php", {
            id_client: window.localStorage.getItem("id_client")

                                                            , adresse: window.localStorage.getItem("adresse_ajout")
                                                            , etage: window.localStorage.getItem("etage_ajout")
                                                            , d_g: window.localStorage.getItem("d_g_ajout")
                                                            , info: window.localStorage.getItem("info_ajout")
        },

                                                            function () {

                                                             }


                                                            , "html");


        if (ajout_adr) {
            alert("Adresse ajoutée!");
            $.mobile.changePage("#reservation", { transition: "slide", changeHash: true });
            ajout_adr = false;
        }
        else if (Oajout_adr) {
            alert("Adresse ajoutée!");
            $.mobile.changePage("#reservationOsteo", { transition: "slide", changeHash: true });
            ajout_adr = false;
        }
        else {
            alert("Adresse ajoutée!");
            $.mobile.changePage("#mon_compte", { transition: "slide", changeHash: true });
        }
    }
}

function supprimer() {

    var posting = $.post("http://"+adresseServeur+"/services/afficher_adresse.php"
                        , { id_client: window.localStorage.getItem("id_client") },

                        function (data) {
                            $('#listadresse li').remove();
                            addresses = data.items;
                            $.each(addresses, function (index, adr) {


                                $('#listadresse').append('<li><a onClick="test(' + adr.id + ')">' +

                                '<h4>' + adr.adresse + '</h4>' +
                                '<p>' + adr.etage + '</p>' +
                                '<span class="ui-li-count">' + "Supprimer" + '</span></a></li>');


                            });
                            $('#listadresse').listview('refresh');


                        }
                        , "json");
}

function test(id) {


    $.post("http://"+adresseServeur+"/services/supprimer_adresse.php", { id_adresse: id },
         function () {
             var posting = $.post("http://"+adresseServeur+"/services/afficher_adresse.php", { id_client: window.localStorage.getItem("id_client") },

                     function (data) {
                         $('#listadresse li').remove();
                         employees = data.items;
                         $.each(employees, function (index, employee) {
                             $('#listadresse').append('<li><a onClick="test(' + employee.id + ')">' +
                             '<h4>' + employee.adresse + '</h4>' +
                             '<p>' + employee.etage + '</p>' +
                             '<span class="ui-li-count">' + "Supprimer" + '</span></a></li>');
                         });
                         $('#listadresse').listview('refresh');


                     }
               , "json");
         }

    , "html");

}

$('#credit_dis').bind('pageshow', function (event) {
    $('#bouton_credit').text("");
    var posting = $.post("http://"+adresseServeur+"/services/afficher_credit.php"
					, { id_client: window.localStorage.getItem("id_client") },

					function (data) {

					    var employee = data.item;
					    //$('#bouton_code').attr('value', employee.mail).button("refresh");
					    $('#bouton_credit').text(employee.credit);




					}
					, "json")

    ;

}

 );

$('#modifier_info').bind('pageshow', function (event) {

    var posting = $.post("http://"+adresseServeur+"/services/ancien_info.php"
					, { id_client: window.localStorage.getItem("id_client") },

					function (data) {

					    var employee = data.item;
					    $('#nom_mod').attr('value', employee.nom);
					    $('#prenom_mod').attr('value', employee.prenom);
					    $('#tel_mod').attr('value', employee.tel);
					    $('#mail_mod').attr('value', employee.mail);


					}
					, "json");
});
function modifier() {


    $("#form_modifier_info").validate({
        rules: {
            mail_mod: {
                "required": true,
                "email": true
            },
            prenom_mod: {
                "required": true,
                "minlength": 3
            },

            nom_mod: {

                "required": true,
                "minlength": 3

            },

            tel_mod: {
                "required": true,
                "digits": true,
                "minlength": 10,
                "maxlength": 10

            }



        }
    });


    var Nom = $("input[name=nom_mod]").attr("value");
    var Prenom = $("input[name=prenom_mod]").attr("value");
    var Mail = $("input[name=mail_mod]").attr("value");
    var Tel = $("input[name=tel_mod]").attr("value");




    if ($("#form_modifier_info").valid()) {
        var storage = window.localStorage;

        window.localStorage.setItem("nom_mod", Nom);
        window.localStorage.setItem("prenom_mod", Prenom);
        window.localStorage.setItem("mail_mod", Mail);
        window.localStorage.setItem("tel_mod", Tel);
     $.post("http://"+adresseServeur+"/services/modifier_info.php", {
            id_client: window.localStorage.getItem("id_client")

                                                   , nom: window.localStorage.getItem("nom_mod")
                                                               , prenom: window.localStorage.getItem("prenom_mod")
                                                               , tel: window.localStorage.getItem("tel_mod")
                                                               , mail: window.localStorage.getItem("mail_mod")

        });

        alert("Informations modifiées");
    }
}


$('#code_parrinage').bind('pageshow', function (event) {


    var posting = $.post("http://"+adresseServeur+"/services/code_parrain.php"
					, { id_client: window.localStorage.getItem("id_client") },

					function (data) {

					    var employee = data.item;
					    $('#bouton_code').text(employee.mail);
}
					, "json");
});
function modifier_mdp() {
    $("#form_changer_mdp").validate({
        rules: {
            nouveau_mdp: {
                "required": true,
                "minlength": 8
            },

            confirmation_nouveau_mdp: {
                "required": true,
                "minlength": 8

            }
        }
    });



    if ($("#form_changer_mdp").valid()) {

        var Ancien = $("input[name=ancien_mdp]").attr("value");
        var Nouveau = $("input[name=nouveau_mdp]").attr("value");
        var Confirmation = $("input[name=confirmation_nouveau_mdp]").attr("value");


        if (Nouveau != Confirmation) {
            alert("verifier la confirmation du mot de passe");
        }


        else {
            window.localStorage.setItem("ancien", Ancien);
            window.localStorage.setItem("nouveau", Nouveau);



            $.post("http://"+adresseServeur+"/services/modifier_mdp.php", {
                id_client: window.localStorage.getItem("id_client")
                                        , ancien: rc4(key, window.localStorage.getItem("ancien"))
                                                    , nouveau: rc4(key, window.localStorage.getItem("nouveau"))



            }, function (data) {
                if (data == "true") {
                    alert("vous avez changer le mot depasse");
                }
                else if (data == "false") {
                    alert("ancien mot de passe incorrecte");
                }
                else {
                    alert("erreur introduite ressayer");
                }

            }, "html");
        }
    }

}

function ajout_carte() {


    $("#form_ajouter_carte").validate({
        rules: {
            carte_ajout: {
                "required": true,
                "digits": true,
                "maxlength": 16,
                "minlength": 16

            },
            cvv_ajout: {
                "required": true,
                "digits": true,
                "maxlength": 3,
                "minlength": 3
            }


        }
    });
    var Carte_ajout = $("input[name=carte_ajout]").attr("value");
    var Mois_ajout = $('#mois_ajout option').filter(':selected').text();
    var Annee_ajout = $('#annee_ajout option').filter(':selected').text();
    var CVV_ajout = $("input[name=cvv_ajout]").attr("value");
    if ($("#form_ajouter_carte").valid()) {
        window.localStorage.setItem("carte_ajout", Carte_ajout);
        window.localStorage.setItem("mois_ajout", Mois_ajout);
        window.localStorage.setItem("annee_ajout", Annee_ajout);
        window.localStorage.setItem("cvv_ajout", CVV_ajout);
        $.post("http://"+adresseServeur+"/services/ajout_carte.php", {
            id_client: window.localStorage.getItem("id_client")

                                                            , carte: rc4(key, window.localStorage.getItem("carte_ajout"))
                                                            , mois: window.localStorage.getItem("mois_ajout")
                                                            , annee: window.localStorage.getItem("annee_ajout")
                                                            , cvv: rc4(key, window.localStorage.getItem("cvv_ajout"))
        },

                                                            function (data) {
                                                               
                                                              
                                                            }


                                                            , "html");

        if (ajout_car) {
            ajout_car = false;
            alert("Carte ajoutée");

            $.mobile.changePage("#reservation", { transition: "slide", changeHash: true });
        }

        else if (Oajout_car) {
            Oajout_car = false;
            alert("Carte ajoutée");
            $.mobile.changePage("#reservationOsteo", { transition: "slide", changeHash: true });
        }
        else {
            alert("Carte ajoutée");
            $.mobile.changePage("#mes_cartes", { transition: "slide", changeHash: true });
        }
}

}

function supprimer_carte() {

    var posting = $.post("http://"+adresseServeur+"/services/afficher_carte.php"
                        , { id_client: window.localStorage.getItem("id_client") },

                        function (data) {
                            $('#listcarte li').remove();
                            addresses = data.items;
                            $.each(addresses, function (index, adr) {


                                $('#listcarte').append('<li><a onClick="test1(' + adr.id + ')">' +

                                '<h4>xxxxxxxxxxxx' + rc4(key, adr.num.toString()).substr(2, 4) + '</h4>' +

                                '<span class="ui-li-count">' + "Supprimer" + '</span></a></li>');


                            });
                            $('#listcarte').listview('refresh');


                        }
                        , "json");
}

function test1(id) {


    $.post("http://"+adresseServeur+"/services/supprimer_carte.php", { id_adresse: id },
         function () {
             var posting = $.post("http://"+adresseServeur+"/services/afficher_carte.php", { id_client: window.localStorage.getItem("id_client") },

                     function (data) {
                         $('#listcarte li').remove();
                         employees = data.items;
                         $.each(employees, function (index, employee) {
                             $('#listcarte').append('<li><a onClick="test(' + employee.id + ')">' +
                             '<h4>xxxxxxxxxxxx' + rc4(key, employee.num.toString()).substr(12, 4) + '</h4>' +

                             '<span class="ui-li-count">' + "Supprimer" + '</span></a></li>');
                         });
                         $('#listcarte').listview('refresh');
                  }
               , "json");
         }

    , "html");

}

$('#offrir').bind('pageshow', function (event) {

    var posting1 = $.post("http://"+adresseServeur+"/services/afficher_credit.php"
           , { id_client: window.localStorage.getItem("id_client") },
           function (data) {
               var dispo = data.item;
                $('#solde').text("");
               $('#solde').append(dispo.credit);
               window.localStorage.setItem("solde", dispo.credit);
           }
           , "json");


});

function is_int(value) {
    if ((parseFloat(value) == parseInt(value)) && !isNaN(value)) {
        return true;
    } else {
        return false;
    }
}


function offrir() {

    $("#form_offrir").validate({
        rules: {
            point_offrir: {
                "required": true,
                "digits": true
            },
            mail_ben: {
                "required": true,
                "email": true
            }
        }
    });
    var mail_ben = $("input[name=mail_ben]").attr("value");
    var pts_offrir = $("input[name=point_offrir]").attr("value");

    if ($("#form_offrir").valid()) {
        var posting1 = $.post("http://"+adresseServeur+"/services/connaitre_mail.php"
            , { mail: mail_ben },
            function (data) {
                var dispo = data.item;
                if (!is_int(dispo.id))
                { alert("mail invalide"); }
                else
                {
                   if (parseInt(pts_offrir) > parseInt(window.localStorage.getItem("solde")))
                    { alert("solde insuffisant"); }

                    else
                    {
                        var solde_offrant = parseInt(window.localStorage.getItem("solde")) - parseInt(pts_offrir);
                        var solde_ben = parseInt(dispo.credit) + parseInt(pts_offrir); //dispo.credit + pts_offrir;
                        $.post("http://"+adresseServeur+"/services/modifier_credit.php", {
                            id_client: window.localStorage.getItem("id_client")
                                                                      , solde: solde_offrant
                        });
                        $.post("http://"+adresseServeur+"/services/modifier_credit.php", {
                            id_client: dispo.id
                                                                       , solde: solde_ben
                        });

                        window.localStorage.setItem("solde", solde_offrant);
                        $('#solde').text("");
                        $('#solde').append(solde_offrant);

                    }


                }
            }
        , "json");
    }
}

$('#voircalendar').bind('pageshow', function (event) {
    $.post("http://"+adresseServeur+"/services/miseAjourDispo.php", {});

    jQuery('#voircalendarC').weekCalendar({
        use24Hour: true,
        timeFormat: 'H:i',
        readonly: true,
        timeslotsPerHour: 2,
        timeslotHeigh: 100,
        hourLine: true,
        daysToShow: 1,
        useShortDayNames: false,
        data: "http://"+adresseServeur+"/services/calendrier.php",
        height: function ($voircalendarC) {
            return $(window).height();
        },
        eventRender: function (calEvent, $event) {
            if (calEvent.end.getTime() < new Date().getTime()) {
                $event.css('backgroundColor', '#aaa');
                $event.find('.time').css({ 'backgroundColor': '#999', 'border': '1px solid #888' });
            }
        },
        eventNew: function (calEvent, $event) {
            //  displayMessage('<strong>Added event</strong><br/>Start: ' + calEvent.start + '<br/>End: ' + calEvent.end);
            alert('You\'ve added a new event. You would capture this event, add the logic for creating a new event with your own fields, data and whatever backend persistence you require.');
        },
        eventDrop: function (calEvent, $event) {
            //  displayMessage('<strong>Moved Event</strong><br/>Start: ' + calEvent.start + '<br/>End: ' + calEvent.end);
        },
        eventResize: function (calEvent, $event) {

            //  displayMessage('<strong>Resized Event</strong><br/>Start: ' + calEvent.start + '<br/>End: ' + calEvent.end);
        },
        eventClick: function (calEvent, $event) {
            // alert("on est dans la bonne place");
            dateDeReservation = calEvent['title']; /* var prov = Hdeb[0].split(":");
        var nb = parseInt(prov[0]);
      */
            minDispo = calEvent['start'];
            maxDispo = calEvent['end'];

            testpassage();

            // displayMessage('<strong>Clicked Event</strong><br/>Start: ' + calEvent.start + '<br/>End: ' + calEvent.end);
        },
        eventMouseover: function (calEvent, $event) {
            //alert("test");
            // displayMessage('<strong>Mouseover Event</strong><br/>Start: ' + calEvent.start + '<br/>End: ' + calEvent.end);
        },
        eventMouseout: function (calEvent, $event) {
            //  displayMessage('<strong>Mouseout Event</strong><br/>Start: ' + calEvent.start + '<br/>End: ' + calEvent.end);
        },
        noEvents: function () {
            // displayMessage('There are no events for this week');
        }
    });

});

$('#reservation').bind('pagebeforeshow', function (event) {

    $('input[name="visa"]').prop('checked', false).checkboxradio("refresh");
    $('input[name="pt_mo"]').attr('checked', false).checkboxradio("refresh");
    $("input[name=radio-choice-2]:checked").attr('checked', false).checkboxradio("refresh");
    $('#list_dispo').empty();
    $('#list_dispo').append('<option value="0" >plages horaires disponibles</option>');
    $('#list_dispo').selectmenu('refresh', true);

    $('#list_car').empty();
    $('#list_car').append('<option value="0">Choisir une carte</option>');
    $('#list_car').selectmenu('refresh', true);

    $('#dispo').text('');

    $('#div_credit').hide();

    var posting = $.post("http://"+adresseServeur+"/services/afficher_adresse.php"
                     
                            , { id_client: window.localStorage.getItem("id_client") },
                        function (data) {
                           
                            addresses = data.items;
                            $('#list_adr').empty()
                            $.each(addresses, function (index, adr) {
                                var test = adr.adresse + "";
                                $('#list_adr').append('<option value="' + adr.id + '">' + test + '</option>')
                            
                            }); 
							$('#list_adr').append('<option value="0" >Choisir une adresse</option>');                          
                            $('#list_adr').append('<option value="Ajouter une adresse">Ajouter une adresse</option>');
                            $('#list_adr').selectmenu('refresh', true);
                        }


                        , "json");
    var posting = $.post("http://"+adresseServeur+"/services/code_parrain.php"
                        , { id_client: window.localStorage.getItem("id_client") },

                        function (data) {

                            var employee = data.item;

                            window.localStorage.setItem("mail_client", employee.mail);
                            window.localStorage.setItem("nom_client", employee.civilite + " " + employee.nom + " " + employee.prenom);
                            window.localStorage.setItem("tel_client", employee.tel);
   }
                        , "json");
});

$('input[name="radio-choice-2"]').bind("change", function (event, ui) {
    $('input[name="visa"]').prop('checked', false).checkboxradio("refresh");
    $('input[name="pt_mo"]').attr('checked', false).checkboxradio("refresh");
    $('#list_credit').empty();
    $('#list_credit').append('<option value="0" >Selectionner les points MO</option>');
    $('#list_credit').selectmenu('refresh', true);
    if ($('#list_credit').is(":visible"))
    { $('#div_credit').hide(); }
    var choixjour = $("input[name=jourReservation]").attr("value");
    var choixheureDeb = minDispo;
    var choixheureFin = maxDispo;
    var choixduree = $("input[name=radio-choice-2]:checked").attr("value");
    var paiement;
    var duree = choixduree;
    if (duree == "1")
        paiement = 100;
    else if (duree == "1.5")
        paiement = 140;
    else if (duree == "2")
        paiement = 180;
    var posting = $.post("http://"+adresseServeur+"/services/DispoExistants.php"
                        , { dateRes: choixjour, heurefinalRes: maxDispo, heuredebutRes: minDispo, dureeDisp: choixduree },
                           
                        function (data) {
                          
                            var testexistance = "";
                            addresses = data.items;
                            $('#list_dispo').empty();

                            $('#list_dispo').append('<option value="0" >plages horaires disponibles</option>');
                            $.each(addresses, function (index, adr) {
                                var test = adr.adresse + "";
                                // is_int
                                var tmpduree1 = adr.Hdeb.split(":");
                                var nb = parseFloat(tmpduree1[0]);
                                if (tmpduree1[1] == 30) {
                                    nb = nb + 0.5;
                                }
                                var tmpduree2 = adr.Hfin.split(":");
                                var nb2 = parseFloat(tmpduree2[0]);
                                if (tmpduree2[1] == 30) {
                                    nb2 = nb2 + 0.5;
                                }
                                var dureeDispo = nb2 - nb;
                                var ch1 = "";
                                var ch2 = "";                              
                                var d = parseFloat(choixduree);                             
                                while (nb <= (nb2 - d)) {
                                   var nb3 = nb + d;
                                    if (nb < 10) {
                                        if (is_int(nb)) {
                                            ch1 = "0" + nb + ":00 ";
                                        } else {
                                            nb = nb - 0.5;
                                            ch1 = "0" + nb + ":30 ";
                                            nb = nb + 0.5;
    }
                                    } else {
                                        if (is_int(nb)) {
                                            ch1 = nb + ":00 ";
                                        } else {
                                            nb = nb - 0.5;
                                            ch1 = nb + ":30 ";
                                            nb = nb + 0.5;
                                        }
                                    }
                                       if (nb3 < 10) {
                                        if (is_int(nb3)) {
                                            ch2 = "0" + nb3 + ":00 ";
                                        } else {
                                            nb3 = nb3 - 0.5;
                                            ch2 = "0" + nb3 + ":30 ";
                                            nb3 = nb3 + 0.5;
      }
                                    } else {
                                        if (is_int(nb3)) {
                                            ch2 = nb3 + ":00 ";
                                        } else {
                                            nb3 = nb3 - 0.5;
                                            ch2 = nb3 + ":30 ";
                                            nb3 = nb3 + 0.5;
                                        }
                                    }	
                                    nb = nb + 0.5;
                                    if (testexistance.indexOf(ch1) < 0) {
                                        $('#list_dispo').append('<option value="' + ch1 + '">' + ch1 + ch2 + '</option>');
                                        testexistance = testexistance + ch1;
                                    }
                                    $('#list_dispo').selectmenu('refresh', true);
                                }


                            });
                        }
                        , "json");
});

$('input[name="visa"]:checkbox').change(function () {

    if ($(this).is(':checked')) {
        var posting1 = $.post("http://"+adresseServeur+"/services/afficher_carte.php"
                                , { id_client: window.localStorage.getItem("id_client") },
                            function (data) {
                                $('#list_car').empty();
                                $('#list_car').append('<option value="0">Choisir une carte</option>');
                                cartes = data.items;
                                $.each(cartes, function (index, carte) {
                                    var test = carte.num + "";

                                    $('#list_car').append('<option value="' + carte.id + '">' + rc4(key, test) + '</option>');

                                });
                                $('#list_car').append('<option value="ajouter une carte" >ajouter une carte</option>');
                                $('#list_car').selectmenu('refresh', true);

                            }
                            , "json");
    }
});

$('#list_adr').change(function () {
    var val = $(this).val();
    alert(val);
    if (val == 'Ajouter une adresse') {
        ajout_adr = true;
        $.mobile.changePage("#ajouter_adresse", { transition: "slide", reverse: false });
    }

});



$('#list_car ').change(function () {

    var val = $(this).val(); 
    if (val == 'ajouter une carte') {
        ajout_car = true;
        $.mobile.changePage("#ajouter_carte", { transition: "slide", reverse: false });
    }

});

$('input[name="pt_mo"]:checkbox').change(function () {

    if ($(this).is(':checked')) {
        var heure_debut = $('#list_dispo option:selected').text();

        if ($('input[name=radio-choice-2]').is(':checked') && heure_debut != "plages horaires disponibles" && heure_debut != "") {
            var posting1 = $.post("http://"+adresseServeur+"/services/afficher_credit.php"
                                    , { id_client: window.localStorage.getItem("id_client") },
                                function (data) {
                                    $('#dispo').replaceWith(' <label id="dispo" class="form_col" for="Adresse">    </label>  ');
                                    var dispo = data.item;
                                    $('#dispo').append('\t   ' + '   disponible:   ' + dispo.credit);
                                    window.localStorage.setItem("solde", dispo.credit);
            var heure_debut = $('#list_dispo option:selected').text();
            duree = $("input[name=radio-choice-2]:checked").attr("value");
            var paiement;
            h_debut = heure_debut.substr(0, 2)
      if (parseInt(h_debut) < 22) {
                if (duree == "1")
                    paiement = 100;
                else if (duree == "1.5")
                    paiement = 140;
                else if (duree == "2")
                    paiement = 180;

            }
else {
                if (duree == "1")
                    paiement = 120;
                else if (duree == "1.5")
                    paiement = 160;
                else if (duree == "2")
                    paiement = 200;

            }

            $('#list_credit').empty();
            $('#list_credit').append('<option value="0" >Selectionner les points MO</option>');

            for (i = 10; i <= Math.min(window.localStorage.getItem("solde"), paiement) ; i = i + 10) {

                $('#list_credit').append('<option value="' + i + '">' + i + '</option>')

            };
     $('#list_credit').selectmenu('refresh', true);
            $('#div_credit').show();
       

                                }
                                , "json").fail(function () {
                                });

        }
   else {
            alert("selectionner la durée de la séance et l'heure de début");
            $('input[name="visa"]').prop('checked', false).checkboxradio("refresh");
            $('input[name="pt_mo"]').attr('checked', false).checkboxradio("refresh");
            return 0;
        }

    }
});



$('#reservationOsteo').bind('pageshow', function (event) {
    $('input[name="Ovisa"]').prop('checked', false).checkboxradio("refresh");
    $('input[name="Opt_mo"]').attr('checked', false).checkboxradio("refresh");
    $("input[name=radio-choice-3]:checked").attr('checked', false).checkboxradio("refresh");
    $('#Olist_dispo').empty();
    $('#Olist_dispo').append('<option value="0" >plages horaires disponibles</option>');
    $('#Olist_dispo').selectmenu('refresh', true);
    $('#Olist_car').empty();
    $('#Olist_car').append('<option value="0">Choisir une carte</option>');
    $('#Olist_car').selectmenu('refresh', true);

    $('#Odispo').text('');

    $('#Odiv_credit').hide();

    var posting = $.post("http://"+adresseServeur+"/services/afficher_adresse.php"
                     
                            , { id_client: window.localStorage.getItem("id_client") },
                        function (data) {
                            addresses = data.items;
                            $('#Olist_adr').empty()
                            $.each(addresses, function (index, adr) {
                                var test = adr.adresse + "";
                                $('#Olist_adr').append('<option value="' + adr.id + '">' + test + '</option>')
                                   $('#Olist_adr').selectmenu('refresh', true);

                            }); 
							$('#Olist_adr').append('<option value="0" >Choisir une adresse</option>');     
                            $('#Olist_adr').append('<option value="Ajouter une adresse">Ajouter une adresse</option>');
                             $('#Olist_adr').selectmenu('refresh', true);
                        }
                        , "json");

    var posting = $.post("http://"+adresseServeur+"/services/code_parrain.php"
                        , { id_client: window.localStorage.getItem("id_client") },

                        function (data) {
                            var employee = data.item;
                            window.localStorage.setItem("mail_client", employee.mail);
                            window.localStorage.setItem("nom_client", employee.civilite + " " + employee.nom + " " + employee.prenom);
                            window.localStorage.setItem("tel_client", employee.tel);
   }
                        , "json");




});

$('input[name="radio-choice-3"]').bind("change", function (event, ui) {
    $('input[name="Ovisa"]').prop('checked', false).checkboxradio("refresh");
    $('input[name="Opt_mo"]').attr('checked', false).checkboxradio("refresh");
    $('#Olist_credit').empty();
    $('#Olist_credit').append('<option value="0" >Selectionner les points MO</option>');
    $('#Olist_credit').selectmenu('refresh', true);
    if ($('#Olist_credit').is(":visible"))
    { $('#Odiv_credit').hide(); }
    var choixjour = $("input[name=jourReservationO]").attr("value");
    var choixheureDeb = minDispo;
    var choixheureFin = maxDispo;
    var choixduree = $("input[name=radio-choice-3]:checked").attr("value");
    var paiement;
    var duree = choixduree;
    if (duree == "1")
        paiement = 100;
    if (duree == "1")
        paiement = 120;
    else if (duree == "1.5")
        paiement = 150;
    var ch = "Valider le paiement de " + paiement + "€";
    $("#boutonOsteo").attr('value', ch).button("refresh");
    var posting = $.post("http://"+adresseServeur+"/services/DispoExistants.php"
                        , { dateRes: choixjour, heurefinalRes: maxDispo, heuredebutRes: minDispo, dureeDisp: choixduree },       
                        function (data) {
                            var testexistance = "";
                            addresses = data.items;
                            $('#Olist_dispo').empty();
                            $('#Olist_dispo').append('<option value="0" >plages horaires disponibles</option>');
                            $.each(addresses, function (index, adr) {
                                var test = adr.adresse + "";
                                var tmpduree1 = adr.Hdeb.split(":");
                                var nb = parseFloat(tmpduree1[0]);
                                if (tmpduree1[1] == 30) {
                                    nb = nb + 0.5;
                                }
                                var tmpduree2 = adr.Hfin.split(":");
                                var nb2 = parseFloat(tmpduree2[0]);
                                if (tmpduree2[1] == 30) {
                                    nb2 = nb2 + 0.5;
                                }
                                var dureeDispo = nb2 - nb;
                                var ch1 = "";
                                var ch2 = "";
                                           var d = parseFloat(choixduree);
                                while (nb <= (nb2 - d)) {
                                    var nb3 = nb + d;
                                    if (nb < 10) {
                                        if (is_int(nb)) {
                                            ch1 = "0" + nb + ":00 ";
                                        } else {
                                            nb = nb - 0.5;
                                            ch1 = "0" + nb + ":30 ";
                                            nb = nb + 0.5;
   }
                                    } else {
                                        if (is_int(nb)) {
                                            ch1 = nb + ":00 ";
                                        } else {
                                            nb = nb - 0.5;
                                            ch1 = nb + ":30 ";
                                            nb = nb + 0.5;
                                        }
                                    }
                                    if (nb3 < 10) {
                                        if (is_int(nb3)) {
                                            ch2 = "0" + nb3 + ":00 ";
                                        } else {
                                            nb3 = nb3 - 0.5;
                                            ch2 = "0" + nb3 + ":30 ";
                                            nb3 = nb3 + 0.5;


                                        }
                                    } else {
                                        if (is_int(nb3)) {
                                            ch2 = nb3 + ":00 ";
                                        } else {
                                            nb3 = nb3 - 0.5;
                                            ch2 = nb3 + ":30 ";
                                            nb3 = nb3 + 0.5;
                                        }
                                    }

                                    nb = nb + 0.5;
                                  
                                    if (testexistance.indexOf(ch1) < 0) {
                                        $('#Olist_dispo').append('<option value="' + ch1 + '">' + ch1 + ch2 + '</option>');
                                        testexistance = testexistance + ch1;
                                    }
$('#Olist_dispo').selectmenu('refresh', true);
                                    }


                            });
                         
                        }
                        , "json");









});

$('input[name="Ovisa"]:checkbox').change(function () {

    if ($(this).is(':checked')) {

        var posting1 = $.post("http://"+adresseServeur+"/services/afficher_carte.php"
                           
                                , { id_client: window.localStorage.getItem("id_client") },
                            function (data) {

                                $('#Olist_car').empty();
                                $('#Olist_car').append('<option value="0" >Choisir une carte</option>');
                                cartes = data.items;
                                $.each(cartes, function (index, carte) {
                                    var test = carte.num + "";

                                    $('#Olist_car').append('<option value="' + carte.id + '">' + rc4(key, test) + '</option>')

                                });
                               $('#Olist_car').append('<option value="ajouter une carte" >ajouter une carte</option>');
                                $('#Olist_car').selectmenu('refresh', true);

                            }
                            , "json");
    }









});




$('#Olist_car ').change(function () {

    var val = $(this).val(); 

    if (val == 'ajouter une carte') {
        Oajout_car = true;
        $.mobile.changePage("#ajouter_carte", { transition: "slide", reverse: false });
    }

});
$('#Olist_adr ').change(function () {

    var val = $(this).val(); 

    if (val == 'Ajouter une adresse') {
        Oajout_adr = true;
        $.mobile.changePage("#ajouter_adresse", { transition: "slide", reverse: false });
    }

});

$('input[name="Opt_mo"]:checkbox').change(function () {

    if ($(this).is(':checked')) {
        var heure_debut = $('#Olist_dispo option:selected').text();

        if ($('input[name=radio-choice-3]').is(':checked') && heure_debut != "plages horaires disponibles" && heure_debut != "") {
            var posting1 = $.post("http://"+adresseServeur+"/services/afficher_credit.php"
                               
                                    , { id_client: window.localStorage.getItem("id_client") },
                                function (data) {
                                    $('#Odispo').replaceWith(' <label id="Odispo" class="form_col" for="Adresse">    </label>  ');
                                    var dispo = data.item;
                                    $('#Odispo').append('   disponible:   ' + dispo.credit);
                                    window.localStorage.setItem("solde", dispo.credit);
									            duree = $("input[name=radio-choice-3]:checked").attr("value");
            var paiement;
            h_debut = heure_debut.substr(0, 2);
     
            if (parseInt(h_debut) < 20) {
                if (duree == "1")
                    paiement = 120;
                else if (duree == "1.5")
                    paiement = 150;
            }
            else {
                if (duree == "1")
                    paiement = 150;
                else if (duree == "1.5")
                    paiement = 180;


            }
            $('#Olist_credit').empty();
            $('#Olist_credit').append('<option value="0" >Selectionner les points MO</option>');

            for (i = 10; i <= Math.min(window.localStorage.getItem("solde"), paiement) ; i = i + 10) {

                $('#Olist_credit').append('<option value="' + i + '">' + i + '</option>')

            }; 
			$('#Olist_credit').selectmenu('refresh', true);
   $('#Odiv_credit').show();
   }
                                , "json");


             }
        else {
            alert("selectionner la durée de la séance et l'heure de début");
            $('input[name="Ovisa"]').prop('checked', false).checkboxradio("refresh");
            $('input[name="Opt_mo"]').attr('checked', false).checkboxradio("refresh");
            return 0;
        }

    }
});

function verifierCommandeDispo() {
    var duree = $("input[name=radio-choice-2]:checked").attr("value");
    var paiement;
    var adr = $('#list_adr option:selected').val();
    var adr1 = $('#list_adr option:selected').text();
    var ptsMO = $("#pt_mo").attr("checked");
    var visa = $("#visa").attr("checked");
    var dispo = parseInt(window.localStorage.getItem("solde"));
    var mo_choisis = $('#list_credit option:selected').val();
    var date = $("input[name=jourReservation]").attr("value");
    var heure_debut = $('#list_dispo option:selected').text();
    var cartenum = $('#list_car option:selected').text();
    if (heure_debut != "plages horaires disponibles" && heure_debut != "") {
        h_debut = heure_debut.substr(0, 2);
        if (parseInt(h_debut) < 22) {
            if (duree == "1")
                paiement = 100;
            else if (duree == "1.5")
                paiement = 140;
            else if (duree == "2")
                paiement = 180;

        }
        else {
            if (duree == "1")
                paiement = 120;
            else if (duree == "1.5")
                paiement = 160;
            else if (duree == "2")
                paiement = 200;
        }
    }
    else { alert("Veuillez selectionner la durée de la séance"); return 0; }
    if (adr == 0) {
        alert("veuillez choisir une adresse");
        return 0;
    }
    if (ptsMO != "checked" && visa != "checked") {
        alert("veuillez choisir un mode de paiement");
        return 0;
    }
    if (ptsMO == "checked") {
        if (parseInt(mo_choisis) == parseInt(paiement)) {
            var restant = parseInt(dispo) - parseInt(paiement);
           $.post("http://"+adresseServeur+"/services/modifier_credit.php", {
                id_client: window.localStorage.getItem("id_client")
                                                               , solde: restant

            });
        }

        else {

            if (visa == "checked" && cartenum != "Choisir une carte") {
                var restant = parseInt(dispo) - parseInt(mo_choisis);
                $.post("http://"+adresseServeur+"/services/modifier_credit.php", {
                    id_client: window.localStorage.getItem("id_client")
                                                          , solde: restant

                });
 var paiement1 = (paiement - parseInt(mo_choisis)) * 100;
                if (payer(paiement1, cartenum, "com") == "false") {
                    alert("Verifier vos informations bancaires");

                    return 0;

                }
            }

            else {

                alert("solde indispo");
                return 0;
            }
        }
    }
    else if (cartenum != "Choisir une carte") {

        var paiement2 = paiement * 100;
        var cartenum = $('#list_car option:selected').text();
        if (payer(paiement2, cartenum, "com") == "false") {
            alert("Verifier vos informations bancaires");
            return 0;
        }
    }

    else {
        alert("Sélectionner une carte");
        return 0;
    }

    h_d = heure_debut.substr(0, 5);
    h_f = heure_debut.substr(6, 5);

    $.post("http://"+adresseServeur+"/services/recuperer_medecin.php", {
        sexe: window.localStorage.getItem("choixsexe")
                                                , code: window.localStorage.getItem("choixcode")
                                                , h_debut: h_d
                                                , h_fin: h_f
                                                , jour: date

    },
                        function (data) {
                            var prac = data.item;
                                 window.localStorage.setItem("id_practicien", prac.id_practicien);
                             window.localStorage.setItem("mail_practicien", prac.email);
                            window.localStorage.setItem("id_agenda", prac.id);           
                            $.post("http://"+adresseServeur+"/services/recuperer_adresse.php", {
                                id_client:
                                                     window.localStorage.getItem("id_client")
                                                 , adresse: adr1


                            },
                        function (data) {
                            var prac = data.item;
                            var ChAdresse = prac.adresse.toString() + "\n ville :" + prac.ville.toString() + "\n etage :"
                                + prac.etage.toString() + " " + prac.droite.toString() + "\n" + prac.info.toString();
                            window.localStorage.setItem("adresse_client", ChAdresse);
                            $.post("http://"+adresseServeur+"/services/ajout_commande.php", {
                                id_client: window.localStorage.getItem("id_client")
														, id_practicien: window.localStorage.getItem("id_practicien")
														, date: date
														, duree: duree
														, tarif: parseInt(paiement)
														, evaluation: parseInt("0")
														, adresseclient: window.localStorage.getItem("adresse_client")
														, numtel: window.localStorage.getItem("tel_client")
														, montantprestation: paiement
														, h_debut: h_d
														, nom: window.localStorage.getItem("nom_client")
														, mail_praticien: window.localStorage.getItem("mail_practicien")
														, mail_client: window.localStorage.getItem("mail_client")
														, id_agenda: window.localStorage.getItem("id_agenda")
														, h_fin: h_f

                            }, function (data) {
                                if (data == "true") {
                                    $.mobile.changePage("#validation_commande", { transition: "slide", reverse: false, changeHash: false });
                                }
                            }, "html");
                        }
                        , "json");
                        }
                        , "json");
}

function jourprev() {
    jQuery('#voircalendarC').weekCalendar("prev");
}
function joursuiv() {
    jQuery('#voircalendarC').weekCalendar("next");
}

$('#mes_commandes').bind('pageshow', function (event) {
    var posting = $.post("http://"+adresseServeur+"/services/mes_commandes.php"
                        , { id_client: window.localStorage.getItem("id_client") },

                        function (data) {
                            $('#listcommande li').remove();
                            commandes = data.items;
                            $.each(commandes, function (index, com) {
                                var dateEntered = com.date;
                                var validite;
                                var date = dateEntered.substring(8, 10);
                                var month = dateEntered.substring(5, 7);
                                var year = dateEntered.substring(0, 4);
                                //alert ( date+ month +year);
                                var dateToCompare = new Date(year, month - 1, date);
                                var currentDate = new Date();
                                if (dateToCompare > currentDate) {
                                    validite = "confirmée";

                                }
                                else {
                                    validite = "effectuée";
                                }
  $('#listcommande').append('<li><a onClick="supprimer_commande(' + com.id + ')">' +

                            '<h4>' + com.date + ' à ' + com.heure.substring(0, 5) + '</h4>' +
                                '<p> ' + validite + '</p>' +
                                '<span class="ui-li-count"> Supprimer </span></a></li>');

                            });
                            $('#listcommande').listview('refresh');
                        }
                        , "json");
});

function supprimer_commande(id) {

    $.post("http://"+adresseServeur+"/services/supprimer_commande.php", { id_commande: id },
         function () {
             var posting = $.post("http://"+adresseServeur+"/services/mes_commandes.php", { id_client: window.localStorage.getItem("id_client") },

                     function (data) {
                         $('#listcommande li').remove();
                         commandes = data.items;
                         $.each(commandes, function (index, com) {
                             var dateEntered = com.date;
                             var validite;
                             var date = dateEntered.substring(8, 10);
                             var month = dateEntered.substring(5, 7);
                             var year = dateEntered.substring(0, 4);
                             var dateToCompare = new Date(year, month - 1, date);
                             var currentDate = new Date();
                             if (dateToCompare > currentDate) {
                                  validite = "confirmée";

                             }
                             else {
                                 validite = "effectuée";
                             }
                             $('#listcommande').append('<li><a onClick="supprimer_commande(' + com.id + ')">' +

                     '<h4>' + com.date + ' à ' + com.heure.substring(0, 5) + '</h4>' +
                     '<p> ' + validite + '</p>' +
                     '<span class="ui-li-count"> Supprimer </span></a></li>');

                         });
                         $('#listcommande').listview('refresh');


                     }
               , "json");
         }

    , "html");

}



$('#avis1').bind('pagebeforeshow', function (event) {
    var srcIn = 'images/star_in.png'; //image au survol
    var srcOut = 'images/star_out.png'; // image non survolée

    for (i = 1; i <= 5; i++) {
        $('#star_' + i).attr({ src: srcOut });
    }
    $('#reclamation').hide();

    $('input[name="Ponctualités"]').attr('checked', false).checkboxradio("refresh");
    $('input[name="qualite"]').attr('checked', false).checkboxradio("refresh");
    $('input[name="Professionnalisme"]').attr('checked', false).checkboxradio("refresh");
    $('input[name="Autres"]').attr('checked', false).checkboxradio("refresh");


});

function enregistrer() {
    var i;
    var reclamation = "";
    var comm = $('#commentaire').val();

    if (!$('#reclamation').is(":visible")) {
        if (note < 5) {
            $('#reclamation').show();
        }
        else {
            var posting1 = $.post("http://"+adresseServeur+"/services/enregistrer_avis.php"
            , {
                id_commande: window.localStorage.getItem("idcommande"),
                note: note,
                commentaire: comm,
                reclamation: reclamation
            },
            function (data) {

                alert("Merci pour votre avis");

                $.mobile.changePage("#accueil", { transition: "slide", changeHash: true });
            }
            , "json");
        }
    }

    else {
        if ($('#Ponctualités').is(':checked') || $('#qualite').is(':checked') || $('#Professionnalisme').is(':checked') || $('#Autres').is(':checked')) {
            if ($('#Ponctualités').is(':checked'))
            { reclamation = reclamation + "Ponctualités"; }

            if ($('#qualite').is(':checked'))
            { reclamation = reclamation + " Qualité de la prestation"; }

            if ($('#Professionnalisme').is(':checked'))
            { reclamation = reclamation + " Professionnalisme"; }
    var posting1 = $.post("http://"+adresseServeur+"/services/enregistrer_avis.php"
                        , {
                            id_commande: window.localStorage.getItem("idcommande"),
                            note: note,
                            commentaire: comm,
                            reclamation: reclamation
                        },
                        function (data) {

                            alert("Merci pour votre avis");

                            $.mobile.changePage("#accueil", { transition: "slide", changeHash: true });
                        }
                        , "json").fail(function () {
                            alert("Erreur connexion \n ");
                        });
        }
        else { alert("Sélectionnez la cause de votre insatisfaction"); }
    }

}
function verifierCommandeDispoOsteo() {

    var duree = $("input[name=radio-choice-3]:checked").attr("value");
    var paiement;
    var adr = $('#Olist_adr option:selected').val();
    var adr1 = $('#Olist_adr option:selected').text();

    var ptsMO = $("#Opt_mo").attr("checked");
    var visa = $("#Ovisa").attr("checked");
    var dispo = parseInt(window.localStorage.getItem("solde"));
    var mo_choisis = $('#Olist_credit option:selected').val();

    var date = $("input[name=jourReservationO]").attr("value");
    var heure_debut = $('#Olist_dispo option:selected').text();
    var cartenum = $('#Olist_car option:selected').text();

    if (heure_debut != "plages horaires disponibles" && heure_debut != "") {
        h_debut = heure_debut.substr(0, 2);
        if (parseInt(h_debut) < 20) {
            if (duree == "1")
                paiement = 120;
            else if (duree == "1.5")
                paiement = 150;
        }
        else {
            if (duree == "1")
                paiement = 150;
            else if (duree == "1.5")
                paiement = 180;
        }
    }
    else { alert("Veuillez selectionner le type de la séance et l'heure de début"); return 0; }
    if (adr == 0) {
        alert("veuillez choisir une adresse");
        return 0;
    }
  if (ptsMO != "checked" && visa != "checked") {
        alert("veuillez choisir un mode de paiement");
        return 0;
    }
    if (ptsMO == "checked") {
        if (parseInt(mo_choisis) == parseInt(paiement)) {
            var restant = parseInt(dispo) - parseInt(paiement);
             $.post("http://"+adresseServeur+"/services/modifier_credit.php", {
                id_client: window.localStorage.getItem("id_client")
                                                               , solde: restant
            });
        }
        else {
            if (visa == "checked" && cartenum != "Choisir une carte") {
                var restant = parseInt(dispo) - parseInt(mo_choisis);
                $.post("http://"+adresseServeur+"/services/modifier_credit.php", {
                    id_client: window.localStorage.getItem("id_client")
                                                          , solde: restant
                });
 var paiement1 = (paiement - parseInt(mo_choisis)) * 100;
                if (payer(paiement1, cartenum, "com") == "false") {
                    alert("Verifier vos informations bancaires");
                    return 0;
                }
            }
            else {
                alert("solde indispo");
                return 0;
            }
        }
    }
    else if (cartenum != "Choisir une carte") {
        var paiement2 = paiement * 100;
        var cartenum = $('#Olist_car option:selected').text();
        if (payer(paiement2, cartenum, "com") == "false") {
            alert("Verifier vos informations bancaires");
            return 0;
        }
    }
    else {
        alert("Sélectionner une carte");
        return 0;
    }
    h_d = heure_debut.substr(0, 5);
    h_f = heure_debut.substr(6, 5);

    $.post("http://"+adresseServeur+"/services/recuperer_medecin.php", {
        sexe: window.localStorage.getItem("choixsexe")
                                                , code: window.localStorage.getItem("choixcode")
                                                , h_debut: h_d
                                                , h_fin: h_f
                                                , jour: date

    },
                        function (data) {
                            var prac = data.item;
                            window.localStorage.setItem("id_practicien", prac.id_practicien);
                            window.localStorage.setItem("mail_practicien", prac.email);
window.localStorage.setItem("id_agenda", prac.id);

                            $.post("http://"+adresseServeur+"/services/recuperer_adresse.php", {
                                id_client:
                                                 window.localStorage.getItem("id_client")
											 , adresse: adr1
                            },
					function (data) {
   var prac = data.item;
					    var ChAdresse = prac.adresse.toString() + "\n ville :" + prac.ville.toString() + "\n etage :"
							+ prac.etage.toString() + " " + prac.droite.toString() + "\n" + prac.info.toString();
					    window.localStorage.setItem("adresse_client", ChAdresse);
$.post("http://"+adresseServeur+"/services/ajout_commande.php", {
					        id_client: window.localStorage.getItem("id_client")
														, id_practicien: window.localStorage.getItem("id_practicien")
														, date: date
														, duree: duree
														, tarif: parseInt(paiement)
														, evaluation: parseInt("0")
														, adresseclient: window.localStorage.getItem("adresse_client")
														, numtel: window.localStorage.getItem("tel_client")
														, montantprestation: paiement
														, h_debut: h_d
														, nom: window.localStorage.getItem("nom_client")
														, mail_praticien: window.localStorage.getItem("mail_practicien")
														, mail_client: window.localStorage.getItem("mail_client")
														, id_agenda: window.localStorage.getItem("id_agenda")
														, h_fin: h_f
					    }, function (data) {

					        if (data == "true") {
					            $.mobile.changePage("#validation_commande", { transition: "slide", changeHash: false });

					        }
					    }, "html");
					}
					, "json");

                        }
                        , "json");

}

$('#forfait').bind('pageshow', function (event) {

    $('#list_forfait').selectmenu('refresh', true);
    $('#list_forfait').empty();
    $('#list_forfait').append('<option value="0" selected="selected">Choisir un forfait</option>');
    $('#list_forfait').append('<option value="100" >100 </option>');
    $('#list_forfait').append('<option value="250" >250 </option>');
    $('#list_forfait').append('<option value="500" >500 </option>');

    $('#list_forfait').selectmenu('refresh', true);
    var posting1 = $.post("http://"+adresseServeur+"/services/afficher_carte.php"
                            , { id_client: window.localStorage.getItem("id_client") },
                        function (data) {

                            $('#list_car_forfait').empty();
                            $('#list_car_forfait').append('<option value="0">Choisir une carte</option>');
                            cartes = data.items;
                            $.each(cartes, function (index, carte) {
                                var test = carte.num + "";

                                $('#list_car_forfait').append('<option value="' + carte.id + '">' + rc4(key, test) + '</option>');

                            });

                            $('#list_car_forfait').append('<option value="ajouter une carte" >ajouter une carte</option>');
                            $('#list_car_forfait').selectmenu('refresh', true);

                        }
                        , "json");
});

$('#list_dispo').change(function () {
    var paiement;
    var duree = $("input[name=radio-choice-2]:checked").attr("value");
    var heure_debut = $('#list_dispo option:selected').text();
    if (heure_debut != "plages horaires disponibles" && heure_debut != "") {
        h_debut = heure_debut.substr(0, 2)


        if (parseInt(h_debut) < 22) {
            if (duree == "1")
                paiement = 100;
            else if (duree == "1.5")
                paiement = 140;
            else if (duree == "2")
                paiement = 180;

        }


        else {
            if (duree == "1")
                paiement = 120;
            else if (duree == "1.5")
                paiement = 160;
            else if (duree == "2")
                paiement = 200;

        }

    }
    else { alert("Veuillez selectionner la plage horaire de la séance"); }
    var ch = "Valider le paiement de " + paiement + "€";
    $("#boutonReservation").attr('value', ch).button("refresh");
});
$('#Olist_dispo').change(function () {
    var paiement;
    var duree = $("input[name=radio-choice-3]:checked").attr("value");
    var heure_debut = $('#Olist_dispo option:selected').text();
    if (heure_debut != "plages horaires disponibles" && heure_debut != "") {
        h_debut = heure_debut.substr(0, 2);
        if (parseInt(h_debut) < 20) {
            if (duree == "1")
                paiement = 120;
            else if (duree == "1.5")
                paiement = 150;
}

        else {
            if (duree == "1")
                paiement = 150;
            else if (duree == "1.5")
                paiement = 180;
        }
    }
    else { alert("Veuillez selectionner la plage horaire de la séance"); }
    var ch = "Valider le paiement de " + paiement + "€";
    $("#boutonOsteo").attr('value', ch).button("refresh");
});

$('#list_car_forfait').change(function () {

    var val = $(this).val();
    if (val == 'ajouter une carte') {
        $.mobile.changePage("#ajouter_carte", { transition: "slide", reverse: false });
    }

});


function paiement_forfait() {

    var forfait = $('#list_forfait option:selected').val();
    var cartenum = $('#list_car_forfait option:selected').text();

    if (forfait == 0) {
        alert("Veuillez choisir un forfait");
        return 0;
    }
    if (cartenum == "Choisir une carte") {
        alert("Veuillez choisir une catre bancaire");
        return 0;
    }
    var paiement = parseInt(forfait) * 100;
    if (payer(paiement, cartenum, "for") == "false") {
        alert("Verifier vos informations bancaires");
        return 0;

    }
    var posting = $.post("http://"+adresseServeur+"/services/acheter_forfait.php"
, {
    id_client: window.localStorage.getItem("id_client"),
    forfait: forfait
})
}



function passerAide() {
    aide = true;
    $.mobile.changePage("#home1", { transition: "slide", changeHash: true });

}
function payer(soldeapayer, numcarte, type) {
    $.post("http://"+adresseServeur+"/services/recuperer_carte.php", {
        num: rc4(key, numcarte)
                        , id: window.localStorage.getItem("id_client")
    },
function (data) {
    var prac = data.item;
    window.localStorage.setItem("ED", prac.mois + "/" + prac.annee.substr(2, 2));
 window.localStorage.setItem("CVV", rc4(key, prac.cvv));
 $.post("http://"+adresseServeur+"/services/recuperer_orderid.php", {
    },
function (data) {

    var prac = data.item;
    window.localStorage.setItem("orderid", parseInt(prac.maxid) + type);
    $.post("http://"+adresseServeur+"/services/paiement.php", {
        montant: soldeapayer, orderid: window.localStorage.getItem("orderid"),
        mail: window.localStorage.getItem("mail_client"), nom: window.localStorage.getItem("nom_client"),
        cvv: window.localStorage.getItem("CVV"), ed: window.localStorage.getItem("ED"),
        carte: numcarte
    }, function (data) {
        if (data.indexOf("STATUS=\"9\"") > 0) {
            return "true";
        }
        else {
            return "false";
        }


    }, "html");
 
}
, "json");

}
, "json");
}
function deconnexion() {
    window.localStorage.clear();
    $.mobile.changePage("#home1", { transition: "slide", reverse: false });
    $('#form_modifier_info').find(':input').each(function () {
        switch (this.type) {
            case 'password': $(this).val("");
            case 'select-multiple': $(this).val("");
            case 'select-one': $(this).val("");
            case 'text': $(this).val("");
            case 'textarea':
                $(this).val("");
                break;
            case 'checkbox':
            case 'radio':
                this.checked = false;
        }
    });
    $('#form_ajouter_carte').find(':input').each(function () {
        switch (this.type) {
            case 'password': $(this).val("");
            case 'select-multiple': $(this).val("");
            case 'select-one': $(this).val("");
            case 'text': $(this).val("");
            case 'textarea':
                $(this).val("");
                break;
            case 'checkbox':
            case 'radio':
                this.checked = false;
        }
    });
    $('#form_cration1').find(':input').each(function () {
        switch (this.type) {
            case 'password': $(this).val("");
            case 'select-multiple': $(this).val("");
            case 'select-one': $(this).val("");
            case 'text': $(this).val("");
            case 'textarea':
                $(this).val("");
                break;
            case 'checkbox':
            case 'radio':
                this.checked = false;
        }
    });
    $('#form_cration2').find(':input').each(function () {
        switch (this.type) {
            case 'password': $(this).val("");
            case 'select-multiple': $(this).val("");
            case 'select-one': $(this).val("");
            case 'text': $(this).val("");
            case 'textarea':
                $(this).val("");
                break;
            case 'checkbox':
            case 'radio':
                this.checked = false;
        }
    });
    $('#form_cration3').find(':input').each(function () {
        switch (this.type) {
            case 'password': $(this).val("");
            case 'select-multiple': $(this).val("");
            case 'select-one': $(this).val("");
            case 'text': $(this).val("");
            case 'textarea':
                $(this).val("");
                break;
            case 'checkbox':
            case 'radio':
                this.checked = false;
        }
    });
    $('#form_connexion').find(':input').each(function () {
        switch (this.type) {
            case 'password': $(this).val("");
            case 'select-multiple': $(this).val("");
            case 'select-one': $(this).val("");
            case 'text': $(this).val("");
            case 'textarea':
                $(this).val("");
                break;
            case 'checkbox':
            case 'radio':
                this.checked = false;
        }
    });
    $('#form_changer_mdp').find(':input').each(function () {
        switch (this.type) {
            case 'password': $(this).val("");
            case 'select-multiple': $(this).val("");
            case 'select-one': $(this).val("");
            case 'text': $(this).val("");
            case 'textarea':
                $(this).val("");
                break;
            case 'checkbox':
            case 'radio':
                this.checked = false;
        }
    });
}

$('#validation_commande').bind('pageshow', function (event) {

    $.post("http://"+adresseServeur+"/services/parrinage.php", {
        id_client: window.localStorage.getItem("id_client")
    });

});