document.addEventListener("DOMContentLoaded", function(e) {

    let DateTime = luxon.DateTime;

    let formBusca = document.getElementById('formBusca');

    // Botão busca
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

    // Botão Reserve Já
    let formReserva = document.getElementById('btnReserveJa');

    formReserva.addEventListener('click', (e) => {
        e.preventDefault();

        document.getElementById("dadosHospede").removeAttribute("style");
        
        $('#modalBusca').modal('hide');

        document.getElementById("dadosHospede").scrollIntoView();

    });


    // Botão Finalizar Reserva
    let confirmacaoReserva = document.getElementById("confirmacaoReserva");

    confirmacaoReserva.addEventListener('click', (e) => {
        e.preventDefault();

        Swal.fire({
            icon: 'success',
            text: 'Reserva efetuada com sucesso!',
            allowOutsideClick: false,
            
        }).then((result) => {
            if (result.isConfirmed) {
                document.getElementById("dadosHospede").setAttribute("style", "display:none");
            };
          });
    });


    // Botão Cancelar
    let cancelarReserva = document.getElementById("cancelarReserva");

    cancelarReserva.addEventListener('click', (e) => {
        e.preventDefault();
        document.getElementById("dadosHospede").setAttribute("style", "display:none");
        document.getElementById("reservas").scrollIntoView();
       
    });
});