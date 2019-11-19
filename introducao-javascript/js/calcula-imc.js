var titulo = document.querySelector(".titulo");
titulo.textContent = "Aparecida Nutricionista";

var pacientes = document.querySelectorAll(".paciente");

for (var i = 0; i < pacientes.length; i++) {

    var paciente = pacientes[i];

    var tdPeso = paciente.querySelector(".info-peso");
    var peso = tdPeso.textContent;

    var tdAltura = paciente.querySelector(".info-altura");
    var altura = tdAltura.textContent;

    var tdImc = paciente.querySelector(".info-imc");

    var pesoEhValido = isPesoValido(peso);
    var alturaEhValida = isAlturaValida(altura);

    if (!pesoEhValido) {
        console.log("Peso inválido!");
        pesoEhValido = false;
        tdImc.textContent = "Peso inválido";
        paciente.classList.add("paciente-invalido");
    }

    if (!alturaEhValida) {
        console.log("Altura inválida!");
        alturaEhValida = false;
        tdImc.textContent = "Altura inválida";
        paciente.classList.add("paciente-invalido");
    }

    if (pesoEhValido && alturaEhValida) {
        tdImc.textContent = calculaImc(peso, altura);
    }
}

function isPesoValido(peso) {
    if (peso > 0 && peso < 1000) {
        return true;
    }
    return false;
}

function isAlturaValida(altura) {
    if (altura > 0 && altura < 3.00) {
        return true;
    }
    return false;
}

function calculaImc(peso, altura) {
    return (peso / (altura * altura)).toFixed(2);
}