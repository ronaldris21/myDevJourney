var caja = [];
caja.push(new Billete(50,3));
caja.push(new Billete(20,3));
caja.push(new Billete(10,2));

var billete10 = "<img src=\"img/billete10.png\"/>";
var billete20 = "<img src=\"img/billete20.png\"/>";
var billete50 = "<img src=\"img/billete50.png\"/>";

var btnRetirar = document.getElementById("btnRetirar");
btnRetirar.addEventListener("click",clickBtnRetirar);

var pContent = document.getElementById("content");
var hTitle =  document.getElementById("title");
updateAmountAvailable();

function updateAmountAvailable()
{
    hTitle.innerHTML = "<h1>Cajero de "+ this.DineroDisponible() + " USD </h1>";
}

function clickBtnRetirar()
{
    var txtDinero = document.getElementById("txtDinero");

    var cantDinero = parseInt(txtDinero.value);
    if(isNaN(cantDinero))
    {
        alert("Introduzca una cantidad válida!");
        return;
    }

    if(DineroDisponible() < cantDinero)
    {
        pContent.innerHTML += "<p>No hay dinero suficente para hacer el retiro de "+cantDinero+" USD que quieres</p><hr>";
        return;
    }

    var entregado = [];
    
    for(var bill of caja)
    {
        var cant = Math.floor(cantDinero/bill.valor);
        if(cant>bill.cantidad)
        {
            cant = bill.cantidad;
        }
        entregado.push(new Billete(bill.valor,cant));
        cantDinero -= bill.valor*cant;
    }

    if(cantDinero==0)
    {
        pContent.innerHTML += "<p>Haz retirado: "+txtDinero.value+" USD</p'>";
        // alert("Retiro exitoso");
        for(var i in entregado)
        {
            
            var bill = entregado[i];
            caja[i].cantidad -= bill.cantidad;
            
            console.log(i);
            console.log(bill);
            console.log(caja[i]);
            // pContent.innerHTML += bill.cantidad +"x "+ bill.valor+" USD <br>";
            for(var i = 0; i<bill.cantidad ; i++)
            {
                switch(bill.valor)
                {
                    case 10: pContent.innerHTML += billete10;
                    break;
                    case 20: pContent.innerHTML += billete20;
                    break;
                    case 50: pContent.innerHTML += billete50;
                    break;
                    
                }
            }
        }
        updateAmountAvailable();
    }
    else
     {
        pContent.innerHTML += "<p>No es posible retirar "+ txtDinero.value+" USD con los billetes disponibles</p>";

     }
     
     pContent.innerHTML += "<hr><br>";
     txtDinero.value = "";

}


function DineroDisponible()
{
    var totalDisponible = 0;
    for(var bill of caja)
    {
        totalDisponible += bill.cantidad * bill.valor;
    }
    return totalDisponible;
}