var piedrasPapelTijeras = {
    // Marcador del juego
    puntoMaquina: 0,
    puntoUsuario: 0,
    puntosGanarPartida: 5,
    // entrada de la maquina
    usernameMaquina: "MAQUINA",
    // entrada del usuario
    usernameUsuario: "USUARIO",
  
    mostrarMarcador: function () {
        console.log(`${this.usernameMaquina}: ${this.puntoMaquina} - ${this.usernameUsuario} : ${this.puntoUsuario}`)
    },
  
    // Opciones Validas
    opciones: ["piedra", "papel", "tijeras"],
  
    // Mostrar opciones validas
    mostrarOpciones: function () {
      for (var opcion of this.opciones) {
        console.log(`"${opcion}"`);
      }
    },
  
    // --------AQUI COMIENZA EL JUEGO----------//
    // entrada de la maquina
    maquina: "USUARIO",
    // entrada del usuario
    usuario: "MAQUINA",
  
    validarMaquina: -1,
    validarUsuario: -1,
    definirJugadores: function(jugador1, jugador2){
        this.usernameUsuario = jugador1;
        this.usernameMaquina = jugador2;
    },
  
    // Resultados
    resultados: function () {
        console.log(`¡Felicidades eres el campeón del juego: ${ this.puntosGanarPartida == this.puntoMaquina ? this.usernameMaquina : this.usernameUsuario }!`);
    },
    // Funcion principal
    jugar: function () {
        this.puntoMaquina = 0;
        this.puntoUsuario = 0;
  
        while ((this.puntoMaquina < this.puntosGanarPartida && this.puntoUsuario < this.puntosGanarPartida)) {
            console.log("¡A jugar!");
            // Asinga un valor aleatorio a la entrada de maquina
            this.maquina = this.opciones[Math.round(Math.floor(Math.random()* 2.99))];
            // Asinga un valor aleatorio a la entrada de usuario
            this.usuario = this.opciones[Math.round(Math.floor(Math.random()* 2.99))];
            // Muestra las entradas
            console.log(`Maquina: ${this.maquina}`);
            console.log(`Usuario: ${this.usuario}`);
            // busca las entradas en las opciones validas
            this.validarMaquina = this.opciones.indexOf(this.maquina);
            this.validarUsuario = this.opciones.indexOf(this.usuario);
            switch (true) {
                // valida si hay empate
                case (this.maquina === this.usuario):                                       ////////////////////////////////// ESTOY DE RECESO, VUELVO A LAS 19:38
                    console.log("Hay un empate");
                    break;
                //casos donde gana la maquina
                case (((this.maquina === "piedra") && (this.usuario === "tijeras")) ||
                ((this.maquina === "papel") && (this.usuario === "piedra")) ||
                ((this.maquina === "tijeras") && (this.usuario === "papel"))):
    
                    console.log("La maquina ha ganado");
                    this.puntoMaquina++;
                    break;
    
                default: //si la maquina no gano, el usuario si
                    console.log("El usuario ha ganado");
                    this.puntoUsuario++;
                    break;
            }
            this.mostrarMarcador();
        }
        this.resultados();
    }
    
}
  


  ///JUGAR!
  piedrasPapelTijeras.definirJugadores("Michael", "Ronald");
  piedrasPapelTijeras.jugar();
  console.log("FUE UNA PARTIDA INTENSA xd");