 function checkLength(objeto, minimo,maximo) {
    var error = "N";
    if (objeto.value=="") error = "S";
    if (objeto.value== null) error = "S";
    if (objeto.value.length < minimo) error = "S";
    if (objeto.value.length > maximo) error = "S";    
    if (error=="S") {
       alert ("Longitud incorrecta.");
       objeto.focus();
       objeto.select();
       return false;   	 
    }
    return true;	
}











 function noVacio(objeto)  {
 	var nulo = "N";
 	if (objeto.value=="") nulo="S";
	else {
		if (objeto.value!= null) {
		  for ( var i = 0; i < objeto.value.length; i ++) {
		  	if (objeto.value.charAt(i) != " ")
				return true;
		  }
		}
		else nulo="S";
	}
	
	if (nulo="S") 	{
		alert ("Campo obligatorio. Introduzca valor");
		objeto.focus();
		objeto.select();
		return false;
	}
	return true;
 }


 function noVacioSinAlert(objeto)  {
 	var nulo = "N";
 	if (objeto.value=="") nulo="S";
	else {
		if (objeto.value!= null) {
		  for ( var i = 0; i < objeto.value.length; i ++) {
		  	if (objeto.value.charAt(i) != " ")
				return true;
		  }
		}
		else nulo="S";
	}
	
	if (nulo="S") return false;
	return true;
 }

 



 function checkNumber(objeto)  {
    var error ="N";
	for (var i = 0; i < objeto.value.length; i ++) 	{
      	if ((objeto.value.charAt(i)<"0")||(objeto.value.charAt(i)>"9")) error ="S";
	}
    if (error=="S") {
       alert ("Campo numérico. Valor incorrecto.");
       objeto.focus();
       objeto.select();
       return false;   	 
    }
    return true;	
 }
 
 function checkImporte (objeto)  {
	 var error ="N";
	 for (var i = 0; i < (objeto.value.length-4); i ++) 	{
	   	if ((objeto.value.charAt(i)<"0")||(objeto.value.charAt(i)>"9")) error ="S";
	 }
	 if (objeto.value.charAt(objeto.value.length-3) != '.' ) error ="S";
	 if ((objeto.value.charAt(objeto.value.length-2)<"0")||(objeto.value.charAt(objeto.value.length-2)>"9")) error ="S";
	 if ((objeto.value.charAt(objeto.value.length-1)<"0")||(objeto.value.charAt(objeto.value.length-1)>"9")) error ="S";	 
	 if (error=="S") {
	    alert ("Valor incorrecto. Formato: numero punto 2decimales. Ejemplo: 15000.00");
	    objeto.focus();
	    objeto.select();
	    return false;   	 
	 }
	 return true;	 
 }
 
 
 
 function checkCaducidad(objeto)  {
   var error ="N";
    if (objeto.value.length != 5) error="S";
 	if (objeto.value.charAt(2) != '/' ) error ="S";
	if ((objeto.value.charAt(0)<"0")||(objeto.value.charAt(0)>"9")) error ="S";
	if ((objeto.value.charAt(1)<"0")||(objeto.value.charAt(1)>"9")) error ="S";
	if ((objeto.value.charAt(3)<"0")||(objeto.value.charAt(3)>"9")) error ="S";
	if ((objeto.value.charAt(4)<"0")||(objeto.value.charAt(4)>"9")) error ="S";			
	if (error=="N") 	{
		var mes = objeto.value.substring (0,2);
		if (eval(mes) > 12) error = "S";
	}
    if (error=="S") {
	   alert ("Fecha de caducidad incorrecta. Formato MM/AA (mes,año)");
	   objeto.focus();
	   objeto.select();
	   return false;   	 
    }
    return true;
 }
