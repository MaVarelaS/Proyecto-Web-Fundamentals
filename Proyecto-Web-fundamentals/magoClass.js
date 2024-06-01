class Persona {
  constructor(nombre) {
    this.nombre = nombre;
  }
  presentarse() {
    return `Hola, mi nombre es ${this.nombre} y mi casa es ${this.casa}`;
  }
}

class Mago extends Persona {
  constructor(nombre, casa) {
    super(nombre);
    this.casa = casa;
  }

  invocarHechizo() {
    return `${this.nombre} invoca un hechizo`;
  }
}

const petunia = new Persona("Petunia");
const harry = new Mago("Harry", "Gryffindor");
