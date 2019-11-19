var botaoAdicionar = document.querySelector("#adicionar-paciente");
botaoAdicionar.addEventListener("click", function (event) {
    event.preventDefault();

    var form = document.querySelector("#form-adiciona");
    var paciente = obtemPacienteFormulario(form);
    var pacienteTr = montarPacienteTr(paciente)
    var tabela = document.querySelector("#tabela-pacientes");

    if (validaPaciente(paciente).length > 0) {
        var erro = document.querySelector("#mensagem-erro");
        //erro.textContent = ;
        return;
    }

    tabela.appendChild(pacienteTr);

    form.reset();
});

function obtemPacienteFormulario(form) {
    return {
        nome: form.nome.value,
        peso: form.peso.value,
        altura: form.altura.value,
        gordura: form.gordura.value,
        imc: calculaImc(form.peso.value, form.altura.value)
    }
}

function montarPacienteTr(paciente) {
    var pacienteTr = document.createElement("tr");

    pacienteTr.appendChild(montaPacienteTd(paciente.nome, "info-nome"));
    pacienteTr.appendChild(montaPacienteTd(paciente.peso, "info-peso"));
    pacienteTr.appendChild(montaPacienteTd(paciente.altura, "info-altura"));
    pacienteTr.appendChild(montaPacienteTd(paciente.gordura, "info-gordura"));
    pacienteTr.appendChild(montaPacienteTd(paciente.imc, "info-imc"));

    return pacienteTr;
}

function montaPacienteTd(valor, classe) {
    var td = document.createElement("td");
    td.textContent = valor;
    td.classList.add(classe);

    return td;
}

function validaPaciente(paciente) {
    var erros = [];

    if (!isPesoValido(paciente.peso)) {
        erros.push("Peso inválido");
    }

    if (!isAlturaValida(paciente.altura)) {
        erros.push("Altura inválida");
    }
    return erros;
}