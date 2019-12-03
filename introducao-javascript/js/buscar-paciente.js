var buscarPaciente = document.querySelector('#buscar-paciente');

buscarPaciente.addEventListener('click', function () {

    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'http://api-pacientes.herokuapp.com/pacientes');
    xhr.addEventListener('load', function () {
        if (xhr.status == 200) {
            var erro = document.querySelector('#erro-ao-obter-pacientes');
            erro.classList.add('invisible');
            var pacientes = JSON.parse(xhr.responseText);

            pacientes.forEach(paciente => {
                adicionarPaciente(paciente)
            });
        
        } else {
            var erro = document.querySelector('#erro-ao-obter-pacientes');
            erro.classList.remove('invisible');
        }

    });
    xhr.send();
});