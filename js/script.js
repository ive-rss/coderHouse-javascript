document.addEventListener("DOMContentLoaded", function(e) {

    let DateTime = luxon.DateTime;

    let formBusca = document.getElementById('formBusca');

    formBusca.addEventListener('submit', (e) => {
        e.preventDefault();
        
        let dataEntrada = DateTime.fromISO(e.target.dataEntrada.value);
        let dataSaida = DateTime.fromISO(e.target.dataSaida.value);
        let hospedes = e.target.hospedes.value;
        let quantidadeDiarias = dataSaida.diff(dataEntrada, 'days').toObject().days;
        let suite = e.target.formSuites.value;

        if (dataEntrada >= dataSaida) {
            Swal.fire({
                icon: 'error',
                text: 'A data do check-out deve ser posterior a data do check-in.',
            });

            formulario.reset();

        } else {
            class Hospedagem {
                constructor(quantidadeDiarias, quantidadeHospedes, precoDiaria) {
                    this.quantidadeDiarias = quantidadeDiarias;
                    this.quantidadeHospedes = quantidadeHospedes;
                    this.precoDiaria = precoDiaria;
                };
                
                calcularCusto() {
                    let custoDiaria = this.quantidadeDiarias * this.quantidadeHospedes * this.precoDiaria;

                    let dadosHospedagem = document.getElementById("modal-body");

                    dadosHospedagem.innerHTML = "";
                     
                    dadosHospedagem.innerHTML = `<p>Suíte: ${suite}</p>
                                                <p>Check-in: ${dataEntrada.toLocaleString()}</p> 
                                                <p>Check-out: ${dataSaida.toLocaleString()}</p>`

                                                if(this.quantidadeDiarias == 1) {
                                                    dadosHospedagem.innerHTML += `Preço para ${this.quantidadeDiarias} diária e `
                                                } else {
                                                    dadosHospedagem.innerHTML += `Preço para ${this.quantidadeDiarias} diárias e `
                                                }

                                                if(this.quantidadeHospedes == 1) {
                                                    dadosHospedagem.innerHTML += `${this.quantidadeHospedes} hóspede: `
                                                } else {
                                                    dadosHospedagem.innerHTML += `${this.quantidadeHospedes} hóspedes: `
                                                }
                                                dadosHospedagem.innerHTML += `<b>${(new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(custoDiaria))}</b>`;
                            
                    $('#modalBusca').modal('show');

                };
            };
            

            const hospedagens = [];

            hospedagens.push(new Hospedagem (quantidadeDiarias, hospedes, precoSuite()));

            hospedagens.forEach(hospedagem => hospedagem.calcularCusto());

            localStorage.clear();
            const hospedagensJson = JSON.stringify({checkin: dataEntrada.toLocaleString(), checkout: dataSaida.toLocaleString(), qhospedes: hospedes});
            localStorage.setItem('hospedagem', hospedagensJson);
        };

        function precoSuite() {
            switch (suite) {
                case 'Standart' : return 1000;
                case 'Deluxe' : return 1500;
                case 'Master' : return 2000;
            };
        };
    });

    let formReserva = document.getElementById('btnReserveJa');

    formReserva.addEventListener('click', (e) => {
        e.preventDefault();

        document.getElementById("dadosHospede").removeAttribute("style");
        
        $('#modalBusca').modal('hide');

        
        document.getElementById("contato").classList.replace('bg-light', 'bg-info');

        document.getElementById("contato").classList.replace('text-dark', 'text-light');

        document.getElementById("contato1").classList.replace('text-secondary', 'text-white-50');

        document.getElementById("contato2").classList.replace('text-secondary', 'text-white-50');

        document.getElementById("contato3").classList.replace('text-secondary', 'text-white-50');

        document.getElementById("contato4").classList.replace('text-secondary', 'text-white-50');

        document.getElementById("rodape").classList.replace('bg-info', 'bg-dark');
        
        document.getElementById("dadosHospede").scrollIntoView();
    });

    let confirmacaoReserva = document.getElementById("confirmacaoReserva");

    confirmacaoReserva.addEventListener('click', (e) => {
        e.preventDefault();

        Swal.fire({
            icon: 'success',
            text: 'Reserva efetuada com sucesso!',
        });

    });

    let cancelarReserva = document.getElementById("cancelarReserva");

    cancelarReserva.addEventListener('click', (e) => {
        e.preventDefault();

        document.getElementById("dadosHospede").setAttribute("style", "display:none");

        document.getElementById("contato").classList.replace('bg-info', 'bg-light');

        document.getElementById("contato").classList.replace('text-light', 'text-dark');

        document.getElementById("contato1").classList.replace('text-white-50', 'text-secondary');

        document.getElementById("contato2").classList.replace('text-white-50', 'text-secondary');

        document.getElementById("contato3").classList.replace('text-white-50', 'text-secondary');

        document.getElementById("contato4").classList.replace('text-white-50', 'text-secondary');

        document.getElementById("rodape").classList.replace('bg-dark', 'bg-info');
        
        document.getElementById("reservas").scrollIntoView();
       
    });
});