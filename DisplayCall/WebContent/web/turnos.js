var turnosTexts = new Array();
var turnosDatos = new Array();
var muestroDatos = new Array();
var htmlturnos = '';
var htmlturnosAux = '';
var tieneDatos = 0;
var pos=0;
var salir=false;
var audioNV = 'sonido.mp3';
var nroXML = String( window.location.href ).split('?')[1];
var aux=0;
var calculatortexts;
var ie8 = 0;
var calculatorns4=document.layers;
var calculatorns6=document.getElementById&&!document.all;
var resNombre='';

var largoefecto=100;

function runEffect() {
		var selectedEffect = "clip"
		var options = {};
		
		$( "#effect" ).show( selectedEffect, options, 1000, callback );
		
};

function callback() {
	setTimeout(function() {
	$( "#effect:visible" ).removeAttr( "style" ).hide();	
	$( "#TURNOS" ).fadeIn();
	}, 1000 );
};

function abrirTXT()
{
	$( "#effect" ).hide();
		
		if (window.XMLHttpRequest)
		{
			var client = new XMLHttpRequest();
		}
		else // Internet Explorer 5/6
		{
			var client = new ActiveXObject("Microsoft.XMLHTTP");
		}
		
		
		if (navigator.appName.indexOf("Explorer") != -1) {
			ie8 = 1;
		}

		var path='blobs/geoturnosD' + nroXML  + '.txt';


		$.ajax({
	        url: path,
	        dataType: 'text',
	        cache: false,
	        success: function(text) {

				txtdatos = text;
	
				/*client.open('GET', path ,async = true);
				client.send("");
				txtdatos = client.responseText;*/
		
				turnosTexts = txtdatos.split("|");
				var htmlmensaje = '';
						
				if (turnosTexts.length > 0){
				
					htmlturnosAux = '</table>';
					aux = turnosTexts.length-1;
					tieneDatos=0;
								
					mostrarDatos();
					largoefecto = 100;
					if (tieneDatos==1){
						htmlturnosAux += '<table>';
						id = "TURNOS";
						htmlturnos = htmlturnosAux;
						TurnosSetNumeros(id, htmlturnos);
						timedRefresh(largoefecto);

					}
				}
			},
			error: function() {
					timedRefresh(30000);
				}
		});
}


function mostrarDatos(){

setTimeout(function() {
	turnosDatos = '';
	var lugar = '';
	var nombre = '';
	var puesto = '';
	var esta = 0;
	var hora = '';
	largoefecto = 100;

	if(aux < 0){
		return;
	}
	
	turnosDatos = turnosTexts[aux].split("*");

	//fecha = turnosDatos[0];
	horallamada = turnosDatos[0];
	lugar = turnosDatos[2];
	puesto = turnosDatos[4];
	hora = turnosDatos[8];
	nombre = turnosDatos[9];
	
	if (typeof(nombre) == "undefined" || nombre == "" || typeof(horallamada) == "undefined" || horallamada  == "" || typeof(puesto) == "undefined" || puesto  == "" || typeof(lugar) == "undefined" || lugar == ""){
	}else{
		var textoaux = nombre + horallamada;
		textoaux = textoaux.replace(/\s/g, '');
		if (turnosDatos[5]=="D"){ // Mensaje cuando se pide un numero	
			for (var e=0; e<muestroDatos.length; e++) {
				if (muestroDatos[e]==textoaux){/* && muestroDatos[e].value == horallamada){*/
					esta = 1;
				}
			}

			if (esta==0){
				htmlmensaje = '<table class="mensaje_tabla" align="center">';
				
				if (hora != ""){
					htmlmensaje += '<tr><td class="mensaje_hora"><b>' + hora + '</b></td></tr>';
				}
				htmlmensaje += '<tr><td class="mensaje_nombre">' + nombre + '</td></tr><tr><td class="mensaje_puesto"><b>Puesto:</b><b> ' + puesto + '</b></td></tr></table>';
				
				if (nombre != ""){
					pos += 1;
					muestroDatos[pos]= textoaux;
					
					
					idm = "effect";
					
					// Reroduce audio

					if (ie8 == 0){
						document.getElementById('audiotag1').load();
						document.getElementById('audiotag1').play();
					}else if(ie8 == 1){
						document.all.sound.src = audioNV;
					}
					
					TurnosSetNumeros(idm, htmlmensaje);
					$( "#TURNOS" ).hide();
					runEffect();
					largoefecto = 2200;
				}
			}
		}
				tieneDatos=1;
		if (screen.width>=3096) {
			resNombre = nombre.slice(0, 40);
		}else if (screen.width>=2048) {
			resNombre = nombre.slice(0, 30);
		}else if (screen.width>=1920) {
			resNombre = nombre.slice(0, 25);
		}else if (screen.width>=1280) {
			resNombre = nombre.slice(0, 17);
		}else if (screen.width>=1024){
			resNombre = nombre.slice(0, 15);
		}else{
			resNombre = nombre.slice(0, 10);
		}

		if (screen.width>=3096) {
			resPuesto = puesto.slice(0, 20);
		}else if (screen.width>=2048) {
			resPuesto = puesto.slice(0, 15);
		}else if (screen.width>=1920) {
			resPuesto = puesto.slice(0, 12);
		}else if (screen.width>=1362) {
			resPuesto = puesto.slice(0, 7);
		}else if (screen.width>=1092){
			resPuesto = puesto.slice(0, 5);
		}else{
			resPuesto = puesto.slice(0, 3);
		}
		
		htmlturnosAux = '<td align="right" class="autosavered sizePuesto"><span class="truncate white"><b>' + resPuesto + '</b></span></td></tr></table>' + htmlturnosAux;
		if (hora != ""){
			htmlturnosAux = '<table class="autosaveblue"><tr><td class="autosavered sizeHora"><b>' + hora +'</b></td><td bgcolor= "white" class="sizeNombre"><b>' + resNombre + '</b></td>' + htmlturnosAux;
		}else{
			htmlturnosAux = '<table class="autosaveblue"><tr bgcolor="white"><td class="autosavered sizeHora"></td><td class="sizeNombre"><span class="truncate"><b>' + resNombre + '</b></span></td>' + htmlturnosAux;
		}
		
	}

	if(aux>0) {
		aux -= 1;
		mostrarDatos();
	}else{
	
		htmlturnosAux += '<table>';
		htmlturnos = htmlturnosAux;
		var id = "TURNOS";
		TurnosSetNumeros(id, htmlturnos);
		timedRefresh(largoefecto);
	}	
	}, largoefecto );
}


function timedRefresh(timeoutPeriod) {

//alert("refresca");
	setTimeout("abrirTXT();",timeoutPeriod);
}

 
 function setupRefresh() {
     setInterval("abrirTXT();", 500);
 }


// Get Object
function cGetObj(id)
{
	if (calculatorns4)
	{
		trossobj=document.layers[id];
	}
	else 
		if (calculatorns6)
		{
			trossobj=document.getElementById(id);
		}	
		else
		{
			trossobj=document.all[id];
		}	
		
	return trossobj;
}

function TurnosSetNumeros(id, val)
{
	var trossobj = cGetObj(id);
	if (trossobj)
	{	
		if (val != "")
		{		
			trossobj.innerHTML = val;
		}
	}		
}
