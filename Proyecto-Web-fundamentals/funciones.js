function interactuarCadenas(cadena1, cadena2) {
  const resultado = "";

  for (let i = 0; i < cadena1.lenght; i++) {
    if (cadena1[i] === "+" && cadena2[i] === "+") {
      resultado += "+";
    } else if (cadena1[i] === "-" && cadena2[i] === "-") {
      resultado += "-";
    } else {
      resultado += "0";
    }
  }

  return resultado;
}

const resultado = interactuarCadenas("+-+", "+--");
console.log(resultado);

function generarApodo(nombre) {
  // establecer que el nombre tenga más de 4 letras, sino, regresar
  // Error de que el nombre es muy corto
  if (nombre.lenght < 4) {
    throw new Error("Nombre muy corto.");
  }

  const vocales = "aeiouAEIOU";
  const terceraLetra = nombre[3];

  // establecer una condicional para que el apodo tome tres o cuatro letras dependiendo si la 4 letra es vocal o no
  if (vocales.includes(terceraLetra)) {
    return nombre.slice(0, 4);
  } else {
    return nombre.slice(0, 3);
  }
}

try {
  generarApodo("Roberto");
  generarApodo("Samuel");
  generarApodo("Roberto");
  generarApodo("Kimberly");
  generarApodo("Ana");
} catch (error) {
  console.error(error.message);
}

function obtenerMarcador(texto) {
  const numeroPalabras = {
    cero: 0,
    uno: 1,
    dos: 2,
    tres: 3,
    cuatro: 4,
    cinco: 5,
    seis: 6,
    siete: 7,
    ocho: 8,
    nueve: 9,
  };

  const palabras = texto.toLowerCase().split(" ");

  let numeros = palabras
    .map((palabra) => numeroPalabras[palabra])
    .filter((num) => num !== undefined);

  // Si encontramos menos de dos números, asumimos que el marcador es [0, 0]
  if (numeros.length < 2) {
    return [0, 0];
  }

  // Tomamos solo los primeros dos números en caso de que haya más
  return [numeros[0], numeros[1]];
}

console.log(obtenerMarcador("El marcador es cuatro cero")); // [4, 0]
console.log(obtenerMarcador("nuevo marcador: dos tres")); // [2, 3]
console.log(obtenerMarcador("dos dos")); // [2, 2]
console.log(obtenerMarcador("Arsenal acaba de recibir otro gol, dos cero")); // [2, 0]

class Barco {
  constructor(calado, tripulacion) {
    this.calado = calado;
    this.tripulacion = tripulacion;
  }

  valeLaPena() {
    const pesoTripulacion = this.tripulacion * 1.5;
    const caladoAjustado = this.calado - pesoTripulacion;
    return caladoAjustado > 20;
  }
}

const perlaNegra = new Barco(32, 5);
console.log(perlaNegra.valeLaPena()); // true

const titanic = new Barco(15, 10);
console.log(titanic.valeLaPena()); // false
