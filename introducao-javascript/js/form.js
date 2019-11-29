var botaoAdicionar = document.querySelector('#adicionar-paciente');
botaoAdicionar.addEventListener('click', function (event) {
    event.preventDefault();

    var form = document.querySelector('#form-adiciona');
    var paciente = obtemPacienteFormulario(form);
    var pacienteTr = montarPacienteTr(paciente)
    var tabela = document.querySelector('#tabela-pacientes');

    var errors = validaPaciente(paciente);
    if (errors.length > 0) {
        showError(errors);
        return;
    }
    clearErros();

    tabela.appendChild(pacienteTr);

    form.reset();
});

function clearErros() {
    var ul = document.querySelector('#messages-error');
    ul.innerHTML = "";
    return ul;
}

function showError(errors) {
    var ul = clearErros();
    errors.forEach(error => {
        var li = document.createElement('li');
        li.textContent = error;
        ul.appendChild(li);
    });
}

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
    var pacienteTr = document.createElement('tr');

    pacienteTr.appendChild(montaPacienteTd(paciente.nome, 'info-nome'));
    pacienteTr.appendChild(montaPacienteTd(paciente.peso, 'info-peso'));
    pacienteTr.appendChild(montaPacienteTd(paciente.altura, 'info-altura'));
    pacienteTr.appendChild(montaPacienteTd(paciente.gordura, 'info-gordura'));
    pacienteTr.appendChild(montaPacienteTd(paciente.imc, 'info-imc'));

    return pacienteTr;
}

function montaPacienteTd(valor, classe) {
    var td = document.createElement('td');
    td.textContent = valor;
    td.classList.add(classe);

    return td;
}

function validaPaciente(paciente) {
    var errors = [];

    if (paciente.nome.length == 0) {
        errors.push('Nome não pode ser em branco')
    }

    if (paciente.peso.length == 0) {
        errors.push('Peso não pode ser em branco')
    } else if (!isPesoValido(paciente.peso)) {
        errors.push('Peso inválido');
    }

    if (paciente.altura.length == 0) {
        errors.push('Altura não pode ser em branco')
    } else if (!isAlturaValida(paciente.altura)) {
        errors.push('Altura inválida');
    }

    if (paciente.gordura.length == 0) {
        errors.push('Gordura não pode ser em branco')
    }

    return errors;
}