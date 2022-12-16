let dataEntrada
let dataSaida
let hospedes

let formulario = document.getElementById('formulario');

formulario.addEventListener('submit', (e) => {
    e.preventDefault();
    
    let dataEntrada = e.target.dataEntrada;
    let dataSaida = e.target.dataSaida;
    let hospedes = e.target.hospedes;

    let dataEntradaBrasileira = dataEntrada.value.split('-').reverse().join('/');
    let dataSaidaBrasileira = dataSaida.value.split('-').reverse().join('/');

    if (dataEntrada.value >= dataSaida.value) {
        alert('Data de saída deve ser posterior a data de entrada');

        formulario.reset();

    } else {
        if (hospedes.value == "") {
            alert('Quantidade de hóspedes inválida');

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
                                            <p><br>Data de entrada: ${dataEntradaBrasileira}</p> 
                                            <p>Data de saida: ${dataSaidaBrasileira}</p> 
                                            <p>Quantidade de diárias: ${this.quantidadeDiarias}</p> 
                                            <p>Quantidade de hóspedes: ${this.quantidadeHospedes}</p>
                                            <p><b>Custo total das diárias: ${(new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(custoDiaria))}</b></p>`;
                                            
                    document.body.appendChild(dadosHospedagem);
                }
            }
            
            const hospedagens = [];
            
            hospedagens.push(new Hospedagem (calculaDiarias(dataEntrada.value, dataSaida.value), hospedes.value, 300));
        
            hospedagens.forEach(hospedagem => hospedagem.calcularCusto());
        }
    }

});

function calculaDiarias(a, b) {
    return Math.floor((new Date(b) - new Date(a))/86400000);
}




