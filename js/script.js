let DateTime = luxon.DateTime;

let formulario = document.getElementById('formulario');

formulario.addEventListener('submit', (e) => {
    e.preventDefault();
    
    let dataEntrada = DateTime.fromISO(e.target.dataEntrada.value);
    let dataSaida = DateTime.fromISO(e.target.dataSaida.value);
    let hospedes = e.target.hospedes.value;
    let quantidadeDiarias = dataSaida.diff(dataEntrada, 'days').toObject().days;

    if (dataEntrada >= dataSaida) {
        Swal.fire({
            icon: 'error',
            text: 'A data do check-out deve ser posterior a data do check-in.',
        })

        formulario.reset();

    } else {
        class Hospedagem {
            constructor(quantidadeDiarias, quantidadeHospedes, precoDiaria) {
                this.quantidadeDiarias = quantidadeDiarias;
                this.quantidadeHospedes = quantidadeHospedes;
                this.precoDiaria = precoDiaria;
            }
        
            calcularCusto() {
                let custoDiaria = this.quantidadeDiarias * this.quantidadeHospedes * this.precoDiaria;
        
                let dadosHospedagem = document.createElement("div");
        
                dadosHospedagem.innerHTML = `<h3>Dados da Hospedagem:</h3>
                                        <p><br>Data de entrada: ${dataEntrada.toLocaleString()}</p> 
                                        <p>Data de saida: ${dataSaida.toLocaleString()}</p> 
                                        <p>Quantidade de diárias: ${this.quantidadeDiarias}</p> 
                                        <p>Quantidade de hóspedes: ${this.quantidadeHospedes}</p>
                                        <p><b>Custo total das diárias: ${(new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(custoDiaria))}</b></p>`;
                                        
                document.body.appendChild(dadosHospedagem);
            }
        }
        
        const hospedagens = [];
        hospedagens.push(new Hospedagem (quantidadeDiarias, hospedes, 300));
        hospedagens.forEach(hospedagem => hospedagem.calcularCusto());

        localStorage.clear();
        const hospedagensJson = JSON.stringify({checkin: dataEntrada.toLocaleString(), checkout: dataSaida.toLocaleString(), qhospedes: hospedes});
        localStorage.setItem('hospedagem', hospedagensJson);
        }

});




