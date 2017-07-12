let indiceDelPrimerDiaDeMes, cantidadGrisesInicial, diasDelMes, cantidadDiasImprimir;

/*obtengo e ultimo dia del mes ANTERIOR dado por el usuario*/
function daysInMonth(month,year) {
    return new Date(year, month, 0).getDate();
}

/*obtengo e ultimo dia del mes ACTUAL dado por el usuario*/
function daysInMonthActual(month,year) {
    return new Date(year, month + 1, 0).getDate();
}

/*Obtengo el primer dia d un mes
Mes eje: julio--> le resto uno xq object Date los meses van de 0 a 11 y dias de 1 a 7
al DiaPrimeroMes -1 para obtener el dia anterior al 1ero = se pintan de cajacolorgris 
new Date(2017, 7-1, 1).getUTCDay()-1; ----> [5] = viernes
*/
function firstDayInMonth(month,year) {
    return new Date(year, month, 1).getDay() - 1;
}

/*Obtengo Ultimo mes segun el diaUsuario + diasIndicadosUsuario*/
function getMes(mesUsuario, annoUsuario, numDiasSeleccionado, diaUsuario) {
    var mesObtenido = new Date(annoUsuario,parseInt(mesUsuario)-1, parseInt(numDiasSeleccionado) + parseInt(diaUsuario) ).getMonth();  
	
	/*console.log("mesObtenido:", mesObtenido, "numDiasSeleccionado:", numDiasSeleccionado, "diaUsuario", diaUsuario, "mesUsuario:",mesUsuario, "annoUsuario:",annoUsuario);*/
	return mesObtenido; /*eje: get set[8]*/
}

/*Obtengo los DIAS que tiene el ultimo Mes*/
function getDiasUltimoMes(mesUsuario, annoUsuario, numDiasSeleccionado, diaUsuario) {
    var diasObtenido = new Date(annoUsuario,parseInt(mesUsuario)-1, parseInt(numDiasSeleccionado) + parseInt(diaUsuario) ).getDate() - 1;  
	
	console.log("diasObtenidos:", diasObtenido, "numDiasSeleccionado:", numDiasSeleccionado, "diaUsuario", diaUsuario, "mesUsuario:",parseInt(mesUsuario)-1,
	"numDiasSeleccionado:", parseInt(numDiasSeleccionado),"diaUsuario:", parseInt(diaUsuario),	
	"numDiasSeleccionado+diaUsuario:", parseInt(numDiasSeleccionado) + parseInt(diaUsuario),"annoUsuario:",annoUsuario);
	return diasObtenido; 
}


function obtenerValores (){
  let dateValue = $("#date").val();
  let numDiasSeleccionado = $("#numDays").val();
  let arrayDateValue = dateValue.split("/"); 
  let camposDeUnCalendario = 42;
  let diaUsuario = arrayDateValue[0];
  let mesUsuario = arrayDateValue[1]; /*mes*/
  let annoUsuario = arrayDateValue[2]; /*anno*/
  diasDelMes = daysInMonth (mesUsuario, annoUsuario); 
  indiceDelPrimerDiaDeMes = new Date(arrayDateValue[2], arrayDateValue[1] - 1, 1).getDay() - 1;/*year,month,(01)[5]= 01jul es Sab[5]*/
  cantidadGrisesInicial = diaUsuario - 1 + indiceDelPrimerDiaDeMes;
  cantidadDiasImprimir = diasDelMes - diaUsuario + 1; 
  cantidadGrisesFinal = camposDeUnCalendario - cantidadDiasImprimir - cantidadGrisesInicial;
  
  let obtenerMes = getMes(mesUsuario, annoUsuario, numDiasSeleccionado, diaUsuario);
  let obtenerDiasUltimoMes = getDiasUltimoMes(mesUsuario, annoUsuario, numDiasSeleccionado, diaUsuario);
	
  mesUsuario = parseInt(mesUsuario)-1;
  console.log(mesUsuario, obtenerMes);
	
  for(let iMes = mesUsuario; iMes <= obtenerMes; iMes++){ 
	  if(iMes == mesUsuario){
		crearCalendario (cantidadGrisesInicial,cantidadDiasImprimir,cantidadGrisesFinal,diaUsuario);  
	  }
	  if(iMes > mesUsuario && iMes < obtenerMes){
		crearCalendarioCompleto (iMes,annoUsuario, camposDeUnCalendario);  
	  }
	  if(iMes == obtenerMes){
		 crearCalendarioFinal (iMes,annoUsuario,mesUsuario, numDiasSeleccionado,diaUsuario, camposDeUnCalendario);
	  };
    console.log("mesUsuario = " + mesUsuario + ", obtenerMes = " + obtenerMes + ", iMes= " + iMes);
  }
}

/*crea calendario inicial*/
function crearCalendario (cantidadGrisesInicial,cantidadDiasImprimir,cantidadGrisesFinal,diaUsuario){
	let indiceCuadricula = 1;	
	
	$("#calendario").append('<div class="capacalendario"><div class="capacalendarioborde">   <div class="diassemana"><span class="lunes">l</span><span class="martes">m</span><span class="miercoles">x</span><span class="jueves">j</span><span class="viernes">v</span><span class="sabado">s</span><span class="domingosemana ultimo">d</span></div><div class="diasmes">');
	
	for(i=0; i<cantidadGrisesInicial; i++){
		
		if(indiceCuadricula % 7 == 0){
		  $(".diasmes").append('<span class="domingo ultimo" ></span>');
		}else{
		  $(".diasmes").append('<span class="diainvalido"></span>');
		}
		indiceCuadricula ++;
	}
	
	
	for(i=0; i<cantidadDiasImprimir; i++){
		
		if(indiceCuadricula % 7 == 0){
		   $(".diasmes").append('<span class="domingo ultimo" >' + diaUsuario++ +'</span>');
		}else{
		  $(".diasmes").append('<span>' + diaUsuario++ +'</span>');
		}
		indiceCuadricula ++;
	}
	
	
	for(i=0; i<cantidadGrisesFinal; i++){
		
		if(indiceCuadricula % 7 == 0){
		  $(".diasmes").append('<span class="domingo ultimo" ></span>');
		}else{
		  $(".diasmes").append('<span class="diainvalido"></span>');
		}
		indiceCuadricula ++;
	}
}

/*Crea calendario completo*/
function crearCalendarioCompleto (iMes,annoUsuario, camposDeUnCalendario){
	let cantidadGrisesInicial = firstDayInMonth(iMes,annoUsuario); /*eje es i[5]*/
    let cantidadDiasImprimir = daysInMonthActual(iMes,annoUsuario);/*eje 31dias*/
	let cantidadGrisesFinal = camposDeUnCalendario - cantidadGrisesInicial - cantidadDiasImprimir;
	let indiceCuadricula = 1;	
	console.log("cantidadGrisesInicial:", cantidadGrisesInicial, "cantidadDiasImprimir:",cantidadDiasImprimir,"cantidadGrisesFinal:",cantidadGrisesFinal)
	
	
	$("#calendario").append(`<div class="capacalendario"><div class="capacalendarioborde">   <div class="diassemana"><span class="lunes">l</span><span class="martes">m</span><span class="miercoles">x</span><span class="jueves">j</span><span class="viernes">v</span><span class="sabado">s</span><span class="domingosemana ultimo">d</span></div><div class="diasmes diasmes${iMes}" >`); 
	
	for(i=0; i<cantidadGrisesInicial; i++){
		
		if(indiceCuadricula % 7 == 0){
		  $(".diasmes"+iMes).append('<span class="domingo ultimo" ></span>');
		}else{
		  $(".diasmes"+iMes).append('<span class="diainvalido"></span>');
		}
		indiceCuadricula ++;
	}
	
	
	for(i=1; i<=cantidadDiasImprimir; i++){
		
		if(indiceCuadricula % 7 == 0){
		   $(".diasmes"+iMes).append('<span class="domingo ultimo" >' + i +'</span>');
		}else{
		  $(".diasmes"+iMes).append('<span>' + i +'</span>');
		}
		indiceCuadricula ++;
	}
	
	
	for(i=0; i<cantidadGrisesFinal; i++){
		
		if(indiceCuadricula % 7 == 0){
		  $(".diasmes"+iMes).append('<span class="domingo ultimo" ></span>');
		}else{
		  $(".diasmes"+iMes).append('<span class="diainvalido"></span>');
		}
		indiceCuadricula ++;
	}
}

/*crea calendario final*/
function crearCalendarioFinal (iMes,annoUsuario,mesUsuario, numDiasSeleccionado,diaUsuario, camposDeUnCalendario){
	let cantidadGrisesInicial = firstDayInMonth(iMes,annoUsuario); /*eje es i[5]*/
    let cantidadDiasImprimir = getDiasUltimoMes(mesUsuario, annoUsuario, numDiasSeleccionado, diaUsuario);/*eje 31dias*/
	let cantidadGrisesFinal = camposDeUnCalendario - cantidadGrisesInicial - cantidadDiasImprimir;
	let indiceCuadricula = 1;	
	
	$("#calendario").append(`<div class="capacalendario"><div class="capacalendarioborde">   <div class="diassemana"><span class="lunes">l</span><span class="martes">m</span><span class="miercoles">x</span><span class="jueves">j</span><span class="viernes">v</span><span class="sabado">s</span><span class="domingosemana ultimo">d</span></div><div class="diasmes diasmes${iMes}" >`);
	
	for(i=0; i<cantidadGrisesInicial; i++){
		
		if(indiceCuadricula % 7 == 0){
		  $(".diasmes"+iMes).append('<span class="domingo ultimo" ></span>');
		}else{
		  $(".diasmes"+iMes).append('<span class="diainvalido"></span>');
		}
		indiceCuadricula ++;
	}
	
	
	for(i=1; i<cantidadDiasImprimir; i++){
		
		if(indiceCuadricula % 7 == 0){
		   $(".diasmes"+iMes).append('<span class="domingo ultimo" >' + i +'</span>');
		}else{
		  $(".diasmes"+iMes).append('<span>' + i +'</span>');
		}
		indiceCuadricula ++;
	}
	
	
	for(i=0; i<cantidadGrisesFinal; i++){
		
		if(indiceCuadricula % 7 == 0){
		  $(".diasmes"+iMes).append('<span class="domingo ultimo" ></span>');
		}else{
		  $(".diasmes"+iMes).append('<span class="diainvalido"></span>');
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

//try{crearCalendario(5,30,0,1);}
//catch(e){ alert(e)}
  					   
});


