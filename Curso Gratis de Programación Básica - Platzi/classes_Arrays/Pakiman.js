
class Pakiman{
    constructor(name, hp, atk)
    {
        
        this.name = name;
        this.hp = hp;
        this.atk = atk;
        // alert(" HA NACIDO UN PAKIMAN: \n "+this.name +
        // "\n HP: "+this.hp +"\n"+
        // "atk: "+this.atk);

        this.image = new Image();
        this.image.src = boxes[name];
    }

    hablar()
    {
        alert(this.name+"!!!");
    }
    mostrar(){
        document.body.appendChild(this.image);
        document.write("<p>");
        document.write("<strong>" +this.name + "</strong><br>");
        document.write("HP: " +this.hp+"<br>");
        document.write("ATK: " +this.atk+"<br>");

        document.write("</p>");
    }

}
