
// Bind the swiperightHandler callback function to the swipe event on div.box
/* $( document ).on( 'swiperight',"#cont1", function() {
           $.mobile.changePage( "index1.html", { transition: "slide", reverse: true } );
       } );
       */
var adresseServeur = "www.mo-paris.fr";
/////////////

						 $.mobile.page.prototype.options.addBackBtn = "True";
						 $.mobile.page.prototype.options.backBtnText = "Retour";
						 
 
						 $.ajaxSetup({
   beforeSend: function() {
    $.mobile.showPageLoadingMsg();
	
  },
   complete: function() {
    $.mobile.hidePageLoadingMsg();
	
  }
});
					
////////////////////////////////
var origineMassage=true;
var aide=false;
var note=0;	
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
function testpassage()
{
alert("heeere");
alert (dateDeReservation);
//alert(minDispo);
 
	var  tmp=minDispo.toString().split(" ");
 minDispo=tmp[4];
 //alert(minDispo);
 //alert(maxDispo);
 var tmp1=maxDispo.toString().split(" ");
 maxDispo=tmp1[4];
//alert(maxDispo );
////important
//jQuery('#heure').timepicker({ 'timeFormat': 'H:i ' , 'step':30,'minTime': minDispo,'maxTime': maxDispo});
if (origineMassage){
jQuery("input[name=jourReservation]").attr("value",dateDeReservation);
 $.mobile.changePage("#reservation", { transition: "slide"});
 }else {
 jQuery("input[name=jourReservationO]").attr("value",dateDeReservation);
 $.mobile.changePage("#reservationOsteo", { transition: "slide"});
 }

}

 jQuery(document).ready(function ($) {
 //jQuery( document ).on( "pagecreate", "#voircalendar", function() { // jQuery(document).ready(function ($) { //$( document ).bind( 'mobileinit', function(){ 
 /*  $.mobile.loader.prototype.options.text = "loading";
  $.mobile.loader.prototype.options.textVisible = true;
  $.mobile.loader.prototype.options.theme = "d";
  $.mobile.loader.prototype.options.html = "";*/
  
  
 //jQuery( document ).on( "pagecreate", "#voircalendar", function() {
       
 //$('#timepickerboot').timepicker({ 'timeFormat': 'h:i A' });
  /*  $('#heureDebut').ptTimeSelect();
    $('#heureFin').ptTimeSelect();
*/
 $('#heureDebut').timepicker({ 'timeFormat': 'H:i ' , 'step':30});
    $('#heureFin').timepicker({ 'timeFormat': 'H:i ','step':30 });

    /*
        function displayMessage(message) {
          $('#message').html(message).fadeIn();
        }
    */
    //$('<div id="message" class="ui-corner-all"></div>').prependTo($('body'));
	
	 var srcIn='images/star_in.png'; //image au survol
  var srcOut='images/star_out.png'; // image non survolée

  // Obtenir id numérique des étoiles au format star_numero
  function idNum(id)
  {
    var id=id.split('_');
    var id=id[1];
    return id;
  }

  // Survol des étoiles
  $('.star').hover(function(){
    var id=idNum($(this).attr('id')); // id numérique de l'étoile survolée
    var nbStars=$('.star').length; // Nombre d'étoiles de la classe .star
    var i; // Variable d'incrémentation
    for (i=1;i<=nbStars;i++)
    {
      if(i<=id) $('#star_'+i).attr({src:srcIn});	
      else if(i>id) $('#star_'+i).attr({src:srcOut});
      if(i==id) note=i;//$('#note').attr({value:i}); // affectation de la note au formulaire
    }
  },function(){});

});

///////////////////////////////////
$("#voircalendarC").on('swipeleft', function () {
  
    jQuery('#calendar').weekCalendar("next");
});
$("#voircalendarC").on('swiperight', function () {
    jQuery('#calendar').weekCalendar("prev");
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



	  
 function envoi(){
 
 
 
 
$("#form_cration1").validate({
      rules: {
         nom:{
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
 
 
if  ($("#form_cration1").valid())
   {
 
 
 
 
    var Nom = $("input[name=nom]").attr("value");
    var Prenom = $("input[name=prenom]").attr("value");
	var Ville =$('#ville option').filter(':selected').text();
	var Civilite =$('#civilite option').filter(':selected').text();
	var Tel = $("input[name=tel]").attr("value");
	var  Mdp= $("input[name=mdp]").attr("value");
	var Confirm = $("input[name=confirmation_mdp]").attr("value");
	var  Code_parrain= $("input[name=code_parrain]").attr("value");
		 
	
	
	
   if (Mdp!=Confirm) {
       alert("Veillez vérifier le mot de passe") ;
}	   
	
	
else{
	
	var storage = window.localStorage;
 
	window.localStorage.setItem("nom", Nom);
	window.localStorage.setItem("prenom", Prenom);
	window.localStorage.setItem("ville", Ville);
	window.localStorage.setItem("civilite", Civilite);
	window.localStorage.setItem("tel", Tel);
	window.localStorage.setItem("mdp", Mdp);
	window.localStorage.setItem("code_parrain",Code_parrain);
	//alert ( window.localStorage.getItem("nom"));
	
	$.mobile.changePage( "#creation2", { transition: "slide", changeHash: true });

	}  }
	
}
	
	function envoi1(){
	
	$("#form_cration2").validate({
      rules: {
         mail:{
            "required": true,
             "email": true
         },
         adresse: {
            "required": true
         }, 
		 
		etage: {
            
			"digits": true,
			  "maxlength":3
			  
         }
		 
		 
		 
  }
});
	
	
    var Mail = $("input[name=mail]").attr("value");
    var Adresse = $("input[name=adresse]").attr("value");
	//var Etage =$('#ville option').filter(':selected').text();
	//var Civilite =$('#civilite option').filter(':selected').text();
	var Etage = $("input[name=etage]").attr("value");
	var D_g=$('#d_g option').filter(':selected').text();
	var  Info= $("input[name=info]").attr("value");
	//var Confirm = $("input[name=confirmation_mdp]").attr("value");
	//var  Code_parrain= $("input[name=code_parrain]").attr("value");
	var Contact=$("#contact").attr("checked");
       if (Contact=="checked" ) {Contact=1;}
        else {Contact=0;	}
		
		if (D_g=="Droite" ) {D_g=1;}
        else {D_g=0;	}
		
	//alert(Mail+Adresse+Etage+Info);
	//alert(Contact);
	
	
	
	
	
	//var storage = window.localStorage;
 if ($("#form_cration2").valid())
	{
	window.localStorage.setItem("mail", Mail);
	window.localStorage.setItem("adresse", Adresse);
	window.localStorage.setItem("etage", Etage);
	window.localStorage.setItem("d_g", D_g);
	window.localStorage.setItem("info", Info);
	window.localStorage.setItem("contact", Contact);
	
	
	
	
	
	//alert ( window.localStorage.getItem("mail")+window.localStorage.getItem("adresse")+window.localStorage.getItem("etage")+window.localStorage.getItem("d_g")+window.localStorage.getItem("info")+window.localStorage.getItem("contact"));
	
	
	
	
	
	
	
	
	
	
	$.mobile.changePage( "#creation3", { transition: "slide", changeHash: true });

	}
	}
	
	
	function envoi2(){
	
	
	
	$("#form_cration3").validate({
      rules: {
         carte:{
            "creditcard": true
             
         },
         cvv: {
		     "digits": true,
             "maxlength":3,
			  "minlength":3
         }
		 
		 
  }
});
	
	
	
	
	
    var Carte = $("input[name=carte]").attr("value");
    //var MMAA = $("input[name=mmaa]").attr("value");
	//var Etage =$('#ville option').filter(':selected').text();
	//var Civilite =$('#civilite option').filter(':selected').text();
	var Mois =$('#mois option').filter(':selected').text();
	var Annee =$('#annee option').filter(':selected').text();
	var CVV = $("input[name=cvv]").attr("value");
	var  CodeCadeau= $("input[name=code_cadeau]").attr("value");
	 
	//alert(Carte+MMAA+CVV+CodeCadeau);
	
	
	//var storage = window.localStorage;
  if ($("#form_cration3").valid())
	{
	
	if ( (Carte=="" && CVV =="") ||(Carte!="" && CVV !="") )
	{
	window.localStorage.setItem("carte",Carte);
	window.localStorage.setItem("mois", Mois);
	window.localStorage.setItem("annee", Annee);
	window.localStorage.setItem("cvv", CVV);
	window.localStorage.setItem("code_cadeau", CodeCadeau );
	
	//alert ( window.localStorage.getItem("carte")+ window.localStorage.getItem("mois")+ window.localStorage.getItem("annee")+ window.localStorage.getItem("cvv")+window.localStorage.getItem("code_cadeau"));
	
	
	
	
	$.mobile.changePage( "#home1", { transition: "slide", changeHash:false});

	$.post( "http://"+adresseServeur+"/services/inscription.php", { civilite: window.localStorage.getItem("civilite")
														,nom: window.localStorage.getItem("nom")
														, prenom: window.localStorage.getItem("prenom")
														, tel: window.localStorage.getItem("tel")
														, mdp: window.localStorage.getItem("mdp")
														, mail: window.localStorage.getItem("mail")
														, code: window.localStorage.getItem("code_parrain")
														, contact: window.localStorage.getItem("contact")
														
														,adresse: window.localStorage.getItem("adresse")
														,ville: window.localStorage.getItem("ville")
														,etage: window.localStorage.getItem("etage")
														,d_g: window.localStorage.getItem("d_g")
														,info: window.localStorage.getItem("info")
														
														
														,carte: window.localStorage.getItem("carte")
														,mois: window.localStorage.getItem("mois")
														,annee: window.localStorage.getItem("annee")
														,cvv: window.localStorage.getItem("cvv")
														,code_cadeau: window.localStorage.getItem("code_cadeau")
														
														} );
	}
	
	else alert(" données bancaires incomplètes");
	}
	
	}
	/*$(function(){
	$("#dialog").dialog(
	{ autoOpen :false,
	modal: true,
	position: "center"
	});
	
	});*/
	function directementAide()
	{
	if(aide==true){
	
	$.mobile.changePage( "#accueil", { transition: "slide", changeHash: true });				
	}else
	{
	
	$.mobile.changePage( "#connexion", { transition: "slide", changeHash: false });				
	}
	}
function connecterClient() {
    var email = $("input[name=e-mail]").attr("value");
    var mdp2 = $("input[name=mdp2]").attr("value");
    window.localStorage.setItem("mail", email);
    window.localStorage.setItem("mdpaverifier", mdp2);
    //alert(window.localStorage.getItem("mail"));
		//$.mobile.showPageLoadingMsg();
  var jqxhr = $.post("http://"+adresseServeur+"/services/connecter.php", { mail: window.localStorage.getItem("mail"), mdpa: window.localStorage.getItem("mdpaverifier") }, function (data,status) {
        // motdepasse=data.item;
        // alert(data);
        // console.log(motdepasse);
        //alert(data);
		
        if (data.indexOf("true") == 0) {

            var idforsession = data.split("#");
            if (idforsession[1] == "med") {
                window.localStorage.setItem("idmed", idforsession[2]);
               // alert(window.localStorage.getItem("idmed"));
                $.mobile.changePage("#accueilMedecin", { transition: "slide", changeHash: true });

            } else if (idforsession[1] == "client") {
		
                window.localStorage.setItem("id_client", idforsession[2]);
				window.localStorage.setItem("fidelite", idforsession[3]);
				//alert(idforsession[4]);
					if(idforsession[4]=="Anoter"){
					  window.localStorage.setItem("idcommande", idforsession[5]);
              
				    $.mobile.changePage("#avis1", { transition: "slide", changeHash: true });

					}
					else{
   			  
                $.mobile.changePage("#accueil", { transition: "slide", changeHash: true });
			}

            }
        }
        else if (data == "false") {
         
            alert("Mot de passe incorrecte");

           
          
        }
        else {
		
           alert("erreur de connexion ");

        }
//$.mobile.hidePageLoadingMsg();

      
    });
}
function oublier() {
    var email = $("input[name=e-mail]").attr("value");
    window.localStorage.setItem("mail", email);
			
    $.post("http://"+adresseServeur+"/services/oublier.php", { mail: window.localStorage.getItem("mail") }, function (data) {
        // motdepasse=data.item;
        //alert(data);
        // console.log(motdepasse);
        if (data=="true") {
            // alert("un email contenant votre mot de passe vient de vous être envoyé  ");
          alert("un email contenant votre mot de passe vient de vous être envoyé ");

            
        }
        else if (data=="false") {
            //alert("votre login n'existe pas essayer une autre adresse mail");
          alert("Verifier le mail que vous avez introduit");

          
        }else{
		 alert("Erreur de connexion veuillez reessayer");

		}
       
        //console.log(motdepasse.mdp);
        /* $.each(motdepasse,function(index,mot)
         {
         alert(mot.mdp);
         });
        //
        */
		
    }, "html");
}
function decrireMO() {
    $.mobile.changePage("#choisirdescription", { transition: "slide", changeHash: true });

}
function monCompte() {
    $.mobile.changePage("#AccueilClient", { transition: "slide", changeHash: true });
}
function tarif() {
    $.mobile.changePage("#AccueilClient", { transition: "slide", changeHash: true });

}
function MassageBienEtre() {
    $.mobile.changePage("#MassageBienEtre", { transition: "slide", changeHash: true });

}
function osteopathie() {
    $.mobile.changePage("#MassageOsteo", { transition: "slide", changeHash: true });

}
function telephoner() {
    //	$.mobile.changePage("#AccueilClient", { transition: "slide", changeHash: true });

}
function envoyerMail() {
    $.mobile.changePage("#AccueilClient", { transition: "slide", changeHash: true });

}
function MassageBien1() {
	var choixsexe = $("input[name=radio-choice-1]:checked").attr("value");
	var choixcode = $("input[name=practicienH]").attr("value");
			

	    $.post("http://"+adresseServeur+"/services/variableDechoix.php", { fidelite: window.localStorage.getItem("fidelite"),sexe: choixsexe, code: choixcode }, function (data) {
 jQuery('#calendar').weekCalendar("refresh");

		 }, "html");
	origineMassage=true;
	 $.mobile.changePage("#voircalendar", { transition: "slide", changeHash: true });


}
function MassageOsteo1() {
//practicienH2

	var choixcode2 = $("input[name=practicienH2]").attr("value");
	    		

      $.post("http://"+adresseServeur+"/services/variableDechoix.php", { fidelite: window.localStorage.getItem("fidelite"), code: choixcode2 }, function (data) {
 jQuery('#calendar').weekCalendar("refresh");

		 }, "html");
	origineMassage=false;
	 $.mobile.changePage("#voircalendar", { transition: "slide", changeHash: true });

}
/*function passeracalendar()
{
$.mobile.changePage("#disponibilite", { transition: "slide", changeHash: true });
}*/
function testtest() {
    $.mobile.changePage("#accueilMedecin", { transition: "slide", changeHash: true });

}
/*
function voircalendar()

{
var posting = $.post( "http://"+adresseServeur+"/services/calendrier.php"
, { id_client: window.localStorage.getItem("id_client")  },
        
function(data) {
disponibilite = data.items;

    $.each(disponibilite, function(index, dsp){


    });

    
}
,"json");
// jQuery('#calendar').weekCalendar('refresh');

$.mobile.changePage("#voircalendar", { transition: "slide", changeHash: true });
}*/
function ajoutdispo() {
    var dateprac = $("input[name=datemedecin]").attr("value");
    var heureDebut = $("input[name=heureDebut]").attr("value");
     var heureFin = $("input[name=heureFin]").attr("value");
   var Hd=heureDebut;
   var Hf=heureFin;
   if (Hf>Hd)
   {
   var tmpduree1=heureDebut.split(":");
	  var nb = parseFloat(tmpduree1[0]);
	  if(tmpduree1[1]==30){
	  nb=nb+0.5;
	  }
	   var tmpduree2=heureFin.split(":");
	  var nb2 = parseFloat(tmpduree2[0]);
	  if(tmpduree2[1]==30){
	  nb2=nb2+0.5;
	  }
	  var dureeDispo= nb2-nb;
	  alert("duree=" + dureeDispo);
	  
	//var Hdeb = heureDebut.split(" ");
	 heureDebut = dateprac + "T" + heureDebut;
	    heureFin = dateprac + "T" + heureFin;
  
/* traitement pour le ptimepicker plus stylee
    if (Hdeb[1] == "PM") {

        var prov = Hdeb[0].split(":");
        var nb = parseInt(prov[0]);
        nb = nb + 12;
        heureDebut = dateprac + "T" + nb + ":" + prov[1];
        alert(heureDebut);
    }
    else {
        heureDebut = dateprac + "T0" + Hdeb[0];
    }

    var heureFin = $("input[name=heureFin]").attr("value");
    var Hfin = heureFin.split(" ");
    if (Hfin[1] == "PM") {
        var prov = Hfin[0].split(":");
        var nb = parseInt(prov[0]);
        nb = nb + 12;
        heureFin = dateprac + "T" + nb + ":" + prov[1];
        alert(heureFin);
    } else {
        heureFin = dateprac + "T0" + Hfin[0];
    }
*/
    alert("final  " + dateprac + heureDebut + heureFin + window.localStorage.getItem("idmed"));
    //alert($dateprac);
			

			 
        
   var posting1= $.post("http://"+adresseServeur+"/services/ajoutdispo.php", { dureedispMed: dureeDispo,datep: dateprac, Hdebut: heureDebut, Hfin: heureFin,Hdeb2: Hd, Hfin2: Hf, idmed: window.localStorage.getItem("idmed") }, function (data) {
        // motdepasse=data.item;
        //alert(data);
        // console.log(motdepasse);
					
					
						
// traitement principal!!!!!!!!!!!!!

        if (data == "true") {
            alert("ajout de disponibilite reussi");
        }
        else {
            alert("erreur de connexion");
        }


    },"html");
	
	
	}else {
	alert("heure debut < heure de fin");
	}
}



		
		
		function ajout_adresse(){
    
	$("#form_ajout_adresse").validate({
      rules: {
         adresse_ajout: {
            "required": true
         }, 
		 
		etage_ajout: {
            
			"digits": true,
			  "maxlength":3
			  
         }
		 
         }		 
  
});
	
	
	
    var Adresse_ajout = $("input[name=adresse_ajout]").attr("value");
	var Etage_ajout = $("input[name=etage_ajout]").attr("value");
	var D_g_ajout=$('#d_g_ajout option').filter(':selected').text();
	var  Info_ajout= $("input[name=info_ajout]").attr("value");

		if (D_g_ajout=="Droite" ) {D_g_ajout=1;}
        else {D_g_ajout=0;	}
		
	  // alert(Adresse_ajout+Etage_ajout+Info_ajout+D_g_ajout);
	   //alert();
	
	if ($("#form_ajout_adresse").valid())
	{

	window.localStorage.setItem("adresse_ajout", Adresse_ajout);
	window.localStorage.setItem("etage_ajout", Etage_ajout);
	window.localStorage.setItem("d_g_ajout", D_g_ajout);
	window.localStorage.setItem("info_ajout", Info_ajout);	
	
//	alert ( window.localStorage.getItem("adresse_ajout")+ window.localStorage.getItem("etage_ajout") + window.localStorage.getItem("d_g_ajout")+window.localStorage.getItem("info_ajout"));
			

	$.post( "http://"+adresseServeur+"/services/ajout_adresse.php", { id_client: window.localStorage.getItem("id_client")
														
														,adresse: window.localStorage.getItem("adresse_ajout")
														,etage: window.localStorage.getItem("etage_ajout")
														,d_g: window.localStorage.getItem("d_g_ajout")
														,info: window.localStorage.getItem("info_ajout")},
														
														function(){
														
														$.mobile.changePage( "#mon_compte", { transition: "slide", changeHash: true })
														}
														
														
														,"html" );
	
	alert("Adresse ajoutée!");
	$.mobile.changePage( "#mon_compte", { transition: "slide", changeHash: true });

	}
	}
	



	
	//$('#employeeListPage').bind('pageinit', function(event) {
function supprimer(){
		
var posting = $.post( "http://"+adresseServeur+"/services/afficher_adresse.php"
					, { id_client: window.localStorage.getItem("id_client")  },
							
					function(data) {
						$('#listadresse li').remove();
						addresses = data.items;
						$.each(addresses, function(index, adr){
		
					
							$('#listadresse').append('<li><a onClick="test('+adr.id+')">' +
					
							'<h4>' + adr.adresse + '</h4>' +
							'<p>' + adr.etage + '</p>' +
							'<span class="ui-li-count">' + "Supprimer" + '</span></a></li>');	
				
					
						});
						$('#listadresse').listview('refresh');
						

					}
					,"json");
}	
		
		
		
		
	function test(id)
		
		{
				

		$.post( "http://"+adresseServeur+"/services/supprimer_adresse.php", { id_adresse: id}, 
		     function () {var posting = $.post( "http://"+adresseServeur+"/services/afficher_adresse.php", { id_client: window.localStorage.getItem("id_client")  },
							
					              function(data) {
									$('#listadresse li').remove();
									employees = data.items;
									$.each(employees, function(index, employee){
									$('#listadresse').append('<li><a onClick="test('+employee.id+')">' +
									'<h4>' + employee.adresse + '</h4>' +
									'<p>' + employee.etage + '</p>' +
									'<span class="ui-li-count">' + "Supprimer" + '</span></a></li>');		
									});
									$('#listadresse').listview('refresh');
									

									}
							,"json");
						}
						
		, "html" );
		
	}

		
		
// $('#credit_dis').bind('pageinit',
$('#credit_dis').bind('pageshow', function(event) {
		$('#bouton_credit').text( "");
	var posting = $.post( "http://"+adresseServeur+"/services/afficher_credit.php"
					, { id_client: window.localStorage.getItem("id_client")  },
							
					function(data) {
					
					var employee = data.item;
					//$('#bouton_code').attr('value', employee.mail).button("refresh");
						$('#bouton_credit').text( employee.credit);
						

						
						
					}
					,"json")
/*	.fail(function() {
    alert( "Erreur connexion \n " );
  })
  .always(function() {
    $.mobile.showPageLoadingMsg();
	//alert("before");
  })
  .done(function() {
    $.mobile.hidePageLoadingMsg();
	//alert("after");
  })
 */ 
  ;

 }
 
 );
 
$('#modifier_info').bind('pageshow', function(event) {
		
	var posting = $.post( "http://"+adresseServeur+"/services/ancien_info.php"
					, { id_client: window.localStorage.getItem("id_client")  },
							
					function(data) {
					
					var employee = data.item;
					//alert("jjglj");
					//$('#nom_mod').text(employee.nom);
					$('#nom_mod').attr('value', employee.nom);
					$('#prenom_mod').attr('value', employee.prenom);
					$('#tel_mod').attr('value', employee.tel);
					$('#mail_mod').attr('value', employee.mail);	
				

					}
					,"json");
 });
 function modifier(){
 
 
 $("#form_modifier_info").validate({
      rules: {
         mail_mod:{
            "required": true,
             "email": true
         },
         prenom_mod: {
            "required": true,
			"minlength":3
         }, 
		 
		nom_mod: {
            
			"required": true,
			  "minlength":3
			  
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
		 	
	
    
	
	if ($("#form_modifier_info").valid())
	{
	var storage = window.localStorage;
 
	window.localStorage.setItem("nom_mod", Nom);
	window.localStorage.setItem("prenom_mod", Prenom);
	window.localStorage.setItem("mail_mod", Mail);
	window.localStorage.setItem("tel_mod", Tel);
	
	//alert ( window.localStorage.getItem("nom"));
	//$.mobile.changePage( "#creation2", { transition: "slide", changeHash: false })
 		
 $.post( "http://"+adresseServeur+"/services/modifier_info.php", { id_client: window.localStorage.getItem("id_client")
														
											,nom: window.localStorage.getItem("nom_mod")
														, prenom: window.localStorage.getItem("prenom_mod")
														, tel: window.localStorage.getItem("tel_mod")
														, mail: window.localStorage.getItem("mail_mod")			

														} );
	
alert("informations modifiées");													
}														
}


$('#code_parrinage').bind('pageshow', function(event) {
		

	var posting = $.post( "http://"+adresseServeur+"/services/code_parrain.php"
					, { id_client: window.localStorage.getItem("id_client")  },
							
					function(data) {
					
					var employee = data.item;
					//$('#bouton_code').attr('value', employee.mail).button("refresh");
						$('#bouton_code').text( employee.mail);
						

						
						
					}
					,"json");
 });
 
 
function modifier_mdp(){
 
 var Ancien = $("input[name=ancien_mdp]").attr("value");
    var Nouveau = $("input[name=nouveau_mdp]").attr("value");
	var Confirmation = $("input[name=confirmation_nouveau_mdp]").attr("value");
 
 
 if (Nouveau!=Confirmation) {
       alert("verifier la confirmation du mot de passe") ;
}
 
 
 else
		{
					window.localStorage.setItem("ancien", Ancien);
					window.localStorage.setItem("nouveau", Nouveau);
					
					
							
				$.post( "http://"+adresseServeur+"/services/modifier_mdp.php", { id_client: window.localStorage.getItem("id_client")
														
											,ancien: window.localStorage.getItem("ancien")
														, nouveau: window.localStorage.getItem("nouveau")
														
																	
														
														}, function ( data ) {
                            // motdepasse=data.item;
                            //alert(data);
                            // console.log(motdepasse);
						

                            if (data=="true")
                            {
							alert("vous avez changer le mot depasse");
                            }
                            else if (data=="false")
                            {
                                alert("ancien mot de passe incorrecte");
                            }
							else
							{
							 alert("erreur introduite ressayer");
							}
		
                            //alert(motdepasse.mdp);
                            //console.log(motdepasse.mdp);
                            /* $.each(motdepasse,function(index,mot)
                             {
                             alert(mot.mdp);
                             });
                            //
                            */
                        }, "html" );
 
 
 
		}
 
 
 
 
 
 
 
 }
 
 
 
 
		
		function ajout_carte(){
    
	
	$("#form_ajouter_carte").validate({
      rules: {
         carte_ajout:{
			"required": true,
            "creditcard": true
             
         },
         cvv_ajout: {
		     "required": true,
		     "digits": true,
             "maxlength":3,
			  "minlength":3
         }
		 
		 
  }
});
	
	
	
	
	
	
    var Carte_ajout = $("input[name=carte_ajout]").attr("value");
	var Mois_ajout =$('#mois_ajout option').filter(':selected').text();
	var Annee_ajout =$('#annee_ajout option').filter(':selected').text();
	var CVV_ajout = $("input[name=cvv_ajout]").attr("value");

	
	 if ($("#form_ajouter_carte").valid())
	{
		window.localStorage.setItem("carte_ajout",Carte_ajout);
	window.localStorage.setItem("mois_ajout", Mois_ajout);
	window.localStorage.setItem("annee_ajout", Annee_ajout);
	window.localStorage.setItem("cvv_ajout", CVV_ajout);

//	alert ( window.localStorage.getItem("carte_ajout")+ window.localStorage.getItem("mois_ajout")+ window.localStorage.getItem("annee_ajout")+ window.localStorage.getItem("cvv_ajout"));
	
	
	
//	alert ( window.localStorage.getItem("adresse_ajout")+ window.localStorage.getItem("etage_ajout") + window.localStorage.getItem("d_g_ajout")+window.localStorage.getItem("info_ajout"));
			

	$.post( "http://"+adresseServeur+"/services/ajout_carte.php", { id_client: window.localStorage.getItem("id_client")
														
														,carte: window.localStorage.getItem("carte_ajout")
														,mois: window.localStorage.getItem("mois_ajout")
														,annee: window.localStorage.getItem("annee_ajout")
														,cvv: window.localStorage.getItem("cvv_ajout")},
														
														function(){
														
														$.mobile.changePage( "#mes_cartes", { transition: "slide", changeHash: true })
														}
														
														
														,"html" );
	alert("Carte ajoutée");
	//$.mobile.changePage( "#creation3", { transition: "slide", changeHash: false });
}
	
	}
	
	function supprimer_carte(){
			
var posting = $.post( "http://"+adresseServeur+"/services/afficher_carte.php"
					, { id_client: window.localStorage.getItem("id_client")  },
							
					function(data) {
						$('#listcarte li').remove();
						addresses = data.items;
						$.each(addresses, function(index, adr){
		
					
							$('#listcarte').append('<li><a onClick="test1('+adr.id+')">' +
					
							'<h4>xxxxxxxxxxxx' +  adr.num.toString().substr(2,4) + '</h4>' +
							
							'<span class="ui-li-count">' + "Supprimer" + '</span></a></li>');	
				
					
						});
						$('#listcarte').listview('refresh');
						

					}
					,"json");
}	
		
		
		
		
	function test1(id)
		
		{
				

		$.post( "http://"+adresseServeur+"/services/supprimer_carte.php", { id_adresse: id}, 
		     function () {var posting = $.post( "http://"+adresseServeur+"/services/afficher_carte.php", { id_client: window.localStorage.getItem("id_client")  },
							
					              function(data) {
									$('#listcarte li').remove();
									employees = data.items;
									$.each(employees, function(index, employee){
									$('#listcarte').append('<li><a onClick="test('+employee.id+')">' +
									'<h4>xxxxxxxxxxxx' + employee.num.toString().substr(2,4) + '</h4>' +
								
									'<span class="ui-li-count">' + "Supprimer" + '</span></a></li>');		
									});
									$('#listcarte').listview('refresh');
								

									}
							,"json");
						}
						
		, "html" );
		
	}	
	
$('#offrir').bind('pageshow', function(event) {

     var posting1 = $.post( "http://"+adresseServeur+"/services/afficher_credit.php"
			, { id_client: window.localStorage.getItem("id_client")  },
			//, { id_client: 16  },	
			function(data) {
				var dispo = data.item;
				//$('#solde').attr('value', dispo.credit);
				//$('#solde').replaceWith(' <label id="solde" class="form_col" for="Adresse">    </label>  ');
				
				$('#solde').text("");
				$('#solde').append(  dispo.credit);
				window.localStorage.setItem("solde",dispo.credit);	
				}
			,"json");
						
					
});
	
function is_int(value){
  if((parseFloat(value) == parseInt(value)) && !isNaN(value)){ 
      //alert ('value est un integer');
      return true;
  } else {
      //alert ('value n');
      return false;
  }
}


function offrir(){

$("#form_offrir").validate({
      rules: {
        point_offrir :{
            "required": true,
             "digits": true
         },
         mail_ben: {
            "required": true,
			"email":true
         }		 
  }
});
	var mail_ben = $("input[name=mail_ben]").attr("value");
	var pts_offrir = $("input[name=point_offrir]").attr("value");

if ($("#form_offrir").valid())
	{	
	var posting1 = $.post( "http://"+adresseServeur+"/services/connaitre_mail.php"
		, { mail: mail_ben },	
		function(data) {
			var dispo = data.item;
			//alert(dispo.id);
			if (!is_int(dispo.id) )
				{ alert("mail invalide");}
			else  
			{ 
				//alert(  window.localStorage.getItem("solde"));
				//alert(pts_offrir);
				 if (parseInt(pts_offrir) > parseInt(window.localStorage.getItem("solde")))
					  {alert("solde insuffisant" );}
						   
			   else 
				   { var solde_offrant= parseInt(window.localStorage.getItem("solde")) - parseInt(pts_offrir);
					 var solde_ben=parseInt(dispo.credit)+ parseInt(pts_offrir); //dispo.credit + pts_offrir;
					//alert(solde_offrant);
						   
				     $.post( "http://"+adresseServeur+"/services/modifier_credit.php", { id_client: window.localStorage.getItem("id_client")
														           ,solde: solde_offrant			
														         } );	   	   
                    $.post( "http://"+adresseServeur+"/services/modifier_credit.php", { id_client: dispo.id
														           ,solde: solde_ben			
														         } );
									alert("Vous avez offert " +pts_offrir+" au client ayant l adresse "+mail_ben);							 
					window.localStorage.setItem("solde",solde_offrant);
					//$('#solde').replaceWith(' <label id="solde" class="form_col" for="Adresse">    </label>  ');
					$('#solde').text("");
				    $('#solde').append(  solde_offrant);								
							
				   }


		    }
		}
	,"json");
}}	
	
	
	
	$('#voircalendar').bind('pageshow', function(event) {

	    jQuery('#calendar').weekCalendar({
		use24Hour: true,
		timeFormat: 'H:i' ,
        readonly: true,
        timeslotsPerHour: 2,
        timeslotHeigh: 100,
        hourLine: true,
        daysToShow: 1,
        useShortDayNames: false,
        data: "http://"+adresseServeur+"/services/calendrier.php"/*function(id,start, end,title, callback) {
$.post( "http://"+adresseServeur+"/services/calendrier.php"
					, { id_client: window.localStorage.getItem("id_client")  },
							
					function(data) {
					disponibilite = data.items;
					id=1;
					start: new Date(year, month, day, 12);
     end:  new Date(year, month, day, 13);
	 title="test";
						$.each(disponibilite, function(index, dsp){
						
						});
					
						
					}
					,"json");
}*/,
        height: function ($calendar) {
            return $(window).height() - $('h1').outerHeight(true);
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
		    dateDeReservation=calEvent['title']; /* var prov = Hdeb[0].split(":");
        var nb = parseInt(prov[0]);
      */
	  minDispo=calEvent['start'];
	  maxDispo=calEvent['end'];
	 
			testpassage();
			       
           // displayMessage('<strong>Clicked Event</strong><br/>Start: ' + calEvent.start + '<br/>End: ' + calEvent.end);
        },
        eventMouseover: function (calEvent, $event) {
		 $event.css('backgroundColor', '#aaa');
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
	
$('#reservation').bind('pageshow', function(event) {
//alert("fdgfdg");


var posting = $.post( "http://"+adresseServeur+"/services/afficher_adresse.php"
					//, { id_client: window.localStorage.getItem("id_client")  },
						, { id_client: window.localStorage.getItem("id_client")    },	
					function(data) {
						//$('#list_adr option').remove();
						addresses = data.items;
						$('#list_adr').empty()
						$('#list_adr').append('<option value="0" >Choisisser une adresse</option>');
						$.each(addresses, function(index, adr){
							var test=adr.adresse+"";
				$('#list_adr').append('<option value="'+ adr.id +'">'+ test +'</option>')
							//$('#list_adr').append('<option>'+adr.adresse+'</option>');	
				
					

						});
						//$('#list_adr').listview('refresh');
					}
					,"json");
});	




	$('input[name="radio-choice-2"]').bind( "change", function(event, ui) {
	

	var choixjour = $("input[name=jourReservation]").attr("value");

	var choixheureDeb = minDispo;
	var choixheureFin = maxDispo;

	var choixduree = $("input[name=radio-choice-2]:checked").attr("value");

  		

	

var posting = $.post( "http://"+adresseServeur+"/services/DispoExistants.php"
					, { dateRes:choixjour, heurefinalRes: maxDispo, heuredebutRes: minDispo,dureeDisp: choixduree },
						//, { id_client: 16  },	
					function(data) {
						//$('#list_adr option').remove();
						addresses = data.items;
						$('#list_dispo').empty();
						
						$('#list_dispo').append('<option value="0" >plages horaires dispo</option>');
						$.each(addresses, function(index, adr){
							var test=adr.adresse+"";
				$('#list_dispo').append('<option value="'+ adr.id +'">'+ adr.Hdeb + adr.Hfin +'</option>');
							//$('#list_adr').append('<option>'+adr.adresse+'</option>');	
				$('#list_dispo').selectmenu('refresh', true);

					
						});
						//$('#list_adr').listview('refresh');
					}
					,"json");
		

	
       
      

      
	

});

$('input[name="visa"]:checkbox').change( function() {

if ($(this).is(':checked'))

{
		//$.mobile.showPageLoadingMsg();
var posting1 = $.post( "http://"+adresseServeur+"/services/afficher_carte.php"
					//, { id_client: window.localStorage.getItem("id_client")  },
						, { id_client: window.localStorage.getItem("id_client")  },	
					function(data) {
						
						$('#list_car').empty();
						$('#list_car').append('<option value="0">Choisisser une carte bancaire</option>');
						cartes = data.items;
						$.each(cartes, function(index, carte){
							var test=carte.num+"";
			
					     $('#list_car').append('<option value="'+ carte.id +'">'+ test +'</option>');
					
						});
						//$('#list_car').listview('refresh');
						
						$('#list_car').append('<option value="ajouter une carte" >ajouter une carte</option>');
										$('#list_car').selectmenu('refresh', true);

					}
					,"json"); } 

//$.mobile.hidePageLoadingMsg();







});	




	$('#list_car ').change( function() {
	
	 var val = $(this).val(); // on récupère la valeur de la région
 
        if(val == 'ajouter une carte') {
	 $.mobile.changePage("#ajouter_carte", { transition: "slide", reverse: false });
		}

});
	
	$('input[name="pt_mo"]:checkbox').change( function() {

if ($(this).is(':checked'))

{


		//$.mobile.showPageLoadingMsg();
var posting1 = $.post( "http://"+adresseServeur+"/services/afficher_credit.php"
					//, { id_client: window.localStorage.getItem("id_client")  },
						, { id_client: window.localStorage.getItem("id_client")  },	
					function(data) {
						$('#dispo').replaceWith(' <label id="dispo" class="form_col" for="Adresse">    </label>  ');
						var dispo = data.item;
						$('#dispo').append('   disponible:   ' + dispo.credit);
						
					
					}
					,"json").fail(function() {
    alert( "Erreur connexion \n " );
  })
  /*.before(function() {
    $.mobile.showPageLoadingMsg();
	//alert("before");
  })
  .done(function() {
    $.mobile.hidePageLoadingMsg();
	//alert("after");
  })*/;
					
					
					
					
					/*.fail(function() {
    alert( "Erreur connexion \n " );
	$.mobile.hidePageLoadingMsg();
  })
  .done(function() {
  alert("after");
    $.mobile.hidePageLoadingMsg();
	//
  });*/
  } 

		//$.mobile.hidePageLoadingMsg();








});	


$('#reservationOsteo').bind('pageshow', function(event) {
//alert("fdgfdg");
		

var posting = $.post( "http://"+adresseServeur+"/services/afficher_adresse.php"
					//, { id_client: window.localStorage.getItem("id_client")  },
						, { id_client: window.localStorage.getItem("id_client")    },	
					function(data) {
						//$('#list_adr option').remove();
						addresses = data.items;
						$('#Olist_adr').empty();
						$('#Olist_adr').append('<option value="0" >Choisisser une adresse</option>');
						$.each(addresses, function(index, adr){
							var test=adr.adresse+"";
				$('#Olist_adr').append('<option value="'+ adr.id +'">'+ test +'</option>');
							//$('#list_adr').append('<option>'+adr.adresse+'</option>');	
					$('#Olist_car').selectmenu('refresh', true);

					

						});
						//$('#list_adr').listview('refresh');
					}
					,"json");
});	

	$('input[name="radio-choice-3"]').bind( "change", function(event, ui) {
	

	var choixjour = $("input[name=jourReservationO]").attr("value");

	var choixheureDeb = minDispo;
	var choixheureFin = maxDispo;

	var choixduree = $("input[name=radio-choice-3]:checked").attr("value");

  		

	

var posting = $.post( "http://"+adresseServeur+"/services/DispoExistants.php"
					, { dateRes:choixjour, heurefinalRes: maxDispo, heuredebutRes: minDispo,dureeDisp: choixduree },
						//, { id_client: 16  },	
					function(data) {
						//$('#list_adr option').remove();
						addresses = data.items;
						$('#Olist_dispo').empty();
						
						$('#Olist_dispo').append('<option value="0" >plages horaires dispo</option>');
						$.each(addresses, function(index, adr){
							var test=adr.adresse+"";
				$('#Olist_dispo').append('<option value="'+ adr.id +'">'+ adr.Hdeb + adr.Hfin +'</option>');
							//$('#list_adr').append('<option>'+adr.adresse+'</option>');	
				$('#Olist_dispo').selectmenu('refresh', true);

					
						});
						//$('#list_adr').listview('refresh');
					}
					,"json");
		

	
       
      

      
	

});

$('input[name="Ovisa"]:checkbox').change( function() {

if ($(this).is(':checked'))

{
		
var posting1 = $.post( "http://"+adresseServeur+"/services/afficher_carte.php"
					//, { id_client: window.localStorage.getItem("id_client")  },
						, { id_client: window.localStorage.getItem("id_client")  },	
					function(data) {
						
						$('#Olist_car').empty();
						$('#Olist_car').append('<option value="0" >Choisisser une carte bancaire</option>');
						cartes = data.items;
						$.each(cartes, function(index, carte){
							var test=carte.num+"";
			
					     $('#Olist_car').append('<option value="'+ carte.id +'">'+ test +'</option>')
					
						});
						//$('#list_car').listview('refresh');
						
						$('#Olist_car').append('<option value="ajouter une carte" >ajouter une carte</option>');
							$('#Olist_car').selectmenu('refresh', true);

					}
					,"json"); } 









});	




	$('#Olist_car ').change( function() {
	
	 var val = $(this).val(); // on récupère la valeur de la région
 
        if(val == 'ajouter une carte') {
	 $.mobile.changePage("#ajouter_carte", { transition: "slide", reverse: false });
		}

});
	
	$('input[name="Opt_mo"]:checkbox').change( function() {

if ($(this).is(':checked'))

{
		
var posting1 = $.post( "http://"+adresseServeur+"/services/afficher_credit.php"
					//, { id_client: window.localStorage.getItem("id_client")  },
						, { id_client: window.localStorage.getItem("id_client")  },	
					function(data) {
						$('#Odispo').replaceWith(' <label id="dispo" class="form_col" for="Adresse">    </label>  ');
						var dispo = data.item;
						$('#Odispo').append('   disponible:   ' + dispo.credit);
						
					
					}
					,"json"); } 









});	



function verifierCommandeDispo()
{
    $.post("http://"+adresseServeur+"/services/paiement.php", { }, function (data) {
        // motdepasse=data.item;
        //alert(data);
        // console.log(motdepasse);
        if (data) {
        alert("true");
        }
        else {
       alert("false");
        }
     
		
    }, "html");
}
function jourprev()
{
 jQuery('#calendar').weekCalendar("prev");
}
function joursuiv()
{
 jQuery('#calendar').weekCalendar("next");
}

$('#mes_commandes').bind('pageshow', function(event) {	
var posting = $.post( "http://"+adresseServeur+"/services/mes_commandes.php"
					, { id_client: window.localStorage.getItem("id_client")  },
							
					function(data) {
						$('#listcommande li').remove();
						commandes = data.items;
						$.each(commandes, function(index, com){
		                     var dateEntered = com.date; 
							 var validite;
var date = dateEntered.substring(8, 10);
var month = dateEntered.substring(5, 7);
var year = dateEntered.substring(0, 4);
//alert ( date+ month +year);
var dateToCompare = new Date(year, month - 1, date);
var currentDate = new Date();

					if (dateToCompare > currentDate) {
    //alert("Date Entered is greater than Current Date ");
	
	validite="confirmée";
	
}
else {
   // alert("Date Entered is lesser than Current Date");
   validite="effectuée";
}
					
					
							$('#listcommande').append('<li><a onClick="test('+com.id+')">' +
					
							'<h4>' + com.date + '</h4>' +
							'<p>' + validite+ '</p>' +
							'<span class="ui-li-count">' + "Détails" + '</span></a></li>');	
				
					
						});
						$('#listcommande').listview('refresh');
					}
					,"json");
});
	
$('#avis1').bind('pageshow', function(event) {

$('#reclamation').hide();


});





function enregistrer( )
{
var i;
//i= $('#note').val();
var reclamation="";
var comm= $('#commentaire').val();
//alert(note + comm);

   if ( ! $('#reclamation').is(":visible"))
    { 	if (note<5)
          {
		  $('#reclamation').show();
		  }		
	    else {
					var posting1 = $.post( "http://"+adresseServeur+"/services/enregistrer_avis.php"
					, { id_commande:  window.localStorage.getItem("idcommande"),
						 note: note ,
                         commentaire: comm,
                         reclamation: reclamation						 },	
					function(data) {
						 
						 alert("Merci pour votre avis");
						 	
					$.mobile.changePage( "#accueil", { transition: "slide", changeHash: false });
					}
					,"json");
				}
	} 

 else
    {
 
		reclamation=$('input[name=rec]:checked').val(); //$('input[name="rec"]:radio').val();
  
		var posting1 = $.post( "http://"+adresseServeur+"/services/enregistrer_avis.php"
					, { id_commande: 1 ,
						 note: note ,
                         commentaire: comm,
                         reclamation:reclamation 						 },	
					function(data) {
						 
						 alert("Merci pour votre avis");
						 	
					$.mobile.changePage( "#accueil", { transition: "slide", changeHash: false });
					}
					,"json").fail(function() {
    alert( "Erreur connexion \n " );
  });
	}

}	

function passerAide()
{
aide=true;
$.mobile.changePage( "#home1", { transition: "slide", changeHash: false });
				
}
// Callback function references the event target and adds the 'swiperight' class to it
