var filtroNomePaciente = document.querySelector('#filtro-nome-paciente');

filtroNomePaciente.addEventListener('input', function (params) {
    var pacientes = document.querySelectorAll('.paciente');
    
    if (this.value.length > 0) {
        pacientes.forEach(paciente => {
            var regexNomePaciente = new RegExp(this.value, 'i');
            if (!regexNomePaciente.test(paciente.querySelector('.info-nome').textContent)) {
                paciente.classList.add('invisible');
            } else {
                paciente.classList.remove('invisible');
            }

        });
    } else {
        pacientes.forEach(paciente => {
            paciente.classList.remove('invisible');
        })
    }

});