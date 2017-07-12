let diaUsuario = $("#date").val();
let numDiasSelect = $("#numDays").val();
let arrayDiasSemana = ["l","m","k","j","v","s","d"];
let camposCalendario = 35;
let cantidadGrisesInicial = diaUsuario - 1 + retornoIndiceDia;
let totalDiasMes = "";
let cantidadDiasImprimir = totalDiasMes - diaUsuario;
let cantidadGrisesFinal = camposCalendario - cantidadDiasImprimir - cantidadGrisesInicial;



function obtenerValores (){
  let dateValue = $("#date").val();
  let numDays = $("#numDays").val();
  let arrayDateValue = dateValue.split("/");
  let diaPrimeroMes = new Date(2, 1, 0).getDay() - 1; 
  
  for(var i=0; i< arrayDateValue.length; i++){
	  let arrayDias = (arrayDateValue[i]);
	  console.log(arrayDias);                
  }	
}

function crearCalendario (cantGrisInicial,cantDiasImpr,cantGrisFin,diaUsuario){
	let indiceCuadricula = 1;
	
	for(i=0; i<cantGrisInicial; i++){
		document.write("x");
		
		if(indiceCuadricula % 7 == 0){
		   document.write("<br>");
		}
		indiceCuadricula ++;
	}
	
	for(i=0; i<cantDiasImpr; i++){
		document.write(diaUsuario++ + ",");
		
		if(indiceCuadricula % 7 == 0){
		   document.write("<br>");
		}
		indiceCuadricula ++;
	}
	
	for(i=0; i<cantGrisFin; i++){
		document.write("x");
		
		if(indiceCuadricula % 7 == 0){
		   document.write("<br>");
		}
		indiceCuadricula ++;
	}
}


jQuery(function($){
  
  // Definimos las mascaras para cada input
  $("#date").mask("99/99/9999");
  
  $("#calcDatesBtn").click(function(){  
	obtenerValores();
	return false;
   });
 
 //try{crearCalendario(16,17,2,14);}
 //catch(e){ alert(e)}

try{crearCalendario(5,30,0,1);}
 catch(e){ alert(e)}
  					   
});


