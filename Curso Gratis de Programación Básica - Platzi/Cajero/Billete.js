class Billete
{
    constructor(valor, cantidad)
    {
        this.valor = valor;
        this.cantidad = cantidad;
    }

    total()
    {
        return this.valor*this.cantidad;
    }

    
}